require('dotenv').config();
const pool = require('./src/config/database');

const topicTemplates = [
  "Introduction to {subject}",
  "Foundational Principles of {subject}",
  "Core Methodologies",
  "Analytical Techniques in {subject}",
  "Intermediate Concepts",
  "Advanced Applications",
  "Theoretical Frameworks",
  "Practical Implementation",
  "Modern Approaches to {subject}",
  "Review and Exam Preparation"
];

const subtopicTemplates = [
  "Basic Definitions and Scope",
  "Historical Context and Evolution",
  "Key Terminologies",
  "Fundamental Rules and Laws",
  "Case Studies and Examples",
  "Problem Solving Techniques",
  "Common Misconceptions",
  "Real-world Applications",
  "Advanced Analysis",
  "Summary and Quiz Prep"
];

async function seedAll() {
  console.log("Starting massive syllabus seeding for ALL subjects...");
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    // Get all active subjects
    const subjectsResult = await client.query('SELECT id, name, slug FROM subjects WHERE is_active = TRUE');
    const subjects = subjectsResult.rows;
    console.log(`Found ${subjects.length} active subjects.`);
    
    // Get all active exams
    const examsResult = await client.query('SELECT id, slug FROM exams WHERE is_active = TRUE');
    const exams = examsResult.rows;
    
    for (const subject of subjects) {
      console.log(`Processing: ${subject.name} (${subject.slug})`);
      
      // Get the exams this subject is linked to
      const linkedExamsResult = await client.query(
        'SELECT e.id, e.slug FROM exams e JOIN exam_subjects es ON e.id = es.exam_id WHERE es.subject_id = $1',
        [subject.id]
      );
      
      let subjectExams = linkedExamsResult.rows;
      
      // If it's not linked to any exams, link it to WAEC by default so it has at least one
      if (subjectExams.length === 0 && exams.length > 0) {
        const defaultExam = exams.find(e => e.slug === 'waec') || exams[0];
        await client.query(
          `INSERT INTO exam_subjects (exam_id, subject_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
          [defaultExam.id, subject.id]
        );
        subjectExams = [defaultExam];
      }
      
      // Create a syllabus for the primary exam (we'll just use the first linked exam)
      if (subjectExams.length === 0) continue;
      
      const primaryExam = subjectExams[0];
      
      const syllabusResult = await client.query(
        `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description)
         VALUES ($1, $2, '2026/2027', $3, $4)
         ON CONFLICT (subject_id, exam, syllabus_year)
         DO UPDATE SET title = EXCLUDED.title
         RETURNING id`,
        [
          subject.id, 
          primaryExam.slug.toUpperCase(), 
          `${subject.name} Complete Masterclass`, 
          `Comprehensive syllabus covering all 10 major topics and 100 subtopics for ${subject.name}.`
        ]
      );
      
      const syllabusId = syllabusResult.rows[0].id;
      
      // Ensure the syllabus is explicitly linked in syllabus_exams for ALL exams the subject is part of
      for (const exam of subjectExams) {
        await client.query(
          `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active)
           VALUES ($1, $2, TRUE)
           ON CONFLICT DO NOTHING`,
          [syllabusId, exam.id]
        );
      }
      
      // Now create 10 Topics
      for (let t = 0; t < 10; t++) {
        const topicTitle = topicTemplates[t].replace('{subject}', subject.name);
        const topicSlug = `${subject.slug}-topic-${t+1}`;
        
        const topicResult = await client.query(
          `INSERT INTO topics (syllabus_id, title, slug, description, topic_order)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (syllabus_id, slug)
           DO UPDATE SET title = EXCLUDED.title
           RETURNING id`,
          [syllabusId, topicTitle, topicSlug, `Deep dive into ${topicTitle}.`, t + 1]
        );
        
        const topicId = topicResult.rows[0].id;
        
        // Create 10 Subtopics per Topic
        for (let s = 0; s < 10; s++) {
          const subtopicTitle = `${subtopicTemplates[s]}`;
          const subtopicSlug = `${topicSlug}-sub-${s+1}`;
          
          const subResult = await client.query(
            `INSERT INTO subtopics (topic_id, title, slug, description, subtopic_order)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (topic_id, slug)
             DO UPDATE SET title = EXCLUDED.title
             RETURNING id`,
            [topicId, subtopicTitle, subtopicSlug, `Exploring ${subtopicTitle.toLowerCase()}.`, s + 1]
          );
          
          const subtopicId = subResult.rows[0].id;
          
          // 1 Lesson per subtopic
          const lessonTitle = `Mastering ${subtopicTitle}`;
          const lessonSlug = `${subtopicSlug}-lesson`;
          const content = `
            <h3>${lessonTitle}</h3>
            <p>Welcome to this comprehensive lesson on <strong>${subtopicTitle}</strong> under the broader topic of <em>${topicTitle}</em>.</p>
            <h4>Core Concepts</h4>
            <p>In the context of ${subject.name}, understanding this concept is crucial for your overall exam success. Ensure you take detailed notes.</p>
            <ul>
              <li>Key Principle 1: Always verify your fundamentals.</li>
              <li>Key Principle 2: Apply theoretical knowledge to practical examples.</li>
              <li>Key Principle 3: Review past questions related to this subtopic.</li>
            </ul>
            <p>Proceed to the practice section once you have fully grasped these materials.</p>
          `;
          
          await client.query(
            `INSERT INTO lessons (topic_id, subtopic_id, title, slug, content)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (topic_id, slug)
             DO UPDATE SET content = EXCLUDED.content`,
            [topicId, subtopicId, lessonTitle, lessonSlug, content]
          );
        }
      }
    }
    
    await client.query('COMMIT');
    console.log("Massive seeding complete! Generated 10 topics and 100 subtopics/lessons for all subjects.");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Seeding failed:", err);
  } finally {
    client.release();
    pool.end();
  }
}

seedAll();
