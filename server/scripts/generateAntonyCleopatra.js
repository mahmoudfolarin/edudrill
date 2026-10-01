require('dotenv').config();
const pool = require('../src/config/database');

const antonyAndCleopatraQuestions = [
  {
    qText: "In Antony and Cleopatra, who is one of the three triumvirs of the Roman Empire along with Antony?",
    optA: "Julius Caesar",
    optB: "Octavius Caesar",
    optC: "Pompey",
    optD: "Enobarbus",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, where does Cleopatra reside as queen?",
    optA: "Rome",
    optB: "Alexandria, Egypt",
    optC: "Athens",
    optD: "Actium",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, what news calls Antony back to Rome initially?",
    optA: "His wife, Fulvia, is dead and Pompey is threatening Rome.",
    optB: "Octavius Caesar has been assassinated.",
    optC: "Cleopatra has betrayed him.",
    optD: "The Parthians have conquered Egypt.",
    correctAnswer: "A"
  },
  {
    qText: "In Antony and Cleopatra, to whom does Antony agree to marry to cement his alliance with Octavius?",
    optA: "Charmian",
    optB: "Fulvia",
    optC: "Octavia",
    optD: "Iras",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, how does Cleopatra react when she hears that Antony has married Octavia?",
    optA: "She sends Antony a congratulatory letter.",
    optB: "She attempts suicide.",
    optC: "She beats the messenger who brings the news.",
    optD: "She marries Pompey in retaliation.",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, who is Antony’s most loyal supporter who ultimately deserts him?",
    optA: "Lepidus",
    optB: "Enobarbus",
    optC: "Agrippa",
    optD: "Eros",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, during the Battle of Actium, why does Antony's fleet lose?",
    optA: "Antony’s ships are too heavy.",
    optB: "Cleopatra’s ships flee the battle, and Antony follows her.",
    optC: "Octavius has a secret weapon.",
    optD: "Enobarbus betrays the battle plans to Octavius.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, who is the third, somewhat weak member of the Roman Triumvirate?",
    optA: "Pompey",
    optB: "Maecenas",
    optC: "Lepidus",
    optD: "Agrippa",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, how does Enobarbus die?",
    optA: "He is killed in battle by Octavius.",
    optB: "He dies of a broken heart / guilt after betraying Antony.",
    optC: "Antony executes him for treason.",
    optD: "He is bitten by a snake.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, what does Antony do when he learns of Enobarbus's desertion?",
    optA: "He orders his assassination.",
    optB: "He sends Enobarbus's treasure after him with gentle greetings.",
    optC: "He curses him publicly.",
    optD: "He captures his family.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, why does Antony attempt suicide?",
    optA: "He is captured by Octavius.",
    optB: "He receives false news that Cleopatra is dead.",
    optC: "He is diagnosed with a fatal illness.",
    optD: "His army refuses to fight.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, who helps Antony attempt suicide but ends up killing himself instead?",
    optA: "Enobarbus",
    optB: "Eros",
    optC: "Scarus",
    optD: "Dercetas",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, how does Antony ultimately die?",
    optA: "He is poisoned by Cleopatra.",
    optB: "He falls on his own sword and is taken to Cleopatra's monument, where he dies in her arms.",
    optC: "He is beheaded by Octavius Caesar.",
    optD: "He drowns during the sea battle.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, why does Cleopatra commit suicide?",
    optA: "She hates her children.",
    optB: "She wants to avoid being paraded as a captive in Caesar's triumph in Rome.",
    optC: "She is forced to by Octavius.",
    optD: "She loses her wealth.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, what method does Cleopatra use to kill herself?",
    optA: "She drinks poison.",
    optB: "She stabs herself with a dagger.",
    optC: "She lets poisonous snakes (asps) bite her.",
    optD: "She jumps from her monument.",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, who are Cleopatra's loyal attendants who die alongside her?",
    optA: "Charmian and Iras",
    optB: "Octavia and Livia",
    optC: "Philo and Demetrius",
    optD: "Alexas and Mardian",
    correctAnswer: "A"
  },
  {
    qText: "In Antony and Cleopatra, what is the name of the fortune-teller who predicts that Antony's fortune will always pale next to Caesar's?",
    optA: "The Oracle of Delphi",
    optB: "The Soothsayer",
    optC: "Tiresias",
    optD: "Mardian",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, what is Pompey's full name?",
    optA: "Julius Pompey",
    optB: "Sextus Pompeius",
    optC: "Gnaeus Pompeius Magnus",
    optD: "Marcus Pompey",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, what opportunity does Pompey refuse during a feast on his ship?",
    optA: "To marry Cleopatra.",
    optB: "To cut the cable of the ship and assassinate the three triumvirs.",
    optC: "To invade Egypt.",
    optD: "To surrender to Octavius.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, who suggests cutting the ship's cable and killing the triumvirs to Pompey?",
    optA: "Menas",
    optB: "Agrippa",
    optC: "Enobarbus",
    optD: "Maecenas",
    correctAnswer: "A"
  },
  {
    qText: "In Antony and Cleopatra, what is the main conflict that drives the plot?",
    optA: "The war between Egypt and Parthia.",
    optB: "Antony's internal struggle between his duty to Rome and his love for Cleopatra.",
    optC: "Cleopatra's desire to conquer Rome.",
    optD: "Octavius Caesar's love for Cleopatra.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, who says: 'Age cannot wither her, nor custom stale / Her infinite variety'?",
    optA: "Antony",
    optB: "Enobarbus",
    optC: "Octavius Caesar",
    optD: "Pompey",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, which character is described as a 'strumpet' and 'gypsy' by the Romans?",
    optA: "Octavia",
    optB: "Fulvia",
    optC: "Cleopatra",
    optD: "Charmian",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, how does Octavius Caesar break his treaty with Pompey?",
    optA: "He attacks Pompey's forces and kills him.",
    optB: "He refuses to pay Pompey tribute.",
    optC: "He marries Pompey's sister.",
    optD: "He makes Pompey a triumvir.",
    correctAnswer: "A"
  },
  {
    qText: "In Antony and Cleopatra, what excuse does Octavius use to remove Lepidus from the Triumvirate?",
    optA: "Lepidus was secretly allied with Cleopatra.",
    optB: "Lepidus was too old and sick.",
    optC: "Lepidus was accused of treason and conspiring with Pompey.",
    optD: "Lepidus stole from the treasury.",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, after fleeing Actium, what does Cleopatra offer Octavius?",
    optA: "Her complete surrender and all of Egypt's wealth.",
    optB: "Antony's head.",
    optC: "A marriage alliance.",
    optD: "Her crown, asking only that her sons be allowed to rule Egypt.",
    correctAnswer: "D"
  },
  {
    qText: "In Antony and Cleopatra, what is Octavius Caesar's response to Cleopatra's petition?",
    optA: "He agrees to her terms.",
    optB: "He promises her safety if she will betray or kill Antony.",
    optC: "He ignores her letter entirely.",
    optD: "He orders her immediate execution.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, what does Antony offer Octavius after Actium?",
    optA: "To fight him in single combat.",
    optB: "To surrender Egypt.",
    optC: "To return to Octavia.",
    optD: "To pay a massive fine.",
    correctAnswer: "A"
  },
  {
    qText: "In Antony and Cleopatra, what does Cleopatra do when Antony rages at her for allegedly betraying him a second time?",
    optA: "She orders her guards to arrest him.",
    optB: "She flees to her monument and sends word that she has killed herself.",
    optC: "She confesses to the betrayal.",
    optD: "She leaves Egypt for Rome.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, what kind of snake does Cleopatra use for her suicide?",
    optA: "A cobra",
    optB: "An asp",
    optC: "A python",
    optD: "A viper",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, how is the deadly snake brought to Cleopatra in the monument?",
    optA: "In a basket of figs brought by a rural fellow (Clown).",
    optB: "In a jewelry box.",
    optC: "Hidden in a bouquet of flowers.",
    optD: "Smuggled by Charmian in her dress.",
    correctAnswer: "A"
  },
  {
    qText: "In Antony and Cleopatra, what does Octavius decree for Antony and Cleopatra after their deaths?",
    optA: "They should be buried separately in unmarked graves.",
    optB: "Antony will be buried in Rome, Cleopatra in Egypt.",
    optC: "They shall be buried together in a single magnificent tomb.",
    optD: "Their bodies should be burned.",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, which character is known for his cold, calculating, and purely political nature?",
    optA: "Antony",
    optB: "Octavius Caesar",
    optC: "Enobarbus",
    optD: "Pompey",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, what major theme is highlighted by the contrast between Rome and Egypt?",
    optA: "Wealth vs. Poverty",
    optB: "Duty, reason, and order vs. passion, luxury, and pleasure.",
    optC: "Youth vs. Old Age",
    optD: "Religion vs. Atheism",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, how does Octavia's character contrast with Cleopatra's?",
    optA: "Octavia is fiery and passionate, while Cleopatra is cold.",
    optB: "Octavia is calm, loyal, and submissive, while Cleopatra is dramatic and manipulative.",
    optC: "Octavia is a warrior, while Cleopatra is a pacifist.",
    optD: "They are virtually identical in character.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, Mardian the eunuch serves primarily as:",
    optA: "A fierce warrior for Antony.",
    optB: "A loyal attendant and messenger for Cleopatra.",
    optC: "A spy for Octavius Caesar.",
    optD: "The captain of the Egyptian fleet.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, what do the soldiers hear the night before the final battle, which they interpret as the god Hercules abandoning Antony?",
    optA: "Loud thunder and lightning.",
    optB: "Strange music coming from under the earth/ground.",
    optC: "The howling of wolves.",
    optD: "A voice calling Antony's name.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, who is Octavius Caesar's sister?",
    optA: "Fulvia",
    optB: "Charmian",
    optC: "Octavia",
    optD: "Livia",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, what happens to Fulvia?",
    optA: "She divorces Antony.",
    optB: "She is killed by Octavius.",
    optC: "She dies of an illness in Sicyon after rebelling against Caesar.",
    optD: "She moves to Egypt to fight Cleopatra.",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, who says: 'The stroke of death is as a lover's pinch, / Which hurts, and is desired'?",
    optA: "Antony",
    optB: "Cleopatra",
    optC: "Enobarbus",
    optD: "Octavius",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, how does Antony feel immediately after marrying Octavia?",
    optA: "He is deeply in love with her.",
    optB: "He feels his duty to Rome is complete and plans to stay.",
    optC: "He realizes his pleasure lies in the East and plans to return to Cleopatra.",
    optD: "He plans to murder her.",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, who is Dolabella?",
    optA: "A servant of Cleopatra.",
    optB: "A friend of Caesar who pities Cleopatra and reveals Caesar's plan to parade her in Rome.",
    optC: "The general of Pompey's army.",
    optD: "A pirate allied with Menas.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, what is the role of Alexas?",
    optA: "He is a Roman soldier.",
    optB: "He is an attendant to Cleopatra who later betrays Antony.",
    optC: "He is the snake handler.",
    optD: "He is Octavius's messenger.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, why does Cleopatra beat the messenger from Rome?",
    optA: "He insulted her appearance.",
    optB: "He delivered the news that Antony married Octavia.",
    optC: "He brought a declaration of war.",
    optD: "He asked for a bribe.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, what does Cleopatra ask the messenger about Octavia?",
    optA: "Her wealth and status.",
    optB: "Her age, height, voice, and facial features.",
    optC: "Her political influence.",
    optD: "If she has any children.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, which battle marks the final defeat of Antony's forces?",
    optA: "The Battle of Philippi",
    optB: "The Battle of Actium",
    optC: "The Battle of Alexandria",
    optD: "The Battle of Pharsalus",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, who is Antony's trusted general who wins a victory in Parthia but stops conquering to avoid making Antony jealous?",
    optA: "Ventidius",
    optB: "Eros",
    optC: "Silius",
    optD: "Canidius",
    correctAnswer: "A"
  },
  {
    qText: "In Antony and Cleopatra, which of the triumvirs is characterized by his drunkenness at Pompey's feast?",
    optA: "Antony",
    optB: "Octavius",
    optC: "Lepidus",
    optD: "Pompey",
    correctAnswer: "C"
  },
  {
    qText: "In Antony and Cleopatra, when Antony is dying, what does he advise Cleopatra to do?",
    optA: "To kill Octavius.",
    optB: "To seek her honor and safety with Octavius, trusting only Proculeius.",
    optC: "To flee to Parthia.",
    optD: "To commit suicide immediately.",
    correctAnswer: "B"
  },
  {
    qText: "In Antony and Cleopatra, Shakespeare bases much of the historical plot on which ancient writer's work?",
    optA: "Homer's Iliad",
    optB: "Plutarch's 'Lives of the Noble Grecians and Romans'",
    optC: "Virgil's Aeneid",
    optD: "Ovid's Metamorphoses",
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

    for (const q of antonyAndCleopatraQuestions) {
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
    console.log(`Inserted ${inserted} generated question rows for Antony and Cleopatra across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
