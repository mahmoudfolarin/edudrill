-- ============================================================
-- EDUDRILL DATABASE
-- WAEC SUBJECT STRUCTURE
-- ============================================================


-- ============================================================
-- ACTIVATION KEYS
-- ============================================================

CREATE TABLE IF NOT EXISTS activation_keys (
    id SERIAL PRIMARY KEY,

    key_code VARCHAR(50) UNIQUE NOT NULL,

    license_type VARCHAR(30) NOT NULL DEFAULT 'Standard',

    status VARCHAR(20) NOT NULL DEFAULT 'Unused',

    expiration_date TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    activated_at TIMESTAMP NULL
);


-- ============================================================
-- PRODUCT LICENSES
-- ============================================================

CREATE TABLE IF NOT EXISTS product_licenses (
    id SERIAL PRIMARY KEY,

    product_key VARCHAR(100) UNIQUE NOT NULL,

    activation_key_id INTEGER UNIQUE
        REFERENCES activation_keys(id)
        ON DELETE SET NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'Inactive',

    activated_at TIMESTAMP NULL,

    last_seen_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- DEVICES
-- ============================================================

CREATE TABLE IF NOT EXISTS devices (
    id SERIAL PRIMARY KEY,

    product_license_id INTEGER UNIQUE
        REFERENCES product_licenses(id)
        ON DELETE CASCADE,

    device_identifier VARCHAR(255) UNIQUE NOT NULL,

    device_name VARCHAR(255),

    registered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    last_seen_at TIMESTAMP NULL
);


-- ============================================================
-- SUBJECTS
-- ============================================================

CREATE TABLE IF NOT EXISTS subjects (
    id SERIAL PRIMARY KEY,

    name VARCHAR(150) UNIQUE NOT NULL,

    slug VARCHAR(150) UNIQUE NOT NULL,

    subject_group VARCHAR(50) NOT NULL,

    icon VARCHAR(20),

    is_new BOOLEAN NOT NULL DEFAULT FALSE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- REMOVE OLD / INCORRECT SUBJECT RECORDS
-- ============================================================

DELETE FROM subjects
WHERE slug IN (
    'english',
    'mathematics',
    'civic',
    'civic-education-old'
);


-- ============================================================
-- WAEC CORE SUBJECTS
-- ============================================================

INSERT INTO subjects
(
    name,
    slug,
    subject_group,
    icon,
    is_new,
    is_active
)
VALUES

(
    'English Language',
    'english-language',
    'Core Subjects',
    'EN',
    FALSE,
    TRUE
),

(
    'General Mathematics',
    'general-mathematics',
    'Core Subjects',
    'MA',
    FALSE,
    TRUE
),

(
    'Citizenship and Heritage Studies Education',
    'citizenship-and-heritage-studies-education',
    'Core Subjects',
    'CH',
    TRUE,
    TRUE
),

(
    'Digital Technologies',
    'digital-technologies',
    'Core Subjects',
    'DT',
    TRUE,
    TRUE
)

ON CONFLICT (slug)
DO UPDATE SET
    name = EXCLUDED.name,
    subject_group = EXCLUDED.subject_group,
    icon = EXCLUDED.icon,
    is_new = EXCLUDED.is_new,
    is_active = EXCLUDED.is_active;


-- ============================================================
-- CIVIC EDUCATION
-- ============================================================

INSERT INTO subjects
(
    name,
    slug,
    subject_group,
    icon,
    is_new,
    is_active
)
VALUES
(
    'Civic Education',
    'civic-education',
    'Humanities',
    'CE',
    FALSE,
    TRUE
)

ON CONFLICT (slug)
DO UPDATE SET
    name = EXCLUDED.name,
    subject_group = EXCLUDED.subject_group,
    icon = EXCLUDED.icon,
    is_new = EXCLUDED.is_new,
    is_active = EXCLUDED.is_active;


-- ============================================================
-- SCIENCE SUBJECTS
-- ============================================================

INSERT INTO subjects
(
    name,
    slug,
    subject_group,
    icon,
    is_new,
    is_active
)
VALUES

(
    'Biology',
    'biology',
    'Science',
    'BI',
    FALSE,
    TRUE
),

(
    'Chemistry',
    'chemistry',
    'Science',
    'CH',
    FALSE,
    TRUE
),

(
    'Physics',
    'physics',
    'Science',
    'PH',
    FALSE,
    TRUE
),

(
    'Agricultural Science',
    'agricultural-science',
    'Science',
    'AG',
    FALSE,
    TRUE
),

(
    'Further Mathematics',
    'further-mathematics',
    'Science',
    'FM',
    FALSE,
    TRUE
),

(
    'Physical Education',
    'physical-education',
    'Science',
    'PE',
    FALSE,
    TRUE
),

(
    'Health Education',
    'health-education',
    'Science',
    'HE',
    FALSE,
    TRUE
),

(
    'Foods & Nutrition',
    'foods-and-nutrition',
    'Science',
    'FN',
    FALSE,
    TRUE
),

(
    'Geography',
    'geography',
    'Science',
    'GE',
    FALSE,
    TRUE
),

(
    'Technical Drawing',
    'technical-drawing',
    'Science',
    'TD',
    FALSE,
    TRUE
)

ON CONFLICT (slug)
DO UPDATE SET
    name = EXCLUDED.name,
    subject_group = EXCLUDED.subject_group,
    icon = EXCLUDED.icon,
    is_new = EXCLUDED.is_new,
    is_active = EXCLUDED.is_active;


-- ============================================================
-- HUMANITIES SUBJECTS
-- ============================================================

INSERT INTO subjects
(
    name,
    slug,
    subject_group,
    icon,
    is_new,
    is_active
)
VALUES

(
    'Nigerian History',
    'nigerian-history',
    'Humanities',
    'NH',
    FALSE,
    TRUE
),

(
    'Government',
    'government',
    'Humanities',
    'GV',
    FALSE,
    TRUE
),

(
    'Christian Religious Studies',
    'christian-religious-studies',
    'Humanities',
    'CR',
    FALSE,
    TRUE
),

(
    'Islamic Studies',
    'islamic-studies',
    'Humanities',
    'IS',
    FALSE,
    TRUE
),

(
    'Hausa Language',
    'hausa-language',
    'Humanities',
    'HA',
    FALSE,
    TRUE
),

(
    'Igbo Language',
    'igbo-language',
    'Humanities',
    'IG',
    FALSE,
    TRUE
),

(
    'Yoruba Language',
    'yoruba-language',
    'Humanities',
    'YO',
    FALSE,
    TRUE
),

(
    'French',
    'french',
    'Humanities',
    'FR',
    FALSE,
    TRUE
),

(
    'Arabic',
    'arabic',
    'Humanities',
    'AR',
    FALSE,
    TRUE
),

(
    'Visual Art',
    'visual-art',
    'Humanities',
    'VA',
    FALSE,
    TRUE
),

(
    'Music',
    'music',
    'Humanities',
    'MU',
    FALSE,
    TRUE
),

(
    'Literature-in-English',
    'literature-in-english',
    'Humanities',
    'LI',
    FALSE,
    TRUE
),

(
    'Home Management',
    'home-management',
    'Humanities',
    'HM',
    FALSE,
    TRUE
),

(
    'Catering Craft',
    'catering-craft',
    'Humanities',
    'CC',
    FALSE,
    TRUE
)

ON CONFLICT (slug)
DO UPDATE SET
    name = EXCLUDED.name,
    subject_group = EXCLUDED.subject_group,
    icon = EXCLUDED.icon,
    is_new = EXCLUDED.is_new,
    is_active = EXCLUDED.is_active;


-- ============================================================
-- BUSINESS SUBJECTS
-- ============================================================

INSERT INTO subjects
(
    name,
    slug,
    subject_group,
    icon,
    is_new,
    is_active
)
VALUES

(
    'Accounting',
    'accounting',
    'Business',
    'AC',
    FALSE,
    TRUE
),

(
    'Commerce',
    'commerce',
    'Business',
    'CO',
    FALSE,
    TRUE
),

(
    'Marketing',
    'marketing',
    'Business',
    'MK',
    FALSE,
    TRUE
),

(
    'Economics',
    'economics',
    'Business',
    'EC',
    FALSE,
    TRUE
)

ON CONFLICT (slug)
DO UPDATE SET
    name = EXCLUDED.name,
    subject_group = EXCLUDED.subject_group,
    icon = EXCLUDED.icon,
    is_new = EXCLUDED.is_new,
    is_active = EXCLUDED.is_active;


-- ============================================================
-- TRADE / VOCATIONAL SUBJECTS
-- ============================================================

INSERT INTO subjects
(
    name,
    slug,
    subject_group,
    icon,
    is_new,
    is_active
)
VALUES

(
    'Fashion Design and Garment Making',
    'fashion-design-and-garment-making',
    'Trade / Vocational',
    'FD',
    FALSE,
    TRUE
),

(
    'Livestock Farming',
    'livestock-farming',
    'Trade / Vocational',
    'LF',
    FALSE,
    TRUE
),

(
    'Beauty and Cosmetology',
    'beauty-and-cosmetology',
    'Trade / Vocational',
    'BC',
    FALSE,
    TRUE
),

(
    'Computer Hardware and GSM Repairs',
    'computer-hardware-and-gsm-repairs',
    'Trade / Vocational',
    'CG',
    FALSE,
    TRUE
),

(
    'Solar Photovoltaic Installation and Maintenance',
    'solar-photovoltaic-installation-and-maintenance',
    'Trade / Vocational',
    'SP',
    FALSE,
    TRUE
),

(
    'Horticulture and Crop Production',
    'horticulture-and-crop-production',
    'Trade / Vocational',
    'HC',
    FALSE,
    TRUE
)

ON CONFLICT (slug)
DO UPDATE SET
    name = EXCLUDED.name,
    subject_group = EXCLUDED.subject_group,
    icon = EXCLUDED.icon,
    is_new = EXCLUDED.is_new,
    is_active = EXCLUDED.is_active;


-- ============================================================
-- FINAL SUBJECT CLEANUP
-- ============================================================

UPDATE subjects
SET subject_group = 'Trade / Vocational'
WHERE slug = 'catering-craft';


-- ============================================================
-- CHECK THE SUBJECT DATABASE
-- ============================================================

SELECT
    id,
    name,
    slug,
    subject_group,
    is_new,
    is_active
FROM subjects
ORDER BY
    CASE subject_group
        WHEN 'Core Subjects' THEN 1
        WHEN 'Science' THEN 2
        WHEN 'Humanities' THEN 3
        WHEN 'Business' THEN 4
        WHEN 'Trade / Vocational' THEN 5
        ELSE 6
    END,
    name ASC;


-- ============================================================
-- EDUDRILL SYLLABUS SYSTEM
-- ============================================================


-- ============================================================
-- SYLLABUSES
-- ============================================================

CREATE TABLE IF NOT EXISTS syllabuses (
    id SERIAL PRIMARY KEY,

    subject_id INTEGER NOT NULL
        REFERENCES subjects(id)
        ON DELETE CASCADE,

    exam VARCHAR(30) NOT NULL DEFAULT 'WAEC',

    syllabus_year VARCHAR(20) NOT NULL DEFAULT '2026/2027',

    title VARCHAR(255) NOT NULL,

    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (
        subject_id,
        exam,
        syllabus_year
    )
);


-- ============================================================
-- TOPICS
-- ============================================================

CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,

    syllabus_id INTEGER NOT NULL
        REFERENCES syllabuses(id)
        ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,

    slug VARCHAR(255) NOT NULL,

    description TEXT,

    topic_order INTEGER NOT NULL DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (
        syllabus_id,
        slug
    )
);


-- ============================================================
-- SUBTOPICS
-- ============================================================

CREATE TABLE IF NOT EXISTS subtopics (
    id SERIAL PRIMARY KEY,

    topic_id INTEGER NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    title VARCHAR(255) NOT NULL,

    slug VARCHAR(255) NOT NULL,

    description TEXT,

    subtopic_order INTEGER NOT NULL DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (
        topic_id,
        slug
    )
);


-- ============================================================
-- LESSONS
-- ============================================================

CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,

    topic_id INTEGER NOT NULL
        REFERENCES topics(id)
        ON DELETE CASCADE,

    subtopic_id INTEGER NULL
        REFERENCES subtopics(id)
        ON DELETE SET NULL,

    title VARCHAR(255) NOT NULL,

    slug VARCHAR(255) NOT NULL,

    content TEXT,

    lesson_order INTEGER NOT NULL DEFAULT 0,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (
        topic_id,
        slug
    )
);


-- ============================================================
-- TOPIC INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_syllabuses_subject
ON syllabuses(subject_id);


-- ============================================================
-- SYLLABUS VERIFICATION METADATA
-- ============================================================

ALTER TABLE syllabuses
ADD COLUMN IF NOT EXISTS source_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS source_url TEXT,
ADD COLUMN IF NOT EXISTS source_document_version VARCHAR(100),
ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50) NOT NULL DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS verified_by VARCHAR(255),
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS review_notes TEXT;


CREATE INDEX IF NOT EXISTS idx_syllabuses_verification
ON syllabuses(verification_status);


CREATE INDEX IF NOT EXISTS idx_syllabuses_exam
ON syllabuses(exam);


CREATE INDEX IF NOT EXISTS idx_topics_syllabus
ON topics(syllabus_id);


CREATE INDEX IF NOT EXISTS idx_subtopics_topic
ON subtopics(topic_id);


CREATE INDEX IF NOT EXISTS idx_lessons_topic
ON lessons(topic_id);


-- ============================================================
-- VERIFY SYLLABUS TABLES
-- ============================================================

SELECT
    table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN (
    'syllabuses',
    'topics',
    'subtopics',
    'lessons'
)
ORDER BY table_name;


-- =========================================================
-- EDUDRILL QUESTION BANK
-- =========================================================

CREATE TABLE IF NOT EXISTS questions (
    id SERIAL PRIMARY KEY,

    exam VARCHAR(30) NOT NULL,

    subject_id INTEGER NOT NULL
        REFERENCES subjects(id)
        ON DELETE CASCADE,

    syllabus_id INTEGER
        REFERENCES syllabuses(id)
        ON DELETE SET NULL,

    topic_id INTEGER
        REFERENCES topics(id)
        ON DELETE SET NULL,

    subtopic_id INTEGER
        REFERENCES subtopics(id)
        ON DELETE SET NULL,

    year VARCHAR(20),

    question_type VARCHAR(30) NOT NULL DEFAULT 'multiple_choice',

    source_type VARCHAR(30) NOT NULL DEFAULT 'practice',

    question_text TEXT NOT NULL,

    option_a TEXT NOT NULL,

    option_b TEXT NOT NULL,

    option_c TEXT NOT NULL,

    option_d TEXT NOT NULL,

    correct_answer CHAR(1) NOT NULL,

    explanation TEXT,

    difficulty VARCHAR(20) DEFAULT 'medium',

    marks INTEGER NOT NULL DEFAULT 1,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT valid_correct_answer
        CHECK (correct_answer IN ('A', 'B', 'C', 'D')),

    CONSTRAINT valid_question_type
        CHECK (
            question_type IN (
                'multiple_choice',
                'theory'
            )
        ),

    CONSTRAINT valid_source_type
        CHECK (
            source_type IN (
                'past_question',
                'practice',
                'ai_generated'
            )
        ),

    CONSTRAINT valid_difficulty
        CHECK (
            difficulty IN (
                'easy',
                'medium',
                'hard'
            )
        )
);


-- =========================================================
-- QUESTION INDEXES
-- =========================================================

CREATE INDEX IF NOT EXISTS idx_questions_exam
    ON questions(exam);


CREATE INDEX IF NOT EXISTS idx_questions_subject
    ON questions(subject_id);


CREATE INDEX IF NOT EXISTS idx_questions_topic
    ON questions(topic_id);


CREATE INDEX IF NOT EXISTS idx_questions_subtopic
    ON questions(subtopic_id);


CREATE INDEX IF NOT EXISTS idx_questions_year
    ON questions(year);


CREATE INDEX IF NOT EXISTS idx_questions_source_type
    ON questions(source_type);


CREATE INDEX IF NOT EXISTS idx_questions_active
    ON questions(is_active);


-- =========================================================
-- EDUDRILL PAST PAPERS
-- =========================================================

CREATE TABLE IF NOT EXISTS past_papers (
    id SERIAL PRIMARY KEY,

    exam VARCHAR(30) NOT NULL,

    subject_id INTEGER NOT NULL
        REFERENCES subjects(id)
        ON DELETE CASCADE,

    year VARCHAR(20) NOT NULL,

    session VARCHAR(50),

    paper_code VARCHAR(50),

    paper_title VARCHAR(255) NOT NULL,

    paper_type VARCHAR(50) NOT NULL DEFAULT 'objective',

    duration_minutes INTEGER,

    total_questions INTEGER,

    instructions TEXT,

    source_name VARCHAR(255),

    source_url TEXT,

    license_status VARCHAR(50) NOT NULL DEFAULT 'pending',

    verification_status VARCHAR(50) NOT NULL DEFAULT 'pending',

    verified_by VARCHAR(255),

    verified_at TIMESTAMP,

    is_active BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (
        exam,
        subject_id,
        year,
        session,
        paper_code
    )
);


-- =========================================================
-- CONNECT QUESTIONS TO PAST PAPERS
-- =========================================================

ALTER TABLE questions
ADD COLUMN IF NOT EXISTS past_paper_id INTEGER
    REFERENCES past_papers(id)
    ON DELETE CASCADE;


ALTER TABLE questions
ADD COLUMN IF NOT EXISTS question_number INTEGER;


ALTER TABLE questions
ADD COLUMN IF NOT EXISTS paper_section VARCHAR(50);


ALTER TABLE questions
ADD COLUMN IF NOT EXISTS source_name VARCHAR(255);


ALTER TABLE questions
ADD COLUMN IF NOT EXISTS source_url TEXT;


ALTER TABLE questions
ADD COLUMN IF NOT EXISTS license_status VARCHAR(50)
    DEFAULT 'pending';


ALTER TABLE questions
ADD COLUMN IF NOT EXISTS verification_status VARCHAR(50)
    DEFAULT 'pending';


ALTER TABLE questions
ADD COLUMN IF NOT EXISTS verified_by VARCHAR(255);


ALTER TABLE questions
ADD COLUMN IF NOT EXISTS verified_at TIMESTAMP;


-- =========================================================
-- EXTERNAL QUESTION SOURCE TRACKING
-- =========================================================
-- Used for ALOC and future question providers.
-- Prevents the same external question from being imported twice.

ALTER TABLE questions
ADD COLUMN IF NOT EXISTS source_provider VARCHAR(50);


ALTER TABLE questions
ADD COLUMN IF NOT EXISTS source_external_id VARCHAR(255);


CREATE UNIQUE INDEX IF NOT EXISTS idx_questions_source_external
ON questions(source_provider, source_external_id);


-- =========================================================
-- PAST PAPER EXTERNAL SOURCE TRACKING
-- =========================================================
-- Used for ALOC and future past-paper providers.

ALTER TABLE past_papers
ADD COLUMN IF NOT EXISTS source_provider VARCHAR(50);


ALTER TABLE past_papers
ADD COLUMN IF NOT EXISTS source_external_id VARCHAR(255);


CREATE UNIQUE INDEX IF NOT EXISTS idx_past_papers_source_external
ON past_papers(source_provider, source_external_id);


-- =========================================================
-- INDEXES
-- =========================================================

CREATE INDEX IF NOT EXISTS idx_past_papers_exam
    ON past_papers(exam);


CREATE INDEX IF NOT EXISTS idx_past_papers_subject
    ON past_papers(subject_id);


CREATE INDEX IF NOT EXISTS idx_past_papers_year
    ON past_papers(year);


CREATE INDEX IF NOT EXISTS idx_past_papers_active
    ON past_papers(is_active);


CREATE INDEX IF NOT EXISTS idx_questions_past_paper
    ON questions(past_paper_id);


CREATE INDEX IF NOT EXISTS idx_questions_question_number
    ON questions(question_number);


-- =========================================================
-- VALIDATION
-- =========================================================

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'valid_question_number'
    ) THEN

        ALTER TABLE questions
        ADD CONSTRAINT valid_question_number
        CHECK (
            question_number IS NULL
            OR question_number > 0
        );

    END IF;
END
$$;


DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'valid_paper_type'
    ) THEN

        ALTER TABLE past_papers
        ADD CONSTRAINT valid_paper_type
        CHECK (
            paper_type IN (
                'objective',
                'theory',
                'practical',
                'oral',
                'mixed'
            )
        );

    END IF;
END
$$;


DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'valid_license_status'
    ) THEN

        ALTER TABLE past_papers
        ADD CONSTRAINT valid_license_status
        CHECK (
            license_status IN (
                'pending',
                'authorized',
                'licensed',
                'public_domain',
                'restricted',
                'rejected'
            )
        );

    END IF;
END
$$;


DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'valid_verification_status'
    ) THEN

        ALTER TABLE past_papers
        ADD CONSTRAINT valid_verification_status
        CHECK (
            verification_status IN (
                'pending',
                'verified',
                'rejected'
            )
        );

    END IF;
END
$$;


-- =========================================================
-- EDUDRILL EXAMS AND EXAM-SUBJECT RELATIONSHIPS
-- =========================================================

CREATE TABLE IF NOT EXISTS exams (
    id SERIAL PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    slug VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS exam_subjects (
    id SERIAL PRIMARY KEY,

    exam_id INTEGER NOT NULL
        REFERENCES exams(id)
        ON DELETE CASCADE,

    subject_id INTEGER NOT NULL
        REFERENCES subjects(id)
        ON DELETE CASCADE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (exam_id, subject_id)
);


CREATE INDEX IF NOT EXISTS idx_exam_subjects_exam
    ON exam_subjects(exam_id);


CREATE INDEX IF NOT EXISTS idx_exam_subjects_subject
    ON exam_subjects(subject_id);


-- =========================================================
-- EXAM SEED DATA
-- =========================================================

INSERT INTO exams (
    name,
    slug,
    description
)
VALUES
(
    'WAEC',
    'waec',
    'West African Examinations Council'
),
(
    'NECO',
    'neco',
    'National Examinations Council'
),
(
    'GCE',
    'gce',
    'General Certificate of Education'
),
(
    'JAMB',
    'jamb',
    'Joint Admissions and Matriculation Board'
)

ON CONFLICT (slug)
DO NOTHING;


-- =========================================================
-- SYLLABUS EXAM RELATIONSHIPS
-- =========================================================

CREATE TABLE IF NOT EXISTS syllabus_exams (
    id SERIAL PRIMARY KEY,

    syllabus_id INTEGER NOT NULL
        REFERENCES syllabuses(id)
        ON DELETE CASCADE,

    exam_id INTEGER NOT NULL
        REFERENCES exams(id)
        ON DELETE CASCADE,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (syllabus_id, exam_id)
);


CREATE INDEX IF NOT EXISTS idx_syllabus_exams_syllabus
ON syllabus_exams(syllabus_id);


CREATE INDEX IF NOT EXISTS idx_syllabus_exams_exam
ON syllabus_exams(exam_id);


-- ============================================================
-- LESSON PROGRESS
-- ============================================================

CREATE TABLE IF NOT EXISTS lesson_progress (
    id SERIAL PRIMARY KEY,

    device_id INTEGER NOT NULL
        REFERENCES devices(id)
        ON DELETE CASCADE,

    lesson_id INTEGER NOT NULL
        REFERENCES lessons(id)
        ON DELETE CASCADE,

    completed BOOLEAN NOT NULL DEFAULT FALSE,

    completed_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (device_id, lesson_id)
);


CREATE INDEX IF NOT EXISTS idx_lesson_progress_device
ON lesson_progress(device_id);


CREATE INDEX IF NOT EXISTS idx_lesson_progress_lesson
ON lesson_progress(lesson_id);
-- ============================================================
-- BOOKMARKS
-- ============================================================

CREATE TABLE IF NOT EXISTS bookmarks (
    id SERIAL PRIMARY KEY,
    lesson_id VARCHAR(150) NOT NULL,
    topic_id VARCHAR(150),
    subject VARCHAR(150) NOT NULL,
    exam VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    topic_title VARCHAR(255),
    subject_name VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- PERFORMANCE
-- ============================================================

CREATE TABLE IF NOT EXISTS performance (
    id SERIAL PRIMARY KEY,
    exam VARCHAR(50) NOT NULL,
    subject VARCHAR(150) NOT NULL,
    type VARCHAR(50) NOT NULL,
    topic_id VARCHAR(150),
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    percentage INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

