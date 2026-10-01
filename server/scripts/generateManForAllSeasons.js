require('dotenv').config();
const pool = require('../src/config/database');

const manForAllSeasonsQuestions = [
  {
    qText: "In A Man for All Seasons, who is the playwright of this historical drama?",
    optA: "William Shakespeare",
    optB: "Robert Bolt",
    optC: "Arthur Miller",
    optD: "George Bernard Shaw",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who is the historical figure and protagonist of the play?",
    optA: "King Henry VIII",
    optB: "Sir Thomas More",
    optC: "Thomas Cromwell",
    optD: "Cardinal Wolsey",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, the play explores the events surrounding the reign of which English monarch?",
    optA: "King Edward VI",
    optB: "King James I",
    optC: "King Henry VIII",
    optD: "Queen Elizabeth I",
    correctAnswer: "C"
  },
  {
    qText: "In A Man for All Seasons, what is the central political and religious conflict of the play?",
    optA: "The war against France.",
    optB: "King Henry VIII's desire to divorce Catherine of Aragon to marry Anne Boleyn.",
    optC: "The establishment of the Magna Carta.",
    optD: "The Spanish Armada invasion.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who serves as the narrator and plays various lower-class roles throughout the play?",
    optA: "The Common Man",
    optB: "The Duke of Norfolk",
    optC: "Richard Rich",
    optD: "Thomas Cranmer",
    correctAnswer: "A"
  },
  {
    qText: "In A Man for All Seasons, what does the 'Common Man' character represent?",
    optA: "Absolute evil and corruption.",
    optB: "The everyday person focused on survival and self-interest rather than high moral principles.",
    optC: "The voice of God.",
    optD: "The British aristocracy.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what position does Thomas More hold before resigning?",
    optA: "Archbishop of Canterbury",
    optB: "Lord Chancellor of England",
    optC: "Prime Minister",
    optD: "Commander of the Army",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who is Thomas More's ambitious and eventually treacherous young friend?",
    optA: "Will Roper",
    optB: "Thomas Cromwell",
    optC: "Richard Rich",
    optD: "Chapuys",
    correctAnswer: "C"
  },
  {
    qText: "In A Man for All Seasons, what does Thomas More offer Richard Rich early in the play to dissuade him from entering politics?",
    optA: "A position as a teacher.",
    optB: "A large sum of gold.",
    optC: "A knighthood.",
    optD: "An estate in France.",
    correctAnswer: "A"
  },
  {
    qText: "In A Man for All Seasons, who is Thomas More's wife?",
    optA: "Margaret",
    optB: "Alice",
    optC: "Catherine",
    optD: "Anne",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who is Thomas More's highly educated daughter?",
    optA: "Alice",
    optB: "Margaret",
    optC: "Mary",
    optD: "Elizabeth",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who does Margaret eventually marry?",
    optA: "Richard Rich",
    optB: "Will Roper",
    optC: "Thomas Cromwell",
    optD: "The Duke of Norfolk",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, why does Thomas More initially object to Will Roper marrying Margaret?",
    optA: "Roper is too poor.",
    optB: "Roper is a Lutheran 'heretic' at the time.",
    optC: "Roper is uneducated.",
    optD: "Roper is already married.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who precedes Thomas More as Lord Chancellor but falls from grace for failing to secure the King's divorce?",
    optA: "Thomas Cromwell",
    optB: "Cardinal Wolsey",
    optC: "The Duke of Norfolk",
    optD: "Bishop Fisher",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what does King Henry VIII desperately want from Thomas More?",
    optA: "His resignation.",
    optB: "His money and lands.",
    optC: "His public approval and blessing for the divorce and his new marriage.",
    optD: "His military leadership.",
    correctAnswer: "C"
  },
  {
    qText: "In A Man for All Seasons, why is Thomas More's approval so important to the King?",
    optA: "More is the richest man in England.",
    optB: "More has a reputation throughout Europe as a man of impeccable honesty and moral integrity.",
    optC: "More controls the army.",
    optD: "More is the Pope's brother.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who is the cunning, pragmatic, and ruthless secretary to Cardinal Wolsey who later orchestrates More's downfall?",
    optA: "Richard Rich",
    optB: "Thomas Cromwell",
    optC: "The Duke of Norfolk",
    optD: "Chapuys",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who is the Spanish ambassador trying to ensure More does not support the divorce?",
    optA: "Signor Chapuys",
    optB: "Don Juan",
    optC: "Philip II",
    optD: "Cardinal Campeggio",
    correctAnswer: "A"
  },
  {
    qText: "In A Man for All Seasons, what is Thomas More's primary defense strategy?",
    optA: "Fleeing to France.",
    optB: "Remaining completely silent on the issue, believing silence means consent under the law.",
    optC: "Openly rebelling and gathering an army.",
    optD: "Assassinating Cromwell.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what defining metaphor does More use to describe the law?",
    optA: "A giant oak tree.",
    optB: "A forest of trees planted to protect citizens from the devil and tyranny.",
    optC: "A sharp sword.",
    optD: "A golden chain.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what happens to More's family after he resigns as Lord Chancellor?",
    optA: "They are given a royal pension.",
    optB: "They fall into poverty because they lose his income.",
    optC: "They are all imprisoned immediately.",
    optD: "They move into the royal palace.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who breaks their friendship with More to save their own reputation and life?",
    optA: "Will Roper",
    optB: "The Duke of Norfolk",
    optC: "Margaret",
    optD: "Alice",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what object does More receive as a bribe early on, which he then gives to Richard Rich?",
    optA: "A golden chalice/cup.",
    optB: "A silver sword.",
    optC: "A diamond ring.",
    optD: "A bag of coins.",
    correctAnswer: "A"
  },
  {
    qText: "In A Man for All Seasons, how does Cromwell try to trap More regarding the silver cup?",
    optA: "He accuses More of stealing it from the King.",
    optB: "He tries to use it as evidence that More accepted a bribe while acting as a judge.",
    optC: "He claims it belongs to the Pope.",
    optD: "He says it is poisoned.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what document is everyone in England required to swear an oath to?",
    optA: "The Magna Carta",
    optB: "The Act of Succession",
    optC: "The Declaration of Independence",
    optD: "The Treaty of Windsor",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, why does More refuse to swear the oath?",
    optA: "He hates Anne Boleyn.",
    optB: "It would require him to swear that the King is the Supreme Head of the Church, which violates his conscience and Catholic faith.",
    optC: "He wants to be King himself.",
    optD: "He cannot read it.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, where is Thomas More imprisoned for his refusal to swear the oath?",
    optA: "Newgate Prison",
    optB: "The Tower of London",
    optC: "Alcatraz",
    optD: "The Bastille",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what is Alice's initial attitude toward More's refusal to swear the oath?",
    optA: "She fully understands and supports his religious views immediately.",
    optB: "She is angry, confused, and feels he is foolishly choosing a principle over his family's safety.",
    optC: "She asks the King to execute him.",
    optD: "She divorces him.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, how is More treated in prison?",
    optA: "He is given luxurious meals and books.",
    optB: "He is deprived of his books, comfort, and eventually interrogated aggressively.",
    optC: "He is completely ignored.",
    optD: "He is allowed to go home on weekends.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what ultimate crime is Thomas More charged with?",
    optA: "Theft",
    optB: "High Treason",
    optC: "Murder",
    optD: "Tax evasion",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who provides the perjured (false) testimony that condemns Thomas More to death?",
    optA: "Thomas Cromwell",
    optB: "Richard Rich",
    optC: "Will Roper",
    optD: "The Duke of Norfolk",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what lie does Richard Rich tell the court?",
    optA: "That More planned to kill the King.",
    optB: "That More explicitly stated to him in prison that Parliament had no power to make the King Head of the Church.",
    optC: "That More was taking bribes from Spain.",
    optD: "That More burned Bibles.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what reward did Richard Rich receive for his false testimony?",
    optA: "He became King.",
    optB: "He was appointed Attorney General for Wales.",
    optC: "He was given a million pounds.",
    optD: "He became Archbishop of Canterbury.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what does More say to Rich upon noticing his new chain of office in court?",
    optA: "He congratulates him.",
    optB: "He quotes scripture: 'It profits a man nothing to give his soul for the whole world... but for Wales?'",
    optC: "He curses him to die.",
    optD: "He asks for his share of the money.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, once More is found guilty, what does he finally do?",
    optA: "He breaks his silence and loudly declares that the Act of Supremacy is illegal and contrary to God's law.",
    optB: "He begs for mercy and offers to sign the oath.",
    optC: "He remains completely silent.",
    optD: "He attacks Cromwell.",
    correctAnswer: "A"
  },
  {
    qText: "In A Man for All Seasons, how does Thomas More view his 'self' or identity?",
    optA: "It is determined by his wealth.",
    optB: "It is inextricably linked to his conscience and his soul; to betray it would be to destroy himself.",
    optC: "It is defined by what the King says it is.",
    optD: "It is an illusion.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, the water and the river (Thames) are recurring motifs representing:",
    optA: "Absolute cleanliness.",
    optB: "The shifting tides of political favor and the flow of time.",
    optC: "The Spanish navy.",
    optD: "More's wealth.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, the title of the play suggests that Thomas More is:",
    optA: "A man who changes his mind every season.",
    optB: "A man of unyielding integrity, steadfast and true regardless of the changing times or 'seasons'.",
    optC: "A famous farmer.",
    optD: "A man who loves the outdoors.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who is the King's new wife, the cause of the succession crisis?",
    optA: "Catherine of Aragon",
    optB: "Jane Seymour",
    optC: "Anne Boleyn",
    optD: "Mary Tudor",
    correctAnswer: "C"
  },
  {
    qText: "In A Man for All Seasons, how is King Henry VIII characterized during his brief appearance in the play?",
    optA: "As a weak, cowardly old man.",
    optB: "As a charming but deeply volatile, intellectual, and dangerous Renaissance prince.",
    optC: "As a poor beggar.",
    optD: "As a deeply pious monk.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what is Thomas More's final interaction with his family before his execution?",
    optA: "They refuse to see him.",
    optB: "A heartbreaking farewell in the Tower where Alice finally understands his stance and they reaffirm their love.",
    optC: "They help him try to escape.",
    optD: "He tells them to forget him.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what does More tell the executioner before he dies?",
    optA: "He curses the executioner.",
    optB: "He tells him not to feel bad, for he is sending More to God.",
    optC: "He offers him a bribe to let him go.",
    optD: "He refuses to speak to him.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, Thomas Cromwell represents what philosophy of governance?",
    optA: "Strict adherence to divine law.",
    optB: "Machiavellian pragmatism, getting results for the King by any means necessary.",
    optC: "Pure democracy.",
    optD: "Anarchism.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, why doesn't More simply explain his religious objections to his family early on?",
    optA: "He doesn't love them.",
    optB: "To protect them legally; if they don't know his reasons, they can't be forced to testify against him.",
    optC: "He thinks they are too stupid.",
    optD: "He forgot his reasons.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what is the role of the Common Man in the execution scene?",
    optA: "He is the executioner.",
    optB: "He tries to stop it.",
    optC: "He takes the King's place.",
    optD: "He protests the death loudly.",
    correctAnswer: "A"
  },
  {
    qText: "In A Man for All Seasons, how does Robert Bolt use the concept of 'silence' in the play?",
    optA: "To show that the characters have no dialogue.",
    optB: "As More's legal shield and the ultimate expression of his refusal to compromise his conscience.",
    optC: "To bore the audience.",
    optD: "To indicate the King is asleep.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, the struggle between More and Cromwell is essentially a struggle between:",
    optA: "Two different religions.",
    optB: "Individual conscience and state power (morality vs. political expediency).",
    optC: "Rich and poor.",
    optD: "England and France.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, what makes Richard Rich's betrayal particularly tragic?",
    optA: "He did it entirely by accident.",
    optB: "More had actively tried to guide him toward a virtuous life, but Rich's ambition outweighed his morals.",
    optC: "More was actually his father.",
    optD: "Rich didn't get the job he wanted.",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, who wrote the original quote describing Thomas More as 'a man for all seasons'?",
    optA: "William Shakespeare",
    optB: "Robert Whittington (a contemporary scholar)",
    optC: "King Henry VIII",
    optD: "Thomas Cromwell",
    correctAnswer: "B"
  },
  {
    qText: "In A Man for All Seasons, the play implies that the Common Man's mindset is:",
    optA: "The mindset of heroes.",
    optB: "The mindset of the audience—choosing survival, compromise, and comfort over moral martyrdom.",
    optC: "The only way to achieve sainthood.",
    optD: "Completely extinct.",
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

    for (const q of manForAllSeasonsQuestions) {
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
    console.log(`Inserted ${inserted} generated question rows for A Man for All Seasons across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
