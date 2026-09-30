import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Topic() {
  const { exam, subject, topicId } = useParams()

  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchTopic() {
      try {
        setLoading(true)
        setError("")

        const response = await fetch(
          `http://localhost:5000/api/topics/${topicId}`,
        )

        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load topic",
          )
        }

        setTopic(data.topic)
      } catch (error) {
        console.error("Topic loading error:", error)

        setError(
          "Unable to load this topic. Please make sure the EduDrill server is running.",
        )
      } finally {
        setLoading(false)
      }
    }

    fetchTopic()
  }, [topicId])

  if (loading) {
    return (
      <main className="topic-page">
        <div className="topic-loading">
          <div className="topic-loading-icon">📚</div>
          <h2>Loading topic...</h2>
          <p>EduDrill is preparing your study materials.</p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="topic-page">
        <div className="topic-error">
          <div className="topic-error-icon">!</div>
          <h2>Unable to load topic</h2>
          <p>{error}</p>

          <Link
            to={`/dashboard/${exam}/subjects/${subject}/learn`}
            className="topic-back-button"
          >
            ← Back to syllabus
          </Link>
        </div>
      </main>
    )
  }

  if (!topic) {
    return null
  }

  const totalLessons = topic.lessons?.length || 0
  const totalSubtopics = topic.subtopics?.length || 0

  return (
    <main className="topic-page">

      {/* Header */}
      <header className="topic-header">
        <Link
          to={`/dashboard/${exam}/subjects/${subject}/learn`}
          className="topic-back-link"
        >
          ← Back to syllabus
        </Link>

        <Link to="/" className="topic-brand">
          <div className="topic-brand-icon">E</div>

          <div>
            <strong>EduDrill</strong>
            <span>Smart Exam Preparation</span>
          </div>
        </Link>
      </header>

      {/* Main */}
      <section className="topic-container">

        {/* Breadcrumb */}
        <div className="topic-breadcrumbs">
          <Link to="/exams">Examinations</Link>
          <span>›</span>

          <Link to={`/dashboard/${exam}`}>
            {exam.toUpperCase()}
          </Link>

          <span>›</span>

          <Link
            to={`/dashboard/${exam}/subjects/${subject}/learn`}
          >
            {topic.subject_name}
          </Link>

          <span>›</span>

          <strong>{topic.title}</strong>
        </div>

        {/* Hero */}
        <section className="topic-hero">

          <div className="topic-hero-content">
            <div className="topic-label">
              <span>📚</span>
              STUDY TOPIC
            </div>

            <h1>{topic.title}</h1>

            <p>
              {topic.description ||
                "Study this topic carefully, work through the lessons, and test your understanding with practice questions."}
            </p>

            <div className="topic-stats">

              <div className="topic-stat">
                <strong>{totalSubtopics}</strong>
                <span>Subtopics</span>
              </div>

              <div className="topic-stat">
                <strong>{totalLessons}</strong>
                <span>Lessons</span>
              </div>

              <div className="topic-stat">
                <strong>0%</strong>
                <span>Progress</span>
              </div>

            </div>
          </div>

          <div className="topic-hero-visual">
            <div className="topic-book">
              📖
            </div>

            <span>Keep learning</span>
          </div>

        </section>

        {/* Subtopics */}
        <section className="topic-section">

          <div className="topic-section-heading">
            <div>
              <span className="topic-section-label">
                COURSE CONTENT
              </span>

              <h2>What you'll learn</h2>
            </div>

            <span className="topic-count">
              {totalSubtopics} subtopics
            </span>
          </div>

          <div className="subtopic-list">

            {topic.subtopics?.map((subtopic, index) => {

              const lessons =
                topic.lessons?.filter(
                  (lesson) =>
                    lesson.subtopic_id === subtopic.id,
                ) || []

              return (
                <article
                  key={subtopic.id}
                  className="subtopic-card"
                >

                  <div className="subtopic-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="subtopic-main">

                    <div className="subtopic-title-row">
                      <div>
                        <h3>{subtopic.title}</h3>

                        {subtopic.description && (
                          <p>
                            {subtopic.description}
                          </p>
                        )}
                      </div>

                      <span className="subtopic-lesson-count">
                        {lessons.length}{" "}
                        {lessons.length === 1
                          ? "lesson"
                          : "lessons"}
                      </span>
                    </div>

                    {lessons.length > 0 ? (
                      <div className="lesson-list">

                        {lessons.map((lesson) => (
                          <Link
                            key={lesson.id}
                            to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}/lesson/${lesson.id}`}
                            className="lesson-item"
                          >
                            <div className="lesson-item-icon">
                              ▶
                            </div>

                            <div className="lesson-item-content">
                              <strong>
                                {lesson.title}
                              </strong>

                              <span>
                                Lesson{" "}
                                {lesson.lesson_order}
                              </span>
                            </div>

                            <div className="lesson-item-arrow">
                              →
                            </div>
                          </Link>
                        ))}

                      </div>
                    ) : (
                      <div className="empty-lessons">
                        <span>📖</span>

                        <div>
                          <strong>
                            Lessons coming soon
                          </strong>

                          <p>
                            Lessons for this subtopic
                            will be added soon.
                          </p>
                        </div>
                      </div>
                    )}

                  </div>

                </article>
              )
            })}

          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="topic-footer">
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

export default Topic