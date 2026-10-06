import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ActivationLock, FREE_SUBJECTS } from "../components/ActivationLock"

function Learn() {
  const { exam, subject } = useParams()

  const [syllabus, setSyllabus] = useState(null)
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fallbackName = subject
    ?.split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ")

  const subjectName =
    subject === "english-language"
      ? "English Language"
      : subject === "general-mathematics"
        ? "General Mathematics"
        : subject === "literature-in-english"
          ? "Literature-in-English"
          : fallbackName

  useEffect(() => {
    async function fetchSyllabus() {
      try {
        setLoading(true)
        setError("")
        setSyllabus(null)
        setTopics([])

        // Get the active syllabus for this exam + subject
        const response = await fetch(
          `/api/syllabuses/${exam}/${subject}`,
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load syllabus",
          )
        }

        const currentSyllabus = data.syllabus

        setSyllabus(currentSyllabus)

        // The syllabus endpoint returns the topics.
        // Now retrieve the details for each topic.
        const syllabusTopics =
          currentSyllabus.topics || []

        // Retrieve completed lessons from backend
        const deviceIdentifier = localStorage.getItem("edudrill_device_id")
        let completedLessonIds = []
        if (deviceIdentifier) {
          try {
            const progressRes = await fetch(`/api/progress/all?deviceIdentifier=${deviceIdentifier}`)
            const progressData = await progressRes.json()
            if (progressData.success) {
              completedLessonIds = progressData.completedLessonIds || []
            }
          } catch (e) {
            console.error("Failed to fetch progress", e)
          }
        }

        const topicsWithDetails =
          await Promise.all(
            syllabusTopics.map(async (topic) => {
              try {
                const topicResponse = await fetch(
                  `/api/topics/${topic.id}`,
                )

                const topicData =
                  await topicResponse.json()

                if (
                  !topicResponse.ok ||
                  !topicData.success
                ) {
                  return {
                    ...topic,
                    subtopics: [],
                    lessons: [],
                    progress: 0,
                    icon: "📚",
                  }
                }

                const topicDetails =
                  topicData.topic || {}
                  
                const lessons = topicDetails.lessons || []
                const completedCount = lessons.filter(l => completedLessonIds.includes(l.id)).length
                const progressVal = lessons.length > 0 ? Math.round((completedCount / lessons.length) * 100) : 0

                return {
                  ...topic,
                  subtopics:
                    topicDetails.subtopics || [],
                  lessons: lessons,
                  progress: progressVal,
                  icon: "📚",
                }
              } catch (topicError) {
                console.error(
                  `Failed to load topic ${topic.id}:`,
                  topicError,
                )

                return {
                  ...topic,
                  subtopics: [],
                  lessons: [],
                  progress: 0,
                  icon: "📚",
                }
              }
            }),
          )

        setTopics(topicsWithDetails)
      } catch (error) {
        console.error(
          "Syllabus loading error:",
          error,
        )

        setError(
          error.message ||
            "Unable to load the syllabus. Please make sure the EduDrill server is running.",
        )
      } finally {
        setLoading(false)
      }
    }

    if (exam && subject) {
      fetchSyllabus()
    }
  }, [exam, subject])

  const completedTopics = topics.filter(
    (topic) => topic.progress === 100,
  ).length

  const overallProgress =
    topics.length > 0
      ? Math.round(
          topics.reduce(
            (total, topic) =>
              total + topic.progress,
            0,
          ) / topics.length,
        )
      : 0

  return (
    <main className="learn-page">

      {/* =========================
          TOP BAR
      ========================= */}

      <header className="learn-topbar">

        <Link
          to={`/dashboard/${exam}/subjects/${subject}`}
          className="learn-brand"
        >
          <div className="learn-logo">
            E
          </div>

          <div>
            <strong>
              EduDrill
            </strong>

            <span>
              Smart Exam Preparation
            </span>
          </div>
        </Link>

        <div className="learn-topbar-right">

          <div className="learn-exam-pill">
            <span></span>
            {exam?.toUpperCase()}
          </div>

          <Link
            to={`/dashboard/${exam}/subjects/${subject}`}
            className="learn-back-link"
          >
            ← {subjectName}
          </Link>

        </div>

      </header>

      <ActivationLock isAllowed={FREE_SUBJECTS.includes(subject)}>

      {/* =========================
          HERO
      ========================= */}

      <section className="learn-hero">

        <div className="learn-hero-content">

          <div className="learn-breadcrumb">

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

            <strong>
              {subjectName}
            </strong>

            <span>›</span>

            <strong>
              Learn
            </strong>

          </div>

          <div className="learn-label">
            <span></span>
            {exam?.toUpperCase()} • LEARNING
          </div>

          <h1>
            Learn {subjectName}
          </h1>

          <p>
            Work through the topics at your own
            pace. Learn the concepts, study examples
            and build the knowledge you need for the
            exam.
          </p>

        </div>


        {/* PROGRESS */}

        <div className="learn-progress-card">

          <div className="learn-progress-circle">

            <strong>
              {overallProgress}%
            </strong>

            <span>
              Progress
            </span>

          </div>

          <div className="learn-progress-info">

            <span>
              YOUR PROGRESS
            </span>

            <h2>
              Keep going.
            </h2>

            <p>
              {completedTopics} of{" "}
              {topics.length} topics completed
            </p>

            <div className="learn-progress-bar">

              <div
                style={{
                  width: `${overallProgress}%`,
                }}
              ></div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================
          COURSE CONTENT
      ========================= */}

      <section className="learn-content">

        <div className="learn-section-heading">

          <div>

            <span>
              COURSE CONTENT
            </span>

            <h2>
              Topics
            </h2>

          </div>

          <p>
            {syllabus
              ? `${syllabus.syllabus_year} syllabus`
              : "Choose a topic to start learning."}
          </p>

        </div>


        {/* LOADING */}

        {loading && (

          <div className="learn-loading">

            <div>
              Loading syllabus...
            </div>

            <p>
              EduDrill is retrieving your
              syllabus from the database.
            </p>

          </div>

        )}


        {/* ERROR */}

        {error && (

          <div className="learn-error">

            <strong>
              Unable to load syllabus
            </strong>

            <p>
              {error}
            </p>

          </div>

        )}


        {/* TOPICS */}

        {!loading &&
          !error &&
          topics.length > 0 && (

            <div className="learn-topic-grid">

              {topics.map(
                (topic, index) => (

                  <Link
                    key={topic.id}
                    to={`/dashboard/${exam}/subjects/${subject}/learn/${topic.id}`}
                    className="learn-topic-card"
                  >

                    <div className="learn-topic-top">

                      <div className="learn-topic-icon">
                        {topic.icon}
                      </div>

                      <span className="learn-topic-number">
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>

                    </div>


                    <div className="learn-topic-body">

                      <h3>
                        {topic.title}
                      </h3>

                      <p>
                        {topic.description ||
                          `Study ${topic.title} and build the knowledge you need for ${subjectName}.`}
                      </p>

                    </div>


                    <div className="learn-topic-meta">

                      <span>
                        {topic.subtopics?.length ||
                          0}{" "}
                        subtopics
                      </span>

                      <span>
                        {topic.lessons?.length ||
                          0}{" "}
                        lessons
                      </span>

                    </div>


                    <div className="learn-topic-progress">

                      <div
                        style={{
                          width: `${topic.progress}%`,
                        }}
                      ></div>

                    </div>


                    <div className="learn-topic-action">

                      <span>
                        {topic.progress > 0
                          ? "Continue learning"
                          : "Explore topic"}
                      </span>

                      <strong>
                        →
                      </strong>

                    </div>

                  </Link>

                ),
              )}

            </div>

          )}


        {/* NO TOPICS */}

        {!loading &&
          !error &&
          topics.length === 0 && (

            <div className="learn-error">

              <strong>
                No topics found
              </strong>

              <p>
                There are currently no topics
                available for this syllabus.
              </p>

            </div>

          )}


        {/* =========================
            LEARNING TIP
        ========================= */}

        <div className="learn-bottom-card">

          <div className="learn-bottom-icon">
            💡
          </div>

          <div>

            <span>
              LEARNING TIP
            </span>

            <h2>
              Don't just read. Practice what
              you learn.
            </h2>

            <p>
              After studying a topic, use
              Practice to test your understanding
              and identify areas that need more
              attention.
            </p>

          </div>

          <Link
            to={`/dashboard/${exam}/practice?subject=${subject}`}
          >
            Practice →
          </Link>

        </div>

      </section>


      {/* =========================
          FOOTER
      ========================= */}

      <footer className="learn-footer">

        <div>

          <strong>
            EduDrill
          </strong>

          <span>
            Smart Exam Preparation
          </span>

        </div>

        <p>
          Prepare smarter. Practice better.
          Perform with confidence.
        </p>

        <Link
          to={`/dashboard/${exam}/subjects/${subject}`}
        >
          Back to subject →
        </Link>

      </footer>

      </ActivationLock>

    </main>
  )
}

export default Learn