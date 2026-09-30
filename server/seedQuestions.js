require("dotenv").config()

const pool = require("./src/config/database")

const questions = [
  {
    question:
      "Convert 25₁₀ to base 2.",
    option_a: "11001₂",
    option_b: "10101₂",
    option_c: "11100₂",
    option_d: "10011₂",
    correct_answer: "A",
    explanation:
      "25 divided by 2 repeatedly gives remainders 1, 0, 0, 1, 1. Reading the remainders from bottom to top gives 11001₂.",
    difficulty: "easy",
  },

  {
    question:
      "Convert 1011₂ to base 10.",
    option_a: "9",
    option_b: "10",
    option_c: "11",
    option_d: "12",
    correct_answer: "C",
    explanation:
      "1011₂ = (1 × 2³) + (0 × 2²) + (1 × 2¹) + (1 × 2⁰) = 8 + 0 + 2 + 1 = 11.",
    difficulty: "easy",
  },

  {
    question:
      "Convert 45₁₀ to base 2.",
    option_a: "101101₂",
    option_b: "110101₂",
    option_c: "101011₂",
    option_d: "111001₂",
    correct_answer: "A",
    explanation:
      "45 = 32 + 8 + 4 + 1, so its binary representation is 101101₂.",
    difficulty: "medium",
  },

  {
    question:
      "What is 1101₂ + 101₂?",
    option_a: "10010₂",
    option_b: "10000₂",
    option_c: "11000₂",
    option_d: "11110₂",
    correct_answer: "A",
    explanation:
      "1101₂ is 13₁₀ and 101₂ is 5₁₀. 13 + 5 = 18, which is 10010₂.",
    difficulty: "medium",
  },

  {
    question:
      "Convert 37₁₀ to base 8.",
    option_a: "45₈",
    option_b: "46₈",
    option_c: "47₈",
    option_d: "51₈",
    correct_answer: "A",
    explanation:
      "37 ÷ 8 gives 4 remainder 5. Therefore, 37₁₀ = 45₈.",
    difficulty: "easy",
  },

  {
    question:
      "Which of the following is NOT a valid digit in base 5?",
    option_a: "0",
    option_b: "2",
    option_c: "4",
    option_d: "5",
    correct_answer: "D",
    explanation:
      "Base 5 uses the digits 0, 1, 2, 3 and 4. The digit 5 is not valid in base 5.",
    difficulty: "easy",
  },

  {
    question:
      "What is 10101₂ in base 10?",
    option_a: "19",
    option_b: "20",
    option_c: "21",
    option_d: "22",
    correct_answer: "C",
    explanation:
      "10101₂ = 16 + 0 + 4 + 0 + 1 = 21₁₀.",
    difficulty: "easy",
  },

  {
    question:
      "Convert 64₁₀ to base 2.",
    option_a: "100000₂",
    option_b: "1000000₂",
    option_c: "1100000₂",
    option_d: "1111111₂",
    correct_answer: "B",
    explanation:
      "64 is 2⁶, so its binary representation is 1000000₂.",
    difficulty: "easy",
  },
]


async function getId(table, slug) {
  const result = await pool.query(
    `SELECT id FROM ${table} WHERE slug = $1 LIMIT 1`,
    [slug],
  )

  if (result.rows.length === 0) {
    throw new Error(
      `${table} with slug "${slug}" was not found.`,
    )
  }

  return result.rows[0].id
}


async function seedQuestions() {
  try {
    const subjectId = await getId(
      "subjects",
      "general-mathematics",
    )

    const syllabusResult = await pool.query(
      `
      SELECT id
      FROM syllabuses
      WHERE
        subject_id = $1
        AND exam = 'WAEC'
        AND syllabus_year = '2026/2027'
      LIMIT 1
      `,
      [subjectId],
    )

    if (syllabusResult.rows.length === 0) {
      throw new Error(
        "WAEC General Mathematics 2026/2027 syllabus was not found.",
      )
    }

    const syllabusId = syllabusResult.rows[0].id

    const topicResult = await pool.query(
      `
      SELECT id
      FROM topics
      WHERE
        syllabus_id = $1
        AND slug = 'number-bases'
      LIMIT 1
      `,
      [syllabusId],
    )

    if (topicResult.rows.length === 0) {
      throw new Error(
        "Number Bases topic was not found.",
      )
    }

    const topicId = topicResult.rows[0].id

    const subtopicResult = await pool.query(
      `
      SELECT id
      FROM subtopics
      WHERE
        topic_id = $1
        AND slug = 'conversion-between-number-bases'
      LIMIT 1
      `,
      [topicId],
    )

    const subtopicId =
      subtopicResult.rows.length > 0
        ? subtopicResult.rows[0].id
        : null


    for (const question of questions) {
      await pool.query(
        `
        INSERT INTO questions (
          exam,
          subject_id,
          syllabus_id,
          topic_id,
          subtopic_id,
          year,
          question_type,
          source_type,
          question_text,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_answer,
          explanation,
          difficulty,
          marks
        )
        VALUES (
          'WAEC',
          $1,
          $2,
          $3,
          $4,
          NULL,
          'multiple_choice',
          'practice',
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          $11,
          $12,
          1
        )
        `,
        [
          subjectId,
          syllabusId,
          topicId,
          subtopicId,
          question.question,
          question.option_a,
          question.option_b,
          question.option_c,
          question.option_d,
          question.correct_answer,
          question.explanation,
          question.difficulty,
        ],
      )
    }

    console.log(
      `${questions.length} Number Bases practice questions added successfully.`,
    )
  } catch (error) {
    console.error("Question seeding failed:")
    console.error(error)
  } finally {
    await pool.end()
  }
}


seedQuestions()