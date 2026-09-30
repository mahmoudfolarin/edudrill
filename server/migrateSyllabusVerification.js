require("dotenv").config()

const pool = require("./src/config/database")

async function migrateSyllabusVerification() {
  try {
    await pool.query(`
      ALTER TABLE syllabuses
      ADD COLUMN IF NOT EXISTS source_name VARCHAR(255),
      ADD COLUMN IF NOT EXISTS source_url TEXT,
      ADD COLUMN IF NOT EXISTS source_document_version VARCHAR(100),
      ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50) NOT NULL DEFAULT 'pending',
      ADD COLUMN IF NOT EXISTS verified_by VARCHAR(255),
      ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP,
      ADD COLUMN IF NOT EXISTS review_notes TEXT
    `)

    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_syllabuses_verification
      ON syllabuses(verification_status)
    `)

    console.log("Syllabus verification migration completed.")
  } catch (error) {
    console.error("Syllabus verification migration failed:", error)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}

migrateSyllabusVerification()
