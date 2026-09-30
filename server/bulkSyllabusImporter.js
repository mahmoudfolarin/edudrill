require("dotenv").config()

const pool = require("./src/config/database")

function makeSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

async function getSubject(subjectSlug) {
  const result = await pool.query(
    `
    SELECT id, name, slug
    FROM subjects
    WHERE slug = $1
      AND is_active = TRUE
    LIMIT 1
    `,
    [subjectSlug],
  )

  if (result.rows.length === 0) {
    throw new Error(`Subject not found: ${subjectSlug}`)
  }

  return result.rows[0]
}

async function getOrCreateSyllabus({
  subjectId,
  exam,
  year,
  title,
  description,
  sourceName,
  sourceUrl,
}) {
  const result = await pool.query(
    `
    INSERT INTO syllabuses
    (
      subject_id,
      exam,
      syllabus_year,
      title,
      description,
      is_active,
      source_name,
      source_url,
      verification_status,
      review_notes
    )
    VALUES
    (
      $1,
      $2,
      $3,
      $4,
      $5,
      FALSE,
      $6,
      $7,
      'pending',
      'Imported into EduDrill. Awaiting verification before publication.'
    )
    ON CONFLICT (subject_id, exam, syllabus_year)
    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      source_name = EXCLUDED.source_name,
      source_url = EXCLUDED.source_url
    RETURNING *
    `,
    [
      subjectId,
      exam,
      year,
      title,
      description,
      sourceName || null,
      sourceUrl || null,
    ],
  )

  return result.rows[0]
}

async function getOrCreateTopic(syllabusId, topic, topicOrder) {
  const result = await pool.query(
    `
    INSERT INTO topics
    (
      syllabus_id,
      title,
      slug,
      description,
      topic_order,
      is_active
    )
    VALUES
    ($1, $2, $3, $4, $5, TRUE)
    ON CONFLICT (syllabus_id, slug)
    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      topic_order = EXCLUDED.topic_order
    RETURNING *
    `,
    [
      syllabusId,
      topic.title,
      makeSlug(topic.title),
      topic.description || null,
      topicOrder,
    ],
  )

  return result.rows[0]
}

async function getOrCreateSubtopic(topicId, subtopic, subtopicOrder) {
  const result = await pool.query(
    `
    INSERT INTO subtopics
    (
      topic_id,
      title,
      slug,
      description,
      subtopic_order,
      is_active
    )
    VALUES
    ($1, $2, $3, $4, $5, TRUE)
    ON CONFLICT (topic_id, slug)
    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      subtopic_order = EXCLUDED.subtopic_order
    RETURNING *
    `,
    [
      topicId,
      subtopic.title,
      makeSlug(subtopic.title),
      subtopic.description || null,
      subtopicOrder,
    ],
  )

  return result.rows[0]
}

async function getOrCreateLesson(
  topicId,
  subtopicId,
  lesson,
  lessonOrder,
) {
  const result = await pool.query(
    `
    INSERT INTO lessons
    (
      topic_id,
      subtopic_id,
      title,
      slug,
      content,
      lesson_order,
      is_active
    )
    VALUES
    ($1, $2, $3, $4, $5, $6, TRUE)
    ON CONFLICT (topic_id, slug)
    DO UPDATE SET
      subtopic_id = EXCLUDED.subtopic_id,
      title = EXCLUDED.title,
      content = EXCLUDED.content,
      lesson_order = EXCLUDED.lesson_order
    RETURNING *
    `,
    [
      topicId,
      subtopicId || null,
      lesson.title,
      makeSlug(lesson.title),
      lesson.content || null,
      lessonOrder,
    ],
  )

  return result.rows[0]
}

async function importSyllabus(data) {
  const subject = await getSubject(data.subject)

  const syllabus = await getOrCreateSyllabus({
    subjectId: subject.id,
    exam: data.exam,
    year: data.year,
    title: data.title,
    description: data.description,
    sourceName: data.sourceName,
    sourceUrl: data.sourceUrl,
  })

  let topicCount = 0
  let subtopicCount = 0
  let lessonCount = 0

  for (let i = 0; i < data.topics.length; i++) {
    const topicData = data.topics[i]

    const topic = await getOrCreateTopic(
      syllabus.id,
      topicData,
      i + 1,
    )

    topicCount++

    const subtopics = topicData.subtopics || []

    for (let j = 0; j < subtopics.length; j++) {
      const subtopicData = subtopics[j]

      const subtopic = await getOrCreateSubtopic(
        topic.id,
        subtopicData,
        j + 1,
      )

      subtopicCount++

      const lessons = subtopicData.lessons || []

      for (let k = 0; k < lessons.length; k++) {
        await getOrCreateLesson(
          topic.id,
          subtopic.id,
          lessons[k],
          k + 1,
        )

        lessonCount++
      }
    }
  }

  return {
    subject: subject.name,
    syllabusId: syllabus.id,
    topics: topicCount,
    subtopics: subtopicCount,
    lessons: lessonCount,
  }
}

module.exports = {
  importSyllabus,
}
const syllabusData = require("./syllabusData")

async function runImport() {
  try {
    console.log("Starting EduDrill syllabus import...")

    for (const syllabus of syllabusData) {
      const result = await importSyllabus(syllabus)

      console.log("")
      console.log(`✅ ${result.subject}`)
      console.log(`   Syllabus ID: ${result.syllabusId}`)
      console.log(`   Topics: ${result.topics}`)
      console.log(`   Subtopics: ${result.subtopics}`)
      console.log(`   Lessons: ${result.lessons}`)
    }

    console.log("")
    console.log("🎉 Syllabus import completed.")
  } catch (error) {
    console.error("")
    console.error("❌ Syllabus import failed:")
    console.error(error)
  } finally {
    await pool.end()
  }
}

runImport()