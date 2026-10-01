import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Subjects() {
  const { exam } = useParams()

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
        console.error("Subjects loading error:", error)

        setError(
          "Unable to load subjects. Please make sure the EduDrill server is running.",
        )
      } finally {
        setLoading(false)
      }
    }

    if (exam) {
      fetchSubjects()
    }
  }, [exam])

  const examName = exam
    ? exam.toUpperCase()
    : "EXAM"

  const groupedSubjects = subjects.reduce(
    (groups, subject) => {
      const group =
        subject.subject_group || "Other Subjects"

      if (!groups[group]) {
        groups[group] = []
      }

      groups[group].push(subject)

      return groups
    },
    {},
  )

  const groupOrder = [
    "Core Subjects",
    "Science",
    "Humanities",
    "Business",
    "Trade / Vocational",
    "Other Subjects",
  ]

  const sortedGroups = Object.keys(groupedSubjects).sort(
    (a, b) => {
      const aIndex = groupOrder.indexOf(a)
      const bIndex = groupOrder.indexOf(b)

      return (
        (aIndex === -1 ? 99 : aIndex) -
        (bIndex === -1 ? 99 : bIndex)
      )
    },
  )

  return (
    <main className="subjects-page">

      {/* HEADER */}

      <header className="subjects-header">
        <Link
          to={`/dashboard/${exam}`}
          className="subjects-back"
        >
          <span>←</span>
          Back to Dashboard
        </Link>

        <Link to="/" className="subjects-brand">
          <div className="subjects-brand-logo">
            E
          </div>

          <div>
            <strong>EduDrill</strong>
            <span>Smart Exam Preparation</span>
          </div>
        </Link>

        <div className="subjects-header-exam">
          <span>PREPARING FOR</span>
          <strong>{examName}</strong>
        </div>
      </header>

      {/* HERO */}

      <section className="subjects-hero">
        <div className="subjects-hero-inner">

          <div className="subjects-hero-copy">

            <div className="subjects-eyebrow">
              <span></span>
              {examName} PREPARATION
            </div>

            <h1>
              Choose your
              <br />
              <span>subject.</span>
            </h1>

            <p>
              Select a subject and begin your EduDrill
              preparation journey. Learn topics, practise
              questions and build your confidence.
            </p>

            {!loading && !error && (
              <div className="subjects-total">
                <div className="subjects-total-number">
                  {subjects.length}
                </div>

                <div>
                  <strong>
                    Subjects available
                  </strong>

                  <span>
                    Choose one to continue
                  </span>
                </div>
              </div>
            )}

          </div>

          <div className="subjects-hero-art">
            <div className="subjects-orbit orbit-one"></div>
            <div className="subjects-orbit orbit-two"></div>

            <div className="subjects-book">
              <span>📚</span>
            </div>

            <div className="subjects-floating-card floating-one">
              <span>✓</span>
              <div>
                <strong>Learn</strong>
                <small>Study topics</small>
              </div>
            </div>

            <div className="subjects-floating-card floating-two">
              <span>🎯</span>
              <div>
                <strong>Practice</strong>
                <small>Test yourself</small>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CONTENT */}

      <section className="subjects-content">

        <div className="subjects-content-top">
          <div>
            <span className="subjects-section-label">
              SUBJECT LIBRARY
            </span>

            <h2>
              {examName} Subjects
            </h2>

            <p>
              Choose the subject you want to prepare for.
            </p>
          </div>

          {!loading && !error && (
            <div className="subjects-count-badge">
              {subjects.length} subjects
            </div>
          )}
        </div>

        {/* LOADING */}

        {loading && (
          <div className="subjects-state">
            <div className="subjects-spinner"></div>

            <h3>Loading subjects...</h3>

            <p>
              EduDrill is preparing your subject library.
            </p>
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="subjects-state subjects-state-error">

            <div className="subjects-state-icon">
              !
            </div>

            <h3>Couldn't load subjects</h3>

            <p>{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>

          </div>
        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          subjects.length === 0 && (
            <div className="subjects-state">

              <div className="subjects-state-icon">
                📚
              </div>

              <h3>No subjects available</h3>

              <p>
                No subjects have been configured for{" "}
                {examName} yet.
              </p>

            </div>
          )}

        {/* SUBJECT GROUPS */}

        {!loading &&
          !error &&
          subjects.length > 0 && (
            <div className="subjects-groups">

              {sortedGroups.map((group) => (
                <section
                  key={group}
                  className="subjects-group"
                >

                  <div className="subjects-group-header">

                    <div>
                      <span>
                        {group.toUpperCase()}
                      </span>

                      <h3>
                        {group}
                      </h3>
                    </div>

                    <div className="subjects-group-count">
                      {groupedSubjects[group].length}
                    </div>

                  </div>

                  <div className="subjects-grid">

                    {groupedSubjects[group].map(
                      (subject, index) => (
                        <Link
                          key={subject.id}
                          to={`/dashboard/${exam}/subjects/${subject.slug}`}
                          className="subject-card"
                        >

                          <div className="subject-card-top">

                            <div className="subject-number">
                              {String(index + 1).padStart(
                                2,
                                "0",
                              )}
                            </div>

                            <div className="subject-icon">
                              {subject.icon || "📚"}
                            </div>

                            {subject.is_new && (
                              <span className="subject-new">
                                NEW
                              </span>
                            )}

                          </div>

                          <div className="subject-card-main">

                            <span>
                              {group}
                            </span>

                            <h4>
                              {subject.name}
                            </h4>

                          </div>

                          <div className="subject-card-footer">

                            <span>
                              Start studying
                            </span>

                            <div className="subject-arrow">
                              →
                            </div>

                          </div>

                        </Link>
                      ),
                    )}

                  </div>

                </section>
              ))}

            </div>
          )}

      </section>

      {/* FOOTER */}

      <footer className="subjects-footer">

        <div className="subjects-footer-brand">
          <div><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>

          <div>
            <strong>EduDrill</strong>
            <span>
              Smart Exam Preparation
            </span>
          </div>
        </div>

        <p>
          Prepare smarter. Practice better. Perform with
          confidence.
        </p>

        <Link to={`/dashboard/${exam}`}>
          Back to Dashboard →
        </Link>

      </footer>

    </main>
  )
}

export default Subjects