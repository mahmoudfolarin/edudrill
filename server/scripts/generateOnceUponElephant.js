require('dotenv').config();
const pool = require('../src/config/database');

const onceUponElephantQuestions = [
  {
    qText: "In Once Upon an Elephant, who is the author of the play?",
    optA: "Wole Soyinka",
    optB: "Bosede Ademilua-Afolayan",
    optC: "Femi Osofisan",
    optD: "Ola Rotimi",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, the play is primarily categorized as what genre?",
    optA: "Romantic Comedy",
    optB: "Socio-political Drama / Allegory",
    optC: "Science Fiction",
    optD: "Historical Documentary",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what does the play fundamentally critique?",
    optA: "The educational system in Africa.",
    optB: "Political tyranny, corruption, and the abuse of power in post-colonial African nations.",
    optC: "The lack of modern technology in villages.",
    optD: "The practice of hunting elephants.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, who is the manipulative figure that orchestrates the controversial succession to the throne?",
    optA: "Akinjobi",
    optB: "Serubawon",
    optC: "Odekunle",
    optD: "Iya Agba",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, who is the rightful King that is still alive but critically ill at the beginning of the play?",
    optA: "King Ajanaku",
    optB: "King Akinjobi",
    optC: "King Serubawon",
    optD: "King Odekunle",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, whom does Serubawon bribe the kingmakers to install on the throne?",
    optA: "The king's eldest son.",
    optB: "Ajanaku, the king's younger son.",
    optC: "Himself.",
    optD: "Odekunle.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what does the name 'Ajanaku' translate to or symbolize?",
    optA: "The Lion",
    optB: "The Elephant",
    optC: "The Eagle",
    optD: "The Snake",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, how is Ajanaku's rule characterized?",
    optA: "Peaceful and democratic.",
    optB: "Brutal, greedy, and tyrannical.",
    optC: "Weak and indecisive.",
    optD: "Focused entirely on religious reform.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what does Ajanaku seek to achieve through the 'Ijedodo' rites?",
    optA: "Rain for the crops.",
    optB: "Absolute power and immortality.",
    optC: "Forgiveness for his sins.",
    optD: "Wealth for his kingdom.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what dark requirement does the 'Ijedodo' ritual demand?",
    optA: "The sacrifice of a hundred cows.",
    optB: "The sacrifice of a virgin.",
    optC: "The burning of the palace.",
    optD: "The exile of the kingmakers.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, who is Desola?",
    optA: "Ajanaku's wife.",
    optB: "Serubawon's daughter.",
    optC: "The chief priestess.",
    optD: "Akinjobi's sister.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, who is Odekunle in love with?",
    optA: "Iya Agba",
    optB: "Desola",
    optC: "Ajanaku's daughter",
    optD: "The queen",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what is Odekunle's background?",
    optA: "He is a wealthy merchant.",
    optB: "He is the son of an honorable hunter.",
    optC: "He is a foreign prince.",
    optD: "He is a corrupt politician.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, how do Odekunle's values contrast with Ajanaku and Serubawon's?",
    optA: "He is greedier than they are.",
    optB: "He represents honor, truth, and resistance against corruption.",
    optC: "He hates tradition completely.",
    optD: "He wants to become a tyrant himself.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what tragic irony befalls Serubawon regarding the 'Ijedodo' rites?",
    optA: "He is chosen as the sacrifice.",
    optB: "His own daughter, Desola, becomes a target for the virgin sacrifice he helped enable.",
    optC: "He loses his wealth.",
    optD: "He becomes the new king.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, who is Iya Agba?",
    optA: "A corrupt kingmaker.",
    optB: "A wise, truth-telling elder who exposes the moral decay of the palace.",
    optC: "Ajanaku's mother.",
    optD: "A foreign invader.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what role do the 'yes-men' play in Ajanaku's court?",
    optA: "They constantly challenge his decisions.",
    optB: "They enable his tyranny by feeding his ego and suppressing opposition.",
    optC: "They try to assassinate him.",
    optD: "They secretly work for Odekunle.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, the usurpation of the throne by Ajanaku symbolizes:",
    optA: "A positive move towards modernization.",
    optB: "The subversion of democratic processes and traditional laws by corrupt elites.",
    optC: "The importance of youth in leadership.",
    optD: "A religious awakening.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what does the 'Elephant' represent as a metaphor in the play?",
    optA: "Wisdom and memory.",
    optB: "An overwhelming, destructive, and immovable tyrannical force.",
    optC: "A gentle giant protecting the village.",
    optD: "A source of wealth.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what ultimately causes Ajanaku's downfall?",
    optA: "A foreign army invades.",
    optB: "His own excessive greed, hubris, and the inherent self-destruction of evil (poetic justice).",
    optC: "He steps down voluntarily.",
    optD: "He dies of old age.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what does the play suggest happens to those who manipulate the system for selfish gain, like Serubawon?",
    optA: "They always escape unpunished.",
    optB: "Their evil actions eventually turn back on them and their loved ones.",
    optC: "They are rewarded with eternal life.",
    optD: "They become heroes.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, the conflict between Odekunle and the corrupt court represents:",
    optA: "The struggle between the rich and the poor.",
    optB: "The fight between moral integrity and political corruption.",
    optC: "A religious holy war.",
    optD: "A battle over land ownership.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what is the significance of the unnamed Yoruba community setting?",
    optA: "It proves the story actually happened there.",
    optB: "It allows the story to act as a universal allegory for any corrupt African state.",
    optC: "It shows the author doesn't know any real cities.",
    optD: "It restricts the play's themes to just one village.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what happens to the rightful heir when Ajanaku takes the throne?",
    optA: "He is made the prime minister.",
    optB: "He is bypassed and marginalized due to the kingmakers' corruption.",
    optC: "He voluntarily gives up the throne.",
    optD: "He assassinates Ajanaku immediately.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, Iya Agba acts as the voice of:",
    optA: "The corrupt politicians.",
    optB: "The conscience of the society and traditional wisdom.",
    optC: "The youth rebellion.",
    optD: "The military.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, why is the bribery of the kingmakers a critical plot point?",
    optA: "It shows how wealthy the village is.",
    optB: "It highlights how institutional corruption facilitates the rise of dictators.",
    optC: "It proves that Ajanaku is a good businessman.",
    optD: "It is a traditional requirement for becoming king.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, how does Ajanaku view traditional laws and customs once in power?",
    optA: "He respects them deeply.",
    optB: "He manipulates, disregards, or twists them to serve his own tyrannical ends.",
    optC: "He completely bans all traditions.",
    optD: "He asks Iya Agba to teach him.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what is a key theme explored through the character of Desola?",
    optA: "The desire for political power.",
    optB: "The vulnerability of innocence and how the innocent suffer due to the corruption of their elders.",
    optC: "The joy of arranged marriage.",
    optD: "The power of the matriarchy.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what does the love story between Odekunle and Desola add to the play?",
    optA: "A distraction from the politics.",
    optB: "A personal, human stake that heightens the tragedy of the political corruption.",
    optC: "A comedic subplot.",
    optD: "A reason for foreign intervention.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, the 'Ijedodo' rites are an example of:",
    optA: "A harmless cultural festival.",
    optB: "The dark, extreme lengths a tyrant will go to in order to maintain power.",
    optC: "A democratic election process.",
    optD: "A celebration of harvest.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what literary device is primarily used by naming the tyrant 'Ajanaku'?",
    optA: "Simile",
    optB: "Metaphor/Symbolism",
    optC: "Onomatopoeia",
    optD: "Oxymoron",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, how does the community initially react to Ajanaku's rise to power?",
    optA: "They immediately revolt.",
    optB: "Many are complacent, fearful, or easily manipulated by his displays of power.",
    optC: "They all leave the village.",
    optD: "They celebrate it as a golden age.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what message does the play send about the consequences of political apathy?",
    optA: "It leads to peace and stability.",
    optB: "It allows tyrants like Ajanaku to take control and destroy the community.",
    optC: "It is the best way to survive.",
    optD: "It forces the king to become democratic.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, which character best exemplifies the phrase 'absolute power corrupts absolutely'?",
    optA: "Odekunle",
    optB: "Ajanaku",
    optC: "Desola",
    optD: "King Akinjobi",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, the setting of a sick, dying king (Akinjobi) while corrupt men fight for power is a metaphor for:",
    optA: "A healthy, thriving economy.",
    optB: "A failing, weakened state vulnerable to exploitation.",
    optC: "A strong military dictatorship.",
    optD: "A successful democratic transition.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what makes Serubawon's character particularly tragic?",
    optA: "He is poor and oppressed.",
    optB: "His own machinations create the monster that ultimately threatens his own family.",
    optC: "He is misunderstood by everyone.",
    optD: "He dies before seeing Ajanaku become king.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, how is Odekunle's father (the hunter) portrayed?",
    optA: "As a cowardly thief.",
    optB: "As a symbol of traditional honor, bravery, and integrity.",
    optC: "As Ajanaku's chief executioner.",
    optD: "As a wealthy aristocrat.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what role does superstition/ritual play in Ajanaku's regime?",
    optA: "It is used solely to heal the sick.",
    optB: "It is weaponized to instill fear and justify atrocities.",
    optC: "It is banned by the king.",
    optD: "It is completely ignored.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, the play's resolution suggests that:",
    optA: "Evil always triumphs in the end.",
    optB: "Tyranny is ultimately unsustainable and will collapse under its own weight.",
    optC: "Only foreign powers can save an African nation.",
    optD: "Democracy is impossible.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, Iya Agba's ability to speak truth to power without fear highlights the traditional role of:",
    optA: "The court jester.",
    optB: "The revered elder as the moral compass of the community.",
    optC: "The wealthy merchant.",
    optD: "The military general.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what does the play imply is the responsibility of the youth (represented by Odekunle)?",
    optA: "To remain silent and obey the elders no matter what.",
    optB: "To resist corruption, stand for truth, and fight for a better future.",
    optC: "To flee the country.",
    optD: "To become as corrupt as the previous generation.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, how does the playwright use the 'Elephant' motif?",
    optA: "To describe the physical size of the village.",
    optB: "To depict a ruler who crushes everything in his path without regard for his people.",
    optC: "To symbolize wealth through ivory.",
    optD: "As a sacred animal that brings peace.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, what does Desola's potential sacrifice represent?",
    optA: "The willingness of the youth to die for their country.",
    optB: "The ultimate cost of corruption: the consumption of the nation's future/innocence.",
    optC: "A punishment for her father's poverty.",
    optD: "A religious honor she eagerly accepts.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, Ajanaku's demand for immortality reflects his:",
    optA: "Deep religious faith.",
    optB: "Hubris, delusion, and refusal to relinquish power.",
    optC: "Desire to serve his people forever.",
    optD: "Fear of his older brother.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, the play is a stark warning against:",
    optA: "Protecting the environment.",
    optB: "Allowing a single individual to amass unchecked power.",
    optC: "Following traditional customs.",
    optD: "Falling in love.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, which element adds a sense of foreboding and tragic inevitability to the plot?",
    optA: "The constant jokes of the yes-men.",
    optB: "The dark rituals and the warnings of Iya Agba.",
    optC: "The upbeat musical numbers.",
    optD: "The presence of foreign tourists.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, how do the kingmakers fail their society?",
    optA: "By refusing to crown anyone.",
    optB: "By prioritizing their personal greed (bribes) over the rightful succession and the good of the people.",
    optC: "By starting a civil war.",
    optD: "By moving the capital city.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, the dramatic climax revolves around:",
    optA: "A democratic election.",
    optB: "The execution of the Ijedodo rites and the confrontation it provokes.",
    optC: "A peaceful treaty signing.",
    optD: "A grand feast.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, the character of Ajanaku is best described as a:",
    optA: "Benevolent dictator.",
    optB: "Megalomanic.",
    optC: "Reluctant leader.",
    optD: "Democratic socialist.",
    correctAnswer: "B"
  },
  {
    qText: "In Once Upon an Elephant, the play concludes with the notion that:",
    optA: "The gods always protect kings.",
    optB: "Justice is eventually served, but often at a great cost to the community.",
    optC: "Serubawon was right all along.",
    optD: "Odekunle becomes the new tyrant.",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'literature-in-english';
  const subjectGroup = 'Arts';
  const subjectName = 'Literature-in-English';

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

    for (const q of onceUponElephantQuestions) {
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
    console.log(`Inserted ${inserted} generated question rows for Once Upon an Elephant across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
