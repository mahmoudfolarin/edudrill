require('dotenv').config();
const pool = require('./src/config/database');

const healthSyllabus = {
  exam: 'WAEC',
  subject: 'health-education', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Health Education Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Introduction to Health Education',
      description: 'Meaning, dimensions, and importance of health.',
      order: 1,
      subtopics: ['Meaning of health and Health Education', 'Dimensions of health', 'Importance of Health Education', 'Factors affecting health', 'Healthy lifestyle']
    },
    {
      title: 'Personal Health and Hygiene',
      description: 'Cleanliness, oral hygiene, and sanitation.',
      order: 2,
      subtopics: ['Personal cleanliness', 'Oral hygiene', 'Skin, hair and nail care', 'Menstrual hygiene', 'Hand washing and sanitation', 'Healthy habits']
    },
    {
      title: 'Nutrition and Healthy Living',
      description: 'Nutrients, balanced diet, and meal planning.',
      order: 3,
      subtopics: ['Nutrients', 'Balanced diet', 'Food groups', 'Meal planning', 'Malnutrition', 'Healthy eating habits']
    },
    {
      title: 'Growth and Development',
      description: 'Stages of human development and factors affecting growth.',
      order: 4,
      subtopics: ['Meaning of growth and development', 'Stages of human development', 'Physical development', 'Emotional and social development', 'Factors affecting growth']
    },
    {
      title: 'Environmental Health',
      description: 'Clean water, waste disposal, and pollution.',
      order: 5,
      subtopics: ['Meaning of environmental health', 'Clean water', 'Waste disposal', 'Environmental sanitation', 'Housing and ventilation', 'Pollution']
    },
    {
      title: 'School and Community Health',
      description: 'School health services and health promotion.',
      order: 6,
      subtopics: ['School health services', 'Healthy school environment', 'Community health', 'Health promotion', 'Roles of individuals and communities']
    },
    // SSS 1 Second Term
    {
      title: 'Communicable Diseases',
      description: 'Transmission, risk factors, and control.',
      order: 7,
      subtopics: ['Meaning and examples', 'Modes of transmission', 'Risk factors', 'Prevention and control', 'Personal and community responsibilities']
    },
    {
      title: 'Non-Communicable Diseases',
      description: 'Lifestyle diseases, risk factors, and prevention.',
      order: 8,
      subtopics: ['Meaning and examples', 'Risk factors', 'Lifestyle-related diseases', 'Prevention', 'Health screening']
    },
    {
      title: 'First Aid',
      description: 'Principles, first-aid box, and bleeding.',
      order: 9,
      subtopics: ['Meaning and importance', 'First-aid principles', 'First-aid box', 'Minor wounds', 'Bleeding', 'Burns and basic emergency response']
    },
    {
      title: 'Safety Education',
      description: 'Home, school, road, and water safety.',
      order: 10,
      subtopics: ['Home safety', 'School safety', 'Road safety', 'Water safety', 'Sports and recreational safety', 'Accident prevention']
    },
    {
      title: 'Mental and Emotional Health',
      description: 'Emotions, stress, and self-esteem.',
      order: 11,
      subtopics: ['Meaning of mental health', 'Emotions', 'Stress', 'Self-esteem', 'Coping skills', 'Seeking appropriate support']
    },
    {
      title: 'Physical Fitness and Recreation',
      description: 'Components of fitness and exercise principles.',
      order: 12,
      subtopics: ['Meaning of physical fitness', 'Components of fitness', 'Exercise principles', 'Recreation', 'Benefits of physical activity', 'Safety during exercise']
    },
    // SSS 1 Third Term
    {
      title: 'Human Body Systems',
      description: 'Skeletal, muscular, and digestive systems.',
      order: 13,
      subtopics: ['Skeletal system', 'Muscular system', 'Digestive system', 'Respiratory system', 'Circulatory system', 'Excretory system']
    },
    {
      title: 'Reproductive Health',
      description: 'Reproductive systems, puberty, and health decisions.',
      order: 14,
      subtopics: ['Male and female reproductive systems', 'Puberty', 'Personal hygiene', 'Responsible health decisions', 'Health services and support']
    },
    {
      title: 'Substance Use and Abuse',
      description: 'Misused substances, risk factors, and prevention.',
      order: 15,
      subtopics: ['Meaning of substance use', 'Commonly misused substances', 'Effects on health', 'Risk factors', 'Prevention and refusal skills']
    },
    {
      title: 'Consumer Health',
      description: 'Health information, medicine safety, and labels.',
      order: 16,
      subtopics: ['Health information', 'Medicine safety', 'Health products and services', 'Reading labels', 'Avoiding fraudulent health claims']
    },
    {
      title: 'Health Services',
      description: 'Primary care, facilities, and immunization.',
      order: 17,
      subtopics: ['Primary health care', 'Health facilities', 'Health workers', 'Immunization', 'Health records', 'Referral services']
    },
    {
      title: 'Revision and Practical Activities',
      description: 'Health projects, first-aid practice, and campaigns.',
      order: 18,
      subtopics: ['Health projects', 'First-aid practice', 'Hygiene demonstrations', 'Health education campaigns', 'Revision']
    },
    // SSS 2 First Term
    {
      title: 'Advanced Nutrition',
      description: 'Nutrient functions, energy requirements, and deficiency.',
      order: 19,
      subtopics: ['Nutrient functions', 'Energy requirements', 'Balanced meal planning', 'Deficiency disorders', 'Overnutrition', 'Nutrition education']
    },
    {
      title: 'Communicable Disease Control',
      description: 'Infection, immunity, and prevention strategies.',
      order: 20,
      subtopics: ['Infection and immunity', 'Modes of transmission', 'Prevention strategies', 'Immunization', 'Community disease control']
    },
    {
      title: 'Body Systems and Their Functions',
      description: 'Nervous, endocrine, and respiratory systems.',
      order: 21,
      subtopics: ['Nervous system', 'Endocrine system', 'Respiratory system', 'Circulatory system', 'Digestive system', 'Reproductive system']
    },
    {
      title: 'First Aid and Emergency Care',
      description: 'Shock, fractures, fainting, and choking.',
      order: 22,
      subtopics: ['Assessment of emergencies', 'Shock', 'Fractures and sprains', 'Fainting', 'Choking awareness', 'Emergency response']
    },
    {
      title: 'Safety and Accident Prevention',
      description: 'Occupational, road, and fire safety.',
      order: 23,
      subtopics: ['Occupational safety', 'Road traffic safety', 'Fire safety', 'Water safety', 'Disaster awareness', 'Risk reduction']
    },
    {
      title: 'Practical Health Education',
      description: 'Health observation, first-aid, and fitness activities.',
      order: 24,
      subtopics: ['Health observation', 'First-aid demonstrations', 'Fitness activities', 'Health surveys', 'Health promotion projects']
    },
    // SSS 2 Second Term
    {
      title: 'Reproductive and Sexual Health Education',
      description: 'Puberty, STIs prevention, and healthy boundaries.',
      order: 25,
      subtopics: ['Puberty and adolescence', 'Reproductive health', 'Personal responsibility', 'Prevention of sexually transmitted infections', 'Health-seeking behaviour', 'Respect and healthy boundaries']
    },
    {
      title: 'Sexually Transmitted Infections',
      description: 'Transmission, symptoms, prevention, and treatment.',
      order: 26,
      subtopics: ['Meaning and examples', 'Transmission', 'Symptoms and complications', 'Prevention', 'Testing and treatment awareness', 'Reducing stigma']
    },
    {
      title: 'Family Life and Relationships',
      description: 'Family types, healthy relationships, and conflict resolution.',
      order: 27,
      subtopics: ['Family types', 'Healthy relationships', 'Communication', 'Conflict resolution', 'Responsibilities', 'Support systems']
    },
    {
      title: 'Mental Health and Well-being',
      description: 'Stress management, anxiety, and resilience.',
      order: 28,
      subtopics: ['Stress management', 'Anxiety awareness', 'Emotional regulation', 'Peer pressure', 'Resilience', 'Seeking professional support']
    },
    {
      title: 'Substance Abuse and Addiction',
      description: 'Risk factors, dependence, and rehabilitation.',
      order: 29,
      subtopics: ['Risk factors', 'Effects of substance misuse', 'Dependence and addiction', 'Peer influence', 'Prevention', 'Help and rehabilitation']
    },
    {
      title: 'Health Promotion',
      description: 'Campaigns, peer education, and community participation.',
      order: 30,
      subtopics: ['Health campaigns', 'Peer education', 'Community participation', 'Health communication', 'Planning health activities']
    },
    // SSS 2 Third Term
    {
      title: 'Community Health',
      description: 'Needs, primary care, and maternal health.',
      order: 31,
      subtopics: ['Community health needs', 'Primary health care', 'Maternal and child health', 'Disease prevention', 'Health education', 'Community participation']
    },
    {
      title: 'Environmental Health (SSS 2)',
      description: 'Water sanitation, waste management, and pollution.',
      order: 32,
      subtopics: ['Water sanitation', 'Waste management', 'Food hygiene', 'Air pollution', 'Noise pollution', 'Environmental conservation']
    },
    {
      title: 'School Health Programme',
      description: 'Health services, appraisal, nutrition, and safety.',
      order: 33,
      subtopics: ['School health services', 'Health appraisal', 'School nutrition', 'Safety', 'Health counselling', 'Emergency preparedness']
    },
    {
      title: 'Non-Communicable Diseases (SSS 2)',
      description: 'Cardiovascular, diabetes, cancer, and obesity.',
      order: 34,
      subtopics: ['Cardiovascular diseases', 'Diabetes', 'Cancer awareness', 'Obesity', 'Risk factors', 'Prevention and screening']
    },
    {
      title: 'Health Information and Consumer Protection',
      description: 'Reliable information, medicine safety, and consumer rights.',
      order: 35,
      subtopics: ['Reliable health information', 'Medicine safety', 'Health advertising', 'Consumer rights', 'Digital health information']
    },
    {
      title: 'Revision and Practical Assessment',
      description: 'First aid, health projects, and case studies.',
      order: 36,
      subtopics: ['First aid', 'Health projects', 'Fitness assessment', 'Case studies', 'Revision']
    },
    // SSS 3 First Term
    {
      title: 'Public Health',
      description: 'Principles, epidemiology basics, and disease surveillance.',
      order: 37,
      subtopics: ['Meaning and principles', 'Public health services', 'Epidemiology basics', 'Disease surveillance', 'Health promotion', 'Community participation']
    },
    {
      title: 'Epidemiology of Disease',
      description: 'Disease occurrence, risk factors, and transmission.',
      order: 38,
      subtopics: ['Disease occurrence', 'Risk factors', 'Transmission chains', 'Outbreak control', 'Prevention strategies', 'Health data']
    },
    {
      title: 'Maternal, Child and Adolescent Health',
      description: 'Antenatal care, child growth, and immunization.',
      order: 39,
      subtopics: ['Antenatal care awareness', 'Child growth and development', 'Immunization', 'Adolescent health', 'Nutrition', 'Health services']
    },
    {
      title: 'Reproductive Health and Responsible Behaviour',
      description: 'Anatomy, STI prevention, and healthy relationships.',
      order: 40,
      subtopics: ['Reproductive anatomy and health', 'STI prevention', 'Healthy relationships', 'Responsible decision-making', 'Health-seeking behaviour']
    },
    {
      title: 'Mental and Social Health',
      description: 'Well-being, stress, social support, and resilience.',
      order: 41,
      subtopics: ['Mental well-being', 'Stress and coping', 'Social support', 'Peer pressure', 'Resilience', 'Professional help']
    },
    {
      title: 'First Aid and Emergency Preparedness',
      description: 'Emergency assessment, basic first aid, and bleeding.',
      order: 42,
      subtopics: ['Emergency assessment', 'Basic first aid', 'Injuries', 'Burns', 'Bleeding', 'Emergency planning']
    },
    // SSS 3 Second Term
    {
      title: 'Health and the Environment',
      description: 'Hazards, climate, pollution, and disaster reduction.',
      order: 43,
      subtopics: ['Environmental hazards', 'Climate and health', 'Pollution', 'Water and sanitation', 'Waste management', 'Disaster risk reduction']
    },
    {
      title: 'Occupational and Road Safety',
      description: 'Workplace hazards, protective practices, and traffic.',
      order: 44,
      subtopics: ['Workplace hazards', 'Protective practices', 'Road-user safety', 'Traffic accidents', 'Prevention strategies']
    },
    {
      title: 'Lifestyle and Non-Communicable Diseases',
      description: 'Inactivity, unhealthy diet, and cancer prevention.',
      order: 45,
      subtopics: ['Physical inactivity', 'Unhealthy diet', 'Tobacco and other harmful substances', 'Cardiovascular disease', 'Diabetes', 'Cancer prevention']
    },
    {
      title: 'Substance Misuse Prevention',
      description: 'Consequences, addiction awareness, and rehabilitation.',
      order: 46,
      subtopics: ['Substance categories', 'Health and social consequences', 'Addiction awareness', 'Prevention programmes', 'Treatment and rehabilitation']
    },
    {
      title: 'Health Education and Communication',
      description: 'Health messages, peer education, and media.',
      order: 47,
      subtopics: ['Health messages', 'Peer education', 'Campaign planning', 'Media and health', 'Evaluating health information']
    },
    {
      title: 'Health Research and Projects',
      description: 'Identifying problems, questionnaires, and data collection.',
      order: 48,
      subtopics: ['Identifying a health problem', 'Questionnaires', 'Data collection', 'Data presentation', 'Interpretation', 'Project reporting']
    },
    // SSS 3 Third Term
    {
      title: 'Comprehensive Revision',
      description: 'Personal health, nutrition, disease, and first aid.',
      order: 49,
      subtopics: ['Personal health', 'Nutrition', 'Disease prevention', 'First aid', 'Mental health', 'Community health']
    },
    {
      title: 'Practical Examination Preparation',
      description: 'First-aid procedures, health demonstrations, and fitness.',
      order: 50,
      subtopics: ['First-aid procedures', 'Health demonstrations', 'Fitness activities', 'Health projects', 'Data interpretation']
    },
    {
      title: 'Health Data and Statistics',
      description: 'Tables, charts, rates, and health indicators.',
      order: 51,
      subtopics: ['Tables', 'Charts', 'Rates and percentages', 'Health indicators', 'Interpreting health data']
    },
    {
      title: 'Past Questions and Examination Skills',
      description: 'Objective, theory, and case studies.',
      order: 52,
      subtopics: ['Objective questions', 'Theory questions', 'Case studies', 'Answering techniques', 'Common errors']
    },
    {
      title: 'WASSCE/NECO Examination Preparation',
      description: 'Mock examination, practical and final revision.',
      order: 53,
      subtopics: ['Mock examination', 'Practical revision', 'Final topic revision', 'Examination readiness']
    }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting Health Education seeding process...");
    
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [healthSyllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${healthSyllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [
        subjectId,
        healthSyllabus.exam,
        healthSyllabus.syllabus_year,
        healthSyllabus.title,
        healthSyllabus.description
      ]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${healthSyllabus.title}`);

    const examsRes = await pool.query('SELECT id FROM exams WHERE is_active = TRUE');
    for (const exam of examsRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, exam.id]
      );
    }
    console.log(`Linked Syllabus to ${examsRes.rows.length} exams.`);

    for (const topic of healthSyllabus.topics) {
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
    console.log("Health Education Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
