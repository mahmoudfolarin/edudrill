const pool = require("../config/database")

async function getAdminStats(req, res) {
  try {
    const result = await pool.query(`
      SELECT
        (SELECT COUNT(*) FROM subjects WHERE is_active = TRUE) AS subjects,
        (SELECT COUNT(*) FROM questions WHERE is_active = TRUE) AS questions,
        (SELECT COUNT(*) FROM past_papers WHERE is_active = TRUE) AS past_papers,
        (SELECT COUNT(*) FROM syllabuses WHERE is_active = TRUE) AS syllabuses,
        (SELECT COUNT(*) FROM topics WHERE is_active = TRUE) AS topics,
        (SELECT COUNT(*) FROM lessons WHERE is_active = TRUE) AS lessons,
        (SELECT COUNT(*) FROM activation_keys) AS activation_keys,
        (SELECT COUNT(*) FROM product_licenses WHERE is_active = TRUE) AS active_licenses
    `)

    const stats = result.rows[0]

    res.json({
      success: true,
      stats: {
        subjects: Number(stats.subjects),
        questions: Number(stats.questions),
        pastPapers: Number(stats.past_papers),
        syllabuses: Number(stats.syllabuses),
        topics: Number(stats.topics),
        lessons: Number(stats.lessons),
        activationKeys: Number(stats.activation_keys),
        activeLicenses: Number(stats.active_licenses),
        users: 0,
      },
    })
  } catch (error) {
    console.error("Get admin stats error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to retrieve admin statistics",
    })
  }
}

module.exports = {
  getAdminStats,
}