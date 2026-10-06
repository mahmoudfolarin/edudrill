import { Link, useParams } from "react-router-dom";

const subjectNames = {
  "english-language": "English Language",
  "general-mathematics": "General Mathematics",
  biology: "Biology",
  chemistry: "Chemistry",
  physics: "Physics",
  government: "Government",
  "literature-in-english": "Literature-in-English",
  "civic-education": "Civic Education",
  economics: "Economics",
  "financial-accounting": "Financial Accounting",
  commerce: "Commerce",
  "islamic-studies": "Islamic Studies",
  "christian-religious-studies": "Christian Religious Studies",
  yoruba: "Yoruba",
  igbo: "Igbo",
  hausa: "Hausa",
};

function MobileSubjectDashboard() {
  const { exam, subject } = useParams();

  const subjectName = subjectNames[subject] || subject?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  const features = [
    {
      icon: "📚",
      title: "Learn",
      subtitle: "Build your knowledge",
      description: "Study topics, lessons and key concepts.",
      path: `/dashboard/${exam}/subjects/${subject}/learn`,
      color: "#123b72",
      bg: "#f0f9ff"
    },
    {
      icon: "🔖",
      title: "Bookmarks",
      subtitle: "Keep what matters",
      description: "Save important questions and topics.",
      path: `/dashboard/${exam}/subjects/${subject}/bookmarks`,
      color: "#0ea5e9",
      bg: "#e0f2fe"
    },
    {
      icon: "📊",
      title: "Performance",
      subtitle: "Know your progress",
      description: "Track your scores and accuracy.",
      path: `/dashboard/${exam}/subjects/${subject}/performance`,
      color: "#10b981",
      bg: "#d1fae5"
    },
    {
      icon: "🤖",
      title: "AI Tutor",
      subtitle: "Your study assistant",
      description: "Ask questions and get explanations.",
      path: `/dashboard/${exam}/subjects/${subject}/ai-tutor`,
      color: "#8b5cf6",
      bg: "#ede9fe"
    },
  ];

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '100px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to={`/dashboard/${exam}/subjects`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <strong style={{ color: '#1e293b', fontSize: '16px' }}>{exam?.toUpperCase()} Prep</strong>
        </div>
        <div style={{ width: '24px' }} />
      </header>

      {/* HERO SECTION */}
      <div style={{ padding: '32px 24px', background: 'linear-gradient(135deg, #123b72 0%, #1e40af 100%)', color: 'white', borderRadius: '0 0 32px 32px', boxShadow: '0 10px 30px rgba(18, 59, 114, 0.2)', marginBottom: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '150px', height: '150px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '100px', height: '100px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', marginBottom: '16px' }}>
            SUBJECT WORKSPACE
          </div>
          <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', fontWeight: '800', lineHeight: 1.2 }}>{subjectName}</h1>
          <p style={{ fontSize: '14px', margin: 0, opacity: 0.9, lineHeight: 1.5 }}>
            Master this subject, practice confidently and track your progress.
          </p>
        </div>
      </div>

      <div style={{ padding: '0 16px' }}>
        
        <h2 style={{ fontSize: '18px', color: '#1e293b', fontWeight: '800', marginBottom: '16px' }}>How do you want to study?</h2>
        
        {/* FEATURES GRID */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '32px' }}>
          {features.map((feature, idx) => (
            <Link 
              key={idx} 
              to={feature.path}
              style={{
                background: 'white',
                padding: '20px',
                borderRadius: '20px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.02)',
                border: '1px solid #f1f5f9'
              }}
            >
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: feature.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', flexShrink: 0 }}>
                {feature.icon}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '12px', color: feature.color, fontWeight: '700', textTransform: 'uppercase' }}>{feature.subtitle}</span>
                <h3 style={{ margin: '4px 0 6px 0', fontSize: '18px', color: '#1e293b', fontWeight: '800' }}>{feature.title}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b', lineHeight: 1.4 }}>{feature.description}</p>
              </div>
              <div style={{ color: '#cbd5e1', fontWeight: 'bold', fontSize: '20px', alignSelf: 'center' }}>
                →
              </div>
            </Link>
          ))}
        </div>

      </div>

      {/* FIXED BOTTOM ACTION */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '16px', borderTop: '1px solid #e2e8f0', zIndex: 40 }}>
        <Link 
          to={`/dashboard/${exam}/practice?subject=${subject}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            background: '#123b72',
            color: 'white',
            textDecoration: 'none',
            padding: '16px',
            borderRadius: '16px',
            fontWeight: '800',
            fontSize: '16px',
            boxShadow: '0 8px 20px rgba(18, 59, 114, 0.2)'
          }}
        >
          <span>⚡</span> Quick Practice
        </Link>
      </div>

    </main>
  );
}

export default MobileSubjectDashboard;
