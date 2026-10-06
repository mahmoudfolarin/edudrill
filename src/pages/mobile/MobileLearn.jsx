import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ActivationLock, FREE_SUBJECTS } from "../../components/ActivationLock";

function MobileLearn() {
  const { exam, subject } = useParams();

  const [, setSyllabus] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fallbackName = subject?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  const subjectName = subject === "english-language" ? "English Language" :
                      subject === "general-mathematics" ? "General Mathematics" :
                      subject === "literature-in-english" ? "Literature-in-English" : fallbackName;

  useEffect(() => {
    async function fetchSyllabus() {
      try {
        setLoading(true);
        setError("");
        setSyllabus(null);
        setTopics([]);

        const response = await fetch(`/api/syllabuses/${exam}/${subject}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to load syllabus");
        }

        const currentSyllabus = data.syllabus;
        setSyllabus(currentSyllabus);

        const syllabusTopics = currentSyllabus.topics || [];
        const deviceIdentifier = localStorage.getItem("edudrill_device_id");
        let completedLessonIds = [];
        if (deviceIdentifier) {
          try {
            const progressRes = await fetch(`/api/progress/all?deviceIdentifier=${deviceIdentifier}`);
            const progressData = await progressRes.json();
            if (progressData.success) {
              completedLessonIds = progressData.completedLessonIds || [];
            }
          } catch (e) {
            console.error("Failed to fetch progress", e);
          }
        }

        const topicsWithDetails = await Promise.all(
          syllabusTopics.map(async (topic) => {
            try {
              const topicResponse = await fetch(`/api/topics/${topic.id}`);
              const topicData = await topicResponse.json();

              if (!topicResponse.ok || !topicData.success) {
                return { ...topic, subtopics: [], lessons: [], progress: 0, icon: "📚" };
              }

              const topicDetails = topicData.topic || {};
              const lessons = topicDetails.lessons || [];
              const completedCount = lessons.filter(l => completedLessonIds.includes(l.id)).length;
              const progressVal = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0;

              return { ...topic, subtopics: topicDetails.subtopics || [], lessons: lessons, progress: progressVal, icon: "📚" };
            } catch (topicError) {
              console.error(`Failed to load topic ${topic.id}:`, topicError);
              return { ...topic, subtopics: [], lessons: [], progress: 0, icon: "📚" };
            }
          })
        );

        setTopics(topicsWithDetails);
      } catch (error) {
        console.error("Syllabus loading error:", error);
        setError(error.message || "Unable to load the syllabus. Please make sure the EduDrill server is running.");
      } finally {
        setLoading(false);
      }
    }

    if (exam && subject) {
      fetchSyllabus();
    }
  }, [exam, subject]);

  const completedTopics = topics.filter(t => t.progress === 100).length;
  const overallProgress = topics.length > 0 ? Math.round(topics.reduce((sum, t) => sum + t.progress, 0) / topics.length) : 0;

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to={`/dashboard/${exam}/subjects/${subject}`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ color: '#1e293b', fontSize: '16px' }}>Learn</strong>
        </div>
        <div style={{ width: '24px' }} />
      </header>

      <ActivationLock isAllowed={FREE_SUBJECTS.includes(subject)}>

      {/* HERO SECTION */}
      <div style={{ padding: '32px 24px', background: 'linear-gradient(135deg, #0ea5e9 0%, #1e40af 100%)', color: 'white', borderRadius: '0 0 32px 32px', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.2)', marginBottom: '32px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', marginBottom: '16px' }}>
          {exam?.toUpperCase()} • {subjectName}
        </div>
        <h1 style={{ fontSize: '28px', margin: '0 0 8px 0', fontWeight: '800', lineHeight: 1.2 }}>Topics</h1>
        
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px', borderRadius: '16px', marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>Overall Progress</span>
            <span style={{ fontSize: '16px', fontWeight: '800' }}>{overallProgress}%</span>
          </div>
          <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${overallProgress}%`, background: 'white', borderRadius: '4px' }}></div>
          </div>
          <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.9 }}>
            {completedTopics} of {topics.length} topics completed
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#0ea5e9', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#64748b', fontWeight: '600' }}>Loading topics...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : error ? (
          <div style={{ background: '#fee2e2', padding: '24px', borderRadius: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</div>
            <h3 style={{ color: '#991b1b', margin: '0 0 8px 0' }}>Error</h3>
            <p style={{ color: '#b91c1c', fontSize: '14px', margin: '0 0 16px 0' }}>{error}</p>
            <button onClick={() => window.location.reload()} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold' }}>Try Again</button>
          </div>
        ) : topics.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ color: '#1e293b', margin: '0 0 8px 0' }}>No topics found</h3>
            <p style={{ color: '#64748b' }}>There are currently no topics available for this syllabus.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topics.map((topic, index) => (
              <Link 
                key={topic.id}
                to={`/dashboard/${exam}/subjects/${subject}/learn/${topic.id}`}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '20px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #f1f5f9',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '48px', height: '48px', background: '#f0f9ff', color: '#0ea5e9', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1e293b', fontWeight: '800' }}>{topic.title}</h3>
                      <div style={{ fontSize: '12px', color: '#64748b', display: 'flex', gap: '12px' }}>
                        <span>{topic.subtopics?.length || 0} subtopics</span>
                        <span>{topic.lessons?.length || 0} lessons</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '8px' }}>
                  <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${topic.progress}%`, background: topic.progress === 100 ? '#10b981' : '#0ea5e9', borderRadius: '3px' }}></div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    <span style={{ fontSize: '12px', color: topic.progress === 100 ? '#10b981' : '#64748b', fontWeight: '700' }}>
                      {topic.progress === 100 ? "Completed" : `${topic.progress}%`}
                    </span>
                    <span style={{ fontSize: '12px', color: '#0ea5e9', fontWeight: 'bold' }}>
                      {topic.progress > 0 ? "Continue" : "Start"} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

      </div>
      </ActivationLock>
    </main>
  );
}

export default MobileLearn;
