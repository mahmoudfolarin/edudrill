require('dotenv').config();
const pool = require('./src/config/database');

const agricSyllabus = {
  exam: 'WAEC',
  subject: 'agricultural-science', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Agricultural Science Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Introduction to Agriculture',
      description: 'Meaning, scope, and importance of agriculture.',
      order: 1,
      subtopics: ['Meaning and scope of agriculture', 'Importance of agriculture', 'Branches of agriculture', 'Agriculture and national development', 'Problems of agricultural development', 'Career opportunities in agriculture']
    },
    {
      title: 'Agricultural Ecology',
      description: 'Ecology, ecosystem components, and energy flow.',
      order: 2,
      subtopics: ['Meaning of ecology', 'Ecosystem components', 'Biotic and abiotic factors', 'Food chains and food webs', 'Energy flow', 'Ecological balance']
    },
    {
      title: 'Factors Affecting Agricultural Production',
      description: 'Climate, soil, topography, and government policies.',
      order: 3,
      subtopics: ['Climate', 'Soil', 'Biotic factors', 'Topography', 'Labour and capital', 'Technology', 'Government policies and markets']
    },
    {
      title: 'Soil Science',
      description: 'Meaning, formation, and properties of soil.',
      order: 4,
      subtopics: ['Meaning and importance of soil', 'Soil formation', 'Soil profile and horizons', 'Physical properties of soil', 'Chemical properties', 'Biological properties']
    },
    {
      title: 'Soil Types and Properties',
      description: 'Sandy, clay, and loamy soils.',
      order: 5,
      subtopics: ['Sandy soil', 'Clay soil', 'Loamy soil', 'Soil texture and structure', 'Porosity and permeability', 'Water-holding capacity']
    },
    {
      title: 'Soil Sampling and Testing',
      description: 'Methods of soil sampling and field tests.',
      order: 6,
      subtopics: ['Methods of soil sampling', 'Simple field tests', 'Soil pH', 'Nutrients and fertility', 'Interpretation of results']
    },
    // SSS 1 Second Term
    {
      title: 'Farm Tools and Machinery',
      description: 'Identification, uses, and maintenance of farm tools.',
      order: 7,
      subtopics: ['Identification of common farm tools', 'Uses and maintenance', 'Farm machinery', 'Tractors and implements', 'Safety precautions']
    },
    {
      title: 'Farm Surveying and Measurement',
      description: 'Linear and area measurement.',
      order: 8,
      subtopics: ['Meaning of farm surveying', 'Linear measurement', 'Area measurement', 'Farm layout', 'Simple farm structures and maps']
    },
    {
      title: 'Soil Fertility and Conservation',
      description: 'Plant nutrients, manure, and fertilizers.',
      order: 9,
      subtopics: ['Plant nutrients', 'Macro and micronutrients', 'Organic manure', 'Inorganic fertilizers', 'Nutrient deficiency symptoms', 'Soil erosion', 'Erosion control']
    },
    {
      title: 'Crop Production',
      description: 'Classification, planting methods, and harvesting.',
      order: 10,
      subtopics: ['Classification of crops', 'Land preparation', 'Seed selection', 'Planting methods', 'Spacing', 'Crop maintenance', 'Harvesting and storage']
    },
    {
      title: 'Crop Pests and Diseases',
      description: 'Meaning, types, symptoms, and control.',
      order: 11,
      subtopics: ['Meaning of pests', 'Types of crop pests', 'Pest damage', 'Disease-causing organisms', 'Symptoms', 'Prevention and control']
    },
    // SSS 1 Third Term
    {
      title: 'Crop Improvement and Propagation',
      description: 'Seed selection and vegetative propagation.',
      order: 12,
      subtopics: ['Seed selection', 'Seed viability', 'Vegetative propagation', 'Cuttings', 'Layering', 'Grafting and budding']
    },
    {
      title: 'Weeds and Weed Control',
      description: 'Meaning, types, and effects of weeds.',
      order: 13,
      subtopics: ['Meaning and characteristics', 'Types of weeds', 'Effects on crops', 'Identification', 'Mechanical, cultural and chemical control']
    },
    {
      title: 'Farm Records',
      description: 'Importance, types, and simple farm accounts.',
      order: 14,
      subtopics: ['Importance of farm records', 'Types of records', 'Farm inventory', 'Production records', 'Income and expenditure', 'Simple farm accounts']
    },
    {
      title: 'Practical Agriculture',
      description: 'Identification of soil, tools, seeds, and crops.',
      order: 15,
      subtopics: ['Soil identification', 'Farm tool identification', 'Seed and crop identification', 'Field operations', 'Simple farm measurements', 'Record keeping']
    },
    // SSS 2 First Term
    {
      title: 'Crop Production Systems',
      description: 'Arable, plantation, mixed, and organic farming.',
      order: 16,
      subtopics: ['Arable farming', 'Plantation agriculture', 'Mixed farming', 'Subsistence and commercial farming', 'Organic agriculture', 'Sustainable agriculture']
    },
    {
      title: 'Major Food Crops',
      description: 'Cereals, legumes, roots, and tubers.',
      order: 17,
      subtopics: ['Cereals', 'Legumes', 'Roots and tubers', 'Vegetables', 'Oil crops', 'Production requirements and uses']
    },
    {
      title: 'Major Cash and Industrial Crops',
      description: 'Cocoa, coffee, cotton, oil palm, and rubber.',
      order: 18,
      subtopics: ['Cocoa', 'Coffee', 'Cotton', 'Oil palm', 'Rubber', 'Groundnut and other industrial crops', 'Processing and uses']
    },
    {
      title: 'Horticulture',
      description: 'Vegetable, fruit, and ornamental plant production.',
      order: 19,
      subtopics: ['Vegetable production', 'Fruit production', 'Nursery management', 'Ornamental plants', 'Greenhouse basics']
    },
    {
      title: 'Pasture and Forage Crops',
      description: 'Meaning, types, and management of pastures.',
      order: 20,
      subtopics: ['Meaning of pasture', 'Types of pasture', 'Pasture establishment', 'Pasture management', 'Forage conservation']
    },
    // SSS 2 Second Term
    {
      title: 'Farm Animals and Livestock Production',
      description: 'Classification and types of farm animals.',
      order: 21,
      subtopics: ['Classification of farm animals', 'Cattle', 'Sheep', 'Goats', 'Pigs', 'Poultry', 'Rabbits']
    },
    {
      title: 'Animal Nutrition',
      description: 'Nutrients, feed classes, and balanced rations.',
      order: 22,
      subtopics: ['Nutrients', 'Feed classes', 'Balanced ration', 'Feed ingredients', 'Deficiency symptoms', 'Feed formulation']
    },
    {
      title: 'Animal Reproduction',
      description: 'Reproductive systems, mating, and fertilization.',
      order: 23,
      subtopics: ['Male and female reproductive systems', 'Puberty', 'Oestrus', 'Mating', 'Fertilization', 'Pregnancy', 'Parturition', 'Artificial insemination']
    },
    {
      title: 'Animal Health',
      description: 'Livestock diseases, prevention, and biosecurity.',
      order: 24,
      subtopics: ['Common livestock diseases', 'Disease-causing agents', 'Signs and symptoms', 'Prevention', 'Vaccination', 'Parasite control', 'Biosecurity']
    },
    {
      title: 'Livestock Management',
      description: 'Housing, breeding, feeding, and sanitation.',
      order: 25,
      subtopics: ['Housing', 'Breeding', 'Feeding', 'Watering', 'Sanitation', 'Record keeping', 'Handling and welfare']
    },
    // SSS 2 Third Term
    {
      title: 'Poultry Production',
      description: 'Types, breeds, housing, and disease control.',
      order: 26,
      subtopics: ['Types of poultry', 'Breeds', 'Housing systems', 'Brooding', 'Feeding', 'Disease control', 'Egg production']
    },
    {
      title: 'Fishery',
      description: 'Fish species, pond construction, and stocking.',
      order: 27,
      subtopics: ['Meaning and importance', 'Fish species', 'Fish pond types', 'Pond construction', 'Stocking', 'Feeding', 'Harvesting', 'Fish preservation']
    },
    {
      title: 'Apiculture',
      description: 'Beekeeping, colony organization, and honey production.',
      order: 28,
      subtopics: ['Meaning of beekeeping', 'Honey bees and colony organization', 'Hive types', 'Apiary management', 'Honey and wax production', 'Safety']
    },
    {
      title: 'Farm Business Management',
      description: 'Farm planning, budgeting, and profit and loss.',
      order: 29,
      subtopics: ['Farm planning', 'Farm budgeting', 'Cost concepts', 'Profit and loss', 'Marketing channels', 'Farm finance']
    },
    {
      title: 'Agricultural Cooperatives',
      description: 'Meaning, types, functions, and cooperative principles.',
      order: 30,
      subtopics: ['Meaning and types', 'Functions', 'Benefits', 'Cooperative principles', 'Problems and management']
    },
    // SSS 3 First Term
    {
      title: 'Agricultural Economics',
      description: 'Factors of production, demand, supply, and pricing.',
      order: 31,
      subtopics: ['Meaning and scope', 'Factors of production', 'Opportunity cost', 'Demand and supply', 'Market structures', 'Pricing', 'Agricultural marketing']
    },
    {
      title: 'Farm Management',
      description: 'Farm planning, budgeting, and resource allocation.',
      order: 32,
      subtopics: ['Farm planning', 'Enterprise selection', 'Farm budgeting', 'Resource allocation', 'Risk and uncertainty', 'Farm efficiency']
    },
    {
      title: 'Agricultural Finance',
      description: 'Sources of farm capital, credit, and loans.',
      order: 33,
      subtopics: ['Sources of farm capital', 'Credit institutions', 'Loans', 'Interest', 'Savings', 'Insurance', 'Credit management']
    },
    {
      title: 'Agricultural Marketing',
      description: 'Marketing functions, channels, and price determination.',
      order: 34,
      subtopics: ['Marketing functions', 'Channels', 'Market information', 'Price determination', 'Storage', 'Transportation', 'Processing and value addition']
    },
    {
      title: 'Agricultural Extension',
      description: 'Meaning, objectives, and extension methods.',
      order: 35,
      subtopics: ['Meaning and objectives', 'Extension principles', 'Extension methods', 'Communication', 'Adoption of innovations', 'Role of extension agents']
    },
    // SSS 3 Second Term
    {
      title: 'Agricultural Policy and Development',
      description: 'Agricultural policies, land tenure, and food security.',
      order: 36,
      subtopics: ['Agricultural policies', 'Government programmes', 'Land tenure', 'Cooperative development', 'Rural development', 'Food security']
    },
    {
      title: 'Natural Resources and Conservation',
      description: 'Forest, water, wildlife, and soil conservation.',
      order: 37,
      subtopics: ['Forest resources', 'Water resources', 'Wildlife', 'Soil conservation', 'Environmental pollution', 'Sustainable resource management']
    },
    {
      title: 'Advanced Crop Production',
      description: 'Crop rotation, intercropping, and irrigation.',
      order: 38,
      subtopics: ['Crop rotation', 'Intercropping', 'Irrigation', 'Drainage', 'Mechanization', 'Post-harvest handling', 'Storage and processing']
    },
    {
      title: 'Advanced Livestock Production',
      description: 'Breeding systems, selection, and crossbreeding.',
      order: 39,
      subtopics: ['Breeding systems', 'Selection', 'Crossbreeding', 'Ration formulation', 'Housing systems', 'Disease prevention', 'Production records']
    },
    {
      title: 'Practical Agriculture (Revision)',
      description: 'Identification of crops, seeds, livestock, and tools.',
      order: 40,
      subtopics: ['Identification of crops and seeds', 'Identification of livestock breeds', 'Farm tools and machinery', 'Feeds and feed ingredients', 'Fertilizers and soil materials', 'Pests and diseases', 'Farm records and calculations']
    },
    // SSS 3 Third Term
    {
      title: 'Agricultural Science Examination Revision',
      description: 'Revision of crop production, animal production, and ecology.',
      order: 41,
      subtopics: ['Crop production revision', 'Animal production revision', 'Soil science revision', 'Farm management revision', 'Agricultural economics revision', 'Ecology and conservation revision']
    },
    {
      title: 'Practical Examination Preparation',
      description: 'Specimen identification and farm records.',
      order: 42,
      subtopics: ['Specimen identification', 'Farm tools', 'Seeds and fruits', 'Animal parts and products', 'Feeds', 'Fertilizers and soil samples', 'Farm records and calculations']
    },
    {
      title: 'WASSCE/NECO Practice',
      description: 'Objective, theory, and practical questions.',
      order: 43,
      subtopics: ['Objective questions', 'Theory questions', 'Practical questions', 'Past questions by topic', 'Timed mock examinations', 'Correction and remediation']
    }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting Agricultural Science seeding process...");
    
    // Get subject_id
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [agricSyllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${agricSyllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    // Check if syllabus already exists for this subject, delete if so (for idempotency)
    // We already wiped earlier, but just in case.
    
    // Create Syllabus
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [
        subjectId,
        agricSyllabus.exam,
        agricSyllabus.syllabus_year,
        agricSyllabus.title,
        agricSyllabus.description
      ]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${agricSyllabus.title}`);

    // Link syllabus to all active exams
    const examsRes = await pool.query('SELECT id FROM exams WHERE is_active = TRUE');
    for (const exam of examsRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, exam.id]
      );
    }
    console.log(`Linked Syllabus to ${examsRes.rows.length} exams.`);

    for (const topic of agricSyllabus.topics) {
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

        // Generate 2 lessons per subtopic
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

    console.log("Agricultural Science Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
