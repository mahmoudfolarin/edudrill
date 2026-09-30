require('dotenv').config();
const pool = require('./src/config/database');

async function checkSyllabuses() {
  try {
    const res = await pool.query(`
      SELECT s.name 
      FROM subjects s
      LEFT JOIN syllabuses sy ON s.id = sy.subject_id
      WHERE sy.id IS NULL
      ORDER BY s.name ASC;
    `);
    
    console.log("Subjects WITHOUT syllabus:");
    res.rows.forEach(r => console.log(`- ${r.name}`));
    
    const resAll = await pool.query(`SELECT count(*) FROM subjects`);
    const resWith = await pool.query(`SELECT count(DISTINCT subject_id) FROM syllabuses`);
    
    console.log(`\nTotal Subjects: ${resAll.rows[0].count}`);
    console.log(`Subjects WITH syllabus: ${resWith.rows[0].count}`);
    
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

checkSyllabuses();
