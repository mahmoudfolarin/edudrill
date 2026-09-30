require("dotenv").config()

const pool = require("./src/config/database")

async function seedWaecSyllabusRegistry() {
  try {
    const result = await pool.query(`
      INSERT INTO syllabuses
      (
        subject_id,
        exam,
        syllabus_year,
        title,
        description,
        is_active,
        verification_status,
        review_notes
      )
      SELECT
        s.id,
        'WAEC',
        '2026/2027',
        'WAEC ' || s.name || ' Syllabus',
        'Awaiting an official WAEC syllabus source and academic verification before publication.',
        FALSE,
        'pending',
        'Do not publish topics, lessons, or questions until source review is complete.'
      FROM exam_subjects es
      JOIN exams e ON e.id = es.exam_id
      JOIN subjects s ON s.id = es.subject_id
      WHERE
        e.slug = 'waec'
        AND e.is_active = TRUE
        AND es.is_active = TRUE
        AND s.is_active = TRUE
      ON CONFLICT (subject_id, exam, syllabus_year)
      DO NOTHING
    `)

    console.log(`Created ${result.rowCount} WAEC syllabus review records.`)
  } catch (error) {
    console.error("WAEC syllabus registry seeding failed:", error)
  } finally {
    await pool.end()
  }
}

seedWaecSyllabusRegistry()
