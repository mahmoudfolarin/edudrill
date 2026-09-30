require("dotenv").config()

const pool = require("./src/config/database")

async function checkMappings() {
  try {
    const result = await pool.query(`
      SELECT
        e.name AS exam,
        COUNT(es.id) AS active_subjects
      FROM exams e
      LEFT JOIN exam_subjects es
        ON e.id = es.exam_id
        AND es.is_active = TRUE
      GROUP BY e.id, e.name
      ORDER BY e.id
    `)

    console.table(result.rows)
  } catch (error) {
    console.error("Database check failed:")
    console.error(error)
  } finally {
    await pool.end()
  }
}

checkMappings()