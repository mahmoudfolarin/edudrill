const express = require("express")

const {
  getSubjects,
  createSubject,
  deleteSubject
} = require("../controllers/subjectController")

const router = express.Router()

router.get("/", getSubjects)
router.post("/", createSubject)
router.delete("/:id", deleteSubject)

module.exports = router