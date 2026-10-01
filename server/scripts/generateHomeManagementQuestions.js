require('dotenv').config();
const pool = require('../src/config/database');

const homeManagementQuestions = [
  {
    qText: "Home management is best described as the process of:",
    optA: "Cooking and cleaning the house",
    optB: "Using human and non-human resources to achieve family goals",
    optC: "Raising children properly",
    optD: "Earning money for the family",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is considered a human resource?",
    optA: "Money",
    optB: "Time",
    optC: "Energy",
    optD: "Equipment",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a material (non-human) resource?",
    optA: "Skill",
    optB: "Knowledge",
    optC: "Money",
    optD: "Attitude",
    correctAnswer: "C"
  },
  {
    qText: "The first step in the management process is:",
    optA: "Planning",
    optB: "Organizing",
    optC: "Implementing",
    optD: "Evaluating",
    correctAnswer: "A"
  },
  {
    qText: "The final step in the management process is:",
    optA: "Planning",
    optB: "Organizing",
    optC: "Evaluating",
    optD: "Controlling",
    correctAnswer: "C"
  },
  {
    qText: "A family budget is a plan for:",
    optA: "Spending and saving future income",
    optB: "Buying a new house",
    optC: "Paying off old debts only",
    optD: "Cooking weekly meals",
    correctAnswer: "A"
  },
  {
    qText: "The money left over after all necessary expenses have been paid is called:",
    optA: "Gross income",
    optB: "Net income",
    optC: "Discretionary income / Savings",
    optD: "Deficit",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a fixed expense?",
    optA: "Food",
    optB: "Clothing",
    optC: "Rent",
    optD: "Entertainment",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a flexible (variable) expense?",
    optA: "Insurance premiums",
    optB: "House rent",
    optC: "School fees",
    optD: "Food",
    correctAnswer: "D"
  },
  {
    qText: "Impulse buying refers to:",
    optA: "Buying items after careful planning",
    optB: "Buying items on a whim without prior planning",
    optC: "Buying goods in bulk",
    optD: "Buying goods on credit",
    correctAnswer: "B"
  },
  {
    qText: "A consumer is someone who:",
    optA: "Produces goods",
    optB: "Sells goods in the market",
    optC: "Buys and uses goods and services",
    optD: "Manufactures equipment",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a fundamental right of a consumer?",
    optA: "Right to bargain",
    optB: "Right to safety",
    optC: "Right to steal",
    optD: "Right to pollute",
    correctAnswer: "B"
  },
  {
    qText: "The agency responsible for regulating food and drugs in Nigeria is:",
    optA: "EFCC",
    optB: "SON",
    optC: "NAFDAC",
    optD: "NDLEA",
    correctAnswer: "C"
  },
  {
    qText: "SON stands for:",
    optA: "Standard Organization of Nigeria",
    optB: "Society of Nigerian Nurses",
    optC: "State Office Network",
    optD: "Standard Office of Nutrition",
    correctAnswer: "A"
  },
  {
    qText: "The primary purpose of a house is to provide:",
    optA: "Wealth",
    optB: "Shelter and security",
    optC: "Entertainment",
    optD: "Storage for old items",
    correctAnswer: "B"
  },
  {
    qText: "Which type of housing involves living in a building owned by someone else and paying monthly?",
    optA: "Home ownership",
    optB: "Renting",
    optC: "Squatting",
    optD: "Mortgaging",
    correctAnswer: "B"
  },
  {
    qText: "A mortgage is a loan specifically used for:",
    optA: "Buying a car",
    optB: "Paying school fees",
    optC: "Buying or building a house",
    optD: "Starting a business",
    correctAnswer: "C"
  },
  {
    qText: "The process of keeping the home clean and orderly is called:",
    optA: "Interior decoration",
    optB: "Housekeeping",
    optC: "Landscaping",
    optD: "Home economics",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is used for removing dust from furniture?",
    optA: "Broom",
    optB: "Mop",
    optC: "Duster",
    optD: "Scrubbing brush",
    correctAnswer: "C"
  },
  {
    qText: "Hard floor surfaces include:",
    optA: "Carpets and rugs",
    optB: "Linoleum and cork",
    optC: "Tiles, concrete, and terrazzo",
    optD: "Rubber and vinyl",
    correctAnswer: "C"
  },
  {
    qText: "When cleaning a room, the best approach is to clean from:",
    optA: "Bottom to top",
    optB: "Top to bottom",
    optC: "Side to side",
    optD: "Middle to edges",
    correctAnswer: "B"
  },
  {
    qText: "To remove grease stains from a fabric, which of the following is most effective?",
    optA: "Cold water",
    optB: "Salt",
    optC: "Hot water and detergent",
    optD: "Lemon juice",
    correctAnswer: "C"
  },
  {
    qText: "The arrangement of furniture and accessories to make a home beautiful is called:",
    optA: "Housekeeping",
    optB: "Interior decoration",
    optC: "Architecture",
    optD: "Sanitation",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is an accessory in interior decoration?",
    optA: "Sofa",
    optB: "Dining table",
    optC: "Throw pillow",
    optD: "Bed",
    correctAnswer: "C"
  },
  {
    qText: "Proper ventilation in a house helps to:",
    optA: "Keep insects away",
    optB: "Ensure free flow of fresh air",
    optC: "Make the house look beautiful",
    optD: "Prevent burglary",
    correctAnswer: "B"
  },
  {
    qText: "Cross ventilation is achieved when:",
    optA: "Windows are placed on one wall only",
    optB: "Windows are placed on opposite walls",
    optC: "Only doors are kept open",
    optD: "An air conditioner is used",
    correctAnswer: "B"
  },
  {
    qText: "A family consisting of a father, mother, and their children is a:",
    optA: "Nuclear family",
    optB: "Extended family",
    optC: "Polygamous family",
    optD: "Blended family",
    correctAnswer: "A"
  },
  {
    qText: "A family that includes grandparents, uncles, and aunts living together is an:",
    optA: "Nuclear family",
    optB: "Extended family",
    optC: "Monogamous family",
    optD: "Adoptive family",
    correctAnswer: "B"
  },
  {
    qText: "The stage of the family life cycle that begins with marriage and lasts until the first child is born is:",
    optA: "Expanding stage",
    optB: "Contracting stage",
    optC: "Beginning stage",
    optD: "Empty nest stage",
    correctAnswer: "C"
  },
  {
    qText: "The 'Empty Nest' stage refers to the period when:",
    optA: "Children are born",
    optB: "Children have grown and left home",
    optC: "The family buys a new house",
    optD: "Parents are raising teenagers",
    correctAnswer: "B"
  },
  {
    qText: "A common cause of conflict in the family is:",
    optA: "Good communication",
    optB: "Financial mismanagement",
    optC: "Mutual respect",
    optD: "Shared responsibilities",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is an effective way to resolve family conflict?",
    optA: "Shouting matches",
    optB: "Open communication and compromise",
    optC: "Ignoring the problem",
    optD: "Physical violence",
    correctAnswer: "B"
  },
  {
    qText: "The period of transition from childhood to adulthood is called:",
    optA: "Infancy",
    optB: "Toddlerhood",
    optC: "Adolescence",
    optD: "Old age",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a physical change during puberty in boys?",
    optA: "Enlargement of hips",
    optB: "Deepening of the voice",
    optC: "Menstruation",
    optD: "Decrease in height",
    correctAnswer: "B"
  },
  {
    qText: "Good grooming involves:",
    optA: "Wearing expensive clothes",
    optB: "Maintaining personal hygiene and neat appearance",
    optC: "Using a lot of makeup",
    optD: "Following the latest fashion blindly",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following diseases can be prevented by proper environmental sanitation?",
    optA: "Diabetes",
    optB: "Malaria",
    optC: "Cancer",
    optD: "Hypertension",
    correctAnswer: "B"
  },
  {
    qText: "Stagnant water around the home should be cleared to prevent the breeding of:",
    optA: "Cockroaches",
    optB: "Rats",
    optC: "Mosquitoes",
    optD: "Houseflies",
    correctAnswer: "C"
  },
  {
    qText: "Refuse disposal methods include all EXCEPT:",
    optA: "Burning",
    optB: "Composting",
    optC: "Dumping in the river",
    optD: "Burying",
    correctAnswer: "C"
  },
  {
    qText: "The label on a garment provides information about:",
    optA: "The name of the wearer",
    optB: "Care instructions and fabric content",
    optC: "The price of the garment",
    optD: "The tailor's address",
    correctAnswer: "B"
  },
  {
    qText: "A wardrobe plan is important because it helps to:",
    optA: "Buy unnecessary clothes",
    optB: "Avoid impulse buying and ensure suitable clothes are available",
    optC: "Store clothes haphazardly",
    optD: "Show off wealth",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a primary color?",
    optA: "Green",
    optB: "Orange",
    optC: "Red",
    optD: "Purple",
    correctAnswer: "C"
  },
  {
    qText: "In color psychology, which color is often associated with calmness and peace?",
    optA: "Red",
    optB: "Blue",
    optC: "Orange",
    optD: "Black",
    correctAnswer: "B"
  },
  {
    qText: "The process of preserving food by keeping it at very low temperatures is called:",
    optA: "Canning",
    optB: "Drying",
    optC: "Freezing",
    optD: "Smoking",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a perishable food?",
    optA: "Rice",
    optB: "Fresh tomatoes",
    optC: "Dried beans",
    optD: "Salt",
    correctAnswer: "B"
  },
  {
    qText: "Meal planning helps the homemaker to:",
    optA: "Waste food",
    optB: "Save time, energy, and money",
    optC: "Cook only one type of food",
    optD: "Eat at restaurants every day",
    correctAnswer: "B"
  },
  {
    qText: "A balanced diet must contain:",
    optA: "Only carbohydrates and proteins",
    optB: "All classes of food in correct proportions",
    optC: "Mostly fats and oils",
    optD: "Vitamins and minerals only",
    correctAnswer: "B"
  },
  {
    qText: "Kwashiorkor is a deficiency disease caused by lack of:",
    optA: "Carbohydrates",
    optB: "Vitamins",
    optC: "Protein",
    optD: "Iron",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following provides energy to the body?",
    optA: "Vitamins",
    optB: "Carbohydrates",
    optC: "Water",
    optD: "Minerals",
    correctAnswer: "B"
  },
  {
    qText: "An accident in the home can be caused by:",
    optA: "Proper lighting",
    optB: "Wet and slippery floors",
    optC: "Keeping medicines out of reach of children",
    optD: "Turning off gas cylinders",
    correctAnswer: "B"
  },
  {
    qText: "The first aid treatment for a minor burn is to:",
    optA: "Apply hot oil",
    optB: "Rub salt on it",
    optC: "Immerse in cold water",
    optD: "Pierce the blister",
    correctAnswer: "C"
  }
];

async function main() {
  const subjectSlug = 'home-management';
  const subjectGroup = 'Arts';
  const subjectName = 'Home Management';

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

    for (const q of homeManagementQuestions) {
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
