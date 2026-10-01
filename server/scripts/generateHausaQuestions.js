require('dotenv').config();
const pool = require('../src/config/database');

const hausaQuestions = [
  {
    qText: "Menene ma'anar kalmar 'Sannu' a harshen Hausa?",
    optA: "Barka da zuwa",
    optB: "Gaisuwa (Hello/Sorry)",
    optC: "Ina kwana",
    optD: "Sai gobe",
    correctAnswer: "B"
  },
  {
    qText: "Wane ne ya rubuta littafin 'Magana Jari Ce'?",
    optA: "Abubakar Tafawa Balewa",
    optB: "Abubakar Imam",
    optC: "Sa'adu Zungur",
    optD: "Aminu Kano",
    correctAnswer: "B"
  },
  {
    qText: "Yaya ake cewa 'Good morning' da Hausa?",
    optA: "Ina wuni",
    optB: "Sai an jima",
    optC: "Ina kwana",
    optD: "Barka da yamma",
    correctAnswer: "C"
  },
  {
    qText: "Wane gari ne ya fi shahara a kan harkar fatauna da fata a kasar Hausa?",
    optA: "Zaria",
    optB: "Kano",
    optC: "Katsina",
    optD: "Sokoto",
    correctAnswer: "B"
  },
  {
    qText: "Menene ma'anar karin maganar nan: 'Gani ya kori ji'?",
    optA: "Idan ka ga abu ba sai an ba ka labari ba",
    optB: "Kallo yana kawo gani",
    optC: "Jiyya tafi kallo",
    optD: "Ganin abu da ido bai isa ba",
    correctAnswer: "A"
  },
  {
    qText: "Menene sunan ranar Asabar a harshen Ingilishi?",
    optA: "Sunday",
    optB: "Friday",
    optC: "Saturday",
    optD: "Monday",
    correctAnswer: "C"
  },
  {
    qText: "Wane babban birni ne cibiyar addinin Musulunci a kasar Hausa tun fil azal?",
    optA: "Zaria",
    optB: "Kaduna",
    optC: "Sokoto",
    optD: "Kano",
    correctAnswer: "C"
  },
  {
    qText: "Ina ake cewa 'Ruwa' a harshen Ingilishi?",
    optA: "Food",
    optB: "Water",
    optC: "Fire",
    optD: "Earth",
    correctAnswer: "B"
  },
  {
    qText: "Menene lambar 'Ashirin' da lissafin Hausa?",
    optA: "10",
    optB: "20",
    optC: "30",
    optD: "40",
    correctAnswer: "B"
  },
  {
    qText: "Wanene ya kafa daular Usmaniyya (Sokoto Caliphate)?",
    optA: "Sultan Muhammadu Maccido",
    optB: "Usman Dan Fodio",
    optC: "Abdullahi Dan Fodio",
    optD: "Muhammad Bello",
    correctAnswer: "B"
  },
  {
    qText: "Menene 'Littafi' a harshen Turanci?",
    optA: "Pen",
    optB: "Book",
    optC: "Paper",
    optD: "Bag",
    correctAnswer: "B"
  },
  {
    qText: "Wane launi ne ake kira 'Fari' da Hausa?",
    optA: "Black",
    optB: "White",
    optC: "Red",
    optD: "Green",
    correctAnswer: "B"
  },
  {
    qText: "Yaya ake kiran 'Kare' da Ingilishi?",
    optA: "Cat",
    optB: "Dog",
    optC: "Lion",
    optD: "Goat",
    correctAnswer: "B"
  },
  {
    qText: "Menene babban abincin mutanen arewacin Najeriya?",
    optA: "Amala",
    optB: "Tuwo",
    optC: "Iyan",
    optD: "Akpu",
    correctAnswer: "B"
  },
  {
    qText: "Wanene marubucin littafin 'Shaihu Umar'?",
    optA: "Abubakar Tafawa Balewa",
    optB: "Abubakar Imam",
    optC: "Aliyu Namangi",
    optD: "Aminu Kano",
    correctAnswer: "A"
  },
  {
    qText: "Me ake nufi da kalmar 'Gona'?",
    optA: "House",
    optB: "Market",
    optC: "Farm",
    optD: "School",
    correctAnswer: "C"
  },
  {
    qText: "Karin magana: 'Hannu daya ba ya daukar...'",
    optA: "Kaya",
    optB: "Ruwa",
    optC: "Jinka",
    optD: "Gida",
    correctAnswer: "C"
  },
  {
    qText: "Menene 'Kasuwa' da Ingilishi?",
    optA: "Mosque",
    optB: "Market",
    optC: "Hospital",
    optD: "Town",
    correctAnswer: "B"
  },
  {
    qText: "Menene babban aikin Malamin Makaranta?",
    optA: "Siyayya",
    optB: "Noma",
    optC: "Koyarwa",
    optD: "Sassaqa",
    correctAnswer: "C"
  },
  {
    qText: "Wace dabba ce ake kira 'Rakumi'?",
    optA: "Horse",
    optB: "Camel",
    optC: "Donkey",
    optD: "Cow",
    correctAnswer: "B"
  },
  {
    qText: "Menene ma'anar kalmar 'Tafiya'?",
    optA: "Sitting",
    optB: "Journey/Travel",
    optC: "Sleeping",
    optD: "Eating",
    correctAnswer: "B"
  },
  {
    qText: "Wane gari ne babbar cibiyar Musulunci a jihar Kaduna?",
    optA: "Zaria",
    optB: "Kafanchan",
    optC: "Saminaka",
    optD: "Kachia",
    correctAnswer: "A"
  },
  {
    qText: "Wane wasa ne aka fi sani a kasar Hausa wanda ake yi a kan doki?",
    optA: "Kwallon kafa",
    optB: "Dambe",
    optC: "Hawan Doki (Durbar)",
    optD: "Kokawa",
    correctAnswer: "C"
  },
  {
    qText: "A al'adar Hausawa, wane launi ne ke nuna juyayi (mourning)?",
    optA: "Fari",
    optB: "Baki",
    optC: "Ja",
    optD: "Koriya",
    correctAnswer: "B"
  },
  {
    qText: "Menene ma'anar karin magana: 'Idan kana raye, kana...'",
    optA: "Motsi",
    optB: "Shan ruwa",
    optC: "Tare da arziki",
    optD: "Tare da mutane",
    correctAnswer: "C"
  },
  {
    qText: "Menene lambar 'Daya' da lissafin Hausa?",
    optA: "1",
    optB: "2",
    optC: "3",
    optD: "4",
    correctAnswer: "A"
  },
  {
    qText: "Wane suna ake kiran makarantar da ake koyar da karatun Alkur'ani?",
    optA: "Makarantar boko",
    optB: "Makarantar Allo",
    optC: "Makarantar sakandare",
    optD: "Jami'a",
    correctAnswer: "B"
  },
  {
    qText: "Me ake nufi da kalmar 'Malam'?",
    optA: "Student",
    optB: "Teacher/Scholar",
    optC: "Doctor",
    optD: "Farmer",
    correctAnswer: "B"
  },
  {
    qText: "Mecece fassarar 'Sunana' a harshen Ingilishi?",
    optA: "My home",
    optB: "My friend",
    optC: "My name is",
    optD: "My age",
    correctAnswer: "C"
  },
  {
    qText: "Menene babban sana'ar mutanen karkara a kasar Hausa?",
    optA: "Kasuwanci",
    optB: "Kira",
    optC: "Noma",
    optD: "Sassaqa",
    correctAnswer: "C"
  },
  {
    qText: "A Hausance, wane sashi na jiki ake gani da shi?",
    optA: "Hanci",
    optB: "Ido",
    optC: "Kunne",
    optD: "Baki",
    correctAnswer: "B"
  },
  {
    qText: "Menene ma'anar 'Kaza' da Ingilishi?",
    optA: "Bird",
    optB: "Duck",
    optC: "Chicken",
    optD: "Turkey",
    correctAnswer: "C"
  },
  {
    qText: "Wane zobe ne ake sawa a al'adar Hausawa wajen daura aure?",
    optA: "Zoben karfe",
    optB: "Zoben azurfa/zinariya",
    optC: "Zoben roba",
    optD: "Zoben dutse",
    correctAnswer: "B"
  },
  {
    qText: "Wanene Sarkin Kano na yanzu?",
    optA: "Ado Bayero",
    optB: "Muhammadu Sanusi II / Aminu Ado Bayero",
    optC: "Ibrahim Dasuki",
    optD: "Shehu Idris",
    correctAnswer: "B"
  },
  {
    qText: "Menene ma'anar 'Motar kasa' a zamanin da?",
    optA: "Car",
    optB: "Bicycle",
    optC: "Train",
    optD: "Airplane",
    correctAnswer: "C"
  },
  {
    qText: "A wane gari ne Jami'ar Ahmadu Bello (ABU) take?",
    optA: "Kano",
    optB: "Kaduna",
    optC: "Zaria",
    optD: "Sokoto",
    correctAnswer: "C"
  },
  {
    qText: "Me ake amfani da shi wajen yin 'Tuwo'?",
    optA: "Shinkafa ko Masara",
    optB: "Nama",
    optC: "Wake",
    optD: "Doya",
    correctAnswer: "A"
  },
  {
    qText: "Yaya ake cewa 'Welcome' da Hausa?",
    optA: "Sannu da zuwa",
    optB: "Sannu da aiki",
    optC: "Sai an jima",
    optD: "Allah ya kiyaye",
    correctAnswer: "A"
  },
  {
    qText: "Wanene ke jagorantar sallah a Masallaci?",
    optA: "Ladan",
    optB: "Sarki",
    optC: "Limam",
    optD: "Hakimi",
    correctAnswer: "C"
  },
  {
    qText: "Me ake nufi da kalmar 'Yaro'?",
    optA: "Girl",
    optB: "Boy",
    optC: "Man",
    optD: "Woman",
    correctAnswer: "B"
  },
  {
    qText: "A wane wata ne ake azumin watan Ramadan?",
    optA: "Watan farko na Musulunci",
    optB: "Watan tara na Musulunci",
    optC: "Watan karshe na Musulunci",
    optD: "Watan hudu na Musulunci",
    correctAnswer: "B"
  },
  {
    qText: "Menene makamin gargajiya da Hausawa ke amfani da shi wajen farauta?",
    optA: "Bindiga",
    optB: "Takobi",
    optC: "Baka da Kibiya",
    optD: "Mashi",
    correctAnswer: "C"
  },
  {
    qText: "Yaya ake cewa 'Gida' da Ingilishi?",
    optA: "Tree",
    optB: "House",
    optC: "Road",
    optD: "Car",
    correctAnswer: "B"
  },
  {
    qText: "Menene 'Maciji' a harshen Turanci?",
    optA: "Snake",
    optB: "Lizard",
    optC: "Frog",
    optD: "Crocodile",
    correctAnswer: "A"
  },
  {
    qText: "Wane kida ne ake yi wa Sarakuna a kasar Hausa?",
    optA: "Kalangu",
    optB: "Goge",
    optC: "Kakaki da Tambura",
    optD: "Kukuma",
    correctAnswer: "C"
  },
  {
    qText: "Me ake nufi da karin magana: 'Kome nisan Jifa...'",
    optA: "A kasa zai fado",
    optB: "A ruwa zai fada",
    optC: "A sama zai tsaya",
    optD: "Ba zai dawo ba",
    correctAnswer: "A"
  },
  {
    qText: "Menene lambar 'Doriya' (Dari) da Hausa?",
    optA: "10",
    optB: "100",
    optC: "1000",
    optD: "1,000,000",
    correctAnswer: "B"
  },
  {
    qText: "Wace tufa ce Hausawa maza suka fi sawa?",
    optA: "Shadda / Babban Riga",
    optB: "Atamfa",
    optC: "Zani",
    optD: "Gele",
    correctAnswer: "A"
  },
  {
    qText: "Me ake nufi da kalmar 'Abinci'?",
    optA: "Water",
    optB: "Food",
    optC: "Cloth",
    optD: "Shoe",
    correctAnswer: "B"
  },
  {
    qText: "A wace rana ake gudanar da sallar Juma'a?",
    optA: "Alhamis",
    optB: "Asabar",
    optC: "Juma'a",
    optD: "Lahadi",
    correctAnswer: "C"
  }
];

async function main() {
  const subjectSlug = 'hausa';
  const subjectGroup = 'Arts';
  const subjectName = 'Hausa';

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

    for (const q of hausaQuestions) {
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
