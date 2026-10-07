import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = rawUrl.replace(/\\+$/, '');
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      
      if (data.success && data.user.role === "admin") {
        localStorage.setItem("admin_auth", "true")
        localStorage.setItem("admin_token", data.token)
        navigate("/admin/dashboard")
      } else {
        setError(data.message || "Invalid credentials or not an admin.")
      }
    } catch {
      setError("Server error. Please try again later.")
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