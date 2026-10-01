require('dotenv').config();
const pool = require('../src/config/database');

const anansewaQuestions = [
  {
    qText: "In The Marriage of Anansewa, who is the author of the play?",
    optA: "Wole Soyinka",
    optB: "Efua Sutherland",
    optC: "Ama Ata Aidoo",
    optD: "Ngũgĩ wa Thiong'o",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, the play is based on traditional folktales from which ethnic group?",
    optA: "Yoruba",
    optB: "Zulu",
    optC: "Akan",
    optD: "Igbo",
    correctAnswer: "C"
  },
  {
    qText: "In The Marriage of Anansewa, who is the main character and trickster of the play?",
    optA: "Chief-Who-Is-Chief",
    optB: "George Ananse",
    optC: "Christie",
    optD: "Aya",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what is Anansewa's relationship to Ananse?",
    optA: "His wife",
    optB: "His sister",
    optC: "His daughter",
    optD: "His mother",
    correctAnswer: "C"
  },
  {
    qText: "In The Marriage of Anansewa, what is George Ananse's primary problem at the beginning of the play?",
    optA: "He is terminally ill.",
    optB: "He is extremely poor and unable to pay his daughter's school fees.",
    optC: "He has been exiled from his village.",
    optD: "His house burned down.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what trick does Ananse devise to solve his financial problems?",
    optA: "He steals from the local bank.",
    optB: "He promises his daughter's hand in marriage to multiple wealthy chiefs simultaneously to collect their money and gifts.",
    optC: "He fakes his own death for life insurance.",
    optD: "He sells his house multiple times.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, how many chiefs does Ananse send photographs of Anansewa to?",
    optA: "Two",
    optB: "Three",
    optC: "Four",
    optD: "Five",
    correctAnswer: "C"
  },
  {
    qText: "In The Marriage of Anansewa, what does Ananse explicitly tell the chiefs in his letters?",
    optA: "That they must marry her immediately.",
    optB: "That he is 'not concluding marriage yet' and is only seeking their financial support for her 'maintenance'.",
    optC: "That she is already pregnant.",
    optD: "That they must fight each other for her.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, how does Anansewa initially react when she learns of her father's plan?",
    optA: "She is thrilled and wants the money.",
    optB: "She is horrified and refuses to be sold like a commodity.",
    optC: "She asks to meet all the chiefs.",
    optD: "She runs away immediately.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, who is Anansewa secretly in love with?",
    optA: "Chief of Sapa",
    optB: "Chief-Who-Is-Chief",
    optC: "Togbe Silva",
    optD: "The Postman",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what traditional storytelling form does Efua Sutherland utilize and adapt in the play?",
    optA: "Anansesem (spider tales)",
    optB: "Griot epics",
    optC: "Haiku",
    optD: "Ijala chanting",
    correctAnswer: "A"
  },
  {
    qText: "In The Marriage of Anansewa, what role does the 'Storyteller' play?",
    optA: "He is just an observer who never speaks.",
    optB: "He breaks the fourth wall, narrates, comments on the action, and interacts with the audience and characters.",
    optC: "He plays the villain.",
    optD: "He is the chief of the village.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, who acts as Ananse's accomplice and potential romantic interest?",
    optA: "Aya",
    optB: "Ekuwa",
    optC: "Miss Lily",
    optD: "Christie",
    correctAnswer: "D"
  },
  {
    qText: "In The Marriage of Anansewa, what does Christie help Ananse do?",
    optA: "She helps him farm.",
    optB: "She runs errands, deceives the messengers of the chiefs, and organizes his household.",
    optC: "She teaches Anansewa how to read.",
    optD: "She reports him to the police.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, who are Aya and Ekuwa?",
    optA: "Ananse's other daughters.",
    optB: "Anansewa's grandmother (Aya) and aunt (Ekuwa).",
    optC: "The chiefs' wives.",
    optD: "The village gossips.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what does Ananse do with the money he receives from the chiefs?",
    optA: "He buries it in the forest.",
    optB: "He pays Anansewa's Secretarial School fees, buys luxury items, and completely renovates his life and home.",
    optC: "He gives it to charity.",
    optD: "He gives it all back out of guilt.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, how does Ananse convince Anansewa to go along with the deception?",
    optA: "He threatens to beat her.",
    optB: "He promises that he will somehow ensure she marries Chief-Who-Is-Chief.",
    optC: "He tells her they will move to America.",
    optD: "He forces Christie to lie to her.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what crisis causes Ananse's plan to fall apart?",
    optA: "The police discover his letters.",
    optB: "All four chiefs send messengers announcing they are coming to claim their bride on the exact same day.",
    optC: "Anansewa runs away with a poor farmer.",
    optD: "He runs out of money.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, how does Ananse solve the problem of all four chiefs arriving to marry his daughter?",
    optA: "He flees the country.",
    optB: "He stages a fake wedding.",
    optC: "He forces Anansewa to pretend she is dead.",
    optD: "He tells them the truth and begs for mercy.",
    correctAnswer: "C"
  },
  {
    qText: "In The Marriage of Anansewa, how do the messengers of the first three chiefs react when they find out Anansewa is 'dead'?",
    optA: "They cry and mourn heavily.",
    optB: "They are angry about the wasted money and demand a refund or refuse to contribute to the funeral.",
    optC: "They offer to bury her themselves.",
    optD: "They try to resurrect her.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what does the reaction of the first three chiefs reveal about their motives?",
    optA: "They truly loved her.",
    optB: "They viewed the marriage strictly as a financial transaction and had no real affection for her.",
    optC: "They were highly religious.",
    optD: "They were deeply generous.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, how does Chief-Who-Is-Chief's messenger react to the news of Anansewa's 'death'?",
    optA: "He demands a refund.",
    optB: "He brings a message of deep sorrow, a coffin, drinks, and money, claiming her as his wife even in death.",
    optC: "He insults Ananse.",
    optD: "He laughs at the trick.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, how does Ananse resolve the 'death' of Anansewa?",
    optA: "He calls a doctor.",
    optB: "He performs a theatrical 'resurrection' ritual, claiming that Chief-Who-Is-Chief's true love has brought her back to life.",
    optC: "He sneaks her out the back door.",
    optD: "He admits it was a prank.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, the play uses a dramatic technique called 'Mboguo'. What is this?",
    optA: "A style of dancing.",
    optB: "Musical interludes, songs, and dances that comment on the action and provide breaks in the narrative.",
    optC: "A type of African drum.",
    optD: "A tragic monologue.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what does Ananse symbolise in the play?",
    optA: "The evil, unforgivable villain.",
    optB: "The cunning, resourcefulness, and survival instinct of the common man in a harsh economic reality.",
    optC: "The ideal, honest citizen.",
    optD: "A foolish old man.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what social practice does the play satirize?",
    optA: "Modern education.",
    optB: "The commercialization of marriage and the abuse of the bride-price (dowry) system.",
    optC: "The use of modern medicine.",
    optD: "The postal system.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what does the 'Property Man' do on stage?",
    optA: "He is the main actor.",
    optB: "He sits on stage and hands props to the actors visibly, emphasizing the theatrical nature of the play.",
    optC: "He sells tickets.",
    optD: "He plays the role of the Chief.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what traditional Akan concept refers to the payment made to a bride's family, which Ananse exploits?",
    optA: "Kente",
    optB: "Head-drink / Bride-price (Aseda)",
    optC: "Fufu",
    optD: "Oware",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, who arrives at Ananse's house right after the 'resurrection'?",
    optA: "The Police.",
    optB: "Aya and Ekuwa, who are astonished to see Anansewa alive.",
    optC: "The other three chiefs.",
    optD: "The landlord demanding rent.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, how does Christie benefit at the end of the play?",
    optA: "She steals Ananse's money and leaves.",
    optB: "Ananse hints that she has won his affection and they might get married.",
    optC: "She marries Chief-Who-Is-Chief.",
    optD: "She is arrested.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what is the tone of the play?",
    optA: "Deeply tragic and sorrowful.",
    optB: "Lighthearted, comic, satirical, and highly theatrical.",
    optC: "Horrifying and suspenseful.",
    optD: "Dry and academic.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, which Chief is from the Mines?",
    optA: "Chief of Sapa",
    optB: "Togbe Silva",
    optC: "Chief-Who-Is-Chief",
    optD: "The Chief of the Mines (Sika)",
    correctAnswer: "D"
  },
  {
    qText: "In The Marriage of Anansewa, why doesn't Anansewa want to marry the Chief of the Mines or Togbe Silva?",
    optA: "They are too poor.",
    optB: "They are too old, and she considers them crude compared to Chief-Who-Is-Chief.",
    optC: "They are not chiefs.",
    optD: "They live too close.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what physical prop is central to Ananse's deception of the Chiefs?",
    optA: "A lock of hair.",
    optB: "Photographs of Anansewa.",
    optC: "A golden ring.",
    optD: "A forged birth certificate.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, how does Ananse justify his deceit?",
    optA: "He says he is a god.",
    optB: "He claims the world is hard and a man must use his brain ('the spider's web') to survive.",
    optC: "He claims he is under a curse.",
    optD: "He doesn't justify it; he feels guilty the whole time.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what element makes the play an example of 'Total Theatre'?",
    optA: "It is very short.",
    optB: "The integration of music, dance, storytelling, mime, and audience participation.",
    optC: "It uses expensive modern lighting.",
    optD: "It has no script.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, who types Ananse's letters to the chiefs?",
    optA: "Christie",
    optB: "Anansewa, unaware of their full deceptive purpose initially.",
    optC: "The Storyteller",
    optD: "Ananse himself",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what happens to Ananse's relationship with the church?",
    optA: "He becomes a pastor.",
    optB: "He was previously expelled for not paying dues, but pays his way back in once he gets the chiefs' money.",
    optC: "He burns the church down.",
    optD: "He completely ignores religion.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, the concept of the 'web' is used metaphorically to represent:",
    optA: "Anansewa's wedding dress.",
    optB: "Ananse's intricate, sticky lies and schemes.",
    optC: "The internet.",
    optD: "A traditional fishing tool.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, how does Ananse simulate his grief over Anansewa's 'death'?",
    optA: "He doesn't; he remains stoic.",
    optB: "He wails loudly, throws himself on the floor, and acts extremely melodramatic.",
    optC: "He laughs hysterically.",
    optD: "He runs away.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, why does Anansewa agree to play dead?",
    optA: "She wants to sleep.",
    optB: "She trusts her father's promise that this will secure her marriage to Chief-Who-Is-Chief.",
    optC: "She is actually poisoned.",
    optD: "Christie forces her.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, how does the audience interact with the play?",
    optA: "They must remain perfectly silent.",
    optB: "They are expected to join in the songs (Mboguo) and respond to the Storyteller.",
    optC: "They throw things at the stage.",
    optD: "They vote on the ending.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what does Ananse claim is the 'custom' when rejecting the first three messengers after the 'death'?",
    optA: "That they must marry a ghost.",
    optB: "That since they did not complete the marriage rites, they have no claim to her in death and must leave.",
    optC: "That they must pay more money.",
    optD: "That they must fight each other.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what modern institution does Anansewa attend using the chiefs' money?",
    optA: "A university in London.",
    optB: "E.P.s Secretarial School.",
    optC: "A medical college.",
    optD: "A culinary institute.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what is Ananse's ultimate goal in selecting Chief-Who-Is-Chief?",
    optA: "He wants his money.",
    optB: "He sees that Chief-Who-Is-Chief genuinely loves his daughter, ensuring her happiness and his own security.",
    optC: "He wants to become a chief himself.",
    optD: "He wants to steal his land.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, what does the play teach about materialism?",
    optA: "That greed is always good.",
    optB: "It critiques the commodification of human beings while acknowledging the harsh realities of poverty.",
    optC: "That everyone should be poor.",
    optD: "That money solves every single problem without consequence.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, Christie’s character can be described as:",
    optA: "A saintly figure.",
    optB: "A pragmatic, loyal, and slightly boastful accomplice ('fashionable woman').",
    optC: "A bitter, jealous enemy.",
    optD: "A naive young girl.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, the ending of the play is:",
    optA: "A tragedy with everyone dying.",
    optB: "A happy resolution with Ananse's successful trick securing love and wealth.",
    optC: "Ambiguous; the audience doesn't know what happens.",
    optD: "A moral punishment where Ananse goes to jail.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, how does Ananse physically stage Anansewa's 'corpse'?",
    optA: "He puts her in a real coffin immediately.",
    optB: "He lays her out on a bed in the center of the room, covered in white sheets.",
    optC: "He hides her in a closet.",
    optD: "He throws her in a river.",
    correctAnswer: "B"
  },
  {
    qText: "In The Marriage of Anansewa, Efua Sutherland's goal in writing this play was to:",
    optA: "Destroy traditional African culture.",
    optB: "Modernize and preserve the traditional African storytelling format for the contemporary stage.",
    optC: "Write a purely Western-style drama.",
    optD: "Discourage marriage.",
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

    for (const q of anansewaQuestions) {
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
    console.log(`Inserted ${inserted} generated question rows for The Marriage of Anansewa across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
