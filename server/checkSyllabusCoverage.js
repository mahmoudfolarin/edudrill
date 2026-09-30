require("dotenv").config({ path: require("node:path").join(__dirname, ".env") })

const pool = require("./src/config/database")

async function checkSyllabusCoverage() {
  try {
    const result = await pool.query(`
      SELECT
        e.name AS exam,
        COUNT(*)::INTEGER AS active_subjects,
        COUNT(*) FILTER (WHERE EXISTS (
          SELECT 1
          FROM syllabuses sy
          JOIN syllabus_exams se
            ON se.syllabus_id = sy.id
            AND se.is_active = TRUE
          WHERE sy.subject_id = s.id
            AND sy.is_active = TRUE
            AND se.exam_id = e.id
        ))::INTEGER AS covered_subjects,
        COUNT(*) FILTER (WHERE EXISTS (
          SELECT 1
          FROM syllabuses sy
          JOIN syllabus_exams se
            ON se.syllabus_id = sy.id
            AND se.is_active = TRUE
          WHERE sy.subject_id = s.id
            AND sy.is_active = TRUE
            AND se.exam_id = e.id
            AND sy.verification_status = 'pending'
        ))::INTEGER AS draft_subjects
      FROM exam_subjects es
      JOIN exams e ON e.id = es.exam_id AND e.is_active = TRUE
      JOIN subjects s ON s.id = es.subject_id AND s.is_active = TRUE
      WHERE es.is_active = TRUE
      GROUP BY e.id, e.name
      ORDER BY e.name
    `)

    console.table(result.rows)
    const totals = result.rows.reduce((summary, row) => ({
      active: summary.active + Number(row.active_subjects),
      covered: summary.covered + Number(row.covered_subjects),
      drafts: summary.drafts + Number(row.draft_subjects),
    }), { active: 0, covered: 0, drafts: 0 })
    console.log("Totals:", totals)

    if (totals.covered !== totals.active) process.exitCode = 1
  } catch (error) {
    console.error("Syllabus coverage check failed:", error.message)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

checkSyllabusCoverage()
