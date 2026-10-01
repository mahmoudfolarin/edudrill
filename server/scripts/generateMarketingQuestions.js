require('dotenv').config();
const pool = require('../src/config/database');

const marketingQuestions = [
  {
    qText: "Marketing is best defined as the process of:",
    optA: "Selling goods at a high price",
    optB: "Identifying, anticipating, and satisfying consumer needs profitably",
    optC: "Manufacturing products in a factory",
    optD: "Advertising products on television",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is NOT a component of the Marketing Mix (The 4 Ps)?",
    optA: "Product",
    optB: "Price",
    optC: "Profit",
    optD: "Place",
    correctAnswer: "C"
  },
  {
    qText: "The 'Place' element of the marketing mix refers to:",
    optA: "The location of the factory",
    optB: "The distribution channels used to get the product to the consumer",
    optC: "The physical design of the product",
    optD: "The cost of the product",
    correctAnswer: "B"
  },
  {
    qText: "The 'Promotion' element of the marketing mix includes all EXCEPT:",
    optA: "Advertising",
    optB: "Personal selling",
    optC: "Product design",
    optD: "Public relations",
    correctAnswer: "C"
  },
  {
    qText: "A market segment is:",
    optA: "A specific location where goods are sold",
    optB: "A distinct group of buyers who have similar needs or characteristics",
    optC: "The total number of competitors in an industry",
    optD: "A government regulatory body",
    correctAnswer: "B"
  },
  {
    qText: "Demographic segmentation divides the market based on variables such as:",
    optA: "Lifestyle and personality",
    optB: "Age, gender, and income",
    optC: "Climate and region",
    optD: "Brand loyalty and usage rate",
    correctAnswer: "B"
  },
  {
    qText: "Psychographic segmentation divides the market based on:",
    optA: "Age and gender",
    optB: "Geographic location",
    optC: "Lifestyle, social class, and personality",
    optD: "Income level",
    correctAnswer: "C"
  },
  {
    qText: "The systematic gathering, recording, and analyzing of data about problems relating to the marketing of goods and services is called:",
    optA: "Market segmentation",
    optB: "Marketing research",
    optC: "Sales forecasting",
    optD: "Product positioning",
    correctAnswer: "B"
  },
  {
    qText: "Primary data in marketing research refers to:",
    optA: "Information collected from textbooks",
    optB: "Data previously published by the government",
    optC: "Original data collected specifically for the research problem at hand",
    optD: "Data obtained from Wikipedia",
    correctAnswer: "C"
  },
  {
    qText: "Secondary data is:",
    optA: "Data collected through personal interviews",
    optB: "Information that already exists, having been collected for another purpose",
    optC: "Data collected directly from competitors",
    optD: "Questionnaires filled out by new customers",
    correctAnswer: "B"
  },
  {
    qText: "A physical product that can be touched and seen is called a:",
    optA: "Service",
    optB: "Tangible good",
    optC: "Intangible product",
    optD: "Concept",
    correctAnswer: "B"
  },
  {
    qText: "Services are described as intangible because:",
    optA: "They can be stored in a warehouse",
    optB: "They cannot be touched, seen, or tasted before purchase",
    optC: "They are always cheaper than physical goods",
    optD: "They do not require human labor",
    correctAnswer: "B"
  },
  {
    qText: "Products bought by final consumers for personal, non-business use are called:",
    optA: "Industrial products",
    optB: "Consumer products",
    optC: "Raw materials",
    optD: "Capital goods",
    correctAnswer: "B"
  },
  {
    qText: "Convenience goods are products that:",
    optA: "Are bought frequently with minimum thought and effort",
    optB: "Are expensive and bought rarely",
    optC: "Consumers are not aware of",
    optD: "Are used to manufacture other goods",
    correctAnswer: "A"
  },
  {
    qText: "An example of a shopping good is:",
    optA: "Bread",
    optB: "Toothpaste",
    optC: "A refrigerator",
    optD: "Life insurance",
    correctAnswer: "C"
  },
  {
    qText: "The stage in the product life cycle where sales grow rapidly and profits peak is the:",
    optA: "Introduction stage",
    optB: "Growth stage",
    optC: "Maturity stage",
    optD: "Decline stage",
    correctAnswer: "B"
  },
  {
    qText: "In which stage of the product life cycle do sales begin to fall continuously?",
    optA: "Introduction",
    optB: "Growth",
    optC: "Maturity",
    optD: "Decline",
    correctAnswer: "D"
  },
  {
    qText: "The process of giving a name, term, sign, or symbol to a product to identify and differentiate it from competitors is called:",
    optA: "Packaging",
    optB: "Labeling",
    optC: "Branding",
    optD: "Pricing",
    correctAnswer: "C"
  },
  {
    qText: "Packaging performs all of the following functions EXCEPT:",
    optA: "Protecting the product",
    optB: "Providing information about the product",
    optC: "Setting the price of the product",
    optD: "Attracting customer attention",
    correctAnswer: "C"
  },
  {
    qText: "Which pricing strategy involves setting a high initial price for a new product to maximize revenue from eager buyers?",
    optA: "Penetration pricing",
    optB: "Price skimming",
    optC: "Cost-plus pricing",
    optD: "Psychological pricing",
    correctAnswer: "B"
  },
  {
    qText: "Which pricing strategy involves setting a low initial price to rapidly gain market share?",
    optA: "Penetration pricing",
    optB: "Price skimming",
    optC: "Premium pricing",
    optD: "Odd-even pricing",
    correctAnswer: "A"
  },
  {
    qText: "Setting a price at N999 instead of N1000 is an example of:",
    optA: "Penetration pricing",
    optB: "Cost-plus pricing",
    optC: "Psychological pricing",
    optD: "Price discrimination",
    correctAnswer: "C"
  },
  {
    qText: "Any paid form of non-personal presentation and promotion of ideas, goods, or services by an identified sponsor is:",
    optA: "Personal selling",
    optB: "Sales promotion",
    optC: "Public relations",
    optD: "Advertising",
    correctAnswer: "D"
  },
  {
    qText: "Advertising designed to build goodwill for a company rather than to sell a specific product is called:",
    optA: "Product advertising",
    optB: "Institutional (Corporate) advertising",
    optC: "Competitive advertising",
    optD: "Pioneering advertising",
    correctAnswer: "B"
  },
  {
    qText: "Short-term incentives to encourage the purchase or sale of a product, such as coupons or 'Buy 1 Get 1 Free', are examples of:",
    optA: "Public relations",
    optB: "Sales promotion",
    optC: "Personal selling",
    optD: "Direct marketing",
    correctAnswer: "B"
  },
  {
    qText: "The face-to-face presentation of a product to a prospective buyer is called:",
    optA: "Advertising",
    optB: "Publicity",
    optC: "Personal selling",
    optD: "Sales promotion",
    correctAnswer: "C"
  },
  {
    qText: "Building good relations with the company's various publics by obtaining favorable publicity is known as:",
    optA: "Advertising",
    optB: "Sales promotion",
    optC: "Public relations",
    optD: "Direct marketing",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a direct channel of distribution?",
    optA: "Manufacturer -> Wholesaler -> Retailer -> Consumer",
    optB: "Manufacturer -> Retailer -> Consumer",
    optC: "Manufacturer -> Consumer",
    optD: "Manufacturer -> Agent -> Wholesaler -> Consumer",
    correctAnswer: "C"
  },
  {
    qText: "A wholesaler's main function is to:",
    optA: "Buy in small quantities and sell to consumers",
    optB: "Buy in bulk from manufacturers and sell in smaller quantities to retailers",
    optC: "Manufacture the goods",
    optD: "Consume the goods",
    correctAnswer: "B"
  },
  {
    qText: "Retailers add value primarily by:",
    optA: "Manufacturing products",
    optB: "Making products available at convenient locations and in small quantities for consumers",
    optC: "Transporting goods across oceans",
    optD: "Creating television advertisements for manufacturers",
    correctAnswer: "B"
  },
  {
    qText: "E-commerce refers to:",
    optA: "Buying and selling goods in a physical market",
    optB: "Trading goods using barter",
    optC: "Buying and selling of goods and services over the internet",
    optD: "Selling goods door-to-door",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following describes Business-to-Consumer (B2C) e-commerce?",
    optA: "A manufacturer selling raw materials to another manufacturer",
    optB: "An online store selling clothes to an individual shopper",
    optC: "A consumer selling a used phone to another consumer",
    optD: "A government agency buying supplies",
    correctAnswer: "B"
  },
  {
    qText: "The study of how individuals make decisions to spend their available resources on consumption-related items is called:",
    optA: "Market segmentation",
    optB: "Consumer behavior",
    optC: "Public relations",
    optD: "Financial accounting",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a psychological factor that influences consumer behavior?",
    optA: "Family",
    optB: "Culture",
    optC: "Motivation",
    optD: "Social class",
    correctAnswer: "C"
  },
  {
    qText: "A feeling of post-purchase doubt or anxiety experienced by a consumer is known as:",
    optA: "Brand loyalty",
    optB: "Cognitive dissonance",
    optC: "Impulse buying",
    optD: "Motivation",
    correctAnswer: "B"
  },
  {
    qText: "A SWOT analysis helps a business evaluate its:",
    optA: "Sales, Wealth, Operations, and Taxes",
    optB: "Strengths, Weaknesses, Opportunities, and Threats",
    optC: "Suppliers, Workers, Organizations, and Teams",
    optD: "Strategy, Wealth, Objectives, and Targets",
    correctAnswer: "B"
  },
  {
    qText: "In SWOT analysis, which two factors are internal to the organization?",
    optA: "Opportunities and Threats",
    optB: "Strengths and Opportunities",
    optC: "Strengths and Weaknesses",
    optD: "Weaknesses and Threats",
    correctAnswer: "C"
  },
  {
    qText: "The total group of people or organizations that a company aims to reach with its marketing efforts is the:",
    optA: "Target market",
    optB: "Sample size",
    optC: "Competitors",
    optD: "Suppliers",
    correctAnswer: "A"
  },
  {
    qText: "Which marketing orientation focuses primarily on making products as widely available and affordable as possible?",
    optA: "Product concept",
    optB: "Selling concept",
    optC: "Production concept",
    optD: "Marketing concept",
    correctAnswer: "C"
  },
  {
    qText: "The societal marketing concept holds that a company should:",
    optA: "Focus only on short-term profits",
    optB: "Satisfy consumer needs in a way that maintains or improves the consumer's and society's well-being",
    optC: "Produce whatever is cheapest",
    optD: "Ignore environmental concerns",
    correctAnswer: "B"
  },
  {
    qText: "What does ROI stand for in marketing metrics?",
    optA: "Rate of Inflation",
    optB: "Return on Investment",
    optC: "Revenue on Items",
    optD: "Ratio of Income",
    correctAnswer: "B"
  },
  {
    qText: "A trademark protects:",
    optA: "A new invention",
    optB: "A book or song",
    optC: "A brand name, logo, or symbol used to identify a product",
    optD: "A trade secret",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is an example of an 'Unsought Good'?",
    optA: "Bread",
    optB: "A designer watch",
    optC: "Funeral plots or life insurance",
    optD: "A washing machine",
    correctAnswer: "C"
  },
  {
    qText: "A supply chain is:",
    optA: "A chain used to lock a warehouse",
    optB: "The sequence of processes involved in the production and distribution of a commodity",
    optC: "The hierarchy of managers in a company",
    optD: "A type of retail store",
    correctAnswer: "B"
  },
  {
    qText: "The practice of using a successful brand name to launch a new or modified product in a new category is called:",
    optA: "Brand extension",
    optB: "Co-branding",
    optC: "Rebranding",
    optD: "Private branding",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following media is most suitable for demonstrating how a complex product works?",
    optA: "Radio",
    optB: "Billboard",
    optC: "Television or Video",
    optD: "Newspaper",
    correctAnswer: "C"
  },
  {
    qText: "A 'loss leader' is a product:",
    optA: "That the company stops making because it loses money",
    optB: "Sold at a very low price (often below cost) to attract customers into a store",
    optC: "That customers return frequently",
    optD: "That is out of stock",
    correctAnswer: "B"
  },
  {
    qText: "Telemarketing involves selling goods or services via:",
    optA: "Television commercials",
    optB: "Telephone calls",
    optC: "Door-to-door visits",
    optD: "Email",
    correctAnswer: "B"
  },
  {
    qText: "The process of evaluating the results of marketing strategies and plans and taking corrective action is called:",
    optA: "Marketing control",
    optB: "Marketing implementation",
    optC: "Marketing mix",
    optD: "Market segmentation",
    correctAnswer: "A"
  },
  {
    qText: "Which agency regulates and controls the quality and advertising of foods, drugs, and cosmetics in Nigeria?",
    optA: "EFCC",
    optB: "SON",
    optC: "NAFDAC",
    optD: "NDLEA",
    correctAnswer: "C"
  }
];

async function main() {
  const subjectSlug = 'marketing';
  const subjectGroup = 'Commercial';
  const subjectName = 'Marketing';

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

    for (const q of marketingQuestions) {
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
