require("dotenv").config({ path: require("node:path").join(__dirname, ".env") })

const pool = require("./src/config/database")

async function linkImportedQuestionsToPapers() {
  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    const result = await client.query(`
      WITH question_groups AS (
        SELECT
          q.exam,
          q.subject_id,
          q.year,
          q.source_provider,
          MIN(q.source_name) AS source_name,
          MIN(q.source_url) AS source_url,
          COUNT(*)::INTEGER AS question_count
        FROM questions q
        WHERE q.source_type = 'past_question'
          AND q.source_provider IS NOT NULL
          AND q.year IS NOT NULL
          AND q.past_paper_id IS NULL
        GROUP BY q.exam, q.subject_id, q.year, q.source_provider
      ), inserted_papers AS (
        INSERT INTO past_papers (
          exam,
          subject_id,
          year,
          session,
          paper_code,
          paper_title,
          paper_type,
          total_questions,
          instructions,
          source_name,
          source_url,
          license_status,
          verification_status,
          is_active,
          source_provider
        )
        SELECT
          g.exam,
          g.subject_id,
          g.year,
          g.source_provider,
          UPPER(g.source_provider) || '-IMPORTED-OBJECTIVE',
          g.exam || ' ' || s.name || ' ' || g.year || ' Objective',
          'objective',
          g.question_count,
          'Imported source questions; awaiting rights and content review.',
          g.source_name,
          g.source_url,
          'pending',
          'pending',
          TRUE,
          g.source_provider
        FROM question_groups g
        JOIN subjects s ON s.id = g.subject_id
        ON CONFLICT (exam, subject_id, year, session, paper_code)
        DO UPDATE SET
          total_questions = EXCLUDED.total_questions,
          updated_at = CURRENT_TIMESTAMP
        RETURNING id, exam, subject_id, year, session
      )
      UPDATE questions q
      SET past_paper_id = p.id
      FROM inserted_papers p
      WHERE q.past_paper_id IS NULL
        AND q.source_type = 'past_question'
        AND q.source_provider = p.session
        AND q.exam = p.exam
        AND q.subject_id = p.subject_id
        AND q.year = p.year
      RETURNING q.id
    `)

    await client.query("COMMIT")
    console.log(`Linked ${result.rowCount} imported questions to past-paper records.`)
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("Linking imported questions failed:", error.message)
    process.exitCode = 1
  } finally {
    client.release()
    await pool.end()
  }
}

linkImportedQuestionsToPapers()
