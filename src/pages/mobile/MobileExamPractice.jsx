import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOfflineQuestions, subjectsList } from "../../data/offlineQuestionBank";
import Ad1 from "../../assets/edudrill_ad_1.jpg";
import Ad2 from "../../assets/edudrill_ad_2.jpg";
import Ad3 from "../../assets/edudrill_ad_3.jpg";
import Ad4 from "../../assets/edudrill_ad_4.jpg";
import Ad5 from "../../assets/edudrill_ad_5.jpg";
import Calculator from "../../components/Calculator";
import Dictionary from "../../components/Dictionary";
import { ActivationLock, FREE_SUBJECTS, isProductActivated } from "../../components/ActivationLock";
import { FaLock } from "react-icons/fa";

function MobileExamPractice() {
  const { exam } = useParams();
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


  const [isLoading, setIsLoading] = useState(false);

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
  if (!isPracticing && setupStep === 1) {
    if (subjectParam && !isProductActivated() && !FREE_SUBJECTS.includes(subjectParam)) {
       return (
         <main style={{ minHeight: '100vh', background: '#f8fafc' }}>
            <header style={{ padding: '16px', display: 'flex', background: 'rgba(255,255,255,0.9)' }}>
               <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>← Back</Link>
            </header>
            <ActivationLock isAllowed={false} />
         </main>
       )
    }

    return (
      <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '40px' }}>
        <style>{customStyles}</style>
        
        {/* Top Navbar */}
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
            ←
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
            <strong style={{ color: '#1e293b', fontSize: '16px' }}>Setup Practice</strong>
          </div>
          <div style={{ width: '24px' }} /> {/* Spacer */}
        </header>

        <div style={{ padding: '24px 16px' }}>
          
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '24px', color: '#1e293b', marginBottom: '8px', fontWeight: '800' }}>Select Subjects</h1>
            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.5' }}>
              {isJamb 
                ? "Select 3 subjects (Use of English is pre-selected)." 
                : "Select the subject you want to master."}
            </p>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <input 
              type="text" 
              placeholder="Search subjects..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '16px',
                border: '2px solid #e2e8f0',
                fontSize: '16px',
                outline: 'none',
                background: 'white'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
            {subjectsList
              .filter(sub => isJamb ? sub.id !== 'english-language' : sub.id !== 'use-of-english')
              .filter(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map(sub => {
              const isAllowed = isProductActivated() || FREE_SUBJECTS.includes(sub.id);
              const isSelected = selectedSubjects.includes(sub.id);
              const isCompulsory = isJamb && sub.id === compulsorySubject;
              return (
                <button 
                  key={sub.id}
                  onClick={() => {
                    if (!isAllowed) {
                      alert("Not yet Activated. Please activate to unlock this subject.");
                      return;
                    }
                    handleSubjectToggle(sub.id)
                  }}
                  style={{ 
                    padding: '16px', 
                    border: `2px solid ${isSelected ? '#123b72' : '#e2e8f0'}`,
                    background: !isAllowed ? '#f1f5f9' : isSelected ? '#f0f9ff' : 'white',
                    color: !isAllowed ? '#94a3b8' : '#1e293b',
                    borderRadius: '16px',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    minHeight: '64px',
                    opacity: !isAllowed ? 0.7 : 1
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: isSelected ? '700' : '500', color: !isAllowed ? '#94a3b8' : isSelected ? '#123b72' : '#1e293b' }}>{sub.name}</span>
                      {!isAllowed && <FaLock style={{ color: '#cbd5e1' }} />}
                    </div>
                    {isCompulsory && (
                      <span style={{ display: 'block', fontSize: '11px', marginTop: '4px', color: '#3b82f6', fontWeight: 'bold' }}>COMPULSORY</span>
                    )}
                    {!isAllowed && (
                      <span style={{ display: 'block', fontSize: '11px', marginTop: '4px', color: '#ef4444', fontWeight: 'bold' }}>Not yet Activated</span>
                    )}
                  </div>
                  {isAllowed && isSelected && (
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#123b72', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '12px' }}>✓</div>
                  )}
                  {isAllowed && !isSelected && (
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid #cbd5e1' }}></div>
                  )}
                </button>
              )
            })}
          </div>
          
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px', background: 'rgba(255, 255, 255, 0.95)', borderTop: '1px solid #e2e8f0' }}>
            <button 
              onClick={() => handleNextToConfig()}
              style={{ width: '100%', padding: '16px', background: '#123b72', color: 'white', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 'bold' }}
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
      <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '80px' }}>
        <style>{customStyles}</style>
        
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <button onClick={() => setSetupStep(1)} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
            ←
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
            <strong style={{ color: '#1e293b', fontSize: '16px' }}>Literature Setup</strong>
          </div>
          <div style={{ width: '24px' }} />
        </header>

        <div style={{ padding: '24px 16px' }}>
          <div style={{ marginBottom: '24px', textAlign: 'center' }}>
            <h2 style={{ color: '#1e293b', marginBottom: '8px', fontSize: '24px', fontWeight: '800' }}>Select Texts</h2>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5' }}>Choose the literature texts you want to be tested on.</p>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
            {literatureCategories.map(category => (
              <div key={category.category} style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ color: '#0f172a', fontSize: '16px', marginBottom: '16px', fontWeight: '700' }}>{category.category}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {category.texts.map(text => {
                    const isSelected = selectedLitTexts.includes(text);
                    return (
                      <button
                        key={text}
                        onClick={() => handleTextToggle(text)}
                        style={{
                          textAlign: 'left',
                          padding: '16px',
                          borderRadius: '16px',
                          border: `2px solid ${isSelected ? '#123b72' : '#e2e8f0'}`,
                          background: isSelected ? '#f0f9ff' : '#f8fafc',
                          color: '#1e293b',
                          fontWeight: isSelected ? '700' : '500',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}
                      >
                        <div style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${isSelected ? '#123b72' : '#cbd5e1'}`, background: isSelected ? '#123b72' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {isSelected && <div style={{ width: 10, height: 10, background: 'white', borderRadius: 2 }}></div>}
                        </div>
                        <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{text}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px', background: 'rgba(255, 255, 255, 0.95)', borderTop: '1px solid #e2e8f0' }}>
            <button 
              onClick={() => continueToSetup2(selectedSubjects)}
              disabled={selectedLitTexts.length === 0}
              style={{ width: '100%', padding: '16px', background: '#123b72', color: 'white', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 'bold', opacity: selectedLitTexts.length === 0 ? 0.5 : 1 }}
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
      <main style={{ minHeight: '100vh', background: '#f8fafc', paddingBottom: '80px' }}>
        <style>{customStyles}</style>
        
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderBottom: '1px solid #f1f5f9' }}>
          <button onClick={() => setSetupStep(1)} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}>
            ←
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
            <strong style={{ color: '#1e293b', fontSize: '16px' }}>Settings</strong>
          </div>
          <div style={{ width: '24px' }} />
        </header>

        <div style={{ padding: '24px 16px' }}>
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h2 style={{ color: '#1e293b', marginBottom: '8px', fontSize: '24px', fontWeight: '800' }}>Practice Settings</h2>
          </div>
          
          <div style={{ marginBottom: '32px' }}>
            <h3 style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 'bold' }}>Number of Questions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {selectedSubjects.map(sub => {
                const subName = subjectsList.find(s => s.id === sub)?.name || sub;
                let options = [10, 20, 30, 40, 50];
                return (
                  <div key={sub} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>{subName}</span>
                    <select 
                      value={questionCounts[sub]}
                      onChange={(e) => setQuestionCounts({...questionCounts, [sub]: Number(e.target.value)})}
                      style={{ padding: '8px 12px', borderRadius: '12px', border: '2px solid #e2e8f0', outline: 'none', fontWeight: 'bold', color: '#123b72', background: '#f8fafc', fontSize: '14px' }}
                    >
                      {options.map(opt => <option key={opt} value={opt}>{opt} Qs</option>)}
                    </select>
                  </div>
                )
              })}
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: '#64748b', fontSize: '14px', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 'bold' }}>Timer Duration</h3>
            <select 
              value={timerDuration}
              onChange={(e) => setTimerDuration(Number(e.target.value))}
              style={{ width: '100%', padding: '16px', borderRadius: '16px', border: '2px solid #e2e8f0', fontSize: '16px', outline: 'none', fontWeight: 'bold', color: '#123b72', background: 'white' }}
            >
              <option value={30 * 60}>30 Minutes</option>
              <option value={60 * 60}>1 Hour</option>
              <option value={90 * 60}>1 Hour 30 Minutes</option>
              <option value={120 * 60}>2 Hours</option>
            </select>
          </div>

          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px', background: 'rgba(255, 255, 255, 0.95)', borderTop: '1px solid #e2e8f0' }}>
            <button 
              onClick={startPractice}
              disabled={isLoading}
              style={{ width: '100%', padding: '16px', background: '#123b72', color: 'white', border: 'none', borderRadius: '16px', fontSize: '16px', fontWeight: 'bold', opacity: isLoading ? 0.7 : 1 }}
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
    <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#f8fafc' }}>
       <style>{customStyles}</style>
       
       <header style={{ padding: '16px', background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f1f5f9', zIndex: 50 }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
             <button 
               onClick={() => { if(window.confirm("End your practice session?")) setIsPracticing(false); }} 
               style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '24px', fontWeight: 'bold' }}
             >
               ✕
             </button>
             <div style={{ display: 'flex', flexDirection: 'column' }}>
               <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'bold' }}>{exam?.toUpperCase()}</span>
               <span style={{ fontSize: '14px', color: '#1e293b', fontWeight: '800' }}>Practice</span>
             </div>
           </div>
           
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {(exam === 'jamb' || ['General Mathematics', 'Further Mathematics', 'Physics', 'Chemistry', 'Geography'].includes(currentQ?.subjectName)) && (
                <button 
                  onClick={() => setShowCalculator(!showCalculator)} 
                  style={{ background: '#f1f5f9', border: 'none', color: '#1e293b', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  🖩
                </button>
              )}

              {(exam === 'jamb' || currentQ?.subjectName === 'English Language' || currentQ?.subjectName === 'Use of English') && (
                <button 
                  onClick={() => setShowDictionary(!showDictionary)} 
                  style={{ background: '#f1f5f9', border: 'none', color: '#1e293b', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  📖
                </button>
              )}
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: timeLeft < 300 ? '#fee2e2' : '#f0f9ff', padding: '8px 12px', borderRadius: '16px' }}>
               <span style={{ fontSize: '16px' }}>⏱️</span>
               <span style={{ fontSize: '14px', fontWeight: '800', color: timeLeft < 300 ? '#ef4444' : '#123b72', fontFamily: 'monospace' }}>
                 {formatTime(timeLeft)}
               </span>
             </div>
           </div>
       </header>
       
       <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflow: 'hidden' }}>
         
         {/* Sub-header navigation (Subjects) */}
         {isJamb && examSubjects.length > 1 && (
            <div style={{ display: 'flex', overflowX: 'auto', padding: '12px 16px', gap: '8px', background: 'white', borderBottom: '1px solid #f1f5f9', flexShrink: 0 }} className="hide-scrollbar">
              {examSubjects.map(sub => {
                const firstIndex = questions.findIndex(q => q.subjectName === sub);
                const isActive = sub === currentSubject;
                return (
                  <button
                    key={sub}
                    onClick={() => setCurrentIndex(firstIndex)}
                    style={{
                      padding: '8px 16px',
                      background: isActive ? '#123b72' : '#f1f5f9',
                      color: isActive ? 'white' : '#64748b',
                      border: 'none',
                      borderRadius: '20px',
                      fontWeight: '700',
                      fontSize: '12px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {sub}
                  </button>
                )
              })}
            </div>
          )}

         {/* Main Question Area */}
         <div style={{ flex: 1, padding: '24px 16px 120px 16px', overflowY: 'auto' }}>
            <div style={{ background: 'white', padding: '24px', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)', marginBottom: '24px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ background: '#f0f9ff', color: '#123b72', padding: '6px 12px', borderRadius: '12px', fontWeight: '700', fontSize: '12px' }}>Q {localIndex + 1} / {totalInSubject}</span>
                  {currentQ?.litText && (
                    <span style={{ background: '#e0e7ff', color: '#3730a3', padding: '6px 12px', borderRadius: '12px', fontWeight: '700', fontSize: '12px' }}>{currentQ.litText}</span>
                  )}
                </div>
              </div>
              
              <p style={{ fontSize: '16px', margin: '0 0 24px 0', color: '#1e293b', lineHeight: 1.6, fontWeight: '600' }}>{currentQ?.question}</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {currentQ?.options?.map((opt, i) => {
                   const letter = optionLetters[i];
                   const isSelected = userAnswers[currentIndex] === opt;
                   
                   return (
                     <button key={i} onClick={() => handleAnswerSelect(currentIndex, opt)} style={{ 
                       padding: '16px', 
                       background: isSelected ? '#f0f9ff' : 'white', 
                       color: isSelected ? '#123b72' : '#475569', 
                       borderRadius: '16px', 
                       display: 'flex', 
                       alignItems: 'center', 
                       border: `2px solid ${isSelected ? '#123b72' : '#e2e8f0'}`,
                       fontSize: '15px',
                       textAlign: 'left'
                     }}>
                        <span style={{ 
                          fontWeight: '800', 
                          marginRight: '16px', 
                          width: '28px', 
                          height: '28px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center', 
                          background: isSelected ? '#123b72' : '#f1f5f9', 
                          borderRadius: '8px', 
                          color: isSelected ? 'white' : '#64748b',
                          flexShrink: 0
                        }}>
                          {letter}
                        </span>
                        <span style={{ lineHeight: 1.4 }}>{opt}</span>
                     </button>
                   )
                })}
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}>
                <button 
                  onClick={() => toggleReveal(currentIndex)}
                  style={{ padding: '10px 20px', background: isRevealed ? '#f1f5f9' : '#123b72', color: isRevealed ? '#64748b' : 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '13px' }}
                >
                  {isRevealed ? "Hide Answer" : "Show Answer"}
                </button>
              </div>

              {isRevealed && (
                <div style={{ marginTop: '16px', padding: '16px', background: '#ecfdf5', borderRadius: '16px', border: '1px solid #a7f3d0' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>✓</div>
                    <span style={{ color: '#047857', fontWeight: 'bold', fontSize: '12px', letterSpacing: '0.5px' }}>CORRECT ANSWER</span>
                  </div>
                  <div style={{ color: '#065f46', fontSize: '15px', fontWeight: '600', marginLeft: '26px' }}>
                    {currentQ?.answer}
                  </div>
                </div>
              )}
           </div>
         </div>
       </div>
       
       {/* Bottom Navigation */}
       <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', borderTop: '1px solid #e2e8f0', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 40 }}>
          <button 
            onClick={goPrev} 
            disabled={currentIndex === 0}
            style={{ width: '48px', height: '48px', borderRadius: '16px', background: currentIndex === 0 ? '#f1f5f9' : 'white', border: `2px solid ${currentIndex === 0 ? '#e2e8f0' : '#cbd5e1'}`, color: currentIndex === 0 ? '#94a3b8' : '#1e293b', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ←
          </button>
          
          <button 
            onClick={() => setShowMobileNav(true)}
            style={{ padding: '12px 24px', borderRadius: '16px', background: '#f1f5f9', border: 'none', color: '#1e293b', fontWeight: '700', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Q {currentIndex + 1}/{questions.length}</span>
            <span>☰</span>
          </button>

          <button 
            onClick={goNext} 
            disabled={currentIndex === questions.length - 1}
            style={{ width: '48px', height: '48px', borderRadius: '16px', background: currentIndex === questions.length - 1 ? '#f1f5f9' : '#123b72', border: 'none', color: currentIndex === questions.length - 1 ? '#94a3b8' : 'white', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            →
          </button>
       </div>

       {/* Mobile Question Navigator Overlay */}
       {showMobileNav && (
         <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 100, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
           <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)' }} onClick={() => setShowMobileNav(false)}></div>
           
           <div style={{ background: 'white', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', position: 'relative', padding: '24px' }}>
             <div style={{ width: '40px', height: '6px', background: '#e2e8f0', borderRadius: '3px', margin: '0 auto 16px' }}></div>
             
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
               <h3 style={{ margin: 0, color: '#1e293b', fontSize: '18px', fontWeight: '800' }}>Questions Map</h3>
               <button onClick={() => setShowMobileNav(false)} style={{ background: 'transparent', border: 'none', fontSize: '24px', color: '#64748b' }}>×</button>
             </div>
             
             <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', fontSize: '12px', fontWeight: '600' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 12, height: 12, borderRadius: 4, background: '#123b72' }}></div> <span style={{color: '#1e293b'}}>Done</span></div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 12, height: 12, borderRadius: 4, background: '#e0e7ff' }}></div> <span style={{color: '#1e293b'}}>Seen</span></div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: 12, height: 12, borderRadius: 4, border: '1px solid #cbd5e1' }}></div> <span style={{color: '#64748b'}}>Skip</span></div>
             </div>

             <div style={{ overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
                {currentSubjectQuestions.map((item, localIdx) => {
                  const i = item.index;
                  const isAnswered = !!userAnswers[i];
                  const isVisited = !!visited[i];
                  const isCurrent = i === currentIndex;
                  
                  let bg = 'white';
                  let color = '#64748b';
                  let border = '1px solid #e2e8f0';
                  
                  if (isAnswered) {
                    bg = '#123b72';
                    color = 'white';
                    border = '1px solid #123b72';
                  } else if (isVisited) {
                    bg = '#e0e7ff';
                    color = '#1e293b';
                    border = '1px solid #c7d2fe';
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => { setCurrentIndex(i); setShowMobileNav(false); }}
                      style={{
                        aspectRatio: '1',
                        background: bg,
                        color: color,
                        border: border,
                        borderRadius: '10px',
                        fontWeight: '700',
                        fontSize: '13px',
                        outline: isCurrent ? '2px solid #3b82f6' : 'none',
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
       )}

       {showCalculator && <Calculator onClose={() => setShowCalculator(false)} />}
       {showDictionary && <Dictionary onClose={() => setShowDictionary(false)} />}
    </main>
  );
}

export default MobileExamPractice;
