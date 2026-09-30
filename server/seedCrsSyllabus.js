require('dotenv').config();
const pool = require('./src/config/database');

const crsSyllabus = {
  exam: 'WAEC',
  subject: 'christian-religious-studies', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Christian Religious Studies Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Creation and the Nature of God',
      description: 'The creation accounts and God as Creator.',
      order: 1,
      subtopics: ['The creation accounts', 'God as Creator', "Human beings in God's image", 'The purpose of creation', 'Stewardship of creation']
    },
    {
      title: 'The Fall of Humanity',
      description: 'The temptation, fall, and consequences.',
      order: 2,
      subtopics: ['The temptation and fall', 'Disobedience and its consequences', 'Sin and separation from God', 'Responsibility and accountability', 'Lessons for Christian living']
    },
    {
      title: 'Cain and Abel',
      description: 'The story of Cain and Abel.',
      order: 3,
      subtopics: ['The story of Cain and Abel', 'Worship and attitude', 'Jealousy and anger', 'Murder and responsibility', "God's judgment and mercy"]
    },
    {
      title: 'Noah and the Flood',
      description: "Noah's obedience and the flood.",
      order: 4,
      subtopics: ["Noah's obedience", 'The building of the ark', 'The flood', 'The covenant with Noah', 'Faith, obedience and judgment']
    },
    {
      title: 'Abraham and the Covenant',
      description: 'The call of Abraham and his faith.',
      order: 5,
      subtopics: ['The call of Abraham', 'Faith and obedience', "God's covenant", "Abraham's hospitality", 'The promised son', "Lessons from Abraham's faith"]
    },
    {
      title: 'Isaac and Jacob',
      description: 'Isaac as the child of promise, Jacob and Esau.',
      order: 6,
      subtopics: ['Isaac as the child of promise', 'Jacob and Esau', 'Birthright and blessing', "Jacob's encounter with God", "God's covenant promises"]
    },
    // SSS 1 Second Term
    {
      title: 'Joseph',
      description: "Joseph's dreams, trials, and leadership.",
      order: 7,
      subtopics: ["Joseph's dreams", 'Joseph and his brothers', 'Joseph in Egypt', "Joseph's trials", "Joseph's rise to leadership", 'Forgiveness and providence']
    },
    {
      title: 'Moses and the Call to Leadership',
      description: "Moses' early life and mission.",
      order: 8,
      subtopics: ["Moses' early life", 'The call at the burning bush', 'The mission to Pharaoh', 'Leadership and dependence on God']
    },
    {
      title: 'The Exodus',
      description: 'The Passover and departure from Egypt.',
      order: 9,
      subtopics: ['The Passover', 'The departure from Egypt', 'The crossing of the Red Sea', "God's protection and deliverance"]
    },
    {
      title: 'The Ten Commandments',
      description: 'The covenant at Sinai and the commandments.',
      order: 10,
      subtopics: ['The covenant at Sinai', 'The commandments', 'Worship and relationship with God', 'Human relationships and moral duties', 'Contemporary applications']
    },
    {
      title: 'Israel in the Wilderness',
      description: 'Provision of manna and complaints.',
      order: 11,
      subtopics: ['Provision of manna', 'Complaints and disobedience', "God's guidance", 'Faith and perseverance', 'Consequences of unbelief']
    },
    // SSS 1 Third Term
    {
      title: 'Joshua and the Conquest',
      description: "Joshua's leadership and the conquest of Jericho.",
      order: 12,
      subtopics: ["Joshua's leadership", 'Crossing the Jordan', 'Jericho', 'Faith and courage', 'Settlement of the land']
    },
    {
      title: 'The Judges',
      description: 'Meaning, role of judges, and deliverance.',
      order: 13,
      subtopics: ['Meaning and role of judges', 'Cycles of sin and deliverance', 'Deborah', 'Gideon', 'Samson', 'Lessons on leadership']
    },
    {
      title: 'Samuel and the Transition to Kingship',
      description: "Samuel's childhood and Israel's demand for a king.",
      order: 14,
      subtopics: ["Samuel's childhood and call", "Israel's demand for a king", 'Samuel as prophet and judge', 'Lessons in obedience']
    },
    {
      title: 'Saul',
      description: "Saul's selection, disobedience, and rejection.",
      order: 15,
      subtopics: ["Saul's selection as king", "Saul's disobedience", 'Rejection of Saul', 'Leadership lessons']
    },
    {
      title: 'David',
      description: "David's anointing, Goliath, and kingship.",
      order: 16,
      subtopics: ["David's anointing", 'David and Goliath', 'David and Saul', "David's kingship", 'Covenant with David', 'Leadership and faith']
    },
    // SSS 2 First Term
    {
      title: 'Solomon',
      description: "Solomon's succession, wisdom, and the temple.",
      order: 17,
      subtopics: ["Solomon's succession", 'Request for wisdom', 'The building of the temple', "Solomon's dedication of the temple", 'Wealth, wisdom and responsibility']
    },
    {
      title: 'Elijah',
      description: 'Elijah and Ahab, the drought, and Mount Carmel.',
      order: 18,
      subtopics: ['Elijah and Ahab', 'The drought', 'Mount Carmel', 'The prophets of Baal', "Elijah's discouragement", "God's care and restoration"]
    },
    {
      title: 'Elisha',
      description: "Elisha's call and miracles.",
      order: 19,
      subtopics: ["Elisha's call", 'Miracles of Elisha', "Naaman's healing", 'Compassion and faith', 'Prophetic ministry']
    },
    {
      title: 'Amos',
      description: 'Amos, social justice, and true worship.',
      order: 20,
      subtopics: ['Amos and social justice', 'Condemnation of oppression', 'True worship and righteousness', 'Justice and responsible leadership']
    },
    {
      title: 'Hosea',
      description: "Hosea's marriage and Israel's unfaithfulness.",
      order: 21,
      subtopics: ["Hosea's marriage as a prophetic sign", "Israel's unfaithfulness", "God's love and forgiveness", 'Repentance and restoration']
    },
    // SSS 2 Second Term
    {
      title: 'Isaiah',
      description: "Isaiah's call, prophecy, and messianic hope.",
      order: 22,
      subtopics: ["Isaiah's call", 'Holiness of God', 'Prophecy and judgment', 'The remnant', 'Messianic hope']
    },
    {
      title: 'Jeremiah',
      description: "Jeremiah's call, the new covenant, and faithfulness.",
      order: 23,
      subtopics: ["Jeremiah's call", 'Prophetic opposition', 'The new covenant', 'Jerusalem and judgment', 'Faithfulness under pressure']
    },
    {
      title: 'Ezekiel',
      description: "Ezekiel's call, visions, and the valley of dry bones.",
      order: 24,
      subtopics: ["Ezekiel's call", 'Visions', 'Personal responsibility', 'The valley of dry bones', 'Restoration and hope']
    },
    {
      title: 'Daniel',
      description: "Daniel's faith, the fiery furnace, and the lions' den.",
      order: 25,
      subtopics: ["Daniel's faith in Babylon", 'Food and religious commitment', 'The fiery furnace', "The lions' den", 'Faith under persecution']
    },
    {
      title: 'The Exile and Restoration',
      description: 'Causes of exile, return, and restoration.',
      order: 26,
      subtopics: ['Causes of exile', 'Life in exile', 'Return and restoration', 'Lessons about obedience and hope']
    },
    // SSS 2 Third Term
    {
      title: 'The Birth and Early Life of Jesus',
      description: 'Birth narratives, John the Baptist, and baptism.',
      order: 27,
      subtopics: ['Birth narratives', 'John the Baptist', 'Baptism of Jesus', 'Temptation of Jesus', 'Significance of the incarnation']
    },
    {
      title: "Jesus' Ministry",
      description: 'Calling disciples, teaching, healing, and miracles.',
      order: 28,
      subtopics: ['Calling the disciples', 'Teaching ministry', 'Healing ministry', 'Miracles', 'Compassion and service']
    },
    {
      title: 'Parables of Jesus',
      description: 'Purpose of parables and lessons for Christian life.',
      order: 29,
      subtopics: ['Purpose of parables', 'Sower', 'Good Samaritan', 'Prodigal Son', 'Lost sheep and coin', 'Lessons for Christian life']
    },
    {
      title: 'Sermon on the Mount',
      description: 'Beatitudes, prayer, fasting, and the Golden Rule.',
      order: 30,
      subtopics: ['Beatitudes', 'Salt and light', 'Love for enemies', 'Prayer', 'Fasting', 'Trust in God', 'Golden Rule']
    },
    {
      title: 'Kingdom of God',
      description: "Meaning of the Kingdom and Jesus' teaching.",
      order: 31,
      subtopics: ['Meaning of the Kingdom', "Jesus' teaching", 'Values of the Kingdom', 'Repentance', 'Faith and righteousness']
    },
    // SSS 3 First Term
    {
      title: "Jesus' Passion and Death",
      description: 'Events leading to the arrest, trial, and crucifixion.',
      order: 32,
      subtopics: ['Events leading to the arrest', 'Last Supper', 'Gethsemane', 'Trial', 'Crucifixion', "Meaning of Christ's death"]
    },
    {
      title: 'Resurrection and Ascension',
      description: 'The resurrection, appearances, and ascension.',
      order: 33,
      subtopics: ['The resurrection', 'Appearances of Jesus', 'Great Commission', 'Ascension', 'Christian hope']
    },
    {
      title: 'The Holy Spirit and Pentecost',
      description: 'Promise of the Spirit, Pentecost, and gifts.',
      order: 34,
      subtopics: ['Promise of the Spirit', 'Pentecost', 'Gifts and fruits of the Spirit', 'Witness and mission', 'Unity in the church']
    },
    {
      title: 'Early Christian Community',
      description: 'Fellowship, sharing, worship, and leadership.',
      order: 35,
      subtopics: ['Fellowship', 'Sharing and care', 'Worship', 'Leadership', 'Challenges in the early church']
    },
    {
      title: "Paul's Conversion and Ministry",
      description: "Saul's background, conversion, and missionary calling.",
      order: 36,
      subtopics: ["Saul's background", 'Conversion experience', 'Missionary calling', 'Preaching and opposition', 'Lessons in transformation']
    },
    // SSS 3 Second Term
    {
      title: 'Christian Teaching on Love',
      description: 'Love of God, neighbor, forgiveness, and unity.',
      order: 37,
      subtopics: ['Love of God', 'Love of neighbour', 'Love and forgiveness', 'Practical compassion', 'Christian unity']
    },
    {
      title: 'Christian Teaching on Justice',
      description: 'Justice, righteousness, honesty, and citizenship.',
      order: 38,
      subtopics: ['Justice and righteousness', 'Care for the poor', 'Honesty', 'Oppression and exploitation', 'Responsible citizenship']
    },
    {
      title: 'Christian Teaching on Peace',
      description: 'Peace with God, reconciliation, and peacemaking.',
      order: 39,
      subtopics: ['Peace with God', 'Peace among people', 'Reconciliation', 'Conflict resolution', 'Peacemaking']
    },
    {
      title: 'Christian Marriage and Family Life',
      description: 'Purpose of marriage, faithfulness, and family responsibilities.',
      order: 40,
      subtopics: ['Purpose of marriage', 'Faithfulness', 'Responsibilities in the family', 'Parent-child relationships', 'Respect and mutual care']
    },
    {
      title: 'Christian Attitude to Work and Wealth',
      description: 'Diligence, stewardship, and responsible use of wealth.',
      order: 41,
      subtopics: ['Diligence', 'Stewardship', 'Honest work', 'Contentment', 'Responsible use of wealth', 'Helping others']
    },
    // SSS 3 Third Term
    {
      title: 'Christian Ethics and Contemporary Issues',
      description: 'Truthfulness, corruption, morality, and substance abuse.',
      order: 42,
      subtopics: ['Truthfulness', 'Corruption', 'Bribery', 'Sexual morality', 'Substance abuse', 'Violence', 'Peer pressure', 'Responsible use of technology']
    },
    {
      title: 'Christian Leadership',
      description: 'Servant leadership, integrity, accountability, and humility.',
      order: 43,
      subtopics: ['Servant leadership', 'Integrity', 'Accountability', 'Humility', 'Leadership in church and society']
    },
    {
      title: 'Christian Citizenship',
      description: 'Obedience to authority, rights, and responsibilities.',
      order: 44,
      subtopics: ['Obedience to lawful authority', 'Rights and responsibilities', 'National unity', 'Community service', 'Prayer for society']
    },
    {
      title: 'Revision and Examination Preparation',
      description: 'Revision of Old and New Testament themes.',
      order: 45,
      subtopics: ['Old Testament themes', 'New Testament themes', "Jesus' teachings", 'Christian ethics', 'Essay and objective practice']
    },
    {
      title: 'WASSCE/NECO Practice',
      description: 'Objective, theory, and practical questions.',
      order: 46,
      subtopics: ['Objective questions', 'Structured questions', 'Bible passage interpretation', 'Essay questions', 'Past questions by topic', 'Timed mock examinations']
    }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting CRS seeding process...");
    
    // Get subject_id
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [crsSyllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${crsSyllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    // Create Syllabus
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [
        subjectId,
        crsSyllabus.exam,
        crsSyllabus.syllabus_year,
        crsSyllabus.title,
        crsSyllabus.description
      ]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${crsSyllabus.title}`);

    // Link syllabus to all active exams
    const examsRes = await pool.query('SELECT id FROM exams WHERE is_active = TRUE');
    for (const exam of examsRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, exam.id]
      );
    }
    console.log(`Linked Syllabus to ${examsRes.rows.length} exams.`);

    for (const topic of crsSyllabus.topics) {
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

    console.log("CRS Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
