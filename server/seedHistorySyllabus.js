require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'history', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'History Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    { title: 'Introduction to History', description: 'Meaning, scope, and sources of history.', order: 1, subtopics: ['Meaning and scope of history', 'History as a discipline', 'Sources of history', 'Primary and secondary sources', 'Importance of studying history', 'History and other social sciences'] },
    { title: 'Pre-colonial Nigerian Societies', description: 'Major ethnic groups, state formation.', order: 2, subtopics: ['Meaning of pre-colonial society', 'Major ethnic groups and states', 'Political organisation', 'Economic activities', 'Social organisation', 'Religion and culture'] },
    { title: 'Early States and Civilisations in Nigeria', description: 'Kanem-Borno, Hausa, Oyo, Benin.', order: 3, subtopics: ['Kanem-Borno', 'Hausa city-states', 'Oyo Empire', 'Benin Kingdom', 'Igbo societies', 'Nupe and other states'] },
    { title: 'Kanem-Borno Empire', description: 'Origins, development, and Mai Idris.', order: 4, subtopics: ['Origins and development', 'Political organisation', 'Economic activities', 'Islam and scholarship', 'Mai Idris Alooma', 'Relations with neighbouring societies'] },
    { title: 'Hausa City-States', description: 'Origins, Kano, Katsina, Zazzau.', order: 5, subtopics: ['Origins', 'Kano', 'Katsina', 'Zazzau', 'Gobir', 'Economic and political organisation', 'Islamic influence'] },
    { title: 'Oyo Empire', description: 'Origins, political structure, decline.', order: 6, subtopics: ['Origins', 'Political structure', 'Alafin and Oyo Mesi', 'Military organisation', 'Economy', 'Decline of Oyo'] },
    { title: 'Benin Kingdom', description: 'Origins, Oba, trade, conquest.', order: 7, subtopics: ['Origins', 'Oba and political organisation', 'Art and craftsmanship', 'Trade', 'European contacts', 'Decline and British conquest'] },
    { title: 'Igbo Traditional Political System', description: 'Village organisation, Age grades.', order: 8, subtopics: ['Village organisation', 'Age grades', 'Ozo title', 'Assemblies', 'Economic life', 'Social and religious institutions'] },
    { title: 'Pre-colonial Economy', description: 'Agriculture, trade, mining.', order: 9, subtopics: ['Agriculture', 'Fishing', 'Crafts', 'Mining', 'Local and long-distance trade', 'Markets and trade routes'] },
    { title: 'Revision and Assessment (SSS 1 Term 1)', description: 'Timeline practice, source interpretation.', order: 10, subtopics: ['Timeline practice', 'Map work', 'Source interpretation', 'Essay questions', 'End-of-term assessment'] },
    // SSS 1 Second Term
    { title: 'Trans-Saharan Trade', description: 'Routes, goods, effects.', order: 11, subtopics: ['Meaning', 'Routes', 'Goods exchanged', 'Major trading centres', 'Effects on West African societies', 'Decline and transformation'] },
    { title: 'Islam in West Africa', description: 'Introduction, spread, effects.', order: 12, subtopics: ['Introduction and spread', 'Trade and scholarship', 'Islamic states', 'Effects on politics', 'Effects on culture and education'] },
    { title: 'Christianity and Early European Contacts', description: 'Portuguese, missionaries.', order: 13, subtopics: ['Early contacts', 'Portuguese influence', 'Missionaries', 'Coastal trade', 'Christian missions', 'Consequences'] },
    { title: 'Atlantic Slave Trade', description: 'Origins, organisation, abolition.', order: 14, subtopics: ['Meaning', 'Origins', 'Organisation', 'Major participants', 'Effects on West Africa', 'Abolition'] },
    { title: 'Legitimate Trade', description: 'Transition, palm oil, effects.', order: 15, subtopics: ['Meaning', 'Transition from slave trade', 'Palm oil and other commodities', 'European merchants', 'Effects on West African economies'] },
    { title: 'European Exploration of West Africa', description: 'Reasons, explorers, mapping.', order: 16, subtopics: ['Reasons for exploration', 'Explorers', 'Mapping and geographical knowledge', 'Missionary activities', 'Commercial interests'] },
    { title: '19th-Century Jihad and State Formation', description: 'Usman dan Fodio, Sokoto Caliphate.', order: 17, subtopics: ['Usman dan Fodio', 'Sokoto Caliphate', 'Causes of the jihad', 'Political organisation', 'Social and economic effects'] },
    { title: 'Sokoto Caliphate', description: 'Structure, Emirates, administration.', order: 18, subtopics: ['Structure', 'Emirates', 'Administration', 'Economy', 'Islamic scholarship', 'Relations with neighbouring societies'] },
    { title: '19th-Century Yoruba and Other Political Developments', description: 'Yoruba wars, Ibadan, Dahomey.', order: 19, subtopics: ['Yoruba wars', 'Ibadan', 'Dahomey and neighbouring states', 'Trade and diplomacy', 'Political changes'] },
    { title: 'Revision and Examination (SSS 1 Term 2)', description: 'Source-based questions, essay practice.', order: 20, subtopics: ['Comprehensive review', 'Source-based questions', 'Essay practice', 'End-of-term examination'] },
    // SSS 1 Third Term
    { title: 'British Penetration of West Africa', description: 'Reasons, commercial, treaties.', order: 21, subtopics: ['Reasons for European imperialism', 'British commercial interests', 'Missionary interests', 'Exploration', 'Treaties and diplomacy'] },
    { title: 'Colonialism and Imperialism', description: 'Motives, Berlin Conference.', order: 22, subtopics: ['Meaning', 'Motives', 'Methods of expansion', 'Berlin Conference', 'Partition of Africa', 'Consequences'] },
    { title: 'British Colonial Administration in Nigeria', description: 'Amalgamation, officials.', order: 23, subtopics: ['Amalgamation background', 'Indirect rule', 'Native authorities', 'Colonial officials', 'Administrative structure'] },
    { title: 'Indirect Rule', description: 'Operation in North, West, East.', order: 24, subtopics: ['Meaning', 'Reasons for adoption', 'Operation in Northern Nigeria', 'Operation in Western Nigeria', 'Problems in Eastern Nigeria', 'Successes and limitations'] },
    { title: 'Colonial Economy', description: 'Cash crops, mining, railways, taxation.', order: 25, subtopics: ['Cash crops', 'Mining', 'Railways and roads', 'Taxation', 'Trade', 'Economic consequences'] },
    { title: 'Colonial Social and Educational Policies', description: 'Mission schools, health, urbanisation.', order: 26, subtopics: ['Mission schools', 'Western education', 'Urbanisation', 'Health services', 'Social change', 'Limitations'] },
    { title: 'Resistance to Colonial Rule', description: 'Forms of resistance, military, revolts.', order: 27, subtopics: ['Forms of resistance', 'Military resistance', 'Diplomatic resistance', 'Local revolts', 'Reasons for resistance'] },
    { title: 'Women and Society in Pre-colonial and Colonial Nigeria', description: 'Economic roles, resistance.', order: 28, subtopics: ['Economic roles', 'Political roles', 'Social organisation', 'Women in resistance', 'Changes under colonial rule'] },
    { title: 'Revision (SSS 1 Term 3)', description: 'Map work, chronology, source analysis.', order: 29, subtopics: ['Colonial map work', 'Chronology', 'Source analysis', 'Essay practice'] },
    { title: 'End-of-Term Examination', description: 'Comprehensive assessment.', order: 30, subtopics: ['Comprehensive assessment'] },
    // SSS 2 First Term
    { title: 'Nationalism in Nigeria', description: 'Meaning, causes, newspapers.', order: 31, subtopics: ['Meaning of nationalism', 'Causes', 'Nationalist newspapers', 'Political associations', 'Educated elite', 'Growth of nationalism'] },
    { title: 'Early Nationalist Leaders', description: 'Macaulay, Azikiwe, Awolowo.', order: 32, subtopics: ['Herbert Macaulay', 'J. E. Casely Hayford and regional context', 'Nnamdi Azikiwe', 'Obafemi Awolowo', 'Ahmadu Bello', 'Contributions'] },
    { title: 'Political Parties and Associations', description: 'NNDP, NCNC, Action Group, NPC.', order: 33, subtopics: ['NNDP', 'NCNC', 'Action Group', "Northern People's Congress", 'Party objectives', 'Regional and national politics'] },
    { title: 'Constitutional Development I', description: 'Clifford, Richards, Macpherson.', order: 34, subtopics: ['Clifford Constitution 1922', 'Richards Constitution 1946', 'Macpherson Constitution 1951', 'Major features', 'Limitations'] },
    { title: 'Constitutional Development II', description: 'Lyttleton, Independence, Republican.', order: 35, subtopics: ['Lyttleton Constitution 1954', 'Federalism', 'Regional government', 'Independence Constitution 1960', 'Republican Constitution 1963'] },
    { title: 'Road to Independence', description: 'Conferences, minority issues.', order: 36, subtopics: ['Nationalist activities', 'Constitutional conferences', 'Regional politics', 'Minority issues', 'Independence negotiations'] },
    { title: 'Independence and the First Republic', description: '1960 independence, 1963 republic.', order: 37, subtopics: ['Independence in 1960', 'Republic in 1963', 'Political institutions', 'Major parties', 'Political crises'] },
    { title: 'The First Military Coup', description: 'Background, 1966 coup, consequences.', order: 38, subtopics: ['Background', 'Political crisis', 'January 1966 coup', 'Immediate consequences', 'Change of government'] },
    { title: 'Civil War', description: 'Causes, developments, reconciliation.', order: 39, subtopics: ['Causes', 'Major developments', 'Humanitarian effects', 'End of war', 'Reconciliation and reconstruction'] },
    { title: 'Revision and Examination (SSS 2 Term 1)', description: 'Chronology, map work.', order: 40, subtopics: ['Chronology', 'Map/source work', 'Essay practice', 'End-of-term examination'] },
    // SSS 2 Second Term
    { title: 'Military Rule in Nigeria', description: 'Reasons, administration, regimes.', order: 41, subtopics: ['Reasons for military intervention', 'Military administration', 'Characteristics', 'Major military regimes', 'Effects'] },
    { title: 'Yakubu Gowon Era', description: 'Background, changes, civil war.', order: 42, subtopics: ['Background', 'Administrative changes', 'Civil war', 'Post-war reconstruction', 'National development policies'] },
    { title: 'Murtala/Obasanjo Transition', description: 'Reforms, 1979 transition.', order: 43, subtopics: ['1975 change of government', 'Administrative reforms', 'State creation', 'Return to civilian rule', '1979 transition'] },
    { title: 'Second Republic', description: '1979 Constitution, Shagari.', order: 44, subtopics: ['1979 Constitution', 'Shehu Shagari administration', 'Political parties', 'Economic issues', 'Crisis and collapse'] },
    { title: 'Buhari and Idiagbon Era', description: '1983 coup, policies, War against indiscipline.', order: 45, subtopics: ['1983 coup', 'Policies', 'War against indiscipline', 'Political administration', 'Transition'] },
    { title: 'Babangida Era', description: 'Reforms, SAP, state creation.', order: 46, subtopics: ['Political reforms', 'Structural Adjustment Programme', 'State creation', 'Transition programme', 'Political developments'] },
    { title: 'Abacha Era', description: 'Administration, developments, 1998 transition.', order: 47, subtopics: ['Military administration', 'Political developments', 'Economic and social issues', 'Transition programme', '1998 transition'] },
    { title: 'Return to Civilian Rule', description: '1999 transition, Fourth Republic.', order: 48, subtopics: ['1998–1999 transition', '1999 Constitution', 'Fourth Republic', 'Democratic institutions', 'Continuity and change'] },
    { title: 'Historical Methods and Source Analysis', description: 'Primary sources, oral history.', order: 49, subtopics: ['Primary sources', 'Oral history', 'Written records', 'Archaeology', 'Evaluating reliability', 'Bias and corroboration'] },
    { title: 'Revision and Examination (SSS 2 Term 2)', description: 'Essay practice.', order: 50, subtopics: ['Comprehensive review', 'Past questions', 'Essay practice', 'End-of-term examination'] },
    // SSS 2 Third Term
    { title: 'West African Nationalism', description: 'Origins, Sierra Leone, Gambia, Ghana.', order: 51, subtopics: ['Origins', 'Nationalist movements', 'Ghana', 'Sierra Leone', 'The Gambia', 'Nigeria and regional nationalism'] },
    { title: 'Kwame Nkrumah and Ghanaian Independence', description: 'Gold Coast, Pan-Africanism.', order: 52, subtopics: ['Nationalism in Gold Coast', 'Nkrumah', "Convention People's Party", '1957 independence', 'Pan-Africanism'] },
    { title: 'Pan-Africanism', description: 'Meaning, congresses, thinkers.', order: 53, subtopics: ['Meaning', 'Origins', 'Key thinkers', 'Congresses', 'Political objectives', 'Impact on independence movements'] },
    { title: 'African Union and OAU', description: 'Formation, structure, achievements.', order: 54, subtopics: ['Formation of OAU', 'Objectives', 'Structure', 'Achievements', 'Limitations', 'Transition to AU'] },
    { title: 'Post-colonial African States', description: 'Nation-building, challenges.', order: 55, subtopics: ['Nation-building', 'Borders', 'Military interventions', 'Political instability', 'Economic challenges', 'Regional cooperation'] },
    { title: 'Apartheid in South Africa', description: 'Origins, system, resistance.', order: 56, subtopics: ['Origins', 'Apartheid system', 'Resistance', 'African National Congress', 'International opposition', 'End of apartheid'] },
    { title: 'Nelson Mandela and Democratic South Africa', description: 'Anti-apartheid, release, 1994.', order: 57, subtopics: ['Early life and political role', 'Anti-apartheid struggle', 'Release and negotiations', '1994 election', 'Reconciliation'] },
    { title: 'African Development Challenges', description: 'Poverty, education, health, conflict.', order: 58, subtopics: ['Poverty', 'Education', 'Health', 'Governance', 'Conflict', 'Development strategies'] },
    { title: 'Revision and Examination Preparation (SSS 2 Term 3)', description: 'African history review.', order: 59, subtopics: ['African history review', 'Source questions', 'Essay practice', 'Mock assessment'] },
    // SSS 3 First Term
    { title: 'European Imperialism in Africa', description: 'Motives, methods, partition.', order: 60, subtopics: ['Motives', 'Methods', 'Berlin Conference', 'Partition', 'Colonial administration', 'Consequences'] },
    { title: 'Colonial Rule and African Responses', description: 'Resistance, collaboration, accommodation.', order: 61, subtopics: ['Resistance', 'Collaboration', 'Accommodation', 'Armed resistance', 'Diplomatic resistance', 'Case studies'] },
    { title: 'Nationalism and Decolonisation', description: 'Political movements, press, trade unions.', order: 62, subtopics: ['Origins', 'Political movements', 'Press', 'Trade unions', 'Youth and students', 'Independence campaigns'] },
    { title: 'Nigeria\'s Path to Independence', description: 'Conferences, federalism, minority.', order: 63, subtopics: ['Nationalist organisations', 'Constitutional conferences', 'Federalism', 'Minority questions', 'Independence'] },
    { title: 'Post-Independence Nigeria', description: 'Republics, military rule, civil war.', order: 64, subtopics: ['First Republic', 'Military rule', 'Civil war', 'Second Republic', 'Later military regimes', 'Return to democracy'] },
    { title: 'Nigerian Foreign Relations', description: 'Foreign policy, UN, Africa, ECOWAS.', order: 65, subtopics: ['Foreign policy', 'Africa', 'Commonwealth', 'United Nations', 'ECOWAS', 'Regional diplomacy'] },
    { title: 'Nigeria and International Organisations (Review)', description: 'UN, AU, ECOWAS, OPEC.', order: 66, subtopics: ['UN', 'AU', 'ECOWAS', 'OPEC', 'Commonwealth', "Nigeria's contributions"] },
    { title: 'Historical Sources and Research', description: 'Oral, written, archaeological.', order: 67, subtopics: ['Oral sources', 'Written sources', 'Archaeological sources', 'Material culture', 'Archives', 'Source criticism'] },
    { title: 'Revision and Examination (SSS 3 Term 1)', description: 'Past questions, chronology.', order: 68, subtopics: ['Past-question practice', 'Chronology', 'Essay structure', 'Source analysis'] },
    { title: 'Mock Examination (SSS 3 Term 1)', description: 'Full assessment, targeted revision.', order: 69, subtopics: ['Full assessment', 'Corrections', 'Targeted revision'] },
    // SSS 3 Second Term
    { title: 'West African Political Development', description: 'Colonial legacies, independence, transitions.', order: 70, subtopics: ['Colonial legacies', 'Independence', 'Political parties', 'Military rule', 'Democratic transitions'] },
    { title: 'Ghana and Nigeria Compared', description: 'Colonial administration, independence.', order: 71, subtopics: ['Colonial administration', 'Nationalism', 'Independence', 'Political development', 'Economic issues', 'Regional relations'] },
    { title: 'African Nationalist Movements', description: 'Organisations, labour, women.', order: 72, subtopics: ['Political organisations', 'Labour movements', 'Youth movements', 'Women in nationalism', 'Mass mobilisation'] },
    { title: 'Pan-Africanism and African Unity (Review)', description: 'Key leaders, AU, ECOWAS.', order: 73, subtopics: ['Key leaders', 'Congresses', 'OAU', 'AU', 'Regional integration', 'Challenges'] },
    { title: 'Apartheid and Liberation in Southern Africa', description: 'Resistance, transitions.', order: 74, subtopics: ['Apartheid', 'Resistance', 'International sanctions', 'Liberation movements', 'Transition'] },
    { title: 'Cold War and Africa', description: 'Superpowers, non-alignment, proxy conflicts.', order: 75, subtopics: ['Meaning of Cold War', 'Superpowers', 'African states', 'Proxy conflicts', 'Non-alignment', 'Consequences'] },
    { title: 'Military Rule and Democracy in Africa', description: 'Causes, effects, civil-military relations.', order: 76, subtopics: ['Reasons for military coups', 'Effects', 'Democratic transitions', 'Civil-military relations', 'Governance challenges'] },
    { title: 'African Economic and Social Development', description: 'Education, health, trade, development.', order: 77, subtopics: ['Education', 'Health', 'Industry', 'Agriculture', 'Trade', 'Development policies'] },
    { title: 'History, Memory and National Identity', description: 'Monuments, narratives, reconciliation.', order: 78, subtopics: ['Historical memory', 'Monuments', 'Museums', 'National narratives', 'Reconciliation', 'Heritage preservation'] },
    // SSS 3 Third Term
    { title: 'Comprehensive Nigerian History Review', description: 'Pre-colonial, trade, colonialism, independence.', order: 79, subtopics: ['Pre-colonial states', 'Trade', 'Colonialism', 'Nationalism', 'Independence', 'Post-independence Nigeria'] },
    { title: 'Comprehensive West African History Review', description: 'Pre-colonial, Islam, slave trade.', order: 80, subtopics: ['Pre-colonial states', 'Islam', 'European contacts', 'Slave trade', 'Colonialism', 'Nationalism'] },
    { title: 'African History Review', description: 'Imperialism, Pan-Africanism, Apartheid.', order: 81, subtopics: ['Imperialism', 'Decolonisation', 'Pan-Africanism', 'Apartheid', 'African unity', 'Development'] },
    { title: 'Historical Interpretation', description: 'Cause and effect, chronology.', order: 82, subtopics: ['Cause and effect', 'Continuity and change', 'Comparison', 'Chronology', 'Historical significance'] },
    { title: 'Source-Based Examination Skills', description: 'Reliability, corroboration.', order: 83, subtopics: ['Primary sources', 'Secondary sources', 'Extract questions', 'Source reliability', 'Corroboration'] },
    { title: 'Essay Writing in History', description: 'Introduction, structure, conclusion.', order: 84, subtopics: ['Introduction', 'Chronological organisation', 'Argument and evidence', 'Cause/effect essays', 'Comparative essays', 'Conclusion'] },
    { title: 'Map and Timeline Skills', description: 'Historical maps, chronology.', order: 85, subtopics: ['Historical maps', 'Routes and boundaries', 'Timelines', 'Chronology', 'Locating historical events'] },
    { title: 'SSCE Past-Question Practice', description: 'Objective, structured, essay.', order: 86, subtopics: ['Objective questions', 'Structured questions', 'Essay questions', 'Source interpretation', 'Correction of errors'] },
    { title: 'Mock Examination and Final Revision', description: 'Full mock, weak-area revision.', order: 87, subtopics: ['Full mock', 'Corrections', 'Weak-area revision', 'Time management'] },
    { title: 'Final Assessment', description: 'Examination preparation.', order: 88, subtopics: ['Final revision', 'Examination preparation', 'Course consolidation'] }
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
