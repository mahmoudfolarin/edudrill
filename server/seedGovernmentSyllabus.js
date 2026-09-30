require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'government', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Government Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    { title: 'Meaning, Nature and Scope of Government', description: 'Meaning of government, institution, process.', order: 1, subtopics: ['Meaning of government', 'Government as an institution', 'Government as a process', 'Government as an academic field', 'Functions of government', 'Importance of studying government'] },
    { title: 'Basic Political Concepts', description: 'Power, authority, legitimacy, sovereignty.', order: 2, subtopics: ['Power', 'Authority', 'Legitimacy', 'Sovereignty', 'Political obligation', 'Political participation'] },
    { title: 'The State', description: 'Meaning, elements, territory, government.', order: 3, subtopics: ['Meaning of a state', 'Elements of a state', 'Population', 'Territory', 'Government', 'Sovereignty', 'State and government'] },
    { title: 'Political Socialisation', description: 'Agents, family, school, peer groups.', order: 4, subtopics: ['Meaning', 'Agents of political socialisation', 'Family', 'School', 'Peer groups', 'Mass media', 'Political parties', 'Importance'] },
    { title: 'Political Culture', description: 'Meaning, types, parochial, subject.', order: 5, subtopics: ['Meaning', 'Types of political culture', 'Parochial', 'Subject', 'Participant', 'Political culture and stability'] },
    { title: 'Public Opinion', description: 'Formation, measurement, importance.', order: 6, subtopics: ['Meaning', 'Formation of public opinion', 'Factors influencing opinion', 'Measurement of opinion', 'Importance in democracy'] },
    { title: 'Types and Characteristics of Government', description: 'Unitary, federal, confederal.', order: 7, subtopics: ['Unitary government', 'Federal government', 'Confederal government', 'Features', 'Advantages and limitations'] },
    { title: 'Systems of Government', description: 'Presidential and parliamentary systems.', order: 8, subtopics: ['Presidential system', 'Parliamentary system', 'Features', 'Merits and limitations', 'Presidential versus parliamentary systems'] },
    { title: 'Political Ideologies', description: 'Socialism, communism, capitalism.', order: 9, subtopics: ['Meaning of ideology', 'Capitalism', 'Socialism', 'Communism', 'Fascism', 'Nationalism', 'Basic comparisons'] },
    { title: 'Monarchy and Republicanism', description: 'Absolute, constitutional, republican.', order: 10, subtopics: ['Meaning of monarchy', 'Absolute and constitutional monarchy', 'Republican government', 'Features', 'Merits and limitations', 'Monarchy versus republicanism'] },
    { title: 'Revision and Examination (SSS 1 Term 1)', description: 'Comprehensive revision.', order: 11, subtopics: ['Comprehensive revision', 'Objective questions', 'Essay practice', 'End-of-term examination'] },
    // SSS 1 Second Term
    { title: 'Presidential System of Government', description: 'Meaning, features, separation of powers.', order: 12, subtopics: ['Meaning', 'Features', 'President as head of state and government', 'Separation of powers', 'Cabinet', 'Merits and limitations'] },
    { title: 'Parliamentary System of Government', description: 'Meaning, features, prime minister.', order: 13, subtopics: ['Meaning', 'Features', 'Prime Minister', 'Cabinet', 'Collective responsibility', 'Merits and limitations', 'Comparison with presidential system'] },
    { title: 'Monarchy, Republicanism and Military Government', description: 'Forms, military intervention.', order: 14, subtopics: ['Forms of monarchy', 'Republicanism', 'Military government', 'Features', 'Reasons for military intervention', 'Comparison of systems'] },
    { title: 'Constitution and Constitutionalism', description: 'Sources, functions, characteristics.', order: 15, subtopics: ['Meaning of constitution', 'Sources', 'Functions', 'Characteristics', 'Constitutionalism', 'Types of constitution'] },
    { title: 'Types of Constitution', description: 'Written, unwritten, rigid, flexible.', order: 16, subtopics: ['Written and unwritten', 'Rigid and flexible', 'Unitary and federal', 'Confederal constitutions', 'Merits and limitations'] },
    { title: 'Structure and Organisation of Government', description: 'Legislature, executive, judiciary.', order: 17, subtopics: ['Legislature', 'Executive', 'Judiciary', 'Functions', 'Interrelationship', 'Checks and balances'] },
    { title: 'The Legislature', description: 'Functions, unicameral, bicameral.', order: 18, subtopics: ['Meaning', 'Functions', 'Unicameral and bicameral legislatures', 'Law-making', 'Representation', 'Oversight'] },
    { title: 'The Executive', description: 'Types, functions, control.', order: 19, subtopics: ['Meaning', 'Types', 'Functions', 'Political and permanent executives', 'Cabinet', 'Control of the executive'] },
    { title: 'The Judiciary', description: 'Functions, court structure, independence.', order: 20, subtopics: ['Meaning', 'Functions', 'Court structure', 'Judicial independence', 'Judicial review', 'Factors affecting independence'] },
    { title: 'Basic Principles of Government', description: 'Rule of law, separation of powers.', order: 21, subtopics: ['Rule of law', 'Separation of powers', 'Checks and balances', 'Fundamental human rights', 'Representative government'] },
    { title: 'Revision and Examination (SSS 1 Term 2)', description: 'Review and past questions.', order: 22, subtopics: ['Review', 'Past-question practice', 'Essay writing', 'End-of-term examination'] },
    // SSS 1 Third Term
    { title: 'Rule of Law', description: 'Principles, equality, supremacy, limitations.', order: 23, subtopics: ['Meaning', 'Principles', 'Equality before law', 'Supremacy of law', 'Fundamental freedoms', 'Fair hearing', 'Limitations'] },
    { title: 'Separation of Powers', description: 'Origin, operation, advantages.', order: 24, subtopics: ['Meaning', 'Origin', 'Operation', 'Advantages', 'Limitations', 'Application in presidential and parliamentary systems'] },
    { title: 'Checks and Balances', description: 'Purpose, examples, importance.', order: 25, subtopics: ['Meaning', 'Purpose', 'Examples', 'Importance', 'Limitations'] },
    { title: 'Fundamental Human Rights', description: 'Categories, protection, safeguards.', order: 26, subtopics: ['Meaning', 'Categories', 'Constitutional protection', 'Limitations', 'Safeguards', 'Responsibilities'] },
    { title: 'Representative Government', description: 'Features, conditions, advantages.', order: 27, subtopics: ['Meaning', 'Features', 'Conditions for establishment', 'Advantages', 'Limitations', 'Citizen participation'] },
    { title: 'Citizenship', description: 'Types, acquisition, rights.', order: 28, subtopics: ['Meaning', 'Types', 'Acquisition', 'Loss and renunciation', 'Rights and duties', 'Political participation'] },
    { title: 'Political Parties', description: 'Formation, functions, party systems.', order: 29, subtopics: ['Meaning', 'Formation', 'Functions', 'Party systems', 'Membership', 'Role in democracy'] },
    { title: 'Pressure Groups', description: 'Types, methods, functions.', order: 30, subtopics: ['Meaning', 'Types', 'Methods', 'Functions', 'Differences from political parties', 'Influence on government'] },
    { title: 'Public Administration', description: 'Scope, civil service, public corporations.', order: 31, subtopics: ['Meaning', 'Scope', 'Civil service', 'Public corporations', 'Functions', 'Accountability'] },
    { title: 'Revision and Examination (SSS 1 Term 3)', description: 'Comprehensive review.', order: 32, subtopics: ['Comprehensive review', 'Objective and essay practice', 'Mock assessment', 'End-of-term examination'] },
    // SSS 2 First Term
    { title: 'Colonial Administration in Nigeria', description: 'Historical background, indirect rule.', order: 33, subtopics: ['Historical background', 'Reasons for European interest', 'British colonial policy', 'Indirect rule', 'Features of indirect rule'] },
    { title: 'Indirect Rule in Northern Nigeria', description: 'Emirate system, traditional rulers.', order: 34, subtopics: ['Emirate system', 'Role of traditional rulers', 'Reasons for adoption', 'Successes', 'Limitations'] },
    { title: 'Indirect Rule in Western and Eastern Nigeria', description: 'Application, successes and failures.', order: 35, subtopics: ['Application in the West', 'Application in the East', 'Differences', 'Successes and failures', 'Reasons for variations'] },
    { title: 'Nationalism in Nigeria', description: 'Causes, nationalist movements.', order: 36, subtopics: ['Meaning', 'Nationalist movements', 'Early nationalists', 'Press and political associations', 'Factors promoting nationalism'] },
    { title: 'Nationalist Leaders and Movements', description: 'Macaulay, Azikiwe, Awolowo, Bello.', order: 37, subtopics: ['Herbert Macaulay', 'Nnamdi Azikiwe', 'Obafemi Awolowo', 'Ahmadu Bello', 'Nationalist organisations and their contributions'] },
    { title: 'Constitutional Development I', description: 'Clifford, Richards, Macpherson constitutions.', order: 38, subtopics: ['Clifford Constitution 1922', 'Richards Constitution 1946', 'Macpherson Constitution 1951', 'Major features and weaknesses'] },
    { title: 'Constitutional Development II', description: 'Lyttleton, Independence, Republican constitutions.', order: 39, subtopics: ['Lyttleton Constitution 1954', 'Independence Constitution 1960', 'Republican Constitution 1963', 'Federalism and regionalism'] },
    { title: 'Post-Independence Political Development', description: 'First Republic, political parties.', order: 40, subtopics: ['First Republic', 'Political parties', 'Major political developments', 'Crisis of the First Republic', 'Collapse of civilian government'] },
    { title: 'Military Rule in Nigeria', description: 'Reasons, characteristics, administration.', order: 41, subtopics: ['Reasons for military intervention', 'Characteristics', 'Military administration', 'Advantages claimed and limitations', 'Return to civilian rule'] },
    { title: 'Revision and Examination (SSS 2 Term 1)', description: 'Revision, timeline practice.', order: 42, subtopics: ['Revision', 'Timeline practice', 'Essay questions', 'End-of-term examination'] },
    // SSS 2 Second Term
    { title: 'The Nigerian Federal System', description: 'Federalism, adoption, features.', order: 43, subtopics: ['Meaning of federalism', 'Reasons for adoption', 'Features', 'Advantages', 'Problems', 'Federal character'] },
    { title: 'Revenue Allocation', description: 'Sources of revenue, principles.', order: 44, subtopics: ['Meaning', 'Sources of revenue', 'Principles of allocation', 'Federal-state-local relations', 'Revenue allocation challenges'] },
    { title: 'Creation of States in Nigeria', description: 'Reasons, factors, history.', order: 45, subtopics: ['Reasons', 'Factors influencing creation', 'State creation history', 'Advantages', 'Problems'] },
    { title: 'Local Government', description: 'Functions, sources of finance.', order: 46, subtopics: ['Meaning', 'Functions', 'Sources of finance', 'Structure', 'Local government reforms', 'Challenges'] },
    { title: 'The Nigerian Civil War', description: 'Background, causes, political developments.', order: 47, subtopics: ['Background', 'Causes', 'Major political developments', 'Effects on Nigeria', 'Reconciliation and reconstruction'] },
    { title: 'Political Parties in Nigeria', description: 'Parties by period, organisation.', order: 48, subtopics: ['Major parties by political period', 'Party organisation', 'Ideological differences', 'Party competition', 'Coalition and opposition'] },
    { title: 'Electoral Systems', description: 'Plurality, proportional representation.', order: 49, subtopics: ['Meaning', 'Plurality/majority', 'Proportional representation', 'Alternative systems', 'Advantages and limitations'] },
    { title: 'Electoral Commission and Elections', description: 'Management, voter registration.', order: 50, subtopics: ['Electoral management', 'Voter registration', 'Election procedures', 'Election monitoring', 'Electoral offences', 'Importance of credible elections'] },
    { title: 'Pressure Groups and Public Opinion', description: 'Types, methods, media influence.', order: 51, subtopics: ['Types', 'Methods', 'Public opinion', 'Media influence', 'Interest representation', 'Limits'] },
    { title: 'Revision and Examination (SSS 2 Term 2)', description: 'Comprehensive revision.', order: 52, subtopics: ['Comprehensive revision', 'Past questions', 'Essay and objective practice', 'End-of-term examination'] },
    // SSS 2 Third Term
    { title: 'Political Participation', description: 'Forms, voting, party membership.', order: 53, subtopics: ['Meaning', 'Forms', 'Voting', 'Party membership', 'Civil society', 'Community participation'] },
    { title: 'Political Apathy', description: 'Causes, effects, encouraging participation.', order: 54, subtopics: ['Meaning', 'Causes', 'Effects', 'Youth disengagement', 'Ways of encouraging participation'] },
    { title: 'Public Opinion and Mass Media', description: 'Functions, formation, media.', order: 55, subtopics: ['Meaning', 'Media functions', 'Opinion formation', 'Media and elections', 'Responsible journalism', 'Challenges'] },
    { title: 'Public Corporations', description: 'Characteristics, functions, finance.', order: 56, subtopics: ['Meaning', 'Characteristics', 'Functions', 'Sources of finance', 'Advantages', 'Problems and reforms'] },
    { title: 'Civil Service', description: 'Structure, functions, principles.', order: 57, subtopics: ['Meaning', 'Structure', 'Functions', 'Principles', 'Neutrality', 'Permanence', 'Problems and reforms'] },
    { title: 'Public Enterprises and Accountability', description: 'Transparency, auditing, privatisation.', order: 58, subtopics: ['Accountability', 'Transparency', 'Auditing', 'Oversight', 'Efficiency', 'Privatisation and commercialisation'] },
    { title: 'Traditional Institutions', description: 'Traditional rulers, functions, roles.', order: 59, subtopics: ['Traditional rulers', 'Functions', 'Role under colonial rule', 'Role in modern governance', 'Limitations'] },
    { title: 'Constitutionalism and Human Rights', description: 'Rule of law, rights, judicial protection.', order: 60, subtopics: ['Constitutional government', 'Rule of law', 'Rights', 'Judicial protection', 'Civic responsibilities'] },
    { title: 'Revision and Examination Preparation (SSS 2 Term 3)', description: 'Full review, case studies.', order: 61, subtopics: ['Full review', 'Case studies', 'Objective practice', 'Essay practice', 'Mock examination'] },
    // SSS 3 First Term
    { title: 'Nigeria’s Foreign Policy', description: 'Meaning, objectives, principles.', order: 62, subtopics: ['Meaning', 'Objectives', 'Principles', 'Determinants', 'National interest', 'Africa as centrepiece'] },
    { title: 'Factors Influencing Foreign Policy', description: 'Geography, economy, history.', order: 63, subtopics: ['Geography', 'Economy', 'History', 'Leadership', 'Security', 'International environment'] },
    { title: 'Nigeria and International Organisations', description: 'UN, Commonwealth, AU, ECOWAS.', order: 64, subtopics: ['United Nations', 'Commonwealth', 'African Union/OAU', 'ECOWAS', 'OPEC', 'Roles and contributions'] },
    { title: 'Nigeria and ECOWAS', description: 'Formation, objectives, institutions.', order: 65, subtopics: ['Formation', 'Objectives', 'Institutions', "Nigeria's role", 'Regional integration', 'Challenges'] },
    { title: 'Nigeria and African Unity', description: 'OAU, AU, Pan-Africanism.', order: 66, subtopics: ['OAU', 'AU', 'Pan-Africanism', 'Peacekeeping', 'Regional cooperation', 'Challenges'] },
    { title: 'Nigeria and the Commonwealth', description: 'Origin, objectives, membership.', order: 67, subtopics: ['Origin', 'Objectives', 'Membership', 'Benefits', "Nigeria's participation"] },
    { title: 'Nigeria and the United Nations', description: 'Membership, UN organs, peacekeeping.', order: 68, subtopics: ['Membership', 'UN organs', 'Peacekeeping', 'Development cooperation', "Nigeria's contributions"] },
    { title: 'Nigeria and OPEC', description: 'Purpose, membership, petroleum.', order: 69, subtopics: ['Purpose of OPEC', "Nigeria's membership", 'Petroleum and foreign relations', 'Benefits and challenges'] },
    { title: 'International Relations and Global Issues', description: 'Diplomacy, national interest, globalisation.', order: 70, subtopics: ['Diplomacy', 'National interest', 'Globalisation', 'Peace and security', 'Development issues'] },
    { title: 'Revision and Examination (SSS 3 Term 1)', description: 'Comprehensive review.', order: 71, subtopics: ['Comprehensive review', 'Objective practice', 'Essay practice', 'Mock examination'] },
    // SSS 3 Second Term
    { title: 'International Organisations', description: 'Types, functions, global.', order: 72, subtopics: ['Meaning', 'Types', 'Functions', 'Regional and global organisations', 'Benefits and limitations'] },
    { title: 'The United Nations', description: 'Organs, General Assembly, Security Council.', order: 73, subtopics: ['Organs', 'General Assembly', 'Security Council', 'ECOSOC', 'International Court of Justice', 'Specialised agencies'] },
    { title: 'ECOWAS and Regional Integration', description: 'Institutions, economic integration.', order: 74, subtopics: ['Institutions', 'Economic integration', 'Free movement', 'Regional security', 'Challenges'] },
    { title: 'African Union', description: 'Objectives, organs, peace and security.', order: 75, subtopics: ['Objectives', 'Organs', 'Peace and security', 'Economic integration', 'Development programmes'] },
    { title: 'Diplomacy', description: 'Meaning, representation, negotiation.', order: 76, subtopics: ['Meaning', 'Diplomatic representation', 'Negotiation', 'Treaties', 'Consular functions', 'Diplomatic privileges'] },
    { title: 'International Law', description: 'Meaning, sources, treaties.', order: 77, subtopics: ['Meaning', 'Sources', 'Treaties', 'Customary law', 'State responsibility', 'International courts'] },
    { title: 'Foreign Aid and International Cooperation', description: 'Types, purposes, benefits.', order: 78, subtopics: ['Types of aid', 'Purposes', 'Benefits', 'Criticisms', 'Development partnerships'] },
    { title: 'Globalisation', description: 'Features, economic effects, technology.', order: 79, subtopics: ['Meaning', 'Features', 'Economic and political effects', 'Technology', 'Opportunities and challenges'] },
    { title: 'Development and International Relations', description: 'Sustainable development, debt.', order: 80, subtopics: ['Sustainable development', 'Global development cooperation', 'Trade', 'Debt', 'Technology transfer'] },
    { title: 'Revision and Examination (SSS 3 Term 2)', description: 'Past questions, essay writing.', order: 81, subtopics: ['Past-question practice', 'Essay writing', 'Objective revision', 'End-of-term examination'] },
    // SSS 3 Third Term
    { title: 'Comprehensive Review: Political Concepts', description: 'Government, State, Power, Authority.', order: 82, subtopics: ['Government', 'State', 'Power', 'Authority', 'Legitimacy', 'Sovereignty'] },
    { title: 'Comprehensive Review: Systems of Government', description: 'Unitary, Federal, Presidential.', order: 83, subtopics: ['Unitary', 'Federal', 'Presidential', 'Parliamentary', 'Monarchy', 'Republicanism'] },
    { title: 'Comprehensive Review: Nigerian Political Development', description: 'Colonial administration, Nationalism.', order: 84, subtopics: ['Colonial administration', 'Nationalism', 'Constitutional development', 'Military rule', 'Civilian rule'] },
    { title: 'Comprehensive Review: Nigerian Federalism', description: 'Federal structure, Revenue allocation.', order: 85, subtopics: ['Federal structure', 'Revenue allocation', 'State creation', 'Local government', 'Federal character'] },
    { title: 'Comprehensive Review: Elections and Participation', description: 'Political parties, Electoral systems.', order: 86, subtopics: ['Political parties', 'Electoral systems', 'Electoral commission', 'Political participation', 'Political apathy'] },
    { title: 'Comprehensive Review: Institutions', description: 'Legislature, Executive, Judiciary.', order: 87, subtopics: ['Legislature', 'Executive', 'Judiciary', 'Civil service', 'Public corporations', 'Traditional institutions'] },
    { title: 'Comprehensive Review: Principles and Rights', description: 'Rule of law, Separation of powers.', order: 88, subtopics: ['Rule of law', 'Separation of powers', 'Checks and balances', 'Human rights', 'Representative government'] },
    { title: 'Comprehensive Review: Foreign Relations', description: 'Foreign policy, ECOWAS, AU, UN.', order: 89, subtopics: ['Foreign policy', 'ECOWAS', 'AU', 'UN', 'OPEC', 'Commonwealth'] },
    { title: 'SSCE Examination Practice', description: 'Objective questions, Structured questions.', order: 90, subtopics: ['Objective questions', 'Structured questions', 'Essay questions', 'Data and scenario questions', 'Time management'] },
    { title: 'Final Revision and Mock Examination', description: 'Full mock examination, Corrections.', order: 91, subtopics: ['Full mock examination', 'Corrections', 'Weak-area revision', 'Final preparation'] }
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
