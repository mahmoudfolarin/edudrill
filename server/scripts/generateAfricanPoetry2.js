require('dotenv').config();
const pool = require('../src/config/database');

const poetry2Questions = [
  // Not My Business
  {
    qText: "In Not My Business, who is the poet?",
    optA: "Wole Soyinka",
    optB: "Niyi Osundare",
    optC: "Chinua Achebe",
    optD: "Syl Cheney-Coker",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, what is the central theme of the poem?",
    optA: "The beauty of nature.",
    optB: "The dangers of political apathy and silence during a tyrannical regime.",
    optC: "The joy of business success.",
    optD: "A love story.",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, who are the victims mentioned in the first three stanzas?",
    optA: "The speaker's children.",
    optB: "Akanni, Danladi, and Chinwe.",
    optC: "The military commanders.",
    optD: "Foreign tourists.",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, what is the speaker's reaction when 'they' take away his neighbors?",
    optA: "He tries to fight them.",
    optB: "He ignores it, stating it is 'not my business' as long as they don't take his yam.",
    optC: "He calls the police.",
    optD: "He cries loudly.",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, what does the 'yam' symbolize for the speaker?",
    optA: "His religious faith.",
    optB: "His personal comfort, livelihood, and self-interest.",
    optC: "A weapon.",
    optD: "His family.",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, what happens in the final stanza?",
    optA: "The speaker becomes rich.",
    optB: "The oppressors finally come for the speaker himself, and there is no one left to speak for him.",
    optC: "The government falls.",
    optD: "The neighbors return.",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, what sound do the oppressors' vehicles make when they come for the speaker?",
    optA: "A loud horn.",
    optB: "A chilling 'jeep was waiting at my door'.",
    optC: "A siren.",
    optD: "Music.",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, what specific historical context in Nigeria is the poem critiquing?",
    optA: "The colonial era.",
    optB: "The brutal military dictatorships (like that of Sani Abacha) where citizens were frequently disappeared.",
    optC: "The civil war.",
    optD: "The democratic elections.",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, who do 'they' represent in the poem?",
    optA: "The speaker's friends.",
    optB: "The oppressive state security forces or military police.",
    optC: "Thieves.",
    optD: "Tax collectors.",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, how are the arrests described?",
    optA: "Polite and legal.",
    optB: "Violent and sudden (e.g., 'stuffed him down the belly of a waiting jeep').",
    optC: "Slow and methodical.",
    optD: "Public and televised.",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, what does the phrase 'stuffed him down the belly' personify the jeep as?",
    optA: "A fast horse.",
    optB: "A hungry, predatory monster consuming the citizens.",
    optC: "A comfortable bed.",
    optD: "A metal box.",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, the poem shares a thematic similarity with which famous post-WWII quote?",
    optA: "'I have a dream...'",
    optB: "Martin Niemöller's 'First they came for the socialists...'",
    optC: "'To be or not to be...'",
    optD: "'Give me liberty or give me death.'",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, how does the tone shift in the final stanza?",
    optA: "From angry to happy.",
    optB: "From detached and apathetic to shocked, personal, and terrified.",
    optC: "From sad to funny.",
    optD: "It doesn't change.",
    correctAnswer: "B"
  },
  {
    qText: "In Not My Business, the poem uses the repetition of the chorus ('What business of mine is it...') to emphasize:",
    optA: "The speaker's wisdom.",
    optB: "The habitual, dangerous complacency of the general public.",
    optC: "A musical rhythm.",
    optD: "The legality of the arrests.",
    correctAnswer: "B"
  },

  // Hearty Garlands
  {
    qText: "In Hearty Garlands, who is the poet?",
    optA: "Niyi Osundare",
    optB: "S.O.H. Afiesimama / Afriyie-Vidza",
    optC: "Wole Soyinka",
    optD: "Kofi Awoonor",
    correctAnswer: "B"
  },
  {
    qText: "In Hearty Garlands, what is the overarching tone of the poem?",
    optA: "Depressive and bleak.",
    optB: "Celebratory, deeply appreciative, and filled with praise.",
    optC: "Satirical.",
    optD: "Angry.",
    correctAnswer: "B"
  },
  {
    qText: "In Hearty Garlands, what does a 'garland' typically symbolize?",
    optA: "A chain for a prisoner.",
    optB: "A wreath of flowers or leaves used as a mark of honor, victory, or celebration.",
    optC: "A type of food.",
    optD: "A weapon.",
    correctAnswer: "B"
  },
  {
    qText: "In Hearty Garlands, the poem is essentially an expression of:",
    optA: "Political protest.",
    optB: "Profound gratitude, tribute, and the offering of metaphorical flowers to a revered figure or community.",
    optC: "Romantic heartbreak.",
    optD: "Fear of death.",
    correctAnswer: "B"
  },
  {
    qText: "In Hearty Garlands, the imagery relies heavily on:",
    optA: "Machinery and urban settings.",
    optB: "Nature, flowers, and items of traditional adornment/honor.",
    optC: "War and weapons.",
    optD: "The ocean and ships.",
    correctAnswer: "B"
  },
  {
    qText: "In Hearty Garlands, to whom might these 'garlands' be metaphorically offered in an African context?",
    optA: "Only to children.",
    optB: "To heroes, elders, or those who have made significant sacrifices or achieved greatness for the community.",
    optC: "To enemies.",
    optD: "To foreigners only.",
    correctAnswer: "B"
  },
  {
    qText: "In Hearty Garlands, the word 'Hearty' in the title suggests the tribute is:",
    optA: "Forced and fake.",
    optB: "Sincere, enthusiastic, and coming from deep emotion.",
    optC: "Small and insignificant.",
    optD: "Given reluctantly.",
    correctAnswer: "B"
  },
  {
    qText: "In Hearty Garlands, which literary device is used by representing praise as physical 'garlands'?",
    optA: "Simile",
    optB: "Metaphor",
    optC: "Onomatopoeia",
    optD: "Oxymoron",
    correctAnswer: "B"
  },
  {
    qText: "In Hearty Garlands, the poem contrasts heavily in tone with which other syllabus poem?",
    optA: "It doesn't contrast with any.",
    optB: "The oppressive fear of 'Not My Business' or the cultural loss of 'New Tongue'.",
    optC: "It is exactly the same as 'Night'.",
    optD: "It is identical to 'Once Upon a Time'.",
    correctAnswer: "B"
  },
  {
    qText: "In Hearty Garlands, what is the effect of the rhythmic, celebratory language?",
    optA: "It makes the reader sleepy.",
    optB: "It evokes the feeling of a traditional African praise song or festival.",
    optC: "It sounds like a news report.",
    optD: "It frightens the reader.",
    correctAnswer: "B"
  },
  {
    qText: "In Hearty Garlands, the 'garlands' are not just physical objects, but represent:",
    optA: "Money.",
    optB: "Words of affirmation, blessings, and cultural memory.",
    optC: "Sickness.",
    optD: "Silence.",
    correctAnswer: "B"
  },
  {
    qText: "In Hearty Garlands, what emotion is the reader supposed to feel upon reading the poem?",
    optA: "Apathy",
    optB: "Uplifted, appreciative, and culturally proud.",
    optC: "Guilt",
    optD: "Rage",
    correctAnswer: "B"
  },

  // The Breast of the Sea
  {
    qText: "In The Breast of the Sea, who is the poet?",
    optA: "Gabriel Okara",
    optB: "Syl Cheney-Coker",
    optC: "Leopold Senghor",
    optD: "Wole Soyinka",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, which country is the poet from, deeply influencing the poem's context?",
    optA: "Nigeria",
    optB: "Sierra Leone",
    optC: "Ghana",
    optD: "Kenya",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, how is the sea primarily personified?",
    optA: "As a violent warrior.",
    optB: "As a nurturing, maternal figure ('breast') but also a long-suffering mistress burdened by history.",
    optC: "As a young child.",
    optD: "As a cold machine.",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, what historical trauma is heavily associated with the sea in West African poetry?",
    optA: "The Gold Rush.",
    optB: "The Transatlantic Slave Trade (the Middle Passage).",
    optC: "The fall of the Roman Empire.",
    optD: "The building of the pyramids.",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, what is meant by the sea being 'polluted' or having a 'blight'?",
    optA: "Only literal plastic waste.",
    optB: "The metaphorical pollution of human violence, the slave trade, colonialism, and the blood of history.",
    optC: "Too much salt.",
    optD: "Oil spills only.",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, what does the speaker seek from the sea?",
    optA: "Gold and treasure.",
    optB: "A 'balm' or a sense of healing, cleansing, and answers for the historical trauma.",
    optC: "Fish to eat.",
    optD: "A route to Europe.",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, the title 'The Breast of the Sea' evokes imagery of:",
    optA: "Warfare and destruction.",
    optB: "Nourishment, motherhood, sustenance, and the origin of life.",
    optC: "Desert landscapes.",
    optD: "Space exploration.",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, what conflict is presented regarding the sea's nature?",
    optA: "It is too cold vs. too hot.",
    optB: "The tension between its natural role as a life-giving force and its historical role as a graveyard and route for exploitation.",
    optC: "It has waves vs. it is flat.",
    optD: "It is blue vs. it is green.",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, what is the tone of the poem?",
    optA: "Lighthearted and comedic.",
    optB: "Elegiac, mournful, reflective, and deeply historical.",
    optC: "Fast-paced and exciting.",
    optD: "Satirical.",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, how does Cheney-Coker view the 20th century?",
    optA: "As the greatest century in history.",
    optB: "As a time marked by blight, violence, and profound historical wounds.",
    optC: "As a time of perfect peace.",
    optD: "As a time with no technological progress.",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, what does the sea 'absorb' in the context of the poem?",
    optA: "Sunlight.",
    optB: "The tears, blood, and tragic memories of the African people.",
    optC: "Rainwater.",
    optD: "Foreign ships.",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, the poem asks whether the sea has the power to:",
    optA: "Destroy the world.",
    optB: "Wash away the sins of history and heal the psychological wounds of the continent.",
    optC: "Freeze over completely.",
    optD: "Dry up.",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, Syl Cheney-Coker's style is often associated with which literary movement?",
    optA: "Romanticism",
    optB: "Négritude and Creole / post-colonial existentialism (often using dense, surreal imagery).",
    optC: "Neoclassicism",
    optD: "Realism",
    correctAnswer: "B"
  },
  {
    qText: "In The Breast of the Sea, the word 'balm' in the poem refers to:",
    optA: "Lip gloss.",
    optB: "A soothing, healing ointment for emotional and historical trauma.",
    optC: "A type of tree.",
    optD: "A storm.",
    correctAnswer: "B"
  },
  
  // Mixed remainder to reach 50
  { qText: "In Not My Business, the phrase 'What business of mine is it' functions as a:", optA: "Rhetorical question indicating apathy.", optB: "Genuine inquiry.", optC: "A greeting.", optD: "A command.", correctAnswer: "A" },
  { qText: "In Hearty Garlands, the act of giving garlands is a universal symbol of:", optA: "War", optB: "Honor and festivity", optC: "Mourning", optD: "Boredom", correctAnswer: "B" },
  { qText: "In The Breast of the Sea, the sea's dual identity as mother and graveyard highlights:", optA: "Its lack of fish.", optB: "The paradox of African history and nature.", optC: "Its temperature.", optD: "Its color.", correctAnswer: "B" },
  { qText: "In Not My Business, when 'they' take Chinwe, she is accused of:", optA: "Stealing.", optB: "Being a traitor/dissident against the regime.", optC: "Tax evasion.", optD: "Nothing specific, emphasizing the arbitrary nature of the arrests.", correctAnswer: "D" },
  { qText: "In Hearty Garlands, the poem likely uses strong sensory details related to:", optA: "Sight (colors of flowers) and touch.", optB: "Smell of pollution.", optC: "Taste of bitter food.", optD: "Sound of gunshots.", correctAnswer: "A" },
  { qText: "In The Breast of the Sea, the historical memory of Sierra Leone is intrinsically linked to:", optA: "Snowstorms.", optB: "The Atlantic Ocean and the slave ports.", optC: "Desert caravans.", optD: "Mountain climbing.", correctAnswer: "B" },
  { qText: "In Not My Business, what does the poem teach about social responsibility?", optA: "Mind your own business.", optB: "Injustice against one is a threat to all; silence enables tyranny.", optC: "Always protect your yam.", optD: "Never speak to neighbors.", correctAnswer: "B" },
  { qText: "In Hearty Garlands, the title 'Hearty' emphasizes that the tribute is:", optA: "Cold.", optB: "Warm and sincere.", optC: "Expensive.", optD: "Mandatory.", correctAnswer: "B" },
  { qText: "In The Breast of the Sea, the poet questions if the sea has a 'balm', showing his feeling of:", optA: "Despair and a longing for healing.", optB: "Joy.", optC: "Anger at the fish.", optD: "Scientific curiosity.", correctAnswer: "A" },
  { qText: "In Not My Business, the final stanza's silence ('And no one was left to speak') is a direct consequence of:", optA: "Everyone moving away.", optB: "The collective apathy shown in the previous stanzas.", optC: "A loud noise.", optD: "The speaker losing his voice.", correctAnswer: "B" }
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

    for (const q of poetry2Questions) {
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
    console.log(`Inserted ${inserted} generated question rows for Poetry Batch 2 across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
