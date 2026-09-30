require('dotenv').config();
const pool = require('./src/config/database');

async function checkSyllabuses() {
  try {
    const res = await pool.query(`
      SELECT DISTINCT s.name 
      FROM subjects s
      INNER JOIN syllabuses sy ON s.id = sy.subject_id
      ORDER BY s.name ASC;
    `);
    
    console.log("Subjects WITH syllabus:");
    res.rows.forEach(r => console.log(`- ${r.name}`));
    
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

checkSyllabuses();
