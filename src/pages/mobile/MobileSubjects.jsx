import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { isProductActivated, FREE_SUBJECTS } from "../../components/ActivationLock";
import { FaLock } from "react-icons/fa";

function MobileSubjects() {
  const { exam } = useParams();

  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchSubjects() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/exams/${exam}/subjects`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load subjects");
        }

        setSubjects(data.subjects || []);
      } catch (error) {
        console.error("Subjects loading error:", error);
        setError("Unable to load subjects. Please make sure the EduDrill server is running.");
      } finally {
        setLoading(false);
      }
    }

    if (exam) {
      fetchSubjects();
    }
  }, [exam]);

  const examName = exam ? exam.toUpperCase() : "EXAM";

  const groupOrder = [
    "Core Subjects",
    "Science",
    "Humanities",
    "Business",
    "Trade / Vocational",
    "Other Subjects",
  ];

  const filteredSubjects = subjects.filter(subject => 
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedSubjects = filteredSubjects.reduce((groups, subject) => {
    const group = subject.subject_group || "Other Subjects";
    if (!groups[group]) {
      groups[group] = [];
    }
    groups[group].push(subject);
    return groups;
  }, {});

  const sortedGroups = Object.keys(groupedSubjects).sort((a, b) => {
    const aIndex = groupOrder.indexOf(a);
    const bIndex = groupOrder.indexOf(b);
    return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
  });

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
          <strong style={{ color: '#1e293b', fontSize: '16px' }}>{examName} Subjects</strong>
        </div>
        <div style={{ width: '24px' }} /> {/* Spacer */}
      </header>

      <div style={{ padding: '24px 16px' }}>
        
        {/* HERO SECTION */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '8px', fontWeight: '800' }}>Choose Subject</h1>
          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
            Select a subject and begin your {examName} preparation journey.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div style={{ marginBottom: '32px' }}>
          <input 
            type="text" 
            placeholder="Search subjects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '16px',
              border: '2px solid #e2e8f0',
              fontSize: '16px',
              outline: 'none',
              background: 'white',
              color: '#1e293b',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* STATE HANDLING */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#123b72', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#64748b', fontWeight: '600' }}>Loading subjects...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {!loading && error && (
          <div style={{ background: '#fee2e2', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
            <h3 style={{ color: '#991b1b', margin: '0 0 8px 0' }}>Error</h3>
            <p style={{ color: '#b91c1c', fontSize: '14px', margin: '0 0 16px 0' }}>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold' }}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && filteredSubjects.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ color: '#1e293b', margin: '0 0 8px 0' }}>No subjects found</h3>
            <p style={{ color: '#64748b' }}>Try adjusting your search.</p>
          </div>
        )}

        {/* SUBJECT GROUPS */}
        {!loading && !error && subjects.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {sortedGroups.map((group) => (
              <div key={group}>
                <h2 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#64748b', fontWeight: '800', marginBottom: '16px', letterSpacing: '1px' }}>
                  {group}
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
                  {groupedSubjects[group].map((subject) => {
                    const isAllowed = isProductActivated() || FREE_SUBJECTS.includes(subject.slug || subject.id);
                    return (
                    <Link
                      key={subject.id}
                      onClick={(e) => {
                        if (!isAllowed) {
                          e.preventDefault();
                          alert("Not yet Activated. Please activate to unlock this subject.");
                        }
                      }}
                      to={`/dashboard/${exam}/subjects/${subject.slug}`}
                      style={{
                        background: !isAllowed ? '#f1f5f9' : 'white',
                        border: '1px solid #e2e8f0',
                        borderRadius: '20px',
                        padding: '20px',
                        textDecoration: 'none',
                        color: !isAllowed ? '#94a3b8' : '#1e293b',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                        opacity: !isAllowed ? 0.7 : 1
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ fontSize: '32px', background: '#f0f9ff', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', opacity: !isAllowed ? 0.5 : 1 }}>
                          {subject.icon || "📚"}
                        </div>
                        {subject.is_new && isAllowed && (
                          <span style={{ background: '#fee2e2', color: '#ef4444', fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '8px' }}>
                            NEW
                          </span>
                        )}
                        {!isAllowed && (
                          <FaLock style={{ color: '#cbd5e1', fontSize: '20px' }} />
                        )}
                      </div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '15px', fontWeight: '700', lineHeight: '1.2' }}>{subject.name}</h4>
                      
                      {!isAllowed && (
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '11px', color: '#ef4444', fontWeight: 'bold' }}>Not yet Activated</span>
                        </div>
                      )}
                      {isAllowed && (
                        <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Study</span>
                          <span style={{ color: '#123b72', fontWeight: 'bold' }}>→</span>
                        </div>
                      )}
                    </Link>
                  )})}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}

export default MobileSubjects;
