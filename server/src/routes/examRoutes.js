const express = require("express")

const {
  getExamSubjects,
} = require("../controllers/examController")

const router = express.Router()

router.get("/:exam/subjects", getExamSubjects)

module.exports = router