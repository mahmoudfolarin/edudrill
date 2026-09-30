const pool = require("../config/database")

async function getExamSubjects(req, res) {
  const { exam } = req.params

  try {
    const result = await pool.query(
      `
      SELECT
        s.id,
        s.name,
        s.slug,
        s.subject_group,
        s.icon,
        s.is_new,
        s.is_active
      FROM exam_subjects es
      JOIN exams e
        ON es.exam_id = e.id
      JOIN subjects s
        ON es.subject_id = s.id
      WHERE
        e.slug = $1
        AND e.is_active = TRUE
        AND es.is_active = TRUE
        AND s.is_active = TRUE
      ORDER BY
        CASE s.subject_group
          WHEN 'Core Subjects' THEN 1
          WHEN 'Science' THEN 2
          WHEN 'Humanities' THEN 3
          WHEN 'Business' THEN 4
          WHEN 'Trade / Vocational' THEN 5
          ELSE 6
        END,
        s.name ASC
      `,
      [exam.toLowerCase()],
    )

    res.json({
      success: true,
      exam: exam.toLowerCase(),
      count: result.rows.length,
      subjects: result.rows,
    })
  } catch (error) {
    console.error("Get exam subjects error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to retrieve exam subjects",
    })
  }
}

module.exports = {
  getExamSubjects,
}