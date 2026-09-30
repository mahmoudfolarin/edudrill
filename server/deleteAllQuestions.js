require('dotenv').config();
const pool = require('./src/config/database');

async function deleteAllQuestions() {
  try {
    const countRes = await pool.query('SELECT COUNT(*) FROM questions;');
    console.log(`Currently there are ${countRes.rows[0].count} questions.`);
    
    console.log('Deleting all questions...');
    await pool.query('TRUNCATE TABLE questions RESTART IDENTITY CASCADE;');
    
    console.log('Successfully deleted all questions from the database.');
  } catch (e) {
    console.error('Error deleting questions:', e);
  } finally {
    pool.end();
  }
}

deleteAllQuestions();
