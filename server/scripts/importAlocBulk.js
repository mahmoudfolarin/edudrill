require("dotenv").config()

const pool = require("../src/config/database")

const ALOC_BASE_URL = "https://dev.aloc.com.ng/api/v1"
const ALOC_API_KEY = process.env.ALOC_API_KEY

const SUBJECT_MAP = {
  mathematics: "general-mathematics",
  "english-language": "english-language",
  biology: "biology",
  chemistry: "chemistry",
  physics: "physics",
  geography: "geography",
  government: "government",
  economics: "economics",
  commerce: "commerce",
  accounting: "financial-accounting",
  insurance: "insurance",
  "christian-religious-studies": "christian-religious-studies",
  "literature-in-english": "literature-in-english",
  history: "history",
  "civic-education": "civic-education",
}

function normalizeDifficulty(score) {
  const value = Number(score)

  if (!Number.isFinite(value)) return "medium"
  if (value <= 2) return "easy"
  if (value >= 4) return "hard"

  return "medium"
}

function cleanText(value) {
  if (value === null || value === undefined) {
    return null
  }

  return String(value).trim()
}

function normalizeAnswer(answer) {
  if (!answer) return null

  const value = String(answer).trim().toUpperCase()

  return ["A", "B", "C", "D"].includes(value)
    ? value
    : null
}

async function findSubject(slug) {
  const result = await pool.query(
    `
    SELECT id, name, slug
    FROM subjects
    WHERE slug = $1
    LIMIT 1
    `,
    [slug],
  )

  return result.rows[0] || null
}

/*
  Find an existing EduDrill past paper for this
  exam + subject + year + ALOC objective import.
*/
async function findPastPaper({
  exam,
  subjectId,
  year,
}) {
  const result = await pool.query(
    `
    SELECT
      id,
      exam,
      subject_id,
      year,
      paper_code,
      paper_title,
      paper_type,
      verification_status
    FROM past_papers
    WHERE exam = $1
      AND subject_id = $2
      AND year = $3
      AND paper_code = 'ALOC-OBJECTIVE'
    LIMIT 1
    `,
    [exam, subjectId, String(year)],
  )

  return result.rows[0] || null
}

/*
  Create the paper container.

  It remains pending verification because
  ALOC has not established redistribution
  licensing for us.
*/
async function createPastPaper({
  exam,
  subjectId,
  subjectName,
  year,
}) {
  const existing = await findPastPaper({
    exam,
    subjectId,
    year,
  })

  if (existing) {
    return existing
  }

  const result = await pool.query(
    `
    INSERT INTO past_papers (
      exam,
      subject_id,
      year,
      session,
      paper_code,
      paper_title,
      paper_type,
      duration_minutes,
      total_questions,
      instructions,
      source_name,
      source_url,
      license_status,
      verification_status,
      is_active
    )
    VALUES (
      $1,
      $2,
      $3,
      'ALOC',
      'ALOC-OBJECTIVE',
      $4,
      'objective',
      NULL,
      0,
      'Imported from ALOC and awaiting verification.',
      'ALOC',
      'https://dev.aloc.com.ng',
      'pending',
      'pending',
      TRUE
    )
    RETURNING
      id,
      exam,
      subject_id,
      year,
      paper_code,
      paper_title,
      paper_type,
      verification_status
    `,
    [
      exam,
      subjectId,
      String(year),
      `${exam} ${subjectName} ${year} Objective`,
    ],
  )

  return result.rows[0]
}

async function fetchQuestions({
  exam,
  subject,
  year,
  cursor = null,
}) {
  const params = new URLSearchParams()

  params.set("examType", exam.toLowerCase())
  params.set("subject", subject)
  params.set("year", String(year))
  params.set("limit", "15")

  if (cursor) {
    params.set("cursor", cursor)
  }

  const response = await fetch(
    `${ALOC_BASE_URL}/questions?${params.toString()}`,
    {
      headers: {
        "X-API-Key": ALOC_API_KEY,
        Accept: "application/json",
      },
    },
  )

  const body = await response.json()

  if (!response.ok) {
    if (response.status === 404) {
      return {
        data: [],
        pagination: {
          hasMore: false,
          nextCursor: null,
        },
        notFound: true,
      }
    }

    throw new Error(
      `ALOC ${response.status}: ${JSON.stringify(body)}`,
    )
  }

  return body
}

/*
  Import one question and attach it to
  the correct past_papers record.
*/
async function importQuestion(
  question,
  subjectId,
  paperId,
) {
  const exam = String(question.examType || "")
    .trim()
    .toUpperCase()

  const year = question.year
    ? String(question.year)
    : null

  const text = cleanText(question.text)

  const options = {
    A: cleanText(question.options?.A),
    B: cleanText(question.options?.B),
    C: cleanText(question.options?.C),
    D: cleanText(question.options?.D),
  }

  const answer = normalizeAnswer(question.correctAnswer)

  if (
    !exam ||
    !year ||
    !text ||
    !options.A ||
    !options.B ||
    !options.C ||
    !options.D ||
    !answer
  ) {
    return "invalid"
  }

  const questionNumber =
    Number(question.questionNumber) > 0
      ? Number(question.questionNumber)
      : null

  /*
    First protection:
    Same ALOC record must never be inserted twice.

    If it already exists, make sure it is attached
    to the correct past paper.
  */
  const providerDuplicate = await pool.query(
    `
    SELECT
      id,
      past_paper_id
    FROM questions
    WHERE source_provider = 'aloc'
      AND source_external_id = $1
    LIMIT 1
    `,
    [question.id],
  )

  if (providerDuplicate.rows.length > 0) {
    const existingQuestion =
      providerDuplicate.rows[0]

    if (
      existingQuestion.past_paper_id !== paperId
    ) {
      await pool.query(
        `
        UPDATE questions
        SET
          past_paper_id = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        `,
        [
          paperId,
          existingQuestion.id,
        ],
      )

      return "provider_duplicate_attached"
    }

    return "provider_duplicate"
  }

  /*
    Second protection:
    Exact same question in the same
    exam + subject + year + question number
    is treated as a duplicate.

    If the duplicate exists but is not attached
    to a paper, attach it.
  */
  const exactDuplicate = await pool.query(
    `
    SELECT
      id,
      past_paper_id
    FROM questions
    WHERE exam = $1
      AND subject_id = $2
      AND year = $3
      AND question_number = $4
      AND LOWER(TRIM(question_text))
          = LOWER(TRIM($5))
      AND LOWER(TRIM(option_a))
          = LOWER(TRIM($6))
      AND LOWER(TRIM(option_b))
          = LOWER(TRIM($7))
      AND LOWER(TRIM(option_c))
          = LOWER(TRIM($8))
      AND LOWER(TRIM(option_d))
          = LOWER(TRIM($9))
    LIMIT 1
    `,
    [
      exam,
      subjectId,
      year,
      questionNumber,
      text,
      options.A,
      options.B,
      options.C,
      options.D,
    ],
  )

  if (exactDuplicate.rows.length > 0) {
    const existingQuestion =
      exactDuplicate.rows[0]

    if (
      existingQuestion.past_paper_id !== paperId
    ) {
      await pool.query(
        `
        UPDATE questions
        SET
          past_paper_id = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        `,
        [
          paperId,
          existingQuestion.id,
        ],
      )

      return "exact_duplicate_attached"
    }

    return "exact_duplicate"
  }

  await pool.query(
    `
    INSERT INTO questions (
      exam,
      subject_id,
      year,
      question_type,
      source_type,
      question_text,
      option_a,
      option_b,
      option_c,
      option_d,
      correct_answer,
      explanation,
      difficulty,
      marks,
      is_active,
      past_paper_id,
      question_number,
      paper_section,
      source_name,
      source_url,
      license_status,
      verification_status,
      source_provider,
      source_external_id
    )
    VALUES (
      $1,
      $2,
      $3,
      'multiple_choice',
      'past_question',
      $4,
      $5,
      $6,
      $7,
      $8,
      $9,
      NULL,
      $10,
      1,
      TRUE,
      $11,
      $12,
      NULL,
      'ALOC',
      'https://dev.aloc.com.ng',
      'pending',
      'pending',
      'aloc',
      $13
    )
    `,
    [
      exam,
      subjectId,
      year,
      text,
      options.A,
      options.B,
      options.C,
      options.D,
      answer,
      normalizeDifficulty(
        question.metadata?.difficultyScore,
      ),
      paperId,
      questionNumber,
      question.id,
    ],
  )

  return "imported"
}

async function updatePaperQuestionCount(paperId) {
  await pool.query(
    `
    UPDATE past_papers
    SET
      total_questions = (
        SELECT COUNT(*)
        FROM questions
        WHERE past_paper_id = $1
          AND is_active = TRUE
      ),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    `,
    [paperId],
  )
}

async function importYear({
  exam,
  alocSubject,
  eduSubject,
  year,
}) {
  const subject = await findSubject(eduSubject)

  if (!subject) {
    console.log(
      `   ⚠ Subject not found: ${eduSubject}`,
    )

    return
  }

  console.log(
    `\n▶ ${exam} | ${alocSubject} | ${year}`,
  )

  let cursor = null
  let pages = 0
  let paper = null

  const stats = {
    received: 0,
    imported: 0,
    providerDuplicates: 0,
    providerDuplicatesAttached: 0,
    exactDuplicates: 0,
    exactDuplicatesAttached: 0,
    invalid: 0,
  }

  while (true) {
    pages++

    const result = await fetchQuestions({
      exam,
      subject: alocSubject,
      year,
      cursor,
    })

    const questions = Array.isArray(result.data)
      ? result.data
      : []

    if (result.notFound) {
      console.log(
        "   No questions available for this year.",
      )

      return
    }

    stats.received += questions.length

    /*
      Only create a paper after ALOC actually
      returns questions for the requested year.
    */
    if (!paper && questions.length > 0) {
      paper = await createPastPaper({
        exam,
        subjectId: subject.id,
        subjectName: subject.name,
        year,
      })

      console.log(
        `   Paper ID: ${paper.id}`,
      )
    }

    for (const question of questions) {
      const resultType = await importQuestion(
        question,
        subject.id,
        paper.id,
      )

      if (resultType === "imported") {
        stats.imported++
      } else if (
        resultType === "provider_duplicate_attached"
      ) {
        stats.providerDuplicatesAttached++
      } else if (
        resultType === "provider_duplicate"
      ) {
        stats.providerDuplicates++
      } else if (
        resultType === "exact_duplicate_attached"
      ) {
        stats.exactDuplicatesAttached++
      } else if (
        resultType === "exact_duplicate"
      ) {
        stats.exactDuplicates++
      } else {
        stats.invalid++
      }
    }

    const pagination = result.pagination || {}

    if (
      !pagination.hasMore ||
      !pagination.nextCursor
    ) {
      break
    }

    cursor = pagination.nextCursor
  }

  if (paper) {
    await updatePaperQuestionCount(paper.id)
  }

  console.log(
    `   Received: ${stats.received}`,
  )

  console.log(
    `   Imported: ${stats.imported}`,
  )

  console.log(
    `   Provider duplicates: ${stats.providerDuplicates}`,
  )

  console.log(
    `   Provider duplicates attached: ${stats.providerDuplicatesAttached}`,
  )

  console.log(
    `   Exact duplicates: ${stats.exactDuplicates}`,
  )

  console.log(
    `   Exact duplicates attached: ${stats.exactDuplicatesAttached}`,
  )

  console.log(
    `   Invalid: ${stats.invalid}`,
  )

  if (paper) {
    console.log(
      `   Past paper ID: ${paper.id}`,
    )

    console.log(
      `   Verification: ${paper.verification_status}`,
    )
  }
}

async function main() {
  if (!ALOC_API_KEY) {
    throw new Error(
      "ALOC_API_KEY is missing from .env",
    )
  }

  const exam = "WAEC"

  /*
    TEST CONFIGURATION

    We are starting with ONE subject
    and FIVE years.
  */

  const subjects = [
    {
      aloc: "mathematics",
      edu: SUBJECT_MAP.mathematics,
    },
  ]

  const years = [
    2010,
    2011,
    2012,
    2013,
    2014,
  ]

  console.log("")
  console.log("========================================")
  console.log("EduDrill ALOC Bulk Importer")
  console.log("========================================")
  console.log(`Exam: ${exam}`)
  console.log(`Subjects: ${subjects.length}`)
  console.log(`Years: ${years.length}`)
  console.log("")

  for (const subject of subjects) {
    for (const year of years) {
      await importYear({
        exam,
        alocSubject: subject.aloc,
        eduSubject: subject.edu,
        year,
      })
    }
  }

  console.log("")
  console.log("========================================")
  console.log("BULK IMPORT COMPLETE")
  console.log("========================================")
}

main()
  .catch((error) => {
    console.error("")
    console.error("BULK IMPORT FAILED")
    console.error(error.message)
    console.error("")
    process.exitCode = 1
  })
  .finally(async () => {
    await pool.end()
  })