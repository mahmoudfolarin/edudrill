import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOfflineQuestions, subjectsList } from "../../data/offlineQuestionBank";
import Ad1 from "../../assets/edudrill_ad_1.jpg";
import Ad2 from "../../assets/edudrill_ad_2.jpg";
import Ad3 from "../../assets/edudrill_ad_3.jpg";
import Ad4 from "../../assets/edudrill_ad_4.jpg";
import Ad5 from "../../assets/edudrill_ad_5.jpg";
import StudentsBg from "../../assets/students_bg.jpg";

import Calculator from "../../components/Calculator";
import Dictionary from "../../components/Dictionary";

function MobileExamCBT() {
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
  const [showResults, setShowResults] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [setupStep, setSetupStep] = useState(1);
  const [questionCounts, setQuestionCounts] = useState({});
  const [timerDuration, setTimerDuration] = useState(3600);
  const [timeLeft, setTimeLeft] = useState(0);

  const [showCalculator, setShowCalculator] = useState(false);
  const [showDictionary, setShowDictionary] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);

  const [selectedLitTexts, setSelectedLitTexts] = useState([]);

  const literatureCategories = [
    {
      category: "Shakespearean Drama",
      texts: ["Antony and Cleopatra"]
    },
    {
      category: "African Prose",
      texts: ["So the Path Does Not Die", "Redemption Road"]
    },
    {
      category: "Non-African Prose",
      texts: ["To Kill a Mockingbird", "Path of Lucas: The Journey He Endured"]
    },
    {
      category: "African Drama",
      texts: ["Once Upon an Elephant", "The Marriage of Anansewa"]
    },
    {
      category: "Non-African Drama",
      texts: ["An Inspector Calls", "A Man for All Seasons"]
    },
    {
      category: "African Poetry",
      texts: ["Once Upon a Time", "New Tongue", "Night", "Not My Business", "Hearty Garlands", "The Breast of the Sea"]
    },
    {
      category: "Non-African Poetry",
      texts: ["She Walks in Beauty", "The Nun's Priest's Tale", "Digging", "Still I Rise", "The Telephone Call", "The Stone"]
    },
    {
      category: "General Appreciation",
      texts: ["General Appreciation"]
    }
  ];

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

  const fetchQuestionsForSubject = async (sub, count, text = null) => {
    let dbSub = sub;
    if (sub === 'use-of-english') dbSub = 'english-language';
    if (sub === 'physical-and-health-education') dbSub = 'physical-education';
    if (sub === 'foods-and-nutrition') dbSub = 'food-and-nutrition';
    
    let url = `/api/questions?exam=${exam.toUpperCase()}&subject=${dbSub}&limit=${count}`;
    if (text) {
      url += `&text=${encodeURIComponent(text)}`;
    }

    try {
      const res = await fetch(url);
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

  const handleNextToConfig = (forceSubject = null) => {
    let subjectsToUse = forceSubject ? [forceSubject] : selectedSubjects;
    if (isJamb) {
      if (forceSubject) {
        if (!subjectsToUse.includes(compulsorySubject)) {
           subjectsToUse = [compulsorySubject, forceSubject];
        }
        if (subjectsToUse.length !== 4) {
           alert("For JAMB CBT, please select exactly 4 subjects using the grid first.");
           return;
        }
      } else {
        if (selectedSubjects.length !== 4) {
          alert("Please select exactly 4 subjects (including Use of English) for JAMB CBT.");
          return;
        }
      }
    } else {
      if (subjectsToUse.length === 0) {
        alert("Please select a subject.");
        return;
      }
    }

    if (subjectsToUse.includes('literature-in-english')) {
      setSetupStep(1.5);
      return;
    }

    continueToSetup2(subjectsToUse);
  };

  const continueToSetup2 = (subjectsToUse = selectedSubjects) => {
    const newCounts = {};
    if (isJamb) {
      subjectsToUse.forEach(sub => {
        newCounts[sub] = (sub === 'use-of-english' || sub === 'english-language') ? 60 : 40;
      });
      setTimerDuration(120 * 60); 
    } else {
      newCounts[subjectsToUse[0]] = 50;
      setTimerDuration(60 * 60); 
    }
    setQuestionCounts(newCounts);
    setSetupStep(2);
  };

  const startCBT = async () => {
    setIsLoading(true);
    let generated = [];
    
    let subjectsSorted = isJamb && selectedSubjects.length === 4 ? 
                         [compulsorySubject, ...selectedSubjects.filter(s => s !== compulsorySubject)] : 
                         [selectedSubjects[0]];

    for (const sub of subjectsSorted) {
      const count = questionCounts[sub] || (isJamb && selectedSubjects.length === 4 ? 40 : 50);
      
      if (sub === 'literature-in-english' && selectedLitTexts.length > 0) {
        const qPerText = Math.floor(count / selectedLitTexts.length);
        const remainder = count % selectedLitTexts.length;
        
        for (let i = 0; i < selectedLitTexts.length; i++) {
          const text = selectedLitTexts[i];
          const numToFetch = qPerText + (i < remainder ? 1 : 0);
          if (numToFetch > 0) {
            const subQuestions = await fetchQuestionsForSubject(sub, numToFetch, text);
            const taggedQs = subQuestions.map(q => ({...q, litText: text}));
            generated = [...generated, ...taggedQs];
          }
        }
      } else {
        const subQuestions = await fetchQuestionsForSubject(sub, count);
        generated = [...generated, ...subQuestions];
      }
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
    setTimeLeft(timerDuration);
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
    setShowResults(true); // Show results first
    setCurrentIndex(0); // Reset to first question for review
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const stats = calculateDetailedScore();
      const score = stats.totalScore;
      const percentage = stats.percentage;
      const maxScore = stats.maxScore;
      const subjectName = isJamb ? 'Multiple Subjects' : (questions[0]?.subjectName || 'Mock Exam');
      
      await fetch('/api/user/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exam,
          subject: subjectName,
          type: 'Mock Exam CBT',
          topic_id: null,
          score,
          total: maxScore,
          percentage,
          correct_count: stats.totalCorrect,
          wrong_count: stats.totalWrong,
          unanswered_count: stats.totalUnanswered,
          time_used: timerDuration - timeLeft,
          detailed_responses: stats.detailedResponses
        })
      });
    } catch (err) {
      console.error("Error saving performance:", err);
    }
  };

  useEffect(() => {
    if (isStarted && !isSubmitted && !showConfirm) {
      // eslint-disable-next-line
      setVisited(prev => ({ ...prev, [currentIndex]: true }));
    }
  }, [currentIndex, isStarted, isSubmitted, showConfirm]);

  useEffect(() => {
    if (isStarted && !isSubmitted) {
      if (timeLeft > 0) {
        const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timerId);
      } else if (timeLeft === 0) {
        // eslint-disable-next-line
        handleConfirmSubmit();
      }
    }
  }, [isStarted, isSubmitted, timeLeft]);

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

  // SETUP VIEW 1
  if (!isStarted && setupStep === 1) {
    return (
      <main style={{ minHeight: '100vh', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85)), url(${StudentsBg}) no-repeat center center fixed`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif" }}>
        <style>{customStyles}</style>
        
        {/* Top Navbar */}
        <header style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '20px 6%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid rgba(255,255,255,0.2)` }}>
          <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>
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
          
          <div style={{ marginBottom: '24px' }}>
            <input 
              type="text" 
              placeholder="Search subjects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px',
                borderRadius: '12px',
                border: `2px solid ${theme.border}`,
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = theme.accent}
              onBlur={(e) => e.target.style.borderColor = theme.border}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginBottom: '40px' }}>
            {subjectsList
              .filter(sub => isJamb ? sub.id !== 'english-language' : sub.id !== 'use-of-english')
              .filter(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(sub => {
              const isSelected = selectedSubjects.includes(sub.id);
              const isCompulsory = isJamb && sub.id === compulsorySubject;
              return (
                <button 
                  key={sub.id}
                  onClick={() => handleSubjectToggle(sub.id)}
                  onDoubleClick={() => {
                    if (!isCompulsory) {
                      handleNextToConfig(sub.id);
                    }
                  }}
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
                    boxShadow: isSelected ? '0 10px 20px rgba(11,36,71,0.1)' : 'none',
                    userSelect: 'none'
                  }}
                  onMouseOver={(e) => { if(!isSelected && !isCompulsory) e.currentTarget.style.borderColor = theme.accent; }}
                  onMouseOut={(e) => { if(!isSelected && !isCompulsory) e.currentTarget.style.borderColor = theme.border; }}
                  title="Double click to quick-start exam"
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
              onClick={() => handleNextToConfig()}
              style={{ padding: '16px 48px', background: theme.primary, color: theme.surface, border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
            >
              Continue to Settings
            </button>
          </div>

        </div>
      </main>
    )
  }

  // SETUP VIEW 1.5 (Literature Texts)
  if (!isStarted && setupStep === 1.5) {
    const handleTextToggle = (text) => {
      if (selectedLitTexts.includes(text)) {
        setSelectedLitTexts(selectedLitTexts.filter(t => t !== text));
      } else {
        setSelectedLitTexts([...selectedLitTexts, text]);
      }
    };
    
    return (
      <main style={{ minHeight: '100vh', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85)), url(${StudentsBg}) no-repeat center center fixed`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif" }}>
        <style>{customStyles}</style>
        
        <header style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '20px 6%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid rgba(255,255,255,0.2)` }}>
          <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>
            <div>
              <strong style={{ display: 'block', color: theme.primary, fontSize: '18px' }}>EduDrill</strong>
              <span style={{ fontSize: '12px', color: theme.accent, fontWeight: 'bold', letterSpacing: '1px' }}>{exam?.toUpperCase()} CBT</span>
            </div>
          </Link>
          <button onClick={() => setSetupStep(1)} style={{ color: theme.primary, textDecoration: 'none', fontWeight: '600', padding: '10px 20px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: 'transparent', transition: '0.2s', fontSize: '14px', cursor: 'pointer' }}>
            ← Back to Subjects
          </button>
        </header>

        <div className="fade-in" style={{ maxWidth: 900, margin: '60px auto', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', padding: '40px 50px', borderRadius: 24, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)', border: `1px solid rgba(255,255,255,0.4)` }}>
          <h2 style={{ color: theme.primary, marginBottom: '16px', textAlign: 'center' }}>Select Literature Texts</h2>
          <p style={{ textAlign: 'center', color: theme.textMuted, marginBottom: '32px' }}>Choose the literature texts you want to be tested on. You can select as many as you like.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px', marginBottom: '40px' }}>
            {literatureCategories.map(category => (
              <div key={category.category} style={{ background: theme.background, padding: '20px', borderRadius: '16px', border: `1px solid ${theme.border}` }}>
                <h3 style={{ color: theme.secondary, fontSize: '16px', marginBottom: '16px', paddingBottom: '8px', borderBottom: `1px solid ${theme.border}` }}>{category.category}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {category.texts.map(text => {
                    const isSelected = selectedLitTexts.includes(text);
                    return (
                      <button
                        key={text}
                        onClick={() => handleTextToggle(text)}
                        style={{
                          textAlign: 'left',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          border: `1px solid ${isSelected ? theme.primary : theme.border}`,
                          background: isSelected ? theme.light : theme.surface,
                          color: isSelected ? theme.primary : theme.textMain,
                          fontWeight: isSelected ? '600' : '400',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${isSelected ? theme.primary : '#ccc'}`, background: isSelected ? theme.primary : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {isSelected && <div style={{ width: 10, height: 10, background: '#fff', borderRadius: 2 }}></div>}
                          </div>
                          <span>{text}</span>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              className="premium-btn"
              onClick={() => continueToSetup2(selectedSubjects)}
              disabled={selectedLitTexts.length === 0}
              style={{ padding: '16px 48px', background: theme.accent, color: theme.surface, border: 'none', borderRadius: 12, cursor: selectedLitTexts.length === 0 ? 'not-allowed' : 'pointer', fontSize: '18px', fontWeight: 'bold', opacity: selectedLitTexts.length === 0 ? 0.6 : 1 }}
            >
              Continue to Exam Settings
            </button>
          </div>
        </div>
      </main>
    )
  }

  // SETUP VIEW 2 (Config)
  if (!isStarted && setupStep === 2) {
    return (
      <main style={{ minHeight: '100vh', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85)), url(${StudentsBg}) no-repeat center center fixed`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif" }}>
        <style>{customStyles}</style>
        
        <header style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '20px 6%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid rgba(255,255,255,0.2)` }}>
          <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>
            <div>
              <strong style={{ display: 'block', color: theme.primary, fontSize: '18px' }}>EduDrill</strong>
              <span style={{ fontSize: '12px', color: theme.accent, fontWeight: 'bold', letterSpacing: '1px' }}>{exam?.toUpperCase()} CBT</span>
            </div>
          </Link>
          <button onClick={() => setSetupStep(1)} style={{ color: theme.primary, textDecoration: 'none', fontWeight: '600', padding: '10px 20px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: 'transparent', transition: '0.2s', fontSize: '14px', cursor: 'pointer' }}>
            ← Back to Subjects
          </button>
        </header>

        <div className="fade-in" style={{ maxWidth: 700, margin: '60px auto', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', padding: '40px 50px', borderRadius: 24, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)', border: `1px solid rgba(255,255,255,0.4)` }}>
          <h2 style={{ color: theme.primary, marginBottom: '32px', textAlign: 'center' }}>Configure Exam Settings</h2>
          
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: theme.textMain, fontSize: '18px', marginBottom: '16px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '8px' }}>Number of Questions</h3>
            {selectedSubjects.map(sub => {
              const subName = subjectsList.find(s => s.id === sub)?.name || sub;
              const isEng = sub === 'use-of-english' || sub === 'english-language';
              let options = isJamb ? (isEng ? [10,20,30,40,50,60] : [10,20,30,40]) : [15,30,45,50];
              return (
                <div key={sub} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', padding: '12px 16px', background: theme.surface, borderRadius: '12px', border: `1px solid ${theme.border}` }}>
                  <span style={{ fontWeight: '600', color: theme.primary }}>{subName}</span>
                  <select 
                    value={questionCounts[sub]}
                    onChange={(e) => setQuestionCounts({...questionCounts, [sub]: Number(e.target.value)})}
                    style={{ padding: '8px 16px', borderRadius: '8px', border: `1px solid ${theme.border}`, outline: 'none', fontWeight: 'bold', color: theme.accent }}
                  >
                    {options.map(opt => <option key={opt} value={opt}>{opt} Questions</option>)}
                  </select>
                </div>
              )
            })}
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: theme.textMain, fontSize: '18px', marginBottom: '16px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '8px' }}>Timer Duration</h3>
            <select 
              value={timerDuration}
              onChange={(e) => setTimerDuration(Number(e.target.value))}
              style={{ width: '100%', padding: '16px', borderRadius: '12px', border: `2px solid ${theme.border}`, fontSize: '16px', outline: 'none', fontWeight: 'bold', color: theme.accent }}
            >
              <option value={30 * 60}>30 Minutes</option>
              <option value={60 * 60}>1 Hour</option>
              <option value={90 * 60}>1 Hour 30 Minutes</option>
              <option value={120 * 60}>2 Hours</option>
            </select>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              className="premium-btn"
              onClick={startCBT}
              disabled={isLoading}
              style={{ padding: '16px 48px', background: theme.accent, color: theme.surface, border: 'none', borderRadius: 12, cursor: isLoading ? 'not-allowed' : 'pointer', fontSize: '18px', fontWeight: 'bold', width: '100%', opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? 'Preparing Test...' : 'Start CBT Test'}
            </button>
          </div>
        </div>
      </main>
    )
  }

  function calculateDetailedScore() {
    const subjectsMap = {};
    const optionLetters = ['A', 'B', 'C', 'D'];
    let totalCorrect = 0;
    let totalWrong = 0;
    let totalUnanswered = 0;
    const detailedResponses = [];
    
    questions.forEach((q, idx) => {
      let correctText = q.answer;
      if (typeof q.answer === 'string' && ['A','B','C','D'].includes(q.answer.toUpperCase())) {
        correctText = q.options[optionLetters.indexOf(q.answer.toUpperCase())];
      }
      const isAnswered = !!userAnswers[idx];
      const isCorrect = isAnswered && ((userAnswers[idx] === correctText) || (userAnswers[idx] === q.answer));
      
      detailedResponses.push({
        question_id: q.id || idx,
        question_text: q.question,
        selected: userAnswers[idx] || null,
        correct: correctText || q.answer,
        is_correct: isCorrect,
        is_answered: isAnswered
      });

      const subj = q.subjectName || 'General';
      if (!subjectsMap[subj]) {
        subjectsMap[subj] = { correct: 0, total: 0 };
      }
      subjectsMap[subj].total += 1;
      if (isCorrect) {
        subjectsMap[subj].correct += 1;
        totalCorrect += 1;
      } else if (isAnswered) {
        totalWrong += 1;
      } else {
        totalUnanswered += 1;
      }
    });

    let totalScore = 0;
    
    const subjectStats = Object.keys(subjectsMap).map(subj => {
      const stats = subjectsMap[subj];
      const percent = Math.round((stats.correct / stats.total) * 100) || 0;
      let jambScore = 0;
      if (isJamb) {
        jambScore = Math.round((stats.correct / stats.total) * 100) || 0;
        totalScore += jambScore;
      }
      return { subject: subj, correct: stats.correct, total: stats.total, percent, jambScore };
    });

    if (!isJamb) {
      totalScore = totalCorrect;
    }
    
    const maxScore = isJamb ? (Object.keys(subjectsMap).length * 100) : questions.length;
    const percentage = Math.round((totalScore / maxScore) * 100) || 0;

    return { totalCorrect, totalWrong, totalUnanswered, detailedResponses, totalScore, maxScore, subjectStats, percentage };
  };

  // Result Page Screen
  if (isSubmitted && showResults) {
    const stats = calculateDetailedScore();
    const timeUsed = timerDuration - timeLeft;
    const avgTime = Math.round(timeUsed / questions.length) || 0;
    
    const formatTime = (secs) => {
      const m = Math.floor(secs / 60);
      const s = secs % 60;
      return `${m}m ${s}s`;
    };

    return (
      <main className="fade-in" style={{ minHeight: '100vh', background: `linear-gradient(rgba(11, 36, 71, 0.85), rgba(25, 55, 109, 0.9)), url(${StudentsBg}) no-repeat center center fixed`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif", padding: '40px 5%' }}>
        <style>{customStyles}</style>
        <div style={{ maxWidth: 1000, margin: '0 auto', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(16px)', borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.2)' }}>
          <div style={{ padding: '40px', textAlign: 'center', borderBottom: `1px solid rgba(0,0,0,0.05)`, background: 'rgba(240, 249, 255, 0.5)' }}>
             <h1 style={{ color: theme.primary, margin: '0 0 8px 0', fontSize: '32px', fontWeight: '800' }}>Performance Result</h1>
             <p style={{ color: theme.textMuted, margin: 0, fontSize: '16px' }}>{exam?.toUpperCase()} CBT {isJamb ? '(JAMB Mode)' : ''}</p>
          </div>
          
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
             {/* Total Score Summary */}
             <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px', background: theme.surface, border: `1px solid ${theme.border}`, borderRadius: 16, padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ position: 'relative', width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                         <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={theme.light} strokeWidth="3" />
                         <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={stats.percentage >= 50 ? '#3B82F6' : '#1E40AF'} strokeWidth="3" strokeDasharray={`${stats.percentage}, 100`} />
                      </svg>
                      <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                         <span style={{ fontSize: '36px', fontWeight: '800', color: theme.primary }}>{stats.percentage}%</span>
                      </div>
                   </div>
                   <h3 style={{ marginTop: '24px', color: theme.textMain, fontSize: '18px' }}>Total Percentage</h3>
                </div>

                <div style={{ flex: '1 1 300px', background: theme.primary, color: theme.surface, borderRadius: 16, padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                   <span style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>Aggregate Score</span>
                   <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '16px' }}>
                      <span style={{ fontSize: '64px', fontWeight: '800', lineHeight: 1 }}>{stats.totalScore}</span>
                      <span style={{ fontSize: '24px', opacity: 0.7, marginLeft: '8px' }}>/ {stats.maxScore}</span>
                   </div>
                   {isJamb && <p style={{ marginTop: '16px', fontSize: '14px', opacity: 0.9, lineHeight: 1.5 }}>Calculated based on standard JAMB format (100 points per subject).</p>}
                </div>
             </div>

             {/* Question & Time Stats */}
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                <div style={{ background: theme.surface, borderRadius: 16, padding: '24px', border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: theme.textMain, fontWeight: '600' }}>✓ Correct</span>
                      <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold' }}>{stats.totalCorrect}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: theme.textMain, fontWeight: '600' }}>✗ Wrong</span>
                      <span style={{ background: 'rgba(30, 64, 175, 0.1)', color: '#1E40AF', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold' }}>{stats.totalWrong}</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: theme.textMain, fontWeight: '600' }}>○ Unanswered</span>
                      <span style={{ background: 'rgba(100, 116, 139, 0.1)', color: '#64748B', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold' }}>{stats.totalUnanswered}</span>
                   </div>
                </div>

                <div style={{ background: theme.surface, borderRadius: 16, padding: '24px', border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                   <span style={{ color: theme.textMuted, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Time Used</span>
                   <span style={{ color: theme.primary, fontSize: '32px', fontWeight: '800', marginTop: '8px' }}>{formatTime(timeUsed)}</span>
                </div>

                <div style={{ background: theme.surface, borderRadius: 16, padding: '24px', border: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                   <span style={{ color: theme.textMuted, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Average Speed</span>
                   <span style={{ color: theme.primary, fontSize: '32px', fontWeight: '800', marginTop: '8px' }}>{avgTime}s</span>
                   <span style={{ color: theme.textMuted, fontSize: '14px', marginTop: '4px' }}>per question</span>
                </div>
             </div>

             {/* Subject Breakdown Charts & Table */}
             <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
               <div style={{ flex: '1 1 400px' }}>
                 <h3 style={{ color: theme.primary, marginBottom: '24px', fontSize: '20px', fontWeight: '800' }}>Subject Breakdown (Bar Chart)</h3>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                   {stats.subjectStats.map((s, i) => (
                     <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <span style={{ fontWeight: '700', color: theme.textMain, textTransform: 'capitalize', fontSize: '15px' }}>{s.subject.replace(/-/g, ' ')}</span>
                         <span style={{ fontWeight: '600', color: theme.primary, fontSize: '15px' }}>{isJamb ? `${s.jambScore} / 100` : `${s.correct} / ${s.total}`} ({s.percent}%)</span>
                       </div>
                       <div style={{ width: '100%', height: '12px', background: theme.light, borderRadius: '6px', overflow: 'hidden' }}>
                         <div style={{ width: `${s.percent}%`, height: '100%', background: s.percent >= 50 ? '#3B82F6' : '#60A5FA', borderRadius: '6px', transition: 'width 1s ease-out' }}></div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               <div style={{ flex: '1 1 300px' }}>
                 <h3 style={{ color: theme.primary, marginBottom: '24px', fontSize: '20px', fontWeight: '800' }}>Performance Pie Chart</h3>
                 
                 {(() => {
                    const totalQ = questions.length;
                    const cPct = (stats.totalCorrect / totalQ) * 100 || 0;
                    const wPct = (stats.totalWrong / totalQ) * 100 || 0;
                    const uPct = (stats.totalUnanswered / totalQ) * 100 || 0;
                    
                    return (
                      <>
                         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                           <svg viewBox="0 0 31.831 31.831" style={{ width: '200px', height: '200px', transform: 'rotate(-90deg)', borderRadius: '50%' }}>
                             {/* Background (Unanswered) */}
                             <circle r="15.9155" cx="15.9155" cy="15.9155" fill="transparent" stroke="#64748B" strokeWidth="31.831" />
                             
                             {/* Middle Layer (Wrong) */}
                             <circle r="15.9155" cx="15.9155" cy="15.9155" fill="transparent" stroke="#1E40AF" strokeWidth="31.831" strokeDasharray={`${cPct + wPct} 100`} />
                             
                             {/* Top Layer (Correct) */}
                             <circle r="15.9155" cx="15.9155" cy="15.9155" fill="transparent" stroke="#3B82F6" strokeWidth="31.831" strokeDasharray={`${cPct} 100`} />
                           </svg>
                         </div>
                         <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px', marginTop: '24px' }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 12, height: 12, background: '#3B82F6', borderRadius: '50%' }}></div><span style={{ fontSize: '14px', color: theme.textMain }}>Correct ({Math.round(cPct)}%)</span></div>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 12, height: 12, background: '#1E40AF', borderRadius: '50%' }}></div><span style={{ fontSize: '14px', color: theme.textMain }}>Wrong ({Math.round(wPct)}%)</span></div>
                           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: 12, height: 12, background: '#64748B', borderRadius: '50%' }}></div><span style={{ fontSize: '14px', color: theme.textMain }}>Unanswered ({Math.round(uPct)}%)</span></div>
                         </div>
                      </>
                    )
                 })()}
               </div>
             </div>

             {/* Detailed Results Table */}
             <div>
               <h3 style={{ color: theme.primary, marginBottom: '16px', fontSize: '20px', fontWeight: '800' }}>Detailed Result Table</h3>
               <div style={{ overflowX: 'auto', background: theme.surface, borderRadius: 16, border: `1px solid ${theme.border}` }}>
                 <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                   <thead>
                     <tr style={{ background: theme.light, color: theme.primary }}>
                       <th style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}` }}>Subject</th>
                       <th style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}` }}>Total Questions</th>
                       <th style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}` }}>Correct Answers</th>
                       {isJamb && <th style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}` }}>JAMB Score (100)</th>}
                       <th style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}` }}>Percentage</th>
                       <th style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}` }}>Remark</th>
                     </tr>
                   </thead>
                   <tbody>
                     {stats.subjectStats.map((s, i) => (
                       <tr key={i}>
                         <td style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}`, textTransform: 'capitalize', fontWeight: '600' }}>{s.subject.replace(/-/g, ' ')}</td>
                         <td style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}`, color: theme.textMuted }}>{s.total}</td>
                         <td style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}`, color: '#3B82F6', fontWeight: 'bold' }}>{s.correct}</td>
                         {isJamb && <td style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}`, color: theme.primary, fontWeight: 'bold' }}>{s.jambScore}</td>}
                         <td style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}`, color: theme.textMain }}>{s.percent}%</td>
                         <td style={{ padding: '16px 24px', borderBottom: `1px solid ${theme.border}`, color: s.percent >= 50 ? '#3B82F6' : '#1E40AF', fontWeight: 'bold' }}>{s.percent >= 70 ? 'Excellent' : s.percent >= 50 ? 'Pass' : 'Fail'}</td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>

             {/* EDUDRILL RECOMMENDATION */}
             {(() => {
                let strongest = stats.subjectStats[0];
                let weakest = stats.subjectStats[0];
                stats.subjectStats.forEach(s => {
                  if (s.percent > strongest.percent) strongest = s;
                  if (s.percent < weakest.percent) weakest = s;
                });

                return (
                  <div style={{ background: 'linear-gradient(135deg, #0B2447 0%, #19376D 100%)', borderRadius: 24, padding: '40px', color: 'white', boxShadow: '0 20px 25px -5px rgba(11, 36, 71, 0.15)', marginTop: '24px' }}>
                    <h3 style={{ margin: '0 0 24px 0', fontSize: '24px', fontWeight: '800', letterSpacing: '1px' }}>EDUDRILL RECOMMENDATION</h3>
                    
                    <div style={{ marginBottom: '24px', fontSize: '16px', lineHeight: 1.6 }}>
                      <p style={{ marginBottom: '8px' }}>
                        You performed strongly in <strong style={{ color: '#93C5FD' }}>{strongest?.subject?.replace(/-/g, ' ')}</strong> ({strongest?.percent}%).
                      </p>
                      {weakest && weakest.subject !== strongest.subject && (
                        <p>
                          Your weakest area in this attempt was <strong style={{ color: '#BFDBFE' }}>{weakest.subject.replace(/-/g, ' ')}</strong> ({weakest.percent}%).
                        </p>
                      )}
                    </div>

                    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px', marginBottom: '32px' }}>
                      <h4 style={{ margin: '0 0 16px 0', color: '#DCEBFF' }}>Recommended next steps:</h4>
                      <ol style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
                        {weakest && weakest.subject !== strongest.subject && <li>Review lessons for {weakest.subject.replace(/-/g, ' ')}</li>}
                        <li>Review Answers & Explanations for this test</li>
                        <li>Ask AI Tutor about difficult concepts</li>
                      </ol>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                      <Link to={`/dashboard/${exam}/subjects/${weakest?.subject || examSubjects[0]}/learn`} style={{ padding: '12px 24px', background: 'white', color: '#0B2447', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}>
                        Review Lesson
                      </Link>
                      <Link to={`/dashboard/${exam}/practice`} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}>
                        Practice Topic
                      </Link>
                      <Link to={`/dashboard/${exam}/ai-tutor`} style={{ padding: '12px 24px', background: 'rgba(255,255,255,0.2)', color: 'white', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '15px' }}>
                        Ask AI Tutor
                      </Link>
                    </div>
                  </div>
                )
             })()}

             <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
                <button 
                  className="premium-btn"
                  onClick={() => {
                    setShowResults(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{ padding: '16px 48px', background: theme.accent, color: theme.surface, border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: '18px', fontWeight: 'bold', boxShadow: '0 8px 16px rgba(87,108,188,0.3)' }}
                >
                  Review Answers & Explanations
                </button>
             </div>
          </div>
        </div>
      </main>
    );
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
  
  const examSubjects = [...new Set(questions.map(q => q.subjectName))].filter(Boolean);
  const currentSubject = currentQ?.subjectName;
  const localIndex = questions.slice(0, currentIndex).filter(q => q.subjectName === currentSubject).length;
  const totalInSubject = questions.filter(q => q.subjectName === currentSubject).length;
  const currentSubjectQuestions = questions.map((q, index) => ({ q, index })).filter(item => item.q.subjectName === currentSubject);

  // Handle case where questions are not loaded yet or invalid index
  if (isStarted && !currentQ && !showConfirm && !isSubmitted) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85))`, fontFamily: "'Inter', sans-serif", color: 'white' }}>
        <h2>Loading Question Data...</h2>
        <button onClick={() => setIsStarted(false)} style={{marginLeft: 20, padding: 10, cursor: 'pointer'}}>Back to Setup</button>
      </main>
    )
  }

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}h ${m < 10 ? '0': ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
    return `${m < 10 ? '0': ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // CBT Mode View
  return (
    <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85)), url(${StudentsBg}) no-repeat center center fixed`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif" }}>
       <style>{customStyles}</style>
       
       <header style={{ height: '70px', padding: '0 24px', background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`, color: theme.surface, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(11,36,71,0.15)', zIndex: 50 }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
             <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>
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
                  <img src="/assets/icons/calculator.svg" alt="calc" className="w-4 h-4" style={{ width: '16px', height: '16px', filter: 'invert(1)' }} />
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
                <h2 style={{ color: theme.primary, margin: '8px 0', fontSize: '42px', fontWeight: '800' }}>{calculateDetailedScore().totalScore} <span style={{fontSize: '24px', color: theme.textMuted}}>/ {calculateDetailedScore().maxScore}</span></h2>
                <p style={{ color: theme.textMuted, fontSize: '15px' }}>Use the navigation grid to review your answers.</p>
              </div>
            )}

            {!isSubmitted && (
              <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '24px', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', padding: '16px 32px', borderRadius: '16px', maxWidth: '300px', margin: '0 auto 24px', border: `2px solid ${timeLeft < 300 ? '#93c5fd' : theme.border}`, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <img src="/assets/icons/clock.svg" alt="clock" style={{ width: 24, height: 24, filter: timeLeft < 300 ? 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' : 'none' }} />
                <span style={{ fontSize: '24px', fontWeight: '800', color: timeLeft < 300 ? '#93c5fd' : theme.primary, fontFamily: 'monospace' }}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            )}

            {isJamb && examSubjects.length > 1 && (
              <div className="fade-in" style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', maxWidth: 900, margin: '0 auto 24px', width: '100%' }}>
                {examSubjects.map(sub => {
                  const firstIndex = questions.findIndex(q => q.subjectName === sub);
                  const isActive = sub === currentSubject;
                  return (
                    <button
                      key={sub}
                      onClick={() => setCurrentIndex(firstIndex)}
                      style={{
                        padding: '10px 20px',
                        background: isActive ? theme.primary : 'rgba(255,255,255,0.7)',
                        color: isActive ? theme.surface : theme.primary,
                        border: `1px solid ${isActive ? theme.primary : 'rgba(255,255,255,0.4)'}`,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontWeight: '700',
                        fontSize: '14px',
                        transition: 'all 0.2s',
                        boxShadow: isActive ? '0 8px 16px rgba(11,36,71,0.15)' : '0 4px 6px rgba(0,0,0,0.05)'
                      }}
                    >
                      {sub}
                    </button>
                  )
                })}
              </div>
            )}

            <div className="fade-in" key={currentIndex} style={{ flex: 1, maxWidth: 900, width: '100%', margin: '0 auto', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '48px', borderRadius: 24, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.15)', border: `1px solid rgba(255,255,255,0.4)`, display: 'flex', flexDirection: 'column' }}>
               
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                   <span style={{ background: theme.light, color: theme.primary, padding: '8px 16px', borderRadius: 12, fontWeight: '700', fontSize: '15px' }}>Question {localIndex + 1} / {totalInSubject}</span>
                   {currentQ?.litText && (
                     <span style={{ background: theme.accent, color: theme.surface, padding: '8px 16px', borderRadius: 12, fontWeight: '700', fontSize: '15px' }}>{currentQ.litText}</span>
                   )}
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

                    // Review Mode Styling - Strictly Blues & Green/Red
                    let isCorrectAnswer = false;
                    if (isSubmitted) {
                      let correctText = currentQ.answer;
                      if (typeof currentQ.answer === 'string' && ['A','B','C','D'].includes(currentQ.answer.toUpperCase())) {
                        correctText = currentQ.options[optionLetters.indexOf(currentQ.answer.toUpperCase())];
                      }
                      isCorrectAnswer = (opt === correctText) || (opt === currentQ.answer);

                      if (isCorrectAnswer) {
                        bg = '#3B82F6'; // Green
                        color = theme.surface;
                        border = `2px solid #3B82F6`;
                        letterBg = 'rgba(255,255,255,0.2)';
                        letterColor = theme.surface;
                      } else if (isSelected && !isCorrectAnswer) {
                        bg = '#1E40AF'; // Red
                        color = theme.surface;
                        border = `2px solid #1E40AF`;
                        letterBg = 'rgba(255,255,255,0.2)';
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
                         {isSubmitted && isCorrectAnswer && (
                           <span style={{ fontSize: '20px', fontWeight: 'bold' }}>✓</span>
                         )}
                         {isSubmitted && isSelected && !isCorrectAnswer && (
                           <span style={{ fontSize: '20px', fontWeight: 'bold' }}>✗</span>
                         )}
                      </label>
                    )
                 })}
               </div>

               {isSubmitted && (() => {
                 let correctText = currentQ?.answer;
                 let correctLetter = '?';
                 if (typeof currentQ?.answer === 'string' && ['A','B','C','D'].includes(currentQ.answer.toUpperCase())) {
                   correctLetter = currentQ.answer.toUpperCase();
                   correctText = currentQ.options[optionLetters.indexOf(correctLetter)];
                 } else if (currentQ?.options?.includes(currentQ?.answer)) {
                   correctLetter = optionLetters[currentQ.options.indexOf(currentQ.answer)];
                 }

                 const userAnsText = userAnswers[currentIndex];
                 const isAnswered = !!userAnsText;
                 const isCurrentCorrect = isAnswered && ((userAnsText === correctText) || (userAnsText === currentQ?.answer));
                 
                 let userLetter = '?';
                 if (isAnswered && currentQ?.options?.includes(userAnsText)) {
                   userLetter = optionLetters[currentQ.options.indexOf(userAnsText)];
                 }

                 let statusColor = theme.border;
                 let statusLabel = 'Unanswered';
                 if (isCurrentCorrect) {
                   statusColor = '#3B82F6';
                   statusLabel = 'Correct';
                 } else if (isAnswered) {
                   statusColor = '#1E40AF';
                   statusLabel = 'Incorrect';
                 }

                 return (
                   <div className="slide-up" style={{ marginTop: '32px', padding: '24px', background: theme.surface, borderRadius: 16, border: `2px solid ${statusColor}` }}>
                     <div style={{ fontWeight: 'bold', fontSize: '18px', color: statusColor, marginBottom: '16px', letterSpacing: '1px' }}>{statusLabel}:</div>
                     
                     {isAnswered ? (
                        <div style={{ fontSize: '16px', color: theme.textMain, marginBottom: '8px' }}>
                           {isCurrentCorrect ? <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>✓</span> : <span style={{ color: '#1E40AF', fontWeight: 'bold' }}>✗</span>} Your answer: {userLetter} ({userAnsText})
                        </div>
                     ) : (
                        <div style={{ fontSize: '16px', color: theme.textMuted, marginBottom: '8px' }}>
                           <span style={{ color: '#64748B', fontWeight: 'bold' }}>○</span> Not answered
                        </div>
                     )}

                     <div style={{ fontSize: '16px', color: theme.textMain }}>
                        <span style={{ color: '#3B82F6', fontWeight: 'bold' }}>✓</span> Correct answer: {correctLetter} ({correctText})
                     </div>
                   </div>
                 );
               })()}
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
          <div className={`question-navigator ${showMobileNav ? 'open' : ''}`} style={{ width: '340px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderLeft: `1px solid rgba(255,255,255,0.2)`, display: 'flex', flexDirection: 'column', zIndex: 100 }}>
            
            {/* Mobile Close Button */}
            <button className="mobile-nav-close" onClick={() => setShowMobileNav(false)}>×</button>

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

            <div className="question-grid" style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', alignContent: 'start' }}> 
              {currentSubjectQuestions.map((item, localIdx) => {
                const i = item.index;
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
                   const optionLetters = ['A', 'B', 'C', 'D'];
                   let correctText = questions[i].answer;
                   if (typeof questions[i].answer === 'string' && ['A','B','C','D'].includes(questions[i].answer.toUpperCase())) {
                     correctText = questions[i].options[optionLetters.indexOf(questions[i].answer.toUpperCase())];
                   }
                   const correct = (userAnswers[i] === correctText) || (userAnswers[i] === questions[i].answer);
                   bg = correct ? '#3B82F6' : '#1E40AF';
                   color = theme.surface;
                   border = 'none';
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
                      borderRadius: 6,
                      fontWeight: '700',
                      fontSize: '12px',
                      cursor: 'pointer',
                      outline: isCurrent ? `2px solid ${theme.primary}` : 'none',
                      outlineOffset: '2px',
                      padding: 0
                    }}
                  >
                    {localIdx + 1}
                  </button>
                )
              })}
            </div>
          </div>

        </div>
        
        {/* Floating Action Button for Mobile */}
        <button className="mobile-fab" onClick={() => setShowMobileNav(true)}>
          <span style={{fontSize: '24px'}}>☰</span>
        </button>

        {/* Mobile Overlay */}
        {showMobileNav && <div className="mobile-overlay" onClick={() => setShowMobileNav(false)}></div>}

        {showCalculator && <Calculator onClose={() => setShowCalculator(false)} />}
        {showDictionary && <Dictionary onClose={() => setShowDictionary(false)} />}
    </main>
  );
}

export default MobileExamCBT;
