import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MobileTopic() {
  const { exam, subject, topicId } = useParams();

  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedSubtopic, setExpandedSubtopic] = useState(null);

  useEffect(() => {
    async function fetchTopic() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/topics/${topicId}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load topic");
        }

        setTopic(data.topic);
        // Auto-expand the first subtopic
        if (data.topic.subtopics && data.topic.subtopics.length > 0) {
          setExpandedSubtopic(data.topic.subtopics[0].id);
        }
      } catch (error) {
        console.error("Topic loading error:", error);
        setError("Unable to load this topic. Please make sure the EduDrill server is running.");
      } finally {
        setLoading(false);
      }
    }

    fetchTopic();
  }, [topicId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#0ea5e9', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <h3 style={{ marginTop: '16px', color: '#1e293b' }}>Loading topic...</h3>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ color: '#991b1b', margin: '0 0 8px 0' }}>Unable to load topic</h2>
        <p style={{ color: '#64748b' }}>{error}</p>
        <Link to={`/dashboard/${exam}/subjects/${subject}/learn`} style={{ marginTop: '16px', background: '#123b72', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Back to Syllabus</Link>
      </div>
    );
  }

  const totalLessons = topic.lessons?.length || 0;
  const totalSubtopics = topic.subtopics?.length || 0;

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to={`/dashboard/${exam}/subjects/${subject}/learn`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ color: '#1e293b', fontSize: '16px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>{topic.title}</strong>
        </div>
        <div style={{ width: '24px' }} />
      </header>

      {/* HERO */}
      <div style={{ background: '#123b72', color: 'white', padding: '32px 24px', borderRadius: '0 0 32px 32px', boxShadow: '0 10px 30px rgba(18, 59, 114, 0.2)', marginBottom: '24px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', marginBottom: '16px' }}>
          STUDY TOPIC
        </div>
        <h1 style={{ fontSize: '28px', margin: '0 0 8px 0', fontWeight: '800', lineHeight: 1.2 }}>{topic.title}</h1>
        <p style={{ fontSize: '14px', margin: '0 0 24px 0', opacity: 0.9, lineHeight: 1.5 }}>
          {topic.description || "Study this topic carefully, work through the lessons, and test your understanding."}
        </p>
        
        <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900' }}>{totalSubtopics}</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.8, fontWeight: '700' }}>Subtopics</div>
          </div>
          <div style={{ width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '900' }}>{totalLessons}</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.8, fontWeight: '700' }}>Lessons</div>
          </div>
        </div>
      </div>

      {/* SUBTOPICS */}
      <div style={{ padding: '0 16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Course Content</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {topic.subtopics?.map((subtopic, index) => {
            const lessons = topic.lessons?.filter(l => l.subtopic_id === subtopic.id) || [];
            const isExpanded = expandedSubtopic === subtopic.id;

            return (
              <div key={subtopic.id} style={{ background: 'white', borderRadius: '20px', overflow: 'hidden', border: '1px solid #f1f5f9', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                
                {/* Header (Accordion Toggle) */}
                <div 
                  onClick={() => setExpandedSubtopic(isExpanded ? null : subtopic.id)}
                  style={{ padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', background: isExpanded ? '#f8fafc' : 'white', cursor: 'pointer', transition: 'background 0.2s' }}
                >
                  <div style={{ width: '40px', height: '40px', background: isExpanded ? '#123b72' : '#f1f5f9', color: isExpanded ? 'white' : '#64748b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 'bold', flexShrink: 0, transition: 'all 0.3s' }}>
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: '0 0 4px 0', fontSize: '15px', color: '#1e293b', fontWeight: '700', lineHeight: 1.3 }}>{subtopic.title}</h3>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}</div>
                  </div>
                  <div style={{ color: '#cbd5e1', fontSize: '20px', fontWeight: 'bold', transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.3s' }}>
                    ›
                  </div>
                </div>

                {/* Lessons List (Accordion Content) */}
                {isExpanded && (
                  <div style={{ padding: '16px', borderTop: '1px solid #f1f5f9' }}>
                    {lessons.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}/lesson/${lesson.id}`}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#f8fafc', borderRadius: '12px', textDecoration: 'none' }}
                          >
                            <div style={{ width: '32px', height: '32px', background: '#e0f2fe', color: '#0284c7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }}>
                              ▶
                            </div>
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: '14px', color: '#334155', fontWeight: '600', marginBottom: '2px', lineHeight: 1.3 }}>{lesson.title}</div>
                              <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>Lesson {lesson.lesson_order}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div style={{ padding: '24px 0', textAlign: 'center', color: '#64748b' }}>
                        <div style={{ fontSize: '24px', marginBottom: '8px' }}>📖</div>
                        <div style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>Lessons coming soon</div>
                        <div style={{ fontSize: '12px' }}>Lessons for this subtopic will be added soon.</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
    </main>
  );
}

export default MobileTopic;
