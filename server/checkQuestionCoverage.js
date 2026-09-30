require("dotenv").config({ path: require("node:path").join(__dirname, ".env") })

const pool = require("./src/config/database")

async function checkQuestionCoverage() {
  try {
    const result = await pool.query(`
      SELECT
        q.exam,
        s.name AS subject,
        q.source_name,
        q.verification_status,
        q.license_status,
        COUNT(*)::INTEGER AS question_count,
        COUNT(DISTINCT q.year)::INTEGER AS years
      FROM questions q
      JOIN subjects s ON s.id = q.subject_id
      WHERE q.is_active = TRUE
      GROUP BY q.exam, s.name, q.source_name, q.verification_status, q.license_status
      ORDER BY q.exam, s.name, q.source_name
    `)

    if (result.rows.length === 0) {
      console.log("No active questions found.")
      return
    }

    console.table(result.rows)
  } catch (error) {
    console.error("Question coverage check failed:", error.message)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

checkQuestionCoverage()
