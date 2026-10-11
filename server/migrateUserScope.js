require("dotenv").config({ path: __dirname + "/.env" });
const pool = require("./src/config/database");

async function migrateUserScope() {
  try {
    console.log("Adding user_id column to performance table...");
    await pool.query(`
      ALTER TABLE performance 
      ADD COLUMN IF NOT EXISTS user_id VARCHAR(255);
    `);

    console.log("Creating index on performance(user_id)...");
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_performance_user_id ON performance(user_id);
    `);

    console.log("Adding user_id column to bookmarks table...");
    await pool.query(`
      ALTER TABLE bookmarks 
      ADD COLUMN IF NOT EXISTS user_id VARCHAR(255);
    `);

    console.log("Creating index on bookmarks(user_id)...");
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON bookmarks(user_id);
    `);

    console.log("Migration completed successfully!");
  } catch (err) {
    console.error("Migration error:", err);
  } finally {
    await pool.end();
  }
}

migrateUserScope();
