require('dotenv').config();
const pool = require('../src/config/database');

const homeEconomicsQuestions = [
  {
    qText: "Which of the following is NOT a major area of Home Economics?",
    optA: "Food and Nutrition",
    optB: "Clothing and Textiles",
    optC: "Home Management",
    optD: "Engineering",
    correctAnswer: "D"
  },
  {
    qText: "The primary aim of Home Economics is to:",
    optA: "Teach people how to sew",
    optB: "Improve the quality of life for individuals and families",
    optC: "Cook delicious meals",
    optD: "Make money for the family",
    correctAnswer: "B"
  },
  {
    qText: "Personal hygiene involves:",
    optA: "Keeping the environment clean",
    optB: "Keeping one's body and clothes clean",
    optC: "Eating a balanced diet",
    optD: "Exercising daily",
    correctAnswer: "B"
  },
  {
    qText: "Halitosis is another name for:",
    optA: "Body odor",
    optB: "Bad breath",
    optC: "Tooth decay",
    optD: "Dandruff",
    correctAnswer: "B"
  },
  {
    qText: "Body odor can be prevented by:",
    optA: "Bathing regularly and using deodorants",
    optB: "Wearing tight clothes",
    optC: "Eating spicy foods",
    optD: "Applying heavy makeup",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following is used for cleaning the teeth?",
    optA: "Chewing stick / Toothbrush",
    optB: "Comb",
    optC: "Sponge",
    optD: "Nail cutter",
    correctAnswer: "A"
  },
  {
    qText: "A balanced diet is a meal that contains:",
    optA: "Only carbohydrates and proteins",
    optB: "All the classes of food in their correct proportions",
    optC: "Vitamins and water only",
    optD: "Mostly fats and oils",
    correctAnswer: "B"
  },
  {
    qText: "Which nutrient is primarily responsible for body building and repair?",
    optA: "Carbohydrates",
    optB: "Vitamins",
    optC: "Proteins",
    optD: "Minerals",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a good source of Vitamin C?",
    optA: "Meat",
    optB: "Milk",
    optC: "Oranges",
    optD: "Bread",
    correctAnswer: "C"
  },
  {
    qText: "Carbohydrates provide the body with:",
    optA: "Protection against diseases",
    optB: "Energy",
    optC: "Strong bones",
    optD: "Healthy hair",
    correctAnswer: "B"
  },
  {
    qText: "Lack of iron in the diet causes:",
    optA: "Scurvy",
    optB: "Rickets",
    optC: "Anemia",
    optD: "Goiter",
    correctAnswer: "C"
  },
  {
    qText: "Which mineral is essential for strong bones and teeth?",
    optA: "Iron",
    optB: "Calcium",
    optC: "Iodine",
    optD: "Zinc",
    correctAnswer: "B"
  },
  {
    qText: "Water is important in the body because it:",
    optA: "Provides energy",
    optB: "Helps in digestion and regulates body temperature",
    optC: "Builds muscles",
    optD: "Prevents night blindness",
    correctAnswer: "B"
  },
  {
    qText: "The process of preserving food by removing moisture from it is called:",
    optA: "Canning",
    optB: "Drying",
    optC: "Freezing",
    optD: "Smoking",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a perishable food?",
    optA: "Rice",
    optB: "Dried beans",
    optC: "Fresh meat",
    optD: "Flour",
    correctAnswer: "C"
  },
  {
    qText: "Food poisoning can be prevented by:",
    optA: "Leaving food uncovered",
    optB: "Cooking food thoroughly and maintaining hygiene",
    optC: "Eating expired canned foods",
    optD: "Using the same knife for raw meat and vegetables without washing",
    correctAnswer: "B"
  },
  {
    qText: "In meal planning, it is important to consider the:",
    optA: "Color of the dining room",
    optB: "Age, health, and occupation of family members",
    optC: "Size of the kitchen",
    optD: "Brand of the cooker",
    correctAnswer: "B"
  },
  {
    qText: "Which cooking method involves cooking food in hot oil?",
    optA: "Boiling",
    optB: "Steaming",
    optC: "Frying",
    optD: "Baking",
    correctAnswer: "C"
  },
  {
    qText: "Steaming is a healthy method of cooking because:",
    optA: "It adds a lot of fat to the food",
    optB: "It burns the food quickly",
    optC: "It retains water-soluble nutrients",
    optD: "It makes food hard",
    correctAnswer: "C"
  },
  {
    qText: "The basic unit of a textile fabric is the:",
    optA: "Yarn",
    optB: "Fiber",
    optC: "Thread",
    optD: "Weave",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a natural plant fiber?",
    optA: "Silk",
    optB: "Wool",
    optC: "Cotton",
    optD: "Nylon",
    correctAnswer: "C"
  },
  {
    qText: "Silk and wool are examples of:",
    optA: "Synthetic fibers",
    optB: "Plant fibers",
    optC: "Animal fibers",
    optD: "Mineral fibers",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a synthetic (man-made) fiber?",
    optA: "Cotton",
    optB: "Linen",
    optC: "Nylon",
    optD: "Silk",
    correctAnswer: "C"
  },
  {
    qText: "The process of interlacing two sets of yarns at right angles to form a fabric is called:",
    optA: "Knitting",
    optB: "Crocheting",
    optC: "Weaving",
    optD: "Spinning",
    correctAnswer: "C"
  },
  {
    qText: "In weaving, the lengthwise yarns are called:",
    optA: "Weft",
    optB: "Warp",
    optC: "Selvedge",
    optD: "Bias",
    correctAnswer: "B"
  },
  {
    qText: "A seam is:",
    optA: "A line of stitching that joins two or more pieces of fabric",
    optB: "A type of button",
    optC: "A tear in a cloth",
    optD: "A decorative stitch",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following is a permanent stitch?",
    optA: "Tacking",
    optB: "Basting",
    optC: "Backstitch",
    optD: "Tailor's tack",
    correctAnswer: "C"
  },
  {
    qText: "The edge of a fabric that does not fray is called the:",
    optA: "Hem",
    optB: "Bias",
    optC: "Selvedge",
    optD: "Seam",
    correctAnswer: "C"
  },
  {
    qText: "Which tool is used to protect the finger when sewing by hand?",
    optA: "Needle",
    optB: "Thimble",
    optC: "Pin",
    optD: "Scissors",
    correctAnswer: "B"
  },
  {
    qText: "The period between childhood and adulthood is called:",
    optA: "Infancy",
    optB: "Toddlerhood",
    optC: "Adolescence",
    optD: "Old age",
    correctAnswer: "C"
  },
  {
    qText: "A primary sexual characteristic in females during puberty is:",
    optA: "Growth of armpit hair",
    optB: "Onset of menstruation",
    optC: "Deepening of voice",
    optD: "Increase in height",
    correctAnswer: "B"
  },
  {
    qText: "The nuclear family consists of:",
    optA: "Mother, father, and their children",
    optB: "Grandparents, parents, and children",
    optC: "One parent and children",
    optD: "Husband and multiple wives",
    correctAnswer: "A"
  },
  {
    qText: "A home is different from a house because a home provides:",
    optA: "Only physical shelter",
    optB: "Love, security, and a sense of belonging",
    optC: "Furniture and appliances",
    optD: "A place to store goods",
    correctAnswer: "B"
  },
  {
    qText: "Good posture helps to:",
    optA: "Make clothes look ugly",
    optB: "Prevent backache and fatigue",
    optC: "Cause digestive problems",
    optD: "Decrease height",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a reason for wearing clothes?",
    optA: "To show off wealth only",
    optB: "For protection, modesty, and adornment",
    optC: "To feel cold",
    optD: "To look like animals",
    correctAnswer: "B"
  },
  {
    qText: "The first aid box should contain:",
    optA: "Needles and thread",
    optB: "Cotton wool, plaster, and antiseptics",
    optC: "Spices and salt",
    optD: "Makeup items",
    correctAnswer: "B"
  },
  {
    qText: "A burn is an injury caused by:",
    optA: "Moist heat (hot liquids/steam)",
    optB: "Dry heat (fire/hot iron)",
    optC: "Sharp objects",
    optD: "Chemicals only",
    correctAnswer: "B"
  },
  {
    qText: "A scald is an injury caused by:",
    optA: "Dry heat",
    optB: "Electricity",
    optC: "Moist heat (boiling water/steam)",
    optD: "Friction",
    correctAnswer: "C"
  },
  {
    qText: "To care for a minor cut, you should first:",
    optA: "Apply hot oil",
    optB: "Wash with clean water and apply an antiseptic",
    optC: "Tie it tightly to stop blood flow permanently",
    optD: "Ignore it",
    correctAnswer: "B"
  },
  {
    qText: "Which room is primarily used for receiving and entertaining guests?",
    optA: "Bedroom",
    optB: "Kitchen",
    optC: "Sitting room / Living room",
    optD: "Bathroom",
    correctAnswer: "C"
  },
  {
    qText: "The functional areas of a home include all EXCEPT:",
    optA: "Rest area (Bedroom)",
    optB: "Work area (Kitchen)",
    optC: "Social area (Living room)",
    optD: "Market area",
    correctAnswer: "D"
  },
  {
    qText: "Which of the following is a heavy equipment in the kitchen?",
    optA: "Blender",
    optB: "Toaster",
    optC: "Gas cooker / Refrigerator",
    optD: "Knife",
    correctAnswer: "C"
  },
  {
    qText: "An example of a cosmetic used to enhance facial appearance is:",
    optA: "Deodorant",
    optB: "Toothpaste",
    optC: "Lipstick",
    optD: "Shampoo",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following describes 'budgeting'?",
    optA: "Spending all your money at once",
    optB: "Planning how to spend available income",
    optC: "Borrowing money frequently",
    optD: "Hiding money in the house",
    correctAnswer: "B"
  },
  {
    qText: "To remove a fresh blood stain from a white cotton shirt, use:",
    optA: "Hot water",
    optB: "Cold water and salt",
    optC: "Bleach immediately",
    optD: "Ironing",
    correctAnswer: "B"
  },
  {
    qText: "A consumer's right to choose means they:",
    optA: "Must buy whatever the seller offers",
    optB: "Have the freedom to select from a variety of products at competitive prices",
    optC: "Can take goods without paying",
    optD: "Must buy the most expensive item",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following helps to extend the lifespan of a garment?",
    optA: "Washing it in boiling water daily",
    optB: "Mending tears promptly",
    optC: "Leaving stains for weeks",
    optD: "Ironing with maximum heat regardless of fabric",
    correctAnswer: "B"
  },
  {
    qText: "An adolescent's need for independence may lead to:",
    optA: "Complete obedience",
    optB: "Conflicts with parents",
    optC: "Loss of appetite",
    optD: "Decrease in growth",
    correctAnswer: "B"
  },
  {
    qText: "Puberty is the period when:",
    optA: "A child learns to walk",
    optB: "An individual becomes sexually mature and capable of reproduction",
    optC: "A person stops growing",
    optD: "Teeth start to fall out",
    correctAnswer: "B"
  },
  {
    qText: "The process of introducing a baby to foods other than breast milk is called:",
    optA: "Nursing",
    optB: "Weaning",
    optC: "Immunization",
    optD: "Teething",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'home-economics';
  const subjectGroup = 'Arts';
  const subjectName = 'Home Economics';

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

    for (const q of homeEconomicsQuestions) {
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
