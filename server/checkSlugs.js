require('dotenv').config();
const pool = require('./src/config/database');
pool.query("SELECT slug FROM subjects")
  .then(r => console.log(r.rows.map(x=>x.slug)))
  .catch(console.error)
  .finally(() => pool.end());
