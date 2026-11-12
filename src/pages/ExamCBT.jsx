import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getOfflineQuestions, subjectsList } from "../data/offlineQuestionBank";
import Ad1 from "../assets/edudrill_ad_1.jpg";
import Ad2 from "../assets/edudrill_ad_2.jpg";
import Ad3 from "../assets/edudrill_ad_3.jpg";
import Ad4 from "../assets/edudrill_ad_4.jpg";
import Ad5 from "../assets/edudrill_ad_5.jpg";

import Calculator from "../components/Calculator";
import Dictionary from "../components/Dictionary";
import { isProductActivated, FREE_SUBJECTS } from "../components/ActivationLock";
import { FaLock, FaCheck, FaCalculator, FaBook, FaClock, FaArrowLeft, FaArrowRight, FaQuestionCircle, FaTrophy, FaCheckCircle, FaTimesCircle, FaExclamationTriangle } from "react-icons/fa";

import useMobile from "../hooks/useMobile";
import { getUserIdentifier } from "../utils/userScope";
import MobileExamCBT from "./mobile/MobileExamCBT";

function ExamCBTDesktop() {
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
  }, [isStarted, adImages.length]);

  // Senior Educational Design Tokens (Strictly brand-aligned with high WCAG AAA contrast)
  const theme = {
    navyDark: "#0B2144",
    navyBrand: "#123B72",
    navySoft: "#1E3A8A",
    blueAccent: "#2563EB",
    blueLight: "#EFF6FF",
    blueBorder: "#BFDBFE",
    amberGold: "#D97706",
    amberLight: "#FEF3C7",
    emeraldGreen: "#16A34A",
    emeraldLight: "#DCFCE7",
    crimsonAlert: "#DC2626",
    crimsonLight: "#FEE2E2",
    canvasBg: "#F8FAFC",
    surface: "#FFFFFF",
    textPrimary: "#0F172A",
    textSecondary: "#475569",
    textMuted: "#64748B",
    borderLight: "#E2E8F0",
    borderMedium: "#CBD5E1"
  };

  const customStyles = `
    .edudrill-card {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      box-shadow: 0 4px 16px -2px rgba(11, 33, 68, 0.06);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .edudrill-btn {
      transition: all 0.15s ease-in-out;
      user-select: none;
    }
    .edudrill-btn:active {
      transform: scale(0.98);
    }
    .option-card {
      transition: all 0.15s ease-in-out;
      user-select: none;
    }
    .option-card:hover {
      border-color: #93C5FD !important;
      background: #F8FAFC !important;
    }
    .option-card.selected {
      border-color: #2563EB !important;
      background: #EFF6FF !important;
      box-shadow: 0 4px 14px -2px rgba(37, 99, 235, 0.15);
    }
    .nav-grid-btn {
      transition: all 0.15s ease-in-out;
    }
    .nav-grid-btn:hover {
      transform: translateY(-1px);
    }
    .kbd-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 26px;
      height: 24px;
      padding: 0 6px;
      font-size: 11px;
      font-weight: 700;
      color: #1E3A8A;
      background: #EFF6FF;
      border: 1px solid #BFDBFE;
      border-radius: 6px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }
    @keyframes pulseCritical {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.85; transform: scale(1.02); }
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

    const subName = subjectsList.find(s => s.id === sub)?.name || sub;
    return getOfflineQuestions(sub, count).map(q => ({...q, subjectName: subName}));
  };

  const handleNextToConfig = (forceSubject = null) => {
    let subjectsToUse = forceSubject ? [forceSubject] : selectedSubjects;
    if (!forceSubject) {
      if (isJamb && subjectsToUse.length !== 4) {
        alert("Please select exactly 4 subjects (including Use of English) for full JAMB examination simulation.");
        return;
      }
      if (!isJamb && subjectsToUse.length === 0) {
        alert("Please select a subject for your CBT session.");
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
    setUserAnswers({});
    setVisited({});
    setIsSubmitted(false);
    setShowResults(false);
    setCurrentIndex(0);
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
    setShowResults(true);

    try {
      const stats = calculateDetailedScore();
      const subjectName = isJamb ? 'JAMB Full Mock' : (questions[0]?.subjectName || 'Mock Exam');
      const percentage = stats.percentage;
      const score = stats.totalScore;
      const maxScore = stats.maxScore;

      if (window.electronAPI && window.electronAPI.savePerformance) {
        await window.electronAPI.savePerformance({
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
          detailed_responses: JSON.stringify(stats.detailedResponses),
          user_id: getUserIdentifier()
        });
        return;
      }

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
          detailed_responses: stats.detailedResponses,
          user_id: getUserIdentifier()
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
    if (isStarted && !isSubmitted) {
      if (timeLeft > 0) {
        const timerId = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timerId);
      } else if (timeLeft === 0) {
        handleConfirmSubmit();
      }
    }
  }, [isStarted, isSubmitted, timeLeft]);

  // Authentic 8-Key JAMB Navigation (A, B, C, D, P, N, S, Y, R)
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
  }

  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}h ${m < 10 ? '0': ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
    return `${m < 10 ? '0': ''}${m}m ${s < 10 ? '0' : ''}${s}s`;
  };

  // SETUP VIEW 1 (Subject Selection)
  if (!isStarted && setupStep === 1) {
    const isJambReady = isJamb && selectedSubjects.length === 4;
    const isNonJambReady = !isJamb && selectedSubjects.length > 0;
    const isReadyToProceed = isJamb ? isJambReady : isNonJambReady;

    return (
      <main style={{ minHeight: '100vh', background: theme.canvasBg, fontFamily: "'Inter', sans-serif", color: theme.textPrimary, display: 'flex', flexDirection: 'column' }}>
        <style>{customStyles}</style>
        
        {/* Top Header */}
        <header style={{ height: '70px', padding: '0 5%', background: theme.surface, borderBottom: `1px solid ${theme.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(11,33,68,0.04)' }}>
          <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', border: `1px solid ${theme.borderLight}` }}>
              <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <strong style={{ display: 'block', color: theme.navyDark, fontSize: '18px', fontWeight: '800' }}>EduDrill</strong>
              <span style={{ fontSize: '12px', color: theme.blueAccent, fontWeight: '700', letterSpacing: '0.5px' }}>{exam?.toUpperCase()} CBT SIMULATOR</span>
            </div>
          </Link>

          <Link to={`/dashboard/${exam}`} className="edudrill-btn" style={{ color: theme.textSecondary, textDecoration: 'none', fontWeight: '600', padding: '10px 18px', borderRadius: '10px', border: `1px solid ${theme.borderMedium}`, background: theme.surface, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaArrowLeft style={{ fontSize: '12px' }} /> Return to Dashboard
          </Link>
        </header>

        {/* Content Box */}
        <div style={{ maxWidth: 1080, width: '92%', margin: '40px auto 60px' }}>
          
          {/* Banner & Ad Carousel */}
          <div style={{ display: 'flex', gap: '32px', alignItems: 'center', marginBottom: '36px', background: theme.surface, padding: '32px 36px', borderRadius: 20, border: `1px solid ${theme.borderLight}`, boxShadow: '0 4px 20px -2px rgba(11,33,68,0.04)' }}>
            <div style={{ flex: '1 1 500px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', background: theme.blueLight, color: theme.blueAccent, borderRadius: 20, fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '14px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: theme.blueAccent }}></span>
                Official Examination Simulation
              </div>
              <h1 style={{ color: theme.navyDark, fontSize: '32px', fontWeight: '800', margin: '0 0 12px 0', lineHeight: 1.25 }}>
                {isJamb ? 'JAMB UTME CBT Simulator' : `${exam?.toUpperCase()} CBT Mock Exam`}
              </h1>
              <p style={{ color: theme.textSecondary, fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
                {isJamb 
                  ? "Experience the authentic JAMB computer test environment. Pick your 3 chosen subjects to pair with compulsory Use of English for a complete 180-question mock." 
                  : "Prepare under actual exam conditions with timed question sets, instant grading, and detailed syllabus analysis."}
              </p>
              
              <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ padding: '8px 16px', background: theme.canvasBg, border: `1px solid ${theme.borderLight}`, borderRadius: 10, fontSize: '14px', fontWeight: '700', color: theme.navyDark }}>
                  Selected: <span style={{ color: theme.blueAccent }}>{selectedSubjects.length} {isJamb ? '/ 4' : 'Subject'}</span>
                </div>
                {isJamb && selectedSubjects.length < 4 && (
                  <span style={{ fontSize: '13px', color: theme.amberGold, fontWeight: '600' }}>
                    Select {4 - selectedSubjects.length} more subject{4 - selectedSubjects.length > 1 ? 's' : ''} to begin
                  </span>
                )}
              </div>
            </div>

            <div style={{ flex: '0 0 320px', position: 'relative', height: '180px' }}>
              {adImages.map((img, idx) => (
                <img 
                  key={idx}
                  src={img} 
                  alt={`EduDrill Spotlight ${idx + 1}`} 
                  style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%', 
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '16px', 
                    boxShadow: '0 10px 25px -5px rgba(11, 33, 68, 0.1)', 
                    border: `1px solid ${theme.borderLight}`,
                    opacity: currentAd === idx ? 1 : 0,
                    transition: 'opacity 0.8s ease-in-out'
                  }} 
                />
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div style={{ marginBottom: '24px', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search by subject name (e.g. Mathematics, Biology, Economics)..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 20px',
                paddingLeft: '48px',
                borderRadius: '14px',
                border: `2px solid ${theme.borderLight}`,
                fontSize: '16px',
                background: theme.surface,
                color: theme.textPrimary,
                outline: 'none',
                transition: 'border-color 0.2s',
                boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
              }}
              onFocus={(e) => e.target.style.borderColor = theme.blueAccent}
              onBlur={(e) => e.target.style.borderColor = theme.borderLight}
            />
            <span style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: theme.textMuted, fontSize: '18px' }}>🔍</span>
          </div>

          {/* Subjects Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px', marginBottom: '36px' }}>
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
                      alert("This subject requires an activated EduDrill product key. Please activate your product.");
                      return;
                    }
                    handleSubjectToggle(sub.id);
                  }}
                  onDoubleClick={() => {
                    if (!isAllowed) return;
                    if (!isCompulsory) handleNextToConfig(sub.id);
                  }}
                  className="edudrill-card edudrill-btn"
                  style={{ 
                    padding: '20px', 
                    border: `2px solid ${isSelected ? theme.blueAccent : theme.borderLight}`,
                    background: !isAllowed ? '#F1F5F9' : isSelected ? theme.blueLight : theme.surface,
                    color: !isAllowed ? '#94A3B8' : theme.navyDark,
                    borderRadius: 16,
                    cursor: !isAllowed ? 'not-allowed' : isCompulsory ? 'default' : 'pointer',
                    textAlign: 'left',
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '92px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '16px', fontWeight: isSelected ? '700' : '600', color: isSelected ? theme.navySoft : theme.navyDark }}>{sub.name}</span>
                    {!isAllowed ? (
                      <FaLock style={{ color: '#94A3B8', fontSize: '14px' }} />
                    ) : isSelected ? (
                      <div style={{ width: 22, height: 22, borderRadius: '50%', background: theme.blueAccent, color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>
                        <FaCheck />
                      </div>
                    ) : null}
                  </div>
                  
                  <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {isCompulsory && (
                      <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: 6, background: theme.blueAccent, color: '#FFF', fontWeight: '800', letterSpacing: '0.5px' }}>
                        COMPULSORY
                      </span>
                    )}
                    {!isAllowed && (
                      <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: 6, background: '#FEE2E2', color: theme.crimsonAlert, fontWeight: '700' }}>
                        Locked (Requires Key)
                      </span>
                    )}
                    {isSelected && !isCompulsory && (
                      <span style={{ fontSize: '12px', color: theme.blueAccent, fontWeight: '700' }}>
                        ✓ Selected
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          {/* Action Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', alignItems: 'center' }}>
            <button 
              className="edudrill-btn"
              onClick={() => handleNextToConfig()}
              disabled={!isReadyToProceed}
              style={{ 
                padding: '18px 48px', 
                background: isReadyToProceed ? theme.amberGold : '#CBD5E1', 
                color: '#FFFFFF', 
                border: 'none', 
                borderRadius: 14, 
                cursor: isReadyToProceed ? 'pointer' : 'not-allowed', 
                fontSize: '18px', 
                fontWeight: '800',
                boxShadow: isReadyToProceed ? '0 8px 20px -4px rgba(217, 119, 6, 0.4)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              Configure CBT Parameters <FaArrowRight style={{ fontSize: '15px' }} />
            </button>
          </div>

        </div>
      </main>
    );
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
      <main style={{ minHeight: '100vh', background: theme.canvasBg, fontFamily: "'Inter', sans-serif", color: theme.textPrimary }}>
        <style>{customStyles}</style>
        
        <header style={{ height: '70px', padding: '0 5%', background: theme.surface, borderBottom: `1px solid ${theme.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', border: `1px solid ${theme.borderLight}` }}>
              <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <strong style={{ display: 'block', color: theme.navyDark, fontSize: '18px', fontWeight: '800' }}>EduDrill</strong>
              <span style={{ fontSize: '12px', color: theme.blueAccent, fontWeight: '700', letterSpacing: '0.5px' }}>LITERATURE IN ENGLISH</span>
            </div>
          </Link>
          <button onClick={() => setSetupStep(1)} className="edudrill-btn" style={{ color: theme.textSecondary, fontWeight: '600', padding: '10px 18px', borderRadius: '10px', border: `1px solid ${theme.borderMedium}`, background: theme.surface, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaArrowLeft style={{ fontSize: '12px' }} /> Back to Subjects
          </button>
        </header>

        <div style={{ maxWidth: 960, width: '92%', margin: '40px auto 60px', background: theme.surface, padding: '40px', borderRadius: 20, border: `1px solid ${theme.borderLight}`, boxShadow: '0 4px 20px -2px rgba(11,33,68,0.06)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span style={{ fontSize: '12px', padding: '4px 12px', background: theme.blueLight, color: theme.blueAccent, borderRadius: 20, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Curriculum Texts
            </span>
            <h2 style={{ color: theme.navyDark, fontSize: '28px', fontWeight: '800', margin: '12px 0 8px 0' }}>Select Prescribed Literature Texts</h2>
            <p style={{ color: theme.textSecondary, fontSize: '15px', maxWidth: 600, margin: '0 auto' }}>
              Select the drama, prose, and poetry texts you want included in your test questions. You can choose any combination.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px', marginBottom: '36px' }}>
            {literatureCategories.map(category => (
              <div key={category.category} style={{ background: theme.canvasBg, padding: '20px', borderRadius: '16px', border: `1px solid ${theme.borderLight}` }}>
                <h3 style={{ color: theme.navyDark, fontSize: '15px', fontWeight: '700', marginBottom: '14px', paddingBottom: '8px', borderBottom: `1px solid ${theme.borderMedium}` }}>{category.category}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {category.texts.map(text => {
                    const isSelected = selectedLitTexts.includes(text);
                    return (
                      <button
                        key={text}
                        onClick={() => handleTextToggle(text)}
                        className="edudrill-btn"
                        style={{
                          textAlign: 'left',
                          padding: '12px 16px',
                          borderRadius: '10px',
                          border: `2px solid ${isSelected ? theme.blueAccent : theme.borderLight}`,
                          background: isSelected ? theme.blueLight : theme.surface,
                          color: isSelected ? theme.navySoft : theme.textPrimary,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontWeight: isSelected ? '700' : '500',
                          fontSize: '14px'
                        }}
                      >
                        <span>{text}</span>
                        {isSelected && <FaCheck style={{ color: theme.blueAccent, fontSize: '12px' }} />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              className="edudrill-btn"
              onClick={() => continueToSetup2()}
              style={{ padding: '16px 48px', background: theme.amberGold, color: '#FFF', border: 'none', borderRadius: 12, cursor: 'pointer', fontSize: '17px', fontWeight: '800', boxShadow: '0 8px 20px -4px rgba(217, 119, 6, 0.4)' }}
            >
              Continue to CBT Parameters →
            </button>
          </div>
        </div>
      </main>
    );
  }

  // SETUP VIEW 2 (Question Counts & Timers)
  if (!isStarted && setupStep === 2) {
    return (
      <main style={{ minHeight: '100vh', background: theme.canvasBg, fontFamily: "'Inter', sans-serif", color: theme.textPrimary }}>
        <style>{customStyles}</style>
        
        <header style={{ height: '70px', padding: '0 5%', background: theme.surface, borderBottom: `1px solid ${theme.borderLight}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link to={`/dashboard/${exam}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', border: `1px solid ${theme.borderLight}` }}>
              <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div>
              <strong style={{ display: 'block', color: theme.navyDark, fontSize: '18px', fontWeight: '800' }}>EduDrill</strong>
              <span style={{ fontSize: '12px', color: theme.blueAccent, fontWeight: '700', letterSpacing: '0.5px' }}>{exam?.toUpperCase()} CBT SETTINGS</span>
            </div>
          </Link>
          <button onClick={() => setSetupStep(1)} className="edudrill-btn" style={{ color: theme.textSecondary, fontWeight: '600', padding: '10px 18px', borderRadius: '10px', border: `1px solid ${theme.borderMedium}`, background: theme.surface, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaArrowLeft style={{ fontSize: '12px' }} /> Back to Subjects
          </button>
        </header>

        <div style={{ maxWidth: 840, width: '92%', margin: '40px auto 60px', background: theme.surface, padding: '44px', borderRadius: 20, border: `1px solid ${theme.borderLight}`, boxShadow: '0 4px 20px -2px rgba(11,33,68,0.06)' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span style={{ fontSize: '12px', padding: '4px 12px', background: theme.blueLight, color: theme.blueAccent, borderRadius: 20, fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Step 2 of 2
            </span>
            <h2 style={{ color: theme.navyDark, fontSize: '30px', fontWeight: '800', margin: '12px 0 8px 0' }}>Configure Examination Parameters</h2>
            <p style={{ color: theme.textSecondary, fontSize: '16px', margin: 0 }}>
              Verify test length and official duration before starting your CBT session.
            </p>
          </div>

          <div style={{ marginBottom: '36px' }}>
            <h3 style={{ color: theme.navyDark, fontSize: '18px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaQuestionCircle style={{ color: theme.blueAccent }} /> Number of Questions per Subject
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {selectedSubjects.map(sub => {
                const subName = subjectsList.find(s => s.id === sub)?.name || sub;
                const isEng = sub === 'use-of-english' || sub === 'english-language';
                const options = isJamb ? (isEng ? [60] : [40]) : [20, 30, 40, 50, 60];
                
                return (
                  <div key={sub} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: theme.canvasBg, borderRadius: '14px', border: `1px solid ${theme.borderLight}` }}>
                    <div>
                      <strong style={{ color: theme.navyDark, fontSize: '16px' }}>{subName}</strong>
                      {isJamb && <span style={{ marginLeft: '10px', fontSize: '12px', color: theme.textMuted }}>JAMB Standard Requirement</span>}
                    </div>
                    <select 
                      value={questionCounts[sub] || options[0]}
                      onChange={(e) => setQuestionCounts({...questionCounts, [sub]: Number(e.target.value)})}
                      style={{ padding: '10px 16px', borderRadius: '10px', border: `2px solid ${theme.borderMedium}`, outline: 'none', fontWeight: '700', color: theme.navyDark, fontSize: '15px', background: theme.surface, cursor: 'pointer' }}
                    >
                      {options.map(opt => <option key={opt} value={opt}>{opt} Questions</option>)}
                    </select>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ color: theme.navyDark, fontSize: '18px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FaClock style={{ color: theme.blueAccent }} /> Examination Duration
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
              {[
                { label: '30 Minutes', secs: 30 * 60 },
                { label: '1 Hour', secs: 60 * 60 },
                { label: '1 Hr 30 Min', secs: 90 * 60 },
                { label: '2 Hours (JAMB Standard)', secs: 120 * 60 }
              ].map(t => {
                const isSelected = timerDuration === t.secs;
                return (
                  <button
                    key={t.secs}
                    type="button"
                    onClick={() => setTimerDuration(t.secs)}
                    className="edudrill-btn"
                    style={{
                      padding: '16px',
                      borderRadius: '12px',
                      border: `2px solid ${isSelected ? theme.blueAccent : theme.borderMedium}`,
                      background: isSelected ? theme.blueLight : theme.surface,
                      color: isSelected ? theme.navySoft : theme.textPrimary,
                      fontWeight: '700',
                      fontSize: '15px',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button 
              className="edudrill-btn"
              onClick={startCBT}
              disabled={isLoading}
              style={{ 
                padding: '18px 48px', 
                background: theme.amberGold, 
                color: '#FFF', 
                border: 'none', 
                borderRadius: 14, 
                cursor: isLoading ? 'not-allowed' : 'pointer', 
                fontSize: '19px', 
                fontWeight: '800', 
                width: '100%', 
                opacity: isLoading ? 0.7 : 1,
                boxShadow: '0 8px 24px -4px rgba(217, 119, 6, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
            >
              {isLoading ? 'Loading Test Engine...' : 'Launch Official CBT Simulation →'}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // PERFORMANCE RESULTS SCREEN
  if (isSubmitted && showResults) {
    const stats = calculateDetailedScore();
    const timeUsed = timerDuration - timeLeft;
    const avgTime = Math.round(timeUsed / (questions.length || 1)) || 0;

    return (
      <main style={{ minHeight: '100vh', background: theme.canvasBg, fontFamily: "'Inter', sans-serif", color: theme.textPrimary, padding: '40px 5%' }}>
        <style>{customStyles}</style>
        
        <div style={{ maxWidth: 1040, margin: '0 auto', background: theme.surface, borderRadius: 24, overflow: 'hidden', border: `1px solid ${theme.borderLight}`, boxShadow: '0 12px 36px -4px rgba(11, 33, 68, 0.08)' }}>
          
          {/* Header */}
          <div style={{ padding: '36px 40px', textAlign: 'center', borderBottom: `1px solid ${theme.borderLight}`, background: theme.canvasBg }}>
            <span style={{ fontSize: '12px', padding: '4px 14px', background: theme.blueLight, color: theme.blueAccent, borderRadius: 20, fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Official CBT Scorecard
            </span>
            <h1 style={{ color: theme.navyDark, margin: '12px 0 6px 0', fontSize: '32px', fontWeight: '800' }}>
              Performance Result
            </h1>
            <p style={{ color: theme.textSecondary, margin: 0, fontSize: '16px' }}>
              {exam?.toUpperCase()} Examination Mock {isJamb ? '(Official UTME Format)' : ''}
            </p>
          </div>
          
          <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '36px' }}>
            
            {/* Primary Scores Grid */}
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              
              {/* Aggregate Score Card */}
              <div style={{ flex: '1 1 320px', background: theme.navyDark, color: '#FFFFFF', borderRadius: 20, padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 10px 25px -5px rgba(11, 33, 68, 0.25)' }}>
                <span style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', color: '#93C5FD', fontWeight: '700' }}>
                  Aggregate Score
                </span>
                <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '12px' }}>
                  <span style={{ fontSize: '64px', fontWeight: '900', lineHeight: 1 }}>{stats.totalScore}</span>
                  <span style={{ fontSize: '24px', opacity: 0.7, marginLeft: '8px' }}>/ {stats.maxScore}</span>
                </div>
                <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FaTrophy style={{ color: theme.amberGold }} />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: stats.percentage >= 60 ? '#86EFAC' : '#FDE047' }}>
                    {stats.percentage >= 70 ? 'Distinction / High UTME Tier' : stats.percentage >= 50 ? 'Above Average Score' : 'Targeted Revision Recommended'}
                  </span>
                </div>
              </div>

              {/* Percentage Gauge */}
              <div style={{ flex: '1 1 320px', background: theme.surface, border: `2px solid ${theme.borderLight}`, borderRadius: 20, padding: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'relative', width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={theme.canvasBg} strokeWidth="3.5" />
                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke={stats.percentage >= 50 ? theme.emeraldGreen : theme.crimsonAlert} strokeWidth="3.5" strokeDasharray={`${stats.percentage}, 100`} strokeLinecap="round" />
                  </svg>
                  <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '34px', fontWeight: '900', color: theme.navyDark }}>{stats.percentage}%</span>
                  </div>
                </div>
                <h3 style={{ marginTop: '18px', color: theme.navyDark, fontSize: '17px', fontWeight: '800' }}>Overall Accuracy</h3>
              </div>
            </div>

            {/* Metrics Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
              <div style={{ background: theme.canvasBg, borderRadius: 16, padding: '20px 24px', border: `1px solid ${theme.borderLight}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: theme.textSecondary, fontWeight: '700', fontSize: '14px' }}>✓ Correct Answers</span>
                  <span style={{ background: theme.emeraldLight, color: theme.emeraldGreen, padding: '4px 10px', borderRadius: 8, fontWeight: '800', fontSize: '14px' }}>{stats.totalCorrect}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ color: theme.textSecondary, fontWeight: '700', fontSize: '14px' }}>✗ Wrong Answers</span>
                  <span style={{ background: theme.crimsonLight, color: theme.crimsonAlert, padding: '4px 10px', borderRadius: 8, fontWeight: '800', fontSize: '14px' }}>{stats.totalWrong}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: theme.textSecondary, fontWeight: '700', fontSize: '14px' }}>○ Unanswered</span>
                  <span style={{ background: '#F1F5F9', color: theme.textMuted, padding: '4px 10px', borderRadius: 8, fontWeight: '800', fontSize: '14px' }}>{stats.totalUnanswered}</span>
                </div>
              </div>

              <div style={{ background: theme.canvasBg, borderRadius: 16, padding: '20px', border: `1px solid ${theme.borderLight}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ color: theme.textMuted, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '700' }}>Total Time Used</span>
                <span style={{ color: theme.navyDark, fontSize: '28px', fontWeight: '900', marginTop: '6px' }}>{formatTime(timeUsed)}</span>
              </div>

              <div style={{ background: theme.canvasBg, borderRadius: 16, padding: '20px', border: `1px solid ${theme.borderLight}`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                <span style={{ color: theme.textMuted, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '700' }}>Average Speed</span>
                <span style={{ color: theme.navyDark, fontSize: '28px', fontWeight: '900', marginTop: '6px' }}>{avgTime}s</span>
                <span style={{ color: theme.textMuted, fontSize: '13px', marginTop: '2px' }}>per question</span>
              </div>
            </div>

            {/* Subject Breakdown Bars */}
            <div>
              <h3 style={{ color: theme.navyDark, marginBottom: '20px', fontSize: '19px', fontWeight: '800' }}>Subject Performance Breakdown</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {stats.subjectStats.map((s, i) => (
                  <div key={i} style={{ background: theme.canvasBg, padding: '20px 24px', borderRadius: 16, border: `1px solid ${theme.borderLight}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontWeight: '800', color: theme.navyDark, textTransform: 'capitalize', fontSize: '16px' }}>{s.subject.replace(/-/g, ' ')}</span>
                      <span style={{ fontWeight: '800', color: theme.navyBrand, fontSize: '16px' }}>{isJamb ? `${s.jambScore} / 100` : `${s.correct} / ${s.total}`} ({s.percent}%)</span>
                    </div>
                    <div style={{ width: '100%', height: '10px', background: theme.borderLight, borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${s.percent}%`, height: '100%', background: s.percent >= 50 ? theme.emeraldGreen : theme.crimsonAlert, borderRadius: '6px', transition: 'width 0.8s ease-out' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Table */}
            <div>
              <h3 style={{ color: theme.navyDark, marginBottom: '16px', fontSize: '19px', fontWeight: '800' }}>Performance Matrix</h3>
              <div style={{ overflowX: 'auto', borderRadius: 14, border: `1px solid ${theme.borderLight}` }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: theme.surface }}>
                  <thead>
                    <tr style={{ background: theme.canvasBg, color: theme.navyDark }}>
                      <th style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}`, fontSize: '14px', fontWeight: '800' }}>Subject</th>
                      <th style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}`, fontSize: '14px', fontWeight: '800' }}>Total Questions</th>
                      <th style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}`, fontSize: '14px', fontWeight: '800' }}>Correct Answers</th>
                      {isJamb && <th style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}`, fontSize: '14px', fontWeight: '800' }}>JAMB Scaled Score (100)</th>}
                      <th style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}`, fontSize: '14px', fontWeight: '800' }}>Percentage</th>
                      <th style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}`, fontSize: '14px', fontWeight: '800' }}>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.subjectStats.map((s, i) => (
                      <tr key={i}>
                        <td style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}`, textTransform: 'capitalize', fontWeight: '700', color: theme.navyDark }}>{s.subject.replace(/-/g, ' ')}</td>
                        <td style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}`, color: theme.textSecondary }}>{s.total}</td>
                        <td style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}`, color: theme.emeraldGreen, fontWeight: '800' }}>{s.correct}</td>
                        {isJamb && <td style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}`, color: theme.navyDark, fontWeight: '800' }}>{s.jambScore}</td>}
                        <td style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}`, color: theme.textPrimary, fontWeight: '700' }}>{s.percent}%</td>
                        <td style={{ padding: '14px 20px', borderBottom: `1px solid ${theme.borderLight}` }}>
                          <span style={{ padding: '4px 10px', borderRadius: 8, fontSize: '12px', fontWeight: '800', background: s.percent >= 50 ? theme.emeraldLight : theme.crimsonLight, color: s.percent >= 50 ? theme.emeraldGreen : theme.crimsonAlert }}>
                            {s.percent >= 70 ? 'Excellent' : s.percent >= 50 ? 'Credit Pass' : 'Needs Practice'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Smart Study Recommendations */}
            {(() => {
              let strongest = stats.subjectStats[0];
              let weakest = stats.subjectStats[0];
              stats.subjectStats.forEach(s => {
                if (s.percent > strongest.percent) strongest = s;
                if (s.percent < weakest.percent) weakest = s;
              });

              return (
                <div style={{ background: theme.navyDark, borderRadius: 20, padding: '36px', color: '#FFFFFF', boxShadow: '0 10px 25px -5px rgba(11, 33, 68, 0.2)' }}>
                  <h3 style={{ margin: '0 0 16px 0', fontSize: '22px', fontWeight: '800' }}>EduDrill Smart Study Prescription</h3>
                  
                  <div style={{ marginBottom: '20px', fontSize: '16px', lineHeight: 1.6 }}>
                    <p style={{ margin: '0 0 8px 0' }}>
                      Highest accuracy observed in: <strong style={{ color: '#93C5FD' }}>{strongest?.subject?.replace(/-/g, ' ')}</strong> ({strongest?.percent}%).
                    </p>
                    {weakest && weakest.subject !== strongest.subject && (
                      <p style={{ margin: 0 }}>
                        High-yield improvement potential: <strong style={{ color: '#FDE047' }}>{weakest.subject.replace(/-/g, ' ')}</strong> ({weakest.percent}%).
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '24px' }}>
                    <Link to={`/dashboard/${exam}/practice`} className="edudrill-btn" style={{ padding: '14px 24px', background: theme.amberGold, color: '#FFF', borderRadius: 12, textDecoration: 'none', fontWeight: '800', fontSize: '15px' }}>
                      Drill Weak Topics
                    </Link>
                    <Link to={`/dashboard/${exam}/ai-tutor`} className="edudrill-btn" style={{ padding: '14px 24px', background: 'rgba(255,255,255,0.15)', color: '#FFF', borderRadius: 12, textDecoration: 'none', fontWeight: '700', fontSize: '15px', border: '1px solid rgba(255,255,255,0.2)' }}>
                      Ask AI Tutor For Concept Help
                    </Link>
                  </div>
                </div>
              );
            })()}

            {/* Review Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '12px' }}>
              <button 
                className="edudrill-btn"
                onClick={() => {
                  setShowResults(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                style={{ padding: '18px 48px', background: theme.navyBrand, color: '#FFF', border: 'none', borderRadius: 14, cursor: 'pointer', fontSize: '18px', fontWeight: '800', boxShadow: '0 8px 24px -4px rgba(18, 59, 114, 0.35)' }}
              >
                Review Full Answers & Syllabus Solutions →
              </button>
            </div>

          </div>
        </div>
      </main>
    );
  }

  // SUBMIT CONFIRMATION MODAL SCREEN
  if (showConfirm) {
    const totalAnswered = Object.keys(userAnswers).length;
    const unansweredCount = questions.length - totalAnswered;

    return (
      <main style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: theme.canvasBg, fontFamily: "'Inter', sans-serif", padding: '20px' }}>
        <style>{customStyles}</style>
        
        <div style={{ background: theme.surface, padding: '44px 40px', borderRadius: 24, boxShadow: '0 20px 50px rgba(11, 33, 68, 0.15)', textAlign: 'center', maxWidth: 520, width: '100%', border: `1px solid ${theme.borderLight}` }}>
          
          <div style={{ width: 72, height: 72, background: unansweredCount > 0 ? theme.amberLight : theme.emeraldLight, color: unansweredCount > 0 ? theme.amberGold : theme.emeraldGreen, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', fontWeight: 'bold', margin: '0 auto 20px' }}>
            {unansweredCount > 0 ? <FaExclamationTriangle /> : <FaCheckCircle />}
          </div>

          <h2 style={{ color: theme.navyDark, marginBottom: '12px', fontSize: '26px', fontWeight: '800' }}>
            Submit Your Examination?
          </h2>
          
          <p style={{ color: theme.textSecondary, marginBottom: '28px', fontSize: '16px', lineHeight: 1.6 }}>
            You have completed <strong>{totalAnswered}</strong> out of <strong>{questions.length}</strong> questions.
            {unansweredCount > 0 && (
              <span style={{ display: 'block', marginTop: '10px', color: theme.crimsonAlert, fontWeight: '700' }}>
                ⚠️ Notice: You have {unansweredCount} unattempted questions!
              </span>
            )}
          </p>

          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
            <button 
              className="edudrill-btn"
              onClick={() => setShowConfirm(false)}
              style={{ flex: 1, padding: '16px', background: theme.surface, color: theme.navyDark, border: `2px solid ${theme.borderMedium}`, borderRadius: 12, fontSize: '15px', cursor: 'pointer', fontWeight: '800' }}
            >
              Return to Exam <span className="kbd-badge">[R]</span>
            </button>
            <button 
              className="edudrill-btn"
              onClick={handleConfirmSubmit}
              style={{ flex: 1, padding: '16px', background: theme.emeraldGreen, color: '#FFFFFF', border: 'none', borderRadius: 12, fontSize: '15px', cursor: 'pointer', fontWeight: '800', boxShadow: '0 6px 18px rgba(22, 163, 74, 0.3)' }}
            >
              Yes, Finalize & Submit <span className="kbd-badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFF', borderColor: 'transparent' }}>[Y]</span>
            </button>
          </div>
        </div>
      </main>
    );
  }

  // ACTIVE CBT WORKSPACE & REVIEW MODE
  const currentQ = questions[currentIndex];
  const optionLetters = ['A', 'B', 'C', 'D'];
  const examSubjects = [...new Set(questions.map(q => q.subjectName))].filter(Boolean);
  const currentSubject = currentQ?.subjectName;
  const localIndex = questions.slice(0, currentIndex).filter(q => q.subjectName === currentSubject).length;
  const totalInSubject = questions.filter(q => q.subjectName === currentSubject).length;
  const currentSubjectQuestions = questions.map((q, index) => ({ q, index })).filter(item => item.q.subjectName === currentSubject);
  const totalAnswered = Object.keys(userAnswers).length;
  const isTimeCritical = timeLeft < 300;

  if (isStarted && !currentQ && !showConfirm && !isSubmitted) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: theme.canvasBg, fontFamily: "'Inter', sans-serif", color: theme.navyDark }}>
        <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px' }}>Loading CBT Question Matrix...</h2>
        <button onClick={() => setIsStarted(false)} className="edudrill-btn" style={{ padding: '12px 24px', borderRadius: 10, background: theme.navyBrand, color: '#FFF', border: 'none', fontWeight: '700', cursor: 'pointer' }}>
          Back to Setup
        </button>
      </main>
    );
  }

  return (
    <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: theme.canvasBg, fontFamily: "'Inter', sans-serif", color: theme.textPrimary, overflow: 'hidden' }}>
      <style>{customStyles}</style>

      {/* 1. TOP NAV (Deep Scholastic Navy) */}
      <header style={{ height: '70px', padding: '0 24px', background: theme.navyDark, color: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 50, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        
        {/* Brand & Module */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' }}>
            <img src="/assets/edudrill_logo.jpg" alt="EduDrill" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: '17px', fontWeight: '800', letterSpacing: '0.2px' }}>EduDrill CBT</h1>
            <span style={{ fontSize: '12px', color: '#93C5FD', fontWeight: '700', textTransform: 'uppercase' }}>{exam?.toUpperCase()} Examination</span>
          </div>
          {isSubmitted && (
            <span style={{ background: theme.emeraldGreen, color: '#FFF', padding: '4px 12px', borderRadius: 20, fontSize: '11px', fontWeight: '800', marginLeft: '12px', letterSpacing: '0.5px' }}>
              REVIEW MODE
            </span>
          )}
        </div>

        {/* Calm Digital Countdown Timer (Or Review Score) */}
        {!isSubmitted ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            padding: '8px 20px', 
            borderRadius: '12px', 
            background: isTimeCritical ? 'rgba(220, 38, 38, 0.2)' : 'rgba(255,255,255,0.08)',
            border: `1px solid ${isTimeCritical ? theme.crimsonAlert : 'rgba(255,255,255,0.15)'}`,
            animation: isTimeCritical ? 'pulseCritical 1.5s infinite' : 'none'
          }}>
            <FaClock style={{ fontSize: '16px', color: isTimeCritical ? '#F87171' : '#93C5FD' }} />
            <span style={{ fontSize: '18px', fontWeight: '800', fontFamily: 'monospace', letterSpacing: '1px', color: isTimeCritical ? '#FCA5A5' : '#FFFFFF' }}>
              {formatTime(timeLeft)}
            </span>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#94A3B8', fontWeight: '700' }}>Rem.</span>
          </div>
        ) : (
          <button 
            onClick={() => setShowResults(true)} 
            className="edudrill-btn"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: '#FFF', padding: '8px 18px', borderRadius: 10, cursor: 'pointer', fontWeight: '800', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FaTrophy style={{ color: theme.amberGold }} /> View Scorecard
          </button>
        )}

        {/* Utilities & Exit */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {(exam === 'jamb' || ['General Mathematics', 'Further Mathematics', 'Physics', 'Chemistry', 'Geography'].includes(currentQ?.subjectName)) && (
            <button 
              onClick={() => setShowCalculator(!showCalculator)} 
              className="edudrill-btn"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', padding: '9px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <FaCalculator style={{ fontSize: '13px', color: '#93C5FD' }} /> Calculator
            </button>
          )}

          {(exam === 'jamb' || currentQ?.subjectName === 'English Language' || currentQ?.subjectName === 'Use of English') && (
            <button 
              onClick={() => setShowDictionary(!showDictionary)} 
              className="edudrill-btn"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', padding: '9px 16px', borderRadius: 10, cursor: 'pointer', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <FaBook style={{ fontSize: '13px', color: '#93C5FD' }} /> Dictionary
            </button>
          )}

          <button 
            onClick={() => {
              if (isSubmitted || window.confirm("Are you sure you want to exit this examination? Your progress will be closed.")) {
                setIsStarted(false);
              }
            }} 
            className="edudrill-btn"
            style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF', padding: '9px 18px', borderRadius: 10, cursor: 'pointer', fontWeight: '700', fontSize: '13px' }}
          >
            Exit CBT
          </button>
        </div>
      </header>

      {/* 2. BODY SPLIT */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Main Exam Area */}
        <div style={{ flex: 1, padding: '28px 4%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

          {/* Subject Navigation Tabs for JAMB 4 Subjects */}
          {isJamb && examSubjects.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', maxWidth: 940, margin: '0 auto 20px', width: '100%' }}>
              {examSubjects.map(sub => {
                const firstIndex = questions.findIndex(q => q.subjectName === sub);
                const isActive = sub === currentSubject;
                const subTotal = questions.filter(q => q.subjectName === sub).length;
                const subAnswered = questions.filter((q, idx) => q.subjectName === sub && userAnswers[idx]).length;

                return (
                  <button
                    key={sub}
                    onClick={() => setCurrentIndex(firstIndex)}
                    className="edudrill-btn"
                    style={{
                      padding: '10px 18px',
                      background: isActive ? theme.navyBrand : theme.surface,
                      color: isActive ? '#FFFFFF' : theme.navyDark,
                      border: `1.5px solid ${isActive ? theme.navyBrand : theme.borderLight}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: isActive ? '0 4px 12px rgba(18, 59, 114, 0.2)' : '0 1px 3px rgba(0,0,0,0.04)'
                    }}
                  >
                    <span>{sub}</span>
                    <span style={{ 
                      fontSize: '11px', 
                      padding: '2px 8px', 
                      borderRadius: 12, 
                      background: isActive ? 'rgba(255,255,255,0.2)' : theme.canvasBg,
                      color: isActive ? '#FFFFFF' : theme.textMuted,
                      fontWeight: '800'
                    }}>
                      {subAnswered}/{subTotal}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Scholastic Question Paper Card */}
          <div key={currentIndex} className="edudrill-card" style={{ flex: 1, maxWidth: 940, width: '100%', margin: '0 auto', padding: '36px 44px', borderRadius: 20, display: 'flex', flexDirection: 'column' }}>
            
            {/* Meta Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${theme.borderLight}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ background: theme.blueLight, color: theme.navySoft, padding: '8px 16px', borderRadius: 12, fontWeight: '800', fontSize: '15px' }}>
                  Question {localIndex + 1} of {totalInSubject}
                </span>
                {currentQ?.litText && (
                  <span style={{ background: theme.amberLight, color: theme.amberGold, padding: '8px 14px', borderRadius: 12, fontWeight: '700', fontSize: '13px' }}>
                    📖 {currentQ.litText}
                  </span>
                )}
              </div>
              <span style={{ fontWeight: '700', color: theme.textSecondary, fontSize: '14px', padding: '6px 14px', background: theme.canvasBg, borderRadius: 20, border: `1px solid ${theme.borderLight}` }}>
                {currentQ?.subjectName}
              </span>
            </div>
            
            {/* Question Text */}
            <h2 style={{ fontSize: '21px', margin: '0 0 32px 0', color: theme.navyDark, lineHeight: 1.65, fontWeight: '600' }}>
              {currentQ?.question}
            </h2>
            
            {/* Options List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
              {currentQ?.options?.map((opt, i) => {
                const letter = optionLetters[i];
                const isSelected = userAnswers[currentIndex] === opt;
                
                // Review Mode Logic
                let isCorrectAnswer = false;
                let optBg = isSelected ? theme.blueLight : theme.surface;
                let optBorder = isSelected ? theme.blueAccent : theme.borderLight;
                let optColor = isSelected ? theme.navyDark : theme.textPrimary;
                let letterBg = isSelected ? theme.blueAccent : theme.canvasBg;
                let letterColor = isSelected ? '#FFFFFF' : theme.navyDark;

                if (isSubmitted) {
                  let correctText = currentQ.answer;
                  if (typeof currentQ.answer === 'string' && ['A','B','C','D'].includes(currentQ.answer.toUpperCase())) {
                    correctText = currentQ.options[optionLetters.indexOf(currentQ.answer.toUpperCase())];
                  }
                  isCorrectAnswer = (opt === correctText) || (opt === currentQ.answer);

                  if (isCorrectAnswer) {
                    optBg = theme.emeraldLight;
                    optBorder = theme.emeraldGreen;
                    optColor = theme.navyDark;
                    letterBg = theme.emeraldGreen;
                    letterColor = '#FFFFFF';
                  } else if (isSelected && !isCorrectAnswer) {
                    optBg = theme.crimsonLight;
                    optBorder = theme.crimsonAlert;
                    optColor = theme.navyDark;
                    letterBg = theme.crimsonAlert;
                    letterColor = '#FFFFFF';
                  } else {
                    optBg = theme.surface;
                    optBorder = theme.borderLight;
                    optColor = theme.textMuted;
                    letterBg = theme.canvasBg;
                    letterColor = theme.textMuted;
                  }
                }

                return (
                  <label 
                    key={i} 
                    className={`option-card ${isSelected && !isSubmitted ? 'selected' : ''}`} 
                    style={{ 
                      padding: '14px 20px', 
                      background: optBg, 
                      color: optColor, 
                      borderRadius: 14, 
                      cursor: isSubmitted ? 'default' : 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      border: `2px solid ${optBorder}`, 
                      fontSize: '16px',
                      minHeight: '62px'
                    }}
                  >
                    <input 
                      type="radio" 
                      name={`q-${currentIndex}`} 
                      value={opt} 
                      checked={isSelected}
                      onChange={() => handleAnswerSelect(currentIndex, opt)}
                      disabled={isSubmitted}
                      style={{ display: 'none' }} 
                    />
                    
                    {/* Badge */}
                    <div style={{ 
                      fontWeight: '800', 
                      marginRight: '18px', 
                      width: '42px', 
                      height: '42px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      background: letterBg, 
                      borderRadius: '50%', 
                      color: letterColor,
                      border: `1.5px solid ${optBorder}`,
                      fontSize: '16px',
                      flexShrink: 0
                    }}>
                      {letter}
                    </div>

                    <span style={{ flex: 1, lineHeight: 1.5, fontWeight: (isSelected || isCorrectAnswer) ? '700' : '400', fontSize: '16px' }}>
                      {opt}
                    </span>

                    {/* Feedback Badges */}
                    {!isSubmitted && isSelected && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: theme.blueAccent, color: '#FFF', padding: '4px 12px', borderRadius: 20, fontSize: '12px', fontWeight: '800' }}>
                        <FaCheck style={{ fontSize: '10px' }} /> Selected
                      </div>
                    )}
                    {!isSubmitted && !isSelected && (
                      <span className="kbd-badge">[{letter}]</span>
                    )}

                    {isSubmitted && isCorrectAnswer && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: theme.emeraldGreen, color: '#FFF', padding: '4px 12px', borderRadius: 20, fontSize: '12px', fontWeight: '800' }}>
                        <FaCheck /> Correct Answer
                      </div>
                    )}
                    {isSubmitted && isSelected && !isCorrectAnswer && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: theme.crimsonAlert, color: '#FFF', padding: '4px 12px', borderRadius: 20, fontSize: '12px', fontWeight: '800' }}>
                        <FaTimesCircle /> Your Answer
                      </div>
                    )}
                  </label>
                );
              })}
            </div>

            {/* Review Mode Explanation Card */}
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

              return (
                <div style={{ marginTop: '28px', padding: '24px', background: isCurrentCorrect ? theme.emeraldLight : theme.canvasBg, borderRadius: 16, border: `2px solid ${isCurrentCorrect ? theme.emeraldGreen : theme.borderMedium}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    {isCurrentCorrect ? (
                      <FaCheckCircle style={{ color: theme.emeraldGreen, fontSize: '20px' }} />
                    ) : (
                      <FaTimesCircle style={{ color: theme.crimsonAlert, fontSize: '20px' }} />
                    )}
                    <span style={{ fontWeight: '800', fontSize: '15px', color: isCurrentCorrect ? theme.emeraldGreen : theme.navyDark, textTransform: 'uppercase' }}>
                      {isCurrentCorrect ? 'Correct Response' : isAnswered ? 'Incorrect Response' : 'Question Skipped'}
                    </span>
                  </div>
                  <div style={{ fontSize: '16px', color: theme.navyDark, marginLeft: '30px' }}>
                    <strong>Correct Solution:</strong> Option {correctLetter} ({correctText})
                  </div>
                  {currentQ?.explanation && (
                    <p style={{ marginTop: '10px', marginLeft: '30px', fontSize: '14px', lineHeight: 1.6, color: theme.textSecondary }}>
                      {currentQ.explanation}
                    </p>
                  )}
                </div>
              );
            })()}

          </div>

          {/* Bottom Dock with 8-Key JAMB Reference */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 940, width: '100%', margin: '24px auto 16px' }}>
            <button 
              className="edudrill-btn"
              onClick={goPrev} 
              disabled={currentIndex === 0}
              style={{ 
                padding: '14px 28px', 
                background: currentIndex === 0 ? theme.canvasBg : theme.surface, 
                color: currentIndex === 0 ? theme.textMuted : theme.navyDark, 
                border: `1.5px solid ${theme.borderMedium}`, 
                borderRadius: 12, 
                cursor: currentIndex === 0 ? 'not-allowed' : 'pointer', 
                fontSize: '15px', 
                fontWeight: '700', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px' 
              }}
            >
              <FaArrowLeft /> Previous <span className="kbd-badge">[P]</span>
            </button>

            {!isSubmitted && (
              <button 
                className="edudrill-btn"
                onClick={() => setShowConfirm(true)}
                style={{ 
                  padding: '14px 36px', 
                  background: theme.amberGold, 
                  color: '#FFFFFF', 
                  border: 'none', 
                  borderRadius: 12, 
                  cursor: 'pointer', 
                  fontSize: '16px', 
                  fontWeight: '800',
                  boxShadow: '0 4px 16px rgba(217, 119, 6, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                Submit Exam <span className="kbd-badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFF', borderColor: 'transparent' }}>[S]</span>
              </button>
            )}

            <button 
              className="edudrill-btn"
              onClick={goNext} 
              disabled={currentIndex === questions.length - 1}
              style={{ 
                padding: '14px 32px', 
                background: currentIndex === questions.length - 1 ? theme.canvasBg : theme.navyBrand, 
                color: currentIndex === questions.length - 1 ? theme.textMuted : '#FFFFFF', 
                border: 'none', 
                borderRadius: 12, 
                cursor: currentIndex === questions.length - 1 ? 'not-allowed' : 'pointer', 
                fontSize: '15px', 
                fontWeight: '700', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px', 
                boxShadow: currentIndex === questions.length - 1 ? 'none' : '0 4px 14px rgba(18, 59, 114, 0.25)' 
              }}
            >
              Next <span className="kbd-badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFF', borderColor: 'transparent' }}>[N]</span> <FaArrowRight />
            </button>
          </div>

        </div>

        {/* 3. SIDE QUESTION NAVIGATOR */}
        <div style={{ width: '340px', background: theme.surface, borderLeft: `1px solid ${theme.borderLight}`, display: 'flex', flexDirection: 'column', zIndex: 40 }}>
          
          {/* Progress Header */}
          <div style={{ padding: '24px 20px', borderBottom: `1px solid ${theme.borderLight}`, background: theme.canvasBg }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
              <h3 style={{ margin: 0, color: theme.navyDark, fontSize: '16px', fontWeight: '800' }}>Question Navigator</h3>
              <span style={{ fontSize: '13px', fontWeight: '700', color: theme.blueAccent }}>
                {totalAnswered} / {questions.length} ({Math.round((totalAnswered / (questions.length || 1)) * 100)}%)
              </span>
            </div>

            {/* Visual Progress Bar */}
            <div style={{ width: '100%', height: '8px', background: theme.borderLight, borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ width: `${(totalAnswered / (questions.length || 1)) * 100}%`, height: '100%', background: theme.emeraldGreen, transition: 'width 0.3s ease-out' }}></div>
            </div>
            
            {/* 3-State Legend */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: theme.textSecondary }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 12, height: 12, borderRadius: '4px', background: isSubmitted ? theme.emeraldGreen : theme.emeraldGreen }}></div>
                <span>{isSubmitted ? 'Correct' : 'Answered'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 12, height: 12, borderRadius: '4px', background: isSubmitted ? theme.crimsonAlert : theme.blueLight, border: isSubmitted ? 'none' : `1.5px solid ${theme.blueAccent}` }}></div>
                <span>{isSubmitted ? 'Wrong' : 'Skipped'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: 12, height: 12, borderRadius: '4px', background: theme.surface, border: `1px solid ${theme.borderMedium}` }}></div>
                <span>Unvisited</span>
              </div>
            </div>
          </div>

          {/* Grid Buttons */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', alignContent: 'start' }}>
            {currentSubjectQuestions.map((item, localIdx) => {
              const i = item.index;
              const isAnswered = !!userAnswers[i];
              const isVisited = !!visited[i];
              const isCurrent = i === currentIndex;
              
              let bg = theme.surface;
              let color = theme.textMuted;
              let border = `1px solid ${theme.borderMedium}`;
              
              if (!isSubmitted) {
                if (isAnswered) {
                  bg = theme.emeraldGreen;
                  color = '#FFFFFF';
                  border = `1px solid ${theme.emeraldGreen}`;
                } else if (isVisited) {
                  bg = theme.blueLight;
                  color = theme.navySoft;
                  border = `1.5px solid ${theme.blueAccent}`;
                }
              } else {
                // In Review Mode: Green for correct, Red for wrong, Gray for unanswered
                if (isAnswered) {
                  const optionLetters = ['A', 'B', 'C', 'D'];
                  let correctText = questions[i].answer;
                  if (typeof questions[i].answer === 'string' && ['A','B','C','D'].includes(questions[i].answer.toUpperCase())) {
                    correctText = questions[i].options[optionLetters.indexOf(questions[i].answer.toUpperCase())];
                  }
                  const correct = (userAnswers[i] === correctText) || (userAnswers[i] === questions[i].answer);
                  bg = correct ? theme.emeraldGreen : theme.crimsonAlert;
                  color = '#FFFFFF';
                  border = 'none';
                } else {
                  bg = theme.canvasBg;
                  color = theme.textMuted;
                  border = `1px solid ${theme.borderLight}`;
                }
              }

              return (
                <button
                  key={i}
                  className="nav-grid-btn"
                  onClick={() => setCurrentIndex(i)}
                  style={{
                    height: '42px',
                    background: bg,
                    color: color,
                    border: border,
                    borderRadius: 8,
                    fontWeight: '800',
                    fontSize: '13px',
                    cursor: 'pointer',
                    outline: isCurrent ? `3px solid ${theme.navyBrand}` : 'none',
                    outlineOffset: '2px',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {localIdx + 1}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {showCalculator && <Calculator onClose={() => setShowCalculator(false)} />}
      {showDictionary && <Dictionary onClose={() => setShowDictionary(false)} />}
    </main>
  );
}

export default function ExamCBT() {
  const { isMobile } = useMobile();
  return isMobile ? <MobileExamCBT /> : <ExamCBTDesktop />;
}
