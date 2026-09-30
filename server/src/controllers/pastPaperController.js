const pool = require("../config/database")

async function getPastPapers(req, res) {
  const { exam, subject, year } = req.query

  try {
    const values = []
    const conditions = ["p.is_active = TRUE"]

    if (exam) {
      values.push(exam.toUpperCase())
      conditions.push(`p.exam = $${values.length}`)
    }

    if (subject) {
      values.push(subject)
      conditions.push(`s.slug = $${values.length}`)
    }

    if (year) {
      values.push(year)
      conditions.push(`p.year = $${values.length}`)
    }

    const result = await pool.query(
      `
      SELECT
        p.id,
        p.exam,
        p.year,
        p.session,
        p.paper_code,
        p.paper_title,
        p.paper_type,
        p.duration_minutes,
        (SELECT COUNT(*)::INTEGER
         FROM questions q
         WHERE q.past_paper_id = p.id
           AND q.is_active = TRUE) AS total_questions,
        p.instructions,
        p.verification_status,
        p.license_status,
        p.source_name,

        s.id AS subject_id,
        s.name AS subject_name,
        s.slug AS subject_slug

      FROM past_papers p

      JOIN subjects s
        ON p.subject_id = s.id

      WHERE ${conditions.join(" AND ")}

      ORDER BY
        p.year DESC,
        p.session ASC,
        p.paper_type ASC
      `,
      values,
    )

    res.json({
      success: true,
      count: result.rows.length,
      papers: result.rows,
    })
  } catch (error) {
    console.error("Get past papers error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to retrieve past papers",
    })
  }
}


async function getPastPaper(req, res) {
  const { paperId } = req.params

  try {
    const paperResult = await pool.query(
      `
      SELECT
        p.id,
        p.exam,
        p.year,
        p.session,
        p.paper_code,
        p.paper_title,
        p.paper_type,
        p.duration_minutes,
        p.total_questions,
        p.instructions,
        p.verification_status,
        p.license_status,
        p.source_name,

        s.id AS subject_id,
        s.name AS subject_name,
        s.slug AS subject_slug

      FROM past_papers p

      JOIN subjects s
        ON p.subject_id = s.id

      WHERE
        p.id = $1
        AND p.is_active = TRUE
      `,
      [paperId],
    )

    if (paperResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Past paper not found",
      })
    }

    const paper = paperResult.rows[0]
    const approvedLicenses = ["authorized", "licensed", "public_domain"]
    if (!approvedLicenses.includes(paper.license_status)) {
      return res.status(403).json({
        success: false,
        message: "This paper is awaiting redistribution rights approval.",
      })
    }

    const questionsResult = await pool.query(
      `
      SELECT
        q.id,
        q.question_number,
        q.paper_section,
        q.question_text,

        q.option_a,
        q.option_b,
        q.option_c,
        q.option_d,

        q.correct_answer,
        q.explanation,
        q.marks,

        q.topic_id,
        q.subtopic_id

      FROM questions q

      WHERE
        q.past_paper_id = $1
        AND q.is_active = TRUE
        AND q.license_status IN ('authorized', 'licensed', 'public_domain')

      ORDER BY q.question_number ASC
      `,
      [paperId],
    )

    res.json({
      success: true,

      paper: {
        ...paper,
        questions: questionsResult.rows,
      },
    })
  } catch (error) {
    console.error("Get past paper error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to retrieve past paper",
    })
  }
}


module.exports = {
  getPastPapers,
  getPastPaper,
}