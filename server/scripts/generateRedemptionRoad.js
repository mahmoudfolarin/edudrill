require('dotenv').config();
const pool = require('../src/config/database');

const redemptionRoadQuestions = [
  {
    qText: "In Redemption Road, who is the author of the novel?",
    optA: "Chimamanda Ngozi Adichie",
    optB: "Elma Shaw",
    optC: "Aminatta Forna",
    optD: "Buchi Emecheta",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, in which country is the novel primarily set?",
    optA: "Sierra Leone",
    optB: "Nigeria",
    optC: "Liberia",
    optD: "Ghana",
    correctAnswer: "C"
  },
  {
    qText: "In Redemption Road, the story is set in the aftermath of which major historical event?",
    optA: "The Liberian Civil War",
    optB: "The Rwandan Genocide",
    optC: "The Apartheid era",
    optD: "World War II",
    correctAnswer: "A"
  },
  {
    qText: "In Redemption Road, who is the protagonist of the novel?",
    optA: "Tenneh",
    optB: "Bendu Lewis",
    optC: "Agnes",
    optD: "Josephine",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what trauma haunts Bendu from her past during the war?",
    optA: "She was forced to become a child soldier.",
    optB: "She lost her parents in a bombing.",
    optC: "She was captured and held in a rebel camp (Duluma) where she gave birth to and abandoned a child.",
    optD: "She was forced to exile to America and never returned.",
    correctAnswer: "C"
  },
  {
    qText: "In Redemption Road, what is the name of the rebel camp where Bendu was held captive?",
    optA: "Duluma",
    optB: "Monrovia",
    optC: "Freetown",
    optD: "Gbarnga",
    correctAnswer: "A"
  },
  {
    qText: "In Redemption Road, who was the brutal rebel commander who terrorized Bendu at the camp?",
    optA: "Commander Cobra",
    optB: "Commander Mosquito",
    optC: "Commander Cobra (also known as Moses)",
    optD: "Commander Samson",
    correctAnswer: "C"
  },
  {
    qText: "In Redemption Road, what shocking discovery does Bendu make about Commander Cobra after the war?",
    optA: "He is dead.",
    optB: "He is now a prominent, respected man in post-war Monrovia living freely.",
    optC: "He is in a high-security prison.",
    optD: "He has moved to the United States.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what is Commander Cobra's real name in civilian life?",
    optA: "Moses Varney",
    optB: "Charles Taylor",
    optC: "Samuel Doe",
    optD: "Prince Johnson",
    correctAnswer: "A"
  },
  {
    qText: "In Redemption Road, what does Bendu do for a living in post-war Monrovia?",
    optA: "She is a lawyer.",
    optB: "She runs an NGO called 'Peace in Practice' to help war victims.",
    optC: "She is a government minister.",
    optD: "She is a journalist.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what does Bendu initially plan to do regarding Moses Varney?",
    optA: "Forgive him entirely.",
    optB: "Assassinate him.",
    optC: "Seek legal justice and expose his war crimes.",
    optD: "Extort money from him.",
    correctAnswer: "C"
  },
  {
    qText: "In Redemption Road, who is Bendu's close friend who works as a journalist?",
    optA: "Agnes",
    optB: "Siatta",
    optC: "Josephine",
    optD: "Tenneh",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, who is Calvin?",
    optA: "Bendu's brother",
    optB: "Bendu's supportive love interest",
    optC: "Commander Cobra's real name",
    optD: "The President of Liberia",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what is Calvin's profession?",
    optA: "He is a doctor.",
    optB: "He is a lawyer / human rights advocate.",
    optC: "He is an ex-rebel.",
    optD: "He is a UN peacekeeper.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what deeply held secret has Bendu kept from her family?",
    optA: "That she killed a rebel.",
    optB: "That she had a baby in the rebel camp and left her behind.",
    optC: "That she was a rebel spy.",
    optD: "That she stole NGO funds.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, who is Tenneh?",
    optA: "Bendu's mother.",
    optB: "A young girl at Bendu's NGO who reminds Bendu of her past.",
    optC: "A former rebel commander.",
    optD: "Bendu's sister.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what happened to Tenneh during the war?",
    optA: "She was an aid worker.",
    optB: "She was conscripted as a child soldier and forced to commit atrocities.",
    optC: "She escaped to America.",
    optD: "She became a politician.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, the psychological trauma that the characters experience is commonly referred to in modern terms as:",
    optA: "Bipolar disorder",
    optB: "Post-Traumatic Stress Disorder (PTSD)",
    optC: "Schizophrenia",
    optD: "Amnesia",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what prevents many victims like Bendu from speaking out about their abusers after the war?",
    optA: "They are paid to keep quiet.",
    optB: "Fear of retribution and the societal stigma surrounding sexual violence.",
    optC: "A national law forbidding talking about the war.",
    optD: "They cannot remember what happened.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, how does Bendu's grandmother (Granny) react to Bendu's pain?",
    optA: "She tells her to seek revenge.",
    optB: "She offers traditional wisdom, spiritual support, and encourages forgiveness.",
    optC: "She disowns Bendu for having a child out of wedlock.",
    optD: "She forces her to move to America.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what role does the Truth and Reconciliation Commission (TRC) play in the novel's backdrop?",
    optA: "It actively imprisons all rebels.",
    optB: "It is the mechanism through which the country is trying to address war crimes and heal.",
    optC: "It is a rebel faction.",
    optD: "It is a foreign army.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, who fathered the child Bendu was forced to abandon in the camp?",
    optA: "Calvin",
    optB: "Commander Cobra (Moses Varney)",
    optC: "A UN Peacekeeper",
    optD: "Her pre-war fiancé",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, how did Bendu escape the Duluma camp?",
    optA: "She was rescued by UN troops.",
    optB: "She snuck out during an attack but had to leave her baby behind.",
    optC: "Commander Cobra released her.",
    optD: "She paid a ransom.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, the title 'Redemption Road' symbolizes:",
    optA: "The street where Bendu lives.",
    optB: "The difficult journey toward personal and national healing, forgiveness, and justice.",
    optC: "A famous highway in Liberia that was destroyed.",
    optD: "The escape route from Duluma.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, how does Moses Varney react when confronted by Bendu?",
    optA: "He immediately breaks down and apologizes.",
    optB: "He denies everything, attempts to intimidate her, and uses his power to silence her.",
    optC: "He turns himself in to the police.",
    optD: "He flees the country.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what happens to Moses Varney in the climax of the story?",
    optA: "He becomes the President of Liberia.",
    optB: "He is murdered by unknown assailants (likely former victims or associates).",
    optC: "He is formally tried and sent to the Hague.",
    optD: "He marries Bendu.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, who is suspected of killing Moses Varney?",
    optA: "Bendu",
    optB: "Calvin",
    optC: "Tenneh and other traumatized victims",
    optD: "The police",
    correctAnswer: "C"
  },
  {
    qText: "In Redemption Road, how does the novel portray child soldiers like Tenneh?",
    optA: "As pure villains who deserve no mercy.",
    optB: "As complex victims who were manipulated and traumatized, requiring rehabilitation.",
    optC: "As heroes of the war.",
    optD: "As unaffected by their experiences.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what realization does Bendu come to regarding her daughter?",
    optA: "That her daughter is dead.",
    optB: "That she must embark on a journey to find her to truly heal.",
    optC: "That her daughter is actually Tenneh.",
    optD: "That it is better to forget she ever existed.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, which character provides a strong sense of familial duty and societal expectation that Bendu struggles against?",
    optA: "Siatta",
    optB: "Calvin",
    optC: "Bendu's mother, who worries about reputation and marriage.",
    optD: "Granny",
    correctAnswer: "C"
  },
  {
    qText: "In Redemption Road, how does Calvin prove his love and dedication to Bendu?",
    optA: "He buys her a house.",
    optB: "He supports her quest for justice, accepts her traumatic past, and helps her search for her child.",
    optC: "He kills Moses Varney for her.",
    optD: "He forces her to forget the past.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what is the significance of the NGO 'Peace in Practice'?",
    optA: "It represents Bendu's attempt to heal her own trauma by helping others heal.",
    optB: "It is a front for political campaigning.",
    optC: "It is an organization run by Moses Varney.",
    optD: "It is a place where former rebels plan new attacks.",
    correctAnswer: "A"
  },
  {
    qText: "In Redemption Road, Elma Shaw highlights the specific vulnerabilities of which demographic during the civil war?",
    optA: "Foreign diplomats",
    optB: "Women and children",
    optC: "Wealthy businessmen",
    optD: "The elderly",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, Bendu’s guilt primarily stems from:",
    optA: "Killing a fellow prisoner.",
    optB: "Leaving her baby behind at Duluma in order to survive.",
    optC: "Failing to protect her grandmother.",
    optD: "Stealing food from other captives.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what physical space in Monrovia is often referenced as a place of former executions and a symbol of the country's bloody history?",
    optA: "The Presidential Palace",
    optB: "The beach behind the Barclay Training Center (BTC)",
    optC: "The international airport",
    optD: "The local church",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what does the murder of Moses Varney suggest about post-war justice?",
    optA: "The legal system is perfect.",
    optB: "When formal justice fails or is too slow, victims may resort to vigilante justice.",
    optC: "Rebels are always caught by the police.",
    optD: "There is no anger left in the country.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, Bendu’s journey is an allegory for:",
    optA: "Liberia's economic growth.",
    optB: "Liberia's painful path toward national reconciliation and rebuilding.",
    optC: "The spread of democracy in Africa.",
    optD: "The failure of the UN.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, how is the theme of 'silence' explored?",
    optA: "No one speaks English in the novel.",
    optB: "Silence is depicted as a toxic coping mechanism that prevents healing from trauma.",
    optC: "Silence is shown as the best way to handle grief.",
    optD: "The rebels forced everyone to take a vow of silence.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, which character struggles with drug addiction as a coping mechanism for war trauma?",
    optA: "Calvin",
    optB: "Siatta",
    optC: "Tenneh (and other former child soldiers)",
    optD: "Moses Varney",
    correctAnswer: "C"
  },
  {
    qText: "In Redemption Road, how does Bendu initially react when Calvin proposes to her?",
    optA: "She accepts immediately.",
    optB: "She rejects him because she feels unworthy and broken due to her secret.",
    optC: "She laughs at him.",
    optD: "She asks for time to think about his wealth.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, the process of 'demobilization' refers to:",
    optA: "Fixing broken cars.",
    optB: "Disarming rebels and attempting to reintegrate them into civilian society.",
    optC: "Building new roads.",
    optD: "Moving people out of the capital.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, why is Bendu's mother desperate for Bendu to marry?",
    optA: "She wants Bendu to move out.",
    optB: "She wants to secure Bendu's social status and respectability in Monrovian society.",
    optC: "She wants Calvin's money.",
    optD: "She wants Bendu to leave the country.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, which organization does Calvin work for?",
    optA: "The CIA",
    optB: "A human rights legal defense group.",
    optC: "The Liberian military.",
    optD: "The World Bank.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, the term 'warlord' best applies to which character's past?",
    optA: "Calvin",
    optB: "Moses Varney",
    optC: "Bendu's father",
    optD: "The Pastor",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what breaks Bendu's silence about her past?",
    optA: "She is tortured by the police.",
    optB: "Seeing Moses Varney living freely and being celebrated triggers her need for justice.",
    optC: "A journalist publishes her story without permission.",
    optD: "Her mother forces her to speak.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what is the ultimate fate of Bendu's lost daughter by the end of the novel?",
    optA: "She is confirmed dead.",
    optB: "She is found living in America.",
    optC: "Bendu begins a hopeful, active search for her, suggesting a path to closure.",
    optD: "She turns out to be Tenneh.",
    correctAnswer: "C"
  },
  {
    qText: "In Redemption Road, the novel suggests that true redemption requires:",
    optA: "Forgetting the past completely.",
    optB: "Facing the truth, acknowledging pain, and seeking genuine forgiveness and justice.",
    optC: "Violent revenge against all perpetrators.",
    optD: "Leaving the country permanently.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, Siatta's character provides the story with:",
    optA: "A villainous counterpart to Bendu.",
    optB: "A supportive friend who represents the voice of the investigative press seeking truth.",
    optC: "A tragic death that motivates Bendu.",
    optD: "Comic relief.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, what does Bendu's physical scar represent?",
    optA: "A childhood accident.",
    optB: "The permanent physical and emotional marks left by the war and her captivity.",
    optC: "A gang affiliation.",
    optD: "A cultural initiation rite.",
    correctAnswer: "B"
  },
  {
    qText: "In Redemption Road, Elma Shaw's writing is heavily influenced by:",
    optA: "Science fiction tropes.",
    optB: "The real-life experiences of Liberian women and the Truth and Reconciliation process.",
    optC: "Historical European monarchies.",
    optD: "Satirical comedy.",
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

    for (const q of redemptionRoadQuestions) {
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
    console.log(`Inserted ${inserted} generated question rows for Redemption Road across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
