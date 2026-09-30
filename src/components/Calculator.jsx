import { useState, useRef, useEffect } from 'react';

export default function Calculator({ onClose }) {
  const [display, setDisplay] = useState('');
  const [result, setResult] = useState(null);
  
  const [position, setPosition] = useState({ 
    x: window.innerWidth > 400 ? window.innerWidth - 340 : 20, 
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
        x: Math.min(Math.max(0, prev.x), window.innerWidth - 320),
        y: Math.min(Math.max(0, prev.y), window.innerHeight - 450)
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleClick = (value) => {
    if (value === '=') {
      try {
        const calcResult = new Function('return ' + display.replace(/×/g, '*').replace(/÷/g, '/'))();
        const formatted = Number.isInteger(calcResult) ? calcResult : Number(calcResult.toFixed(6));
        setDisplay(String(formatted));
        setResult(formatted);
      } catch (error) {
        setDisplay('Error');
      }
    } else if (value === 'C') {
      setDisplay('');
      setResult(null);
    } else if (value === '⌫') {
      if (display === 'Error') setDisplay('');
      else setDisplay(prev => prev.slice(0, -1));
    } else {
      if (display === 'Error') setDisplay(value);
      else setDisplay(prev => prev + value);
    }
  };

  const buttons = [
    { label: '%', value: '/100', type: 'operator' },
    { label: 'CE', value: 'C', type: 'danger' },
    { label: 'C', value: 'C', type: 'danger' },
    { label: '⌫', type: 'danger' },
    
    { label: '1/x', value: '1/', type: 'operator' },
    { label: 'x²', value: '**2', type: 'operator' },
    { label: '√x', value: '**0.5', type: 'operator' },
    { label: '÷', type: 'operator' },
    
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    { label: '×', type: 'operator' },
    
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '-', type: 'operator' },
    
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '+', type: 'operator' },
    
    { label: '+/-', value: '-', type: 'number' },
    { label: '0', type: 'number' },
    { label: '.', type: 'number' },
    { label: '=', type: 'primary' }
  ];

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
        width: '320px',
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
          <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          <span style={{ fontSize: '13px', fontWeight: '600', letterSpacing: '0.5px' }}>Calculator</span>
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
          onMouseEnter={(e) => { e.currentTarget.style.background = '#e53e3e'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#d1d5db'; }}
        >
          <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
      
      <div style={{ padding: '8px' }}>
        {/* Header (Standard) */}
        <div style={{ padding: '4px 12px', color: '#0B2447', fontWeight: '700', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Standard
        </div>

        {/* Display */}
        <div style={{ width: '100%', textAlign: 'right', padding: '0 12px 16px 12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', minHeight: '80px' }}>
          <span style={{ fontSize: '42px', fontWeight: '600', color: '#0B2447', letterSpacing: '-1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {display || '0'}
          </span>
        </div>
        
        {/* Buttons Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', padding: '4px' }}>
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(btn.value || btn.label)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                transition: 'all 0.1s',
                height: '46px',
                fontSize: btn.type === 'primary' ? '24px' : '18px',
                background: btn.type === 'primary' 
                  ? '#0A192F' 
                  : btn.type === 'danger'
                  ? '#DCEBFF'
                  : btn.type === 'operator'
                  ? '#1D3F78'
                  : '#f8fafc',
                color: btn.type === 'primary' 
                  ? '#ffffff'
                  : btn.type === 'danger'
                  ? '#1D3F78'
                  : btn.type === 'operator'
                  ? '#ffffff'
                  : '#1D3F78',
                border: btn.type === 'number' ? '1px solid #e2e8f0' : 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: btn.type === 'number' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.background = btn.type === 'primary' 
                  ? '#112240' 
                  : btn.type === 'danger'
                  ? '#c9e0ff'
                  : btn.type === 'operator'
                  ? '#244B8C'
                  : '#f1f5f9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = btn.type === 'primary' 
                  ? '#0A192F' 
                  : btn.type === 'danger'
                  ? '#DCEBFF'
                  : btn.type === 'operator'
                  ? '#1D3F78'
                  : '#f8fafc';
              }}
              onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
              onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
