const express = require("express")

const {
  getPastPapers,
  getPastPaper,
} = require("../controllers/pastPaperController")

const router = express.Router()

router.get("/", getPastPapers)

router.get("/:paperId", getPastPaper)

module.exports = router