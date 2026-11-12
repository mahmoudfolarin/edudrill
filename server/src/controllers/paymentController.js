const crypto = require("crypto")
const pool = require("../config/database")

// =====================================================
// HELPER: GENERATE ACTIVATION KEY
// =====================================================

function generateActivationKey() {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  const makePart = () => {
    let part = ""
    for (let i = 0; i < 4; i++) {
      part += characters[Math.floor(Math.random() * characters.length)]
    }
    return part
  }
  return `EDU-${makePart()}-${makePart()}-${makePart()}`
}

// Ensure payment_transactions table exists
async function ensurePaymentTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payment_transactions (
        id SERIAL PRIMARY KEY,
        reference VARCHAR(255) UNIQUE NOT NULL,
        amount_kobo BIGINT NOT NULL,
        email VARCHAR(255),
        product_key VARCHAR(255),
        activation_key VARCHAR(255),
        device_identifier VARCHAR(255),
        status VARCHAR(50) DEFAULT 'success',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `)
  } catch (err) {
    console.debug("[PAYMENT] Note ensuring payment table:", err.message)
  }
}
ensurePaymentTable()

// =====================================================
// GET PAYMENT CONFIG (PUBLIC KEY & CURRENT PRICE)
// =====================================================

async function getPaymentConfig(req, res) {
  try {
    const publicKey = process.env.PAYSTACK_PUBLIC_KEY || "pk_test_0cfaae914c051fd4b8ca4c940a4d6dc7bb1596fd"
    const amountNaira = Number(process.env.ACTIVATION_FEE_NAIRA || 2500)

    res.json({
      success: true,
      publicKey,
      amountNaira,
      currency: "NGN",
    })
  } catch (error) {
    console.error("Get payment config error:", error)
    res.status(500).json({ success: false, message: "Could not fetch payment configuration" })
  }
}

// =====================================================
// INITIALIZE PAYMENT WITH PAYSTACK
// =====================================================

async function initializePayment(req, res) {
  const { email, productKey, deviceIdentifier, deviceName } = req.body

  if (!email || !productKey) {
    return res.status(400).json({
      success: false,
      message: "Valid email address and Product Key are required to start payment.",
    })
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY || "sk_test_c12a25d9f0eac0b79ee67bd9e829807e5c41be0b"
  const amountNaira = Number(process.env.ACTIVATION_FEE_NAIRA || 2500)
  const amountKobo = amountNaira * 100 // Paystack uses Kobo
  const reference = `EDUPAY_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`

  try {
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountKobo,
        reference,
        channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
        metadata: {
          productKey,
          deviceIdentifier: deviceIdentifier || "device_unknown",
          deviceName: deviceName || "EduDrill Student",
          app: "EduDrill CBT & Learning",
        },
      }),
    })

    const data = await paystackRes.json()

    if (!paystackRes.ok || !data.status) {
      return res.status(400).json({
        success: false,
        message: data.message || "Failed to initialize payment with Paystack.",
      })
    }

    res.json({
      success: true,
      message: "Payment initialized successfully",
      reference,
      amountNaira,
      authorizationUrl: data.data.authorization_url,
      accessCode: data.data.access_code,
    })
  } catch (error) {
    console.error("Initialize payment error:", error)
    res.status(500).json({
      success: false,
      message: "Unable to connect to Paystack payment gateway. Please check your internet.",
    })
  }
}

// =====================================================
// VERIFY PAYMENT & AUTO-ACTIVATE PRODUCT
// =====================================================

async function verifyPayment(req, res) {
  const { reference, productKey, deviceIdentifier } = req.body

  if (!reference || !productKey) {
    return res.status(400).json({
      success: false,
      message: "Transaction reference and Product Key are required for verification.",
    })
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY || "sk_test_c12a25d9f0eac0b79ee67bd9e829807e5c41be0b"
  const expectedNaira = Number(process.env.ACTIVATION_FEE_NAIRA || 2500)
  const expectedKobo = expectedNaira * 100

  const client = await pool.connect()

  try {
    // 1. Query Paystack server to verify transaction
    const paystackRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secretKey}`,
      },
    })

    const verifyData = await paystackRes.json()

    if (!paystackRes.ok || !verifyData.status || verifyData.data.status !== "success") {
      return res.status(400).json({
        success: false,
        message: "Payment could not be confirmed with Paystack or was unsuccessful.",
      })
    }

    const tx = verifyData.data
    if (tx.amount < expectedKobo) {
      return res.status(400).json({
        success: false,
        message: `Payment amount (${tx.amount / 100} NGN) is less than the required activation fee (${expectedNaira} NGN).`,
      })
    }

    // 2. Database transaction for atomic activation
    await client.query("BEGIN")

    // Check if reference already processed (prevent replay)
    const existingTx = await client.query(
      "SELECT * FROM payment_transactions WHERE reference = $1 FOR UPDATE",
      [reference]
    )

    if (existingTx.rows.length > 0) {
      // Transaction already processed! Return the activated license
      await client.query("ROLLBACK")
      const lic = await pool.query(
        "SELECT * FROM product_licenses WHERE product_key = $1",
        [productKey]
      )
      return res.json({
        success: true,
        message: "Product is already activated with this payment reference.",
        license: lic.rows[0],
      })
    }

    // 3. Ensure Product & Device are registered in the DB
    let licenseResult = await client.query(
      "SELECT * FROM product_licenses WHERE product_key = $1 FOR UPDATE",
      [productKey]
    )

    let licenseId
    if (licenseResult.rows.length === 0) {
      // Auto-register license record if missing
      const newLic = await client.query(
        "INSERT INTO product_licenses (product_key, status) VALUES ($1, 'Inactive') RETURNING *",
        [productKey]
      )
      licenseId = newLic.rows[0].id
    } else {
      licenseId = licenseResult.rows[0].id
    }

    if (deviceIdentifier) {
      const devRes = await client.query(
        "SELECT * FROM devices WHERE device_identifier = $1",
        [deviceIdentifier]
      )
      if (devRes.rows.length === 0) {
        await client.query(
          "INSERT INTO devices (device_identifier, device_name, product_license_id, last_seen_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)",
          [deviceIdentifier, tx.customer?.email || "EduDrill Student", licenseId]
        )
      } else {
        await client.query(
          "UPDATE devices SET product_license_id = $1, last_seen_at = CURRENT_TIMESTAMP WHERE id = $2",
          [licenseId, devRes.rows[0].id]
        )
      }
    }

    // 4. Find an unused Activation Key, or generate one immediately
    let keyResult = await client.query(
      "SELECT * FROM activation_keys WHERE status = 'Unused' LIMIT 1 FOR UPDATE"
    )

    let activationKeyObj
    if (keyResult.rows.length > 0) {
      activationKeyObj = keyResult.rows[0]
    } else {
      // Mint a fresh valid key
      let newKeyCode = generateActivationKey()
      const newKeyRes = await client.query(
        "INSERT INTO activation_keys (key_code, license_type, status) VALUES ($1, 'Standard', 'Unused') RETURNING *",
        [newKeyCode]
      )
      activationKeyObj = newKeyRes.rows[0]
    }

    // 5. Activate the Product License
    const updatedLic = await client.query(
      `
      UPDATE product_licenses
      SET
        activation_key_id = $1,
        status = 'Active',
        activated_at = CURRENT_TIMESTAMP,
        last_seen_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
      `,
      [activationKeyObj.id, licenseId]
    )

    // 6. Mark Activation Key as Active
    await client.query(
      `
      UPDATE activation_keys
      SET
        status = 'Active',
        activated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      `,
      [activationKeyObj.id]
    )

    // 7. Record Payment in payment_transactions
    await client.query(
      `
      INSERT INTO payment_transactions
      (reference, amount_kobo, email, product_key, activation_key, device_identifier, status)
      VALUES ($1, $2, $3, $4, $5, $6, 'success')
      `,
      [
        reference,
        tx.amount,
        tx.customer?.email || "",
        productKey,
        activationKeyObj.key_code,
        deviceIdentifier || "",
      ]
    )

    await client.query("COMMIT")

    const finalLicense = updatedLic.rows[0]

    res.json({
      success: true,
      message: "Payment verified and EduDrill activated successfully!",
      license: {
        product_key: finalLicense.product_key,
        activation_key: activationKeyObj.key_code,
        status: "Active",
        activated_at: finalLicense.activated_at,
      },
    })
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Payment verification error:", error)
    res.status(500).json({
      success: false,
      message: "An error occurred during payment verification. Please contact support.",
    })
  } finally {
    client.release()
  }
}

module.exports = {
  getPaymentConfig,
  initializePayment,
  verifyPayment,
}

