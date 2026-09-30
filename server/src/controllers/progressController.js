const pool = require("../config/database")


// =====================================================
// GET LESSON PROGRESS
// =====================================================

async function getLessonProgress(req, res) {
  const {
    deviceIdentifier,
    lessonId,
  } = req.query

  if (!deviceIdentifier || !lessonId) {
    return res.status(400).json({
      success: false,
      message:
        "Device identifier and lesson ID are required",
    })
  }

  try {
    const result = await pool.query(
      `
      SELECT
        lp.id,
        lp.lesson_id,
        lp.completed,
        lp.completed_at,
        lp.updated_at
      FROM lesson_progress lp
      JOIN devices d
        ON d.id = lp.device_id
      WHERE
        d.device_identifier = $1
        AND lp.lesson_id = $2
      LIMIT 1
      `,
      [
        deviceIdentifier,
        lessonId,
      ],
    )

    if (result.rows.length === 0) {
      return res.json({
        success: true,
        completed: false,
        progress: null,
      })
    }

    res.json({
      success: true,
      completed:
        result.rows[0].completed,
      progress:
        result.rows[0],
    })
  } catch (error) {
    console.error(
      "Get lesson progress error:",
      error,
    )

    res.status(500).json({
      success: false,
      message:
        "Failed to retrieve lesson progress",
    })
  }
}


// =====================================================
// MARK LESSON COMPLETE
// =====================================================

async function completeLesson(req, res) {
  const {
    deviceIdentifier,
    lessonId,
  } = req.body

  if (!deviceIdentifier || !lessonId) {
    return res.status(400).json({
      success: false,
      message:
        "Device identifier and lesson ID are required",
    })
  }

  try {

    // -------------------------------------------------
    // Find device
    // -------------------------------------------------

    const deviceResult = await pool.query(
      `
      SELECT
        id,
        product_license_id
      FROM devices
      WHERE device_identifier = $1
      LIMIT 1
      `,
      [deviceIdentifier],
    )

    if (deviceResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message:
          "Device is not registered",
      })
    }

    const device =
      deviceResult.rows[0]


    // -------------------------------------------------
    // Check active license
    // -------------------------------------------------

    const licenseResult =
      await pool.query(
        `
        SELECT
          id,
          status
        FROM product_licenses
        WHERE id = $1
        LIMIT 1
        `,
        [device.product_license_id],
      )

    if (
      licenseResult.rows.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Product license not found",
      })
    }

    const license =
      licenseResult.rows[0]

    if (
      license.status !== "Active"
    ) {
      return res.status(403).json({
        success: false,
        message:
          "An active EduDrill license is required",
      })
    }


    // -------------------------------------------------
    // Check lesson exists
    // -------------------------------------------------

    const lessonResult =
      await pool.query(
        `
        SELECT id
        FROM lessons
        WHERE id = $1
        LIMIT 1
        `,
        [lessonId],
      )

    if (
      lessonResult.rows.length === 0
    ) {
      return res.status(404).json({
        success: false,
        message:
          "Lesson not found",
      })
    }


    // -------------------------------------------------
    // Save progress
    // -------------------------------------------------

    const result = await pool.query(
      `
      INSERT INTO lesson_progress
      (
        device_id,
        lesson_id,
        completed,
        completed_at,
        updated_at
      )
      VALUES
      (
        $1,
        $2,
        TRUE,
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
      )
      ON CONFLICT
      (
        device_id,
        lesson_id
      )
      DO UPDATE SET
        completed = TRUE,
        completed_at =
          COALESCE(
            lesson_progress.completed_at,
            CURRENT_TIMESTAMP
          ),
        updated_at =
          CURRENT_TIMESTAMP
      RETURNING *
      `,
      [
        device.id,
        lessonId,
      ],
    )


    // -------------------------------------------------
    // Update device last seen
    // -------------------------------------------------

    await pool.query(
      `
      UPDATE devices
      SET last_seen_at =
        CURRENT_TIMESTAMP
      WHERE id = $1
      `,
      [device.id],
    )


    res.json({
      success: true,
      message:
        "Lesson marked as complete",
      progress:
        result.rows[0],
    })

  } catch (error) {

    console.error(
      "Complete lesson error:",
      error,
    )

    res.status(500).json({
      success: false,
      message:
        "Failed to save lesson progress",
    })
  }
}


// =====================================================
// GET ALL COMPLETED LESSONS
// =====================================================

async function getAllProgress(req, res) {
  const { deviceIdentifier } = req.query

  if (!deviceIdentifier) {
    return res.status(400).json({
      success: false,
      message: "Device identifier is required",
    })
  }

  try {
    const result = await pool.query(
      `
      SELECT lp.lesson_id
      FROM lesson_progress lp
      JOIN devices d ON d.id = lp.device_id
      WHERE d.device_identifier = $1 AND lp.completed = TRUE
      `,
      [deviceIdentifier],
    )

    const completedLessonIds = result.rows.map(row => row.lesson_id)

    res.json({
      success: true,
      completedLessonIds,
    })
  } catch (error) {
    console.error("Get all progress error:", error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve progress",
    })
  }
}

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  getLessonProgress,
  completeLesson,
  getAllProgress,
}