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

function EduDrillLogo() {
  return (
    <div className="splash-logo">
      <img src="/assets/edudrill_logo.jpg" alt="EduDrill Logo" className="splash-logo-icon" style={{ borderRadius: '50%' }} />
      <h1>
        Edu<span>Drill</span>
      </h1>
    </div>
  )
}

function Home() {
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
    <main className="splash-page" style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Background Image Carousel */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        {testimonials.map((img, idx) => (
          <img 
            key={idx}
            src={img}
            alt="Student Testimonial Background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: currentIndex === idx ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out'
            }}
          />
        ))}
        {/* Dark overlay to make center card pop */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(11, 36, 71, 0.4)' }} />
      </div>

      {/* Floating Testimonial Tag */}
      <div className="floating-testimonial">
        <style>{`
          .floating-testimonial {
            position: absolute;
            bottom: 40px;
            right: 40px;
            z-index: 5;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 20px 24px;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
            max-width: 350px;
          }
          @media (max-width: 900px) {
            .floating-testimonial {
              display: none;
            }
          }
          @keyframes slideUpFadeIn {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes textFade {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-entrance {
            animation: slideUpFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          .animate-text {
            animation: textFade 1s ease-in-out;
          }
        `}</style>
        <div style={{ display: 'flex', gap: '8px', color: '#60a5fa', marginBottom: '8px', fontSize: '18px' }}>
          ★ ★ ★ ★ ★
        </div>
        <div key={currentIndex} className="animate-text">
          <p style={{ color: '#123b72', fontStyle: 'italic', fontSize: '15px', lineHeight: '1.5', margin: '0 0 16px 0' }}>
            "{testimonialsData[currentIndex].text}"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{testimonialsData[currentIndex].initial}</div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '14px', color: '#123b72' }}>{testimonialsData[currentIndex].name}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>{testimonialsData[currentIndex].role}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Original Center Content, encapsulated in glassmorphism */}
      <section className="splash-content animate-entrance" style={{ 
        zIndex: 10, 
        background: 'rgba(255, 255, 255, 0.92)', 
        backdropFilter: 'blur(16px)', 
        padding: '60px', 
        borderRadius: '32px', 
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        maxWidth: '600px',
        width: '90%'
      }}>
        <div className="splash-brand">
          <EduDrillLogo />
          <p className="splash-tagline">
            Smart Examination Preparation
          </p>
        </div>

        <div className="splash-action">
          <div className="splash-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button 
              onClick={() => {
                const isRegistered = localStorage.getItem("student_registered");
                window.location.href = isRegistered ? "/exams" : "/onboarding";
              }} 
              className="get-started-button" 
              style={{ justifyContent: 'center', cursor: 'pointer', border: 'none', fontFamily: 'inherit', fontSize: '16px' }}>
              Get Started
              <span>→</span>
            </button>
            <Link to="/activate" className="activate-button" style={{ justifyContent: 'center' }}>
              Activate Product
            </Link>
          </div>
          <p className="activation-hint" style={{ marginTop: '24px' }}>
            Already have your Product Key and Activation Key?
          </p>
        </div>

        <div className="splash-contact">
          <div className="contact-item">
            <span>Brand</span>
            <strong>Acadex</strong>
          </div>
          <div className="contact-divider"></div>
          <div className="contact-item">
            <span>Contact</span>
            <strong>
              <a href="https://wa.me/2349135055095" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                +2349135055095
              </a>
            </strong>
          </div>
          <div className="contact-divider"></div>
          <div className="contact-item">
            <span>Email</span>
            <strong>
              <a href="mailto:olanrewajumahmoud3@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                olanrewajumahmoud3@gmail.com
              </a>
            </strong>
          </div>
        </div>
        
        <footer className="splash-footer" style={{ marginTop: '30px' }}>
          <span>EduDrill</span>
          <span>•</span>
          <span>Version 1.0</span>
        </footer>
      </section>

    </main>
  )
}

export default Home