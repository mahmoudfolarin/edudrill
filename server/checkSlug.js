require('dotenv').config();
const pool = require('./src/config/database');
async function chk() {
  const res = await pool.query(`SELECT slug FROM subjects WHERE name ILIKE '%Health%'`);
  console.log(res.rows);
  pool.end();
}
chk();
