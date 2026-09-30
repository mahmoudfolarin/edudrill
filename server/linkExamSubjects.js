require('dotenv').config();
const pool = require('./src/config/database');

async function linkExamSubjects() {
  try {
    const examsRes = await pool.query('SELECT id, name FROM exams');
    const exams = examsRes.rows;
    
    const subjectsRes = await pool.query('SELECT id, name FROM subjects');
    const subjects = subjectsRes.rows;

    let linkedCount = 0;
    for (const exam of exams) {
      for (const subject of subjects) {
        await pool.query(
          `INSERT INTO exam_subjects (exam_id, subject_id, is_active)
           VALUES ($1, $2, true)
           ON CONFLICT ON CONSTRAINT exam_subjects_exam_id_subject_id_key DO NOTHING`,
          [exam.id, subject.id]
        );
        linkedCount++;
      }
    }
    console.log(`Ensured ${linkedCount} links between exams and subjects exist.`);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    pool.end();
  }
}

linkExamSubjects();
