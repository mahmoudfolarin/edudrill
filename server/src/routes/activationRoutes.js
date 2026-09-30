const express = require("express")

const {
  createActivationKey,
  getActivationKeys,
  activateProduct,
} = require("../controllers/activationController")

const router = express.Router()

// Get all activation keys
router.get("/", getActivationKeys)

// Create a new activation key
router.post("/", createActivationKey)

// Activate an EduDrill installation
router.post("/activate", activateProduct)

module.exports = router