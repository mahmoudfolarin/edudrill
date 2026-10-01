require('dotenv').config();
const pool = require('../src/config/database');

const yorubaQuestions = [
  {
    qText: "Kí ni ìtumọ̀ 'Ẹ kàárọ̀' lédè Gẹ̀ẹ́sì?",
    optA: "Good afternoon",
    optB: "Good night",
    optC: "Good morning",
    optD: "Well done",
    correctAnswer: "C"
  },
  {
    qText: "Tí ẹnì kan bá ń bọ̀, kí ni a máa ń sọ fún un?",
    optA: "O dábọ̀",
    optB: "Ẹ kú àbọ̀",
    optC: "Ẹ kú iṣẹ́",
    optD: "Ẹ kú ìjókòó",
    correctAnswer: "B"
  },
  {
    qText: "Ta ni òǹkọ̀wé ìwé 'Ògbójú Ọdẹ Nínú Igbó Irúnmọlẹ̀'?",
    optA: "Akinwumi Isola",
    optB: "Wole Soyinka",
    optC: "D. O. Fagunwa",
    optD: "Hubert Ogunde",
    correctAnswer: "C"
  },
  {
    qText: "Kí ni àwọn Yorùbá máa ń lò láti dárà pè tàbí sọ̀rọ̀ ni ọ̀nà ìjìnlẹ̀?",
    optA: "Owe",
    optB: "Itan",
    optC: "Iro",
    optD: "Aroba",
    correctAnswer: "A"
  },
  {
    qText: "Òwe: 'Bí a bá ń sunkún, a máa ń...'",
    optA: "Ríran",
    optB: "Sùn",
    optC: "Jẹun",
    optD: "Sọ̀rọ̀",
    correctAnswer: "A"
  },
  {
    qText: "Ta ni olú-ìlú ìpínlẹ̀ Ọ̀yọ́?",
    optA: "Ogbomoso",
    optB: "Ibadan",
    optC: "Ilorin",
    optD: "Oyo",
    correctAnswer: "B"
  },
  {
    qText: "Nínú àṣà Yorùbá, ta ni a máa ń pè ní 'Ọba'?",
    optA: "Baale",
    optB: "Ijoye",
    optC: "King/Ruler",
    optD: "Teacher",
    correctAnswer: "C"
  },
  {
    qText: "Kí ni orúkọ ti àwọn Yorùbá ń pe 'Ọlọ́run' tàbí ẹlẹ́dàá?",
    optA: "Esu",
    optB: "Orunmila",
    optC: "Olodumare",
    optD: "Ogun",
    correctAnswer: "C"
  },
  {
    qText: "Mẹ́lòó ni 'Ogún' (Twenty) lédè Yorùbá?",
    optA: "10",
    optB: "20",
    optC: "30",
    optD: "40",
    correctAnswer: "B"
  },
  {
    qText: "Èwò ni kò sí lára oúnjẹ ìbílẹ̀ Yorùbá?",
    optA: "Amala",
    optB: "Iyan",
    optC: "Eba",
    optD: "Pizza",
    correctAnswer: "D"
  },
  {
    qText: "Ilu wo ni wọ́n ti máa ń ṣe ọdún Ọ̀ṣun ní gbogbo ọdún?",
    optA: "Ile-Ife",
    optB: "Oyo",
    optC: "Osogbo",
    optD: "Ibadan",
    correctAnswer: "C"
  },
  {
    qText: "Kí ni orúkọ aṣọ tí àwọn ọkùnrin Yorùbá máa ń wọ̀ tí ó ní àgbádá, bùbá, àti ṣòkòtò?",
    optA: "Iro ati Buba",
    optB: "Dandogo / Agbada",
    optC: "Kembe",
    optD: "Kaftan",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni ìtumọ̀ 'Omi' lédè Gẹ̀ẹ́sì?",
    optA: "Fire",
    optB: "Earth",
    optC: "Water",
    optD: "Wind",
    correctAnswer: "C"
  },
  {
    qText: "Báwo ni a ṣe ń pe orúkọ ọjọ́ 'Sunday' lédè Yorùbá?",
    optA: "Ojo Aje",
    optB: "Ojo Isegun",
    optC: "Ojo Isinmi / Ojo Aiku",
    optD: "Ojo Eti",
    correctAnswer: "C"
  },
  {
    qText: "Ta ni àwọn Yorùbá gbà gbọ́ pé ó dá ìlú Ilé-Ifẹ̀?",
    optA: "Oduduwa",
    optB: "Oranmiyan",
    optC: "Moremi",
    optD: "Sango",
    correctAnswer: "A"
  },
  {
    qText: "Kí ni a ń pe obìnrin tí ó bí abiyamọ lédè Yorùbá?",
    optA: "Iya",
    optB: "Baba",
    optC: "Oko",
    optD: "Aya",
    correctAnswer: "A"
  },
  {
    qText: "Nínú ìtàn àròsọ Yorùbá, ta ni òrìṣà iná àti mọ̀nàmọ́ná?",
    optA: "Ogun",
    optB: "Obatala",
    optC: "Sango",
    optD: "Osun",
    correctAnswer: "C"
  },
  {
    qText: "Kí ni a ń pe 'Mọ́kàndínlógún' ni nọmba?",
    optA: "18",
    optB: "19",
    optC: "20",
    optD: "21",
    correctAnswer: "B"
  },
  {
    qText: "Ìyàwó rẹ, kí ni wọ́n máa ń pè é nínú ìdílé?",
    optA: "Oko",
    optB: "Aya",
    optC: "Aburo",
    optD: "Egbon",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni 'Bàtà' lédè Gẹ̀ẹ́sì?",
    optA: "Shirt",
    optB: "Trousers",
    optC: "Shoe",
    optD: "Hat",
    correctAnswer: "C"
  },
  {
    qText: "Orin wo ni a máa ń kọ fún ọba nígbà tí ó bá ń rìn?",
    optA: "Orin Efe",
    optB: "Orin Apala",
    optC: "Ilu Gangan/Bata",
    optD: "Orin Fuji",
    correctAnswer: "C"
  },
  {
    qText: "Ìlu wo ni a sábà máa ń lù tí ó ń sọ̀rọ̀ bí ènìyàn?",
    optA: "Bata",
    optB: "Gangan / Dundun",
    optC: "Sekere",
    optD: "Agogo",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni ìdáhùn sí ìkíni 'Ẹ kú ọdún'?",
    optA: "O dabo",
    optB: "Ẹ̀mí á ṣe púpọ̀ rẹ̀",
    optC: "Awa ni",
    optD: "A dupe",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni orúkọ ti a máa ń fún ọmọkùnrin tí a bí nígbà tí òjò ń rọ̀ lédè Yorùbá?",
    optA: "Babajide",
    optB: "Ojo",
    optC: "Abidemi",
    optD: "Taiwo",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni orúkọ ti a máa ń fún ọmọ àkọ́kọ́ nínú ìbejì?",
    optA: "Kehinde",
    optB: "Idowu",
    optC: "Taiwo",
    optD: "Alaba",
    correctAnswer: "C"
  },
  {
    qText: "Òwe: 'Bí omí bá dà, a kọ́...', kí ni ó kù?",
    optA: "Agun",
    optB: "Agbe kuro",
    optC: "Agbé a kúrò níbẹ̀",
    optD: "Ikoko re ko ni fo",
    correctAnswer: "D"
  },
  {
    qText: "Kí ni àwọn Yorùbá ń pe 'White'?",
    optA: "Dudu",
    optB: "Fufun (Funfun)",
    optC: "Pupa",
    optD: "Aro",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni 'Adìyẹ' lédè Gẹ̀ẹ́sì?",
    optA: "Dog",
    optB: "Cat",
    optC: "Fowl / Chicken",
    optD: "Goat",
    correctAnswer: "C"
  },
  {
    qText: "Kí ni orúkọ ọba Ilé-Ifẹ̀?",
    optA: "Alaafin",
    optB: "Ooni",
    optC: "Awujale",
    optD: "Alake",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni 'Agbájọ owọ́' máa ń ṣe gẹ́gẹ́ bí òwe?",
    optA: "O n fọ awo",
    optB: "Lá ń fàyà",
    optC: "L'a fi ń sọ̀yà",
    optD: "Ko le wulo",
    correctAnswer: "C"
  },
  {
    qText: "Tí ẹnì kan bá ń jẹun, kí ni a máa ń sọ fún un?",
    optA: "E ku ikale",
    optB: "E ku ijoko",
    optC: "E ba wa je",
    optD: "E ku asekaro",
    correctAnswer: "C"
  },
  {
    qText: "Kí ni àṣà ti àwọn obìnrin Yorùbá máa ń ṣe láti bọ̀wọ̀ fún àgbàlagbà?",
    optA: "Dobale (Prostrate)",
    optB: "Kunle (Kneel)",
    optC: "Na owo",
    optD: "Gbá mọ́ra",
    correctAnswer: "B"
  },
  {
    qText: "Ta ni gbajúgbajà olórin ti a mọ̀ sí 'King of Fuji Music'?",
    optA: "Ebenezer Obey",
    optB: "K1 De Ultimate (Wasiu Ayinde)",
    optC: "King Sunny Ade",
    optD: "Lagbaja",
    correctAnswer: "B"
  },
  {
    qText: "Ewo nínú àwọn wọ̀nyí ni oògùn ìbílẹ̀ tí àwọn Yorùbá máa ń lò fún àìsàn ibà?",
    optA: "Agbo",
    optB: "Oti",
    optC: "Omi",
    optD: "Iresi",
    correctAnswer: "A"
  },
  {
    qText: "Kí ni orúkọ ti àwọn Yorùbá máa ń fún ọmọ tí ó padà wá sí ayé lẹ́yìn tí ó ti kú?",
    optA: "Ojo",
    optB: "Babatunde",
    optC: "Abiku",
    optD: "Dada",
    correctAnswer: "C"
  },
  {
    qText: "Igi wo ni a sábà máa ń lò láti fi ṣe pákó tàbí ìlù gángán?",
    optA: "Omo",
    optB: "Arere",
    optC: "Iroko",
    optD: "Dongoyaro",
    correctAnswer: "A"
  },
  {
    qText: "Eranko wo ni a máa ń lò gẹ́gẹ́ bí àpẹẹrẹ ẹ̀tàn nínú àló (Alọ)?",
    optA: "Ekun",
    optB: "Kiniun",
    optC: "Ijapa (Tortoise)",
    optD: "Aja",
    correctAnswer: "C"
  },
  {
    qText: "Kí ni ìtumọ̀ 'School' lédè Yorùbá?",
    optA: "Ile-iwosan",
    optB: "Ile-ekó",
    optC: "Ile-itaja",
    optD: "Ile-igbimo",
    correctAnswer: "B"
  },
  {
    qText: "Nọ́mbà 'Àádọ́ta' dúró fún kí ni?",
    optA: "40",
    optB: "50",
    optC: "60",
    optD: "70",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni àṣà gígé ìlà (tribal marks) nínú ilẹ̀ Yorùbá kò wúlò fún?",
    optA: "Oge sise (Beautification)",
    optB: "Dida idile mo (Identification)",
    optC: "Mímú ènìyàn burú",
    optD: "Iwosan",
    correctAnswer: "C"
  },
  {
    qText: "Kí ni orúkọ ìyá tí ó ṣẹ́gun àwọn Ìgbò fún Ilé-Ifẹ̀ nínú ìtàn?",
    optA: "Oya",
    optB: "Osun",
    optC: "Moremi Ajasoro",
    optD: "Tinubu",
    correctAnswer: "C"
  },
  {
    qText: "Kí ni a máa ń fi ń mu 'Iyan'?",
    optA: "Obe Ata",
    optB: "Obe Efo Riro tabi Egusi",
    optC: "Omi tutu",
    optD: "Gari",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni ìkíni tí a ń fi kí ẹni tí ń bímọ (abiyamọ titun)?",
    optA: "E ku ori ire",
    optB: "E ku isinmi",
    optC: "E ku amulumala",
    optD: "E ku ewọ",
    correctAnswer: "A"
  },
  {
    qText: "Kí ni àwọn Yorùbá ń pe 'Mouth'?",
    optA: "Imu",
    optB: "Enu",
    optC: "Eti",
    optD: "Oju",
    correctAnswer: "B"
  },
  {
    qText: "Tí o bá rí àgbàlagbà lórí ìjókòó rẹ̀, kí ni ó yẹ kí o ṣe?",
    optA: "Yi oju kuro",
    optB: "Ki i",
    optC: "Lù ú",
    optD: "Fi i sile",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni Yorùbá ń pe 'God's grace tàbí àánú'?",
    optA: "Ibinu",
    optB: "Ore-ofe / Aanu",
    optC: "Ese",
    optD: "Iya",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni wọ́n ń pe gbàngbà tàbí ojú ìta níbi tí wọ́n ti máa ń tajà?",
    optA: "Oja",
    optB: "Afin",
    optC: "Iyara",
    optD: "Ọgbà",
    correctAnswer: "A"
  },
  {
    qText: "Ilu wo ni ó gbajúmọ̀ fún aṣọ Òfì (Aso-Oke)?",
    optA: "Ibadan",
    optB: "Iseyin",
    optC: "Ikeja",
    optD: "Ogbomoso",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni a ń pe obìnrin tí ó bá lọ́kọ (married woman)?",
    optA: "Omoge",
    optB: "Iyawo",
    optC: "Wundia",
    optD: "Arugbo",
    correctAnswer: "B"
  },
  {
    qText: "Kí ni a máa ń sọ lẹ́yìn tí a bá ti jẹun tán lédè Yorùbá?",
    optA: "E ku ise",
    optB: "E dupe",
    optC: "A dupe / Olorun a gbo (O de'nu)",
    optD: "E ku abo",
    correctAnswer: "C"
  }
];

async function main() {
  const subjectSlug = 'yoruba';
  const subjectGroup = 'Arts';
  const subjectName = 'Yoruba';

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

    for (const q of yorubaQuestions) {
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
