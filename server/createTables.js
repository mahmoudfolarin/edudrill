require('dotenv').config();
const pool = require('./src/config/database');

async function createTables() {
  try {
    console.log("Creating bookmarks table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookmarks (
          id SERIAL PRIMARY KEY,
          lesson_id VARCHAR(150) NOT NULL,
          topic_id VARCHAR(150),
          subject VARCHAR(150) NOT NULL,
          exam VARCHAR(50) NOT NULL,
          title VARCHAR(255),
          topic_title VARCHAR(255),
          subject_name VARCHAR(255),
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log("Creating performance table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS performance (
          id SERIAL PRIMARY KEY,
          exam VARCHAR(50) NOT NULL,
          subject VARCHAR(150) NOT NULL,
          type VARCHAR(50) NOT NULL,
          topic_id VARCHAR(150),
          score INTEGER NOT NULL,
          total INTEGER NOT NULL,
          percentage INTEGER NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    console.log("Tables created successfully.");
  } catch (err) {
    console.error("Error creating tables", err);
  } finally {
    pool.end();
  }
}

createTables();
