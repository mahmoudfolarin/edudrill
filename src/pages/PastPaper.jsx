import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

function PastPaper() {
  const { exam, subject, year, paperId } = useParams()
  const [paper, setPaper] = useState(null)
  const [answers, setAnswers] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const backToPapers = `/dashboard/${exam}/past-questions/${subject}/${year}`

  useEffect(() => {
    async function loadPaper() {
      try {
        const response = await fetch(`http://localhost:5000/api/past-papers/${paperId}`)
        const data = await response.json()
        if (!response.ok || !data.success) throw new Error(data.message || "Failed to load paper")
        if (!["authorized", "licensed", "public_domain"].includes(data.paper.license_status)) {
          throw new Error("This paper is awaiting redistribution rights approval.")
        }
        setPaper(data.paper)
      } catch (requestError) {
        setError(requestError.message || "Unable to load this paper.")
      } finally {
        setLoading(false)
      }
    }
    loadPaper()
  }, [paperId])

  if (loading) return <main className="practice-page"><div className="practice-loading"><h2>Loading paper...</h2><p>EduDrill is preparing the verified paper.</p></div></main>
  if (error || !paper || paper.questions.length === 0) return <main className="practice-page"><div className="practice-error"><div className="practice-error-icon">!</div><h2>Paper unavailable</h2><p>{error || "Questions for this verified paper are not available yet."}</p><Link to={backToPapers} className="practice-back-button">Back to papers</Link></div></main>

  const question = paper.questions[currentIndex]
  const options = ["a", "b", "c", "d"].map((letter) => ({ letter: letter.toUpperCase(), text: question[`option_${letter}`] })).filter((option) => option.text)
  const score = paper.questions.reduce((total, item) => total + (answers[item.id] === item.correct_answer ? 1 : 0), 0)

  if (submitted) return <main className="practice-page"><header className="practice-header"><Link to={backToPapers} className="practice-back">Back to papers</Link><div className="practice-brand"><div className="practice-brand-icon">E</div><div><strong>EduDrill</strong><span>Past Paper Review</span></div></div></header><section className="practice-result"><span className="result-label">PAPER COMPLETE</span><h1>Paper submitted</h1><p className="result-summary">You scored</p><div className="result-score"><strong>{score}</strong><span>/ {paper.questions.length}</span></div><div className="result-percentage">{Math.round((score / paper.questions.length) * 100)}%</div><div className="result-actions"><Link to={backToPapers} className="result-back">Back to Papers</Link></div></section></main>

  return <main className="practice-page"><header className="practice-header"><Link to={backToPapers} className="practice-back">Back to papers</Link><div className="practice-brand"><div className="practice-brand-icon">E</div><div><strong>EduDrill</strong><span>Past Paper Practice</span></div></div><div className="practice-progress-text">{Object.keys(answers).length}/{paper.questions.length} answered</div></header><section className="practice-container"><div className="practice-top"><div><span className="practice-label">{paper.exam} {paper.year}{paper.verification_status === "verified" ? " · VERIFIED PAPER" : " · UNVERIFIED SOURCE"}</span><h1>{paper.paper_title}</h1><p>{paper.verification_status === "verified" ? paper.instructions || "Answer questions in their original examination order." : "Redistribution rights are approved, but the question content and answers have not been independently verified."}</p></div><div className="practice-question-count"><strong>{currentIndex + 1}</strong><span>/ {paper.questions.length}</span></div></div><div className="practice-progress"><div className="practice-progress-bar" style={{ width: `${((currentIndex + 1) / paper.questions.length) * 100}%` }} /></div><article className="question-card"><div className="question-meta"><span>Question {question.question_number}</span><span>{question.marks || 1} mark{question.marks === 1 ? "" : "s"}</span></div><h2>{question.question_text}</h2><div className="options-list">{options.map((option) => <button key={option.letter} type="button" onClick={() => setAnswers((previous) => ({ ...previous, [question.id]: option.letter }))} className={`option-button ${answers[question.id] === option.letter ? "option-selected" : ""}`}><span className="option-letter">{option.letter}</span><span className="option-text">{option.text}</span></button>)}</div></article><div className="practice-navigation"><button type="button" onClick={() => setCurrentIndex((index) => index - 1)} disabled={currentIndex === 0} className="practice-nav-button">Previous</button>{currentIndex === paper.questions.length - 1 ? <button type="button" onClick={() => setSubmitted(true)} className="practice-submit-button">Submit Paper</button> : <button type="button" onClick={() => setCurrentIndex((index) => index + 1)} className="practice-next-button">Next Question</button>}</div></section></main>
}

export default PastPaper
