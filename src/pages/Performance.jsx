import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import MobilePerformance from "./mobile/MobilePerformance";

export default function Performance() {
  const { isMobile } = useMobile();
  const { exam, subject } = useParams();
  const [performances, setPerformances] = useState([]);
  const [selectedPerf, setSelectedPerf] = useState(null);

  useEffect(() => {
    fetch('/api/user/performance')
      .then(res => res.json())
      .then(data => {
        const filtered = data
          .filter(p => p.exam === exam && (!subject || p.subject === subject))
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

  const formatTime = (secs) => {
    if (!secs) return "00:00";
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  if (isMobile) {
    return <MobilePerformance />;
  }

  if (selectedPerf) {
    const cPct = (selectedPerf.correct_count / selectedPerf.total) * 100 || 0;
    const wPct = (selectedPerf.wrong_count / selectedPerf.total) * 100 || 0;
    const uPct = (selectedPerf.unanswered_count / selectedPerf.total) * 100 || 0;

    return (
      <main style={{ minHeight: '100vh', background: '#F8FAFC', padding: '40px', fontFamily: "'Inter', sans-serif" }}>
        <button 
          onClick={() => setSelectedPerf(null)}
          style={{ background: 'transparent', border: '1px solid #CBD5E1', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: '#1E293B', marginBottom: '24px', transition: 'all 0.2s' }}
          onMouseOver={e => e.currentTarget.style.background = '#F1F5F9'}
          onMouseOut={e => e.currentTarget.style.background = 'transparent'}
        >
          ← Back to Performance History
        </button>

        <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%)', borderRadius: '24px', padding: '40px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 20px 40px -10px rgba(30, 64, 175, 0.4)', marginBottom: '40px' }}>
          <div>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>{selectedPerf.type}</span>
            <h1 style={{ fontSize: '42px', fontWeight: '800', margin: '16px 0 8px 0', textTransform: 'capitalize' }}>{selectedPerf.subject.replace(/-/g, ' ')}</h1>
            <div style={{ display: 'flex', gap: '24px', opacity: 0.9, fontSize: '15px' }}>
              <span>📅 {new Date(selectedPerf.created_at).toLocaleDateString()}</span>
              <span>⏱ Time Used: {formatTime(selectedPerf.time_used)}</span>
            </div>
          </div>
          <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', padding: '24px', borderRadius: '20px', backdropFilter: 'blur(10px)' }}>
            <div style={{ fontSize: '56px', fontWeight: '900', lineHeight: 1 }}>{selectedPerf.percentage}%</div>
            <div style={{ fontSize: '16px', fontWeight: '600', marginTop: '8px', opacity: 0.9 }}>Overall Score</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <h3 style={{ color: '#1E293B', fontSize: '20px', fontWeight: '800', marginBottom: '24px' }}>Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ color: '#64748B', fontWeight: '600' }}>Score</span>
                <strong style={{ color: '#1E293B' }}>{selectedPerf.score} / {selectedPerf.total}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ color: '#64748B', fontWeight: '600' }}>Correct Answers</span>
                <strong style={{ color: '#3B82F6' }}>{selectedPerf.correct_count}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
                <span style={{ color: '#64748B', fontWeight: '600' }}>Wrong Answers</span>
                <strong style={{ color: '#1E40AF' }}>{selectedPerf.wrong_count}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748B', fontWeight: '600' }}>Unanswered</span>
                <strong style={{ color: '#94A3B8' }}>{selectedPerf.unanswered_count}</strong>
              </div>
            </div>
          </div>

          <div style={{ background: 'white', padding: '32px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 style={{ color: '#1E293B', fontSize: '20px', fontWeight: '800', marginBottom: '24px', alignSelf: 'flex-start' }}>Chart Breakdown</h3>
            <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <svg viewBox="0 0 31.831 31.831" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)', borderRadius: '50%' }}>
                 <circle r="15.9155" cx="15.9155" cy="15.9155" fill="transparent" stroke="#E2E8F0" strokeWidth="31.831" />
                 <circle r="15.9155" cx="15.9155" cy="15.9155" fill="transparent" stroke="#1E40AF" strokeWidth="31.831" strokeDasharray={`${cPct + wPct} 100`} />
                 <circle r="15.9155" cx="15.9155" cy="15.9155" fill="transparent" stroke="#3B82F6" strokeWidth="31.831" strokeDasharray={`${cPct} 100`} />
               </svg>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 12, height: 12, background: '#3B82F6', borderRadius: '50%' }}></div><span style={{ fontSize: '14px', color: '#334155', fontWeight: '600' }}>Correct</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 12, height: 12, background: '#1E40AF', borderRadius: '50%' }}></div><span style={{ fontSize: '14px', color: '#334155', fontWeight: '600' }}>Wrong</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 12, height: 12, background: '#E2E8F0', borderRadius: '50%' }}></div><span style={{ fontSize: '14px', color: '#334155', fontWeight: '600' }}>Skipped</span></div>
            </div>
          </div>
        </div>

        <h2 style={{ color: '#0F172A', fontSize: '24px', fontWeight: '800', marginBottom: '24px' }}>Question Review</h2>
        
        {(!selectedPerf.detailed_responses || selectedPerf.detailed_responses.length === 0) ? (
          <div style={{ background: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center', color: '#64748B' }}>
            No detailed responses available for this session.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {selectedPerf.detailed_responses.map((q, i) => {
              const statusColor = q.is_correct ? '#3B82F6' : (q.is_answered ? '#1E40AF' : '#94A3B8');
              const statusLabel = q.is_correct ? 'Correct' : (q.is_answered ? 'Wrong' : 'Unanswered');
              
              return (
                <div key={i} style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: `1px solid ${q.is_correct ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 64, 175, 0.1)'}` }}>
                  <div style={{ padding: '20px 24px', background: q.is_correct ? 'rgba(59, 130, 246, 0.05)' : 'rgba(30, 64, 175, 0.03)', borderBottom: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: '700', color: '#334155' }}>Question {i + 1}</span>
                    <span style={{ background: statusColor, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase' }}>
                      {statusLabel}
                    </span>
                  </div>
                  <div style={{ padding: '24px' }}>
                    <div style={{ fontSize: '16px', color: '#1E293B', lineHeight: 1.6, marginBottom: '24px' }} dangerouslySetInnerHTML={{ __html: q.question_text }}></div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', gap: '16px', padding: '16px', background: '#F8FAFC', borderRadius: '12px' }}>
                        <strong style={{ color: '#64748B', width: '120px', flexShrink: 0 }}>Your Answer:</strong>
                        <span style={{ color: q.is_answered ? (q.is_correct ? '#3B82F6' : '#1E40AF') : '#94A3B8', fontWeight: q.is_answered ? '600' : '400' }} dangerouslySetInnerHTML={{ __html: q.selected || 'None' }}></span>
                      </div>
                      
                      {!q.is_correct && (
                        <div style={{ display: 'flex', gap: '16px', padding: '16px', background: 'rgba(59, 130, 246, 0.05)', borderRadius: '12px' }}>
                          <strong style={{ color: '#3B82F6', width: '120px', flexShrink: 0 }}>Correct Answer:</strong>
                          <span style={{ color: '#1E293B', fontWeight: '600' }} dangerouslySetInnerHTML={{ __html: q.correct }}></span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    );
  }

  return (
    <main className="dashboard-layout" style={{ background: '#F8FAFC', minHeight: '100vh', padding: '40px', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)', 
        borderRadius: '24px', 
        padding: '40px', 
        marginBottom: '40px', 
        color: 'white',
        boxShadow: '0 20px 40px -10px rgba(59, 130, 246, 0.4)'
      }}>
        <Link to={subject ? `/dashboard/${exam}/subjects/${subject}` : `/dashboard/${exam}`} style={{ color: 'rgba(255,255,255,0.9)', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', marginBottom: '24px', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = 'white'} onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.9)'}>
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '8px 16px', borderRadius: '12px', backdropFilter: 'blur(5px)' }}>← Back to {subject ? 'Subject' : 'Dashboard'}</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '20px', borderRadius: '20px', fontSize: '32px', backdropFilter: 'blur(10px)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>📈</div>
          <div>
            <h1 style={{ color: 'white', fontSize: '36px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Performance History</h1>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px', margin: 0, fontWeight: '500' }}>Review your past exams, identify mistakes, and improve.</p>
          </div>
        </div>
      </header>

      {performances.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#3B82F6' }}>🎯</div>
            <div>
              <span style={{ display: 'block', color: '#64748B', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Average Score</span>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#1E293B', lineHeight: 1 }}>
                {calculateAverage()}%
              </div>
            </div>
          </div>
          <div style={{ background: 'white', padding: '32px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '24px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(30, 64, 175, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: '#1E40AF' }}>📚</div>
            <div>
              <span style={{ display: 'block', color: '#64748B', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Sessions Taken</span>
              <div style={{ fontSize: '36px', fontWeight: '900', color: '#1E293B', lineHeight: 1 }}>
                {performances.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h2 style={{ color: '#0F172A', fontSize: '24px', fontWeight: '800', marginBottom: '24px' }}>Recent Sessions</h2>
        {performances.length === 0 ? (
          <div style={{ padding: '64px 40px', background: 'white', borderRadius: '24px', border: '1px dashed #CBD5E1', textAlign: 'center' }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>📊</div>
            <h3 style={{ color: '#1E293B', fontSize: '24px', fontWeight: '800', marginBottom: '12px' }}>No performance data yet</h3>
            <p style={{ color: '#64748B', fontSize: '16px', maxWidth: '400px', margin: '0 auto' }}>Complete practice tests or mock exams to start tracking your progress and reviewing your mistakes.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            {performances.map((perf, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedPerf(perf)}
                style={{ background: 'white', border: '1px solid #F1F5F9', borderRadius: '20px', padding: '24px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.06)'; e.currentTarget.style.borderColor = '#BFDBFE'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.03)'; e.currentTarget.style.borderColor = '#F1F5F9'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: perf.percentage >= 70 ? 'rgba(59, 130, 246, 0.1)' : 'rgba(30, 64, 175, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: perf.percentage >= 70 ? '#3B82F6' : '#1E40AF', fontWeight: '800', fontSize: '18px' }}>
                    {perf.percentage}%
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', color: '#1E293B', fontWeight: '700', textTransform: 'capitalize' }}>
                      {perf.subject.replace(/-/g, ' ')}
                    </h3>
                    <div style={{ color: '#64748B', fontSize: '14px', display: 'flex', gap: '16px', fontWeight: '500' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ color: '#3B82F6' }}>●</span> {perf.type}</span>
                      <span>📅 {new Date(perf.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                  <div style={{ textAlign: 'right', paddingRight: '24px', borderRight: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '18px', fontWeight: '700', color: '#1E293B' }}>
                      {perf.score} <span style={{ color: '#94A3B8', fontSize: '14px' }}>/ {perf.total}</span>
                    </div>
                    <div style={{ color: '#64748B', fontSize: '13px', fontWeight: '500', marginTop: '4px' }}>
                      Score
                    </div>
                  </div>
                  <div style={{ color: '#3B82F6', fontWeight: '700', fontSize: '15px' }}>
                    Review →
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
