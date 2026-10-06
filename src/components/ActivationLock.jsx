import React from 'react';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const FREE_SUBJECTS = ['general-mathematics', 'english-language', 'use-of-english', 'civic-education'];

export function isProductActivated() {
  const licenseStr = localStorage.getItem("edudrill_license");
  if (!licenseStr) return false;
  try {
    const license = JSON.parse(licenseStr);
    return license.status === 'active';
  } catch(e) {
    return false;
  }
}

export function ActivationLock({ children, isAllowed = false, message }) {
  if (isProductActivated() || isAllowed) {
    return <>{children}</>;
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '20px',
      color: '#1e293b'
    }}>
      <FaLock style={{ fontSize: '64px', color: '#94a3b8', marginBottom: '24px' }} />
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Not yet Activated</h2>
      <p style={{ color: '#64748b', marginBottom: '24px', maxWidth: '400px' }}>
        {message || "This feature is locked. Please activate your product to unlock all subjects, years, and the AI Tutor."}
      </p>
      <Link to="/activation" style={{
        padding: '12px 24px',
        backgroundColor: '#2563eb',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: 'bold'
      }}>
        Activate Now
      </Link>
    </div>
  );
}

export function LockOverlay() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'inherit',
      zIndex: 10
    }}>
      <FaLock style={{ fontSize: '24px', color: '#64748b', marginBottom: '8px' }} />
      <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#1e293b' }}>Locked</span>
    </div>
  )
}
