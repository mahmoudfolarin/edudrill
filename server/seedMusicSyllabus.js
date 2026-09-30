require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'music', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Music Comprehensive Syllabus',
  description: 'A structured syllabus covering music theory, notation, aural skills, harmony, composition, performance, Nigerian and African music, music history and technology.',
  topics: [
    // SSS 1 Term 1
    { title: 'Introduction to Music', description: 'Meaning and nature of music.', order: 1, subtopics: ['Meaning and nature of music', 'Music in society', 'Functions of music', 'Music as art and communication', 'Elements of music', 'Music careers'] },
    { title: 'Elements of Music', description: 'Pitch, duration, dynamics.', order: 2, subtopics: ['Pitch', 'Timbre', 'Duration', 'Texture', 'Dynamics', 'Form', 'Tempo'] },
    { title: 'Musical Notation', description: 'The stave, clefs, notes.', order: 3, subtopics: ['The stave', 'Rests', 'Clefs', 'Bar lines', 'Note names', 'Time signatures', 'Note values'] },
    { title: 'Rhythm and Metre', description: 'Beat, simple/compound time.', order: 4, subtopics: ['Beat and pulse', 'Duple, triple and quadruple metre', 'Simple time', 'Rhythmic patterns', 'Compound time', 'Syncopation'] },
    { title: 'Scales and Key Signatures', description: 'Major/minor scales.', order: 5, subtopics: ['Major scales', 'Key signatures', 'Scale degrees', 'Tonic and dominant', 'Accidentals', 'Basic minor scales'] },
    { title: 'Intervals', description: 'Meaning, simple, quality.', order: 6, subtopics: ['Meaning of intervals', 'Melodic intervals', 'Simple intervals', 'Harmonic intervals', 'Interval quality', 'Interval recognition'] },
    { title: 'Musical Terms and Signs', description: 'Tempo, dynamics, articulation.', order: 7, subtopics: ['Tempo markings', 'Expression marks', 'Dynamic markings', 'Common Italian terms', 'Articulation', 'Performance directions'] },
    { title: 'Introduction to Aural Skills', description: 'Pitch, rhythm clapping.', order: 8, subtopics: ['Pitch recognition', 'Melodic patterns', 'Rhythm clapping', 'Listening skills', 'Note identification', 'Call-and-response'] },
    { title: 'Nigerian and African Music', description: 'Traditional music.', order: 9, subtopics: ['Traditional music', 'Instrumental music', 'Functions in ceremonies', 'Community participation', 'Vocal music', 'Regional diversity'] },
    { title: 'Revision and Practical Assessment (Term 1)', description: 'Term 1 assessment.', order: 10, subtopics: ['Theory review', 'Performance', 'Notation exercises', 'Term assessment', 'Aural practice'] },
    // SSS 1 Term 2
    { title: 'Triads and Chords', description: 'Meaning, triads, inversion.', order: 11, subtopics: ['Meaning of a chord', 'Inversions', 'Major and minor triads', 'Primary chords', 'Root position', 'Basic chord recognition'] },
    { title: 'Harmony', description: 'Consonance, dissonance, cadences.', order: 12, subtopics: ['Consonance and dissonance', 'Subdominant', 'Cadences', 'Simple chord progressions', 'Tonic and dominant', 'Harmonic listening'] },
    { title: 'Melody Writing', description: 'Motifs, phrases.', order: 13, subtopics: ['Motifs', 'Question and answer phrases', 'Phrases', 'Simple melody construction', 'Phrase endings', 'Notation of melodies'] },
    { title: 'Musical Form', description: 'Phrase, binary, ternary.', order: 14, subtopics: ['Phrase', 'Rondo introduction', 'Binary form', 'Repetition and contrast', 'Ternary form', 'Recognising form'] },
    { title: 'Musical Instruments', description: 'Instrument families.', order: 15, subtopics: ['Instrument families', 'Brass instruments', 'String instruments', 'Percussion instruments', 'Woodwind instruments', 'Electronic instruments'] },
    { title: 'The Human Voice', description: 'Voice production, types.', order: 16, subtopics: ['Voice production', 'Vocal registers', 'Voice types', 'Choral singing', 'Breathing', 'Vocal care'] },
    { title: 'Nigerian Traditional Instruments', description: 'Idiophones, aerophones, etc.', order: 17, subtopics: ['Idiophones', 'Aerophones', 'Membranophones', 'Instrument construction', 'Chordophones', 'Performance contexts'] },
    { title: 'African Music and Dance', description: 'Music, movement, storytelling.', order: 18, subtopics: ['Music and movement', 'Storytelling', 'Ceremonial music', 'Community performance', 'Work songs', 'Dance accompaniment'] },
    { title: 'Ensemble Performance', description: 'Unison, balance, blend.', order: 19, subtopics: ['Unison', 'Blend', 'Two-part singing', 'Conducting basics', 'Balance', 'Rehearsal skills'] },
    { title: 'Revision and Examination (Term 2)', description: 'Term 2 examination.', order: 20, subtopics: ['Theory practice', 'Written questions', 'Aural exercises', 'Term examination', 'Performance assessment'] },
    // SSS 1 Term 3
    { title: 'Music in Nigerian Society', description: 'Traditional roles, religion.', order: 21, subtopics: ['Traditional roles', 'Popular music', 'Religious music', 'Music and identity', 'Social events', 'Music and national development'] },
    { title: 'Western Art Music Introduction', description: 'Meaning, periods.', order: 22, subtopics: ['Meaning of art music', 'Renaissance music', 'Historical periods overview', 'Baroque introduction', 'Medieval music', 'Classical introduction'] },
    { title: 'Nigerian Art and Choral Music', description: 'Choral traditions.', order: 23, subtopics: ['Choral traditions', 'School music', 'Composers', 'National and cultural themes', 'Church music', 'Performance practice'] },
    { title: 'Composition Basics', description: 'Motif, rhythm, melody.', order: 24, subtopics: ['Motif development', 'Simple forms', 'Rhythm composition', 'Writing for voice', 'Melodic composition', 'Editing a composition'] },
    { title: 'Conducting', description: 'Beat patterns, starting/stopping.', order: 25, subtopics: ['Beat patterns', 'Dynamics', 'Starting and stopping', 'Cueing', 'Tempo control', 'Rehearsal leadership'] },
    { title: 'Music Technology', description: 'Sound recording, software.', order: 26, subtopics: ['Sound recording', 'Digital audio', 'Microphones', 'Music notation software', 'Basic amplification', 'Responsible technology use'] },
    { title: 'Listening and Appreciation', description: 'Instruments, texture, form.', order: 27, subtopics: ['Identifying instruments', 'Style recognition', 'Identifying texture', 'Critical listening', 'Form recognition', 'Describing musical features'] },
    { title: 'Music Project', description: 'Performance and research.', order: 28, subtopics: ['Performance project', 'Instrument demonstration', 'Composition project', 'Programme planning', 'Research project'] },
    { title: 'Revision and Assessment (Term 3)', description: 'End of year assessment.', order: 29, subtopics: ['Comprehensive review', 'Performance', 'Aural practice', 'Project assessment', 'Theory practice'] },
    // SSS 2 Term 1
    { title: 'Revision of SSS1 Theory', description: 'Review of notation, scales, etc.', order: 30, subtopics: ['Notation', 'Rhythm', 'Scales', 'Harmony', 'Intervals', 'Musical terms'] },
    { title: 'Advanced Scales', description: 'Major, natural/harmonic/melodic minor.', order: 31, subtopics: ['Major scales', 'Melodic minor', 'Natural minor', 'Modes introduction', 'Harmonic minor', 'Scale construction'] },
    { title: 'Advanced Intervals', description: 'Compound intervals, inversion.', order: 32, subtopics: ['Compound intervals', 'Melodic analysis', 'Interval inversion', 'Harmonic analysis', 'Quality recognition', 'Aural recognition'] },
    { title: 'Harmony and Chord Progressions', description: 'Triads, seventh chords.', order: 33, subtopics: ['Triads', 'Cadences', 'Seventh chords introduction', 'Voice leading principles', 'Chord progressions', 'Harmonic analysis'] },
    { title: 'Transposition', description: 'Meaning, melodies, clefs.', order: 34, subtopics: ['Meaning of transposition', 'Instrumental transposition introduction', 'Transposing melodies', 'Key relationships', 'Clef changes', 'Practical exercises'] },
    { title: 'Musical Forms (Advanced)', description: 'Binary, ternary, rondo.', order: 35, subtopics: ['Binary', 'Theme and variations', 'Ternary', 'Strophic form', 'Rondo', 'Sonata-form overview'] },
    { title: 'Counterpoint Introduction', description: 'Independent melodies.', order: 36, subtopics: ['Independent melodies', 'Oblique motion', 'Contrary motion', 'Simple two-part writing', 'Parallel motion', 'Avoiding clashes'] },
    { title: 'Aural Training', description: 'Intervals, scales, dictation.', order: 37, subtopics: ['Intervals', 'Rhythm dictation', 'Scales', 'Melody dictation', 'Cadences', 'Chord recognition'] },
    { title: 'Performance Skills', description: 'Solo and ensemble performance.', order: 38, subtopics: ['Solo performance', 'Stage discipline', 'Ensemble performance', 'Rehearsal planning', 'Interpretation'] },
    { title: 'Revision and Assessment (SSS 2 Term 1)', description: 'Term 1 evaluation.', order: 39, subtopics: ['Theory', 'Composition', 'Aural', 'Assessment', 'Performance'] },
    // SSS 2 Term 2
    { title: 'History of Western Music', description: 'Baroque to 20th century.', order: 40, subtopics: ['Baroque period', 'Twentieth-century music', 'Classical period', 'Major characteristics', 'Romantic period', 'Representative composers'] },
    { title: 'Nigerian Music History', description: 'Traditional, early church.', order: 41, subtopics: ['Traditional music', 'Highlife', 'Early church music', 'Jùjú', 'Art music development', 'Afrobeat and popular traditions'] },
    { title: 'African Music Studies', description: 'Rhythm, polyrhythm, call/response.', order: 42, subtopics: ['Rhythm', 'Improvisation', 'Polyrhythm', 'Oral tradition', 'Call and response', 'Community participation'] },
    { title: 'Music and Culture', description: 'Identity, religion, ceremonies.', order: 43, subtopics: ['Music and identity', 'Politics and society', 'Religion', 'Gender and community', 'Ceremonies', 'Music as cultural heritage'] },
    { title: 'Advanced Composition', description: 'Melodic development, form.', order: 44, subtopics: ['Melodic development', 'Form', 'Harmonic support', 'Word setting', 'Modulation introduction', 'Arrangement'] },
    { title: 'Song Writing and Arrangement', description: 'Lyrics, melody, harmony.', order: 45, subtopics: ['Lyrics', 'Instrumentation', 'Melody', 'Structure', 'Harmony', 'Rehearsal and revision'] },
    { title: 'Choral and Ensemble Direction', description: 'Score reading, conducting.', order: 46, subtopics: ['Score reading', 'Balance', 'Conducting patterns', 'Dynamics', 'Rehearsal techniques', 'Interpretation'] },
    { title: 'Music Technology II', description: 'Digital recording, editing.', order: 47, subtopics: ['Digital recording', 'MIDI', 'Editing', 'Notation software', 'Mixing basics', 'Copyright and ethics'] },
    { title: 'Music Careers and Industry', description: 'Teaching, performance, production.', order: 48, subtopics: ['Performance', 'Production', 'Teaching', 'Sound engineering', 'Composition', 'Music business'] },
    { title: 'Revision and Examination (SSS 2 Term 2)', description: 'Term 2 examination.', order: 49, subtopics: ['History review', 'Essay practice', 'Theory practice', 'Assessment', 'Aural practice'] },
    // SSS 2 Term 3
    { title: 'Musical Analysis', description: 'Melody, harmony, rhythm.', order: 50, subtopics: ['Melody', 'Texture', 'Harmony', 'Form', 'Rhythm', 'Timbre'] },
    { title: 'Score Reading', description: 'Reading vocal and instrumental scores.', order: 51, subtopics: ['Reading vocal scores', 'Condensed score', 'Instrumental scores', 'Following a performance', 'Open score', 'Analytical markings'] },
    { title: 'Keyboard and Practical Musicianship', description: 'Scales, chords, sight reading.', order: 52, subtopics: ['Scales', 'Accompaniment patterns', 'Chords', 'Sight reading', 'Cadences', 'Practical drills'] },
    { title: 'African and Nigerian Composers', description: 'Selected composers, themes.', order: 53, subtopics: ['Selected Nigerian composers', 'Cultural themes', 'Choral composition', 'Compositional techniques', 'Art music', 'Performance traditions'] },
    { title: 'World Music', description: 'Asian, Middle Eastern, European.', order: 54, subtopics: ['Asian music', 'American traditions', 'Middle Eastern music', 'Comparative listening', 'European traditions', 'Cultural respect'] },
    { title: 'Music and Media', description: 'Film, radio, advertising.', order: 55, subtopics: ['Film music', 'Gaming and digital media', 'Radio and television', 'Sound design', 'Advertising music', 'Audience'] },
    { title: 'Music Research', description: 'Choosing a topic, fieldwork.', order: 56, subtopics: ['Choosing a topic', 'Interview techniques', 'Sources', 'Documentation', 'Fieldwork', 'Presentation'] },
    { title: 'Performance Project', description: 'Solo/ensemble work, rehearsal.', order: 57, subtopics: ['Solo work', 'Programme design', 'Ensemble work', 'Performance etiquette', 'Rehearsal'] },
    { title: 'Revision and Examination (SSS 2 Term 3)', description: 'Final term 3 exams.', order: 58, subtopics: ['Comprehensive theory', 'Past questions', 'Aural practice', 'End-of-year examination', 'Practical assessment'] },
    // SSS 3 Term 1
    { title: 'Comprehensive Music Theory Review', description: 'Notation, scales, harmony.', order: 59, subtopics: ['Notation', 'Rhythm', 'Scales', 'Harmony', 'Intervals', 'Musical terminology'] },
    { title: 'Advanced Harmony', description: 'Triads, seventh chords, cadences.', order: 60, subtopics: ['Triads', 'Chord progression', 'Seventh chords', 'Non-chord tones', 'Cadences', 'Modulation'] },
    { title: 'Advanced Melody and Counterpoint', description: 'Motifs, two-part writing.', order: 61, subtopics: ['Motif development', 'Contrary motion', 'Phrase structure', 'Passing notes', 'Two-part writing', 'Melodic variation'] },
    { title: 'Musical Analysis (SSS 3)', description: 'Form, texture, harmony.', order: 62, subtopics: ['Form', 'Melody', 'Texture', 'Rhythm', 'Harmony', 'Timbre and style'] },
    { title: 'Aural Skills', description: 'Dictation and recognition.', order: 63, subtopics: ['Interval recognition', 'Melody dictation', 'Chord recognition', 'Cadence recognition', 'Rhythm dictation', 'Musical form'] },
    { title: 'Nigerian and African Music Review', description: 'Traditional and art music review.', order: 64, subtopics: ['Traditional music', 'Rhythmic structures', 'Art music', 'Instruments', 'Popular music', 'Cultural functions'] },
    { title: 'Music History Review', description: 'Baroque, Classical, Romantic.', order: 65, subtopics: ['Baroque', 'Twentieth century', 'Classical', 'Contemporary music', 'Romantic', 'Major characteristics'] },
    { title: 'Performance Preparation', description: 'Solo, ensemble, interpretation.', order: 66, subtopics: ['Solo performance', 'Stage presentation', 'Ensemble performance', 'Rehearsal discipline', 'Interpretation'] },
    { title: 'Composition and Arrangement', description: 'Melody, harmony, form.', order: 67, subtopics: ['Melody', 'Instrumentation', 'Harmony', 'Vocal arrangement', 'Form', 'Editing'] },
    { title: 'Revision and Mock Examination', description: 'Theory, aural, practical.', order: 68, subtopics: ['Theory paper', 'Corrections', 'Aural paper', 'Mock examination', 'Practical preparation'] },
    // SSS 3 Term 2
    { title: 'Advanced Score Reading', description: 'Vocal/instrumental score reading.', order: 69, subtopics: ['Vocal scores', 'Following multiple parts', 'Instrumental scores', 'Score analysis', 'Transposition', 'Conducting from score'] },
    { title: 'Advanced Conducting', description: 'Beat patterns, prep beat.', order: 70, subtopics: ['Beat patterns', 'Dynamics', 'Preparatory beat', 'Tempo changes', 'Cues', 'Rehearsal leadership'] },
    { title: 'Advanced Composition (Term 2)', description: 'Extended melody, harmony.', order: 71, subtopics: ['Extended melody', 'Counterpoint', 'Harmonic progression', 'Form', 'Modulation', 'Complete composition'] },
    { title: 'Music Technology (SSS 3)', description: 'DAW concepts, recording, editing.', order: 72, subtopics: ['Digital audio workstation concepts', 'Mixing', 'Recording', 'MIDI', 'Editing', 'Notation and publishing'] },
    { title: 'Music Production and Copyright', description: 'Production, arranging, distribution.', order: 73, subtopics: ['Production roles', 'Copyright basics', 'Arranging', 'Performance rights', 'Distribution', 'Ethical use of music'] },
    { title: 'Music Education and Careers', description: 'Teaching, performance, admin.', order: 74, subtopics: ['Teaching', 'Production', 'Performance', 'Research', 'Composition', 'Arts administration'] },
    { title: 'Comparative Music Studies', description: 'African and Western traditions.', order: 75, subtopics: ['African and Western traditions', 'Cultural context', 'Traditional and popular music', 'Musical functions', 'Listening comparison'] },
    { title: 'Research Project (SSS 3)', description: 'Research, sources, fieldwork.', order: 76, subtopics: ['Research question', 'Analysis', 'Sources', 'Report writing', 'Fieldwork', 'Presentation'] },
    { title: 'SSCE Examination Skills', description: 'Interpretation, theory, aural.', order: 77, subtopics: ['Question interpretation', 'Essay writing', 'Theory answers', 'Time management', 'Aural strategy'] },
    { title: 'Mock Examination and Corrections (Term 2)', description: 'Mock exam practice.', order: 78, subtopics: ['Full practice', 'Targeted revision', 'Corrections', 'Final preparation'] },
    // SSS 3 Term 3
    { title: 'Final Theory Revision', description: 'Notation, scales, harmony.', order: 79, subtopics: ['Notation', 'Rhythm', 'Scales', 'Harmony', 'Intervals', 'Forms'] },
    { title: 'Final Aural Revision', description: 'Intervals, rhythms, melodies.', order: 80, subtopics: ['Intervals', 'Cadences', 'Rhythms', 'Chords', 'Melodies', 'Musical features'] },
    { title: 'Final Music History Revision', description: 'Periods, composers, styles.', order: 81, subtopics: ['Western music periods', 'Composers', 'Nigerian music', 'Styles', 'African music', 'Cultural context'] },
    { title: 'Final Practical Revision', description: 'Performance and conducting.', order: 82, subtopics: ['Solo performance', 'Sight reading', 'Ensemble performance', 'Interpretation', 'Conducting'] },
    { title: 'Final Composition Revision', description: 'Melody, harmony, arrangement.', order: 83, subtopics: ['Melody', 'Form', 'Harmony', 'Arrangement', 'Counterpoint', 'Presentation'] },
    { title: 'Final Music Appreciation', description: 'Listening analysis, style.', order: 84, subtopics: ['Listening analysis', 'Timbre', 'Style', 'Form', 'Texture', 'Critical response'] },
    { title: 'Past Questions', description: 'Objective, theory, aural.', order: 85, subtopics: ['Objective questions', 'History questions', 'Theory questions', 'Practical preparation', 'Aural questions'] },
    { title: 'Mock Practical Examination', description: 'Performance and aural mock.', order: 86, subtopics: ['Performance', 'Conducting', 'Aural work', 'Composition review', 'Score reading'] },
    { title: 'Final Mock Examination', description: 'Timed theory and aural.', order: 87, subtopics: ['Timed theory paper', 'Corrections', 'Aural practice', 'Weak-area revision'] },
    { title: 'Final Assessment and Transition', description: 'SSCE readiness.', order: 88, subtopics: ['Final revision', 'Independent musicianship', 'Performance portfolio', 'SSCE readiness', 'Music career pathways', 'Literary appreciation'] }
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
