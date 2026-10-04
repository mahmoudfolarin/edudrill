require('dotenv').config({path: './.env'});
const pool = require('./src/config/database');

async function listSubjectsWithSyllabus() {
  try {
    const query = `
      SELECT DISTINCT s.name 
      FROM subjects s
      JOIN topics t ON s.id = t.subject_id
      ORDER BY s.name ASC
    `;
    const res = await pool.query(query);
    console.log("Subjects with at least one syllabus topic:");
    res.rows.forEach((row, i) => {
      console.log(`${i + 1}. ${row.name}`);
    });
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

listSubjectsWithSyllabus();
