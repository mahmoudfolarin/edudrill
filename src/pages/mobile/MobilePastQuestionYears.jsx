import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isProductActivated, FREE_SUBJECTS } from "../../components/ActivationLock";
import { FaLock } from "react-icons/fa";

export default function MobilePastQuestionYears() {
  const { exam, subject } = useParams();

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPastPapers() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`/api/past-papers?exam=${exam.toUpperCase()}&subject=${subject}`);
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || "Failed to load past papers");
        setPapers(data.papers || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load past papers.");
      } finally {
        setLoading(false);
      }
    }
    if (exam && subject) fetchPastPapers();
  }, [exam, subject]);

  const subjectName = papers.length > 0
    ? papers[0].subject_name
    : subject?.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const groupedYears = papers.reduce((groups, paper) => {
    if (!groups[paper.year]) groups[paper.year] = [];
    groups[paper.year].push(paper);
    return groups;
  }, {});

  const years = Object.keys(groupedYears).sort((a, b) => Number(b) - Number(a));

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to={`/dashboard/${exam}/past-questions`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ color: '#1e293b', fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{subjectName}</strong>
        </div>
        <div style={{ width: '24px' }} />
      </header>

      {/* HERO SECTION */}
      <div style={{ padding: '32px 24px', background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)', color: 'white', borderRadius: '0 0 32px 32px', boxShadow: '0 10px 30px rgba(16, 185, 129, 0.2)', marginBottom: '32px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', marginBottom: '16px' }}>
          STEP 2 • SELECT YEAR
        </div>
        <h1 style={{ fontSize: '28px', margin: '0 0 8px 0', fontWeight: '800', lineHeight: 1.2 }}>{subjectName}</h1>
        <p style={{ fontSize: '14px', margin: 0, opacity: 0.9, lineHeight: 1.5 }}>
          Select a year to view available examination papers.
        </p>
      </div>

      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Available Years</h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#10b981', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#64748b', fontWeight: '600' }}>Loading years...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <div style={{ background: '#fee2e2', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
            <h3 style={{ color: '#991b1b', margin: '0 0 8px 0' }}>Error</h3>
            <p style={{ color: '#b91c1c', fontSize: '14px', margin: '0 0 16px 0' }}>{error}</p>
            <button onClick={() => window.location.reload()} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold' }}>Try Again</button>
          </div>
        ) : years.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📅</div>
            <h3 style={{ color: '#1e293b', margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800' }}>No years available</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px 0', padding: '0 24px' }}>No papers have been added for this subject yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '16px' }}>
            {years.map((year, index) => {
              const yearPapers = groupedYears[year] || [];
              const hasVerified = yearPapers.some(p => p.verification_status === "verified");
              const isLocked = !isProductActivated() && !FREE_SUBJECTS.includes(subject) && index >= 4;

              if (isLocked) {
                return (
                  <button
                    key={year}
                    onClick={() => alert("Not yet Activated. Please activate to unlock this year.")}
                    style={{
                      background: '#f8fafc',
                      borderRadius: '20px',
                      padding: '20px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      textAlign: 'left',
                      cursor: 'not-allowed',
                      opacity: 0.8
                    }}
                  >
                    <div style={{ width: '48px', height: '48px', background: '#f1f5f9', color: '#94a3b8', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                      <FaLock />
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#64748b', fontWeight: '800' }}>{year}</h3>
                      <div style={{ fontSize: '12px', color: '#ef4444', fontWeight: 'bold' }}>
                        Not yet Activated
                      </div>
                    </div>
                  </button>
                )
              }

              return (
                <Link
                  key={year}
                  to={`/dashboard/${exam}/past-questions/${subject}/${year}`}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '20px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #f1f5f9'
                  }}
                >
                  <div style={{ width: '48px', height: '48px', background: '#ecfdf5', color: '#10b981', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                    📅
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1e293b', fontWeight: '800' }}>{year}</h3>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      {yearPapers.length} {yearPapers.length === 1 ? "paper" : "papers"} • {hasVerified ? "Verified" : "Reviewing"}
                    </div>
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '20px', fontWeight: 'bold' }}>
                    ›
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
