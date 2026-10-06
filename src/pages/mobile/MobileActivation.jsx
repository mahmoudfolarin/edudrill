import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function MobileActivation() {
  const [productKey, setProductKey] = useState("")
  const [activationKey, setActivationKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [message, setMessage] = useState("")
  const [license, setLicense] = useState(null)
  const [copied, setCopied] = useState("")

  // =====================================================
  // LOAD PRODUCT KEY / EXISTING LICENSE
  // =====================================================

  useEffect(() => {
    async function initializeProduct() {
      try {
        // -------------------------------------------------
        // 1. Check for an existing activated license
        // -------------------------------------------------

        const savedLicense =
          localStorage.getItem("edudrill_license")

        if (savedLicense) {
          const parsedLicense =
            JSON.parse(savedLicense)

          if (
            parsedLicense &&
            (
              parsedLicense.status === "Active" ||
              parsedLicense.status === "active"
            )
          ) {
            setLicense({
              productKey:
                parsedLicense.product_key,
              activationKey:
                parsedLicense.activation_key,
              status:
                parsedLicense.status,
              activatedAt:
                parsedLicense.activated_at,
            })

            setProductKey(
              parsedLicense.product_key,
            )

            setLoadingProduct(false)

            return
          }
        }

        // -------------------------------------------------
        // 2. Get or create a Device Identifier
        // -------------------------------------------------

        let deviceIdentifier =
          localStorage.getItem(
            "edudrill_device_id",
          )

        if (!deviceIdentifier) {
          deviceIdentifier =
            crypto.randomUUID()

          localStorage.setItem(
            "edudrill_device_id",
            deviceIdentifier,
          )
        }

        // -------------------------------------------------
        // 3. Register / restore this device
        // -------------------------------------------------

        const response = await fetch(
          "/api/products/register",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify({
              deviceIdentifier,
              deviceName:
                navigator.userAgent ||
                "EduDrill Device",
            }),
          },
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to register this device",
          )
        }

        // -------------------------------------------------
        // 4. Get Product Key from backend
        // -------------------------------------------------

        const generatedProductKey =
          data.product.product_key

        // -------------------------------------------------
        // 5. Save Product Key locally
        // -------------------------------------------------

        localStorage.setItem(
          "edudrill_product_key",
          generatedProductKey,
        )

        // -------------------------------------------------
        // 6. Display Product Key
        // -------------------------------------------------

        setProductKey(
          generatedProductKey,
        )
      } catch (error) {
        console.error(
          "Product initialization error:",
          error,
        )

        setMessage(
          "Unable to generate your Product Key. Please make sure the EduDrill server is running.",
        )
      } finally {
        setLoadingProduct(false)
      }
    }

    initializeProduct()
  }, [])

  // =====================================================
  // ACTIVATE PRODUCT
  // =====================================================

  async function handleActivation(event) {
    event.preventDefault()

    setMessage("")

    if (!productKey) {
      setMessage(
        "Your Product Key has not been generated yet.",
      )

      return
    }

    if (!activationKey.trim()) {
      setMessage(
        "Please enter your Activation Key.",
      )

      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        "/api/activation-keys/activate",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

         body: JSON.stringify({
  productKey,
  activationKey:
    activationKey.trim(),
  deviceIdentifier:
    localStorage.getItem(
      "edudrill_device_id",
    ),
}),
        },
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        setMessage(
          data.message ||
            "Activation failed.",
        )

        return
      }

      // -------------------------------------------------
      // Save activated license
      // -------------------------------------------------

      const savedLicense = {
        product_key: productKey,

        activation_key:
          activationKey.trim(),

        status:
          data.license.status,

        activated_at:
          data.license.activated_at,
      }

      localStorage.setItem(
        "edudrill_license",
        JSON.stringify(savedLicense),
      )

      // -------------------------------------------------
      // Keep Product Key saved separately
      // -------------------------------------------------

      localStorage.setItem(
        "edudrill_product_key",
        productKey,
      )

      // -------------------------------------------------
      // Display activated license
      // -------------------------------------------------

      setLicense({
        productKey:
          savedLicense.product_key,

        activationKey:
          savedLicense.activation_key,

        status:
          savedLicense.status,

        activatedAt:
          savedLicense.activated_at,
      })
    } catch (error) {
      console.error(
        "Activation error:",
        error,
      )

      setMessage(
        "Unable to connect to the EduDrill server. Please make sure the backend is running.",
      )
    } finally {
      setLoading(false)
    }
  }

  // =====================================================
  // COPY KEY
  // =====================================================

  async function copyKey(key, type) {
    try {
      await navigator.clipboard.writeText(key)

      setCopied(type)

      setTimeout(() => {
        setCopied("")
      }, 1800)
    } catch (error) {
      console.error(
        "Copy failed:",
        error,
      )
    }
  }

  // =====================================================
  // CLOSE
  // =====================================================

  function closeActivation() {
    window.location.href = "/"
  }

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loadingProduct) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8fafc', padding: '24px' }}>
        <div style={{ background: 'white', padding: '32px 24px', borderRadius: '24px', width: '100%', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "80px", height: "80px", borderRadius: "50%", marginBottom: '16px' }} />
          <h1 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '8px' }}>Preparing Product</h1>
          <p style={{ color: '#64748b', fontSize: '15px' }}>EduDrill is securely preparing this installation...</p>
        </div>
      </main>
    )
  }

  // =====================================================
  // ACTIVATION PAGE
  // =====================================================

  const whatsappMessage = `Hello Acadex Support 👋 I want to activate my EduDrill product and would like to purchase an Activation Key. 🔑 My Product Key: ${productKey || '[DYNAMIC_KEY]'} Please send me the payment information and activation key. Thank you. EduDrill | Acadex`;

  const whatsappUrl = `https://wa.me/2349135055095?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '16px', display: 'flex', flexDirection: 'column' }}>

      {!license ? (

        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', flex: 1, display: 'flex', flexDirection: 'column' }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "64px", height: "64px", borderRadius: "50%", marginBottom: '12px' }} />
            <p style={{ color: '#2563eb', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>PRODUCT ACTIVATION</p>
            <h1 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '8px' }}>Activate EduDrill</h1>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>Enter your Activation Key to activate EduDrill for this device.</p>
          </div>

          {/* PRODUCT KEY */}
          <div style={{ background: '#f1f5f9', borderRadius: '16px', padding: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase' }}>Your Product Key</span>
              <strong style={{ display: 'block', fontSize: '16px', color: '#0f172a', marginTop: '4px', wordBreak: 'break-all' }}>{productKey}</strong>
            </div>
            <button
              type="button"
              onClick={() => copyKey(productKey, "product")}
              style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontWeight: 'bold', color: '#475569' }}
            >
              {copied === "product" ? "Copied" : "Copy"}
            </button>
          </div>

          {/* ACTIVATION FORM */}
          <form onSubmit={handleActivation} style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="activationKey" style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>Activation Key</label>
              <input
                id="activationKey"
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={activationKey}
                onChange={(e) => setActivationKey(e.target.value)}
                disabled={loading}
                style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '16px', outline: 'none' }}
              />
            </div>

            {message && (
              <div style={{ padding: '12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', fontSize: '14px', marginBottom: '24px', textAlign: 'center' }}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: '#123b72', color: 'white', padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: 'bold', border: 'none', marginBottom: '24px' }}
            >
              {loading ? "Activating..." : "Activate Product"}
            </button>
          </form>

          {/* HELP */}
          <div style={{ textAlign: 'center', marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #f1f5f9' }}>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Need an activation key? Contact Acadex</p>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '100%', background: '#25D366', color: 'white', padding: '16px', borderRadius: '16px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}>
              Purchase on WhatsApp
            </a>
          </div>

          <Link to="/" style={{ display: 'block', textAlign: 'center', color: '#64748b', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold', marginTop: '24px' }}>
            ← Back to EduDrill
          </Link>

        </div>

      ) : (

        /* =================================================
           ALREADY ACTIVATED
           ================================================= */

        <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          
          <div style={{ width: '64px', height: '64px', background: '#dcfce7', color: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 24px auto' }}>
            ✓
          </div>

          <p style={{ color: '#16a34a', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '4px' }}>ACTIVE LICENSE</p>
          <h1 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '12px' }}>Product Activated</h1>
          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5', marginBottom: '32px' }}>This product is linked to an active EduDrill license.</p>

          <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px', textAlign: 'left', marginBottom: '32px' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>ACTIVATION KEY</span>
                <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a', marginTop: '4px' }}>{license.activationKey}</strong>
              </div>
              <button onClick={() => copyKey(license.activationKey, "activation")} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px 10px', fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>
                {copied === "activation" ? "Copied" : "Copy"}
              </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 'bold' }}>PRODUCT KEY</span>
                <strong style={{ display: 'block', fontSize: '14px', color: '#0f172a', marginTop: '4px' }}>{license.productKey}</strong>
              </div>
              <button onClick={() => copyKey(license.productKey, "product")} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '6px 10px', fontSize: '11px', fontWeight: 'bold', color: '#475569' }}>
                {copied === "product" ? "Copied" : "Copy"}
              </button>
            </div>

          </div>

          <button onClick={closeActivation} style={{ width: '100%', background: '#f1f5f9', color: '#1e293b', padding: '16px', borderRadius: '16px', fontSize: '16px', fontWeight: 'bold', border: 'none', marginBottom: '16px' }}>
            Close
          </button>
          
          <p style={{ fontSize: '12px', color: '#94a3b8' }}>Your activation information is safely stored.</p>
        </div>

      )}

    </main>
  )
}

export default MobileActivation