require('dotenv').config();
const pool = require('./src/config/database');
async function chk() {
  const res = await pool.query("SELECT * FROM subjects WHERE name ILIKE '%agric%' OR slug ILIKE '%agric%'");
  console.log(res.rows);
  pool.end();
}
chk();
