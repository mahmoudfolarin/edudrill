import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function MobileBookmarks() {
  const { exam, subject } = useParams();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user/bookmarks')
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(b => b.exam === exam && b.subject === subject);
        setBookmarks(filtered);
      })
      .catch(err => console.error("Error fetching bookmarks:", err))
      .finally(() => setLoading(false));
  }, [exam, subject]);

  const removeBookmark = async (lessonId) => {
    try {
      await fetch(`/api/user/bookmarks/${lessonId}`, {
        method: 'DELETE'
      });
      setBookmarks(prev => prev.filter(b => b.lesson_id !== lessonId));
    } catch (err) {
      console.error("Error deleting bookmark:", err);
    }
  };

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to={`/dashboard/${exam}/subjects/${subject}`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ color: '#1e293b', fontSize: '16px' }}>Bookmarks</strong>
        </div>
        <div style={{ width: '24px' }} />
      </header>

      {/* HERO SECTION */}
      <div style={{ padding: '32px 24px', background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', color: 'white', borderRadius: '0 0 32px 32px', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.2)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '40px' }}>🔖</div>
          <div>
            <h1 style={{ fontSize: '24px', margin: '0 0 4px 0', fontWeight: '800' }}>Bookmarked</h1>
            <p style={{ fontSize: '13px', margin: 0, opacity: 0.9 }}>Review your saved lessons</p>
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '16px', background: 'rgba(255,255,255,0.1)', padding: '12px 16px', borderRadius: '16px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '20px', fontWeight: '900' }}>{bookmarks.length}</div>
            <div style={{ fontSize: '11px', textTransform: 'uppercase', opacity: 0.8, fontWeight: '700' }}>Saved Lessons</div>
          </div>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#0ea5e9', borderRadius: '50%', margin: '0 auto 16px', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#64748b', fontWeight: '600' }}>Loading bookmarks...</p>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
          </div>
        ) : bookmarks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔖</div>
            <h3 style={{ color: '#1e293b', margin: '0 0 8px 0', fontSize: '18px', fontWeight: '800' }}>No bookmarks yet</h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 24px 0', padding: '0 24px' }}>When you bookmark lessons, they will appear here.</p>
            <Link to={`/dashboard/${exam}/subjects/${subject}/learn`} style={{ background: '#f0f9ff', color: '#0ea5e9', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}>Go to Syllabus</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {bookmarks.map((bookmark, idx) => (
              <div key={idx} style={{ background: 'white', borderRadius: '20px', border: '1px solid #f1f5f9', padding: '20px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', color: '#0ea5e9', background: '#f0f9ff', padding: '4px 8px', borderRadius: '8px' }}>
                    {bookmark.topic_title}
                  </span>
                  <button 
                    onClick={() => removeBookmark(bookmark.lesson_id)}
                    style={{ background: 'transparent', border: 'none', color: '#cbd5e1', fontSize: '20px', padding: 0 }}
                  >
                    ×
                  </button>
                </div>
                
                <h3 style={{ color: '#1e293b', fontSize: '16px', fontWeight: '800', margin: '0 0 8px 0', lineHeight: 1.4 }}>
                  {bookmark.title}
                </h3>
                
                <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#94a3b8' }}>
                  Saved on {new Date(bookmark.created_at).toLocaleDateString()}
                </p>
                
                <Link 
                  to={`/dashboard/${exam}/subjects/${subject}/learn/${bookmark.topic_id}/lesson/${bookmark.lesson_id}`}
                  style={{ display: 'block', width: '100%', background: '#123b72', color: 'white', padding: '12px', borderRadius: '12px', textAlign: 'center', textDecoration: 'none', fontWeight: '800', fontSize: '14px' }}
                >
                  Read Lesson
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
