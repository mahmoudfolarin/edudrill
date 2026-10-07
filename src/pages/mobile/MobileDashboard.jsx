import { Link, useParams } from "react-router-dom"

function MobileDashboard() {
  const { exam } = useParams()
  const examName = exam.toUpperCase()

  const actions = [
    { title: "Learn", desc: "Explore subjects and topics", icon: "book.svg", link: "subjects", color: "#e0e7ff", textColor: "#4338ca" },
    { title: "Practice", desc: "Topic-based practice", icon: "practice.svg", link: "practice", color: "#dcfce7", textColor: "#15803d" },
    { title: "Past Questions", desc: "Verified exam papers", icon: "document.svg", link: "past-questions", color: "#ffedd5", textColor: "#c2410c" },
    { title: "CBT Tests", desc: "Timed exam-style tests", icon: "target.svg", link: "cbt", color: "#fce7f3", textColor: "#be185d" },
    { title: "AI Tutor", desc: "Get help from AI", icon: "robot.svg", link: "ai-tutor", color: "#f3e8ff", textColor: "#7e22ce" },
    { title: "Performance", desc: "View analytics", icon: "document.svg", link: "performance", color: "#e2e8f0", textColor: "#334155" }
  ];

  const subjects = [
    { title: "General Mathematics", icon: "math.svg", link: "general-mathematics" },
    { title: "English Language", icon: "book.svg", link: "english-language" },
    { title: "Biology", icon: "biology.svg", link: "biology" },
    { title: "Chemistry", icon: "chemistry.svg", link: "chemistry" },
  ];

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingBottom: '40px' }}>
      
      {/* HEADER */}
      <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
        <Link to="/exams" style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
          ←
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
          <strong style={{ color: '#1e293b', fontSize: '16px' }}>{examName}</strong>
        </div>
        <div style={{ width: '24px' }} /> {/* Spacer for centering */}
      </header>

      {/* WELCOME BANNER */}
      <div style={{ margin: '16px', background: 'linear-gradient(135deg, #123b72 0%, #1e40af 100%)', borderRadius: '24px', padding: '24px', color: 'white', position: 'relative', overflow: 'hidden', boxShadow: '0 10px 20px rgba(30, 64, 175, 0.2)' }}>
        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>OVERALL PROGRESS</span>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
          <div>
            <h1 style={{ fontSize: '36px', margin: 0, fontWeight: '800' }}>{overallPercentage}%</h1>
            <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#bfdbfe' }}>Complete</p>
          </div>
          <Link to={`/dashboard/${exam}/subjects`} style={{ background: 'white', color: '#1e40af', padding: '10px 16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            Start Learning
          </Link>
        </div>
      </div>

      {/* STATS ROW */}
      <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', padding: '0 16px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {[
          { label: "Questions", val: questionsPracticed },
          { label: "Tests", val: testsCompleted },
          { label: "Topics", val: topicsLearned },
          { label: "Bookmarks", val: bookmarksCount }
        ].map(stat => (
          <div key={stat.label} style={{ minWidth: '100px', background: 'white', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', flexShrink: 0 }}>
            <strong style={{ display: 'block', fontSize: '20px', color: '#1e293b' }}>{stat.val}</strong>
            <span style={{ fontSize: '12px', color: '#64748b' }}>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ACTIONS GRID */}
      <div style={{ padding: '24px 16px' }}>
        <h2 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '16px' }}>Quick Actions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {actions.map(action => (
            <Link key={action.title} to={`/dashboard/${exam}/${action.link}`} style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '16px', borderRadius: '20px', textDecoration: 'none', border: '1px solid #f1f5f9', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '16px', background: action.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '16px', flexShrink: 0 }}>
                <img src={`/assets/icons/${action.icon}`} alt={action.title} style={{ width: '24px', height: '24px' }} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#1e293b' }}>{action.title}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748b' }}>{action.desc}</p>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '24px' }}>›</div>
            </Link>
          ))}
        </div>
      </div>

      {/* SUBJECTS */}
      <div style={{ padding: '0 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', color: '#1e293b', margin: 0 }}>Your Subjects</h2>
          <Link to={`/dashboard/${exam}/subjects`} style={{ fontSize: '13px', color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>View All</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {subjects.map(sub => (
            <Link key={sub.title} to={`/dashboard/${exam}/subjects/${sub.link}`} style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '16px', borderRadius: '20px', textDecoration: 'none', border: '1px solid #f1f5f9' }}>
              <img src={`/assets/icons/${sub.icon}`} alt={sub.title} style={{ width: '24px', height: '24px', marginRight: '16px' }} />
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', fontSize: '15px', color: '#1e293b', marginBottom: '2px' }}>{sub.title}</strong>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Practice & Learn</span>
              </div>
              <div style={{ color: '#cbd5e1', fontSize: '24px' }}>›</div>
            </Link>
          ))}
        </div>
      </div>

    </main>
  )
}

export default MobileDashboard