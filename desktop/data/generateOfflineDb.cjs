const fs = require('fs')
const path = require('path')
const initSqlJs = require('../../node_modules/sql.js/dist/sql-asm.js')

async function buildOfflineDatabase() {
  console.log('--- Initializing SQLite (sql.js asm) ---')
  const SQL = await initSqlJs()
  const db = new SQL.Database()

  // 1. Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      subject_group TEXT NOT NULL,
      icon TEXT,
      is_active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS exams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      is_active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS exam_subjects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exam_slug TEXT NOT NULL,
      subject_slug TEXT NOT NULL,
      UNIQUE(exam_slug, subject_slug)
    );

    CREATE TABLE IF NOT EXISTS syllabuses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exam TEXT NOT NULL,
      subject_slug TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      verification_status TEXT DEFAULT 'verified',
      UNIQUE(exam, subject_slug)
    );

    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      syllabus_id INTEGER,
      subject_slug TEXT NOT NULL,
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      topic_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_id INTEGER,
      title TEXT NOT NULL,
      slug TEXT NOT NULL,
      content TEXT,
      lesson_order INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exam TEXT NOT NULL,
      subject_slug TEXT NOT NULL,
      topic_id INTEGER,
      year TEXT,
      question_type TEXT DEFAULT 'multiple_choice',
      question_text TEXT NOT NULL,
      option_a TEXT NOT NULL,
      option_b TEXT NOT NULL,
      option_c TEXT NOT NULL,
      option_d TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      explanation TEXT,
      difficulty TEXT DEFAULT 'medium'
    );

    CREATE TABLE IF NOT EXISTS performance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      exam TEXT NOT NULL,
      subject TEXT NOT NULL,
      type TEXT NOT NULL,
      score INTEGER NOT NULL,
      total INTEGER NOT NULL,
      percentage INTEGER NOT NULL,
      user_id TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bookmarks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lesson_id TEXT NOT NULL,
      topic_id TEXT,
      subject TEXT NOT NULL,
      exam TEXT NOT NULL,
      title TEXT,
      topic_title TEXT,
      subject_name TEXT,
      user_id TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS license (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_key TEXT,
      activation_key TEXT,
      status TEXT,
      device_identifier TEXT,
      activated_at TEXT,
      signature TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_questions_exam_subject ON questions(exam, subject_slug);
    CREATE INDEX IF NOT EXISTS idx_syllabuses_exam_subject ON syllabuses(exam, subject_slug);
    CREATE INDEX IF NOT EXISTS idx_topics_subject ON topics(subject_slug);
  `)

  // 2. Insert Exams
  const exams = [
    { name: 'WAEC', slug: 'waec', description: 'West African Examinations Council' },
    { name: 'JAMB', slug: 'jamb', description: 'Joint Admissions and Matriculation Board' },
    { name: 'NECO', slug: 'neco', description: 'National Examinations Council' },
    { name: 'GCE', slug: 'gce', description: 'General Certificate of Education' }
  ]
  const insertExam = db.prepare('INSERT OR IGNORE INTO exams (name, slug, description) VALUES (?, ?, ?)')
  for (const e of exams) {
    insertExam.run([e.name, e.slug, e.description])
  }
  insertExam.free()

  // 3. Insert Subjects
  const subjects = [
    { name: 'English Language', slug: 'english-language', group: 'Core Subjects', icon: 'EN' },
    { name: 'General Mathematics', slug: 'general-mathematics', group: 'Core Subjects', icon: 'MA' },
    { name: 'Civic Education', slug: 'civic-education', group: 'Core Subjects', icon: 'CE' },
    { name: 'Digital Technologies', slug: 'digital-technologies', group: 'Core Subjects', icon: 'DT' },
    { name: 'Biology', slug: 'biology', group: 'Science', icon: 'BI' },
    { name: 'Chemistry', slug: 'chemistry', group: 'Science', icon: 'CH' },
    { name: 'Physics', slug: 'physics', group: 'Science', icon: 'PH' },
    { name: 'Agricultural Science', slug: 'agriculture', group: 'Science', icon: 'AG' },
    { name: 'Further Mathematics', slug: 'further-mathematics', group: 'Science', icon: 'FM' },
    { name: 'Economics', slug: 'economics', group: 'Social Sciences', icon: 'EC' },
    { name: 'Commerce', slug: 'commerce', group: 'Business', icon: 'CO' },
    { name: 'Accounting', slug: 'accounting', group: 'Business', icon: 'AC' },
    { name: 'Government', slug: 'government', group: 'Humanities', icon: 'GV' },
    { name: 'Literature-in-English', slug: 'literature-in-english', group: 'Humanities', icon: 'LI' },
    { name: 'Christian Religious Studies', slug: 'christian-religious-studies', group: 'Humanities', icon: 'CR' },
    { name: 'Islamic Studies', slug: 'islamic-studies', group: 'Humanities', icon: 'IS' },
    { name: 'Geography', slug: 'geography', group: 'Humanities', icon: 'GE' },
    { name: 'History', slug: 'history', group: 'Humanities', icon: 'HI' },
    { name: 'Computer Studies', slug: 'computer-studies', group: 'Science', icon: 'CS' },
    { name: 'Technical Drawing', slug: 'technical-drawing', group: 'Technical', icon: 'TD' },
    { name: 'Foods and Nutrition', slug: 'foods-and-nutrition', group: 'Vocational', icon: 'FN' },
    { name: 'Use of English', slug: 'use-of-english', group: 'Core Subjects', icon: 'UE' }
  ]

  const insertSubject = db.prepare('INSERT OR IGNORE INTO subjects (name, slug, subject_group, icon) VALUES (?, ?, ?, ?)')
  const insertExamSubject = db.prepare('INSERT OR IGNORE INTO exam_subjects (exam_slug, subject_slug) VALUES (?, ?)')
  const insertSyllabus = db.prepare('INSERT OR IGNORE INTO syllabuses (exam, subject_slug, title, description) VALUES (?, ?, ?, ?)')

  for (const s of subjects) {
    insertSubject.run([s.name, s.slug, s.group, s.icon])
    for (const e of exams) {
      insertExamSubject.run([e.slug, s.slug])
      insertSyllabus.run([e.slug, s.slug, `${s.name} Syllabus`, `Official syllabus and learning curriculum for ${s.name} in ${e.name}.`])
    }
  }
  insertSubject.free()
  insertExamSubject.free()
  insertSyllabus.free()

  // 4. Seed Topics & Lessons from learning seeds if available
  const insertTopic = db.prepare('INSERT INTO topics (syllabus_id, subject_slug, title, slug, topic_order) VALUES (?, ?, ?, ?, ?)')
  const insertLesson = db.prepare('INSERT INTO lessons (topic_id, title, slug, content, lesson_order) VALUES (?, ?, ?, ?, ?)')

  const coreTopics = {
    'english-language': [
      { title: 'Grammar and Sentence Structure', slug: 'grammar-sentence-structure', lessons: [
        { title: 'Parts of Speech & Concord', slug: 'parts-of-speech-concord', content: 'In English grammar, concord is the agreement between words in gender, number, case, or person. Subject-verb agreement is the foundational rule: a singular subject takes a singular verb, and a plural subject takes a plural verb.' },
        { title: 'Clauses and Complex Sentences', slug: 'clauses-complex-sentences', content: 'A clause is a group of words containing a subject and a predicate. An independent clause expresses a complete thought, whereas a subordinate clause depends on an independent clause.' }
      ]},
      { title: 'Comprehension & Vocabulary', slug: 'comprehension-vocabulary', lessons: [
        { title: 'Reading Techniques and Context Clues', slug: 'reading-techniques-context-clues', content: 'Skimming and scanning are essential CBT reading strategies. Use surrounding context clues to determine the meaning of unfamiliar words.' }
      ]}
    ],
    'general-mathematics': [
      { title: 'Number and Numeration', slug: 'number-and-numeration', lessons: [
        { title: 'Indices and Logarithms', slug: 'indices-and-logarithms', content: 'Laws of indices: a^m * a^n = a^(m+n), a^m / a^n = a^(m-n), (a^m)^n = a^(mn). Logarithms represent the inverse operation of exponentiation.' },
        { title: 'Modular Arithmetic', slug: 'modular-arithmetic', lessons: 'Modular arithmetic involves calculations where numbers wrap around after reaching a fixed modulus value.' }
      ]},
      { title: 'Algebraic Processes', slug: 'algebraic-processes', lessons: [
        { title: 'Simultaneous & Quadratic Equations', slug: 'simultaneous-quadratic-equations', content: 'Quadratic equations can be solved using factorization, completing the square, or the quadratic formula: x = (-b ± √(b² - 4ac)) / (2a).' }
      ]}
    ],
    'biology': [
      { title: 'Living Things and Cell Organization', slug: 'living-things-cell-organization', lessons: [
        { title: 'Cell Structure and Function', slug: 'cell-structure-function', content: 'Cells are the fundamental units of life. Plant cells possess cell walls and chloroplasts, while animal cells do not.' }
      ]}
    ],
    'chemistry': [
      { title: 'Atomic Structure and Bonding', slug: 'atomic-structure-bonding', lessons: [
        { title: 'Periodic Table and Chemical Bonds', slug: 'periodic-table-chemical-bonds', content: 'Atoms bond through ionic transfer or covalent sharing of valence electrons to achieve stable octet electronic configurations.' }
      ]}
    ],
    'physics': [
      { title: 'Mechanics and Motion', slug: 'mechanics-and-motion', lessons: [
        { title: 'Newtonian Laws and Vectors', slug: 'newtonian-laws-vectors', content: 'Newton\'s First Law: inertia. Second Law: F = ma. Third Law: action and reaction are equal and opposite.' }
      ]}
    ]
  }

  for (const [subjSlug, topicList] of Object.entries(coreTopics)) {
    let tOrder = 1
    for (const t of topicList) {
      insertTopic.run([1, subjSlug, t.title, t.slug, tOrder++])
      const topicId = db.exec("SELECT last_insert_rowid() AS id")[0].values[0][0]
      let lOrder = 1
      for (const l of t.lessons) {
        insertLesson.run([topicId, l.title, l.slug, typeof l.content === 'string' ? l.content : (l.lessons || 'Study content for lesson.'), lOrder++])
      }
    }
  }
  insertTopic.free()
  insertLesson.free()

  // 5. Seed Questions from extractedQuestions.json & presetQuestions.json
  const insertQ = db.prepare(`
    INSERT INTO questions
    (exam, subject_slug, year, question_text, option_a, option_b, option_c, option_d, correct_answer, explanation, difficulty)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `)

  let count = 0

  // 5A. Check extractedQuestions.json
  const extractedPath = path.join(__dirname, '..', '..', 'server', 'data', 'extractedQuestions.json')
  if (fs.existsSync(extractedPath)) {
    try {
      const data = JSON.parse(fs.readFileSync(extractedPath, 'utf8'))
      for (const q of data) {
        if (!q.question || !q.options) continue
        const examName = (q.exam || 'WAEC').toUpperCase()
        const subjSlug = (q.subject || 'english-language').toLowerCase()
        const optA = q.options.A || q.options.a || ''
        const optB = q.options.B || q.options.b || ''
        const optC = q.options.C || q.options.c || ''
        const optD = q.options.D || q.options.d || ''
        const ans = (q.correctAnswer || 'A').toUpperCase()
        const exp = q.explanation || ''
        const yr = String(q.year || '2026')
        insertQ.run([examName, subjSlug, yr, q.question, optA, optB, optC, optD, ans, exp, 'medium'])
        count++
      }
      console.log(`Loaded ${count} questions from extractedQuestions.json`)
    } catch (err) {
      console.error('Error parsing extractedQuestions.json:', err)
    }
  }

  // 5B. Check presetQuestions.json
  const presetPath = path.join(__dirname, '..', '..', 'server', 'data', 'presetQuestions.json')
  if (fs.existsSync(presetPath)) {
    try {
      const presetData = JSON.parse(fs.readFileSync(presetPath, 'utf8'))
      if (presetData.subjects) {
        for (const s of presetData.subjects) {
          const subjSlug = s.slug
          for (const q of (s.questions || [])) {
            const optA = q.options?.A || ''
            const optB = q.options?.B || ''
            const optC = q.options?.C || ''
            const optD = q.options?.D || ''
            const ans = (q.correctAnswer || 'A').toUpperCase()
            const exp = q.explanation || ''
            insertQ.run(['WAEC', subjSlug, '2025', q.question, optA, optB, optC, optD, ans, exp, q.difficulty || 'medium'])
            insertQ.run(['JAMB', subjSlug, '2025', q.question, optA, optB, optC, optD, ans, exp, q.difficulty || 'medium'])
            count += 2
          }
        }
      }
      console.log(`Total questions in database: ${count}`)
    } catch (err) {
      console.error('Error parsing presetQuestions.json:', err)
    }
  }

  insertQ.free()

  // 6. Export database buffer and save to file
  const data = db.export()
  const buffer = Buffer.from(data)
  const outDir = path.join(__dirname)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
  const outPath = path.join(outDir, 'edudrill_initial.db')
  fs.writeFileSync(outPath, buffer)
  console.log(`=== Successfully generated offline database at: ${outPath} (${(buffer.length / 1024 / 1024).toFixed(2)} MB) ===`)
}

buildOfflineDatabase().catch(err => {
  console.error('Database generation failed:', err)
  process.exit(1)
})
