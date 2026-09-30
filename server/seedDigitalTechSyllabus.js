require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'digital-technologies', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Digital Technologies Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    { title: 'Introduction to Digital Technologies', description: 'Meaning and scope of digital technologies.', order: 1, subtopics: ['Meaning and scope of digital technologies', 'Digital systems and digital literacy', 'Importance in education, communication, business and society', 'Examples of digital technologies'] },
    { title: 'History and Evolution of Digital Technologies', description: 'Early devices, generations, and evolution.', order: 2, subtopics: ['Early calculating devices', 'Personal computers, mobile devices and the internet', 'Generations of computers', 'Emerging digital technologies', 'Evolution from analogue to digital systems'] },
    { title: 'Number Systems', description: 'Decimal, binary, octal, and hexadecimal.', order: 3, subtopics: ['Decimal number system', 'Hexadecimal number system', 'Binary number system', 'Conversions between number systems', 'Octal number system', 'Applications of number systems in computing'] },
    { title: 'Computer Hardware', description: 'System unit, input, output, storage devices.', order: 4, subtopics: ['Meaning of hardware', 'Output devices', 'System unit and major internal components', 'Storage devices', 'Input devices', 'System devices and peripheral devices'] },
    { title: 'Computer Software', description: 'System, application, and utility software.', order: 5, subtopics: ['Meaning of software', 'Utility software', 'System software', 'Examples and uses', 'Application software', 'Software installation and updates'] },
    { title: 'Operating Systems', description: 'Functions, types, and user interfaces.', order: 6, subtopics: ['Meaning and functions of an operating system', 'File and folder management', 'Types of operating systems', 'User interfaces and system utilities', 'Desktop and mobile operating systems'] },
    { title: 'Computer Maintenance and Safety', description: 'Preventive maintenance, cleaning, and safety.', order: 7, subtopics: ['Preventive maintenance', 'Ergonomics and healthy computer use', 'Cleaning and care of equipment', 'Troubleshooting basics', 'Safe electrical practices', 'Responsible handling of digital equipment'] },
    { title: 'Data Representation', description: 'Bits, bytes, characters, ASCII, and images.', order: 8, subtopics: ['Meaning of data and information', 'ASCII and Unicode', 'Bits, bytes and storage units', 'Representation of images, sound and video', 'Character representation', 'Data compression basics'] },
    { title: 'Revision and Practical Assessment', description: 'Hardware, software, and number systems.', order: 9, subtopics: ['Review of term topics', 'Practical computer operations', 'Hardware and software identification', 'End-of-term assessment', 'Number-system practice'] },
    // SSS 1 Second Term
    { title: 'Computer Networks', description: 'Meaning, LAN, MAN, WAN, and network devices.', order: 10, subtopics: ['Meaning of computer networks', 'Wired and wireless networks', 'LAN, MAN and WAN', 'Advantages and applications of networking', 'Network devices'] },
    { title: 'Internet Technologies', description: 'Meaning, browsers, search engines, and web pages.', order: 11, subtopics: ['Meaning and structure of the internet', 'Websites and web pages', 'Web browsers', 'Internet services', 'Search engines', 'Effective online searching'] },
    { title: 'Email and Online Communication', description: 'Accounts, composing, and etiquette.', order: 12, subtopics: ['Email accounts and components', 'Email etiquette', 'Composing and managing messages', 'Instant messaging and video conferencing', 'Attachments', 'Responsible online communication'] },
    { title: 'Digital Storage and Cloud Computing', description: 'Primary, secondary, and cloud storage.', order: 13, subtopics: ['Primary and secondary storage', 'Benefits and limitations of cloud computing', 'Local and removable storage', 'Data backup and synchronization', 'Cloud storage'] },
    { title: 'Cybersecurity I', description: 'Meaning, cyber threats, and malware.', order: 14, subtopics: ['Meaning and importance of cybersecurity', 'Phishing and social engineering', 'Common cyber threats', 'Safe browsing practices', 'Malware'] },
    { title: 'Cybersecurity II', description: 'Passwords, antivirus, firewalls, and updates.', order: 15, subtopics: ['Strong passwords and authentication', 'Secure networks', 'Antivirus and firewalls', 'Recognising suspicious links and messages', 'Software updates'] },
    { title: 'Data Privacy and Digital Ethics', description: 'Data privacy, digital footprints, and cyberbullying.', order: 16, subtopics: ['Meaning of data privacy', 'Digital footprints', 'Personal and sensitive information', 'Cyberbullying and respectful online behaviour', 'Responsible data handling', 'Introduction to data-protection principles'] },
    { title: 'Social Media Technologies', description: 'Types, uses, privacy settings, and risks.', order: 17, subtopics: ['Meaning and types of social media', 'Privacy settings', 'Uses in education and communication', 'Misinformation and responsible sharing', 'Benefits and risks', 'Digital citizenship'] },
    { title: 'Revision and Practical Assessment (SSS 1 Term 2)', description: 'Network, email, and cybersecurity practicals.', order: 18, subtopics: ['Network and internet review', 'Digital-ethics case studies', 'Email practical', 'End-of-term assessment', 'Cybersecurity exercises'] },
    // SSS 1 Third Term
    { title: 'Word Processing Applications', description: 'Creating, saving, and formatting documents.', order: 19, subtopics: ['Creating and saving documents', 'Tables and lists', 'Text formatting', 'Page layout', 'Paragraph formatting', 'Headers, footers and printing'] },
    { title: 'Spreadsheet Applications I', description: 'Interface, rows, columns, and data entry.', order: 20, subtopics: ['Spreadsheet interface', 'Basic formulas', 'Rows, columns and cells', 'Functions such as SUM, AVERAGE, MIN and MAX', 'Data entry', 'Cell references'] },
    { title: 'Spreadsheet Applications II', description: 'Sorting, filtering, charts, and graphs.', order: 21, subtopics: ['Sorting and filtering', 'Simple data analysis', 'Charts and graphs', 'Practical school and household examples', 'Formatting worksheets'] },
    { title: 'Presentation Software', description: 'Presentations, slide layouts, and transitions.', order: 22, subtopics: ['Creating presentations', 'Transitions and animations', 'Slide layouts and themes', 'Presentation design principles', 'Text and image insertion', 'Delivering a digital presentation'] },
    { title: 'Database Introduction', description: 'Meaning, components, fields, and records.', order: 23, subtopics: ['Meaning of a database', 'Tables and simple relationships', 'Database components', 'Examples of databases', 'Fields and records'] },
    { title: 'Practical Database Management', description: 'Creating tables, entering records, and queries.', order: 24, subtopics: ['Creating a simple table', 'Simple queries', 'Entering and editing records', 'Reports and forms', 'Sorting and searching'] },
    { title: 'Emerging Technologies I', description: 'Artificial intelligence, robotics, and IoT.', order: 25, subtopics: ['Artificial intelligence', 'Virtual and augmented reality', 'Robotics', 'Uses and societal implications', 'Internet of Things'] },
    { title: 'Emerging Technologies II', description: 'Cloud services, blockchain, and digital payments.', order: 26, subtopics: ['Cloud-based services', 'Automation', 'Blockchain concepts', 'Benefits, limitations and ethical considerations', 'Digital payments'] },
    { title: 'Revision and Examination', description: 'Comprehensive review and project presentation.', order: 27, subtopics: ['Comprehensive review', 'Project presentation', 'Integrated practical exercises', 'End-of-session examination'] },
    // SSS 2 First Term
    { title: 'Review of SSS1 Digital Technologies', description: 'Hardware, software, networks, and applications.', order: 28, subtopics: ['Digital foundations', 'Cybersecurity and privacy', 'Computer hardware and software', 'Productivity applications', 'Networks and internet'] },
    { title: 'Advanced Word Processing', description: 'Page layout, styles, templates, and mail merge.', order: 29, subtopics: ['Advanced page layout', 'Mail merge', 'Styles and templates', 'Macros and automation basics', 'Tables and advanced formatting'] },
    { title: 'Advanced Spreadsheet I', description: 'Advanced formulas, references, and lookup functions.', order: 30, subtopics: ['Advanced formulas', 'Lookup functions', 'Relative and absolute references', 'Pivot tables and summaries', 'Logical functions'] },
    { title: 'Advanced Spreadsheet II', description: 'Financial models, scenarios, charts, and validation.', order: 31, subtopics: ['Financial and data models', 'Data validation', 'Scenario analysis', 'Practical data-analysis tasks', 'Charts and dashboards'] },
    { title: 'Advanced Presentation Tools', description: 'Professional design, multimedia, and hyperlinks.', order: 32, subtopics: ['Professional slide design', 'Hyperlinks and interactive presentations', 'Multimedia integration', 'Presentation delivery', 'Animations and transitions'] },
    { title: 'Web Design I', description: 'HTML introduction, structure, and basic CSS.', order: 33, subtopics: ['Introduction to HTML', 'Images and tables', 'HTML document structure', 'Basic CSS', 'Headings, paragraphs, lists and links'] },
    { title: 'Web Design II', description: 'CSS formatting, layout, menus, and forms.', order: 34, subtopics: ['CSS formatting', 'Forms', 'Page layout', 'Creating a simple multi-page website', 'Navigation menus'] },
    { title: 'Web Publishing and Hosting', description: 'Domains, hosting, uploading, and maintenance.', order: 35, subtopics: ['Web domains', 'Basic publishing process', 'Web hosting', 'Website maintenance and accessibility', 'Uploading website files'] },
    { title: 'Revision and Practical Assessment (SSS 2 Term 1)', description: 'Productivity tools and web design projects.', order: 36, subtopics: ['Review', 'Productivity-tools practical', 'Web-design project', 'Term assessment'] },
    // SSS 2 Second Term
    { title: 'Computer Programming I', description: 'Meaning, languages, algorithms, and environments.', order: 37, subtopics: ['Meaning and importance of programming', 'Programming environments', 'Programming languages', 'Variables and data types', 'Algorithms and problem solving'] },
    { title: 'Computer Programming II', description: 'Input, output, operators, and debugging.', order: 38, subtopics: ['Input and output', 'Debugging and testing', 'Operators and expressions', 'Writing simple programs', 'Functions/procedures'] },
    { title: 'Programming Control Structures', description: 'Sequence, selection, and iteration loops.', order: 39, subtopics: ['Sequence', 'Iteration and loops', 'Selection', 'Nested structures', 'if/else logic'] },
    { title: 'Practical Programming', description: 'Simple calculator, quiz program, and testing.', order: 40, subtopics: ['Simple calculator', 'Testing and correcting errors', 'Quiz or interactive program', 'Project documentation', 'Problem decomposition'] },
    { title: 'Data Science Basics', description: 'Data meaning, types, collection, and visualization.', order: 41, subtopics: ['Meaning of data science', 'Data cleaning', 'Types of data', 'Data visualisation', 'Data collection', 'Uses of data science'] },
    { title: 'Big Data and Analytics', description: 'Big data characteristics, sources, and storage.', order: 42, subtopics: ['Meaning and characteristics of big data', 'Analytics applications', 'Sources of large datasets', 'Benefits and challenges', 'Data storage and processing'] },
    { title: 'Artificial Intelligence', description: 'Meaning, examples, applications, and ethics.', order: 43, subtopics: ['Meaning of AI', 'Benefits and limitations', 'Examples of AI systems', 'Ethical issues', 'AI applications in everyday life'] },
    { title: 'Machine Learning Basics', description: 'Meaning, training data, and learning concepts.', order: 44, subtopics: ['Meaning of machine learning', 'Examples of machine-learning applications', 'Training data', 'Bias and responsible AI', 'Supervised and unsupervised learning concepts'] },
    { title: 'Revision and Practical Assessment (SSS 2 Term 2)', description: 'Programming practice and data analysis.', order: 45, subtopics: ['Programming practice', 'AI case studies', 'Data-analysis exercise', 'Term assessment'] },
    // SSS 2 Third Term
    { title: 'Mobile Application Development I', description: 'Types of apps, interfaces, and planning.', order: 46, subtopics: ['Meaning and types of mobile applications', 'Planning a simple app', 'Mobile app interfaces', 'Mobile usability', 'App components'] },
    { title: 'Mobile Application Development II', description: 'Designing, navigation, inputs, and testing.', order: 47, subtopics: ['Designing a simple mobile application', 'Testing and debugging', 'Screens and navigation', 'App project presentation', 'Inputs and outputs'] },
    { title: 'Cloud Computing II', description: 'SaaS, PaaS, IaaS, and cloud collaboration.', order: 48, subtopics: ['SaaS, PaaS and IaaS', 'Advantages and limitations', 'Cloud storage and applications', 'Cloud security awareness', 'Cloud collaboration'] },
    { title: 'Blockchain Technology', description: 'Meaning, ledgers, cryptocurrency, and uses.', order: 49, subtopics: ['Meaning of blockchain', 'Cryptocurrency as a concept', 'Blocks and distributed ledgers', 'Benefits and limitations', 'Uses beyond finance'] },
    { title: 'Cybersecurity III', description: 'Advanced security, access control, and response.', order: 50, subtopics: ['Advanced security awareness', 'Incident awareness and response', 'Authentication and access control', 'Ethical cybersecurity principles', 'Network security concepts'] },
    { title: 'Cyber Laws and Digital Rights', description: 'Cybercrime, digital rights, and privacy.', order: 51, subtopics: ['Cybercrime and digital offences', 'Privacy and intellectual property', 'Digital rights and responsibilities', 'Responsible reporting', 'Nigerian cyber-law awareness'] },
    { title: 'Digital Entrepreneurship', description: 'Meaning, e-commerce, freelancing, and models.', order: 52, subtopics: ['Meaning of digital entrepreneurship', 'Online business models', 'E-commerce', 'Digital marketing basics', 'Freelancing and digital services', 'Ethics and customer protection'] },
    { title: 'Digital Project Work', description: 'Selecting a problem, planning, design, and testing.', order: 53, subtopics: ['Selecting a problem', 'Testing', 'Planning and requirements', 'Documentation', 'Design and development', 'Presentation and evaluation'] },
    { title: 'Revision and Examination (SSS 2 Term 3)', description: 'Full-course revision and project assessment.', order: 54, subtopics: ['Full-course revision', 'Project assessment', 'Practical review', 'End-of-session examination'] },
    // SSS 3 First Term
    { title: 'Review of SSS2 Work', description: 'Programming, web design, databases, and AI.', order: 55, subtopics: ['Programming', 'Data science', 'Web design', 'Cybersecurity', 'Databases', 'Emerging technologies'] },
    { title: 'Advanced Programming I', description: 'Functions, lists, arrays, and file handling.', order: 56, subtopics: ['Functions', 'Modular programming', 'Lists and arrays', 'Testing and debugging', 'File handling concepts'] },
    { title: 'Advanced Programming II', description: 'Object-oriented programming, classes, and methods.', order: 57, subtopics: ['Object-oriented programming concepts', 'Encapsulation and reuse', 'Classes and objects', 'Simple application design', 'Methods'] },
    { title: 'Software Development Life Cycle', description: 'Requirements, design, implementation, and models.', order: 58, subtopics: ['Requirements analysis', 'Deployment', 'System design', 'Maintenance', 'Implementation', 'Waterfall and Agile models', 'Testing'] },
    { title: 'Networking II', description: 'IP addressing, protocols, IPv4/IPv6, and subnetting.', order: 59, subtopics: ['IP addressing', 'Network protocols', 'IPv4 and IPv6 awareness', 'Network troubleshooting', 'Subnetting concepts'] },
    { title: 'Cloud Computing and Virtualization', description: 'Virtual machines, service models, and deployment.', order: 60, subtopics: ['Virtual machines', 'Cloud deployment concepts', 'Cloud service models', 'Advantages and risks', 'Remote servers'] },
    { title: 'Internet of Things Applications', description: 'IoT meaning, sensors, smart homes, and cities.', order: 61, subtopics: ['Meaning of IoT', 'Smart cities', 'Sensors and connected devices', 'Industrial applications', 'Smart homes', 'Security and privacy issues'] },
    { title: 'Data Protection and Backup Systems', description: 'Data security, backup types, and disaster recovery.', order: 62, subtopics: ['Data security', 'Disaster recovery', 'Backup types', 'Business continuity concepts', 'Redundancy', 'Safe restoration of data'] },
    { title: 'Revision and Examination (SSS 3 Term 1)', description: 'Integrated revision and networking review.', order: 63, subtopics: ['Integrated revision', 'Networking and cloud review', 'Programming practical', 'End-of-term assessment'] },
    // SSS 3 Second Term
    { title: 'Advanced Web Design', description: 'JavaScript basics, forms, interactive pages.', order: 64, subtopics: ['JavaScript basics', 'Forms and validation', 'Interactive web pages', 'Web accessibility', 'Responsive design'] },
    { title: 'Advanced Database Management', description: 'Relational databases, SQL concepts, and queries.', order: 65, subtopics: ['Relational databases', 'Sorting and filtering', 'SQL concepts', 'Forms and reports', 'Queries', 'Database security'] },
    { title: 'Networking III', description: 'Network security, VPNs, and firewalls.', order: 66, subtopics: ['Network security concepts', 'Secure wireless networks', 'VPNs', 'Monitoring and troubleshooting', 'Firewalls'] },
    { title: 'Digital Project Management', description: 'Planning, milestones, tools, and roles.', order: 67, subtopics: ['Project planning', 'Collaboration tools', 'Requirements and milestones', 'Testing and documentation', 'Team roles', 'Project evaluation'] },
    { title: 'Artificial Intelligence and Emerging Technologies', description: 'Generative AI, robotics, and applications.', order: 68, subtopics: ['Generative AI awareness', 'Robotics', 'AI applications', 'Ethical and social implications', 'Automation'] },
    { title: 'Digital Forensics and Cyber Awareness', description: 'Digital evidence, forensics, and incident response.', order: 69, subtopics: ['Meaning of digital forensics', 'Responsible handling of evidence', 'Digital evidence awareness', 'Legal and ethical considerations', 'Cyber incident response'] },
    { title: 'Digital Ethics and Intellectual Property', description: 'Copyright, licensing, plagiarism, and open-source.', order: 70, subtopics: ['Copyright', 'Open-source concepts', 'Licensing', 'Privacy', 'Plagiarism', 'Responsible creation and sharing'] },
    { title: 'Digital Entrepreneurship and Careers', description: 'Business opportunities, technology careers, skills.', order: 71, subtopics: ['Digital business opportunities', 'Professional communication', 'Technology careers', 'Entrepreneurship skills', 'Portfolio development'] },
    { title: 'Revision and Examination Preparation (SSS 3 Term 2)', description: 'Comprehensive revision, practical tasks.', order: 72, subtopics: ['Comprehensive revision', 'Case studies', 'Practical tasks', 'Mock examination'] },
    // SSS 3 Third Term
    { title: 'Comprehensive Digital Technologies Revision', description: 'Review of hardware, software, networks, and security.', order: 73, subtopics: ['Review of SSS1–SSS3 concepts', 'Programming and databases', 'Hardware and software', 'Cybersecurity and digital ethics', 'Networks and internet'] },
    { title: 'SSCE Practical Preparation', description: 'Computer-based practical skills and tasks.', order: 74, subtopics: ['Computer-based practical skills', 'Database tasks', 'Word processing', 'Programming tasks', 'Spreadsheet tasks', 'Web-design tasks'] },
    { title: 'Problem Solving and Computational Thinking', description: 'Decomposition, pattern recognition, and algorithms.', order: 75, subtopics: ['Decomposition', 'Algorithm design', 'Pattern recognition', 'Flowcharts and pseudocode', 'Abstraction', 'Testing solutions'] },
    { title: 'Digital Citizenship and Online Responsibility', description: 'Digital identity, privacy, misinformation, and ethics.', order: 76, subtopics: ['Digital identity', 'Misinformation awareness', 'Privacy and security', 'Digital footprints', 'Responsible communication', 'Ethical technology use'] },
    { title: 'Technology and National Development', description: 'Digital economy, e-government, and inclusion.', order: 77, subtopics: ['Digital economy', 'Innovation and entrepreneurship', 'Technology in education and health', 'Digital inclusion', 'E-government', 'Challenges and opportunities'] },
    { title: 'Digital Innovation Project', description: 'Problem identification, research, design, testing.', order: 78, subtopics: ['Problem identification', 'Prototype/development', 'Research', 'Testing', 'Design', 'Documentation and presentation'] },
    { title: 'Career and Further Study Pathways', description: 'ICT careers, skills, employability, and lifelong learning.', order: 79, subtopics: ['ICT and technology careers', 'Entrepreneurship and employability', 'Relevant skills and qualifications', 'Lifelong learning', 'Building a digital portfolio'] },
    { title: 'Final Revision and Mock Examination', description: 'Full-course revision and structured questions.', order: 80, subtopics: ['Full-course revision', 'Practical examination practice', 'Objective practice', 'Mock examination', 'Structured questions'] },
    { title: 'Final Assessment and Transition', description: 'Project reflection, competency review, and readiness.', order: 81, subtopics: ['Project reflection', 'Examination readiness', 'Practical competency review', 'Responsible technology use after secondary school'] }
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
