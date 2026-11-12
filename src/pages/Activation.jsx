import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import MobileActivation from "./mobile/MobileActivation"
import useMobile from "../hooks/useMobile"
import { launchPaystackPayment, getLivePaymentConfig } from "../utils/paystack"
import "./Activation.css"

// Icon Helpers
function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="#10B981">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  )
}

function BankIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="21" x2="21" y2="21" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 3 2 9 22 9 12 3" />
    </svg>
  )
}

function OPayIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="7" cy="14.5" r="1.5" fill="#0F172A" />
    </svg>
  )
}

function CardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="7" y1="15" x2="11" y2="15" />
    </svg>
  )
}

function UssdIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
    </svg>
  )
}

function LockIcon({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  )
}

export function DesktopActivation() {
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

        // 1. Check for desktop API license first
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

        // 2. Check for an existing activated license in storage
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

        // 3. Get or generate a persistent Device Identifier
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

        // 4. Get or generate persistent Product Key immediately
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

        // 5. Background sync with backend if online
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

  const whatsappMessage = `Hello Acadex Support 👋 I want to activate my EduDrill product and would like to purchase an Activation Key. 🔑 My Product Key: ${productKey || "[DYNAMIC_KEY]"} Please send me the payment information and activation key. Thank you. EduDrill | Acadex`
  const whatsappUrl = `https://wa.me/2349135055095?text=${encodeURIComponent(whatsappMessage)}`

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loadingProduct) {
    return (
      <main className="act-wrapper">
        <div className="act-card" style={{ textAlign: "center", padding: "48px 24px" }}>
          <h1 className="act-title">Activate EduDrill</h1>
          <p className="act-subtitle">Preparing this installation securely...</p>
          <div style={{ margin: "24px 0", color: "#64748B", fontSize: "14px" }}>Generating your Product Key...</div>
        </div>
      </main>
    )
  }

  return (
    <main className="act-wrapper">
      {!license ? (
        <div className="act-card">
          {/* TITLE & SUBTITLE */}
          <h1 className="act-title">Activate EduDrill</h1>
          <p className="act-subtitle">
            One payment unlocks all exams, subjects and the AI Tutor on this device.
          </p>

          {/* YOUR PRODUCT KEY BOX */}
          <div className="act-product-key-box">
            <div className="act-product-key-info">
              <span className="act-product-key-label">YOUR PRODUCT KEY</span>
              <strong className="act-product-key-value">{productKey}</strong>
            </div>
            <button
              type="button"
              className="act-copy-btn"
              onClick={() => copyKey(productKey, "product")}
              aria-label="Copy Product Key"
            >
              <CopyIcon />
              <span>{copied === "product" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* DUAL MODE TABS */}
          <div className="act-tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "pay"}
              className={`act-tab-btn ${activeTab === "pay" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("pay")
                setMessage("")
              }}
            >
              Pay online
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "manual_key"}
              className={`act-tab-btn ${activeTab === "manual_key" ? "active" : ""}`}
              onClick={() => {
                setActiveTab("manual_key")
                setMessage("")
              }}
            >
              I have an activation key
            </button>
          </div>

          {/* =================================================
             TAB 1: PAY ONLINE (PAYSTACK)
             ================================================= */}
          {activeTab === "pay" && (
            <div>
              {/* BENEFIT / PRICING CARD */}
              <div className="act-benefit-card">
                <div className="act-benefit-header">
                  <div>
                    <div className="act-benefit-badge-title">Lifetime access</div>
                    <div className="act-benefit-badge-subtitle">Single device, pay once</div>
                  </div>
                  <div className="act-benefit-price">
                    ₦{payAmount.toLocaleString()}
                  </div>
                </div>

                <div className="act-benefit-body">
                  <div className="act-benefit-item">
                    <span className="act-benefit-icon"><CheckIcon /></span>
                    <span>All exams and subjects</span>
                  </div>
                  <div className="act-benefit-item">
                    <span className="act-benefit-icon"><CheckIcon /></span>
                    <span>The AI Tutor included</span>
                  </div>
                  <div className="act-benefit-item">
                    <span className="act-benefit-icon"><CheckIcon /></span>
                    <span>Unlocks the moment payment is confirmed</span>
                  </div>
                </div>
              </div>

              {/* PAY WITH CHANNELS */}
              <span className="act-section-label">Pay with</span>
              <div className="act-pay-channels">
                <div className="act-channel-card">
                  <div className="act-channel-icon"><BankIcon /></div>
                  <span className="act-channel-name">Bank transfer</span>
                </div>
                <div className="act-channel-card">
                  <div className="act-channel-icon"><OPayIcon /></div>
                  <span className="act-channel-name">OPay</span>
                </div>
                <div className="act-channel-card">
                  <div className="act-channel-icon"><CardIcon /></div>
                  <span className="act-channel-name">Card</span>
                </div>
                <div className="act-channel-card">
                  <div className="act-channel-icon"><UssdIcon /></div>
                  <span className="act-channel-name">USSD</span>
                </div>
              </div>

              {/* PAYMENT FORM */}
              <form onSubmit={handleOnlinePayment}>
                <div className="act-field">
                  <label htmlFor="receiptEmail">Email for your receipt</label>
                  <input
                    id="receiptEmail"
                    type="email"
                    className="act-input"
                    placeholder="e.g. olanrewajumahmoud5@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={paying}
                    required
                  />
                  <div className="act-help-text">
                    We send your payment receipt here. Nothing else.
                  </div>
                </div>

                {message && <div className="act-message">{message}</div>}

                <button
                  type="submit"
                  className="act-cta-button"
                  disabled={paying || !productKey}
                >
                  <LockIcon size={16} />
                  <span>
                    {paying ? "Connecting to Paystack..." : `Pay ₦${payAmount.toLocaleString()} securely`}
                  </span>
                </button>
              </form>

              {/* TRUST BADGES */}
              <div className="act-trust-badges">
                <div className="act-trust-item">
                  <ShieldIcon />
                  <span>256-bit encryption</span>
                </div>
                <div className="act-trust-item">
                  <LockIcon size={13} color="#64748B" />
                  <span>Payments by Paystack</span>
                </div>
              </div>
            </div>
          )}

          {/* =================================================
             TAB 2: I HAVE AN ACTIVATION KEY
             ================================================= */}
          {activeTab === "manual_key" && (
            <form onSubmit={handleManualActivation}>
              <div className="act-field">
                <label htmlFor="manualActivationKey">Activation Key</label>
                <input
                  id="manualActivationKey"
                  type="text"
                  className="act-input"
                  style={{
                    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  value={activationKey}
                  onChange={(event) => setActivationKey(event.target.value)}
                  disabled={loading}
                />
                <div className="act-help-text">
                  Enter the 16-character license key issued by Acadex Support or your school.
                </div>
              </div>

              {message && <div className="act-message">{message}</div>}

              <button
                type="submit"
                className="act-cta-button"
                disabled={loading || !productKey}
              >
                <span>{loading ? "Activating Product..." : "Activate EduDrill Now"}</span>
              </button>
            </form>
          )}

          {/* DIVIDER */}
          <div className="act-divider" />

          {/* FOOTER */}
          <div className="act-footer">
            <p className="act-footer-prompt">Need help, or prefer to pay manually?</p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="act-support-link"
            >
              Contact Acadex Support
            </a>

            <div>
              <Link to="/" className="act-back-link">
                ← Back to EduDrill
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* =================================================
           ALREADY ACTIVATED VIEW
           ================================================= */
        <div className="act-card act-already-card">
          <div className="act-already-icon">✓</div>

          <div className="act-status-badge">
            <span>●</span>
            <span>ACTIVE LICENSE</span>
          </div>

          <h1 className="act-already-title">EduDrill Activated!</h1>
          <p className="act-already-desc">
            This installation is linked to an active EduDrill license. All examination subjects, past papers, and the AI Tutor are completely unlocked.
          </p>

          {/* ACTIVATION DETAILS */}
          <div className="act-product-key-box" style={{ marginBottom: "12px" }}>
            <div className="act-product-key-info">
              <span className="act-product-key-label">ACTIVATION KEY</span>
              <strong className="act-product-key-value">{license.activationKey}</strong>
            </div>
            <button
              type="button"
              className="act-copy-btn"
              onClick={() => copyKey(license.activationKey, "activation")}
            >
              <CopyIcon />
              <span>{copied === "activation" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <div className="act-product-key-box">
            <div className="act-product-key-info">
              <span className="act-product-key-label">PRODUCT KEY</span>
              <strong className="act-product-key-value">{license.productKey}</strong>
            </div>
            <button
              type="button"
              className="act-copy-btn"
              onClick={() => copyKey(license.productKey, "product")}
            >
              <CopyIcon />
              <span>{copied === "product" ? "Copied" : "Copy"}</span>
            </button>
          </div>

          <button
            type="button"
            className="act-cta-button"
            style={{ marginTop: "22px" }}
            onClick={closeActivation}
          >
            <span>Continue to EduDrill →</span>
          </button>
        </div>
      )}
    </main>
  )
}

export default function Activation() {
  const { isMobile } = useMobile()
  return isMobile ? <MobileActivation /> : <DesktopActivation />
}
