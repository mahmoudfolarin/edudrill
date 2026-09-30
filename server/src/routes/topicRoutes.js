const express = require("express")

const {
  getTopic,
  getLesson,
} = require("../controllers/topicController")
const router = express.Router()

router.get(
  "/:topicId",
  getTopic,
)
router.get(
  "/lessons/:lessonId",
  getLesson,
)

module.exports = router