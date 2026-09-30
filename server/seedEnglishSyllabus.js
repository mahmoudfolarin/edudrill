require('dotenv').config();
const pool = require('./src/config/database');

const engSyllabus = {
  exam: 'WAEC',
  subject: 'english-language',
  syllabus_year: '2026/2027',
  title: 'English Language Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Speech Work and Oral English',
      description: 'Vowels, consonants, syllables, and word stress.',
      order: 1,
      subtopics: ['Vowel sounds', 'Consonant sounds', 'Minimal pairs', 'Syllables and word stress', 'Stress in words and sentences', 'Intonation', 'Rhythm and connected speech']
    },
    {
      title: 'Grammar (Parts of Speech)',
      description: 'Nouns, pronouns, verbs, and subject-verb agreement.',
      order: 2,
      subtopics: ['Parts of speech revision', 'Nouns and noun phrases', 'Pronouns', 'Determiners and articles', 'Adjectives and adverbs', 'Verbs and verb forms', 'Tenses and sequence of tenses', 'Subject-verb agreement']
    },
    {
      title: 'Vocabulary Development',
      description: 'Words associated with school, home, and workplace.',
      order: 3,
      subtopics: ['Words associated with school and education', 'Home and family vocabulary', 'Occupation and workplace terms', 'Transportation', 'Health and hygiene', 'Commonly confused words', 'Synonyms, antonyms and word formation']
    },
    {
      title: 'Reading and Comprehension',
      description: 'Reading for main ideas and specific information.',
      order: 4,
      subtopics: ['Reading for main ideas', 'Reading for specific information', 'Context clues', 'Inference and deduction', "Author's purpose and attitude", 'Summary of passages', 'Vocabulary in context']
    },
    {
      title: 'Writing (Introduction)',
      description: 'Paragraph development and letter writing.',
      order: 5,
      subtopics: ['Paragraph development', 'Narrative writing', 'Descriptive writing', 'Informal letters', 'Formal letters', 'Articles', 'Personal and official notices']
    },
    {
      title: 'Literature',
      description: 'Meaning, forms, and figures of speech.',
      order: 6,
      subtopics: ['Meaning and forms of literature', 'Prose', 'Poetry', 'Drama', 'Literary elements', 'Character, setting, plot and theme', 'Figures of speech']
    },
    // SSS 1 Second Term
    {
      title: 'Grammar and Sentence Structure',
      description: 'Phrases, clauses, and sentence types.',
      order: 7,
      subtopics: ['Phrases and clauses', 'Types of sentences', 'Simple, compound and complex sentences', 'Active and passive voice', 'Direct and indirect speech', 'Question tags', 'Conditional sentences', 'Modals']
    },
    {
      title: 'Speech Work (Advanced)',
      description: 'Sentence stress, consonant clusters, and silent letters.',
      order: 8,
      subtopics: ['Word stress', 'Sentence stress', 'Intonation patterns', 'Consonant clusters', 'Silent letters', 'Pronunciation of difficult words']
    },
    {
      title: 'Vocabulary (Specific Fields)',
      description: 'Agriculture, science, commerce, and environment.',
      order: 9,
      subtopics: ['Agriculture', 'Science and technology', 'Commerce and banking', 'Government and civic life', 'Environment', 'Idioms and phrasal verbs']
    },
    {
      title: 'Comprehension and Summary',
      description: 'Skimming, scanning, and summary writing.',
      order: 10,
      subtopics: ['Skimming and scanning', 'Inference', 'Tone and mood', 'Fact versus opinion', 'Summary identification', 'Summary writing']
    },
    {
      title: 'Writing (Advanced)',
      description: 'Reports, speeches, and argumentative essays.',
      order: 11,
      subtopics: ['Formal letters', 'Application letters', 'Reports', 'Speeches', 'Articles for publication', 'Argumentative essays']
    },
    {
      title: 'Literature (Analysis)',
      description: 'Plot, characterization, and poetic devices.',
      order: 12,
      subtopics: ['Plot and structure', 'Characterization', 'Theme', 'Setting', 'Point of view', 'Poetic devices', 'Dramatic techniques']
    },
    // SSS 1 Third Term
    {
      title: 'Grammar Revision and Usage',
      description: 'Tense consistency, concord, and modifiers.',
      order: 13,
      subtopics: ['Revision of parts of speech', 'Tense consistency', 'Concord', 'Modifiers', 'Prepositions', 'Conjunctions', 'Common grammatical errors']
    },
    {
      title: 'Reading Skills',
      description: 'Critical reading and assumptions.',
      order: 14,
      subtopics: ['Critical reading', 'Recognizing assumptions', 'Identifying evidence', 'Interpreting figurative language', 'Summary practice']
    },
    {
      title: 'Writing and Essay Practice',
      description: 'Expository, narrative, and descriptive essays.',
      order: 15,
      subtopics: ['Narrative essay', 'Descriptive essay', 'Expository essay', 'Argumentative essay', 'Letter writing', 'Report writing', 'Editing and proofreading']
    },
    {
      title: 'Oral English Revision',
      description: 'Rhyming words and homophones.',
      order: 16,
      subtopics: ['Revision of vowels and consonants', 'Stress and intonation', 'Rhyming words', 'Homophones', 'Listening comprehension']
    },
    {
      title: 'Literature Revision',
      description: 'Prose, poetry, and drama analysis.',
      order: 17,
      subtopics: ['Prose analysis', 'Poetry analysis', 'Drama analysis', 'Literary appreciation', 'Revision and examination practice']
    },
    // SSS 2 First Term
    {
      title: 'Advanced Grammar',
      description: 'Advanced noun phrases, clauses, and verb patterns.',
      order: 18,
      subtopics: ['Advanced noun phrases', 'Clauses', 'Relative clauses', 'Adverbial clauses', 'Verb patterns', 'Concord and agreement', 'Tenses in complex contexts']
    },
    {
      title: 'Vocabulary (Professional Fields)',
      description: 'Politics, law, mass media, and medicine.',
      order: 19,
      subtopics: ['Politics and governance', 'Law and justice', 'Mass media', 'Medicine and health', 'Technology', 'Business and economics', 'Word formation']
    },
    {
      title: 'Oral English (Contrasts)',
      description: 'Vowel and consonant contrasts, assimilation, elision.',
      order: 20,
      subtopics: ['Vowel contrasts', 'Consonant contrasts', 'Stress placement', 'Intonation', 'Rhythm', 'Assimilation', 'Elision']
    },
    {
      title: 'Comprehension (Deep Analysis)',
      description: 'Implied meaning, tone, and logical relationships.',
      order: 21,
      subtopics: ['Implied meaning', "Writer's viewpoint", 'Tone and attitude', 'Logical relationships', 'Vocabulary in context', 'Critical response']
    },
    {
      title: 'Summary Skills',
      description: 'Identifying key points and paraphrasing.',
      order: 22,
      subtopics: ['Identifying key points', 'Condensing information', 'Paraphrasing', 'Summary organization', 'Avoiding irrelevant details']
    },
    // SSS 2 Second Term
    {
      title: 'Grammar and Sentence Structure II',
      description: 'Inversion, emphasis, parallel structures, ellipsis.',
      order: 23,
      subtopics: ['Inversion', 'Emphasis', 'Parallel structures', 'Ellipsis', 'Question forms', 'Reported speech', 'Passive constructions']
    },
    {
      title: 'Vocabulary (Global Issues)',
      description: 'Education, international relations, industry.',
      order: 24,
      subtopics: ['Education', 'International relations', 'Industry', 'Environment and climate', 'Culture and society', 'Religion and ethics', 'Idiomatic expressions']
    },
    {
      title: 'Oral English (Advanced)',
      description: 'Diphthongs, tripthongs, stress in polysyllabic words.',
      order: 25,
      subtopics: ['Diphthongs', 'Tripthongs', 'Stress in polysyllabic words', 'Contrastive stress', 'Intonation in questions and statements', 'Connected speech']
    },
    {
      title: 'Comprehension and Summary II',
      description: 'Critical analysis and comparison of ideas.',
      order: 26,
      subtopics: ['Critical analysis', 'Comparison of ideas', 'Inference', 'Authorial purpose', 'Summary from multiple ideas']
    },
    {
      title: 'Writing (Specialized)',
      description: 'Speech writing, debate writing, editorial writing.',
      order: 27,
      subtopics: ['Speech writing', 'Debate writing', 'Editorial writing', 'Formal letters', 'Reports and minutes', 'Creative writing']
    },
    // SSS 2 Third Term
    {
      title: 'Grammar Revision',
      description: 'Concord, tenses, clauses, sentence transformation.',
      order: 28,
      subtopics: ['Concord', 'Tenses', 'Clauses', 'Sentence transformation', 'Common usage errors', 'Punctuation']
    },
    {
      title: 'Reading and Summary Revision',
      description: 'Advanced comprehension and synthesis.',
      order: 29,
      subtopics: ['Advanced comprehension', 'Critical reading', 'Summary practice', 'Paraphrase and synthesis']
    },
    {
      title: 'Writing Revision',
      description: 'Timed essays and editing.',
      order: 30,
      subtopics: ['Timed essays', 'Argumentative writing', 'Discursive writing', 'Formal letters', 'Reports', 'Articles', 'Editing']
    },
    {
      title: 'Oral English Revision II',
      description: 'Sounds, stress, intonation, rhythm.',
      order: 31,
      subtopics: ['Sounds', 'Stress', 'Intonation', 'Rhythm', 'Minimal pairs', 'Listening tasks']
    },
    // SSS 3 First Term
    {
      title: 'Advanced Grammar and Usage',
      description: 'Parallelism, modifiers, tense and aspect.',
      order: 32,
      subtopics: ['Concord and agreement', 'Tense and aspect', 'Clauses and sentence patterns', 'Sentence transformation', 'Modifiers', 'Parallelism', 'Common errors']
    },
    {
      title: 'Oral English',
      description: 'Vowels, consonants, diphthongs, and rhythm.',
      order: 33,
      subtopics: ['Vowel sounds', 'Consonant sounds', 'Diphthongs', 'Stress', 'Intonation', 'Rhythm', 'Homophones', 'Connected speech']
    },
    {
      title: 'Comprehension',
      description: 'Critical comprehension, tone, attitude.',
      order: 34,
      subtopics: ['Critical comprehension', 'Inference', 'Tone and attitude', "Writer's purpose", 'Figurative meaning', 'Logical reasoning']
    },
    {
      title: 'Summary',
      description: 'Selection of points and synthesis under exam conditions.',
      order: 35,
      subtopics: ['Selection of points', 'Paraphrasing', 'Concise expression', 'Synthesis', 'Summary under examination conditions']
    },
    // SSS 3 Second Term
    {
      title: 'Examination Writing Skills',
      description: 'Planning, coherence, evidence, time management.',
      order: 36,
      subtopics: ['Understanding question requirements', 'Planning answers', 'Introduction and conclusion', 'Paragraph coherence', 'Evidence and examples', 'Time management', 'Editing']
    },
    {
      title: 'Grammar and Lexis Revision',
      description: 'Word classes, collocations, phrasal verbs.',
      order: 37,
      subtopics: ['Word classes', 'Concord', 'Tenses', 'Clauses', 'Phrasal verbs', 'Idioms', 'Collocations', 'Common errors']
    },
    {
      title: 'Oral English Revision III',
      description: 'Sound discrimination, stress, pronunciation.',
      order: 38,
      subtopics: ['Sound discrimination', 'Stress', 'Intonation', 'Pronunciation', 'Listening comprehension']
    },
    {
      title: 'Comprehension and Summary Revision',
      description: 'Main ideas, inference, vocabulary, summary technique.',
      order: 39,
      subtopics: ['Main ideas', 'Inference', 'Tone', 'Vocabulary', 'Summary technique', 'Past questions']
    },
    // SSS 3 Third Term
    {
      title: 'WASSCE/NECO Preparation',
      description: 'Objective grammar, oral english, comprehension practice.',
      order: 40,
      subtopics: ['Objective grammar practice', 'Oral English practice', 'Comprehension practice', 'Summary practice', 'Essay practice', 'Literature practice']
    },
    {
      title: 'Essay Mastery',
      description: 'Developing arguments, coherence, vocabulary choice.',
      order: 41,
      subtopics: ['Planning quickly', 'Developing arguments', 'Coherence and cohesion', 'Vocabulary choice', 'Grammar accuracy', 'Proofreading']
    },
    {
      title: 'Final Revision',
      description: 'Full mock examinations and error correction.',
      order: 42,
      subtopics: ['Full mock examinations', 'Correction of errors', 'Weak-area revision', 'Timed practice', 'Examination strategy']
    }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting English seeding process...");
    
    const targets = [
      { subject: 'english-language', exam: 'WAEC' },
      { subject: 'use-of-english', exam: 'JAMB' }
    ];

    for (const target of targets) {
      console.log(`\nSeeding for ${target.subject} (${target.exam})...`);
      
      // Get subject_id
      const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [target.subject]);
      if (subjectResult.rows.length === 0) {
        console.log(`Subject ${target.subject} not found in DB.`);
        continue;
      }
      const subjectId = subjectResult.rows[0].id;
      
      // Deactivate any existing syllabuses for this subject + exam to ensure this one takes precedence
      await pool.query(
        `UPDATE syllabuses SET is_active = FALSE WHERE subject_id = $1 AND exam = $2`,
        [subjectId, target.exam]
      );
      
      // Create Syllabus
      const sylRes = await pool.query(
        `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
         VALUES ($1, $2, $3, $4, $5, TRUE)
         ON CONFLICT (subject_id, exam, syllabus_year) DO UPDATE 
         SET title = EXCLUDED.title, description = EXCLUDED.description, is_active = TRUE
         RETURNING id`,
        [
          subjectId,
          target.exam,
          engSyllabus.syllabus_year,
          engSyllabus.title,
          engSyllabus.description
        ]
      );
      const syllabusId = sylRes.rows[0].id;
      console.log(`Created Syllabus: ${engSyllabus.title}`);

      // Link syllabus to exam
      const examRes = await pool.query('SELECT id FROM exams WHERE slug = $1', [target.exam.toLowerCase()]);
      if (examRes.rows.length > 0) {
        await pool.query(
          `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
          [syllabusId, examRes.rows[0].id]
        );
      }

    for (const topic of engSyllabus.topics) {
      const topicSlug = slugify(topic.title);
      
      const tRes = await pool.query(
        `INSERT INTO topics (syllabus_id, title, slug, description, topic_order, is_active)
         VALUES ($1, $2, $3, $4, $5, TRUE)
         ON CONFLICT (syllabus_id, slug) DO UPDATE 
         SET title = EXCLUDED.title, description = EXCLUDED.description
         RETURNING id`,
        [syllabusId, topic.title, topicSlug, topic.description, topic.order]
      );
      const topicId = tRes.rows[0].id;
      console.log(`  Created Topic: ${topic.title}`);

      let subOrder = 1;
      for (const subStr of topic.subtopics) {
        const subSlug = slugify(subStr);
        
        const subRes = await pool.query(
          `INSERT INTO subtopics (topic_id, title, slug, description, subtopic_order, is_active)
           VALUES ($1, $2, $3, $4, $5, TRUE)
           ON CONFLICT (topic_id, slug) DO UPDATE SET title = EXCLUDED.title
           RETURNING id`,
          [topicId, subStr, subSlug, `Learn about ${subStr}`, subOrder]
        );
        const subtopicId = subRes.rows[0].id;

        // Generate 2 lessons per subtopic
        for (let i = 1; i <= 2; i++) {
          const lessonTitle = `Lesson ${i}: ${subStr}`;
          const lessonSlug = slugify(lessonTitle);
          const lessonContent = `<div class="lesson-intro">
            <h2>Welcome to ${lessonTitle}</h2>
            <p>This is a comprehensive study module covering the concepts of <strong>${subStr}</strong> within the topic of ${topic.title}.</p>
            <h3>Key Principles</h3>
            <ul>
              <li>Understand the fundamental rules and definitions of ${subStr}.</li>
              <li>Apply standard methodologies accurately.</li>
              <li>Practice solving related problems to build confidence.</li>
            </ul>
            <p>Make sure to take notes as you read through this module. At the end of the topic, you can test your knowledge using the Practice feature!</p>
          </div>`;

          await pool.query(
            `INSERT INTO lessons (topic_id, subtopic_id, title, slug, content, lesson_order, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, TRUE)
             ON CONFLICT (topic_id, slug) DO UPDATE 
             SET title = EXCLUDED.title, content = EXCLUDED.content`,
            [topicId, subtopicId, lessonTitle, lessonSlug, lessonContent, i]
          );
        }
        
        subOrder++;
      }
    }
    }
    
    console.log("English Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
