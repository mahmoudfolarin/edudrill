import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import MobileStudentOnboarding from "./mobile/MobileStudentOnboarding";

function StudentOnboarding() {
  const { isMobile } = useMobile();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    school: "",
    state: "",
    phone_number: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = rawUrl.replace(/\/+$/, '');
const response = await fetch(`${API_URL}/api/auth/onboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("student_registered", "true");
        localStorage.setItem("student_token", data.token);
        localStorage.setItem("student_data", JSON.stringify(data.user));
        // Redirect to exams page
        navigate("/exams");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isMobile) {
    return <MobileStudentOnboarding />;
  }

  return (
    <main style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      padding: "20px"
    }}>
      <div style={{ 
        backgroundColor: "rgba(255, 255, 255, 0.95)", 
        padding: "50px 40px", 
        borderRadius: "20px", 
        boxShadow: "0 20px 50px rgba(0,0,0,0.3)", 
        width: "100%", 
        maxWidth: "500px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.2)"
      }}>
        
        <div style={{ textAlign: "center", marginBottom: "35px" }}>
          <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ height: "70px", borderRadius: "50%", marginBottom: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }} />
          <h1 style={{ color: "#0f2027", margin: 0, fontSize: "1.8rem", fontWeight: "800", letterSpacing: "-0.5px" }}>Welcome to EduDrill</h1>
          <p style={{ color: "#475569", marginTop: "8px", fontSize: "1rem" }}>Let's personalize your learning experience.</p>
        </div>

        {error && <div style={{ backgroundColor: "#fee2e2", color: "#991b1b", padding: "12px", borderRadius: "8px", marginBottom: "20px", textAlign: "center", fontWeight: "500" }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#334155", fontWeight: "600", fontSize: "0.9rem" }}>Full Name <span style={{color: "#e11d48"}}>*</span></label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange} 
              style={{ width: "100%", padding: "14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
              placeholder="e.g. Mahmoud Olanrewaju"
              onFocus={(e) => e.target.style.borderColor = "#0ea5e9"}
              onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#334155", fontWeight: "600", fontSize: "0.9rem" }}>Email Address <span style={{color: "#e11d48"}}>*</span></label>
            <input 
              type="email" 
              name="email" 
              required 
              value={formData.email} 
              onChange={handleChange} 
              style={{ width: "100%", padding: "14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
              placeholder="e.g. mahmoud@example.com"
              onFocus={(e) => e.target.style.borderColor = "#0ea5e9"}
              onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
            />
          </div>

          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              <label style={{ color: "#334155", fontWeight: "600", fontSize: "0.9rem" }}>State <span style={{color: "#e11d48"}}>*</span></label>
              <input 
                type="text" 
                name="state" 
                required 
                value={formData.state} 
                onChange={handleChange} 
                style={{ width: "100%", padding: "14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
                placeholder="e.g. Lagos"
                onFocus={(e) => e.target.style.borderColor = "#0ea5e9"}
                onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
              <label style={{ color: "#334155", fontWeight: "600", fontSize: "0.9rem" }}>Phone <span style={{color: "#94a3b8", fontSize: "0.8rem", fontWeight: "normal"}}>(Optional)</span></label>
              <input 
                type="tel" 
                name="phone_number" 
                value={formData.phone_number} 
                onChange={handleChange} 
                style={{ width: "100%", padding: "14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
                placeholder="e.g. 0801..."
                onFocus={(e) => e.target.style.borderColor = "#0ea5e9"}
                onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#334155", fontWeight: "600", fontSize: "0.9rem" }}>School <span style={{color: "#94a3b8", fontSize: "0.8rem", fontWeight: "normal"}}>(Optional)</span></label>
            <input 
              type="text" 
              name="school" 
              value={formData.school} 
              onChange={handleChange} 
              style={{ width: "100%", padding: "14px", border: "1px solid #cbd5e1", borderRadius: "10px", fontSize: "1rem", outline: "none", transition: "border-color 0.2s" }}
              placeholder="e.g. King's College"
              onFocus={(e) => e.target.style.borderColor = "#0ea5e9"}
              onBlur={(e) => e.target.style.borderColor = "#cbd5e1"}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: "15px", 
              width: "100%", 
              padding: "16px", 
              background: "linear-gradient(to right, #0284c7, #2563eb)", 
              color: "white", 
              border: "none", 
              borderRadius: "10px", 
              fontSize: "1.1rem", 
              fontWeight: "700", 
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
              transition: "transform 0.1s, box-shadow 0.1s",
              opacity: loading ? 0.8 : 1
            }}
            onMouseOver={(e) => { if(!loading) { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 6px 20px rgba(37, 99, 235, 0.4)"; } }}
            onMouseOut={(e) => { if(!loading) { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 4px 15px rgba(37, 99, 235, 0.3)"; } }}
          >
            {loading ? "Creating Profile..." : "Start Learning"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default StudentOnboarding;
