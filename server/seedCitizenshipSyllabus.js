require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'citizenship-and-heritage-studies-education', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Citizenship and Heritage Studies Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    { title: 'Introduction to Citizenship and Heritage Studies', description: 'Meaning, scope, and relationship with national identity.', order: 1, subtopics: ['Meaning of citizenship and heritage', 'Relationship between citizenship, heritage and national identity', 'Scope and components of Citizenship and Heritage Studies', 'Importance of citizenship and heritage education', 'Differences between citizenship and heritage'] },
    { title: 'Origin and Acquisition of Citizenship', description: 'Birth, registration, naturalisation, and legal provisions.', order: 2, subtopics: ['Citizenship by birth', 'Honorary citizenship', 'Citizenship by registration', 'Legal provisions governing Nigerian citizenship', 'Citizenship by naturalisation', 'Loss, renunciation and restoration of citizenship'] },
    { title: 'Rights of Citizens', description: 'Human rights, constitutional rights, privileges, and limitations.', order: 3, subtopics: ['Meaning of human rights and constitutional rights', 'Rights and privileges: similarities and differences', 'Universal human rights', 'Limitations to the exercise of rights', 'Fundamental rights of Nigerian citizens', 'Institutions responsible for protecting rights'] },
    { title: 'Duties and Obligations of Citizens', description: 'Civic duties, obedience to law, taxes, and service.', order: 4, subtopics: ['Civic duties and responsibilities', 'Loyalty to the nation', 'Obedience to the law', 'Protection of public property', 'Payment of taxes and levies', 'Community participation and service'] },
    { title: 'National Symbols and Their Meanings', description: 'Flag, coat of arms, anthem, pledge, and currency.', order: 5, subtopics: ['The Nigerian flag', 'The Nigerian currency', 'The coat of arms', 'National identity and constitutional symbols', 'The national anthem', 'Meaning and significance of national symbols', 'The national pledge'] },
    { title: 'Nigerian Cultural Heritage', description: 'Types of heritage, languages, dress, festivals, and sites.', order: 6, subtopics: ['Meaning and types of cultural heritage', 'Festivals, music, dance and oral traditions', 'Languages and indigenous knowledge', 'Historical monuments and heritage sites', 'Traditional dress, food and crafts', 'Importance of cultural diversity'] },
    { title: 'Preservation of Nigerian Heritage', description: 'Importance, role of families, government, and museums.', order: 7, subtopics: ['Meaning and importance of heritage preservation', 'Museums, archives and documentation', 'Role of families and communities', 'Preservation of languages and indigenous practices', 'Role of government and cultural institutions', 'Responsible use of heritage resources'] },
    { title: 'Threats to National Heritage', description: 'Urbanisation, conflict, corruption, and protection strategies.', order: 8, subtopics: ['Urbanisation and modernisation', 'Conflict and destruction', 'Globalisation and cultural change', 'Corruption and illegal removal of heritage materials', 'Neglect and inadequate maintenance', 'Strategies for protecting national heritage'] },
    { title: 'Revision, Assessment and Civic Project', description: 'Review of first-term concepts and national symbols project.', order: 9, subtopics: ['Review of first-term concepts', 'National symbols project', 'Short-answer and objective assessment', 'Class discussion on responsible citizenship', 'Heritage identification activity'] },
    // SSS 1 Second Term
    { title: 'Citizenship by Law', description: 'Legal foundations, documentation, and rights created by citizenship.', order: 10, subtopics: ['Legal foundations of Nigerian citizenship', 'Citizenship documentation and civic identity', 'Relevant constitutional provisions', 'Responsible use of citizenship rights', 'Rights and duties created by citizenship'] },
    { title: 'Rule of Law', description: 'Meaning, equality, supremacy, and due process.', order: 11, subtopics: ['Meaning of rule of law', 'Fair hearing and due process', 'Equality before the law', 'Importance of rule of law in society', 'Supremacy of law', 'Consequences of lawlessness'] },
    { title: 'Democratic Values', description: 'Democracy, freedom, tolerance, accountability, and majority rule.', order: 12, subtopics: ['Meaning and features of democracy', 'Accountability and transparency', 'Freedom and participation', 'Majority rule and minority rights', 'Tolerance and respect for differences', 'Democratic values in school and community'] },
    { title: 'National Unity and Integration', description: 'Factors, symbols, and strategies for promoting unity.', order: 13, subtopics: ['Meaning of national unity and integration', 'Inter-ethnic and inter-religious cooperation', 'Factors that promote unity', 'Challenges to national integration', 'National symbols as instruments of unity', 'Strategies for promoting unity'] },
    { title: 'Ethnic and Religious Heritage of Nigeria', description: 'Communities, religious diversity, and cultural similarities.', order: 14, subtopics: ['Major cultural and ethnic communities', 'Respect for pluralism', 'Religious diversity in Nigeria', 'Intercultural understanding', 'Cultural similarities and differences', 'Heritage as a resource for national cohesion'] },
    { title: 'Interpersonal Relations and Social Harmony', description: 'Respect, empathy, peaceful coexistence, and conflict resolution.', order: 15, subtopics: ['Meaning of interpersonal relations', 'Causes of interpersonal conflict', 'Respect, empathy and cooperation', 'Negotiation, mediation and reconciliation', 'Peaceful coexistence', 'Building harmonious communities'] },
    { title: 'Leadership and Followership', description: 'Qualities, duties, and examples of responsible leadership.', order: 16, subtopics: ['Meaning of leadership and followership', 'Leadership and service', 'Qualities of responsible leaders', 'Examples of leadership in Nigerian history', 'Duties and qualities of good followers', 'Responsible youth leadership'] },
    { title: 'Corruption and Its Effects on Citizenship', description: 'Forms, causes, effects, and prevention of corruption.', order: 17, subtopics: ['Meaning of corruption', 'Effects on citizens and national development', 'Forms and examples of corruption', 'Prevention and accountability', 'Causes of corruption', "Citizens' role in resisting corruption"] },
    { title: 'Revision, Assessment and Civic Practice', description: 'Review of second-term concepts and leadership exercise.', order: 18, subtopics: ['Review of second-term concepts', 'Leadership and followership exercise', 'Case-study discussion', 'Term assessment', 'Conflict-resolution activity'] },
    // SSS 1 Third Term
    { title: 'Global Citizenship', description: 'Globalisation, responsibilities, and rights of global citizens.', order: 19, subtopics: ['Meaning of global citizenship', 'Responsibilities of a global citizen', 'Globalisation and interconnectedness', 'Local actions with global effects', 'Rights of a global citizen'] },
    { title: 'Citizenship Education in Other Countries', description: 'Education in US, UK, South Africa, and Ghana.', order: 20, subtopics: ['Citizenship education in the United States', 'Citizenship education in South Africa', 'Citizenship education in the United Kingdom', 'Similarities and differences in citizenship education', 'Citizenship education in Ghana', 'Lessons for Nigerian citizenship education'] },
    { title: 'International Organisations and Citizenship', description: 'UN, African Union, ECOWAS, and Commonwealth.', order: 21, subtopics: ['United Nations: purpose and citizenship relevance', 'Commonwealth', 'African Union', 'International cooperation and peace', 'ECOWAS', 'Responsibilities of member states'] },
    { title: 'Protection of Human Rights', description: 'NHRC, judiciary, civil society, and international mechanisms.', order: 22, subtopics: ['Human rights protection in Nigeria', 'Role of civil society and NGOs', 'National Human Rights Commission', 'Regional and international human-rights mechanisms', 'Role of the judiciary', 'Reporting and responding to violations'] },
    { title: 'Cultural Exchange and Tourism', description: 'Forms of tourism, benefits, and heritage preservation.', order: 23, subtopics: ['Meaning of cultural exchange', 'Tourism and economic development', 'Meaning and forms of tourism', 'Tourism and heritage preservation', 'Benefits of cultural exchange', 'Responsible cultural tourism'] },
    { title: 'Contemporary Issues in Citizenship', description: 'Migration, digital citizenship, and climate change.', order: 24, subtopics: ['Migration and citizenship', 'Citizenship in an interconnected world', 'Digital citizenship', 'Responsible responses to contemporary issues', 'Climate change and citizenship'] },
    { title: 'Patriotism', description: 'Meaning, unpatriotic behaviours, and national development.', order: 25, subtopics: ['Meaning of patriotism', 'Patriotic and unpatriotic behaviours', 'Patriotism and national identity', 'Ways students can demonstrate patriotism', 'Patriotism and national development'] },
    { title: 'Civic Participation', description: 'Voting, volunteering, community service, and active citizenship.', order: 26, subtopics: ['Meaning and forms of civic participation', 'Volunteering', 'Voting and responsible electoral participation', 'Participation in school and community decisions', 'Community service', 'Benefits of active citizenship'] },
    { title: 'SSS1 Consolidation and Project', description: 'Revision, portfolio, and community-service project.', order: 27, subtopics: ['Revision of SSS1 concepts', 'Community-service project', 'Citizenship portfolio', 'End-of-session assessment', 'Heritage documentation project'] },
    // SSS 2 First Term
    { title: 'Nigerian Constitution', description: 'Purpose, historical development, sources, and supremacy.', order: 28, subtopics: ['Meaning and purpose of a constitution', 'Structure and features of the Constitution', 'Historical development of Nigerian constitutions', 'Constitutional supremacy', 'Sources of the Nigerian Constitution', 'Importance of the Constitution'] },
    { title: 'Fundamental Objectives and Directive Principles', description: 'Political, economic, social, and cultural objectives.', order: 29, subtopics: ['Meaning and purpose', 'Social objectives', 'Political objectives', 'Educational and cultural objectives', 'Economic objectives', 'Importance to governance and citizenship'] },
    { title: 'Separation of Powers', description: 'Executive, legislature, judiciary, checks and balances.', order: 30, subtopics: ['Meaning and purpose', 'The Judiciary', 'The Executive', 'Checks and balances', 'The Legislature', 'Importance of separation of powers'] },
    { title: 'Public Service and Citizenship', description: 'Civil service, roles, accountability, and improvement.', order: 31, subtopics: ['Meaning of public service', 'Duties and responsibilities of public servants', 'Meaning of civil service', 'Public accountability', 'Roles and functions of the civil service', 'Challenges and improvement of public service'] },
    { title: 'Nigerian Heritage Sites', description: 'Major sites, UNESCO sites, museums, and national parks.', order: 32, subtopics: ['Meaning of heritage sites', 'National museums and cultural institutions', 'Major Nigerian heritage sites', 'National parks and protected heritage', 'UNESCO heritage sites associated with Nigeria', 'Importance and preservation of heritage sites'] },
    { title: 'Traditional Institutions', description: 'Rulers, community governance, and modern government relations.', order: 33, subtopics: ['Meaning of traditional institutions', 'Traditional institutions and community governance', 'Traditional rulers and leadership structures', 'Relationship with modern government', 'Roles of chiefs, kings, emirs, obas and obis', 'Contemporary relevance and challenges'] },
    { title: 'Colonial Heritage', description: 'Administrative structures, effects, and historical legacies.', order: 34, subtopics: ['Meaning of colonial heritage', 'Effects on culture and society', 'Colonial administrative structures', 'Positive and negative historical legacies', 'Effects on Nigerian political institutions', 'Lessons for contemporary Nigeria'] },
    { title: 'Preservation of Historical Records', description: 'Oral history, archives, digital preservation, and museums.', order: 35, subtopics: ['Meaning and importance of historical records', 'Oral history and documentation', 'Archives and archival materials', 'Digital preservation', 'Museums and libraries', 'Responsibilities of institutions and citizens'] },
    { title: 'Revision and Examination Preparation', description: 'Review of constitutional concepts, heritage, and institutions.', order: 36, subtopics: ['Review of constitutional concepts', 'Colonial heritage', 'Heritage-site review', 'Practice questions and assessment', 'Traditional institutions'] },
    // SSS 2 Second Term
    { title: 'Governance and Citizenship', description: 'Good governance, systems, participation, and accountability.', order: 37, subtopics: ['Meaning of governance', 'Citizenship and accountability', 'Principles of good governance', 'Participation in governance', 'Systems and forms of governance', 'Transparency and responsiveness'] },
    { title: 'Federalism in Nigeria', description: 'Meaning, division of powers, structure, and national unity.', order: 38, subtopics: ['Meaning of federalism', 'Division of powers', 'Features of a federal system', 'Advantages and challenges', 'Structure of Nigerian federalism', 'Federalism and national unity'] },
    { title: 'Human Rights Violations', description: 'Causes, effects, remedies, and role of courts.', order: 39, subtopics: ['Meaning and examples of violations', 'Remedies and legal protection', 'Causes of rights violations', 'Role of courts and human-rights bodies', 'Effects on individuals and society', 'Preventing rights violations'] },
    { title: 'Civil Society and Non-Governmental Organisations', description: 'Types of NGOs, advocacy, and community development.', order: 40, subtopics: ['Meaning of civil society', 'Advocacy and public awareness', 'Meaning and types of NGOs', 'Community development and service', 'Roles in democracy', 'Accountability and responsible civic action'] },
    { title: 'Security and Citizenship', description: 'Police, armed forces, civil-defence, and citizens roles.', order: 41, subtopics: ['Meaning of national and community security', 'Roles of civil-defence and related agencies', 'Roles of the Nigeria Police Force', "Citizens' roles in maintaining security", 'Roles of the Armed Forces', 'Responsible reporting and cooperation'] },
    { title: 'Nigerian Foreign Policy', description: 'Principles, ECOWAS, African states, and peacekeeping.', order: 42, subtopics: ['Meaning of foreign policy', 'Regional cooperation through ECOWAS', 'Principles and objectives', 'Relations with international organisations', "Nigeria's relations with African states", 'Peacekeeping and international cooperation'] },
    { title: 'Citizenship in a Digital Age', description: 'Digital citizenship, privacy, cybercrime, and ethics.', order: 43, subtopics: ['Meaning of digital citizenship', 'Privacy and data protection', 'Digital rights and responsibilities', 'Responsible social-media behaviour', 'Cybercrime and online harm', 'Digital ethics and online safety'] },
    { title: 'Citizenship and Heritage Case Studies', description: 'Contributions to national development and civic initiatives.', order: 44, subtopics: ['Nigerian citizens who contributed to national development', 'Community-based citizenship initiatives', 'Examples of heritage preservation', 'Critical reflection on responsible citizenship', 'Lessons from civic role models'] },
    { title: 'Revision and Examination Preparation (SSS 2 Term 2)', description: 'Review, case studies, and objective test practice.', order: 45, subtopics: ['Review of second-term topics', 'Objective test practice', 'Case-study exercises', 'Term assessment', 'Structured-response practice'] },
    // SSS 2 Third Term
    { title: 'Democratic Institutions in Nigeria', description: 'INEC, judiciary, legislature, and political parties.', order: 46, subtopics: ['Meaning of democratic institutions', 'The judiciary', 'Independent National Electoral Commission', 'Legislative institutions', 'Political parties', 'Importance of institutional independence'] },
    { title: 'Elections and Citizenship', description: 'Processes, voter registration, duties, and peaceful elections.', order: 47, subtopics: ['Meaning and importance of elections', 'Duties of voters', 'Electoral processes', 'Responsible electoral citizenship', 'Voter registration and participation', 'Importance of peaceful elections'] },
    { title: 'Electoral Malpractices', description: 'Forms, vote buying, violence, effects, and prevention.', order: 48, subtopics: ['Meaning and forms of electoral malpractice', 'Violence and intimidation', 'Vote buying and inducement', 'Effects on democracy', 'Multiple voting and impersonation', 'Prevention and reporting mechanisms'] },
    { title: 'Media and Citizenship', description: 'Role of press, freedom of expression, and misinformation.', order: 49, subtopics: ['Role of the press in democracy', 'Social media and civic communication', 'Freedom of expression', 'Misinformation and disinformation', 'Media responsibility', 'Responsible media consumption'] },
    { title: 'Nigerian Cultural Heritage in Global Context', description: 'Nollywood, music, fashion, arts, and cultural diplomacy.', order: 50, subtopics: ['Nollywood and cultural representation', 'Nigerian fashion and arts', 'Nigerian music and creative industries', 'Cultural diplomacy', 'Nigerian literature', 'Global opportunities and challenges'] },
    { title: 'Civic Challenges', description: 'Drug abuse, cultism, malpractice, violence, and prevention.', order: 51, subtopics: ['Drug abuse as a social challenge', 'Violence and intolerance', 'Cultism and its effects', 'Peer pressure and responsible choices', 'Examination malpractice', "Citizens' roles in prevention"] },
    { title: 'National Development', description: 'Human capital, civic responsibility, and active citizenship.', order: 52, subtopics: ['Meaning of national development', 'Community development', 'Human capital and civic responsibility', 'Public accountability and development', 'Role of active citizenship', 'National development and heritage'] },
    { title: 'Environmental Citizenship', description: 'Climate change, waste management, pollution, and conservation.', order: 53, subtopics: ['Meaning of environmental citizenship', 'Pollution and environmental responsibility', 'Climate change', 'Conservation of natural resources', 'Waste management', 'Sustainable living'] },
    { title: 'SSS2 Consolidation and Assessment', description: 'Revision, mock participation, and case-study assessment.', order: 54, subtopics: ['Revision of SSS2 concepts', 'Case-study assessment', 'Mock civic participation activity', 'End-of-session examination', 'Heritage and environmental project'] },
    // SSS 3 First Term
    { title: 'Review of Citizenship Concepts', description: 'Consolidation of concepts, rights, democracy, and national unity.', order: 55, subtopics: ['Consolidation of key SSS1 and SSS2 concepts', 'Heritage, identity and national unity', 'Citizenship rights and responsibilities', 'Human rights and civic participation', 'Democracy, rule of law and governance'] },
    { title: 'National Identity and Citizenship', description: 'Unity, symbols, values, and ways of strengthening identity.', order: 56, subtopics: ['Meaning of national identity', 'National symbols and shared values', 'National unity and national consciousness', 'Challenges to national identity', 'Components of national identity', 'Ways of strengthening national identity'] },
    { title: 'Global Peace and Citizenship', description: 'Peacekeeping, conflict prevention, and humanitarian responsibility.', order: 57, subtopics: ['Meaning of peace and peacekeeping', 'Humanitarian responsibility', "Nigeria's role in regional peace efforts", 'International cooperation for peace', 'Conflict prevention and mediation', 'Citizenship and peaceful coexistence'] },
    { title: 'Justice and Fairness', description: 'Equity, rule of law, discrimination, and promoting fairness.', order: 58, subtopics: ['Meaning of social justice', 'Access to justice', 'Equity and equality', 'Discrimination and exclusion', 'Rule of law and fair hearing', 'Promoting fairness in society'] },
    { title: 'Heritage in Modern Nigeria', description: 'Tradition, challenges, modernisation, and preserving heritage.', order: 59, subtopics: ['Meaning and types of heritage', 'Challenges facing heritage in modern Nigeria', 'Influence of tradition on contemporary life', 'Modernisation and cultural continuity', 'Heritage and national identity', 'Ways of preserving heritage'] },
    { title: 'Civic Entrepreneurship', description: 'Objectives, innovation, examples, and youth participation.', order: 60, subtopics: ['Meaning of civic entrepreneurship', 'Examples of civic initiatives', 'Objectives and importance', 'Differences between civic and business entrepreneurship', 'Civic innovation and community problem-solving', 'Youth participation in civic innovation'] },
    { title: 'Ethics and Integrity', description: 'Conflicts of interest, accountability, and ethical behaviour.', order: 61, subtopics: ['Meaning of ethics and integrity', 'Conflicts of interest', 'Importance in personal and public life', 'Challenges to ethical behaviour', 'Integrity in leadership and governance', 'Promoting integrity and accountability'] },
    { title: 'National Rebirth and Transformation', description: 'Transformation agenda, citizen participation, and national renewal.', order: 62, subtopics: ['Meaning of national rebirth', 'Government initiatives and public programmes', 'Meaning of transformation agenda', 'Citizen participation', 'Citizenship and national renewal', 'Responsibilities for national development'] },
    { title: 'Revision and Examination Preparation (SSS 3 Term 1)', description: 'Integrated revision, essays, and mock assessment.', order: 63, subtopics: ['Integrated revision of SSS1–SSS3 concepts', 'Essay and structured-response practice', 'Past-question style practice', 'Mock assessment'] },
    // SSS 3 Second Term
    { title: 'Global Issues in Citizenship', description: 'Terrorism, migration, climate change, and global inequality.', order: 64, subtopics: ['Terrorism and violent extremism as global issues', 'Global inequality', 'Migration and displacement', 'International cooperation', 'Climate change', 'Responsible global citizenship'] },
    { title: 'Nigeria\'s Role in International Affairs', description: 'UN, African Union, ECOWAS, diplomacy, and integration.', order: 65, subtopics: ['Nigeria and the United Nations', 'Peacekeeping and diplomacy', 'Nigeria and the African Union', 'Regional integration', 'Nigeria and ECOWAS', 'Benefits and responsibilities of international cooperation'] },
    { title: 'Human Rights Protection in Nigeria', description: 'NHRC, NGOs, judiciary, and citizens responsibilities.', order: 66, subtopics: ['Constitutional protection of rights', 'Role of NGOs and civil society', 'National Human Rights Commission', 'Remedies for rights violations', 'Role of the judiciary', "Citizens' responsibilities in protecting dignity and rights"] },
    { title: 'Sustainable Development Goals', description: 'SDG themes, relevance to Nigeria, and community-level action.', order: 67, subtopics: ['Meaning and purpose of the SDGs', 'Citizenship and sustainable development', 'Major SDG themes', 'Community-level action', 'Relevance of the SDGs to Nigeria', 'Monitoring progress and accountability'] },
    { title: 'Youth and Citizenship', description: 'Democracy, volunteering, leadership, and digital platforms.', order: 68, subtopics: ['Role of young people in democracy', 'Volunteering and service', 'Youth leadership and participation', 'Responsible use of digital platforms', 'Innovation and entrepreneurship for community benefit', 'Barriers to youth civic participation'] },
    { title: 'Challenges of Nigerian Citizenship', description: 'Corruption, insecurity, unemployment, and ethnic tensions.', order: 69, subtopics: ['Corruption', 'Unemployment and social pressures', 'Insecurity', 'Ethnic and religious tensions', 'Poor accountability and weak civic trust', 'Citizen and institutional responses'] },
    { title: 'Strategies for Strengthening Citizenship', description: 'Civic education, families, media, legislation, and trust.', order: 70, subtopics: ['Civic and citizenship education', 'Community participation', 'Role of families and schools', 'Media and public awareness', 'Legislation and institutions', 'Building trust and responsibility'] },
    { title: 'Civic Competence for Nation Building', description: 'Civic literacy, critical thinking, problem-solving, and decision-making.', order: 71, subtopics: ['Knowledge and civic literacy', 'Leadership and service', 'Critical thinking and responsible communication', 'Ethical decision-making', 'Problem-solving and collaboration', 'Skills and values for national development'] },
    { title: 'Revision and Examination Preparation (SSS 3 Term 2)', description: 'Comprehensive revision, essay, and case-study practice.', order: 72, subtopics: ['Comprehensive revision', 'Essay and case-study practice', 'Objective questions', 'Mock examination'] },
    // SSS 3 Third Term
    { title: 'Consolidation of Citizenship Education', description: 'Major themes, rights, duties, and democracy.', order: 73, subtopics: ['Major themes across SSS1–SSS3', 'Heritage and national identity', 'Rights, duties and responsibilities', 'Human rights, peace and development', 'Democracy, governance and participation'] },
    { title: 'National Consciousness', description: 'Meaning, attitudes, challenges, and shared identity.', order: 74, subtopics: ['Meaning of national consciousness', 'Building responsible national attitudes', 'Importance to national development', 'Challenges to national consciousness', 'National values and shared identity', 'Practical ways to develop it'] },
    { title: 'Civic Roles After Secondary School', description: 'Voting, community service, volunteering, and public institutions.', order: 75, subtopics: ['Voting and civic participation', 'Respect for law and public institutions', 'Community service', 'Responsible use of rights and freedoms', 'Volunteering', 'Continuing civic learning'] },
    { title: 'Global Citizenship and the Future of Nigeria', description: 'Active citizenship, interdependence, and cross-cultural understanding.', order: 76, subtopics: ['Active citizenship in a globalised world', "Nigeria's place in the global community", 'Technology and global interdependence', 'Cross-cultural understanding', 'Global opportunities and responsibilities', 'Preparing for responsible global participation'] },
    { title: 'Legacy of Nigerian Heritage', description: 'Continuity, modernization, historical memory, and passing heritage.', order: 77, subtopics: ['Continuity of cultural practices', 'Heritage education', 'Preservation and modernization', 'Role of museums, archives and communities', 'Historical memory and identity', 'Passing heritage to future generations'] },
    { title: 'Mock Citizenship Project', description: 'Selecting an issue, research, presentation, and evaluation.', order: 78, subtopics: ['Selecting a civic or heritage issue', 'Presentation and reflection', 'Research and evidence gathering', 'Evaluation of project impact', 'Planning a community or school project'] },
    { title: 'SSCE and Examination Preparation', description: 'Revision, case-study interpretation, and time management.', order: 79, subtopics: ['Revision of core concepts', 'Case-study interpretation', 'Objective-test practice', 'Examination techniques and time management', 'Essay and structured-response practice'] },
    { title: 'Life After School: Civic Responsibilities', description: 'Rights as young adults, digital citizenship, and lawful conduct.', order: 80, subtopics: ['Rights and responsibilities as young adults', 'Responsible digital citizenship', 'Further education and work', 'Public service and volunteering', 'Community participation', 'Personal integrity and lawful conduct'] },
    { title: 'Final Revision and Assessment', description: 'Full-course revision, mock examination, and transition.', order: 81, subtopics: ['Full-course revision', 'Final project reflection', 'Integrated mock examination', 'Preparation for transition beyond secondary school', 'Correction and feedback'] }
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
