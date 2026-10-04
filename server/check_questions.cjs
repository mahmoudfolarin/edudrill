require('dotenv').config({path: './.env'});
const pool = require('./src/config/database');

async function checkSubjects() {
  try {
    const subjectsRes = await pool.query(`SELECT id, name, slug FROM subjects WHERE is_active = TRUE`);
    const subjects = subjectsRes.rows;

    const questionsRes = await pool.query(`
      SELECT subject_id, COUNT(*) as q_count 
      FROM questions 
      WHERE is_active = TRUE 
      GROUP BY subject_id
    `);
    
    const questionCounts = {};
    questionsRes.rows.forEach(row => {
      questionCounts[row.subject_id] = parseInt(row.q_count);
    });

    let missing = [];
    subjects.forEach(sub => {
      if (!questionCounts[sub.id] || questionCounts[sub.id] === 0) {
        missing.push(sub.name);
      }
    });

    if (missing.length === 0) {
      console.log("YES - All subjects have questions.");
    } else {
      console.log("NO - The following subjects have 0 questions:");
      missing.forEach(m => console.log(`- ${m}`));
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

checkSubjects();
