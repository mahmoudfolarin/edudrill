require('dotenv').config();
const pool = require('./src/config/database');

const physicalSyllabus = {
  exam: 'WAEC',
  subject: 'physical-education', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Physical Education Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Introduction to Physical Education',
      description: 'Meaning, scope, aims, and objectives.',
      order: 1,
      subtopics: ['Meaning and scope of physical education', 'Aims and objectives', 'Importance of physical education', 'Career opportunities in physical education and sport']
    },
    {
      title: 'Physical Fitness',
      description: 'Components, assessment, and training principles.',
      order: 2,
      subtopics: ['Meaning and components of physical fitness', 'Health-related and skill-related fitness', 'Fitness assessment', 'Principles of fitness training']
    },
    {
      title: 'Body Conditioning Exercises',
      description: 'Warm-up, flexibility, strength, and endurance.',
      order: 3,
      subtopics: ['Warm-up and cool-down', 'Flexibility exercises', 'Strength and endurance exercises', 'Circuit training']
    },
    {
      title: 'Athletics: Track Events',
      description: 'Sprints, middle and long distance, relays.',
      order: 4,
      subtopics: ['Sprints', 'Middle- and long-distance races', 'Relay races', 'Starting techniques and finishing']
    },
    {
      title: 'Athletics: Field Events',
      description: 'Long jump, high jump, shot put.',
      order: 5,
      subtopics: ['Long jump', 'High jump', 'Shot put', 'Basic techniques and safety']
    },
    {
      title: 'Practical Health and Safety',
      description: 'Hygiene, sports safety, and first aid.',
      order: 6,
      subtopics: ['Personal hygiene', 'Sports safety', 'Injury prevention', 'First aid basics']
    },
    // SSS 1 Second Term
    {
      title: 'Games and Sports',
      description: 'Classification, rules, officials, and sportsmanship.',
      order: 7,
      subtopics: ['Meaning and classification of games', 'Individual and team sports', 'Rules, officials and facilities', 'Sportsmanship']
    },
    {
      title: 'Football',
      description: 'Basic skills, rules, positions, and officiating.',
      order: 8,
      subtopics: ['Basic skills', 'Rules and regulations', 'Positions and team play', 'Officiating and safety']
    },
    {
      title: 'Basketball',
      description: 'Basic skills, rules, tactics, and officiating.',
      order: 9,
      subtopics: ['Basic skills', 'Rules and regulations', 'Team tactics', 'Officiating and safety']
    },
    {
      title: 'Volleyball',
      description: 'Basic skills, rules, formations, and officiating.',
      order: 10,
      subtopics: ['Basic skills', 'Rules and regulations', 'Team formations', 'Officiating and safety']
    },
    {
      title: 'Gymnastics',
      description: 'Meaning, floor activities, and balance.',
      order: 11,
      subtopics: ['Meaning and types', 'Basic floor activities', 'Balance and coordination', 'Safety precautions']
    },
    {
      title: 'Recreation and Leisure',
      description: 'Meaning, types, and leisure management.',
      order: 12,
      subtopics: ['Meaning and importance', 'Types of recreational activities', 'Leisure management', 'Community recreation']
    },
    // SSS 1 Third Term
    {
      title: 'Swimming',
      description: 'Importance, basic skills, and events.',
      order: 13,
      subtopics: ['Importance and safety', 'Basic swimming skills', 'Water safety', 'Swimming events']
    },
    {
      title: 'Dance and Rhythmic Activities',
      description: 'Traditional, modern, and creative movement.',
      order: 14,
      subtopics: ['Traditional and modern dance', 'Rhythm and movement', 'Creative movement', 'Cultural significance']
    },
    {
      title: 'Combative Sports',
      description: 'Meaning, basic skills, etiquette, and safety.',
      order: 15,
      subtopics: ['Meaning and types', 'Basic skills and etiquette', 'Safety rules', 'Examples of combative sports']
    },
    {
      title: 'Outdoor Recreation',
      description: 'Camping, hiking, and outdoor safety.',
      order: 16,
      subtopics: ['Camping', 'Hiking and walking activities', 'Outdoor safety', 'Environmental responsibility']
    },
    {
      title: 'Posture and Body Mechanics',
      description: 'Good posture, defects, and corrective exercises.',
      order: 17,
      subtopics: ['Good posture', 'Postural defects', 'Corrective exercises', 'Safe movement habits']
    },
    {
      title: 'Revision and Practical Assessment',
      description: 'Theory revision, fitness, and skill evaluation.',
      order: 18,
      subtopics: ['Theory revision', 'Fitness assessment', 'Skill demonstrations', 'Practical evaluation']
    },
    // SSS 2 First Term
    {
      title: 'Advanced Physical Fitness',
      description: 'Components, testing, and training principles.',
      order: 19,
      subtopics: ['Fitness components', 'Fitness testing', 'Training principles', 'Personal fitness programmes']
    },
    {
      title: 'Training Methods',
      description: 'Continuous, interval, fartlek, and circuit.',
      order: 20,
      subtopics: ['Continuous training', 'Interval training', 'Fartlek training', 'Circuit training']
    },
    {
      title: 'Athletics: Advanced Track Events',
      description: 'Sprints, hurdles, middle/long distance, relays.',
      order: 21,
      subtopics: ['Sprint techniques', 'Hurdles', 'Middle- and long-distance running', 'Relay techniques']
    },
    {
      title: 'Athletics: Advanced Field Events',
      description: 'Long jump, high jump, shot put techniques.',
      order: 22,
      subtopics: ['Long jump techniques', 'High jump techniques', 'Shot put techniques', 'Rules and officiating']
    },
    {
      title: 'Sports Injuries and First Aid',
      description: 'Common injuries, prevention, and immediate care.',
      order: 23,
      subtopics: ['Common sports injuries', 'Prevention', 'Immediate care', 'Return-to-activity principles']
    },
    {
      title: 'Nutrition for Physical Activity',
      description: 'Balanced diet, energy needs, and hydration.',
      order: 24,
      subtopics: ['Balanced diet', 'Energy needs', 'Hydration', 'Healthy eating for active students']
    },
    // SSS 2 Second Term
    {
      title: 'Football (Advanced)',
      description: 'Advanced skills, tactics, and officiating.',
      order: 25,
      subtopics: ['Advanced skills', 'Tactics and formations', 'Rules and officiating', 'Match organisation']
    },
    {
      title: 'Basketball (Advanced)',
      description: 'Advanced skills, attacking, and defensive tactics.',
      order: 26,
      subtopics: ['Advanced skills', 'Attacking and defensive tactics', 'Rules and officiating', 'Match organisation']
    },
    {
      title: 'Volleyball (Advanced)',
      description: 'Advanced skills, attacking, and defensive play.',
      order: 27,
      subtopics: ['Advanced skills', 'Attacking and defensive play', 'Rules and officiating', 'Match organisation']
    },
    {
      title: 'Handball',
      description: 'Basic skills, rules, tactics, and officiating.',
      order: 28,
      subtopics: ['Basic skills', 'Rules and regulations', 'Team tactics', 'Officiating']
    },
    {
      title: 'Table Tennis',
      description: 'Grip, stance, strokes, serving, and rules.',
      order: 29,
      subtopics: ['Grip and stance', 'Basic strokes', 'Serving and receiving', 'Rules and scoring']
    },
    {
      title: 'Badminton',
      description: 'Grip, stance, strokes, serving, and rules.',
      order: 30,
      subtopics: ['Grip and stance', 'Basic strokes', 'Serving and receiving', 'Rules and scoring']
    },
    // SSS 2 Third Term
    {
      title: 'Gymnastics (Advanced)',
      description: 'Floor exercises, vaulting, balance, flexibility.',
      order: 31,
      subtopics: ['Floor exercises', 'Vaulting basics', 'Balance and flexibility', 'Safety']
    },
    {
      title: 'Swimming and Water Safety',
      description: 'Strokes, rescue awareness, and competitions.',
      order: 32,
      subtopics: ['Swimming strokes', 'Water safety', 'Rescue awareness', 'Swimming competitions']
    },
    {
      title: 'Dance and Movement Education',
      description: 'Patterns, rhythm, traditional dances, choreography.',
      order: 33,
      subtopics: ['Movement patterns', 'Rhythm', 'Traditional dances', 'Creative choreography']
    },
    {
      title: 'Recreation and Adventure Activities',
      description: 'Camping, hiking, orienteering, and safety.',
      order: 34,
      subtopics: ['Camping', 'Hiking', 'Orienteering', 'Outdoor safety']
    },
    {
      title: 'Sports Organisation and Leadership',
      description: 'Leadership, officials, tournaments, and fair play.',
      order: 35,
      subtopics: ['Team leadership', 'Officials and duties', 'Tournament organisation', 'Fair play and sportsmanship']
    },
    {
      title: 'Revision and Practical Assessment (SSS 2)',
      description: 'Theory revision, skill assessment, fitness testing.',
      order: 36,
      subtopics: ['Theory revision', 'Skill assessment', 'Fitness testing', 'Practical examination practice']
    },
    // SSS 3 First Term
    {
      title: 'Comprehensive Physical Fitness',
      description: 'Assessment, training programmes, and goal setting.',
      order: 37,
      subtopics: ['Fitness assessment', 'Training programmes', 'Goal setting', 'Monitoring progress']
    },
    {
      title: 'Advanced Athletics',
      description: 'Track/field techniques, rules, and competition prep.',
      order: 38,
      subtopics: ['Track event techniques', 'Field event techniques', 'Rules and officiating', 'Competition preparation']
    },
    {
      title: 'Sports Training and Performance',
      description: 'Principles, skill acquisition, and evaluation.',
      order: 39,
      subtopics: ['Training principles', 'Skill acquisition', 'Tactical preparation', 'Performance evaluation']
    },
    {
      title: 'Sports Injuries and First Aid (Advanced)',
      description: 'Injury types, prevention, first aid procedures.',
      order: 40,
      subtopics: ['Injury types', 'Prevention strategies', 'First aid procedures', 'Emergency response']
    },
    {
      title: 'Sports Nutrition and Lifestyle',
      description: 'Performance nutrition, hydration, and recovery.',
      order: 41,
      subtopics: ['Nutrition for performance', 'Hydration', 'Rest and recovery', 'Healthy lifestyle']
    },
    {
      title: 'Sports Psychology',
      description: 'Motivation, concentration, confidence, and cohesion.',
      order: 42,
      subtopics: ['Motivation', 'Concentration', 'Confidence', 'Team cohesion']
    },
    // SSS 3 Second Term
    {
      title: 'Major Team Sports Revision',
      description: 'Football, basketball, volleyball, and handball.',
      order: 43,
      subtopics: ['Football', 'Basketball', 'Volleyball', 'Handball']
    },
    {
      title: 'Individual and Racket Sports',
      description: 'Table tennis, badminton, athletics, and swimming.',
      order: 44,
      subtopics: ['Table tennis', 'Badminton', 'Athletics', 'Swimming']
    },
    {
      title: 'Gymnastics and Rhythmic Activities',
      description: 'Floor routines, balance, flexibility, and movement.',
      order: 45,
      subtopics: ['Floor routines', 'Balance', 'Flexibility', 'Rhythmic movement']
    },
    {
      title: 'Recreation and Outdoor Activities',
      description: 'Camping, hiking, orienteering, and safety.',
      order: 46,
      subtopics: ['Camping', 'Hiking', 'Orienteering', 'Outdoor safety']
    },
    {
      title: 'Sports Administration and Officiating',
      description: 'Officials, rules, competition management, scoring.',
      order: 47,
      subtopics: ['Officials and responsibilities', 'Rules and regulations', 'Competition management', 'Records and scoring']
    },
    {
      title: 'Practical Project',
      description: 'Planning sports activities, fitness, and evaluation.',
      order: 48,
      subtopics: ['Planning a sports activity', 'Fitness programme', 'Skill demonstration', 'Evaluation']
    },
    // SSS 3 Third Term
    {
      title: 'Comprehensive Revision',
      description: 'Physical fitness, athletics, games, health/safety.',
      order: 49,
      subtopics: ['Physical fitness', 'Athletics', 'Games and sports', 'Health and safety']
    },
    {
      title: 'Practical Examination Preparation',
      description: 'Fitness tests, athletics, games, and gymnastics.',
      order: 50,
      subtopics: ['Fitness tests', 'Athletics practicals', 'Games skills', 'Gymnastics and other practical activities']
    },
    {
      title: 'Theory Examination Preparation',
      description: 'Definitions, concepts, rules, and training principles.',
      order: 51,
      subtopics: ['Definitions and concepts', 'Rules and regulations', 'Training principles', 'Health and safety']
    },
    {
      title: 'Past Questions and Examination Skills',
      description: 'Interpretation, techniques, time management, revision.',
      order: 52,
      subtopics: ['Question interpretation', 'Answering techniques', 'Time management', 'Revision strategies']
    },
    {
      title: 'WASSCE/NECO Examination Preparation',
      description: 'Final revision, practical/theory practice, readiness.',
      order: 53,
      subtopics: ['Final revision', 'Practical preparation', 'Theory practice', 'Examination readiness']
    }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting Physical Education seeding process...");
    
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [physicalSyllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${physicalSyllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [
        subjectId,
        physicalSyllabus.exam,
        physicalSyllabus.syllabus_year,
        physicalSyllabus.title,
        physicalSyllabus.description
      ]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${physicalSyllabus.title}`);

    const examsRes = await pool.query('SELECT id FROM exams WHERE is_active = TRUE');
    for (const exam of examsRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, exam.id]
      );
    }
    console.log(`Linked Syllabus to ${examsRes.rows.length} exams.`);

    for (const topic of physicalSyllabus.topics) {
      const topicSlug = slugify(topic.title);
      const tRes = await pool.query(
        `INSERT INTO topics (syllabus_id, title, slug, description, topic_order, is_active)
         VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
        [syllabusId, topic.title, topicSlug, topic.description, topic.order]
      );
      const topicId = tRes.rows[0].id;
      console.log(`  Created Topic: ${topic.title}`);

      let subOrder = 1;
      for (const subStr of topic.subtopics) {
        const subSlug = slugify(subStr) + '-' + Math.floor(Math.random() * 100000);
        const subRes = await pool.query(
          `INSERT INTO subtopics (topic_id, title, slug, description, subtopic_order, is_active)
           VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
          [topicId, subStr, subSlug, `Learn about ${subStr}`, subOrder]
        );
        const subtopicId = subRes.rows[0].id;

        for (let i = 1; i <= 2; i++) {
          const lessonTitle = `Lesson ${i}: ${subStr}`;
          const lessonSlug = slugify(lessonTitle) + '-' + Math.floor(Math.random() * 100000);
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
             VALUES ($1, $2, $3, $4, $5, $6, TRUE)`,
            [topicId, subtopicId, lessonTitle, lessonSlug, lessonContent, i]
          );
        }
        subOrder++;
      }
    }
    console.log("Physical Education Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
