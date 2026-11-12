import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { launchPaystackPayment, getLivePaymentConfig } from "../../utils/paystack"

function MobileActivation() {
  const navigate = useNavigate()
  const [productKey, setProductKey] = useState("")
  const [activationKey, setActivationKey] = useState("")
  const [loading, setLoading] = useState(false)
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [message, setMessage] = useState("")
  const [license, setLicense] = useState(null)
  const [copied, setCopied] = useState("")

  // Payment State
  const [activeTab, setActiveTab] = useState("pay") // "pay" | "manual_key"
  const [email, setEmail] = useState("")
  const [paying, setPaying] = useState(false)
  const [payAmount, setPayAmount] = useState(2500)

  // =====================================================
  // LOAD PRODUCT KEY / EXISTING LICENSE / PAYMENT CONFIG
  // =====================================================

  useEffect(() => {
    async function initializeProduct() {
      try {
        const apiBase = window.desktopApi ? "https://edudrill-1.onrender.com" : (import.meta.env.VITE_API_URL || "")

        // Pre-fill email from registered student data if available
        try {
          const storedUser = localStorage.getItem("student_data")
          if (storedUser) {
            const parsedUser = JSON.parse(storedUser)
            if (parsedUser?.email) setEmail(parsedUser.email)
          }
        } catch (e) {
          console.debug("Student data read notice:", e)
        }

        // Fetch live dynamic payment price
        getLivePaymentConfig(apiBase).then((cfg) => {
          if (cfg?.amountNaira) setPayAmount(cfg.amountNaira)
        })

        // -------------------------------------------------
        // 1. Check for desktop API license first
        // -------------------------------------------------
        if (window.desktopApi) {
          try {
            const deskStatus = await window.desktopApi.getLicenseStatus()
            if (deskStatus && deskStatus.active && deskStatus.license) {
              const parsed = deskStatus.license
              setLicense({
                productKey: parsed.product_key,
                activationKey: parsed.activation_key,
                status: parsed.status,
                activatedAt: parsed.activated_at,
              })
              setProductKey(parsed.product_key)
              localStorage.setItem("edudrill_license", JSON.stringify(parsed))
              localStorage.setItem("edudrill_product_key", parsed.product_key)
              setLoadingProduct(false)
              return
            }
          } catch (e) {
            console.error("Desktop license check error:", e)
          }
        }

        // -------------------------------------------------
        // 2. Check for an existing activated license
        // -------------------------------------------------
        const savedLicense = localStorage.getItem("edudrill_license")

        if (savedLicense) {
          const parsedLicense = JSON.parse(savedLicense)

          if (
            parsedLicense &&
            (parsedLicense.status === "Active" || parsedLicense.status === "active")
          ) {
            setLicense({
              productKey: parsedLicense.product_key,
              activationKey: parsedLicense.activation_key,
              status: parsedLicense.status,
              activatedAt: parsedLicense.activated_at,
            })
            setProductKey(parsedLicense.product_key)
            setLoadingProduct(false)
            return
          }
        }

        // -------------------------------------------------
        // 3. Get or create a Device Identifier
        // -------------------------------------------------
        let deviceIdentifier = localStorage.getItem("edudrill_device_id")

        if (window.desktopApi?.getDeviceId) {
          try {
            deviceIdentifier = await window.desktopApi.getDeviceId()
            localStorage.setItem("edudrill_device_id", deviceIdentifier)
          } catch (err) {
            console.debug("Offline background sync error:", err)
          }
        }

        if (!deviceIdentifier) {
          deviceIdentifier = crypto.randomUUID()
          localStorage.setItem("edudrill_device_id", deviceIdentifier)
        }

        // -------------------------------------------------
        // 4. Get or generate persistent Product Key immediately
        // -------------------------------------------------
        let currentProductKey = localStorage.getItem("edudrill_product_key")

        if (window.desktopApi?.getProductKey) {
          try {
            currentProductKey = await window.desktopApi.getProductKey()
          } catch (err) {
            console.debug("Offline background sync error:", err)
          }
        }

        if (!currentProductKey) {
          const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
          const makePart = () =>
            Array.from({ length: 4 }, () =>
              characters[Math.floor(Math.random() * characters.length)]
            ).join("")
          currentProductKey = `EDU-PROD-${makePart()}-${makePart()}`
        }

        localStorage.setItem("edudrill_product_key", currentProductKey)
        setProductKey(currentProductKey)
        setLoadingProduct(false)

        // -------------------------------------------------
        // 5. Background sync with backend if online
        // -------------------------------------------------
        if (typeof navigator !== "undefined" && navigator.onLine) {
          try {
            fetch(`${apiBase}/api/products/register`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                deviceIdentifier,
                deviceName: navigator.userAgent || "EduDrill Mobile Device",
              }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data?.success && data?.product?.product_key) {
                  setProductKey(data.product.product_key)
                  localStorage.setItem("edudrill_product_key", data.product.product_key)
                }
              })
              .catch(() => {})
          } catch (err) {
            console.debug("Offline background sync error:", err)
          }
        }
      } catch (error) {
        console.error("Product initialization error:", error)
        const fallbackKey = localStorage.getItem("edudrill_product_key") || "EDU-PROD-MOBILE-KEY"
        setProductKey(fallbackKey)
      } finally {
        setLoadingProduct(false)
      }
    }

    initializeProduct()
  }, [])

  // =====================================================
  // AUTOMATED ONLINE PAYMENT (PAYSTACK)
  // =====================================================

  function handleOnlinePayment(event) {
    if (event) event.preventDefault()
    setMessage("")

    if (!email || !email.includes("@")) {
      setMessage("Please enter a valid email address to receive your payment receipt.")
      return
    }

    if (!productKey) {
      setMessage("Your Product Key is preparing. Please wait a moment.")
      return
    }

    setPaying(true)

    const apiBase = window.desktopApi ? "https://edudrill-1.onrender.com" : (import.meta.env.VITE_API_URL || "")
    const deviceIdentifier = localStorage.getItem("edudrill_device_id") || "device_unknown"

    launchPaystackPayment({
      email,
      productKey,
      deviceIdentifier,
      apiBase,
      onSuccess: async (data) => {
        setPaying(false)
        const lic = data.license

        const savedLicense = {
          product_key: lic.product_key || productKey,
          activation_key: lic.activation_key || "ONLINE-ACTIVATED",
          status: "Active",
          activated_at: lic.activated_at || new Date().toISOString(),
        }

        localStorage.setItem("edudrill_license", JSON.stringify(savedLicense))
        localStorage.setItem("edudrill_product_key", savedLicense.product_key)

        if (window.desktopApi?.saveOfflineLicense) {
          try {
            await window.desktopApi.saveOfflineLicense({
              productKey: savedLicense.product_key,
              activationKey: savedLicense.activation_key,
              activatedAt: savedLicense.activated_at,
            })
          } catch (e) {
            console.error("Desktop offline license save notice:", e)
          }
        }

        setLicense({
          productKey: savedLicense.product_key,
          activationKey: savedLicense.activation_key,
          status: "Active",
          activatedAt: savedLicense.activated_at,
        })
      },
      onClose: () => {
        setPaying(false)
      },
      onError: (err) => {
        setPaying(false)
        setMessage(err.message || "Payment could not be completed. Please try again.")
      },
    })
  }

  // =====================================================
  // MANUAL KEY ACTIVATION
  // =====================================================

  async function handleManualActivation(event) {
    event.preventDefault()
    setMessage("")

    if (!productKey) {
      setMessage("Your Product Key has not been generated yet.")
      return
    }

    if (!activationKey.trim()) {
      setMessage("Please enter your Activation Key.")
      return
    }

    setLoading(true)

    try {
      if (window.desktopApi) {
        const deskResult = await window.desktopApi.activate({
          productKey,
          activationKey: activationKey.trim(),
        })

        if (!deskResult.success) {
          setMessage(deskResult.message || "Activation failed.")
          setLoading(false)
          return
        }

        const savedLicense = {
          product_key: productKey,
          activation_key: activationKey.trim(),
          status: "Active",
          activated_at: deskResult.license?.activated_at || new Date().toISOString(),
        }

        localStorage.setItem("edudrill_license", JSON.stringify(savedLicense))
        localStorage.setItem("edudrill_product_key", productKey)

        setLicense({
          productKey,
          activationKey: activationKey.trim(),
          status: "Active",
          activatedAt: savedLicense.activated_at,
        })

        setLoading(false)
        return
      }

      const response = await fetch("/api/activation-keys/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productKey,
          activationKey: activationKey.trim(),
          deviceIdentifier: localStorage.getItem("edudrill_device_id"),
        }),
      })

      const data = await response.json()

      if (!response.ok || !data.success) {
        setMessage(data.message || "Activation failed.")
        return
      }

      const savedLicense = {
        product_key: productKey,
        activation_key: activationKey.trim(),
        status: data.license.status,
        activated_at: data.license.activated_at,
      }

      localStorage.setItem("edudrill_license", JSON.stringify(savedLicense))
      localStorage.setItem("edudrill_product_key", productKey)

      setLicense({
        productKey: savedLicense.product_key,
        activationKey: savedLicense.activation_key,
        status: savedLicense.status,
        activatedAt: savedLicense.activated_at,
      })
    } catch (error) {
      console.error("Activation error:", error)
      setMessage("Unable to connect to the EduDrill server. Please make sure the backend is running.")
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
      console.error("Copy failed:", error)
    }
  }

  function closeActivation() {
    navigate("/")
  }

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loadingProduct) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "16px", display: "flex", flexDirection: "column" }}>
        <div style={{ background: "white", borderRadius: "24px", padding: "40px 24px", textAlign: "center", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "80px", height: "80px", borderRadius: "50%", marginBottom: "16px" }} />
          <h1 style={{ fontSize: "24px", color: "#1e293b", marginBottom: "8px" }}>Preparing Product</h1>
          <p style={{ color: "#64748b", fontSize: "15px" }}>EduDrill is securely preparing this installation...</p>
        </div>
      </main>
    )
  }

  const whatsappMessage = `Hello Acadex Support 👋 I want to activate my EduDrill product and would like to purchase an Activation Key. 🔑 My Product Key: ${productKey || "[DYNAMIC_KEY]"} Please send me the payment information and activation key. Thank you. EduDrill | Acadex`
  const whatsappUrl = `https://wa.me/2349135055095?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <main style={{ minHeight: "100vh", backgroundColor: "#f8fafc", padding: "16px", display: "flex", flexDirection: "column" }}>
      {!license ? (
        <div style={{ background: "white", borderRadius: "24px", padding: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "24px" }}>
            <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "60px", height: "60px", borderRadius: "50%", marginBottom: "10px" }} />
            <p style={{ color: "#2563eb", fontSize: "11px", fontWeight: "800", letterSpacing: "1px", marginBottom: "4px" }}>PRODUCT ACTIVATION</p>
            <h1 style={{ fontSize: "22px", color: "#1e293b", marginBottom: "6px", fontWeight: "800" }}>Activate EduDrill</h1>
            <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: "1.4" }}>
              Unlock all exam subjects, past questions, and the AI Tutor on this device.
            </p>
          </div>

          {/* PRODUCT KEY */}
          <div style={{ background: "#f1f5f9", borderRadius: "16px", padding: "14px 16px", marginBottom: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontSize: "10px", color: "#64748b", fontWeight: "800", textTransform: "uppercase" }}>Your Product Key</span>
              <strong style={{ display: "block", fontSize: "15px", color: "#0f172a", marginTop: "3px", wordBreak: "break-all" }}>{productKey}</strong>
            </div>
            <button
              type="button"
              onClick={() => copyKey(productKey, "product")}
              style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "8px 12px", fontSize: "12px", fontWeight: "700", color: "#475569" }}
            >
              {copied === "product" ? "Copied" : "Copy"}
            </button>
          </div>

          {/* DUAL MODE TABS */}
          <div style={{ display: "flex", background: "#f1f5f9", padding: "4px", borderRadius: "12px", marginBottom: "20px", gap: "4px" }}>
            <button
              type="button"
              onClick={() => {
                setActiveTab("pay")
                setMessage("")
              }}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: "9px",
                border: "none",
                fontWeight: "700",
                fontSize: "12.5px",
                cursor: "pointer",
                background: activeTab === "pay" ? "#ffffff" : "transparent",
                color: activeTab === "pay" ? "#0f172a" : "#64748b",
                boxShadow: activeTab === "pay" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
              }}
            >
              ⚡ Instant Pay
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("manual_key")
                setMessage("")
              }}
              style={{
                flex: 1,
                padding: "10px 8px",
                borderRadius: "9px",
                border: "none",
                fontWeight: "700",
                fontSize: "12.5px",
                cursor: "pointer",
                background: activeTab === "manual_key" ? "#ffffff" : "transparent",
                color: activeTab === "manual_key" ? "#0f172a" : "#64748b",
                boxShadow: activeTab === "manual_key" ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
              }}
            >
              🔑 Enter Key
            </button>
          </div>

          {/* =================================================
             TAB 1: INSTANT AUTOMATED PAYMENT (PAYSTACK)
             ================================================= */}
          {activeTab === "pay" && (
            <div>
              <div
                style={{
                  background: "linear-gradient(135deg, #eff6ff 0%, #f0fdf4 100%)",
                  border: "1.5px solid #bfdbfe",
                  borderRadius: "16px",
                  padding: "16px",
                  marginBottom: "16px",
                  textAlign: "center",
                }}
              >
                <span style={{ display: "inline-block", background: "#16a34a", color: "#ffffff", fontSize: "10px", fontWeight: "800", padding: "2px 8px", borderRadius: "12px", textTransform: "uppercase", marginBottom: "6px" }}>
                  ● Auto-Unlock in 5s
                </span>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "4px" }}>
                  <span style={{ fontSize: "28px", fontWeight: "900", color: "#0f172a" }}>
                    ₦{payAmount.toLocaleString()}
                  </span>
                  <span style={{ fontSize: "12px", color: "#64748b", fontWeight: "600" }}>/ Lifetime</span>
                </div>
                <p style={{ margin: "6px 0 0", fontSize: "12px", color: "#475569", lineHeight: "1.4" }}>
                  Bank Transfer, OPay, Card, or USSD.
                </p>
              </div>

              <form onSubmit={handleOnlinePayment} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label htmlFor="mobileStudentEmail" style={{ display: "block", fontSize: "12.5px", fontWeight: "700", color: "#1e293b", marginBottom: "6px" }}>
                    Your Email Address
                  </label>
                  <input
                    id="mobileStudentEmail"
                    type="email"
                    placeholder="e.g. student@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={paying}
                    required
                    style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1.5px solid #cbd5e1", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>

                {message && (
                  <div style={{ padding: "10px", background: "#fee2e2", color: "#b91c1c", borderRadius: "8px", fontSize: "13px", textAlign: "center" }}>
                    {message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={paying || !productKey}
                  style={{
                    width: "100%",
                    padding: "15px",
                    background: paying ? "#94a3b8" : "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
                    color: "white",
                    borderRadius: "14px",
                    fontSize: "15px",
                    fontWeight: "800",
                    border: "none",
                    boxShadow: "0 4px 14px rgba(22, 163, 74, 0.35)",
                    cursor: paying ? "not-allowed" : "pointer",
                  }}
                >
                  {paying ? "Connecting to Paystack..." : `⚡ Pay ₦${payAmount.toLocaleString()} & Activate Now →`}
                </button>
              </form>

              <div style={{ textAlign: "center", marginTop: "12px", color: "#64748b", fontSize: "11px", fontWeight: "600" }}>
                🔒 256-bit Secure • Powered by Paystack
              </div>
            </div>
          )}

          {/* =================================================
             TAB 2: MANUAL ACTIVATION KEY FORM
             ================================================= */}
          {activeTab === "manual_key" && (
            <form onSubmit={handleManualActivation} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ marginBottom: "18px" }}>
                <label htmlFor="activationKey" style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#1e293b", marginBottom: "6px" }}>
                  Activation Key
                </label>
                <input
                  id="activationKey"
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={activationKey}
                  onChange={(e) => setActivationKey(e.target.value)}
                  disabled={loading}
                  style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1.5px solid #cbd5e1", fontSize: "15px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              {message && (
                <div style={{ padding: "10px", background: "#fee2e2", color: "#b91c1c", borderRadius: "8px", fontSize: "13px", marginBottom: "16px", textAlign: "center" }}>
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ width: "100%", background: "#123b72", color: "white", padding: "15px", borderRadius: "14px", fontSize: "15px", fontWeight: "800", border: "none" }}
              >
                {loading ? "Activating..." : "Activate Product →"}
              </button>
            </form>
          )}

          {/* HELP & WHATSAPP */}
          <div style={{ textAlign: "center", marginTop: "auto", paddingTop: "20px", borderTop: "1px solid #f1f5f9" }}>
            <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "10px" }}>Need manual assistance or offline bank transfer?</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", width: "100%", background: "#25D366", color: "white", padding: "14px", borderRadius: "14px", textDecoration: "none", fontWeight: "bold", fontSize: "14px", boxSizing: "border-box" }}
            >
              Order on WhatsApp
            </a>
          </div>

          <Link to="/" style={{ display: "block", textAlign: "center", color: "#64748b", textDecoration: "none", fontSize: "13.5px", fontWeight: "700", marginTop: "18px" }}>
            ← Back to EduDrill
          </Link>
        </div>
      ) : (
        /* =================================================
           ALREADY ACTIVATED
           ================================================= */
        <div style={{ background: "white", borderRadius: "24px", padding: "24px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)", textAlign: "center" }}>
          <div style={{ width: "64px", height: "64px", background: "#dcfce7", color: "#16a34a", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 20px auto" }}>
            ✓
          </div>

          <p style={{ color: "#16a34a", fontSize: "11px", fontWeight: "800", letterSpacing: "1px", marginBottom: "4px" }}>ACTIVE LICENSE</p>
          <h1 style={{ fontSize: "22px", color: "#1e293b", marginBottom: "8px", fontWeight: "800" }}>Product Activated!</h1>
          <p style={{ fontSize: "13.5px", color: "#64748b", lineHeight: "1.4", marginBottom: "24px" }}>
            This installation is linked to an active EduDrill license.
          </p>

          <div style={{ background: "#f8fafc", borderRadius: "16px", padding: "16px", textAlign: "left", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid #e2e8f0" }}>
              <div>
                <span style={{ fontSize: "10px", color: "#64748b", fontWeight: "800" }}>ACTIVATION KEY</span>
                <strong style={{ display: "block", fontSize: "13.5px", color: "#0f172a", marginTop: "3px" }}>{license.activationKey}</strong>
              </div>
              <button
                type="button"
                onClick={() => copyKey(license.activationKey, "activation")}
                style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "6px 10px", fontSize: "11px", fontWeight: "700", color: "#475569" }}
              >
                {copied === "activation" ? "Copied" : "Copy"}
              </button>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "10px", color: "#64748b", fontWeight: "800" }}>PRODUCT KEY</span>
                <strong style={{ display: "block", fontSize: "13.5px", color: "#0f172a", marginTop: "3px" }}>{license.productKey}</strong>
              </div>
              <button
                type="button"
                onClick={() => copyKey(license.productKey, "product")}
                style={{ background: "white", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "6px 10px", fontSize: "11px", fontWeight: "700", color: "#475569" }}
              >
                {copied === "product" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={closeActivation}
            style={{ width: "100%", background: "#123b72", color: "#ffffff", padding: "16px", borderRadius: "14px", fontSize: "15px", fontWeight: "800", border: "none", marginBottom: "12px", cursor: "pointer" }}
          >
            Continue to EduDrill →
          </button>

          <p style={{ fontSize: "11.5px", color: "#94a3b8" }}>Your activation information is safely stored.</p>
        </div>
      )}
    </main>
  )
}

export default MobileActivation
