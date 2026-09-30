require('dotenv').config();
const pool = require('./src/config/database');

async function fixOrder() {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Get all topics
    const topicsRes = await client.query('SELECT id FROM topics');
    
    for (const topic of topicsRes.rows) {
      // Get all lessons for this topic ordered by subtopic_order
      const lessonsRes = await client.query(`
        SELECT l.id 
        FROM lessons l
        JOIN subtopics s ON l.subtopic_id = s.id
        WHERE l.topic_id = $1
        ORDER BY s.subtopic_order ASC, l.id ASC
      `, [topic.id]);
      
      let order = 1;
      for (const lesson of lessonsRes.rows) {
        await client.query('UPDATE lessons SET lesson_order = $1 WHERE id = $2', [order, lesson.id]);
        order++;
      }
    }
    
    await client.query('COMMIT');
    console.log('Successfully updated lesson_order for all lessons!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
  } finally {
    client.release();
    pool.end();
  }
}

fixOrder();
