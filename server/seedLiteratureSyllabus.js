require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'literature-in-english', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Literature in English Comprehensive Syllabus',
  description: 'A structured syllabus covering prose, poetry, drama, literary appreciation, African and Nigerian literature, critical reading, creative writing and SSCE preparation.',
  topics: [
    // SSS 1 Term 1
    { title: 'Introduction to Literature', description: 'Meaning and nature of literature.', order: 1, subtopics: ['Meaning and nature of literature', 'Genres of literature', 'Functions of literature', 'Oral and written literature', 'Literature and society', 'Literature as entertainment and education'] },
    { title: 'Literary Genres', description: 'Prose, poetry, drama.', order: 2, subtopics: ['Prose', 'Features of each genre', 'Poetry', 'Differences among genres', 'Drama', 'Basic approaches to literary study'] },
    { title: 'Elements of Prose', description: 'Plot, setting, character.', order: 3, subtopics: ['Plot', 'Theme', 'Setting', 'Conflict', 'Character', 'Narrative techniques', 'Point of view'] },
    { title: 'Elements of Drama', description: 'Plot, action, characters.', order: 4, subtopics: ['Plot and action', 'Stage directions', 'Characters', 'Acts and scenes', 'Dialogue', 'Dramatic conflict', 'Setting'] },
    { title: 'Elements of Poetry', description: 'Speaker, subject matter, theme.', order: 5, subtopics: ['Speaker', 'Mood', 'Subject matter', 'Imagery', 'Theme', 'Rhythm and sound', 'Tone'] },
    { title: 'Figures of Speech I', description: 'Simile, metaphor, personification.', order: 6, subtopics: ['Simile', 'Hyperbole', 'Metaphor', 'Irony', 'Personification', 'Symbolism'] },
    { title: 'Figures of Speech II', description: 'Oxymoron, paradox, euphemism.', order: 7, subtopics: ['Oxymoron', 'Alliteration', 'Paradox', 'Onomatopoeia', 'Euphemism', 'Repetition', 'Pun'] },
    { title: 'Reading and Interpretation', description: 'Close reading, themes, characters.', order: 8, subtopics: ['Close reading', 'Understanding context', 'Identifying themes', 'Making textual inferences', 'Character analysis', 'Supporting interpretations with evidence'] },
    { title: 'Introduction to African Literature', description: 'Oral tradition, folktales.', order: 9, subtopics: ['Oral tradition', 'Myths and legends', 'Folktales', 'African settings and themes', 'Proverbs', 'Colonial and postcolonial perspectives'] },
    { title: 'Revision and Assessment (Term 1)', description: 'Term 1 assessment.', order: 10, subtopics: ['Literary terms review', 'Short-answer practice', 'Genre identification', 'Assessment', 'Passage analysis'] },
    // SSS 1 Term 2
    { title: 'Prose Study I', description: 'Narrative structure, characterisation.', order: 11, subtopics: ['Narrative structure', 'Point of view', 'Characterisation', 'Themes', 'Setting and atmosphere', 'Conflict and resolution'] },
    { title: 'Prose Study II', description: 'Language and style, symbolism.', order: 12, subtopics: ['Language and style', 'Foreshadowing', 'Symbolism', 'Flashback', 'Irony', 'Social and cultural context'] },
    { title: 'Poetry Study I', description: 'Types of poetry, stanza, line.', order: 13, subtopics: ['Types of poetry', 'Rhythm', 'Stanza and line', 'Meter', 'Rhyme', 'Enjambment'] },
    { title: 'Poetry Study II', description: 'Imagery, tone, diction.', order: 14, subtopics: ['Imagery', 'Symbolism', 'Tone and mood', 'Personification', 'Diction', 'Poetic devices'] },
    { title: 'Drama Study I', description: 'Dramatic structure, exposition.', order: 15, subtopics: ['Dramatic structure', 'Climax', 'Exposition', 'Falling action', 'Rising action', 'Resolution'] },
    { title: 'Drama Study II', description: 'Characterisation, dialogue, conflict.', order: 16, subtopics: ['Characterisation', 'Stagecraft', 'Dialogue', 'Dramatic irony', 'Conflict', 'Theme and message'] },
    { title: 'African Poetry and Prose', description: 'African identity, culture.', order: 17, subtopics: ['African identity', 'Postcolonial concerns', 'Culture and tradition', 'Social justice', 'Colonial experience', 'Language and style'] },
    { title: 'Oral Literature', description: 'Folktales, proverbs, songs.', order: 18, subtopics: ['Folktales', 'Proverbs', 'Praise poetry', 'Riddles', 'Songs', 'Oral performance techniques'] },
    { title: 'Literary Appreciation', description: 'Comparing texts and themes.', order: 19, subtopics: ['Comparing texts', 'Style comparison', 'Theme comparison', 'Context and interpretation', 'Character comparison'] },
    { title: 'Revision and Examination (Term 2)', description: 'Term 2 examination.', order: 20, subtopics: ['Genre revision', 'Objective questions', 'Passage-based questions', 'Term assessment', 'Essay practice'] },
    // SSS 1 Term 3
    { title: 'Drama Appreciation', description: 'Reading a play, relationships.', order: 21, subtopics: ['Reading a play', 'Theme', 'Characters and relationships', 'Language', 'Conflict', 'Stage directions'] },
    { title: 'Prose Appreciation', description: 'Plot development, motivation.', order: 22, subtopics: ['Plot development', 'Narrative voice', 'Character motivation', 'Theme', 'Setting', 'Style'] },
    { title: 'Poetry Appreciation', description: 'Central idea, structure, sound.', order: 23, subtopics: ['Central idea', 'Imagery', 'Structure', 'Tone', 'Sound patterns', 'Symbolism'] },
    { title: 'Literary Terms and Techniques', description: 'Allegory, satire, tragic hero.', order: 24, subtopics: ['Allegory', 'Comic relief', 'Satire', 'Suspense', 'Tragic hero', 'Foreshadowing'] },
    { title: 'West African Literature', description: 'Nigerian, Ghanaian literature.', order: 25, subtopics: ['Nigerian literature', 'Cultural identity', 'Ghanaian literature', 'Social criticism', 'Oral traditions', 'Postcolonial themes'] },
    { title: 'Literature and Society', description: 'Gender, class, culture.', order: 26, subtopics: ['Gender and society', 'Religion and belief', 'Class and inequality', 'Politics and power', 'Culture', 'Youth and education'] },
    { title: 'Creative Response to Literature', description: 'Writing poems, stories.', order: 27, subtopics: ['Writing a poem', 'Character diary', 'Short story response', 'Book review', 'Dramatic scene'] },
    { title: 'Critical Reading Skills', description: 'Evidence-based interpretation.', order: 28, subtopics: ['Evidence-based interpretation', 'Comparative analysis', 'Authorial technique', 'Evaluating themes', 'Contextual reading'] },
    { title: 'Revision and Assessment (Term 3)', description: 'Term 3 review.', order: 29, subtopics: ['Comprehensive review', 'Past-question practice', 'Text analysis', 'End-of-year assessment', 'Essay writing'] },
    // SSS 2 Term 1
    { title: 'Revision of SSS1 Literature', description: 'Genres, elements, devices.', order: 30, subtopics: ['Genres', 'Poetry', 'Elements', 'Prose', 'Literary devices', 'Drama'] },
    { title: 'Advanced Prose Analysis', description: 'Narrative perspective, motif.', order: 31, subtopics: ['Narrative perspective', 'Motif', 'Complex characterisation', 'Symbolism', 'Structure', 'Style'] },
    { title: 'Prose Themes and Context', description: 'Family, tradition, conflict.', order: 32, subtopics: ['Family', 'Identity', 'Tradition and modernity', 'Power', 'Conflict', 'Social change'] },
    { title: 'Advanced Poetry Analysis', description: 'Voice, tone, diction.', order: 33, subtopics: ['Voice', 'Tone', 'Diction', 'Mood', 'Imagery', 'Form'] },
    { title: 'Poetic Structure and Sound', description: 'Rhyme schemes, meter, rhythm.', order: 34, subtopics: ['Rhyme schemes', 'Enjambment', 'Meter', 'Caesura', 'Rhythm', 'Sound effects'] },
    { title: 'Advanced Drama Analysis', description: 'Structure, conflict, arcs.', order: 35, subtopics: ['Dramatic structure', 'Conflict', 'Character arcs', 'Irony', 'Subtext', 'Stagecraft'] },
    { title: 'Tragedy and Comedy', description: 'Features, tragic flaw, relief.', order: 36, subtopics: ['Features of tragedy', 'Comic techniques', 'Features of comedy', 'Catharsis', 'Tragic flaw', 'Comic relief'] },
    { title: 'African Drama and Prose', description: 'Nigerian drama, colonialism.', order: 37, subtopics: ['Nigerian drama', 'Colonialism', 'African prose', 'Leadership', 'Tradition and change', 'Social criticism'] },
    { title: 'Literary Criticism', description: 'Close reading, interpretation.', order: 38, subtopics: ['Close reading', 'Critical argument', 'Interpretation', 'Comparing interpretations', 'Evidence'] },
    { title: 'Revision and Examination (SSS 2 Term 1)', description: 'Review and exam.', order: 39, subtopics: ['Objective practice', 'Text revision', 'Essay questions', 'Assessment', 'Passage analysis'] },
    // SSS 2 Term 2
    { title: 'Nigerian Literature', description: 'Historical development, themes.', order: 40, subtopics: ['Historical development', 'Language choices', 'Major themes', 'Social criticism', 'Cultural settings', 'National identity'] },
    { title: 'African Literature in English', description: 'Oral tradition, colonial encounter.', order: 41, subtopics: ['Oral tradition and written literature', 'Culture', 'Colonial encounter', 'Migration', 'Postcolonial identity', 'Social justice'] },
    { title: 'Prose: Comparative Study', description: 'Plot, theme, character comparison.', order: 42, subtopics: ['Plot comparison', 'Theme', 'Character comparison', 'Narrative style', 'Setting', 'Language'] },
    { title: 'Poetry: Comparative Study', description: 'Theme, tone, imagery.', order: 43, subtopics: ['Theme', 'Form', 'Tone', 'Sound', 'Imagery', 'Speaker'] },
    { title: 'Drama: Comparative Study', description: 'Plot, character, conflict.', order: 44, subtopics: ['Plot', 'Setting', 'Character', 'Stagecraft', 'Conflict', 'Theme'] },
    { title: 'Satire and Social Criticism', description: 'Satirical techniques, humour.', order: 45, subtopics: ['Meaning of satire', 'Humour and criticism', 'Satirical techniques', 'Political and social commentary', 'Targets of satire'] },
    { title: 'Irony and Symbolism', description: 'Verbal, situational, dramatic irony.', order: 46, subtopics: ['Verbal irony', 'Symbols', 'Situational irony', 'Motifs', 'Dramatic irony', 'Interpretive significance'] },
    { title: 'Gender and Literature', description: 'Representation, masculinity, roles.', order: 47, subtopics: ['Representation of women', 'Power relations', 'Masculinity', 'Changing social expectations', 'Family roles'] },
    { title: 'Literature and Cultural Values', description: 'Tradition, religion, customs.', order: 48, subtopics: ['Tradition', 'Modernity', 'Religion', 'Cultural conflict', 'Customs', 'Moral values'] },
    { title: 'Revision and Examination (SSS 2 Term 2)', description: 'Review and assessment.', order: 49, subtopics: ['Comparative essays', 'Timed practice', 'Passage questions', 'Assessment', 'Literary terminology'] },
    // SSS 2 Term 3
    { title: 'Prose: Full Text Study', description: 'Plot, characters, themes.', order: 50, subtopics: ['Plot and structure', 'Setting', 'Characters', 'Narrative technique', 'Themes', 'Language and style'] },
    { title: 'Drama: Full Text Study', description: 'Acts, characters, conflict.', order: 51, subtopics: ['Acts and scenes', 'Themes', 'Characters', 'Dialogue', 'Conflict', 'Stage directions'] },
    { title: 'Poetry: Full Text Study', description: 'Form, structure, speaker.', order: 52, subtopics: ['Form', 'Themes', 'Structure', 'Imagery', 'Speaker', 'Sound and diction'] },
    { title: 'Literature and History', description: 'Historical context, colonialism.', order: 53, subtopics: ['Historical context', 'Postcolonial society', 'Colonialism', 'Memory and identity', 'Independence'] },
    { title: 'Literature and Politics', description: 'Power, leadership, oppression.', order: 54, subtopics: ['Power', 'Resistance', 'Leadership', 'Justice', 'Oppression', 'Political symbolism'] },
    { title: 'Literature and Morality', description: 'Good and evil, choices.', order: 55, subtopics: ['Good and evil', 'Justice', 'Choices and consequences', 'Redemption', 'Responsibility', 'Moral ambiguity'] },
    { title: 'Research and Presentation', description: 'Textual research, authors.', order: 56, subtopics: ['Textual research', 'Oral presentation', 'Author background', 'Bibliography basics', 'Contextual research'] },
    { title: 'Creative Writing', description: 'Short story, poetry, drama.', order: 57, subtopics: ['Short story', 'Character development', 'Poetry', 'Dialogue', 'Drama scene', 'Editing'] },
    { title: 'Critical Essay Writing', description: 'Introduction, thesis, analysis.', order: 58, subtopics: ['Introduction', 'Textual evidence', 'Thesis', 'Analysis', 'Paragraph development', 'Conclusion'] },
    { title: 'Revision and Examination (SSS 2 Term 3)', description: 'Final examination prep.', order: 59, subtopics: ['Full review', 'Corrections', 'Past questions', 'Final assessment', 'Mock examination'] },
    // SSS 3 Term 1
    { title: 'Comprehensive Literary Terms', description: 'Genre, plot, character.', order: 60, subtopics: ['Genre', 'Theme', 'Plot', 'Point of view', 'Character', 'Style', 'Setting'] },
    { title: 'Advanced Prose Revision', description: 'Narrative, characterisation.', order: 61, subtopics: ['Narrative techniques', 'Motif', 'Characterisation', 'Conflict', 'Symbolism', 'Context'] },
    { title: 'Advanced Poetry Revision', description: 'Form, diction, imagery.', order: 62, subtopics: ['Form', 'Tone', 'Diction', 'Mood', 'Imagery', 'Sound devices'] },
    { title: 'Advanced Drama Revision', description: 'Structure, character, conflict.', order: 63, subtopics: ['Structure', 'Dialogue', 'Character', 'Irony', 'Conflict', 'Stagecraft'] },
    { title: 'African and Nigerian Literature Review', description: 'Culture, identity, colonialism.', order: 64, subtopics: ['Culture', 'Postcolonialism', 'Identity', 'Tradition and modernity', 'Colonialism', 'Social criticism'] },
    { title: 'Comparative Literature', description: 'Themes, characters, style.', order: 65, subtopics: ['Comparing themes', 'Comparing contexts', 'Comparing characters', 'Similarities and differences', 'Comparing style'] },
    { title: 'Literary Criticism (SSS 3)', description: 'Close reading, interpretation.', order: 66, subtopics: ['Close reading', 'Alternative readings', 'Critical interpretation', 'Evaluating textual choices', 'Argument and evidence'] },
    { title: 'Essay Writing for SSCE', description: 'Planning, thesis, paragraphs.', order: 67, subtopics: ['Planning', 'Quotations and references', 'Thesis statements', 'Conclusion', 'Paragraph structure', 'Time management'] },
    { title: 'Past Questions', description: 'Objective, prose, poetry.', order: 68, subtopics: ['Objective questions', 'Drama passages', 'Prose passages', 'Essay questions', 'Poetry passages'] },
    { title: 'Revision and Mock Examination (Term 1)', description: 'Review and mock.', order: 69, subtopics: ['Comprehensive review', 'Mock examination', 'Timed practice', 'Targeted revision', 'Corrections'] },
    // SSS 3 Term 2
    { title: 'Prescribed Prose Revision', description: 'Plot, themes, style.', order: 70, subtopics: ['Plot', 'Setting', 'Characterisation', 'Style', 'Themes', 'Important passages'] },
    { title: 'Prescribed Drama Revision', description: 'Plot, characters, techniques.', order: 71, subtopics: ['Plot', 'Conflict', 'Characters', 'Dramatic techniques', 'Themes', 'Important scenes'] },
    { title: 'Prescribed Poetry Revision', description: 'Themes, speaker, imagery.', order: 72, subtopics: ['Themes', 'Tone', 'Speaker', 'Form', 'Imagery', 'Poetic devices'] },
    { title: 'Contextual and Cultural Analysis', description: 'Historical setting, values.', order: 73, subtopics: ['Historical setting', 'Authorial context', 'Cultural values', 'Language and audience', 'Social issues'] },
    { title: 'Theme-Based Revision', description: 'Love, conflict, identity.', order: 74, subtopics: ['Love and family', 'Power', 'Conflict', 'Justice', 'Identity', 'Tradition and change'] },
    { title: 'Character-Based Revision', description: 'Major/minor characters.', order: 75, subtopics: ['Major characters', 'Character development', 'Minor characters', 'Character significance', 'Character relationships'] },
    { title: 'Technique-Based Revision', description: 'Irony, symbolism, satire.', order: 76, subtopics: ['Irony', 'Foreshadowing', 'Symbolism', 'Imagery', 'Satire', 'Narrative and dramatic techniques'] },
    { title: 'Comparative Essay Practice', description: 'Comparison, evidence, analysis.', order: 77, subtopics: ['Planning comparison', 'Organisation', 'Evidence', 'Balanced discussion', 'Analysis'] },
    { title: 'SSCE Examination Skills', description: 'Understanding questions.', order: 78, subtopics: ['Understanding questions', 'Time allocation', 'Selecting evidence', 'Avoiding common errors', 'Answer structure'] },
    { title: 'Mock Examination and Corrections', description: 'Mock exam practice.', order: 79, subtopics: ['Full practice', 'Weak-area revision', 'Marking and correction', 'Final preparation'] },
    // SSS 3 Term 3
    { title: 'Final Prose Revision', description: 'Plot, characters, themes.', order: 80, subtopics: ['Plot and structure', 'Setting', 'Characters', 'Narrative style', 'Themes', 'Language'] },
    { title: 'Final Drama Revision', description: 'Plot, characters, conflict.', order: 81, subtopics: ['Plot', 'Themes', 'Characters', 'Dramatic devices', 'Conflict', 'Stagecraft'] },
    { title: 'Final Poetry Revision', description: 'Themes, form, imagery.', order: 82, subtopics: ['Themes', 'Tone', 'Form', 'Sound', 'Imagery', 'Diction'] },
    { title: 'Final Literary Devices Revision', description: 'Figures of speech, irony.', order: 83, subtopics: ['Figures of speech', 'Satire', 'Irony', 'Allegory', 'Symbolism', 'Motif'] },
    { title: 'Final African Literature Review', description: 'Nigerian literature, culture.', order: 84, subtopics: ['Nigerian literature', 'Colonialism', 'African identity', 'Postcolonial themes', 'Culture', 'Social criticism'] },
    { title: 'Passage-Based Questions', description: 'Unseen texts, interpretation.', order: 85, subtopics: ['Unseen prose', 'Identification of devices', 'Unseen poetry', 'Interpretation', 'Drama extracts'] },
    { title: 'Objective Test Practice', description: 'Literary terminology, genre.', order: 86, subtopics: ['Literary terminology', 'Plot and character', 'Genre', 'Poetry and drama', 'Devices'] },
    { title: 'Essay Test Practice', description: 'Prose, drama, poetry essays.', order: 87, subtopics: ['Prose essays', 'Comparative essays', 'Drama essays', 'Critical responses', 'Poetry essays'] },
    { title: 'Final Mock Examination', description: 'Timed paper, corrections.', order: 88, subtopics: ['Full timed paper', 'Revision of weak areas', 'Corrections', 'Examination strategy'] },
    { title: 'Final Assessment and Transition', description: 'Readiness for SSCE.', order: 89, subtopics: ['Final revision', 'SSCE readiness', 'Independent reading', 'Post-secondary reading skills', 'Literary appreciation'] }
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
