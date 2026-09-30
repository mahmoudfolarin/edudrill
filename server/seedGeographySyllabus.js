require('dotenv').config();
const pool = require('./src/config/database');

const geographySyllabus = {
  exam: 'WAEC',
  subject: 'geography', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Geography Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Introduction to Geography',
      description: 'Meaning, scope, and branches of Geography.',
      order: 1,
      subtopics: ['Meaning and scope of Geography', 'Branches of Geography', 'Importance of Geography', 'Geographical skills and careers']
    },
    {
      title: 'The Solar System and the Earth',
      description: 'The solar system, shape, size, and movements of the Earth.',
      order: 2,
      subtopics: ['The solar system', 'Shape and size of the Earth', "Earth's movements", 'Effects of rotation and revolution', 'Latitude and longitude']
    },
    {
      title: 'Map Reading',
      description: 'Types of maps, scales, and interpretation.',
      order: 3,
      subtopics: ['Types of maps', 'Map scales', 'Conventional signs', 'Grid references', 'Direction and bearings', 'Map interpretation']
    },
    {
      title: 'Rocks and Minerals',
      description: 'Types, rock cycle, and weathering.',
      order: 4,
      subtopics: ['Types of rocks', 'Rock cycle', 'Minerals and their uses', 'Weathering of rocks', 'Importance of rocks']
    },
    {
      title: 'Internal Structure and Processes',
      description: 'Layers of the Earth, earthquakes, volcanism.',
      order: 5,
      subtopics: ['Layers of the Earth', 'Earthquakes', 'Volcanism', 'Folding and faulting', 'Plate tectonics']
    },
    {
      title: 'Fieldwork and Geographical Techniques',
      description: 'Observation, data collection, and sampling.',
      order: 6,
      subtopics: ['Observation', 'Data collection', 'Questionnaires', 'Sampling', 'Field sketches', 'Presentation of findings']
    },
    // SSS 1 Second Term
    {
      title: 'Weather and Climate',
      description: 'Elements, instruments, and factors.',
      order: 7,
      subtopics: ['Elements of weather', 'Weather instruments', 'Weather observation', 'Factors affecting climate', 'Weather records']
    },
    {
      title: 'Atmospheric Processes',
      description: 'Atmosphere, radiation, pressure, and winds.',
      order: 8,
      subtopics: ['Structure of the atmosphere', 'Solar radiation', 'Temperature', 'Pressure', 'Winds', 'Humidity and rainfall']
    },
    {
      title: 'Climate Classification',
      description: 'Meaning, types, and characteristics of climates.',
      order: 9,
      subtopics: ['Meaning of climate classification', 'Major climate types', 'Characteristics of climatic regions', 'Climatic graphs']
    },
    {
      title: 'Water and the Hydrological Cycle',
      description: 'Water cycle, precipitation, and runoff.',
      order: 10,
      subtopics: ['Water cycle', 'Evaporation', 'Condensation', 'Precipitation', 'Runoff and infiltration', 'Water resources']
    },
    {
      title: 'Rivers and Drainage',
      description: 'Processes, landforms, and patterns.',
      order: 11,
      subtopics: ['River processes', 'Erosion, transportation and deposition', 'River landforms', 'Drainage patterns', 'Flooding']
    },
    {
      title: 'Oceans and Coasts',
      description: 'Movements, waves, tides, and currents.',
      order: 12,
      subtopics: ['Ocean movements', 'Waves', 'Tides', 'Currents', 'Coastal erosion and deposition', 'Coastal landforms']
    },
    // SSS 1 Third Term
    {
      title: 'Soils',
      description: 'Formation, profile, properties, and types.',
      order: 13,
      subtopics: ['Soil formation', 'Soil profile', 'Soil properties', 'Soil types', 'Soil erosion and conservation']
    },
    {
      title: 'Vegetation',
      description: 'Natural vegetation, types, and zones.',
      order: 14,
      subtopics: ['Natural vegetation', 'Vegetation types', 'Factors affecting vegetation', 'Vegetation zones', 'Human impact']
    },
    {
      title: 'Population Geography',
      description: 'Distribution, density, and growth.',
      order: 15,
      subtopics: ['Population distribution', 'Population density', 'Population growth', 'Birth and death rates', 'Population structure']
    },
    {
      title: 'Settlement Geography',
      description: 'Types, site, situation, and patterns.',
      order: 16,
      subtopics: ['Meaning and types of settlements', 'Site and situation', 'Rural settlements', 'Urban settlements', 'Settlement patterns']
    },
    {
      title: 'Human Activities and the Environment',
      description: 'Agriculture, mining, industry, and impacts.',
      order: 17,
      subtopics: ['Agriculture', 'Mining', 'Industry', 'Deforestation', 'Environmental impacts']
    },
    {
      title: 'Map Work and Revision',
      description: 'Topographical maps, cross-sections, and relief.',
      order: 18,
      subtopics: ['Topographical maps', 'Cross-sections', 'Relief interpretation', 'Distance and area calculations', 'Revision']
    },
    // SSS 2 First Term
    {
      title: 'Population Studies',
      description: 'Growth, structure, and policies.',
      order: 19,
      subtopics: ['Population growth', 'Population structure', 'Migration', 'Population policies', 'Population problems']
    },
    {
      title: 'Migration',
      description: 'Types, push/pull factors, and effects.',
      order: 20,
      subtopics: ['Meaning and types', 'Push and pull factors', 'Rural-urban migration', 'International migration', 'Effects of migration']
    },
    {
      title: 'Agriculture',
      description: 'Types, systems, and factors.',
      order: 21,
      subtopics: ['Types of agriculture', 'Farming systems', 'Factors affecting agriculture', 'Major crops', 'Agricultural problems']
    },
    {
      title: 'Industrialization',
      description: 'Types, location factors, and regions.',
      order: 22,
      subtopics: ['Meaning and types of industry', 'Factors of industrial location', 'Industrial regions', 'Industrialization and development', 'Environmental effects']
    },
    {
      title: 'Transportation',
      description: 'Modes, factors, networks, and problems.',
      order: 23,
      subtopics: ['Modes of transportation', 'Factors affecting transport', 'Transport networks', 'Transport problems', 'Importance to development']
    },
    {
      title: 'Communication',
      description: 'Types, networks, and ICT.',
      order: 24,
      subtopics: ['Meaning and types', 'Communication networks', 'Modern communication', 'ICT and development', 'Communication challenges']
    },
    // SSS 2 Second Term
    {
      title: 'Trade',
      description: 'Local and international trade.',
      order: 25,
      subtopics: ['Local and international trade', 'Visible and invisible trade', 'Trade balance', 'Trade routes', 'Trade barriers']
    },
    {
      title: 'Resources and Development',
      description: 'Natural resources, distribution, and exploitation.',
      order: 26,
      subtopics: ['Natural resources', 'Renewable and non-renewable resources', 'Resource distribution', 'Resource exploitation', 'Sustainable development']
    },
    {
      title: 'Energy Resources',
      description: 'Coal, petroleum, natural gas, and renewables.',
      order: 27,
      subtopics: ['Coal', 'Petroleum', 'Natural gas', 'Hydroelectricity', 'Solar and wind energy', 'Energy problems']
    },
    {
      title: 'Mineral Resources',
      description: 'Metallic, non-metallic, mining methods.',
      order: 28,
      subtopics: ['Metallic minerals', 'Non-metallic minerals', 'Mining methods', 'Distribution and uses', 'Mining impacts']
    },
    {
      title: 'Environmental Hazards',
      description: 'Flooding, drought, desertification, and pollution.',
      order: 29,
      subtopics: ['Flooding', 'Drought', 'Desertification', 'Erosion', 'Landslides', 'Pollution']
    },
    {
      title: 'Environmental Conservation',
      description: 'Forest, wildlife, soil, and water conservation.',
      order: 30,
      subtopics: ['Conservation principles', 'Forest conservation', 'Wildlife conservation', 'Soil conservation', 'Water conservation']
    },
    // SSS 2 Third Term
    {
      title: 'Urbanization',
      description: 'Meaning, causes, growth, and planning.',
      order: 31,
      subtopics: ['Meaning and causes', 'Urban growth', 'Functions of cities', 'Urban problems', 'Urban planning']
    },
    {
      title: 'Settlement and Land Use',
      description: 'Zones, CBD, residential, and industrial areas.',
      order: 32,
      subtopics: ['Land-use zones', 'Central business districts', 'Residential areas', 'Industrial areas', 'Urban-rural linkages']
    },
    {
      title: 'Tourism',
      description: 'Meaning, attractions, and development.',
      order: 33,
      subtopics: ['Meaning and types', 'Tourist attractions', 'Tourism development', 'Economic benefits', 'Environmental and social impacts']
    },
    {
      title: 'Regional Geography of West Africa',
      description: 'Physical features, climate, population, and activities.',
      order: 34,
      subtopics: ['Physical features', 'Climate and vegetation', 'Population', 'Economic activities', 'Transport and trade']
    },
    {
      title: 'Geography of Nigeria',
      description: 'Location, physical features, and population.',
      order: 35,
      subtopics: ['Location and physical features', 'Climate and vegetation', 'Population and settlements', 'Agriculture and minerals', 'Industry and transport']
    },
    {
      title: 'Map Work and Fieldwork',
      description: 'Interpretation, scale calculations, and data presentation.',
      order: 36,
      subtopics: ['Topographical map interpretation', 'Scale calculations', 'Relief and drainage', 'Field data presentation', 'Revision']
    },
    // SSS 3 First Term
    {
      title: 'Regional Geography of Nigeria',
      description: 'Relief, climate, vegetation, and resources.',
      order: 37,
      subtopics: ['Relief and drainage', 'Climate', 'Vegetation', 'Population', 'Agriculture', 'Mineral resources and industries']
    },
    {
      title: 'Economic Geography',
      description: 'Agriculture, mining, manufacturing, and trade.',
      order: 38,
      subtopics: ['Agriculture', 'Mining', 'Manufacturing', 'Trade', 'Transportation', 'Energy']
    },
    {
      title: 'Development Geography',
      description: 'Indicators, regions, and problems.',
      order: 39,
      subtopics: ['Meaning of development', 'Development indicators', 'Developed and developing regions', 'Development problems', 'Sustainable development']
    },
    {
      title: 'Environmental Management',
      description: 'Degradation, pollution, and climate change.',
      order: 40,
      subtopics: ['Environmental degradation', 'Pollution', 'Deforestation', 'Desertification', 'Climate change', 'Conservation']
    },
    {
      title: 'Geographic Information and Technology',
      description: 'Remote sensing, GIS, GPS, and applications.',
      order: 41,
      subtopics: ['Remote sensing', 'GIS concepts', 'GPS', 'Digital maps', 'Applications of geospatial technology']
    },
    {
      title: 'Practical Geography',
      description: 'Map interpretation, distance, gradient, and cross-sections.',
      order: 42,
      subtopics: ['Map interpretation', 'Scale and distance', 'Gradient', 'Cross-sections', 'Statistical diagrams', 'Fieldwork']
    },
    // SSS 3 Second Term
    {
      title: 'Regional Geography of Africa',
      description: 'Physical regions, climate, population, and agriculture.',
      order: 43,
      subtopics: ['Major physical regions', 'Climate and vegetation', 'Population distribution', 'Agriculture', 'Mineral resources', 'Industries and trade']
    },
    {
      title: 'West African Geography',
      description: 'Physical environment, population, and industry.',
      order: 44,
      subtopics: ['Physical environment', 'Population', 'Agriculture', 'Minerals', 'Industry', 'Regional cooperation']
    },
    {
      title: 'Nigeria: Population and Urbanization',
      description: 'Structure, migration, growth, and planning.',
      order: 45,
      subtopics: ['Population structure', 'Migration', 'Urban growth', 'Urban problems', 'Settlement planning']
    },
    {
      title: 'Nigeria: Agriculture and Resources',
      description: 'Farming systems, crops, and energy resources.',
      order: 46,
      subtopics: ['Farming systems', 'Major crops', 'Mineral resources', 'Energy resources', 'Resource management']
    },
    {
      title: 'Nigeria: Industry, Transport and Trade',
      description: 'Industrial regions, networks, and ports.',
      order: 47,
      subtopics: ['Industrial regions', 'Transport networks', 'Ports and trade', 'Internal and external trade', 'Development challenges']
    },
    {
      title: 'Contemporary Geographical Issues',
      description: 'Climate change, food security, and disasters.',
      order: 48,
      subtopics: ['Climate change', 'Food security', 'Water resources', 'Population pressure', 'Disaster management', 'Sustainable development']
    },
    // SSS 3 Third Term
    {
      title: 'Comprehensive Revision',
      description: 'Physical, human, regional, and environmental geography.',
      order: 49,
      subtopics: ['Physical Geography', 'Human Geography', 'Regional Geography', 'Environmental Geography', 'Map work']
    },
    {
      title: 'Practical Examination Preparation',
      description: 'Topographical maps, contours, and cross-sections.',
      order: 50,
      subtopics: ['Topographical maps', 'Scale calculations', 'Contours', 'Cross-sections', 'Statistical diagrams', 'Fieldwork']
    },
    {
      title: 'Data and Graphical Skills',
      description: 'Tables, graphs, charts, and pyramids.',
      order: 51,
      subtopics: ['Tables', 'Bar graphs', 'Pie charts', 'Histograms', 'Population pyramids', 'Line graphs']
    },
    {
      title: 'Past Questions and Examination Skills',
      description: 'Objective, theory, map-work, and essays.',
      order: 52,
      subtopics: ['Objective questions', 'Theory questions', 'Map-work questions', 'Essay organization', 'Common errors']
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
    console.log("Starting Geography seeding process...");
    
    // Get subject_id
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [geographySyllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${geographySyllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    // Create Syllabus
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [
        subjectId,
        geographySyllabus.exam,
        geographySyllabus.syllabus_year,
        geographySyllabus.title,
        geographySyllabus.description
      ]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${geographySyllabus.title}`);

    // Link syllabus to all active exams
    const examsRes = await pool.query('SELECT id FROM exams WHERE is_active = TRUE');
    for (const exam of examsRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, exam.id]
      );
    }
    console.log(`Linked Syllabus to ${examsRes.rows.length} exams.`);

    for (const topic of geographySyllabus.topics) {
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

    console.log("Geography Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
