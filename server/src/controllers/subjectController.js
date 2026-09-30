const pool = require("../config/database")

async function getSubjects(req, res) {
  try {
    const result = await pool.query(
      `
      SELECT
        id,
        name,
        slug,
        subject_group,
        icon,
        is_new,
        is_active,
        created_at
      FROM subjects
      WHERE is_active = TRUE
      ORDER BY
        CASE subject_group
          WHEN 'Core Subjects' THEN 1
          WHEN 'Science' THEN 2
          WHEN 'Humanities' THEN 3
          WHEN 'Business' THEN 4
          WHEN 'Trade / Vocational' THEN 5
          ELSE 6
        END,
        name ASC
      `,
    )

    res.json({
      success: true,
      subjects: result.rows,
    })
  } catch (error) {
    console.error(
      "Get subjects error:",
      error,
    )

    res.status(500).json({
      success: false,
      message: "Failed to retrieve subjects",
    })
  }
}

async function createSubject(req, res) {
  const { name, subject_group, icon, exam_slugs } = req.body;
  
  if (!name) {
    return res.status(400).json({ success: false, message: "Subject name is required" });
  }

  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const group = subject_group || 'Other Subjects';
  const subIcon = icon || '📝';
  const exams = Array.isArray(exam_slugs) ? exam_slugs : (exam_slugs === 'all' ? 'all' : []);

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Insert subject
    const subjectResult = await client.query(
      `INSERT INTO subjects (name, slug, subject_group, icon, is_new, is_active)
       VALUES ($1, $2, $3, $4, TRUE, TRUE)
       RETURNING id, name, slug`,
      [name, slug, group, subIcon]
    );

    const subjectId = subjectResult.rows[0].id;

    // Link to exams
    if (exams === 'all') {
      await client.query(
        `INSERT INTO exam_subjects (exam_id, subject_id, is_active)
         SELECT id, $1, TRUE FROM exams WHERE is_active = TRUE
         ON CONFLICT DO NOTHING`,
        [subjectId]
      );
    } else if (exams.length > 0) {
      // Find exam IDs for given slugs
      const examResult = await client.query(
        `SELECT id FROM exams WHERE slug = ANY($1) AND is_active = TRUE`,
        [exams]
      );

      for (const row of examResult.rows) {
        await client.query(
          `INSERT INTO exam_subjects (exam_id, subject_id, is_active)
           VALUES ($1, $2, TRUE)
           ON CONFLICT DO NOTHING`,
          [row.id, subjectId]
        );
      }
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: "Subject created successfully",
      subject: subjectResult.rows[0]
    });
  } catch (error) {
    await client.query('ROLLBACK');
    console.error("Create subject error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create subject"
    });
  } finally {
    client.release();
  }
}

async function deleteSubject(req, res) {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM exam_subjects WHERE subject_id = $1', [id]);
    await pool.query('DELETE FROM subjects WHERE id = $1', [id]);

    res.json({
      success: true,
      message: "Subject deleted successfully"
    });
  } catch (error) {
    console.error("Delete subject error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete subject"
    });
  }
}

module.exports = {
  getSubjects,
  createSubject,
  deleteSubject
}