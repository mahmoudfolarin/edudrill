require("dotenv").config({ path: require("node:path").join(__dirname, "..", ".env") })

const fs = require("node:fs")
const path = require("node:path")
const pool = require("../src/config/database")

const OUTPUT_PATH = path.join(__dirname, "..", "data", "presetQuestions.json")
const QUESTIONS_PER_SUBJECT = 5
const SUBJECTS_PER_BATCH = 1

function parseJson(content) {
  const start = content.indexOf("{")
  if (start < 0) throw new Error("No JSON object found in generated response")

  let depth = 0
  let inString = false
  let escaped = false
  for (let index = start; index < content.length; index++) {
    const character = content[index]
    if (inString) {
      if (escaped) escaped = false
      else if (character === "\\") escaped = true
      else if (character === '"') inString = false
      continue
    }

    if (character === '"') inString = true
    else if (character === "{") depth++
    else if (character === "}") {
      depth--
      if (depth === 0) return JSON.parse(content.slice(start, index + 1))
    }
  }

  throw new Error("Generated JSON object was truncated")
}

function validateSubjectBank(subject, record) {
  if (record.slug !== subject.slug || !Array.isArray(record.questions)) {
    throw new Error(`Invalid generated record for ${subject.slug}`)
  }

  if (record.questions.length !== QUESTIONS_PER_SUBJECT) {
    throw new Error(`${subject.slug} returned ${record.questions.length} questions; expected ${QUESTIONS_PER_SUBJECT}`)
  }

  for (const [index, question] of record.questions.entries()) {
    const options = question.options || {}
    const validOptions = ["A", "B", "C", "D"].every(
      (letter) => typeof options[letter] === "string" && options[letter].trim(),
    )

    if (
      typeof question.question !== "string" ||
      !question.question.trim() ||
      !validOptions ||
      !["A", "B", "C", "D"].includes(question.correctAnswer) ||
      typeof question.explanation !== "string" ||
      !question.explanation.trim()
    ) {
      throw new Error(`${subject.slug} question ${index + 1} is missing valid question data`)
    }

    question.difficulty = ["easy", "medium", "hard"].includes(question.difficulty)
      ? question.difficulty
      : "medium"
  }

  return record
}

async function generateBatch(subjects) {
  const prompt = `Create exactly ${QUESTIONS_PER_SUBJECT} ORIGINAL multiple-choice practice questions for each subject below, appropriate for Nigerian secondary-school candidates preparing for WAEC, NECO, GCE, and JAMB.

These must be newly written practice questions, not copied or paraphrased from official past papers. Use sound, stable curriculum knowledge. Keep wording clear, options plausible, exactly one answer correct, and explanations concise. For language subjects, test actual vocabulary or grammar accurately; do not invent translations. If unsure about a language fact, use a reliable basic fact.

Return ONLY valid JSON in this shape:
{"subjects":[{"slug":"subject-slug","questions":[{"question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correctAnswer":"A","explanation":"...","difficulty":"easy|medium|hard"}]}]}

Subjects:
${JSON.stringify(subjects)}`

  for (let attempt = 0; attempt < 7; attempt++) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 4000,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(180000),
    })

    const body = await response.json()
    if (response.status === 429 && attempt < 6) {
      const delaySeconds = Number(response.headers.get("retry-after")) || 30
      console.warn(`Question generation rate-limited; retrying in ${delaySeconds}s.`)
      await new Promise((resolve) => setTimeout(resolve, delaySeconds * 1000))
      continue
    }

    if (!response.ok) {
      throw new Error(`OpenRouter returned ${response.status}: ${JSON.stringify(body.error || body).slice(0, 500)}`)
    }

    const content = body.choices?.[0]?.message?.content
    if (typeof content !== "string" || !content.trim()) {
      if (attempt === 6) throw new Error("OpenRouter returned no question content")
      console.warn(`OpenRouter returned no question content; retrying (${attempt + 1}/6).`)
      continue
    }

    try {
      const parsed = parseJson(content)
      if (!Array.isArray(parsed.subjects)) {
        throw new Error("Generated response must contain a subjects array")
      }

      const recordsBySlug = new Map(parsed.subjects.map((record) => [record.slug, record]))
      return subjects.map((subject) => {
        const record = recordsBySlug.get(subject.slug)
        if (!record) throw new Error(`Generated response omitted ${subject.slug}`)
        return validateSubjectBank(subject, record)
      })
    } catch (error) {
      if (attempt === 6) throw error
      console.warn(`Invalid generated JSON; retrying (${attempt + 1}/6): ${error.message}`)
    }
  }

  throw new Error("Question generation retry limit exceeded")
}

async function main() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is missing from server/.env")
  }

  const limitArgument = process.argv.find((argument) => argument.startsWith("--limit="))
  const limit = limitArgument ? Number(limitArgument.slice("--limit=".length)) : null

  const result = await pool.query(`
    SELECT DISTINCT s.slug, s.name, s.subject_group
    FROM subjects s
    JOIN exam_subjects es ON es.subject_id = s.id AND es.is_active = TRUE
    JOIN exams e ON e.id = es.exam_id AND e.is_active = TRUE
    WHERE s.is_active = TRUE
    ORDER BY s.slug
  `)

  const subjects = limit
    ? result.rows.slice(0, Math.max(limit, 0))
    : result.rows

  if (subjects.length === 0) throw new Error("No active exam subjects were found")

  const existingDataset = fs.existsSync(OUTPUT_PATH)
    ? JSON.parse(fs.readFileSync(OUTPUT_PATH, "utf8"))
    : { subjects: [] }
  const banksBySlug = new Map(
    (existingDataset.subjects || []).map((record) => [record.slug, record]),
  )
  const subjectsToGenerate = subjects.filter((subject) => !banksBySlug.has(subject.slug))

  for (let index = 0; index < subjectsToGenerate.length; index += SUBJECTS_PER_BATCH) {
    const batch = subjectsToGenerate.slice(index, index + SUBJECTS_PER_BATCH)
    console.log(`Generating subjects ${index + 1}-${index + batch.length} of ${subjectsToGenerate.length} remaining...`)
    const generated = await generateBatch(batch)
    for (const record of generated) banksBySlug.set(record.slug, record)

    fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true })
    fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify({ generatedAt: new Date().toISOString(), subjects: [...banksBySlug.values()] }, null, 2)}\n`)
  }

  console.log(`Generated ${banksBySlug.size} subject sets and ${banksBySlug.size * QUESTIONS_PER_SUBJECT} original questions.`)
  console.log(`Saved dataset to ${OUTPUT_PATH}`)
}

main()
  .catch((error) => {
    console.error("Preset question generation failed:", error.message)
    process.exitCode = 1
  })
  .finally(() => pool.end())