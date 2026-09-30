require('dotenv').config();
const pool = require('./src/config/database');
pool.query(`SELECT exam, COUNT(id) FROM questions WHERE subject_id = (SELECT id FROM subjects WHERE slug = 'english-language') GROUP BY exam`)
  .then(r => console.log(r.rows))
  .catch(console.error)
  .finally(() => pool.end());
