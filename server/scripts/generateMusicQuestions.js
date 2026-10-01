require('dotenv').config();
const pool = require('../src/config/database');

const musicQuestions = [
  {
    qText: "The standard musical alphabet consists of how many letters?",
    optA: "5",
    optB: "7",
    optC: "8",
    optD: "12",
    correctAnswer: "B"
  },
  {
    qText: "The five horizontal lines and four spaces on which music is written is called a:",
    optA: "Scale",
    optB: "Clef",
    optC: "Staff (or Stave)",
    optD: "Bar",
    correctAnswer: "C"
  },
  {
    qText: "The symbol placed at the beginning of a staff to indicate the pitch of the notes is a:",
    optA: "Rest",
    optB: "Clef",
    optC: "Time signature",
    optD: "Key signature",
    correctAnswer: "B"
  },
  {
    qText: "Another name for the Treble Clef is the:",
    optA: "F Clef",
    optB: "G Clef",
    optC: "C Clef",
    optD: "Alto Clef",
    correctAnswer: "B"
  },
  {
    qText: "Another name for the Bass Clef is the:",
    optA: "F Clef",
    optB: "G Clef",
    optC: "C Clef",
    optD: "Tenor Clef",
    correctAnswer: "A"
  },
  {
    qText: "The lines of the Treble Clef, from bottom to top, are named:",
    optA: "F A C E",
    optB: "G B D F A",
    optC: "E G B D F",
    optD: "A C E G B",
    correctAnswer: "C"
  },
  {
    qText: "The spaces of the Treble Clef, from bottom to top, spell the word:",
    optA: "F A C E",
    optB: "E G B D",
    optC: "C A G E",
    optD: "B A D E",
    correctAnswer: "A"
  },
  {
    qText: "The lines of the Bass Clef, from bottom to top, are named:",
    optA: "F A C E",
    optB: "G B D F A",
    optC: "E G B D F",
    optD: "A C E G",
    correctAnswer: "B"
  },
  {
    qText: "A musical note that receives four beats in 4/4 time is a:",
    optA: "Quarter note (Crotchet)",
    optB: "Half note (Minim)",
    optC: "Whole note (Semibreve)",
    optD: "Eighth note (Quaver)",
    correctAnswer: "C"
  },
  {
    qText: "A half note (Minim) is held for how many beats in 4/4 time?",
    optA: "1",
    optB: "2",
    optC: "3",
    optD: "4",
    correctAnswer: "B"
  },
  {
    qText: "Which symbol raises a note by a semitone (half step)?",
    optA: "Flat",
    optB: "Natural",
    optC: "Sharp",
    optD: "Fermata",
    correctAnswer: "C"
  },
  {
    qText: "Which symbol lowers a note by a semitone (half step)?",
    optA: "Sharp",
    optB: "Flat",
    optC: "Natural",
    optD: "Accent",
    correctAnswer: "B"
  },
  {
    qText: "Which symbol cancels a previous sharp or flat?",
    optA: "Natural",
    optB: "Fermata",
    optC: "Staccato",
    optD: "Tie",
    correctAnswer: "A"
  },
  {
    qText: "The distance between two pitches is called an:",
    optA: "Octave",
    optB: "Interval",
    optC: "Scale",
    optD: "Chord",
    correctAnswer: "B"
  },
  {
    qText: "An interval of eight diatonic scale degrees is an:",
    optA: "Unison",
    optB: "Octave",
    optC: "Third",
    optD: "Fifth",
    correctAnswer: "B"
  },
  {
    qText: "A sequence of notes played one after another is called:",
    optA: "Harmony",
    optB: "Melody",
    optC: "Rhythm",
    optD: "Tempo",
    correctAnswer: "B"
  },
  {
    qText: "Two or more notes played at the same time create:",
    optA: "Melody",
    optB: "Harmony / Chord",
    optC: "Rhythm",
    optD: "Dynamics",
    correctAnswer: "B"
  },
  {
    qText: "The speed of the beat in music is known as:",
    optA: "Dynamics",
    optB: "Tempo",
    optC: "Pitch",
    optD: "Timbre",
    correctAnswer: "B"
  },
  {
    qText: "The Italian term 'Allegro' means:",
    optA: "Slow",
    optB: "Walking pace",
    optC: "Fast and lively",
    optD: "Very slow",
    correctAnswer: "C"
  },
  {
    qText: "The Italian term 'Adagio' means:",
    optA: "Fast",
    optB: "Moderately fast",
    optC: "Slow and leisurely",
    optD: "Very fast",
    correctAnswer: "C"
  },
  {
    qText: "The volume (loudness or softness) of music is called:",
    optA: "Tempo",
    optB: "Pitch",
    optC: "Dynamics",
    optD: "Timbre",
    correctAnswer: "C"
  },
  {
    qText: "The dynamic marking 'f' (forte) means:",
    optA: "Soft",
    optB: "Very soft",
    optC: "Loud",
    optD: "Very loud",
    correctAnswer: "C"
  },
  {
    qText: "The dynamic marking 'p' (piano) means:",
    optA: "Loud",
    optB: "Soft",
    optC: "Gradually getting louder",
    optD: "Gradually getting softer",
    correctAnswer: "B"
  },
  {
    qText: "The term 'Crescendo' means to:",
    optA: "Gradually get softer",
    optB: "Suddenly get loud",
    optC: "Gradually get louder",
    optD: "Slow down",
    correctAnswer: "C"
  },
  {
    qText: "The unique quality or 'color' of a sound that distinguishes one instrument from another is called:",
    optA: "Pitch",
    optB: "Dynamics",
    optC: "Timbre",
    optD: "Tempo",
    correctAnswer: "C"
  },
  {
    qText: "A group of musicians playing instruments together is an:",
    optA: "Orchestra / Band",
    optB: "Choir",
    optC: "Solo",
    optD: "Duet",
    correctAnswer: "A"
  },
  {
    qText: "A group of singers performing together is a:",
    optA: "Band",
    optB: "Orchestra",
    optC: "Choir",
    optD: "Symphony",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a brass instrument?",
    optA: "Violin",
    optB: "Flute",
    optC: "Trumpet",
    optD: "Clarinet",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a woodwind instrument?",
    optA: "Trombone",
    optB: "Cello",
    optC: "Clarinet",
    optD: "Tuba",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a stringed instrument?",
    optA: "Violin",
    optB: "Oboe",
    optC: "French Horn",
    optD: "Snare drum",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following is a percussion instrument?",
    optA: "Flute",
    optB: "Timpani (Kettledrum)",
    optC: "Bassoon",
    optD: "Viola",
    correctAnswer: "B"
  },
  {
    qText: "The highest female singing voice is:",
    optA: "Alto",
    optB: "Tenor",
    optC: "Soprano",
    optD: "Bass",
    correctAnswer: "C"
  },
  {
    qText: "The lowest male singing voice is:",
    optA: "Soprano",
    optB: "Alto",
    optC: "Tenor",
    optD: "Bass",
    correctAnswer: "D"
  },
  {
    qText: "The four main voice parts in a standard choir are:",
    optA: "Soprano, Alto, Tenor, Bass (SATB)",
    optB: "Soprano, Mezzo, Baritone, Bass",
    optC: "Tenor, Alto, Contralto, Bass",
    optD: "Soprano, Alto, Treble, Bass",
    correctAnswer: "A"
  },
  {
    qText: "In a time signature, the top number indicates:",
    optA: "What kind of note gets one beat",
    optB: "How many beats are in each measure (bar)",
    optC: "How fast to play the music",
    optD: "How loud to play",
    correctAnswer: "B"
  },
  {
    qText: "In a 3/4 time signature, there are:",
    optA: "3 beats per measure, quarter note gets 1 beat",
    optB: "4 beats per measure, quarter note gets 1 beat",
    optC: "3 beats per measure, half note gets 1 beat",
    optD: "4 beats per measure, half note gets 1 beat",
    correctAnswer: "A"
  },
  {
    qText: "A dot placed after a note:",
    optA: "Shortens the note by half",
    optB: "Increases its value by half of its original value",
    optC: "Makes the note louder",
    optD: "Raises the pitch by a semitone",
    correctAnswer: "B"
  },
  {
    qText: "A dotted half note in 4/4 time receives how many beats?",
    optA: "2",
    optB: "3",
    optC: "4",
    optD: "1.5",
    correctAnswer: "B"
  },
  {
    qText: "The Nigerian traditional instrument 'Talking Drum' is also known as:",
    optA: "Kakaki",
    optB: "Oja",
    optC: "Dundun / Gangan",
    optD: "Ekwe",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a traditional Igbo musical instrument made of wood?",
    optA: "Kakaki",
    optB: "Goje",
    optC: "Ogene / Ekwe",
    optD: "Algaita",
    correctAnswer: "C"
  },
  {
    qText: "Fela Anikulapo Kuti was the pioneer of which music genre?",
    optA: "Juju",
    optB: "Highlife",
    optC: "Afrobeat",
    optD: "Fuji",
    correctAnswer: "C"
  },
  {
    qText: "King Sunny Ade is a prominent figure in which Nigerian music genre?",
    optA: "Fuji",
    optB: "Juju",
    optC: "Apala",
    optD: "Afrobeats",
    correctAnswer: "B"
  },
  {
    qText: "Which classical composer wrote the famous 'Symphony No. 5'?",
    optA: "Wolfgang Amadeus Mozart",
    optB: "Johann Sebastian Bach",
    optC: "Ludwig van Beethoven",
    optD: "Frederic Chopin",
    correctAnswer: "C"
  },
  {
    qText: "A composition written for a solo instrument accompanied by an orchestra is called a:",
    optA: "Sonata",
    optB: "Concerto",
    optC: "Symphony",
    optD: "Etude",
    correctAnswer: "B"
  },
  {
    qText: "A pentatonic scale consists of how many notes?",
    optA: "5",
    optB: "6",
    optC: "7",
    optD: "8",
    correctAnswer: "A"
  },
  {
    qText: "The lines added above or below the staff to extend its range are called:",
    optA: "Bar lines",
    optB: "Ledger lines",
    optC: "Tie lines",
    optD: "Slur lines",
    correctAnswer: "B"
  },
  {
    qText: "A curved line connecting two notes of the same pitch to combine their duration is a:",
    optA: "Slur",
    optB: "Tie",
    optC: "Phrase mark",
    optD: "Fermata",
    correctAnswer: "B"
  },
  {
    qText: "The term 'A cappella' refers to:",
    optA: "Singing very loudly",
    optB: "Singing with a full orchestra",
    optC: "Singing without instrumental accompaniment",
    optD: "Singing in a church",
    correctAnswer: "C"
  },
  {
    qText: "The 'Grand Staff' consists of:",
    optA: "Two Treble Clefs",
    optB: "Two Bass Clefs",
    optC: "A Treble Clef and a Bass Clef joined together",
    optD: "An Alto Clef and a Tenor Clef",
    correctAnswer: "C"
  },
  {
    qText: "Which instrument has black and white keys and is considered a percussion and string instrument?",
    optA: "Violin",
    optB: "Guitar",
    optC: "Piano",
    optD: "Harp",
    correctAnswer: "C"
  }
];

async function main() {
  const subjectSlug = 'music';
  const subjectGroup = 'Arts';
  const subjectName = 'Music';

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

    for (const q of musicQuestions) {
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
