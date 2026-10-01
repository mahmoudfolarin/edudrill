require('dotenv').config();
const pool = require('../src/config/database');

const mockingbirdQuestions = [
  {
    qText: "In To Kill a Mockingbird, who is the author of the novel?",
    optA: "John Steinbeck",
    optB: "Harper Lee",
    optC: "F. Scott Fitzgerald",
    optD: "Mark Twain",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, the story is set in which fictional town?",
    optA: "Maycomb, Alabama",
    optB: "Macomb, Illinois",
    optC: "St. Petersburg, Missouri",
    optD: "Jefferson, Mississippi",
    correctAnswer: "A"
  },
  {
    qText: "In To Kill a Mockingbird, during what historical period does the novel take place?",
    optA: "The Civil War",
    optB: "World War I",
    optC: "The Great Depression",
    optD: "The Civil Rights Movement of the 1960s",
    correctAnswer: "C"
  },
  {
    qText: "In To Kill a Mockingbird, who is the narrator of the story?",
    optA: "Atticus Finch",
    optB: "Jem Finch",
    optC: "Jean Louise 'Scout' Finch",
    optD: "Arthur 'Boo' Radley",
    correctAnswer: "C"
  },
  {
    qText: "In To Kill a Mockingbird, what is Atticus Finch's profession?",
    optA: "Doctor",
    optB: "Teacher",
    optC: "Lawyer",
    optD: "Sheriff",
    correctAnswer: "C"
  },
  {
    qText: "In To Kill a Mockingbird, who is Tom Robinson?",
    optA: "A white farmer",
    optB: "A black man accused of raping a white woman",
    optC: "Scout's teacher",
    optD: "The town sheriff",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, who accuses Tom Robinson of rape?",
    optA: "Miss Maudie Atkinson",
    optB: "Mayella Ewell",
    optC: "Aunt Alexandra",
    optD: "Calpurnia",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, who is Bob Ewell?",
    optA: "The judge presiding over the case",
    optB: "Mayella's abusive, alcoholic father",
    optC: "The prosecuting attorney",
    optD: "A friendly neighbor",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, who is Boo Radley?",
    optA: "A reclusive neighbor whom the children fear but are fascinated by",
    optB: "A strict school teacher",
    optC: "The racist sheriff of Maycomb",
    optD: "Atticus's brother",
    correctAnswer: "A"
  },
  {
    qText: "In To Kill a Mockingbird, what is Boo Radley's real first name?",
    optA: "Arthur",
    optB: "Nathan",
    optC: "Walter",
    optD: "Charles",
    correctAnswer: "A"
  },
  {
    qText: "In To Kill a Mockingbird, who is Calpurnia?",
    optA: "Scout's aunt",
    optB: "The Finches' stern but loving Black cook and housekeeper",
    optC: "The town gossip",
    optD: "Tom Robinson's wife",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, who is Dill?",
    optA: "Scout's older brother",
    optB: "A boy who visits his aunt in Maycomb every summer and befriends Jem and Scout",
    optC: "The son of Bob Ewell",
    optD: "A poor farmer's son",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what is Dill's real name?",
    optA: "Charles Baker Harris",
    optB: "Walter Cunningham",
    optC: "Burris Ewell",
    optD: "Cecil Jacobs",
    correctAnswer: "A"
  },
  {
    qText: "In To Kill a Mockingbird, what do Jem and Scout find in the knot-hole of the oak tree on the Radley property?",
    optA: "Money and jewels",
    optB: "Small gifts like gum, pennies, and soap figures carved to look like them",
    optC: "A map of the town",
    optD: "A confession letter from Boo",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, who fills the knot-hole with cement?",
    optA: "Atticus Finch",
    optB: "Sheriff Heck Tate",
    optC: "Nathan Radley (Boo's brother)",
    optD: "Bob Ewell",
    correctAnswer: "C"
  },
  {
    qText: "In To Kill a Mockingbird, what reason does Nathan Radley give for filling the knot-hole with cement?",
    optA: "He caught the children stealing.",
    optB: "He says the tree is dying.",
    optC: "He wanted to build a fence.",
    optD: "He hates children.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, who is Miss Maudie Atkinson?",
    optA: "A racist neighbor",
    optB: "A kind neighbor who bakes cakes and talks to the children as equals",
    optC: "Scout's first-grade teacher",
    optD: "Tom Robinson's employer",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what disaster happens to Miss Maudie's house?",
    optA: "It is flooded.",
    optB: "It burns down in a fire.",
    optC: "It is destroyed by a tornado.",
    optD: "It is vandalized by the Ewells.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, who places a blanket around Scout's shoulders while she watches Miss Maudie's house burn?",
    optA: "Atticus",
    optB: "Jem",
    optC: "Boo Radley",
    optD: "Miss Stephanie Crawford",
    correctAnswer: "C"
  },
  {
    qText: "In To Kill a Mockingbird, why does Atticus take Tom Robinson's case despite knowing he will likely lose?",
    optA: "He wants to become famous.",
    optB: "He believes in equality and feels it is his moral duty to uphold justice.",
    optC: "The judge forces him to take it, and he has no choice.",
    optD: "He wants to anger the townspeople.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what is the central metaphor of the 'mockingbird'?",
    optA: "A noisy nuisance that should be silenced.",
    optB: "Innocence that is destroyed by evil; it is a sin to kill them because they only sing and do no harm.",
    optC: "A symbol of the legal system.",
    optD: "A symbol of racism.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, which two characters are most often identified as 'mockingbirds' in the novel?",
    optA: "Jem and Scout",
    optB: "Atticus and Calpurnia",
    optC: "Tom Robinson and Boo Radley",
    optD: "Bob Ewell and Nathan Radley",
    correctAnswer: "C"
  },
  {
    qText: "In To Kill a Mockingbird, what does Atticus do that surprises Jem and Scout and earns their deep respect?",
    optA: "He wins a race.",
    optB: "He shoots a mad dog (Tim Johnson) with a single shot.",
    optC: "He beats up Bob Ewell.",
    optD: "He buys them horses.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what was Atticus's nickname when he was younger?",
    optA: "One-Shot Finch",
    optB: "The Maycomb Mauler",
    optC: "Deadeye Dick",
    optD: "Gentleman Joe",
    correctAnswer: "A"
  },
  {
    qText: "In To Kill a Mockingbird, who is Mrs. Henry Lafayette Dubose?",
    optA: "The town gossip",
    optB: "An elderly, racist woman battling a morphine addiction",
    optC: "The judge's wife",
    optD: "Scout's aunt",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what punishment does Jem receive for destroying Mrs. Dubose's camellia bushes?",
    optA: "He is grounded for a month.",
    optB: "He has to read to her every day for a month.",
    optC: "He has to pay her from his allowance.",
    optD: "He is whipped by Atticus.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, why does Atticus consider Mrs. Dubose to be a great lady and an example of real courage?",
    optA: "She left all her money to the church.",
    optB: "She fought to overcome her morphine addiction before she died, dying free.",
    optC: "She defended Tom Robinson publicly.",
    optD: "She never complained about her illness.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, where do Jem, Scout, and Dill sit during the trial?",
    optA: "In the front row behind Atticus.",
    optB: "In the 'colored balcony' with Reverend Sykes.",
    optC: "Outside the courthouse.",
    optD: "In the jury box.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what key piece of physical evidence does Atticus point out during the trial?",
    optA: "A bloody knife.",
    optB: "Mayella's bruises are primarily on the right side of her face, suggesting a left-handed attacker.",
    optC: "A torn piece of clothing belonging to Bob Ewell.",
    optD: "A footprint outside the window.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what is revealed about Tom Robinson's physical condition?",
    optA: "He is blind in one eye.",
    optB: "His left arm is crippled and useless from a cotton gin accident.",
    optC: "He uses a wheelchair.",
    optD: "He is missing his right hand.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what is revealed about Bob Ewell during his testimony?",
    optA: "He is left-handed.",
    optB: "He was not in town on the day of the crime.",
    optC: "He is secretly wealthy.",
    optD: "He is a close friend of Tom Robinson.",
    correctAnswer: "A"
  },
  {
    qText: "In To Kill a Mockingbird, according to Tom's testimony, why did he go into the Ewell house?",
    optA: "To steal money.",
    optB: "Mayella asked him to come in and fix a door (or do a chore), and then she made advances toward him.",
    optC: "Bob Ewell invited him for a drink.",
    optD: "He was lost.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what fatal 'mistake' does Tom Robinson make during his testimony in the eyes of the white jury?",
    optA: "He calls Mayella a liar.",
    optB: "He says he felt sorry for Mayella.",
    optC: "He refuses to answer questions.",
    optD: "He insults the judge.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what is the verdict of Tom Robinson's trial?",
    optA: "Not guilty",
    optB: "Guilty",
    optC: "Hung jury (mistrial)",
    optD: "Charges dismissed",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what happens to Tom Robinson after the trial?",
    optA: "He wins on appeal.",
    optB: "He is shot and killed by prison guards while allegedly trying to escape.",
    optC: "He serves a short sentence and is released.",
    optD: "He escapes and moves to the North.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, who spits in Atticus's face and threatens him after the trial?",
    optA: "Mr. Cunningham",
    optB: "Bob Ewell",
    optC: "Nathan Radley",
    optD: "Sheriff Tate",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, how does Atticus react to Bob Ewell's threat?",
    optA: "He hits Bob Ewell.",
    optB: "He ignores it, saying he wishes Bob wouldn't chew tobacco.",
    optC: "He carries a gun.",
    optD: "He arrests him.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what does Bob Ewell do to Helen Robinson (Tom's widow)?",
    optA: "He offers her money.",
    optB: "He stalks and harasses her on her way to work.",
    optC: "He forces her to move out of town.",
    optD: "He sets fire to her house.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, who defends Helen Robinson from Bob Ewell's harassment?",
    optA: "Atticus",
    optB: "Link Deas (Tom's former employer)",
    optC: "Sheriff Tate",
    optD: "Boo Radley",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what is Scout's role in the Halloween pageant?",
    optA: "A ghost",
    optB: "A ham",
    optC: "A pumpkin",
    optD: "A mockingbird",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, who attacks Jem and Scout as they walk home from the pageant?",
    optA: "Cecil Jacobs",
    optB: "Nathan Radley",
    optC: "Bob Ewell",
    optD: "A random stranger",
    correctAnswer: "C"
  },
  {
    qText: "In To Kill a Mockingbird, who saves Jem and Scout from the attacker?",
    optA: "Atticus",
    optB: "Sheriff Tate",
    optC: "Boo Radley",
    optD: "Mr. Cunningham",
    correctAnswer: "C"
  },
  {
    qText: "In To Kill a Mockingbird, what injury does Jem suffer during the attack?",
    optA: "A concussion",
    optB: "A broken arm",
    optC: "A broken leg",
    optD: "A stab wound",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, how does Bob Ewell die?",
    optA: "Atticus shoots him.",
    optB: "He falls on his own knife during the struggle with Boo Radley.",
    optC: "He is lynched by the townspeople.",
    optD: "He dies in a fire.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, who insists that Bob Ewell 'fell on his knife' to protect the person who actually killed him?",
    optA: "Atticus",
    optB: "Sheriff Heck Tate",
    optC: "Miss Maudie",
    optD: "Judge Taylor",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, why does Sheriff Tate refuse to publicly expose Boo Radley as the hero?",
    optA: "He hates Boo Radley.",
    optB: "He believes the attention of the town would be a sin to thrust upon the shy, reclusive Boo.",
    optC: "He wants to take the credit himself.",
    optD: "He thinks Atticus will be mad.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what does Scout do after taking Boo Radley home?",
    optA: "She never sees him again, but she stands on his porch and views the neighborhood from his perspective.",
    optB: "She invites him to dinner.",
    optC: "She asks him to speak to Jem.",
    optD: "She writes a letter thanking him.",
    correctAnswer: "A"
  },
  {
    qText: "In To Kill a Mockingbird, Aunt Alexandra primarily represents:",
    optA: "Modern, progressive views.",
    optB: "Traditional Southern gentility, classism, and strict gender roles.",
    optC: "Racial equality.",
    optD: "Childlike innocence.",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, which character is known for pretending to be a town drunk to avoid judgment for associating with Black people?",
    optA: "Bob Ewell",
    optB: "Dolphus Raymond",
    optC: "Link Deas",
    optD: "Mr. Underwood",
    correctAnswer: "B"
  },
  {
    qText: "In To Kill a Mockingbird, what important lesson does Atticus teach Scout about understanding other people?",
    optA: "You should always judge people by their family name.",
    optB: "You never really understand a person until you consider things from his point of view... until you climb into his skin and walk around in it.",
    optC: "People are born either good or evil.",
    optD: "Never talk to strangers.",
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

    for (const q of mockingbirdQuestions) {
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
    console.log(`Inserted ${inserted} generated question rows for To Kill a Mockingbird across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
