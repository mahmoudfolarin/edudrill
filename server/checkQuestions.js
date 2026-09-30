require('dotenv').config();
const pool = require('./src/config/database');

async function check() {
  const result = await pool.query("SELECT COUNT(*) FROM questions WHERE exam='JAMB' AND subject_id=(SELECT id FROM subjects WHERE slug='biology')");
  console.log('JAMB Biology count:', result.rows[0].count);

  const res2 = await pool.query("SELECT COUNT(*) FROM questions");
  console.log('Total questions count:', res2.rows[0].count);

  const res3 = await pool.query("SELECT * FROM subjects");
  console.log('Subjects:', res3.rows.map(r => r.slug));

  pool.end();
}
check();
