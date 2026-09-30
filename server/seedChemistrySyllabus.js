require('dotenv').config();
const pool = require('./src/config/database');

const chemistrySyllabus = {
  exam: 'WAEC',
  subject: 'chemistry',
  syllabus_year: '2026/2027',
  title: 'Chemistry Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Introduction to Chemistry',
      description: 'Scope, branches, and importance of chemistry.',
      order: 1,
      subtopics: ['Meaning and scope of chemistry', 'Branches of chemistry', 'Importance of chemistry', 'Chemistry in everyday life', 'Laboratory safety rules', 'Common laboratory apparatus']
    },
    {
      title: 'Measurement and Scientific Methods',
      description: 'SI units, precision, and accuracy.',
      order: 2,
      subtopics: ['Physical quantities and units', 'SI units', 'Accuracy and precision', 'Significant figures', 'Scientific notation', 'Measurement of mass, volume and temperature']
    },
    {
      title: 'Matter',
      description: 'States of matter and changes of state.',
      order: 3,
      subtopics: ['States of matter', 'Particle theory', 'Changes of state', 'Physical and chemical changes', 'Diffusion', 'Brownian motion']
    },
    {
      title: 'Separation Techniques',
      description: 'Filtration, distillation, and chromatography.',
      order: 4,
      subtopics: ['Filtration', 'Evaporation', 'Crystallization', 'Distillation', 'Fractional distillation', 'Sublimation', 'Chromatography', 'Decantation and separating funnels']
    },
    {
      title: 'Atomic Structure',
      description: 'Atoms, molecules, protons, neutrons, electrons.',
      order: 5,
      subtopics: ['Atoms and molecules', 'Protons, neutrons and electrons', 'Atomic number', 'Mass number', 'Isotopes', 'Electronic configuration']
    },
    {
      title: 'Periodic Table',
      description: 'Development, groups, periods, and trends.',
      order: 6,
      subtopics: ['Development of the periodic table', 'Groups and periods', 'Metals and non-metals', 'Periodic trends', 'Valency and oxidation states']
    },
    // SSS 1 Second Term
    {
      title: 'Chemical Bonding',
      description: 'Ionic, covalent, and metallic bonding.',
      order: 7,
      subtopics: ['Ionic bonding', 'Covalent bonding', 'Metallic bonding', 'Lewis structures', 'Valency', 'Properties of ionic and covalent substances']
    },
    {
      title: 'Chemical Formulae and Equations',
      description: 'Symbols, formulae, and balancing equations.',
      order: 8,
      subtopics: ['Symbols and formulae', 'Writing formulae', 'Balancing equations', 'State symbols', 'Types of chemical reactions']
    },
    {
      title: 'Mole Concept',
      description: 'Atomic mass, molar mass, and Avogadro constant.',
      order: 9,
      subtopics: ['Relative atomic mass', 'Relative molecular mass', 'Molar mass', 'Avogadro constant', 'Moles and particles', 'Molar volume of gases', 'Calculations']
    },
    {
      title: 'Stoichiometry',
      description: 'Mass relationships, empirical and molecular formula.',
      order: 10,
      subtopics: ['Mass relationships', 'Mole ratios', 'Empirical formula', 'Molecular formula', 'Percentage composition', 'Limiting reactants']
    },
    // SSS 1 Third Term
    {
      title: 'Gas Laws',
      description: "Boyle's, Charles', and ideal gas laws.",
      order: 11,
      subtopics: ["Boyle's law", "Charles' law", 'Pressure law', 'Combined gas law', 'Ideal gas equation', 'Gas volume calculations']
    },
    {
      title: 'Solutions',
      description: 'Solute, solvent, concentration, and molarity.',
      order: 12,
      subtopics: ['Solute and solvent', 'Concentration', 'Molarity', 'Solubility', 'Saturated and unsaturated solutions', 'Dilution']
    },
    {
      title: 'Water',
      description: 'Sources, hardness, and purification of water.',
      order: 13,
      subtopics: ['Sources of water', 'Hard and soft water', 'Temporary and permanent hardness', 'Water purification', 'Water treatment', 'Importance of water']
    },
    {
      title: 'Energy Changes',
      description: 'Exothermic and endothermic reactions.',
      order: 14,
      subtopics: ['Exothermic reactions', 'Endothermic reactions', 'Energy profiles', 'Heat of reaction', 'Simple calorimetry']
    },
    {
      title: 'Practical Chemistry (SSS 1)',
      description: 'Laboratory safety and simple experiments.',
      order: 15,
      subtopics: ['Laboratory safety', 'Measurement', 'Separation techniques', 'Acid-base tests', 'Preparation of salts', 'Simple quantitative experiments']
    },
    // SSS 2 First Term
    {
      title: 'Atomic Structure and Periodicity',
      description: 'Orbitals, sublevels, and periodic trends.',
      order: 16,
      subtopics: ['Orbitals and sublevels', 'Electronic configuration', 'Ion formation', 'Periodic trends', 'Atomic and ionic radii', 'Ionization energy', 'Electronegativity']
    },
    {
      title: 'Chemical Bonding and Structure',
      description: 'Electrovalent, covalent, and intermolecular forces.',
      order: 17,
      subtopics: ['Electrovalent compounds', 'Covalent compounds', 'Coordinate bonding', 'Intermolecular forces', 'Hydrogen bonding', 'Shapes of molecules', 'Polarity']
    },
    {
      title: 'Kinetic Theory and States of Matter',
      description: 'Gas behavior, kinetic theory, and ideal gases.',
      order: 18,
      subtopics: ['Gas behavior', 'Kinetic theory', 'Real and ideal gases', 'Liquids and solids', 'Intermolecular forces']
    },
    {
      title: 'Acids, Bases and Salts',
      description: 'Strong/weak acids, pH, indicators, and titration.',
      order: 19,
      subtopics: ['Strong and weak acids', 'Strong and weak bases', 'pH calculations', 'Indicators', 'Salt hydrolysis', 'Acid-base titration']
    },
    {
      title: 'Solubility',
      description: 'Solubility curves and crystallization.',
      order: 20,
      subtopics: ['Solubility curves', 'Solubility calculations', 'Crystallization', 'Effect of temperature', 'Common ion concept']
    },
    // SSS 2 Second Term
    {
      title: 'Organic Chemistry Introduction',
      description: 'Carbon compounds, catenation, and homologous series.',
      order: 21,
      subtopics: ['Carbon and its compounds', 'Catenation', 'Homologous series', 'Functional groups', 'IUPAC naming basics', 'Structural formulae', 'Isomerism']
    },
    {
      title: 'Hydrocarbons',
      description: 'Alkanes, alkenes, alkynes.',
      order: 22,
      subtopics: ['Alkanes', 'Alkenes', 'Alkynes', 'Properties', 'Preparation', 'Reactions', 'Uses']
    },
    {
      title: 'Petroleum and Petrochemicals',
      description: 'Crude oil, fractional distillation, and cracking.',
      order: 23,
      subtopics: ['Crude oil', 'Fractional distillation', 'Fractions and uses', 'Cracking', 'Octane number', 'Petrochemical products', 'Environmental effects']
    },
    {
      title: 'Alcohols and Ethers',
      description: 'Classification, nomenclature, and reactions.',
      order: 24,
      subtopics: ['Alcohol classification', 'Nomenclature', 'Preparation', 'Properties', 'Reactions', 'Uses']
    },
    {
      title: 'Carboxylic Acids and Esters',
      description: 'Structure, properties, and esterification.',
      order: 25,
      subtopics: ['Carboxylic acid structure', 'Properties', 'Reactions', 'Esters', 'Esterification', 'Uses of esters']
    },
    // SSS 2 Third Term
    {
      title: 'Chemical Kinetics',
      description: 'Rate of reaction, collision theory, and catalysts.',
      order: 26,
      subtopics: ['Rate of reaction', 'Collision theory', 'Factors affecting rate', 'Catalysts', 'Reaction profiles', 'Rate experiments']
    },
    {
      title: 'Chemical Equilibrium',
      description: "Reversible reactions and Le Chatelier's principle.",
      order: 27,
      subtopics: ['Reversible reactions', 'Dynamic equilibrium', "Le Chatelier's principle", 'Equilibrium constant concept', 'Applications']
    },
    {
      title: 'Redox Reactions',
      description: 'Oxidation, reduction, and balancing equations.',
      order: 28,
      subtopics: ['Oxidation and reduction', 'Oxidation numbers', 'Oxidizing and reducing agents', 'Balancing redox equations']
    },
    {
      title: 'Electrochemistry',
      description: "Electrolytes, electrolysis, and Faraday's laws.",
      order: 29,
      subtopics: ['Electrolytes', 'Electrolysis', 'Electrodes', 'Electrochemical cells', "Faraday's laws", 'Applications of electrolysis']
    },
    {
      title: 'Practical Chemistry (Volumetric Analysis)',
      description: 'Titration, qualitative analysis, and rate experiments.',
      order: 30,
      subtopics: ['Titration', 'Qualitative analysis', 'Organic tests', 'Rate experiments', 'Electrolysis', 'Data processing and error analysis']
    },
    // SSS 3 First Term
    {
      title: 'Nitrogen Compounds',
      description: 'Ammonia, preparation, properties, and fertilizers.',
      order: 31,
      subtopics: ['Ammonia', 'Laboratory preparation', 'Industrial production', 'Properties and uses', 'Nitrogen cycle', 'Fertilizers']
    },
    {
      title: 'Sulfur and Its Compounds',
      description: 'Occurrence, sulfur dioxide, and sulfuric acid.',
      order: 32,
      subtopics: ['Occurrence of sulfur', 'Hydrogen sulfide', 'Sulfur dioxide', 'Sulfuric acid', 'Properties and uses', 'Environmental effects']
    },
    {
      title: 'Halogens',
      description: 'Group 17 elements, chlorine, and hydrogen chloride.',
      order: 33,
      subtopics: ['Group 17 elements', 'Trends', 'Chlorine', 'Hydrogen chloride', 'Bleaching action', 'Uses and environmental concerns']
    },
    {
      title: 'Metals and Their Compounds',
      description: 'Extraction principles, iron, aluminium, copper.',
      order: 34,
      subtopics: ['Occurrence of metals', 'Extraction principles', 'Reactivity series', 'Iron extraction', 'Aluminium extraction', 'Copper and zinc', 'Alloys']
    },
    {
      title: 'Industrial Chemistry',
      description: 'Chemical industries, manufacturing, and cement.',
      order: 35,
      subtopics: ['Chemical industries', 'Raw materials', 'Manufacturing processes', 'Fertilizer industry', 'Cement', 'Glass', 'Soap and detergents']
    },
    // SSS 3 Second Term
    {
      title: 'Organic Chemistry II',
      description: 'Aldehydes, ketones, amines, and polymers.',
      order: 36,
      subtopics: ['Aldehydes', 'Ketones', 'Amines', 'Amides', 'Amino acids', 'Polymers', 'Addition and condensation polymerization']
    },
    {
      title: 'Biochemistry Basics',
      description: 'Carbohydrates, proteins, lipids, and enzymes.',
      order: 37,
      subtopics: ['Carbohydrates', 'Proteins', 'Lipids', 'Enzymes', 'Vitamins', 'Chemical tests for biomolecules']
    },
    {
      title: 'Environmental Chemistry',
      description: 'Pollution, acid rain, and sustainable chemistry.',
      order: 38,
      subtopics: ['Air pollution', 'Water pollution', 'Acid rain', 'Greenhouse gases', 'Ozone depletion', 'Waste management', 'Sustainable chemistry']
    },
    {
      title: 'Nuclear Chemistry',
      description: 'Radioactivity, half-life, fission, and fusion.',
      order: 39,
      subtopics: ['Radioactivity', 'Types of radiation', 'Radioactive decay', 'Half-life', 'Nuclear fission', 'Nuclear fusion', 'Applications and safety']
    },
    {
      title: 'Analytical Chemistry',
      description: 'Qualitative analysis, cation and anion tests.',
      order: 40,
      subtopics: ['Qualitative analysis', 'Cation tests', 'Anion tests', 'Flame tests', 'Gas tests', 'Purity and identification']
    },
    // SSS 3 Third Term
    {
      title: 'Chemistry Revision',
      description: 'Revision of atomic structure, periodicity, bonding, etc.',
      order: 41,
      subtopics: ['Atomic structure', 'Periodicity', 'Bonding', 'Mole concept', 'Acids and bases', 'Organic chemistry', 'Kinetics', 'Equilibrium', 'Electrochemistry', 'Industrial chemistry']
    },
    {
      title: 'Practical Examination Preparation',
      description: 'Titration, gas tests, and organic identification.',
      order: 42,
      subtopics: ['Qualitative analysis', 'Titration', 'Organic identification', 'Gas tests', 'Separation techniques', 'Observation and inference', 'Calculations and graphs']
    },
    {
      title: 'WASSCE/NECO Practice',
      description: 'Objective, theory, and practical questions.',
      order: 43,
      subtopics: ['Objective questions', 'Theory calculations', 'Structured questions', 'Practical questions', 'Past questions by topic', 'Timed mock examinations', 'Error correction and final revision']
    }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting Chemistry seeding process...");
    
    // Get subject_id
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [chemistrySyllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${chemistrySyllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    // Create Syllabus
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [
        subjectId,
        chemistrySyllabus.exam,
        chemistrySyllabus.syllabus_year,
        chemistrySyllabus.title,
        chemistrySyllabus.description
      ]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${chemistrySyllabus.title}`);

    // Link syllabus to all active exams
    const examsRes = await pool.query('SELECT id FROM exams WHERE is_active = TRUE');
    for (const exam of examsRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, exam.id]
      );
    }
    console.log(`Linked Syllabus to ${examsRes.rows.length} exams.`);

    for (const topic of chemistrySyllabus.topics) {
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

    console.log("Chemistry Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
