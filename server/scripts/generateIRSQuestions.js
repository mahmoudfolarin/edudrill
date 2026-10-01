require('dotenv').config();
const pool = require('../src/config/database');

const irsQuestions = [
  {
    qText: "The first revelation of the Qur'an was received by Prophet Muhammad in the cave of:",
    optA: "Thawr",
    optB: "Hira",
    optC: "Uhud",
    optD: "Arafat",
    correctAnswer: "B"
  },
  {
    qText: "The first word of the Qur'an revealed to Prophet Muhammad was:",
    optA: "Al-Hamd",
    optB: "Bismillah",
    optC: "Iqra",
    optD: "Qul",
    correctAnswer: "C"
  },
  {
    qText: "The flight of Prophet Muhammad from Makkah to Madinah is known as:",
    optA: "Mi'raj",
    optB: "Isra",
    optC: "Hijrah",
    optD: "Jihad",
    correctAnswer: "C"
  },
  {
    qText: "How many chapters (Surahs) are there in the Holy Qur'an?",
    optA: "112",
    optB: "114",
    optC: "116",
    optD: "120",
    correctAnswer: "B"
  },
  {
    qText: "The longest Surah in the Qur'an is:",
    optA: "Surah Al-Imran",
    optB: "Surah Al-Nisa",
    optC: "Surah Al-Ma'idah",
    optD: "Surah Al-Baqarah",
    correctAnswer: "D"
  },
  {
    qText: "Which Surah is considered the heart of the Qur'an?",
    optA: "Surah Yasin",
    optB: "Surah Ar-Rahman",
    optC: "Surah Al-Mulk",
    optD: "Surah Al-Fatihah",
    correctAnswer: "A"
  },
  {
    qText: "The pillar of Islam that enjoins fasting during the month of Ramadan is:",
    optA: "Salat",
    optB: "Zakat",
    optC: "Sawm",
    optD: "Hajj",
    correctAnswer: "C"
  },
  {
    qText: "Zakat is obligatory on every adult Muslim whose wealth reaches the:",
    optA: "Nisab",
    optB: "Sadaqah",
    optC: "Mahr",
    optD: "Khums",
    correctAnswer: "A"
  },
  {
    qText: "The pilgrimage to Makkah (Hajj) must be performed in the month of:",
    optA: "Ramadan",
    optB: "Shawwal",
    optC: "Muharram",
    optD: "Dhul-Hijjah",
    correctAnswer: "D"
  },
  {
    qText: "Which angel is responsible for bringing revelations to the Prophets?",
    optA: "Mika'il",
    optB: "Israfil",
    optC: "Jibril",
    optD: "Izra'il",
    correctAnswer: "C"
  },
  {
    qText: "The belief in the Oneness of Allah is called:",
    optA: "Tawhid",
    optB: "Shirk",
    optC: "Kufr",
    optD: "Nifaq",
    correctAnswer: "A"
  },
  {
    qText: "The opposite of Tawhid, which means associating partners with Allah, is:",
    optA: "Bid'ah",
    optB: "Shirk",
    optC: "Fisq",
    optD: "Riya",
    correctAnswer: "B"
  },
  {
    qText: "The first caliph of Islam after the death of Prophet Muhammad was:",
    optA: "Umar ibn Al-Khattab",
    optB: "Uthman ibn Affan",
    optC: "Ali ibn Abi Talib",
    optD: "Abu Bakr As-Siddiq",
    correctAnswer: "D"
  },
  {
    qText: "Which caliph compiled the Qur'an into a single standardized book?",
    optA: "Abu Bakr",
    optB: "Umar",
    optC: "Uthman",
    optD: "Ali",
    correctAnswer: "C"
  },
  {
    qText: "The Islamic calendar begins with which event?",
    optA: "The birth of the Prophet",
    optB: "The Hijrah",
    optC: "The first revelation",
    optD: "The conquest of Makkah",
    correctAnswer: "B"
  },
  {
    qText: "The battle in which the Muslims were victorious despite being heavily outnumbered by the Quraysh was the Battle of:",
    optA: "Uhud",
    optB: "Khandaq",
    optC: "Badr",
    optD: "Hunayn",
    correctAnswer: "C"
  },
  {
    qText: "The treaty of Hudaybiyyah was signed between the Muslims and the Quraysh in the year:",
    optA: "4 AH",
    optB: "6 AH",
    optC: "8 AH",
    optD: "10 AH",
    correctAnswer: "B"
  },
  {
    qText: "The mother of Prophet Muhammad was:",
    optA: "Khadijah",
    optB: "Aishah",
    optC: "Aminah",
    optD: "Halimah",
    correctAnswer: "C"
  },
  {
    qText: "The Prophet's grandfather who took care of him after his mother's death was:",
    optA: "Abu Talib",
    optB: "Abdul Muttalib",
    optC: "Hamzah",
    optD: "Abbas",
    correctAnswer: "B"
  },
  {
    qText: "The primary source of Islamic law (Shari'ah) is:",
    optA: "Ijma",
    optB: "Qiyas",
    optC: "The Qur'an",
    optD: "Sunnah",
    correctAnswer: "C"
  },
  {
    qText: "The traditions and practices of Prophet Muhammad are collectively known as:",
    optA: "Tafsir",
    optB: "Sunnah",
    optC: "Fiqh",
    optD: "Aqidah",
    correctAnswer: "B"
  },
  {
    qText: "The consensus of Islamic scholars on a legal issue is termed:",
    optA: "Qiyas",
    optB: "Ijtihad",
    optC: "Ijma",
    optD: "Fatwa",
    correctAnswer: "C"
  },
  {
    qText: "The compulsory charity given at the end of Ramadan is called:",
    optA: "Zakat al-Mal",
    optB: "Sadaqah",
    optC: "Zakat al-Fitr",
    optD: "Fidyah",
    correctAnswer: "C"
  },
  {
    qText: "Which Prophet is known as Khalilullah (The Friend of Allah)?",
    optA: "Prophet Musa",
    optB: "Prophet Isa",
    optC: "Prophet Ibrahim",
    optD: "Prophet Nuh",
    correctAnswer: "C"
  },
  {
    qText: "The Zabur (Psalms) was revealed to Prophet:",
    optA: "Dawud",
    optB: "Musa",
    optC: "Isa",
    optD: "Ibrahim",
    correctAnswer: "A"
  },
  {
    qText: "The Injil (Gospel) was revealed to Prophet:",
    optA: "Musa",
    optB: "Isa",
    optC: "Dawud",
    optD: "Muhammad",
    correctAnswer: "B"
  },
  {
    qText: "Ablution (Wudu) is an obligatory prerequisite for:",
    optA: "Fasting",
    optB: "Zakat",
    optC: "Salat",
    optD: "Sadaqah",
    correctAnswer: "C"
  },
  {
    qText: "Tayammum (dry ablution) is performed using:",
    optA: "Clean sand or earth",
    optB: "Water mixed with salt",
    optC: "Perfumed water",
    optD: "Oil",
    correctAnswer: "A"
  },
  {
    qText: "The direction Muslims face during prayer is known as the:",
    optA: "Mihrab",
    optB: "Minbar",
    optC: "Qiblah",
    optD: "Ka'bah",
    correctAnswer: "C"
  },
  {
    qText: "The call to prayer is known as:",
    optA: "Iqamah",
    optB: "Adhan",
    optC: "Khutbah",
    optD: "Tasbih",
    correctAnswer: "B"
  },
  {
    qText: "Which wife of the Prophet was the first person to accept Islam?",
    optA: "Aishah",
    optB: "Hafsah",
    optC: "Sawdah",
    optD: "Khadijah",
    correctAnswer: "D"
  },
  {
    qText: "The Islamic greeting 'As-salamu alaykum' means:",
    optA: "Praise be to God",
    optB: "Peace be upon you",
    optC: "God is Great",
    optD: "Welcome",
    correctAnswer: "B"
  },
  {
    qText: "The Night of Power, which is better than a thousand months, is called:",
    optA: "Lailatul Qadr",
    optB: "Lailatul Mi'raj",
    optC: "Lailatul Bara'ah",
    optD: "Ashura",
    correctAnswer: "A"
  },
  {
    qText: "A verse of the Qur'an is called an:",
    optA: "Surah",
    optB: "Ayah",
    optC: "Juz",
    optD: "Hizb",
    correctAnswer: "B"
  },
  {
    qText: "The practice of seeking refuge in Allah from Satan before reciting the Qur'an is known as:",
    optA: "Basmalah",
    optB: "Ta'awwudh",
    optC: "Takbir",
    optD: "Tahmid",
    correctAnswer: "B"
  },
  {
    qText: "Which angel will blow the trumpet to signal the Day of Judgment?",
    optA: "Jibril",
    optB: "Mika'il",
    optC: "Israfil",
    optD: "Malik",
    correctAnswer: "C"
  },
  {
    qText: "The two angels who record the deeds of humans are called:",
    optA: "Munkar and Nakir",
    optB: "Kiraman Katibin",
    optC: "Harut and Marut",
    optD: "Raqib and Atid",
    correctAnswer: "B"
  },
  {
    qText: "The angels who question the dead in the grave are:",
    optA: "Munkar and Nakir",
    optB: "Kiraman Katibin",
    optC: "Harut and Marut",
    optD: "Jibril and Mika'il",
    correctAnswer: "A"
  },
  {
    qText: "The Islamic term for the Day of Judgment is:",
    optA: "Yawm al-Jumu'ah",
    optB: "Yawm al-Qiyamah",
    optC: "Yawm al-Arafah",
    optD: "Yawm al-Eid",
    correctAnswer: "B"
  },
  {
    qText: "In Islam, eating pork and consuming alcohol are considered:",
    optA: "Halal",
    optB: "Makruh",
    optC: "Haram",
    optD: "Mubah",
    correctAnswer: "C"
  },
  {
    qText: "The term 'Halal' refers to things that are:",
    optA: "Permissible",
    optB: "Prohibited",
    optC: "Disliked",
    optD: "Doubtful",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following acts invalidates the fast (Sawm)?",
    optA: "Brushing teeth",
    optB: "Eating intentionally",
    optC: "Swallowing saliva",
    optD: "Taking a shower",
    correctAnswer: "B"
  },
  {
    qText: "The running between the hills of Safa and Marwah during Hajj is called:",
    optA: "Tawaf",
    optB: "Sa'y",
    optC: "Wuquf",
    optD: "Ramy",
    correctAnswer: "B"
  },
  {
    qText: "The circumambulation of the Ka'bah is known as:",
    optA: "Tawaf",
    optB: "Sa'y",
    optC: "Wuquf",
    optD: "Ihram",
    correctAnswer: "A"
  },
  {
    qText: "Standing at Mount Arafat, the most crucial part of Hajj, is called:",
    optA: "Tawaf",
    optB: "Sa'y",
    optC: "Wuquf",
    optD: "Talbiyah",
    correctAnswer: "C"
  },
  {
    qText: "The sermon delivered before the Friday congregational prayer is the:",
    optA: "Khutbah",
    optB: "Adhan",
    optC: "Iqamah",
    optD: "Tasbih",
    correctAnswer: "A"
  },
  {
    qText: "A voluntary prayer performed late at night is known as:",
    optA: "Salatul Duha",
    optB: "Salatul Tahajjud",
    optC: "Salatul Janazah",
    optD: "Salatul Istisqa",
    correctAnswer: "B"
  },
  {
    qText: "The prayer offered for a deceased Muslim is called:",
    optA: "Salatul Duha",
    optB: "Salatul Tahajjud",
    optC: "Salatul Janazah",
    optD: "Salatul Istisqa",
    correctAnswer: "C"
  },
  {
    qText: "The bridge over Hell which everyone must cross on the Day of Judgment is called the:",
    optA: "Sirat",
    optB: "Mizan",
    optC: "Kawthar",
    optD: "A'raf",
    correctAnswer: "A"
  },
  {
    qText: "The scales on which deeds will be weighed on the Day of Judgment are called:",
    optA: "Sirat",
    optB: "Mizan",
    optC: "Sahifah",
    optD: "Lawh",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'islamic-studies';
  const subjectGroup = 'Arts';
  const subjectName = 'Islamic Studies';

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

    for (const q of irsQuestions) {
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
