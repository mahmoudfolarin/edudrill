import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import images for the background carousel
import img1 from "../assets/testimony_1.jpg";
import img2 from "../assets/students_bg.jpg";
import img3 from "../assets/edudrill_ad_1.jpg";
import img4 from "../assets/edudrill_ad_2.jpg";
import img5 from "../assets/edudrill_ad_3.jpg";
import img6 from "../assets/edudrill_ad_4.jpg";
import img7 from "../assets/edudrill_ad_5.jpg";
import img8 from "../assets/students_practicing.jpg";
import newHero from "../assets/new_hero.jpg";
import edudrillLogo from "../assets/edudrill_logo.jpg";

function EduDrillLogo() {
  return (
    <div className="splash-logo">
      <img src={edudrillLogo} alt="EduDrill Logo" className="splash-logo-icon" style={{ borderRadius: '50%', objectFit: 'cover' }} />
      <h1>
        Edu<span>Drill</span>
      </h1>
    </div>
  )
}

import MobileHome from "./mobile/MobileHome";
import useMobile from "../hooks/useMobile";

function DesktopHome() {
  const navigate = useNavigate();
  const testimonials = [newHero, img1, img2, img3, img4, img5, img6, img7, img8];
  
  const testimonialsData = [
    { text: "The website is user-friendly and easy to navigate. i love how it makes accessing past questions and practicing much easier. Definitely a useful tool for students", name: "Tijani Hameedah", role: "Undergraduate", initial: "T" },
    { text: "EduDrill looks really good and well put together. The design layout is okay and easy to navigate for student. Informations presented clearly, in a clean and professional appearance", name: "Akinleye Haleemah", role: "Undergraduate", initial: "A" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <main style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      height: '100vh', 
      width: '100%', 
      overflow: 'hidden', 
      background: '#09192f',
      fontFamily: 'inherit'
    }}>
      {/* ======================================================== */}
      {/* LEFT HALF: DYNAMIC STUDENT CAROUSEL & TESTIMONIALS */}
      {/* ======================================================== */}
      <section style={{ 
        flex: '1.1', 
        position: 'relative', 
        height: '100%', 
        overflow: 'hidden',
        background: '#040d1a'
      }}>
        {/* Carousel Images */}
        {testimonials.map((img, idx) => (
          <img 
            key={idx}
            src={img}
            alt="Students Practicing CBT"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              opacity: currentIndex === idx ? 1 : 0,
              transform: currentIndex === idx ? 'scale(1.02)' : 'scale(1)',
              transition: 'opacity 1.4s ease-in-out, transform 5s ease-out'
            }}
          />
        ))}

        {/* Cinematic Gradient Overlays */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(4, 13, 26, 0.25) 0%, rgba(4, 13, 26, 0.45) 70%, rgba(7, 23, 49, 0.95) 100%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '55%',
          background: 'linear-gradient(to top, rgba(4, 13, 26, 0.95) 0%, rgba(4, 13, 26, 0.5) 60%, transparent 100%)',
          pointerEvents: 'none'
        }} />

        {/* Top-Left Subtle Badge */}
        <div style={{
          position: 'absolute',
          top: '32px',
          left: '36px',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(7, 23, 49, 0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          padding: '8px 16px',
          borderRadius: '999px',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
        }}>
          <span style={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: '#22c55e', 
            boxShadow: '0 0 10px #22c55e' 
          }} />
          <span style={{ color: '#e2e8f0', fontSize: '12px', fontWeight: '700', letterSpacing: '1px' }}>
            EDUDRILL CBT PLATFORM
          </span>
        </div>

        {/* Bottom Floating Testimonial Card */}
        <div style={{
          position: 'absolute',
          bottom: '36px',
          left: '36px',
          right: '36px',
          zIndex: 5,
          background: 'rgba(15, 30, 56, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '20px 24px',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
        }}>
          <div style={{ display: 'flex', gap: '4px', color: '#f59e0b', marginBottom: '8px', fontSize: '15px' }}>
            ★ ★ ★ ★ ★
          </div>
          <p key={currentIndex % testimonialsData.length} style={{
            color: '#f1f5f9',
            fontStyle: 'italic',
            fontSize: '13.5px',
            lineHeight: '1.6',
            margin: '0 0 12px 0'
          }}>
            "{testimonialsData[currentIndex % testimonialsData.length].text}"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '13px',
              boxShadow: '0 4px 10px rgba(37, 99, 235, 0.3)'
            }}>
              {testimonialsData[currentIndex % testimonialsData.length].initial}
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '13px', color: '#ffffff' }}>
                {testimonialsData[currentIndex % testimonialsData.length].name}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                {testimonialsData[currentIndex % testimonialsData.length].role}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* RIGHT HALF: BRAND & ACTION PANEL */}
      {/* ======================================================== */}
      <section style={{ 
        flex: '0.9', 
        minWidth: '440px',
        maxWidth: '540px',
        height: '100%', 
        overflowY: 'auto',
        background: 'linear-gradient(175deg, #0e2a56 0%, #0a1b38 45%, #061124 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '36px 44px',
        boxSizing: 'border-box',
        boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.35)',
        borderLeft: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* Main Brand Content */}
        <div style={{ margin: 'auto 0', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          
          {/* Logo with Glow Ring */}
          <div style={{ 
            position: 'relative', 
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              position: 'absolute',
              width: '95px',
              height: '95px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0) 70%)',
              filter: 'blur(10px)'
            }} />
            <img 
              src={edudrillLogo} 
              alt="EduDrill Logo" 
              style={{ 
                width: '84px', 
                height: '84px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                position: 'relative',
                zIndex: 2,
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
                border: '3px solid rgba(255, 255, 255, 0.15)'
              }} 
            />
          </div>

          {/* Title */}
          <h1 style={{ 
            margin: '0 0 6px 0', 
            fontSize: '42px', 
            fontWeight: '800', 
            color: '#ffffff',
            letterSpacing: '-1px'
          }}>
            Edu<span style={{ color: '#38bdf8' }}>Drill</span>
          </h1>

          {/* Subtitle / Tagline */}
          <div style={{ 
            fontSize: '12px', 
            fontWeight: '700', 
            letterSpacing: '2.5px', 
            textTransform: 'uppercase', 
            color: '#94a3b8',
            marginBottom: '22px'
          }}>
            Smart Examination Preparation
          </div>

          {/* Feature Highlights */}
          <div style={{ 
            width: '100%', 
            maxWidth: '380px', 
            background: 'rgba(255, 255, 255, 0.04)', 
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '16px',
            padding: '16px 20px',
            marginBottom: '24px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '13px' }}>
              <span style={{ color: '#38bdf8', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
              <span>Full Coverage: <strong>WAEC • NECO • JAMB • GCE</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '13px' }}>
              <span style={{ color: '#38bdf8', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
              <span>Authentic CBT Exam Practice Simulator</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0', fontSize: '13px' }}>
              <span style={{ color: '#38bdf8', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
              <span>Instant Grading & Performance Analytics</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button 
              onClick={() => {
                const isRegistered = localStorage.getItem("student_registered");
                navigate(isRegistered ? "/exams" : "/onboarding");
              }} 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                padding: '15px 28px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '16px',
                fontWeight: '700',
                letterSpacing: '0.3px',
                boxShadow: '0 12px 28px rgba(217, 119, 6, 0.35)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 16px 36px rgba(217, 119, 6, 0.45)';
                e.currentTarget.style.filter = 'brightness(1.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(217, 119, 6, 0.35)';
                e.currentTarget.style.filter = 'brightness(1)';
              }}
            >
              <span>Get Started</span>
              <span style={{ fontSize: '18px' }}>→</span>
            </button>

            <Link 
              to="/activate" 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '13px 24px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#cbd5e1',
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontFamily: 'inherit',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.color = '#cbd5e1';
              }}
            >
              Activate Product
            </Link>
          </div>

          <p style={{ marginTop: '14px', fontSize: '12px', color: '#64748b' }}>
            Already have your Product Key and Activation Key?
          </p>
        </div>

        {/* Footer Contact Details */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.08)', 
          paddingTop: '18px',
          marginTop: '16px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            gap: '12px',
            marginBottom: '12px',
            fontSize: '12px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', color: '#64748b', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Brand</span>
              <strong style={{ color: '#e2e8f0' }}>Acadex</strong>
            </div>

            <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.1)' }} />

            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', color: '#64748b', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Contact</span>
              <strong>
                <a 
                  href="https://wa.me/2349135055095" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: '#38bdf8', textDecoration: 'none' }}
                >
                  +2349135055095
                </a>
              </strong>
            </div>

            <div style={{ width: '1px', height: '24px', background: 'rgba(255, 255, 255, 0.1)' }} />

            <div style={{ textAlign: 'center' }}>
              <span style={{ display: 'block', color: '#64748b', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Email</span>
              <strong>
                <a 
                  href="mailto:olanrewajumahmoud3@gmail.com" 
                  style={{ color: '#38bdf8', textDecoration: 'none' }}
                >
                  olanrewajumahmoud3@gmail.com
                </a>
              </strong>
            </div>
          </div>

          <div style={{ textAlign: 'center', color: '#475569', fontSize: '11px' }}>
            EduDrill • Version 1.0 • © Acadex
          </div>
        </div>

      </section>
    </main>
  );
}

export default function Home() {
  const { isMobile } = useMobile();
  return isMobile ? <MobileHome /> : <DesktopHome />;
}