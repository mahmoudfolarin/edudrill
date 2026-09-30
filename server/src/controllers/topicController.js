const pool = require("../config/database")

async function getTopic(req, res) {
  const { topicId } = req.params

  try {
    const topicResult = await pool.query(
      `
      SELECT
        t.id,
        t.title,
        t.slug,
        t.description,
        t.topic_order,
        s.id AS syllabus_id,
        s.exam,
        s.syllabus_year,
        sub.name AS subject_name,
        sub.slug AS subject_slug
      FROM topics t
      JOIN syllabuses s
        ON t.syllabus_id = s.id
      JOIN subjects sub
        ON s.subject_id = sub.id
      WHERE
        t.id = $1
        AND t.is_active = TRUE
        AND s.is_active = TRUE
      `,
      [topicId],
    )

    if (topicResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Topic not found",
      })
    }

    const topic = topicResult.rows[0]

    const subtopicsResult = await pool.query(
      `
      SELECT
        id,
        title,
        slug,
        description,
        subtopic_order
      FROM subtopics
      WHERE
        topic_id = $1
        AND is_active = TRUE
      ORDER BY subtopic_order ASC
      `,
      [topicId],
    )

    const lessonsResult = await pool.query(
      `
      SELECT
        id,
        title,
        slug,
        content,
        lesson_order,
        subtopic_id
      FROM lessons
      WHERE
        topic_id = $1
        AND is_active = TRUE
      ORDER BY lesson_order ASC
      `,
      [topicId],
    )

    res.json({
      success: true,
      topic: {
        id: topic.id,
        title: topic.title,
        slug: topic.slug,
        description: topic.description,
        topic_order: topic.topic_order,
        exam: topic.exam,
        syllabus_year: topic.syllabus_year,
        subject_name: topic.subject_name,
        subject_slug: topic.subject_slug,
        subtopics: subtopicsResult.rows,
        lessons: lessonsResult.rows,
      },
    })
  } catch (error) {
    console.error(
      "Get topic error:",
      error,
    )

    res.status(500).json({
      success: false,
      message: "Failed to retrieve topic",
    })
  }
}
async function getLesson(req, res) {
  const { lessonId } = req.params

  try {
    const result = await pool.query(
      `
      SELECT
        l.id,
        l.title,
        l.slug,
        l.content,
        l.lesson_order,
        l.subtopic_id,
        t.id AS topic_id,
        t.title AS topic_title,
        t.slug AS topic_slug,
        s.exam,
        s.syllabus_year,
        sub.name AS subject_name,
        sub.slug AS subject_slug
      FROM lessons l
      JOIN topics t
        ON l.topic_id = t.id
      JOIN syllabuses s
        ON t.syllabus_id = s.id
      JOIN subjects sub
        ON s.subject_id = sub.id
      WHERE
        l.id = $1
        AND l.is_active = TRUE
        AND t.is_active = TRUE
        AND s.is_active = TRUE
      `,
      [lessonId],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Lesson not found",
      })
    }

    res.json({
      success: true,
      lesson: result.rows[0],
    })
  } catch (error) {
    console.error(
      "Get lesson error:",
      error,
    )

    res.status(500).json({
      success: false,
      message: "Failed to retrieve lesson",
    })
  }
}

module.exports = {
  getTopic,
  getLesson,
}