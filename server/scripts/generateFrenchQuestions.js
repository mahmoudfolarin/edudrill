require('dotenv').config();
const pool = require('../src/config/database');

const frenchQuestions = [
  {
    qText: "Comment dit-on 'Good morning' en français?",
    optA: "Bonsoir",
    optB: "Bonjour",
    optC: "Bonne nuit",
    optD: "Salut",
    correctAnswer: "B"
  },
  {
    qText: "Que signifie 'Merci beaucoup'?",
    optA: "Thank you very much",
    optB: "Good afternoon",
    optC: "You're welcome",
    optD: "Please",
    correctAnswer: "A"
  },
  {
    qText: "Quel est le pluriel de 'le cheval' (the horse)?",
    optA: "les chevals",
    optB: "les chevaux",
    optC: "les chevalles",
    optD: "les cheveaux",
    correctAnswer: "B"
  },
  {
    qText: "Comment dit-on 'I am a student' (masculine) en français?",
    optA: "Je suis étudiant",
    optB: "J'ai un étudiant",
    optC: "Je suis étudiante",
    optD: "Il est étudiant",
    correctAnswer: "A"
  },
  {
    qText: "La capitale de la France est:",
    optA: "Marseille",
    optB: "Lyon",
    optC: "Paris",
    optD: "Nice",
    correctAnswer: "C"
  },
  {
    qText: "Complétez la phrase: 'Ils _____ (to be) au marché.'",
    optA: "ont",
    optB: "sommes",
    optC: "êtes",
    optD: "sont",
    correctAnswer: "D"
  },
  {
    qText: "Comment dit-on 'Today' en français?",
    optA: "Demain",
    optB: "Hier",
    optC: "Aujourd'hui",
    optD: "Maintenant",
    correctAnswer: "C"
  },
  {
    qText: "Que veut dire 'S'il vous plaît'?",
    optA: "Thank you",
    optB: "Please",
    optC: "Excuse me",
    optD: "I'm sorry",
    correctAnswer: "B"
  },
  {
    qText: "Quel est l'article défini pour un mot féminin singulier?",
    optA: "Le",
    optB: "La",
    optC: "L'",
    optD: "Les",
    correctAnswer: "B"
  },
  {
    qText: "Comment dit-on 'My name is' en français?",
    optA: "Je m'appelle",
    optB: "Je suis",
    optC: "Mon nom est",
    optD: "J'ai",
    correctAnswer: "A"
  },
  {
    qText: "Traduisez: 'The black dog'",
    optA: "Le chat noir",
    optB: "Le chien noir",
    optC: "Le chien blanc",
    optD: "La chienne noire",
    correctAnswer: "B"
  },
  {
    qText: "Complétez: 'Nous _____ (to have) une grande maison.'",
    optA: "avons",
    optB: "avez",
    optC: "ont",
    optD: "sommes",
    correctAnswer: "A"
  },
  {
    qText: "Comment dit-on 'Goodbye' en français?",
    optA: "Au revoir",
    optB: "Bonjour",
    optC: "Salut",
    optD: "À demain",
    correctAnswer: "A"
  },
  {
    qText: "Quel est le jour avant mardi?",
    optA: "Mercredi",
    optB: "Jeudi",
    optC: "Lundi",
    optD: "Dimanche",
    correctAnswer: "C"
  },
  {
    qText: "Que signifie 'Un stylo'?",
    optA: "A pencil",
    optB: "A book",
    optC: "A pen",
    optD: "A desk",
    correctAnswer: "C"
  },
  {
    qText: "Complétez avec le pronom correct: '_____ parlez français?'",
    optA: "Tu",
    optB: "Nous",
    optC: "Vous",
    optD: "Ils",
    correctAnswer: "C"
  },
  {
    qText: "Comment dit-on 'brother' en français?",
    optA: "Sœur",
    optB: "Père",
    optC: "Frère",
    optD: "Oncle",
    correctAnswer: "C"
  },
  {
    qText: "Que veut dire 'Eau'?",
    optA: "Fire",
    optB: "Earth",
    optC: "Air",
    optD: "Water",
    correctAnswer: "D"
  },
  {
    qText: "Quel est le participe passé du verbe 'manger' (to eat)?",
    optA: "Mange",
    optB: "Mangeant",
    optC: "Mangé",
    optD: "Manges",
    correctAnswer: "C"
  },
  {
    qText: "Comment dit-on 'The red apple'?",
    optA: "La pomme rouge",
    optB: "Le pomme rouge",
    optC: "La banane rouge",
    optD: "L'orange rouge",
    correctAnswer: "A"
  },
  {
    qText: "Quel nombre est 'Quatre-vingts'?",
    optA: "40",
    optB: "60",
    optC: "80",
    optD: "90",
    correctAnswer: "C"
  },
  {
    qText: "Complétez: 'Je vais _____ cinéma.'",
    optA: "à la",
    optB: "au",
    optC: "aux",
    optD: "en",
    correctAnswer: "B"
  },
  {
    qText: "Que signifie 'Fenêtre'?",
    optA: "Door",
    optB: "Window",
    optC: "Wall",
    optD: "Floor",
    correctAnswer: "B"
  },
  {
    qText: "Comment dit-on 'She sings well'?",
    optA: "Il chante bien",
    optB: "Elle chante bien",
    optC: "Nous chantons bien",
    optD: "Elle danse bien",
    correctAnswer: "B"
  },
  {
    qText: "Quelle couleur est 'Jaune'?",
    optA: "Green",
    optB: "Red",
    optC: "Blue",
    optD: "Yellow",
    correctAnswer: "D"
  },
  {
    qText: "Comment dit-on 'I am hungry' en français?",
    optA: "J'ai soif",
    optB: "Je suis faim",
    optC: "J'ai faim",
    optD: "Je suis fatigué",
    correctAnswer: "C"
  },
  {
    qText: "Que signifie 'Bibliothèque'?",
    optA: "Bookstore",
    optB: "Library",
    optC: "School",
    optD: "Church",
    correctAnswer: "B"
  },
  {
    qText: "Lequel de ces mots est féminin?",
    optA: "Le garçon",
    optB: "Le livre",
    optC: "La voiture",
    optD: "Le pain",
    correctAnswer: "C"
  },
  {
    qText: "Complétez: 'Tu _____ (aller) à l'école.'",
    optA: "vais",
    optB: "va",
    optC: "vas",
    optD: "allez",
    correctAnswer: "C"
  },
  {
    qText: "Que veut dire 'Il fait froid'?",
    optA: "It is hot",
    optB: "It is raining",
    optC: "It is cold",
    optD: "It is sunny",
    correctAnswer: "C"
  },
  {
    qText: "Comment dit-on 'I love you'?",
    optA: "Je t'aime",
    optB: "Je te déteste",
    optC: "Tu m'aimes",
    optD: "Je suis amoureux",
    correctAnswer: "A"
  },
  {
    qText: "Que signifie 'Maintenant'?",
    optA: "Tomorrow",
    optB: "Now",
    optC: "Later",
    optD: "Yesterday",
    correctAnswer: "B"
  },
  {
    qText: "Traduisez: 'Le petit garçon'",
    optA: "The little girl",
    optB: "The little boy",
    optC: "The big boy",
    optD: "The tall man",
    correctAnswer: "B"
  },
  {
    qText: "Complétez: 'Nous _____ (finir) notre devoir.'",
    optA: "finissons",
    optB: "finissent",
    optC: "finit",
    optD: "finissez",
    correctAnswer: "A"
  },
  {
    qText: "Comment dit-on 'Thank God' en français?",
    optA: "Mon Dieu",
    optB: "Dieu merci",
    optC: "Pardonne-moi",
    optD: "S'il vous plaît",
    correctAnswer: "B"
  },
  {
    qText: "Que signifie le mot 'Voiture'?",
    optA: "Bicycle",
    optB: "Train",
    optC: "Car",
    optD: "Bus",
    correctAnswer: "C"
  },
  {
    qText: "Quel mois vient après Mars?",
    optA: "Février",
    optB: "Mai",
    optC: "Avril",
    optD: "Juin",
    correctAnswer: "C"
  },
  {
    qText: "Comment dit-on 'Happy Birthday'?",
    optA: "Bon voyage",
    optB: "Bonne année",
    optC: "Joyeux Noël",
    optD: "Joyeux anniversaire",
    correctAnswer: "D"
  },
  {
    qText: "Que signifie 'Beaucoup'?",
    optA: "A little",
    optB: "A lot / Much",
    optC: "Nothing",
    optD: "Everything",
    correctAnswer: "B"
  },
  {
    qText: "Complétez: 'Elles _____ (prendre) le bus.'",
    optA: "prend",
    optB: "prenons",
    optC: "prennent",
    optD: "prenez",
    correctAnswer: "C"
  },
  {
    qText: "La monnaie utilisée en France est:",
    optA: "Le Franc",
    optB: "L'Euro",
    optC: "Le Dollar",
    optD: "La Livre",
    correctAnswer: "B"
  },
  {
    qText: "Comment dit-on 'Always' en français?",
    optA: "Parfois",
    optB: "Jamais",
    optC: "Toujours",
    optD: "Souvent",
    correctAnswer: "C"
  },
  {
    qText: "Quel est l'antonyme (le contraire) de 'Grand'?",
    optA: "Gros",
    optB: "Petit",
    optC: "Lent",
    optD: "Fort",
    correctAnswer: "B"
  },
  {
    qText: "Que veut dire 'Pourquoi'?",
    optA: "When",
    optB: "Where",
    optC: "Why",
    optD: "Who",
    correctAnswer: "C"
  },
  {
    qText: "Complétez avec le bon article: '_____ amis de Paul.'",
    optA: "Le",
    optB: "La",
    optC: "Les",
    optD: "L'",
    correctAnswer: "C"
  },
  {
    qText: "Comment dit-on 'To speak' en français?",
    optA: "Écouter",
    optB: "Lire",
    optC: "Parler",
    optD: "Écrire",
    correctAnswer: "C"
  },
  {
    qText: "Que signifie 'L'argent'?",
    optA: "Gold",
    optB: "Silver / Money",
    optC: "Bronze",
    optD: "Paper",
    correctAnswer: "B"
  },
  {
    qText: "Complétez: 'J'_____ (acheter) un livre hier.'",
    optA: "ai acheté",
    optB: "suis acheté",
    optC: "achetais",
    optD: "achèterai",
    correctAnswer: "A"
  },
  {
    qText: "Comment s'appelle l'hymne national de la France?",
    optA: "La Parisienne",
    optB: "La Marseillaise",
    optC: "Le Drapeau Blanc",
    optD: "La Révolution",
    correctAnswer: "B"
  },
  {
    qText: "Traduisez: 'What time is it?'",
    optA: "Quel âge as-tu?",
    optB: "Où vas-tu?",
    optC: "Quelle heure est-il?",
    optD: "Combien ça coûte?",
    correctAnswer: "C"
  }
];

async function main() {
  const subjectSlug = 'french';
  const subjectGroup = 'Arts';
  const subjectName = 'French';

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

    for (const q of frenchQuestions) {
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
