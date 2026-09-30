import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Performance() {
  const { exam, subject } = useParams();
  const [performances, setPerformances] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/user/performance')
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter(p => p.exam === exam && p.subject === subject)
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setPerformances(filtered);
      })
      .catch(err => console.error("Error fetching performances:", err));
  }, [exam, subject]);

  const calculateAverage = () => {
    if (performances.length === 0) return 0;
    const sum = performances.reduce((acc, p) => acc + p.percentage, 0);
    return Math.round(sum / performances.length);
  };

  return (
    <main className="dashboard-layout" style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ 
        background: 'linear-gradient(135deg, #0B2447 0%, #19376D 100%)', 
        borderRadius: '16px', 
        padding: '32px 40px', 
        marginBottom: '32px', 
        color: 'white',
        boxShadow: '0 10px 15px -3px rgba(11, 36, 71, 0.2)'
      }}>
        <Link to={`/dashboard/${exam}/subjects/${subject}`} style={{ color: '#DCEBFF', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '16px' }}>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '8px' }}>← Back to Subject</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', fontSize: '28px' }}>📊</div>
          <div>
            <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Performance Overview</h1>
            <p style={{ color: '#DCEBFF', fontSize: '16px', margin: 0, opacity: 0.9 }}>Track your practice and CBT scores over time.</p>
          </div>
        </div>
      </header>

      {performances.length > 0 && (
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '32px', display: 'flex', gap: '48px', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div>
            <span style={{ display: 'block', color: '#64748b', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Average Score</span>
            <div style={{ fontSize: '48px', fontWeight: '800', color: calculateAverage() >= 70 ? '#10b981' : calculateAverage() >= 50 ? '#f59e0b' : '#ef4444' }}>
              {calculateAverage()}%
            </div>
          </div>
          <div>
            <span style={{ display: 'block', color: '#64748b', fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Sessions Completed</span>
            <div style={{ fontSize: '48px', fontWeight: '800', color: '#0B2447' }}>
              {performances.length}
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 style={{ color: '#0B2447', fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Recent Sessions</h2>
        {performances.length === 0 ? (
          <div style={{ padding: '48px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
            <span style={{ fontSize: '48px' }}>📊</span>
            <h3 style={{ color: '#0B2447', fontSize: '20px', fontWeight: '700', marginTop: '16px' }}>No performance data yet</h3>
            <p style={{ color: '#64748b', marginTop: '8px' }}>Complete practice tests or mock exams to see your progress here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {performances.map((perf, idx) => (
              <div key={idx} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#0B2447' }}>{perf.type}</h3>
                  <div style={{ color: '#64748b', fontSize: '14px', display: 'flex', gap: '16px' }}>
                    <span>📅 {new Date(perf.created_at).toLocaleDateString()} at {new Date(perf.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    {perf.topic_id && <span>📝 Topic ID: {perf.topic_id}</span>}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: perf.percentage >= 70 ? '#10b981' : perf.percentage >= 50 ? '#f59e0b' : '#ef4444' }}>
                    {perf.percentage}%
                  </div>
                  <div style={{ color: '#64748b', fontSize: '13px' }}>
                    {perf.score} / {perf.total} correct
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
