require("dotenv").config({ path: require("node:path").join(__dirname, ".env") })

const pool = require("./src/config/database")

async function checkPresetQuestionCoverage() {
  try {
    const result = await pool.query(`
      SELECT
        e.name AS exam,
        COUNT(DISTINCT s.id)::INTEGER AS subjects,
        COUNT(q.id)::INTEGER AS questions,
        COUNT(*) FILTER (WHERE q.id IS NULL)::INTEGER AS missing_subjects
      FROM exams e
      JOIN exam_subjects es
        ON es.exam_id = e.id
        AND es.is_active = TRUE
      JOIN subjects s
        ON s.id = es.subject_id
        AND s.is_active = TRUE
      LEFT JOIN questions q
        ON q.subject_id = s.id
        AND q.exam = e.name
        AND q.source_provider = 'edudrill'
        AND q.is_active = TRUE
      WHERE e.is_active = TRUE
      GROUP BY e.id, e.name
      ORDER BY e.name
    `)

    console.table(result.rows)
    const missing = result.rows.reduce(
      (total, row) => total + Number(row.missing_subjects),
      0,
    )
    if (missing > 0) process.exitCode = 1
  } catch (error) {
    console.error("Preset coverage check failed:", error.message)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

checkPresetQuestionCoverage()
