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
import useMobile from "../hooks/useMobile";
import MobileExamPractice from "./mobile/MobileExamPractice";

function ExamPractice() {
  const { exam } = useParams();
  const { isMobile } = useMobile();

  const searchParams = new URLSearchParams(window.location.search);
  const subjectParam = searchParams.get('subject');
  
  const isJamb = exam?.toLowerCase() === "jamb";
  const compulsorySubject = isJamb ? "use-of-english" : null;
  
  const initialSubjects = isJamb 
    ? [compulsorySubject, ...(subjectParam && subjectParam !== compulsorySubject ? [subjectParam] : [])] 
    : (subjectParam ? [subjectParam] : []);

  const [selectedSubjects, setSelectedSubjects] = useState(initialSubjects);
  const [isPracticing, setIsPracticing] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [revealed, setRevealed] = useState({});
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
    if (isPracticing) return;
    const timer = setInterval(() => {
      setCurrentAd(prev => (prev + 1) % adImages.length);
    }, 5000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPracticing]);

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
    if (!forceSubject) {
      if (isJamb && subjectsToUse.length !== 4) {
        alert("Please select exactly 4 subjects (including Use of English) for full JAMB practice.");
        return;
      }
      if (!isJamb && subjectsToUse.length === 0) {
        alert("Please select a subject to practice.");
        return;
      }
    } else {
       if (isJamb && subjectsToUse.length !== 4) {
          if (!subjectsToUse.includes(compulsorySubject)) {
             subjectsToUse = [compulsorySubject, forceSubject];
          }
          if (subjectsToUse.length !== 4) {
             alert("For JAMB, please select 3 other subjects before continuing.");
             return;
          }
       }
    }

    if (forceSubject && !selectedSubjects.includes(forceSubject)) {
      setSelectedSubjects(subjectsToUse);
    }

    if (subjectsToUse.includes('literature-in-english')) {
      setSetupStep(1.5);
      return;
    }

    continueToSetup2(subjectsToUse);
  };

  const continueToSetup2 = (subjectsToUse = selectedSubjects) => {
    const newCounts = {};
    if (isJamb && subjectsToUse.length === 4) {
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

  const startPractice = async () => {
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
    setIsPracticing(true);
    setUserAnswers({});
    setVisited({});
    setRevealed({});
    setCurrentIndex(0);
    setIsLoading(false);
    setTimeLeft(timerDuration);
  };

  // Auto-start if a specific subject was passed in the URL
  useEffect(() => {
    if (subjectParam && !isPracticing && questions.length === 0) {
      // eslint-disable-next-line
      startPractice(subjectParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subjectParam]);

  const handleAnswerSelect = (qIndex, answer) => {
    setUserAnswers(prev => ({ ...prev, [qIndex]: answer }));
  };

  const toggleReveal = (qIndex) => {
    setRevealed(prev => ({ ...prev, [qIndex]: !prev[qIndex] }));
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(prev => prev + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  useEffect(() => {
    // eslint-disable-next-line
    if (isPracticing) setVisited(prev => ({ ...prev, [currentIndex]: true }));
  }, [currentIndex, isPracticing]);

  useEffect(() => {
    if (isPracticing) {
      if (timeLeft > 0) {
        const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timerId);
      } else if (timeLeft === 0 && questions.length > 0) {
        alert("Time is up! Your practice session has ended.");
        // eslint-disable-next-line
        setIsPracticing(false);
      }
    }
  }, [isPracticing, timeLeft, questions]);

  useEffect(() => {
    if (!isPracticing) return;
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      const key = e.key.toUpperCase();
      
      if (key === 'N' || key === 'ARROWRIGHT') goNext();
      if (key === 'P' || key === 'ARROWLEFT') goPrev();
      if (key === 'S') toggleReveal(currentIndex);
      
      const optionIndex = key.charCodeAt(0) - 65;
      if (optionIndex >= 0 && optionIndex <= 3) {
        const currentQ = questions[currentIndex];
        if (currentQ && currentQ.options[optionIndex]) {
          handleAnswerSelect(currentIndex, currentQ.options[optionIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPracticing, currentIndex, questions]);


  // SETUP VIEW 1
  if (isMobile) return <MobileExamPractice />;
  if (!isPracticing && setupStep === 1) {
    return (
      <main style={{ minHeight: '100vh', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85)), url(${StudentsBg}) no-repeat center center fixed`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif" }}>
        <style>{customStyles}</style>
        
        {/* Top Navbar */}
        <header style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '20px 6%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid rgba(255,255,255,0.2)` }}>
          <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>
            <div>
              <strong style={{ display: 'block', color: theme.primary, fontSize: '18px' }}>EduDrill</strong>
              <span style={{ fontSize: '12px', color: theme.accent, fontWeight: 'bold', letterSpacing: '1px' }}>{exam?.toUpperCase()} PRACTICE</span>
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
                SETUP YOUR SESSION
              </div>
              
              <h1>
                Configure
                <br />
                <span>Practice Module</span>
              </h1>
              
              <p style={{ fontSize: '16px' }}>
                {isJamb 
                  ? "Select 3 subjects to complete your JAMB combination. Use of English is already pre-selected. You'll practice exactly 180 questions." 
                  : "Select the subject you want to master. We'll instantly generate a 50-question mock for you to practice."}
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
                  title="Double click to quick-start practice"
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
              style={{ padding: '16px 48px', background: theme.accent, color: theme.surface, border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }}
            >
              Continue to Settings
            </button>
          </div>

        </div>
      </main>
    )
  }

  // SETUP VIEW 1.5 (Literature Texts)
  if (!isPracticing && setupStep === 1.5) {
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
              <span style={{ fontSize: '12px', color: theme.accent, fontWeight: 'bold', letterSpacing: '1px' }}>{exam?.toUpperCase()} PRACTICE</span>
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
  if (!isPracticing && setupStep === 2) {
    return (
      <main style={{ minHeight: '100vh', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85)), url(${StudentsBg}) no-repeat center center fixed`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif" }}>
        <style>{customStyles}</style>
        
        <header style={{ background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', padding: '20px 6%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid rgba(255,255,255,0.2)` }}>
          <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: 8, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, color: theme.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '20px' }}><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>
            <div>
              <strong style={{ display: 'block', color: theme.primary, fontSize: '18px' }}>EduDrill</strong>
              <span style={{ fontSize: '12px', color: theme.accent, fontWeight: 'bold', letterSpacing: '1px' }}>{exam?.toUpperCase()} PRACTICE</span>
            </div>
          </Link>
          <button onClick={() => setSetupStep(1)} style={{ color: theme.primary, textDecoration: 'none', fontWeight: '600', padding: '10px 20px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: 'transparent', transition: '0.2s', fontSize: '14px', cursor: 'pointer' }}>
            ← Back to Subjects
          </button>
        </header>

        <div className="fade-in" style={{ maxWidth: 700, margin: '60px auto', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(12px)', padding: '40px 50px', borderRadius: 24, boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)', border: `1px solid rgba(255,255,255,0.4)` }}>
          <h2 style={{ color: theme.primary, marginBottom: '32px', textAlign: 'center' }}>Configure Practice Settings</h2>
          
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: theme.textMain, fontSize: '18px', marginBottom: '16px', borderBottom: `1px solid ${theme.border}`, paddingBottom: '8px' }}>Number of Questions</h3>
            {selectedSubjects.map(sub => {
              const subName = subjectsList.find(s => s.id === sub)?.name || sub;
              // Practice options: 10, 20, 30, 40, 50
              let options = [10, 20, 30, 40, 50];
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
              onClick={startPractice}
              disabled={isLoading}
              style={{ padding: '16px 48px', background: theme.accent, color: theme.surface, border: 'none', borderRadius: 12, cursor: isLoading ? 'not-allowed' : 'pointer', fontSize: '18px', fontWeight: 'bold', width: '100%', opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? 'Preparing Practice...' : 'Start Practice Session'}
            </button>
          </div>
        </div>
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

  // PRACTICE VIEW
  const currentQ = questions[currentIndex];
  const optionLetters = ['A', 'B', 'C', 'D'];
  const isRevealed = revealed[currentIndex];
  
  const examSubjects = [...new Set(questions.map(q => q.subjectName))].filter(Boolean);
  const currentSubject = currentQ?.subjectName;
  const localIndex = questions.slice(0, currentIndex).filter(q => q.subjectName === currentSubject).length;
  const totalInSubject = questions.filter(q => q.subjectName === currentSubject).length;
  const currentSubjectQuestions = questions.map((q, index) => ({ q, index })).filter(item => item.q.subjectName === currentSubject);

  // Handle case where questions are not loaded yet or invalid index
  if (isPracticing && !currentQ) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85))`, fontFamily: "'Inter', sans-serif", color: 'white' }}>
        <h2>Loading Question Data...</h2>
        <button onClick={() => setIsPracticing(false)} style={{marginLeft: 20, padding: 10, cursor: 'pointer'}}>Back to Setup</button>
      </main>
    )
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: `linear-gradient(rgba(11, 36, 71, 0.8), rgba(25, 55, 109, 0.85)), url(${StudentsBg}) no-repeat center center fixed`, backgroundSize: 'cover', fontFamily: "'Inter', sans-serif" }}>
       <style>{customStyles}</style>
       
       <header style={{ height: '70px', padding: '0 24px', background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`, color: theme.surface, display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 20px rgba(11,36,71,0.15)', zIndex: 50 }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
             <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}><img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", borderRadius: "inherit" }} /></div>
             <div>
               <h1 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>EduDrill Practice</h1>
               <span style={{ fontSize: '12px', opacity: 0.8 }}>{exam?.toUpperCase()} Module</span>
             </div>
           </div>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
             <div style={{ fontSize: '13px', padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', display: 'flex', gap: '16px' }}>
               <span><strong>N</strong> Next</span>
               <span><strong>P</strong> Prev</span>
               <span><strong>A-D</strong> Select</span>
               <span><strong>S</strong> Reveal</span>
             </div>
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
                  <img src="/assets/icons/dictionary.svg" alt="dict" className="w-4 h-4" style={{ width: '16px', height: '16px', filter: 'invert(1)' }} />
                  Dictionary
                </button>
              )}
<button 
               onClick={() => { if(window.confirm("Are you sure you want to end your practice session?")) setIsPracticing(false); }} 
               className="premium-btn"
               style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: theme.surface, padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}
             >
               End Session
             </button>
           </div>
        </header>
        
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Main Question Area */}
          <div style={{ flex: 1, padding: '40px 5%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

            <div className="fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '24px', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', padding: '16px 32px', borderRadius: '16px', maxWidth: '300px', margin: '0 auto 24px', border: `2px solid ${timeLeft < 300 ? '#93c5fd' : theme.border}`, boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <img src="/assets/icons/clock.svg" alt="clock" style={{ width: 24, height: 24, filter: timeLeft < 300 ? 'invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)' : 'none' }} />
              <span style={{ fontSize: '24px', fontWeight: '800', color: timeLeft < 300 ? '#93c5fd' : theme.primary, fontFamily: 'monospace' }}>
                {formatTime(timeLeft)}
              </span>
            </div>
            
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
                    
                    return (
                      <label key={i} className="option-label" style={{ 
                        padding: '16px 24px', 
                        background: isSelected ? theme.light : theme.surface, 
                        color: isSelected ? theme.primary : theme.textMain, 
                        borderRadius: 16, 
                        cursor: 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        border: `2px solid ${isSelected ? theme.accent : theme.border}`, 
                        fontSize: '16px',
                        boxShadow: isSelected ? '0 4px 12px rgba(87,108,188,0.1)' : 'none'
                      }}>
                         <input 
                            type="radio" 
                            name={`q-${currentIndex}`} 
                            value={opt} 
                            checked={isSelected}
                            onChange={() => handleAnswerSelect(currentIndex, opt)}
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
                           background: isSelected ? theme.accent : theme.background, 
                           borderRadius: '8px', 
                           color: isSelected ? theme.surface : theme.textMuted,
                           transition: 'all 0.2s'
                         }}>
                           {letter}
                         </span>
                         <span style={{ flex: 1, lineHeight: 1.5 }}>{opt}</span>
                      </label>
                    )
                 })}
               </div>

               <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'center' }}>
                 <button 
                   className="premium-btn"
                   onClick={() => toggleReveal(currentIndex)}
                   style={{ padding: '12px 24px', background: isRevealed ? theme.surface : theme.accent, color: isRevealed ? theme.accent : theme.surface, border: `2px solid ${theme.accent}`, borderRadius: 12, cursor: 'pointer', fontWeight: 'bold', fontSize: '15px' }}
                 >
                   {isRevealed ? "Hide Answer (S)" : "Show Answer (S)"}
                 </button>
               </div>

               {isRevealed && (
                 <div className="slide-up" style={{ marginTop: '24px', padding: '24px', background: theme.light, borderRadius: 16, border: `1px solid ${theme.border}` }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                     <div style={{ width: 24, height: 24, borderRadius: '50%', background: theme.accent, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>✓</div>
                     <span style={{ color: theme.accent, fontWeight: 'bold', fontSize: '14px', letterSpacing: '1px' }}>CORRECT ANSWER</span>
                   </div>
                   <div style={{ color: theme.primary, fontSize: '18px', fontWeight: '500', marginLeft: '36px' }}>
                     {currentQ?.answer}
                   </div>
                 </div>
               )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px', maxWidth: 900, width: '100%', margin: '32px auto 0' }}>
               <button 
                 className="premium-btn"
                 onClick={goPrev} 
                 disabled={currentIndex === 0}
                 style={{ padding: '16px 32px', background: currentIndex === 0 ? theme.border : theme.surface, color: currentIndex === 0 ? theme.textMuted : theme.primary, border: `1px solid ${theme.border}`, borderRadius: 12, cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', fontSize: '16px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' }}
               >
                 <span>←</span> Previous
               </button>

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

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', alignContent: 'start' }}>
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

export default ExamPractice;
