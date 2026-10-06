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
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
          <strong style={{ color: '#1e293b', fontSize: '16px' }}>EduDrill</strong>
        </div>
        <div style={{ width: '24px' }} /> {/* Spacer */}
      </header>

      <div style={{ padding: '24px 16px' }}>
        
        {/* HERO SECTION */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: '#e0e7ff', color: '#3730a3', padding: '6px 12px', borderRadius: '20px', fontSize: '10px', fontWeight: '800', letterSpacing: '1px', marginBottom: '16px' }}>
            LET'S GET STARTED
          </div>
          <h1 style={{ fontSize: '28px', color: '#1e293b', marginBottom: '12px', fontWeight: '800', lineHeight: 1.2 }}>
            Choose your <br/><span style={{ color: '#123b72' }}>examination.</span>
          </h1>
          <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
            Select the examination you're preparing for.
          </p>
        </div>

        {/* EXAM CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {exams.map((exam) => (
            <Link
              key={exam.name}
              to={`/dashboard/${exam.name.toLowerCase()}`}
              style={{
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '20px',
                padding: '20px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
              }}
            >
              <div style={{ width: '64px', height: '64px', background: '#f8fafc', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <img src={exam.icon} alt={exam.title} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '18px', color: '#1e293b', fontWeight: '800' }}>{exam.title}</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>{exam.description}</p>
              </div>
              <div style={{ color: '#123b72', fontWeight: 'bold', fontSize: '20px' }}>
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
