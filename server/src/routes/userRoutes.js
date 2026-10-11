const express = require("express");
const pool = require("../config/database");

const router = express.Router();

// Get bookmarks for a user/device
router.get("/bookmarks", async (req, res) => {
  const userId = req.query.userId || req.query.user_id;
  try {
    if (!userId) {
      return res.json([]);
    }
    const result = await pool.query(
      "SELECT * FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching bookmarks" });
  }
});

// Add a bookmark
router.post("/bookmarks", async (req, res) => {
  const { 
    lesson_id, 
    topic_id, 
    subject, 
    exam, 
    title, 
    topic_title, 
    subject_name,
    user_id = req.body.userId || null 
  } = req.body;

  try {
    // Check if it already exists for this user
    let checkQuery = "SELECT id FROM bookmarks WHERE lesson_id = $1";
    const checkParams = [lesson_id];

    if (user_id) {
      checkQuery += " AND user_id = $2";
      checkParams.push(user_id);
    } else {
      checkQuery += " AND user_id IS NULL";
    }

    const check = await pool.query(checkQuery, checkParams);
    if (check.rows.length > 0) {
      return res.status(200).json({ message: "Already bookmarked" });
    }
    
    const result = await pool.query(
      "INSERT INTO bookmarks (lesson_id, topic_id, subject, exam, title, topic_title, subject_name, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [lesson_id, topic_id, subject, exam, title, topic_title, subject_name, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error adding bookmark" });
  }
});

// Delete a bookmark
router.delete("/bookmarks/:lesson_id", async (req, res) => {
  const { lesson_id } = req.params;
  const userId = req.query.userId || req.query.user_id || req.body.userId || req.body.user_id || null;

  try {
    let deleteQuery = "DELETE FROM bookmarks WHERE lesson_id = $1";
    const deleteParams = [lesson_id];

    if (userId) {
      deleteQuery += " AND user_id = $2";
      deleteParams.push(userId);
    }

    await pool.query(deleteQuery, deleteParams);
    res.json({ message: "Bookmark removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error deleting bookmark" });
  }
});

// Get performances for a user/device
router.get("/performance", async (req, res) => {
  const userId = req.query.userId || req.query.user_id;
  try {
    if (!userId) {
      return res.json([]);
    }
    const result = await pool.query(
      "SELECT * FROM performance WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching performances" });
  }
});

// Add a performance
router.post("/performance", async (req, res) => {
  const { 
    exam, 
    subject, 
    type, 
    topic_id, 
    score, 
    total, 
    percentage, 
    correct_count = 0, 
    wrong_count = 0, 
    unanswered_count = 0, 
    time_used = 0, 
    detailed_responses = null,
    user_id = req.body.userId || null
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO performance (
        exam, subject, type, topic_id, score, total, percentage, 
        correct_count, wrong_count, unanswered_count, time_used, 
        detailed_responses, user_id
      ) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
      RETURNING *`,
      [
        exam, 
        subject, 
        type, 
        topic_id, 
        score, 
        total, 
        percentage, 
        correct_count, 
        wrong_count, 
        unanswered_count, 
        time_used, 
        detailed_responses ? JSON.stringify(detailed_responses) : null,
        user_id
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error adding performance" });
  }
});

module.exports = router;
