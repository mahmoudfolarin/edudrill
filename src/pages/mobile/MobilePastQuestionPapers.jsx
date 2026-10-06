import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function MobilePastQuestionPapers() {
  const { exam, subject, year } = useParams();

  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPapers() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`/api/past-papers?exam=${exam.toUpperCase()}&subject=${subject}&year=${year}`);
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || "Failed to load examination papers");
        setPapers(data.papers || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load the available papers.");
      } finally {
        setLoading(false);
      }
    }
    fetchPapers();
  }, [exam, subject, year]);

  const subjectName = papers.length > 0
    ? papers[0].subject_name
    : subject.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to={`/dashboard/${exam}/past-questions/${subject}`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ color: '#1e293b', fontSize: '16px' }}>{year} Papers</strong>
        </div>
        <div style={{ width: '24px' }} />
      </header>

      {/* HERO SECTION */}
      <div style={{ padding: '32px 24px', background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', color: 'white', borderRadius: '0 0 32px 32px', boxShadow: '0 10px 30px rgba(245, 158, 11, 0.2)', marginBottom: '32px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', marginBottom: '16px' }}>
          STEP 3 • SELECT PAPER
        </div>
        <h1 style={{ fontSize: '28px', margin: '0 0 8px 0', fontWeight: '800', lineHeight: 1.2 }}>{subjectName}</h1>
        <p style={{ fontSize: '14px', margin: 0, opacity: 0.9, lineHeight: 1.5 }}>
          Select a licensed paper to practice.
        </p>
      </div>

      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Available Papers</h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#f59e0b', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#64748b', fontWeight: '600' }}>Loading papers...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <div style={{ background: '#fee2e2', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
            <h3 style={{ color: '#991b1b', margin: '0 0 8px 0' }}>Error</h3>
            <p style={{ color: '#b91c1c', fontSize: '14px', margin: '0 0 16px 0' }}>{error}</p>
            <button onClick={() => window.location.reload()} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold' }}>Try Again</button>
          </div>
        ) : papers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
            <h3 style={{ color: '#1e293b', margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800' }}>No papers available</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px 0', padding: '0 24px' }}>Papers for {subjectName} in {year} have not been added yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {papers.map((paper) => {
              const isLicensed = ["authorized", "licensed", "public_domain"].includes(paper.license_status);
              
              return (
                <div key={paper.id} style={{ background: 'white', borderRadius: '20px', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', border: '1px solid #f1f5f9' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div style={{ width: '40px', height: '40px', background: paper.paper_type === "objective" ? '#e0f2fe' : '#fef3c7', color: paper.paper_type === "objective" ? '#0ea5e9' : '#d97706', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold' }}>
                      {paper.paper_type === "objective" ? "✓" : "📝"}
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '800', background: isLicensed ? (paper.verification_status === "verified" ? '#dcfce7' : '#fef3c7') : '#f1f5f9', color: isLicensed ? (paper.verification_status === "verified" ? '#166534' : '#92400e') : '#475569', padding: '4px 8px', borderRadius: '6px' }}>
                      {isLicensed ? (paper.verification_status === "verified" ? "APPROVED" : "LICENSED") : "PENDING"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '18px', color: '#1e293b', fontWeight: '800', margin: '0 0 8px 0', lineHeight: 1.3 }}>
                    {paper.paper_title}
                  </h3>
                  
                  <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
                    {paper.session && <div>Session: {paper.session}</div>}
                    {paper.paper_code && <div>Code: {paper.paper_code}</div>}
                  </div>

                  <div style={{ display: 'flex', background: '#f8fafc', borderRadius: '12px', padding: '12px', marginBottom: '16px' }}>
                    <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b' }}>{paper.total_questions || "—"}</div>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', marginTop: '2px' }}>Questions</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid #e2e8f0' }}>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b' }}>{paper.duration_minutes ? `${paper.duration_minutes}m` : "—"}</div>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', marginTop: '2px' }}>Time</div>
                    </div>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b' }}>{paper.paper_type ? paper.paper_type.charAt(0).toUpperCase() + paper.paper_type.slice(1) : "—"}</div>
                      <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', marginTop: '2px' }}>Type</div>
                    </div>
                  </div>

                  {isLicensed ? (
                    <Link
                      to={`/dashboard/${exam}/past-questions/${subject}/${year}/${paper.id}`}
                      style={{ display: 'block', width: '100%', background: '#123b72', color: 'white', padding: '14px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', fontWeight: '800', fontSize: '15px' }}
                    >
                      Start Paper
                    </Link>
                  ) : (
                    <div style={{ width: '100%', background: '#f1f5f9', color: '#94a3b8', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: '700', fontSize: '15px' }}>
                      Rights pending
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
