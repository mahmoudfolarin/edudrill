import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function UserHeader() {
  const location = useLocation();
  const [name] = useState(() => {
    try {
      const stored = localStorage.getItem('student_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.name || 'Guest';
      }
    } catch {
      // ignore errors
    }
    return 'Guest';
  });

  // Hide on landing page, onboarding, and dedicated exam/practice modes
  const isHidden = location.pathname === '/' || location.pathname === '/onboarding' || location.pathname.includes('/cbt') || location.pathname.includes('/practice');
  if (isHidden) return null;

  return (
    <header className="user-header" style={{ background: '#0B2144', color: '#FFFFFF', padding: '10px 24px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontFamily: "'Inter', sans-serif", fontSize: '14px', fontWeight: '600', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <span className="user-name" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E' }}></span>
        Hello, {name}
      </span>
    </header>
  );
}

export default UserHeader;
