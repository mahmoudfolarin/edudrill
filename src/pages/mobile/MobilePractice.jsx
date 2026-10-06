import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function MobilePractice() {
  const { exam, subject, topicId } = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  const lessonId = searchParams.get('lessonId');

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        setError("");
        let url = `/api/questions?exam=${exam.toUpperCase()}&topicId=${topicId}`;
        if (lessonId) {
          url = `/api/questions/lesson-practice?lessonId=${lessonId}&exam=${exam.toUpperCase()}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || "Failed to load questions");
        setQuestions(data.questions);
      } catch (err) {
        console.error(err);
        setError("Unable to load practice questions.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuestions();
  }, [exam, topicId, lessonId]);

  const selectAnswer = (answer) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questions[currentIndex].id]: answer }));
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const previousQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const calculateScore = () => {
    return questions.reduce((score, q) => {
      if (answers[q.id] === q.correct_answer) return score + 1;
      return score;
    }, 0);
  };

  const submitPractice = async () => {
    setSubmitted(true);
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);
    try {
      await fetch('/api/user/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam, subject, type: 'Topic Practice', topic_id: topicId, score, total: questions.length, percentage
        })
      });
    } catch (err) { console.error("Error saving performance", err); }
  };

  const restartPractice = () => {
    setAnswers({});
    setCurrentIndex(0);
    setSubmitted(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc' }}>
        <div style={{ fontSize: '48px', animation: 'bounce 1s infinite' }}>📝</div>
        <h2 style={{ marginTop: '16px', color: '#1e293b' }}>Loading practice...</h2>
        <style>{`@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }`}</style>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{error ? "⚠️" : "📚"}</div>
        <h2 style={{ color: error ? '#991b1b' : '#1e293b', margin: '0 0 8px 0' }}>
          {error ? "Unable to load practice" : "No questions available"}
        </h2>
        <p style={{ color: '#64748b' }}>{error || "There are currently no practice questions available for this topic."}</p>
        <Link to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`} style={{ marginTop: '16px', background: '#123b72', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Back to Topic</Link>
      </div>
    );
  }

  if (submitted) {
    const score = calculateScore();
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
        {/* Header */}
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
            ←
          </Link>
          <strong style={{ color: '#1e293b', fontSize: '16px' }}>Practice Result</strong>
          <div style={{ width: '24px' }} />
        </header>

        <div style={{ padding: '24px 16px' }}>
          {/* Score Card */}
          <div style={{ background: percentage >= 70 ? 'linear-gradient(135deg, #10b981 0%, #047857 100%)' : percentage >= 50 ? 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' : 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', borderRadius: '24px', padding: '32px', color: 'white', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', marginBottom: '32px' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎯</div>
            <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px', opacity: 0.9 }}>PRACTICE COMPLETE</div>
            <h1 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: '900' }}>
              {percentage >= 70 ? "Great work!" : percentage >= 50 ? "Good effort!" : "Keep practising!"}
            </h1>
            <div style={{ fontSize: '64px', fontWeight: '900', lineHeight: 1 }}>{percentage}%</div>
            <div style={{ marginTop: '12px', fontSize: '16px', fontWeight: '600' }}>{score} / {questions.length} Correct</div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            <button onClick={restartPractice} style={{ flex: 1, background: '#123b72', color: 'white', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '800', fontSize: '15px' }}>Try Again</button>
            <Link to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`} style={{ flex: 1, background: '#e2e8f0', color: '#1e293b', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '800', fontSize: '15px', textDecoration: 'none', textAlign: 'center' }}>Back to Topic</Link>
          </div>

          {/* Review */}
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', marginBottom: '16px' }}>Review your answers</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {questions.map((q, i) => {
              const uAns = answers[q.id];
              const isCorrect = uAns === q.correct_answer;
              return (
                <div key={q.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', border: `1px solid ${isCorrect ? '#a7f3d0' : '#fecaca'}`, boxShadow: '0 4px 6px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <span style={{ fontWeight: '800', color: '#64748b' }}>Q {i + 1}</span>
                    <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: isCorrect ? '#10b981' : '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
                      {isCorrect ? '✓' : '✕'}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '15px', color: '#1e293b', margin: '0 0 16px 0', lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: q.question_text }}></h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: isCorrect ? '#ecfdf5' : '#fef2f2', padding: '12px', borderRadius: '8px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: isCorrect ? '#059669' : '#dc2626', textTransform: 'uppercase' }}>Your Answer</span>
                      <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '600', marginTop: '4px' }} dangerouslySetInnerHTML={{ __html: uAns || 'Not answered' }}></div>
                    </div>
                    {!isCorrect && (
                      <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '8px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#0284c7', textTransform: 'uppercase' }}>Correct Answer</span>
                        <div style={{ fontSize: '14px', color: '#1e293b', fontWeight: '600', marginTop: '4px' }} dangerouslySetInnerHTML={{ __html: q.correct_answer }}></div>
                      </div>
                    )}
                  </div>
                  {q.explanation && (
                    <div style={{ marginTop: '16px', background: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '13px', color: '#475569', lineHeight: 1.5 }}>
                      <strong>Explanation:</strong> <span dangerouslySetInnerHTML={{ __html: q.explanation }}></span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
  }

  const question = questions[currentIndex];
  if (!question) return null;

  const options = [
    { letter: "A", text: question.option_a },
    { letter: "B", text: question.option_b },
    { letter: "C", text: question.option_c },
    { letter: "D", text: question.option_d },
  ];



  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ background: 'white', padding: '16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
        <Link to={`/dashboard/${exam}/subjects/${subject}/learn/${topicId}`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>✕</Link>
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>Practice</div>
        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>{currentIndex + 1} / {questions.length}</div>
      </header>

      {/* Progress Bar */}
      <div style={{ height: '4px', background: '#e2e8f0', width: '100%' }}>
        <div style={{ height: '100%', width: `${((currentIndex + 1) / questions.length) * 100}%`, background: '#123b72', transition: 'width 0.3s ease' }}></div>
      </div>

      {/* Question Area */}
      <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'inline-block', background: '#e0e7ff', color: '#3730a3', padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '800', marginBottom: '12px' }}>
            {question.difficulty || 'GENERAL'}
          </div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', lineHeight: 1.5, margin: 0 }} dangerouslySetInnerHTML={{ __html: question.question_text }}></h2>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          {options.map((opt) => {
            const selected = answers[question.id] === opt.letter;
            return (
              <button
                key={opt.letter}
                onClick={() => selectAnswer(opt.letter)}
                style={{
                  background: selected ? '#123b72' : 'white',
                  color: selected ? 'white' : '#1e293b',
                  border: `2px solid ${selected ? '#123b72' : '#e2e8f0'}`,
                  borderRadius: '16px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  boxShadow: selected ? '0 4px 10px rgba(18, 59, 114, 0.2)' : 'none'
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: selected ? 'white' : '#f1f5f9', color: selected ? '#123b72' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', flexShrink: 0 }}>
                  {opt.letter}
                </div>
                <div style={{ fontSize: '15px', fontWeight: selected ? '600' : '500', lineHeight: 1.4 }} dangerouslySetInnerHTML={{ __html: opt.text }}></div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Nav */}
      <div style={{ padding: '16px', background: 'white', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '12px' }}>
        <button
          onClick={previousQuestion}
          disabled={currentIndex === 0}
          style={{ flex: 1, padding: '16px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '15px', opacity: currentIndex === 0 ? 0.5 : 1 }}
        >
          Previous
        </button>
        {currentIndex === questions.length - 1 ? (
          <button
            onClick={submitPractice}
            style={{ flex: 1, padding: '16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '15px', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)' }}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            style={{ flex: 1, padding: '16px', background: '#123b72', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '15px', boxShadow: '0 4px 10px rgba(18, 59, 114, 0.2)' }}
          >
            Next
          </button>
        )}
      </div>
    </main>
  );
}
