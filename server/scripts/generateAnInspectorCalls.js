require('dotenv').config();
const pool = require('../src/config/database');

const inspectorQuestions = [
  {
    qText: "In An Inspector Calls, who is the author of the play?",
    optA: "Arthur Miller",
    optB: "J.B. Priestley",
    optC: "George Bernard Shaw",
    optD: "Oscar Wilde",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, in what year is the play set?",
    optA: "1912",
    optB: "1945",
    optC: "1939",
    optD: "1890",
    correctAnswer: "A"
  },
  {
    qText: "In An Inspector Calls, in what year was the play actually written and first performed?",
    optA: "1912",
    optB: "1945",
    optC: "1960",
    optD: "1920",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what is the Birling family celebrating at the beginning of the play?",
    optA: "Arthur Birling's knighthood.",
    optB: "The engagement of Sheila Birling to Gerald Croft.",
    optC: "Eric Birling's graduation.",
    optD: "New Year's Eve.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, who is Arthur Birling?",
    optA: "A wealthy, pompous factory owner and capitalist.",
    optB: "The Inspector.",
    optC: "A poor worker.",
    optD: "The Chief of Police.",
    correctAnswer: "A"
  },
  {
    qText: "In An Inspector Calls, how does Arthur Birling describe himself?",
    optA: "As a 'humble servant of the poor'.",
    optB: "As a 'hard-headed practical man of business'.",
    optC: "As a 'romantic idealist'.",
    optD: "As a 'strict socialist'.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what dramatic irony is present in Arthur Birling's speech in Act 1?",
    optA: "He predicts the Great Depression.",
    optB: "He claims the Titanic is 'unsinkable' and that there will be no war, which the 1945 audience knows is false.",
    optC: "He claims he will go bankrupt.",
    optD: "He claims he is secretly poor.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what is the name of the mysterious police inspector who arrives?",
    optA: "Inspector Davis",
    optB: "Inspector Goole",
    optC: "Inspector Smith",
    optD: "Inspector Croft",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, whose suicide is the Inspector investigating?",
    optA: "Daisy Renton / Eva Smith",
    optB: "Edna",
    optC: "Sybil Birling",
    optD: "Meggarty",
    correctAnswer: "A"
  },
  {
    qText: "In An Inspector Calls, how did Eva Smith die?",
    optA: "She drowned in the river.",
    optB: "She swallowed strong disinfectant (poison).",
    optC: "She hung herself.",
    optD: "She was shot.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how was Arthur Birling involved with Eva Smith?",
    optA: "He had an affair with her.",
    optB: "He fired her from his factory for leading a strike for higher wages.",
    optC: "He was her landlord and evicted her.",
    optD: "He refused her charity.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how much of a wage increase were Eva Smith and the workers asking for?",
    optA: "From 20 to 30 shillings a week.",
    optB: "From 22 and sixpence to 25 shillings a week.",
    optC: "From 10 to 15 shillings a week.",
    optD: "From 1 pound to 2 pounds.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what is Arthur Birling's primary concern regarding the Inspector's visit?",
    optA: "The welfare of his workers.",
    optB: "That the scandal will prevent him from receiving a public knighthood.",
    optC: "That his wife will leave him.",
    optD: "That the factory will burn down.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how was Sheila Birling involved with Eva Smith?",
    optA: "She stole money from her.",
    optB: "She got Eva fired from her job at Milwards department store out of jealousy and spite.",
    optC: "She introduced her to Eric.",
    optD: "She pushed her down the stairs.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, why was Sheila jealous of Eva Smith at Milwards?",
    optA: "Eva was promoted ahead of her.",
    optB: "Eva looked better in a dress that Sheila wanted, and Sheila thought Eva was laughing at her.",
    optC: "Gerald was flirting with Eva in the store.",
    optD: "Eva was wealthier.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what name did Eva Smith use when she met Gerald Croft?",
    optA: "Mary Jones",
    optB: "Daisy Renton",
    optC: "Sarah Smith",
    optD: "Edna Birling",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, where did Gerald Croft meet Daisy Renton?",
    optA: "At the factory.",
    optB: "At the Palace Variety Theatre bar, rescuing her from the drunken Alderman Meggarty.",
    optC: "At a church service.",
    optD: "At the Birling house.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how was Gerald involved with Daisy Renton?",
    optA: "He only gave her a job.",
    optB: "He set her up in a friend's rooms and they had an affair, which he eventually broke off.",
    optC: "He forced her into prostitution.",
    optD: "He married her secretly.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how does Sheila react when she learns of Gerald's affair?",
    optA: "She shoots him.",
    optB: "She is hurt, but surprisingly respects his honesty, though she hands back the engagement ring.",
    optC: "She pretends she didn't hear it.",
    optD: "She immediately forgives him and plans the wedding.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what organization does Mrs. Sybil Birling chair?",
    optA: "The local hospital board.",
    optB: "The Brumley Women's Charity Organization.",
    optC: "The temperance movement.",
    optD: "The local conservative party.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how was Sybil Birling involved with Eva/Daisy?",
    optA: "She hired her as a maid and then fired her.",
    optB: "She coldly refused her appeal for financial help when the girl was pregnant and destitute.",
    optC: "She ran over her with her car.",
    optD: "She stole her inheritance.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, why did Sybil Birling reject the girl's appeal for charity?",
    optA: "The charity had run out of money.",
    optB: "The girl initially used the name 'Mrs. Birling', which Sybil found impertinent and insulting.",
    optC: "The girl threatened her.",
    optD: "Arthur told her to reject it.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, who does Sybil Birling confidently blame for the girl's death?",
    optA: "Arthur Birling",
    optB: "The father of the unborn child, unknowingly condemning her own son.",
    optC: "Gerald Croft",
    optD: "The Inspector",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how was Eric Birling involved with Eva/Daisy?",
    optA: "He was her secret brother.",
    optB: "He met her at the Palace bar, forced his way into her lodgings while drunk, got her pregnant, and stole money to help her.",
    optC: "He hit her with his car.",
    optD: "He fired her from Milwards.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, where did Eric get the money he gave to Eva?",
    optA: "He borrowed it from Gerald.",
    optB: "He stole it from his father's office accounts.",
    optC: "He won it gambling.",
    optD: "He sold his car.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, why did Eva refuse to keep taking Eric's money?",
    optA: "It wasn't enough.",
    optB: "She found out it was stolen.",
    optC: "She hated him.",
    optD: "She got a new job.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how do Eric and Sheila's reactions differ from their parents' at the end of the interrogation?",
    optA: "The parents feel incredibly guilty, while the children do not care.",
    optB: "The children feel deep guilt and take responsibility, while the parents only care about a public scandal.",
    optC: "They all react exactly the same way.",
    optD: "The children blame the Inspector, the parents blame Gerald.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what does the Inspector's final speech warn?",
    optA: "That they will all go to jail.",
    optB: "That if men will not learn that they are responsible for each other, they will be taught it in 'fire and blood and anguish'.",
    optC: "That the factory will close down.",
    optD: "That the police will return tomorrow.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what discovery does Gerald make after he goes for a walk?",
    optA: "That Eva Smith is still alive.",
    optB: "That Inspector Goole is not a real police officer on the force.",
    optC: "That Eric stole the money.",
    optD: "That Arthur Birling is bankrupt.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how does Arthur Birling verify that Goole is fake?",
    optA: "He calls the Chief Constable (Colonel Roberts).",
    optB: "He checks the police database.",
    optC: "He asks his lawyer.",
    optD: "He interrogates Edna.",
    correctAnswer: "A"
  },
  {
    qText: "In An Inspector Calls, what theory does Gerald propose to completely dismiss their guilt?",
    optA: "That the Inspector killed the girl.",
    optB: "That the Inspector showed them all photographs of different girls, and there was no single 'Eva Smith' who died.",
    optC: "That the girl faked her own death.",
    optD: "That Eric was sleepwalking.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how do Arthur and Sybil react to the realization that the Inspector was fake?",
    optA: "They turn themselves in anyway.",
    optB: "They are hugely relieved and immediately act as if nothing wrong happened, since there is no public scandal.",
    optC: "They are still deeply traumatized and guilty.",
    optD: "They yell at Gerald.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how do Sheila and Eric react to their parents' relief?",
    optA: "They join in the celebration.",
    optB: "They are appalled because the moral wrong they committed remains the same, regardless of the police.",
    optC: "They decide to run away together.",
    optD: "They call the real police.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what happens at the very end of the play right as the parents are celebrating their 'escape'?",
    optA: "The Inspector walks back in.",
    optB: "The phone rings: a girl has just died from swallowing disinfectant, and a police inspector is on his way.",
    optC: "Eric commits suicide.",
    optD: "The house catches fire.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what does the name 'Goole' symbolize?",
    optA: "A type of bird.",
    optB: "It sounds like 'Ghoul' (a ghost or spirit), suggesting he is a supernatural or moral force.",
    optC: "A famous detective.",
    optD: "It is just a common name.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what core political ideology is J.B. Priestley promoting through the Inspector?",
    optA: "Laissez-faire Capitalism",
    optB: "Socialism and social responsibility",
    optC: "Fascism",
    optD: "Feudalism",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, who is Edna?",
    optA: "Sheila's friend.",
    optB: "The Birlings' maid, representing the unseen working class.",
    optC: "Eva Smith's mother.",
    optD: "Arthur's secretary.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how does the Inspector control the structure of the play?",
    optA: "He uses physical violence.",
    optB: "He controls the release of information, dealing with 'one person and one line of enquiry at a time'.",
    optC: "He arrests people immediately.",
    optD: "He talks over everyone.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what does the lighting change from and to when the Inspector arrives?",
    optA: "From pink and intimate to brighter and harder.",
    optB: "From bright daylight to pitch black.",
    optC: "From blue to red.",
    optD: "From flashing to steady.",
    correctAnswer: "A"
  },
  {
    qText: "In An Inspector Calls, Eva Smith represents:",
    optA: "The wealthy elite.",
    optB: "The vulnerable, exploited working classes and the universal 'everyman' or 'everywoman'.",
    optC: "The police force.",
    optD: "Foreign immigrants.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what is Arthur Birling's view on community and society?",
    optA: "We are all one body.",
    optB: "A man has to make his own way and look after himself and his family; 'community' is nonsense.",
    optC: "The rich must give all their money to the poor.",
    optD: "The government should control everything.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how does Sheila change throughout the play?",
    optA: "She goes from mature to childish.",
    optB: "She goes from a naive, superficial, compliant girl to a mature, socially aware, and assertive young woman.",
    optC: "She becomes exactly like her mother.",
    optD: "She loses her mind.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what physical object does the Inspector show the characters to elicit a reaction?",
    optA: "A diary",
    optB: "A photograph of the dead girl",
    optC: "A bottle of poison",
    optD: "A bloody dress",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, why does Eric drink so much?",
    optA: "Because he is celebrating.",
    optB: "He is alienated from his family, lonely, and lacks emotional support.",
    optC: "He likes the taste.",
    optD: "He wants to impress Gerald.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, when Sybil says 'I did nothing I'm ashamed of,' it highlights her:",
    optA: "Complete innocence.",
    optB: "Total lack of empathy, arrogance, and refusal to accept responsibility.",
    optC: "Excellent memory.",
    optD: "Fear of the police.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, Gerald Croft represents the:",
    optA: "Working class.",
    optB: "Aristocracy/Upper class, showing that even the 'respectable' elites are morally flawed.",
    optC: "Clergy.",
    optD: "Police force.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, how does the Inspector describe Eva's life before she died?",
    optA: "Full of friends and joy.",
    optB: "A chain of events, with each of the Birlings adding a link to her destruction.",
    optC: "Boring and eventless.",
    optD: "A life of luxury.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what does the phrase 'fire and blood and anguish' heavily foreshadow to the 1945 audience?",
    optA: "The French Revolution.",
    optB: "The horrors of World War I and World War II, which occurred because humanity failed to learn social responsibility.",
    optC: "A local riot in Brumley.",
    optD: "The sinking of the Titanic.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what does Eric say about his father, Arthur, when confronted about the stolen money?",
    optA: "That he is the best father in the world.",
    optB: "That Arthur is 'not the kind of father a chap could go to when he's in trouble.'",
    optC: "That he planned to kill him.",
    optD: "That Arthur told him to steal it.",
    correctAnswer: "B"
  },
  {
    qText: "In An Inspector Calls, what is the ultimate genre classification of the play due to its twist ending?",
    optA: "A romantic comedy.",
    optB: "A morality play / thriller with supernatural elements.",
    optC: "A historical biography.",
    optD: "A musical.",
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

    for (const q of inspectorQuestions) {
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
    console.log(`Inserted ${inserted} generated question rows for An Inspector Calls across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
