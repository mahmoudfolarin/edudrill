const fs = require("fs")
const path = require("path")
require("dotenv").config()

const pool = require("./src/config/database")

async function setupDatabase() {
  try {
    const sqlPath = path.join(__dirname, "src", "database.sql")
    const sql = fs.readFileSync(sqlPath, "utf8")

    await pool.query(sql)

    console.log("EduDrill database tables created successfully.")
  } catch (error) {
    console.error("Database setup failed:")
    console.error(error)
  } finally {
    await pool.end()
  }
}

setupDatabase()