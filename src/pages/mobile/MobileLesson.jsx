import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function MobileLesson() {
  const { exam, subject, topicId, lessonId } = useParams();

  const [lesson, setLesson] = useState(null);
  const [topicLessons, setTopicLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);
  const [checkingProgress, setCheckingProgress] = useState(true);
  const [completing, setCompleting] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    if (lessonId) {
      fetch('/api/user/bookmarks')
        .then(res => res.json())
        .then(data => setIsBookmarked(data.some(b => b.lesson_id === lessonId)))
        .catch(err => console.error("Error fetching bookmarks:", err));
    }
  }, [lessonId]);

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        await fetch(`/api/user/bookmarks/${lessonId}`, { method: 'DELETE' });
        setIsBookmarked(false);
      } else {
        await fetch('/api/user/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lesson_id: lessonId,
            topic_id: topicId,
            subject,
            exam,
            title: lesson?.title,
            topic_title: lesson?.topic_title,
            subject_name: lesson?.subject_name
          })
        });
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  useEffect(() => {
    async function fetchLesson() {
      try {
        setLoading(true);
        setError("");

        const lessonRes = await fetch(`/api/topics/lessons/${lessonId}`);
        const lessonData = await lessonRes.json();
        if (!lessonRes.ok || !lessonData.success) throw new Error(lessonData.message || "Failed to load lesson");
        
        setLesson(lessonData.lesson);

        const topicRes = await fetch(`/api/topics/${topicId}`);
        const topicData = await topicRes.json();
        if (topicRes.ok && topicData.success) setTopicLessons(topicData.topic.lessons || []);

      } catch (err) {
        console.error(err);
        setError("Unable to load this lesson.");
      } finally {
        setLoading(false);
      }
    }
    fetchLesson();
  }, [lessonId, topicId]);

  useEffect(() => {
    async function fetchProgress() {
      try {
        setCheckingProgress(true);
        const deviceIdentifier = localStorage.getItem("edudrill_device_id");
        if (!deviceIdentifier) return;

        const res = await fetch(`/api/progress/lesson?deviceIdentifier=${encodeURIComponent(deviceIdentifier)}&lessonId=${lessonId}`);
        const data = await res.json();
        if (res.ok && data.success) setCompleted(data.completed === true);
      } catch (err) {
        console.error("Progress error:", err);
      } finally {
        setCheckingProgress(false);
      }
    }
    fetchProgress();
  }, [lessonId]);

  const handleComplete = async () => {
    try {
      setCompleting(true);
      const deviceIdentifier = localStorage.getItem("edudrill_device_id");
      if (!deviceIdentifier) return;

      const res = await fetch("/api/progress/lesson/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceIdentifier, lessonId: Number(lessonId) }),
      });
      const data = await res.json();
      if (res.ok && data.success) setCompleted(true);
    } catch (err) {
      console.error("Completion error:", err);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc' }}>
        <div style={{ fontSize: '48px', animation: 'bounce 1s infinite' }}>📖</div>
        <h2 style={{ marginTop: '16px', color: '#1e293b' }}>Preparing lesson...</h2>
        <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc', padding: '24px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ color: '#991b1b', margin: '0 0 8px 0' }}>Lesson not found</h2>
        <Link to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`} style={{ marginTop: '16px', background: '#123b72', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Back to Topic</Link>
      </div>
    );
  }

  const currentIndex = topicLessons.findIndex(item => item.id === lesson.id);
  const prevLesson = currentIndex > 0 ? topicLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < topicLessons.length - 1 ? topicLessons[currentIndex + 1] : null;

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '100px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ height: '4px', background: '#e2e8f0', width: '100%' }}>
          <div style={{ height: '100%', width: completed ? '100%' : '50%', background: '#10b981', transition: 'width 0.3s ease' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <Link to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
            ←
          </Link>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>
            Lesson {lesson.lesson_order}
          </div>
          <button onClick={toggleBookmark} style={{ background: 'transparent', border: 'none', fontSize: '20px', color: isBookmarked ? '#123b72' : '#cbd5e1' }}>
            {isBookmarked ? '🔖' : '📑'}
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div style={{ padding: '24px 16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b', marginBottom: '8px', lineHeight: 1.3 }}>
          {lesson.title}
        </h1>
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '24px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px' }}>{lesson.topic_title}</span>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.02)', border: '1px solid #f1f5f9', fontSize: '15px', lineHeight: 1.6, color: '#334155' }} dangerouslySetInnerHTML={{ __html: lesson.content || "Content not available." }} />

        {/* COMPLETION AREA */}
        <div style={{ background: completed ? '#d1fae5' : '#123b72', color: completed ? '#065f46' : 'white', borderRadius: '16px', padding: '24px', marginTop: '32px', textAlign: 'center', transition: 'all 0.3s ease' }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>{completed ? "🏆" : "🎯"}</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800' }}>
            {completed ? "Lesson Completed!" : "Finished Reading?"}
          </h3>
          <p style={{ margin: '0 0 16px 0', fontSize: '14px', opacity: 0.9 }}>
            {completed ? "Great work! You can move on to the next one." : "Mark this lesson as complete to track your progress."}
          </p>
          
          {!completed && (
            <button 
              onClick={handleComplete}
              disabled={completing || checkingProgress}
              style={{ background: 'white', color: '#123b72', border: 'none', padding: '12px 24px', borderRadius: '24px', fontWeight: '800', fontSize: '14px', width: '100%', opacity: (completing || checkingProgress) ? 0.7 : 1 }}
            >
              {completing ? "Saving..." : checkingProgress ? "Checking..." : "Mark as Complete"}
            </button>
          )}
        </div>

        {/* NAVIGATION */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          {prevLesson && (
            <Link to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}/lesson/${prevLesson.id}`} style={{ flex: 1, background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', textDecoration: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>← Previous</span>
              <strong style={{ fontSize: '14px', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{prevLesson.title}</strong>
            </Link>
          )}
          {nextLesson ? (
            <Link to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}/lesson/${nextLesson.id}`} style={{ flex: 1, background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '16px', textDecoration: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: '#0ea5e9', marginBottom: '4px' }}>Next →</span>
              <strong style={{ fontSize: '14px', color: '#0369a1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{nextLesson.title}</strong>
            </Link>
          ) : (
            <Link to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`} style={{ flex: 1, background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '12px', padding: '16px', textDecoration: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '12px', color: '#0ea5e9', marginBottom: '4px' }}>Topic Complete</span>
              <strong style={{ fontSize: '14px', color: '#0369a1' }}>Back to Topic</strong>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default MobileLesson;
