require('dotenv').config();
const pool = require('./src/config/database');

async function wipeData() {
  try {
    console.log("Connecting to database...");
    
    // Using CASCADE to also delete dependent rows in topics, subtopics, lessons, and questions
    console.log("Deleting all syllabuses (and cascading to topics, subtopics, lessons)...");
    
    await pool.query('TRUNCATE TABLE syllabuses CASCADE');
    
    console.log("All syllabuses, topics, subtopics, and lessons have been successfully deleted.");
  } catch (error) {
    console.error("Error deleting data:", error);
  } finally {
    await pool.end();
  }
}

wipeData();
