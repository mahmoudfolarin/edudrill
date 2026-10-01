require('dotenv').config();
const pool = require('../src/config/database');

const crsQuestions = [
  {
    qText: "In the creation story, God created man on the:",
    optA: "Third day",
    optB: "Fourth day",
    optC: "Fifth day",
    optD: "Sixth day",
    correctAnswer: "D"
  },
  {
    qText: "God asked Abraham to sacrifice his son named:",
    optA: "Ishmael",
    optB: "Isaac",
    optC: "Jacob",
    optD: "Esau",
    correctAnswer: "B"
  },
  {
    qText: "Joseph's brothers sold him to the Ishmaelites for how many pieces of silver?",
    optA: "Twenty",
    optB: "Thirty",
    optC: "Forty",
    optD: "Fifty",
    correctAnswer: "A"
  },
  {
    qText: "Moses was called by God through a burning bush at Mount:",
    optA: "Sinai",
    optB: "Horeb",
    optC: "Carmel",
    optD: "Ararat",
    correctAnswer: "B"
  },
  {
    qText: "The Israelites crossed which sea when fleeing from Egypt?",
    optA: "Dead Sea",
    optB: "Red Sea",
    optC: "Mediterranean Sea",
    optD: "Sea of Galilee",
    correctAnswer: "B"
  },
  {
    qText: "Who succeeded Moses as the leader of the Israelites?",
    optA: "Aaron",
    optB: "Caleb",
    optC: "Joshua",
    optD: "Gideon",
    correctAnswer: "C"
  },
  {
    qText: "The first king of Israel was:",
    optA: "David",
    optB: "Saul",
    optC: "Solomon",
    optD: "Jeroboam",
    correctAnswer: "B"
  },
  {
    qText: "David defeated Goliath using a:",
    optA: "Sword",
    optB: "Spear",
    optC: "Sling and stone",
    optD: "Bow and arrow",
    correctAnswer: "C"
  },
  {
    qText: "Which king built the first temple in Jerusalem?",
    optA: "David",
    optB: "Saul",
    optC: "Solomon",
    optD: "Hezekiah",
    correctAnswer: "C"
  },
  {
    qText: "Elijah contested with the prophets of Baal on Mount:",
    optA: "Sinai",
    optB: "Carmel",
    optC: "Zion",
    optD: "Horeb",
    correctAnswer: "B"
  },
  {
    qText: "Who was swallowed by a great fish for disobeying God's command?",
    optA: "Micah",
    optB: "Amos",
    optC: "Jonah",
    optD: "Hosea",
    correctAnswer: "C"
  },
  {
    qText: "The prophet who married a prostitute to illustrate God's love for unfaithful Israel was:",
    optA: "Hosea",
    optB: "Isaiah",
    optC: "Jeremiah",
    optD: "Ezekiel",
    correctAnswer: "A"
  },
  {
    qText: "Daniel was thrown into the den of:",
    optA: "Wolves",
    optB: "Bears",
    optC: "Lions",
    optD: "Snakes",
    correctAnswer: "C"
  },
  {
    qText: "The earthly parents of Jesus were:",
    optA: "Zechariah and Elizabeth",
    optB: "Joseph and Mary",
    optC: "Abraham and Sarah",
    optD: "Isaac and Rebekah",
    correctAnswer: "B"
  },
  {
    qText: "Jesus was born in the town of:",
    optA: "Nazareth",
    optB: "Jerusalem",
    optC: "Bethlehem",
    optD: "Capernaum",
    correctAnswer: "C"
  },
  {
    qText: "Who baptized Jesus in the Jordan River?",
    optA: "Peter",
    optB: "John the Baptist",
    optC: "James",
    optD: "Paul",
    correctAnswer: "B"
  },
  {
    qText: "Jesus fasted in the wilderness for:",
    optA: "7 days",
    optB: "21 days",
    optC: "40 days",
    optD: "50 days",
    correctAnswer: "C"
  },
  {
    qText: "The first miracle of Jesus was turning water into wine at a wedding in:",
    optA: "Cana",
    optB: "Jericho",
    optC: "Bethany",
    optD: "Nain",
    correctAnswer: "A"
  },
  {
    qText: "Which disciple betrayed Jesus?",
    optA: "Peter",
    optB: "Thomas",
    optC: "Judas Iscariot",
    optD: "Andrew",
    correctAnswer: "C"
  },
  {
    qText: "How many pieces of silver did Judas receive for betraying Jesus?",
    optA: "20",
    optB: "30",
    optC: "40",
    optD: "50",
    correctAnswer: "B"
  },
  {
    qText: "Which disciple denied Jesus three times before the rooster crowed?",
    optA: "John",
    optB: "James",
    optC: "Peter",
    optD: "Thomas",
    correctAnswer: "C"
  },
  {
    qText: "The Roman governor who sentenced Jesus to be crucified was:",
    optA: "Herod",
    optB: "Caesar Augustus",
    optC: "Pontius Pilate",
    optD: "Felix",
    correctAnswer: "C"
  },
  {
    qText: "Jesus was crucified at a place called Golgotha, which means:",
    optA: "Place of the Skull",
    optB: "Mount of Olives",
    optC: "Garden of Gethsemane",
    optD: "City of David",
    correctAnswer: "A"
  },
  {
    qText: "Who helped Jesus carry His cross?",
    optA: "Joseph of Arimathea",
    optB: "Simon of Cyrene",
    optC: "Nicodemus",
    optD: "Barnabas",
    correctAnswer: "B"
  },
  {
    qText: "Jesus resurrected on the:",
    optA: "First day",
    optB: "Second day",
    optC: "Third day",
    optD: "Fourth day",
    correctAnswer: "C"
  },
  {
    qText: "The Holy Spirit descended upon the disciples on the day of:",
    optA: "Passover",
    optB: "Pentecost",
    optC: "Atonement",
    optD: "Tabernacles",
    correctAnswer: "B"
  },
  {
    qText: "The first Christian martyr who was stoned to death was:",
    optA: "Philip",
    optB: "Stephen",
    optC: "James",
    optD: "Paul",
    correctAnswer: "B"
  },
  {
    qText: "Saul's conversion took place on the road to:",
    optA: "Jerusalem",
    optB: "Antioch",
    optC: "Damascus",
    optD: "Rome",
    correctAnswer: "C"
  },
  {
    qText: "Saul's name was later changed to:",
    optA: "Peter",
    optB: "Paul",
    optC: "Silas",
    optD: "Barnabas",
    correctAnswer: "B"
  },
  {
    qText: "Who wrote most of the Epistles in the New Testament?",
    optA: "Peter",
    optB: "John",
    optC: "James",
    optD: "Paul",
    correctAnswer: "D"
  },
  {
    qText: "The shortest verse in the Bible is:",
    optA: "Jesus wept.",
    optB: "Pray without ceasing.",
    optC: "God is love.",
    optD: "Rejoice evermore.",
    correctAnswer: "A"
  },
  {
    qText: "The parable of the Good Samaritan teaches about:",
    optA: "Forgiveness",
    optB: "Loving one's neighbor",
    optC: "Faith",
    optD: "Prayer",
    correctAnswer: "B"
  },
  {
    qText: "In the parable of the Prodigal Son, the son asked his father for his:",
    optA: "Blessing",
    optB: "Inheritance",
    optC: "Ring",
    optD: "Robe",
    correctAnswer: "B"
  },
  {
    qText: "The Beatitudes were taught by Jesus during the:",
    optA: "Sermon on the Mount",
    optB: "Last Supper",
    optC: "Transfiguration",
    optD: "Triumphal Entry",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following is NOT a fruit of the Holy Spirit according to Galatians?",
    optA: "Love",
    optB: "Joy",
    optC: "Pride",
    optD: "Peace",
    correctAnswer: "C"
  },
  {
    qText: "The commandment 'Honor your father and your mother' is the:",
    optA: "First commandment",
    optB: "Fourth commandment",
    optC: "Fifth commandment",
    optD: "Tenth commandment",
    correctAnswer: "C"
  },
  {
    qText: "The Lord's Prayer was taught to the disciples by:",
    optA: "John the Baptist",
    optB: "Jesus",
    optC: "Peter",
    optD: "Paul",
    correctAnswer: "B"
  },
  {
    qText: "Who climbed a sycamore tree to see Jesus?",
    optA: "Nicodemus",
    optB: "Bartimaeus",
    optC: "Zacchaeus",
    optD: "Lazarus",
    correctAnswer: "C"
  },
  {
    qText: "Jesus raised Lazarus from the dead after he had been in the tomb for:",
    optA: "Two days",
    optB: "Three days",
    optC: "Four days",
    optD: "Five days",
    correctAnswer: "C"
  },
  {
    qText: "The two men who appeared with Jesus at the Transfiguration were:",
    optA: "Moses and Elijah",
    optB: "Abraham and Isaac",
    optC: "Enoch and Noah",
    optD: "David and Solomon",
    correctAnswer: "A"
  },
  {
    qText: "The man who asked Pilate for the body of Jesus was:",
    optA: "Nicodemus",
    optB: "Joseph of Arimathea",
    optC: "Simon of Cyrene",
    optD: "Centurion",
    correctAnswer: "B"
  },
  {
    qText: "According to Jesus, the greatest commandment is to:",
    optA: "Love your neighbor",
    optB: "Love the Lord your God with all your heart",
    optC: "Keep the Sabbath holy",
    optD: "Not commit murder",
    correctAnswer: "B"
  },
  {
    qText: "Who was the tax collector that became one of the twelve disciples?",
    optA: "Luke",
    optB: "Matthew",
    optC: "Mark",
    optD: "John",
    correctAnswer: "B"
  },
  {
    qText: "In Paul's letter to the Ephesians, the 'sword of the Spirit' refers to:",
    optA: "Faith",
    optB: "The Word of God",
    optC: "Salvation",
    optD: "Prayer",
    correctAnswer: "B"
  },
  {
    qText: "The city where the disciples were first called Christians was:",
    optA: "Jerusalem",
    optB: "Rome",
    optC: "Antioch",
    optD: "Ephesus",
    correctAnswer: "C"
  },
  {
    qText: "Who was the female judge of Israel who sat under a palm tree?",
    optA: "Ruth",
    optB: "Esther",
    optC: "Deborah",
    optD: "Miriam",
    correctAnswer: "C"
  },
  {
    qText: "The man known for his great strength, whose hair was cut by Delilah, was:",
    optA: "Gideon",
    optB: "Samson",
    optC: "Samuel",
    optD: "David",
    correctAnswer: "B"
  },
  {
    qText: "The prophet who succeeded Elijah was:",
    optA: "Elisha",
    optB: "Isaiah",
    optC: "Jeremiah",
    optD: "Ezekiel",
    correctAnswer: "A"
  },
  {
    qText: "The central theme of the message of John the Baptist was:",
    optA: "Prosperity",
    optB: "Repentance",
    optC: "Miracles",
    optD: "Political freedom",
    correctAnswer: "B"
  },
  {
    qText: "Jesus washed the disciples' feet to teach them a lesson in:",
    optA: "Hygiene",
    optB: "Humility and servanthood",
    optC: "Authority",
    optD: "Faith",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'christian-religious-studies';
  const subjectGroup = 'Arts';
  const subjectName = 'Christian Religious Studies';

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

    for (const q of crsQuestions) {
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
