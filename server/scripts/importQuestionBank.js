require("dotenv").config()

const fs = require("node:fs")
const path = require("node:path")
const pool = require("../src/config/database")

const VALID_EXAMS = new Set(["WAEC", "NECO", "GCE", "JAMB"])
const VALID_LICENSE_STATUSES = new Set([
  "pending",
  "authorized",
  "licensed",
  "public_domain",
  "restricted",
  "rejected",
])
const VALID_VERIFICATION_STATUSES = new Set([
  "pending",
  "verified",
  "rejected",
])
const VALID_DIFFICULTIES = new Set(["easy", "medium", "hard"])

function requiredText(value, field) {
  const text = String(value ?? "").trim()
  if (!text) throw new Error(`${field} is required`)
  return text
}

function normalizeAnswer(value) {
  const answer = String(value ?? "").trim().toUpperCase()
  if (!["A", "B", "C", "D"].includes(answer)) {
    throw new Error("correctAnswer must be A, B, C, or D")
  }
  return answer
}

function normalizeChoiceSet(value) {
  const choices = {
    A: String(value?.A ?? "").trim(),
    B: String(value?.B ?? "").trim(),
    C: String(value?.C ?? "").trim(),
    D: String(value?.D ?? "").trim(),
  }

  if (Object.values(choices).some((choice) => !choice)) {
    throw new Error("options must contain non-empty A, B, C, and D")
  }

  return choices
}

function normalizeQuestion(record, index) {
  const exam = requiredText(record.exam, `questions[${index}].exam`).toUpperCase()
  if (!VALID_EXAMS.has(exam)) {
    throw new Error(`questions[${index}].exam must be WAEC, NECO, GCE, or JAMB`)
  }

  const licenseStatus = record.licenseStatus || "pending"
  if (!VALID_LICENSE_STATUSES.has(licenseStatus)) {
    throw new Error(`questions[${index}].licenseStatus is invalid`)
  }

  const verificationStatus = record.verificationStatus || "pending"
  if (!VALID_VERIFICATION_STATUSES.has(verificationStatus)) {
    throw new Error(`questions[${index}].verificationStatus is invalid`)
  }

  const difficulty = record.difficulty || "medium"
  if (!VALID_DIFFICULTIES.has(difficulty)) {
    throw new Error(`questions[${index}].difficulty must be easy, medium, or hard`)
  }

  const questionNumber = record.questionNumber == null
    ? null
    : Number(record.questionNumber)
  if (questionNumber !== null && (!Number.isInteger(questionNumber) || questionNumber < 1)) {
    throw new Error(`questions[${index}].questionNumber must be a positive integer`)
  }

  return {
    exam,
    subjectSlug: requiredText(record.subject, `questions[${index}].subject`).toLowerCase(),
    year: record.year == null ? null : String(record.year).trim(),
    questionText: requiredText(record.question, `questions[${index}].question`),
    options: normalizeChoiceSet(record.options),
    correctAnswer: normalizeAnswer(record.correctAnswer),
    explanation: record.explanation == null ? null : String(record.explanation).trim(),
    difficulty,
    marks: Number.isInteger(Number(record.marks)) && Number(record.marks) > 0
      ? Number(record.marks)
      : 1,
    questionNumber,
    paperSection: record.paperSection == null ? null : String(record.paperSection).trim(),
    sourceName: requiredText(record.sourceName, `questions[${index}].sourceName`),
    sourceUrl: record.sourceUrl == null ? null : String(record.sourceUrl).trim(),
    sourceProvider: requiredText(record.sourceProvider, `questions[${index}].sourceProvider`).toLowerCase(),
    sourceExternalId: requiredText(record.sourceExternalId, `questions[${index}].sourceExternalId`),
    licenseStatus,
    verificationStatus,
  }
}

async function importQuestion(question, dryRun) {
  const subjectResult = await pool.query(
    `SELECT s.id
     FROM subjects s
     JOIN exam_subjects es ON es.subject_id = s.id
     JOIN exams e ON e.id = es.exam_id
     WHERE s.slug = $1
       AND e.slug = $2
       AND s.is_active = TRUE
       AND es.is_active = TRUE
       AND e.is_active = TRUE
     LIMIT 1`,
    [question.subjectSlug, question.exam.toLowerCase()],
  )
  const subject = subjectResult.rows[0]
  if (!subject) {
    throw new Error(`Subject ${question.subjectSlug} is not active for ${question.exam}`)
  }

  if (question.sourceExternalId) {
    const duplicate = await pool.query(
      `SELECT id FROM questions
       WHERE source_provider = $1 AND source_external_id = $2
       LIMIT 1`,
      [question.sourceProvider, question.sourceExternalId],
    )
    if (duplicate.rows.length > 0) return "duplicate"
  }

  if (dryRun) return "validated"

  await pool.query(
    `INSERT INTO questions (
      exam, subject_id, year, question_type, source_type, question_text,
      option_a, option_b, option_c, option_d, correct_answer, explanation,
      difficulty, marks, is_active, question_number, paper_section,
      source_name, source_url, license_status, verification_status,
      source_provider, source_external_id
    ) VALUES (
      $1, $2, $3, 'multiple_choice', 'past_question', $4,
      $5, $6, $7, $8, $9, $10,
      $11, $12, TRUE, $13, $14,
      $15, $16, $17, $18, $19, $20
    )`,
    [
      question.exam,
      subject.id,
      question.year,
      question.questionText,
      question.options.A,
      question.options.B,
      question.options.C,
      question.options.D,
      question.correctAnswer,
      question.explanation,
      question.difficulty,
      question.marks,
      question.questionNumber,
      question.paperSection,
      question.sourceName,
      question.sourceUrl,
      question.licenseStatus,
      question.verificationStatus,
      question.sourceProvider,
      question.sourceExternalId,
    ],
  )

  return "imported"
}

async function main() {
  const fileArgument = process.argv.find((argument) => argument.startsWith("--file="))
  if (!fileArgument) {
    throw new Error("Usage: node scripts/importQuestionBank.js --file=<json-path> [--dry-run]")
  }

  const filePath = path.resolve(process.cwd(), fileArgument.slice("--file=".length))
  const payload = JSON.parse(fs.readFileSync(filePath, "utf8"))
  const records = Array.isArray(payload) ? payload : payload.questions
  if (!Array.isArray(records)) {
    throw new Error("Question bank JSON must be an array or an object with a questions array")
  }

  const dryRun = process.argv.includes("--dry-run")
  const counts = { imported: 0, validated: 0, duplicate: 0 }

  for (const [index, record] of records.entries()) {
    const result = await importQuestion(normalizeQuestion(record, index), dryRun)
    counts[result]++
  }

  console.log(`${dryRun ? "Validated" : "Imported"} ${records.length} records:`, counts)
}

main()
  .catch((error) => {
    console.error("Question bank import failed:", error.message)
    process.exitCode = 1
  })
  .finally(() => pool.end())
