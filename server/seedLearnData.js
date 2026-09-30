require('dotenv').config();
const pool = require('./src/config/database');

const subjectsData = [
  {
    slug: 'general-mathematics',
    exam: 'waec',
    syllabus_year: '2026/2027',
    title: 'General Mathematics Syllabus',
    description: 'Comprehensive WAEC Mathematics syllabus covering Number & Numeration, Algebra, Geometry, and Statistics.',
    topics: [
      {
        title: 'Number and Numeration',
        slug: 'number-and-numeration',
        description: 'Number bases, modular arithmetic, fractions, decimals, approximations and percentages.',
        order: 1,
        subtopics: [
          {
            title: 'Number Bases',
            slug: 'number-bases',
            description: 'Conversion of numbers from one base to another',
            order: 1,
            lessons: [
              {
                title: 'Introduction to Number Bases',
                slug: 'intro-number-bases',
                content: '<h3>Introduction</h3><p>A number base is the number of different digits or combination of digits and letters that a system of counting uses to represent numbers. For example, the most common base is base 10 (decimal system).</p><h4>Conversion from Base 10 to other bases</h4><p>To convert a number from base 10 to another base, we successively divide the number by the new base and read the remainders from bottom to top.</p><h4>Example</h4><p>Convert 25 to base 2.</p><p>25 / 2 = 12 R 1<br/>12 / 2 = 6 R 0<br/>6 / 2 = 3 R 0<br/>3 / 2 = 1 R 1<br/>1 / 2 = 0 R 1</p><p>Reading from bottom to top, 25 in base 2 is 11001.</p>'
              },
              {
                title: 'Operations in Number Bases',
                slug: 'operations-number-bases',
                content: '<h3>Addition and Subtraction</h3><p>Operations in other bases follow the same principles as base 10, but you carry over or borrow in multiples of the base.</p><h4>Example: Addition in Base 2</h4><p>1101 + 1011 = ?</p><p>  1101<br/>+ 1011<br/>------<br/> 11000<br/>------</p><p>Because 1+1 = 2, which is 10 in base 2 (0 carry 1).</p>'
              }
            ]
          }
        ]
      },
      {
        title: 'Algebra',
        slug: 'algebra',
        description: 'Equations, inequalities, polynomials and variation.',
        order: 2,
        subtopics: [
          {
            title: 'Quadratic Equations',
            slug: 'quadratic-equations',
            description: 'Solving quadratic equations using various methods.',
            order: 1,
            lessons: [
              {
                title: 'Factorization Method',
                slug: 'factorization-method',
                content: '<h3>Factorization Method</h3><p>A quadratic equation is in the form ax² + bx + c = 0. To solve by factorization, we find two numbers that multiply to give ac and add to give b.</p><h4>Example</h4><p>Solve x² + 5x + 6 = 0</p><p>The factors of 6 that add to 5 are 2 and 3.</p><p>x² + 2x + 3x + 6 = 0<br/>x(x + 2) + 3(x + 2) = 0<br/>(x + 3)(x + 2) = 0<br/>x = -3 or x = -2</p>'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: 'english-language',
    exam: 'jamb',
    syllabus_year: '2026/2027',
    title: 'Use of English Syllabus',
    description: 'Comprehensive JAMB Use of English syllabus covering Comprehension, Lexis, Structure, and Oral English.',
    topics: [
      {
        title: 'Comprehension/Summary',
        slug: 'comprehension-summary',
        description: 'Reading passages and answering questions based on comprehension.',
        order: 1,
        subtopics: [
          {
            title: 'Reading Comprehension',
            slug: 'reading-comprehension',
            description: 'Techniques for understanding passages.',
            order: 1,
            lessons: [
              {
                title: 'Skimming and Scanning',
                slug: 'skimming-scanning',
                content: '<h3>Skimming and Scanning</h3><p><strong>Skimming</strong> involves reading a text quickly to get the general idea or gist. <strong>Scanning</strong> involves searching for specific information or keywords.</p><h4>Tips for Skimming</h4><ul><li>Read the title and subtitles.</li><li>Read the first and last sentence of each paragraph.</li></ul><h4>Tips for Scanning</h4><ul><li>Identify keywords in the question.</li><li>Run your eyes quickly over the text looking for those keywords or synonyms.</li></ul>'
              }
            ]
          }
        ]
      },
      {
        title: 'Lexis and Structure',
        slug: 'lexis-structure',
        description: 'Vocabulary, idioms, synonyms, antonyms and grammar.',
        order: 2,
        subtopics: [
          {
            title: 'Synonyms and Antonyms',
            slug: 'synonyms-antonyms',
            description: 'Words nearest and opposite in meaning.',
            order: 1,
            lessons: [
              {
                title: 'Understanding Synonyms',
                slug: 'understanding-synonyms',
                content: '<h3>Synonyms</h3><p>Synonyms are words that have similar meanings. In an exam context, you must choose the word that best fits the context of the sentence.</p><h4>Example</h4><p>The manager was <em>sacked</em> for incompetence.<br/>A) Promoted<br/>B) Dismissed<br/>C) Applauded</p><p>The correct synonym is <strong>Dismissed</strong>.</p>'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: 'physics',
    exam: 'waec',
    syllabus_year: '2026/2027',
    title: 'Physics Syllabus',
    description: 'Mechanics, Waves, Heat, Electricity and Magnetism, Modern Physics.',
    topics: [
      {
        title: 'Mechanics',
        slug: 'mechanics',
        description: 'Motion, forces, work, energy, and power.',
        order: 1,
        subtopics: [
          {
            title: 'Motion',
            slug: 'motion',
            description: 'Linear motion, projectiles, and circular motion.',
            order: 1,
            lessons: [
              {
                title: 'Equations of Motion',
                slug: 'equations-of-motion',
                content: '<h3>Equations of Linear Motion</h3><p>There are four basic equations of linear motion for uniformly accelerated bodies:</p><ol><li>v = u + at</li><li>s = ut + ½at²</li><li>v² = u² + 2as</li><li>s = ½(u + v)t</li></ol><p>Where:<br/>u = initial velocity<br/>v = final velocity<br/>a = acceleration<br/>t = time<br/>s = distance/displacement</p>'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    slug: 'chemistry',
    exam: 'jamb',
    syllabus_year: '2026/2027',
    title: 'Chemistry Syllabus',
    description: 'Physical, Inorganic, and Organic Chemistry.',
    topics: [
      {
        title: 'Atomic Structure and Bonding',
        slug: 'atomic-structure',
        description: 'Atoms, molecules, isotopes, and chemical bonds.',
        order: 1,
        subtopics: [
          {
            title: 'Chemical Bonding',
            slug: 'chemical-bonding',
            description: 'Ionic, Covalent, Metallic and coordinate bonds.',
            order: 1,
            lessons: [
              {
                title: 'Ionic (Electrovalent) Bonding',
                slug: 'ionic-bonding',
                content: '<h3>Ionic Bonding</h3><p>Ionic bonding involves the complete transfer of one or more electrons from a metallic atom to a non-metallic atom. This results in the formation of oppositely charged ions which attract each other strongly.</p><h4>Characteristics of Ionic Compounds</h4><ul><li>High melting and boiling points</li><li>Soluble in polar solvents like water</li><li>Conduct electricity when molten or in aqueous solution</li></ul>'
              }
            ]
          }
        ]
      }
    ]
  }
];

async function seed() {
  console.log("Starting Syllabus Seeding...");
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    for (const subject of subjectsData) {
      console.log(`Processing subject slug: ${subject.slug}`);
      
      // Get subject ID
      const subjectResult = await client.query('SELECT id FROM subjects WHERE slug = $1', [subject.slug]);
      if (subjectResult.rows.length === 0) {
        console.log(`Subject ${subject.slug} not found in DB. Skipping...`);
        continue;
      }
      const subjectId = subjectResult.rows[0].id;
      
      // Upsert syllabus
      const syllabusResult = await client.query(
        `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (subject_id, exam, syllabus_year)
         DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description
         RETURNING id`,
        [subjectId, subject.exam.toUpperCase(), subject.syllabus_year, subject.title, subject.description]
      );
      
      const syllabusId = syllabusResult.rows[0].id;
      console.log(`  -> Syllabus ID: ${syllabusId}`);
      
      // Process topics
      for (const topic of subject.topics) {
        const topicResult = await client.query(
          `INSERT INTO topics (syllabus_id, title, slug, description, topic_order)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (syllabus_id, slug)
           DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, topic_order = EXCLUDED.topic_order
           RETURNING id`,
          [syllabusId, topic.title, topic.slug, topic.description, topic.order]
        );
        const topicId = topicResult.rows[0].id;
        
        // Process subtopics
        for (const subtopic of topic.subtopics) {
          const subResult = await client.query(
            `INSERT INTO subtopics (topic_id, title, slug, description, subtopic_order)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (topic_id, slug)
             DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, subtopic_order = EXCLUDED.subtopic_order
             RETURNING id`,
            [topicId, subtopic.title, subtopic.slug, subtopic.description, subtopic.order]
          );
          const subtopicId = subResult.rows[0].id;
          
          // Process lessons
          for (const lesson of subtopic.lessons) {
            await client.query(
              `INSERT INTO lessons (topic_id, subtopic_id, title, slug, content)
               VALUES ($1, $2, $3, $4, $5)
               ON CONFLICT (topic_id, slug)
               DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content, subtopic_id = EXCLUDED.subtopic_id`,
              [topicId, subtopicId, lesson.title, lesson.slug, lesson.content]
            );
          }
        }
      }
    }
    
    await client.query('COMMIT');
    console.log("Seeding complete!");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Seeding failed:", err);
  } finally {
    client.release();
    pool.end();
  }
}

seed();
