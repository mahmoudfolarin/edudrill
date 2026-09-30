require("dotenv").config({ path: require("node:path").join(__dirname, "..", ".env") })

const pool = require("../src/config/database")

const topicOutlines = {
  agriculture: ["Agricultural ecology and farm systems", "Soil science and soil fertility", "Crop production and protection", "Livestock production and health", "Farm management, marketing and extension"],
  accounting: ["Accounting concepts and source documents", "Books of original entry and ledger accounts", "Trial balance and financial statements", "Partnerships, companies and public sector accounts", "Cost accounting, budgeting and control"],
  arabic: ["Arabic script, sounds and spelling", "Vocabulary and morphology", "Sentence structure and grammar", "Reading comprehension and translation", "Composition, dialogue and literary texts"],
  art: ["Elements and principles of design", "Drawing, painting and colour", "Printmaking and graphic communication", "Sculpture, textiles and craft processes", "Art history, criticism and portfolio practice"],
  "beauty-and-cosmetology": ["Salon safety, hygiene and client care", "Skin, hair and nail science", "Hair care, styling and treatment", "Skin care, cosmetics and make-up", "Salon business, ethics and professional practice"],
  biology: ["Cell biology and organization", "Nutrition, transport and homeostasis", "Ecology and environmental biology", "Reproduction, heredity and evolution", "Health, disease and applied biology"],
  "catering-craft": ["Kitchen safety, hygiene and sanitation", "Food commodities and nutrition", "Food preparation and cooking methods", "Menu planning, service and hospitality", "Catering operations and business practice"],
  "christian-religious-studies": ["The Bible: structure, interpretation and key themes", "Creation, covenant and the history of Israel", "The life, teaching, death and resurrection of Jesus", "The early church, Christian leadership and mission", "Christian ethics, society and contemporary issues"],
  chemistry: ["Atomic structure and periodicity", "Chemical bonding and states of matter", "Chemical calculations and reaction types", "Acids, bases, salts and chemical equilibrium", "Organic chemistry, electrochemistry and industry"],
  commerce: ["Trade, production and business organization", "Wholesale, retail and international trade", "Transport, communication and warehousing", "Banking, insurance and financial services", "Marketing, consumer protection and business documents"],
  "computer-hardware-and-gsm-repairs": ["Electrical and electronic safety", "Electronic components and circuit measurement", "Computer architecture and hardware diagnostics", "Mobile device components and repair methods", "Service records, tools and repair business practice"],
  "computer-studies": ["Computer systems and data representation", "Operating systems and application software", "Algorithms, programming and problem solving", "Networks, internet and cybersecurity", "Databases, information systems and digital citizenship"],
  "digital-technologies": ["Digital devices, data and information", "Productivity software and digital content", "Networks, internet and online collaboration", "Cybersecurity, privacy and responsible use", "Digital problem solving and emerging technologies"],
  economics: ["Basic economic concepts and resource allocation", "Demand, supply and market equilibrium", "Production, costs and market structures", "National income, money and macroeconomic policy", "International trade, development and public finance"],
  "fashion-design-and-garment-making": ["Textiles, fibres and fabric properties", "Fashion drawing, design principles and research", "Pattern drafting, fitting and garment construction", "Finishing, quality control and garment care", "Fashion enterprise, merchandising and production"],
  "foods-and-nutrition": ["Food nutrients and their functions", "Dietary needs and meal planning", "Food selection, preparation and cooking", "Food hygiene, preservation and storage", "Nutrition, health and consumer choices"],
  french: ["French sounds, spelling and pronunciation", "Vocabulary and everyday communication", "Grammar, verbs and sentence structure", "Reading comprehension and translation", "Composition, dialogue and Francophone culture"],
  "further-mathematics": ["Functions, algebra and advanced equations", "Coordinate geometry and conic sections", "Differential and integral calculus", "Vectors, matrices and transformations", "Statistics, probability and mechanics"],
  geography: ["Map reading, scale and geographic skills", "Physical geography and earth systems", "Weather, climate, soils and vegetation", "Population, settlement and economic activity", "Environmental resources, development and fieldwork"],
  government: ["Political concepts, authority and legitimacy", "Constitutions, institutions and separation of powers", "Political participation, parties and elections", "Public administration, policy and accountability", "International relations and Nigerian foreign policy"],
  hausa: ["Hausa sounds, spelling and writing systems", "Vocabulary, word formation and grammar", "Sentence patterns and communication", "Reading comprehension and translation", "Oral literature, composition and culture"],
  "health-education": ["Personal health, growth and development", "Nutrition, fitness and healthy lifestyles", "Disease prevention and community health", "Safety, first aid and environmental health", "Health information, decisions and services"],
  history: ["Historical sources, chronology and methods", "State formation, societies and leadership", "Trade, migration and cultural contact", "Colonialism, resistance and political change", "Nation-building, conflict and contemporary history"],
  "home-economics": ["Family, home and resource management", "Nutrition, food preparation and meal planning", "Textiles, clothing and garment care", "Child development, family health and relationships", "Consumer education, housing and household enterprise"],
  "home-management": ["The home, family needs and management process", "Household resources, budgeting and time planning", "Housing, furnishings and interior care", "Household equipment, safety and maintenance", "Consumer choices, family health and sustainability"],
  "horticulture-and-crop-production": ["Plant science and horticultural crop groups", "Soil preparation, propagation and nursery practice", "Vegetable, fruit and ornamental crop production", "Irrigation, pests, diseases and crop protection", "Harvest, post-harvest handling and enterprise"],
  igbo: ["Igbo sounds, tone marks and orthography", "Vocabulary, word formation and grammar", "Sentence construction and communication", "Reading comprehension and translation", "Oral literature, composition and culture"],
  "islamic-studies": ["The Qur'an: revelation, themes and guidance", "Hadith and the Prophetic model", "Faith, worship and the pillars of Islam", "Islamic ethics, family and social responsibilities", "Islamic history, civilization and contemporary issues"],
  "literature-in-english": ["Literary genres, forms and terminology", "Prose: plot, setting, character and narration", "Poetry: form, imagery, sound and meaning", "Drama: structure, dialogue and stagecraft", "Literary analysis, themes and comparative response"],
  "livestock-farming": ["Livestock breeds, anatomy and production systems", "Animal nutrition, feed formulation and pasture", "Housing, handling, welfare and biosecurity", "Reproduction, breeding, health and disease control", "Livestock products, processing and enterprise"],
  marketing: ["Marketing concepts, markets and customer needs", "Market research, segmentation and positioning", "Product, price, place and promotion decisions", "Selling, distribution and customer service", "Marketing ethics, digital channels and evaluation"],
  music: ["Elements of music: pitch, rhythm, texture and form", "Notation, scales, intervals and keys", "Melody, harmony and musical composition", "Performance, voice, instruments and ensembles", "African and world music history and appreciation"],
  "nigerian-history": ["Nigerian peoples, societies and early states", "Trade, religion and regional interactions", "The nineteenth century and changing political systems", "Colonial rule, resistance and nationalism", "Independence, republics and contemporary Nigeria"],
  "physical-education": ["Physical fitness, assessment and training principles", "Movement skills, anatomy and physiology", "Team and individual sports skills and rules", "Gymnastics, athletics and recreational activities", "Safety, sportsmanship and lifelong physical activity"],
  "physical-and-health-education": ["Fitness, movement and physical activity", "Sport skills, rules and safe participation", "Nutrition, hygiene and personal health", "Disease prevention, first aid and community health", "Healthy lifestyle choices and recreation"],
  physics: ["Measurement, motion and forces", "Work, energy, power and properties of matter", "Heat, waves, sound and light", "Electricity, magnetism and electronics", "Atomic physics, energy resources and applications"],
  "principles-of-account": ["Accounting purpose, concepts and source documents", "Double entry, journals and ledger accounts", "Trial balance, errors and bank reconciliation", "Adjustments and final accounts for sole traders", "Control accounts, depreciation and basic costing"],
  "solar-photovoltaic-installation-and-maintenance": ["Solar energy, PV cells and system components", "Electrical quantities, wiring and safety", "PV array sizing, orientation and installation", "Batteries, charge controllers and inverters", "Inspection, fault diagnosis and maintenance"],
  "technical-drawing": ["Drawing instruments, lettering and geometric construction", "Scales, dimensioning and orthographic projection", "Isometric, oblique and pictorial drawing", "Sections, developments and intersections", "Technical graphics, interpretation and design communication"],
  "use-of-english": ["Reading comprehension and inference", "Lexis, vocabulary and sentence meaning", "Grammar, structure and usage", "Cloze passages and error recognition", "Oral English: sounds, stress and intonation"],
  "visual-art": ["Elements, principles and visual communication", "Drawing, painting and colour practice", "Sculpture, ceramics and three-dimensional forms", "Textiles, graphics and applied arts", "Art history, criticism and portfolio development"],
  yoruba: ["Yoruba sounds, tone marks and orthography", "Vocabulary, word formation and grammar", "Sentence patterns and communication", "Reading comprehension and translation", "Oral literature, composition and culture"],
  "civic-education": ["Civic values, citizenship and nationalism", "Human rights, law and constituted authority", "Family, relationships and community responsibilities", "Public health, safety and social challenges", "Democracy, participation and public service"],
  "general-mathematics": ["Number, numeration and arithmetic", "Algebra, equations and functions", "Geometry, measurement and trigonometry", "Statistics, probability and data", "Financial mathematics and applications"],
  "english-language": ["Lexis, vocabulary and meaning", "Grammar, structure and usage", "Essay and functional writing", "Reading comprehension and summary", "Oral English and pronunciation"],
}

const standardSubtopics = [
  "Key concepts and terminology",
  "Core principles and processes",
  "Methods, applications and problem solving",
  "Interpretation, evaluation and examination practice",
]

function slugify(value) {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")
}

async function createDraftForMapping(mapping) {
  const topics = topicOutlines[mapping.subject_slug]
  if (!topics) throw new Error(`Missing draft outline for ${mapping.subject_slug}`)

  const syllabus = await pool.query(`
    INSERT INTO syllabuses (
      subject_id, exam, syllabus_year, title, description, is_active,
      source_name, source_document_version, verification_status, review_notes
    ) VALUES (
      $1, $2, 'EduDrill Draft 2026', $3,
      $4, TRUE, 'EduDrill-generated draft', 'Draft 1', 'pending', $5
    )
    ON CONFLICT (subject_id, exam, syllabus_year)
    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      is_active = TRUE,
      source_name = EXCLUDED.source_name,
      source_document_version = EXCLUDED.source_document_version,
      verification_status = 'pending',
      review_notes = EXCLUDED.review_notes
    RETURNING id
  `, [
    mapping.subject_id,
    mapping.exam,
    `${mapping.exam} ${mapping.subject_name} - EduDrill Draft Syllabus`,
    `An EduDrill-generated draft outline for ${mapping.exam} ${mapping.subject_name}. It is not an official exam-board syllabus and requires academic review before being treated as authoritative.`,
    "Draft outline generated from subject-domain structure. Confirm topics and sequence against the current exam-board syllabus before publication as official course guidance.",
  ])

  const syllabusId = syllabus.rows[0].id
  for (const [topicIndex, topicTitle] of topics.entries()) {
    const topicResult = await pool.query(`
      INSERT INTO topics (syllabus_id, title, slug, description, topic_order, is_active)
      VALUES ($1, $2, $3, $4, $5, TRUE)
      ON CONFLICT (syllabus_id, slug)
      DO UPDATE SET
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        topic_order = EXCLUDED.topic_order,
        is_active = TRUE
      RETURNING id
    `, [syllabusId, topicTitle, slugify(topicTitle), `Draft topic area for ${mapping.subject_name}; review against the current ${mapping.exam} syllabus.`, topicIndex + 1])

    const topicId = topicResult.rows[0].id
    for (const [subtopicIndex, subtopicTitle] of standardSubtopics.entries()) {
      const title = `${topicTitle}: ${subtopicTitle}`
      await pool.query(`
        INSERT INTO subtopics (topic_id, title, slug, description, subtopic_order, is_active)
        VALUES ($1, $2, $3, $4, $5, TRUE)
        ON CONFLICT (topic_id, slug)
        DO UPDATE SET
          title = EXCLUDED.title,
          description = EXCLUDED.description,
          subtopic_order = EXCLUDED.subtopic_order,
          is_active = TRUE
      `, [topicId, title, slugify(subtopicTitle), `Draft subtopic for ${topicTitle}.`, subtopicIndex + 1])
    }
  }

  await pool.query(`
    INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active)
    SELECT $1, id, TRUE FROM exams WHERE name = $2 AND is_active = TRUE
    ON CONFLICT (syllabus_id, exam_id)
    DO UPDATE SET is_active = TRUE
  `, [syllabusId, mapping.exam])
}

async function main() {
  const mappings = await pool.query(`
    SELECT e.name AS exam, e.slug AS exam_slug,
           s.id AS subject_id, s.name AS subject_name, s.slug AS subject_slug
    FROM exam_subjects es
    JOIN exams e ON e.id = es.exam_id AND e.is_active = TRUE
    JOIN subjects s ON s.id = es.subject_id AND s.is_active = TRUE
    WHERE es.is_active = TRUE
      AND NOT EXISTS (
        SELECT 1
        FROM syllabuses sy
        JOIN syllabus_exams se ON se.syllabus_id = sy.id AND se.is_active = TRUE
        WHERE sy.subject_id = s.id
          AND sy.is_active = TRUE
          AND se.exam_id = e.id
      )
    ORDER BY e.name, s.name
  `)

  let created = 0
  for (const mapping of mappings.rows) {
    await createDraftForMapping(mapping)
    created++
    console.log(`${mapping.exam}: ${mapping.subject_name} draft ready`)
  }

  console.log(`Created or updated ${created} pending syllabus drafts.`)
}

main()
  .catch((error) => {
    console.error("Draft syllabus generation failed:", error.message)
    process.exitCode = 1
  })
  .finally(() => pool.end())
