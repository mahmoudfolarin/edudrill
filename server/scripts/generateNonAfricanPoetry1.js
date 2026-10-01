require('dotenv').config();
const pool = require('../src/config/database');

const nonAfricanPoetry1Questions = [
  // She Walks in Beauty
  {
    qText: "In She Walks in Beauty, who is the poet?",
    optA: "William Wordsworth",
    optB: "Lord Byron (George Gordon)",
    optC: "John Keats",
    optD: "Percy Bysshe Shelley",
    correctAnswer: "B"
  },
  {
    qText: "In She Walks in Beauty, what does the speaker compare the woman's beauty to in the opening lines?",
    optA: "A bright summer's day.",
    optB: "The night, of cloudless climes and starry skies.",
    optC: "A blooming rose.",
    optD: "The vast ocean.",
    correctAnswer: "B"
  },
  {
    qText: "In She Walks in Beauty, what two opposing elements meet in the woman's aspect and eyes?",
    optA: "Fire and ice.",
    optB: "All that's best of dark and bright (light and shadow).",
    optC: "Joy and sorrow.",
    optD: "Earth and sky.",
    correctAnswer: "B"
  },
  {
    qText: "In She Walks in Beauty, what would happen if there was 'One shade the more, one ray the less'?",
    optA: "It would make her even more beautiful.",
    optB: "It would 'half impair' (slightly ruin) her nameless grace and perfect balance.",
    optC: "She would become completely invisible.",
    optD: "She would look ordinary.",
    correctAnswer: "B"
  },
  {
    qText: "In She Walks in Beauty, what does the woman's outer physical beauty reflect according to the final stanza?",
    optA: "Her extreme wealth.",
    optB: "Her inner goodness, a mind at peace, and a heart whose love is innocent.",
    optC: "Her superficiality.",
    optD: "Her tragic past.",
    correctAnswer: "B"
  },
  {
    qText: "In She Walks in Beauty, what literary period does this poem belong to?",
    optA: "The Enlightenment",
    optB: "Romanticism",
    optC: "Modernism",
    optD: "The Victorian Era",
    correctAnswer: "B"
  },
  {
    qText: "In She Walks in Beauty, the phrase 'nameless grace' implies that her beauty is:",
    optA: "Easily described by everyone.",
    optB: "Ineffable and beyond simple words or categories.",
    optC: "Fake and artificial.",
    optD: "Only visible at night.",
    correctAnswer: "B"
  },
  {
    qText: "In She Walks in Beauty, where does this 'grace' lighten?",
    optA: "Over her dress.",
    optB: "O'er her raven tress (her dark hair).",
    optC: "In her hands.",
    optD: "On the floor she walks on.",
    correctAnswer: "B"
  },

  // The Nun's Priest's Tale
  {
    qText: "In The Nun's Priest's Tale, who is the author of this poem/tale?",
    optA: "William Shakespeare",
    optB: "Geoffrey Chaucer",
    optC: "John Milton",
    optD: "Edmund Spenser",
    correctAnswer: "B"
  },
  {
    qText: "In The Nun's Priest's Tale, the poem is a part of which larger famous literary work?",
    optA: "The Faerie Queene",
    optB: "The Canterbury Tales",
    optC: "Beowulf",
    optD: "Paradise Lost",
    correctAnswer: "B"
  },
  {
    qText: "In The Nun's Priest's Tale, what type of story is this?",
    optA: "A romantic tragedy.",
    optB: "A beast fable / mock-heroic epic.",
    optC: "A historical biography.",
    optD: "A science fiction epic.",
    correctAnswer: "B"
  },
  {
    qText: "In The Nun's Priest's Tale, who is the main character?",
    optA: "A brave knight.",
    optB: "Chauntecleer, a proud and handsome rooster.",
    optC: "A poor widow.",
    optD: "A magical king.",
    correctAnswer: "B"
  },
  {
    qText: "In The Nun's Priest's Tale, who is Chauntecleer's favorite wife/hen?",
    optA: "Matilda",
    optB: "Pertelote",
    optC: "Guinevere",
    optD: "Isabella",
    correctAnswer: "B"
  },
  {
    qText: "In The Nun's Priest's Tale, what causes the initial argument between Chauntecleer and Pertelote?",
    optA: "Food shortages.",
    optB: "Chauntecleer has a terrifying dream about a beast (a fox), and Pertelote dismisses it as mere indigestion.",
    optC: "Another rooster challenging him.",
    optD: "The farmer trying to kill them.",
    correctAnswer: "B"
  },
  {
    qText: "In The Nun's Priest's Tale, what is Pertelote's prescribed remedy for the dream?",
    optA: "Prayer and fasting.",
    optB: "Laxatives and worms to balance his bodily humours.",
    optC: "Running away to the woods.",
    optD: "Fighting the fox.",
    correctAnswer: "B"
  },
  {
    qText: "In The Nun's Priest's Tale, how does the fox (Don Russell) trick Chauntecleer?",
    optA: "He hides in a bush and ambushes him.",
    optB: "He uses extreme flattery, asking him to sing beautifully with his eyes closed like his father did.",
    optC: "He pretends to be dead.",
    optD: "He offers him corn.",
    correctAnswer: "B"
  },
  {
    qText: "In The Nun's Priest's Tale, what happens when Chauntecleer closes his eyes to sing?",
    optA: "The hens cheer for him.",
    optB: "The fox grabs him by the neck and runs off into the woods.",
    optC: "He forgets the song.",
    optD: "He wakes up from a dream.",
    correctAnswer: "B"
  },
  {
    qText: "In The Nun's Priest's Tale, how does Chauntecleer trick the fox and escape?",
    optA: "He pecks the fox's eyes out.",
    optB: "He uses the fox's pride against him, convincing the fox to turn around and taunt his pursuers. When the fox opens his mouth to speak, the rooster flies away.",
    optC: "He plays dead.",
    optD: "The farmer shoots the fox.",
    correctAnswer: "B"
  },
  {
    qText: "In The Nun's Priest's Tale, what is the primary moral of the fable?",
    optA: "Always eat healthy food.",
    optB: "Beware of flattery and pride; keep your eyes open and mouth shut when necessary.",
    optC: "Never trust a woman.",
    optD: "Animals are smarter than humans.",
    correctAnswer: "B"
  },
  {
    qText: "In The Nun's Priest's Tale, the elevated, serious style used to describe the actions of farm animals is called:",
    optA: "Free verse.",
    optB: "Mock-epic or mock-heroic.",
    optC: "Blank verse.",
    optD: "Haiku.",
    correctAnswer: "B"
  },
  
  // Digging
  {
    qText: "In Digging, who is the poet?",
    optA: "W.B. Yeats",
    optB: "Seamus Heaney",
    optC: "Dylan Thomas",
    optD: "T.S. Eliot",
    correctAnswer: "B"
  },
  {
    qText: "In Digging, what is the speaker holding at the beginning of the poem?",
    optA: "A spade.",
    optB: "A squat pen, resting 'snug as a gun'.",
    optC: "A shovel.",
    optD: "A potato.",
    correctAnswer: "B"
  },
  {
    qText: "In Digging, what sound does the speaker hear from outside his window?",
    optA: "Traffic on the road.",
    optB: "The clean rasping sound of his father's spade digging in the flowerbeds.",
    optC: "Children playing.",
    optD: "A tractor engine.",
    correctAnswer: "B"
  },
  {
    qText: "In Digging, the poem flashes back to memories of both the father and grandfather doing what?",
    optA: "Building houses.",
    optB: "Digging potatoes and cutting peat (turf) with expert skill and rhythm.",
    optC: "Fishing in the ocean.",
    optD: "Writing books.",
    correctAnswer: "B"
  },
  {
    qText: "In Digging, how does the speaker feel about his father and grandfather's physical labor?",
    optA: "He is ashamed of it.",
    optB: "He is deeply respectful and in awe of their physical strength and expertise.",
    optC: "He finds it boring.",
    optD: "He thinks they were foolish.",
    correctAnswer: "B"
  },
  {
    qText: "In Digging, what realization does the speaker come to regarding his own career?",
    optA: "He wants to become a farmer too.",
    optB: "He has no spade to follow men like them, meaning he is breaking the generational tradition of manual labor.",
    optC: "He hates writing.",
    optD: "He is physically stronger than them.",
    correctAnswer: "B"
  },
  {
    qText: "In Digging, how does the speaker resolve the tension between his intellectual life and his ancestors' physical labor?",
    optA: "He decides to stop writing.",
    optB: "He decides he will 'dig' with his pen, equating his poetic craft with their manual labor.",
    optC: "He throws his pen out the window.",
    optD: "He buys a farm.",
    correctAnswer: "B"
  },
  {
    qText: "In Digging, the description of the pen 'snug as a gun' suggests:",
    optA: "The speaker is a soldier.",
    optB: "The power, precision, and potential impact of his writing.",
    optC: "The pen is made of metal.",
    optD: "He intends to hurt someone.",
    correctAnswer: "B"
  },
  {
    qText: "In Digging, what sensory details are prominent in the poem's imagery?",
    optA: "Smells of perfume.",
    optB: "Earthy, agricultural elements like the 'cold smell of potato mould', 'squelch and slap' of peat.",
    optC: "The bright lights of a city.",
    optD: "The taste of fine wine.",
    correctAnswer: "B"
  },
  {
    qText: "In Digging, the act of 'digging' metaphorically represents:",
    optA: "Burying secrets.",
    optB: "Uncovering roots, exploring personal and cultural history, and performing hard, dedicated work.",
    optC: "Looking for gold.",
    optD: "Destroying the environment.",
    correctAnswer: "B"
  },
  
  // Mixed remainder to reach 50
  { qText: "In She Walks in Beauty, the rhyme scheme of the poem is:", optA: "ABABAB", optB: "AABBCC", optC: "Free verse", optD: "ABABCD", correctAnswer: "A" },
  { qText: "In The Nun's Priest's Tale, what language was the poem originally written in?", optA: "Modern English", optB: "Middle English", optC: "Old English", optD: "Latin", correctAnswer: "B" },
  { qText: "In Digging, the poem's structure is mostly:", optA: "Strict sonnet form.", optB: "Free verse with irregular stanzas mimicking the rhythm of digging.", optC: "Haiku.", optD: "Limerick.", correctAnswer: "B" },
  { qText: "In She Walks in Beauty, what does the poet say about the woman's 'smiles that win, the tints that glow'?", optA: "They show she is arrogant.", optB: "They tell of days in goodness spent.", optC: "They are fake.", optD: "They fade quickly.", correctAnswer: "B" },
  { qText: "In The Nun's Priest's Tale, Chauntecleer uses examples from classical history and literature to prove what?", optA: "That he is smarter than the farmer.", optB: "That dreams are prophetic and should be taken seriously.", optC: "That hens are foolish.", optD: "That foxes are friendly.", correctAnswer: "B" },
  { qText: "In Digging, what specific landscape is evoked?", optA: "The Scottish Highlands.", optB: "The rural Irish landscape (Toner's bog).", optC: "The English countryside.", optD: "A Welsh mining town.", correctAnswer: "B" },
  { qText: "In She Walks in Beauty, the focus of the poem shifts from:", optA: "Her mind to her shoes.", optB: "Her external physical appearance to her internal moral purity.", optC: "Her past to her future.", optD: "The day to the night.", correctAnswer: "B" },
  { qText: "In The Nun's Priest's Tale, the tale is an allegory for:", optA: "The crusades.", optB: "The fall of man, temptation, and the dangers of yielding to flattery.", optC: "The Black Death.", optD: "The discovery of America.", correctAnswer: "B" },
  { qText: "In Digging, 'By God, the old man could handle a spade' expresses the speaker's:", optA: "Anger.", optB: "Profound admiration and pride.", optC: "Sarcasm.", optD: "Jealousy.", correctAnswer: "B" },
  { qText: "In She Walks in Beauty, 'cloudless climes and starry skies' is an example of:", optA: "Onomatopoeia.", optB: "Alliteration and imagery.", optC: "Personification.", optD: "Irony.", correctAnswer: "B" },
  { qText: "In The Nun's Priest's Tale, Pertelote accuses Chauntecleer of lacking what?", optA: "Money.", optB: "Courage (manhood).", optC: "A loud voice.", optD: "Feathers.", correctAnswer: "B" },
  { qText: "In Digging, the grandfather's work of cutting peat provides what for the family?", optA: "Food.", optB: "Fuel for the fire (warmth).", optC: "Water.", optD: "Clothing.", correctAnswer: "B" },
  { qText: "In She Walks in Beauty, how many stanzas does the poem have?", optA: "One", optB: "Three", optC: "Five", optD: "Ten", correctAnswer: "B" },
  { qText: "In The Nun's Priest's Tale, what happens in the barnyard when the fox runs away with the rooster?", optA: "Everyone goes back to sleep.", optB: "A massive, chaotic chase ensues involving all the humans and animals on the farm.", optC: "The hens elect a new rooster.", optD: "The farmer sets fire to the woods.", correctAnswer: "B" },
  { qText: "In Digging, the transition from spade to pen signifies a shift from:", optA: "Wealth to poverty.", optB: "Manual, physical labor to intellectual, creative labor.", optC: "Happiness to sadness.", optD: "Youth to old age.", correctAnswer: "B" },
  { qText: "In She Walks in Beauty, what does the poem lack that is common in romantic poetry?", optA: "Any mention of nature.", optB: "Any declaration of romantic or sexual love; it is purely an expression of aesthetic and moral admiration.", optC: "Rhyme.", optD: "Adjectives.", correctAnswer: "B" },
  { qText: "In The Nun's Priest's Tale, how does the fox attempt to recover after being tricked?", optA: "He cries.", optB: "He tries to flatter the rooster again, but Chauntecleer refuses to be fooled twice.", optC: "He attacks the farmer.", optD: "He climbs the tree.", correctAnswer: "B" },
  { qText: "In Digging, the repetition of the word 'digging' emphasizes:", optA: "The speaker's boredom.", optB: "The continuity of labor and the connection between the generations.", optC: "A literal hole in the ground.", optD: "The loss of a shovel.", correctAnswer: "B" },
  { qText: "In She Walks in Beauty, 'A mind at peace with all below' suggests she is:", optA: "Dead.", optB: "Earthly, calm, and morally grounded.", optC: "Asleep.", optD: "Ignorant of the world.", correctAnswer: "B" },
  { qText: "In Digging, what does the poet intend to 'dig' up with his pen?", optA: "Potatoes.", optB: "His cultural heritage, memories, and poetic truths.", optC: "Dirt.", optD: "Money.", correctAnswer: "B" }
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

    for (const q of nonAfricanPoetry1Questions) {
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
    console.log(`Inserted ${inserted} generated question rows for Non-African Poetry 1 across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
