import { Link, useParams } from "react-router-dom"

import MobileDashboard from "./mobile/MobileDashboard"
import useMobile from "../hooks/useMobile"

function DesktopDashboard() {
  const { exam } = useParams()

  const examName = exam.toUpperCase()

  return (
    <main className="dashboard-page">

      {/* =================================
          HEADER
      ================================= */}

      <header className="dashboard-header">

        <Link
          to="/"
          className="dashboard-brand"
        >
          <div className="dashboard-logo">
            <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
          </div>

          <div>
            <strong>EduDrill</strong>

            <span>
              {examName} Preparation
            </span>
          </div>
        </Link>

        <Link
          to="/exams"
          className="back-button"
        >
          ← Back to Exam Selection
        </Link>

      </header>


      {/* =================================
          WELCOME
      ================================= */}

      <section className="dashboard-welcome">

        <div className="welcome-content">

          <span className="welcome-badge">
            {examName} PREPARATION
          </span>

          <h1>
            Ready to sharpen
            <span> your skills?</span>
          </h1>

          <p>
            Learn, practice, test yourself, work through
            past questions and track your progress with EduDrill.
          </p>

        </div>

      </section>


      {/* =================================
          MAIN CONTAINER
      ================================= */}

      <section className="dashboard-container">


        {/* =================================
            PROGRESS
        ================================= */}

        <div className="progress-overview">

          <div className="progress-main">

            <div>

              <span className="dashboard-label">
                OVERALL PROGRESS
              </span>

              <h2>0%</h2>

              <p>
                You haven't started this preparation yet.
                Choose a subject and begin learning.
              </p>

            </div>

            <div className="progress-ring">

              <div>
                <strong>0%</strong>
                <span>Complete</span>
              </div>

            </div>

          </div>


          <div className="progress-stats">

            <div>
              <strong>0</strong>
              <span>Questions Practiced</span>
            </div>

            <div>
              <strong>0</strong>
              <span>Tests Completed</span>
            </div>

            <div>
              <strong>0</strong>
              <span>Topics Learned</span>
            </div>

            <div>
              <strong>0</strong>
              <span>Bookmarks</span>
            </div>

          </div>

        </div>


        {/* =================================
            QUICK ACTIONS
        ================================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>

              <span>
                YOUR PREPARATION
              </span>

              <h2>
                What would you like to do?
              </h2>

            </div>

          </div>


          <div className="dashboard-action-grid">


            {/* =================================
                LEARN
            ================================= */}

            <Link
              to={`/dashboard/${exam}/subjects`}
              className="dashboard-action-card learn-card"
            >

              <div className="action-card-icon">
                <img src="/assets/icons/book.svg" alt="Learn" style={{ width: 24, height: 24 }} />
              </div>

              <div className="action-card-content">

                <h3>
                  Learn
                </h3>

                <p>
                  Explore subjects, topics, lessons and
                  explanations.
                </p>

                <span>
                  Start Learning →
                </span>

              </div>

            </Link>


            {/* =================================
                PRACTICE
            ================================= */}

            <Link
              to={`/dashboard/${exam}/practice`}
              className="dashboard-action-card practice-card"
            >

              <div className="action-card-icon">
                <img src="/assets/icons/practice.svg" alt="Practice" style={{ width: 24, height: 24 }} />
              </div>

              <div className="action-card-content">

                <h3>
                  Practice
                </h3>

                <p>
                  Practice questions by subject and topic
                  to strengthen your knowledge.
                </p>

                <span>
                  Start Practicing →
                </span>

              </div>

            </Link>


            {/* =================================
                PAST QUESTIONS
            ================================= */}

            <Link
              to={`/dashboard/${exam}/past-questions`}
              className="dashboard-action-card past-questions-card"
            >

              <div className="action-card-icon">
                <img src="/assets/icons/document.svg" alt="Past Questions" style={{ width: 24, height: 24 }} />
              </div>

              <div className="action-card-content">

                <h3>
                  Past Questions
                </h3>

                <p>
                  Work through verified examination papers
                  by subject, year and paper.
                </p>

                <span>
                  View Past Questions →
                </span>

              </div>

            </Link>


            {/* =================================
                CBT
            ================================= */}

            <Link
              to={`/dashboard/${exam}/cbt`}
              className="dashboard-action-card cbt-card"
            >

              <div className="action-card-icon">
                <img src="/assets/icons/target.svg" alt="CBT" style={{ width: 24, height: 24 }} />
              </div>

              <div className="action-card-content">

                <h3>
                  CBT Tests
                </h3>

                <p>
                  Take timed examination-style tests and
                  measure your readiness.
                </p>

                <span>
                  Take a Test →
                </span>

              </div>

            </Link>


            {/* =================================
                AI TUTOR
            ================================= */}

            <Link
              to={`/dashboard/${exam}/ai-tutor`}
              className="dashboard-action-card ai-card"
            >

              <div className="action-card-icon">
                <img src="/assets/icons/robot.svg" alt="AI Tutor" style={{ width: 24, height: 24 }} />
              </div>

              <div className="action-card-content">

                <h3>
                  AI Tutor
                </h3>

                <p>
                  Get help understanding difficult concepts
                  and questions.
                </p>

                <span>
                  Ask AI Tutor →
                </span>

              </div>

            </Link>

            {/* =================================
                PERFORMANCE
            ================================= */}

            <Link
              to={`/dashboard/${exam}/performance`}
              className="dashboard-action-card performance-card"
            >

              <div className="action-card-icon">
                <img src="/assets/icons/document.svg" alt="Performance" style={{ width: 24, height: 24 }} />
              </div>

              <div className="action-card-content">

                <h3>
                  Performance
                </h3>

                <p>
                  View your scores, analytics, and track your
                  overall progress.
                </p>

                <span>
                  View Analytics →
                </span>

              </div>

            </Link>

          </div>

        </section>


        {/* =================================
            PAST QUESTIONS FEATURE
        ================================= */}

        <section className="dashboard-section">

          <div style={{
            background: 'linear-gradient(135deg, #0B2447 0%, #19376D 100%)',
            borderRadius: '24px',
            padding: '40px',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            boxShadow: '0 20px 25px -5px rgba(11, 36, 71, 0.15)',
            position: 'relative',
            overflow: 'hidden'
          }}>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <img src="/assets/icons/document.svg" alt="Archive" style={{ width: 24, height: 24 }} />
            </div>

            <div style={{ zIndex: 1 }}>
              <span style={{
                color: '#DCEBFF',
                fontSize: '12px',
                fontWeight: '700',
                letterSpacing: '1.5px',
                textTransform: 'uppercase'
              }}>
                EXAMINATION ARCHIVE
              </span>

              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                margin: '8px 0 16px 0',
                letterSpacing: '-0.5px'
              }}>
                Practice {examName} past questions
              </h2>

              <p style={{
                color: '#DCEBFF',
                fontSize: '16px',
                lineHeight: '1.6',
                margin: 0,
                maxWidth: '600px'
              }}>
                Choose a subject, select an examination year,
                and work through the complete paper in its
                original question order.
              </p>

              <div style={{
                display: 'flex',
                gap: '16px',
                marginTop: '24px',
                flexWrap: 'wrap'
              }}>
                {['Subject-based', 'Year-based', 'Original question order'].map(point => (
                  <span key={point} style={{
                    background: 'rgba(255,255,255,0.1)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ color: '#60a5fa' }}>✓</span> {point}
                  </span>
                ))}
              </div>
            </div>

            <Link
              to={`/dashboard/${exam}/past-questions`}
              style={{
                background: 'white',
                color: '#0B2447',
                padding: '14px 28px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                display: 'inline-block',
                alignSelf: 'flex-start',
                marginTop: '8px',
                transition: 'transform 0.2s ease',
                zIndex: 1
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Browse Papers →
            </Link>

            <div style={{
              position: 'absolute',
              right: '-5%',
              bottom: '-20%',
              opacity: '0.05',
              transform: 'rotate(-15deg)',
              pointerEvents: 'none'
            }}>
              <img src="/assets/icons/document.svg" alt="" style={{ width: 200, height: 200 }} />
            </div>
          </div>

        </section>


        {/* =================================
            SUBJECTS
        ================================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>

              <span>
                EXPLORE
              </span>

              <h2>
                Your Subjects
              </h2>

              <p>
                Choose a subject and start your preparation.
              </p>

            </div>

            <Link
              to={`/dashboard/${exam}/subjects`}
              className="view-all-button"
            >
              View All →
            </Link>

          </div>


          <div className="subject-preview-grid">


            {/* GENERAL MATHEMATICS */}

            <Link
              to={`/dashboard/${exam}/subjects/general-mathematics`}
              className="subject-preview-card"
            >

              <div>
                <img src="/assets/icons/math.svg" alt="Math" style={{ width: 24, height: 24 }} />
              </div>

              <section>

                <strong>
                  General Mathematics
                </strong>

                <span>
                  Practice & Learn
                </span>

              </section>

              <b>
                →
              </b>

            </Link>


            {/* ENGLISH */}

            <Link
              to={`/dashboard/${exam}/subjects/english-language`}
              className="subject-preview-card"
            >

              <div>
                <img src="/assets/icons/book.svg" alt="English" style={{ width: 24, height: 24 }} />
              </div>

              <section>

                <strong>
                  English Language
                </strong>

                <span>
                  Practice & Learn
                </span>

              </section>

              <b>
                →
              </b>

            </Link>


            {/* BIOLOGY */}

            <Link
              to={`/dashboard/${exam}/subjects/biology`}
              className="subject-preview-card"
            >

              <div>
                <img src="/assets/icons/biology.svg" alt="Biology" style={{ width: 24, height: 24 }} />
              </div>

              <section>

                <strong>
                  Biology
                </strong>

                <span>
                  Practice & Learn
                </span>

              </section>

              <b>
                →
              </b>

            </Link>


            {/* CHEMISTRY */}

            <Link
              to={`/dashboard/${exam}/subjects/chemistry`}
              className="subject-preview-card"
            >

              <div>
                <img src="/assets/icons/chemistry.svg" alt="Chemistry" style={{ width: 24, height: 24 }} />
              </div>

              <section>

                <strong>
                  Chemistry
                </strong>

                <span>
                  Practice & Learn
                </span>

              </section>

              <b>
                →
              </b>

            </Link>

          </div>

        </section>


        {/* =================================
            RECOMMENDED PRACTICE
        ================================= */}

        <section className="dashboard-section">

          <div className="recommendation-box">

            <div className="recommendation-icon">
              <img src="/assets/icons/rocket.svg" alt="Start" style={{ width: 32, height: 32 }} />
            </div>

            <div className="recommendation-content">

              <span>
                RECOMMENDED
              </span>

              <h2>
                Start your {examName} preparation
              </h2>

              <p>
                Select a subject and begin with topic-based
                practice to build your confidence.
              </p>

            </div>

            <Link
              to={`/dashboard/${exam}/subjects`}
              className="recommendation-button"
            >
              Start Now →
            </Link>

          </div>

        </section>


        {/* =================================
            RECENT ACTIVITY
        ================================= */}

        <section className="dashboard-section">

          <div className="dashboard-section-heading">

            <div>

              <span>
                ACTIVITY
              </span>

              <h2>
                Recent Activity
              </h2>

            </div>

          </div>


          <div className="empty-activity">

            <div>
              <img src="/assets/icons/activity.svg" alt="Activity" style={{ width: 32, height: 32 }} />
            </div>

            <h3>
              Your activity will appear here
            </h3>

            <p>
              Start learning, practicing or taking past
              questions to see your progress and activity.
            </p>

          </div>

        </section>

      </section>


      {/* =================================
          FOOTER
      ================================= */}

      <footer className="dashboard-footer">

        <div className="dashboard-footer-logo">

          <div>
            <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: '100%', height: '100%', borderRadius: 'inherit' }} />
          </div>

          <strong>
            EduDrill
          </strong>

        </div>

        <p>
          Prepare smarter. Practice better. Perform with confidence.
        </p>

      </footer>

    </main>
  )
}

export default function Dashboard() {
  const isMobile = useMobile();
  return isMobile ? <MobileDashboard /> : <DesktopDashboard />;
}