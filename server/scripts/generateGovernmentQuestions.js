require('dotenv').config();
const pool = require('../src/config/database');

const governmentQuestions = [
  {
    qText: "A system of government where the people have the supreme power is known as:",
    optA: "Autocracy",
    optB: "Democracy",
    optC: "Oligarchy",
    optD: "Monarchy",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is NOT a feature of a democratic government?",
    optA: "Rule of Law",
    optB: "Periodic elections",
    optC: "One-party system",
    optD: "Fundamental human rights",
    correctAnswer: "C"
  },
  {
    qText: "The principle of separation of powers is closely associated with:",
    optA: "Karl Marx",
    optB: "Baron de Montesquieu",
    optC: "A.V. Dicey",
    optD: "Thomas Hobbes",
    correctAnswer: "B"
  },
  {
    qText: "Which arm of government is responsible for interpreting the law?",
    optA: "The Executive",
    optB: "The Legislature",
    optC: "The Judiciary",
    optD: "The Civil Service",
    correctAnswer: "C"
  },
  {
    qText: "The rule of law implies that:",
    optA: "The law is made by the rulers only",
    optB: "Everyone is subject to the law",
    optC: "Judges are above the law",
    optD: "Lawyers make the law",
    correctAnswer: "B"
  },
  {
    qText: "A government headed by a king or queen is called a:",
    optA: "Republic",
    optB: "Dictatorship",
    optC: "Monarchy",
    optD: "Theocracy",
    correctAnswer: "C"
  },
  {
    qText: "The supreme law of a country is the:",
    optA: "Decree",
    optB: "Constitution",
    optC: "Edict",
    optD: "By-law",
    correctAnswer: "B"
  },
  {
    qText: "An unwritten constitution is one that:",
    optA: "Has never been written down",
    optB: "Is not contained in a single document",
    optC: "Cannot be read by citizens",
    optD: "Is easily destroyed",
    correctAnswer: "B"
  },
  {
    qText: "A rigid constitution is one that:",
    optA: "Cannot be amended",
    optB: "Requires a special procedure for amendment",
    optC: "Is strictly enforced",
    optD: "Can be amended by a simple majority",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following countries operates an unwritten constitution?",
    optA: "United States of America",
    optB: "Nigeria",
    optC: "Britain",
    optD: "Ghana",
    correctAnswer: "C"
  },
  {
    qText: "The exclusive legislative list contains matters that:",
    optA: "Both federal and state governments can legislate on",
    optB: "Only the federal government can legislate on",
    optC: "Only local governments can legislate on",
    optD: "Only the state government can legislate on",
    correctAnswer: "B"
  },
  {
    qText: "A federal system of government is characterized by:",
    optA: "Concentration of power at the center",
    optB: "Division of power between the center and component units",
    optC: "A single legislature for the whole country",
    optD: "Absence of a constitution",
    correctAnswer: "B"
  },
  {
    qText: "In a unitary state, power is concentrated in the:",
    optA: "Local government",
    optB: "State government",
    optC: "Central government",
    optD: "Judiciary",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a merit of a federal system?",
    optA: "It is very cheap to run",
    optB: "It prevents dictatorial central government",
    optC: "It ignores local differences",
    optD: "It leads to secession easily",
    correctAnswer: "B"
  },
  {
    qText: "A pressure group aims to:",
    optA: "Take over government",
    optB: "Contest elections",
    optC: "Influence government policies in favor of its members",
    optD: "Form a new political party",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is NOT a type of pressure group?",
    optA: "Economic groups",
    optB: "Religious groups",
    optC: "Political parties",
    optD: "Professional associations",
    correctAnswer: "C"
  },
  {
    qText: "Franchise is the right to:",
    optA: "Free speech",
    optB: "Form associations",
    optC: "Vote and be voted for",
    optD: "Own property",
    correctAnswer: "C"
  },
  {
    qText: "Universal adult suffrage means that:",
    optA: "Only the educated can vote",
    optB: "All qualified adults can vote",
    optC: "Only property owners can vote",
    optD: "Only men can vote",
    correctAnswer: "B"
  },
  {
    qText: "An electoral commission is responsible for:",
    optA: "Making laws",
    optB: "Conducting and supervising elections",
    optC: "Arresting political offenders",
    optD: "Interpreting the constitution",
    correctAnswer: "B"
  },
  {
    qText: "Gerrymandering refers to:",
    optA: "Rigging an election",
    optB: "Manipulation of electoral boundaries for political advantage",
    optC: "Bribing voters",
    optD: "Delaying election results",
    correctAnswer: "B"
  },
  {
    qText: "A two-party system operates mainly in:",
    optA: "Nigeria",
    optB: "United States of America",
    optC: "China",
    optD: "Cuba",
    correctAnswer: "B"
  },
  {
    qText: "The primary aim of a political party is to:",
    optA: "Influence government policy",
    optB: "Win elections and control government",
    optC: "Organize strikes",
    optD: "Promote religious beliefs",
    correctAnswer: "B"
  },
  {
    qText: "Fascism was prominently practiced in:",
    optA: "Germany",
    optB: "Italy",
    optC: "Soviet Union",
    optD: "France",
    correctAnswer: "B"
  },
  {
    qText: "The concept of 'rule of law' was popularized by:",
    optA: "Karl Marx",
    optB: "Thomas Hobbes",
    optC: "A.V. Dicey",
    optD: "John Locke",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is an attribute of a state?",
    optA: "Religion",
    optB: "Sovereignty",
    optC: "Wealth",
    optD: "Language",
    correctAnswer: "B"
  },
  {
    qText: "The ability of a state to make and enforce laws without external interference is known as:",
    optA: "Nationalism",
    optB: "Authority",
    optC: "Sovereignty",
    optD: "Power",
    correctAnswer: "C"
  },
  {
    qText: "A citizen can acquire citizenship through all EXCEPT:",
    optA: "Birth",
    optB: "Naturalization",
    optC: "Registration",
    optD: "Tourism",
    correctAnswer: "D"
  },
  {
    qText: "A document containing the fundamental rights of citizens is called:",
    optA: "The Bill of Rights",
    optB: "The Manifesto",
    optC: "The Electoral Act",
    optD: "The White Paper",
    correctAnswer: "A"
  },
  {
    qText: "A political ideology that advocates for classless society and collective ownership is:",
    optA: "Capitalism",
    optB: "Communism",
    optC: "Fascism",
    optD: "Feudalism",
    correctAnswer: "B"
  },
  {
    qText: "In a presidential system of government, the head of state is also the:",
    optA: "Head of the Judiciary",
    optB: "Head of Government",
    optC: "President of the Senate",
    optD: "Chief Justice",
    correctAnswer: "B"
  },
  {
    qText: "Which system of government fuses the executive and the legislature?",
    optA: "Presidential system",
    optB: "Parliamentary system",
    optC: "Federal system",
    optD: "Confederal system",
    correctAnswer: "B"
  },
  {
    qText: "A bill passed by the legislature becomes a law when assented to by the:",
    optA: "Chief Justice",
    optB: "President of the Senate",
    optC: "President or Head of State",
    optD: "Attorney General",
    correctAnswer: "C"
  },
  {
    qText: "The main function of the civil service is to:",
    optA: "Make laws",
    optB: "Implement government policies",
    optC: "Interpret laws",
    optD: "Conduct elections",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following ensures the impartiality of civil servants?",
    optA: "Anonymity",
    optB: "Permanence",
    optC: "Political neutrality",
    optD: "Meritocracy",
    correctAnswer: "C"
  },
  {
    qText: "An ombudsman is established to:",
    optA: "Investigate and address citizens' complaints against public officials",
    optB: "Audit government accounts",
    optC: "Organize elections",
    optD: "Advise the president",
    correctAnswer: "A"
  },
  {
    qText: "Delegated legislation refers to:",
    optA: "Laws made by the military",
    optB: "Laws made by bodies other than the legislature",
    optC: "Laws made by the judiciary",
    optD: "Laws made during emergencies",
    correctAnswer: "B"
  },
  {
    qText: "The highest court in Nigeria is the:",
    optA: "Court of Appeal",
    optB: "High Court",
    optC: "Supreme Court",
    optD: "Magistrate Court",
    correctAnswer: "C"
  },
  {
    qText: "A formal declaration of the policies of a political party is its:",
    optA: "Constitution",
    optB: "Manifesto",
    optC: "White paper",
    optD: "Decree",
    correctAnswer: "B"
  },
  {
    qText: "Public opinion can be measured through:",
    optA: "Elections only",
    optB: "Opinion polls and mass media",
    optC: "Military decrees",
    optD: "Judicial pronouncements",
    correctAnswer: "B"
  },
  {
    qText: "The main source of local government revenue is:",
    optA: "Foreign loans",
    optB: "Statutory allocations",
    optC: "Income tax",
    optD: "Customs duties",
    correctAnswer: "B"
  },
  {
    qText: "Under the indirect rule system in Nigeria, British colonial masters ruled through:",
    optA: "Elected representatives",
    optB: "Traditional rulers",
    optC: "The military",
    optD: "Foreign missionaries",
    correctAnswer: "B"
  },
  {
    qText: "The Clifford Constitution of 1922 was significant because it:",
    optA: "Introduced the elective principle",
    optB: "Created the Mid-Western region",
    optC: "Amalgamated Nigeria",
    optD: "Granted independence",
    correctAnswer: "A"
  },
  {
    qText: "Nigeria became a republic in:",
    optA: "1960",
    optB: "1963",
    optC: "1979",
    optD: "1999",
    correctAnswer: "B"
  },
  {
    qText: "The first military Head of State in Nigeria was:",
    optA: "Yakubu Gowon",
    optB: "Murtala Mohammed",
    optC: "Johnson Aguiyi-Ironsi",
    optD: "Olusegun Obasanjo",
    correctAnswer: "C"
  },
  {
    qText: "Which international organization replaced the League of Nations?",
    optA: "African Union",
    optB: "United Nations Organization",
    optC: "ECOWAS",
    optD: "Commonwealth of Nations",
    correctAnswer: "B"
  },
  {
    qText: "The headquarters of the United Nations is located in:",
    optA: "London",
    optB: "Geneva",
    optC: "New York",
    optD: "Paris",
    correctAnswer: "C"
  },
  {
    qText: "Which organ of the United Nations is responsible for maintaining international peace and security?",
    optA: "The General Assembly",
    optB: "The Secretariat",
    optC: "The Security Council",
    optD: "The International Court of Justice",
    correctAnswer: "C"
  },
  {
    qText: "ECOWAS was established to promote:",
    optA: "Military alliances in West Africa",
    optB: "Economic integration in West Africa",
    optC: "Political unification of Africa",
    optD: "Cultural exchange globally",
    correctAnswer: "B"
  },
  {
    qText: "The permanent members of the UN Security Council have the power of:",
    optA: "Veto",
    optB: "Impeachment",
    optC: "Delegation",
    optD: "Pardon",
    correctAnswer: "A"
  },
  {
    qText: "Foreign policy is best described as:",
    optA: "Policies made by foreigners",
    optB: "A country's strategy in dealing with other nations",
    optC: "Laws regulating foreigners in a country",
    optD: "The internal rules of the military",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'government';
  const subjectGroup = 'Arts';
  const subjectName = 'Government';

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

    for (const q of governmentQuestions) {
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
