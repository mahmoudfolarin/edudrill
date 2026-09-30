require('dotenv').config();
const pool = require('./src/config/database');
pool.query("UPDATE questions SET license_status = 'authorized'")
  .then(r => console.log('Updated', r.rowCount))
  .catch(console.error)
  .finally(() => pool.end());
