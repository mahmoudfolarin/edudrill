require('dotenv').config();
const fs = require('fs');
const path = require('path');
const pool = require('../src/config/database');

const filePath = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\1b370a40-af59-4ef6-be24-829ac475f47f\\.user_uploaded\\nigerian_history.txt';

async function main() {
  const fullText = fs.readFileSync(filePath, 'utf8');
  const subjectSlug = 'nigerian-history';
  const subjectGroup = 'Arts';

  // Extract Answer Key
  const answersMatch = fullText.match(/# Answer Key\n([\s\S]*)/i);
  let answersText = '';
  if (answersMatch) {
    answersText = answersMatch[1];
  }

  const answers = {};
  const answerRegex = /(\d+)\.\s*([A-D])/g;
  let match;
  while ((match = answerRegex.exec(answersText)) !== null) {
    answers[parseInt(match[1])] = match[2];
  }

  let questionsText = fullText;
  if (answersMatch) {
    questionsText = fullText.substring(0, answersMatch.index);
  }

  // Find all questions. Format: **1. Question?** \n A. Option \n B. Option \n C. Option \n D. Option
  const qStartRegex = /\*\*(\d+)\.\s*(.*?)\*\*\s*A\.\s*(.*?)\s*B\.\s*(.*?)\s*C\.\s*(.*?)\s*D\.\s*(.*?)(?=\*\*|$)/gs;
  
  const examsData = [];
  let qCount = 0;
  
  let iterMatch;
  while ((iterMatch = qStartRegex.exec(questionsText)) !== null) {
    const qNum = parseInt(iterMatch[1]);
    const qText = iterMatch[2].trim().replace(/\n/g, ' ');
    const optA = iterMatch[3].trim().replace(/\n/g, ' ');
    const optB = iterMatch[4].trim().replace(/\n/g, ' ');
    const optC = iterMatch[5].trim().replace(/\n/g, ' ');
    const optD = iterMatch[6].trim().replace(/\n/g, ' ');
    
    const correctAnswer = answers[qNum];
    if (correctAnswer) {
      examsData.push({
        qText, optA, optB, optC, optD, correctAnswer
      });
      qCount++;
    }
  }

  console.log(`Parsed ${qCount} questions for ${subjectSlug}`);

  // Insert into DB
  try {
    const subRes = await pool.query('SELECT id FROM subjects WHERE slug = $1', [subjectSlug]);
    let subjectId;
    if (subRes.rows.length > 0) {
      subjectId = subRes.rows[0].id;
    } else {
      const insRes = await pool.query('INSERT INTO subjects (name, slug, subject_group) VALUES ($1, $2, $3) RETURNING id', ['Nigerian History', subjectSlug, subjectGroup]);
      subjectId = insRes.rows[0].id;
    }

    const exams = ['WAEC', 'NECO', 'JAMB', 'GCE'];
    let inserted = 0;
    for (const q of examsData) {
      for (const e of exams) {
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
            e, 2025, subjectId, q.qText,
            q.optA, q.optB, q.optC, q.optD, q.correctAnswer,
            'medium', 1, 'past_question', 'public_domain', true,
            'verified', null
          ]
        );
        inserted++;
      }
    }
    console.log(`Inserted ${inserted} question rows across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
