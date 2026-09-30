require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'islamic-studies', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Islamic Studies Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    { title: 'Introduction to Islamic Studies', description: 'Meaning, scope, and sources.', order: 1, subtopics: ['Meaning and scope of Islamic Studies', 'Sources of Islamic knowledge', 'Importance of Islam in daily life', 'Islam as a complete way of life', 'Branches of Islamic Studies'] },
    { title: 'Tawhid and Articles of Faith', description: 'Belief in Allah, angels, prophets, books.', order: 2, subtopics: ['Meaning of Tawhid', 'Categories of Tawhid', 'Belief in Allah', 'Belief in angels', 'Belief in revealed books', 'Belief in prophets', 'Belief in the Last Day', 'Belief in divine decree'] },
    { title: 'Qur’an: Revelation and Preservation', description: 'Revelation, compilation, Makki and Madani.', order: 3, subtopics: ['Meaning of Qur’an', 'Beginning of revelation', 'Modes of revelation', 'Compilation of the Qur’an', 'Preservation and transmission', 'Makki and Madani revelations'] },
    { title: 'Selected Qur’anic Teachings', description: 'Lessons, justice, character.', order: 4, subtopics: ['Meaning and lessons of selected passages', 'Obedience to Allah', 'Good character', 'Justice and fairness', 'Kindness to parents', 'Social responsibility'] },
    { title: 'Hadith: Meaning and Importance', description: 'Sunnah, relationship with Qur\'an.', order: 5, subtopics: ['Meaning of Hadith and Sunnah', 'Importance of Hadith', 'Sources and transmission', 'Hadith terminology', 'Relationship between Qur’an and Sunnah'] },
    { title: 'Selected Hadith', description: 'Sincerity, cleanliness, brotherhood.', order: 6, subtopics: ['Sincerity of intention', 'Cleanliness', 'Brotherhood', 'Honesty', 'Kindness', 'Seeking knowledge'] },
    { title: 'Taharah: Purification', description: 'Wudu, ghusl, tayammum.', order: 7, subtopics: ['Meaning of Taharah', 'Types of impurities', 'Wudu', 'Ghusl', 'Tayammum', 'Cleanliness and personal hygiene'] },
    { title: 'Salah: Prayer', description: 'Importance, conditions, pillars.', order: 8, subtopics: ['Importance of Salah', 'Conditions of prayer', 'Times of prayer', 'Preparation for Salah', 'Pillars of Salah', 'Things that invalidate prayer'] },
    { title: 'Fasting and Ramadan', description: 'Meaning, conditions, benefits.', order: 9, subtopics: ['Meaning of Sawm', 'Importance of Ramadan', 'Conditions of fasting', 'Acts that invalidate fasting', 'Exemptions', 'Spiritual and social benefits'] },
    { title: 'Islamic Morals', description: 'Truthfulness, patience, respect.', order: 10, subtopics: ['Truthfulness', 'Trustworthiness', 'Patience', 'Humility', 'Respect', 'Avoiding backbiting and harmful speech'] },
    { title: 'Revision and Assessment (SSS 1 Term 1)', description: 'Term review and assessment.', order: 11, subtopics: ['Term review', 'Qur’an and Hadith revision', 'Practical worship review', 'Objective and essay practice', 'Assessment'] },
    // SSS 1 Second Term
    { title: 'Seerah of Prophet Muhammad I', description: 'Arabia before Islam, early life.', order: 12, subtopics: ['Arabia before Islam', 'Birth and early life', 'Character of the Prophet', 'First revelation', 'Early preaching'] },
    { title: 'Seerah of Prophet Muhammad II', description: 'Early Muslims, persecution, Hijrah.', order: 13, subtopics: ['Early Muslims', 'Persecution', 'Migration to Abyssinia', 'Pledge of Aqabah', 'Hijrah to Madinah'] },
    { title: 'Madinah Community', description: 'Brotherhood, constitution, mosque.', order: 14, subtopics: ['Brotherhood in Madinah', 'Constitution of Madinah', 'Mosque as community centre', 'Relations with other communities', 'Social organisation'] },
    { title: 'Major Battles and Events', description: 'Badr, Uhud, Khandaq, conquest of Makkah.', order: 15, subtopics: ['Badr', 'Uhud', 'Khandaq', 'Treaty of Hudaybiyyah', 'Conquest of Makkah', 'Farewell pilgrimage'] },
    { title: 'Family Life of the Prophet', description: 'Marriage, wives, children, neighbours.', order: 16, subtopics: ['Marriage and family life', 'Treatment of wives and children', 'Treatment of neighbours', 'Care for the vulnerable', 'Lessons for Muslim families'] },
    { title: 'Islamic Law and Fiqh', description: 'Meaning of Shariah, sources.', order: 17, subtopics: ['Meaning of Shariah and Fiqh', 'Sources of Islamic law', 'Obligatory and recommended acts', 'Permissible and prohibited acts', 'Importance of lawful conduct'] },
    { title: 'Zakah', description: 'Meaning, eligible recipients, conditions.', order: 18, subtopics: ['Meaning and importance', 'Eligible recipients', 'Conditions of Zakah', 'Wealth subject to Zakah', 'Social and economic benefits'] },
    { title: 'Hajj and Umrah', description: 'Meaning, conditions, rites.', order: 19, subtopics: ['Meaning of Hajj', 'Conditions', 'Pillars and rites', 'Ihram', 'Arafah', 'Social and spiritual lessons'] },
    { title: 'Islamic Brotherhood and Community', description: 'Ummah, mutual assistance, conflict resolution.', order: 20, subtopics: ['Ummah', 'Mutual assistance', 'Rights of neighbours', 'Community service', 'Conflict resolution'] },
    { title: 'Revision and Examination (SSS 1 Term 2)', description: 'Seerah, Fiqh review.', order: 21, subtopics: ['Seerah review', 'Fiqh review', 'Worship review', 'Past-question practice', 'End-of-term examination'] },
    // SSS 1 Third Term
    { title: 'Islamic Ethics', description: 'Character, justice, mercy, forgiveness.', order: 22, subtopics: ['Good character', 'Justice', 'Mercy', 'Forgiveness', 'Courage', 'Moderation'] },
    { title: 'Rights and Responsibilities', description: 'Parents, children, neighbours, poor.', order: 23, subtopics: ['Rights of parents', 'Rights of children', 'Rights of neighbours', 'Rights of relatives', 'Rights of the poor', 'Community responsibilities'] },
    { title: 'Marriage and Family in Islam', description: 'Purpose, choice, rights, Mahr.', order: 24, subtopics: ['Purpose of marriage', 'Choice and responsibilities', 'Mahr', 'Rights and duties of spouses', 'Child upbringing'] },
    { title: 'Islamic Economic Principles', description: 'Halal earnings, trade, avoiding fraud, Riba.', order: 25, subtopics: ['Halal earnings', 'Honesty in trade', 'Prohibition of riba', 'Avoiding fraud', 'Zakah and social welfare'] },
    { title: 'Islam and Education', description: 'Importance of knowledge, seeking knowledge.', order: 26, subtopics: ['Importance of knowledge', 'Seeking knowledge', 'Teachers and learners', 'Research and reflection', 'Ethics of learning'] },
    { title: 'Islam and Peace', description: 'Meaning, justice, reconciliation.', order: 27, subtopics: ['Meaning of peace', 'Justice and reconciliation', 'Conflict resolution', 'Respect for human life', 'Living peacefully with others'] },
    { title: 'Islamic History: Rightly Guided Caliphs', description: 'Abu Bakr, Umar, Uthman, Ali.', order: 28, subtopics: ['Abu Bakr', 'Umar', 'Uthman', 'Ali', 'Leadership lessons'] },
    { title: 'Islamic Culture and Civilisation', description: 'Knowledge, science, architecture, literature.', order: 29, subtopics: ['Knowledge and scholarship', 'Science and medicine', 'Architecture', 'Literature', 'Libraries and learning'] },
    { title: 'Da\'wah and Good Conduct', description: 'Meaning, methods, personal example.', order: 30, subtopics: ['Meaning of Da\'wah', 'Methods of Da\'wah', 'Wisdom and good advice', 'Personal example', 'Community outreach'] },
    { title: 'Revision and Examination (SSS 1 Term 3)', description: 'Comprehensive review.', order: 31, subtopics: ['Comprehensive review', 'Practical worship', 'Essay practice', 'Objective practice', 'End-of-year assessment'] },
    // SSS 2 First Term
    { title: 'Revision of SSS1 Work', description: 'Tawhid, Qur\'an, Hadith.', order: 32, subtopics: ['Tawhid', 'Qur’an', 'Hadith', 'Fiqh', 'Seerah', 'Islamic ethics'] },
    { title: 'Qur’anic Sciences', description: 'Makki, Madani, Asbab al-Nuzul.', order: 33, subtopics: ['Makki and Madani', 'Asbab al-Nuzul', 'Compilation', 'Preservation', 'Interpretation and reflection'] },
    { title: 'Selected Qur’anic Passages', description: 'Faith, justice, family relations.', order: 34, subtopics: ['Faith and worship', 'Justice', 'Family relations', 'Social responsibility', 'Patience and perseverance'] },
    { title: 'Hadith Sciences', description: 'Classification, Sahih, Hasan, Da\'if.', order: 35, subtopics: ['Classification of Hadith', 'Sahih', 'Hasan', "Da'if", 'Isnad and matn', 'Importance of authentic transmission'] },
    { title: 'Selected Hadith and Lessons', description: 'Character, brotherhood, justice.', order: 36, subtopics: ['Character', 'Brotherhood', 'Justice', 'Responsibility', 'Seeking knowledge', 'Moderation'] },
    { title: 'Tawhid and Shirk', description: 'Meaning, forms, avoiding superstition.', order: 37, subtopics: ['Meaning of Shirk', 'Forms of Shirk', 'Avoiding superstition', 'Sincerity in worship', 'Effects of sound belief'] },
    { title: 'Fiqh of Salah', description: 'Congregational, Jumu\'ah, Sujud al-sahw.', order: 38, subtopics: ['Congregational prayer', "Jumu'ah", 'Sujud al-sahw', 'Travel prayer', 'Combining and shortening prayers', 'Practical review'] },
    { title: 'Fiqh of Fasting', description: 'Voluntary, missed fasts, I\'tikaf.', order: 39, subtopics: ['Voluntary fasting', 'Missed fasts', 'Fidya and expiation', "I'tikaf", 'Spiritual discipline'] },
    { title: 'Islamic Morality and Character', description: 'Amanah, Sidq, Sabr, Shukr.', order: 40, subtopics: ['Amanah', 'Sidq', 'Sabr', 'Shukr', 'Tawakkul', 'Avoiding envy and arrogance'] },
    { title: 'Revision and Examination (SSS 2 Term 1)', description: 'Theory review, Hadith practice.', order: 41, subtopics: ['Theory review', 'Hadith practice', 'Fiqh practice', 'Past questions', 'Assessment'] },
    // SSS 2 Second Term
    { title: 'Islamic Family Law', description: 'Marriage contract, divorce, inheritance.', order: 42, subtopics: ['Marriage contract', 'Mahr', 'Rights of spouses', 'Divorce and reconciliation', 'Inheritance introduction', 'Child welfare'] },
    { title: 'Inheritance in Islam', description: 'Meaning, basic heirs, principles.', order: 43, subtopics: ['Meaning of inheritance', 'Importance', 'Basic heirs', 'Principles of distribution', 'Justice and responsibilities'] },
    { title: 'Islamic Economic System', description: 'Ownership, trade, Riba, Gharar.', order: 44, subtopics: ['Ownership', 'Trade', 'Partnership', 'Riba', 'Gharar and fraud', 'Zakah'] },
    { title: 'Business Ethics', description: 'Honesty, fair measurement, contracts.', order: 45, subtopics: ['Honesty', 'Fair measurement', 'Contracts', 'Debt', 'Trust', 'Consumer rights'] },
    { title: 'Islam and Governance', description: 'Justice, Shura, accountability.', order: 46, subtopics: ['Justice in leadership', 'Consultation (Shura)', 'Accountability', 'Public trust', 'Rights and duties of citizens'] },
    { title: 'Islam and Human Rights', description: 'Human dignity, life, justice.', order: 47, subtopics: ['Human dignity', 'Life and property', 'Justice', 'Freedom of belief', 'Rights of women and children', 'Rights of minorities'] },
    { title: 'Relations with Non-Muslims', description: 'Peaceful coexistence, treaties.', order: 48, subtopics: ['Peaceful coexistence', 'Justice', 'Neighbourly relations', 'Treaties', 'Respect and dialogue'] },
    { title: 'Islamic History: Umayyad Period', description: 'Rise, administration, expansion.', order: 49, subtopics: ['Rise of Umayyads', 'Administration', 'Expansion', 'Scholarship', 'Achievements and challenges'] },
    { title: 'Islamic History: Abbasid Period', description: 'Rise, Baghdad, scholarship.', order: 50, subtopics: ['Rise of Abbasids', 'Baghdad', 'Scholarship', 'Science and medicine', 'Literature', 'Decline factors'] },
    { title: 'Revision and Examination (SSS 2 Term 2)', description: 'Family law, history review.', order: 51, subtopics: ['Family law', 'Economics', 'History', 'Human rights', 'Past-question practice'] },
    // SSS 2 Third Term
    { title: 'Islamic Civilisation in Africa', description: 'Spread, trade, mosques.', order: 52, subtopics: ['Early spread of Islam', 'Trade and scholarship', 'West African Muslim states', 'Mosques and learning', 'Cultural interaction'] },
    { title: 'Islam in West Africa', description: 'Contacts, Trans-Saharan trade.', order: 53, subtopics: ['Early Muslim contacts', 'Trans-Saharan trade', 'Islamic scholarship', 'Reform movements', 'Muslim communities'] },
    { title: 'Islamic States and Scholars', description: 'Kanem-Borno, Sokoto, Timbuktu.', order: 54, subtopics: ['Kanem-Borno', 'Sokoto Caliphate', 'Timbuktu scholarship', 'Uthman Dan Fodio', 'Ahmad Baba and other scholars'] },
    { title: 'Women in Islam', description: 'Equality, education, marriage rights.', order: 55, subtopics: ['Spiritual equality', 'Education', 'Economic rights', 'Marriage rights', 'Family responsibilities', 'Historical contributions'] },
    { title: 'Youth and Islamic Values', description: 'Identity, peer influence, conduct.', order: 56, subtopics: ['Identity', 'Peer influence', 'Responsible conduct', 'Education', 'Digital behaviour', 'Community service'] },
    { title: 'Islam and Contemporary Issues', description: 'Poverty, corruption, drug abuse.', order: 57, subtopics: ['Poverty', 'Corruption', 'Drug abuse', 'Violence', 'Environmental responsibility', 'Social media ethics'] },
    { title: 'Da\'wah and Islamic Leadership', description: 'Qualities of Da\'i, wisdom, leadership.', order: 58, subtopics: ["Qualities of a Da'i", 'Wisdom', 'Communication', 'Leadership', 'Service'] },
    { title: 'Islamic Art and Culture', description: 'Calligraphy, architecture, poetry.', order: 59, subtopics: ['Calligraphy', 'Architecture', 'Literature', 'Poetry', 'Patterns and design'] },
    { title: 'Revision and Practical Application', description: 'Case studies, moral decisions.', order: 60, subtopics: ['Case studies', 'Moral decisions', 'Worship review', 'Essay practice', 'Objective practice'] },
    { title: 'End-of-Term Examination', description: 'Comprehensive review, mock.', order: 61, subtopics: ['Comprehensive review', 'Mock examination', 'Corrections', 'Final assessment'] },
    // SSS 3 First Term
    { title: 'Comprehensive Review of Aqidah', description: 'Tawhid, Shirk, Divine decree.', order: 62, subtopics: ['Tawhid', 'Shirk', 'Articles of faith', 'Divine decree', 'Faith and conduct'] },
    { title: 'Comprehensive Qur’an Studies', description: 'Revelation, compilation, themes.', order: 63, subtopics: ['Revelation', 'Compilation', 'Preservation', 'Selected passages', 'Themes and lessons'] },
    { title: 'Comprehensive Hadith Studies', description: 'Terminology, classification.', order: 64, subtopics: ['Hadith terminology', 'Classification', 'Selected Hadith', 'Application', 'Hadith and Sunnah'] },
    { title: 'Advanced Fiqh of Worship', description: 'Taharah, Salah, Sawm, Hajj, Zakah.', order: 65, subtopics: ['Taharah', 'Salah', 'Sawm', 'Zakah', 'Hajj', 'Practical application'] },
    { title: 'Islamic Family Life', description: 'Marriage, spousal rights, parenting.', order: 66, subtopics: ['Marriage', 'Spousal rights', 'Parenting', 'Inheritance', 'Family welfare'] },
    { title: 'Islamic Ethics and Character', description: 'Honesty, justice, patience.', order: 67, subtopics: ['Honesty', 'Justice', 'Patience', 'Forgiveness', 'Humility', 'Social responsibility'] },
    { title: 'Islamic Economic Ethics', description: 'Halal earnings, trade, Riba.', order: 68, subtopics: ['Halal earnings', 'Trade', 'Riba', 'Contracts', 'Zakah', 'Economic justice'] },
    { title: 'Islam and Social Responsibility', description: 'Community service, care, peace.', order: 69, subtopics: ['Community service', 'Care for vulnerable people', 'Peace', 'Conflict resolution', 'Public trust'] },
    { title: 'Past-Question and Structured Practice', description: 'Objective, essay, Fiqh questions.', order: 70, subtopics: ['Objective questions', 'Essay questions', 'Qur’an and Hadith questions', 'Fiqh questions', 'Corrections'] },
    // SSS 3 Second Term
    { title: 'Revision and Examination (SSS 3 Term 1)', description: 'Full review, mock assessment.', order: 71, subtopics: ['Full review', 'Mock assessment', 'Targeted revision', 'Examination preparation'] },
    { title: 'Islamic History Review', description: 'Prophetic period, Caliphs, Umayyads.', order: 72, subtopics: ['Prophetic period', 'Rightly Guided Caliphs', 'Umayyads', 'Abbasids', 'African Islamic history'] },
    { title: 'Islam in Nigeria and West Africa', description: 'Early contacts, Muslim communities.', order: 73, subtopics: ['Early contacts', 'Muslim communities', 'Islamic scholarship', 'Sokoto Caliphate', 'Colonial and modern developments'] },
    { title: 'Islamic Civilisation', description: 'Education, science, medicine.', order: 74, subtopics: ['Education', 'Science', 'Medicine', 'Literature', 'Architecture', 'Trade'] },
    { title: 'Islam and Governance (SSS 3)', description: 'Justice, Shura, accountability.', order: 75, subtopics: ['Justice', 'Shura', 'Leadership', 'Accountability', 'Public welfare'] },
    { title: 'Islam and Human Rights (SSS 3)', description: 'Human dignity, life, justice.', order: 76, subtopics: ['Human dignity', 'Justice', 'Life and property', 'Family rights', 'Rights of minorities'] },
    { title: 'Islam and Contemporary Society', description: 'Corruption, poverty, violence.', order: 77, subtopics: ['Corruption', 'Poverty', 'Violence', 'Extremism and peaceful coexistence', 'Environment', 'Digital ethics'] },
    { title: 'Women, Youth and Family', description: 'Rights, education, development.', order: 78, subtopics: ['Rights and responsibilities', 'Education', 'Family roles', 'Youth development', 'Community participation'] },
    { title: 'Da\'wah and Islamic Communication', description: 'Objectives, methods, dialogue.', order: 79, subtopics: ['Objectives', 'Methods', 'Wisdom', 'Dialogue', 'Public speaking', 'Media ethics'] },
    // SSS 3 Third Term
    { title: 'SSCE Examination Skills', description: 'Question interpretation, answer structure.', order: 80, subtopics: ['Question interpretation', 'Answer structure', 'Use of evidence', 'Time management', 'Common errors'] },
    { title: 'Mock Examination', description: 'Full practice, corrections.', order: 81, subtopics: ['Full practice', 'Corrections', 'Revision plan', 'Final preparation'] },
    { title: 'Final Review: Qur’an and Hadith', description: 'Revelation, preservation.', order: 82, subtopics: ['Revelation', 'Preservation', 'Selected teachings', 'Hadith terminology', 'Application'] },
    { title: 'Final Review: Aqidah', description: 'Tawhid, articles of faith.', order: 83, subtopics: ['Tawhid', 'Articles of faith', 'Shirk', 'Faith and conduct'] },
    { title: 'Final Review: Fiqh', description: 'Purification, prayer, fasting.', order: 84, subtopics: ['Purification', 'Prayer', 'Fasting', 'Zakah', 'Hajj', 'Family law'] },
    { title: 'Final Review: Seerah', description: 'Makkah period, Hijrah.', order: 85, subtopics: ['Makkah period', 'Hijrah', 'Madinah', 'Major events', 'Farewell pilgrimage'] },
    { title: 'Final Review: Islamic History', description: 'Caliphs, Umayyads, Abbasids.', order: 86, subtopics: ['Caliphs', 'Umayyads', 'Abbasids', 'West Africa', 'Nigeria'] },
    { title: 'Final Review: Islamic Ethics', description: 'Character, justice, family.', order: 87, subtopics: ['Character', 'Justice', 'Family', 'Community', 'Economic ethics'] },
    { title: 'Final Review: Contemporary Issues', description: 'Peace, human rights, youth.', order: 88, subtopics: ['Peace', 'Human rights', 'Youth', 'Women', 'Environment', 'Digital responsibility'] },
    { title: 'SSCE Objective Practice', description: 'Timed practice, question analysis.', order: 89, subtopics: ['Timed practice', 'Question analysis', 'Corrections', 'Revision'] },
    { title: 'SSCE Essay Practice', description: 'Structured answers, evidence.', order: 90, subtopics: ['Structured answers', 'Qur’anic/Hadith evidence', 'Explanation', 'Conclusion', 'Time management'] },
    { title: 'Final Mock and Examination Preparation', description: 'Full mock, targeted revision.', order: 91, subtopics: ['Full mock examination', 'Corrections', 'Targeted revision', 'Final assessment'] }
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
          [topicId, subStr, subSlug, `Learn about ${subStr}`, subOrder]
        );
        const subtopicId = subRes.rows[0].id;

        for (let i = 1; i <= 2; i++) {
          const lessonTitle = `Lesson ${i}: ${subStr}`;
          const lessonSlug = slugify(lessonTitle) + '-' + Math.floor(Math.random() * 100000);
          const lessonContent = `<div class="lesson-intro">
            <h2>Welcome to \${lessonTitle}</h2>
            <p>This is a comprehensive study module covering the concepts of <strong>\${subStr}</strong> within the topic of \${topic.title}.</p>
            <h3>Key Principles</h3>
            <ul>
              <li>Understand the fundamental rules and definitions of \${subStr}.</li>
              <li>Apply standard methodologies accurately.</li>
              <li>Practice solving related problems to build confidence.</li>
            </ul>
            <p>Make sure to take notes as you read through this module. At the end of the topic, you can test your knowledge using the Practice feature!</p>
          </div>`;

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
