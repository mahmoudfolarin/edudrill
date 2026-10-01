require('dotenv').config();
const pool = require('../src/config/database');

const commerceQuestions = [
  {
    qText: "Commerce is best defined as the study of:",
    optA: "Money making and banking",
    optB: "Production of raw materials",
    optC: "Trade and aids to trade",
    optD: "How to govern a country",
    correctAnswer: "C"
  },
  {
    qText: "The two main branches of commerce are:",
    optA: "Wholesale and retail",
    optB: "Trade and aids to trade",
    optC: "Import and export",
    optD: "Transport and communication",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is NOT an aid to trade?",
    optA: "Banking",
    optB: "Insurance",
    optC: "Mining",
    optD: "Transport",
    correctAnswer: "C"
  },
  {
    qText: "Trade within the borders of a single country is known as:",
    optA: "International trade",
    optB: "Home (Domestic) trade",
    optC: "Entrepot trade",
    optD: "Bilateral trade",
    correctAnswer: "B"
  },
  {
    qText: "The two branches of home trade are:",
    optA: "Import and Export",
    optB: "Wholesale and Retail",
    optC: "Primary and Secondary",
    optD: "Visible and Invisible",
    correctAnswer: "B"
  },
  {
    qText: "A trader who buys goods in large quantities from the manufacturer and sells in smaller quantities to the retailer is a:",
    optA: "Wholesaler",
    optB: "Broker",
    optC: "Consumer",
    optD: "Hawker",
    correctAnswer: "A"
  },
  {
    qText: "The final link in the chain of distribution is the:",
    optA: "Manufacturer",
    optB: "Wholesaler",
    optC: "Retailer",
    optD: "Consumer",
    correctAnswer: "D"
  },
  {
    qText: "Which of the following is an example of an itinerant retailer?",
    optA: "Supermarket",
    optB: "Department store",
    optC: "Hawker",
    optD: "Multiple shop",
    correctAnswer: "C"
  },
  {
    qText: "Self-service is a major characteristic of:",
    optA: "Hawking",
    optB: "Supermarkets",
    optC: "Mobile shops",
    optD: "Street trading",
    correctAnswer: "B"
  },
  {
    qText: "A business owned and run by one person is called a:",
    optA: "Partnership",
    optB: "Sole proprietorship",
    optC: "Private Limited Company",
    optD: "Co-operative society",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a major disadvantage of a sole proprietorship?",
    optA: "Quick decision making",
    optB: "Unlimited liability",
    optC: "Secrecy of business affairs",
    optD: "Easy to set up",
    correctAnswer: "B"
  },
  {
    qText: "Unlimited liability means that:",
    optA: "The business can borrow an unlimited amount of money",
    optB: "The owner's personal assets can be seized to pay business debts",
    optC: "The business pays no taxes",
    optD: "The business can operate in any country",
    correctAnswer: "B"
  },
  {
    qText: "The minimum number of persons required to form a partnership in a general business is:",
    optA: "1",
    optB: "2",
    optC: "7",
    optD: "50",
    correctAnswer: "B"
  },
  {
    qText: "The document that sets out the rules and regulations guiding the internal management of a company is the:",
    optA: "Memorandum of Association",
    optB: "Articles of Association",
    optC: "Prospectus",
    optD: "Certificate of Incorporation",
    correctAnswer: "B"
  },
  {
    qText: "Which document contains the company's name, registered office, and objectives?",
    optA: "Articles of Association",
    optB: "Memorandum of Association",
    optC: "Trading certificate",
    optD: "Share certificate",
    correctAnswer: "B"
  },
  {
    qText: "A Private Limited Company must have the word(s) ________ at the end of its name.",
    optA: "PLC",
    optB: "Ltd",
    optC: "Inc",
    optD: "Co.",
    correctAnswer: "B"
  },
  {
    qText: "Which business organization issues a 'Prospectus' to invite the public to buy its shares?",
    optA: "Sole proprietorship",
    optB: "Partnership",
    optC: "Private Limited Company",
    optD: "Public Limited Company (PLC)",
    correctAnswer: "D"
  },
  {
    qText: "The main objective of a co-operative society is to:",
    optA: "Make maximum profit",
    optB: "Protect the interest and welfare of its members",
    optC: "Dominate the market",
    optD: "Evade government taxes",
    correctAnswer: "B"
  },
  {
    qText: "A public corporation is mainly owned and controlled by:",
    optA: "Shareholders",
    optB: "The government",
    optC: "Foreign investors",
    optD: "A board of directors from private firms",
    correctAnswer: "B"
  },
  {
    qText: "The central bank of Nigeria is responsible for all of the following EXCEPT:",
    optA: "Issuing the national currency",
    optB: "Acting as a banker to the government",
    optC: "Accepting deposits from the general public",
    optD: "Controlling the commercial banks",
    correctAnswer: "C"
  },
  {
    qText: "Which type of bank account is most suitable for a businessman making frequent transactions?",
    optA: "Savings account",
    optB: "Fixed deposit account",
    optC: "Current account",
    optD: "Joint account",
    correctAnswer: "C"
  },
  {
    qText: "A customer using a current account can withdraw money using a:",
    optA: "Passbook",
    optB: "Cheque",
    optC: "Receipt",
    optD: "Invoice",
    correctAnswer: "B"
  },
  {
    qText: "Which bank facility allows a current account holder to withdraw more money than they have in their account?",
    optA: "Loan",
    optB: "Overdraft",
    optC: "Discounting of bills",
    optD: "Fixed deposit",
    correctAnswer: "B"
  },
  {
    qText: "The principle of insurance that states the insured must suffer a financial loss if the insured item is destroyed is:",
    optA: "Utmost good faith",
    optB: "Insurable interest",
    optC: "Indemnity",
    optD: "Proximate cause",
    correctAnswer: "B"
  },
  {
    qText: "The principle of 'Indemnity' in insurance implies that:",
    optA: "The insured is restored to the financial position they were in just before the loss",
    optB: "The insured can make a profit from a loss",
    optC: "All facts must be disclosed",
    optD: "The insurance company can refuse to pay",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following is NOT an insurable risk?",
    optA: "Fire",
    optB: "Theft",
    optC: "Loss of profit due to bad management",
    optD: "Motor accident",
    correctAnswer: "C"
  },
  {
    qText: "The regular payment made by the insured to the insurer is called a:",
    optA: "Dividend",
    optB: "Premium",
    optC: "Interest",
    optD: "Royalty",
    correctAnswer: "B"
  },
  {
    qText: "Trade between two or more countries is known as:",
    optA: "Domestic trade",
    optB: "International (Foreign) trade",
    optC: "Retail trade",
    optD: "Wholesale trade",
    correctAnswer: "B"
  },
  {
    qText: "Entrepot trade involves:",
    optA: "Buying goods from local manufacturers",
    optB: "Selling goods to citizens within the country",
    optC: "Importing goods for the purpose of re-exporting them to another country",
    optD: "Exporting raw materials and importing finished goods",
    correctAnswer: "C"
  },
  {
    qText: "The document that serves as a receipt for goods loaded onto a ship is the:",
    optA: "Bill of Lading",
    optB: "Invoice",
    optC: "Certificate of Origin",
    optD: "Consular Invoice",
    correctAnswer: "A"
  },
  {
    qText: "A tax imposed on imported goods is called a:",
    optA: "Quota",
    optB: "Tariff (Duty)",
    optC: "Embargo",
    optD: "Subsidy",
    correctAnswer: "B"
  },
  {
    qText: "A total ban on the importation of a particular commodity is called an:",
    optA: "Tariff",
    optB: "Embargo",
    optC: "Quota",
    optD: "Exchange control",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following creates awareness and stimulates demand for a product?",
    optA: "Banking",
    optB: "Insurance",
    optC: "Advertising",
    optD: "Warehousing",
    correctAnswer: "C"
  },
  {
    qText: "Advertising aimed at convincing people to buy a particular brand instead of competitors' is:",
    optA: "Informative advertising",
    optB: "Persuasive advertising",
    optC: "Generic advertising",
    optD: "Mass advertising",
    correctAnswer: "B"
  },
  {
    qText: "The function of warehousing in commerce is to:",
    optA: "Create artificial scarcity",
    optB: "Protect goods from theft and damage until they are needed",
    optC: "Increase the price of goods",
    optD: "Manufacture raw materials",
    correctAnswer: "B"
  },
  {
    qText: "Which aid to trade bridges the gap between producers and consumers in terms of distance?",
    optA: "Warehousing",
    optB: "Insurance",
    optC: "Transport",
    optD: "Advertising",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is the fastest means of transportation for urgent, light, and valuable goods?",
    optA: "Road",
    optB: "Rail",
    optC: "Water",
    optD: "Air",
    correctAnswer: "D"
  },
  {
    qText: "A document sent by a seller to a buyer showing the details of goods supplied and the price is an:",
    optA: "Order",
    optB: "Invoice",
    optC: "Quotation",
    optD: "Enquiry",
    correctAnswer: "B"
  },
  {
    qText: "A pro-forma invoice is essentially a:",
    optA: "Final receipt of payment",
    optB: "Demand for immediate payment before goods are sent",
    optC: "Notice of dispatched goods",
    optD: "Document issued by customs",
    correctAnswer: "B"
  },
  {
    qText: "The abbreviation 'E. & O. E.' on an invoice stands for:",
    optA: "Errors and Omissions Expected",
    optB: "Errors and Omissions Excepted",
    optC: "Exact and Official Estimate",
    optD: "Early and On-time Evaluation",
    correctAnswer: "B"
  },
  {
    qText: "An association of businesses producing similar goods to regulate output and fix prices is a:",
    optA: "Cartel",
    optB: "Consortium",
    optC: "Holding company",
    optD: "Trust",
    correctAnswer: "A"
  },
  {
    qText: "Stock exchange is a market for:",
    optA: "Buying and selling second-hand goods",
    optB: "Buying and selling agricultural produce",
    optC: "Buying and selling securities (shares and bonds)",
    optD: "Exchanging foreign currencies",
    correctAnswer: "C"
  },
  {
    qText: "A 'Bull' on the stock exchange is a speculator who:",
    optA: "Sells shares expecting prices to fall",
    optB: "Buys shares expecting prices to rise",
    optC: "Only buys government bonds",
    optD: "Regulates the market",
    correctAnswer: "B"
  },
  {
    qText: "A 'Bear' on the stock exchange is a speculator who:",
    optA: "Buys shares expecting prices to rise",
    optB: "Sells shares expecting prices to fall",
    optC: "Guarantees new share issues",
    optD: "Invests only in new companies",
    correctAnswer: "B"
  },
  {
    qText: "Marketing involves:",
    optA: "Only selling goods in the market",
    optB: "Identifying, anticipating, and satisfying consumer needs profitably",
    optC: "Advertising on television",
    optD: "Manufacturing heavy machinery",
    correctAnswer: "B"
  },
  {
    qText: "The '4 Ps' of the marketing mix are:",
    optA: "Product, Price, Place, Promotion",
    optB: "People, Process, Physical evidence, Profit",
    optC: "Production, Pricing, Positioning, Publicity",
    optD: "Packaging, Price, Posters, Personal selling",
    correctAnswer: "A"
  },
  {
    qText: "Which element of the marketing mix involves deciding how goods get to the final consumer?",
    optA: "Product",
    optB: "Price",
    optC: "Place (Distribution)",
    optD: "Promotion",
    correctAnswer: "C"
  },
  {
    qText: "A market where there are many buyers and sellers dealing in identical products is called:",
    optA: "Monopoly",
    optB: "Perfect competition",
    optC: "Oligopoly",
    optD: "Monopsony",
    correctAnswer: "B"
  },
  {
    qText: "A market situation with only one seller and many buyers is called:",
    optA: "Monopoly",
    optB: "Duopoly",
    optC: "Oligopoly",
    optD: "Perfect competition",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following protects consumers against exploitation by businesses?",
    optA: "Consumer Protection Council (CPC)",
    optB: "Chamber of Commerce",
    optC: "Manufacturers Association of Nigeria (MAN)",
    optD: "Trade Union Congress",
    correctAnswer: "A"
  }
];

async function main() {
  const subjectSlug = 'commerce';
  const subjectGroup = 'Commercial';
  const subjectName = 'Commerce';

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

    for (const q of commerceQuestions) {
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
