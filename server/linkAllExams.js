require('dotenv').config();
const pool = require('./src/config/database');

async function linkAllExams() {
  try {
    console.log("Fetching all exams...");
    const examsRes = await pool.query('SELECT id, slug FROM exams WHERE is_active = TRUE');
    const exams = examsRes.rows;
    console.log(`Found ${exams.length} active exams.`);

    console.log("Fetching all syllabuses...");
    const sylRes = await pool.query('SELECT id, title FROM syllabuses');
    const syllabuses = sylRes.rows;
    console.log(`Found ${syllabuses.length} syllabuses.`);

    for (const syllabus of syllabuses) {
      for (const exam of exams) {
        await pool.query(
          `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active)
           VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
          [syllabus.id, exam.id]
        );
      }
      console.log(`Linked syllabus "${syllabus.title}" to all exams.`);
    }

    console.log("Done linking all syllabuses to all exams!");
  } catch (e) {
    console.error("Error linking exams:", e);
  } finally {
    pool.end();
  }
}

linkAllExams();
