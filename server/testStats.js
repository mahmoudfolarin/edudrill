require('dotenv').config();
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
        (SELECT COUNT(*) FROM product_licenses WHERE status = 'active') AS active_licenses, (SELECT COUNT(*) FROM users) AS users
`)
.then(r => { console.log("SUCCESS:", r.rows); })
.catch(e => { console.error("ERROR:", e); })
.finally(() => pool.end());
