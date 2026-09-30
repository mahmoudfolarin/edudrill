require('dotenv').config();
const pool = require('./src/config/database');
async function clean() {
  try {
    const sub = await pool.query("SELECT id FROM subjects WHERE slug = 'islamic-studies'");
    if(sub.rows.length > 0) {
      await pool.query("DELETE FROM syllabuses WHERE subject_id = $1", [sub.rows[0].id]);
      console.log("Cleaned up Islamic Studies");
    }
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
clean();
