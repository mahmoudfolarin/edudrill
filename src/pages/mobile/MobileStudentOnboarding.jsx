import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MobileStudentOnboarding() {
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

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)', display: 'flex', flexDirection: 'column' }}>
      
      <div style={{ padding: '40px 24px 20px', textAlign: 'center', color: 'white' }}>
        <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: '80px', height: '80px', borderRadius: '24px', marginBottom: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.2)' }} />
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Welcome!</h1>
        <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0, lineHeight: 1.5 }}>Let's personalize your learning experience.</p>
      </div>

      <div style={{ flex: 1, background: 'white', borderRadius: '32px 32px 0 0', padding: '32px 24px', boxShadow: '0 -4px 24px rgba(0,0,0,0.1)' }}>
        
        {error && (
          <div style={{ background: '#fee2e2', color: '#991b1b', padding: '12px', borderRadius: '12px', marginBottom: '24px', textAlign: 'center', fontSize: '14px', fontWeight: '600' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#334155', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name <span style={{color: '#e11d48'}}>*</span></label>
            <input 
              type="text" 
              name="name" 
              required 
              value={formData.name} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '15px', background: '#f8fafc', outline: 'none' }}
              placeholder="e.g. Mahmoud Olanrewaju"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#334155', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address <span style={{color: '#e11d48'}}>*</span></label>
            <input 
              type="email" 
              name="email" 
              required 
              value={formData.email} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '15px', background: '#f8fafc', outline: 'none' }}
              placeholder="name@example.com"
            />
          </div>

          <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ color: '#334155', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>State <span style={{color: '#e11d48'}}>*</span></label>
              <input 
                type="text" 
                name="state" 
                required 
                value={formData.state} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '15px', background: '#f8fafc', outline: 'none' }}
                placeholder="e.g. Lagos"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              <label style={{ color: '#334155', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone</label>
              <input 
                type="tel" 
                name="phone_number" 
                value={formData.phone_number} 
                onChange={handleChange} 
                style={{ width: '100%', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '15px', background: '#f8fafc', outline: 'none' }}
                placeholder="Optional"
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ color: '#334155', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>School</label>
            <input 
              type="text" 
              name="school" 
              value={formData.school} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '16px', border: '1px solid #e2e8f0', borderRadius: '16px', fontSize: '15px', background: '#f8fafc', outline: 'none' }}
              placeholder="Optional"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: '16px', 
              width: '100%', 
              padding: '18px', 
              background: '#0ea5e9', 
              color: 'white', 
              border: 'none', 
              borderRadius: '20px', 
              fontSize: '16px', 
              fontWeight: '800', 
              opacity: loading ? 0.7 : 1,
              boxShadow: '0 8px 20px rgba(14, 165, 233, 0.3)'
            }}
          >
            {loading ? "Creating Profile..." : "Start Learning"}
          </button>
        </form>
      </div>

    </main>
  );
}
