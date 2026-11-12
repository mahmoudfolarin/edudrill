const express = require("express")
const {
  getPaymentConfig,
  initializePayment,
  verifyPayment,
} = require("../controllers/paymentController")

const router = express.Router()

// Get live payment configuration (Public Key & dynamic price)
router.get("/config", getPaymentConfig)

// Initialize Paystack payment session
router.post("/initialize", initializePayment)

// Verify payment and auto-activate product
router.post("/verify", verifyPayment)

module.exports = router

