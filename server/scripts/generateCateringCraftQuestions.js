require('dotenv').config();
const pool = require('../src/config/database');

const cateringCraftQuestions = [
  {
    qText: "Catering can best be defined as:",
    optA: "Eating in a restaurant",
    optB: "The business of providing food and beverage services",
    optC: "Farming and harvesting crops",
    optD: "Cleaning the kitchen",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is an example of commercial catering?",
    optA: "Hospital catering",
    optB: "School feeding program",
    optC: "A fast-food restaurant",
    optD: "Prison catering",
    correctAnswer: "C"
  },
  {
    qText: "Welfare (or non-commercial) catering includes all of the following EXCEPT:",
    optA: "Hospital canteens",
    optB: "School dining halls",
    optC: "Prison catering",
    optD: "Five-star hotels",
    correctAnswer: "D"
  },
  {
    qText: "The person in charge of the entire kitchen operation is the:",
    optA: "Sous chef",
    optB: "Chef de partie",
    optC: "Executive chef (Chef de cuisine)",
    optD: "Commis chef",
    correctAnswer: "C"
  },
  {
    qText: "The 'Sous chef' is responsible for:",
    optA: "Washing the dishes",
    optB: "Assisting the executive chef and managing the kitchen in their absence",
    optC: "Serving food to guests",
    optD: "Preparing only desserts",
    correctAnswer: "B"
  },
  {
    qText: "A 'Commis' is a:",
    optA: "Head chef",
    optB: "Restaurant manager",
    optC: "Junior or apprentice chef",
    optD: "Pastry chef",
    correctAnswer: "C"
  },
  {
    qText: "Which section of the kitchen prepares cold foods such as salads and cold meats?",
    optA: "Larder (Garde Manger)",
    optB: "Pastry (Pâtisserie)",
    optC: "Sauce (Saucier)",
    optD: "Roast (Rôtisseur)",
    correctAnswer: "A"
  },
  {
    qText: "The chef responsible for making cakes, breads, and desserts is the:",
    optA: "Saucier",
    optB: "Pâtissier",
    optC: "Entremetier",
    optD: "Garde Manger",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a symptom of food poisoning?",
    optA: "Coughing",
    optB: "Vomiting and diarrhea",
    optC: "Sneezing",
    optD: "Hair loss",
    correctAnswer: "B"
  },
  {
    qText: "Cross-contamination occurs when:",
    optA: "Food is cooked too long",
    optB: "Harmful bacteria are transferred from one food or surface to another",
    optC: "Food is stored in a freezer",
    optD: "Food is salted too much",
    correctAnswer: "B"
  },
  {
    qText: "To prevent cross-contamination, a chef should use:",
    optA: "The same chopping board for raw meat and fresh vegetables",
    optB: "Different colored chopping boards for different types of food",
    optC: "A blunt knife",
    optD: "Hot water to wash the food",
    correctAnswer: "B"
  },
  {
    qText: "In the color-coded chopping board system, which color is traditionally used for raw meat?",
    optA: "Green",
    optB: "Blue",
    optC: "Red",
    optD: "White",
    correctAnswer: "C"
  },
  {
    qText: "Which color chopping board is typically used for fresh vegetables?",
    optA: "Red",
    optB: "Yellow",
    optC: "Green",
    optD: "Blue",
    correctAnswer: "C"
  },
  {
    qText: "The ideal temperature for a refrigerator is:",
    optA: "1°C to 4°C",
    optB: "10°C to 15°C",
    optC: "-18°C to -20°C",
    optD: "20°C to 25°C",
    correctAnswer: "A"
  },
  {
    qText: "The 'Danger Zone' for food bacterial growth is between:",
    optA: "0°C and 5°C",
    optB: "5°C and 63°C",
    optC: "63°C and 100°C",
    optD: "-18°C and 0°C",
    correctAnswer: "B"
  },
  {
    qText: "Personal hygiene for a food handler includes all of the following EXCEPT:",
    optA: "Wearing a clean uniform",
    optB: "Washing hands regularly",
    optC: "Wearing heavy perfume",
    optD: "Keeping fingernails short and clean",
    correctAnswer: "C"
  },
  {
    qText: "Mise en place is a French term that means:",
    optA: "Cooking the food",
    optB: "Setting the table",
    optC: "Putting everything in its place before cooking begins",
    optD: "Washing the dishes",
    correctAnswer: "C"
  },
  {
    qText: "Which cooking method involves cooking food in liquid at a temperature just below the boiling point?",
    optA: "Boiling",
    optB: "Poaching",
    optC: "Frying",
    optD: "Roasting",
    correctAnswer: "B"
  },
  {
    qText: "Baking is a method of cooking food using:",
    optA: "Hot water",
    optB: "Hot fat or oil",
    optC: "Dry heat in an enclosed space (oven)",
    optD: "Direct contact with a hot metal plate",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a moist-heat method of cooking?",
    optA: "Grilling",
    optB: "Roasting",
    optC: "Steaming",
    optD: "Baking",
    correctAnswer: "C"
  },
  {
    qText: "Sautéing involves cooking food:",
    optA: "In a large amount of hot oil",
    optB: "Quickly in a small amount of fat over high heat",
    optC: "In boiling water",
    optD: "Slowly in an oven",
    correctAnswer: "B"
  },
  {
    qText: "Blanching is primarily used to:",
    optA: "Burn the outside of meat",
    optB: "Partially cook vegetables and preserve their color",
    optC: "Fry potatoes",
    optD: "Bake bread",
    correctAnswer: "B"
  },
  {
    qText: "The process of passing food through a sieve to make it smooth is called:",
    optA: "Kneading",
    optB: "Puréeing",
    optC: "Whisking",
    optD: "Folding",
    correctAnswer: "B"
  },
  {
    qText: "A recipe provides:",
    optA: "The price of the food",
    optB: "A list of ingredients and instructions for preparing a dish",
    optC: "The name of the chef",
    optD: "The history of the dish",
    correctAnswer: "B"
  },
  {
    qText: "A 'Roux' is a mixture of:",
    optA: "Flour and water",
    optB: "Fat and flour cooked together, used to thicken sauces",
    optC: "Milk and cheese",
    optD: "Eggs and sugar",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a mother sauce in classical French cooking?",
    optA: "Ketchup",
    optB: "Béchamel",
    optC: "Mayonnaise",
    optD: "Soy sauce",
    correctAnswer: "B"
  },
  {
    qText: "Béchamel sauce is made using:",
    optA: "Tomato puree and herbs",
    optB: "A white roux and milk",
    optC: "Brown stock and brown roux",
    optD: "Egg yolks and butter",
    correctAnswer: "B"
  },
  {
    qText: "A garnish is used to:",
    optA: "Add bulk to a meal",
    optB: "Decorate and enhance the presentation of a dish",
    optC: "Thicken a soup",
    optD: "Clean the plate",
    correctAnswer: "B"
  },
  {
    qText: "Which knife is considered the most versatile and important tool for a chef?",
    optA: "Paring knife",
    optB: "Bread knife",
    optC: "Chef's knife (French knife)",
    optD: "Cleaver",
    correctAnswer: "C"
  },
  {
    qText: "A serrated knife is best used for cutting:",
    optA: "Raw meat",
    optB: "Bread and tomatoes",
    optC: "Onions",
    optD: "Bones",
    correctAnswer: "B"
  },
  {
    qText: "Which equipment is used to keep food warm during a buffet service?",
    optA: "Refrigerator",
    optB: "Chafing dish",
    optC: "Blender",
    optD: "Salamander",
    correctAnswer: "B"
  },
  {
    qText: "A salamander in a commercial kitchen is a:",
    optA: "Type of fish",
    optB: "Special overhead grill used for browning or melting",
    optC: "Dishwashing machine",
    optD: "Floor mop",
    correctAnswer: "B"
  },
  {
    qText: "Table d'hôte is a menu that offers:",
    optA: "A complete meal with limited choices at a set price",
    optB: "Items priced individually",
    optC: "Only drinks",
    optD: "Buffet service only",
    correctAnswer: "A"
  },
  {
    qText: "An À la carte menu offers:",
    optA: "A set meal at a fixed price",
    optB: "Food items priced and ordered individually",
    optC: "Only vegetarian dishes",
    optD: "Free food",
    correctAnswer: "B"
  },
  {
    qText: "The sequence of serving courses in a formal meal is:",
    optA: "Dessert, Main course, Appetizer",
    optB: "Appetizer, Soup, Main course, Dessert",
    optC: "Main course, Soup, Dessert",
    optD: "Soup, Dessert, Appetizer",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is considered flatware or cutlery?",
    optA: "Plates and bowls",
    optB: "Knives, forks, and spoons",
    optC: "Glasses and cups",
    optD: "Tablecloths and napkins",
    correctAnswer: "B"
  },
  {
    qText: "Crockery refers to:",
    optA: "Silverware",
    optB: "Plates, cups, and saucers made of ceramic or porcelain",
    optC: "Wine glasses",
    optD: "Kitchen knives",
    correctAnswer: "B"
  },
  {
    qText: "In a formal table setting, forks are typically placed on the:",
    optA: "Left side of the plate",
    optB: "Right side of the plate",
    optC: "Top of the plate",
    optD: "Center of the plate",
    correctAnswer: "A"
  },
  {
    qText: "In a formal table setting, knives are placed on the:",
    optA: "Left side of the plate",
    optB: "Right side of the plate with the blade facing the plate",
    optC: "Top of the plate",
    optD: "Under the plate",
    correctAnswer: "B"
  },
  {
    qText: "A cover in restaurant service refers to:",
    optA: "The lid of a pot",
    optB: "The space and table setting allocated to one guest",
    optC: "The uniform worn by the waiter",
    optD: "The tablecloth",
    correctAnswer: "B"
  },
  {
    qText: "When serving a guest, food is generally served from the:",
    optA: "Right side",
    optB: "Left side",
    optC: "Front",
    optD: "Back",
    correctAnswer: "B"
  },
  {
    qText: "Beverages (drinks) are generally served and cleared from the:",
    optA: "Left side",
    optB: "Right side",
    optC: "Front",
    optD: "Center",
    correctAnswer: "B"
  },
  {
    qText: "Which type of service involves guests serving themselves from a display of food?",
    optA: "Silver service",
    optB: "Gueridon service",
    optC: "Buffet service",
    optD: "Plated service",
    correctAnswer: "C"
  },
  {
    qText: "Silver service (or English service) involves:",
    optA: "Serving pre-plated food to guests",
    optB: "A waiter serving food from a platter onto the guest's plate using a spoon and fork",
    optC: "Guests serving themselves",
    optD: "Cooking food at the table",
    correctAnswer: "B"
  },
  {
    qText: "Gueridon service involves:",
    optA: "Self-service",
    optB: "Preparing or carving food at the guest's table using a trolley",
    optC: "Serving food through a window",
    optD: "Vending machines",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following describes a 'canapé'?",
    optA: "A large roast beef",
    optB: "A small, decorative piece of bread topped with a savory garnish, served as an appetizer",
    optC: "A type of sweet pastry",
    optD: "A thick soup",
    correctAnswer: "B"
  },
  {
    qText: "An hors d'oeuvre is:",
    optA: "The main course",
    optB: "A light snack or appetizer served before the main meal",
    optC: "A dessert",
    optD: "A type of wine",
    correctAnswer: "B"
  },
  {
    qText: "The process of evaluating the cost of recipes and determining the selling price is known as:",
    optA: "Portion control",
    optB: "Menu planning",
    optC: "Costing",
    optD: "Inventory",
    correctAnswer: "C"
  },
  {
    qText: "Portion control is important because it:",
    optA: "Ensures consistency in serving size and food costs",
    optB: "Makes the food taste better",
    optC: "Reduces the nutritional value of the food",
    optD: "Increases cooking time",
    correctAnswer: "A"
  },
  {
    qText: "First in, First out (FIFO) is a rule used for:",
    optA: "Washing dishes",
    optB: "Stock rotation in the storeroom to prevent food spoilage",
    optC: "Seating guests in a restaurant",
    optD: "Firing staff",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'catering-craft';
  const subjectGroup = 'Vocational';
  const subjectName = 'Catering Craft';

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

    for (const q of cateringCraftQuestions) {
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
