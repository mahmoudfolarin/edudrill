require("dotenv").config()
const pool = require("../src/config/database")

const ALOC_BASE_URL = "https://dev.aloc.com.ng/api/v1"
const ALOC_API_KEY = process.env.ALOC_API_KEY

const SUBJECT_MAP = {
  mathematics: "general-mathematics",
  english: "english-language",
  "english-language": "english-language",
  biology: "biology",
  chemistry: "chemistry",
  physics: "physics",
  geography: "geography",
  government: "government",
  economics: "economics",
  commerce: "commerce",
  accounting: "financial-accounting",
  "financial-accounting": "financial-accounting",
  insurance: "insurance",
  "christian-religious-studies": "christian-religious-studies",
  "literature-in-english": "literature-in-english",
  history: "history",
  "civic-education": "civic-education",
}

function normalizeExam(examType) {
  return String(examType || "").trim().toUpperCase()
}

function normalizeSubject(subject) {
  return SUBJECT_MAP[String(subject || "").trim().toLowerCase()] || null
}

function normalizeDifficulty(score) {
  const value = Number(score)

  if (!Number.isFinite(value)) {
    return "medium"
  }

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

  if (["A", "B", "C", "D"].includes(value)) {
    return value
  }

  return null
}

async function findSubject(subjectSlug) {
  const result = await pool.query(
    `
    SELECT id, name, slug
    FROM subjects
    WHERE slug = $1
    LIMIT 1
    `,
    [subjectSlug]
  )

  return result.rows[0] || null
}

async function questionAlreadyExists({
  sourceProvider,
  sourceExternalId,
  exam,
  subjectId,
  year,
  questionNumber,
  paperSection,
  options,
  questionText,
}) {
  /*
    1. First check the provider's own external ID.

    This catches the exact same ALOC record being requested again.
  */

  if (sourceExternalId) {
    const providerResult = await pool.query(
      `
      SELECT id
      FROM questions
      WHERE source_provider = $1
        AND source_external_id = $2
      LIMIT 1
      `,
      [sourceProvider, sourceExternalId]
    )

    if (providerResult.rows.length > 0) {
      return {
        exists: true,
        reason: "provider_duplicate",
      }
    }
  }

  /*
    2. Check for an exact duplicate in the same
       exam / subject / year / question number / section.

    We deliberately DO NOT use question text alone.

    Therefore:

      2010 Q5 + 2010 Q37
      2010 Q5 + 2016 Q5

    can both exist.
  */

  const duplicateResult = await pool.query(
    `
    SELECT id
    FROM questions
    WHERE exam = $1
      AND subject_id = $2
      AND year = $3
      AND question_number = $4
      AND COALESCE(paper_section, '') = COALESCE($5, '')
      AND LOWER(TRIM(question_text)) = LOWER(TRIM($6))
      AND LOWER(TRIM(option_a)) = LOWER(TRIM($7))
      AND LOWER(TRIM(option_b)) = LOWER(TRIM($8))
      AND LOWER(TRIM(option_c)) = LOWER(TRIM($9))
      AND LOWER(TRIM(option_d)) = LOWER(TRIM($10))
    LIMIT 1
    `,
    [
      exam,
      subjectId,
      String(year),
      questionNumber,
      paperSection,
      questionText,
      options.A,
      options.B,
      options.C,
      options.D,
    ]
  )

  if (duplicateResult.rows.length > 0) {
    return {
      exists: true,
      reason: "exact_duplicate_same_paper_position",
    }
  }

  return {
    exists: false,
    reason: null,
  }
}

async function fetchQuestions({
  examType,
  subject,
  year,
  cursor,
  limit = 15,
}) {
  const params = new URLSearchParams()

  params.set("examType", examType)
  params.set("subject", subject)
  params.set("limit", String(limit))

  if (year) {
    params.set("year", String(year))
  }

  if (cursor) {
    params.set("cursor", cursor)
  }

  const url = `${ALOC_BASE_URL}/questions?${params.toString()}`

  for (let attempt = 0; attempt < 4; attempt++) {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-Key": ALOC_API_KEY,
        Accept: "application/json",
      },
    })

    const body = await response.json()

    if (response.status === 429 && attempt < 3) {
      const retryAfter = Number(response.headers.get("retry-after"))
      const hintedDelay = Number(
        body.message?.match(/try again in (\d+) seconds/i)?.[1],
      )
      const delayMs = (retryAfter || hintedDelay || 60) * 1000

      console.warn(`ALOC rate limit reached; retrying in ${delayMs / 1000}s.`)
      await new Promise((resolve) => setTimeout(resolve, delayMs))
      continue
    }

    if (!response.ok) {
      throw new Error(
        `ALOC API error ${response.status}: ${JSON.stringify(body)}`
      )
    }

    return body
  }

  throw new Error("ALOC API retry limit exceeded")
}

async function importQuestion(question, subjectId) {
  const exam = normalizeExam(question.examType)

  const year = question.year
    ? String(question.year)
    : null

  const questionText = cleanText(question.text)

  const options = {
    A: cleanText(question.options?.A),
    B: cleanText(question.options?.B),
    C: cleanText(question.options?.C),
    D: cleanText(question.options?.D),
  }

  const correctAnswer = normalizeAnswer(question.correctAnswer)

  if (
    !exam ||
    !subjectId ||
    !year ||
    !questionText ||
    !options.A ||
    !options.B ||
    !options.C ||
    !options.D ||
    !correctAnswer
  ) {
    return {
      imported: false,
      skipped: true,
      reason: "missing_required_data",
    }
  }

  const questionNumber =
    Number.isInteger(Number(question.questionNumber)) &&
    Number(question.questionNumber) > 0
      ? Number(question.questionNumber)
      : null

 const paperSection = null

  const duplicate = await questionAlreadyExists({
    sourceProvider: "aloc",
    sourceExternalId: question.id,
    exam,
    subjectId,
    year,
    questionNumber,
    paperSection,
    options,
    questionText,
  })

  if (duplicate.exists) {
    return {
      imported: false,
      skipped: true,
      reason: duplicate.reason,
    }
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
      questionText,
      options.A,
      options.B,
      options.C,
      options.D,
      correctAnswer,
      normalizeDifficulty(question.metadata?.difficultyScore),
      questionNumber,
      paperSection,
      question.id,
    ]
  )

  return {
    imported: true,
    skipped: false,
    reason: null,
  }
}

async function importQuestions({
  examType,
  subject,
  year = null,
}) {
  if (!ALOC_API_KEY) {
    throw new Error(
      "ALOC_API_KEY is missing from server/.env"
    )
  }

  const normalizedSubject = normalizeSubject(subject)

  if (!normalizedSubject) {
    throw new Error(
      `No EduDrill subject mapping exists for ALOC subject: ${subject}`
    )
  }

  const subjectRecord = await findSubject(normalizedSubject)

  if (!subjectRecord) {
    throw new Error(
      `EduDrill subject not found in database: ${normalizedSubject}`
    )
  }

  console.log("")
  console.log("========================================")
  console.log("EduDrill ALOC Question Importer")
  console.log("========================================")
  console.log(`Exam: ${normalizeExam(examType)}`)
  console.log(`ALOC subject: ${subject}`)
  console.log(`EduDrill subject: ${subjectRecord.name}`)
  console.log(`Year: ${year || "ALL"}`)
  console.log("")

  let cursor = null
  let page = 0

  let imported = 0
  let providerDuplicates = 0
  let exactDuplicates = 0
  let invalid = 0
  let totalReceived = 0

  while (true) {
    page++

    console.log(`Fetching page ${page}...`)

    const result = await fetchQuestions({
      examType: normalizeExam(examType).toLowerCase(),
      subject: String(subject).toLowerCase(),
      year,
      cursor,
      limit: 15,
    })

    const questions = Array.isArray(result.data)
      ? result.data
      : []

    totalReceived += questions.length

    console.log(`Received ${questions.length} questions.`)

    for (const question of questions) {
      const outcome = await importQuestion(
        question,
        subjectRecord.id
      )

      if (outcome.imported) {
        imported++
      } else if (outcome.reason === "provider_duplicate") {
        providerDuplicates++
      } else if (
        outcome.reason === "exact_duplicate_same_paper_position"
      ) {
        exactDuplicates++
      } else {
        invalid++
      }
    }

    const pagination = result.pagination || {}

    if (!pagination.hasMore || !pagination.nextCursor) {
      break
    }

    cursor = pagination.nextCursor
  }

  console.log("")
  console.log("========================================")
  console.log("IMPORT COMPLETE")
  console.log("========================================")
  console.log(`Received: ${totalReceived}`)
  console.log(`Imported: ${imported}`)
  console.log(`Provider duplicates: ${providerDuplicates}`)
  console.log(`Exact duplicates: ${exactDuplicates}`)
  console.log(`Invalid/skipped: ${invalid}`)
  console.log("========================================")
  console.log("")
}

function parseArguments() {
  const args = process.argv.slice(2)

  const options = {
    exam: null,
    subject: null,
    year: null,
  }

  for (let i = 0; i < args.length; i++) {
    const argument = args[i]

    if (argument === "--exam") {
      options.exam = args[++i]
    }

    if (argument === "--subject") {
      options.subject = args[++i]
    }

    if (argument === "--year") {
      options.year = args[++i]
    }
  }

  return options
}

async function main() {
  try {
    const options = parseArguments()

    if (!options.exam || !options.subject) {
      console.log("")
      console.log("Usage:")
      console.log(
        "node scripts/importAlocQuestions.js --exam WAEC --subject Mathematics"
      )
      console.log("")
      console.log("Specific year:")
      console.log(
        "node scripts/importAlocQuestions.js --exam WAEC --subject Mathematics --year 2010"
      )
      console.log("")

      process.exit(1)
    }

    await importQuestions({
      examType: options.exam,
      subject: options.subject,
      year: options.year,
    })
  } catch (error) {
    console.error("")
    console.error("IMPORT FAILED")
    console.error(error.message)
    console.error("")
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

main()