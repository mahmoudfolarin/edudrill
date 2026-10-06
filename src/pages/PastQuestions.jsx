import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useMobile from "../hooks/useMobile"
import MobilePastQuestions from "./mobile/MobilePastQuestions"

function PastQuestions() {
  const { exam } = useParams()
  const { isMobile } = useMobile()


  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchSubjects() {
      try {
        setLoading(true)
        setError("")

       const response = await fetch(
  `/api/exams/${exam}/subjects`,
)

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load subjects",
          )
        }

        setSubjects(data.subjects || [])
      } catch (error) {
        console.error("Past questions subject error:", error)

        setError(
          "Unable to load subjects. Please make sure the EduDrill server is running.",
        )
      } finally {
        setLoading(false)
      }
    }

    fetchSubjects()
  }, [])
  if (isMobile) return <MobilePastQuestions />;

  return (
    <main className="past-questions-page">
      <header className="past-questions-header">
        <Link
          to={`/dashboard/${exam}`}
          className="past-questions-back"
        >
          ← Back to {exam.toUpperCase()} Dashboard
        </Link>

        <Link to="/" className="past-questions-brand">
          <div className="past-questions-brand-icon"><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>

          <div>
            <strong>EduDrill</strong>
            <span>Smart Exam Preparation</span>
          </div>
        </Link>
      </header>

      <section className="past-questions-container">
        <div className="past-questions-intro">
          <div className="past-questions-label">
            <span>▣</span>
            PAST QUESTIONS
          </div>

          <h1>
            Practice with
            <br />
            <span>real examination papers.</span>
          </h1>

          <p>
            Select your subject, choose an examination year,
            and work through the complete paper in its original
            question order.
          </p>
        </div>

        <div className="past-questions-info">
          <div className="past-questions-info-icon">✓</div>

          <div>
            <strong>Original paper structure</strong>
            <p>
              Questions remain in their original order.
              Topics are used internally for performance
              analysis, not for rearranging the paper.
            </p>
          </div>
        </div>

        <section className="past-questions-section">
          <div className="past-questions-section-heading">
            <div>
              <span>STEP 1</span>
              <h2>Choose a subject</h2>
            </div>

            <div className="past-questions-exam">
              {exam.toUpperCase()}
            </div>
          </div>

          {loading && (
            <div className="past-questions-loading">
              <div>📚</div>
              <h3>Loading subjects...</h3>
              <p>EduDrill is preparing your subjects.</p>
            </div>
          )}

          {error && (
            <div className="past-questions-error">
              <div>!</div>
              <h3>Unable to load subjects</h3>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && subjects.length === 0 && (
            <div className="past-questions-empty">
              <div>📚</div>
              <h3>No subjects available</h3>
              <p>
                Subjects for this examination have not been
                added yet.
              </p>
            </div>
          )}

          {!loading && !error && subjects.length > 0 && (
            <div className="past-subject-grid">
              {subjects.map((subject) => (
                <Link
                  key={subject.id}
                  to={`/dashboard/${exam}/past-questions/${subject.slug}`}
                  className="past-subject-card"
                >
                  <div className="past-subject-icon">
                    {subject.icon || "📘"}
                  </div>

                  <div className="past-subject-content">
                    <span>
                      {subject.subject_group || "Subject"}
                    </span>

                    <h3>{subject.name}</h3>

                    <p>
                      View available examination years
                    </p>
                  </div>

                  <div className="past-subject-arrow">
                    →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </section>

      <footer className="past-questions-footer">
        <strong>EduDrill</strong>
        <span>
          Prepare smarter. Practice better. Perform with confidence.
        </span>
      </footer>
    </main>
  )
}

export default PastQuestions