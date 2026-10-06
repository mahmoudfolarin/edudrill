import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import useMobile from "../hooks/useMobile"
import MobileLesson from "./mobile/MobileLesson"

function Lesson() {
  const { isMobile } = useMobile()
  const { exam, subject, topicId, lessonId } = useParams()

  const [lesson, setLesson] = useState(null)
  const [topicLessons, setTopicLessons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [completed, setCompleted] = useState(false)
  const [checkingProgress, setCheckingProgress] = useState(true)
  const [completing, setCompleting] = useState(false)
  const [progressError, setProgressError] = useState("")
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Load bookmark state on mount
  useEffect(() => {
    if (lessonId) {
      fetch('/api/user/bookmarks')
        .then(res => res.json())
        .then(data => {
          setIsBookmarked(data.some(b => b.lesson_id === lessonId));
        })
        .catch(err => console.error("Error fetching bookmarks:", err));
    }
  }, [lessonId]);

  const toggleBookmark = async () => {
    try {
      if (isBookmarked) {
        await fetch(`/api/user/bookmarks/${lessonId}`, {
          method: 'DELETE'
        });
        setIsBookmarked(false);
      } else {
        await fetch('/api/user/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            lesson_id: lessonId,
            topic_id: topicId,
            subject,
            exam,
            title: lesson?.title,
            topic_title: lesson?.topic_title,
            subject_name: lesson?.subject_name
          })
        });
        setIsBookmarked(true);
      }
    } catch (err) {
      console.error("Error toggling bookmark:", err);
    }
  };

  useEffect(() => {
    async function fetchLesson() {
      try {
        setLoading(true)
        setError("")

        const lessonResponse = await fetch(
          `/api/topics/lessons/${lessonId}`,
        )

        const lessonData = await lessonResponse.json()

        if (!lessonResponse.ok || !lessonData.success) {
          throw new Error(
            lessonData.message || "Failed to load lesson",
          )
        }

        setLesson(lessonData.lesson)

        const topicResponse = await fetch(
          `/api/topics/${topicId}`,
        )

        const topicData = await topicResponse.json()

        if (topicResponse.ok && topicData.success) {
          setTopicLessons(topicData.topic.lessons || [])
        }

      } catch (error) {
        console.error("Lesson loading error:", error)

        setError(
          "Unable to load this lesson. Please make sure the EduDrill server is running.",
        )
      } finally {
        setLoading(false)
      }
    }

    fetchLesson()
  }, [lessonId, topicId])

  // =====================================================
  // CHECK SAVED LESSON PROGRESS
  // =====================================================

  useEffect(() => {
    async function fetchProgress() {
      try {
        setCheckingProgress(true)
        setProgressError("")

        const deviceIdentifier = localStorage.getItem(
          "edudrill_device_id",
        )

        if (!deviceIdentifier) {
          setCheckingProgress(false)
          return
        }

        const response = await fetch(
          `/api/progress/lesson?deviceIdentifier=${encodeURIComponent(
            deviceIdentifier,
          )}&lessonId=${lessonId}`,
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to retrieve lesson progress",
          )
        }

        setCompleted(data.completed === true)

      } catch (error) {
        console.error(
          "Lesson progress loading error:",
          error,
        )

        setProgressError(
          "Unable to retrieve saved progress.",
        )
      } finally {
        setCheckingProgress(false)
      }
    }

    fetchProgress()
  }, [lessonId])

  // =====================================================
  // MARK LESSON AS COMPLETE
  // =====================================================

  async function handleComplete() {
    try {
      setCompleting(true)
      setProgressError("")

      const deviceIdentifier = localStorage.getItem(
        "edudrill_device_id",
      )

      if (!deviceIdentifier) {
        setProgressError(
          "EduDrill could not identify this device. Please activate or restart the app.",
        )

        return
      }

      const response = await fetch(
        "/api/progress/lesson/complete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            deviceIdentifier,
            lessonId: Number(lessonId),
          }),
        },
      )

      const data = await response.json()

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to save lesson progress",
        )
      }

      // Only mark it complete after the database confirms it.
      setCompleted(true)

    } catch (error) {
      console.error(
        "Lesson completion error:",
        error,
      )

      setProgressError(
        error.message ||
          "Unable to save your lesson progress.",
      )
    } finally {
      setCompleting(false)
    }
  }

  if (loading) {
    return (
      <main className="study-lesson-page">
        <div className="study-lesson-loading">
          <div className="study-loading-book">📖</div>

          <h2>Preparing your lesson...</h2>

          <p>
            EduDrill is getting your study material ready.
          </p>
        </div>
      </main>
    )
  }

  if (error || !lesson) {
    return (
      <main className="study-lesson-page">
        <div className="study-lesson-error">
          <div>!</div>

          <h2>
            {error
              ? "Unable to load lesson"
              : "Lesson not found"}
          </h2>

          <p>
            {error ||
              "This lesson could not be found."}
          </p>

          <Link
            to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`}
            className="study-error-button"
          >
            ← Back to Topic
          </Link>
        </div>
      </main>
    )
  }

  const currentIndex = topicLessons.findIndex(
    (item) => item.id === lesson.id,
  )

  const previousLesson =
    currentIndex > 0
      ? topicLessons[currentIndex - 1]
      : null

  const nextLesson =
    currentIndex >= 0 &&
    currentIndex < topicLessons.length - 1
      ? topicLessons[currentIndex + 1]
      : null

  if (isMobile) {
    return <MobileLesson />
  }

  return (
    <main className="study-lesson-page">

      {/* =====================================================
          TOP NAVIGATION
      ===================================================== */}

      <header className="study-lesson-header">

        <Link
          to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`}
          className="study-back-link"
        >
          ← Back to Topic
        </Link>

        <Link to="/" className="study-brand">
          <div className="study-brand-icon">
            E
          </div>

          <div>
            <strong>EduDrill</strong>
            <span>Smart Exam Preparation</span>
          </div>
        </Link>

      </header>


      {/* =====================================================
          READING PROGRESS
      ===================================================== */}

      <div className="reading-progress">
        <div
          className="reading-progress-bar"
          style={{
            width: completed ? "100%" : "35%",
          }}
        />
      </div>


      <section className="study-lesson-container">

        {/* =====================================================
            BREADCRUMBS
        ===================================================== */}

        <div className="study-breadcrumbs">

          <Link to="/exams">
            Examinations
          </Link>

          <span>›</span>

          <Link to={`/dashboard/${exam}`}>
            {exam.toUpperCase()}
          </Link>

          <span>›</span>

          <Link
            to={`/dashboard/${exam}/subjects/${subject}/learn`}
          >
            {lesson.subject_name}
          </Link>

          <span>›</span>

          <Link
            to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`}
          >
            {lesson.topic_title}
          </Link>

          <span>›</span>

          <strong>{lesson.title}</strong>

        </div>


        <div className="study-lesson-layout">

          {/* =====================================================
              MAIN ARTICLE
          ===================================================== */}

          <article className="study-article">

            <div className="study-article-top">

              <div className="study-lesson-label">
                <span>📖</span>
                LESSON {lesson.lesson_order}
              </div>

              <div className="study-lesson-actions">

                <button 
                  title={isBookmarked ? "Remove Bookmark" : "Bookmark this lesson"}
                  onClick={toggleBookmark}
                  style={{ 
                    opacity: 1,
                    background: isBookmarked ? '#0B2447' : 'rgba(255,255,255,0.8)',
                    color: isBookmarked ? 'white' : '#0B2447',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: isBookmarked ? 'none' : '1px solid #ccc',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s ease',
                    width: 'auto',
                    height: 'auto',
                    minHeight: '40px'
                  }}
                >
                  <span style={{ fontSize: '16px' }}>🔖</span> 
                  <span style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>{isBookmarked ? 'Saved to Bookmarks' : 'Bookmark'}</span>
                </button>

                <button title="Take notes">
                  📝
                </button>

              </div>

            </div>


            <h1>{lesson.title}</h1>


            <div className="study-lesson-meta">

              <span>
                📚 {lesson.topic_title}
              </span>

              <span>
                •
              </span>

              <span>
                {lesson.subject_name}
              </span>

            </div>


            <div className="study-divider" />


            {/* =====================================================
                INTRODUCTION
            ===================================================== */}

            <div className="study-introduction">

              <div className="intro-icon">
                💡
              </div>

              <div>

                <strong>
                  What you'll learn
                </strong>

                <p>
                  Work through this lesson carefully.
                  Pay attention to the examples and
                  key ideas before moving on to practice.
                </p>

              </div>

            </div>


            {/* =====================================================
                LESSON CONTENT
            ===================================================== */}

            <div
              className="study-article-content"
              dangerouslySetInnerHTML={{
                __html:
                  lesson.content ||
                  "<p>Lesson content is not available yet.</p>",
              }}
            />


            {/* =====================================================
                KEY TAKEAWAY
            ===================================================== */}

            <div className="study-takeaway">

              <div className="takeaway-icon">
                ✓
              </div>

              <div>

                <span>KEY TAKEAWAY</span>

                <h3>
                  Understanding the method is more
                  important than memorising the answer.
                </h3>

                <p>
                  Make sure you can explain the steps
                  yourself before moving to practice.
                </p>

              </div>

            </div>


            {/* =====================================================
                COMPLETION
            ===================================================== */}

            <div
              className={`study-completion ${
                completed
                  ? "study-completed"
                  : ""
              }`}
            >

              <div className="completion-icon">
                {completed ? "✓" : "🎯"}
              </div>


              <div className="completion-text">

                <span>
                  {completed
                    ? "LESSON COMPLETED"
                    : "FINISHED READING?"}
                </span>

                <h3>
                  {completed
                    ? "Great work. Keep going!"
                    : "Mark this lesson as complete."}
                </h3>

                <p>
                  {completed
                    ? "You can now move on to the next lesson or test your knowledge."
                    : "Your progress will help you keep track of what you've studied."}
                </p>

              </div>


              {!completed && (
                <button
                  onClick={handleComplete}
                  className="complete-lesson-button"
                  disabled={
                    completing ||
                    checkingProgress
                  }
                >
                  {completing
                    ? "Saving..."
                    : checkingProgress
                      ? "Checking..."
                      : "Mark as Complete"}
                </button>
              )}

            </div>


            {/* =====================================================
                PROGRESS ERROR
            ===================================================== */}

            {progressError && (
              <p
                style={{
                  marginTop: "12px",
                  color: "#93c5fd",
                }}
              >
                {progressError}
              </p>
            )}


            {/* =====================================================
                LESSON NAVIGATION
            ===================================================== */}

            <div className="lesson-navigation">

              {previousLesson ? (
                <Link
                  to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}/lesson/${previousLesson.id}`}
                  className="lesson-nav-card"
                >
                  <span>← Previous</span>

                  <strong>
                    {previousLesson.title}
                  </strong>
                </Link>
              ) : (
                <div />
              )}


              {nextLesson ? (
                <Link
                  to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}/lesson/${nextLesson.id}`}
                  className="lesson-nav-card lesson-next"
                >
                  <span>Next Lesson →</span>

                  <strong>
                    {nextLesson.title}
                  </strong>
                </Link>
              ) : (
                <Link
                  to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`}
                  className="lesson-nav-card lesson-next"
                >
                  <span>Topic Complete →</span>

                  <strong>
                    Back to Topic
                  </strong>
                </Link>
              )}

            </div>

          </article>


          {/* =====================================================
              SIDEBAR
          ===================================================== */}

          <aside className="study-sidebar">

            <div className="study-sidebar-card">

              <div className="sidebar-card-heading">
                <span>🎯</span>
                <h3>Study Tools</h3>
              </div>

              <button className="study-tool-button">
                📝 <span>Take Notes</span>
              </button>

              <button className="study-tool-button">
                🔖 <span>Bookmark Lesson</span>
              </button>

              <button className="study-tool-button">
                🤖 <span>Ask AI Tutor</span>
              </button>

            </div>


            {/* =====================================================
                YOUR PROGRESS
            ===================================================== */}

            <div className="study-sidebar-card">

              <div className="sidebar-card-heading">
                <span>📊</span>
                <h3>Your Progress</h3>
              </div>

              <div className="study-progress-ring">

                <strong>
                  {completed ? "100%" : "35%"}
                </strong>

              </div>

              <p className="sidebar-progress-text">
                {completed
                  ? "Lesson completed"
                  : "Lesson progress"}
              </p>

            </div>


          </aside>

        </div>

      </section>


      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="study-lesson-footer">

        <div>
          <strong>EduDrill</strong>
          <span>Smart Exam Preparation</span>
        </div>

        <p>
          Prepare smarter. Practice better. Perform with confidence.
        </p>

      </footer>

    </main>
  )
}

export default Lesson