const express = require("express");
const pool = require("../config/database");

const router = express.Router();

// Get all bookmarks
router.get("/bookmarks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM bookmarks ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching bookmarks" });
  }
});

// Add a bookmark
router.post("/bookmarks", async (req, res) => {
  const { lesson_id, topic_id, subject, exam, title, topic_title, subject_name } = req.body;
  try {
    // Check if it exists
    const check = await pool.query("SELECT id FROM bookmarks WHERE lesson_id = $1", [lesson_id]);
    if (check.rows.length > 0) {
      return res.status(200).json({ message: "Already bookmarked" });
    }
    
    const result = await pool.query(
      "INSERT INTO bookmarks (lesson_id, topic_id, subject, exam, title, topic_title, subject_name) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [lesson_id, topic_id, subject, exam, title, topic_title, subject_name]
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
  try {
    await pool.query("DELETE FROM bookmarks WHERE lesson_id = $1", [lesson_id]);
    res.json({ message: "Bookmark removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error deleting bookmark" });
  }
});

// Get all performances
router.get("/performance", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM performance ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error fetching performances" });
  }
});

// Add a performance
router.post("/performance", async (req, res) => {
  const { exam, subject, type, topic_id, score, total, percentage, correct_count = 0, wrong_count = 0, unanswered_count = 0, time_used = 0, detailed_responses = null } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO performance (exam, subject, type, topic_id, score, total, percentage, correct_count, wrong_count, unanswered_count, time_used, detailed_responses) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [exam, subject, type, topic_id, score, total, percentage, correct_count, wrong_count, unanswered_count, time_used, detailed_responses ? JSON.stringify(detailed_responses) : null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error adding performance" });
  }
});

module.exports = router;
