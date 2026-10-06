import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Import images for the background carousel
import img1 from "../../assets/testimony_1.jpg";
import img2 from "../../assets/students_bg.jpg";
import img3 from "../../assets/edudrill_ad_1.jpg";
import img4 from "../../assets/edudrill_ad_2.jpg";
import img5 from "../../assets/edudrill_ad_3.jpg";
import img6 from "../../assets/edudrill_ad_4.jpg";
import img7 from "../../assets/edudrill_ad_5.jpg";
import img8 from "../../assets/students_practicing.jpg";

function EduDrillLogo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
      <img src="/assets/edudrill_logo.jpg" alt="EduDrill Logo" style={{ borderRadius: '50%', width: '80px', height: '80px', marginBottom: '12px', boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }} />
      <h1 style={{ fontSize: '32px', margin: 0, color: '#123b72', fontWeight: '800' }}>
        Edu<span style={{ color: '#2563eb' }}>Drill</span>
      </h1>
    </div>
  )
}

function MobileHome() {
  const navigate = useNavigate();
  const testimonials = [img1, img2, img3, img4, img5, img6, img7, img8, img1, img2];
  
  const testimonialsData = [
    { text: "EduDrill completely transformed how I prepare for my CBT exams. The interface is stunning.", name: "Sarah Johnson", role: "Top Scorer, 2026", initial: "S" },
    { text: "The practice tests are incredibly realistic. I felt so much more confident on exam day!", name: "David Olayinka", role: "Science Student", initial: "D" },
    { text: "I love the detailed performance tracking. It showed me exactly where I needed to improve.", name: "Aisha Bello", role: "University Freshman", initial: "A" },
    { text: "Studying used to be boring, but the interactive UI on EduDrill keeps me focused for hours.", name: "Michael Adebayo", role: "Art Student", initial: "M" },
    { text: "The offline mode is a lifesaver. I can practice anywhere without worrying about data.", name: "Chisom Nnamdi", role: "JAMB Candidate", initial: "C" },
    { text: "Best educational platform I've used. It's fast, beautiful, and the questions are top-notch.", name: "Fatima Umar", role: "High School Senior", initial: "F" },
    { text: "The UI design is so modern and clean. It makes navigating through subjects a breeze.", name: "Emmanuel Eze", role: "Engineering Student", initial: "E" },
    { text: "I highly recommend EduDrill to anyone preparing for WAEC or JAMB. It's a game changer.", name: "Grace Ojo", role: "Medical Student", initial: "G" },
    { text: "The keyboard shortcuts saved me so much time during the actual CBT exam.", name: "Kingsley Obi", role: "Top Scorer, 2025", initial: "K" },
    { text: "A truly premium experience. EduDrill makes learning feel like a breeze rather than a chore.", name: "Zainab Aliyu", role: "Law Student", initial: "Z" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f8fafc', overflowX: 'hidden' }}>
      
      {/* Dynamic Background Image Section (Top half) */}
      <div style={{ position: 'relative', width: '100%', height: '40vh', flexShrink: 0, overflow: 'hidden' }}>
        {testimonials.map((img, idx) => (
          <img 
            key={idx}
            src={img}
            alt="Student Background"
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: currentIndex === idx ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out'
            }}
          />
        ))}
        {/* Soft overlay */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, rgba(11,36,71,0.2), rgba(248,250,252,1))' }} />
      </div>

      {/* Main Content Area (Bottom half overlapping) */}
      <div style={{ 
        flex: 1, 
        marginTop: '-40px', 
        zIndex: 10, 
        backgroundColor: '#ffffff', 
        borderTopLeftRadius: '32px', 
        borderTopRightRadius: '32px',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 -10px 30px rgba(0,0,0,0.05)'
      }}>
        
        <EduDrillLogo />
        
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '16px', fontWeight: '500', marginBottom: '32px' }}>
          Smart Examination Preparation
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
          <button 
            onClick={() => navigate('/exams')}
            style={{ 
              width: '100%', height: '56px', borderRadius: '16px', 
              backgroundColor: '#123b72', color: 'white', 
              fontSize: '16px', fontWeight: 'bold', border: 'none', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: '0 8px 20px rgba(18, 59, 114, 0.25)', cursor: 'pointer'
            }}
          >
            Get Started <span>→</span>
          </button>
          
          <Link 
            to="/activate" 
            style={{ 
              width: '100%', height: '56px', borderRadius: '16px', 
              backgroundColor: '#f1f5f9', color: '#123b72', 
              fontSize: '16px', fontWeight: 'bold', textDecoration: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '1px solid #e2e8f0'
            }}
          >
            Activate Product
          </Link>

          <div style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
            Already have your Product Key and Activation Key?
          </div>
        </div>

        {/* Testimonials Card */}
        <div style={{ 
          background: '#f8fafc', 
          borderRadius: '24px', 
          padding: '24px', 
          border: '1px solid #e2e8f0',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ display: 'flex', gap: '4px', color: '#60a5fa', marginBottom: '12px', fontSize: '14px' }}>
            ★ ★ ★ ★ ★
          </div>
          
          <div key={currentIndex} style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
            <p style={{ color: '#1e293b', fontStyle: 'italic', fontSize: '15px', lineHeight: '1.5', margin: '0 0 16px 0' }}>
              "{testimonialsData[currentIndex].text}"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px' }}>
                {testimonialsData[currentIndex].initial}
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#1e293b' }}>{testimonialsData[currentIndex].name}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>{testimonialsData[currentIndex].role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div style={{ marginTop: '40px', textAlign: 'center', paddingBottom: '24px' }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Brand</div>
            <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '15px' }}>Acadex</div>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Contact</div>
            <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '15px' }}>+2349135055095</div>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>Email</div>
            <div style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '15px' }}>olanrewajumahmoud3@gmail.com</div>
          </div>

          <div style={{ fontSize: '13px', color: '#94a3b8' }}>
            EduDrill &bull; Version 1.0
          </div>
        </div>
        
      </div>
      
      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </main>
  );
}

export default MobileHome;
