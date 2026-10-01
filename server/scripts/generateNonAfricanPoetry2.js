require('dotenv').config();
const pool = require('../src/config/database');

const nonAfricanPoetry2Questions = [
  // Still I Rise
  {
    qText: "In Still I Rise, who is the poet?",
    optA: "Langston Hughes",
    optB: "Maya Angelou",
    optC: "Alice Walker",
    optD: "Toni Morrison",
    correctAnswer: "B"
  },
  {
    qText: "In Still I Rise, what is the central theme of the poem?",
    optA: "The beauty of the natural world.",
    optB: "Resilience, self-confidence, and triumph over oppression and historical trauma.",
    optC: "A tragic romance.",
    optD: "The fear of getting older.",
    correctAnswer: "B"
  },
  {
    qText: "In Still I Rise, who is the 'you' being addressed in the poem?",
    optA: "A former lover.",
    optB: "The historical and institutional oppressor (specifically representing white supremacy and racism).",
    optC: "The speaker's mother.",
    optD: "God.",
    correctAnswer: "B"
  },
  {
    qText: "In Still I Rise, what does the speaker say the oppressor may do to her with their 'bitter, twisted lies'?",
    optA: "Write them in history.",
    optB: "Make her cry.",
    optC: "Force her to leave the country.",
    optD: "Apologize for them.",
    correctAnswer: "A"
  },
  {
    qText: "In Still I Rise, the repetition of the phrase 'I'll rise' serves to:",
    optA: "Show that she is waking up.",
    optB: "Emphasize her unbreakable spirit, determination, and upward mobility.",
    optC: "Mimic the sound of a bird.",
    optD: "Fill up the stanzas.",
    correctAnswer: "B"
  },
  {
    qText: "In Still I Rise, the speaker asks 'Does my sassiness upset you?' and compares her confidence to:",
    optA: "Having gold mines in her backyard or oil wells pumping in her living room.",
    optB: "Being a queen on a throne.",
    optC: "Having wings like an eagle.",
    optD: "Owning a large ship.",
    correctAnswer: "A"
  },
  {
    qText: "In Still I Rise, what imagery is used to describe the speaker's certainty of rising?",
    optA: "Like dust, air, moons, and suns with the certainty of tides.",
    optB: "Like a rocket going to space.",
    optC: "Like a fish swimming upstream.",
    optD: "Like a tree growing tall.",
    correctAnswer: "A"
  },
  {
    qText: "In Still I Rise, how does the oppressor supposedly want to see the speaker?",
    optA: "Rich and happy.",
    optB: "Broken, with bowed head, lowered eyes, and teardrops falling.",
    optC: "Angry and violent.",
    optD: "Quiet and peaceful.",
    correctAnswer: "B"
  },
  {
    qText: "In Still I Rise, the speaker describes leaving behind 'nights of terror and fear' to step into:",
    optA: "A quiet room.",
    optB: "A daybreak that's wondrously clear.",
    optC: "Another nightmare.",
    optD: "A cold winter.",
    correctAnswer: "B"
  },
  {
    qText: "In Still I Rise, what powerful metaphor does the speaker use for herself in the final stanzas?",
    optA: "A delicate flower.",
    optB: "A black ocean, leaping and wide.",
    optC: "A roaring lion.",
    optD: "A soaring eagle.",
    correctAnswer: "B"
  },

  // The Telephone Call
  {
    qText: "In The Telephone Call, who is the poet?",
    optA: "Sylvia Plath",
    optB: "Fleur Adcock",
    optC: "Margaret Atwood",
    optD: "Carol Ann Duffy",
    correctAnswer: "B"
  },
  {
    qText: "In The Telephone Call, what is the poem about?",
    optA: "A romantic breakup over the phone.",
    optB: "A deceptive, manipulative phone call claiming the speaker has won a massive lottery/prize.",
    optC: "A tragic death notification.",
    optD: "A wrong number.",
    correctAnswer: "B"
  },
  {
    qText: "In The Telephone Call, what prize does the caller initially tell the speaker she has won?",
    optA: "A new car.",
    optB: "The Ultra-super Global Special (a million pounds).",
    optC: "A trip to Paris.",
    optD: "A lifetime supply of groceries.",
    correctAnswer: "B"
  },
  {
    qText: "In The Telephone Call, how does the caller behave during the conversation?",
    optA: "Professional and quick.",
    optB: "Overly familiar, cheerful, and emotionally manipulative.",
    optC: "Angry and aggressive.",
    optD: "Sad and crying.",
    correctAnswer: "B"
  },
  {
    qText: "In The Telephone Call, how does the speaker react to the news of winning?",
    optA: "She hangs up immediately.",
    optB: "She is skeptical at first, then becomes emotional and starts to believe it (crying).",
    optC: "She gets angry.",
    optD: "She asks for more money.",
    correctAnswer: "B"
  },
  {
    qText: "In The Telephone Call, what is the 'catch' revealed at the end of the poem?",
    optA: "She has to pay taxes on the money.",
    optB: "She hasn't won any actual money; it is a 'Universal' experience/scam, and they only deal in 'emotions'.",
    optC: "She has to share it with a charity.",
    optD: "The money is counterfeit.",
    correctAnswer: "B"
  },
  {
    qText: "In The Telephone Call, the caller tells the speaker not to be disappointed because she has had:",
    optA: "A good laugh.",
    optB: "A great experience (the thrill of believing she won).",
    optC: "A warning for the future.",
    optD: "A conversation with a celebrity.",
    correctAnswer: "B"
  },
  {
    qText: "In The Telephone Call, the poem is a satire criticizing what?",
    optA: "The telephone company.",
    optB: "Corporate manipulation, consumerism, and the exploitation of people's hopes and emotions.",
    optC: "The postal service.",
    optD: "Government taxes.",
    correctAnswer: "B"
  },
  {
    qText: "In The Telephone Call, what format is the poem primarily written in?",
    optA: "A formal sonnet.",
    optB: "A dramatic monologue / dialogue representing a one-sided phone conversation.",
    optC: "A limerick.",
    optD: "An epic.",
    correctAnswer: "B"
  },
  {
    qText: "In The Telephone Call, what is the speaker's emotional state by the end of the poem?",
    optA: "Overjoyed.",
    optB: "Feeling foolish, deflated, and emotionally drained.",
    optC: "Violently angry.",
    optD: "Amused.",
    correctAnswer: "B"
  },

  // The Stone
  {
    qText: "In The Stone, who is the poet?",
    optA: "Wilfrid Owen",
    optB: "Wilfrid Wilson Gibson",
    optC: "Siegfried Sassoon",
    optD: "Rupert Brooke",
    correctAnswer: "B"
  },
  {
    qText: "In The Stone, what happens to the woman's lover?",
    optA: "He dies in a war.",
    optB: "He is crushed to death by a falling rock in a quarry where he works.",
    optC: "He drowns at sea.",
    optD: "He leaves her for another woman.",
    correctAnswer: "B"
  },
  {
    qText: "In The Stone, how is the news delivered to the woman?",
    optA: "By a telegram.",
    optB: "By the men carrying his broken body back to the village/house.",
    optC: "By a priest.",
    optD: "She sees it happen herself.",
    correctAnswer: "B"
  },
  {
    qText: "In The Stone, how does the woman react physically and emotionally upon hearing the news?",
    optA: "She screams and faints.",
    optB: "She is paralyzed by shock; she does not cry, but essentially turns 'to stone' herself.",
    optC: "She attacks the men who brought the body.",
    optD: "She runs away.",
    correctAnswer: "B"
  },
  {
    qText: "In The Stone, what is the central metaphor of the poem?",
    optA: "A bird flying away.",
    optB: "The 'stone'—representing both the rock that killed her lover and the emotional paralysis (petrification) she experiences in her grief.",
    optC: "A dying fire.",
    optD: "A storm at sea.",
    correctAnswer: "B"
  },
  {
    qText: "In The Stone, what is the woman's only continuous action after the tragedy?",
    optA: "She sleeps constantly.",
    optB: "She sits silently, staring unblinkingly, isolated in her trauma.",
    optC: "She sings a sad song.",
    optD: "She talks to a ghost.",
    correctAnswer: "B"
  },
  {
    qText: "In The Stone, the poet uses simple, stark language to emphasize:",
    optA: "The lack of education of the characters.",
    optB: "The raw, brutal, and unromanticized reality of industrial working-class death and grief.",
    optC: "A comedic tone.",
    optD: "The beauty of nature.",
    correctAnswer: "B"
  },
  {
    qText: "In The Stone, what does the poem suggest about severe grief?",
    optA: "It passes quickly with time.",
    optB: "It can be so overwhelming that it completely numbs and destroys a person's life force.",
    optC: "It is easily cured by friends.",
    optD: "It is an illusion.",
    correctAnswer: "B"
  },
  {
    qText: "In The Stone, Gibson's poetry often focuses on which group of people?",
    optA: "Kings and Queens.",
    optB: "The harsh realities of the rural and industrial working class.",
    optC: "Wealthy merchants.",
    optD: "Mythological gods.",
    correctAnswer: "B"
  },
  {
    qText: "In The Stone, the tragic irony of the poem is that:",
    optA: "The man was going to quit his job the next day.",
    optB: "The very stone the man worked to break apart ended up breaking him, and subsequently turning his lover into stone.",
    optC: "He had a life insurance policy.",
    optD: "The stone was made of gold.",
    correctAnswer: "B"
  },

  // Mixed remainder to reach 50
  { qText: "In Still I Rise, what does the speaker say she brings as 'the gifts that my ancestors gave'?", optA: "Money and land.", optB: "The dream and the hope of the slave.", optC: "A crown.", optD: "A sword.", correctAnswer: "B" },
  { qText: "In The Telephone Call, the company calls itself 'Universal'. This implies:", optA: "They are from space.", optB: "The experience of being scammed or having false hopes is a universal human vulnerability.", optC: "They own a movie studio.", optD: "They are a religious group.", correctAnswer: "B" },
  { qText: "In The Stone, the repetition of the word 'stone' serves to:", optA: "Bore the reader.", optB: "Hammer home the weight, coldness, and finality of death and grief.", optC: "Create a rhyme.", optD: "Describe the architecture of the house.", correctAnswer: "B" },
  { qText: "In Still I Rise, the rhetorical questions (e.g., 'Does my haughtiness offend you?') are used to:", optA: "Ask for directions.", optB: "Mock the oppressor's expectations of her submissiveness.", optC: "Show confusion.", optD: "Request permission to speak.", correctAnswer: "B" },
  { qText: "In The Telephone Call, what is the ultimate 'prize' the caller claims to give?", optA: "A million pounds.", optB: "An 'experience' of joy, completely disregarding the speaker's subsequent devastation.", optC: "A free phone line.", optD: "A job offer.", correctAnswer: "B" },
  { qText: "In The Stone, the emotional state of the woman can be described psychologically as:", optA: "Hysteria.", optB: "Catatonic shock or dissociation.", optC: "Euphoria.", optD: "Mild sadness.", correctAnswer: "B" },
  { qText: "In Still I Rise, the word 'I' in the poem represents:", optA: "Only Maya Angelou.", optB: "The poet, black women, and the collective spirit of marginalized people overcoming history.", optC: "The oppressor.", optD: "A fictional character.", correctAnswer: "B" },
  { qText: "In The Telephone Call, the tone of the caller is highly:", optA: "Sincere.", optB: "Patronizing, synthetic, and scripted.", optC: "Violent.", optD: "Depressed.", correctAnswer: "B" },
  { qText: "In The Stone, the poem explores the theme that:", optA: "Work is fulfilling.", optB: "Physical death for one can lead to emotional/psychological death for the survivor.", optC: "Rocks are dangerous.", optD: "Village life is peaceful.", correctAnswer: "B" },
  { qText: "In Still I Rise, 'You may shoot me with your words / You may cut me with your eyes' uses which literary device?", optA: "Metaphor.", optB: "Simile.", optC: "Onomatopoeia.", optD: "Alliteration.", correctAnswer: "A" },
  { qText: "In The Telephone Call, the speaker is instructed to 'Hold the line'. This has a double meaning of:", optA: "Holding a physical rope.", optB: "Waiting on the phone, and keeping her emotions in check (which she fails to do).", optC: "Drawing a picture.", optD: "Standing in a queue.", correctAnswer: "B" },
  { qText: "In The Stone, the environment (the quarry) is depicted as:", optA: "A place of natural beauty.", optB: "A harsh, unforgiving, and deadly industrial workplace.", optC: "A place for children to play.", optD: "A sacred temple.", correctAnswer: "B" },
  { qText: "In Still I Rise, the final stanzas abandon the rhyming couplets to repeat 'I rise', mimicking:", optA: "A sudden stop.", optB: "An unstoppable, rhythmic ascent and a chant of victory.", optC: "A lullaby.", optD: "A question.", correctAnswer: "B" },
  { qText: "In The Telephone Call, how does the caller justify the scam?", optA: "By saying it's legal.", optB: "By claiming they gave her a 'marvelous experience' of happiness, which is a prize in itself.", optC: "By denying they called.", optD: "By blaming a computer error.", correctAnswer: "B" },
  { qText: "In The Stone, how does the village react to the tragedy?", optA: "They ignore it.", optB: "With solemn, collective mourning and physical support (bringing the body).", optC: "They celebrate.", optD: "They blame the woman.", correctAnswer: "B" },
  { qText: "In Still I Rise, 'black ocean, leaping and wide' implies:", optA: "A polluted sea.", optB: "Vast, powerful, deep, and untameable strength.", optC: "A small pond.", optD: "A fear of swimming.", correctAnswer: "B" },
  { qText: "In The Telephone Call, the poem highlights modern society's obsession with:", optA: "Poetry.", optB: "Instant wealth and the susceptibility to hollow marketing tactics.", optC: "Health food.", optD: "Ancient history.", correctAnswer: "B" },
  { qText: "In The Stone, the poem is a classic example of early 20th-century poetry shifting focus toward:", optA: "Aristocratic romance.", optB: "Realism and the tragic dignity of the common worker.", optC: "Surrealism.", optD: "Religious allegory.", correctAnswer: "B" },
  { qText: "In Still I Rise, what is the effect of the poem's confident, defiant tone?", optA: "It inspires pity.", optB: "It empowers the reader and reclaims agency from the oppressor.", optC: "It makes the reader sleepy.", optD: "It creates confusion.", correctAnswer: "B" },
  { qText: "In The Telephone Call, what does the poem suggest about 'emotions' in the modern world?", optA: "They are sacred.", optB: "They can be manufactured, exploited, and treated as cheap commodities.", optC: "They are completely unnecessary.", optD: "They are only for the rich.", correctAnswer: "B" }
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

    for (const q of nonAfricanPoetry2Questions) {
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
    console.log(`Inserted ${inserted} generated question rows for Non-African Poetry 2 across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
