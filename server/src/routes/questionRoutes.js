const express = require("express")

const {
  getQuestions,
  getQuestion,
  getLessonPractice
} = require("../controllers/questionController")

const router = express.Router()

router.get("/lesson-practice", getLessonPractice)

router.get("/", getQuestions)

router.get("/:questionId", getQuestion)

module.exports = router