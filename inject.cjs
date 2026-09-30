const fs = require('fs');

function injectTools(filePath, searchRegex, replaceText) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (searchRegex.test(content)) {
        content = content.replace(searchRegex, replaceText);
        fs.writeFileSync(filePath, content);
        console.log("Injected into " + filePath);
    } else {
        console.log("Could not find regex in " + filePath);
    }
}

const replacement = `              {currentQ?.subjectName === 'General Mathematics' && (
                <button 
                  onClick={() => setShowCalculator(!showCalculator)} 
                  className="premium-btn"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', color: theme.surface, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: '600', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  Calculator
                </button>
              )}

              {currentQ?.subjectName === 'English Language' && (
                <button 
                  onClick={() => setShowDictionary(!showDictionary)} 
                  className="premium-btn"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', color: theme.surface, padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: '600', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  Dictionary
                </button>
              )}
$1`;

const mainReplacement = `
        {showCalculator && <Calculator onClose={() => setShowCalculator(false)} />}
        {showDictionary && <Dictionary onClose={() => setShowDictionary(false)} />}
      </main>
    );
  }

  return (`;

// ExamPractice
const practicePath = 'C:\\Users\\USER\\Desktop\\EduDrill\\src\\pages\\ExamPractice.jsx';
injectTools(practicePath, /(<button \s*onClick=\{\(\) => \{ if\(window\.confirm\("Are you sure you want to end your practice session\?"\)\) setIsPracticing\(false\); \}\})/m, replacement);
injectTools(practicePath, /<\/main>\s*\);\s*}\s*return \(/m, mainReplacement);

// ExamCBT
const cbtPath = 'C:\\Users\\USER\\Desktop\\EduDrill\\src\\pages\\ExamCBT.jsx';
injectTools(cbtPath, /(<button \s*onClick=\{\(\) => \{ if\(window\.confirm\("Are you sure you want to exit this exam\?"\)\) setIsStarted\(false\); \}\})/m, replacement);
injectTools(cbtPath, /<\/main>\s*\);\s*}\s*return \(/m, mainReplacement);
