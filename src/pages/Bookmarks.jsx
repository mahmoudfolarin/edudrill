import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import useMobile from "../hooks/useMobile";
import MobileBookmarks from "./mobile/MobileBookmarks";

export default function Bookmarks() {
  const { isMobile } = useMobile();
  const { exam, subject } = useParams();
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    fetch('/api/user/bookmarks')
      .then(res => res.json())
      .then(data => {
        // Filter bookmarks for current exam and subject
        const filtered = data.filter(b => b.exam === exam && b.subject === subject);
        setBookmarks(filtered);
      })
      .catch(err => console.error("Error fetching bookmarks:", err));
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

  if (isMobile) {
    return <MobileBookmarks />;
  }

  return (
    <main className="dashboard-layout" style={{ background: '#f8fafc', minHeight: '100vh', padding: '40px', fontFamily: "'Inter', sans-serif" }}>
      <header style={{ 
        background: 'linear-gradient(135deg, #0B2447 0%, #19376D 100%)', 
        borderRadius: '16px', 
        padding: '32px 40px', 
        marginBottom: '32px', 
        color: 'white',
        boxShadow: '0 10px 15px -3px rgba(11, 36, 71, 0.2)'
      }}>
        <Link to={`/dashboard/${exam}/subjects/${subject}`} style={{ color: '#DCEBFF', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '14px', marginBottom: '16px' }}>
          <span style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: '8px' }}>← Back to Subject</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '12px', borderRadius: '12px', fontSize: '28px' }}>🔖</div>
          <div>
            <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Bookmarked Lessons</h1>
            <p style={{ color: '#DCEBFF', fontSize: '16px', margin: 0, opacity: 0.9 }}>Review the lessons and topics you saved for later.</p>
          </div>
        </div>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {bookmarks.length === 0 ? (
          <div style={{ padding: '48px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', gridColumn: '1 / -1', textAlign: 'center' }}>
            <span style={{ fontSize: '48px' }}>🔖</span>
            <h3 style={{ color: '#0B2447', fontSize: '20px', fontWeight: '700', marginTop: '16px' }}>No bookmarks yet</h3>
            <p style={{ color: '#64748b', marginTop: '8px' }}>When you bookmark lessons, they will appear here.</p>
          </div>
        ) : (
          bookmarks.map((bookmark, idx) => (
            <div key={idx} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#19376D', background: '#e0e7ff', padding: '4px 8px', borderRadius: '4px' }}>
                  {bookmark.topic_title}
                </span>
                <h3 style={{ color: '#0B2447', fontSize: '18px', fontWeight: '700', margin: '12px 0 8px 0', lineHeight: '1.4' }}>
                  {bookmark.title}
                </h3>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>
                  Bookmarked on {new Date(bookmark.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
                <Link 
                  to={`/dashboard/${exam}/subjects/${subject}/learn/${bookmark.topic_id}/lesson/${bookmark.lesson_id}`}
                  style={{ flex: 1, background: '#0B2447', color: 'white', padding: '10px', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: '600', fontSize: '14px', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#19376D'}
                  onMouseLeave={e => e.currentTarget.style.background = '#0B2447'}
                >
                  Read Lesson
                </Link>
                <button 
                  onClick={() => removeBookmark(bookmark.lesson_id)}
                  style={{ background: '#93c5fd', color: '#93c5fd', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#93c5fd'}
                  onMouseLeave={e => e.currentTarget.style.background = '#93c5fd'}
                  title="Remove Bookmark"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
