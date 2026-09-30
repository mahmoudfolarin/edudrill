import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"

function ProductLicenses() {
  const [licenses, setLicenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("All Statuses")

  async function loadLicenses() {
    try {
      setLoading(true)
      setError("")

      const response = await fetch(
        "http://localhost:5000/api/products",
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to load product licenses",
        )
      }

      setLicenses(data.products || [])
    } catch (error) {
      console.error(
        "Product licenses error:",
        error,
      )

      setError(
        "Unable to load product licenses. Make sure the EduDrill server is running.",
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadLicenses()
  }, [])

  const filteredLicenses = useMemo(() => {
    return licenses.filter((license) => {
      const searchText = search
        .trim()
        .toLowerCase()

      const matchesSearch =
        !searchText ||
        license.product_key
          ?.toLowerCase()
          .includes(searchText) ||
        license.activation_key
          ?.toLowerCase()
          .includes(searchText)

      const matchesStatus =
        statusFilter === "All Statuses" ||
        license.status?.toLowerCase() ===
          statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [licenses, search, statusFilter])

  const totalLicenses = licenses.length

  const activeLicenses = licenses.filter(
    (license) =>
      license.status?.toLowerCase() ===
      "active",
  ).length

  const revokedLicenses = licenses.filter(
    (license) =>
      license.status?.toLowerCase() ===
      "revoked",
  ).length

  const registeredDevices = licenses.filter(
    (license) => license.last_seen_at,
  ).length

  function formatDate(date) {
    if (!date) {
      return "Not activated"
    }

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    )
  }

  function formatLastSeen(date) {
    if (!date) {
      return "Never"
    }

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    )
  }

  return (
    <main className="product-licenses-page">

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

      <section className="product-licenses-container">

        <div className="product-licenses-heading">

          <div>
            <span>LICENSE MANAGEMENT</span>

            <h1>Product Licenses</h1>

            <p>
              View and manage EduDrill installations
              and their activation relationships.
            </p>
          </div>

        </div>

        <div className="license-summary">

          <div>
            <span>Total Licenses</span>
            <strong>
              {totalLicenses}
            </strong>
          </div>

          <div>
            <span>Active</span>
            <strong>
              {activeLicenses}
            </strong>
          </div>

          <div>
            <span>Revoked</span>
            <strong>
              {revokedLicenses}
            </strong>
          </div>

          <div>
            <span>Registered Devices</span>
            <strong>
              {registeredDevices}
            </strong>
          </div>

        </div>

        <div className="activation-toolbar">

          <div className="activation-search">
            🔍

            <input
              type="text"
              placeholder="Search Product Key or Activation Key..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <select
            className="activation-filter"
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >
            <option>All Statuses</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Revoked</option>
          </select>

        </div>

        <section className="activation-table-card">

          <div className="activation-table-header">

            <h2>
              Registered Licenses
            </h2>

            <span>
              {filteredLicenses.length}{" "}
              {filteredLicenses.length === 1
                ? "record"
                : "records"}
            </span>

          </div>

          {loading && (
            <div className="license-loading">
              Loading product licenses...
            </div>
          )}

          {error && !loading && (
            <div className="license-error">
              {error}

              <button
                type="button"
                onClick={loadLicenses}
              >
                Retry
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            filteredLicenses.length === 0 && (
              <div className="license-empty">
                No product licenses found.
              </div>
            )}

          {!loading &&
            !error &&
            filteredLicenses.length > 0 && (
              <div className="activation-table-wrapper">

                <table className="activation-table">

                  <thead>
                    <tr>
                      <th>Product Key</th>
                      <th>Activation Key</th>
                      <th>Status</th>
                      <th>Device</th>
                      <th>Activated</th>
                      <th>Last Seen</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>

                    {filteredLicenses.map(
                      (license) => {

                        const status =
                          license.status ||
                          "Inactive"

                        const device =
                          license.last_seen_at
                            ? "Registered"
                            : "Not registered"

                        return (
                          <tr
                            key={
                              license.id
                            }
                          >

                            <td>
                              <code>
                                {
                                  license.product_key
                                }
                              </code>
                            </td>

                            <td>
                              <span className="product-key">
                                {
                                  license.activation_key ||
                                  "Not activated"
                                }
                              </span>
                            </td>

                            <td>
                              <span
                                className={`license-status ${status.toLowerCase()}`}
                              >
                                {status}
                              </span>
                            </td>

                            <td>
                              <span className="device-status">
                                ● {device}
                              </span>
                            </td>

                            <td>
                              {formatDate(
                                license.activated_at,
                              )}
                            </td>

                            <td>
                              {formatLastSeen(
                                license.last_seen_at,
                              )}
                            </td>

                            <td>
                              <button
                                type="button"
                                className="table-action"
                              >
                                Manage
                              </button>
                            </td>

                          </tr>
                        )
                      },
                    )}

                  </tbody>

                </table>

              </div>
            )}

        </section>

        <section className="license-flow-card">

          <div className="license-flow-header">

            <span>
              HOW LICENSING CONNECTS
            </span>

            <h2>
              Product Key → Activation Key → License
            </h2>

          </div>

          <div className="license-flow">

            <div className="license-flow-item">

              <div className="license-flow-number">
                01
              </div>

              <div>
                <strong>
                  Product Key
                </strong>

                <p>
                  Automatically generated for
                  the installation/device.
                </p>
              </div>

            </div>

            <div className="license-flow-arrow">
              →
            </div>

            <div className="license-flow-item">

              <div className="license-flow-number">
                02
              </div>

              <div>
                <strong>
                  Activation Key
                </strong>

                <p>
                  A key created and issued by
                  the admin.
                </p>
              </div>

            </div>

            <div className="license-flow-arrow">
              →
            </div>

            <div className="license-flow-item">

              <div className="license-flow-number">
                03
              </div>

              <div>
                <strong>
                  License
                </strong>

                <p>
                  The server links both keys and
                  authorizes the installation.
                </p>
              </div>

            </div>

          </div>

        </section>

      </section>

    </main>
  )
}

export default ProductLicenses