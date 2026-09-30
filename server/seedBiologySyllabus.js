require('dotenv').config();
const pool = require('./src/config/database');

const bioSyllabus = {
  exam: 'WAEC',
  subject: 'biology',
  syllabus_year: '2026/2027',
  title: 'Biology Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Introduction to Biology',
      description: 'Meaning, scope, and branches of biology.',
      order: 1,
      subtopics: ['Meaning and scope of biology', 'Branches of biology', 'Importance of biology', 'Biology and everyday life', 'Scientific method and laboratory safety']
    },
    {
      title: 'Characteristics of Living Things',
      description: 'Nutrition, respiration, and movement.',
      order: 2,
      subtopics: ['Nutrition', 'Respiration', 'Movement', 'Sensitivity', 'Growth', 'Reproduction', 'Excretion', 'Adaptation']
    },
    {
      title: 'Classification of Living Organisms',
      description: 'Taxonomic hierarchy and binomial nomenclature.',
      order: 3,
      subtopics: ['Need for classification', 'Taxonomic hierarchy', 'Binomial nomenclature', 'Five-kingdom classification', 'Major groups of plants and animals', 'Use of identification keys']
    },
    {
      title: 'Cell Structure and Organization',
      description: 'Prokaryotic, eukaryotic cells, and organelles.',
      order: 4,
      subtopics: ['Cell theory', 'Prokaryotic and eukaryotic cells', 'Plant and animal cells', 'Cell organelles and functions', 'Microscopy', 'Cell specialization']
    },
    {
      title: 'Levels of Organization',
      description: 'Cell, tissue, organ, system.',
      order: 5,
      subtopics: ['Cell', 'Tissue', 'Organ', 'System', 'Organism', 'Examples in plants and animals']
    },
    {
      title: 'Biological Molecules',
      description: 'Carbohydrates, proteins, and lipids.',
      order: 6,
      subtopics: ['Carbohydrates', 'Proteins', 'Lipids', 'Water and mineral salts', 'Food tests', 'Importance of biomolecules']
    },
    // SSS 1 Second Term
    {
      title: 'Cell Division',
      description: 'Mitosis and meiosis.',
      order: 7,
      subtopics: ['Chromosomes', 'Cell cycle', 'Mitosis', 'Stages and significance of mitosis', 'Meiosis', 'Stages and significance of meiosis']
    },
    {
      title: 'Movement of Substances',
      description: 'Diffusion, osmosis, and active transport.',
      order: 8,
      subtopics: ['Diffusion', 'Osmosis', 'Active transport', 'Factors affecting movement', 'Applications in living organisms']
    },
    {
      title: 'Nutrition in Plants',
      description: 'Photosynthesis and autotrophic nutrition.',
      order: 9,
      subtopics: ['Autotrophic nutrition', 'Photosynthesis', 'Chlorophyll and light', 'Raw materials', 'Factors affecting photosynthesis', 'Mineral nutrition', 'Deficiency symptoms']
    },
    {
      title: 'Nutrition in Animals',
      description: 'Digestive system and absorption.',
      order: 10,
      subtopics: ['Types of nutrition', 'Digestive system', 'Mechanical and chemical digestion', 'Digestive enzymes', 'Absorption', 'Assimilation', 'Balanced diet']
    },
    {
      title: 'Respiration',
      description: 'Aerobic and anaerobic respiration.',
      order: 11,
      subtopics: ['Aerobic respiration', 'Anaerobic respiration', 'Stages of respiration', 'Energy release', 'Respiration in plants and animals']
    },
    // SSS 1 Third Term
    {
      title: 'Transport in Plants',
      description: 'Xylem, phloem, and transpiration.',
      order: 12,
      subtopics: ['Need for transport', 'Xylem', 'Phloem', 'Transpiration', 'Factors affecting transpiration', 'Translocation', 'Water uptake']
    },
    {
      title: 'Transport in Animals',
      description: 'Blood, heart structure, and circulation.',
      order: 13,
      subtopics: ['Blood', 'Blood cells', 'Blood groups', 'Blood vessels', 'Heart structure', 'Cardiac cycle', 'Circulation', 'Lymph']
    },
    {
      title: 'Excretion',
      description: 'Human excretory organs and urine formation.',
      order: 14,
      subtopics: ['Meaning of excretion', 'Excretory products', 'Human excretory organs', 'Kidney structure and function', 'Urine formation', 'Plant excretion']
    },
    {
      title: 'Homeostasis',
      description: 'Temperature regulation and osmoregulation.',
      order: 15,
      subtopics: ['Meaning of homeostasis', 'Temperature regulation', 'Water balance', 'Osmoregulation', 'Blood glucose regulation']
    },
    {
      title: 'Practical Biology (SSS 1)',
      description: 'Microscope use and food tests.',
      order: 16,
      subtopics: ['Microscope use', 'Biological drawings', 'Food tests', 'Cell observation', 'Osmosis experiments', 'Specimen identification']
    },
    // SSS 2 First Term
    {
      title: 'Support and Movement',
      description: 'Skeleton, joints, and muscles.',
      order: 17,
      subtopics: ['Skeleton', 'Types of skeleton', 'Joints', 'Muscles', 'Antagonistic muscles', 'Support in plants', 'Tropisms']
    },
    {
      title: 'Coordination and Control',
      description: 'Nervous system and hormonal coordination.',
      order: 18,
      subtopics: ['Nervous system', 'Neurons', 'Reflex actions', 'Brain and spinal cord', 'Sense organs', 'Hormonal coordination', 'Endocrine glands']
    },
    {
      title: 'Sense Organs',
      description: 'Eye and ear structure.',
      order: 19,
      subtopics: ['Eye structure', 'Vision', 'Eye defects and correction', 'Ear structure', 'Hearing and balance', 'Skin receptors', 'Taste and smell']
    },
    {
      title: 'Reproduction in Plants',
      description: 'Flower structure, pollination, and fertilization.',
      order: 20,
      subtopics: ['Asexual reproduction', 'Sexual reproduction', 'Flower structure', 'Pollination', 'Fertilization', 'Seed and fruit formation', 'Seed dispersal']
    },
    {
      title: 'Reproduction in Animals',
      description: 'Male and female reproductive systems.',
      order: 21,
      subtopics: ['Male reproductive system', 'Female reproductive system', 'Gametogenesis', 'Menstrual cycle', 'Fertilization', 'Pregnancy', 'Birth']
    },
    // SSS 2 Second Term
    {
      title: 'Growth and Development',
      description: 'Growth patterns and measurements.',
      order: 22,
      subtopics: ['Meaning of growth', 'Growth patterns', 'Plant growth', 'Animal growth', 'Growth measurements', 'Factors affecting growth']
    },
    {
      title: 'Genetics',
      description: 'Heredity, variation, genes and chromosomes.',
      order: 23,
      subtopics: ['Heredity', 'Variation', 'Genes and chromosomes', 'Alleles', 'Dominant and recessive traits', 'Genotype and phenotype']
    },
    {
      title: 'Mendelian Genetics',
      description: "Mendel's experiments and inheritance.",
      order: 24,
      subtopics: ["Mendel's experiments", 'Monohybrid inheritance', 'Dihybrid inheritance', 'Probability in genetics', 'Pedigree interpretation']
    },
    {
      title: 'Variation',
      description: 'Continuous and discontinuous variation.',
      order: 25,
      subtopics: ['Continuous variation', 'Discontinuous variation', 'Causes of variation', 'Environmental variation', 'Genetic variation', 'Importance of variation']
    },
    {
      title: 'Evolution',
      description: 'Natural selection and adaptation.',
      order: 26,
      subtopics: ['Evidence for evolution', 'Natural selection', 'Adaptation', 'Speciation', 'Human evolution overview']
    },
    // SSS 2 Third Term
    {
      title: 'Ecology',
      description: 'Habitat, population, and ecosystems.',
      order: 27,
      subtopics: ['Meaning of ecology', 'Habitat', 'Population', 'Community', 'Ecosystem', 'Biotic and abiotic factors']
    },
    {
      title: 'Food Relationships',
      description: 'Food chains, webs, and trophic levels.',
      order: 28,
      subtopics: ['Food chains', 'Food webs', 'Trophic levels', 'Energy flow', 'Ecological pyramids', 'Nutrient cycles']
    },
    {
      title: 'Population Studies',
      description: 'Density, distribution, and growth.',
      order: 29,
      subtopics: ['Population density', 'Population distribution', 'Population growth', 'Competition', 'Predation', 'Carrying capacity']
    },
    {
      title: 'Environmental Factors',
      description: 'Light, temperature, water, and soil.',
      order: 30,
      subtopics: ['Light', 'Temperature', 'Water', 'Soil', 'pH', 'Humidity', 'Effects on organisms']
    },
    {
      title: 'Practical Ecology',
      description: 'Sampling and transect methods.',
      order: 31,
      subtopics: ['Quadrat sampling', 'Transect methods', 'Population estimates', 'Abiotic measurements', 'Field observation', 'Data presentation']
    },
    // SSS 3 First Term
    {
      title: 'Advanced Genetics',
      description: 'Chromosome structure, DNA, and RNA.',
      order: 32,
      subtopics: ['Chromosome structure', 'DNA and RNA', 'DNA replication', 'Genetic code', 'Protein synthesis', 'Mutation', 'Genetic disorders']
    },
    {
      title: 'Biotechnology',
      description: 'Selective breeding, cloning, and engineering.',
      order: 33,
      subtopics: ['Meaning of biotechnology', 'Selective breeding', 'Tissue culture', 'Genetic engineering', 'Cloning', 'Applications and ethical considerations']
    },
    {
      title: 'Evolution and Adaptation',
      description: 'Evidence from fossils and comparative anatomy.',
      order: 34,
      subtopics: ['Natural selection', 'Variation and selection', 'Adaptation', 'Speciation', 'Evidence from fossils', 'Comparative anatomy', 'Evolutionary relationships']
    },
    {
      title: 'Ecology and Conservation',
      description: 'Biodiversity, pollution, and climate change.',
      order: 35,
      subtopics: ['Biodiversity', 'Conservation', 'Natural resources', 'Deforestation', 'Pollution', 'Climate change', 'Sustainable development']
    },
    {
      title: 'Microorganisms',
      description: 'Bacteria, viruses, and fungi.',
      order: 36,
      subtopics: ['Bacteria', 'Viruses', 'Fungi', 'Protozoa', 'Useful microorganisms', 'Pathogenic microorganisms', 'Disease transmission']
    },
    // SSS 3 Second Term
    {
      title: 'Disease and Body Defence',
      description: 'Pathogens, immunity, and vaccination.',
      order: 37,
      subtopics: ['Pathogens', 'Infectious diseases', 'Transmission', 'Body barriers', 'Immune response', 'Antibodies', 'Vaccination', 'Disease prevention']
    },
    {
      title: 'Plant Physiology',
      description: 'Photosynthesis, hormones, and dormancy.',
      order: 38,
      subtopics: ['Photosynthesis', 'Transpiration', 'Mineral uptake', 'Translocation', 'Plant hormones', 'Tropisms', 'Seed dormancy and germination']
    },
    {
      title: 'Animal Physiology',
      description: 'Digestion, respiration, and circulation.',
      order: 39,
      subtopics: ['Digestion', 'Respiration', 'Circulation', 'Excretion', 'Coordination', 'Homeostasis', 'Hormonal regulation']
    },
    {
      title: 'Reproductive Health',
      description: 'Reproductive systems, pregnancy, and birth.',
      order: 40,
      subtopics: ['Reproductive systems', 'Fertilization', 'Pregnancy', 'Birth', 'Family planning concepts', 'Sexually transmitted infections', 'Health and prevention']
    },
    {
      title: 'Practical Biology (Revision)',
      description: 'Specimen identification and biological drawings.',
      order: 41,
      subtopics: ['Specimen identification', 'Microscopy', 'Biological drawings', 'Genetics problems', 'Ecological sampling', 'Experimental design', 'Data analysis']
    },
    // SSS 3 Third Term
    {
      title: 'Biology Examination Revision',
      description: 'Cell biology, nutrition, transport, etc.',
      order: 42,
      subtopics: ['Cell biology', 'Nutrition', 'Transport', 'Respiration', 'Excretion', 'Coordination', 'Reproduction', 'Genetics', 'Ecology', 'Evolution']
    },
    {
      title: 'Practical Examination Preparation',
      description: 'Microscope work and food tests.',
      order: 43,
      subtopics: ['Specimen identification', 'Microscope work', 'Food tests', 'Osmosis and diffusion', 'Ecological specimens', 'Biological drawings', 'Data interpretation']
    },
    {
      title: 'WASSCE/NECO Practice',
      description: 'Objective, theory, and practical questions.',
      order: 44,
      subtopics: ['Objective questions', 'Structured theory questions', 'Practical questions', 'Past questions by topic', 'Timed mock examinations', 'Error correction and final revision']
    }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting Biology seeding process...");
    
    // Get subject_id
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [bioSyllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${bioSyllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    // Create Syllabus
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [
        subjectId,
        bioSyllabus.exam,
        bioSyllabus.syllabus_year,
        bioSyllabus.title,
        bioSyllabus.description
      ]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${bioSyllabus.title}`);

    // Link syllabus to exam
    const examRes = await pool.query('SELECT id FROM exams WHERE slug = $1', ['waec']);
    if (examRes.rows.length > 0) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, examRes.rows[0].id]
      );
    }

    for (const topic of bioSyllabus.topics) {
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

    console.log("Biology Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
