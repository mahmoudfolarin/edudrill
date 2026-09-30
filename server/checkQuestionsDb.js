require('dotenv').config();
const pool = require('./src/config/database');

async function checkQuestions() {
  try {
    const res = await pool.query(`
      SELECT s.name, COUNT(q.id) as question_count
      FROM subjects s
      JOIN questions q ON s.id = q.subject_id
      GROUP BY s.name
      ORDER BY s.name ASC;
    `);
    
    console.log("Subjects WITH Practice and CBT Questions:");
    let total = 0;
    res.rows.forEach(r => {
      console.log(`- ${r.name} (${r.question_count} questions)`);
      total += parseInt(r.question_count);
    });
    
    console.log(`\nTotal subjects with questions: ${res.rows.length}`);
    console.log(`Total questions in database: ${total}`);
    
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}

checkQuestions();
