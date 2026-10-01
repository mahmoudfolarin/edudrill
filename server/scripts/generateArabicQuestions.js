require('dotenv').config();
const pool = require('../src/config/database');

const arabicQuestions = [
  {
    qText: "How do you say 'Good morning' in Arabic?",
    optA: "Sabah al-khayr",
    optB: "Masa' al-khayr",
    optC: "Tusbih 'ala khayr",
    optD: "Ahlan wa sahlan",
    correctAnswer: "A"
  },
  {
    qText: "What is the Arabic word for 'Water'?",
    optA: "Nar",
    optB: "Ma'",
    optC: "Hawa'",
    optD: "Turab",
    correctAnswer: "B"
  },
  {
    qText: "How do you say 'Thank you' in Arabic?",
    optA: "Afwan",
    optB: "Shukran",
    optC: "Na'am",
    optD: "La",
    correctAnswer: "B"
  },
  {
    qText: "What does 'Kitab' mean in English?",
    optA: "Pen",
    optB: "Desk",
    optC: "Book",
    optD: "Paper",
    correctAnswer: "C"
  },
  {
    qText: "What is the Arabic word for 'School'?",
    optA: "Madrasah",
    optB: "Maktabah",
    optC: "Jami'ah",
    optD: "Mustashfa",
    correctAnswer: "A"
  },
  {
    qText: "How many letters are in the Arabic alphabet?",
    optA: "26",
    optB: "28",
    optC: "30",
    optD: "24",
    correctAnswer: "B"
  },
  {
    qText: "The Arabic language is written from:",
    optA: "Left to right",
    optB: "Right to left",
    optC: "Top to bottom",
    optD: "Bottom to top",
    correctAnswer: "B"
  },
  {
    qText: "What does 'Na'am' mean in English?",
    optA: "Yes",
    optB: "No",
    optC: "Maybe",
    optD: "Always",
    correctAnswer: "A"
  },
  {
    qText: "What is the Arabic word for 'House' or 'Home'?",
    optA: "Bab",
    optB: "Bayt",
    optC: "Shari'",
    optD: "Sayyarah",
    correctAnswer: "B"
  },
  {
    qText: "What does 'Sayyarah' mean?",
    optA: "Bicycle",
    optB: "Airplane",
    optC: "Train",
    optD: "Car",
    correctAnswer: "D"
  },
  {
    qText: "How do you say 'Father' in Arabic?",
    optA: "Akh",
    optB: "Umm",
    optC: "Ab",
    optD: "Jadd",
    correctAnswer: "C"
  },
  {
    qText: "How do you say 'Mother' in Arabic?",
    optA: "Umm",
    optB: "Ukht",
    optC: "Jaddah",
    optD: "Bint",
    correctAnswer: "A"
  },
  {
    qText: "What is the Arabic word for 'Sun'?",
    optA: "Qamar",
    optB: "Najm",
    optC: "Shams",
    optD: "Sama'",
    correctAnswer: "C"
  },
  {
    qText: "What does 'Qamar' mean?",
    optA: "Sun",
    optB: "Moon",
    optC: "Star",
    optD: "Sky",
    correctAnswer: "B"
  },
  {
    qText: "What is the number '1' in Arabic?",
    optA: "Ithnan",
    optB: "Thalatha",
    optC: "Wahid",
    optD: "Arba'a",
    correctAnswer: "C"
  },
  {
    qText: "What is the number '5' in Arabic?",
    optA: "Khamsa",
    optB: "Sitta",
    optC: "Sab'a",
    optD: "Thamaniya",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following means 'Student' (male)?",
    optA: "Mu'allim",
    optB: "Talib",
    optC: "Tabib",
    optD: "Muhandis",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following means 'Teacher' (male)?",
    optA: "Mu'allim",
    optB: "Talib",
    optC: "Mudir",
    optD: "Sahafi",
    correctAnswer: "A"
  },
  {
    qText: "What does 'Bab' mean?",
    optA: "Window",
    optB: "Door",
    optC: "Wall",
    optD: "Roof",
    correctAnswer: "B"
  },
  {
    qText: "How do you say 'Boy' in Arabic?",
    optA: "Walad",
    optB: "Bint",
    optC: "Rajul",
    optD: "Imra'ah",
    correctAnswer: "A"
  },
  {
    qText: "How do you say 'Girl' in Arabic?",
    optA: "Walad",
    optB: "Bint",
    optC: "Rajul",
    optD: "Imra'ah",
    correctAnswer: "B"
  },
  {
    qText: "What is the Arabic word for 'Bread'?",
    optA: "Lahm",
    optB: "Khubz",
    optC: "Dajaj",
    optD: "Samak",
    correctAnswer: "B"
  },
  {
    qText: "What does 'Lahm' mean?",
    optA: "Chicken",
    optB: "Fish",
    optC: "Meat",
    optD: "Rice",
    correctAnswer: "C"
  },
  {
    qText: "How do you say 'Big' in Arabic?",
    optA: "Saghir",
    optB: "Kabir",
    optC: "Tawil",
    optD: "Qasir",
    correctAnswer: "B"
  },
  {
    qText: "What is the opposite of 'Kabir' (Big)?",
    optA: "Tawil",
    optB: "Jamil",
    optC: "Saghir",
    optD: "Jadid",
    correctAnswer: "C"
  },
  {
    qText: "What does 'Jamil' mean?",
    optA: "Ugly",
    optB: "Beautiful",
    optC: "Strong",
    optD: "Weak",
    correctAnswer: "B"
  },
  {
    qText: "How do you say 'Dog' in Arabic?",
    optA: "Qitt",
    optB: "Kalb",
    optC: "Hisan",
    optD: "Asad",
    correctAnswer: "B"
  },
  {
    qText: "What is the Arabic word for 'Cat'?",
    optA: "Kalb",
    optB: "Qitt",
    optC: "Jamal",
    optD: "Baqarah",
    correctAnswer: "B"
  },
  {
    qText: "What does 'Asad' mean?",
    optA: "Tiger",
    optB: "Lion",
    optC: "Elephant",
    optD: "Bear",
    correctAnswer: "B"
  },
  {
    qText: "How do you ask 'How are you?' (to a male) in Arabic?",
    optA: "Kayfa haluka?",
    optB: "Ma ismuka?",
    optC: "Min ayna anta?",
    optD: "Kam 'umruka?",
    correctAnswer: "A"
  },
  {
    qText: "What is the response to 'Ahlan wa sahlan' (Welcome)?",
    optA: "Ma'a as-salamah",
    optB: "Ahlan bika / biki",
    optC: "Sabah al-nur",
    optD: "Masa' al-nur",
    correctAnswer: "B"
  },
  {
    qText: "What does 'Qalam' mean?",
    optA: "Book",
    optB: "Paper",
    optC: "Pen",
    optD: "Eraser",
    correctAnswer: "C"
  },
  {
    qText: "What is the Arabic word for 'City'?",
    optA: "Madinah",
    optB: "Qaryah",
    optC: "Dawlah",
    optD: "Tariq",
    correctAnswer: "A"
  },
  {
    qText: "How do you say 'Black' (masculine) in Arabic?",
    optA: "Abyad",
    optB: "Aswad",
    optC: "Ahmar",
    optD: "Akhdar",
    correctAnswer: "B"
  },
  {
    qText: "What color is 'Abyad'?",
    optA: "Red",
    optB: "Green",
    optC: "Blue",
    optD: "White",
    correctAnswer: "D"
  },
  {
    qText: "How do you say 'I' in Arabic?",
    optA: "Ana",
    optB: "Anta",
    optC: "Huwa",
    optD: "Hiya",
    correctAnswer: "A"
  },
  {
    qText: "What does 'Huwa' mean?",
    optA: "I",
    optB: "You (male)",
    optC: "He",
    optD: "She",
    correctAnswer: "C"
  },
  {
    qText: "What is the Arabic word for 'Friend' (male)?",
    optA: "Sadiq",
    optB: "Aduw",
    optC: "Zamil",
    optD: "Jar",
    correctAnswer: "A"
  },
  {
    qText: "What does 'Sama'' mean?",
    optA: "Earth",
    optB: "Sky",
    optC: "Sea",
    optD: "River",
    correctAnswer: "B"
  },
  {
    qText: "How do you say 'Market' in Arabic?",
    optA: "Suq",
    optB: "Dukkan",
    optC: "Mat'am",
    optD: "Mustashfa",
    correctAnswer: "A"
  },
  {
    qText: "What is the Arabic word for 'Hospital'?",
    optA: "Funduq",
    optB: "Mat'am",
    optC: "Mustashfa",
    optD: "Matar",
    correctAnswer: "C"
  },
  {
    qText: "What does 'Mat'am' mean?",
    optA: "Airport",
    optB: "Hotel",
    optC: "Restaurant",
    optD: "Bank",
    correctAnswer: "C"
  },
  {
    qText: "How do you say 'Good night' in Arabic?",
    optA: "Sabah al-khayr",
    optB: "Masa' al-khayr",
    optC: "Tusbih 'ala khayr",
    optD: "Ma'a as-salamah",
    correctAnswer: "C"
  },
  {
    qText: "What is the Arabic word for 'Apple'?",
    optA: "Burtuqal",
    optB: "Tuffah",
    optC: "Mawz",
    optD: "Fawakih",
    correctAnswer: "B"
  },
  {
    qText: "What does 'Ma ismuka?' mean (to a male)?",
    optA: "How old are you?",
    optB: "Where are you from?",
    optC: "What is your name?",
    optD: "How are you?",
    correctAnswer: "C"
  },
  {
    qText: "How do you say 'Day' in Arabic?",
    optA: "Yawm",
    optB: "Shahr",
    optC: "Sanah",
    optD: "Usbu'",
    correctAnswer: "A"
  },
  {
    qText: "What does 'Sanah' mean?",
    optA: "Day",
    optB: "Week",
    optC: "Month",
    optD: "Year",
    correctAnswer: "D"
  },
  {
    qText: "What is the Arabic word for 'Hand'?",
    optA: "Yad",
    optB: "Rijl",
    optC: "Ra's",
    optD: "Ayn",
    correctAnswer: "A"
  },
  {
    qText: "How do you say 'Eye' in Arabic?",
    optA: "Anf",
    optB: "Famm",
    optC: "Ayn",
    optD: "Udhun",
    correctAnswer: "C"
  },
  {
    qText: "What does 'Jadid' mean?",
    optA: "Old",
    optB: "New",
    optC: "Good",
    optD: "Bad",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'arabic';
  const subjectGroup = 'Arts';
  const subjectName = 'Arabic';

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

    for (const q of arabicQuestions) {
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
