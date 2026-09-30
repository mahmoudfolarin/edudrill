require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'civic-education', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Civic Education Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 Term 1
    { title: 'Introduction to Civic Education', description: 'Meaning, objectives, importance.', order: 1, subtopics: ['Meaning of Civic Education', 'Civic knowledge, skills and attitudes', 'Objectives of Civic Education', 'Role of Civic Education in national development', 'Importance to the individual and society'] },
    { title: 'Values I', description: 'Meaning, types, honesty.', order: 2, subtopics: ['Meaning of values', 'Justice and fairness', 'Types of values', 'Selflessness and cooperation', 'Honesty and integrity', 'Importance of positive values'] },
    { title: 'Values II and National Ethics', description: 'Discipline, courage, contentment.', order: 3, subtopics: ['Discipline', 'Courage', 'Contentment', 'Tolerance', 'Dignity of labour', 'Responsible behaviour and ethical decision-making'] },
    { title: 'Community Service', description: 'Meaning, types, importance.', order: 4, subtopics: ['Meaning of community service', 'Individual and group participation', 'Types of community service', 'Community development activities', 'Importance of community service'] },
    { title: 'Citizenship', description: 'Meaning, types, acquisition.', order: 5, subtopics: ['Meaning of citizenship', 'Citizenship by registration', 'Types of citizenship', 'Citizenship by naturalisation', 'Citizenship by birth', 'Loss and renunciation of citizenship'] },
    { title: 'Rights of Citizens', description: 'Meaning, types, limitations.', order: 6, subtopics: ['Meaning of rights', 'Economic, social and cultural rights', 'Fundamental human rights', 'Limitations to rights', 'Civil and political rights', 'Protection of citizens rights'] },
    { title: 'Duties and Obligations of Citizens', description: 'Obedience, taxes, voting.', order: 7, subtopics: ['Obedience to laws', 'Protection of public property', 'Payment of taxes and levies', 'National loyalty', 'Voting and civic participation', 'Community and environmental responsibilities'] },
    { title: 'Nationalism and Patriotism', description: 'Meaning, attributes, national unity.', order: 8, subtopics: ['Meaning of nationalism', 'Importance of nationalism', 'Meaning of patriotism', 'National symbols and identity', 'Attributes of a patriot', 'Promoting national unity'] },
    { title: 'Negative Attitudes to National Values', description: 'Meaning, selfishness, indiscipline.', order: 9, subtopics: ['Meaning of negative attitudes', 'Selfishness and intolerance', 'Dishonesty and corruption', 'Consequences for society', 'Indiscipline', 'Ways of correcting negative attitudes'] },
    { title: 'Ethnic and Religious Intolerance', description: 'Meaning, causes, effects.', order: 10, subtopics: ['Meaning of intolerance', 'Effects on national unity', 'Causes of ethnic intolerance', 'Tolerance and peaceful coexistence', 'Causes of religious intolerance', 'Ways of preventing intolerance'] },
    { title: 'Revision (SSS 1 Term 1)', description: 'Review and preparation.', order: 11, subtopics: ['Review of first-term topics', 'Case studies', 'Objective questions', 'Preparation for examination', 'Short-answer practice'] },
    { title: 'Examination (SSS 1 Term 1)', description: 'End of term examination.', order: 12, subtopics: ['End-of-term examination'] },
    // SSS 1 Term 2
    { title: 'Democracy', description: 'Meaning, features, types.', order: 13, subtopics: ['Meaning of democracy', 'Importance of democracy', 'Features of democracy', 'Democratic culture and participation', 'Types of democracy'] },
    { title: 'Representative Democracy', description: 'Meaning, characteristics, roles.', order: 14, subtopics: ['Meaning of representative democracy', 'Disadvantages', 'Characteristics', 'Responsibilities of representatives', 'Advantages', 'Role of citizens'] },
    { title: 'Rule of Law', description: 'Meaning, equality, supremacy.', order: 15, subtopics: ['Meaning of rule of law', 'Fundamental freedoms', 'Equality before the law', 'Fair hearing', 'Supremacy of the law', 'Importance of rule of law'] },
    { title: 'Pillars of Democracy', description: 'Constitution, institutions, elections.', order: 16, subtopics: ['Constitution', 'Political parties', 'Independent institutions', 'Free press', 'Free and fair elections', 'Civil society'] },
    { title: 'Constitution (Topic)', description: 'Meaning, types, features.', order: 17, subtopics: ['Meaning of constitution', 'Importance of a constitution', 'Types of constitution', 'Constitutional supremacy', 'Features of a constitution', 'Constitution and citizenship'] },
    { title: 'Arms of Government', description: 'Executive, legislature, judiciary.', order: 18, subtopics: ['Executive', 'Functions of each arm', 'Legislature', 'Checks and balances', 'Judiciary', 'Separation of powers'] },
    { title: 'Federalism, State and Local Government', description: 'Structures and responsibilities.', order: 19, subtopics: ['Meaning of federalism', 'Functions of each level', 'Reasons for federalism in Nigeria', 'Advantages and challenges', 'Federal, state and local structures', 'Citizen responsibilities'] },
    { title: 'Political Parties', description: 'Meaning, functions, systems.', order: 20, subtopics: ['Meaning of political parties', 'Party systems', 'Functions of political parties', 'Political participation', 'Types of parties', 'Responsible party politics'] },
    { title: 'Free Press', description: 'Meaning, media, responsibilities.', order: 21, subtopics: ['Meaning of the press', 'Freedom of expression', 'Print and electronic media', 'Responsibilities of the media', 'Functions of a free press', 'Limitations and ethical issues'] },
    { title: 'Human Rights', description: 'Characteristics, categories, protection.', order: 22, subtopics: ['Meaning of human rights', 'Universal Declaration of Human Rights', 'Characteristics of human rights', 'Importance of human rights', 'Categories of rights', 'Protection of rights'] },
    { title: 'Revision and Examination (SSS 1 Term 2)', description: 'Comprehensive review.', order: 23, subtopics: ['Comprehensive review', 'Case studies', 'Practice questions', 'End-of-term examination'] },
    // SSS 1 Term 3
    { title: 'Protection of Human Rights', description: 'Roles of individuals and groups.', order: 24, subtopics: ['Role of individuals', 'Legal remedies', 'Role of groups and NGOs', 'National human-rights institutions', 'Advocacy and awareness', 'International mechanisms'] },
    { title: 'Government Responsibilities for Human Rights', description: 'Protection, legal aid, law enforcement.', order: 25, subtopics: ['Constitutional protection', 'Protection of vulnerable groups', 'Legal aid', 'Government agencies', 'Law-enforcement responsibilities', 'Citizen oversight'] },
    { title: 'Cultism I', description: 'Meaning, origin, characteristics.', order: 26, subtopics: ['Meaning of cultism', 'Effects on individuals and society', 'Origin and development', 'School/community risks', 'Characteristics of secret cults'] },
    { title: 'Cultism II', description: 'Factors, consequences, prevention.', order: 27, subtopics: ['Factors that encourage involvement', 'Consequences of cultism', 'Peer pressure', 'Impact on education and communities', 'Search for identity and protection', 'Prevention'] },
    { title: 'Cultism III and Prevention', description: 'Rules, counselling, support.', order: 28, subtopics: ['School rules and regulations', 'Community awareness', 'Counselling and positive peer influence', 'Support systems', 'Responsible decision-making', 'Reporting unsafe situations'] },
    { title: 'Law and Order (I)', description: 'Meaning, importance, consequences.', order: 29, subtopics: ['Meaning of law and order', 'Consequences of lawlessness', 'Importance of laws', 'Citizens and law enforcement'] },
    { title: 'Law and Order (II)', description: 'Sources of laws.', order: 30, subtopics: ['Sources of laws'] },
    { title: 'Orderliness', description: 'Meaning, queuing, listening.', order: 31, subtopics: ['Meaning of orderliness', 'Road-use discipline', 'Queuing culture', 'Public conduct', 'Listening skills', 'Benefits of orderly behaviour'] },
    { title: 'Respect for Constituted Authority', description: 'Meaning, examples, limits.', order: 32, subtopics: ['Meaning of constituted authority', 'Limits of authority', 'Examples of lawful authority', 'Responsible civic engagement', 'Why authority should be respected'] },
    { title: 'Human Trafficking', description: 'Meaning, forms, causes.', order: 33, subtopics: ['Meaning of human trafficking', 'Effects on victims and society', 'Forms of trafficking', 'Prevention and public awareness', 'Causes and risk factors', 'Roles of government and communities'] },
    { title: 'Revision and Examination (SSS 1 Term 3)', description: 'Full term review.', order: 34, subtopics: ['Full-term review', 'Objective and essay practice', 'Case-study practice', 'End-of-term examination'] },
    // SSS 2 Term 1
    { title: 'Citizenship Education', description: 'Meaning, scope, duties.', order: 35, subtopics: ['Meaning and scope', 'Security and civic responsibility', 'Importance of citizenship education', 'Environmental sanitation and peace', 'Duties to the community'] },
    { title: 'Duties and Obligations of Citizens (SSS 2)', description: 'Rules, security, taxes.', order: 36, subtopics: ['Obedience to rules', 'Environmental responsibility', 'Community security', 'Promotion of peace', 'Payment of taxes', 'Protection of public property'] },
    { title: 'National Ethics', description: 'Meaning, integrity, discipline.', order: 37, subtopics: ['Meaning of ethics', 'Contentment', 'Integrity', 'Dignity of labour', 'Discipline', 'Civic responsibility'] },
    { title: 'Contentment', description: 'Meaning, attributes, benefits.', order: 38, subtopics: ['Meaning of contentment', 'Effects of greed and materialism', 'Attributes', 'Contentment and responsible living', 'Benefits'] },
    { title: 'Courage', description: 'Meaning, moral courage.', order: 39, subtopics: ['Meaning of courage', 'Benefits of courage', 'Moral courage', 'Responsible risk-taking and decision-making', 'Courage in civic life'] },
    { title: 'Integrity', description: 'Meaning, honesty, leadership.', order: 40, subtopics: ['Meaning of integrity', 'Integrity in school and work', 'Honesty and trustworthiness', 'Consequences of dishonesty', 'Integrity in leadership'] },
    { title: 'Human Rights and Responsibilities', description: 'Categories, limitations.', order: 41, subtopics: ['Categories of rights', 'Protection of rights', 'Rights and responsibilities', 'Responsible use of freedoms', 'Limitations to rights'] },
    { title: 'Political Apathy', description: 'Meaning, causes, effects.', order: 42, subtopics: ['Meaning of political apathy', 'Low participation and civic disengagement', 'Causes', 'Ways to encourage participation', 'Effects on democracy'] },
    { title: 'Popular Participation', description: 'Meaning, forms, voting.', order: 43, subtopics: ['Meaning of popular participation', 'Community participation', 'Forms of participation', 'Public consultation', 'Voting', 'Benefits to democracy'] },
    { title: 'Revision and Examination (SSS 2 Term 1)', description: 'Review and examination.', order: 44, subtopics: ['Comprehensive revision', 'Case studies', 'Practice questions', 'End-of-term examination'] },
    // SSS 2 Term 2
    { title: 'Representative Democracy and Elections', description: 'Elections, participation.', order: 45, subtopics: ['Electoral democracy', 'Role of voters', 'Free and fair elections', 'Role of electoral institutions', 'Electoral participation'] },
    { title: 'Political Parties and Party Systems', description: 'Functions, organization, systems.', order: 46, subtopics: ['Functions of political parties', 'Party membership', 'Party organisation', 'Responsible political participation', 'Types of party systems'] },
    { title: 'Civil Society', description: 'Meaning, organizations, functions.', order: 47, subtopics: ['Meaning of civil society', 'Advocacy', 'Civil society organisations', 'Community development', 'Functions', 'Accountability'] },
    { title: 'Public Service', description: 'Meaning, service ethics, functions.', order: 48, subtopics: ['Meaning of public service', 'Public-service ethics', 'Civil service', 'Accountability and transparency', 'Functions', 'Challenges'] },
    { title: 'Leadership', description: 'Meaning, qualities, styles.', order: 49, subtopics: ['Meaning of leadership', 'Servant leadership', 'Qualities of good leaders', 'Good and bad leadership', 'Leadership styles', 'Responsible followership'] },
    { title: 'Corruption', description: 'Meaning, forms, causes.', order: 50, subtopics: ['Meaning of corruption', 'Effects on society', 'Forms of corruption', 'Prevention', 'Causes', 'Role of citizens and institutions'] },
    { title: 'Drug Abuse', description: 'Meaning, risk factors, effects.', order: 51, subtopics: ['Meaning of drug abuse', 'Prevention and healthy choices', 'Risk factors', 'Role of family, school and community', 'Effects on individuals and society'] },
    { title: 'Human Trafficking (II)', description: 'Causes, methods, effects.', order: 52, subtopics: ['Causes and risk factors', 'Prevention', 'Methods of exploitation', 'Protection and support', 'Effects on victims', 'Role of relevant institutions'] },
    { title: 'Youth Empowerment', description: 'Meaning, education, entrepreneurship.', order: 53, subtopics: ['Meaning of empowerment', 'Employment and vocational skills', 'Education and skills', 'Youth participation', 'Entrepreneurship', 'Responsible use of opportunities'] },
    { title: 'Revision and Examination (SSS 2 Term 2)', description: 'Review and exam.', order: 54, subtopics: ['Review', 'Case studies', 'Objective and essay practice', 'End-of-term examination'] },
    // SSS 2 Term 3
    { title: 'Security Education', description: 'Meaning, personal and community security.', order: 55, subtopics: ['Meaning of security', 'Safety awareness', 'Personal and community security', 'Responsible reporting', 'Common security threats'] },
    { title: 'National Security', description: 'Meaning, internal/external, institutions.', order: 56, subtopics: ['Meaning of national security', 'Role of security institutions', 'Internal and external security', 'Community cooperation', 'Role of citizens'] },
    { title: 'Peace and Conflict Resolution', description: 'Meaning, causes, negotiation.', order: 57, subtopics: ['Meaning of peace', 'Conflict prevention', 'Meaning and types of conflict', 'Negotiation and mediation', 'Causes of conflict', 'Peace-building'] },
    { title: 'Ethnic and Religious Conflict', description: 'Causes, effects, tolerance.', order: 58, subtopics: ['Causes', 'Dialogue', 'Effects', 'Interfaith and intercultural cooperation', 'Tolerance', 'Peaceful coexistence'] },
    { title: 'Social Justice', description: 'Meaning, equality, fairness.', order: 59, subtopics: ['Meaning of social justice', 'Discrimination', 'Equality and equity', 'Inclusion', 'Fairness', 'Promoting justice'] },
    { title: 'Good Governance', description: 'Meaning, transparency, accountability.', order: 60, subtopics: ['Meaning of governance', 'Rule of law', 'Transparency', 'Participation', 'Accountability', 'Responsive institutions'] },
    { title: 'Democratic Institutions', description: 'INEC, legislature, executive.', order: 61, subtopics: ['INEC', 'Judiciary', 'Legislature', 'Political parties', 'Executive', 'Media and civil society'] },
    { title: 'Citizenship and National Development', description: 'Human capital, development, responsibility.', order: 62, subtopics: ['Human capital', 'National productivity', 'Community development', 'Environmental responsibility', 'Public responsibility', 'Active citizenship'] },
    { title: 'Civic Project', description: 'Identifying issue, research, planning.', order: 63, subtopics: ['Identifying a civic issue', 'Community/school action', 'Research', 'Presentation', 'Planning', 'Evaluation'] },
    { title: 'Revision and Examination (SSS 2 Term 3)', description: 'Review and exam.', order: 64, subtopics: ['Comprehensive revision', 'Project review', 'Mock assessment', 'End-of-term examination'] },
    // SSS 3 Term 1
    { title: 'Citizenship and National Values Review', description: 'Review of citizenship, rights, values.', order: 65, subtopics: ['Citizenship', 'Patriotism', 'Rights and duties', 'Integrity and discipline', 'National values'] },
    { title: 'Human Rights (SSS 3)', description: 'Review of human rights.', order: 66, subtopics: ['Meaning and characteristics', 'Protection mechanisms', 'Categories', 'Responsibilities', 'Limitations', 'Case-study practice'] },
    { title: 'Rule of Law (SSS 3)', description: 'Principles, equality, fair hearing.', order: 67, subtopics: ['Principles', 'Judicial independence', 'Equality before law', 'Problems affecting rule of law', 'Fair hearing', 'Civic responsibilities'] },
    { title: 'Democracy (SSS 3)', description: 'Meaning, principles, features.', order: 68, subtopics: ['Meaning and principles', 'Popular participation', 'Features', 'Advantages and challenges', 'Democratic institutions', 'Exam practice'] },
    { title: 'Government Structures', description: 'Executive, legislature, judiciary.', order: 69, subtopics: ['Executive', 'Checks and balances', 'Legislature', 'Federalism', 'Judiciary', 'Local government'] },
    { title: 'Nationalism and Patriotism (SSS 3)', description: 'Meaning, attributes, national identity.', order: 70, subtopics: ['Meaning', 'National unity', 'Attributes', 'Role in development', 'National identity', 'Contemporary challenges'] },
    { title: 'Peace and Conflict Resolution (SSS 3)', description: 'Causes, management, negotiation.', order: 71, subtopics: ['Causes of conflict', 'Mediation', 'Conflict management', 'Peace-building', 'Negotiation', 'Case studies'] },
    { title: 'Political Participation', description: 'Voting, parties, civil society.', order: 72, subtopics: ['Voting', 'Public opinion', 'Political parties', 'Political apathy', 'Civil society', 'Responsible participation'] },
    { title: 'Past-Question and Structured Practice', description: 'Practice sessions.', order: 73, subtopics: ['Citizenship and values', 'Rule of law', 'Human rights', 'Government structures', 'Democracy', 'Essay techniques'] },
    { title: 'Revision and Examination (SSS 3 Term 1)', description: 'Review and exam.', order: 74, subtopics: ['Comprehensive revision', 'Corrections and feedback', 'Mock examination'] },
    // SSS 3 Term 2
    { title: 'Corruption in Nigeria', description: 'Meaning, types, causes.', order: 75, subtopics: ['Meaning', 'Effects', 'Types', 'Anti-corruption measures', 'Causes', 'Citizen responsibilities'] },
    { title: 'Drug Abuse and Social Responsibility', description: 'Meaning, causes, effects.', order: 76, subtopics: ['Meaning', 'Prevention', 'Causes and risk factors', 'Community response', 'Effects', 'Healthy decision-making'] },
    { title: 'Human Trafficking and Exploitation', description: 'Meaning, forms, risk factors.', order: 77, subtopics: ['Meaning', 'Effects', 'Forms', 'Prevention', 'Risk factors', 'Protection and institutional response'] },
    { title: 'Cultism and Youth Challenges', description: 'Meaning, risk factors, effects.', order: 78, subtopics: ['Meaning', 'Prevention', 'Risk factors', 'Positive peer influence', 'Effects', 'School and community support'] },
    { title: 'Youth Empowerment (SSS 3)', description: 'Skills, entrepreneurship, education.', order: 79, subtopics: ['Skills development', 'Employment', 'Entrepreneurship', 'Community service', 'Education', 'Responsible opportunities'] },
    { title: 'Popular Participation (SSS 3)', description: 'Meaning, forms, barriers.', order: 80, subtopics: ['Meaning', 'Political participation', 'Forms', 'Community participation', 'Barriers', 'Ways to increase engagement'] },
    { title: 'Civil Society and Public Service', description: 'Roles, functions, accountability.', order: 81, subtopics: ['Roles of civil society', 'Advocacy', 'Public service functions', 'Citizen oversight', 'Accountability'] },
    { title: 'Leadership and Followership', description: 'Qualities, styles, ethics.', order: 82, subtopics: ['Qualities of good leaders', 'Responsible followership', 'Leadership styles', 'Leadership challenges', 'Ethical leadership'] },
    { title: 'Political Apathy (SSS 3)', description: 'Meaning, causes, consequences.', order: 83, subtopics: ['Meaning', 'Effects on democracy', 'Causes', 'Solutions', 'Consequences', 'Youth participation'] },
    { title: 'Security and National Issues', description: 'Threats, community safety, security.', order: 84, subtopics: ['Security threats', 'Citizen roles', 'Community safety', 'Peaceful response', 'National security', 'Revision'] },
    { title: 'Revision and Examination (SSS 3 Term 2)', description: 'Review and exam.', order: 85, subtopics: ['Past-question practice', 'Mock examination', 'Essay and objective revision'] },
    // SSS 3 Term 3
    { title: 'Full Review: National Values', description: 'Review of values, ethics, patriotism.', order: 86, subtopics: ['Contentment', 'Courage', 'Integrity', 'Dignity of labour', 'Discipline', 'Patriotism'] },
    { title: 'Full Review: Citizenship and Human Rights', description: 'Review of citizenship and rights.', order: 87, subtopics: ['Acquisition of citizenship', 'Human rights', 'Rights', 'Protection', 'Duties', 'Responsibilities'] },
    { title: 'Full Review: Democracy and Institutions', description: 'Review of democracy, arms of government.', order: 88, subtopics: ['Democracy', 'Arms of government', 'Constitution', 'Elections', 'Rule of law', 'Political parties'] },
    { title: 'Full Review: Governance and Participation', description: 'Review of governance, civil society.', order: 89, subtopics: ['Good governance', 'Popular participation', 'Civil society', 'Political apathy', 'Free press', 'Accountability'] },
    { title: 'Full Review: Social Issues', description: 'Review of corruption, abuse, trafficking.', order: 90, subtopics: ['Corruption', 'Human trafficking', 'Drug abuse', 'Youth challenges', 'Cultism', 'Prevention'] },
    { title: 'Full Review: Security and Peace', description: 'Review of national security, conflict.', order: 91, subtopics: ['National security', 'Community safety', 'Conflict', 'Responsible citizenship', 'Peace-building'] },
    { title: 'WAEC/NECO-Style Objective Practice', description: 'Objective questions practice.', order: 92, subtopics: ['Mixed-topic objective questions', 'Review of common concepts', 'Interpretation of civic scenarios', 'Correction of errors'] },
    { title: 'WAEC/NECO-Style Essay Practice', description: 'Essay questions practice.', order: 93, subtopics: ['Structured answers', 'Solutions and recommendations', 'Definitions and explanations', 'Answer organisation', 'Causes and effects'] },
    { title: 'Mock Examination and Final Revision', description: 'Final mock and preparation.', order: 94, subtopics: ['Full mock examination', 'Time management', 'Corrections', 'Final preparation', 'Weak-area revision'] }
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
