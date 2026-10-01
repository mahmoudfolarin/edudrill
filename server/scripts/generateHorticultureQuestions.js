require('dotenv').config();
const pool = require('../src/config/database');

const horticultureQuestions = [
  {
    qText: "Horticulture is the branch of agriculture that deals primarily with:",
    optA: "Rearing of livestock",
    optB: "Cultivation of fruits, vegetables, and ornamental plants",
    optC: "Large-scale grain farming",
    optD: "Fish farming",
    correctAnswer: "B"
  },
  {
    qText: "The study and cultivation of fruits and nuts is called:",
    optA: "Olericulture",
    optB: "Pomology",
    optC: "Floriculture",
    optD: "Silviculture",
    correctAnswer: "B"
  },
  {
    qText: "The cultivation of vegetables for the market is known as:",
    optA: "Floriculture",
    optB: "Olericulture",
    optC: "Pomology",
    optD: "Agronomy",
    correctAnswer: "B"
  },
  {
    qText: "Floriculture is the branch of horticulture concerned with:",
    optA: "Growing trees for timber",
    optB: "Cultivation of flowering and ornamental plants",
    optC: "Breeding fish",
    optD: "Managing greenhouse temperatures",
    correctAnswer: "B"
  },
  {
    qText: "Which type of soil has the highest water retention capacity?",
    optA: "Sandy soil",
    optB: "Loamy soil",
    optC: "Clayey soil",
    optD: "Gravel",
    correctAnswer: "C"
  },
  {
    qText: "The best type of soil for general crop production is:",
    optA: "Clay",
    optB: "Sand",
    optC: "Loam",
    optD: "Silt",
    correctAnswer: "C"
  },
  {
    qText: "Loamy soil is ideal for agriculture because it:",
    optA: "Is completely dry",
    optB: "Holds too much water and drowns roots",
    optC: "Has a balanced mixture of sand, silt, clay, and organic matter",
    optD: "Is composed only of large rock particles",
    correctAnswer: "C"
  },
  {
    qText: "The practice of breaking up and turning over the soil before planting is called:",
    optA: "Weeding",
    optB: "Tillage",
    optC: "Harvesting",
    optD: "Irrigation",
    correctAnswer: "B"
  },
  {
    qText: "The primary purpose of a plough is to:",
    optA: "Harvest grains",
    optB: "Cut, lift, and turn over the soil",
    optC: "Apply fertilizer",
    optD: "Spray pesticides",
    correctAnswer: "B"
  },
  {
    qText: "A harrow is an agricultural implement used mainly to:",
    optA: "Break up large clods of soil into a finer tilth",
    optB: "Dig deep trenches for irrigation",
    optC: "Cut down mature trees",
    optD: "Plant seeds automatically",
    correctAnswer: "A"
  },
  {
    qText: "Propagation of plants by seeds is also known as:",
    optA: "Vegetative propagation",
    optB: "Sexual propagation",
    optC: "Cloning",
    optD: "Grafting",
    correctAnswer: "B"
  },
  {
    qText: "Vegetative (asexual) propagation involves growing new plants from:",
    optA: "Seeds only",
    optB: "Spores",
    optC: "Vegetative parts like stems, roots, or leaves",
    optD: "Pollen grains",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a method of vegetative propagation?",
    optA: "Sowing",
    optB: "Broadcasting",
    optC: "Grafting",
    optD: "Drilling",
    correctAnswer: "C"
  },
  {
    qText: "In grafting, the rooted plant onto which the new shoot is attached is called the:",
    optA: "Scion",
    optB: "Stock (or Rootstock)",
    optC: "Bud",
    optD: "Layer",
    correctAnswer: "B"
  },
  {
    qText: "In grafting, the shoot or bud that is attached to the rootstock is called the:",
    optA: "Scion",
    optB: "Stock",
    optC: "Cambium",
    optD: "Node",
    correctAnswer: "A"
  },
  {
    qText: "A vegetative propagation method where a stem is induced to root while still attached to the parent plant is:",
    optA: "Cutting",
    optB: "Layering",
    optC: "Grafting",
    optD: "Budding",
    correctAnswer: "B"
  },
  {
    qText: "Cassava is mostly propagated by:",
    optA: "Seeds",
    optB: "Stem cuttings",
    optC: "Root tubers",
    optD: "Leaves",
    correctAnswer: "B"
  },
  {
    qText: "Yam is primarily propagated using:",
    optA: "Stem cuttings",
    optB: "Seeds",
    optC: "Seed yams (tubers) or yam setts",
    optD: "Leaves",
    correctAnswer: "C"
  },
  {
    qText: "The process of supplying water artificially to crops when rainfall is insufficient is called:",
    optA: "Drainage",
    optB: "Irrigation",
    optC: "Mulching",
    optD: "Transpiration",
    correctAnswer: "B"
  },
  {
    qText: "Which method of irrigation applies water slowly directly to the roots of plants using pipes and emitters?",
    optA: "Sprinkler irrigation",
    optB: "Flood irrigation",
    optC: "Drip irrigation",
    optD: "Basin irrigation",
    correctAnswer: "C"
  },
  {
    qText: "Mulching is the practice of:",
    optA: "Burning the field before planting",
    optB: "Covering the soil surface with materials (dry grass, plastic) to conserve moisture and suppress weeds",
    optC: "Removing all plants from an area",
    optD: "Spraying herbicides on crops",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a major macronutrient required by plants in large quantities?",
    optA: "Iron",
    optB: "Nitrogen",
    optC: "Zinc",
    optD: "Copper",
    correctAnswer: "B"
  },
  {
    qText: "NPK fertilizer stands for:",
    optA: "Nitrogen, Phosphorus, Potassium",
    optB: "Nitrogen, Potassium, Krypton",
    optC: "Neon, Phosphorus, Potassium",
    optD: "Nitrates, Phosphates, Kaolin",
    correctAnswer: "A"
  },
  {
    qText: "The application of fertilizer by spreading it uniformly over the entire field is known as:",
    optA: "Band placement",
    optB: "Broadcasting",
    optC: "Foliar application",
    optD: "Top dressing",
    correctAnswer: "B"
  },
  {
    qText: "Applying fertilizer directly to the leaves of the plant in liquid form is called:",
    optA: "Broadcasting",
    optB: "Foliar application",
    optC: "Ring placement",
    optD: "Side dressing",
    correctAnswer: "B"
  },
  {
    qText: "Any plant growing where it is not wanted is referred to as a:",
    optA: "Herb",
    optB: "Weed",
    optC: "Shrub",
    optD: "Forage",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a common method of cultural weed control?",
    optA: "Spraying herbicides",
    optB: "Crop rotation and mulching",
    optC: "Using a hoe or cutlass",
    optD: "Introducing predator insects",
    correctAnswer: "B"
  },
  {
    qText: "Chemicals used specifically to kill or control weeds are called:",
    optA: "Fungicides",
    optB: "Insecticides",
    optC: "Herbicides",
    optD: "Nematicides",
    correctAnswer: "C"
  },
  {
    qText: "A biological method of pest control involves:",
    optA: "Using toxic chemicals to kill pests",
    optB: "Using natural enemies (predators or parasites) to control pest populations",
    optC: "Removing pests by hand",
    optD: "Changing the time of planting",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is an example of a field pest of crops?",
    optA: "Weevil",
    optB: "Locust",
    optC: "Termite",
    optD: "Earthworm",
    correctAnswer: "B"
  },
  {
    qText: "A pest that attacks stored agricultural produce is known as a:",
    optA: "Storage pest",
    optB: "Field pest",
    optC: "Vector",
    optD: "Predator",
    correctAnswer: "A"
  },
  {
    qText: "The bean weevil is primarily a:",
    optA: "Field pest",
    optB: "Storage pest",
    optC: "Soil pest",
    optD: "Beneficial insect",
    correctAnswer: "B"
  },
  {
    qText: "Crop rotation helps in agriculture mainly by:",
    optA: "Increasing the speed of harvesting",
    optB: "Breaking the life cycle of pests and diseases and maintaining soil fertility",
    optC: "Reducing the need for sunlight",
    optD: "Eliminating the need for any water",
    correctAnswer: "B"
  },
  {
    qText: "A system of farming where trees and crops are grown together on the same piece of land is called:",
    optA: "Monoculture",
    optB: "Agroforestry (or Taungya system)",
    optC: "Mixed farming",
    optD: "Pastoral farming",
    correctAnswer: "B"
  },
  {
    qText: "Growing only one type of crop on a piece of land year after year is called:",
    optA: "Mixed cropping",
    optB: "Monocropping (Monoculture)",
    optC: "Crop rotation",
    optD: "Intercropping",
    correctAnswer: "B"
  },
  {
    qText: "The practice of rearing animals and growing crops on the same farm is called:",
    optA: "Mixed farming",
    optB: "Mixed cropping",
    optC: "Agroforestry",
    optD: "Nomadic farming",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following describes 'thinning' in crop production?",
    optA: "Adding water to the soil",
    optB: "Removing weak or excess seedlings to allow space for healthy ones to grow",
    optC: "Applying fertilizer to weak plants",
    optD: "Harvesting the mature crops",
    correctAnswer: "B"
  },
  {
    qText: "The process of removing soil from around the base of a plant to expose the roots is called:",
    optA: "Earthing up",
    optB: "Weeding",
    optC: "Trenching",
    optD: "De-suckering",
    correctAnswer: "C"
  },
  {
    qText: "The practice of gathering soil around the base of a crop (like maize or yam) to support it and prevent lodging is:",
    optA: "Mulching",
    optB: "Earthing up",
    optC: "Pruning",
    optD: "Thinning",
    correctAnswer: "B"
  },
  {
    qText: "Pruning in horticulture refers to:",
    optA: "Planting seeds in a nursery",
    optB: "Removing dead, diseased, or excess branches to improve plant shape and fruit yield",
    optC: "Harvesting fruits before they are ripe",
    optD: "Applying pesticides to the leaves",
    correctAnswer: "B"
  },
  {
    qText: "A small piece of land or structure where seeds are sown and raised into seedlings before transplanting is a:",
    optA: "Silo",
    optB: "Nursery",
    optC: "Barn",
    optD: "Orchard",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following crops is typically started in a nursery before transplanting?",
    optA: "Maize",
    optB: "Yam",
    optC: "Tomato",
    optD: "Cassava",
    correctAnswer: "C"
  },
  {
    qText: "The gradual exposure of seedlings to sunlight and outdoor conditions before transplanting is called:",
    optA: "Hardening off",
    optB: "Pruning",
    optC: "Grafting",
    optD: "Mulching",
    correctAnswer: "A"
  },
  {
    qText: "An enclosed structure made of glass or plastic used for growing plants under controlled environmental conditions is a:",
    optA: "Silo",
    optB: "Barn",
    optC: "Greenhouse",
    optD: "Warehouse",
    correctAnswer: "C"
  },
  {
    qText: "The loss of water vapor from the aerial parts of a plant, mostly through the stomata, is called:",
    optA: "Evaporation",
    optB: "Transpiration",
    optC: "Respiration",
    optD: "Photosynthesis",
    correctAnswer: "B"
  },
  {
    qText: "The process by which green plants manufacture their food using sunlight, water, and carbon dioxide is:",
    optA: "Transpiration",
    optB: "Respiration",
    optC: "Photosynthesis",
    optD: "Germination",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a leguminous crop?",
    optA: "Maize",
    optB: "Rice",
    optC: "Cowpea (Beans)",
    optD: "Cassava",
    correctAnswer: "C"
  },
  {
    qText: "Leguminous crops are important in agriculture because they:",
    optA: "Require no water to grow",
    optB: "Fix atmospheric nitrogen into the soil, improving fertility",
    optC: "Produce poisonous toxins that kill all pests",
    optD: "Can grow in the dark",
    correctAnswer: "B"
  },
  {
    qText: "Which structure in leguminous plants houses the nitrogen-fixing bacteria?",
    optA: "Leaves",
    optB: "Root nodules",
    optC: "Stems",
    optD: "Flowers",
    correctAnswer: "B"
  },
  {
    qText: "Cocoa, oil palm, and rubber are classified as:",
    optA: "Cereals",
    optB: "Legumes",
    optC: "Root crops",
    optD: "Tree (or Plantation) crops",
    correctAnswer: "D"
  }
];

async function main() {
  const subjectSlug = 'horticulture-and-crop-production';
  const subjectGroup = 'Vocational';
  const subjectName = 'Horticulture and Crop Production';

  try {
    let subjectId;
    const subRes = await pool.query('SELECT id FROM subjects WHERE slug = $1', [subjectSlug]);
    if (subRes.rows.length > 0) {
      subjectId = subRes.rows[0].id;
    } else {
      const insRes = await pool.query('INSERT INTO subjects (name, slug, subject_group) VALUES ($1, $2, $3) RETURNING id', [subjectName, subjectSlug, subjectGroup]);
      subjectId = insRes.rows[0].id;
    }

    const exams = ['WAEC', 'NECO', 'JAMB', 'GCE'];
    let inserted = 0;

    for (const q of horticultureQuestions) {
      for (const e of exams) {
        const qCheck = await pool.query('SELECT id FROM questions WHERE subject_id = $1 AND exam = $2 AND LEFT(question_text, 50) = LEFT($3, 50)', [subjectId, e, q.qText]);
        if (qCheck.rows.length > 0) continue;

        await pool.query(
          `INSERT INTO questions (
            exam, year, subject_id, question_text, 
            option_a, option_b, option_c, option_d, correct_answer, 
            difficulty, marks, source_type, license_status, is_active,
            verification_status, explanation
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
          [
            e, 2025, subjectId, q.qText,
            q.optA, q.optB, q.optC, q.optD, q.correctAnswer,
            'medium', 1, 'past_question', 'public_domain', true,
            'verified', null
          ]
        );
        inserted++;
      }
    }
    console.log(`Inserted ${inserted} generated question rows for ${subjectName} across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
