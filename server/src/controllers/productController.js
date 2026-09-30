const pool = require("../config/database")

function generateProductKey() {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"

  function makePart() {
    let part = ""

    for (let i = 0; i < 4; i++) {
      part += characters[
        Math.floor(Math.random() * characters.length)
      ]
    }

    return part
  }

  return `EDU-PROD-${makePart()}-${makePart()}`
}

async function registerProduct(req, res) {
  const { deviceIdentifier, deviceName } = req.body

  if (!deviceIdentifier) {
    return res.status(400).json({
      success: false,
      message: "Device identifier is required",
    })
  }

  try {
    // Check whether this device already has a product license
    const existingDevice = await pool.query(
      `
      SELECT
        d.id AS device_id,
        d.device_identifier,
        d.device_name,
        pl.*
      FROM devices d
      JOIN product_licenses pl
        ON d.product_license_id = pl.id
      WHERE d.device_identifier = $1
      `,
      [deviceIdentifier],
    )

    // If the device already exists, return its existing product
    if (existingDevice.rows.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Existing product restored",
        product: existingDevice.rows[0],
      })
    }

    // Generate a unique product key
    let productKey
    let exists = true

    while (exists) {
      productKey = generateProductKey()

      const result = await pool.query(
        `
        SELECT id
        FROM product_licenses
        WHERE product_key = $1
        `,
        [productKey],
      )

      exists = result.rows.length > 0
    }

    // Create product license
    const licenseResult = await pool.query(
      `
      INSERT INTO product_licenses
      (
        product_key,
        status
      )
      VALUES
      (
        $1,
        $2
      )
      RETURNING *
      `,
      [
        productKey,
        "Inactive",
      ],
    )

    const product = licenseResult.rows[0]

    // Register this device
    await pool.query(
      `
      INSERT INTO devices
      (
        product_license_id,
        device_identifier,
        device_name
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      `,
      [
        product.id,
        deviceIdentifier,
        deviceName || "EduDrill Device",
      ],
    )

    res.status(201).json({
      success: true,
      message: "Product registered successfully",
      product,
    })
  } catch (error) {
    console.error(
      "Product registration error:",
      error,
    )

    res.status(500).json({
      success: false,
      message: "Failed to register product",
    })
  }
}

async function getProducts(req, res) {
  try {
    const result = await pool.query(
      `
      SELECT
        pl.id,
        pl.product_key,
        pl.status,
        pl.activated_at,
        pl.last_seen_at,
        pl.created_at,
        ak.key_code AS activation_key,
        ak.license_type,
        ak.expiration_date,
        d.device_identifier,
        d.device_name,
        d.registered_at
      FROM product_licenses pl
      LEFT JOIN activation_keys ak
        ON pl.activation_key_id = ak.id
      LEFT JOIN devices d
        ON d.product_license_id = pl.id
      ORDER BY pl.created_at DESC
      `,
    )

    res.json({
      success: true,
      products: result.rows,
    })
  } catch (error) {
    console.error(
      "Get products error:",
      error,
    )

    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
    })
  }
}

async function revokeProduct(req, res) {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Product license ID is required",
    })
  }

  try {
    const result = await pool.query(
      `
      UPDATE product_licenses
      SET
        status = 'Revoked'
      WHERE id = $1
      RETURNING *
      `,
      [id],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product license not found",
      })
    }

    res.json({
      success: true,
      message:
        "Product license revoked successfully",
      product: result.rows[0],
    })
  } catch (error) {
    console.error(
      "Revoke product error:",
      error,
    )

    res.status(500).json({
      success: false,
      message:
        "Failed to revoke product license",
    })
  }
}

module.exports = {
  registerProduct,
  getProducts,
  revokeProduct,
}