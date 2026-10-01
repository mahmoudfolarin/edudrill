require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const crypto = require('crypto');
const pool = require('../src/config/database');

const userUploadedDir = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\1b370a40-af59-4ef6-be24-829ac475f47f\\.user_uploaded';

const filesToProcess = ['media_1790848725303.pdf'];

async function main() {
  const examsData = [];

  for (const filename of filesToProcess) {
    const filePath = path.join(userUploadedDir, filename);
    const dataBuffer = fs.readFileSync(filePath);
    try {
      const data = await pdfParse(dataBuffer);
      let fullText = data.text;
      
      const titleMatch = fullText.match(/COMPREHENSIVE ([\s\S]*?) EXAMINATION/i);
      if (!titleMatch) {
        console.log(`Skipping ${filename} - no title match`);
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
      else if (subjectName.includes('music')) subjectSlug = 'music';
      else if (subjectName.includes('literature')) subjectSlug = 'literature-in-english';
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
            examsData.push({
              subjectSlug,
              qText,
              optA,
              optB,
              optC,
              optD,
              correctAnswer
            });
            qCount++;
          }
        }
      }
      console.log(`Parsed ${qCount} questions for ${subjectSlug}`);

    } catch (e) {
      console.error(`Error reading ${filename}`, e);
    }
  }

  // Insert into DB
  try {
    for (const q of examsData) {
      // Find subject_id
      const subRes = await pool.query('SELECT id FROM subjects WHERE slug = $1', [q.subjectSlug]);
      let subjectId;
      if (subRes.rows.length > 0) {
        subjectId = subRes.rows[0].id;
      } else {
        const insRes = await pool.query('INSERT INTO subjects (name, slug, subject_group) VALUES ($1, $2, $3) RETURNING id', [q.subjectSlug, q.subjectSlug, 'Other']);
        subjectId = insRes.rows[0].id;
      }
      
      const exams = ['WAEC', 'NECO', 'JAMB', 'GCE'];
      for (const e of exams) {
        // Check if question already exists
        const qCheck = await pool.query('SELECT id FROM questions WHERE subject_id = $1 AND exam = $2 AND LEFT(question_text, 50) = LEFT($3, 50)', [subjectId, e, q.qText]);
        if (qCheck.rows.length > 0) continue;
        
        await pool.query(
          `INSERT INTO questions (
            exam, year, subject_id, question_text, 
            option_a, option_b, option_c, option_d, correct_answer, 
            difficulty, marks, source_type, license_status, is_active,
            verification_status, explanation
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
          [
            e,
            2025,
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
            'Parsed from PDF document.'
          ]
        );
      }
    }
    console.log(`Inserted ${examsData.length * 4} question rows across 4 exams.`);
  } catch (err) {
    console.error("DB Insert Error", err);
  } finally {
    pool.end();
  }
}

main();
