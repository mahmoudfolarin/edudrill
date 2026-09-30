require("dotenv").config({ path: require("node:path").join(__dirname, "..", ".env") })

const fs = require("node:fs")
const path = require("node:path")
const pool = require("../src/config/database")

const BANK_PATH = path.join(__dirname, "..", "data", "presetQuestions.json")

async function main() {
  const dataset = JSON.parse(fs.readFileSync(BANK_PATH, "utf8"))
  if (!Array.isArray(dataset.subjects)) {
    throw new Error("Question dataset must contain a subjects array")
  }

  let inserted = 0
  let skipped = 0

  for (const subjectBank of dataset.subjects) {
    const subjectResult = await pool.query(
      `SELECT s.id, s.slug
       FROM subjects s
       WHERE s.slug = $1 AND s.is_active = TRUE
       LIMIT 1`,
      [subjectBank.slug],
    )
    const subject = subjectResult.rows[0]
    if (!subject) throw new Error(`Unknown active subject: ${subjectBank.slug}`)

    const mappings = await pool.query(
      `SELECT e.name AS exam
       FROM exam_subjects es
       JOIN exams e ON e.id = es.exam_id
       WHERE es.subject_id = $1
         AND es.is_active = TRUE
         AND e.is_active = TRUE`,
      [subject.id],
    )

    for (const mapping of mappings.rows) {
      for (const [index, question] of subjectBank.questions.entries()) {
        const externalId = `${mapping.exam.toLowerCase()}:${subject.slug}:${index + 1}`
        const result = await pool.query(
          `INSERT INTO questions (
            exam, subject_id, question_type, source_type, question_text,
            option_a, option_b, option_c, option_d, correct_answer,
            explanation, difficulty, marks, is_active, source_name,
            source_provider, source_external_id, verification_status,
            license_status
          ) VALUES (
            $1, $2, 'multiple_choice', 'practice', $3,
            $4, $5, $6, $7, $8,
            $9, $10, 1, TRUE, 'EduDrill Original Practice',
            'edudrill', $11, 'verified', 'authorized'
          )
          ON CONFLICT (source_provider, source_external_id)
          DO NOTHING
          RETURNING id`,
          [
            mapping.exam,
            subject.id,
            question.question,
            question.options.A,
            question.options.B,
            question.options.C,
            question.options.D,
            question.correctAnswer,
            question.explanation,
            question.difficulty || "medium",
            externalId,
          ],
        )

        if (result.rowCount) inserted++
        else skipped++
      }
    }
  }

  console.log(`Preset question seeding complete: ${inserted} inserted, ${skipped} already present.`)
}

main()
  .catch((error) => {
    console.error("Preset question seeding failed:", error.message)
    process.exitCode = 1
  })
  .finally(() => pool.end())