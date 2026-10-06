import { Link, useParams } from "react-router-dom";

export default function MobileAITutorHistory() {
  const { exam, subject } = useParams();

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to={`/dashboard/${exam}/subjects/${subject}/ai-tutor`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <strong style={{ color: '#1e293b', fontSize: '16px' }}>AI Tutor History</strong>
        <div style={{ width: '24px' }} />
      </header>

      <div style={{ padding: '24px 16px' }}>
        
        <div style={{ padding: '40px 20px', background: 'white', borderRadius: '20px', textAlign: 'center', border: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
          <h3 style={{ color: '#1E293B', fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>No conversation history</h3>
          <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
            Your previous AI Tutor conversations will appear here.
          </p>
          <Link to={`/dashboard/${exam}/subjects/${subject}/ai-tutor`} style={{ display: 'inline-block', marginTop: '24px', background: '#123b72', color: 'white', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>
            Start a new chat
          </Link>
        </div>

      </div>

    </main>
  );
}
