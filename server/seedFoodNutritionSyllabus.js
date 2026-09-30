require('dotenv').config();
const pool = require('./src/config/database');

const foodSyllabus = {
  exam: 'WAEC',
  subject: 'foods-and-nutrition', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Food and Nutrition Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Introduction to Food and Nutrition',
      description: 'Meaning of food, nutrition, and nutrients.',
      order: 1,
      subtopics: ['Meaning of food, nutrition and nutrients', 'Importance and functions of food', 'Factors affecting food choices']
    },
    {
      title: 'Nutrients',
      description: 'Carbohydrates, proteins, fats, vitamins, minerals.',
      order: 2,
      subtopics: ['Carbohydrates', 'Proteins', 'Fats and oils', 'Vitamins', 'Minerals', 'Water', 'Food sources and functions']
    },
    {
      title: 'Balanced Diet',
      description: 'Food groups and meal planning principles.',
      order: 3,
      subtopics: ['Meaning and food groups', 'Meal planning principles', 'Nutritional requirements at different life stages']
    },
    {
      title: 'Digestion and Utilization of Food',
      description: 'Digestive system, absorption, and assimilation.',
      order: 4,
      subtopics: ['Digestive system', 'Digestion of nutrients', 'Absorption and assimilation', 'Dietary fibre']
    },
    {
      title: 'Kitchen and Food Safety',
      description: 'Hygiene, food poisoning, and safe storage.',
      order: 5,
      subtopics: ['Kitchen hygiene', 'Personal hygiene', 'Food contamination and poisoning', 'Safe storage and handling', 'Kitchen safety']
    },
    {
      title: 'Basic Cookery Equipment',
      description: 'Types, uses, care, and maintenance of equipment.',
      order: 6,
      subtopics: ['Types and uses', 'Care and maintenance', 'Safety precautions', 'Basic practical skills']
    },
    // SSS 1 Second Term
    {
      title: 'Methods of Cooking',
      description: 'Moist heat, dry heat, frying, and combination methods.',
      order: 7,
      subtopics: ['Moist heat', 'Dry heat', 'Frying', 'Combination methods', 'Advantages and disadvantages']
    },
    {
      title: 'Cereals and Cereal Products',
      description: 'Types, nutritional value, and cooking of cereals.',
      order: 8,
      subtopics: ['Types', 'Nutritional value', 'Selection and storage', 'Preparation and cooking', 'Uses']
    },
    {
      title: 'Roots, Tubers and Plantain',
      description: 'Types, nutritional value, and preparation of roots.',
      order: 9,
      subtopics: ['Types', 'Nutritional value', 'Selection and storage', 'Preparation and cooking']
    },
    {
      title: 'Legumes and Pulses',
      description: 'Beans, peas, nutritional value, and cooking methods.',
      order: 10,
      subtopics: ['Beans, peas and related foods', 'Nutritional value', 'Selection and preparation', 'Cooking methods']
    },
    {
      title: 'Vegetables and Fruits',
      description: 'Classification, preparation, and preservation of vegetables.',
      order: 11,
      subtopics: ['Classification', 'Nutritional value', 'Selection and storage', 'Preparation', 'Preservation and nutrient loss']
    },
    {
      title: 'Practical Cookery (SSS 1 Second Term)',
      description: 'Measuring, preparation, and simple dishes.',
      order: 12,
      subtopics: ['Measuring', 'Food preparation', 'Simple dishes', 'Kitchen organization', 'Evaluation']
    },
    // SSS 1 Third Term
    {
      title: 'Meat, Poultry and Game',
      description: 'Classification, nutritional value, and cooking of meat.',
      order: 13,
      subtopics: ['Classification', 'Nutritional value', 'Selection and storage', 'Preparation and cooking', 'Food safety']
    },
    {
      title: 'Fish and Shellfish',
      description: 'Types, selection, and preservation of fish.',
      order: 14,
      subtopics: ['Types', 'Nutritional value', 'Freshness and selection', 'Preparation and cooking', 'Storage and preservation']
    },
    {
      title: 'Eggs',
      description: 'Structure, nutritional value, and uses of eggs.',
      order: 15,
      subtopics: ['Structure', 'Nutritional value', 'Selection and storage', 'Cooking methods', 'Uses in cookery']
    },
    {
      title: 'Milk and Milk Products',
      description: 'Composition, types, and cookery uses of milk.',
      order: 16,
      subtopics: ['Composition and value', 'Types', 'Milk products', 'Storage and preservation', 'Cookery uses']
    },
    {
      title: 'Beverages',
      description: 'Types, preparation, and service of beverages.',
      order: 17,
      subtopics: ['Types', 'Nutritional considerations', 'Preparation and service', 'Hot and cold beverages', 'Hygiene']
    },
    {
      title: 'Practical Cookery and Revision (SSS 1)',
      description: 'Menu planning, simple meals, and table setting.',
      order: 18,
      subtopics: ['Menu planning', 'Simple meals', 'Table setting', 'Practical assessment', 'Revision']
    },
    // SSS 2 First Term
    {
      title: 'Meal Planning',
      description: 'Principles, dietary needs, and menu writing.',
      order: 19,
      subtopics: ['Principles', 'Factors affecting meal planning', 'Meals for age groups', 'Special dietary needs', 'Menu writing']
    },
    {
      title: 'Food Preservation',
      description: 'Drying, smoking, freezing, and canning.',
      order: 20,
      subtopics: ['Importance', 'Drying', 'Smoking', 'Salting and curing', 'Refrigeration and freezing', 'Canning and bottling']
    },
    {
      title: 'Food Storage',
      description: 'Perishable foods, equipment, and stock management.',
      order: 21,
      subtopics: ['Perishable and non-perishable foods', 'Storage equipment', 'Preventing spoilage and infestation', 'Stock management']
    },
    {
      title: 'Flour Mixtures',
      description: 'Types of flour, pastry, cakes, and yeast mixtures.',
      order: 22,
      subtopics: ['Types of flour', 'Functions of ingredients', 'Pastry', 'Cakes', 'Bread and yeast mixtures', 'Practical preparation']
    },
    {
      title: 'Starchy Foods and Snacks',
      description: 'Cereal dishes, pasta, noodles, and finger foods.',
      order: 23,
      subtopics: ['Cereal dishes', 'Pasta and noodles', 'Snacks and finger foods', 'Nutritional considerations']
    },
    {
      title: 'Practical Cookery (SSS 2 First Term)',
      description: 'Menu planning, presentation, and kitchen management.',
      order: 24,
      subtopics: ['Menu planning', 'Preparation', 'Cooking techniques', 'Presentation', 'Kitchen management']
    },
    // SSS 2 Second Term
    {
      title: 'Sauces, Soups and Gravies',
      description: 'Types of sauces, thickening agents, and gravies.',
      order: 25,
      subtopics: ['Types of sauces', 'Thickening agents', 'Soup classification', 'Gravy preparation', 'Nutritional and sensory qualities']
    },
    {
      title: 'Salads',
      description: 'Types of salads, dressings, and presentation.',
      order: 26,
      subtopics: ['Types', 'Ingredients and dressings', 'Preparation and presentation', 'Nutritional value', 'Food safety']
    },
    {
      title: 'Sandwiches and Light Meals',
      description: 'Types of sandwiches, fillings, and nutritional balance.',
      order: 27,
      subtopics: ['Types', 'Fillings and spreads', 'Preparation', 'Presentation', 'Nutritional balance']
    },
    {
      title: 'Confectionery',
      description: 'Biscuits, pastries, cakes, and icings.',
      order: 28,
      subtopics: ['Biscuits', 'Pastries', 'Cakes', 'Icings and decorations', 'Practical production']
    },
    {
      title: 'Food Service and Table Setting',
      description: 'Types of service, appointments, and table manners.',
      order: 29,
      subtopics: ['Types of service', 'Table appointments', 'Formal and informal setting', 'Serving procedures', 'Table manners']
    },
    {
      title: 'Practical Food Production (SSS 2)',
      description: 'Planning, ingredient costing, and presentation.',
      order: 30,
      subtopics: ['Planning', 'Ingredient costing', 'Preparation', 'Presentation', 'Evaluation']
    },
    // SSS 2 Third Term
    {
      title: 'Nutrition and Health',
      description: 'Malnutrition, deficiency diseases, and obesity.',
      order: 31,
      subtopics: ['Malnutrition', 'Under- and over-nutrition', 'Deficiency diseases', 'Obesity and lifestyle factors', 'Prevention through diet']
    },
    {
      title: 'Therapeutic and Special Diets',
      description: 'Soft, liquid, low-salt, and high-protein diets.',
      order: 32,
      subtopics: ['Meaning', 'Soft and liquid diets', 'Low-salt and low-sugar diets', 'High-protein and high-fibre diets', 'Dietary adjustments']
    },
    {
      title: 'Food Additives',
      description: 'Natural and artificial additives, food labels.',
      order: 33,
      subtopics: ['Meaning and examples', 'Uses', 'Natural and artificial additives', 'Benefits and potential risks', 'Food labels']
    },
    {
      title: 'Food Spoilage and Preservation',
      description: 'Causes of spoilage, microorganisms, and enzymes.',
      order: 34,
      subtopics: ['Causes', 'Microorganisms and enzymes', 'Signs of spoilage', 'Preservation', 'Safe handling']
    },
    {
      title: 'Consumer Education',
      description: 'Food standards, wise purchasing, and consumer rights.',
      order: 35,
      subtopics: ['Food labels', 'Food standards', 'Quality and quantity', 'Wise purchasing', 'Consumer rights']
    },
    {
      title: 'Practical Cookery and Revision (SSS 2)',
      description: 'Meal production, costing, and presentation.',
      order: 36,
      subtopics: ['Meal production', 'Practical assessment', 'Presentation', 'Costing', 'Revision']
    },
    // SSS 3 First Term
    {
      title: 'Advanced Meal Planning',
      description: 'Budgeting, menu modification, and special occasions.',
      order: 37,
      subtopics: ['Individual and family meals', 'Budgeting', 'Nutritional adequacy', 'Menu modification', 'Special occasions']
    },
    {
      title: 'Family and Community Nutrition',
      description: 'Nutrition education, food security, and food habits.',
      order: 38,
      subtopics: ['Nutrition education', 'Family food habits', 'Community nutrition problems', 'Food security', 'Improving nutrition']
    },
    {
      title: 'Food Commodities and Quality',
      description: 'Quality characteristics, selection, and food standards.',
      order: 39,
      subtopics: ['Quality characteristics', 'Selection', 'Food standards', 'Quality control', 'Consumer information']
    },
    {
      title: 'Food Science and Functional Properties',
      description: 'Heat effects, emulsions, gelatinization, and aeration.',
      order: 40,
      subtopics: ['Heat effects on nutrients', 'Changes in carbohydrates, proteins and fats', 'Emulsions', 'Gelatinization', 'Foaming and aeration']
    },
    {
      title: 'Food Preservation and Processing',
      description: 'Traditional methods, fermentation, drying, and freezing.',
      order: 41,
      subtopics: ['Traditional and modern methods', 'Fermentation', 'Drying', 'Freezing', 'Canning and packaging']
    },
    {
      title: 'Practical Food Production (SSS 3)',
      description: 'Advanced menu planning and complex dishes.',
      order: 42,
      subtopics: ['Advanced menu planning', 'Complex dishes', 'Presentation', 'Costing', 'Evaluation']
    },
    // SSS 3 Second Term
    {
      title: 'Catering and Hospitality',
      description: 'Types of catering establishments and kitchen organization.',
      order: 43,
      subtopics: ['Meaning', 'Types of catering establishments', 'Equipment', 'Kitchen organization', 'Basic management']
    },
    {
      title: 'Large-Scale Food Production',
      description: 'Group menu planning, batch cooking, and portion control.',
      order: 44,
      subtopics: ['Group menu planning', 'Quantity purchasing', 'Batch cooking', 'Portion control', 'Food service and hygiene']
    },
    {
      title: 'Entrepreneurship in Food and Nutrition',
      description: 'Food business, business planning, and packaging.',
      order: 45,
      subtopics: ['Food business opportunities', 'Business planning', 'Costing and pricing', 'Packaging and marketing', 'Record keeping']
    },
    {
      title: 'Nigerian and International Cuisines',
      description: 'Regional dishes, international cuisines, and culture.',
      order: 46,
      subtopics: ['Nigerian regional dishes', 'Culture and food', 'Selected international cuisines', 'Ingredients and methods', 'Nutritional comparison']
    },
    {
      title: 'Food Hygiene and Public Health',
      description: 'Food-borne diseases, HACCP, and sanitation.',
      order: 47,
      subtopics: ['Food-borne diseases', 'HACCP principles', 'Personal hygiene', 'Sanitation', 'Safe food service']
    },
    {
      title: 'Practical Project',
      description: 'Planning, menu development, production, and costing.',
      order: 48,
      subtopics: ['Planning', 'Menu development', 'Production', 'Costing', 'Presentation and evaluation']
    },
    // SSS 3 Third Term
    {
      title: 'Comprehensive Revision',
      description: 'Nutrients, food commodities, cooking methods, and meal planning.',
      order: 49,
      subtopics: ['Nutrients and balanced diet', 'Food commodities', 'Cooking methods', 'Meal planning', 'Preservation', 'Nutrition and health']
    },
    {
      title: 'Practical Examination Preparation',
      description: 'Menu planning, food preparation, and table setting.',
      order: 50,
      subtopics: ['Menu planning', 'Food preparation', 'Table setting', 'Presentation', 'Costing and time management']
    },
    {
      title: 'Food and Nutrition Calculations',
      description: 'Recipe quantities, portion calculations, and budgeting.',
      order: 51,
      subtopics: ['Recipe quantities', 'Portion calculations', 'Food costing', 'Budgeting', 'Nutrient calculations']
    },
    {
      title: 'Past Questions and Examination Skills',
      description: 'Objective, theory, practical, and answering techniques.',
      order: 52,
      subtopics: ['Objective', 'Theory', 'Practical', 'Answering techniques', 'Common errors']
    },
    {
      title: 'WASSCE/NECO Examination Preparation',
      description: 'Mock examination, practical revision, and final topic revision.',
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
    console.log("Starting Food and Nutrition seeding process...");
    
    // Get subject_id
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [foodSyllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${foodSyllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    // Create Syllabus
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [
        subjectId,
        foodSyllabus.exam,
        foodSyllabus.syllabus_year,
        foodSyllabus.title,
        foodSyllabus.description
      ]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${foodSyllabus.title}`);

    // Link syllabus to all active exams
    const examsRes = await pool.query('SELECT id FROM exams WHERE is_active = TRUE');
    for (const exam of examsRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, exam.id]
      );
    }
    console.log(`Linked Syllabus to ${examsRes.rows.length} exams.`);

    for (const topic of foodSyllabus.topics) {
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

    console.log("Food and Nutrition Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
