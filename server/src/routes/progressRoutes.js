const express = require("express")

const {
  getLessonProgress,
  completeLesson,
  getAllProgress,
} = require("../controllers/progressController")

const router = express.Router()

// Get all completed lessons
router.get(
  "/all",
  getAllProgress,
)

// Get progress for one lesson
router.get(
  "/lesson",
  getLessonProgress,
)


// Mark lesson as complete
router.post(
  "/lesson/complete",
  completeLesson,
)


module.exports = router