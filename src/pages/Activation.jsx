import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import MobileActivation from "./mobile/MobileActivation"
import useMobile from "../hooks/useMobile"

function DesktopActivation() {
  const navigate = useNavigate()
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
        // 1. Check for desktop API license first
        // -------------------------------------------------
        if (window.desktopApi) {
          try {
            const deskStatus = await window.desktopApi.getLicenseStatus();
            if (deskStatus && deskStatus.active && deskStatus.license) {
              const parsed = deskStatus.license;
              setLicense({
                productKey: parsed.product_key,
                activationKey: parsed.activation_key,
                status: parsed.status,
                activatedAt: parsed.activated_at,
              });
              setProductKey(parsed.product_key);
              localStorage.setItem("edudrill_license", JSON.stringify(parsed));
              localStorage.setItem("edudrill_product_key", parsed.product_key);
              setLoadingProduct(false);
              return;
            }
          } catch (e) {
            console.error("Desktop license check error:", e);
          }
        }

        // -------------------------------------------------
        // 2. Check for an existing activated license in storage
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
        // 3. Get or generate a persistent Device Identifier
        // -------------------------------------------------

        let deviceIdentifier =
          localStorage.getItem("edudrill_device_id")

        if (window.desktopApi?.getDeviceId) {
          try {
            deviceIdentifier = await window.desktopApi.getDeviceId();
            localStorage.setItem("edudrill_device_id", deviceIdentifier);
          } catch (e) {
            console.error("Error getting desktop device id:", e);
          }
        }

        if (!deviceIdentifier) {
          deviceIdentifier = crypto.randomUUID()
          localStorage.setItem("edudrill_device_id", deviceIdentifier)
        }

        // -------------------------------------------------
        // 4. Get or generate persistent Product Key immediately (offline-ready)
        // -------------------------------------------------

        let currentProductKey = localStorage.getItem("edudrill_product_key");

        if (window.desktopApi?.getProductKey) {
          try {
            currentProductKey = await window.desktopApi.getProductKey();
          } catch (e) {
            console.error("Error getting desktop product key:", e);
          }
        }

        if (!currentProductKey) {
          const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
          const makePart = () => Array.from({ length: 4 }, () => characters[Math.floor(Math.random() * characters.length)]).join("");
          currentProductKey = `EDU-PROD-${makePart()}-${makePart()}`;
        }

        localStorage.setItem("edudrill_product_key", currentProductKey);
        setProductKey(currentProductKey);
        setLoadingProduct(false);

        // -------------------------------------------------
        // 5. Background sync with backend if online
        // -------------------------------------------------

        if (typeof navigator !== "undefined" && navigator.onLine) {
          try {
            const apiBase = window.desktopApi ? "https://edudrill-1.onrender.com" : "";
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
                  setProductKey(data.product.product_key);
                  localStorage.setItem("edudrill_product_key", data.product.product_key);
                }
              })
              .catch(() => {});
          } catch (_) {}
        }
      } catch (error) {
        console.error("Product initialization error:", error);
        const fallbackKey = localStorage.getItem("edudrill_product_key") || "EDU-PROD-OFFLINE-KEY";
        setProductKey(fallbackKey);
      } finally {
        setLoadingProduct(false);
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
      if (window.desktopApi) {
        const deskResult = await window.desktopApi.activate({
          productKey,
          activationKey: activationKey.trim(),
        });

        if (!deskResult.success) {
          setMessage(deskResult.message || "Activation failed.");
          setLoading(false);
          return;
        }

        const savedLicense = {
          product_key: productKey,
          activation_key: activationKey.trim(),
          status: "Active",
          activated_at: deskResult.license?.activated_at || new Date().toISOString(),
        };

        localStorage.setItem("edudrill_license", JSON.stringify(savedLicense));
        localStorage.setItem("edudrill_product_key", productKey);

        setLicense({
          productKey,
          activationKey: activationKey.trim(),
          status: "Active",
          activatedAt: savedLicense.activated_at,
        });

        setLoading(false);
        return;
      }

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
            <div><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>

            <span>
              Edu<span>Drill</span>
            </span>
          </div>

          <div className="activation-heading">
            <p>PRODUCT ACTIVATION</p>

            <h1>
              Preparing your
              <span> Product</span>
            </h1>

            <p className="activation-description">
              EduDrill is securely preparing this
              installation.
            </p>
          </div>

          <div className="activation-loading">
            Generating Product Key...
          </div>

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
    <main className="activation-page">

      {!license ? (

        <div className="activation-card">

          <div className="activation-logo">

            <div><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>

            <span>
              Edu<span>Drill</span>
            </span>

          </div>

          <div className="activation-heading">

            <p>PRODUCT ACTIVATION</p>

            <h1>
              Activate your
              <span> EduDrill</span>
            </h1>

            <p className="activation-description">
              This installation has been assigned a
              unique Product Key. Enter your Activation
              Key to activate EduDrill.
            </p>

          </div>

          {/* PRODUCT KEY */}

          <div className="generated-product-box">

            <div>

              <span>
                YOUR PRODUCT KEY
              </span>

              <strong>
                {productKey}
              </strong>

            </div>

            <button
              type="button"
              onClick={() =>
                copyKey(
                  productKey,
                  "product",
                )
              }
            >
              {copied === "product"
                ? "Copied"
                : "Copy"}
            </button>

          </div>

          {/* ACTIVATION FORM */}

          <form
            className="activation-form"
            onSubmit={handleActivation}
          >

            <div className="activation-field">

              <label htmlFor="activationKey">
                Activation Key
              </label>

              <input
                id="activationKey"
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                value={activationKey}
                onChange={(event) =>
                  setActivationKey(
                    event.target.value,
                  )
                }
                disabled={loading}
              />

            </div>

            {message && (
              <div className="activation-message error">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="activation-submit"
              disabled={loading}
            >
              {loading
                ? "Activating..."
                : "Activate Product"}

              <span>→</span>
            </button>

          </form>

          {/* HELP */}

          <div className="activation-help">

            <span>
              Need an activation key?
            </span>

            <strong>
              Contact Acadex
            </strong>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '12px', background: '#25D366', color: 'white', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px', boxShadow: '0 4px 10px rgba(37, 211, 102, 0.3)' }}>
              Purchase on WhatsApp
            </a>

          </div>

          {/* BACK */}

          <Link
            to="/"
            className="activation-back"
          >
            ← Back to EduDrill
          </Link>

        </div>

      ) : (

        /* =================================================
           ALREADY ACTIVATED
           ================================================= */

        <div className="activation-already-card">

          <div className="activation-already-icon">
            ✓
          </div>

          <div className="activation-already-heading">

            <span>
              PRODUCT ACTIVATION
            </span>

            <h1>
              Product Already
              <strong> Activated</strong>
            </h1>

            <p>
              This product has already been activated.
              This installation is linked to an active
              EduDrill license.
            </p>

          </div>

          <div className="activation-already-status">

            <span>●</span>

            <strong>
              ACTIVE LICENSE
            </strong>

          </div>

          {/* ACTIVATION INFORMATION */}

          <div className="activation-info-box">

            <div className="activation-info-row">

              <div>

                <span>
                  ACTIVATION KEY
                </span>

                <strong>
                  {license.activationKey}
                </strong>

              </div>

              <button
                type="button"
                onClick={() =>
                  copyKey(
                    license.activationKey,
                    "activation",
                  )
                }
              >
                {copied === "activation"
                  ? "Copied"
                  : "Copy"}
              </button>

            </div>

            <div className="activation-info-divider" />

            <div className="activation-info-row">

              <div>

                <span>
                  PRODUCT KEY
                </span>

                <strong>
                  {license.productKey}
                </strong>

              </div>

              <button
                type="button"
                onClick={() =>
                  copyKey(
                    license.productKey,
                    "product",
                  )
                }
              >
                {copied === "product"
                  ? "Copied"
                  : "Copy"}
              </button>

            </div>

          </div>

          {/* ALREADY ACTIVATED MESSAGE */}

          <div className="activation-already-message">

            <div>
              ✓
            </div>

            <p>
              This product does not need to be
              activated again.
            </p>

          </div>

          {/* CLOSE */}

          <button
            type="button"
            className="activation-close-button"
            onClick={closeActivation}
          >
            Close
            <span>×</span>
          </button>

          <p className="activation-success-note">
            Your activation information is saved
            for this installation.
          </p>

        </div>

      )}

    </main>
  )
}

export default function Activation() {
  const { isMobile } = useMobile();
  return isMobile ? <MobileActivation /> : <DesktopActivation />;
}