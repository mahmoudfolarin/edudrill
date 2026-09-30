import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function ActivationKeys() {
  const [showGenerator, setShowGenerator] = useState(false)
  const [generatedKeys, setGeneratedKeys] = useState([])
  const [activationKeys, setActivationKeys] = useState([])
  const [quantity, setQuantity] = useState("1")
  const [loading, setLoading] = useState(false)
  const [loadingKeys, setLoadingKeys] = useState(true)
  const [error, setError] = useState("")

  async function loadActivationKeys() {
    try {
      setLoadingKeys(true)

      const response = await fetch(
        "http://localhost:5000/api/activation-keys",
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load activation keys",
        )
      }

      setActivationKeys(data.activationKeys)
    } catch (error) {
      console.error(error)

      setError(
        "Unable to load activation keys. Make sure the EduDrill backend is running.",
      )
    } finally {
      setLoadingKeys(false)
    }
  }

  useEffect(() => {
    loadActivationKeys()
  }, [])

  async function generateKeys() {
    setLoading(true)
    setError("")
    setGeneratedKeys([])

    try {
      const keys = []

      for (let i = 0; i < Number(quantity); i++) {
        const response = await fetch(
          "http://localhost:5000/api/activation-keys",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          },
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to create activation key",
          )
        }

        keys.push(data.activationKey)
      }

      setGeneratedKeys(keys)

      await loadActivationKeys()
    } catch (error) {
      console.error(error)

      setError(
        "Unable to generate activation key. Make sure the EduDrill backend is running.",
      )
    } finally {
      setLoading(false)
    }
  }

  function copyKeys() {
    const text = generatedKeys
      .map((item) => item.key_code)
      .join("\n")

    navigator.clipboard.writeText(text)
  }

  const totalKeys = activationKeys.length

  const unusedKeys = activationKeys.filter(
    (key) => key.status === "Unused",
  ).length

  const activeKeys = activationKeys.filter(
    (key) => key.status === "Active",
  ).length

  const revokedKeys = activationKeys.filter(
    (key) => key.status === "Revoked",
  ).length

  return (
    <main className="activation-keys-page">

      <header className="admin-dashboard-header">

        <Link
          to="/admin/dashboard"
          className="admin-dashboard-brand"
        >
          <div className="admin-dashboard-logo">
            E
          </div>

          <div>
            <strong>EduDrill</strong>
            <span>Administration</span>
          </div>
        </Link>

        <div className="admin-header-actions">

          <span className="admin-status">
            ● Admin
          </span>

          <Link
            to="/admin/dashboard"
            className="admin-logout"
          >
            ← Dashboard
          </Link>

        </div>

      </header>

      <section className="activation-keys-container">

        <div className="activation-keys-heading">

          <div>
            <span>LICENSE MANAGEMENT</span>

            <h1>Activation Keys</h1>

            <p>
              Create and manage activation keys used to
              authorize EduDrill installations.
            </p>
          </div>

          <button
            className="create-key-button"
            onClick={() => {
              setShowGenerator(true)
              setGeneratedKeys([])
              setError("")
            }}
          >
            + Generate Activation Key
          </button>

        </div>

        <section className="license-summary">

          <div>
            <span>Total Keys</span>
            <strong>{totalKeys}</strong>
          </div>

          <div>
            <span>Unused</span>
            <strong>{unusedKeys}</strong>
          </div>

          <div>
            <span>Active</span>
            <strong>{activeKeys}</strong>
          </div>

          <div>
            <span>Revoked</span>
            <strong>{revokedKeys}</strong>
          </div>

        </section>

        {error && (
          <div className="generated-warning">
            {error}
          </div>
        )}

        <section className="activation-table-card">

          <div className="activation-table-header">

            <div>
              <h2>Activation Keys</h2>

              <span>
                {totalKeys} records from the EduDrill database
              </span>
            </div>

          </div>

          <div className="activation-table-wrapper">

            {loadingKeys ? (
              <div className="activation-empty-state">
                <div className="activation-empty-icon">
                  🔄
                </div>

                <h3>Loading activation keys...</h3>

                <p>
                  Connecting to the EduDrill database.
                </p>
              </div>
            ) : activationKeys.length === 0 ? (
              <div className="activation-empty-state">

                <div className="activation-empty-icon">
                  🔑
                </div>

                <h3>No activation keys yet</h3>

                <p>
                  Generate an activation key to create
                  your first license record.
                </p>

              </div>
            ) : (
              <table className="activation-table">

                <thead>
                  <tr>
                    <th>Activation Key</th>
                    <th>License Type</th>
                    <th>Status</th>
                    <th>Created</th>
                  </tr>
                </thead>

                <tbody>

                  {activationKeys.map((key) => (
                    <tr key={key.id}>

                      <td>
                        <span className="product-key">
                          {key.key_code}
                        </span>
                      </td>

                      <td>
                        {key.license_type}
                      </td>

                      <td>
                        <span
                          className={`license-status ${key.status.toLowerCase()}`}
                        >
                          {key.status}
                        </span>
                      </td>

                      <td>
                        {new Date(
                          key.created_at,
                        ).toLocaleString()}
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>
            )}

          </div>

        </section>

        <section className="license-explanation">

          <div>
            <span>HOW IT WORKS</span>

            <h2>
              Activation Key → Product Key → License
            </h2>

            <p>
              An activation key is created by the admin.
              When a student activates EduDrill, the server
              verifies the activation key and connects it to
              that installation's Product Key.
            </p>
          </div>

        </section>

      </section>

      {showGenerator && (
        <div className="generator-overlay">

          <div className="generator-modal">

            <div className="generator-header">

              <div>
                <span>CREATE LICENSE</span>

                <h2>
                  Generate Activation Key
                </h2>
              </div>

              <button
                className="generator-close"
                onClick={() => setShowGenerator(false)}
              >
                ×
              </button>

            </div>

            <div className="generator-form">

              <div className="generator-field">

                <label>
                  Number of Keys
                </label>

                <select
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(event.target.value)
                  }
                >
                  <option value="1">1 Key</option>
                  <option value="5">5 Keys</option>
                  <option value="10">10 Keys</option>
                  <option value="25">25 Keys</option>
                  <option value="50">50 Keys</option>
                  <option value="100">100 Keys</option>
                </select>

              </div>

              <button
                className="generate-now-button"
                onClick={generateKeys}
                disabled={loading}
              >
                {loading
                  ? "Generating..."
                  : "Generate Keys"}
              </button>

              {generatedKeys.length > 0 && (
                <div className="generated-result">

                  <div className="generated-result-heading">

                    <div>
                      <span>
                        GENERATED SUCCESSFULLY
                      </span>

                      <h3>
                        {generatedKeys.length} Activation Key
                        {generatedKeys.length > 1
                          ? "s"
                          : ""}
                      </h3>
                    </div>

                    <button
                      className="copy-keys-button"
                      onClick={copyKeys}
                    >
                      Copy All
                    </button>

                  </div>

                  <div className="generated-keys-list">

                    {generatedKeys.map((item) => (
                      <div
                        key={item.id}
                        className="generated-key"
                      >
                        <code>
                          {item.key_code}
                        </code>

                        <span>
                          {item.status}
                        </span>
                      </div>
                    ))}

                  </div>

                  <div className="generated-warning">
                    These keys have been saved to the
                    EduDrill PostgreSQL database.
                  </div>

                </div>
              )}

            </div>

          </div>

        </div>
      )}

    </main>
  )
}

export default ActivationKeys