require('dotenv').config({path: './.env'});
const pool = require('./src/config/database');
const bcrypt = require('bcryptjs');

async function createAdmin() {
  const email = "olanrewajumahmoud3@gmail.com";
  const password = "mahmoudedudrill2010";
  const name = "EduDrill Admin";
  const role = "admin";

  try {
    const check = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (check.rows.length > 0) {
      console.log("Admin already exists!");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await pool.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4)",
      [name, email, hash, role]
    );

    console.log("Admin user created successfully!");
  } catch (err) {
    console.error("Error creating admin", err);
  } finally {
    pool.end();
  }
}

createAdmin();
