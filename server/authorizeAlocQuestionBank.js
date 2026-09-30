require("dotenv").config({ path: require("node:path").join(__dirname, ".env") })

const pool = require("./src/config/database")

async function authorizeAlocQuestionBank() {
  if (!process.argv.includes("--confirm-rights")) {
    throw new Error("Confirm redistribution rights with --confirm-rights before authorizing records.")
  }

  const client = await pool.connect()

  try {
    await client.query("BEGIN")

    const result = await client.query(`
      WITH updated_questions AS (
        UPDATE questions
        SET license_status = 'authorized'
        WHERE source_provider = 'aloc'
          AND license_status = 'pending'
        RETURNING past_paper_id
      ), updated_papers AS (
        UPDATE past_papers p
        SET license_status = 'authorized',
            updated_at = CURRENT_TIMESTAMP
        WHERE p.license_status = 'pending'
          AND (
            p.source_provider = 'aloc'
            OR p.id IN (
              SELECT DISTINCT q.past_paper_id
              FROM questions q
              WHERE q.source_provider = 'aloc'
                AND q.past_paper_id IS NOT NULL
            )
          )
        RETURNING p.id
      )
      SELECT
        (SELECT COUNT(*)::INTEGER FROM updated_questions) AS questions_authorized,
        (SELECT COUNT(*)::INTEGER FROM updated_papers) AS papers_authorized
    `)

    await client.query("COMMIT")
    console.log("ALOC redistribution authorization recorded:", result.rows[0])
    console.log("Verification statuses were left unchanged.")
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

authorizeAlocQuestionBank().catch(async (error) => {
  console.error("Could not authorize ALOC question bank:", error.message)
  process.exitCode = 1
  await pool.end()
})
