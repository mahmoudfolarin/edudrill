const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const userUploadedDir = path.join('C:', 'Users', 'USER', '.gemini', 'antigravity-ide', 'brain', '1b370a40-af59-4ef6-be24-829ac475f47f', '.user_uploaded');

async function main() {
  const examsData = [];
  const filesToProcess = fs.readdirSync(userUploadedDir).filter(f => f.endsWith('.pdf'));

  for (const filename of filesToProcess) {
    const filePath = path.join(userUploadedDir, filename);
    const dataBuffer = fs.readFileSync(filePath);
    try {
      const data = await pdfParse(dataBuffer);
      let fullText = data.text;
      
      const titleMatch = fullText.match(/COMPREHENSIVE ([\s\S]*?) EXAMINATION/i);
      if (!titleMatch) {
        // Not an examination PDF
        continue;
      }
      let subjectName = titleMatch[1].trim().replace(/\n/g, ' ').toLowerCase();
      
      let subjectSlug = '';
      if (subjectName.includes('physical and health')) subjectSlug = 'physical-education';
      else if (subjectName.includes('digital technology')) subjectSlug = 'digital-technologies';
      else if (subjectName.includes('technical drawing')) subjectSlug = 'technical-drawing';
      else if (subjectName.includes('geography')) subjectSlug = 'geography';
      else if (subjectName.includes('computer studies')) subjectSlug = 'computer-studies';
      else if (subjectName.includes('biology')) subjectSlug = 'biology';
      else if (subjectName.includes('physics')) subjectSlug = 'physics';
      else if (subjectName.includes('further mathematics') || subjectName.includes('futher math')) subjectSlug = 'further-mathematics';
      else if (subjectName.includes('chemistry')) subjectSlug = 'chemistry';
      else if (subjectName.includes('agricultural') || subjectName.includes('agric')) subjectSlug = 'agricultural-science';
      else if (subjectName.includes('food and nutrition') || subjectName.includes('food nutrition') || subjectName.includes('foods and nutrition')) subjectSlug = 'foods-and-nutrition';
      else subjectSlug = subjectName.replace(/\s+/g, '-');

      console.log(`Processing: ${subjectName} -> ${subjectSlug} from ${filename}`);

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

      questionsText = questionsText.replace(/\n\s*\d+\s*\n/g, '\n');

      const questionBlocks = [];
      const qStartRegex = /(?:^|\n)(\d+)\.\s*(.*)/g;
      let lastMatch = null;
      let iterMatch;

      while ((iterMatch = qStartRegex.exec(questionsText)) !== null) {
        if (lastMatch) {
          const qText = questionsText.substring(lastMatch.index, iterMatch.index);
          questionBlocks.push({ num: parseInt(lastMatch[1]), text: qText.trim() });
        }
        lastMatch = iterMatch;
      }
      if (lastMatch) {
        questionBlocks.push({ num: parseInt(lastMatch[1]), text: questionsText.substring(lastMatch.index).trim() });
      }

      let qCount = 0;

      for (const block of questionBlocks) {
        const qNum = block.num;
        let qContent = block.text.replace(new RegExp(`^${qNum}\\.\\s*`), '');
        
        const optARegex = /\(A\)\s*/;
        const optBRegex = /\(B\)\s*/;
        const optCRegex = /\(C\)\s*/;
        const optDRegex = /\(D\)\s*/;

        const aIndex = qContent.search(optARegex);
        const bIndex = qContent.search(optBRegex);
        const cIndex = qContent.search(optCRegex);
        const dIndex = qContent.search(optDRegex);

        if (aIndex !== -1 && bIndex !== -1 && cIndex !== -1 && dIndex !== -1) {
          const qText = qContent.substring(0, aIndex).trim().replace(/\n/g, ' ').replace(/-\s+/g, '');
          const optA = qContent.substring(aIndex + 3, bIndex).trim().replace(/\n/g, ' ').replace(/-\s+/g, '');
          const optB = qContent.substring(bIndex + 3, cIndex).trim().replace(/\n/g, ' ').replace(/-\s+/g, '');
          const optC = qContent.substring(cIndex + 3, dIndex).trim().replace(/\n/g, ' ').replace(/-\s+/g, '');
          const optD = qContent.substring(dIndex + 3).trim().replace(/\n/g, ' ').replace(/-\s+/g, '');

          const correctAnswer = answers[qNum];
          if (correctAnswer) {
            const questionData = {
              exam: 'WAEC',
              subject: subjectSlug,
              year: '2026',
              question: qText,
              options: {
                A: optA,
                B: optB,
                C: optC,
                D: optD
              },
              correctAnswer: correctAnswer,
              questionNumber: qNum,
              sourceName: `Comprehensive ${subjectName} Exam`,
              sourceProvider: 'edudrill_custom',
              sourceExternalId: `${subjectSlug}_${qNum}`
            };

            examsData.push(questionData);

            if (subjectSlug === 'physical-education') {
              const duplicate = { ...questionData, subject: 'health-education', sourceExternalId: `health-education_${qNum}` };
              examsData.push(duplicate);
            }

            qCount++;
          }
        }
      }
      console.log(`Extracted ${qCount} questions for ${subjectSlug}`);
    } catch (err) {
      console.error(`Error processing ${filename}:`, err);
    }
  }

  const outPath = path.join(__dirname, '..', 'data', 'extractedQuestions.json');
  fs.writeFileSync(outPath, JSON.stringify(examsData, null, 2));
  console.log(`Saved ${examsData.length} total questions to ${outPath}`);
}

main();
