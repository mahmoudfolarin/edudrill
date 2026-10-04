import { useState } from 'react';

function UserHeader() {
  const [name] = useState(() => {
    try {
      const stored = localStorage.getItem('student_data');
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.name || 'Guest';
      }
    } catch (e) {
      // ignore errors
    }
    return 'Guest';
  });

  return (
    <header className="user-header">
      <span className="user-name">Hello, {name}</span>
    </header>
  );
}

export default UserHeader;
