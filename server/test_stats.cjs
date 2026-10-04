require('dotenv').config({path: './.env'});
const pool = require('./src/config/database');
pool.query(`
SELECT
  (SELECT COUNT(*) FROM subjects WHERE is_active = TRUE) AS subjects,
  (SELECT COUNT(*) FROM questions WHERE is_active = TRUE) AS questions,
  (SELECT COUNT(*) FROM past_papers WHERE is_active = TRUE) AS past_papers,
  (SELECT COUNT(*) FROM syllabuses WHERE is_active = TRUE) AS syllabuses,
  (SELECT COUNT(*) FROM topics WHERE is_active = TRUE) AS topics,
  (SELECT COUNT(*) FROM lessons WHERE is_active = TRUE) AS lessons,
  (SELECT COUNT(*) FROM activation_keys) AS activation_keys,
  (SELECT COUNT(*) FROM product_licenses WHERE status = 'active') AS active_licenses
`)
.then(res => console.log(res.rows))
.catch(console.error)
.finally(() => pool.end());
