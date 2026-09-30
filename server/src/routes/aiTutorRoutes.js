const express = require("express")

const {
  chatWithTutor,
} = require("../controllers/aiTutorController")

const router = express.Router()

router.post("/chat", chatWithTutor)

module.exports = router