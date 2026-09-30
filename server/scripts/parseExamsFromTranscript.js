const fs = require('fs');
const path = require('path');

const lastUserMessage = fs.readFileSync(path.join(__dirname, '..', 'last_user_message.txt'), 'utf8');

const pdfBlocks = lastUserMessage.split('==Start of PDF==').slice(1);
console.log(`Found ${pdfBlocks.length} PDF blocks.`);

const examsData = [];

for (const block of pdfBlocks) {
  const ocrBlocks = block.split('==Start of OCR for page');
  let fullText = '';
  for (let i = 1; i < ocrBlocks.length; i++) {
    const ocrContent = ocrBlocks[i].split('==End of OCR')[0];
    const lines = ocrContent.split('\n').slice(1).join('\n');
    fullText += lines + '\n';
  }

  const titleMatch = fullText.match(/COMPREHENSIVE (.*?) EXAMINATION/i);
  if (!titleMatch) continue;
  let subjectName = titleMatch[1].trim().toLowerCase();
  
  let subjectSlug = '';
  if (subjectName.includes('physical and health')) subjectSlug = 'physical-education';
  else if (subjectName.includes('digital technology')) subjectSlug = 'digital-technologies';
  else if (subjectName.includes('technical drawing')) subjectSlug = 'technical-drawing';
  else if (subjectName.includes('geography')) subjectSlug = 'geography';
  else if (subjectName.includes('computer studies')) subjectSlug = 'computer-studies';
  else subjectSlug = subjectName.replace(/\s+/g, '-');

  console.log(`Processing: ${subjectName} -> ${subjectSlug}`);

  const answersMatch = fullText.match(/ANSWER KEY[^\n]*\n([\s\S]*)/i);
  let answersText = '';
  if (answersMatch) {
    answersText = answersMatch[1];
  }

  const answers = {};
  const answerRegex = /(\d+)\.\s*\(([A-D])\)/g;
  let match;
  while ((match = answerRegex.exec(answersText)) !== null) {
    answers[parseInt(match[1])] = match[2];
  }

  let questionsText = fullText;
  if (answersMatch) {
    questionsText = fullText.substring(0, answersMatch.index);
  }

  const questionRegex = /(\d+)\.\s+([\s\S]*?)(?=\n\d+\.\s+|$)/g;
  
  const questions = [];
  let qMatch;
  while ((qMatch = questionRegex.exec(questionsText)) !== null) {
    const qNum = parseInt(qMatch[1]);
    let qContent = qMatch[2].trim();

    const optRegex = /\(A\)([\s\S]*?)\(B\)([\s\S]*?)\(C\)([\s\S]*?)\(D\)([\s\S]*?)$/i;
    const optMatch = qContent.match(optRegex);

    if (optMatch) {
      const qText = qContent.substring(0, optMatch.index).trim();
      const options = {
        A: optMatch[1].trim(),
        B: optMatch[2].trim(),
        C: optMatch[3].trim(),
        D: optMatch[4].trim()
      };

      const correctAnswer = answers[qNum];
      if (correctAnswer) {
        questions.push({
          exam: 'WAEC',
          subject: subjectSlug,
          year: '2026',
          question: qText.replace(/\n/g, ' '),
          options: {
            A: options.A.replace(/\n/g, ' '),
            B: options.B.replace(/\n/g, ' '),
            C: options.C.replace(/\n/g, ' '),
            D: options.D.replace(/\n/g, ' ')
          },
          correctAnswer: correctAnswer,
          questionNumber: qNum,
          sourceName: `Comprehensive ${subjectName} Exam`,
          sourceProvider: 'edudrill_custom',
          sourceExternalId: `${subjectSlug}_${qNum}`
        });
      }
    }
  }

  console.log(`Extracted ${questions.length} questions for ${subjectSlug}`);
  examsData.push(...questions);
}

fs.writeFileSync(path.join(__dirname, '..', 'data', 'extractedQuestions.json'), JSON.stringify(examsData, null, 2));
console.log('Saved to extractedQuestions.json');
