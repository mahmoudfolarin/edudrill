require('dotenv').config();
const pool = require('./src/config/database');

const compSyllabus = {
  exam: 'WAEC',
  subject: 'computer-studies', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Computer Studies Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Introduction to Computer Studies',
      description: 'Meaning, scope, and characteristics of computers.',
      order: 1,
      subtopics: ['Meaning and scope of Computer Studies', 'Uses and importance of computers', 'Characteristics of computers', 'Advantages and limitations of computers']
    },
    {
      title: 'History and Development of Computers',
      description: 'Early devices, generations, and modern trends.',
      order: 2,
      subtopics: ['Early calculating devices', 'Generations of computers', 'Computer evolution and modern trends']
    },
    {
      title: 'Computer Hardware',
      description: 'Input, output, processing, and storage devices.',
      order: 3,
      subtopics: ['Meaning of hardware', 'Input devices', 'Output devices', 'Processing devices', 'Storage devices']
    },
    {
      title: 'Computer Software',
      description: 'System, application, and utility software.',
      order: 4,
      subtopics: ['Meaning of software', 'System software', 'Application software', 'Utility software', 'Examples and uses']
    },
    {
      title: 'Data and Information',
      description: 'Differences, data processing cycle, and forms of data.',
      order: 5,
      subtopics: ['Meaning of data and information', 'Differences between data and information', 'Data processing cycle', 'Sources and forms of data']
    },
    {
      title: 'Computer Users and Careers',
      description: 'Types of users, ICT skills, and career opportunities.',
      order: 6,
      subtopics: ['Types of computer users', 'Computer-related occupations', 'ICT skills and career opportunities']
    },
    // SSS 1 Second Term
    {
      title: 'Operating Systems',
      description: 'Functions, types, and desktop management.',
      order: 7,
      subtopics: ['Meaning and functions of an operating system', 'Types of operating systems', 'Examples of operating systems', 'Basic desktop and file management']
    },
    {
      title: 'Word Processing',
      description: 'Creating, editing, formatting, and printing documents.',
      order: 8,
      subtopics: ['Meaning and uses of word processors', 'Creating and saving documents', 'Editing and formatting text', 'Tables, headers and footers', 'Printing and document management']
    },
    {
      title: 'Computer File Management',
      description: 'Files, folders, extensions, and backup.',
      order: 9,
      subtopics: ['Files and folders', 'Creating, copying, moving and deleting files', 'File extensions', 'Storage organization and backup']
    },
    {
      title: 'Computer Ethics and Safety',
      description: 'Responsible use, lab rules, and safety practices.',
      order: 10,
      subtopics: ['Responsible computer use', 'Computer laboratory rules', 'Health and safety practices', 'Privacy and responsible use of information']
    },
    {
      title: 'Internet Basics',
      description: 'Web browsers, search engines, and email.',
      order: 11,
      subtopics: ['Meaning of the Internet', 'Web browsers and websites', 'Search engines', 'Email and basic online communication']
    },
    {
      title: 'Practical Computer Skills',
      description: 'Keyboarding, mouse operations, and file management.',
      order: 12,
      subtopics: ['Keyboarding skills', 'Mouse operations', 'Basic document production', 'Simple file-management exercises']
    },
    // SSS 1 Third Term
    {
      title: 'Computer Networks',
      description: 'Types of networks and network devices.',
      order: 13,
      subtopics: ['Meaning of computer networks', 'Types of networks', 'Network devices', 'Advantages and disadvantages of networking']
    },
    {
      title: 'Communication Technology',
      description: 'Email, instant messaging, and video conferencing.',
      order: 14,
      subtopics: ['Electronic communication', 'Email', 'Instant messaging', 'Video conferencing', 'Social media and responsible use']
    },
    {
      title: 'Data Representation',
      description: 'Bits, bytes, and binary numbers.',
      order: 15,
      subtopics: ['Bits and bytes', 'Units of storage', 'Number systems introduction', 'Binary numbers']
    },
    {
      title: 'Computer Security',
      description: 'Malware, passwords, and safe browsing.',
      order: 16,
      subtopics: ['Meaning of computer security', 'Malware and viruses', 'Passwords and authentication', 'Safe browsing practices', 'Data backup']
    },
    {
      title: 'Introduction to Programming',
      description: 'Algorithms, flowcharts, and programming languages.',
      order: 17,
      subtopics: ['Meaning of programming', 'Algorithms', 'Flowcharts', 'Programming languages', 'Simple problem-solving steps']
    },
    {
      title: 'Revision and Practical Exercises',
      description: 'Hardware, software, and word-processing practice.',
      order: 18,
      subtopics: ['Hardware identification', 'Software exercises', 'File management', 'Basic word-processing practice']
    },
    // SSS 2 First Term
    {
      title: 'Computer Architecture',
      description: 'CPU, memory units, and system buses.',
      order: 19,
      subtopics: ['CPU and its components', 'Memory units', 'Primary and secondary storage', 'System buses', 'Basic computer organization']
    },
    {
      title: 'Number Systems',
      description: 'Decimal, binary, octal, hexadecimal.',
      order: 20,
      subtopics: ['Decimal system', 'Binary system', 'Octal system', 'Hexadecimal system', 'Conversions between number systems']
    },
    {
      title: 'Logic Gates',
      description: 'AND, OR, NOT, NAND, NOR, XOR gates.',
      order: 21,
      subtopics: ['AND, OR and NOT gates', 'NAND and NOR gates', 'XOR and XNOR gates', 'Truth tables', 'Simple logic circuits']
    },
    {
      title: 'Advanced Word Processing',
      description: 'Styles, columns, and mail merge.',
      order: 22,
      subtopics: ['Styles and formatting', 'Tables and columns', 'Page layout', 'Mail merge', 'Document review and printing']
    },
    {
      title: 'Spreadsheets',
      description: 'Data entry, formulas, functions, and charts.',
      order: 23,
      subtopics: ['Meaning and uses of spreadsheets', 'Rows, columns and cells', 'Data entry and formatting', 'Formulas and functions', 'Charts and simple data analysis']
    },
    {
      title: 'Database Concepts',
      description: 'Database management systems, fields, and tables.',
      order: 24,
      subtopics: ['Meaning of a database', 'Database management systems', 'Fields and records', 'Tables and relationships', 'Basic database operations']
    },
    // SSS 2 Second Term
    {
      title: 'Programming Concepts',
      description: 'Algorithms, variables, operators, and expressions.',
      order: 25,
      subtopics: ['Problem definition', 'Algorithms and pseudocode', 'Flowcharts', 'Variables and constants', 'Operators and expressions']
    },
    {
      title: 'Introduction to Programming Languages',
      description: 'Low-level, high-level languages, and translators.',
      order: 26,
      subtopics: ['Low-level and high-level languages', 'Translators', 'Compilers and interpreters', 'Examples of programming languages']
    },
    {
      title: 'Control Structures',
      description: 'Sequence, selection, iteration, and nested structures.',
      order: 27,
      subtopics: ['Sequence', 'Selection', 'Iteration', 'Nested structures', 'Simple programming exercises']
    },
    {
      title: 'Web Design Basics',
      description: 'World Wide Web, HTML, and web-page structure.',
      order: 28,
      subtopics: ['Meaning of the World Wide Web', 'Web pages and websites', 'HTML basics', 'Common HTML elements', 'Simple web-page structure']
    },
    {
      title: 'Computer Graphics and Multimedia',
      description: 'Images, audio, video, and design principles.',
      order: 29,
      subtopics: ['Meaning of graphics', 'Images and formats', 'Audio and video', 'Multimedia applications', 'Basic design principles']
    },
    {
      title: 'Internet and Network Services',
      description: 'Cloud computing, file sharing, and online collaboration.',
      order: 30,
      subtopics: ['Internet services', 'Cloud computing', 'File sharing', 'Online collaboration', 'Responsible use of online services']
    },
    // SSS 2 Third Term
    {
      title: 'Computer Networks II',
      description: 'Topologies, transmission media, and protocols.',
      order: 31,
      subtopics: ['Network topologies', 'Transmission media', 'Network protocols', 'Client-server and peer-to-peer networks', 'Network performance']
    },
    {
      title: 'Cybersecurity',
      description: 'Cyber threats, phishing, malware, and access control.',
      order: 32,
      subtopics: ['Cyber threats', 'Phishing and social engineering', 'Malware', 'Access control', 'Data protection and privacy']
    },
    {
      title: 'Database Practical',
      description: 'Creating tables, entering records, queries, forms, and reports.',
      order: 33,
      subtopics: ['Creating tables', 'Entering records', 'Queries', 'Forms and reports', 'Database maintenance']
    },
    {
      title: 'Spreadsheet Practical',
      description: 'Advanced formulas, functions, charts, and sorting.',
      order: 34,
      subtopics: ['Advanced formulas', 'Functions', 'Charts', 'Sorting and filtering', 'Simple statistical analysis']
    },
    {
      title: 'Programming Practical',
      description: 'Writing programs, loops, and debugging.',
      order: 35,
      subtopics: ['Writing simple programs', 'Input and output', 'Conditional statements', 'Loops', 'Debugging']
    },
    {
      title: 'Revision and Examination Practice',
      description: 'Theory revision, practical exercises, past questions.',
      order: 36,
      subtopics: ['Theory revision', 'Practical exercises', 'Past-question practice', 'Problem-solving activities']
    },
    // SSS 3 First Term
    {
      title: 'Advanced Computer Architecture',
      description: 'CPU performance, memory hierarchy, and storage technologies.',
      order: 37,
      subtopics: ['CPU performance', 'Memory hierarchy', 'Input and output systems', 'Storage technologies', 'Modern computer systems']
    },
    {
      title: 'Operating Systems and System Management',
      description: 'Process and memory management, file systems, user accounts.',
      order: 38,
      subtopics: ['Advanced operating-system functions', 'Process and memory management', 'File systems', 'User accounts and permissions', 'System maintenance']
    },
    {
      title: 'Database Management',
      description: 'Relational databases, keys, queries, forms, and security.',
      order: 39,
      subtopics: ['Relational databases', 'Keys and relationships', 'Queries', 'Forms and reports', 'Database security']
    },
    {
      title: 'Advanced Spreadsheet Applications',
      description: 'Data validation, what-if analysis, practical applications.',
      order: 40,
      subtopics: ['Advanced functions', 'Data validation', 'Charts and analysis', 'What-if analysis', 'Practical business applications']
    },
    {
      title: 'Programming and Software Development',
      description: 'Program design, modular programming, testing, and debugging.',
      order: 41,
      subtopics: ['Program design', 'Modular programming', 'Functions and procedures', 'Testing and debugging', 'Documentation']
    },
    {
      title: 'Web Development',
      description: 'HTML revision, CSS basics, web-page structure, hyperlinks.',
      order: 42,
      subtopics: ['HTML revision', 'CSS basics', 'Web-page structure', 'Forms and hyperlinks', 'Basic website development']
    },
    // SSS 3 Second Term
    {
      title: 'Information and Communication Technology',
      description: 'ICT concepts, e-commerce, and digital collaboration.',
      order: 43,
      subtopics: ['ICT concepts', 'ICT in education and business', 'E-commerce', 'E-government', 'Digital collaboration']
    },
    {
      title: 'Cybersecurity and Digital Citizenship',
      description: 'Cybersecurity principles, online identity, ethical behavior.',
      order: 44,
      subtopics: ['Cybersecurity principles', 'Online identity', 'Privacy and data protection', 'Cybercrime awareness', 'Ethical digital behaviour']
    },
    {
      title: 'Computer Applications',
      description: 'Word processing, spreadsheets, databases, presentation software.',
      order: 45,
      subtopics: ['Word processing', 'Spreadsheets', 'Databases', 'Presentation software', 'Integrated applications']
    },
    {
      title: 'Artificial Intelligence and Emerging Technologies',
      description: 'Machine learning, robotics, cloud computing, IoT.',
      order: 46,
      subtopics: ['Meaning of artificial intelligence', 'Machine learning concept', 'Robotics', 'Cloud computing', 'Internet of Things', 'Benefits and concerns of emerging technologies']
    },
    {
      title: 'Systems Analysis and Design',
      description: 'System development stages, fact finding, requirements, implementation.',
      order: 47,
      subtopics: ['Meaning of systems', 'System development stages', 'Fact finding', 'System requirements', 'Implementation and maintenance']
    },
    {
      title: 'Practical Project',
      description: 'Problem identification, planning, design, and implementation.',
      order: 48,
      subtopics: ['Problem identification', 'Planning', 'Design', 'Implementation', 'Testing and documentation']
    },
    // SSS 3 Third Term
    {
      title: 'Comprehensive Theory Revision',
      description: 'Fundamentals, hardware, software, data representation, networks.',
      order: 49,
      subtopics: ['Computer fundamentals', 'Hardware and software', 'Data representation', 'Networks', 'Programming', 'Databases']
    },
    {
      title: 'Practical Examination Preparation',
      description: 'Word processing, spreadsheets, databases, programming, web design.',
      order: 50,
      subtopics: ['Word processing', 'Spreadsheet tasks', 'Database tasks', 'Programming exercises', 'Web design exercises']
    },
    {
      title: 'Past Questions and Examination Techniques',
      description: 'Objective, theory, practical questions, time management.',
      order: 51,
      subtopics: ['Objective questions', 'Theory questions', 'Practical questions', 'Time management', 'Common examination errors']
    },
    {
      title: 'Final Project Review',
      description: 'Project presentation, testing, corrections, evaluation.',
      order: 52,
      subtopics: ['Project presentation', 'Testing and corrections', 'Documentation', 'Evaluation']
    },
    {
      title: 'WASSCE/NECO Examination Preparation',
      description: 'Mock examination, practical revision, final topic revision.',
      order: 53,
      subtopics: ['Mock examination', 'Practical revision', 'Final topic revision', 'Examination readiness']
    }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting Computer Studies seeding process...");
    
    // Get subject_id
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [compSyllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${compSyllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    // Create Syllabus
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [
        subjectId,
        compSyllabus.exam,
        compSyllabus.syllabus_year,
        compSyllabus.title,
        compSyllabus.description
      ]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${compSyllabus.title}`);

    // Link syllabus to all active exams
    const examsRes = await pool.query('SELECT id FROM exams WHERE is_active = TRUE');
    for (const exam of examsRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, exam.id]
      );
    }
    console.log(`Linked Syllabus to ${examsRes.rows.length} exams.`);

    for (const topic of compSyllabus.topics) {
      const topicSlug = slugify(topic.title);
      
      const tRes = await pool.query(
        `INSERT INTO topics (syllabus_id, title, slug, description, topic_order, is_active)
         VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
        [syllabusId, topic.title, topicSlug, topic.description, topic.order]
      );
      const topicId = tRes.rows[0].id;
      console.log(`  Created Topic: ${topic.title}`);

      let subOrder = 1;
      for (const subStr of topic.subtopics) {
        const subSlug = slugify(subStr) + '-' + Math.floor(Math.random() * 100000);
        
        const subRes = await pool.query(
          `INSERT INTO subtopics (topic_id, title, slug, description, subtopic_order, is_active)
           VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
          [topicId, subStr, subSlug, `Learn about ${subStr}`, subOrder]
        );
        const subtopicId = subRes.rows[0].id;

        // Generate 2 lessons per subtopic
        for (let i = 1; i <= 2; i++) {
          const lessonTitle = `Lesson ${i}: ${subStr}`;
          const lessonSlug = slugify(lessonTitle) + '-' + Math.floor(Math.random() * 100000);
          const lessonContent = `<div class="lesson-intro">
            <h2>Welcome to ${lessonTitle}</h2>
            <p>This is a comprehensive study module covering the concepts of <strong>${subStr}</strong> within the topic of ${topic.title}.</p>
            <h3>Key Principles</h3>
            <ul>
              <li>Understand the fundamental rules and definitions of ${subStr}.</li>
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

    console.log("Computer Studies Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
