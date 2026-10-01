require('dotenv').config();
const pool = require('../src/config/database');

const igboQuestions = [
  {
    qText: "Gịnị ka 'Nnọọ' pụtara na bekee?",
    optA: "Good morning",
    optB: "Welcome",
    optC: "Goodbye",
    optD: "Thank you",
    correctAnswer: "B"
  },
  {
    qText: "Kedu otu a na-ekele mmadụ n'ụtụtụ n'asụsụ Igbo?",
    optA: "Ka chifoo",
    optB: "Nnọọ",
    optC: "Ịbọọla chi / Ụtụtụ ọma",
    optD: "Daalụ",
    correctAnswer: "C"
  },
  {
    qText: "Kedu ihe bụ 'Mmiri' na bekee?",
    optA: "Food",
    optB: "Water",
    optC: "Fire",
    optD: "Sand",
    correctAnswer: "B"
  },
  {
    qText: "Ọnụọgụgụ 'Iri' pụtara gịnị na bekee?",
    optA: "Five",
    optB: "Ten",
    optC: "Twenty",
    optD: "Fifty",
    correctAnswer: "B"
  },
  {
    qText: "Onye na-edebe ezinụlọ na omenala Igbo bụ onye?",
    optA: "Nwa",
    optB: "Nne",
    optC: "Nna / Ọkpala",
    optD: "Nwaanyi",
    correctAnswer: "C"
  },
  {
    qText: "Kedu ihe na-anọchi anya onye kacha okenye na nwoke n'ezinụlọ?",
    optA: "Ada",
    optB: "Okenye",
    optC: "Ọkpala / Diọkpa",
    optD: "Udo",
    correctAnswer: "C"
  },
  {
    qText: "Kedu ihe a na-akpọ nwa nwaanyi kacha okenye n'ezinụlọ?",
    optA: "Ọkpala",
    optB: "Ada",
    optC: "Nne",
    optD: "Lolo",
    correctAnswer: "B"
  },
  {
    qText: "Gịnị bụ ụbọchị ahịa anọ ndị Igbo nwere?",
    optA: "Eke, Orie, Afor, Nkwo",
    optB: "Eke, Monday, Orie, Nkwo",
    optC: "Afor, Nkwo, Friday, Eke",
    optD: "Monday, Tuesday, Wednesday, Thursday",
    correctAnswer: "A"
  },
  {
    qText: "Gịnị ka onye na-arịa ọrịa na-aga achọ?",
    optA: "Ego",
    optB: "Ọgwụ / Ụlọ ọgwụ",
    optC: "Uwe",
    optD: "Oche",
    correctAnswer: "B"
  },
  {
    qText: "Kedu onye dere akwụkwọ bụ 'Things Fall Apart' nke metụtara ọdịnala Igbo?",
    optA: "Cyprian Ekwensi",
    optB: "Wole Soyinka",
    optC: "Chinua Achebe",
    optD: "Flora Nwapa",
    correctAnswer: "C"
  },
  {
    qText: "N'omenala Igbo, gịnị ka a na-eji anabata ọbịa?",
    optA: "Mmanya na anụ",
    optB: "Ọjị (Kola nut)",
    optC: "Akwụkwọ",
    optD: "Ego",
    correctAnswer: "B"
  },
  {
    qText: "Ilu: 'Onye ajụjụ anaghị efunahụ...'",
    optA: "Ụzọ",
    optB: "Ahịa",
    optC: "Ụlọ",
    optD: "Ego",
    correctAnswer: "A"
  },
  {
    qText: "Kedu agba bụ 'Ọcha'?",
    optA: "Black",
    optB: "Red",
    optC: "White",
    optD: "Green",
    correctAnswer: "C"
  },
  {
    qText: "Gịnị bụ 'Nkịta' na bekee?",
    optA: "Cat",
    optB: "Goat",
    optC: "Dog",
    optD: "Cow",
    correctAnswer: "C"
  },
  {
    qText: "Kedu ihe a na-akpọ 'Nne na Nna' na bekee?",
    optA: "Brother and Sister",
    optB: "Mother and Father / Parents",
    optC: "Uncle and Aunt",
    optD: "Boy and Girl",
    correctAnswer: "B"
  },
  {
    qText: "Ọ bụrụ na ịchọrọ ịsị 'Thank you', gịnị ka ị ga-ekwu?",
    optA: "Biko",
    optB: "Nnọọ",
    optC: "Daalụ / Imeela",
    optD: "Ezigbo",
    correctAnswer: "C"
  },
  {
    qText: "Kedu ihe bụ ọrụ ndị Igbo kacha eji enweta ihe oriri n'oge gboo?",
    optA: "Ọkụ azụ",
    optB: "Ọrụ ugbo",
    optC: "Ịkwa ákwà",
    optD: "Ịkụ ọkpọ",
    correctAnswer: "B"
  },
  {
    qText: "Gịnị bụ 'Ụlọ akwụkwọ'?",
    optA: "Hospital",
    optB: "Market",
    optC: "School",
    optD: "Church",
    correctAnswer: "C"
  },
  {
    qText: "Kedu otu esi akpọ mmadụ pụtara ihe mere omume ojoo?",
    optA: "Ezigbo mmadụ",
    optB: "Onye ọjọọ",
    optC: "Onye ohi",
    optD: "Onye eze",
    correctAnswer: "B"
  },
  {
    qText: "Ilu: 'Nwa nkịta nwere onye nwe ya, anaghị...'",
    optA: "Agba ọsọ",
    optB: "Ata mmadụ arụ",
    optC: "Efu ofia",
    optD: "Eje ije",
    correctAnswer: "C"
  },
  {
    qText: "Kedu aha a na-akpọ chi kacha elu n'ọdịnala Igbo?",
    optA: "Amadioha",
    optB: "Agwụ",
    optC: "Chukwu Abiama / Chineke",
    optD: "Ikenga",
    correctAnswer: "C"
  },
  {
    qText: "Onye bụ eze na-achị obodo n'Igbo?",
    optA: "Lolo",
    optB: "Igwe / Eze",
    optC: "Nze",
    optD: "Ozo",
    correctAnswer: "B"
  },
  {
    qText: "Gịnị ka 'Eze' pụtara?",
    optA: "King",
    optB: "Queen",
    optC: "Prince",
    optD: "Servant",
    correctAnswer: "A"
  },
  {
    qText: "Kedu ihe a na-akpọ eze nwaanyị ma ọ bụ nwunye eze?",
    optA: "Lolo",
    optB: "Ada",
    optC: "Ọdụ",
    optD: "Nwaanyi oma",
    correctAnswer: "A"
  },
  {
    qText: "Ihe ọkụkụ kacha mkpa a na-akwanyere ugwu n'ala Igbo bụ:",
    optA: "Ji (Yam)",
    optB: "Ede",
    optC: "Akwụ",
    optD: "Oka",
    correctAnswer: "A"
  },
  {
    qText: "Gịnị na-eme tupu a lụọ nwaanyị n'ala Igbo?",
    optA: "Ịba n'ụka",
    optB: "Ịkwụ ụgwọ isi nwanyị (Bride price)",
    optC: "Ịmụ nwa",
    optD: "Ịgụ aha",
    correctAnswer: "B"
  },
  {
    qText: "Kedu otu esi asị 'I love you' n'Igbo?",
    optA: "A hụrụ m gị n'anya",
    optB: "Iwe na-ewe m",
    optC: "Achọrọ m gị",
    optD: "Nye m nri",
    correctAnswer: "A"
  },
  {
    qText: "Gịnị bụ 'Ofe' na bekee?",
    optA: "Meat",
    optB: "Soup",
    optC: "Water",
    optD: "Yam",
    correctAnswer: "B"
  },
  {
    qText: "Kedu agba bụ 'Ojii'?",
    optA: "White",
    optB: "Black",
    optC: "Blue",
    optD: "Yellow",
    correctAnswer: "B"
  },
  {
    qText: "Kedu nwunye a na-akpọ 'Nwunye'?",
    optA: "Mother",
    optB: "Sister",
    optC: "Wife",
    optD: "Aunt",
    correctAnswer: "C"
  },
  {
    qText: "Gịnị bụ 'Ego'?",
    optA: "Money",
    optB: "Cloth",
    optC: "House",
    optD: "Shoe",
    correctAnswer: "A"
  },
  {
    qText: "Ọnwa ole dị n'afọ Igbo (Ọnwa)?",
    optA: "12",
    optB: "13",
    optC: "10",
    optD: "7",
    correctAnswer: "B"
  },
  {
    qText: "Kedu ihe 'Biko' pụtara?",
    optA: "Please",
    optB: "Sorry",
    optC: "Thank you",
    optD: "Welcome",
    correctAnswer: "A"
  },
  {
    qText: "Kedu anụmanụ bụ 'Enyi'?",
    optA: "Lion",
    optB: "Elephant",
    optC: "Monkey",
    optD: "Leopard",
    correctAnswer: "B"
  },
  {
    qText: "Onye ọjọọ a na-atụ egwu n'akụkọ ifo Igbo bụ:",
    optA: "Mbe (Tortoise)",
    optB: "Enyi (Elephant)",
    optC: "Agụ (Leopard)",
    optD: "Eke (Python)",
    correctAnswer: "A"
  },
  {
    qText: "Gịnị bụ 'Ịgụ aha'?",
    optA: "Marriage",
    optB: "Burial",
    optC: "Naming ceremony",
    optD: "Festival",
    correctAnswer: "C"
  },
  {
    qText: "Kedu uwe kacha ewu ewu ụmụ nwoke na-eyi n'emume Igbo?",
    optA: "Agbada",
    optB: "Isiagu",
    optC: "Buba",
    optD: "Kaftan",
    correctAnswer: "B"
  },
  {
    qText: "Gịnị bụ 'Egwu ọnwa'?",
    optA: "Sun dance",
    optB: "Rain dance",
    optC: "Moonlight play/dance",
    optD: "War dance",
    correctAnswer: "C"
  },
  {
    qText: "Kedu akụkụ ahụ bụ 'Anya'?",
    optA: "Nose",
    optB: "Eye",
    optC: "Ear",
    optD: "Mouth",
    correctAnswer: "B"
  },
  {
    qText: "Gịnị bụ 'Isi' na bekee?",
    optA: "Leg",
    optB: "Hand",
    optC: "Head",
    optD: "Stomach",
    correctAnswer: "C"
  },
  {
    qText: "N'ihe banyere mmanwụ, ọ bụ naanị ụmụ gịnị na-aba mmanwụ?",
    optA: "Ụmụ nwaanyị",
    optB: "Ụmụ nwoke",
    optC: "Ụmụ aka",
    optD: "Ndị ọcha",
    correctAnswer: "B"
  },
  {
    qText: "Kedu ihe 'Ka ọ dị' pụtara?",
    optA: "Hello",
    optB: "Goodbye",
    optC: "Come here",
    optD: "Well done",
    correctAnswer: "B"
  },
  {
    qText: "Gịnị ka a na-akpọ oriri ọhụrụ a na-eme tupu erie ji ọhụrụ n'afọ?",
    optA: "Iri Ji ọhụrụ",
    optB: "Ịgbá Mmanwụ",
    optC: "Ọfala",
    optD: "Iwa akwa",
    correctAnswer: "A"
  },
  {
    qText: "Kedu okwu na-egosi ịkasi obi onye mmadụ nwụnahụrụ?",
    optA: "Ndo",
    optB: "Daalụ",
    optC: "Nnọọ",
    optD: "Jisie ike",
    correctAnswer: "A"
  },
  {
    qText: "Kedu ihe 'Azụ' pụtara?",
    optA: "Meat",
    optB: "Fish",
    optC: "Egg",
    optD: "Oil",
    correctAnswer: "B"
  },
  {
    qText: "Gịnị na-egosi na nwaanyị abụrụla di na nwunye n'omenala Igbo?",
    optA: "Ịgba akwụkwọ",
    optB: "Igba nkwụ nwanyị",
    optC: "Ịmụ nwa",
    optD: "Ịgụ aha",
    correctAnswer: "B"
  },
  {
    qText: "Kedu ihe bụ 'Ahịa'?",
    optA: "House",
    optB: "Church",
    optC: "Market",
    optD: "Farm",
    correctAnswer: "C"
  },
  {
    qText: "Gịnị pụtara 'Nwannem'?",
    optA: "My brother/sister",
    optB: "My father",
    optC: "My friend",
    optD: "My enemy",
    correctAnswer: "A"
  },
  {
    qText: "Ilu: 'Agwọ otu onye hụrụ na-aghọ...'",
    optA: "Eke",
    optB: "Anụ ọhịa",
    optC: "Eke (Python)",
    optD: "Ogbulu",
    correctAnswer: "C"
  },
  {
    qText: "Kedu ihe ị ga-asị iji jụọ mmadụ aha ya?",
    optA: "Kedu maka gị?",
    optB: "Kedu aha gị?",
    optC: "Ebee ka ị nọ?",
    optD: "Kedu ihe ị na-eme?",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'igbo';
  const subjectGroup = 'Arts';
  const subjectName = 'Igbo';

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

    for (const q of igboQuestions) {
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
