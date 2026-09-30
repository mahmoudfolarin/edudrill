const express = require("express")

const {
  registerProduct,
  getProducts,
  revokeProduct,
} = require("../controllers/productController")

const router = express.Router()

router.post(
  "/register",
  registerProduct,
)

router.get(
  "/",
  getProducts,
)

router.patch(
  "/:id/revoke",
  revokeProduct,
)

module.exports = router