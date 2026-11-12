/**
 * EduDrill Paystack Integration Utility
 * Handles dynamic script loading, live configuration, popup checkout, and server-side verification.
 */

export function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    if (typeof window !== "undefined" && window.PaystackPop) {
      return resolve(window.PaystackPop)
    }

    const existingScript = document.querySelector('script[src*="paystack.co/v1/inline.js"]')
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.PaystackPop))
      existingScript.addEventListener("error", () => reject(new Error("Failed to load Paystack library")))
      if (window.PaystackPop) return resolve(window.PaystackPop)
    }

    const script = document.createElement("script")
    script.src = "https://js.paystack.co/v1/inline.js"
    script.async = true
    script.onload = () => resolve(window.PaystackPop)
    script.onerror = () => reject(new Error("Failed to load Paystack payment library"))
    document.head.appendChild(script)
  })
}

/**
 * Fetch live payment configuration (Dynamic price & public key from server)
 */
export async function getLivePaymentConfig(apiBase = "") {
  try {
    const res = await fetch(`${apiBase}/api/payment/config`)
    const data = await res.json()
    if (data.success) {
      return {
        publicKey: data.publicKey,
        amountNaira: data.amountNaira || 2500,
        currency: data.currency || "NGN",
      }
    }
  } catch (err) {
    console.debug("[PAYSTACK CONFIG FETCH ERROR]", err)
  }

  // Fallback defaults if offline / network error
  return {
    publicKey: "pk_test_0cfaae914c051fd4b8ca4c940a4d6dc7bb1596fd",
    amountNaira: 2500,
    currency: "NGN",
  }
}

/**
 * Launch Paystack Inline Checkout Popup
 */
export async function launchPaystackPayment({
  email,
  productKey,
  deviceIdentifier,
  apiBase = "",
  onSuccess,
  onClose,
  onError,
}) {
  try {
    const PaystackPop = await loadPaystackScript()
    if (!PaystackPop) {
      throw new Error("Paystack payment interface is currently unavailable.")
    }

    const config = await getLivePaymentConfig(apiBase)
    const reference = `EDUPAY_${Date.now()}_${Math.random().toString(36).substring(2, 8).toUpperCase()}`

    const handler = PaystackPop.setup({
      key: config.publicKey,
      email: email.trim(),
      amount: config.amountNaira * 100, // Amount in kobo
      currency: "NGN",
      ref: reference,
      channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
      metadata: {
        productKey,
        deviceIdentifier,
        custom_fields: [
          {
            display_name: "Product Key",
            variable_name: "product_key",
            value: productKey,
          },
        ],
      },
      callback: async function (response) {
        try {
          const verifyRes = await fetch(`${apiBase}/api/payment/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              reference: response.reference || reference,
              productKey,
              deviceIdentifier,
              email: email.trim(),
            }),
          })

          const verifyData = await verifyRes.json()

          if (verifyRes.ok && verifyData.success) {
            onSuccess(verifyData)
          } else {
            onError(new Error(verifyData.message || "Payment verification failed with server."))
          }
        } catch (err) {
          onError(err)
        }
      },
      onClose: function () {
        if (onClose) onClose()
      },
    })

    handler.openIframe()
  } catch (err) {
    if (onError) onError(err)
  }
}

