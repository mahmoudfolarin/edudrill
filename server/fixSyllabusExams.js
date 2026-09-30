require('dotenv').config();
const pool = require('./src/config/database');

async function fix() {
  try {
    const examRes = await pool.query('SELECT id FROM exams WHERE slug = $1', ['waec']);
    if (examRes.rows.length === 0) {
      console.log('exam not found');
      return;
    }
    const examId = examRes.rows[0].id;
    
    const sylRes = await pool.query('SELECT id FROM syllabuses WHERE exam = $1', ['WAEC']);
    for (const row of sylRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active)
         VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [row.id, examId]
      );
      console.log(`Linked syllabus ${row.id} to WAEC`);
    }
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

fix();
