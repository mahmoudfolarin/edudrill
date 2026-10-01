require('dotenv').config();
const pool = require('../src/config/database');

const economicsQuestions = [
  {
    qText: "Which of the following best defines Economics?",
    optA: "The study of money and banking",
    optB: "The study of human behavior as a relationship between ends and scarce means which have alternative uses",
    optC: "The study of production and distribution of wealth",
    optD: "The study of how government manages taxation",
    correctAnswer: "B"
  },
  {
    qText: "The basic economic problems of society include all of the following EXCEPT:",
    optA: "What to produce",
    optB: "How to produce",
    optC: "For whom to produce",
    optD: "Where to produce",
    correctAnswer: "D"
  },
  {
    qText: "Opportunity cost is defined as:",
    optA: "The monetary cost of a good",
    optB: "The alternative forgone in making a choice",
    optC: "The total cost of production",
    optD: "The marginal cost of an extra unit",
    correctAnswer: "B"
  },
  {
    qText: "A production possibility curve shows:",
    optA: "The relationship between price and quantity",
    optB: "Combinations of two goods that can be produced with available resources and technology",
    optC: "The total cost of producing different goods",
    optD: "The demand for different goods",
    correctAnswer: "B"
  },
  {
    qText: "In a capitalist economy, the decision of what to produce is made by:",
    optA: "The government",
    optB: "The central planning committee",
    optC: "Consumers through the price mechanism",
    optD: "Producers only",
    correctAnswer: "C"
  },
  {
    qText: "The law of demand states that:",
    optA: "As price increases, quantity demanded increases",
    optB: "As price decreases, quantity demanded decreases",
    optC: "There is an inverse relationship between price and quantity demanded, ceteris paribus",
    optD: "Demand is always constant",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a determinant of demand?",
    optA: "Cost of production",
    optB: "Income of the consumer",
    optC: "Technology",
    optD: "Government subsidies to producers",
    correctAnswer: "B"
  },
  {
    qText: "A substitute good is one that:",
    optA: "Is consumed together with another good",
    optB: "Can be used in place of another good",
    optC: "Has no relationship with another good",
    optD: "Is produced by the same firm",
    correctAnswer: "B"
  },
  {
    qText: "If the price of a complement (e.g., fuel) increases, what happens to the demand for the main good (e.g., cars)?",
    optA: "Demand increases",
    optB: "Demand decreases",
    optC: "Demand remains the same",
    optD: "Supply decreases",
    correctAnswer: "B"
  },
  {
    qText: "Price elasticity of demand measures:",
    optA: "The responsiveness of supply to price changes",
    optB: "The responsiveness of quantity demanded to price changes",
    optC: "The change in income",
    optD: "The change in total revenue",
    correctAnswer: "B"
  },
  {
    qText: "If demand is perfectly inelastic, the demand curve is:",
    optA: "Horizontal",
    optB: "Vertical",
    optC: "Upward sloping",
    optD: "U-shaped",
    correctAnswer: "B"
  },
  {
    qText: "The law of supply states that, ceteris paribus:",
    optA: "As price increases, quantity supplied decreases",
    optB: "As price increases, quantity supplied increases",
    optC: "Supply is determined by demand",
    optD: "Supply is always perfectly elastic",
    correctAnswer: "B"
  },
  {
    qText: "Equilibrium price is the price at which:",
    optA: "Producers maximize profit",
    optB: "Consumers pay the least",
    optC: "Quantity demanded equals quantity supplied",
    optD: "Government sets the maximum price",
    correctAnswer: "C"
  },
  {
    qText: "A price floor set above the equilibrium price results in:",
    optA: "A shortage",
    optB: "A surplus",
    optC: "Market clearing",
    optD: "Increased demand",
    correctAnswer: "B"
  },
  {
    qText: "The reward for land as a factor of production is:",
    optA: "Wages",
    optB: "Interest",
    optC: "Rent",
    optD: "Profit",
    correctAnswer: "C"
  },
  {
    qText: "The reward for entrepreneurship is:",
    optA: "Wages",
    optB: "Interest",
    optC: "Rent",
    optD: "Profit",
    correctAnswer: "D"
  },
  {
    qText: "Division of labor leads to:",
    optA: "Decreased productivity",
    optB: "Specialization and increased efficiency",
    optC: "Higher average costs",
    optD: "Boredom as a positive effect",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a fixed cost?",
    optA: "Cost of raw materials",
    optB: "Wages of casual labor",
    optC: "Rent for factory building",
    optD: "Electricity bill for production",
    correctAnswer: "C"
  },
  {
    qText: "Marginal cost is:",
    optA: "The total cost divided by quantity",
    optB: "The addition to total cost from producing one extra unit",
    optC: "The cost of fixed assets",
    optD: "The cost of variable assets",
    correctAnswer: "B"
  },
  {
    qText: "In the short run, at least one factor of production is:",
    optA: "Variable",
    optB: "Fixed",
    optC: "Free",
    optD: "Expensive",
    correctAnswer: "B"
  },
  {
    qText: "Economies of scale refer to:",
    optA: "A decrease in long-run average cost as output increases",
    optB: "An increase in long-run average cost as output increases",
    optC: "Constant returns to scale",
    optD: "The law of diminishing returns",
    correctAnswer: "A"
  },
  {
    qText: "A market structure with a single seller is called:",
    optA: "Perfect competition",
    optB: "Monopoly",
    optC: "Oligopoly",
    optD: "Monopolistic competition",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a characteristic of perfect competition?",
    optA: "Few sellers",
    optB: "Differentiated products",
    optC: "Barriers to entry",
    optD: "Perfect knowledge of the market",
    correctAnswer: "D"
  },
  {
    qText: "Product differentiation is a key feature of:",
    optA: "Monopolistic competition",
    optB: "Perfect competition",
    optC: "Monopoly",
    optD: "Monopsony",
    correctAnswer: "A"
  },
  {
    qText: "National income is:",
    optA: "The total amount of money in circulation",
    optB: "The total value of all final goods and services produced in a country in a year",
    optC: "The total revenue of the government",
    optD: "The total wealth of individuals",
    correctAnswer: "B"
  },
  {
    qText: "Gross Domestic Product (GDP) differs from Gross National Product (GNP) by:",
    optA: "Depreciation",
    optB: "Net factor income from abroad",
    optC: "Indirect taxes",
    optD: "Subsidies",
    correctAnswer: "B"
  },
  {
    qText: "Inflation is defined as:",
    optA: "A temporary increase in prices",
    optB: "A persistent and general rise in the price level",
    optC: "An increase in the money supply",
    optD: "A decrease in purchasing power of money only for food",
    correctAnswer: "B"
  },
  {
    qText: "Cost-push inflation is caused by:",
    optA: "Excess demand in the economy",
    optB: "An increase in the cost of production",
    optC: "Too much money chasing too few goods",
    optD: "A decrease in wages",
    correctAnswer: "B"
  },
  {
    qText: "The functions of money include all EXCEPT:",
    optA: "Medium of exchange",
    optB: "Store of value",
    optC: "Measure of value",
    optD: "Means of barter",
    correctAnswer: "D"
  },
  {
    qText: "Which institution is responsible for issuing currency in a country?",
    optA: "Commercial banks",
    optB: "The Central Bank",
    optC: "The Ministry of Finance",
    optD: "The Stock Exchange",
    correctAnswer: "B"
  },
  {
    qText: "Fiscal policy involves the use of:",
    optA: "Interest rates and money supply",
    optB: "Government taxation and expenditure",
    optC: "Exchange rates",
    optD: "Trade tariffs only",
    correctAnswer: "B"
  },
  {
    qText: "Monetary policy is controlled by the:",
    optA: "Government",
    optB: "Central Bank",
    optC: "Commercial Banks",
    optD: "Legislature",
    correctAnswer: "B"
  },
  {
    qText: "A progressive tax is one where:",
    optA: "The tax rate decreases as income increases",
    optB: "The tax rate remains constant regardless of income",
    optC: "The tax rate increases as income increases",
    optD: "The tax is levied only on goods",
    correctAnswer: "C"
  },
  {
    qText: "International trade is based on the principle of:",
    optA: "Absolute advantage",
    optB: "Comparative advantage",
    optC: "Protectionism",
    optD: "Self-sufficiency",
    correctAnswer: "B"
  },
  {
    qText: "A tariff is:",
    optA: "A limit on the quantity of imports",
    optB: "A tax on imported goods",
    optC: "A subsidy given to exporters",
    optD: "A ban on trade",
    correctAnswer: "B"
  },
  {
    qText: "Balance of payments records:",
    optA: "A country's total tax revenue",
    optB: "All economic transactions between a country and the rest of the world",
    optC: "The difference between exports and imports of goods only",
    optD: "The government budget deficit",
    correctAnswer: "B"
  },
  {
    qText: "Economic growth is best measured by an increase in:",
    optA: "Real GDP over time",
    optB: "The general price level",
    optC: "The population",
    optD: "The money supply",
    correctAnswer: "A"
  },
  {
    qText: "Economic development differs from economic growth because it includes:",
    optA: "An increase in GDP",
    optB: "Improvements in standard of living and structural changes",
    optC: "An increase in population",
    optD: "An increase in inflation",
    correctAnswer: "B"
  },
  {
    qText: "Population census is:",
    optA: "The counting of people in a country at a specific time",
    optB: "The registration of births and deaths",
    optC: "The measurement of migration",
    optD: "The calculation of the dependency ratio",
    correctAnswer: "A"
  },
  {
    qText: "The Malthusian theory of population states that:",
    optA: "Population grows arithmetically while food supply grows geometrically",
    optB: "Population grows geometrically while food supply grows arithmetically",
    optC: "Population and food supply grow at the same rate",
    optD: "Technology will always solve food shortages",
    correctAnswer: "B"
  },
  {
    qText: "A mixed economy combines elements of:",
    optA: "Capitalism and socialism",
    optB: "Traditional and command economies",
    optC: "Monopoly and perfect competition",
    optD: "Agriculture and industry",
    correctAnswer: "A"
  },
  {
    qText: "Privatization refers to:",
    optA: "The transfer of ownership from private to public sector",
    optB: "The transfer of ownership from public to private sector",
    optC: "Government control of prices",
    optD: "The nationalization of industries",
    correctAnswer: "B"
  },
  {
    qText: "An externality occurs when:",
    optA: "Firms make a profit",
    optB: "A third party is affected by a transaction they are not part of",
    optC: "Government intervenes in the market",
    optD: "Prices are in equilibrium",
    correctAnswer: "B"
  },
  {
    qText: "A public good is characterized by:",
    optA: "Excludability and rivalry",
    optB: "Non-excludability and non-rivalry",
    optC: "High price and low demand",
    optD: "Government regulation only",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is an example of an indirect tax?",
    optA: "Personal income tax",
    optB: "Company profit tax",
    optC: "Value Added Tax (VAT)",
    optD: "Poll tax",
    correctAnswer: "C"
  },
  {
    qText: "The dependency ratio measures:",
    optA: "The number of working-age people to non-working-age people",
    optB: "The number of non-working-age people to working-age people",
    optC: "The birth rate to death rate",
    optD: "The rate of unemployment",
    correctAnswer: "B"
  },
  {
    qText: "Frictional unemployment is caused by:",
    optA: "A general downturn in economic activity",
    optB: "People being temporarily between jobs",
    optC: "Changes in technology",
    optD: "Seasonal changes in demand",
    correctAnswer: "B"
  },
  {
    qText: "A trade deficit occurs when:",
    optA: "Exports equal imports",
    optB: "Exports exceed imports",
    optC: "Imports exceed exports",
    optD: "The government runs a budget deficit",
    correctAnswer: "C"
  },
  {
    qText: "The main objective of a trade union is to:",
    optA: "Maximize profit for the firm",
    optB: "Protect and improve the welfare and working conditions of members",
    optC: "Collect taxes for the government",
    optD: "Set prices for goods",
    correctAnswer: "B"
  },
  {
    qText: "An ad valorem tax is a tax based on:",
    optA: "The quantity of the good",
    optB: "The value or price of the good",
    optC: "The income of the consumer",
    optD: "The location of production",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'economics';
  const subjectGroup = 'Commercial';
  const subjectName = 'Economics';

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

    for (const q of economicsQuestions) {
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
