import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import MobileActivation from "./mobile/MobileActivation"
import useMobile from "../hooks/useMobile"
import { launchPaystackPayment, getLivePaymentConfig } from "../utils/paystack"

function DesktopActivation() {
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
        // 2. Check for an existing activated license in storage
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
        // 3. Get or generate a persistent Device Identifier
        // -------------------------------------------------
        let deviceIdentifier = localStorage.getItem("edudrill_device_id")

        if (window.desktopApi?.getDeviceId) {
          try {
            deviceIdentifier = await window.desktopApi.getDeviceId()
            localStorage.setItem("edudrill_device_id", deviceIdentifier)
          } catch (e) {
            console.error("Error getting desktop device id:", e)
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
          } catch (e) {
            console.error("Error getting desktop product key:", e)
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
                deviceName: navigator.userAgent || "EduDrill Desktop",
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
        const fallbackKey = localStorage.getItem("edudrill_product_key") || "EDU-PROD-OFFLINE-KEY"
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

        // If on Windows Desktop app, cryptographically sign & save into local SQLite database
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
      <main className="activation-page">
        <div className="activation-card">
          <div className="activation-logo">
            <div>
              <img
                src="/assets/edudrill_logo.jpg"
                alt="EduDrill"
                style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
              />
            </div>
            <span>
              Edu<span>Drill</span>
            </span>
          </div>

          <div className="activation-heading">
            <p>PRODUCT ACTIVATION</p>
            <h1>
              Preparing your<span> Product</span>
            </h1>
            <p className="activation-description">
              EduDrill is securely preparing this installation.
            </p>
          </div>

          <div className="activation-loading">Generating Product Key...</div>
        </div>
      </main>
    )
  }

  const whatsappMessage = `Hello Acadex Support 👋 I want to activate my EduDrill product and would like to purchase an Activation Key. 🔑 My Product Key: ${productKey || "[DYNAMIC_KEY]"} Please send me the payment information and activation key. Thank you. EduDrill | Acadex`
  const whatsappUrl = `https://wa.me/2349135055095?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <main className="activation-page">
      {!license ? (
        <div className="activation-card">
          <div className="activation-logo">
            <div>
              <img
                src="/assets/edudrill_logo.jpg"
                alt="EduDrill"
                style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
              />
            </div>
            <span>
              Edu<span>Drill</span>
            </span>
          </div>

          <div className="activation-heading">
            <p>PRODUCT ACTIVATION</p>
            <h1>
              Activate your<span> EduDrill</span>
            </h1>
            <p className="activation-description">
              Choose your preferred activation method below to unlock all exams, subjects, and the AI Tutor.
            </p>
          </div>

          {/* PRODUCT KEY BOX */}
          <div className="generated-product-box">
            <div>
              <span>YOUR PRODUCT KEY</span>
              <strong>{productKey}</strong>
            </div>
            <button type="button" onClick={() => copyKey(productKey, "product")}>
              {copied === "product" ? "Copied" : "Copy"}
            </button>
          </div>

          {/* DUAL MODE TABS */}
          <div
            style={{
              display: "flex",
              background: "#F1F5F9",
              padding: "5px",
              borderRadius: "14px",
              marginBottom: "22px",
              gap: "6px",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveTab("pay")
                setMessage("")
              }}
              style={{
                flex: 1,
                padding: "11px 16px",
                borderRadius: "10px",
                border: "none",
                fontWeight: "700",
                fontSize: "13.5px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: activeTab === "pay" ? "#FFFFFF" : "transparent",
                color: activeTab === "pay" ? "#0F172A" : "#64748B",
                boxShadow: activeTab === "pay" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              }}
            >
              ⚡ Instant Online Payment
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("manual_key")
                setMessage("")
              }}
              style={{
                flex: 1,
                padding: "11px 16px",
                borderRadius: "10px",
                border: "none",
                fontWeight: "700",
                fontSize: "13.5px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: activeTab === "manual_key" ? "#FFFFFF" : "transparent",
                color: activeTab === "manual_key" ? "#0F172A" : "#64748B",
                boxShadow: activeTab === "manual_key" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              }}
            >
              🔑 Enter Activation Key
            </button>
          </div>

          {/* =================================================
             TAB 1: INSTANT AUTOMATED PAYMENT (PAYSTACK)
             ================================================= */}
          {activeTab === "pay" && (
            <div className="paystack-activation-section">
              <div
                style={{
                  background: "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)",
                  border: "1.5px solid #BFDBFE",
                  borderRadius: "16px",
                  padding: "18px 20px",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    background: "#16A34A",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontWeight: "800",
                    letterSpacing: "0.5px",
                    padding: "3px 10px",
                    borderRadius: "20px",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  ● Automated Instant Activation
                </span>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: "6px" }}>
                  <span style={{ fontSize: "32px", fontWeight: "900", color: "#0F172A", letterSpacing: "-0.5px" }}>
                    ₦{payAmount.toLocaleString()}
                  </span>
                  <span style={{ fontSize: "13px", color: "#64748B", fontWeight: "600" }}>
                    / Lifetime Single Device
                  </span>
                </div>
                <p style={{ margin: "8px 0 0", fontSize: "13px", color: "#475569", lineHeight: "1.4" }}>
                  Pay via <strong>Direct Bank Transfer</strong>, <strong>OPay</strong>, <strong>Card</strong>, or <strong>USSD</strong>. Unlocks immediately upon payment confirmation.
                </p>
              </div>

              <form onSubmit={handleOnlinePayment} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                <div className="activation-field">
                  <label htmlFor="studentEmail" style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>Your Email Address</span>
                    <span style={{ color: "#64748B", fontSize: "11px", fontWeight: "normal" }}>For payment receipt</span>
                  </label>
                  <input
                    id="studentEmail"
                    type="email"
                    placeholder="e.g. student@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={paying}
                    required
                  />
                </div>

                {message && <div className="activation-message error">{message}</div>}

                <button
                  type="submit"
                  disabled={paying || !productKey}
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: paying ? "#94A3B8" : "linear-gradient(135deg, #16A34A 0%, #15803D 100%)",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "12px",
                    fontSize: "15px",
                    fontWeight: "800",
                    cursor: paying ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    boxShadow: "0 6px 18px rgba(22, 163, 74, 0.35)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {paying ? (
                    <span>Connecting to Paystack...</span>
                  ) : (
                    <>
                      <span>⚡ Pay ₦{payAmount.toLocaleString()} & Activate Instantly</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </form>

              {/* TRUST BADGES */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  marginTop: "16px",
                  color: "#64748B",
                  fontSize: "11.5px",
                  fontWeight: "600",
                }}
              >
                <span>🔒 256-bit Bank Encryption</span>
                <span>•</span>
                <span>🏦 Direct Bank Transfer</span>
                <span>•</span>
                <span>Powered by Paystack</span>
              </div>
            </div>
          )}

          {/* =================================================
             TAB 2: MANUAL ACTIVATION KEY FORM
             ================================================= */}
          {activeTab === "manual_key" && (
            <form className="activation-form" onSubmit={handleManualActivation}>
              <div className="activation-field">
                <label htmlFor="activationKey">Activation Key</label>
                <input
                  id="activationKey"
                  type="text"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={activationKey}
                  onChange={(event) => setActivationKey(event.target.value)}
                  disabled={loading}
                />
              </div>

              {message && <div className="activation-message error">{message}</div>}

              <button type="submit" className="activation-submit" disabled={loading}>
                {loading ? "Activating..." : "Activate Product"}
                <span>→</span>
              </button>
            </form>
          )}

          {/* HELP & WHATSAPP FALLBACK */}
          <div className="activation-help" style={{ marginTop: "24px" }}>
            <span>Need assistance or want to order manually?</span>
            <strong>Contact Acadex Support</strong>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "12px",
                background: "#25D366",
                color: "white",
                padding: "12px 24px",
                borderRadius: "12px",
                textDecoration: "none",
                fontWeight: "bold",
                fontSize: "14px",
                boxShadow: "0 4px 10px rgba(37, 211, 102, 0.3)",
              }}
            >
              Chat on WhatsApp
            </a>
          </div>

          {/* BACK LINK */}
          <Link to="/" className="activation-back">
            ← Back to EduDrill
          </Link>
        </div>
      ) : (
        /* =================================================
           ALREADY ACTIVATED VIEW
           ================================================= */
        <div className="activation-already-card">
          <div className="activation-already-icon">✓</div>

          <div className="activation-already-heading">
            <span>PRODUCT ACTIVATION</span>
            <h1>
              Product Successfully<strong> Activated!</strong>
            </h1>
            <p>
              Your installation is linked to an active EduDrill license. All examination subjects, past papers, and the AI Tutor are completely unlocked.
            </p>
          </div>

          <div className="activation-already-status">
            <span>●</span>
            <strong>ACTIVE LICENSE</strong>
          </div>

          {/* ACTIVATION INFORMATION */}
          <div className="activation-info-box">
            <div className="activation-info-row">
              <div>
                <span>ACTIVATION KEY</span>
                <strong>{license.activationKey}</strong>
              </div>
              <button type="button" onClick={() => copyKey(license.activationKey, "activation")}>
                {copied === "activation" ? "Copied" : "Copy"}
              </button>
            </div>

            <div className="activation-info-divider" />

            <div className="activation-info-row">
              <div>
                <span>PRODUCT KEY</span>
                <strong>{license.productKey}</strong>
              </div>
              <button type="button" onClick={() => copyKey(license.productKey, "product")}>
                {copied === "product" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* ALREADY ACTIVATED MESSAGE */}
          <div className="activation-already-message">
            <div>✓</div>
            <p>This installation is verified and ready for learning and CBT practice.</p>
          </div>

          {/* CLOSE */}
          <button type="button" className="activation-close-button" onClick={closeActivation}>
            Continue to EduDrill
            <span>→</span>
          </button>

          <p className="activation-success-note">
            Your activation information is safely preserved for this device.
          </p>
        </div>
      )}
    </main>
  )
}

export default function Activation() {
  const { isMobile } = useMobile()
  return isMobile ? <MobileActivation /> : <DesktopActivation />
}
