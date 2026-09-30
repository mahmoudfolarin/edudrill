require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'french', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'French Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 Term 1
    { title: 'L’importance du français au Nigeria', description: 'Importance of French in Nigeria.', order: 1, subtopics: ['Importance of French in Nigeria', 'Benefits of learning French', 'Nigeria’s Francophone neighbours', 'French as a language of communication', 'French in ECOWAS and international relations'] },
    { title: 'Les pays francophones et anglophones', description: 'Francophone and Anglophone countries.', order: 2, subtopics: ['Francophone countries in Africa', 'Nationalities and languages', 'Anglophone countries in Africa', 'Map and cultural awareness', 'Countries bordering Nigeria'] },
    { title: 'Salutations et présentations', description: 'Greetings and introductions.', order: 3, subtopics: ['Greetings and polite expressions', 'Names, age, nationality and origin', 'Introducing oneself', 'Simple classroom dialogues', 'Introducing another person'] },
    { title: 'L’alphabet, la prononciation et les accents', description: 'Alphabet, pronunciation and accents.', order: 4, subtopics: ['French alphabet', 'Accents: aigu, grave, circonflexe', 'Vowels and consonants', 'Spelling and dictation', 'French pronunciation', 'Punctuation'] },
    { title: 'Grammaire de base', description: 'Basic grammar.', order: 5, subtopics: ['Nouns and gender', 'Basic sentence structure', 'Definite and indefinite articles', 'Singular and plural', 'Subject pronouns', 'Negation'] },
    { title: 'Être et avoir', description: 'To be and to have.', order: 6, subtopics: ['Conjugation of être', 'Affirmative and negative sentences', 'Conjugation of avoir', 'Questions and answers', 'Uses of être and avoir'] },
    { title: 'Les professions et métiers', description: 'Professions and trades.', order: 7, subtopics: ['Names of professions', 'Workplace vocabulary', 'Asking and answering about occupations', 'Short descriptions', 'Masculine and feminine forms'] },
    { title: 'L’environnement immédiat', description: 'Immediate environment.', order: 8, subtopics: ['Home and family', 'Classroom objects', 'Rooms and household objects', 'Describing surroundings', 'School environment'] },
    { title: 'La vie quotidienne', description: 'Daily life.', order: 9, subtopics: ['Daily routines', 'Common daily verbs', 'Days of the week', 'Talking about habitual activities', 'Time expressions'] },
    { title: 'Les goûts et les préférences', description: 'Tastes and preferences.', order: 10, subtopics: ['J’aime / Je n’aime pas', 'Food and leisure preferences', 'Preferences', 'Short conversations', 'Agreeing and disagreeing'] },
    { title: 'Révision et évaluation (SSS 1 Term 1)', description: 'Revision and evaluation.', order: 11, subtopics: ['Vocabulary revision', 'Oral practice', 'Grammar exercises', 'Writing practice', 'Reading comprehension', 'End-of-term assessment'] },
    // SSS 1 Term 2
    { title: 'La famille', description: 'The family.', order: 12, subtopics: ['Family members', 'Describing family', 'Family relationships', 'Family activities', 'Possessive adjectives'] },
    { title: 'Le corps humain et la santé', description: 'Human body and health.', order: 13, subtopics: ['Parts of the body', 'Healthy habits', 'Common health vocabulary', 'Giving simple advice', 'At the doctor'] },
    { title: 'Les vêtements et les couleurs', description: 'Clothes and colors.', order: 14, subtopics: ['Clothing vocabulary', 'Agreement of adjectives', 'Colours', 'Shopping dialogues', 'Describing what someone wears'] },
    { title: 'La nourriture et les boissons', description: 'Food and drinks.', order: 15, subtopics: ['Food and drinks', 'Expressing likes and dislikes', 'Meals', 'Quantity expressions', 'Ordering at a restaurant'] },
    { title: 'Les nombres, dates et l’heure', description: 'Numbers, dates and time.', order: 16, subtopics: ['Numbers', 'Telling and asking the time', 'Days and months', 'Schedules', 'Dates'] },
    { title: 'Les adjectifs qualificatifs', description: 'Qualifying adjectives.', order: 17, subtopics: ['Common adjectives', 'Position of adjectives', 'Masculine and feminine agreement', 'Descriptions', 'Singular and plural agreement'] },
    { title: 'Le présent de l’indicatif', description: 'Present indicative.', order: 18, subtopics: ['Regular -er verbs', 'Irregular high-frequency verbs', 'Common -ir verbs', 'Negative and interrogative forms', 'Common -re verbs'] },
    { title: 'Les transports et les directions (I)', description: 'Transport and directions.', order: 19, subtopics: ['Means of transport', 'Places in town', 'Asking for directions', 'Prepositions of place', 'Giving directions'] },
    { title: 'La ville et les services', description: 'City and services.', order: 20, subtopics: ['Town vocabulary', 'School and hospital', 'Shops and public services', 'Simple transactions', 'Post office and bank'] },
    { title: 'Expression écrite et orale', description: 'Written and oral expression.', order: 21, subtopics: ['Dialogue writing', 'Role play', 'Short descriptions', 'Guided composition', 'Question-and-answer practice'] },
    { title: 'Révision et examen (SSS 1 Term 2)', description: 'Revision and exam.', order: 22, subtopics: ['Comprehensive revision', 'Oral assessment', 'Reading and comprehension', 'End-of-term examination', 'Grammar and vocabulary'] },
    // SSS 1 Term 3
    { title: 'Le temps et les saisons', description: 'Weather and seasons.', order: 23, subtopics: ['Weather expressions', 'Climate vocabulary', 'Seasons', 'Weather conversations', 'Describing weather'] },
    { title: 'Les loisirs et les activités', description: 'Leisure and activities.', order: 24, subtopics: ['Sports', 'Hobbies', 'Games', 'Frequency expressions', 'Music and entertainment'] },
    { title: 'Les invitations et les réactions', description: 'Invitations and reactions.', order: 25, subtopics: ['Inviting someone', 'Expressing appreciation', 'Accepting invitations', 'Expressing opinions', 'Refusing politely'] },
    { title: 'L’interdiction, l’autorisation et le conseil', description: 'Prohibition, permission, advice.', order: 26, subtopics: ['Commands', 'Advice', 'Prohibition', 'Imperative forms', 'Permission'] },
    { title: 'Les déplacements et le voyage', description: 'Travel and trips.', order: 27, subtopics: ['Travel vocabulary', 'At the station/airport', 'Transport', 'Travel conversations', 'Tickets and reservations'] },
    { title: 'Le passé composé', description: 'Past tense.', order: 28, subtopics: ['Formation with avoir', 'Negation', 'Formation with être', 'Using the tense in simple narratives', 'Past participles'] },
    { title: 'L’imparfait', description: 'Imperfect tense.', order: 29, subtopics: ['Formation', 'Descriptions in the past', 'Uses', 'Contrast with passé composé', 'Habitual past actions'] },
    { title: 'Le futur proche', description: 'Near future.', order: 30, subtopics: ['Aller + infinitive', 'Predictions', 'Future plans', 'Dialogue practice', 'Intentions'] },
    { title: 'Les sentiments et les émotions', description: 'Feelings and emotions.', order: 31, subtopics: ['Expressing feelings', 'Apologies', 'Reasons for emotions', 'Simple reactions', 'Regret'] },
    { title: 'Lecture, compréhension et rédaction', description: 'Reading, comprehension, writing.', order: 32, subtopics: ['Short texts', 'Vocabulary in context', 'Comprehension questions', 'Oral reading', 'Guided writing'] },
    { title: 'Révision et examen (SSS 1 Term 3)', description: 'Revision and exam.', order: 33, subtopics: ['Term review', 'Written practice', 'Grammar revision', 'End-of-term examination', 'Oral practice'] },
    // SSS 2 Term 1
    { title: 'Révision de SSS1 et expression orale', description: 'Revision and oral expression.', order: 34, subtopics: ['Review of basic structures', 'Conversation practice', 'Listening comprehension', 'Oral questions', 'Reading aloud'] },
    { title: 'Situer une action passée et récente', description: 'Locating past actions.', order: 35, subtopics: ['Venir de + infinitive', 'Time markers', 'Recent past actions', 'Question and answer practice'] },
    { title: 'Les temps verbaux', description: 'Verb tenses.', order: 36, subtopics: ['Present tense review', 'Futur simple/proche', 'Passé composé', 'Choosing the appropriate tense', 'Imparfait'] },
    { title: 'Exprimer la simultanéité', description: 'Expressing simultaneity.', order: 37, subtopics: ['Pendant que', 'En + participe présent', 'Quand', 'Narrative practice', 'Lorsque'] },
    { title: 'Situer une action dans le temps', description: 'Locating actions in time.', order: 38, subtopics: ['Avant', 'Depuis', 'Après', 'Il y a', 'Pendant', 'Dans'] },
    { title: 'Le discours rapporté', description: 'Reported speech.', order: 39, subtopics: ['Reporting statements', 'Reporting commands', 'Reporting questions', 'Changes in pronouns and time expressions'] },
    { title: 'Les adverbes de temps et de fréquence', description: 'Adverbs of time and frequency.', order: 40, subtopics: ['Aujourd’hui', 'Souvent', 'Hier', 'Parfois', 'Demain', 'Toujours and jamais'] },
    { title: 'Le téléphone et la recherche d’informations', description: 'Telephone and information.', order: 41, subtopics: ['Making a phone call', 'Giving information', 'Asking for information', 'Telephone etiquette', 'Taking messages'] },
    { title: 'Raconter un événement', description: 'Recounting an event.', order: 42, subtopics: ['Narrative sequence', 'Describing events', 'Past tenses', 'Short composition', 'Connectors'] },
    { title: 'Compréhension orale et écrite (SSS 2 Term 1)', description: 'Oral and written comprehension.', order: 43, subtopics: ['Listening activities', 'Inference from context', 'Reading passages', 'Vocabulary development'] },
    { title: 'Révision et examen (SSS 2 Term 1)', description: 'Revision and exam.', order: 44, subtopics: ['Grammar', 'Composition', 'Vocabulary', 'End-of-term assessment', 'Oral communication'] },
    // SSS 2 Term 2
    { title: 'L’école et l’éducation', description: 'School and education.', order: 45, subtopics: ['School subjects', 'Educational goals', 'School facilities', 'Giving opinions', 'School routines'] },
    { title: 'La maison et la vie familiale', description: 'Home and family life.', order: 46, subtopics: ['Housing', 'Describing a home', 'Household responsibilities', 'Family routines', 'Family relationships'] },
    { title: 'Le marché et les achats', description: 'Market and shopping.', order: 47, subtopics: ['Shops and products', 'Polite requests', 'Prices and quantities', 'Consumer vocabulary', 'Buying and selling'] },
    { title: 'La santé et l’hygiène', description: 'Health and hygiene.', order: 48, subtopics: ['Health problems', 'Advice and recommendations', 'At the pharmacy/clinic', 'Body and health vocabulary', 'Healthy living'] },
    { title: 'Les pronoms personnels', description: 'Personal pronouns.', order: 49, subtopics: ['Subject pronouns', 'Placement with verbs', 'Direct object pronouns', 'Pronoun practice', 'Indirect object pronouns'] },
    { title: 'Les pronoms réfléchis', description: 'Reflexive pronouns.', order: 50, subtopics: ['Reflexive verbs', 'Negation', 'Daily routines', 'Question forms', 'Reflexive pronouns'] },
    { title: 'Les pronoms relatifs', description: 'Relative pronouns.', order: 51, subtopics: ['Qui', 'Dont', 'Que', 'Combining sentences', 'Où'] },
    { title: 'Les pronoms démonstratifs', description: 'Demonstrative pronouns.', order: 52, subtopics: ['Ce, cet, cette, ces', 'Uses and agreement', 'Celui, celle, ceux, celles', 'Sentence practice'] },
    { title: 'Les articles partitifs', description: 'Partitive articles.', order: 53, subtopics: ['Du, de la, de l’, des', 'Negative forms', 'Food and quantities', 'After quantity expressions'] },
    { title: 'Expression écrite: lettre et message', description: 'Written expression.', order: 54, subtopics: ['Informal letters', 'Invitations', 'Formal letters', 'Requests and responses', 'Emails/messages'] },
    { title: 'Révision et examen (SSS 2 Term 2)', description: 'Revision and exam.', order: 55, subtopics: ['Comprehensive review', 'Comprehension', 'Oral and written practice', 'End-of-term examination'] },
    // SSS 2 Term 3
    { title: 'La culture et les traditions', description: 'Culture and traditions.', order: 56, subtopics: ['French-speaking cultures', 'Food and customs', 'Nigerian and Francophone cultural links', 'Respect for cultural diversity', 'Festivals'] },
    { title: 'Les voyages et le tourisme', description: 'Travel and tourism.', order: 57, subtopics: ['Tourist attractions', 'Itineraries', 'Travel plans', 'Tourist information', 'Accommodation'] },
    { title: 'Exprimer l’appréciation et l’approbation', description: 'Expressing appreciation.', order: 58, subtopics: ['Expressing appreciation', 'Reactions', 'Approval and disapproval', 'Adjectives and exclamations'] },
    { title: 'Exprimer l’opinion', description: 'Expressing opinion.', order: 59, subtopics: ['Giving opinions', 'Justifying an opinion', 'Agreement and disagreement', 'Polite debate expressions'] },
    { title: 'La comparaison', description: 'Comparison.', order: 60, subtopics: ['Comparative forms', 'Comparing people and things', 'Superlative forms', 'Preference statements'] },
    { title: 'La cause et la conséquence', description: 'Cause and consequence.', order: 61, subtopics: ['Parce que', 'Donc', 'Car', 'Alors', 'Puisque', 'Consequences in writing'] },
    { title: 'La condition', description: 'Condition.', order: 62, subtopics: ['Si clauses', 'Advice and hypothetical situations', 'Possible conditions', 'Sentence practice'] },
    { title: 'La description et le récit', description: 'Description and narrative.', order: 63, subtopics: ['People and places', 'Narrative connectors', 'Events', 'Paragraph organisation'] },
    { title: 'Lecture et littérature française/francophone', description: 'Literature.', order: 64, subtopics: ['Short literary texts', 'Vocabulary in context', 'Themes and characters', 'Cultural interpretation'] },
    { title: 'Traduction et médiation linguistique', description: 'Translation.', order: 65, subtopics: ['Simple French-English translation', 'Common translation difficulties', 'Meaning in context', 'Short bilingual tasks'] },
    { title: 'Révision et examen (SSS 2 Term 3)', description: 'Revision and exam.', order: 66, subtopics: ['Grammar revision', 'Oral and composition practice', 'Vocabulary', 'End-of-term examination', 'Comprehension'] },
    // SSS 3 Term 1
    { title: 'Révision générale et communication', description: 'General review and communication.', order: 67, subtopics: ['Review of SSS1–SSS2 grammar', 'Listening practice', 'Conversation', 'Writing fluency', 'Reading comprehension'] },
    { title: 'Les pronoms et leur emploi', description: 'Pronouns and their use.', order: 68, subtopics: ['Direct object pronouns', 'Relative pronouns', 'Indirect object pronouns', 'Demonstrative pronouns', 'Reflexive pronouns'] },
    { title: 'L’objet direct et l’objet indirect', description: 'Direct and indirect objects.', order: 69, subtopics: ['Identifying direct objects', 'Agreement and placement', 'Identifying indirect objects', 'Practice sentences', 'Pronoun replacement'] },
    { title: 'Les pronoms relatifs et démonstratifs (SSS 3)', description: 'Relative and demonstrative pronouns.', order: 70, subtopics: ['Qui', 'Où', 'Que', 'Ce qui/ce que', 'Dont', 'Demonstrative pronouns'] },
    { title: 'Les articles et déterminants', description: 'Articles and determiners.', order: 71, subtopics: ['Definite articles', 'Possessive adjectives', 'Indefinite articles', 'Demonstrative adjectives', 'Partitive articles'] },
    { title: 'La grammaire et la conjugaison', description: 'Grammar and conjugation.', order: 72, subtopics: ['Present', 'Future', 'Passé composé', 'Conditional introduction', 'Imparfait', 'Irregular verbs'] },
    { title: 'Les adjectifs et les antonymes', description: 'Adjectives and antonyms.', order: 73, subtopics: ['Adjective agreement', 'Comparatives', 'Common descriptive adjectives', 'Superlatives', 'Antonyms'] },
    { title: 'La rédaction: lettre et composition', description: 'Writing.', order: 74, subtopics: ['Formal letters', 'Descriptive writing', 'Informal letters', 'Argumentative/guided writing', 'Narrative writing'] },
    { title: 'Vocabulaire et structures de la langue', description: 'Vocabulary and structures.', order: 75, subtopics: ['Synonyms and antonyms', 'Contextual vocabulary', 'Connectors', 'Sentence transformation', 'Idiomatic expressions'] },
    { title: 'Compréhension orale et écrite (SSS 3 Term 1)', description: 'Comprehension.', order: 76, subtopics: ['Listening passages', 'Inference', 'Reading passages', 'Vocabulary in context', 'Question types'] },
    { title: 'Révision et examen (SSS 3 Term 1)', description: 'Revision and exam.', order: 77, subtopics: ['Past-question practice', 'Oral examination', 'Grammar', 'Term assessment', 'Composition'] },
    // SSS 3 Term 2
    { title: 'Le Nigeria et le monde francophone', description: 'Nigeria and Francophonie.', order: 78, subtopics: ['Nigeria in West Africa', 'Cultural links', 'Neighbouring Francophone countries', 'National description', 'ECOWAS and regional communication'] },
    { title: 'La société et la vie moderne', description: 'Society and modern life.', order: 79, subtopics: ['Family and society', 'Communication', 'Education', 'Social responsibilities', 'Technology'] },
    { title: 'La santé, l’environnement et le bien-être', description: 'Health and environment.', order: 80, subtopics: ['Healthy living', 'Climate and conservation', 'Environmental protection', 'Public awareness', 'Pollution'] },
    { title: 'Les médias et la communication', description: 'Media and communication.', order: 81, subtopics: ['Newspapers', 'News vocabulary', 'Radio and television', 'Responsible communication', 'Internet communication'] },
    { title: 'Le travail et les professions', description: 'Work and professions.', order: 82, subtopics: ['Jobs and careers', 'Professional communication', 'Workplace vocabulary', 'Future plans', 'Applications and interviews'] },
    { title: 'Les voyages, le tourisme et l’hôtellerie', description: 'Travel and tourism.', order: 83, subtopics: ['Reservations', 'Tourist information', 'Hotels', 'Travel problems and solutions', 'Travel documents'] },
    { title: 'Le discours direct et indirect', description: 'Direct and indirect speech.', order: 84, subtopics: ['Direct speech', 'Tense changes', 'Indirect speech', 'Reported questions and commands', 'Pronoun changes'] },
    { title: 'La voix active et passive', description: 'Active and passive voice.', order: 85, subtopics: ['Active voice', 'Use in formal writing', 'Passive voice', 'Transformation exercises', 'Formation'] },
    { title: 'La condition et le souhait', description: 'Condition and wish.', order: 86, subtopics: ['Si constructions', 'Advice', 'Conditional forms', 'Hypothetical situations', 'Expressing wishes'] },
    { title: 'Littérature francophone et textes', description: 'Francophone literature.', order: 87, subtopics: ['Short prose and poetry', 'Cultural context', 'Francophone writers and themes', 'Personal response', 'Reading analysis'] },
    { title: 'Révision et examen (SSS 3 Term 2)', description: 'Revision and exam.', order: 88, subtopics: ['Comprehensive revision', 'Oral and written assessment', 'WAEC/NECO-style practice', 'Mock examination'] },
    // SSS 3 Term 3
    { title: 'Révision finale de la grammaire', description: 'Final grammar review.', order: 89, subtopics: ['Nouns and articles', 'Verb tenses', 'Pronouns', 'Prepositions and conjunctions', 'Adjectives'] },
    { title: 'Révision finale du vocabulaire', description: 'Final vocabulary review.', order: 90, subtopics: ['Family', 'Travel', 'School', 'Work', 'Health', 'Society and culture'] },
    { title: 'Compréhension de lecture', description: 'Reading comprehension review.', order: 91, subtopics: ['Passage analysis', 'Inference', 'Main ideas', 'Vocabulary in context', 'Specific information'] },
    { title: 'Compréhension orale (SSS 3 Term 3)', description: 'Oral comprehension review.', order: 92, subtopics: ['Listening for gist', 'Answering oral questions', 'Listening for details', 'Note-taking', 'Following instructions'] },
    { title: 'Expression écrite', description: 'Written expression review.', order: 93, subtopics: ['Letter writing', 'Description', 'Essay/composition', 'Opinion writing', 'Narrative'] },
    { title: 'Expression orale', description: 'Oral expression review.', order: 94, subtopics: ['Conversation', 'Giving opinions', 'Role play', 'Short presentation', 'Picture/scene description'] },
    { title: 'Traduction (SSS 3 Term 3)', description: 'Translation review.', order: 95, subtopics: ['French-English translation', 'Common grammatical problems', 'English-French translation', 'Short passages', 'Contextual meaning'] },
    { title: 'Culture et civilisation francophones', description: 'Culture and civilization.', order: 96, subtopics: ['Francophone Africa', 'Nigeria-Francophone relations', 'France and Francophone institutions', 'Cultural diversity', 'Cultural practices'] },
    { title: 'Examen blanc et préparation SSCE', description: 'Mock exam and SSCE prep.', order: 97, subtopics: ['Objective practice', 'Composition', 'Grammar and vocabulary', 'Oral practice', 'Comprehension'] },
    { title: 'Révision finale et évaluation', description: 'Final revision and evaluation.', order: 98, subtopics: ['Corrections', 'Final mock assessment', 'Weak-area revision', 'Examination readiness', 'Timed practice'] }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting " + syllabus.title + " seeding...");
    
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [syllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${syllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [subjectId, syllabus.exam, syllabus.syllabus_year, syllabus.title, syllabus.description]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${syllabus.title}`);

    const examsRes = await pool.query('SELECT id FROM exams WHERE is_active = TRUE');
    for (const exam of examsRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, exam.id]
      );
    }
    console.log(`Linked Syllabus to ${examsRes.rows.length} exams.`);

    for (const topic of syllabus.topics) {
      const topicSlug = slugify(topic.title);
      const tRes = await pool.query(
        `INSERT INTO topics (syllabus_id, title, slug, description, topic_order, is_active)
         VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
        [syllabusId, topic.title, topicSlug, topic.description, topic.order]
      );
      const topicId = tRes.rows[0].id;

      let subOrder = 1;
      for (const subStr of topic.subtopics) {
        const subSlug = slugify(subStr) + '-' + Math.floor(Math.random() * 100000);
        const subRes = await pool.query(
          `INSERT INTO subtopics (topic_id, title, slug, description, subtopic_order, is_active)
           VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
          [topicId, subStr, subSlug, 'Learn about ' + subStr, subOrder]
        );
        const subtopicId = subRes.rows[0].id;

        for (let i = 1; i <= 2; i++) {
          const lessonTitle = 'Lesson ' + i + ': ' + subStr;
          const lessonSlug = slugify(lessonTitle) + '-' + Math.floor(Math.random() * 100000);
          const lessonContent = '<div class="lesson-intro"><h2>Welcome to ' + lessonTitle + '</h2><p>This is a comprehensive study module covering the concepts of <strong>' + subStr + '</strong> within the topic of ' + topic.title + '.</p><h3>Key Principles</h3><ul><li>Understand the fundamental rules and definitions of ' + subStr + '.</li><li>Apply standard methodologies accurately.</li><li>Practice solving related problems to build confidence.</li></ul><p>Make sure to take notes as you read through this module. At the end of the topic, you can test your knowledge using the Practice feature!</p></div>';

          await pool.query(
            `INSERT INTO lessons (topic_id, subtopic_id, title, slug, content, lesson_order, is_active)
             VALUES ($1, $2, $3, $4, $5, $6, TRUE)`,
            [topicId, subtopicId, lessonTitle, lessonSlug, lessonContent, i]
          );
        }
        subOrder++;
      }
    }
    console.log(syllabus.title + " Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
