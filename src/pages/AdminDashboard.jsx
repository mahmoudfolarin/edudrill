import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loadingStats, setLoadingStats] = useState(true)
  const [statsError, setStatsError] = useState("")

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoadingStats(true)
        setStatsError("")

        const response = await fetch(
          "http://localhost:5000/api/admin/stats",
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load admin statistics",
          )
        }

        setStats(data.stats)
      } catch (error) {
        console.error("Admin stats error:", error)

        setStatsError(
          "Unable to load live statistics.",
        )
      } finally {
        setLoadingStats(false)
      }
    }

    fetchStats()
  }, [])

  const displayValue = (value) => {
    if (loadingStats) {
      return "..."
    }

    if (statsError) {
      return "—"
    }

    return value ?? 0
  }

  const statCards = [
    {
      icon: "👥",
      label: "Total Users",
      value: displayValue(stats?.users),
      path: "/admin/users"
    },
    {
      icon: "🔑",
      label: "Active Licenses",
      value: displayValue(stats?.activeLicenses),
      path: "/admin/product-licenses"
    },
    {
      icon: "📝",
      label: "Questions",
      value: displayValue(stats?.questions),
      path: "/admin/questions"
    },
    {
      icon: "📚",
      label: "Subjects",
      value: displayValue(stats?.subjects),
      path: "/admin/subjects"
    },
  ]

  const managementItems = [
    {
      icon: "🔑",
      title: "Activation Keys",
      description:
        "Create, view, activate, revoke and manage activation keys.",
      path: "/admin/activation-keys",
    },
    {
      icon: "💻",
      title: "Product Licenses",
      description:
        "Manage product keys, devices and activated installations.",
      path: "/admin/product-licenses",
    },
    {
      icon: "👥",
      title: "Users",
      description:
        "View and manage EduDrill users and their accounts.",
      path: "/admin/users",
    },
    {
      icon: "📝",
      title: "Questions",
      description:
        "Manage verified past questions and approved practice content.",
      path: "/admin/questions",
    },
    {
      icon: "📚",
      title: "Exams & Subjects",
      description:
        "Control examinations, subjects, courses and availability.",
      path: "/admin/subjects",
    },
    {
      icon: "📖",
      title: "Topics & Lessons",
      description:
        "Manage topics, lessons and learning materials.",
      path: "/admin/lessons",
    },
    {
      icon: "🤖",
      title: "AI Tutor",
      description:
        "Manage AI Tutor settings and generated practice content.",
      path: "/admin/ai-tutor",
    },
    {
      icon: "📊",
      title: "Analytics",
      description:
        "View platform activity, usage and performance statistics.",
      path: "/admin/analytics",
    },
  ]

  return (
    <main className="admin-dashboard-page">
      <header className="admin-dashboard-header">
        <Link
          to="/"
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
            to="/admin"
            className="admin-logout"
            onClick={() => localStorage.removeItem("admin_auth")}
          >
            Log Out
          </Link>
        </div>
      </header>

      <section className="admin-dashboard-container">
        <div className="admin-welcome">
          <div>
            <span>ADMINISTRATION</span>

            <h1>
              EduDrill Control Center
            </h1>

            <p>
              Manage your platform, content, licenses
              and users from one place.
            </p>
          </div>

          <div className="admin-welcome-icon">
            ⚙️
          </div>
        </div>

        {statsError && (
          <div
            style={{
              marginBottom: "20px",
              padding: "12px 15px",
              borderRadius: "10px",
              background: "#93c5fd",
              border: "1px solid #f0dada",
              color: "#a34a4a",
              fontSize: "11px",
            }}
          >
            {statsError}
          </div>
        )}

        <section className="admin-stats-grid">
          {statCards.map((stat) => (
            <Link
              key={stat.label}
              to={stat.path || '#'}
              className="admin-stat-card"
              style={{ textDecoration: 'none', color: 'inherit', transition: 'transform 0.2s', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div className="admin-stat-icon">
                {stat.icon}
              </div>

              <div>
                <strong>
                  {stat.value}
                </strong>

                <span>
                  {stat.label}
                </span>
              </div>
            </Link>
          ))}
        </section>

        <section className="admin-management-section">
          <div className="admin-section-heading">
            <div>
              <span>
                PLATFORM MANAGEMENT
              </span>

              <h2>
                Manage EduDrill
              </h2>

              <p>
                Choose an area to manage.
              </p>
            </div>
          </div>

          <div className="admin-management-grid">
            {managementItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                className="admin-management-card"
              >
                <div className="admin-management-icon">
                  {item.icon}
                </div>

                <div className="admin-management-content">
                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <span>
                    Manage →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="admin-system-section">
          <div className="admin-system-card">
            <div className="admin-system-icon">
              ✓
            </div>

            <div>
              <span>
                SYSTEM STATUS
              </span>

              <h2>
                EduDrill is ready
              </h2>

              <p>
                The administration interface is currently
                running in development mode.
              </p>
            </div>

            <div className="admin-system-status">
              Online
            </div>
          </div>
        </section>
      </section>

      <footer className="admin-dashboard-footer">
        <strong>EduDrill</strong>
        <span>
          Administration Panel
        </span>
      </footer>
    </main>
  )
}

export default AdminDashboard