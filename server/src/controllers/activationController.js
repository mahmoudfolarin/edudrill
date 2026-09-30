const pool = require("../config/database")


// =====================================================
// GENERATE ACTIVATION KEY
// =====================================================

function generateActivationKey() {
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

  return `EDU-${makePart()}-${makePart()}-${makePart()}`
}


// =====================================================
// CREATE ACTIVATION KEY
// =====================================================

async function createActivationKey(req, res) {
  try {
    const keyCode = generateActivationKey()

    const result = await pool.query(
      `
      INSERT INTO activation_keys
      (key_code, license_type, status)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [
        keyCode,
        "Standard",
        "Unused",
      ],
    )

    res.status(201).json({
      success: true,
      message: "Activation key created",
      activationKey: result.rows[0],
    })
  } catch (error) {
    console.error(
      "Activation key error:",
      error,
    )

    res.status(500).json({
      success: false,
      message:
        "Failed to create activation key",
    })
  }
}


// =====================================================
// GET ALL ACTIVATION KEYS
// =====================================================

async function getActivationKeys(req, res) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM activation_keys
      ORDER BY created_at DESC
      `,
    )

    res.json({
      success: true,
      activationKeys: result.rows,
    })
  } catch (error) {
    console.error(
      "Get activation keys error:",
      error,
    )

    res.status(500).json({
      success: false,
      message:
        "Failed to retrieve activation keys",
    })
  }
}


// =====================================================
// ACTIVATE PRODUCT
// =====================================================

async function activateProduct(req, res) {
  const {
    productKey,
    activationKey,
    deviceIdentifier,
  } = req.body


  // -------------------------------------------------
  // 1. Check required information
  // -------------------------------------------------

  if (
    !productKey ||
    !activationKey ||
    !deviceIdentifier
  ) {
    return res.status(400).json({
      success: false,
      message:
        "Product Key, Activation Key and Device Identifier are required",
    })
  }


  const client = await pool.connect()


  try {

    // -------------------------------------------------
    // 2. Start transaction
    // -------------------------------------------------

    await client.query("BEGIN")


    // -------------------------------------------------
    // 3. Find Activation Key
    // -------------------------------------------------

    const activationResult =
      await client.query(
        `
        SELECT *
        FROM activation_keys
        WHERE key_code = $1
        FOR UPDATE
        `,
        [activationKey],
      )


    if (
      activationResult.rows.length === 0
    ) {
      await client.query("ROLLBACK")

      return res.status(404).json({
        success: false,
        message:
          "Invalid Activation Key",
      })
    }


    const activation =
      activationResult.rows[0]


    // -------------------------------------------------
    // 4. Check Activation Key status
    // -------------------------------------------------

    if (
      activation.status !== "Unused"
    ) {
      await client.query("ROLLBACK")

      return res.status(409).json({
        success: false,
        message:
          "This Activation Key has already been used",
      })
    }


    // -------------------------------------------------
    // 5. Check Activation Key expiration
    // -------------------------------------------------

    if (
      activation.expiration_date &&
      new Date(
        activation.expiration_date,
      ) < new Date()
    ) {
      await client.query("ROLLBACK")

      return res.status(409).json({
        success: false,
        message:
          "This Activation Key has expired",
      })
    }


    // -------------------------------------------------
    // 6. Find Product License
    // -------------------------------------------------

    const existingLicense =
      await client.query(
        `
        SELECT *
        FROM product_licenses
        WHERE product_key = $1
        FOR UPDATE
        `,
        [productKey],
      )


    if (
      existingLicense.rows.length === 0
    ) {
      await client.query("ROLLBACK")

      return res.status(404).json({
        success: false,
        message:
          "This Product Key is not registered",
      })
    }


    const license =
      existingLicense.rows[0]


    // -------------------------------------------------
    // 7. Check Product License status
    // -------------------------------------------------

    if (
      license.status === "Active"
    ) {
      await client.query("ROLLBACK")

      return res.status(409).json({
        success: false,
        message:
          "This Product Key has already been activated",
      })
    }


    // -------------------------------------------------
    // 8. Verify Device
    // -------------------------------------------------

    const deviceResult =
      await client.query(
        `
        SELECT *
        FROM devices
        WHERE device_identifier = $1
        FOR UPDATE
        `,
        [deviceIdentifier],
      )


    if (
      deviceResult.rows.length === 0
    ) {
      await client.query("ROLLBACK")

      return res.status(404).json({
        success: false,
        message:
          "This device is not registered with EduDrill",
      })
    }


    const device =
      deviceResult.rows[0]


    // -------------------------------------------------
    // 9. Make sure Product License belongs
    //    to this Device
    // -------------------------------------------------

    if (
      device.product_license_id !==
      license.id
    ) {
      await client.query("ROLLBACK")

      return res.status(409).json({
        success: false,
        message:
          "This Product Key does not belong to this device",
      })
    }


    // -------------------------------------------------
    // 10. Activate Product License
    // -------------------------------------------------

    const licenseResult =
      await client.query(
        `
        UPDATE product_licenses
        SET
          activation_key_id = $1,
          status = $2,
          activated_at =
            CURRENT_TIMESTAMP,
          last_seen_at =
            CURRENT_TIMESTAMP
        WHERE id = $3
        RETURNING *
        `,
        [
          activation.id,
          "Active",
          license.id,
        ],
      )


    // -------------------------------------------------
    // 11. Update Device
    // -------------------------------------------------

    await client.query(
      `
      UPDATE devices
      SET
        last_seen_at =
          CURRENT_TIMESTAMP
      WHERE id = $1
      `,
      [device.id],
    )


    // -------------------------------------------------
    // 12. Mark Activation Key as Active
    // -------------------------------------------------

    await client.query(
      `
      UPDATE activation_keys
      SET
        status = 'Active',
        activated_at =
          CURRENT_TIMESTAMP
      WHERE id = $1
      `,
      [activation.id],
    )


    // -------------------------------------------------
    // 13. Complete transaction
    // -------------------------------------------------

    await client.query("COMMIT")


    // -------------------------------------------------
    // 14. Send success response
    // -------------------------------------------------

    res.status(200).json({
      success: true,
      message:
        "EduDrill activated successfully",
      license:
        licenseResult.rows[0],
    })


  } catch (error) {

    // -------------------------------------------------
    // Rollback if something fails
    // -------------------------------------------------

    await client.query("ROLLBACK")

    console.error(
      "Product activation error:",
      error,
    )

    res.status(500).json({
      success: false,
      message:
        "Product activation failed",
    })

  } finally {

    client.release()
  }
}


// =====================================================
// EXPORT CONTROLLERS
// =====================================================

module.exports = {
  createActivationKey,
  getActivationKeys,
  activateProduct,
}