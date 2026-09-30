require("dotenv").config()

const pool = require("./src/config/database")

async function removeOldSyllabuses() {
  try {
    const result = await pool.query(`
      DELETE FROM syllabuses
      WHERE exam = 'WAEC'
        AND syllabus_year = 'Undated'
        AND subject_id IN (
          SELECT id
          FROM subjects
          WHERE slug IN (
            'english-language',
            'civic-education'
          )
        )
      RETURNING id, subject_id, syllabus_year
    `)

    console.log("\n========================================")
    console.log("   OLD SYLLABUS CLEANUP")
    console.log("========================================\n")

    console.log(
      `Removed ${result.rowCount} old syllabus record(s).`
    )

    result.rows.forEach((row) => {
      console.log(
        `Removed syllabus ID ${row.id} | Subject ID ${row.subject_id} | Year: ${row.syllabus_year}`
      )
    })

    console.log("\nCleanup completed successfully.")
    console.log("========================================\n")
  } catch (error) {
    console.error("Syllabus cleanup failed:")
    console.error(error)
  } finally {
    await pool.end()
  }
}

removeOldSyllabuses()