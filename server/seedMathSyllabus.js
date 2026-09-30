require('dotenv').config();
const pool = require('./src/config/database');

const mathSyllabus = {
  exam: 'WAEC',
  subject: 'general-mathematics',
  syllabus_year: '2026/2027',
  title: 'General Mathematics Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Number Bases',
      description: 'Operations and conversions in different number bases.',
      order: 1,
      subtopics: [
        'Conversion between number bases',
        'Addition, subtraction, multiplication and division in different bases',
        'Applications of number bases'
      ]
    },
    {
      title: 'Indices and Logarithms',
      description: 'Laws of indices and logarithms.',
      order: 2,
      subtopics: [
        'Laws of indices',
        'Zero, negative and fractional indices',
        'Standard form',
        'Logarithms and laws of logarithms',
        'Change of base',
        'Applications'
      ]
    },
    {
      title: 'Surds',
      description: 'Operations and rationalization of surds.',
      order: 3,
      subtopics: [
        'Meaning and identification of surds',
        'Simplification of surds',
        'Addition, subtraction, multiplication and division',
        'Rationalization of denominators'
      ]
    },
    {
      title: 'Sets',
      description: 'Set theory and Venn diagrams.',
      order: 4,
      subtopics: [
        'Definition and notation',
        'Types of sets',
        'Subsets and universal set',
        'Set operations',
        'Venn diagrams',
        'Applications to word problems'
      ]
    },
    {
      title: 'Algebraic Processes',
      description: 'Factorization and formulas.',
      order: 5,
      subtopics: [
        'Expansion of brackets',
        'Factorization',
        'Algebraic fractions',
        'Change of subject of formula',
        'Simplification of algebraic expressions'
      ]
    },
    {
      title: 'Linear Equations and Inequalities',
      description: 'Solving linear equations and inequalities.',
      order: 6,
      subtopics: [
        'Equations in one variable',
        'Simultaneous linear equations',
        'Linear inequalities',
        'Word problems and applications'
      ]
    },
    // SSS 1 Second Term
    {
      title: 'Quadratic Expressions and Equations',
      description: 'Factorization and quadratic formula.',
      order: 7,
      subtopics: [
        'Factorization of quadratic expressions',
        'Solution by factorization',
        'Completing the square',
        'Quadratic formula',
        'Word problems'
      ]
    },
    {
      title: 'Variation',
      description: 'Direct, inverse, joint and partial variation.',
      order: 8,
      subtopics: [
        'Direct variation',
        'Inverse variation',
        'Joint variation',
        'Partial variation',
        'Applications'
      ]
    },
    {
      title: 'Sequences and Series',
      description: 'Arithmetic and Geometric progressions.',
      order: 9,
      subtopics: [
        'Arithmetic progression',
        'Geometric progression',
        'nth term',
        'Sum of terms',
        'Applications'
      ]
    },
    {
      title: 'Matrices',
      description: 'Matrix operations and determinants.',
      order: 10,
      subtopics: [
        'Matrix notation and order',
        'Types of matrices',
        'Addition and subtraction',
        'Scalar multiplication',
        'Matrix multiplication',
        'Determinants and inverse of 2x2 matrices'
      ]
    },
    {
      title: 'Functions',
      description: 'Relations, functions, domain and range.',
      order: 11,
      subtopics: [
        'Relations and functions',
        'Domain and range',
        'Function notation',
        'Composite functions',
        'Inverse functions'
      ]
    },
    // SSS 1 Third Term
    {
      title: 'Geometry',
      description: 'Angles, lines, triangles, and polygons.',
      order: 12,
      subtopics: [
        'Angles and parallel lines',
        'Triangles and quadrilaterals',
        'Properties of polygons',
        'Congruence and similarity',
        'Geometric constructions'
      ]
    },
    {
      title: 'Mensuration',
      description: 'Perimeter, area, and volume.',
      order: 13,
      subtopics: [
        'Perimeter and area',
        'Surface area',
        'Volume of solids',
        'Compound shapes',
        'Applications'
      ]
    },
    {
      title: 'Coordinate Geometry',
      description: 'Cartesian plane and straight lines.',
      order: 14,
      subtopics: [
        'Cartesian plane',
        'Distance between points',
        'Midpoint',
        'Gradient',
        'Equation of a straight line',
        'Parallel and perpendicular lines'
      ]
    },
    {
      title: 'Trigonometry',
      description: 'Sine, cosine, tangent and applications.',
      order: 15,
      subtopics: [
        'Sine, cosine and tangent',
        'Trigonometric ratios',
        'Angles of elevation and depression',
        'Bearings',
        'Applications'
      ]
    },
    {
      title: 'Statistics',
      description: 'Data collection and charts.',
      order: 16,
      subtopics: [
        'Data collection',
        'Frequency tables',
        'Mean, median and mode',
        'Range',
        'Charts and graphs'
      ]
    },
    // SSS 2 First Term
    {
      title: 'Algebraic Fractions',
      description: 'Operations on algebraic fractions.',
      order: 17,
      subtopics: [
        'Simplification',
        'Addition and subtraction',
        'Multiplication and division',
        'Complex algebraic fractions'
      ]
    },
    {
      title: 'Polynomials',
      description: 'Factor and remainder theorems.',
      order: 18,
      subtopics: [
        'Terms and coefficients',
        'Addition and subtraction',
        'Multiplication',
        'Factor theorem',
        'Remainder theorem',
        'Factorization'
      ]
    },
    {
      title: 'Quadratic Functions',
      description: 'Graphs and roots of quadratic functions.',
      order: 19,
      subtopics: [
        'Graphs of quadratic functions',
        'Roots and intercepts',
        'Turning point',
        'Maximum and minimum values',
        'Applications'
      ]
    },
    {
      title: 'Simultaneous Equations',
      description: 'Linear-quadratic systems and graphical solutions.',
      order: 20,
      subtopics: [
        'Linear-linear systems',
        'Linear-quadratic systems',
        'Graphical solutions',
        'Applications'
      ]
    },
    {
      title: 'Inequalities',
      description: 'Linear and quadratic inequalities.',
      order: 21,
      subtopics: [
        'Linear inequalities',
        'Quadratic inequalities',
        'Graphical representation',
        'Solution sets'
      ]
    },
    // SSS 2 Second Term
    {
      title: 'Trigonometric Functions',
      description: 'Graphs and identities.',
      order: 22,
      subtopics: [
        'Graphs of sine and cosine',
        'Trigonometric identities',
        'Trigonometric equations',
        'Exact values'
      ]
    },
    {
      title: 'Circle Geometry',
      description: 'Circle theorems and applications.',
      order: 23,
      subtopics: [
        'Angles in a circle',
        'Chords and arcs',
        'Cyclic quadrilaterals',
        'Tangents',
        'Circle theorems and applications'
      ]
    },
    {
      title: 'Vectors',
      description: 'Vector notation and magnitude.',
      order: 24,
      subtopics: [
        'Vector notation',
        'Magnitude and direction',
        'Addition and subtraction',
        'Scalar multiplication',
        'Position vectors',
        'Geometric applications'
      ]
    },
    {
      title: 'Probability',
      description: 'Sample spaces and events.',
      order: 25,
      subtopics: [
        'Sample space',
        'Events',
        'Simple probability',
        'Mutually exclusive events',
        'Independent events',
        'Tree diagrams'
      ]
    },
    {
      title: 'Permutations and Combinations',
      description: 'Counting principles and factorial notation.',
      order: 26,
      subtopics: [
        'Fundamental counting principle',
        'Factorial notation',
        'Permutations',
        'Combinations',
        'Applications'
      ]
    },
    // SSS 2 Third Term
    {
      title: 'Statistics (Grouped Data)',
      description: 'Mean, quartiles, and ogives.',
      order: 27,
      subtopics: [
        'Grouped data',
        'Mean from frequency distributions',
        'Cumulative frequency',
        'Quartiles',
        'Percentiles',
        'Ogives'
      ]
    },
    {
      title: 'Probability Distributions',
      description: 'Discrete distributions and variance.',
      order: 28,
      subtopics: [
        'Random variables',
        'Discrete distributions',
        'Expected value',
        'Variance',
        'Applications'
      ]
    },
    {
      title: 'Mensuration of Solids',
      description: 'Volume and surface area of 3D shapes.',
      order: 29,
      subtopics: [
        'Prisms',
        'Cylinders',
        'Pyramids',
        'Cones',
        'Spheres',
        'Composite solids'
      ]
    },
    {
      title: 'Geometric Transformations',
      description: 'Translation, reflection, rotation.',
      order: 30,
      subtopics: [
        'Translation',
        'Reflection',
        'Rotation',
        'Enlargement',
        'Combination of transformations'
      ]
    },
    // SSS 3 First Term
    {
      title: 'Advanced Algebra',
      description: 'Revision of indices, surds, and quadratics.',
      order: 31,
      subtopics: [
        'Indices and logarithms revision',
        'Surds',
        'Quadratic equations',
        'Simultaneous equations',
        'Sequences and series',
        'Variation'
      ]
    },
    {
      title: 'Coordinate Geometry (Advanced)',
      description: 'Advanced straight-line graphs and gradients.',
      order: 32,
      subtopics: [
        'Straight-line graphs',
        'Gradients',
        'Distance and midpoint',
        'Intersection of lines',
        'Applications'
      ]
    },
    {
      title: 'Trigonometry (Advanced)',
      description: 'Sine and cosine rules, elevation, depression.',
      order: 33,
      subtopics: [
        'Trigonometric ratios',
        'Identities',
        'Trigonometric equations',
        'Bearings',
        'Elevation and depression',
        'Sine and cosine rules'
      ]
    },
    {
      title: 'Calculus Introduction',
      description: 'Differentiation and limits.',
      order: 34,
      subtopics: [
        'Concept of a function',
        'Limits as an intuitive idea',
        'Differentiation of simple polynomials',
        'Gradient functions',
        'Applications to rates and turning points'
      ]
    },
    // SSS 3 Second Term
    {
      title: 'Integration Introduction',
      description: 'Antiderivatives and definite integrals.',
      order: 35,
      subtopics: [
        'Antiderivatives',
        'Integration of simple polynomials',
        'Definite integrals',
        'Area under simple curves',
        'Applications'
      ]
    },
    {
      title: 'Financial Mathematics',
      description: 'Interest, depreciation, and profit.',
      order: 36,
      subtopics: [
        'Simple interest',
        'Compound interest',
        'Depreciation',
        'Profit and loss',
        'Hire purchase',
        'Annuities and related applications'
      ]
    },
    // SSS 3 Third Term
    {
      title: 'Geometry and Mensuration Revision',
      description: 'Review of plane geometry and mensuration.',
      order: 37,
      subtopics: [
        'Plane geometry',
        'Circle geometry',
        'Mensuration',
        'Similarity and congruence',
        'Geometric constructions'
      ]
    },
    {
      title: 'Algebra and Functions Revision',
      description: 'Review of functions, matrices, and inequalities.',
      order: 38,
      subtopics: [
        'Algebraic manipulation',
        'Functions',
        'Quadratics',
        'Sequences',
        'Matrices',
        'Inequalities'
      ]
    },
    {
      title: 'WASSCE/NECO Examination Preparation',
      description: 'Exam strategies and past questions.',
      order: 39,
      subtopics: [
        'Objective-question strategies',
        'Structured-question practice',
        'Past questions by topic',
        'Timed mock examinations',
        'Error correction and final revision'
      ]
    }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting seeding process...");
    
    // Get subject_id
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [mathSyllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${mathSyllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    // Create Syllabus
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [
        subjectId,
        mathSyllabus.exam,
        mathSyllabus.syllabus_year,
        mathSyllabus.title,
        mathSyllabus.description
      ]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${mathSyllabus.title}`);

    for (const topic of mathSyllabus.topics) {
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
        const subSlug = slugify(subStr) + '-' + Math.floor(Math.random()*1000); // To ensure uniqueness
        
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
              <li>Apply standard formulas and methodologies accurately.</li>
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

    console.log("Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
