const pool = require("../config/database")

async function getSyllabus(req, res) {
  const { exam, subject } = req.params

  try {
    const syllabusResult = await pool.query(
      `
      SELECT
        s.id,
        s.exam,
        s.syllabus_year,
        s.title,
        s.description,
        s.verification_status,
        s.source_name
      FROM syllabuses s
      JOIN subjects sub
        ON s.subject_id = sub.id
      JOIN syllabus_exams se
        ON se.syllabus_id = s.id
      JOIN exams e
        ON se.exam_id = e.id
      WHERE
        LOWER(e.slug) = LOWER($1)
        AND sub.slug = $2
        AND s.is_active = TRUE
        AND se.is_active = TRUE
        AND e.is_active = TRUE
      ORDER BY s.created_at DESC
      LIMIT 1
      `,
      [exam, subject],
    )

    if (syllabusResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "No syllabus has been published for this subject yet",
      })
    }

    const syllabus = syllabusResult.rows[0]

    const topicsResult = await pool.query(
      `
      SELECT
        id,
        title,
        slug,
        description,
        topic_order
      FROM topics
      WHERE
        syllabus_id = $1
        AND is_active = TRUE
      ORDER BY topic_order ASC
      `,
      [syllabus.id],
    )

    res.json({
      success: true,
      syllabus: {
        id: syllabus.id,
        exam: syllabus.exam,
        syllabus_year: syllabus.syllabus_year,
        title: syllabus.title,
        description: syllabus.description,
        verification_status: syllabus.verification_status,
        source_name: syllabus.source_name,
        topics: topicsResult.rows,
      },
    })
  } catch (error) {
    console.error("Get syllabus error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to retrieve syllabus",
    })
  }
}

module.exports = {
  getSyllabus,
}