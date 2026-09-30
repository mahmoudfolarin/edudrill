import { Link } from "react-router-dom";

export default function AdminLessons() {
  return (
    <main style={{ padding: '40px', background: '#f8fafc', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <Link to="/admin/dashboard" style={{ color: '#0ea5e9', textDecoration: 'none', fontWeight: '600', marginBottom: '8px', display: 'inline-block' }}>
            ← Back to Dashboard
          </Link>
          <h1 style={{ color: '#0B2447', fontSize: '32px', margin: 0 }}>Topics & Lessons</h1>
          <p style={{ color: '#64748b', margin: '8px 0 0 0' }}>Manage topics, lessons and learning materials.</p>
        </div>
        <button style={{ background: '#0ea5e9', color: 'white', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: 'bold' }}>+ New Lesson</button>
      </header>
      
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '48px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📖</div>
        <h3 style={{ color: '#0B2447', fontSize: '20px', fontWeight: '700' }}>Manage content structure</h3>
        <p style={{ color: '#64748b', marginTop: '8px' }}>Use the content editor to author and organize topics and lessons.</p>
      </div>
    </main>
  );
}
