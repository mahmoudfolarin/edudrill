import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useMobile from "../hooks/useMobile"
import MobilePastQuestionYears from "./mobile/MobilePastQuestionYears"

function PastQuestionYears() {
  const { isMobile } = useMobile()
  if (isMobile) return <MobilePastQuestionYears />;
  const { exam, subject } = useParams()

  const [papers, setPapers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchPastPapers() {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(
          `/api/past-papers?exam=${exam.toUpperCase()}&subject=${subject}`,
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load past papers",
          )
        }

        setPapers(data.papers || [])
      } catch (error) {
        console.error("Past papers loading error:", error)

        setError(
          "Unable to load past papers. Please make sure the EduDrill server is running.",
        )
      } finally {
        setLoading(false)
      }
    }

    if (exam && subject) {
      fetchPastPapers()
    }
  }, [exam, subject])

  const subjectName =
    papers.length > 0
      ? papers[0].subject_name
      : subject
          ?.split("-")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1),
          )
          .join(" ")

  const groupedYears = papers.reduce(
    (groups, paper) => {
      if (!groups[paper.year]) {
        groups[paper.year] = []
      }

      groups[paper.year].push(paper)

      return groups
    },
    {},
  )

  const years = Object.keys(groupedYears).sort(
    (a, b) => Number(b) - Number(a),
  )

  if (isMobile) {
    return <MobilePastQuestionYears />
  }

  return (
    <main className="past-years-page">

      {/* HEADER */}

      <header className="past-years-header">

        <Link
          to={`/dashboard/${exam}/past-questions`}
          className="past-years-back"
        >
          ← Back to Subjects
        </Link>

        <Link
          to="/"
          className="past-years-brand"
        >
          <div className="past-years-brand-icon">
            E
          </div>

          <div>
            <strong>EduDrill</strong>

            <span>
              Smart Exam Preparation
            </span>
          </div>
        </Link>

      </header>

      {/* MAIN */}

      <section className="past-years-container">

        {/* BREADCRUMBS */}

        <div className="past-years-breadcrumbs">

          <Link to="/exams">
            Examinations
          </Link>

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

          <strong>
            {subjectName}
          </strong>

        </div>

        {/* INTRO */}

        <div className="past-years-intro">

          <div className="past-years-label">
            <span></span>
            STEP 2 · SELECT YEAR
          </div>

          <h1>
            {subjectName}
            <br />
            <span>Past Questions</span>
          </h1>

          <p>
            Select a year to view paper availability and
            review status for {subjectName}.
          </p>

        </div>

        {/* LOADING */}

        {loading && (

          <div className="past-years-loading">

            <div>
              📅
            </div>

            <h2>
              Loading examination years...
            </h2>

            <p>
              EduDrill is checking the available
              verified papers.
            </p>

          </div>

        )}

        {/* ERROR */}

        {!loading && error && (

          <div className="past-years-error">

            <div>
              !
            </div>

            <h2>
              Unable to load past papers
            </h2>

            <p>
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>

          </div>

        )}

        {/* EMPTY */}

        {!loading &&
          !error &&
          years.length === 0 && (

            <div className="past-years-empty">

              <div>
                📚
              </div>

              <h2>
                No past papers available yet
              </h2>

              <p>No papers have been added for this subject yet.</p>

              <Link
                to={`/dashboard/${exam}/past-questions`}
              >
                ← Choose Another Subject
              </Link>

            </div>

          )}

        {/* YEARS */}

        {!loading &&
          !error &&
          years.length > 0 && (

            <section className="past-years-section">

              <div className="past-years-section-heading">

                <div>

                  <span>
                    AVAILABLE YEARS
                  </span>

                  <h2>
                    Choose an examination year
                  </h2>

                </div>

                <div className="past-years-count">
                  {papers.filter((paper) => paper.verification_status === "verified").length} verified · {papers.filter((paper) => paper.verification_status !== "verified").length} pending
                </div>

              </div>

              <div className="past-year-grid">

                {years.map((year) => {

                  const yearPapers =
                    groupedYears[year] || []

                  return (

                    <Link
                      key={year}
                      to={`/dashboard/${exam}/past-questions/${subject}/${year}`}
                      className="past-year-card"
                    >

                      <div className="past-year-icon">
                        📅
                      </div>

                      <div className="past-year-content">

                        <span>
                          {exam.toUpperCase()}
                        </span>

                        <h3>
                          {year}
                        </h3>

                        <p>
                          {yearPapers.length}{" "}
                          {yearPapers.length === 1
                            ? "paper"
                            : "papers"}
                        </p>
                        <span>
                          {yearPapers.some((paper) => paper.verification_status === "verified")
                            ? "Verified papers available"
                            : "Awaiting review"}
                        </span>
                      </div>

                      <div className="past-year-select">
                        Select Year →
                      </div>

                    </Link>

                  )
                })}

              </div>

            </section>

          )}

      </section>

      {/* FOOTER */}

      <footer className="past-years-footer">

        <div>
          <strong>
            EduDrill
          </strong>

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

export default PastQuestionYears