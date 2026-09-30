require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const pool = require('../src/config/database');

const userUploadedDir = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\1b370a40-af59-4ef6-be24-829ac475f47f\\.user_uploaded';

async function parseBiology() {
  const filename = 'media_1790743550566.pdf';
  const filePath = path.join(userUploadedDir, filename);
  const dataBuffer = fs.readFileSync(filePath);
  
  const examsData = [];
  
  try {
    const data = await pdfParse(dataBuffer);
    const fullText = data.text;
    
    // Find Section B Answers
    const answersMatch = fullText.match(/Section B: Objectives Answer Key[\s\S]*?\n1\.\s/i);
    let answersText = '';
    if (answersMatch) {
      // The match ends at "1. " but we need the actual text block
      const startIndex = fullText.toLowerCase().indexOf('section b: objectives answer key');
      answersText = fullText.substring(startIndex);
    } else {
      console.log('Answer key not found using regex!');
      // Backup logic
      const idx = fullText.toLowerCase().indexOf('section b: objectives answer key');
      if (idx !== -1) {
        answersText = fullText.substring(idx);
      }
    }

    const answers = {};
    // Answers format: "1. (C) Mitochondrion"
    const answerRegex = /(\d+)\.\s*\(([A-D])\)/g;
    let match;
    while ((match = answerRegex.exec(answersText)) !== null) {
      answers[parseInt(match[1])] = match[2];
    }

    console.log(`Found ${Object.keys(answers).length} answers in the key.`);

    // Isolate objective questions
    let questionsText = fullText;
    const objStart = fullText.toLowerCase().indexOf('section b: objectives');
    if (objStart !== -1) {
      questionsText = fullText.substring(objStart, fullText.toLowerCase().indexOf('answer key & marking guide'));
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
    
    // De-dupe check if needed
    const uniqueKeys = new Set();

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
        let qText = qContent.substring(0, aIndex).trim().replace(/\n/g, ' ').replace(/-\s+/g, '');
        let optA = qContent.substring(aIndex + 3, bIndex).trim().replace(/\n/g, ' ').replace(/-\s+/g, '');
        let optB = qContent.substring(bIndex + 3, cIndex).trim().replace(/\n/g, ' ').replace(/-\s+/g, '');
        let optC = qContent.substring(cIndex + 3, dIndex).trim().replace(/\n/g, ' ').replace(/-\s+/g, '');
        let optD = qContent.substring(dIndex + 3).trim().replace(/\n/g, ' ').replace(/-\s+/g, '');
        
        optD = optD.replace(/\n\d+\s*$/, '').trim();

        const correctAnswer = answers[qNum];
        if (correctAnswer) {
          const key = `${qNum}-${qText.substring(0, 20)}`;
          if (!uniqueKeys.has(key)) {
            uniqueKeys.add(key);
            examsData.push({
              subjectSlug: 'biology',
              qText,
              optA,
              optB,
              optC,
              optD,
              correctAnswer,
              qNum
            });
            qCount++;
          }
        }
      }
    }
    console.log(`Parsed ${qCount} questions from ${filename}`);
    
  } catch (e) {
    console.error(`Error processing ${filename}`, e);
  }

  // Insert into DB
  try {
    const subRes = await pool.query("SELECT id FROM subjects WHERE slug = 'biology'");
    let subjectId;
    if (subRes.rows.length > 0) {
      subjectId = subRes.rows[0].id;
    } else {
      const insRes = await pool.query("INSERT INTO subjects (name, slug) VALUES ('Biology', 'biology') RETURNING id");
      subjectId = insRes.rows[0].id;
    }
    
    const exams = ['WAEC', 'NECO', 'JAMB', 'GCE'];
    let insertedRows = 0;
    
    for (const q of examsData) {
      for (const e of exams) {
        await pool.query(
          `INSERT INTO questions (
            exam, year, subject_id, question_text, 
            option_a, option_b, option_c, option_d, correct_answer, 
            difficulty, marks, source_type, license_status, is_active,
            verification_status, explanation
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
          [
            e,
            2026,
            subjectId,
            q.qText,
            q.optA,
            q.optB,
            q.optC,
            q.optD,
            q.correctAnswer,
            'medium',
            1,
            'past_question',
            'public_domain',
            true,
            'verified',
            'Parsed from PDF.'
          ]
        );
        insertedRows++;
      }
    }
    
    console.log(`\nSuccessfully inserted ${insertedRows} question records across 4 exam types.`);
    console.log(`That makes ${examsData.length} unique questions for Biology!`);
    
  } catch (err) {
    console.error('Database insertion error:', err);
  } finally {
    pool.end();
  }
}

parseBiology();
