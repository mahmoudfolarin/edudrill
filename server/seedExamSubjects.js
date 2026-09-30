require("dotenv").config()

const pool = require("./src/config/database")

// =========================================================
// HELPER
// =========================================================

function makeSlug(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

// =========================================================
// MASTER SUBJECT CATALOGUE
// =========================================================

const subjects = [
  // ---------------------------------------------------------
  // CORE
  // ---------------------------------------------------------

  {
    name: "English Language",
    group: "Core Subjects",
  },
  {
    name: "General Mathematics",
    group: "Core Subjects",
  },

  // ---------------------------------------------------------
  // SCIENCE
  // ---------------------------------------------------------

  {
    name: "Biology",
    group: "Science",
  },
  {
    name: "Chemistry",
    group: "Science",
  },
  {
    name: "Physics",
    group: "Science",
  },
  {
    name: "Agriculture",
    group: "Science",
  },
  {
    name: "Further Mathematics",
    group: "Science",
  },
  {
    name: "Physical Education",
    group: "Science",
  },
  {
    name: "Health Education",
    group: "Science",
  },
  {
    name: "Foods and Nutrition",
    group: "Science",
  },
  {
    name: "Geography",
    group: "Science",
  },
  {
    name: "Technical Drawing",
    group: "Science",
  },
  {
    name: "Computer Studies",
    group: "Science",
  },
  {
    name: "Digital Technologies",
    group: "Science",
  },
  {
    name: "Physical and Health Education",
    group: "Science",
  },

  // ---------------------------------------------------------
  // HUMANITIES
  // ---------------------------------------------------------

  {
    name: "Nigerian History",
    group: "Humanities",
  },
  {
    name: "History",
    group: "Humanities",
  },
  {
    name: "Government",
    group: "Humanities",
  },
  {
    name: "Christian Religious Studies",
    group: "Humanities",
  },
  {
    name: "Islamic Studies",
    group: "Humanities",
  },
  {
    name: "Hausa",
    group: "Humanities",
  },
  {
    name: "Igbo",
    group: "Humanities",
  },
  {
    name: "Yoruba",
    group: "Humanities",
  },
  {
    name: "French",
    group: "Humanities",
  },
  {
    name: "Arabic",
    group: "Humanities",
  },
  {
    name: "Visual Art",
    group: "Humanities",
  },
  {
    name: "Music",
    group: "Humanities",
  },
  {
    name: "Literature-in-English",
    group: "Humanities",
  },
  {
    name: "Home Management",
    group: "Humanities",
  },
  {
    name: "Home Economics",
    group: "Humanities",
  },
  {
    name: "Catering Craft",
    group: "Humanities",
  },
  {
    name: "Art",
    group: "Humanities",
  },
  {
    name: "Civic Education",
    group: "Humanities",
  },

  // ---------------------------------------------------------
  // BUSINESS
  // ---------------------------------------------------------

  {
    name: "Accounting",
    group: "Business",
  },
  {
    name: "Commerce",
    group: "Business",
  },
  {
    name: "Marketing",
    group: "Business",
  },
  {
    name: "Economics",
    group: "Business",
  },
  {
    name: "Principles of Account",
    group: "Business",
  },

  // ---------------------------------------------------------
  // TRADE / VOCATIONAL
  // ---------------------------------------------------------

  {
    name: "Fashion Design and Garment Making",
    group: "Trade / Vocational",
  },
  {
    name: "Livestock Farming",
    group: "Trade / Vocational",
  },
  {
    name: "Beauty and Cosmetology",
    group: "Trade / Vocational",
  },
  {
    name: "Computer Hardware and GSM Repairs",
    group: "Trade / Vocational",
  },
  {
    name: "Solar Photovoltaic Installation and Maintenance",
    group: "Trade / Vocational",
  },
  {
    name: "Horticulture and Crop Production",
    group: "Trade / Vocational",
  },

  // ---------------------------------------------------------
  // JAMB
  // ---------------------------------------------------------

  {
    name: "Use of English",
    group: "Core Subjects",
  },
]

// =========================================================
// EXAMINATIONS
// =========================================================

const exams = [
  {
    name: "WAEC",
    slug: "waec",
    description:
      "West African Examinations Council",
  },
  {
    name: "NECO",
    slug: "neco",
    description:
      "National Examinations Council",
  },
  {
    name: "GCE",
    slug: "gce",
    description:
      "General Certificate of Education through WAEC private-candidate examinations",
  },
  {
    name: "JAMB",
    slug: "jamb",
    description:
      "Joint Admissions and Matriculation Board",
  },
]

// =========================================================
// WAEC
// =========================================================

const waecSubjects = [
  // Core
  "english-language",
  "general-mathematics",

  // Science
  "biology",
  "chemistry",
  "physics",
  "agriculture",
  "further-mathematics",
  "physical-education",
  "health-education",
  "foods-and-nutrition",
  "geography",
  "technical-drawing",

  // Humanities
  "nigerian-history",
  "government",
  "christian-religious-studies",
  "islamic-studies",
  "hausa",
  "igbo",
  "yoruba",
  "french",
  "arabic",
  "visual-art",
  "music",
  "literature-in-english",
  "home-management",
  "catering-craft",

  // Business
  "accounting",
  "commerce",
  "marketing",
  "economics",

  // Trade / Vocational
  "fashion-design-and-garment-making",
  "livestock-farming",
  "beauty-and-cosmetology",
  "computer-hardware-and-gsm-repairs",
  "solar-photovoltaic-installation-and-maintenance",
  "horticulture-and-crop-production",

  // Current WAEC timetable subjects
  "civic-education",
  "digital-technologies",
]

// =========================================================
// NECO
// =========================================================

const necoSubjects = [
  // Core
  "english-language",
  "general-mathematics",

  // Science
  "biology",
  "chemistry",
  "physics",
  "agriculture",
  "further-mathematics",
  "geography",
  "physical-education",
  "health-education",
  "foods-and-nutrition",
  "technical-drawing",

  // Humanities
  "nigerian-history",
  "government",
  "christian-religious-studies",
  "islamic-studies",
  "hausa",
  "igbo",
  "yoruba",
  "french",
  "arabic",
  "visual-art",
  "music",
  "literature-in-english",
  "home-management",
  "catering-craft",

  // Business
  "accounting",
  "commerce",
  "marketing",
  "economics",

  // Trade / Vocational
  "fashion-design-and-garment-making",
  "livestock-farming",
  "beauty-and-cosmetology",
  "computer-hardware-and-gsm-repairs",

  // NECO
  "computer-studies",
  "civic-education",
]

// =========================================================
// GCE
// =========================================================
//
// GCE is being modelled as WAEC private-candidate
// examination preparation.
// Therefore it currently uses the WAEC private-candidate
// subject structure.
//
// =========================================================

const gceSubjects = [
  ...waecSubjects,
]

// =========================================================
// JAMB
// OFFICIAL 2026 UTME SUBJECT LIST
// =========================================================

const jambSubjects = [
  "agriculture",
  "arabic",
  "art",
  "biology",
  "chemistry",
  "christian-religious-studies",
  "commerce",
  "economics",
  "french",
  "geography",
  "government",
  "hausa",
  "history",
  "home-economics",
  "igbo",
  "islamic-studies",
  "literature-in-english",
  "general-mathematics",
  "music",
  "physics",
  "principles-of-account",
  "use-of-english",
  "yoruba",
  "computer-studies",
  "physical-and-health-education",
]

// =========================================================
// GET EXAM
// =========================================================

async function getExam(slug) {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      slug
    FROM exams
    WHERE slug = $1
    `,
    [slug],
  )

  if (result.rows.length === 0) {
    throw new Error(`Exam not found: ${slug}`)
  }

  return result.rows[0]
}

// =========================================================
// GET SUBJECT
// =========================================================

async function getSubject(slug) {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      slug
    FROM subjects
    WHERE slug = $1
    `,
    [slug],
  )

  if (result.rows.length === 0) {
    throw new Error(`Subject not found: ${slug}`)
  }

  return result.rows[0]
}

// =========================================================
// SEED MASTER SUBJECT CATALOGUE
// =========================================================

async function seedSubjects() {
  console.log("")
  console.log("Seeding EduDrill subject catalogue...")
  console.log("")

  for (const subject of subjects) {
    const slug = makeSlug(subject.name)

    await pool.query(
      `
      INSERT INTO subjects (
        name,
        slug,
        subject_group,
        is_new,
        is_active
      )
      VALUES (
        $1,
        $2,
        $3,
        $4,
        TRUE
      )
      ON CONFLICT (slug)
      DO UPDATE SET
        name = EXCLUDED.name,
        subject_group = EXCLUDED.subject_group,
        is_active = TRUE
      `,
      [
        subject.name,
        slug,
        subject.group,
        subject.name === "Digital Technologies",
      ],
    )

    console.log(`✓ Subject: ${subject.name}`)
  }

  console.log("")
  console.log("Subject catalogue completed.")
}

// =========================================================
// SEED EXAMS
// =========================================================

async function seedExams() {
  console.log("")
  console.log("Seeding examinations...")
  console.log("")

  for (const exam of exams) {
    await pool.query(
      `
      INSERT INTO exams (
        name,
        slug,
        description,
        is_active
      )
      VALUES (
        $1,
        $2,
        $3,
        TRUE
      )
      ON CONFLICT (slug)
      DO UPDATE SET
        name = EXCLUDED.name,
        description = EXCLUDED.description,
        is_active = TRUE
      `,
      [
        exam.name,
        exam.slug,
        exam.description,
      ],
    )

    console.log(`✓ Exam: ${exam.name}`)
  }

  console.log("")
  console.log("Examinations completed.")
}

// =========================================================
// CONNECT ONE SUBJECT
// =========================================================

async function connectSubject(examId, subjectSlug) {
  const subject = await getSubject(subjectSlug)

  await pool.query(
    `
    INSERT INTO exam_subjects (
      exam_id,
      subject_id,
      is_active
    )
    VALUES (
      $1,
      $2,
      TRUE
    )
    ON CONFLICT (exam_id, subject_id)
    DO UPDATE SET
      is_active = TRUE
    `,
    [
      examId,
      subject.id,
    ],
  )

  console.log(`   ✓ ${subject.name}`)
}

// =========================================================
// RESET + APPLY EXAM SUBJECTS
// =========================================================

async function connectExamSubjects(
  examSlug,
  subjectSlugs,
) {
  const exam = await getExam(examSlug)

  console.log("")
  console.log(
    `Resetting ${exam.name} subject mapping...`,
  )
  console.log("")

  // IMPORTANT:
  // Deactivate every previous relationship for
  // this examination.
  //
  // This prevents old seed data from remaining active.
  await pool.query(
    `
    UPDATE exam_subjects
    SET is_active = FALSE
    WHERE exam_id = $1
    `,
    [exam.id],
  )

  console.log(
    `✓ Previous ${exam.name} mappings deactivated.`,
  )

  console.log("")
  console.log(
    `Connecting verified ${exam.name} subjects...`,
  )
  console.log("")

  for (const subjectSlug of subjectSlugs) {
    await connectSubject(
      exam.id,
      subjectSlug,
    )
  }

  const countResult = await pool.query(
    `
    SELECT COUNT(*) AS count
    FROM exam_subjects
    WHERE exam_id = $1
      AND is_active = TRUE
    `,
    [exam.id],
  )

  console.log("")
  console.log(
    `${exam.name} active subjects: ${countResult.rows[0].count}`,
  )
}

// =========================================================
// VERIFY FINAL MAPPINGS
// =========================================================

async function verifyMappings() {
  console.log("")
  console.log("==========================================")
  console.log("VERIFYING FINAL EXAM SUBJECT MAPPINGS")
  console.log("==========================================")

  const result = await pool.query(
    `
    SELECT
      e.name AS exam,
      COUNT(es.id) AS subject_count
    FROM exams e
    LEFT JOIN exam_subjects es
      ON e.id = es.exam_id
      AND es.is_active = TRUE
    WHERE e.is_active = TRUE
    GROUP BY e.id, e.name
    ORDER BY
      CASE e.slug
        WHEN 'waec' THEN 1
        WHEN 'neco' THEN 2
        WHEN 'gce' THEN 3
        WHEN 'jamb' THEN 4
        ELSE 5
      END
    `,
  )

  console.log("")

  for (const row of result.rows) {
    console.log(
      `${row.exam}: ${row.subject_count} active subjects`,
    )
  }

  console.log("")
}

// =========================================================
// MAIN
// =========================================================

async function seedExamSubjects() {
  try {
    console.log("==========================================")
    console.log("EduDrill Master Exam & Subject Seeder")
    console.log("==========================================")

    // 1. Create/update master subjects
    await seedSubjects()

    // 2. Create/update examinations
    await seedExams()

    // 3. Apply WAEC mapping
    await connectExamSubjects(
      "waec",
      waecSubjects,
    )

    // 4. Apply NECO mapping
    await connectExamSubjects(
      "neco",
      necoSubjects,
    )

    // 5. Apply GCE mapping
    await connectExamSubjects(
      "gce",
      gceSubjects,
    )

    // 6. Apply JAMB mapping
    await connectExamSubjects(
      "jamb",
      jambSubjects,
    )

    // 7. Verify actual database counts
    await verifyMappings()

    console.log("==========================================")
    console.log(
      "EDUDRILL EXAM SUBJECT DATABASE COMPLETED",
    )
    console.log("==========================================")

    console.log("")
    console.log(
      "Configured WAEC subjects:",
      waecSubjects.length,
    )

    console.log(
      "Configured NECO subjects:",
      necoSubjects.length,
    )

    console.log(
      "Configured GCE subjects:",
      gceSubjects.length,
    )

    console.log(
      "Configured JAMB subjects:",
      jambSubjects.length,
    )

    console.log("")
  } catch (error) {
    console.error("")
    console.error("Exam-subject seed failed:")
    console.error(error)
    console.error("")
  } finally {
    await pool.end()
  }
}

seedExamSubjects()