require('dotenv').config({path: './.env'});
const pool = require('./src/config/database');

async function updateUsersTable() {
  const query = `
    ALTER TABLE users
    ALTER COLUMN password_hash DROP NOT NULL,
    ADD COLUMN IF NOT EXISTS school VARCHAR(255),
    ADD COLUMN IF NOT EXISTS state VARCHAR(100),
    ADD COLUMN IF NOT EXISTS phone_number VARCHAR(50);
  `;
  try {
    await pool.query(query);
    console.log("Users table updated successfully to support passwordless onboarding.");
  } catch (err) {
    console.error("Error updating users table", err);
  } finally {
    pool.end();
  }
}

updateUsersTable();
