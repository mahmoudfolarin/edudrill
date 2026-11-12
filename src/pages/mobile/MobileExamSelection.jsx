import { Link } from "react-router-dom";

const exams = [
  {
    name: "WAEC",
    title: "WAEC",
    description: "Prepare for the West African Senior School Certificate Examination.",
    icon: "/assets/waec_logo.png"
  },
  {
    name: "NECO",
    title: "NECO",
    description: "Build your confidence and prepare effectively for NECO.",
    icon: "/assets/neco_logo.png"
  },
  {
    name: "GCE",
    title: "GCE",
    description: "Strengthen your knowledge with structured GCE preparation.",
    icon: "/assets/gce_logo.png"
  },
  {
    name: "JAMB",
    title: "JAMB",
    description: "Prepare for UTME with your required four-subject combination.",
    icon: "/assets/jamb_logo.png"
  },
];

function MobileExamSelection() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>

      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid #E2E8F0' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#0B2144', fontSize: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '8px', background: '#F1F5F9' }} aria-label="Back to Home">
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }} />
          <strong style={{ color: '#0B2144', fontSize: '17px', letterSpacing: '-0.3px' }}>Edu<span style={{ color: '#2563EB' }}>Drill</span></strong>
        </div>
        <div style={{ width: '36px' }} /> {/* Spacer */}
      </header>

      <div style={{ padding: '28px 20px', maxWidth: '520px', margin: '0 auto' }}>

        {/* HERO SECTION */}
        <div style={{ marginBottom: '28px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: '#EFF6FF', color: '#1E3A8A', padding: '6px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', marginBottom: '14px', border: '1px solid #BFDBFE' }}>
            LET'S GET STARTED
          </div>
          <h1 style={{ fontSize: '28px', color: '#0F172A', marginBottom: '10px', fontWeight: '900', lineHeight: 1.25, letterSpacing: '-0.5px' }}>
            Choose your <br /><span style={{ color: '#2563EB' }}>examination.</span>
          </h1>
          <p style={{ fontSize: '14.5px', color: '#475569', lineHeight: 1.5, margin: 0 }}>
            Select your examination body to access tailored past questions, mock CBT drills, and syllabus lessons.
          </p>
        </div>

        {/* EXAM CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {exams.map((exam) => (
            <Link
              key={exam.name}
              to={`/dashboard/${exam.name.toLowerCase()}`}
              style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '18px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 2px 8px rgba(11, 33, 68, 0.04)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ width: '56px', height: '56px', background: '#F8FAFC', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #F1F5F9' }}>
                <img src={exam.icon} alt={exam.title} style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '17px', color: '#0F172A', fontWeight: '800' }}>{exam.title}</h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748B', lineHeight: 1.45 }}>{exam.description}</p>
              </div>
              <div style={{ color: '#2563EB', fontWeight: '800', fontSize: '18px', paddingRight: '4px' }}>
                →
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}

export default MobileExamSelection;
