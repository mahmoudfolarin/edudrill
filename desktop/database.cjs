const fs = require('fs')
const path = require('path')
const initSqlJs = require('sql.js/dist/sql-asm.js')

class DatabaseManager {
  constructor(userDataPath) {
    this.userDataPath = userDataPath
    this.dbDir = path.join(userDataPath, 'EduDrillData')
    this.dbPath = path.join(this.dbDir, 'edudrill_local.db')
    this.db = null
    this.SQL = null
  }

  async init() {
    if (!fs.existsSync(this.dbDir)) {
      fs.mkdirSync(this.dbDir, { recursive: true })
    }

    this.SQL = await initSqlJs()

    if (fs.existsSync(this.dbPath)) {
      try {
        const fileBuffer = fs.readFileSync(this.dbPath)
        this.db = new this.SQL.Database(fileBuffer)
        console.log('[DB] Loaded existing database from:', this.dbPath)
      } catch (err) {
        console.error('[DB] Error loading existing DB, recreating from bundle:', err)
        this.copyInitialDb()
      }
    } else {
      this.copyInitialDb()
    }

    this.ensureTables()
    this.persist()
    return this
  }

  copyInitialDb() {
    // bundled initial db location
    const bundledPath = path.join(__dirname, 'data', 'edudrill_initial.db')
    if (fs.existsSync(bundledPath)) {
      const buffer = fs.readFileSync(bundledPath)
      fs.writeFileSync(this.dbPath, buffer)
      this.db = new this.SQL.Database(buffer)
      console.log('[DB] Initialized database from bundled seed:', this.dbPath)
    } else {
      this.db = new this.SQL.Database()
      console.log('[DB] Created fresh empty database')
    }
  }

  ensureTables() {
    this.db.run(`
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
    `)
  }

  persist() {
    try {
      const data = this.db.export()
      const buffer = Buffer.from(data)
      fs.writeFileSync(this.dbPath, buffer)
    } catch (err) {
      console.error('[DB] Failed to persist database:', err)
    }
  }

  getSubjects() {
    const res = this.db.exec("SELECT * FROM subjects WHERE is_active = 1 ORDER BY name ASC")
    if (!res || !res.length) return []
    const cols = res[0].columns
    return res[0].values.map(row => {
      const obj = {}
      cols.forEach((col, idx) => { obj[col] = row[idx] })
      return obj
    })
  }

  getExams() {
    const res = this.db.exec("SELECT * FROM exams WHERE is_active = 1")
    if (!res || !res.length) return []
    const cols = res[0].columns
    return res[0].values.map(row => {
      const obj = {}
      cols.forEach((col, idx) => { obj[col] = row[idx] })
      return obj
    })
  }

  getSyllabus(exam, subjectSlug) {
    const stmt = this.db.prepare("SELECT * FROM syllabuses WHERE LOWER(exam) = LOWER(?) AND LOWER(subject_slug) = LOWER(?) LIMIT 1")
    stmt.bind([exam, subjectSlug])
    let syl = null
    if (stmt.step()) {
      syl = stmt.getAsObject()
    }
    stmt.free()

    // Retrieve topics
    const tStmt = this.db.prepare("SELECT * FROM topics WHERE LOWER(subject_slug) = LOWER(?) ORDER BY topic_order ASC")
    tStmt.bind([subjectSlug])
    const topics = []
    while (tStmt.step()) {
      const topicObj = tStmt.getAsObject()
      // Retrieve lessons for this topic
      const lStmt = this.db.prepare("SELECT * FROM lessons WHERE topic_id = ? ORDER BY lesson_order ASC")
      lStmt.bind([topicObj.id])
      const lessons = []
      while (lStmt.step()) {
        lessons.push(lStmt.getAsObject())
      }
      lStmt.free()
      topicObj.lessons = lessons
      topics.push(topicObj)
    }
    tStmt.free()

    return {
      syllabus: syl || { title: `${subjectSlug} Syllabus`, exam, subject_slug: subjectSlug },
      topics
    }
  }

  getQuestions({ exam, subject, year, limit = 50 }) {
    let query = "SELECT * FROM questions WHERE 1=1"
    const params = []
    if (exam) {
      query += " AND LOWER(exam) = LOWER(?)"
      params.push(exam)
    }
    if (subject) {
      query += " AND LOWER(subject_slug) = LOWER(?)"
      params.push(subject)
    }
    if (year) {
      query += " AND year = ?"
      params.push(String(year))
    }
    query += ` ORDER BY RANDOM() LIMIT ${Number(limit) || 50}`

    const stmt = this.db.prepare(query)
    stmt.bind(params)
    const list = []
    while (stmt.step()) {
      const q = stmt.getAsObject()
      list.push({
        id: q.id,
        exam: q.exam,
        subject: q.subject_slug,
        year: q.year,
        question: q.question_text,
        options: [q.option_a, q.option_b, q.option_c, q.option_d],
        optionsMap: { A: q.option_a, B: q.option_b, C: q.option_c, D: q.option_d },
        answer: q.correct_answer,
        correct_answer: q.correct_answer,
        explanation: q.explanation || '',
        difficulty: q.difficulty
      })
    }
    stmt.free()
    return list
  }

  savePerformance({ exam, subject, type, score, total, percentage, userId = 'desktop_user' }) {
    const stmt = this.db.prepare(`
      INSERT INTO performance (exam, subject, type, score, total, percentage, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `)
    stmt.run([exam, subject, type || 'practice', score, total, percentage, userId])
    stmt.free()
    this.persist()
    return { success: true }
  }

  getPerformance(userId = 'desktop_user') {
    const stmt = this.db.prepare("SELECT * FROM performance WHERE user_id = ? ORDER BY id DESC")
    stmt.bind([userId])
    const list = []
    while (stmt.step()) {
      list.push(stmt.getAsObject())
    }
    stmt.free()
    return list
  }

  saveBookmark(b) {
    const stmt = this.db.prepare(`
      INSERT INTO bookmarks (lesson_id, topic_id, subject, exam, title, topic_title, subject_name, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
    stmt.run([
      String(b.lesson_id),
      String(b.topic_id || ''),
      b.subject || '',
      b.exam || '',
      b.title || '',
      b.topic_title || '',
      b.subject_name || '',
      b.user_id || 'desktop_user'
    ])
    stmt.free()
    this.persist()
    return { success: true }
  }

  getBookmarks(userId = 'desktop_user') {
    const stmt = this.db.prepare("SELECT * FROM bookmarks WHERE user_id = ? ORDER BY id DESC")
    stmt.bind([userId])
    const list = []
    while (stmt.step()) {
      list.push(stmt.getAsObject())
    }
    stmt.free()
    return list
  }

  deleteBookmark(lessonId, userId = 'desktop_user') {
    const stmt = this.db.prepare("DELETE FROM bookmarks WHERE lesson_id = ? AND user_id = ?")
    stmt.run([String(lessonId), userId])
    stmt.free()
    this.persist()
    return { success: true }
  }

  getLicense() {
    const res = this.db.exec("SELECT * FROM license WHERE status = 'Active' ORDER BY id DESC LIMIT 1")
    if (!res || !res.length || !res[0].values.length) return null
    const cols = res[0].columns
    const row = res[0].values[0]
    const obj = {}
    cols.forEach((c, i) => { obj[c] = row[i] })
    return obj
  }

  saveLicense({ productKey, activationKey, status, deviceIdentifier, activatedAt, signature }) {
    const stmt = this.db.prepare(`
      INSERT INTO license (product_key, activation_key, status, device_identifier, activated_at, signature)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    stmt.run([productKey, activationKey, status, deviceIdentifier, activatedAt, signature])
    stmt.free()
    this.persist()
    return { success: true }
  }
}

module.exports = DatabaseManager
