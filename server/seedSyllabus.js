require("dotenv").config()

const pool = require("./src/config/database")

function makeSlug(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

async function getSubject(subjectSlug) {
  const result = await pool.query(
    `
    SELECT id, name, slug
    FROM subjects
    WHERE slug = $1
    LIMIT 1
    `,
    [subjectSlug],
  )

  if (result.rows.length === 0) {
    throw new Error(
      `Subject not found: ${subjectSlug}`,
    )
  }

  return result.rows[0]
}

async function createSyllabus(
  subjectId,
  exam,
  year,
  title,
  description,
) {
  const result = await pool.query(
    `
    INSERT INTO syllabuses
    (
      subject_id,
      exam,
      syllabus_year,
      title,
      description,
      is_active
    )
    VALUES
    ($1, $2, $3, $4, $5, TRUE)

    ON CONFLICT
    (subject_id, exam, syllabus_year)

    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      is_active = TRUE

    RETURNING id
    `,
    [
      subjectId,
      exam,
      year,
      title,
      description,
    ],
  )

  return result.rows[0].id
}

async function addTopic(
  syllabusId,
  title,
  description,
  topicOrder,
) {
  const result = await pool.query(
    `
    INSERT INTO topics
    (
      syllabus_id,
      title,
      slug,
      description,
      topic_order,
      is_active
    )
    VALUES
    ($1, $2, $3, $4, $5, TRUE)

    ON CONFLICT
    (syllabus_id, slug)

    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      topic_order = EXCLUDED.topic_order,
      is_active = TRUE

    RETURNING id
    `,
    [
      syllabusId,
      title,
      makeSlug(title),
      description,
      topicOrder,
    ],
  )

  return result.rows[0].id
}

async function addSubtopic(
  topicId,
  title,
  description,
  subtopicOrder,
) {
  await pool.query(
    `
    INSERT INTO subtopics
    (
      topic_id,
      title,
      slug,
      description,
      subtopic_order,
      is_active
    )
    VALUES
    ($1, $2, $3, $4, $5, TRUE)

    ON CONFLICT
    (topic_id, slug)

    DO UPDATE SET
      title = EXCLUDED.title,
      description = EXCLUDED.description,
      subtopic_order = EXCLUDED.subtopic_order,
      is_active = TRUE
    `,
    [
      topicId,
      title,
      makeSlug(title),
      description,
      subtopicOrder,
    ],
  )
}

async function seedTopic(
  syllabusId,
  topic,
  topicOrder,
) {
  const topicId = await addTopic(
    syllabusId,
    topic.title,
    topic.description || "",
    topicOrder,
  )

  for (
    let i = 0;
    i < topic.subtopics.length;
    i++
  ) {
    await addSubtopic(
      topicId,
      topic.subtopics[i],
      "",
      i + 1,
    )
  }

  console.log(
    `✓ ${topicOrder}. ${topic.title} (${topic.subtopics.length} subtopics)`,
  )
}

async function seedGeneralMathematics() {
  const subject =
    await getSubject(
      "general-mathematics",
    )

  const syllabusId =
    await createSyllabus(
      subject.id,
      "WAEC",
      "2026/2027",
      "WAEC General Mathematics",
      "Structured General Mathematics syllabus topics and subtopics for examination preparation.",
    )

  const topics = [
    {
      title: "Number Bases",
      subtopics: [
        "Conversion between number bases",
        "Conversion from base 10 to other bases",
        "Conversion from other bases to base 10",
        "Conversion from one base to another base",
        "Addition in different number bases",
        "Subtraction in different number bases",
        "Multiplication in different number bases",
        "Division in different number bases",
        "Applications of number bases",
      ],
    },

    {
      title: "Modular Arithmetic",
      subtopics: [
        "Meaning of modular arithmetic",
        "Congruence modulo a number",
        "Addition modulo a number",
        "Subtraction modulo a number",
        "Multiplication modulo a number",
        "Division and modular inverses",
        "Applications of modular arithmetic",
      ],
    },

    {
      title: "Fractions, Decimals and Approximations",
      subtopics: [
        "Types of fractions",
        "Equivalent fractions",
        "Operations with fractions",
        "Decimals and place values",
        "Conversion between fractions and decimals",
        "Recurring decimals",
        "Rounding off numbers",
        "Decimal places",
        "Significant figures",
        "Approximation and estimation",
        "Percentage error",
      ],
    },

    {
      title: "Indices",
      subtopics: [
        "Meaning of indices",
        "Laws of indices",
        "Positive indices",
        "Zero indices",
        "Negative indices",
        "Fractional indices",
        "Simplifying expressions involving indices",
        "Equations involving indices",
      ],
    },

    {
      title: "Standard Form",
      subtopics: [
        "Meaning of standard form",
        "Writing numbers in standard form",
        "Converting standard form to ordinary form",
        "Multiplication in standard form",
        "Division in standard form",
        "Addition and subtraction in standard form",
        "Applications of standard form",
      ],
    },

    {
      title: "Logarithms",
      subtopics: [
        "Meaning of logarithms",
        "Common logarithms",
        "Laws of logarithms",
        "Changing between logarithmic and index forms",
        "Using logarithm tables",
        "Antilogarithms",
        "Change of base",
        "Solving logarithmic equations",
        "Applications of logarithms",
      ],
    },

    {
      title: "Sequences and Series",
      subtopics: [
        "Meaning of sequences",
        "Patterns in sequences",
        "Arithmetic sequences",
        "Common difference",
        "nth term of an arithmetic sequence",
        "Arithmetic series",
        "Sum of arithmetic series",
        "Geometric sequences",
        "Common ratio",
        "nth term of a geometric sequence",
        "Geometric series",
        "Sum of geometric series",
        "Applications of sequences and series",
      ],
    },

    {
      title: "Sets",
      subtopics: [
        "Meaning of sets",
        "Description of sets",
        "Types of sets",
        "Subsets",
        "Universal set",
        "Empty set",
        "Set notation",
        "Union of sets",
        "Intersection of sets",
        "Complement of a set",
        "Venn diagrams",
        "Cardinality of sets",
        "Applications of sets",
      ],
    },

    {
      title: "Logical Reasoning",
      subtopics: [
        "Statements and propositions",
        "Truth values",
        "Logical connectives",
        "Negation",
        "Conjunction",
        "Disjunction",
        "Implication",
        "Truth tables",
        "Simple logical arguments",
        "Applications of logical reasoning",
      ],
    },

    {
      title: "Rational Numbers",
      subtopics: [
        "Meaning of rational numbers",
        "Representation of rational numbers",
        "Ordering rational numbers",
        "Operations with rational numbers",
        "Properties of rational numbers",
        "Fractions as rational numbers",
        "Applications of rational numbers",
      ],
    },

    {
      title: "Surds",
      subtopics: [
        "Meaning of surds",
        "Types of surds",
        "Simplifying surds",
        "Addition and subtraction of surds",
        "Multiplication of surds",
        "Division of surds",
        "Rationalising denominators",
        "Equations involving surds",
      ],
    },

    {
      title: "Matrices and Determinants",
      subtopics: [
        "Meaning of matrices",
        "Order of a matrix",
        "Types of matrices",
        "Equality of matrices",
        "Addition and subtraction of matrices",
        "Scalar multiplication",
        "Matrix multiplication",
        "Determinants of 2 × 2 matrices",
        "Inverse of a 2 × 2 matrix",
        "Solving simultaneous equations using matrices",
        "Applications of matrices",
      ],
    },

    {
      title: "Ratio, Proportion and Rates",
      subtopics: [
        "Meaning of ratio",
        "Simplifying ratios",
        "Dividing quantities in a given ratio",
        "Equivalent ratios",
        "Direct proportion",
        "Inverse proportion",
        "Joint proportion",
        "Rates",
        "Applications of ratio and proportion",
      ],
    },

    {
      title: "Percentages",
      subtopics: [
        "Meaning of percentage",
        "Percentage of a quantity",
        "Percentage increase",
        "Percentage decrease",
        "Percentage change",
        "Reverse percentages",
        "Applications of percentages",
      ],
    },

    {
      title: "Financial Arithmetic",
      subtopics: [
        "Profit and loss",
        "Cost price and selling price",
        "Discount",
        "Commission",
        "Simple interest",
        "Compound interest",
        "Depreciation",
        "Appreciation",
        "Hire purchase",
        "Taxation",
        "Exchange rates",
        "Financial applications",
      ],
    },

    {
      title: "Binary Operations",
      subtopics: [
        "Meaning of binary operations",
        "Closure",
        "Commutative property",
        "Associative property",
        "Identity element",
        "Inverse element",
        "Constructing binary operations",
        "Solving equations involving binary operations",
      ],
    },

    {
      title: "Algebraic Expressions",
      subtopics: [
        "Algebraic terms",
        "Coefficients and constants",
        "Like and unlike terms",
        "Simplifying algebraic expressions",
        "Expansion of brackets",
        "Factorisation",
        "Common factors",
        "Difference of two squares",
        "Quadratic factorisation",
        "Algebraic fractions",
        "Simplifying algebraic fractions",
      ],
    },

    {
      title: "Linear Equations and Inequalities",
      subtopics: [
        "Simple linear equations",
        "Equations involving brackets",
        "Equations involving fractions",
        "Linear equations in one variable",
        "Linear inequalities",
        "Number line representation",
        "Word problems involving linear equations",
        "Applications of inequalities",
      ],
    },

    {
      title: "Quadratic Equations",
      subtopics: [
        "Meaning of quadratic equations",
        "Solving by factorisation",
        "Completing the square",
        "Quadratic formula",
        "Nature of roots",
        "Discriminant",
        "Graphs of quadratic functions",
        "Word problems involving quadratic equations",
      ],
    },

    {
      title: "Simultaneous Linear Equations",
      subtopics: [
        "Meaning of simultaneous equations",
        "Elimination method",
        "Substitution method",
        "Graphical method",
        "Linear equations in two variables",
        "Word problems",
        "Applications of simultaneous equations",
      ],
    },

    {
      title: "Variation",
      subtopics: [
        "Meaning of variation",
        "Direct variation",
        "Inverse variation",
        "Joint variation",
        "Partial variation",
        "Finding constants of variation",
        "Solving variation problems",
        "Applications of variation",
      ],
    },

    {
      title: "Mensuration",
      subtopics: [
        "Perimeter",
        "Area of rectangles and squares",
        "Area of triangles",
        "Area of parallelograms",
        "Area of trapeziums",
        "Area of circles",
        "Circumference of circles",
        "Surface area of solids",
        "Volume of solids",
        "Prisms",
        "Cylinders",
        "Pyramids",
        "Cones",
        "Spheres",
        "Applications of mensuration",
      ],
    },

    {
      title: "Plane Geometry",
      subtopics: [
        "Points and lines",
        "Angles",
        "Parallel lines",
        "Triangles",
        "Properties of triangles",
        "Congruent triangles",
        "Similar triangles",
        "Quadrilaterals",
        "Properties of quadrilaterals",
        "Polygons",
        "Circles",
        "Circle theorems",
        "Geometrical constructions",
        "Loci",
      ],
    },

    {
      title: "Coordinate Geometry",
      subtopics: [
        "Cartesian coordinates",
        "Plotting points",
        "Distance between two points",
        "Midpoint of a line segment",
        "Gradient of a line",
        "Equation of a straight line",
        "Parallel lines",
        "Perpendicular lines",
        "Graphs of linear equations",
        "Applications of coordinate geometry",
      ],
    },

    {
      title: "Trigonometry",
      subtopics: [
        "Right-angled triangles",
        "Sine",
        "Cosine",
        "Tangent",
        "Trigonometric ratios",
        "Using trigonometric tables",
        "Angles of elevation",
        "Angles of depression",
        "Bearings and trigonometry",
        "Sine rule",
        "Cosine rule",
        "Area of a triangle using trigonometry",
        "Applications of trigonometry",
      ],
    },

    {
      title: "Statistics",
      subtopics: [
        "Meaning of statistics",
        "Collection of data",
        "Types of data",
        "Frequency tables",
        "Bar charts",
        "Pie charts",
        "Histograms",
        "Frequency polygons",
        "Line graphs",
        "Mean",
        "Median",
        "Mode",
        "Range",
        "Quartiles",
        "Cumulative frequency",
        "Ogive",
        "Grouped data",
        "Applications of statistics",
      ],
    },

    {
      title: "Probability",
      subtopics: [
        "Meaning of probability",
        "Sample spaces",
        "Events",
        "Simple probability",
        "Probability of complementary events",
        "Mutually exclusive events",
        "Independent events",
        "Combined events",
        "Tree diagrams",
        "Applications of probability",
      ],
    },

    {
      title: "Introductory Calculus",
      subtopics: [
        "Meaning of differentiation",
        "Functions and gradients",
        "Differentiation of simple functions",
        "Rules of differentiation",
        "Applications of differentiation",
        "Stationary points",
        "Maximum and minimum points",
        "Meaning of integration",
        "Integration of simple functions",
        "Applications of integration",
      ],
    },

    {
      title: "Vectors",
      subtopics: [
        "Meaning of vectors",
        "Scalar and vector quantities",
        "Representation of vectors",
        "Magnitude of vectors",
        "Addition of vectors",
        "Subtraction of vectors",
        "Scalar multiplication",
        "Position vectors",
        "Vectors in geometry",
        "Applications of vectors",
      ],
    },

    {
      title: "Transformation",
      subtopics: [
        "Meaning of transformation",
        "Translation",
        "Reflection",
        "Rotation",
        "Enlargement",
        "Scale factor",
        "Matrix representation of transformations",
        "Combination of transformations",
        "Coordinates under transformation",
      ],
    },

    {
      title: "Units and Measurement",
      subtopics: [
        "Standard units",
        "Metric units",
        "Length",
        "Mass",
        "Time",
        "Area",
        "Volume",
        "Capacity",
        "Unit conversion",
        "Accuracy of measurement",
        "Applications of measurement",
      ],
    },
  ]

  console.log(
    "\nSeeding WAEC General Mathematics...\n",
  )

  for (
    let i = 0;
    i < topics.length;
    i++
  ) {
    await seedTopic(
      syllabusId,
      topics[i],
      i + 1,
    )
  }

  console.log(
    `\n✓ General Mathematics completed: ${topics.length} topics.`,
  )
}

async function run() {
  try {
    await seedGeneralMathematics()

    console.log(
      "\nEduDrill syllabus seeding completed successfully.",
    )
  } catch (error) {
    console.error(
      "\nSyllabus seeding failed:",
    )

    console.error(error)
  } finally {
    await pool.end()
  }
}

run()