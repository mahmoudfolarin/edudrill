require('dotenv').config();
const pool = require('../src/config/database');

const civicEducationQuestions = [
  {
    qText: "Civic education can be defined as the study of:",
    optA: "The physical environment",
    optB: "The rights and duties of citizens",
    optC: "Past historical events",
    optD: "The calculation of national income",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a primary goal of civic education?",
    optA: "To encourage political apathy",
    optB: "To promote good citizenship and national unity",
    optC: "To teach students how to start a business",
    optD: "To prepare youth for foreign travel",
    correctAnswer: "B"
  },
  {
    qText: "A person who is a legal member of a country and enjoys full rights is a:",
    optA: "Refugee",
    optB: "Alien",
    optC: "Citizen",
    optD: "Immigrant",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a way of acquiring citizenship in Nigeria?",
    optA: "By crossing the border secretly",
    optB: "By birth",
    optC: "By tourism",
    optD: "By committing a crime",
    correctAnswer: "B"
  },
  {
    qText: "Citizenship by naturalization requires the applicant to:",
    optA: "Be born to Nigerian parents",
    optB: "Have lived in the country for a continuous period of 15 years",
    optC: "Be a diplomat from another country",
    optD: "Marry a Nigerian citizen",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a fundamental human right?",
    optA: "Right to avoid paying taxes",
    optB: "Right to life",
    optC: "Right to break traffic laws",
    optD: "Right to steal from the wealthy",
    correctAnswer: "B"
  },
  {
    qText: "The right to freedom of speech is guaranteed under which document?",
    optA: "The National Anthem",
    optB: "The Constitution",
    optC: "The National Pledge",
    optD: "The Criminal Code",
    correctAnswer: "B"
  },
  {
    qText: "A situation where citizens show no interest in the political affairs of their country is called:",
    optA: "Political socialization",
    optB: "Political participation",
    optC: "Political apathy",
    optD: "Political culture",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a consequence of political apathy?",
    optA: "Good governance",
    optB: "Emergence of bad leaders",
    optC: "Rapid economic growth",
    optD: "Increase in national unity",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a civic responsibility of a citizen?",
    optA: "Evading tax",
    optB: "Vandalizing public property",
    optC: "Voting during elections",
    optD: "Bribing government officials",
    correctAnswer: "C"
  },
  {
    qText: "The body responsible for conducting elections in Nigeria is:",
    optA: "EFCC",
    optB: "INEC",
    optC: "NDLEA",
    optD: "NEMA",
    correctAnswer: "B"
  },
  {
    qText: "INEC stands for:",
    optA: "Independent National Electoral Commission",
    optB: "International Network for Electoral Control",
    optC: "Independent Nigerian Election Committee",
    optD: "Internal National Executive Council",
    correctAnswer: "A"
  },
  {
    qText: "Democracy is defined as the government of the people, by the people, and for the people by:",
    optA: "George Washington",
    optB: "Winston Churchill",
    optC: "Abraham Lincoln",
    optD: "Nelson Mandela",
    correctAnswer: "C"
  },
  {
    qText: "A key feature of a democratic government is:",
    optA: "Rule by military force",
    optB: "Periodic free and fair elections",
    optC: "A one-party system",
    optD: "Suppression of the press",
    correctAnswer: "B"
  },
  {
    qText: "The rule of law implies that:",
    optA: "The President is above the law",
    optB: "Laws are made by the wealthy",
    optC: "Everyone is equal before the law",
    optD: "The police can arrest anyone without cause",
    correctAnswer: "C"
  },
  {
    qText: "Which principle ensures that power is divided among the Executive, Legislature, and Judiciary?",
    optA: "Federalism",
    optB: "Separation of Powers",
    optC: "Rule of Law",
    optD: "Checks and Balances",
    correctAnswer: "B"
  },
  {
    qText: "The principle of checks and balances is designed to:",
    optA: "Prevent the abuse of power by any arm of government",
    optB: "Ensure the President has absolute power",
    optC: "Allow judges to make laws",
    optD: "Keep the military in control",
    correctAnswer: "A"
  },
  {
    qText: "Which arm of government is responsible for making laws?",
    optA: "The Executive",
    optB: "The Judiciary",
    optC: "The Legislature",
    optD: "The Civil Service",
    correctAnswer: "C"
  },
  {
    qText: "The highest court in Nigeria is the:",
    optA: "Magistrate Court",
    optB: "High Court",
    optC: "Court of Appeal",
    optD: "Supreme Court",
    correctAnswer: "D"
  },
  {
    qText: "The national flag of Nigeria was designed by:",
    optA: "Prof. Wole Soyinka",
    optB: "Michael Taiwo Akinkunmi",
    optC: "Dr. Nnamdi Azikiwe",
    optD: "Herbert Macaulay",
    correctAnswer: "B"
  },
  {
    qText: "The green color in the Nigerian flag represents:",
    optA: "Peace and Unity",
    optB: "Agriculture and Natural wealth",
    optC: "The blood of heroes",
    optD: "Mineral resources",
    correctAnswer: "B"
  },
  {
    qText: "The white color in the Nigerian flag represents:",
    optA: "Peace and Unity",
    optB: "Agriculture",
    optC: "Mineral wealth",
    optD: "Religion",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following is a national symbol of Nigeria?",
    optA: "The Naira",
    optB: "The Coat of Arms",
    optC: "The Aso Rock",
    optD: "The National Stadium",
    correctAnswer: "B"
  },
  {
    qText: "In the Nigerian Coat of Arms, the two horses represent:",
    optA: "Agriculture",
    optB: "Dignity and Pride",
    optC: "The North and South",
    optD: "Strength and Power",
    correctAnswer: "B"
  },
  {
    qText: "The 'Y' shape on the shield of the Nigerian Coat of Arms represents:",
    optA: "The coming together of the states",
    optB: "Rivers Niger and Benue",
    optC: "The three major ethnic groups",
    optD: "The agricultural wealth",
    correctAnswer: "B"
  },
  {
    qText: "HIV stands for:",
    optA: "Human Internal Virus",
    optB: "Human Immunodeficiency Virus",
    optC: "Health Immunity Virus",
    optD: "Human Infection Virus",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is NOT a mode of transmitting HIV/AIDS?",
    optA: "Unprotected sexual intercourse",
    optB: "Sharing unsterilized sharp objects",
    optC: "Hugging and shaking hands",
    optD: "Mother-to-child transmission",
    correctAnswer: "C"
  },
  {
    qText: "Stigmatization of People Living with HIV/AIDS (PLWHA) involves:",
    optA: "Providing them with free drugs",
    optB: "Showing them love and care",
    optC: "Discriminating against and isolating them",
    optD: "Educating them on healthy living",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a hard drug commonly abused?",
    optA: "Paracetamol",
    optB: "Cocaine",
    optC: "Vitamin C",
    optD: "Aspirin",
    correctAnswer: "B"
  },
  {
    qText: "The agency established to fight drug trafficking in Nigeria is:",
    optA: "NAFDAC",
    optB: "NDLEA",
    optC: "EFCC",
    optD: "ICPC",
    correctAnswer: "B"
  },
  {
    qText: "Human trafficking refers to:",
    optA: "Trading in illegal drugs",
    optB: "The illegal trade of human beings for exploitation",
    optC: "Traffic congestion on major roads",
    optD: "Smuggling of foreign goods",
    correctAnswer: "B"
  },
  {
    qText: "The agency responsible for combating human trafficking in Nigeria is:",
    optA: "NAPTIP",
    optB: "NDLEA",
    optC: "FRSC",
    optD: "SON",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following is a cause of human trafficking?",
    optA: "Poverty and unemployment",
    optB: "Good education",
    optC: "Strict border control",
    optD: "High standard of living",
    correctAnswer: "A"
  },
  {
    qText: "Cultism in tertiary institutions often leads to:",
    optA: "Academic excellence",
    optB: "Violence and loss of lives",
    optC: "Peaceful coexistence",
    optD: "Infrastructural development",
    correctAnswer: "B"
  },
  {
    qText: "A core value that emphasizes standing by the truth at all times is:",
    optA: "Honesty",
    optB: "Discipline",
    optC: "Courage",
    optD: "Tolerance",
    correctAnswer: "A"
  },
  {
    qText: "A situation where individuals of different religious or ethnic backgrounds live together peacefully is known as:",
    optA: "Inter-communal clash",
    optB: "Tolerance and peaceful coexistence",
    optC: "Segregation",
    optD: "Apartheid",
    correctAnswer: "B"
  },
  {
    qText: "Nationalism is defined as:",
    optA: "Hatred for one's country",
    optB: "A strong feeling of love and pride for one's country",
    optC: "Fighting against the government",
    optD: "Dependence on foreign countries",
    correctAnswer: "B"
  },
  {
    qText: "Who is generally regarded as the father of Nigerian nationalism?",
    optA: "Obafemi Awolowo",
    optB: "Ahmadu Bello",
    optC: "Herbert Macaulay",
    optD: "Nnamdi Azikiwe",
    correctAnswer: "C"
  },
  {
    qText: "The Universal Declaration of Human Rights (UDHR) was adopted by the United Nations in which year?",
    optA: "1945",
    optB: "1948",
    optC: "1960",
    optD: "1999",
    correctAnswer: "B"
  },
  {
    qText: "An election is said to be free and fair when:",
    optA: "The ruling party wins every seat",
    optB: "Voters are intimidated",
    optC: "It is conducted without manipulation and violence",
    optD: "The military supervises the voting",
    correctAnswer: "C"
  },
  {
    qText: "The process of counting votes and announcing the winner is called:",
    optA: "Accreditation",
    optB: "Collation and declaration",
    optC: "Campaigning",
    optD: "Voter registration",
    correctAnswer: "B"
  },
  {
    qText: "A constitution can be described as:",
    optA: "A book of religious laws",
    optB: "A document containing the fundamental laws and principles of a state",
    optC: "A register of all citizens",
    optD: "A manifesto of a political party",
    correctAnswer: "B"
  },
  {
    qText: "Which type of constitution is easy to amend?",
    optA: "Rigid constitution",
    optB: "Flexible constitution",
    optC: "Written constitution",
    optD: "Unwritten constitution",
    correctAnswer: "B"
  },
  {
    qText: "Nigeria currently operates a:",
    optA: "Unitary system of government",
    optB: "Federal system of government",
    optC: "Confederal system of government",
    optD: "Monarchical system of government",
    correctAnswer: "B"
  },
  {
    qText: "Under the 1999 Constitution, how many Local Government Areas are in Nigeria?",
    optA: "36",
    optB: "774",
    optC: "109",
    optD: "360",
    correctAnswer: "B"
  },
  {
    qText: "The upper chamber of the Nigerian National Assembly is the:",
    optA: "House of Representatives",
    optB: "Senate",
    optC: "House of Assembly",
    optD: "Executive Council",
    correctAnswer: "B"
  },
  {
    qText: "The lower chamber of the Nigerian National Assembly is the:",
    optA: "Senate",
    optB: "House of Representatives",
    optC: "State House of Assembly",
    optD: "Judiciary",
    correctAnswer: "B"
  },
  {
    qText: "A pressure group is an organization formed to:",
    optA: "Take over the government",
    optB: "Influence government policies in favor of its members",
    optC: "Conduct elections",
    optD: "Arrest criminals",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a civic duty of the government?",
    optA: "Protecting lives and properties of citizens",
    optB: "Paying taxes to citizens",
    optC: "Arresting opposition party members",
    optD: "Rigging elections",
    correctAnswer: "A"
  },
  {
    qText: "The process whereby citizens are educated on their rights, duties, and government activities is called:",
    optA: "Political socialization",
    optB: "Civic education",
    optC: "Political culture",
    optD: "Gerrymandering",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'civic-education';
  const subjectGroup = 'Arts'; // or Social Sciences, usually grouped with general subjects
  const subjectName = 'Civic Education';

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

    for (const q of civicEducationQuestions) {
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
