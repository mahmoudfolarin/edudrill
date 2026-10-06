import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function MobilePerformance() {
  const { exam, subject } = useParams();
  const [performances, setPerformances] = useState([]);
  const [selectedPerf, setSelectedPerf] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/performance')
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter(p => p.exam === exam && (!subject || p.subject === subject))
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setPerformances(filtered);
      })
      .catch(err => console.error("Error fetching performances:", err))
      .finally(() => setLoading(false));
  }, [exam, subject]);

  const calculateAverage = () => {
    if (performances.length === 0) return 0;
    const sum = performances.reduce((acc, p) => acc + p.percentage, 0);
    return Math.round(sum / performances.length);
  };

  const formatTime = (secs) => {
    if (!secs) return "00:00";
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (selectedPerf) {
    const cPct = (selectedPerf.correct_count / selectedPerf.total) * 100 || 0;
    const wPct = (selectedPerf.wrong_count / selectedPerf.total) * 100 || 0;
    const uPct = (selectedPerf.unanswered_count / selectedPerf.total) * 100 || 0;

    return (
      <main style={{ minHeight: '100vh', background: '#F8FAFC', paddingBottom: '40px' }}>
        
        {/* Header */}
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <button 
            onClick={() => setSelectedPerf(null)}
            style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold', marginRight: '16px' }}
          >
            ←
          </button>
          <div>
            <strong style={{ color: '#1e293b', fontSize: '16px', display: 'block', textTransform: 'capitalize' }}>{selectedPerf.subject.replace(/-/g, ' ')}</strong>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{new Date(selectedPerf.created_at).toLocaleDateString()}</span>
          </div>
        </header>

        {/* Score Card */}
        <div style={{ padding: '24px 16px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%)', borderRadius: '24px', padding: '24px', color: 'white', textAlign: 'center', boxShadow: '0 10px 30px rgba(30, 64, 175, 0.3)', marginBottom: '24px' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', display: 'inline-block', marginBottom: '16px' }}>{selectedPerf.type}</span>
            <div style={{ fontSize: '48px', fontWeight: '900', lineHeight: 1 }}>{selectedPerf.percentage}%</div>
            <div style={{ fontSize: '14px', fontWeight: '600', marginTop: '8px', opacity: 0.9 }}>Overall Score</div>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px', opacity: 0.9, fontSize: '13px' }}>
              <span>⏱ {formatTime(selectedPerf.time_used)}</span>
              <span>•</span>
              <span>{selectedPerf.score} / {selectedPerf.total} Pts</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '32px' }}>
            <div style={{ background: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ color: '#3B82F6', fontSize: '20px', fontWeight: '800' }}>{selectedPerf.correct_count}</div>
              <div style={{ color: '#64748B', fontSize: '12px', fontWeight: '600', marginTop: '4px' }}>Correct</div>
            </div>
            <div style={{ background: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ color: '#1E40AF', fontSize: '20px', fontWeight: '800' }}>{selectedPerf.wrong_count}</div>
              <div style={{ color: '#64748B', fontSize: '12px', fontWeight: '600', marginTop: '4px' }}>Wrong</div>
            </div>
            <div style={{ background: 'white', padding: '16px', borderRadius: '16px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
              <div style={{ color: '#94A3B8', fontSize: '20px', fontWeight: '800' }}>{selectedPerf.unanswered_count}</div>
              <div style={{ color: '#64748B', fontSize: '12px', fontWeight: '600', marginTop: '4px' }}>Skipped</div>
            </div>
          </div>

          <h2 style={{ color: '#0F172A', fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>Review Questions</h2>
          
          {(!selectedPerf.detailed_responses || selectedPerf.detailed_responses.length === 0) ? (
            <div style={{ background: 'white', padding: '32px', borderRadius: '16px', textAlign: 'center', color: '#64748B' }}>
              No detailed responses available.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {selectedPerf.detailed_responses.map((q, i) => {
                const statusColor = q.is_correct ? '#3B82F6' : (q.is_answered ? '#1E40AF' : '#94A3B8');
                const statusLabel = q.is_correct ? 'Correct' : (q.is_answered ? 'Wrong' : 'Skipped');
                
                return (
                  <div key={i} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', border: `1px solid ${q.is_correct ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.1)'}` }}>
                    <div style={{ padding: '12px 16px', background: q.is_correct ? 'rgba(59, 130, 246, 0.05)' : 'rgba(30, 64, 175, 0.03)', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Q {i + 1}</span>
                      <span style={{ background: statusColor, color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: '700', textTransform: 'uppercase' }}>
                        {statusLabel}
                      </span>
                    </div>
                    <div style={{ padding: '16px' }}>
                      <div style={{ fontSize: '14px', color: '#1E293B', lineHeight: 1.5, marginBottom: '16px' }} dangerouslySetInnerHTML={{ __html: q.question_text }}></div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
                          <strong style={{ color: '#64748B', fontSize: '12px', marginBottom: '4px' }}>Your Answer:</strong>
                          <span style={{ fontSize: '14px', color: q.is_answered ? (q.is_correct ? '#3B82F6' : '#1E40AF') : '#94A3B8', fontWeight: q.is_answered ? '600' : '400' }} dangerouslySetInnerHTML={{ __html: q.selected || 'None' }}></span>
                        </div>
                        
                        {!q.is_correct && (
                          <div style={{ display: 'flex', flexDirection: 'column', padding: '12px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '8px' }}>
                            <strong style={{ color: '#3B82F6', fontSize: '12px', marginBottom: '4px' }}>Correct Answer:</strong>
                            <span style={{ fontSize: '14px', color: '#1E293B', fontWeight: '600' }} dangerouslySetInnerHTML={{ __html: q.correct }}></span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC', paddingBottom: '80px' }}>
      
      {/* Header */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to={subject ? `/dashboard/${exam}/subjects/${subject}` : `/dashboard/${exam}`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ color: '#1e293b', fontSize: '16px' }}>Performance</strong>
        </div>
        <div style={{ width: '24px' }} />
      </header>

      <div style={{ padding: '24px 16px' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '30px', height: '30px', border: '3px solid #e2e8f0', borderTopColor: '#3B82F6', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#64748b', fontSize: '14px' }}>Loading history...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <>
            {performances.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <div style={{ background: 'white', padding: '20px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>🎯</div>
                  <div style={{ fontSize: '28px', fontWeight: '900', color: '#1E293B', lineHeight: 1 }}>{calculateAverage()}%</div>
                  <div style={{ color: '#64748B', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginTop: '8px' }}>Avg Score</div>
                </div>
                <div style={{ background: 'white', padding: '20px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>📚</div>
                  <div style={{ fontSize: '28px', fontWeight: '900', color: '#1E293B', lineHeight: 1 }}>{performances.length}</div>
                  <div style={{ color: '#64748B', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', marginTop: '8px' }}>Sessions</div>
                </div>
              </div>
            )}

            <h2 style={{ color: '#0F172A', fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>History</h2>
            
            {performances.length === 0 ? (
              <div style={{ padding: '40px 20px', background: 'white', borderRadius: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
                <h3 style={{ color: '#1E293B', fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>No performance data</h3>
                <p style={{ color: '#64748B', fontSize: '14px' }}>Complete practice tests to track your progress here.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {performances.map((perf, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => setSelectedPerf(perf)}
                    style={{ background: 'white', borderRadius: '16px', padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}
                  >
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: perf.percentage >= 70 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(30, 64, 175, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: perf.percentage >= 70 ? '#3B82F6' : '#1E40AF', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>
                      {perf.percentage}%
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1E293B', fontWeight: '700', textTransform: 'capitalize', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {perf.subject.replace(/-/g, ' ')}
                      </h3>
                      <div style={{ color: '#64748B', fontSize: '12px', display: 'flex', gap: '8px', fontWeight: '500' }}>
                        <span style={{ color: '#3B82F6' }}>{perf.type}</span>
                        <span>•</span>
                        <span>{new Date(perf.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div style={{ color: '#CBD5E1', fontWeight: 'bold' }}>
                      ›
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
