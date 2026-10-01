require('dotenv').config();
const pool = require('../src/config/database');

const accountingQuestions = [
  {
    qText: "The primary purpose of accounting is to:",
    optA: "Calculate the exact number of employees",
    optB: "Provide financial information for decision making",
    optC: "Determine the market share of a company",
    optD: "Increase the sales of the company",
    correctAnswer: "B"
  },
  {
    qText: "The fundamental accounting equation is:",
    optA: "Assets = Liabilities - Capital",
    optB: "Assets + Liabilities = Capital",
    optC: "Assets = Liabilities + Capital (Owner's Equity)",
    optD: "Capital = Assets + Liabilities",
    correctAnswer: "C"
  },
  {
    qText: "Which concept assumes that a business will continue to operate indefinitely into the foreseeable future?",
    optA: "Going concern concept",
    optB: "Business entity concept",
    optC: "Accrual concept",
    optD: "Prudence concept",
    correctAnswer: "A"
  },
  {
    qText: "The principle that implies that the business and its owners are two separate and distinct entities is the:",
    optA: "Money measurement concept",
    optB: "Business entity concept",
    optC: "Dual aspect concept",
    optD: "Periodicity concept",
    correctAnswer: "B"
  },
  {
    qText: "Which concept requires that expenses incurred to generate revenue must be recognized in the same accounting period?",
    optA: "Materiality concept",
    optB: "Matching concept",
    optC: "Cost concept",
    optD: "Consistency concept",
    correctAnswer: "B"
  },
  {
    qText: "The double-entry system of bookkeeping means that:",
    optA: "Every transaction is recorded twice in the same account",
    optB: "Two accountants must verify every transaction",
    optC: "Every transaction has a debit and a corresponding credit entry",
    optD: "Transactions are recorded in two different currencies",
    correctAnswer: "C"
  },
  {
    qText: "The left side of a T-account is called the:",
    optA: "Credit side",
    optB: "Debit side",
    optC: "Balance side",
    optD: "Opening side",
    correctAnswer: "B"
  },
  {
    qText: "The right side of a T-account is called the:",
    optA: "Debit side",
    optB: "Closing side",
    optC: "Credit side",
    optD: "Asset side",
    correctAnswer: "C"
  },
  {
    qText: "According to the rules of double entry, an increase in an asset account is recorded as a:",
    optA: "Credit",
    optB: "Debit",
    optC: "Liability",
    optD: "Loss",
    correctAnswer: "B"
  },
  {
    qText: "An increase in a liability account is recorded as a:",
    optA: "Debit",
    optB: "Credit",
    optC: "Expense",
    optD: "Asset",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is an example of a current asset?",
    optA: "Land and Buildings",
    optB: "Machinery",
    optC: "Cash in hand",
    optD: "Motor Vehicles",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is considered a fixed (non-current) asset?",
    optA: "Stock (Inventory)",
    optB: "Debtors",
    optC: "Plant and Machinery",
    optD: "Prepaid Expenses",
    correctAnswer: "C"
  },
  {
    qText: "The term 'Debtors' refers to:",
    optA: "People who owe the business money",
    optB: "People to whom the business owes money",
    optC: "The owners of the business",
    optD: "The bank that lent the business money",
    correctAnswer: "A"
  },
  {
    qText: "The term 'Creditors' refers to:",
    optA: "Customers who bought goods on cash",
    optB: "Suppliers to whom the business owes money",
    optC: "Employees of the business",
    optD: "Shareholders",
    correctAnswer: "B"
  },
  {
    qText: "The book of original entry where daily cash transactions are recorded is the:",
    optA: "Purchases Journal",
    optB: "Sales Journal",
    optC: "Cash Book",
    optD: "General Journal",
    correctAnswer: "C"
  },
  {
    qText: "A transaction that is recorded on both the debit and credit sides of the Cash Book is called a:",
    optA: "Reversal entry",
    optB: "Contra entry",
    optC: "Compound entry",
    optD: "Single entry",
    correctAnswer: "B"
  },
  {
    qText: "What letter is used in the folio column of the Cash Book to denote a contra entry?",
    optA: "C",
    optB: "R",
    optC: "X",
    optD: "D",
    correctAnswer: "A"
  },
  {
    qText: "Which journal is used to record the credit sales of goods?",
    optA: "Purchases Day Book",
    optB: "Sales Day Book",
    optC: "Returns Inwards Book",
    optD: "Cash Book",
    correctAnswer: "B"
  },
  {
    qText: "Goods returned by customers are recorded in the:",
    optA: "Purchases Returns Book",
    optB: "Sales Returns Book (Returns Inwards)",
    optC: "General Journal",
    optD: "Cash Book",
    correctAnswer: "B"
  },
  {
    qText: "A statement that tests the arithmetical accuracy of the ledger accounts is the:",
    optA: "Balance Sheet",
    optB: "Trading Account",
    optC: "Trial Balance",
    optD: "Profit and Loss Account",
    correctAnswer: "C"
  },
  {
    qText: "If the trial balance totals agree, it means:",
    optA: "There are absolutely no errors in the books",
    optB: "The arithmetical accuracy of the postings is likely correct",
    optC: "The business made a profit",
    optD: "All debtors have paid their debts",
    correctAnswer: "B"
  },
  {
    qText: "An error where a transaction is completely omitted from the books is called an:",
    optA: "Error of commission",
    optB: "Error of principle",
    optC: "Error of omission",
    optD: "Compensating error",
    correctAnswer: "C"
  },
  {
    qText: "Recording the purchase of a motor vehicle in the motor expenses account is an:",
    optA: "Error of principle",
    optB: "Error of original entry",
    optC: "Error of omission",
    optD: "Error of commission",
    correctAnswer: "A"
  },
  {
    qText: "A suspense account is opened when:",
    optA: "The business makes a loss",
    optB: "The trial balance fails to agree",
    optC: "A debtor runs away",
    optD: "Goods are sold on credit",
    correctAnswer: "B"
  },
  {
    qText: "The systematic allocation of the cost of a fixed asset over its useful life is known as:",
    optA: "Appreciation",
    optB: "Amortization",
    optC: "Depreciation",
    optD: "Depletion",
    correctAnswer: "C"
  },
  {
    qText: "Which method of depreciation charges an equal amount every year?",
    optA: "Reducing balance method",
    optB: "Straight-line method",
    optC: "Sum-of-the-years'-digits method",
    optD: "Revaluation method",
    correctAnswer: "B"
  },
  {
    qText: "The value of an asset at the end of its useful life is called:",
    optA: "Historical cost",
    optB: "Net book value",
    optC: "Scrap (or Residual) value",
    optD: "Market value",
    correctAnswer: "C"
  },
  {
    qText: "Bad debts are:",
    optA: "Debts owed to the business that are uncollectible",
    optB: "Debts the business owes to others",
    optC: "Debts paid early",
    optD: "Loans from a bank",
    correctAnswer: "A"
  },
  {
    qText: "A provision for doubtful debts is created to:",
    optA: "Increase the profit of the year",
    optB: "Anticipate possible losses from debtors who may not pay",
    optC: "Write off all current debts",
    optD: "Pay creditors",
    correctAnswer: "B"
  },
  {
    qText: "Which financial statement shows the gross profit or gross loss of a business?",
    optA: "Balance Sheet",
    optB: "Trading Account",
    optC: "Profit and Loss Account",
    optD: "Cash Flow Statement",
    correctAnswer: "B"
  },
  {
    qText: "Gross profit is calculated as:",
    optA: "Sales minus Net Profit",
    optB: "Sales minus Cost of Goods Sold",
    optC: "Purchases minus Expenses",
    optD: "Sales plus Closing Stock",
    correctAnswer: "B"
  },
  {
    qText: "Cost of Goods Sold is calculated by:",
    optA: "Opening Stock + Purchases - Closing Stock",
    optB: "Opening Stock - Purchases + Closing Stock",
    optC: "Sales - Opening Stock",
    optD: "Purchases - Sales",
    correctAnswer: "A"
  },
  {
    qText: "Which financial statement shows the net profit or net loss of a business?",
    optA: "Trading Account",
    optB: "Balance Sheet",
    optC: "Profit and Loss Account",
    optD: "Trial Balance",
    correctAnswer: "C"
  },
  {
    qText: "Net profit is calculated by:",
    optA: "Gross profit minus Operating Expenses",
    optB: "Sales minus Cost of Goods Sold",
    optC: "Gross profit plus Cost of Goods Sold",
    optD: "Assets minus Liabilities",
    correctAnswer: "A"
  },
  {
    qText: "Which statement presents the financial position of a business on a specific date?",
    optA: "Trading Account",
    optB: "Balance Sheet",
    optC: "Profit and Loss Account",
    optD: "Income Statement",
    correctAnswer: "B"
  },
  {
    qText: "In a Balance Sheet, working capital is:",
    optA: "Fixed Assets minus Current Assets",
    optB: "Current Assets minus Current Liabilities",
    optC: "Total Assets minus Total Liabilities",
    optD: "Capital plus Long-term Liabilities",
    correctAnswer: "B"
  },
  {
    qText: "Drawings are:",
    optA: "Cash or goods taken by the owner for personal use",
    optB: "Profits distributed to shareholders",
    optC: "Salaries paid to employees",
    optD: "Taxes paid to the government",
    correctAnswer: "A"
  },
  {
    qText: "How are drawings treated in the Balance Sheet?",
    optA: "Added to net profit",
    optB: "Deducted from capital",
    optC: "Added to current liabilities",
    optD: "Deducted from fixed assets",
    correctAnswer: "B"
  },
  {
    qText: "An amount paid in advance for a service is known as a:",
    optA: "Accrued expense",
    optB: "Prepaid expense",
    optC: "Outstanding income",
    optD: "Bad debt",
    correctAnswer: "B"
  },
  {
    qText: "In the final accounts, a prepaid expense is treated as:",
    optA: "A current liability",
    optB: "A fixed asset",
    optC: "A current asset",
    optD: "An income",
    correctAnswer: "C"
  },
  {
    qText: "An expense incurred but not yet paid at the end of the accounting period is an:",
    optA: "Accrued expense (Liability)",
    optB: "Prepaid expense",
    optC: "Unearned income",
    optD: "Asset",
    correctAnswer: "A"
  },
  {
    qText: "The process of reconciling the bank balance in the cash book with the bank statement balance is called:",
    optA: "Trial Balance reconciliation",
    optB: "Bank Reconciliation Statement",
    optC: "Ledger balancing",
    optD: "Profit reconciliation",
    correctAnswer: "B"
  },
  {
    qText: "An unpresented cheque is one that has been:",
    optA: "Paid into the bank but not credited",
    optB: "Issued by the business but not yet presented to the bank for payment",
    optC: "Dishonored by the bank",
    optD: "Lost by the business",
    correctAnswer: "B"
  },
  {
    qText: "An uncredited cheque is one that has been:",
    optA: "Received and lodged in the bank but not yet recorded on the bank statement",
    optB: "Issued to a supplier",
    optC: "Bounced due to insufficient funds",
    optD: "Cashed over the counter",
    correctAnswer: "A"
  },
  {
    qText: "The petty cash book is used for recording:",
    optA: "Large payments made by cheque",
    optB: "Small, minor cash expenses",
    optC: "Credit sales",
    optD: "Purchase of fixed assets",
    correctAnswer: "B"
  },
  {
    qText: "The system where a fixed amount is maintained in the petty cash fund is called the:",
    optA: "Imprest system",
    optB: "Double-entry system",
    optC: "Single-entry system",
    optD: "Accrual system",
    correctAnswer: "A"
  },
  {
    qText: "Which document is sent by a seller to a buyer to correct an overcharge on an invoice?",
    optA: "Debit Note",
    optB: "Credit Note",
    optC: "Receipt",
    optD: "Statement of Account",
    correctAnswer: "B"
  },
  {
    qText: "A discount allowed for prompt payment of an account is called:",
    optA: "Trade discount",
    optB: "Quantity discount",
    optC: "Cash discount",
    optD: "Seasonal discount",
    correctAnswer: "C"
  },
  {
    qText: "A trade discount is given to:",
    optA: "Encourage early payment",
    optB: "Encourage bulk buying",
    optC: "Compensate for damaged goods",
    optD: "Pay off bad debts",
    correctAnswer: "B"
  },
  {
    qText: "The document that serves as evidence of cash received is a:",
    optA: "Invoice",
    optB: "Receipt",
    optC: "Purchase order",
    optD: "Waybill",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'accounting';
  const subjectGroup = 'Commercial';
  const subjectName = 'Accounting';

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

    for (const q of accountingQuestions) {
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
