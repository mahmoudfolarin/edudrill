import { Link, useParams } from "react-router-dom"

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
}

function SubjectDashboard() {
  const { exam, subject } = useParams()

  const subjectName =
    subjectNames[subject] ||
    subject
      ?.split("-")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1),
      )
      .join(" ")

  const features = [
    {
      number: "01",
      icon: "📚",
      title: "Learn",
      subtitle: "Build your knowledge",
      description:
        "Study topics, lessons and key concepts carefully before testing yourself.",
      action: "Start learning",
      path: `/dashboard/${exam}/subjects/${subject}/learn`,
      className: "learn-feature",
    },

    {
      number: "02",
      icon: "🔖",
      title: "Bookmarks",
      subtitle: "Keep what matters",
      description:
        "Save important questions and topics so you can easily return to them.",
      action: "View bookmarks",
      className: "bookmark-feature",
      path: `/dashboard/${exam}/subjects/${subject}/bookmarks`,
    },
    {
      number: "03",
      icon: "📊",
      title: "Performance",
      subtitle: "Know your progress",
      description:
        "Track your scores, accuracy, strengths and areas that need more work.",
      action: "View performance",
      className: "performance-feature",
      path: `/dashboard/${exam}/subjects/${subject}/performance`,
    },
{
  number: "04",
  icon: "🤖",
  title: "AI Tutor",
  subtitle: "Your study assistant",
  description:
    "Ask questions, request explanations and get help while you study.",
  action: "Open AI Tutor",
  className: "ai-feature",
  available: true,
  path: `/dashboard/${exam}/subjects/${subject}/ai-tutor`,
},
  ]

  return (
    <main className="subject-dashboard-page">

      {/* TOP NAVIGATION */}

      <header className="subject-dashboard-topbar">

        <Link
          to={`/dashboard/${exam}/subjects`}
          className="subject-dashboard-brand"
        >
          <div className="subject-dashboard-logo">
            E
          </div>

          <div className="subject-dashboard-brand-text">
            <strong>EduDrill</strong>
            <span>Smart Exam Preparation</span>
          </div>
        </Link>

        <div className="subject-dashboard-nav">

          <div className="subject-dashboard-exam">
            <span></span>
            {exam?.toUpperCase()}
          </div>

          <Link
            to={`/dashboard/${exam}/subjects`}
            className="subject-dashboard-nav-link"
          >
            All Subjects
          </Link>

        </div>

      </header>

      {/* HERO */}

      <section className="subject-dashboard-hero">

        <div className="subject-dashboard-hero-inner">

          <div className="subject-dashboard-breadcrumb">

            <Link to={`/dashboard/${exam}`}>
              Dashboard
            </Link>

            <span>›</span>

            <Link
              to={`/dashboard/${exam}/subjects`}
            >
              Subjects
            </Link>

            <span>›</span>

            <strong>{subjectName}</strong>

          </div>

          <div className="subject-dashboard-label">
            <span></span>
            {exam?.toUpperCase()} · SUBJECT WORKSPACE
          </div>

          <h1>
            {subjectName}
          </h1>

          <p>
            Everything you need to master this subject,
            practice confidently and track your progress.
          </p>

          <div className="subject-dashboard-quick-stats">

            <div className="subject-stat">
              <strong>0%</strong>
              <span>Progress</span>
            </div>

            <div className="subject-stat-divider"></div>

            <div className="subject-stat">
              <strong>0</strong>
              <span>Questions</span>
            </div>

            <div className="subject-stat-divider"></div>

            <div className="subject-stat">
              <strong>0%</strong>
              <span>Accuracy</span>
            </div>

          </div>

        </div>

        <div className="subject-dashboard-hero-decoration">

          <div className="hero-orb orb-one"></div>
          <div className="hero-orb orb-two"></div>

          <div className="hero-subject-card">

            <div className="hero-subject-card-icon">
              {subjectName?.charAt(0)}
            </div>

            <div>
              <span>{exam?.toUpperCase()} PREPARATION</span>
              <strong>{subjectName}</strong>
            </div>

          </div>

        </div>

      </section>

      {/* MAIN CONTENT */}

      <section className="subject-dashboard-content">

        <div className="subject-dashboard-heading">

          <div>
            <span>YOUR STUDY SPACE</span>
            <h2>
              How do you want to study?
            </h2>
          </div>

          <p>
            Choose a path and keep moving forward.
          </p>

        </div>

        {/* FEATURE GRID */}

        <div className="subject-feature-grid">

          {features.map((feature) => (

            <FeatureCard
              key={feature.title}
              feature={feature}
            >

              <div className="subject-feature-top">

                <div className="subject-feature-icon">
                  {feature.icon}
                </div>

                <span className="subject-feature-number">
                  {feature.number}
                </span>

              </div>

              <div className="subject-feature-content">

                <span className="subject-feature-subtitle">
                  {feature.subtitle}
                </span>

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.description}
                </p>

              </div>

              <div className="subject-feature-bottom">

                <span>
                  {feature.action}
                </span>

                <strong>
                  →
                </strong>

              </div>

            </FeatureCard>

          ))}

        </div>

        {/* QUICK PRACTICE */}

        <section className="subject-quick-practice">

          <div className="quick-practice-left">

            <div className="quick-practice-icon">
              ⚡
            </div>

            <div>
              <span>READY TO TEST YOURSELF?</span>

              <h2>
                Jump straight into practice.
              </h2>

              <p>
                Don't wait until you've finished everything.
                Test what you already know and learn from
                your mistakes.
              </p>
            </div>

          </div>

          <Link
            to={`/dashboard/${exam}/practice?subject=${subject}`}
            className="quick-practice-button"
          >
            Start Practice
            <span>→</span>
          </Link>

        </section>

      </section>

      {/* FOOTER */}

      <footer className="subject-dashboard-footer">

        <div className="subject-footer-brand">

          <div className="subject-footer-logo">
            E
          </div>

          <div>
            <strong>EduDrill</strong>
            <span>Smart Exam Preparation</span>
          </div>

        </div>

        <p>
          Prepare smarter. Practice better.
          Perform with confidence.
        </p>

        <Link
          to={`/dashboard/${exam}/subjects`}
        >
          ← Back to Subjects
        </Link>

      </footer>

    </main>
  )
}

function FeatureCard({ feature, children }) {
  const className = `subject-feature-card ${feature.className}${
    feature.available === false
      ? " subject-feature-card--unavailable"
      : ""
  }`

  if (feature.available === false) {
    return (
      <article className={className} aria-label={`${feature.title} is coming soon`}>
        {children}
      </article>
    )
  }

  if (feature.onClick) {
    return (
      <div onClick={feature.onClick} className={className} style={{cursor: 'pointer'}}>
        {children}
      </div>
    )
  }

  return (
    <Link to={feature.path} className={className}>
      {children}
    </Link>
  )
}

export default SubjectDashboard
