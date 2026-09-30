require('dotenv').config();
const pool = require('./src/config/database');
pool.query(`SELECT s.slug, COUNT(q.id) FROM subjects s JOIN questions q ON s.id = q.subject_id WHERE s.slug IN ('english-language', 'use-of-english') GROUP BY s.slug`)
  .then(r => console.log(r.rows))
  .catch(console.error)
  .finally(() => pool.end());
