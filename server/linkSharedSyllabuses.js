require("dotenv").config()

const pool = require("./src/config/database")

async function linkSharedSyllabuses() {
  try {
    const syllabusResult = await pool.query(`
      SELECT
        sy.id,
        sy.syllabus_year,
        s.slug AS subject_slug
      FROM syllabuses sy
      JOIN subjects s
        ON sy.subject_id = s.id
      WHERE
        sy.exam = 'WAEC'
        AND s.slug = 'general-mathematics'
        AND sy.is_active = TRUE
      ORDER BY sy.created_at DESC
      LIMIT 1
    `)

    if (syllabusResult.rows.length === 0) {
      throw new Error(
        "General Mathematics syllabus was not found.",
      )
    }

    const syllabus = syllabusResult.rows[0]

    console.log(
      `Found Mathematics syllabus: ${syllabus.syllabus_year}`,
    )

    const examsResult = await pool.query(`
      SELECT id, name, slug
      FROM exams
      WHERE slug IN ('waec', 'neco', 'gce')
        AND is_active = TRUE
      ORDER BY id
    `)

    for (const exam of examsResult.rows) {
      await pool.query(
        `
        INSERT INTO syllabus_exams (
          syllabus_id,
          exam_id,
          is_active
        )
        VALUES ($1, $2, TRUE)
        ON CONFLICT (syllabus_id, exam_id)
        DO UPDATE SET
          is_active = TRUE
        `,
        [syllabus.id, exam.id],
      )

      console.log(
        `✓ Linked ${syllabus.subject_slug} syllabus → ${exam.name}`,
      )
    }

    console.log("\nShared syllabus linking completed successfully.")
  } catch (error) {
    console.error("\nFailed to link shared syllabuses:")
    console.error(error)
  } finally {
    await pool.end()
  }
}

linkSharedSyllabuses()