import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    if (email === "olanrewajumahmoud3@gmail.com" && password === "mahmoudedudrill2010") {
      // Create a simple session variable to protect the dashboard if needed
      localStorage.setItem("admin_auth", "true")
      navigate("/admin/dashboard")
    } else {
      setError("Invalid email or password.")
    }
  }

  return (
    <main className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-logo">
          <div><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>

          <span>
            Edu<span>Drill</span>
          </span>
        </div>

        <div className="admin-login-heading">
          <p>ADMINISTRATION</p>

          <h1>Welcome back</h1>

          <span>
            Sign in to manage the EduDrill platform.
          </span>
        </div>

       <form
  className="admin-login-form"
  onSubmit={handleLogin}
>
          {error && <div style={{color: '#93c5fd', background: '#93c5fd', padding: '10px', borderRadius: '8px', fontSize: '14px', marginBottom: '16px'}}>{error}</div>}

          <div className="admin-field">
            <label htmlFor="adminEmail">
              Admin Email
            </label>

            <input
              id="adminEmail"
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="adminPassword">
              Password
            </label>

            <input
              id="adminPassword"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="admin-login-button"
          >
            Sign In
            <span>→</span>
          </button>

        </form>

        <div className="admin-security-note">
          🔐 Authorized administrators only
        </div>

        <Link
          to="/"
          className="admin-back"
        >
          ← Back to EduDrill
        </Link>

      </div>

    </main>
  )
}

export default AdminLogin