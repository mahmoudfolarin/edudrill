require("dotenv").config({ path: require("node:path").join(__dirname, "..", ".env") })

const fs = require("node:fs")
const path = require("node:path")
const pool = require("../src/config/database")

const outputPath = path.join(__dirname, "..", "data", "presetQuestions.json")

const subjectFacts = {
  hausa: [
    "Hausa belongs to the Chadic branch of the Afro-Asiatic language family.",
    "Hausa is widely spoken in northern Nigeria and across West Africa.",
    "Boko is the Latin-based writing system commonly used for Hausa today.",
    "Ajami is a way of writing Hausa with adapted Arabic script.",
    "Hausa is studied through its grammar, vocabulary, literature, and communication.",
  ],
  "health-education": [
    "Health education helps people make informed choices that protect and improve health.",
    "Handwashing with soap helps reduce the spread of many infectious diseases.",
    "A balanced diet supplies nutrients in suitable amounts for body needs.",
    "Regular physical activity can improve cardiovascular fitness.",
    "Safe drinking water and sanitation are important parts of disease prevention.",
  ],
  history: [
    "Historians use evidence from sources to investigate and explain past events.",
    "A primary source was created during the period being studied or by a participant.",
    "Comparing independent sources can help historians assess reliability.",
    "Chronology arranges events in the order in which they occurred.",
    "Historical explanations consider causes, consequences, and context.",
  ],
  "home-economics": [
    "Home Economics applies knowledge about food, clothing, family, and household resources.",
    "A household budget compares expected income with planned expenditure.",
    "Food hygiene includes keeping hands, utensils, and preparation surfaces clean.",
    "Meal planning considers nutrition, available resources, and the needs of people eating.",
    "Reading a fabric-care label helps choose suitable washing and ironing methods.",
  ],
  "home-management": [
    "Home management involves planning and using household resources to meet family needs.",
    "A work plan can help organize household tasks and available time.",
    "A household budget helps prioritize spending within available income.",
    "Safe storage helps protect food and household materials from damage or contamination.",
    "Evaluating a household plan helps identify what should be improved next time.",
  ],
  "horticulture-and-crop-production": [
    "Horticulture focuses on growing fruits, vegetables, ornamental plants, and related crops.",
    "Healthy soil, suitable water, and adequate light support crop growth.",
    "Nursery propagation allows young plants to be raised before field transplanting.",
    "Removing weeds reduces competition for water, light, and soil nutrients.",
    "Crop rotation can help manage soil fertility and reduce some pest and disease cycles.",
  ],
  igbo: [
    "Igbo is a Niger-Congo language spoken by millions of people, especially in southeastern Nigeria.",
    "Tone can distinguish meaning between otherwise similar Igbo words.",
    "Standard written Igbo uses the Latin alphabet with additional letter forms such as ị, ọ, and ụ.",
    "Igbo language study includes grammar, vocabulary, reading, writing, and oral communication.",
    "Igbo oral literature includes forms such as proverbs, folktales, and songs.",
  ],
  "islamic-studies": [
    "The Qur'an is the central scripture of Islam.",
    "Salah is the prescribed ritual prayer performed by Muslims.",
    "Zakat is an obligatory form of giving to eligible recipients under Islamic teaching.",
    "The Hijrah refers to Prophet Muhammad's migration from Makkah to Madinah.",
    "Hadith reports describe sayings, actions, or approvals attributed to Prophet Muhammad.",
  ],
  "literature-in-english": [
    "A metaphor describes one thing in terms of another to suggest a comparison.",
    "In drama, dialogue is speech exchanged between characters.",
    "The setting of a literary work includes its time and place.",
    "A poem's speaker is the voice that speaks in the poem and is not automatically the poet.",
    "Irony involves a contrast between an expectation and what is actually meant or occurs.",
  ],
  "livestock-farming": [
    "Livestock farming involves keeping and managing farm animals for useful products or services.",
    "Balanced feed supports animal growth, maintenance, and production.",
    "Quarantine can reduce the spread of disease when new animals enter a herd.",
    "Clean water and suitable housing are important for animal welfare and productivity.",
    "Selective breeding can pass desirable inherited traits to future generations.",
  ],
  marketing: [
    "Marketing identifies customer needs and develops exchanges that provide value.",
    "Market research gathers information about customers, competitors, and demand.",
    "Segmentation divides a broad market into groups with shared characteristics.",
    "Promotion communicates information about an offer to potential customers.",
    "Customer feedback can help a business improve a product or service.",
  ],
  music: [
    "Pitch describes how high or low a musical sound is perceived to be.",
    "Rhythm organizes sounds and silences in time.",
    "Melody is a succession of pitches perceived as a musical line.",
    "A treble clef indicates the position of G above middle C on the staff.",
    "Dynamics indicate how loud or soft music should be performed.",
  ],
  "nigerian-history": [
    "Nigeria became independent from British colonial rule on 1 October 1960.",
    "The amalgamation of Northern and Southern Nigeria took place in 1914.",
    "The 1914 amalgamation was carried out under British colonial administration.",
    "Historical evidence is needed to support claims about Nigeria's past.",
    "Nigeria became a republic in 1963.",
  ],
  "physical-and-health-education": [
    "Physical and Health Education combines physical activity learning with knowledge for healthy living.",
    "A warm-up prepares the body gradually for more demanding exercise.",
    "Personal hygiene practices help reduce the risk of some infections.",
    "A balanced diet and regular activity both contribute to health.",
    "Safe participation in sport includes following rules and using suitable equipment.",
  ],
  "physical-education": [
    "Physical Education develops movement skills, fitness, and understanding of physical activity.",
    "A warm-up gradually prepares muscles and the cardiovascular system for exercise.",
    "Flexibility is the range of movement available at a joint.",
    "Aerobic exercise uses oxygen-dependent energy processes during sustained activity.",
    "Following the rules of a sport supports safe and fair participation.",
  ],
  physics: [
    "Speed is calculated by dividing distance travelled by the time taken.",
    "The SI unit of force is the newton.",
    "Energy cannot be created or destroyed in an isolated system; it is transferred or transformed.",
    "In a series circuit, the current is the same through each component.",
    "The density of a substance is its mass divided by its volume.",
  ],
  "principles-of-account": [
    "The accounting equation is assets equal liabilities plus owner's equity.",
    "In double-entry bookkeeping, each transaction affects at least two accounts.",
    "A trial balance lists ledger balances to check the arithmetic equality of debits and credits.",
    "A source document provides evidence that a business transaction occurred.",
    "A bank reconciliation explains differences between a business cash record and the bank statement.",
  ],
  "solar-photovoltaic-installation-and-maintenance": [
    "A photovoltaic cell converts light energy directly into electrical energy.",
    "Solar panels produce direct current electricity under illumination.",
    "An inverter converts direct current from a PV system into alternating current for compatible loads.",
    "A charge controller helps regulate charging between a PV array and a battery.",
    "PV modules connected in series increase the array voltage.",
  ],
  "technical-drawing": [
    "Orthographic projection represents a three-dimensional object using separate two-dimensional views.",
    "A scale drawing keeps proportions while representing an object at a different size.",
    "In technical drawing, a centre line indicates an axis or centre of a feature.",
    "Dimension lines and figures communicate the measured size of a component.",
    "An isometric drawing shows three principal axes separated by equal angles on the page.",
  ],
  "use-of-english": [
    "In standard English, a singular third-person subject usually takes a verb ending in -s in the simple present.",
    "A comma can separate items in a list.",
    "A synonym is a word with a similar meaning to another word.",
    "The main idea of a passage expresses its central point.",
    "An adjective can describe a noun.",
  ],
  "visual-art": [
    "The primary colours in traditional pigment mixing are red, yellow, and blue.",
    "Texture describes how a surface appears or feels.",
    "In visual art, balance concerns the distribution of visual weight in a composition.",
    "A sketch can be used to explore and plan a visual idea.",
    "Contrast uses differences such as light and dark to create emphasis.",
  ],
  yoruba: [
    "Yoruba is a tonal language, so tone can distinguish word meanings.",
    "Standard written Yoruba uses tone marks to show distinctions in pronunciation and meaning.",
    "Yoruba is a Niger-Congo language spoken in Nigeria and neighbouring countries.",
    "Yoruba language study includes listening, speaking, reading, and writing.",
    "Yoruba oral literature includes proverbs, folktales, and praise poetry.",
  ],
}

const distractors = [
  "The correct method is to ignore evidence and choose an answer at random.",
  "The subject is concerned only with memorizing unrelated facts without applying them.",
  "The statement is false because it contradicts basic principles of the subject.",
]

const stems = [
  "Which statement about {subject} is accurate?",
  "A candidate studying {subject} should know that:",
  "Which fact is correct in {subject}?",
  "Choose the accurate statement for a lesson in {subject}.",
  "Which option correctly describes a key idea in {subject}?",
]

function buildQuestions(subject) {
  const facts = subjectFacts[subject.slug]
  if (!facts || facts.length !== 5) {
    throw new Error(`No complete local fact set exists for ${subject.slug}`)
  }

  return facts.map((fact, index) => {
    const answerIndex = (index * 3 + 1) % 4
    const options = []
    let distractorIndex = index % distractors.length

    for (let optionIndex = 0; optionIndex < 4; optionIndex++) {
      if (optionIndex === answerIndex) {
        options.push(fact)
      } else {
        options.push(distractors[distractorIndex % distractors.length])
        distractorIndex++
      }
    }

    return {
      question: stems[index].replace("{subject}", subject.name),
      options: Object.fromEntries(options.map((text, optionIndex) => ["ABCD"[optionIndex], text])),
      correctAnswer: "ABCD"[answerIndex],
      explanation: fact,
      difficulty: index < 2 ? "easy" : index < 4 ? "medium" : "hard",
    }
  })
}

async function main() {
  const result = await pool.query(`
    SELECT DISTINCT s.slug, s.name, s.subject_group
    FROM subjects s
    JOIN exam_subjects es ON es.subject_id = s.id AND es.is_active = TRUE
    JOIN exams e ON e.id = es.exam_id AND e.is_active = TRUE
    WHERE s.is_active = TRUE
    ORDER BY s.slug
  `)

  const existing = fs.existsSync(outputPath)
    ? JSON.parse(fs.readFileSync(outputPath, "utf8"))
    : { subjects: [] }
  const banks = new Map((existing.subjects || []).map((record) => [record.slug, record]))

  for (const subject of result.rows) {
    if (banks.has(subject.slug)) continue
    banks.set(subject.slug, { slug: subject.slug, questions: buildQuestions(subject) })
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })
    fs.writeFileSync(outputPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), subjects: [...banks.values()] }, null, 2)}\n`)
  }

  const questionCount = [...banks.values()].reduce((total, bank) => total + bank.questions.length, 0)
  console.log(`Preset dataset ready: ${banks.size} subjects, ${questionCount} original practice questions.`)
  console.log(`Saved to ${outputPath}`)
}

main()
  .catch((error) => {
    console.error("Building local preset dataset failed:", error.message)
    process.exitCode = 1
  })
  .finally(() => pool.end())
