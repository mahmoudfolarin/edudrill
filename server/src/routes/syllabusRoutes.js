const express = require("express")

const {
  getSyllabus,
} = require("../controllers/syllabusController")

const router = express.Router()

router.get(
  "/:exam/:subject",
  getSyllabus,
)

module.exports = router