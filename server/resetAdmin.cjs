const { Pool } = require('pg');
require('dotenv').config();
const bcrypt = require('bcryptjs');

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5432,
  ssl: { rejectUnauthorized: false }
});

async function resetAdmin() {
  try {
    const res = await pool.query("SELECT id, email, role FROM users WHERE role = 'admin'");
    console.log("Admins found:", res.rows);
    
    if (res.rows.length > 0) {
      const adminId = res.rows[0].id;
      const newPassword = 'Edudrill@2026';
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      
      await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [hash, adminId]);
      console.log(`Password for ${res.rows[0].email} reset to 'Edudrill@2026'`);
    } else {
      console.log("No admins found, creating one...");
      const email = 'admin@edudrill.com';
      const newPassword = 'Edudrill@2026';
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      
      await pool.query(
        "INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES ($1, $2, $3, $4, $5)",
        [email, hash, 'Admin', 'User', 'admin']
      );
      console.log(`Created new admin: ${email} with password 'Edudrill@2026'`);
    }
  } catch (err) {
    console.error(err);
  } finally {
    pool.end();
  }
}

resetAdmin();
