require('dotenv').config({path: './.env'});
const pool = require('./src/config/database');

async function getAgricTopics() {
  try {
    const res = await pool.query(`
      SELECT t.id, t.title 
      FROM topics t 
      JOIN syllabuses s ON t.syllabus_id = s.id 
      JOIN subjects sub ON s.subject_id = sub.id 
      WHERE sub.name = 'Agriculture' 
      ORDER BY t.id ASC
    `);
    console.log(JSON.stringify(res.rows, null, 2));
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
getAgricTopics();
