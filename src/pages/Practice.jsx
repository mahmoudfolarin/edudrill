import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function Practice() {
  const { exam, subject, topicId } = useParams()
  
  // Extract lessonId from query params
  const searchParams = new URLSearchParams(window.location.search);
  const lessonId = searchParams.get('lessonId');

  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true)
        setError("")

        let url = `http://localhost:5000/api/questions?exam=${exam.toUpperCase()}&topicId=${topicId}`
        
        if (lessonId) {
          url = `http://localhost:5000/api/questions/lesson-practice?lessonId=${lessonId}&exam=${exam.toUpperCase()}`
        }

        const response = await fetch(url)
        const data = await response.json()

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Failed to load questions",
          )
        }

        setQuestions(data.questions)
      } catch (error) {
        console.error("Question loading error:", error)
        setError(
          "Unable to load practice questions. Please make sure the EduDrill server is running.",
        )
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [exam, topicId, lessonId])

  function selectAnswer(answer) {
    if (submitted) return

    setAnswers((previous) => ({
      ...previous,
      [questions[currentIndex].id]: answer,
    }))
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((previous) => previous + 1)
    }
  }

  function previousQuestion() {
    if (currentIndex > 0) {
      setCurrentIndex((previous) => previous - 1)
    }
  }

  async function submitPractice() {
    setSubmitted(true)
    
    // Save performance
    const score = calculateScore()
    const percentage = Math.round((score / questions.length) * 100)
    
    try {
      await fetch('http://localhost:5000/api/user/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam,
          subject,
          type: 'Topic Practice',
          topic_id: topicId,
          score,
          total: questions.length,
          percentage
        })
      });
    } catch (err) {
      console.error("Error saving performance:", err);
    }
  }

  function restartPractice() {
    setAnswers({})
    setCurrentIndex(0)
    setSubmitted(false)
  }

  function calculateScore() {
    return questions.reduce((score, question) => {
      if (answers[question.id] === question.correct_answer) {
        return score + 1
      }

      return score
    }, 0)
  }

  if (loading) {
    return (
      <main className="practice-page">
        <div className="practice-loading">
          <div className="practice-loading-icon">
            📝
          </div>

          <h2>Loading practice...</h2>

          <p>
            EduDrill is preparing your questions.
          </p>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="practice-page">
        <div className="practice-error">
          <div className="practice-error-icon">
            !
          </div>

          <h2>Unable to load practice</h2>

          <p>{error}</p>

          <Link
            to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`}
            className="practice-back-button"
          >
            ← Back to topic
          </Link>
        </div>
      </main>
    )
  }

  if (questions.length === 0) {
    return (
      <main className="practice-page">
        <div className="practice-error">
          <div className="practice-error-icon">
            📚
          </div>

          <h2>No questions available</h2>

          <p>
            There are currently no practice questions
            available for this topic.
          </p>

          <Link
            to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`}
            className="practice-back-button"
          >
            ← Back to topic
          </Link>
        </div>
      </main>
    )
  }

  if (submitted) {
    const score = calculateScore()
    const percentage = Math.round(
      (score / questions.length) * 100,
    )

    return (
      <main className="practice-page">
        <header className="practice-header">
          <Link
            to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`}
            className="practice-back"
          >
            ← Back to topic
          </Link>

          <div className="practice-brand">
            <div className="practice-brand-icon">
              E
            </div>

            <div>
              <strong>EduDrill</strong>
              <span>Practice Engine</span>
            </div>
          </div>
        </header>

        <section className="practice-result">
          <div className="result-badge">
            🎯
          </div>

          <span className="result-label">
            PRACTICE COMPLETE
          </span>

          <h1>
            {percentage >= 70
              ? "Great work!"
              : percentage >= 50
                ? "Good effort!"
                : "Keep practising!"}
          </h1>

          <p className="result-summary">
            You scored
          </p>

          <div className="result-score">
            <strong>{score}</strong>
            <span>/ {questions.length}</span>
          </div>

          <div className="result-percentage">
            {percentage}%
          </div>

          <div className="result-actions">
            <button
              onClick={restartPractice}
              className="result-retry"
            >
              Try Again
            </button>

            <Link
              to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`}
              className="result-back"
            >
              Back to Topic
            </Link>
          </div>
        </section>

        <section className="answer-review">
          <div className="answer-review-heading">
            <span>ANSWER REVIEW</span>
            <h2>Review your answers</h2>
          </div>

          {questions.map((question, index) => {
            const userAnswer =
              answers[question.id]

            const isCorrect =
              userAnswer === question.correct_answer

            return (
              <article
                key={question.id}
                className={`review-card ${
                  isCorrect
                    ? "review-correct"
                    : "review-wrong"
                }`}
              >
                <div className="review-number">
                  {index + 1}
                </div>

                <div className="review-content">
                  <h3>{question.question_text}</h3>

                  <p>
                    <strong>Your answer:</strong>{" "}
                    {userAnswer || "Not answered"}
                  </p>

                  <p>
                    <strong>Correct answer:</strong>{" "}
                    {question.correct_answer}
                  </p>

                  {question.explanation && (
                    <div className="review-explanation">
                      <strong>Explanation</strong>
                      <p>
                        {question.explanation}
                      </p>
                    </div>
                  )}
                </div>

                <div className="review-status">
                  {isCorrect ? "✓" : "✕"}
                </div>
              </article>
            )
          })}
        </section>
      </main>
    )
  }

  const question = questions[currentIndex]

  if (!question) {
    return (
      <main className="practice-page">
        <div className="practice-error">
          <div className="practice-error-icon">!</div>
          <h2>Error Loading Question</h2>
          <p>The question data could not be found.</p>
          <Link to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`} className="practice-back-button">
            ← Back to topic
          </Link>
        </div>
      </main>
    )
  }

  const options = [
    {
      letter: "A",
      text: question.option_a,
    },
    {
      letter: "B",
      text: question.option_b,
    },
    {
      letter: "C",
      text: question.option_c,
    },
    {
      letter: "D",
      text: question.option_d,
    },
  ]

  const answeredCount = Object.keys(answers).length

  return (
    <main className="practice-page">
      <header className="practice-header">
        <Link
          to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`}
          className="practice-back"
        >
          ← Back to topic
        </Link>

        <div className="practice-brand">
          <div className="practice-brand-icon">
            E
          </div>

          <div>
            <strong>EduDrill</strong>
            <span>Practice Engine</span>
          </div>
        </div>

        <div className="practice-progress-text">
          {answeredCount}/{questions.length} answered
        </div>
      </header>

      <section className="practice-container">
        <div className="practice-top">
          <div>
            <span className="practice-label">
              TOPIC PRACTICE
            </span>

            <h1>Practice Questions</h1>

            <p>
              {question.topic_title ||
                "Test your understanding"}
            </p>
          </div>

          <div className="practice-question-count">
            <strong>
              {currentIndex + 1}
            </strong>

            <span>
              / {questions.length}
            </span>
          </div>
        </div>

        <div className="practice-progress">
          <div
            className="practice-progress-bar"
            style={{
              width: `${
                ((currentIndex + 1) /
                  questions.length) *
                100
              }%`,
            }}
          />
        </div>

        <article className="question-card">
          <div className="question-meta">
            <span>
              Question {currentIndex + 1}
            </span>

            <span>
              {question.difficulty}
            </span>
          </div>

          <h2>{question.question_text}</h2>

          <div className="options-list">
            {options.map((option) => {
              const selected =
                answers[question.id] ===
                option.letter

              return (
                <button
                  key={option.letter}
                  onClick={() =>
                    selectAnswer(option.letter)
                  }
                  className={`option-button ${
                    selected
                      ? "option-selected"
                      : ""
                  }`}
                >
                  <span className="option-letter">
                    {option.letter}
                  </span>

                  <span className="option-text">
                    {option.text}
                  </span>

                  {selected && (
                    <span className="option-check">
                      ✓
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </article>

        <div className="practice-navigation">
          <button
            onClick={previousQuestion}
            disabled={currentIndex === 0}
            className="practice-nav-button"
          >
            ← Previous
          </button>

          {currentIndex ===
          questions.length - 1 ? (
            <button
              onClick={submitPractice}
              className="practice-submit-button"
            >
              Submit Practice
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="practice-next-button"
            >
              Next Question →
            </button>
          )}
        </div>
      </section>
    </main>
  )
}

export default Practice