require("dotenv").config()

const pool = require("./src/config/database")

async function seedPastPapers() {
  try {
    const subjectResult = await pool.query(
      `
      SELECT id, name
      FROM subjects
      WHERE slug = 'general-mathematics'
      LIMIT 1
      `,
    )

    if (subjectResult.rows.length === 0) {
      throw new Error(
        "General Mathematics subject was not found.",
      )
    }

    const subjectId = subjectResult.rows[0].id

    await pool.query(
      `
      INSERT INTO past_papers (
        exam,
        subject_id,
        year,
        session,
        paper_code,
        paper_title,
        paper_type,
        duration_minutes,
        total_questions,
        instructions,
        source_name,
        license_status,
        verification_status,
        is_active
      )
      VALUES (
        'WAEC',
        $1,
        '2021',
        'May/June',
        'TEST-WAEC-2021-MATH-OBJ',
        'WAEC General Mathematics 2021 Objective',
        'objective',
        90,
        50,
        'TEST DATA ONLY. Replace with properly licensed and verified examination material before production.',
        'EduDrill Test Dataset',
        'pending',
        'pending',
        TRUE
      )
      ON CONFLICT (
        exam,
        subject_id,
        year,
        session,
        paper_code
      )
      DO NOTHING
      `,
      [subjectId],
    )

    console.log(
      "Test past paper created successfully.",
    )

    console.log(
      "WAEC → General Mathematics → 2021",
    )
  } catch (error) {
    console.error(
      "Past paper seed failed:",
    )

    console.error(error)
  } finally {
    await pool.end()
  }
}

seedPastPapers()