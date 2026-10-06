import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useMobile from "../hooks/useMobile"
import MobilePastQuestionPapers from "./mobile/MobilePastQuestionPapers"

function PastQuestionPapers() {
  const { isMobile } = useMobile()
  if (isMobile) return <MobilePastQuestionPapers />;
  const { exam, subject, year } = useParams()

  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchPapers() {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(
          `/api/past-papers?exam=${exam.toUpperCase()}&subject=${subject}&year=${year}`,
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load examination papers",
          )
        }

        setPapers(data.papers || [])
      } catch (error) {
        console.error("Past papers loading error:", error)

        setError(
          "Unable to load the available papers. Please make sure the EduDrill server is running.",
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPapers()
  }, [exam, subject, year])

  const subjectName =
    papers.length > 0
      ? papers[0].subject_name
      : subject
          .split("-")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1),
          )
          .join(" ")

  if (isMobile) {
    return <MobilePastQuestionPapers />
  }

  return (
    <main className="past-papers-page">
      <header className="past-papers-header">
        <Link
          to={`/dashboard/${exam}/past-questions/${subject}`}
          className="past-papers-back"
        >
          ← Back to Years
        </Link>

        <Link to="/" className="past-papers-brand">
          <div className="past-papers-brand-icon"><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>

          <div>
            <strong>EduDrill</strong>
            <span>Smart Exam Preparation</span>
          </div>
        </Link>
      </header>

      <section className="past-papers-container">
        <div className="past-papers-breadcrumbs">
          <Link to="/exams">Examinations</Link>
          <span>›</span>

          <Link to={`/dashboard/${exam}`}>
            {exam.toUpperCase()}
          </Link>

          <span>›</span>

          <Link
            to={`/dashboard/${exam}/past-questions`}
          >
            Past Questions
          </Link>

          <span>›</span>

          <Link
            to={`/dashboard/${exam}/past-questions/${subject}`}
          >
            {subjectName}
          </Link>

          <span>›</span>

          <strong>{year}</strong>
        </div>

        <div className="past-papers-intro">
          <div className="past-papers-label">
            <span></span>
            STEP 3 · SELECT PAPER
          </div>

          <h1>
            {year}
            <br />
            <span>Examination Papers</span>
          </h1>

          <p>
            Select a licensed paper to practise. Content
            verification status is shown for each source.
          </p>
        </div>

        {loading && (
          <div className="past-papers-loading">
            <div>📄</div>

            <h2>
              Loading examination papers...
            </h2>

            <p>
              EduDrill is checking the available
              papers for {year}.
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="past-papers-error">
            <div>!</div>

            <h2>
              Unable to load papers
            </h2>

            <p>{error}</p>

            <button
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          papers.length === 0 && (
            <div className="past-papers-empty">
              <div>📚</div>

              <h2>
                No papers available yet
              </h2>

              <p>
                {exam.toUpperCase()} papers for{" "}
                {subjectName} in {year} have not been
                added to EduDrill yet.
              </p>

              <Link
                to={`/dashboard/${exam}/past-questions/${subject}`}
              >
                ← Choose Another Year
              </Link>
            </div>
          )}

        {!loading &&
          !error &&
          papers.length > 0 && (
            <section className="past-papers-section">
              <div className="past-papers-section-heading">
                <div>
                  <span>
                    AVAILABLE PAPERS
                  </span>

                  <h2>
                    {subjectName} · {year}
                  </h2>
                </div>

                <div className="past-papers-count">
                  {papers.length}{" "}
                  {papers.length === 1
                    ? "paper"
                    : "papers"}
                </div>
              </div>

              <div className="past-paper-grid">
                {papers.map((paper) => (
                  <article
                    key={paper.id}
                    className="past-paper-card"
                  >
                    <div className="past-paper-top">
                      <div className="past-paper-icon">
                        {paper.paper_type ===
                        "objective"
                          ? "✓"
                          : "📝"}
                      </div>

                      <span className="past-paper-status">
                        {["authorized", "licensed", "public_domain"].includes(paper.license_status)
                          ? paper.verification_status === "verified"
                            ? "APPROVED"
                            : "UNVERIFIED · LICENSED"
                          : "LICENSE REVIEW PENDING"}
                      </span>
                    </div>

                    <div className="past-paper-content">
                      <span className="past-paper-exam">
                        {paper.exam}
                      </span>

                      <h3>
                        {paper.paper_title}
                      </h3>

                      {paper.session && (
                        <p>
                          Session: {paper.session}
                        </p>
                      )}

                      {paper.paper_code && (
                        <p>
                          Paper Code:{" "}
                          {paper.paper_code}
                        </p>
                      )}
                    </div>

                    <div className="past-paper-meta">
                      <div>
                        <strong>
                          {paper.total_questions ||
                            "—"}
                        </strong>

                        <span>
                          Questions
                        </span>
                      </div>

                      <div>
                        <strong>
                          {paper.duration_minutes
                            ? `${paper.duration_minutes}m`
                            : "—"}
                        </strong>

                        <span>
                          Duration
                        </span>
                      </div>

                      <div>
                        <strong>
                          {paper.paper_type
                            ? paper.paper_type
                                .charAt(0)
                                .toUpperCase() +
                              paper.paper_type.slice(
                                1,
                              )
                            : "Paper"}
                        </strong>

                        <span>
                          Type
                        </span>
                      </div>
                    </div>

                    {["authorized", "licensed", "public_domain"].includes(paper.license_status) ? (
                      <Link
                        to={`/dashboard/${exam}/past-questions/${subject}/${year}/${paper.id}`}
                        className="past-paper-start"
                      >
                        <span>Start Paper</span>
                        <strong>→</strong>
                      </Link>
                    ) : (
                      <div className="past-paper-start past-paper-start--unavailable">
                        <span>Awaiting rights approval</span>
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </section>
          )}
      </section>

      <footer className="past-papers-footer">
        <div>
          <strong>EduDrill</strong>
          <span>
            Smart Exam Preparation
          </span>
        </div>

        <p>
          Prepare smarter. Practice better. Perform with confidence.
        </p>
      </footer>
    </main>
  )
}

export default PastQuestionPapers
