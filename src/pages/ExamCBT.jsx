import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOfflineQuestions, subjectsList } from "../data/offlineQuestionBank";
import Ad1 from "../assets/edudrill_ad_1.jpg";
import Ad2 from "../assets/edudrill_ad_2.jpg";
import Ad3 from "../assets/edudrill_ad_3.jpg";
import Ad4 from "../assets/edudrill_ad_4.jpg";
import Ad5 from "../assets/edudrill_ad_5.jpg";
import StudentsBg from "../assets/students_bg.jpg";

import Calculator from "../components/Calculator";
import Dictionary from "../components/Dictionary";

function ExamCBT() {
  const { exam } = useParams();
  const isJamb = exam?.toLowerCase() === "jamb";
  const compulsorySubject = isJamb ? "use-of-english" : null;
  
  const [selectedSubjects, setSelectedSubjects] = useState(isJamb ? [compulsorySubject] : []);
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [showCalculator, setShowCalculator] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);

  const adImages = [Ad1, Ad2, Ad3, Ad4, Ad5];
  const [currentAd, setCurrentAd] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isStarted) return;
    const timer = setInterval(() => {
      setCurrentAd(prev => (prev + 1) % adImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isStarted]);

  // Premium UI Theme - Strictly Blues
  const theme = {
    primary: "#0B2447",
    secondary: "#19376D",
    accent: "#576CBC",
    light: "#E0F2FE", // Soft blue background for active states
    lighter: "#F0F9FF",
    background: "#F4F7FB", // Matches overall app background
    surface: "#FFFFFF",
    textMain: "#1E293B",
    textMuted: "#64748B",
    border: "#E2E8F0"
  };

  const customStyles = `
    .premium-card {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .premium-btn {
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .premium-btn:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 15px rgba(11, 36, 71, 0.15);
    }
    .premium-btn:active:not(:disabled) {
      transform: translateY(0);
    }
    .option-label {
      transition: all 0.2s ease;
    }
    .option-label:hover {
      background: ${theme.lighter};
      border-color: ${theme.accent} !important;
    }
    .grid-btn {
      transition: all 0.15s ease;
    }
    .grid-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 10px rgba(11, 36, 71, 0.15);
      z-index: 10;
    }
    .fade-in {
      animation: fadeIn 0.4s ease-out;
    }
    .slide-up {
      animation: slideUp 0.3s ease-out forwards;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(15px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: ${theme.background}; 
    }
    ::-webkit-scrollbar-thumb {
      background: ${theme.accent}80; 
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: ${theme.accent}; 
    }
  `;
  
  const handleSubjectToggle = (subjectId) => {
    if (isJamb) {
      if (subjectId === compulsorySubject) return; // Compulsory
      if (selectedSubjects.includes(subjectId)) {
        setSelectedSubjects(selectedSubjects.filter(id => id !== subjectId));
      } else {
        if (selectedSubjects.length < 4) {
          setSelectedSubjects([...selectedSubjects, subjectId]);
        }
      }
    } else {
      setSelectedSubjects([subjectId]);
    }
  };

  const fetchQuestionsForSubject = async (sub, count) => {
    let dbSub = sub;
    if (sub === 'use-of-english') dbSub = 'english-language';
    if (sub === 'physical-and-health-education') dbSub = 'physical-education';
    
    try {
      const res = await fetch(`http://localhost:5000/api/questions?exam=${exam.toUpperCase()}&subject=${dbSub}&limit=${count}`);
      const data = await res.json();
      if (data.success && data.questions && data.questions.length > 0) {
        return data.questions.map(q => ({
          ...q,
          subjectName: q.subject_name || sub,
          options: [q.option_a, q.option_b, q.option_c, q.option_d],
          answer: q.correct_answer,
          question: q.question_text
        }));
      }
    } catch (err) {
      console.error("Error fetching from DB, falling back to offline:", err);
    }
    
    // Fallback to offline questions
    const subName = subjectsList.find(s => s.id === sub)?.name || sub;
    return getOfflineQuestions(sub, count).map(q => ({...q, subjectName: subName}));
  };

  const startCBT = async () => {
    if (isJamb && selectedSubjects.length !== 4) {
      alert("Please select exactly 4 subjects (including Use of English) for JAMB CBT.");
      return;
    }
    if (!isJamb && selectedSubjects.length === 0) {
      alert("Please select a subject.");
      return;
    }
    
    setIsLoading(true);
    let generated = [];
    if (isJamb) {
      const subjectsSorted = [compulsorySubject, ...selectedSubjects.filter(s => s !== compulsorySubject)];
      for (const sub of subjectsSorted) {
        const count = sub === compulsorySubject ? 60 : 40;
        const subQuestions = await fetchQuestionsForSubject(sub, count);
        generated = [...generated, ...subQuestions];
      }
    } else {
      const subQuestions = await fetchQuestionsForSubject(selectedSubjects[0], 50);
      generated = subQuestions;
    }
    
    if (generated.length === 0) {
      alert("No questions found for the selected subject(s).");
      setIsLoading(false);
      return;
    }

    setQuestions(generated);
    setIsStarted(true);
    setIsSubmitted(false);
    setUserAnswers({});
    setVisited({});
    setCurrentIndex(0);
    setShowConfirm(false);
    setIsLoading(false);
  };

  const handleAnswerSelect = (qIndex, answer) => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qIndex]: answer }));
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleConfirmSubmit = async () => {
    setIsSubmitted(true);
    setShowConfirm(false);
    setCurrentIndex(0); // Reset to first question for review
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const score = calculateScore();
      const percentage = Math.round((score / questions.length) * 100);
      const subjectName = isJamb ? 'Multiple Subjects' : (questions[0]?.subjectName || 'Mock Exam');
      
      await fetch('http://localhost:5000/api/user/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam,
          subject: subjectName,
          type: 'Mock Exam CBT',
          topic_id: null,
          score,
          total: questions.length,
          percentage
        })
      });
    } catch (err) {
      console.error("Error saving performance:", err);
    }
  };

  useEffect(() => {
    if (isStarted && !isSubmitted && !showConfirm) {
      setVisited(prev => ({ ...prev, [currentIndex]: true }));
    }
  }, [currentIndex, isStarted, isSubmitted, showConfirm]);

  useEffect(() => {
    if (!isStarted || isSubmitted) return;

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const key = e.key.toUpperCase();
      
      if (showConfirm) {
        if (key === 'Y') handleConfirmSubmit();
        if (key === 'R') setShowConfirm(false);
        return;
      }

      if (key === 'N' || key === 'ARROWRIGHT') goNext();
      if (key === 'P' || key === 'ARROWLEFT') goPrev();
      if (key === 'S') setShowConfirm(true);
      
      const optionIndex = key.charCodeAt(0) - 65; // A=0, B=1, C=2, D=3
      if (optionIndex >= 0 && optionIndex <= 3) {
        const currentQ = questions[currentIndex];
        if (currentQ && currentQ.options[optionIndex]) {
          handleAnswerSelect(currentIndex, currentQ.options[optionIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isStarted, showConfirm, currentIndex, questions, isSubmitted]);

  // SETUP VIEW
  if (!isStarted) {
    return (
      <main style={{ minHeight: '100vh', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85)), url(${StudentsBg}) no-repeat center center fixed`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif" }}>
        <style>{customStyles}</style>
        
        {/* Top Navbar */}
        <header style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '20px 6%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid rgba(255,255,255,0.2)` }}>
          <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}>E</div>
            <div>
              <strong style={{ display: 'block', color: theme.primary, fontSize: '18px' }}>EduDrill</strong>
              <span style={{ fontSize: '12px', color: theme.accent, fontWeight: 'bold', letterSpacing: '1px' }}>{exam?.toUpperCase()} CBT MODE</span>
            </div>
          </Link>
          <Link to={`/dashboard/${exam}`} style={{ color: theme.primary, textDecoration: 'none', fontWeight: '600', padding: '10px 20px', borderRadius: '8px', border: `1px solid ${theme.border}`, transition: '0.2s', fontSize: '14px' }}>
            ← Back to Dashboard
          </Link>
        </header>

        {/* Content Box */}
        <div className="fade-in" style={{ maxWidth: 1000, margin: '60px auto', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', padding: '40px 50px', borderRadius: 24, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)', border: `1px solid rgba(255,255,255,0.4)` }}>
          
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
            <div className="past-papers-intro" style={{ flex: '1 1 400px', margin: 0 }}>
              <div className="past-papers-label">
                <span style={{ background: theme.accent }}></span>
                EXAMINATION SETUP
              </div>
              
              <h1>
                Configure
                <br />
                <span>CBT Test</span>
              </h1>
              
              <p style={{ fontSize: '16px' }}>
                {isJamb 
                  ? "Select 3 subjects to complete your JAMB combination. Use of English is already pre-selected. You will be timed and tested on exactly 180 questions." 
                  : "Select a subject to generate a 50-question mock examination. Your answers won't be revealed until you submit."}
              </p>
            </div>

            <div style={{ flex: '1 1 300px', display: 'flex', justifyContent: 'flex-end' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '380px', aspectRatio: '16/9' }}>
                {adImages.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img} 
                    alt={`EduDrill Ad ${idx + 1}`} 
                    style={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%', 
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '20px', 
                      boxShadow: '0 16px 32px rgba(11, 36, 71, 0.1)', 
                      border: `4px solid #ffffff`,
                      opacity: currentAd === idx ? 1 : 0,
                      transition: 'opacity 1s ease-in-out'
                    }} 
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {subjectsList.filter(sub => isJamb ? sub.id !== 'english-language' : sub.id !== 'use-of-english').map(sub => {
              const isSelected = selectedSubjects.includes(sub.id);
              const isCompulsory = isJamb && sub.id === compulsorySubject;
              return (
                <button 
                  key={sub.id}
                  onClick={() => handleSubjectToggle(sub.id)}
                  style={{ 
                    padding: '20px', 
                    border: `2px solid ${isSelected ? theme.primary : theme.border}`,
                    background: isSelected ? theme.primary : theme.surface,
                    color: isSelected ? theme.surface : theme.textMain,
                    borderRadius: 16,
                    cursor: isCompulsory ? 'default' : 'pointer',
                    fontWeight: isSelected ? '600' : '500',
                    textAlign: 'left',
                    transition: 'all 0.2s',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: '80px',
                    boxShadow: isSelected ? '0 10px 20px rgba(11,36,71,0.1)' : 'none'
                  }}
                  onMouseOver={(e) => { if(!isSelected && !isCompulsory) e.currentTarget.style.borderColor = theme.accent; }}
                  onMouseOut={(e) => { if(!isSelected && !isCompulsory) e.currentTarget.style.borderColor = theme.border; }}
                >
                  <span style={{ fontSize: '15px' }}>{sub.name}</span>
                  {isCompulsory && (
                    <span style={{ fontSize: '12px', marginTop: '4px', color: theme.light, fontWeight: 'bold' }}>COMPULSORY</span>
                  )}
                  {isSelected && !isCompulsory && (
                    <div style={{ position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: '50%', background: theme.surface }}></div>
                  )}
                </button>
              )
            })}
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <button 
              className="premium-btn"
              onClick={startCBT}
              style={{ padding: '16px 48px', background: theme.primary, color: theme.surface, border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
            >
              Start CBT Test
            </button>
          </div>

        </div>
      </main>
    )
  }

  function calculateScore() {
    let score = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) score++;
    });
    return score;
  }

  // Submit Confirmation Screen
  if (showConfirm) {
    return (
      <main className="fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85)), url(${StudentsBg}) no-repeat center center fixed`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif" }}>
        <style>{customStyles}</style>
        <div style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', padding: '48px', borderRadius: 24, boxShadow: '0 30px 60px rgba(0,0,0,0.2)', textAlign: 'center', maxWidth: 500, width: '90%', border: `1px solid rgba(255,255,255,0.4)` }}>
          <div style={{ width: 80, height: 80, background: theme.light, color: theme.primary, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', margin: '0 auto 24px' }}>
            ?
          </div>
          <h2 style={{ color: theme.primary, marginBottom: '16px', fontSize: '28px', fontWeight: '800' }}>Submit Exam?</h2>
          <p style={{ color: theme.textMuted, marginBottom: '40px', fontSize: '16px', lineHeight: 1.6 }}>
            You have answered <strong>{Object.keys(userAnswers).length}</strong> out of <strong>{questions.length}</strong> questions. Once submitted, you cannot change your answers.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button 
              className="premium-btn"
              onClick={() => setShowConfirm(false)}
              style={{ flex: 1, padding: '16px', background: theme.surface, color: theme.primary, border: `2px solid ${theme.border}`, borderRadius: 12, fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              No, Return (R)
            </button>
            <button 
              className="premium-btn"
              onClick={handleConfirmSubmit}
              style={{ flex: 1, padding: '16px', background: theme.primary, color: theme.surface, border: 'none', borderRadius: 12, fontSize: '16px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 8px 16px rgba(11,36,71,0.2)' }}
            >
              Yes, Submit (Y)
            </button>
          </div>
        </div>
      </main>
    );
  }

  const currentQ = questions[currentIndex];
  const optionLetters = ['A', 'B', 'C', 'D'];

  // Handle case where questions are not loaded yet or invalid index
  if (isStarted && !currentQ && !showConfirm && !isSubmitted) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85))`, fontFamily: "'Inter', sans-serif", color: 'white' }}>
        <h2>Loading Question Data...</h2>
        <button onClick={() => setIsStarted(false)} style={{marginLeft: 20, padding: 10, cursor: 'pointer'}}>Back to Setup</button>
      </main>
    )
  }

  // CBT Mode View
  return (
    <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85)), url(${StudentsBg}) no-repeat center center fixed`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif" }}>
       <style>{customStyles}</style>
       
       <header style={{ height: '70px', padding: '0 24px', background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`, color: theme.surface, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(11,36,71,0.15)', zIndex: 50 }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
             <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>E</div>
             <div>
               <h1 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>EduDrill CBT</h1>
               <span style={{ fontSize: '12px', opacity: 0.8 }}>{exam?.toUpperCase()} Module</span>
             </div>
             {isSubmitted && <span style={{ background: theme.surface, color: theme.primary, padding: '4px 10px', borderRadius: 16, fontSize: '11px', fontWeight: 'bold', marginLeft: '12px', letterSpacing: '1px' }}>REVIEW MODE</span>}
           </div>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
             {!isSubmitted && (
               <div style={{ fontSize: '13px', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', display: 'flex', gap: '16px' }}>
                 <span><strong>N</strong> Next</span>
                 <span><strong>P</strong> Prev</span>
                 <span><strong>A-D</strong> Select</span>
                 <span><strong>S</strong> Submit</span>
               </div>
             )}
              {(exam === 'jamb' || ['General Mathematics', 'Further Mathematics', 'Physics', 'Chemistry', 'Geography'].includes(currentQ?.subjectName)) && (
                <button 
                  onClick={() => setShowCalculator(!showCalculator)} 
                  className="premium-btn"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', color: theme.surface, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: '600', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  Calculator
                </button>
              )}

              {(exam === 'jamb' || currentQ?.subjectName === 'English Language' || currentQ?.subjectName === 'Use of English') && (
                <button 
                  onClick={() => setShowDictionary(!showDictionary)} 
                  className="premium-btn"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', color: theme.surface, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: '600', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  Dictionary
                </button>
              )}
<button 
               onClick={() => { if(window.confirm("Are you sure you want to exit this exam?")) setIsStarted(false); }} 
               className="premium-btn"
               style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: theme.surface, padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
             >
               Exit CBT
             </button>
           </div>
        </header>
        
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Main Question Area */}
          <div style={{ flex: 1, padding: '40px 5%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            
            {isSubmitted && currentIndex === 0 && (
              <div className="fade-in" style={{ maxWidth: 900, margin: '0 auto 32px', width: '100%', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '32px', borderRadius: 24, textAlign: 'center', border: `1px solid rgba(255,255,255,0.4)`, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: theme.accent, letterSpacing: '1px' }}>EXAMINATION RESULT</span>
                <h2 style={{ color: theme.primary, margin: '8px 0', fontSize: '42px', fontWeight: '800' }}>{calculateScore()} <span style={{fontSize: '24px', color: theme.textMuted}}>/ {questions.length}</span></h2>
                <p style={{ color: theme.textMuted, fontSize: '15px' }}>Use the navigation grid to review your answers.</p>
              </div>
            )}

            <div className="fade-in" key={currentIndex} style={{ flex: 1, maxWidth: 900, width: '100%', margin: '0 auto', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '48px', borderRadius: 24, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)', border: `1px solid rgba(255,255,255,0.4)`, display: 'flex', flexDirection: 'column' }}>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <span style={{ background: theme.light, color: theme.primary, padding: '8px 16px', borderRadius: 12, fontWeight: '700', fontSize: '15px' }}>Question {currentIndex + 1} / {questions.length}</span>
                 </div>
                 <span style={{ fontWeight: '600', color: theme.accent, fontSize: '15px', padding: '6px 16px', border: `1px solid ${theme.border}`, borderRadius: 20 }}>{currentQ?.subjectName}</span>
               </div>
               
               <p style={{ fontSize: '22px', margin: '0 0 40px 0', color: theme.primary, lineHeight: 1.6, fontWeight: '500' }}>{currentQ?.question}</p>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                 {currentQ?.options?.map((opt, i) => {
                    const letter = optionLetters[i];
                    const isSelected = userAnswers[currentIndex] === opt;
                    
                    let bg = theme.surface;
                    let border = `2px solid ${theme.border}`;
                    let color = theme.textMain;
                    let letterBg = theme.background;
                    let letterColor = theme.textMuted;
                    
                    if (isSelected) {
                      bg = theme.light;
                      color = theme.primary;
                      border = `2px solid ${theme.accent}`;
                      letterBg = theme.accent;
                      letterColor = theme.surface;
                    }

                    // Review Mode Styling - Strictly Blues
                    if (isSubmitted) {
                      const isCorrectAnswer = opt === currentQ.answer;
                      if (isCorrectAnswer) {
                        bg = theme.primary; 
                        color = theme.surface;
                        border = `2px solid ${theme.primary}`;
                        letterBg = 'rgba(255,255,255,0.2)';
                        letterColor = theme.surface;
                      } else if (isSelected && !isCorrectAnswer) {
                        bg = theme.lighter; 
                        color = theme.primary;
                        border = `2px solid ${theme.accent}`;
                        letterBg = theme.accent;
                        letterColor = theme.surface;
                      } else {
                        bg = theme.surface;
                        color = theme.textMuted;
                        border = `1px solid ${theme.border}`;
                      }
                    }

                    return (
                      <label key={i} className={isSubmitted ? "" : "option-label"} style={{ 
                        padding: '16px 24px', 
                        background: bg, 
                        color: color, 
                        borderRadius: 16, 
                        cursor: isSubmitted ? 'default' : 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        border: border, 
                        fontSize: '16px',
                        transition: 'all 0.2s',
                        boxShadow: isSelected && !isSubmitted ? '0 4px 12px rgba(87,108,188,0.1)' : 'none'
                      }}>
                         <input 
                            type="radio" 
                            name={`q-${currentIndex}`} 
                            value={opt} 
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(currentIndex, opt)}
                            disabled={isSubmitted}
                            style={{ display: 'none' }} 
                         />
                         <span style={{ 
                           fontWeight: '700', 
                           marginRight: '20px', 
                           width: '32px', 
                           height: '32px', 
                           display: 'flex', 
                           alignItems: 'center', 
                           justifyContent: 'center', 
                           background: letterBg, 
                           borderRadius: '8px', 
                           color: letterColor,
                           transition: 'all 0.2s'
                         }}>
                           {letter}
                         </span>
                         <span style={{ flex: 1, lineHeight: 1.5 }}>{opt}</span>
                      </label>
                    )
                 })}
               </div>

               {isSubmitted && (
                 <div className="slide-up" style={{ marginTop: '32px', padding: '24px', background: userAnswers[currentIndex] === currentQ?.answer ? theme.primary : theme.lighter, borderRadius: 16, border: `1px solid ${theme.border}` }}>
                   <div style={{ color: userAnswers[currentIndex] === currentQ?.answer ? theme.surface : theme.primary, fontSize: '16px' }}>
                     <strong style={{ display: 'block', marginBottom: '8px', fontSize: '13px', opacity: 0.9, letterSpacing: '1px' }}>CORRECT ANSWER</strong>
                     {currentQ?.answer}
                   </div>
                   {userAnswers[currentIndex] !== currentQ?.answer && (
                     <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${theme.border}`, color: theme.primary, fontSize: '16px' }}>
                       <strong style={{ display: 'block', marginBottom: '8px', fontSize: '13px', opacity: 0.9, letterSpacing: '1px' }}>YOUR ANSWER</strong> 
                       {userAnswers[currentIndex] || 'Not answered'}
                     </div>
                   )}
                 </div>
               )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px', maxWidth: 900, width: '100%', margin: '32px auto 0' }}>
               <button 
                 className="premium-btn"
                 onClick={goPrev} 
                 disabled={currentIndex === 0}
                 style={{ padding: '16px 32px', background: currentIndex === 0 ? theme.border : theme.surface, color: currentIndex === 0 ? theme.textMuted : theme.primary, border: `1px solid ${theme.border}`, borderRadius: 12, cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}
               >
                 <span>←</span> Previous
               </button>

               {!isSubmitted && (
                 <button 
                   className="premium-btn"
                   onClick={() => setShowConfirm(true)}
                   style={{ padding: '16px 48px', background: theme.surface, color: theme.primary, border: `2px solid ${theme.primary}`, borderRadius: 12, cursor: 'pointer', fontSize: '16px', fontWeight: '800' }}
                 >
                   Submit Exam (S)
                 </button>
               )}

               <button 
                 className="premium-btn"
                 onClick={goNext} 
                 disabled={currentIndex === questions.length - 1}
                 style={{ padding: '16px 40px', background: currentIndex === questions.length - 1 ? theme.border : theme.primary, color: currentIndex === questions.length - 1 ? theme.textMuted : theme.surface, border: 'none', borderRadius: 12, cursor: currentIndex === questions.length - 1 ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: currentIndex === questions.length - 1 ? 'none' : '0 8px 16px rgba(11,36,71,0.2)' }}
               >
                 Next <span>→</span>
               </button>
            </div>

          </div>

          {/* Premium Side Navigation */}
          <div style={{ width: '340px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderLeft: `1px solid rgba(255,255,255,0.2)`, display: 'flex', flexDirection: 'column', zIndex: 10 }}>
            <div style={{ padding: '32px 24px', borderBottom: `1px solid rgba(0,0,0,0.05)`, background: 'rgba(240, 249, 255, 0.7)' }}>
              <h3 style={{ margin: '0 0 20px 0', color: theme.primary, fontSize: '18px', fontWeight: '800' }}>Question Navigator</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', fontWeight: '600' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '4px', background: theme.accent, border: `1px solid ${theme.accent}` }}></div>
                  <span style={{color: theme.textMain}}>Answered</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '4px', background: theme.light, border: `1px solid ${theme.accent}` }}></div>
                  <span style={{color: theme.textMain}}>Skipped (Viewed)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 14, height: 14, borderRadius: '4px', background: theme.surface, border: `1px solid ${theme.border}` }}></div>
                  <span style={{color: theme.textMuted}}>Unanswered</span>
                </div>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', alignContent: 'start' }}>
              {questions.map((_, i) => {
                const isAnswered = !!userAnswers[i];
                const isVisited = !!visited[i];
                const isCurrent = i === currentIndex;
                
                let bg = theme.surface;
                let color = theme.textMuted;
                let border = `1px solid ${theme.border}`;
                
                if (isAnswered) {
                  bg = theme.accent;
                  color = theme.surface;
                  border = `1px solid ${theme.accent}`;
                } else if (isVisited) {
                  bg = theme.light;
                  color = theme.primary;
                  border = `1px solid ${theme.accent}`;
                }

                if (isSubmitted && isAnswered) {
                   const correct = userAnswers[i] === questions[i].answer;
                   bg = correct ? theme.primary : theme.lighter;
                   color = correct ? theme.surface : theme.primary;
                   border = correct ? 'none' : `1px solid ${theme.accent}`;
                }

                return (
                  <button
                    key={i}
                    className="grid-btn"
                    onClick={() => setCurrentIndex(i)}
                    style={{
                      aspectRatio: '1',
                      background: bg,
                      color: color,
                      border: border,
                      borderRadius: 8,
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      outline: isCurrent ? `2px solid ${theme.primary}` : 'none',
                      outlineOffset: '2px',
                      padding: 0
                    }}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>
          </div>

        </div>
        {showCalculator && <Calculator onClose={() => setShowCalculator(false)} />}
        {showDictionary && <Dictionary onClose={() => setShowDictionary(false)} />}
    </main>
  );
}

export default ExamCBT;
