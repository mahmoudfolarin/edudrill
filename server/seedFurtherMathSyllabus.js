require('dotenv').config();
const pool = require('./src/config/database');

const fMathSyllabus = {
  exam: 'WAEC',
  subject: 'further-mathematics', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Further Mathematics Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    {
      title: 'Number Systems and Sets',
      description: 'Real numbers, indices, surds, and sets.',
      order: 1,
      subtopics: ['Real numbers', 'Indices, logarithms and surds', 'Sets and Venn diagrams', 'Intervals and inequalities']
    },
    {
      title: 'Algebraic Processes',
      description: 'Expressions, factorization, and remainder theorem.',
      order: 2,
      subtopics: ['Algebraic expressions', 'Factorization', 'Algebraic fractions', 'Polynomial operations', 'Remainder and factor theorems']
    },
    {
      title: 'Quadratic Functions',
      description: 'Equations, roots, and graphs.',
      order: 3,
      subtopics: ['Quadratic equations', 'Roots and relationships', 'Graphs', 'Discriminant', 'Simultaneous equations']
    },
    {
      title: 'Sequences and Series',
      description: 'Arithmetic and geometric progressions.',
      order: 4,
      subtopics: ['Arithmetic progression', 'Geometric progression', 'Nth term', 'Sum of series', 'Applications']
    },
    {
      title: 'Binomial Theorem',
      description: 'Expansion and binomial coefficients.',
      order: 5,
      subtopics: ['Expansion', 'Binomial coefficients', 'General term', 'Applications']
    },
    {
      title: 'Mathematical Induction',
      description: 'Principle of induction and divisibility.',
      order: 6,
      subtopics: ['Principle of induction', 'Identities', 'Divisibility', 'Inequality proofs']
    },
    // SSS 1 Second Term
    {
      title: 'Functions',
      description: 'Relations, domain, range, and graphs.',
      order: 7,
      subtopics: ['Relations', 'Domain and range', 'Composite functions', 'Inverse functions', 'Graphs']
    },
    {
      title: 'Coordinate Geometry',
      description: 'Straight lines, gradients, and circles.',
      order: 8,
      subtopics: ['Straight lines', 'Gradient and intercepts', 'Distance and midpoint', 'Section formula', 'Circles']
    },
    {
      title: 'Trigonometry',
      description: 'Ratios, identities, and equations.',
      order: 9,
      subtopics: ['Ratios', 'Identities', 'Compound angles', 'Multiple angles', 'Equations']
    },
    {
      title: 'Vectors',
      description: 'Notation, magnitude, and operations.',
      order: 10,
      subtopics: ['Notation', 'Magnitude and direction', 'Vector operations', 'Scalar multiplication', 'Position vectors']
    },
    {
      title: 'Matrices and Determinants',
      description: 'Operations, inverse, and applications.',
      order: 11,
      subtopics: ['Types of matrices', 'Operations', 'Determinants', 'Inverse matrix', 'Applications']
    },
    {
      title: 'Transformations',
      description: 'Translation, reflection, rotation.',
      order: 12,
      subtopics: ['Translation', 'Reflection', 'Rotation', 'Enlargement', 'Transformation matrices']
    },
    // SSS 1 Third Term
    {
      title: 'Differentiation',
      description: 'Limits, first principles, and rules.',
      order: 13,
      subtopics: ['Limits', 'First principles', 'Rules of differentiation', 'Standard functions', 'Gradients and rates']
    },
    {
      title: 'Applications of Differentiation',
      description: 'Stationary points, curves, and optimization.',
      order: 14,
      subtopics: ['Stationary points', 'Maximum and minimum', 'Curve behaviour', 'Optimization', 'Related rates']
    },
    {
      title: 'Integration',
      description: 'Indefinite and definite integrals.',
      order: 15,
      subtopics: ['Antiderivatives', 'Indefinite integrals', 'Standard integrals', 'Substitution', 'Definite integrals']
    },
    {
      title: 'Applications of Integration',
      description: 'Area under curves and kinematics.',
      order: 16,
      subtopics: ['Area under curves', 'Area between curves', 'Displacement from velocity', 'Applications']
    },
    {
      title: 'Statistics',
      description: 'Central tendency, dispersion, and grouped data.',
      order: 17,
      subtopics: ['Central tendency', 'Dispersion', 'Grouped data', 'Cumulative frequency', 'Statistical graphs']
    },
    {
      title: 'Probability',
      description: 'Sample spaces, rules, and conditional probability.',
      order: 18,
      subtopics: ['Sample spaces', 'Probability rules', 'Conditional probability', 'Independent events', 'Tree diagrams']
    },
    // SSS 2 First Term
    {
      title: 'Advanced Algebra',
      description: 'Polynomials, partial fractions, and inequalities.',
      order: 19,
      subtopics: ['Polynomial equations', 'Partial fractions', 'Inequalities', 'Modulus functions', 'Rational functions']
    },
    {
      title: 'Complex Numbers',
      description: 'Imaginary numbers, operations, and Argand diagrams.',
      order: 20,
      subtopics: ['Imaginary numbers', 'Operations', 'Argand diagram', 'Modulus and argument', 'Conjugates']
    },
    {
      title: "De Moivre's Theorem",
      description: 'Polar form, powers, and roots.',
      order: 21,
      subtopics: ['Polar form', 'Powers', 'Roots', 'Geometric interpretation']
    },
    {
      title: 'Further Trigonometry',
      description: 'Inverse functions and general solutions.',
      order: 22,
      subtopics: ['Inverse functions', 'General solutions', 'Identities', 'Equations', 'R-form expressions']
    },
    {
      title: 'Matrices and Linear Equations',
      description: "Inverse matrices and Cramer's rule.",
      order: 23,
      subtopics: ['Inverse matrix', 'Simultaneous equations', 'Determinants', "Cramer's rule"]
    },
    {
      title: '3D Vectors',
      description: 'Three-dimensional vectors, scalar, and vector products.',
      order: 24,
      subtopics: ['Three-dimensional vectors', 'Scalar and vector products', 'Lines and planes', 'Applications']
    },
    // SSS 2 Second Term
    {
      title: 'Advanced Differentiation',
      description: 'Product, quotient, chain, and implicit rules.',
      order: 25,
      subtopics: ['Product rule', 'Quotient rule', 'Chain rule', 'Implicit differentiation', 'Parametric differentiation']
    },
    {
      title: 'Further Applications of Differentiation',
      description: 'Curve sketching, rates of change, and approximations.',
      order: 26,
      subtopics: ['Curve sketching', 'Optimization', 'Rates of change', 'Approximations', 'Motion']
    },
    {
      title: 'Advanced Integration',
      description: 'Parts, substitution, and partial fractions.',
      order: 27,
      subtopics: ['Integration by parts', 'Substitution', 'Partial fractions', 'Definite integrals', 'Areas and volumes']
    },
    {
      title: 'Differential Equations',
      description: 'First-order equations and separation of variables.',
      order: 28,
      subtopics: ['First-order equations', 'Separation of variables', 'Initial conditions', 'Growth and decay', 'Applications']
    },
    {
      title: 'Mechanics: Kinematics',
      description: 'Displacement, velocity, and acceleration.',
      order: 29,
      subtopics: ['Displacement', 'Velocity and acceleration', 'Motion graphs', 'Constant acceleration', 'Vertical motion']
    },
    {
      title: 'Forces and Equilibrium',
      description: 'Resultant forces, friction, and moments.',
      order: 30,
      subtopics: ['Resultant forces', 'Equilibrium', 'Friction', 'Moments', 'Couples']
    },
    // SSS 2 Third Term
    {
      title: 'Statistics and Probability',
      description: 'Distributions, binomial, and normal.',
      order: 31,
      subtopics: ['Probability distributions', 'Binomial distribution', 'Mean and variance', 'Normal distribution', 'Applications']
    },
    {
      title: 'Permutations and Combinations',
      description: 'Factorials and restricted arrangements.',
      order: 32,
      subtopics: ['Factorials', 'Permutations', 'Combinations', 'Restricted arrangements', 'Applications']
    },
    {
      title: 'Mathematical Modelling',
      description: 'Variables, model formation, and interpretation.',
      order: 33,
      subtopics: ['Variables and assumptions', 'Model formation', 'Interpretation', 'Validation', 'Applications']
    },
    {
      title: 'Linear Programming',
      description: 'Inequalities, feasible regions, and optimization.',
      order: 34,
      subtopics: ['Inequalities', 'Feasible regions', 'Objective functions', 'Optimization']
    },
    {
      title: 'Numerical Methods',
      description: 'Approximation, bisection, and numerical integration.',
      order: 35,
      subtopics: ['Approximation', 'Errors', 'Bisection', 'Newton-Raphson', 'Numerical integration']
    },
    {
      title: 'Revision and Examination Practice',
      description: 'Theory, worked problems, and problem solving.',
      order: 36,
      subtopics: ['Theory', 'Worked problems', 'Past questions', 'Problem solving']
    },
    // SSS 3 First Term
    {
      title: 'Advanced Complex Numbers',
      description: "Argand diagrams, loci, and De Moivre's.",
      order: 37,
      subtopics: ['Argand diagrams', 'Polar representation', "De Moivre's theorem", 'Roots', 'Loci']
    },
    {
      title: 'Further Calculus',
      description: 'Advanced differentiation and implicit forms.',
      order: 38,
      subtopics: ['Advanced differentiation', 'Implicit and parametric forms', 'Advanced integration', 'Curve analysis']
    },
    {
      title: 'Differential Equations (Advanced)',
      description: 'First-order equations, growth, and decay.',
      order: 39,
      subtopics: ['First-order equations', 'Initial conditions', 'Growth and decay', 'Motion applications']
    },
    {
      title: 'Mechanics',
      description: "Kinematics, Newton's laws, and projectiles.",
      order: 40,
      subtopics: ['Kinematics', "Newton's laws", 'Projectiles', 'Work, energy and power', 'Momentum and impulse']
    },
    {
      title: 'Circular Motion',
      description: 'Radians, angular motion, and centripetal force.',
      order: 41,
      subtopics: ['Radians', 'Angular motion', 'Centripetal acceleration', 'Centripetal force', 'Applications']
    },
    {
      title: 'Vectors and 3D Geometry',
      description: 'Lines, planes, angles, and intersections.',
      order: 42,
      subtopics: ['Lines', 'Planes', 'Angles', 'Intersections', 'Applications']
    },
    // SSS 3 Second Term
    {
      title: 'Probability Distributions',
      description: 'Discrete, binomial, Poisson, and continuous.',
      order: 43,
      subtopics: ['Discrete distributions', 'Binomial', 'Poisson', 'Continuous distributions', 'Normal distribution']
    },
    {
      title: 'Statistical Inference',
      description: 'Sampling, estimation, and hypothesis testing.',
      order: 44,
      subtopics: ['Sampling', 'Population and sample', 'Estimation', 'Hypothesis testing', 'Correlation and regression']
    },
    {
      title: 'Numerical Analysis',
      description: 'Errors, root-finding, and interpolation.',
      order: 45,
      subtopics: ['Errors', 'Root-finding', 'Interpolation', 'Numerical integration', 'Applications']
    },
    {
      title: 'Operations Research',
      description: 'Linear programming and network models.',
      order: 46,
      subtopics: ['Linear programming', 'Transportation problems', 'Network models', 'Optimization']
    },
    {
      title: 'Mathematical Modelling (Advanced)',
      description: 'Differential and statistical models.',
      order: 47,
      subtopics: ['Model formulation', 'Differential models', 'Statistical models', 'Interpretation', 'Limitations']
    },
    {
      title: 'Further Geometry',
      description: 'Coordinate geometry, conics, and transformations.',
      order: 48,
      subtopics: ['Coordinate geometry', 'Conics', 'Transformations', 'Loci', 'Problem solving']
    },
    // SSS 3 Third Term
    {
      title: 'Comprehensive Revision',
      description: 'Algebra, functions, matrices, and vectors.',
      order: 49,
      subtopics: ['Algebra', 'Functions', 'Matrices and vectors', 'Calculus', 'Statistics and probability', 'Mechanics']
    },
    {
      title: 'Advanced Problem Solving',
      description: 'Multi-step problems, proof, and applied mathematics.',
      order: 50,
      subtopics: ['Multi-step problems', 'Proof', 'Modelling', 'Applied mathematics', 'Reasoning']
    },
    {
      title: 'Examination Preparation',
      description: 'Objective, theory, and past questions.',
      order: 51,
      subtopics: ['Objective questions', 'Theory', 'Past questions', 'Time management', 'Common errors']
    },
    {
      title: 'Calculus and Mechanics Review',
      description: 'Differentiation, integration, and kinematics.',
      order: 52,
      subtopics: ['Differentiation', 'Integration', 'Differential equations', 'Kinematics', 'Forces and energy']
    },
    {
      title: 'Statistics and Probability Review',
      description: 'Distributions, correlation, regression, and sampling.',
      order: 53,
      subtopics: ['Distributions', 'Correlation', 'Regression', 'Probability', 'Sampling']
    }
  ]
};

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function seedData() {
  try {
    console.log("Starting Further Mathematics seeding process...");
    
    // Get subject_id
    const subjectResult = await pool.query('SELECT id FROM subjects WHERE slug = $1', [fMathSyllabus.subject]);
    if (subjectResult.rows.length === 0) {
      console.log(`Subject ${fMathSyllabus.subject} not found in DB.`);
      return;
    }
    const subjectId = subjectResult.rows[0].id;
    
    // Create Syllabus
    const sylRes = await pool.query(
      `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description, is_active)
       VALUES ($1, $2, $3, $4, $5, TRUE) RETURNING id`,
      [
        subjectId,
        fMathSyllabus.exam,
        fMathSyllabus.syllabus_year,
        fMathSyllabus.title,
        fMathSyllabus.description
      ]
    );
    const syllabusId = sylRes.rows[0].id;
    console.log(`Created Syllabus: ${fMathSyllabus.title}`);

    // Link syllabus to all active exams
    const examsRes = await pool.query('SELECT id FROM exams WHERE is_active = TRUE');
    for (const exam of examsRes.rows) {
      await pool.query(
        `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active) VALUES ($1, $2, TRUE) ON CONFLICT DO NOTHING`,
        [syllabusId, exam.id]
      );
    }
    console.log(`Linked Syllabus to ${examsRes.rows.length} exams.`);

    for (const topic of fMathSyllabus.topics) {
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

    console.log("Further Mathematics Seeding complete!");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    pool.end();
  }
}

seedData();
