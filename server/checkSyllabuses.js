require("dotenv").config()

const pool = require("./src/config/database")

async function checkSyllabuses() {
  try {
    const result = await pool.query(`
      SELECT
        sy.id,
        sy.exam,
        s.name AS subject,
        s.slug,
        sy.syllabus_year,
        COUNT(DISTINCT t.id) AS topics,
        COUNT(DISTINCT st.id) AS subtopics,
        COUNT(DISTINCT l.id) AS lessons
      FROM syllabuses sy
      JOIN subjects s
        ON sy.subject_id = s.id
      LEFT JOIN topics t
        ON t.syllabus_id = sy.id
      LEFT JOIN subtopics st
        ON st.topic_id = t.id
      LEFT JOIN lessons l
        ON l.topic_id = t.id
      WHERE sy.is_active = TRUE
      GROUP BY
        sy.id,
        sy.exam,
        s.name,
        s.slug,
        sy.syllabus_year
      ORDER BY
        sy.exam,
        s.name
    `)

    console.log("\n========================================")
    console.log("       EDUDRILL SYLLABUS STATUS")
    console.log("========================================\n")

    if (result.rows.length === 0) {
      console.log("No active syllabuses found.")
    } else {
      result.rows.forEach((row, index) => {
        console.log(
          `${index + 1}. ${row.exam} | ${row.subject}`,
        )

        console.log(
          `   Year: ${row.syllabus_year}`,
        )

        console.log(
          `   Topics: ${row.topics} | Subtopics: ${row.subtopics} | Lessons: ${row.lessons}`,
        )

        console.log("")
      })
    }

    console.log("========================================")
    console.log(`TOTAL SYLLABUSES: ${result.rows.length}`)
    console.log("========================================\n")
  } catch (error) {
    console.error("Syllabus check failed:")
    console.error(error)
  } finally {
    await pool.end()
  }
}

checkSyllabuses()