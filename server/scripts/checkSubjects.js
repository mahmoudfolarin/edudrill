require('dotenv').config();
const pool = require('./src/config/database');
(async () => {
  try {
    const res = await pool.query(`
      SELECT s.slug, s.name, COUNT(q.id) as q_count 
      FROM subjects s 
      LEFT JOIN questions q ON s.id = q.subject_id 
      GROUP BY s.slug, s.name 
      ORDER BY q_count ASC
    `);
    console.table(res.rows);
  } finally {
    pool.end();
  }
})();
