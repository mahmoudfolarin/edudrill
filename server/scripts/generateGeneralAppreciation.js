require('dotenv').config();
const pool = require('../src/config/database');

const generalAppreciationQuestions = [
  {
    qText: "In General Appreciation of literature, what is the term for the central message or underlying meaning of a literary work?",
    optA: "Plot",
    optB: "Theme",
    optC: "Setting",
    optD: "Climax",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, what figure of speech involves a direct comparison using 'like' or 'as'?",
    optA: "Metaphor",
    optB: "Simile",
    optC: "Personification",
    optD: "Hyperbole",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of poetry, what is the repetition of initial consonant sounds in neighboring words called?",
    optA: "Assonance",
    optB: "Alliteration",
    optC: "Onomatopoeia",
    optD: "Rhyme",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of drama, what is it called when a character speaks their thoughts aloud while alone on stage?",
    optA: "Dialogue",
    optB: "Soliloquy",
    optC: "Aside",
    optD: "Prologue",
    correctAnswer: "B"
  },
  {
    qText: "In literary General Appreciation, when non-human objects are given human qualities, it is called:",
    optA: "Simile",
    optB: "Personification",
    optC: "Oxymoron",
    optD: "Synecdoche",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of prose, the sequence of events in a story is known as the:",
    optA: "Theme",
    optB: "Plot",
    optC: "Setting",
    optD: "Characterization",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of drama, the turning point or the highest point of tension is the:",
    optA: "Introduction",
    optB: "Climax",
    optC: "Resolution",
    optD: "Denouement",
    correctAnswer: "B"
  },
  {
    qText: "In literary General Appreciation, an extreme exaggeration used for effect is called:",
    optA: "Litotes",
    optB: "Hyperbole",
    optC: "Metaphor",
    optD: "Irony",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, when the opposite of what is expected happens, it is known as:",
    optA: "Sarcasm",
    optB: "Irony (Situational)",
    optC: "Tragedy",
    optD: "Comedy",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of poetry, a stanza consisting of four lines is called a:",
    optA: "Couplet",
    optB: "Quatrain",
    optC: "Sestet",
    optD: "Octave",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, the time and place where a story occurs is the:",
    optA: "Plot",
    optB: "Setting",
    optC: "Mood",
    optD: "Tone",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, the main character of a story is called the:",
    optA: "Antagonist",
    optB: "Protagonist",
    optC: "Narrator",
    optD: "Foil",
    correctAnswer: "B"
  },
  {
    qText: "In literary General Appreciation, the character or force working against the main character is the:",
    optA: "Protagonist",
    optB: "Antagonist",
    optC: "Sidekick",
    optD: "Hero",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of poetry, words that imitate sounds (e.g., 'buzz', 'hiss') are examples of:",
    optA: "Alliteration",
    optB: "Onomatopoeia",
    optC: "Assonance",
    optD: "Consonance",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, a story that can be interpreted to reveal a hidden moral or political meaning is an:",
    optA: "Epic",
    optB: "Allegory",
    optC: "Ode",
    optD: "Elegy",
    correctAnswer: "B"
  },
  {
    qText: "In literary General Appreciation, a direct comparison without using 'like' or 'as' is a:",
    optA: "Simile",
    optB: "Metaphor",
    optC: "Personification",
    optD: "Hyperbole",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of poetry, a poem mourning the dead is called an:",
    optA: "Ode",
    optB: "Elegy",
    optC: "Sonnet",
    optD: "Epic",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of poetry, a poem with 14 lines, usually written in iambic pentameter, is a:",
    optA: "Limerick",
    optB: "Sonnet",
    optC: "Ballad",
    optD: "Haiku",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of drama, a fatal flaw leading to the downfall of a tragic hero is called:",
    optA: "Hubris",
    optB: "Hamartia (Tragic Flaw)",
    optC: "Catharsis",
    optD: "Nemesis",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, the perspective from which a story is told is the:",
    optA: "Theme",
    optB: "Point of View",
    optC: "Setting",
    optD: "Plot",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, an author's attitude toward the subject is referred to as:",
    optA: "Mood",
    optB: "Tone",
    optC: "Atmosphere",
    optD: "Style",
    correctAnswer: "B"
  },
  {
    qText: "In literary General Appreciation, the emotional atmosphere created for the reader is the:",
    optA: "Tone",
    optB: "Mood",
    optC: "Theme",
    optD: "Setting",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, a recurring element, symbol, or theme in a work of art is a:",
    optA: "Climax",
    optB: "Motif",
    optC: "Metaphor",
    optD: "Simile",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of poetry, the repetition of vowel sounds within closely packed words is called:",
    optA: "Alliteration",
    optB: "Assonance",
    optC: "Consonance",
    optD: "Rhyme",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of drama, a brief remark made by a character to the audience, unheard by others on stage, is an:",
    optA: "Epilogue",
    optB: "Aside",
    optC: "Soliloquy",
    optD: "Monologue",
    correctAnswer: "B"
  },
  {
    qText: "In literary General Appreciation, placing two contrasting ideas or images side by side is called:",
    optA: "Irony",
    optB: "Juxtaposition",
    optC: "Metaphor",
    optD: "Simile",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, a figure of speech combining contradictory terms (e.g., 'jumbo shrimp') is an:",
    optA: "Understatement",
    optB: "Oxymoron",
    optC: "Hyperbole",
    optD: "Euphemism",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, a mild or indirect word substituted for one considered to be too harsh or blunt is a:",
    optA: "Metaphor",
    optB: "Euphemism",
    optC: "Pun",
    optD: "Hyperbole",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of poetry, poetry that does not rhyme or have a regular meter is known as:",
    optA: "Blank verse",
    optB: "Free verse",
    optC: "Lyric poetry",
    optD: "Sonnet",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, the resolution or final outcome of a play or story is the:",
    optA: "Climax",
    optB: "Denouement",
    optC: "Rising Action",
    optD: "Prologue",
    correctAnswer: "B"
  },
  {
    qText: "In literary General Appreciation, a play on words based on different meanings of words that sound alike is a:",
    optA: "Simile",
    optB: "Pun",
    optC: "Metaphor",
    optD: "Alliteration",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, the use of hints or clues to suggest what will happen later in a plot is:",
    optA: "Flashback",
    optB: "Foreshadowing",
    optC: "Irony",
    optD: "Suspense",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of drama, the purging or purification of the audience's emotions (like pity and fear) at the end of a tragedy is:",
    optA: "Hubris",
    optB: "Catharsis",
    optC: "Climax",
    optD: "Denouement",
    correctAnswer: "B"
  },
  {
    qText: "In literary General Appreciation, a part representing the whole (e.g., 'all hands on deck') is a figure of speech called:",
    optA: "Metaphor",
    optB: "Synecdoche",
    optC: "Simile",
    optD: "Personification",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, when the audience knows something that the characters do not, it is called:",
    optA: "Verbal Irony",
    optB: "Dramatic Irony",
    optC: "Situational Irony",
    optD: "Sarcasm",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of poetry, a long narrative poem celebrating the deeds of a hero is an:",
    optA: "Elegy",
    optB: "Epic",
    optC: "Ode",
    optD: "Sonnet",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, a deliberate understatement for rhetorical effect (e.g., 'not bad') is:",
    optA: "Hyperbole",
    optB: "Litotes",
    optC: "Metaphor",
    optD: "Pun",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of prose, a short, interesting, or amusing story about a real incident or person is an:",
    optA: "Epic",
    optB: "Anecdote",
    optC: "Fable",
    optD: "Allegory",
    correctAnswer: "B"
  },
  {
    qText: "In literary General Appreciation, substituting the name of an attribute for the thing meant (e.g., 'The Crown' for the monarchy) is called:",
    optA: "Synecdoche",
    optB: "Metonymy",
    optC: "Simile",
    optD: "Personification",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of poetry, two successive rhyming lines in a verse are known as a:",
    optA: "Quatrain",
    optB: "Couplet",
    optC: "Sestet",
    optD: "Octave",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of drama, excessive pride or arrogance that leads to a character's downfall is termed:",
    optA: "Catharsis",
    optB: "Hubris",
    optC: "Hamartia",
    optD: "Nemesis",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, a rhetorical question is one that:",
    optA: "Requires a detailed answer.",
    optB: "Is asked for effect and does not require an answer.",
    optC: "Is asked by a confused character.",
    optD: "Has multiple correct answers.",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of prose, the struggle between opposing forces (internal or external) is the:",
    optA: "Setting",
    optB: "Conflict",
    optC: "Climax",
    optD: "Resolution",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of poetry, the pattern of rhyming lines (e.g., AABB, ABAB) is called the:",
    optA: "Meter",
    optB: "Rhyme Scheme",
    optC: "Rhythm",
    optD: "Stanza",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of drama, what is a speech given by a single character to other characters or the audience called?",
    optA: "Soliloquy",
    optB: "Monologue",
    optC: "Dialogue",
    optD: "Aside",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, the use of symbols to represent ideas or qualities is:",
    optA: "Imagery",
    optB: "Symbolism",
    optC: "Hyperbole",
    optD: "Metaphor",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, a short tale that teaches a moral lesson, typically with animals as characters, is a:",
    optA: "Myth",
    optB: "Fable",
    optC: "Legend",
    optD: "Parable",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, visually descriptive or figurative language that appeals to the senses is:",
    optA: "Symbolism",
    optB: "Imagery",
    optC: "Irony",
    optD: "Alliteration",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of literature, writing that ridicules society or individuals with the intent of shaming them into improvement is:",
    optA: "Comedy",
    optB: "Satire",
    optC: "Tragedy",
    optD: "Romance",
    correctAnswer: "B"
  },
  {
    qText: "In General Appreciation of poetry, a formal, often ceremonious lyric poem that addresses and often celebrates a person, place, or thing is an:",
    optA: "Elegy",
    optB: "Ode",
    optC: "Epic",
    optD: "Sonnet",
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

    for (const q of generalAppreciationQuestions) {
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
    console.log(`Inserted ${inserted} generated question rows for General Appreciation across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
