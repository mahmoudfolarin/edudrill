import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function MobilePastQuestions() {
  const { exam } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSubjects() {
      try {
        setLoading(true);
        setError("");
        const response = await fetch(`/api/exams/${exam}/subjects`);
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || "Failed to load subjects");
        setSubjects(data.subjects || []);
      } catch (err) {
        console.error(err);
        setError("Unable to load subjects.");
      } finally {
        setLoading(false);
      }
    }
    fetchSubjects();
  }, [exam]);

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ color: '#1e293b', fontSize: '16px' }}>Past Questions</strong>
        </div>
        <div style={{ width: '24px' }} />
      </header>

      {/* HERO SECTION */}
      <div style={{ padding: '32px 24px', background: 'linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%)', color: 'white', borderRadius: '0 0 32px 32px', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.2)', marginBottom: '32px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', marginBottom: '16px' }}>
          {exam?.toUpperCase()} • PAST QUESTIONS
        </div>
        <h1 style={{ fontSize: '28px', margin: '0 0 8px 0', fontWeight: '800', lineHeight: 1.2 }}>Real exam papers</h1>
        <p style={{ fontSize: '14px', margin: 0, opacity: 0.9, lineHeight: 1.5 }}>
          Select a subject and year to work through complete papers in their original order.
        </p>
      </div>

      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Choose a subject</h2>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#0ea5e9', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#64748b', fontWeight: '600' }}>Loading subjects...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <div style={{ background: '#fee2e2', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
            <h3 style={{ color: '#991b1b', margin: '0 0 8px 0' }}>Error</h3>
            <p style={{ color: '#b91c1c', fontSize: '14px', margin: '0 0 16px 0' }}>{error}</p>
            <Link to={`/dashboard/${exam}`} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none' }}>Back to Dashboard</Link>
          </div>
        ) : subjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ color: '#1e293b', margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800' }}>No subjects available</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px 0', padding: '0 24px' }}>Subjects for this examination have not been added yet.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                to={`/dashboard/${exam}/past-questions/${subject.slug}`}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '16px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #f1f5f9'
                }}
              >
                <div style={{ width: '40px', height: '40px', background: '#f0f9ff', color: '#0ea5e9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>
                  {subject.icon || "📘"}
                </div>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b', fontWeight: '800', lineHeight: 1.2 }}>{subject.name}</h3>
                  <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>{subject.subject_group || "Subject"}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
