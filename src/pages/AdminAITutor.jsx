import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminAITutor() {
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI tutor for EduDrill. Your job is to explain concepts clearly to students.");
  const [model, setModel] = useState("gpt-4");
  const [temperature, setTemperature] = useState(0.7);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // Simulate saving to backend
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <main style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <Link to="/admin/dashboard" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: '600', marginBottom: '8px', display: 'inline-block' }}>
            ← Back to Dashboard
          </Link>
          <h1 style={{ color: '#0B2447', fontSize: '32px', margin: 0 }}>AI Tutor Settings</h1>
          <p style={{ color: '#64748b', margin: '8px 0 0 0' }}>Configure how the AI Tutor behaves and interacts with students.</p>
        </div>
      </header>

      <form onSubmit={handleSave} style={{ background: 'white', padding: '32px', borderRadius: '12px', border: '1px solid #e2e8f0', maxWidth: '800px' }}>
        {saved && (
          <div style={{ background: '#dcfce7', color: '#166534', padding: '12px', borderRadius: '8px', marginBottom: '24px', fontWeight: '600' }}>
            Settings saved successfully!
          </div>
        )}

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', color: '#0B2447', fontWeight: '600', marginBottom: '8px' }}>
            System Prompt
          </label>
          <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px' }}>
            This defines the personality and behavior of the AI Tutor.
          </p>
          <textarea 
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            style={{ width: '100%', minHeight: '150px', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontFamily: 'inherit', resize: 'vertical' }}
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
          <div>
            <label style={{ display: 'block', color: '#0B2447', fontWeight: '600', marginBottom: '8px' }}>
              Model Selection
            </label>
            <select 
              value={model}
              onChange={(e) => setModel(e.target.value)}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo (Faster)</option>
              <option value="gpt-4">GPT-4 (Smarter)</option>
              <option value="gemini-pro">Gemini Pro</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', color: '#0B2447', fontWeight: '600', marginBottom: '8px' }}>
              Creativity (Temperature: {temperature})
            </label>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              style={{ width: '100%', marginTop: '12px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
              <span>Precise (0)</span>
              <span>Creative (1)</span>
            </div>
          </div>
        </div>

        <button type="submit" style={{ background: '#0B2447', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', fontSize: '16px' }}>
          Save Configuration
        </button>
      </form>
    </main>
  );
}
