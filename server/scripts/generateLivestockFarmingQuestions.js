require('dotenv').config();
const pool = require('../src/config/database');

const livestockQuestions = [
  {
    qText: "Livestock farming refers primarily to the:",
    optA: "Cultivation of crops",
    optB: "Rearing of animals for food and other human uses",
    optC: "Processing of agricultural raw materials",
    optD: "Hunting of wild animals",
    correctAnswer: "B"
  },
  {
    qText: "Animals that have a complex four-compartment stomach are known as:",
    optA: "Monogastrics",
    optB: "Poultry",
    optC: "Ruminants",
    optD: "Carnivores",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is NOT a ruminant?",
    optA: "Cattle",
    optB: "Sheep",
    optC: "Goat",
    optD: "Pig",
    correctAnswer: "D"
  },
  {
    qText: "The four compartments of a ruminant stomach are the rumen, reticulum, omasum, and:",
    optA: "Abomasum",
    optB: "Gizzard",
    optC: "Crop",
    optD: "Cecum",
    correctAnswer: "A"
  },
  {
    qText: "Which compartment is considered the 'true stomach' in ruminants?",
    optA: "Rumen",
    optB: "Reticulum",
    optC: "Omasum",
    optD: "Abomasum",
    correctAnswer: "D"
  },
  {
    qText: "Animals with a simple, single-chambered stomach are called:",
    optA: "Ruminants",
    optB: "Monogastrics",
    optC: "Herbivores",
    optD: "Marsupials",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is an example of a monogastric animal?",
    optA: "Sheep",
    optB: "Cattle",
    optC: "Pig",
    optD: "Goat",
    correctAnswer: "C"
  },
  {
    qText: "The organ in poultry responsible for grinding up food is the:",
    optA: "Crop",
    optB: "Gizzard",
    optC: "Proventriculus",
    optD: "Cloaca",
    correctAnswer: "B"
  },
  {
    qText: "In poultry, the temporary storage pouch for food in the esophagus is called the:",
    optA: "Gizzard",
    optB: "Cecum",
    optC: "Crop",
    optD: "Liver",
    correctAnswer: "C"
  },
  {
    qText: "A mature male cattle used for breeding is called a:",
    optA: "Cow",
    optB: "Bull",
    optC: "Steer",
    optD: "Heifer",
    correctAnswer: "B"
  },
  {
    qText: "A castrated male cattle is known as a:",
    optA: "Bull",
    optB: "Heifer",
    optC: "Steer",
    optD: "Calf",
    correctAnswer: "C"
  },
  {
    qText: "A young female cattle that has not yet had a calf is called a:",
    optA: "Cow",
    optB: "Heifer",
    optC: "Ewe",
    optD: "Doe",
    correctAnswer: "B"
  },
  {
    qText: "The act of giving birth in cattle is called:",
    optA: "Farrowing",
    optB: "Kidding",
    optC: "Calving",
    optD: "Lambing",
    correctAnswer: "C"
  },
  {
    qText: "A mature male sheep is called a:",
    optA: "Ram",
    optB: "Ewe",
    optC: "Wether",
    optD: "Buck",
    correctAnswer: "A"
  },
  {
    qText: "A mature female sheep is called a:",
    optA: "Doe",
    optB: "Cow",
    optC: "Ewe",
    optD: "Sow",
    correctAnswer: "C"
  },
  {
    qText: "The act of giving birth in sheep is called:",
    optA: "Calving",
    optB: "Farrowing",
    optC: "Kidding",
    optD: "Lambing",
    correctAnswer: "D"
  },
  {
    qText: "A mature male goat is called a:",
    optA: "Ram",
    optB: "Buck (or Billy)",
    optC: "Boar",
    optD: "Wether",
    correctAnswer: "B"
  },
  {
    qText: "A mature female goat is called a:",
    optA: "Ewe",
    optB: "Doe (or Nanny)",
    optC: "Sow",
    optD: "Hen",
    correctAnswer: "B"
  },
  {
    qText: "The act of giving birth in goats is called:",
    optA: "Kidding",
    optB: "Lambing",
    optC: "Calving",
    optD: "Farrowing",
    correctAnswer: "A"
  },
  {
    qText: "A mature male pig is called a:",
    optA: "Barrow",
    optB: "Boar",
    optC: "Sow",
    optD: "Gilt",
    correctAnswer: "B"
  },
  {
    qText: "A mature female pig that has reproduced is called a:",
    optA: "Sow",
    optB: "Gilt",
    optC: "Ewe",
    optD: "Doe",
    correctAnswer: "A"
  },
  {
    qText: "The act of giving birth in pigs is called:",
    optA: "Calving",
    optB: "Kidding",
    optC: "Farrowing",
    optD: "Lambing",
    correctAnswer: "C"
  },
  {
    qText: "Poultry kept primarily for meat production are called:",
    optA: "Layers",
    optB: "Broilers",
    optC: "Cockerels",
    optD: "Pullets",
    correctAnswer: "B"
  },
  {
    qText: "Poultry kept primarily for egg production are called:",
    optA: "Broilers",
    optB: "Capons",
    optC: "Layers",
    optD: "Turkeys",
    correctAnswer: "C"
  },
  {
    qText: "A young female chicken that has not yet started laying eggs is a:",
    optA: "Hen",
    optB: "Pullet",
    optC: "Cockerel",
    optD: "Broiler",
    correctAnswer: "B"
  },
  {
    qText: "The removal of the testicles from a male animal is known as:",
    optA: "Dehorning",
    optB: "Castration",
    optC: "Docking",
    optD: "Culling",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a primary reason for castrating farm animals?",
    optA: "To increase their aggression",
    optB: "To prevent indiscriminate mating and improve meat quality",
    optC: "To make them run faster",
    optD: "To increase milk production",
    correctAnswer: "B"
  },
  {
    qText: "The practice of removing unproductive or sick animals from a herd/flock is called:",
    optA: "Culling",
    optB: "Weaning",
    optC: "Docking",
    optD: "Castration",
    correctAnswer: "A"
  },
  {
    qText: "The separation of young animals from their mothers so they stop feeding on milk is called:",
    optA: "Culling",
    optB: "Fostering",
    optC: "Weaning",
    optD: "Gestation",
    correctAnswer: "C"
  },
  {
    qText: "The period of pregnancy in livestock is called the:",
    optA: "Lactation period",
    optB: "Gestation period",
    optC: "Incubation period",
    optD: "Weaning period",
    correctAnswer: "B"
  },
  {
    qText: "The average gestation period of a cow is approximately:",
    optA: "114 days",
    optB: "150 days",
    optC: "283 days (9 months)",
    optD: "340 days",
    correctAnswer: "C"
  },
  {
    qText: "The average gestation period of a sow (pig) is roughly:",
    optA: "114 days (3 months, 3 weeks, 3 days)",
    optB: "150 days",
    optC: "283 days",
    optD: "340 days",
    correctAnswer: "A"
  },
  {
    qText: "The period when a female animal produces milk is called:",
    optA: "Gestation",
    optB: "Lactation",
    optC: "Incubation",
    optD: "Ovulation",
    correctAnswer: "B"
  },
  {
    qText: "The first milk produced by a mother immediately after giving birth, which contains antibodies, is called:",
    optA: "Pasteurized milk",
    optB: "Colostrum",
    optC: "Skimmed milk",
    optD: "Whey",
    correctAnswer: "B"
  },
  {
    qText: "Which nutrient is the most critical for building and repairing body tissues in animals?",
    optA: "Carbohydrates",
    optB: "Fats",
    optC: "Proteins",
    optD: "Vitamins",
    correctAnswer: "C"
  },
  {
    qText: "Which feed ingredient is primarily used as an energy source in poultry diets?",
    optA: "Fish meal",
    optB: "Maize (Corn)",
    optC: "Bone meal",
    optD: "Oyster shell",
    correctAnswer: "B"
  },
  {
    qText: "Which feed ingredient is a primary source of calcium for layers to produce strong eggshells?",
    optA: "Maize",
    optB: "Oyster shell / Bone meal",
    optC: "Soybean meal",
    optD: "Blood meal",
    correctAnswer: "B"
  },
  {
    qText: "Succulent plant materials (like grasses and legumes) grazed by livestock are called:",
    optA: "Concentrates",
    optB: "Forages / Roughages",
    optC: "Supplements",
    optD: "Additives",
    correctAnswer: "B"
  },
  {
    qText: "Silage is a type of animal feed produced by:",
    optA: "Drying grass in the sun",
    optB: "Fermenting green forage under anaerobic conditions",
    optC: "Grinding dry maize",
    optD: "Mixing blood meal and bone meal",
    correctAnswer: "B"
  },
  {
    qText: "Dried forage preserved for feeding animals during the dry season is called:",
    optA: "Silage",
    optB: "Hay",
    optC: "Concentrate",
    optD: "Pellets",
    correctAnswer: "B"
  },
  {
    qText: "A disease causing blisters on the mouth and hooves of cattle, sheep, and pigs is:",
    optA: "Newcastle disease",
    optB: "Foot-and-Mouth Disease (FMD)",
    optC: "Avian Influenza",
    optD: "Trypanosomiasis",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a highly contagious viral disease of poultry?",
    optA: "Trypanosomiasis",
    optB: "Newcastle disease",
    optC: "Mastitis",
    optD: "Anthrax",
    correctAnswer: "B"
  },
  {
    qText: "The tsetse fly transmits which disease to cattle?",
    optA: "Mastitis",
    optB: "Trypanosomiasis (Sleeping sickness)",
    optC: "Foot and Mouth disease",
    optD: "Brucellosis",
    correctAnswer: "B"
  },
  {
    qText: "An inflammation of the udder in dairy cows is known as:",
    optA: "Mastitis",
    optB: "Anthrax",
    optC: "Coccidiosis",
    optD: "Rinderpest",
    correctAnswer: "A"
  },
  {
    qText: "Which parasitic disease commonly causes bloody diarrhea in poultry?",
    optA: "Newcastle disease",
    optB: "Coccidiosis",
    optC: "Fowl pox",
    optD: "Marek's disease",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is an internal parasite (endoparasite) of livestock?",
    optA: "Tick",
    optB: "Louse",
    optC: "Tapeworm",
    optD: "Tsetse fly",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is an external parasite (ectoparasite) of livestock?",
    optA: "Roundworm",
    optB: "Liver fluke",
    optC: "Tick",
    optD: "Tapeworm",
    correctAnswer: "C"
  },
  {
    qText: "The method of breeding where semen is collected from a male and mechanically introduced into a female is called:",
    optA: "Natural mating",
    optB: "Artificial Insemination (AI)",
    optC: "Inbreeding",
    optD: "Crossbreeding",
    correctAnswer: "B"
  },
  {
    qText: "Mating two animals of different breeds to produce offspring with hybrid vigor is called:",
    optA: "Inbreeding",
    optB: "Linebreeding",
    optC: "Crossbreeding",
    optD: "Purebreeding",
    correctAnswer: "C"
  },
  {
    qText: "The primary purpose of keeping an incubator in poultry farming is to:",
    optA: "Store mature birds",
    optB: "Keep eggs cold",
    optC: "Hatch fertile eggs artificially",
    optD: "Produce poultry feed",
    correctAnswer: "C"
  }
];

async function main() {
  const subjectSlug = 'livestock-farming';
  const subjectGroup = 'Vocational';
  const subjectName = 'Livestock Farming';

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

    for (const q of livestockQuestions) {
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
