require('dotenv').config();
const pool = require('./src/config/database');
pool.query("SELECT source_type, license_status FROM questions LIMIT 5")
  .then(r => console.log(r.rows))
  .catch(console.error)
  .finally(() => pool.end());
