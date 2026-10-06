import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function MobilePastPaper() {
  const { exam, subject, year, paperId } = useParams();
  const [paper, setPaper] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const backToPapers = `/dashboard/${exam}/past-questions/${subject}/${year}`;

  useEffect(() => {
    async function loadPaper() {
      try {
        const response = await fetch(`/api/past-papers/${paperId}`);
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error(data.message || "Failed to load paper");
        if (!["authorized", "licensed", "public_domain"].includes(data.paper.license_status)) {
          throw new Error("This paper is awaiting redistribution rights approval.");
        }
        setPaper(data.paper);
      } catch (requestError) {
        setError(requestError.message || "Unable to load this paper.");
      } finally {
        setLoading(false);
      }
    }
    loadPaper();
  }, [paperId]);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: '#123b72', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <h3 style={{ marginTop: '16px', color: '#1e293b' }}>Loading paper...</h3>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (error || !paper || paper.questions.length === 0) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc', padding: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
        <h2 style={{ color: '#991b1b', margin: '0 0 8px 0' }}>Paper unavailable</h2>
        <p style={{ color: '#64748b' }}>{error || "Questions for this paper are not available yet."}</p>
        <Link to={backToPapers} style={{ marginTop: '16px', background: '#123b72', color: 'white', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>Back to papers</Link>
      </div>
    );
  }

  const score = paper.questions.reduce((total, item) => total + (answers[item.id] === item.correct_answer ? 1 : 0), 0);

  const handleSubmit = async () => {
    try {
      const percentage = Math.round((score / paper.questions.length) * 100);
      await fetch('/api/user/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam,
          subject,
          type: 'Past Question Paper',
          topic_id: `${year} - ${paper.paper_title}`,
          score,
          total: paper.questions.length,
          percentage
        })
      });
    } catch (err) {
      console.error("Error saving performance:", err);
    }
    setSubmitted(true);
  };

  if (submitted) {
    const percentage = Math.round((score / paper.questions.length) * 100);

    return (
      <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to={backToPapers} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
            ←
          </Link>
          <strong style={{ color: '#1e293b', fontSize: '16px' }}>Paper Result</strong>
          <div style={{ width: '24px' }} />
        </header>

        <div style={{ padding: '24px 16px' }}>
          <div style={{ background: percentage >= 70 ? 'linear-gradient(135deg, #10b981 0%, #047857 100%)' : percentage >= 50 ? 'linear-gradient(135deg, #f59e0b 0%, #b45309 100%)' : 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', borderRadius: '24px', padding: '32px', color: 'white', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', marginBottom: '32px' }}>
            <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎯</div>
            <div style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px', opacity: 0.9 }}>PAPER COMPLETE</div>
            <h1 style={{ margin: '0 0 16px 0', fontSize: '24px', fontWeight: '900' }}>
              Paper submitted
            </h1>
            <div style={{ fontSize: '64px', fontWeight: '900', lineHeight: 1 }}>{percentage}%</div>
            <div style={{ marginTop: '12px', fontSize: '16px', fontWeight: '600' }}>{score} / {paper.questions.length} Correct</div>
          </div>

          <Link to={backToPapers} style={{ display: 'block', width: '100%', background: '#123b72', color: 'white', border: 'none', padding: '16px', borderRadius: '16px', fontWeight: '800', fontSize: '15px', textDecoration: 'none', textAlign: 'center' }}>Back to Papers</Link>
        </div>
      </main>
    );
  }

  const question = paper.questions[currentIndex];
  const options = ["a", "b", "c", "d"].map((letter) => ({ letter: letter.toUpperCase(), text: question[`option_${letter}`] })).filter((option) => option.text);

  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ background: 'white', padding: '16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', zIndex: 50 }}>
        <Link to={backToPapers} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>✕</Link>
        <div style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>{paper.paper_title}</div>
        <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>{currentIndex + 1} / {paper.questions.length}</div>
      </header>

      {/* Progress Bar */}
      <div style={{ height: '4px', background: '#e2e8f0', width: '100%' }}>
        <div style={{ height: '100%', width: `${((currentIndex + 1) / paper.questions.length) * 100}%`, background: '#123b72', transition: 'width 0.3s ease' }}></div>
      </div>

      {/* Question Area */}
      <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <div style={{ display: 'inline-block', background: paper.verification_status === "verified" ? '#dcfce7' : '#fef3c7', color: paper.verification_status === "verified" ? '#166534' : '#92400e', padding: '4px 12px', borderRadius: '12px', fontSize: '10px', fontWeight: '800', marginBottom: '12px' }}>
            {paper.exam} {paper.year} • {paper.verification_status === "verified" ? "VERIFIED" : "UNVERIFIED"}
          </div>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', fontWeight: '700' }}>Question {question.question_number} • {question.marks || 1} mark{question.marks === 1 ? "" : "s"}</div>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', lineHeight: 1.5, margin: 0 }} dangerouslySetInnerHTML={{ __html: question.question_text }}></h2>
        </div>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          {options.map((opt) => {
            const selected = answers[question.id] === opt.letter;
            return (
              <button
                key={opt.letter}
                onClick={() => setAnswers(prev => ({ ...prev, [question.id]: opt.letter }))}
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
          onClick={() => setCurrentIndex(idx => idx - 1)}
          disabled={currentIndex === 0}
          style={{ flex: 1, padding: '16px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '15px', opacity: currentIndex === 0 ? 0.5 : 1 }}
        >
          Previous
        </button>
        {currentIndex === paper.questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            style={{ flex: 1, padding: '16px', background: '#10b981', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '15px', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)' }}
          >
            Submit
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(idx => idx + 1)}
            style={{ flex: 1, padding: '16px', background: '#123b72', color: 'white', border: 'none', borderRadius: '16px', fontWeight: '800', fontSize: '15px', boxShadow: '0 4px 10px rgba(18, 59, 114, 0.2)' }}
          >
            Next
          </button>
        )}
      </div>
    </main>
  );
}
