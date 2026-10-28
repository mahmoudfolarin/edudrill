import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import MobileStudentOnboarding from "./mobile/MobileStudentOnboarding";
import edudrillLogo from "../assets/edudrill_logo.jpg";

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
      // 1. Prepare local student profile
      const localUser = {
        id: "student_" + Date.now(),
        name: formData.name,
        email: formData.email,
        school: formData.school,
        state: formData.state,
        phone_number: formData.phone_number,
        created_at: new Date().toISOString()
      };

      // 2. Persist locally immediately (zero internet required)
      localStorage.setItem("student_registered", "true");
      localStorage.setItem("student_token", "token_" + Date.now());
      localStorage.setItem("student_data", JSON.stringify(localUser));

      if (window.desktopApi?.saveProfile) {
        try {
          await window.desktopApi.saveProfile(localUser);
        } catch (dbErr) {
          console.warn("Could not save profile to SQLite:", dbErr);
        }
      }

      // 3. If online, attempt background sync with backend without blocking or failing
      if (typeof navigator !== "undefined" && navigator.onLine) {
        try {
          const rawUrl = import.meta.env.VITE_API_URL || 'https://edudrill-1.onrender.com';
          const API_URL = rawUrl.replace(/\/+$/, '');
          fetch(`${API_URL}/api/auth/onboard`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
          }).then(res => res.json()).then(data => {
            if (data?.success && data?.user) {
              localStorage.setItem("student_data", JSON.stringify(data.user));
              if (data.token) localStorage.setItem("student_token", data.token);
            }
          }).catch(() => {});
        } catch (_) {}
      }

      // 4. Navigate directly to exam selection
      navigate("/exams");
    } catch (err) {
      console.error("Onboarding error:", err);
      localStorage.setItem("student_registered", "true");
      navigate("/exams");
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
      background: "#F8FAFC",
      fontFamily: "'Inter', sans-serif",
      padding: "24px"
    }}>
      <div style={{ 
        backgroundColor: "#FFFFFF", 
        padding: "48px 40px", 
        borderRadius: "20px", 
        boxShadow: "0 10px 30px -4px rgba(11, 33, 68, 0.08)", 
        width: "100%", 
        maxWidth: "500px",
        border: "1px solid #E2E8F0"
      }}>
        
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img src={edudrillLogo} alt="EduDrill" style={{ height: "64px", width: "64px", borderRadius: "14px", objectFit: "cover", marginBottom: "14px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(11, 33, 68, 0.06)" }} />
          <h1 style={{ color: "#0B2144", margin: 0, fontSize: "1.75rem", fontWeight: "800", letterSpacing: "-0.5px" }}>Welcome to EduDrill</h1>
          <p style={{ color: "#475569", marginTop: "8px", fontSize: "0.95rem" }}>Create your student profile to personalize your CBT drills.</p>
        </div>

        {error && <div style={{ backgroundColor: "#FEE2E2", color: "#DC2626", padding: "12px", borderRadius: "10px", marginBottom: "20px", textAlign: "center", fontWeight: "600", fontSize: "14px" }}>{error}</div>}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ color: "#0F172A", fontWeight: "700", fontSize: "0.9rem" }}>Full Name <span style={{color: "#DC2626"}}>*</span></label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange} 
              style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #CBD5E1", borderRadius: "10px", fontSize: "1rem", outline: "none", transition: "border-color 0.2s", color: "#0F172A", background: "#FFFFFF" }}
              placeholder="e.g. Mahmoud Olanrewaju"
              onFocus={(e) => e.target.style.borderColor = "#2563EB"}
              onBlur={(e) => e.target.style.borderColor = "#CBD5E1"}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ color: "#0F172A", fontWeight: "700", fontSize: "0.9rem" }}>Email Address <span style={{color: "#DC2626"}}>*</span></label>
            <input 
              type="email" 
              name="email" 
              required 
              value={formData.email} 
              onChange={handleChange} 
              style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #CBD5E1", borderRadius: "10px", fontSize: "1rem", outline: "none", transition: "border-color 0.2s", color: "#0F172A", background: "#FFFFFF" }}
              placeholder="e.g. mahmoud@example.com"
              onFocus={(e) => e.target.style.borderColor = "#2563EB"}
              onBlur={(e) => e.target.style.borderColor = "#CBD5E1"}
            />
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
              <label style={{ color: "#0F172A", fontWeight: "700", fontSize: "0.9rem" }}>State <span style={{color: "#DC2626"}}>*</span></label>
              <input 
                type="text" 
                name="state" 
                required 
                value={formData.state} 
                onChange={handleChange} 
                style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #CBD5E1", borderRadius: "10px", fontSize: "1rem", outline: "none", transition: "border-color 0.2s", color: "#0F172A", background: "#FFFFFF" }}
                placeholder="e.g. Lagos"
                onFocus={(e) => e.target.style.borderColor = "#2563EB"}
                onBlur={(e) => e.target.style.borderColor = "#CBD5E1"}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "6px", flex: 1 }}>
              <label style={{ color: "#0F172A", fontWeight: "700", fontSize: "0.9rem" }}>Phone <span style={{color: "#94A3B8", fontSize: "0.8rem", fontWeight: "normal"}}>(Optional)</span></label>
              <input 
                type="tel" 
                name="phone_number" 
                value={formData.phone_number} 
                onChange={handleChange} 
                style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #CBD5E1", borderRadius: "10px", fontSize: "1rem", outline: "none", transition: "border-color 0.2s", color: "#0F172A", background: "#FFFFFF" }}
                placeholder="e.g. 0801..."
                onFocus={(e) => e.target.style.borderColor = "#2563EB"}
                onBlur={(e) => e.target.style.borderColor = "#CBD5E1"}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ color: "#0F172A", fontWeight: "700", fontSize: "0.9rem" }}>School <span style={{color: "#94A3B8", fontSize: "0.8rem", fontWeight: "normal"}}>(Optional)</span></label>
            <input 
              type="text" 
              name="school" 
              value={formData.school} 
              onChange={handleChange} 
              style={{ width: "100%", padding: "13px 16px", border: "1.5px solid #CBD5E1", borderRadius: "10px", fontSize: "1rem", outline: "none", transition: "border-color 0.2s", color: "#0F172A", background: "#FFFFFF" }}
              placeholder="e.g. King's College"
              onFocus={(e) => e.target.style.borderColor = "#2563EB"}
              onBlur={(e) => e.target.style.borderColor = "#CBD5E1"}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: "12px", 
              width: "100%", 
              padding: "16px", 
              background: "#D97706", 
              color: "#FFFFFF", 
              border: "none", 
              borderRadius: "12px", 
              fontSize: "1.05rem", 
              fontWeight: "800", 
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: "0 6px 18px rgba(217, 119, 6, 0.35)",
              transition: "transform 0.15s, box-shadow 0.15s",
              opacity: loading ? 0.8 : 1
            }}
          >
            {loading ? "Creating Profile..." : "Start Learning →"}
          </button>
        </form>
      </div>
    </main>
  );
}

export default StudentOnboarding;
