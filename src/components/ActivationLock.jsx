import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { isProductActivated, FREE_SUBJECTS } from '../utils/license';

/* eslint-disable-next-line react-refresh/only-export-components */
export { isProductActivated, FREE_SUBJECTS };

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
      padding: '40px 20px',
      color: '#0F172A',
      maxWidth: '520px',
      margin: '0 auto'
    }}>
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '20px',
        background: '#EFF6FF',
        border: '1.5px solid #BFDBFE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
        boxShadow: '0 8px 16px rgba(37, 99, 235, 0.08)'
      }}>
        <FaLock style={{ fontSize: '28px', color: '#2563EB' }} />
      </div>

      <div style={{
        display: 'inline-block',
        background: '#FEF2F2',
        color: '#DC2626',
        fontSize: '11px',
        fontWeight: '800',
        letterSpacing: '0.8px',
        padding: '4px 12px',
        borderRadius: '999px',
        textTransform: 'uppercase',
        marginBottom: '12px',
        border: '1px solid #FECACA'
      }}>
        Full Access Required
      </div>

      <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0B2144', margin: '0 0 10px 0', letterSpacing: '-0.4px' }}>
        Product Activation Required
      </h2>

      <p style={{ color: '#475569', marginBottom: '24px', fontSize: '15px', lineHeight: 1.6 }}>
        {message || "This content is reserved for activated devices. One-time activation unlocks all 16+ senior subjects, 20+ years of verified past questions, timed mock tests, and the 24/7 AI Tutor."}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '320px' }}>
        <Link to="/activate" style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          padding: '14px 24px',
          background: 'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
          color: '#FFFFFF',
          textDecoration: 'none',
          borderRadius: '12px',
          fontWeight: '700',
          fontSize: '15px',
          boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)',
          transition: 'transform 0.15s ease'
        }}>
          ⚡ Activate EduDrill Now (₦2,500)
        </Link>
        <Link to="/exams" style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '11px 20px',
          background: '#FFFFFF',
          color: '#475569',
          textDecoration: 'none',
          borderRadius: '10px',
          fontWeight: '600',
          fontSize: '13.5px',
          border: '1px solid #CBD5E1'
        }}>
          ← Back to Examination List
        </Link>
      </div>
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
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'inherit',
      zIndex: 10
    }}>
      <FaLock style={{ fontSize: '24px', color: '#2563EB', marginBottom: '8px' }} />
      <span style={{ fontWeight: 'bold', fontSize: '14px', color: '#0B2144' }}>Locked</span>
    </div>
  )
}
