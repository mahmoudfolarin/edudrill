require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'home-management', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Home Management Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    { title: 'Introduction to Home Management', description: 'Meaning, importance, management process.', order: 1, subtopics: ['Meaning of home management', 'Importance of home management', 'Management process', 'Resources available to the home', 'Human and material resources', 'Decision-making in the home'] },
    { title: 'Family and the Home', description: 'Meaning, types, functions.', order: 2, subtopics: ['Meaning of family', 'Types of family', 'Functions of the family', 'Family relationships', 'Responsibilities of family members', 'Factors affecting family life'] },
    { title: 'Home Resources', description: 'Human, material, time and energy.', order: 3, subtopics: ['Human resources', 'Material resources', 'Money as a resource', 'Time and energy', 'Community resources', 'Efficient use of resources'] },
    { title: 'Decision Making and Problem Solving', description: 'Steps, alternatives, family decision making.', order: 4, subtopics: ['Meaning of decision making', 'Steps in decision making', 'Identifying problems', 'Considering alternatives', 'Making and evaluating decisions', 'Family decision making'] },
    { title: 'Time Management', description: 'Meaning, time plans, schedules.', order: 5, subtopics: ['Meaning of time management', 'Time plans', 'Daily and weekly schedules', 'Time-saving techniques', 'Priorities', 'Avoiding time wastage'] },
    { title: 'Energy Management', description: 'Sources, human energy, conservation.', order: 6, subtopics: ['Sources of energy', 'Human energy', 'Energy conservation', 'Work simplification', 'Good posture and body mechanics', 'Planning household work'] },
    { title: 'Household Equipment', description: 'Types, selection, care, safety.', order: 7, subtopics: ['Types of household equipment', 'Small and large equipment', 'Selection of equipment', 'Safe use', 'Care and maintenance', 'Energy efficiency'] },
    { title: 'Cleaning the Home', description: 'Principles, materials, equipment, methods.', order: 8, subtopics: ['Principles of cleaning', 'Cleaning materials', 'Cleaning equipment', 'Cleaning methods', 'Care of floors and walls', 'Cleaning schedules'] },
    { title: 'Laundry and Clothing Care', description: 'Meaning, sorting, washing, drying.', order: 9, subtopics: ['Meaning of laundry', 'Sorting clothes', 'Washing methods', 'Drying and ironing', 'Storage', 'Stain prevention and removal'] },
    { title: 'Home Safety', description: 'Accidents, causes, prevention.', order: 10, subtopics: ['Common household accidents', 'Causes of accidents', 'Prevention', 'Electrical safety', 'Fire safety', 'Safe storage of household materials'] },
    { title: 'Revision and Practical Assessment (SSS 1 Term 1)', description: 'Exercises, practical tasks.', order: 11, subtopics: ['Review', 'Household management exercises', 'Practical cleaning/laundry task', 'Objective and short-answer practice', 'Assessment'] },
    // SSS 1 Second Term
    { title: 'Food and Nutrition in the Home', description: 'Functions, nutrients, balanced diet.', order: 12, subtopics: ['Meaning of food and nutrition', 'Functions of food', 'Food nutrients', 'Balanced diet', 'Factors affecting food choices', 'Healthy eating'] },
    { title: 'Meal Planning', description: 'Factors, budget, variety.', order: 13, subtopics: ['Meaning', 'Factors affecting meal planning', 'Age and activity', 'Family size', 'Budget', 'Availability of foods', 'Variety and balance'] },
    { title: 'Food Purchasing', description: 'Markets, choosing food, labels.', order: 14, subtopics: ['Food markets', 'Choosing food', 'Quality indicators', 'Seasonal foods', 'Reading labels', 'Budgeting for food'] },
    { title: 'Food Storage and Preservation', description: 'Reasons, dry storage, refrigeration.', order: 15, subtopics: ['Reasons for storage', 'Dry storage', 'Refrigeration', 'Freezing', 'Drying', 'Salting and other methods', 'Food safety'] },
    { title: 'Kitchen Management', description: 'Layout, equipment, hygiene.', order: 16, subtopics: ['Kitchen layout', 'Kitchen equipment', 'Work centres', 'Kitchen hygiene', 'Safe food handling', 'Waste management'] },
    { title: 'Cooking Methods', description: 'Moist-heat, dry-heat, combination.', order: 17, subtopics: ['Moist-heat methods', 'Dry-heat methods', 'Combination methods', 'Advantages and disadvantages', 'Selecting suitable methods'] },
    { title: 'Table Setting and Meal Service', description: 'Types, linen, cutlery.', order: 18, subtopics: ['Types of table setting', 'Table linen', 'Cutlery and crockery', 'Serving meals', 'Table manners', 'Care of dining equipment'] },
    { title: 'Household Budgeting', description: 'Meaning, sources of income, expenses.', order: 19, subtopics: ['Meaning of budget', 'Sources of family income', 'Fixed and variable expenses', 'Needs and wants', 'Budget preparation', 'Savings'] },
    { title: 'Consumer Education', description: 'Rights, responsibilities, advertising.', order: 20, subtopics: ['Meaning of consumer', 'Consumer rights', 'Consumer responsibilities', 'Wise buying', 'Advertising', 'Consumer protection'] },
    { title: 'Revision and Practical Work (SSS 1 Term 2)', description: 'Meal planning, budget preparation.', order: 21, subtopics: ['Meal planning exercise', 'Budget preparation', 'Food storage practice', 'Kitchen safety review', 'End-of-term assessment'] },
    // SSS 1 Third Term
    { title: 'Housing and the Home', description: 'Meaning, types, choice, location.', order: 22, subtopics: ['Meaning of housing', 'Types of houses', 'Factors affecting choice of house', 'Location', 'Space requirements', 'Healthy housing'] },
    { title: 'Home Furnishing', description: 'Meaning, types, selection, arrangement.', order: 23, subtopics: ['Meaning', 'Types of furniture', 'Selection of furniture', 'Arrangement', 'Comfort and convenience', 'Care of furniture'] },
    { title: 'Interior Decoration', description: 'Colour, balance, lighting, ventilation.', order: 24, subtopics: ['Meaning', 'Colour in the home', 'Balance and harmony', 'Lighting', 'Ventilation', 'Simple decoration'] },
    { title: 'Household Linen', description: 'Types, selection, care, storage.', order: 25, subtopics: ['Types of household linen', 'Selection', 'Care and laundering', 'Storage', 'Repair and reuse'] },
    { title: 'Clothing Selection', description: 'Factors, age, climate, colour.', order: 26, subtopics: ['Factors affecting clothing choice', 'Age and occasion', 'Climate', 'Colour and design', 'Comfort', 'Cost and durability'] },
    { title: 'Personal Grooming and Appearance', description: 'Cleanliness, health, skin care.', order: 27, subtopics: ['Personal cleanliness', 'Grooming', 'Care of hair and skin', 'Appropriate dress', 'Health and confidence'] },
    { title: 'Sewing Equipment and Basic Stitches', description: 'Tools, temporary/permanent stitches.', order: 28, subtopics: ['Sewing tools', 'Care of equipment', 'Needles and threads', 'Temporary stitches', 'Permanent stitches', 'Practical exercises'] },
    { title: 'Simple Clothing Repairs', description: 'Mending, replacing buttons, hemming.', order: 29, subtopics: ['Mending tears', 'Replacing buttons', 'Hemming', 'Simple alterations', 'Pressing', 'Care of repaired garments'] },
    { title: 'Home Decoration and Maintenance', description: 'Routine maintenance, walls, floors.', order: 30, subtopics: ['Routine maintenance', 'Walls and floors', 'Furniture care', 'Simple repairs', 'Cleaning schedules'] },
    { title: 'Revision and Examination (SSS 1 Term 3)', description: 'Comprehensive review, practical work.', order: 31, subtopics: ['Comprehensive review', 'Practical work', 'Theory revision', 'End-of-term examination'] },
    // SSS 2 First Term
    { title: 'Advanced Home Management', description: 'Management principles, planning, organising.', order: 32, subtopics: ['Management principles', 'Planning', 'Organising', 'Controlling', 'Evaluation', 'Efficient household management'] },
    { title: 'Family Relationships', description: 'Healthy relations, communication, conflict.', order: 33, subtopics: ['Healthy family relationships', 'Communication', 'Cooperation', 'Conflict management', 'Responsibilities', 'Factors affecting family stability'] },
    { title: 'Family Needs and Wants', description: 'Basic, secondary, prioritising.', order: 34, subtopics: ['Basic needs', 'Secondary needs', 'Wants', 'Prioritising', 'Resource allocation', 'Family decision making'] },
    { title: 'Income and Expenditure', description: 'Sources, earned/unearned, fixed/flexible.', order: 35, subtopics: ['Sources of income', 'Earned and unearned income', 'Household expenditure', 'Fixed and flexible expenses', 'Record keeping'] },
    { title: 'Family Budget', description: 'Purpose, types, preparation, balancing.', order: 36, subtopics: ['Purpose', 'Types of budgets', 'Budget preparation', 'Balancing income and expenditure', 'Savings', 'Emergency funds'] },
    { title: 'Consumer Education (Advanced)', description: 'Behaviour, rights, protection agencies.', order: 37, subtopics: ['Consumer behaviour', 'Consumer rights', 'Consumer responsibilities', 'Consumer protection agencies', 'Fraud and misleading advertising'] },
    { title: 'Buying and Selling', description: 'Factors, quality, price, credit/cash.', order: 38, subtopics: ['Factors affecting purchases', 'Quality', 'Price', 'Quantity', 'Credit buying', 'Cash buying', 'Receipts and warranties'] },
    { title: 'Household Equipment and Appliances', description: 'Selection, operating, maintenance.', order: 39, subtopics: ['Selection', 'Operating instructions', 'Maintenance', 'Repairs', 'Energy consumption', 'Safety'] },
    { title: 'Work Simplification', description: 'Meaning, principles, posture.', order: 40, subtopics: ['Meaning', 'Principles', 'Sequence of work', 'Proper equipment', 'Good posture', 'Time and energy saving'] },
    { title: 'Revision and Practical Assessment (SSS 2 Term 1)', description: 'Budget exercise, task.', order: 41, subtopics: ['Budget exercise', 'Resource-management task', 'Consumer case study', 'Theory revision', 'Assessment'] },
    // SSS 2 Second Term
    { title: 'Food Nutrients', description: 'Carbohydrates, proteins, fats, vitamins.', order: 42, subtopics: ['Carbohydrates', 'Proteins', 'Fats and oils', 'Vitamins', 'Minerals', 'Water', 'Fibre'] },
    { title: 'Balanced Diet and Meal Planning', description: 'Needs, patterns, menu.', order: 43, subtopics: ['Nutritional needs', 'Meal patterns', 'Family needs', 'Special considerations', 'Budget', 'Menu planning'] },
    { title: 'Special Diets', description: 'Children, adolescents, older people, pregnancy.', order: 44, subtopics: ['Children', 'Adolescents', 'Adults', 'Older people', 'Pregnancy and breastfeeding', 'Dietary modifications'] },
    { title: 'Food Preparation', description: 'Principles, conservation, cooking methods.', order: 45, subtopics: ['Preparation principles', 'Nutrient conservation', 'Cooking methods', 'Kitchen organisation', 'Food safety'] },
    { title: 'Food Hygiene and Sanitation', description: 'Personal hygiene, kitchen, cross-contamination.', order: 46, subtopics: ['Personal hygiene', 'Kitchen hygiene', 'Cross-contamination', 'Safe temperatures', 'Waste disposal', 'Food poisoning prevention'] },
    { title: 'Food Preservation', description: 'Drying, smoking, salting, canning.', order: 47, subtopics: ['Drying', 'Smoking', 'Salting', 'Canning', 'Bottling', 'Refrigeration and freezing'] },
    { title: 'Hospitality and Entertaining', description: 'Planning, invitations, table setting.', order: 48, subtopics: ['Planning a meal', 'Invitations', 'Table setting', 'Serving', 'Guest care', 'Clean-up'] },
    { title: 'Household Laundry', description: 'Process, classification, detergents.', order: 49, subtopics: ['Laundry process', 'Fabric classification', 'Detergents', 'Stain treatment', 'Machine washing', 'Ironing and storage'] },
    { title: 'Fabric Care', description: 'Natural/man-made fibres, symbols, storage.', order: 50, subtopics: ['Natural fibres', 'Man-made fibres', 'Fabric properties', 'Washing symbols', 'Colour care', 'Storage'] },
    { title: 'Revision and Practical Examination (SSS 2 Term 2)', description: 'Meal planning, food preparation.', order: 51, subtopics: ['Meal planning', 'Food preparation', 'Laundry practical', 'Written revision', 'Assessment'] },
    // SSS 2 Third Term
    { title: 'Clothing and Textiles', description: 'Functions, choice, yarns, fabrics.', order: 52, subtopics: ['Functions of clothing', 'Factors affecting clothing choice', 'Textile fibres', 'Yarns', 'Fabrics', 'Fabric performance'] },
    { title: 'Natural and Manufactured Fibres', description: 'Cotton, linen, wool, silk, rayon, nylon.', order: 53, subtopics: ['Cotton', 'Linen', 'Wool', 'Silk', 'Rayon', 'Polyester', 'Nylon and blends'] },
    { title: 'Clothing Construction', description: 'Patterns, body measurements, cutting, joining.', order: 54, subtopics: ['Pattern basics', 'Taking body measurements', 'Layout', 'Cutting', 'Joining', 'Finishing'] },
    { title: 'Sewing Machine', description: 'Parts, functions, threading, maintenance.', order: 55, subtopics: ['Parts', 'Functions', 'Threading', 'Safe operation', 'Maintenance', 'Troubleshooting'] },
    { title: 'Garment Finishing', description: 'Seams, hems, fastenings, necklines.', order: 56, subtopics: ['Seams', 'Hems', 'Fastenings', 'Necklines', 'Sleeves', 'Pressing'] },
    { title: 'Household Textiles', description: 'Curtains, cushion covers, bed linen.', order: 57, subtopics: ['Curtains', 'Cushion covers', 'Table linen', 'Bed linen', 'Selection and care'] },
    { title: 'Interior Design', description: 'Colour schemes, texture, pattern, furniture.', order: 58, subtopics: ['Colour schemes', 'Texture', 'Pattern', 'Furniture arrangement', 'Lighting', 'Ventilation'] },
    { title: 'Housing and Environment', description: 'Healthy housing, water, waste, sanitation.', order: 59, subtopics: ['Healthy housing', 'Water supply', 'Waste disposal', 'Ventilation', 'Sanitation', 'Environmental cleanliness'] },
    { title: 'Practical Project', description: 'Simple garment, planning, material, finishing.', order: 60, subtopics: ['Simple garment or household textile', 'Planning', 'Material selection', 'Construction', 'Finishing', 'Evaluation'] },
    { title: 'Revision and Examination (SSS 2 Term 3)', description: 'Practical revision, theory review.', order: 61, subtopics: ['Practical revision', 'Theory review', 'Project presentation', 'End-of-term examination'] },
    // SSS 3 First Term
    { title: 'Comprehensive Home Management Review', description: 'Process, resources, time, energy.', order: 62, subtopics: ['Management process', 'Resources', 'Decision making', 'Time and energy management', 'Work simplification'] },
    { title: 'Family Life and Responsibilities', description: 'Roles, communication, conflict.', order: 63, subtopics: ['Family roles', 'Communication', 'Cooperation', 'Conflict resolution', 'Responsible family living'] },
    { title: 'Household Budgeting and Financial Management', description: 'Income, expenditure, saving.', order: 64, subtopics: ['Income', 'Expenditure', 'Budgeting', 'Saving', 'Credit', 'Financial records'] },
    { title: 'Consumer Education and Protection', description: 'Rights, responsibilities, advertising.', order: 65, subtopics: ['Consumer rights', 'Consumer responsibilities', 'Product information', 'Advertising', 'Consumer protection', 'Wise buying'] },
    { title: 'Housing and Home Selection', description: 'Types, location, cost, facilities.', order: 66, subtopics: ['Types of housing', 'Location', 'Cost', 'Space', 'Facilities', 'Healthy environment'] },
    { title: 'Home Furnishing and Decoration', description: 'Furniture, colour, lighting.', order: 67, subtopics: ['Furniture', 'Colour', 'Lighting', 'Ventilation', 'Space planning', 'Aesthetic principles'] },
    { title: 'Household Equipment (SSS 3)', description: 'Selection, use, maintenance.', order: 68, subtopics: ['Selection', 'Use', 'Maintenance', 'Energy efficiency', 'Safety', 'Repairs'] },
    { title: 'Home Safety and First Aid', description: 'Accidents, prevention, fire, first aid.', order: 69, subtopics: ['Common accidents', 'Prevention', 'Fire safety', 'Electrical safety', 'Basic first-aid principles', 'Emergency preparedness'] },
    { title: 'Practical Management Project', description: 'Identify problem, plan, implement.', order: 70, subtopics: ['Identify a household problem', 'Plan solution', 'Use resources', 'Implement', 'Evaluate results'] },
    { title: 'Revision and Examination (SSS 3 Term 1)', description: 'Comprehensive review, past questions.', order: 71, subtopics: ['Comprehensive revision', 'Past-question practice', 'Practical assessment', 'Mock examination'] },
    // SSS 3 Second Term
    { title: 'Advanced Nutrition', description: 'Nutrients, balanced diet, energy, deficiencies.', order: 72, subtopics: ['Nutrients', 'Balanced diet', 'Energy requirements', 'Nutritional deficiencies', 'Food choices', 'Healthy eating patterns'] },
    { title: 'Meal Planning for Different Needs', description: 'Children, adolescents, adults, pregnancy.', order: 73, subtopics: ['Children', 'Adolescents', 'Adults', 'Older people', 'Pregnancy', 'Special dietary needs'] },
    { title: 'Advanced Food Preparation', description: 'Cooking methods, conservation, presentation.', order: 74, subtopics: ['Cooking methods', 'Nutrient conservation', 'Food presentation', 'Kitchen organisation', 'Food safety'] },
    { title: 'Food Preservation and Storage', description: 'Principles, methods, packaging, labeling.', order: 75, subtopics: ['Principles', 'Traditional methods', 'Modern methods', 'Packaging', 'Labelling', 'Safe storage'] },
    { title: 'Advanced Clothing and Textiles', description: 'Fibres, construction, properties.', order: 76, subtopics: ['Textile fibres', 'Fabric construction', 'Fabric properties', 'Selection', 'Care', 'Consumer considerations'] },
    { title: 'Clothing Construction and Repairs', description: 'Pattern work, garment, fastenings.', order: 77, subtopics: ['Pattern work', 'Garment construction', 'Fastenings', 'Alterations', 'Repairs', 'Finishing'] },
    { title: 'Laundry and Fabric Care', description: 'Agents, stain removal, washing, ironing.', order: 78, subtopics: ['Laundry agents', 'Stain removal', 'Washing', 'Drying', 'Ironing', 'Storage'] },
    { title: 'Hospitality and Event Management', description: 'Planning, menu, budget, guest care.', order: 79, subtopics: ['Planning an event', 'Menu', 'Budget', 'Guest arrangements', 'Table setting', 'Evaluation'] },
    { title: 'Home and Environmental Management', description: 'Waste, water, indoor environment.', order: 80, subtopics: ['Waste management', 'Water conservation', 'Energy conservation', 'Indoor environment', 'Sustainable practices'] },
    { title: 'Revision and Examination (SSS 3 Term 2)', description: 'Theory, practical, past questions.', order: 81, subtopics: ['Theory revision', 'Practical work', 'Past questions', 'Mock examination'] },
    // SSS 3 Third Term
    { title: 'Comprehensive Revision: Home Management', description: 'Process, resources, time, energy.', order: 82, subtopics: ['Management process', 'Resources', 'Time and energy', 'Decision making', 'Work simplification'] },
    { title: 'Comprehensive Revision: Family and Consumer Education', description: 'Relationships, budgeting, consumer rights.', order: 83, subtopics: ['Family relationships', 'Budgeting', 'Consumer rights', 'Purchasing', 'Financial management'] },
    { title: 'Comprehensive Revision: Food and Nutrition', description: 'Nutrients, planning, preparation.', order: 84, subtopics: ['Nutrients', 'Meal planning', 'Food preparation', 'Preservation', 'Hygiene', 'Special diets'] },
    { title: 'Comprehensive Revision: Clothing and Textiles', description: 'Fibres, fabrics, selection, construction.', order: 85, subtopics: ['Fibres', 'Fabrics', 'Clothing selection', 'Construction', 'Laundry', 'Repairs'] },
    { title: 'Comprehensive Revision: Housing and Interior', description: 'Housing, furnishing, decoration.', order: 86, subtopics: ['Housing', 'Furnishing', 'Decoration', 'Sanitation', 'Safety', 'Maintenance'] },
    { title: 'Practical Examination Preparation', description: 'Food, clothing, home tasks.', order: 87, subtopics: ['Food practical', 'Clothing/textile practical', 'Home-management tasks', 'Planning and evaluation'] },
    { title: 'Theory Examination Practice', description: 'Objective, structured, essays.', order: 88, subtopics: ['Objective questions', 'Structured questions', 'Essay/application questions', 'Case studies'] },
    { title: 'Past Questions and Corrections', description: 'Identify concepts, answer organisation.', order: 89, subtopics: ['Identify recurring concepts', 'Answer organisation', 'Practical scenarios', 'Correcting mistakes'] },
    { title: 'Mock Examination', description: 'Full theory, practical assessment.', order: 90, subtopics: ['Full theory assessment', 'Practical assessment', 'Corrections', 'Targeted revision'] },
    { title: 'Final Revision and Assessment', description: 'Final review, project portfolio.', order: 91, subtopics: ['Final review', 'Project portfolio', 'Practical readiness', 'Examination preparation'] }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting " + syllabus.title + " seeding...");
    
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [syllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${syllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [subjectId, syllabus.exam, syllabus.syllabus_year, syllabus.title, syllabus.description]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${syllabus.title}`);

    const examsRes = await pool.query('SELECT id FROM exams WHERE is_active = TRUE');
    for (const exam of examsRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, exam.id]
      );
    }
    console.log(`Linked Syllabus to ${examsRes.rows.length} exams.`);

    for (const topic of syllabus.topics) {
      const topicSlug = slugify(topic.title);
      const tRes = await pool.query(
        `INSERT INTO topics (syllabus_id, title, slug, description, topic_order, is_active)
         VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
        [syllabusId, topic.title, topicSlug, topic.description, topic.order]
      );
      const topicId = tRes.rows[0].id;

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
            <h2>Welcome to \${lessonTitle}</h2>
            <p>This is a comprehensive study module covering the concepts of <strong>\${subStr}</strong> within the topic of \${topic.title}.</p>
            <h3>Key Principles</h3>
            <ul>
              <li>Understand the fundamental rules and definitions of \${subStr}.</li>
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
    console.log(syllabus.title + " Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
