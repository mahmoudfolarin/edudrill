require("dotenv").config()

const pool = require("./src/config/database")

const syllabuses = [
  {
    slug: "english-language",
    exam: "WAEC",
    title: "WAEC English Language Syllabus",
    sourceName: "ENGLISH_LANGUAGE[1].pdf (user-provided WAEC syllabus)",
    topics: [
      ["Lexis", ["General vocabulary in everyday use and fields of human activity", "Idioms and collocations", "Structural elements of English", "Figurative usage", "Sense relations: synonyms, antonyms and homonyms"]],
      ["Structure", ["Word-form changes for number, tense and degree", "Word groups and sentence patterns", "Structural words: conjunctions, determiners and prepositions"]],
      ["Essay Writing", ["Letter writing", "Speech writing", "Narration", "Description", "Argument and debate", "Report writing", "Article writing", "Exposition", "Creative writing"]],
      ["Comprehension", ["Vocabulary in context", "Factual content", "Inference", "Sentiments, emotions and attitudes", "Grammar in context", "Literary terms and expressions", "Grammatical alternatives"]],
      ["Summary", ["Extracting relevant information", "Concise expression without repetition", "Summarising specified aspects of a passage"]],
      ["Oral English", ["Consonants and consonant clusters", "Pure vowels, diphthongs and triphthongs", "Rhymes", "Word stress and syllable structure", "Emphatic stress", "Intonation patterns", "Phonetic symbols"]],
    ],
  },
  {
    slug: "use-of-english",
    exam: "JAMB",
    title: "JAMB Use of English Syllabus",
    sourceName: "ENGLISH_LANGUAGE[1].pdf (user-provided WAEC syllabus)",
    topics: [
      ["Lexis", ["General vocabulary in everyday use and fields of human activity", "Idioms and collocations", "Structural elements of English", "Figurative usage", "Sense relations: synonyms, antonyms and homonyms"]],
      ["Structure", ["Word-form changes for number, tense and degree", "Word groups and sentence patterns", "Structural words: conjunctions, determiners and prepositions"]],
      ["Essay Writing", ["Letter writing", "Speech writing", "Narration", "Description", "Argument and debate", "Report writing", "Article writing", "Exposition", "Creative writing"]],
      ["Comprehension", ["Vocabulary in context", "Factual content", "Inference", "Sentiments, emotions and attitudes", "Grammar in context", "Literary terms and expressions", "Grammatical alternatives"]],
      ["Summary", ["Extracting relevant information", "Concise expression without repetition", "Summarising specified aspects of a passage"]],
      ["Oral English", ["Consonants and consonant clusters", "Pure vowels, diphthongs and triphthongs", "Rhymes", "Word stress and syllable structure", "Emphatic stress", "Intonation patterns", "Phonetic symbols"]],
    ],
  },
  {
    slug: "civic-education",
    title: "WAEC Civic Education Syllabus",
    sourceName: "CIVIC_EDUCATION[1].pdf (user-provided WAEC syllabus)",
    topics: [
      ["Values", ["Definition", "Types", "Importance of values to society"]],
      ["Citizenship and Nationalism", ["Citizenship and citizenship education", "Goals of citizenship education", "Duties and obligations of citizens", "Nationalism", "National consciousness, integrity and unity", "Nationalistic roles", "Local and world civic problems"]],
      ["Human Rights", ["Meaning and categories", "Characteristics", "Universal Declaration of Human Rights", "Seven core freedoms", "Importance and roles", "Limitations to human rights"]],
      ["Law and Order", ["Meaning and features", "Importance", "Constituted authority", "Types, importance and roles of constituted authority"]],
      ["Responsible Parenthood", ["Meaning", "Roles of responsible parents", "Importance in national development"]],
      ["Traffic Regulations", ["Meaning", "Importance in society", "Roles of individuals and government"]],
      ["Inter-Personal Relationships", ["Meaning and types", "Interpersonal skills", "Inter-communal relationships", "Inter-communal conflicts", "Conflict-resolution skills"]],
      ["Cultism", ["Meaning and origin", "Cult groups and symbols", "Causes", "Consequences", "Prevention"]],
      ["Drugs and Drug Abuse", ["Meaning", "Drugs that can be abused", "Methods and symptoms", "Behaviours of addicts", "Prevention", "Government agencies", "Laws against abuse"]],
      ["Human Trafficking", ["Meaning", "Causes", "Effects and consequences", "Government and individual responses"]],
      ["HIV/AIDS", ["Meaning", "Causes", "Symptoms and effects", "Prevention", "Stigmatisation"]],
      ["Youth Empowerment", ["Meaning", "Empowerment skills", "Benefits", "Government efforts"]],
      ["Structure and Functions of Government", ["Meaning of government", "Tiers of government", "Functions of government"]],
      ["Democracy, Rule of Law and National Development", ["Democracy: meaning, types and features", "Importance and pillars of democracy", "Problems of democracy", "Rule of law: meaning, features and importance", "Problems of rule of law", "National development", "Democracy, rule of law and national development"]],
      ["Political Apathy", ["Meaning", "Causes", "Consequences", "Leadership and follower interests", "Discouraging political apathy"]],
      ["Civil Society and Popular Participation", ["Meaning and types of popular participation", "Need for participation", "Traditional and modern modes", "Participation in politics", "Civil society: meaning, functions and characteristics", "Problems of civil society"]],
      ["Public Service in Democracy", ["Meaning", "Functions", "Problems", "Shortcomings", "Improving public service"]],
    ],
  },
]

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

async function seedSyllabus(item) {
  const subject = await pool.query("SELECT id, name FROM subjects WHERE slug = $1", [item.slug])
  if (!subject.rows[0]) throw new Error(`Subject not found: ${item.slug}`)

  const syllabus = await pool.query(
    `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active, source_name, source_document_version, verification_status, verified_by, verified_at, review_notes)
     VALUES ($1, $2, 'Undated', $3, 'Topic structure transcribed from the supplied syllabus document.', TRUE, $4, 'Undated', 'verified', 'EduDrill source review', CURRENT_TIMESTAMP, 'Published from a user-provided source document; replace with an official dated revision when available.')
     ON CONFLICT (subject_id, exam, syllabus_year)
     DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, is_active = TRUE, source_name = EXCLUDED.source_name, source_document_version = EXCLUDED.source_document_version, verification_status = 'verified', verified_by = EXCLUDED.verified_by, verified_at = CURRENT_TIMESTAMP, review_notes = EXCLUDED.review_notes
     RETURNING id`,
    [subject.rows[0].id, item.exam || 'WAEC', item.title, item.sourceName],
  )
  const syllabusId = syllabus.rows[0].id
  const examSlug = (item.exam || "WAEC").toLowerCase()
  const examRecord = await pool.query("SELECT id FROM exams WHERE slug = $1", [examSlug])
  if (examRecord.rows[0]) {
    await pool.query(
      `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
      [syllabusId, examRecord.rows[0].id]
    )
  }

  for (const [index, [title, subtopics]] of item.topics.entries()) {
    const topic = await pool.query(
      `INSERT INTO topics (syllabus_id, title, slug, description, topic_order, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE)
       ON CONFLICT (syllabus_id, slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, topic_order = EXCLUDED.topic_order, is_active = TRUE
       RETURNING id`,
      [syllabusId, title, slugify(title), `Study ${title} according to the verified syllabus source.`, index + 1],
    )
    for (const [subtopicIndex, subtopic] of subtopics.entries()) {
      await pool.query(
        `INSERT INTO subtopics (topic_id, title, slug, description, subtopic_order, is_active)
         VALUES ($1, $2, $3, '', $4, TRUE)
         ON CONFLICT (topic_id, slug) DO UPDATE SET title = EXCLUDED.title, subtopic_order = EXCLUDED.subtopic_order, is_active = TRUE`,
        [topic.rows[0].id, subtopic, slugify(subtopic), subtopicIndex + 1],
      )
    }
  }
  console.log(`${subject.rows[0].name}: ${item.topics.length} verified topics imported.`)
}

async function run() {
  try {
    for (const item of syllabuses) await seedSyllabus(item)
  } finally {
    await pool.end()
  }
}

run().catch((error) => { console.error(error); process.exitCode = 1 })
