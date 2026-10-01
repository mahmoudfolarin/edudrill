const pool = require("../config/database")

async function getQuestions(req, res) {
  const {
    exam,
    subject,
    topicId,
    subtopicId,
    sourceType,
    sourceProvider,
    year,
    text,
    limit = 20,
  } = req.query

  try {
    const values = []
    const conditions = [
      "q.is_active = TRUE",
      "(q.source_type <> 'past_question' OR q.license_status IN ('authorized', 'licensed', 'public_domain'))",
    ]

    if (exam) {
      values.push(exam.toUpperCase())
      conditions.push(`q.exam = $${values.length}`)
    }

    if (subject) {
      values.push(subject)
      conditions.push(`s.slug = $${values.length}`)
    }

    if (topicId) {
      values.push(topicId)
      conditions.push(`q.topic_id = $${values.length}`)
    }

    if (subtopicId) {
      values.push(subtopicId)
      conditions.push(`q.subtopic_id = $${values.length}`)
    }

    if (sourceType) {
      values.push(sourceType)
      conditions.push(`q.source_type = $${values.length}`)
    }

    if (sourceProvider) {
      values.push(sourceProvider.toLowerCase())
      conditions.push(`q.source_provider = $${values.length}`)
    }

    if (year) {
      values.push(year)
      conditions.push(`q.year = $${values.length}`)
    }

    if (text) {
      if (text !== 'General Appreciation') {
        values.push(`%${text}%`)
        conditions.push(`q.question_text ILIKE $${values.length}`)
      }
    }

    const safeLimit = Math.min(
      Math.max(parseInt(limit, 10) || 20, 1),
      100,
    )

    values.push(safeLimit)

    const result = await pool.query(
      `
      SELECT
        q.id,
        q.exam,
        q.year,
        q.question_type,
        q.source_type,
        q.source_name,
        q.source_url,
        q.source_provider,
        q.license_status,
        q.verification_status,
        q.question_text,

        q.option_a,
        q.option_b,
        q.option_c,
        q.option_d,

        q.correct_answer,
        q.explanation,
        q.difficulty,
        q.marks,

        s.name AS subject_name,
        s.slug AS subject_slug,

        t.id AS topic_id,
        t.title AS topic_title,

        st.id AS subtopic_id,
        st.title AS subtopic_title

      FROM questions q

      JOIN subjects s
        ON q.subject_id = s.id

      LEFT JOIN topics t
        ON q.topic_id = t.id

      LEFT JOIN subtopics st
        ON q.subtopic_id = st.id

      WHERE ${conditions.join(" AND ")}

      ORDER BY q.id ASC

      LIMIT $${values.length}
      `,
      values,
    )

    res.json({
      success: true,
      count: result.rows.length,
      questions: result.rows,
    })
  } catch (error) {
    console.error("Get questions error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to retrieve questions",
    })
  }
}


async function getQuestion(req, res) {
  const { questionId } = req.params

  try {
    const result = await pool.query(
      `
      SELECT
        q.id,
        q.exam,
        q.year,
        q.question_type,
        q.source_type,
        q.source_name,
        q.source_url,
        q.source_provider,
        q.license_status,
        q.verification_status,
        q.question_text,

        q.option_a,
        q.option_b,
        q.option_c,
        q.option_d,

        q.correct_answer,
        q.explanation,
        q.difficulty,
        q.marks,

        s.name AS subject_name,
        s.slug AS subject_slug,

        t.id AS topic_id,
        t.title AS topic_title,

        st.id AS subtopic_id,
        st.title AS subtopic_title

      FROM questions q

      JOIN subjects s
        ON q.subject_id = s.id

      LEFT JOIN topics t
        ON q.topic_id = t.id

      LEFT JOIN subtopics st
        ON q.subtopic_id = st.id

      WHERE
        q.id = $1
        AND q.is_active = TRUE
        AND (
          q.source_type <> 'past_question'
          OR q.license_status IN ('authorized', 'licensed', 'public_domain')
        )
      `,
      [questionId],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      })
    }

    res.json({
      success: true,
      question: result.rows[0],
    })
  } catch (error) {
    console.error("Get question error:", error)

    res.status(500).json({
      success: false,
      message: "Failed to retrieve question",
    })
  }
}


// ==========================================
// LESSON PRACTICE (AI GENERATED)
// ==========================================

async function getLessonPractice(req, res) {
  const { lessonId, exam } = req.query;

  try {
    // Check if questions already exist for this lesson's subtopic
    const lessonRes = await pool.query(
      `SELECT l.subtopic_id, l.topic_id, l.title, l.content, t.title as topic_title, s.name as subject_name, s.id as subject_id
       FROM lessons l
       JOIN topics t ON l.topic_id = t.id
       JOIN syllabuses syl ON t.syllabus_id = syl.id
       JOIN subjects s ON syl.subject_id = s.id
       WHERE l.id = $1`, [lessonId]
    );

    if (lessonRes.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Lesson not found" });
    }

    const lesson = lessonRes.rows[0];

    // Look for existing AI questions for this subtopic
    const existingQuestionsRes = await pool.query(
      `SELECT * FROM questions WHERE subtopic_id = $1 AND source_type = 'EduDrill AI' LIMIT 10`,
      [lesson.subtopic_id]
    );

    if (existingQuestionsRes.rows.length >= 10) {
      return res.json({ success: true, questions: existingQuestionsRes.rows });
    }

    // Generate new questions using local algorithm (Offline & Fast)
    console.log(`Generating offline local questions for lesson: ${lesson.title}`);
    
    // Simple HTML strip
    const cleanContent = (lesson.content || "").replace(/<[^>]*>?/gm, '');
    
    // Split into sentences
    const sentences = cleanContent.split(/[.?!]/).map(s => s.trim()).filter(s => s.split(' ').length > 7 && s.length < 150);
    
    // Extract long words for answers
    const allWords = cleanContent.split(/[\s,.;:()]+/).filter(w => w.length > 5);
    
    // Pick up to 10 unique sentences
    const selectedSentences = sentences.sort(() => 0.5 - Math.random()).slice(0, 10);
    
    let generatedQuestions = [];
    
    for (let i = 0; i < selectedSentences.length; i++) {
      const sentence = selectedSentences[i];
      const words = sentence.split(' ');
      
      // Find a word to blank out (prefer longer words)
      const potentialAnswers = words.filter(w => w.length > 4 && !w.includes("'"));
      if (potentialAnswers.length === 0) continue;
      
      const answer = potentialAnswers[Math.floor(Math.random() * potentialAnswers.length)];
      const questionText = sentence.replace(answer, "______") + "?";
      
      // Generate options
      let wrongOptions = [];
      let attempts = 0;
      while (wrongOptions.length < 3 && attempts < 50) {
        const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
        if (randomWord.toLowerCase() !== answer.toLowerCase() && !wrongOptions.includes(randomWord)) {
          wrongOptions.push(randomWord);
        }
        attempts++;
      }
      
      // Fallbacks if we didn't get enough words
      if (wrongOptions.length < 3) wrongOptions.push("System", "Process", "Value", "Concept").slice(0, 3 - wrongOptions.length);
      
      const allOptions = [answer, ...wrongOptions].sort(() => 0.5 - Math.random());
      const correctLetter = ['A', 'B', 'C', 'D'][allOptions.indexOf(answer)];
      
      generatedQuestions.push({
        question_text: questionText,
        option_a: allOptions[0],
        option_b: allOptions[1],
        option_c: allOptions[2],
        option_d: allOptions[3],
        correct_answer: correctLetter,
        explanation: `The correct term used in the lesson is "${answer}".`
      });
    }

    if (generatedQuestions.length === 0) {
      return res.status(500).json({ success: false, message: "AI returned empty questions." });
    }

    const savedQuestions = [];
    for (const q of generatedQuestions) {
      const qRes = await pool.query(
        `INSERT INTO questions (
          subject_id, topic_id, subtopic_id, exam, question_type, source_type, source_name,
          question_text, option_a, option_b, option_c, option_d, correct_answer, explanation,
          difficulty, marks, is_active
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, TRUE)
        RETURNING *`,
        [
          lesson.subject_id, lesson.topic_id, lesson.subtopic_id, (exam || 'WAEC').toUpperCase(),
          'multiple_choice', 'EduDrill AI', 'AI Generated',
          q.question_text, q.option_a, q.option_b, q.option_c, q.option_d, q.correct_answer,
          q.explanation, 'medium', 1
        ]
      );
      savedQuestions.push(qRes.rows[0]);
    }

    return res.json({ success: true, questions: savedQuestions });
  } catch (error) {
    console.error("Lesson practice error:", error);
    res.status(500).json({ success: false, message: "Failed to generate practice" });
  }
}

module.exports = {
  getQuestions,
  getQuestion,
  getLessonPractice
}