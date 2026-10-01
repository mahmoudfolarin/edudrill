import { useState, useRef, useEffect } from 'react';

export default function Dictionary({ onClose }) {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [position, setPosition] = useState({ 
    x: window.innerWidth > 400 ? window.innerWidth - 360 : 20, 
    y: 80 
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y
      });
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    e.target.releasePointerCapture(e.pointerId);
  };

  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.min(Math.max(0, prev.x), window.innerWidth - 340),
        y: Math.min(Math.max(0, prev.y), window.innerHeight - 450)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const searchWord = async (e) => {
    e.preventDefault();
    if (!word.trim()) return;
    
    setLoading(true);
    setError('');
    setDefinition(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/ai-tutor/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: `Please define the English word: "${word.trim()}". Provide its part of speech, pronunciation (if any), a clear definition, and an example sentence. Keep it concise.`,
          generalTutor: true
        })
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.message || 'AI could not process the request.');
      }
      
      setDefinition({
        word: word.trim(),
        text: data.answer
      });
    } catch (err) {
      setError(err.message || 'Error looking up word');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ 
        position: 'fixed',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(11, 36, 71, 0.5)',
        left: position.x, 
        top: position.y,
        width: '340px',
        background: '#ffffff',
        border: '1px solid #19376D',
        borderRadius: '12px',
        overflow: 'hidden',
        fontFamily: "'Inter', 'Segoe UI', sans-serif"
      }}
    >
      {/* Title Bar */}
      <div 
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          cursor: 'move',
          userSelect: 'none',
          touchAction: 'none', 
          height: '36px',
          background: '#0B2447'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 12px', color: 'white' }}>
          <img src="/assets/icons/dictionary.svg" alt="dict" style={{ width: '14px', height: '14px' }} />
          <span style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' }}>Dictionary</span>
        </div>
        <button 
          onClick={onClose} 
          style={{
            height: '100%',
            padding: '0 16px',
            background: 'transparent',
            border: 'none',
            color: '#d1d5db',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'background 0.2s, color 0.2s'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#93c5fd'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d1d5db'; }}
        >
          <img src="/assets/icons/close.svg" alt="close" style={{ width: '14px', height: '14px' }} />
        </button>
      </div>

      <div style={{ padding: '16px' }}>
        <form onSubmit={searchWord} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Search word..."
            style={{
              flex: 1,
              padding: '10px 12px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#0B2447',
              outline: 'none',
              fontWeight: '500',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#19376D'}
            onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              background: '#19376D',
              color: 'white',
              padding: '10px 16px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.8 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '80px',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#0B2447')}
            onMouseLeave={(e) => !loading && (e.currentTarget.style.background = '#19376D')}
          >
            {loading ? '...' : 'Look up'}
          </button>
        </form>

        <div 
          style={{
            background: '#f8fafc',
            borderRadius: '8px',
            padding: '16px',
            minHeight: '220px',
            maxHeight: '320px',
            overflowY: 'auto',
            border: '1px solid #e2e8f0'
          }}
        >
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#64748b', fontSize: '14px', fontWeight: '500' }}>Asking AI...</div>
          ) : error ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#93c5fd', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}>{error}</div>
          ) : definition ? (
            <div style={{ color: '#0B2447' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
                <h4 style={{ fontWeight: '700', fontSize: '24px', textTransform: 'capitalize', margin: 0, color: '#0B2447' }}>{definition.word}</h4>
                <span style={{ color: '#19376D', fontSize: '12px', fontWeight: '600', padding: '2px 8px', background: '#e0e7ff', borderRadius: '4px' }}>AI Powered</span>
              </div>
              
              <div style={{ color: '#334155', lineHeight: '1.6', fontSize: '14px', fontWeight: '500', whiteSpace: 'pre-wrap' }}>
                {definition.text}
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#94a3b8', gap: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Type a word to search with AI</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
