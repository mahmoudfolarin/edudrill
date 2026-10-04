const { Pool } = require('pg');
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'edudrill',
  password: 'EduDrill2010',
  port: 5432,
});

async function updateDB() {
  try {
    await pool.query(`
      ALTER TABLE performance 
      ADD COLUMN IF NOT EXISTS correct_count INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS wrong_count INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS unanswered_count INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS time_used INTEGER DEFAULT 0,
      ADD COLUMN IF NOT EXISTS detailed_responses JSONB;
    `);
    console.log('Successfully updated performance table.');
  } catch(e) {
    console.error(e);
  } finally {
    pool.end();
  }
}
updateDB();
