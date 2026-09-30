require('dotenv').config();
const pool = require('./src/config/database');

const subjectsData = [
  {
    slug: 'general-mathematics',
    exam: 'waec',
    syllabus_year: '2026/2027',
    title: 'General Mathematics Syllabus',
    description: 'Comprehensive WAEC Mathematics syllabus covering Number & Numeration, Algebra, Geometry, and Statistics.',
    topics: [
      {
        title: 'Number and Numeration', slug: 'math-number-numeration', description: 'Number bases, modular arithmetic, fractions, decimals, approximations and percentages.', order: 1,
        subtopics: [
          { title: 'Number Bases', slug: 'math-number-bases', description: 'Conversion of numbers from one base to another', order: 1, lessons: [{ title: 'Intro to Number Bases', slug: 'intro-number-bases', content: '<p>A number base is a system of counting.</p>' }] },
          { title: 'Fractions and Decimals', slug: 'math-fractions', description: 'Operations on fractions', order: 2, lessons: [{ title: 'Adding Fractions', slug: 'adding-fractions', content: '<p>Find the LCM before adding.</p>' }] }
        ]
      },
      {
        title: 'Algebra', slug: 'math-algebra', description: 'Equations, inequalities, polynomials and variation.', order: 2,
        subtopics: [
          { title: 'Quadratic Equations', slug: 'math-quadratic', description: 'Solving quadratic equations.', order: 1, lessons: [{ title: 'Factorization', slug: 'math-factorization', content: '<p>Solve ax^2 + bx + c = 0</p>' }] },
          { title: 'Linear Inequalities', slug: 'math-inequalities', description: 'Solving inequalities in one variable', order: 2, lessons: [{ title: 'Graphing Inequalities', slug: 'graphing-inequalities', content: '<p>Use number lines to plot ranges.</p>' }] }
        ]
      },
      {
        title: 'Geometry', slug: 'math-geometry', description: 'Lines, angles, polygons, circles.', order: 3,
        subtopics: [
          { title: 'Circle Theorems', slug: 'circle-theorems', description: 'Angles in a circle', order: 1, lessons: [{ title: 'Angles Subtended', slug: 'angles-subtended', content: '<p>The angle at the center is twice the angle at the circumference.</p>' }] },
          { title: 'Polygons', slug: 'polygons', description: 'Interior and exterior angles', order: 2, lessons: [{ title: 'Sum of Interior Angles', slug: 'interior-angles', content: '<p>(n-2) * 180 degrees</p>' }] }
        ]
      },
      {
        title: 'Trigonometry', slug: 'math-trigonometry', description: 'Sine, cosine, tangent.', order: 4,
        subtopics: [
          { title: 'Trigonometric Ratios', slug: 'trig-ratios', description: 'SOH CAH TOA', order: 1, lessons: [{ title: 'SOH CAH TOA rules', slug: 'soh-cah-toa', content: '<p>Sine = Opp/Hyp</p>' }] },
          { title: 'Angles of Elevation', slug: 'angles-elevation', description: 'Depression and elevation', order: 2, lessons: [{ title: 'Practical Examples', slug: 'trig-practical', content: '<p>Draw a right angle triangle first.</p>' }] }
        ]
      },
      {
        title: 'Statistics', slug: 'math-statistics', description: 'Data representation, measures of central tendency.', order: 5,
        subtopics: [
          { title: 'Mean, Median, Mode', slug: 'mean-median-mode', description: 'Averages', order: 1, lessons: [{ title: 'Calculating Mean', slug: 'calculating-mean', content: '<p>Sum of x / n</p>' }] },
          { title: 'Histograms', slug: 'histograms', description: 'Graphical representation', order: 2, lessons: [{ title: 'Drawing Histograms', slug: 'drawing-histograms', content: '<p>Bars must touch each other.</p>' }] }
        ]
      },
      {
        title: 'Probability', slug: 'math-probability', description: 'Experimental and theoretical probability.', order: 6,
        subtopics: [
          { title: 'Independent Events', slug: 'independent-events', description: 'Multiplication rule', order: 1, lessons: [{ title: 'Multiplication Rule', slug: 'multiplication-rule', content: '<p>P(A and B) = P(A) * P(B)</p>' }] },
          { title: 'Mutually Exclusive', slug: 'mutually-exclusive', description: 'Addition rule', order: 2, lessons: [{ title: 'Addition Rule', slug: 'addition-rule', content: '<p>P(A or B) = P(A) + P(B)</p>' }] }
        ]
      },
      {
        title: 'Calculus', slug: 'math-calculus', description: 'Differentiation and integration.', order: 7,
        subtopics: [
          { title: 'Differentiation', slug: 'differentiation', description: 'Power rule', order: 1, lessons: [{ title: 'Power Rule', slug: 'power-rule', content: '<p>dy/dx of x^n is n*x^(n-1)</p>' }] },
          { title: 'Integration', slug: 'integration', description: 'Anti-derivatives', order: 2, lessons: [{ title: 'Basic Integration', slug: 'basic-integration', content: '<p>Add 1 to power and divide by new power.</p>' }] }
        ]
      },
      {
        title: 'Matrices', slug: 'math-matrices', description: 'Addition, subtraction, determinant.', order: 8,
        subtopics: [
          { title: 'Matrix Operations', slug: 'matrix-operations', description: 'Addition and Subtraction', order: 1, lessons: [{ title: 'Adding Matrices', slug: 'adding-matrices', content: '<p>Add corresponding elements.</p>' }] },
          { title: 'Determinants', slug: 'determinants', description: '2x2 and 3x3', order: 2, lessons: [{ title: '2x2 Determinant', slug: '2x2-determinant', content: '<p>ad - bc</p>' }] }
        ]
      },
      {
        title: 'Vectors', slug: 'math-vectors', description: 'Vector representation and operations.', order: 9,
        subtopics: [
          { title: 'Vector Addition', slug: 'vector-addition', description: 'Triangle law', order: 1, lessons: [{ title: 'Triangle Law', slug: 'triangle-law', content: '<p>Join tail to head.</p>' }] },
          { title: 'Dot Product', slug: 'dot-product', description: 'Scalar product', order: 2, lessons: [{ title: 'Calculating Dot Product', slug: 'calculating-dot', content: '<p>a.b = |a||b|cos(theta)</p>' }] }
        ]
      },
      {
        title: 'Logarithms', slug: 'math-logarithms', description: 'Laws of logarithms.', order: 10,
        subtopics: [
          { title: 'Laws of Logarithms', slug: 'laws-logarithms', description: 'Addition and subtraction laws', order: 1, lessons: [{ title: 'Log Rules', slug: 'log-rules', content: '<p>log(ab) = log(a) + log(b)</p>' }] },
          { title: 'Change of Base', slug: 'change-base', description: 'Changing log base', order: 2, lessons: [{ title: 'Base Change Formula', slug: 'base-change', content: '<p>log_b(x) = log_c(x) / log_c(b)</p>' }] }
        ]
      }
    ]
  },
  {
    slug: 'english-language',
    exam: 'jamb',
    syllabus_year: '2026/2027',
    title: 'Use of English Syllabus',
    description: 'Comprehensive JAMB Use of English syllabus.',
    topics: [
      {
        title: 'Comprehension', slug: 'eng-comprehension', description: 'Reading passages.', order: 1,
        subtopics: [
          { title: 'Main Idea', slug: 'main-idea', description: 'Finding the gist', order: 1, lessons: [{ title: 'Locating Main Ideas', slug: 'locating-ideas', content: '<p>Look at the first paragraph.</p>' }] },
          { title: 'Inference', slug: 'inference', description: 'Reading between lines', order: 2, lessons: [{ title: 'Making Inferences', slug: 'making-inferences', content: '<p>Deduce from evidence.</p>' }] }
        ]
      },
      {
        title: 'Lexis: Synonyms', slug: 'eng-synonyms', description: 'Words nearest in meaning.', order: 2,
        subtopics: [
          { title: 'Context Clues', slug: 'context-clues', description: 'Using surrounding words', order: 1, lessons: [{ title: 'Guessing Meaning', slug: 'guessing-meaning', content: '<p>Read the whole sentence.</p>' }] },
          { title: 'Common Synonyms', slug: 'common-synonyms', description: 'Frequent words', order: 2, lessons: [{ title: 'Vocabulary List', slug: 'vocab-list', content: '<p>Memorize common pairings.</p>' }] }
        ]
      },
      {
        title: 'Lexis: Antonyms', slug: 'eng-antonyms', description: 'Words opposite in meaning.', order: 3,
        subtopics: [
          { title: 'Prefixes for Opposites', slug: 'prefixes-opposites', description: 'un, in, dis', order: 1, lessons: [{ title: 'Using Prefixes', slug: 'using-prefixes', content: '<p>unhappy, invisible.</p>' }] },
          { title: 'Tricky Antonyms', slug: 'tricky-antonyms', description: 'False friends', order: 2, lessons: [{ title: 'Watch Out', slug: 'watch-out', content: '<p>Ensure exact opposite.</p>' }] }
        ]
      },
      {
        title: 'Grammar: Nouns', slug: 'eng-nouns', description: 'Types and functions.', order: 4,
        subtopics: [
          { title: 'Countable/Uncountable', slug: 'countable', description: 'Quantifiers', order: 1, lessons: [{ title: 'Much vs Many', slug: 'much-many', content: '<p>Many for countable.</p>' }] },
          { title: 'Pluralization', slug: 'pluralization', description: 'Irregular plurals', order: 2, lessons: [{ title: 'Irregular Forms', slug: 'irregular-forms', content: '<p>Child -> Children</p>' }] }
        ]
      },
      {
        title: 'Grammar: Verbs', slug: 'eng-verbs', description: 'Tenses and agreement.', order: 5,
        subtopics: [
          { title: 'Subject-Verb Agreement', slug: 'sv-agreement', description: 'Concord', order: 1, lessons: [{ title: 'Rules of Concord', slug: 'rules-concord', content: '<p>Singular subject takes singular verb.</p>' }] },
          { title: 'Tenses', slug: 'tenses', description: 'Past, Present, Future', order: 2, lessons: [{ title: 'Past Perfect', slug: 'past-perfect', content: '<p>Had + past participle.</p>' }] }
        ]
      },
      {
        title: 'Oral English: Vowels', slug: 'eng-vowels', description: 'Monophthongs and diphthongs.', order: 6,
        subtopics: [
          { title: 'Short Vowels', slug: 'short-vowels', description: 'Sounds like /i/ and /e/', order: 1, lessons: [{ title: 'Identifying Short Sounds', slug: 'identifying-short', content: '<p>Bit vs Beat.</p>' }] },
          { title: 'Diphthongs', slug: 'diphthongs', description: 'Gliding sounds', order: 2, lessons: [{ title: 'Identifying Diphthongs', slug: 'identifying-diphthongs', content: '<p>Boy, Cow.</p>' }] }
        ]
      },
      {
        title: 'Oral English: Consonants', slug: 'eng-consonants', description: 'Stops, fricatives.', order: 7,
        subtopics: [
          { title: 'Voiced vs Voiceless', slug: 'voiced-voiceless', description: 'Vibration', order: 1, lessons: [{ title: 'Testing Vibration', slug: 'testing-vibration', content: '<p>Touch your throat.</p>' }] },
          { title: 'Consonant Clusters', slug: 'clusters', description: 'Multiple consonants', order: 2, lessons: [{ title: 'Pronouncing Clusters', slug: 'pronouncing-clusters', content: '<p>Street, splash.</p>' }] }
        ]
      },
      {
        title: 'Oral English: Stress', slug: 'eng-stress', description: 'Word and sentence stress.', order: 8,
        subtopics: [
          { title: 'Word Stress', slug: 'word-stress', description: 'Syllable emphasis', order: 1, lessons: [{ title: 'Noun vs Verb Stress', slug: 'noun-verb-stress', content: '<p>REcord vs reCORD.</p>' }] },
          { title: 'Sentence Stress', slug: 'sentence-stress', description: 'Emphasizing words', order: 2, lessons: [{ title: 'Rhythm', slug: 'rhythm', content: '<p>English is stress-timed.</p>' }] }
        ]
      },
      {
        title: 'Idioms and Phrasal Verbs', slug: 'eng-idioms', description: 'Figurative language.', order: 9,
        subtopics: [
          { title: 'Common Idioms', slug: 'common-idioms', description: 'Meanings', order: 1, lessons: [{ title: 'Kick the bucket', slug: 'kick-bucket', content: '<p>Means to die.</p>' }] },
          { title: 'Phrasal Verbs with Take', slug: 'phrasal-take', description: 'Take off, take up', order: 2, lessons: [{ title: 'Take after', slug: 'take-after', content: '<p>Means to resemble.</p>' }] }
        ]
      },
      {
        title: 'Sentence Structure', slug: 'eng-sentences', description: 'Simple, compound, complex.', order: 10,
        subtopics: [
          { title: 'Clauses', slug: 'clauses', description: 'Main and subordinate', order: 1, lessons: [{ title: 'Identifying Clauses', slug: 'identifying-clauses', content: '<p>A clause has a subject and verb.</p>' }] },
          { title: 'Conjunctions', slug: 'conjunctions', description: 'FANBOYS', order: 2, lessons: [{ title: 'Using FANBOYS', slug: 'using-fanboys', content: '<p>For, And, Nor, But, Or, Yet, So.</p>' }] }
        ]
      }
    ]
  },
  {
    slug: 'physics',
    exam: 'waec',
    syllabus_year: '2026/2027',
    title: 'Physics Syllabus',
    description: 'Mechanics, Waves, Heat, Electricity and Magnetism, Modern Physics.',
    topics: [
      {
        title: 'Measurements and Units', slug: 'phy-measurements', description: 'Fundamental quantities.', order: 1,
        subtopics: [
          { title: 'SI Units', slug: 'si-units', description: 'Standard units', order: 1, lessons: [{ title: 'The 7 Base Units', slug: '7-base-units', content: '<p>Meter, Kilogram, Second, etc.</p>' }] },
          { title: 'Dimensional Analysis', slug: 'dimensional', description: 'Checking equations', order: 2, lessons: [{ title: 'Finding Dimensions', slug: 'finding-dimensions', content: '<p>Velocity is [L][T]^-1.</p>' }] }
        ]
      },
      {
        title: 'Kinematics', slug: 'phy-kinematics', description: 'Motion without forces.', order: 2,
        subtopics: [
          { title: 'Linear Motion', slug: 'linear-motion', description: 'Straight line', order: 1, lessons: [{ title: 'v = u + at', slug: 'v-u-at', content: '<p>First equation of motion.</p>' }] },
          { title: 'Projectiles', slug: 'projectiles', description: '2D motion', order: 2, lessons: [{ title: 'Time of Flight', slug: 'time-flight', content: '<p>T = 2usin(theta)/g</p>' }] }
        ]
      },
      {
        title: 'Dynamics', slug: 'phy-dynamics', description: 'Newton laws.', order: 3,
        subtopics: [
          { title: 'Newton Laws', slug: 'newton-laws', description: 'The 3 laws', order: 1, lessons: [{ title: 'F = ma', slug: 'f-ma', content: '<p>Second law of motion.</p>' }] },
          { title: 'Friction', slug: 'friction', description: 'Resistive forces', order: 2, lessons: [{ title: 'Coefficient of Friction', slug: 'coeff-friction', content: '<p>F = mu * R</p>' }] }
        ]
      },
      {
        title: 'Work, Energy, Power', slug: 'phy-work', description: 'Energy conservation.', order: 4,
        subtopics: [
          { title: 'Kinetic and Potential Energy', slug: 'ke-pe', description: 'Energy types', order: 1, lessons: [{ title: 'Conservation of Energy', slug: 'conservation-energy', content: '<p>Energy cannot be created or destroyed.</p>' }] },
          { title: 'Power', slug: 'power', description: 'Rate of work', order: 2, lessons: [{ title: 'Calculating Power', slug: 'calculating-power', content: '<p>P = Work / Time</p>' }] }
        ]
      },
      {
        title: 'Heat and Temperature', slug: 'phy-heat', description: 'Thermal physics.', order: 5,
        subtopics: [
          { title: 'Thermal Expansion', slug: 'thermal-exp', description: 'Linear, area, volume', order: 1, lessons: [{ title: 'Linear Expansivity', slug: 'linear-expansivity', content: '<p>Change in length / (original length * temp change).</p>' }] },
          { title: 'Specific Heat Capacity', slug: 'shc', description: 'Q = mcT', order: 2, lessons: [{ title: 'Calculating Heat', slug: 'calculating-heat', content: '<p>Q = mc(theta2 - theta1)</p>' }] }
        ]
      },
      {
        title: 'Waves', slug: 'phy-waves', description: 'Properties of waves.', order: 6,
        subtopics: [
          { title: 'Transverse and Longitudinal', slug: 'wave-types', description: 'Types of waves', order: 1, lessons: [{ title: 'Wave Equation', slug: 'wave-equation', content: '<p>v = f * lambda</p>' }] },
          { title: 'Light Waves', slug: 'light-waves', description: 'Optics', order: 2, lessons: [{ title: 'Reflection and Refraction', slug: 'reflection-refraction', content: '<p>Snells Law.</p>' }] }
        ]
      },
      {
        title: 'Sound Waves', slug: 'phy-sound', description: 'Acoustics.', order: 7,
        subtopics: [
          { title: 'Speed of Sound', slug: 'speed-sound', description: 'In different media', order: 1, lessons: [{ title: 'Factors affecting speed', slug: 'factors-speed', content: '<p>Temperature and density.</p>' }] },
          { title: 'Echoes', slug: 'echoes', description: 'Reflection of sound', order: 2, lessons: [{ title: 'Calculating Echo Distance', slug: 'echo-distance', content: '<p>Distance = (Speed * Time) / 2</p>' }] }
        ]
      },
      {
        title: 'Electrostatics', slug: 'phy-electrostatics', description: 'Static charges.', order: 8,
        subtopics: [
          { title: 'Coulombs Law', slug: 'coulombs-law', description: 'Force between charges', order: 1, lessons: [{ title: 'F = kq1q2/r^2', slug: 'coulomb-formula', content: '<p>Inverse square law.</p>' }] },
          { title: 'Electric Field', slug: 'electric-field', description: 'E = F/q', order: 2, lessons: [{ title: 'Field Lines', slug: 'field-lines', content: '<p>Point away from positive.</p>' }] }
        ]
      },
      {
        title: 'Current Electricity', slug: 'phy-current', description: 'Circuits.', order: 9,
        subtopics: [
          { title: 'Ohms Law', slug: 'ohms-law', description: 'V = IR', order: 1, lessons: [{ title: 'Resistors in Series', slug: 'resistors-series', content: '<p>R = R1 + R2</p>' }] },
          { title: 'Electrical Energy', slug: 'elec-energy', description: 'Power', order: 2, lessons: [{ title: 'P = IV', slug: 'p-iv', content: '<p>Power dissipated.</p>' }] }
        ]
      },
      {
        title: 'Modern Physics', slug: 'phy-modern', description: 'Radioactivity.', order: 10,
        subtopics: [
          { title: 'Radioactivity', slug: 'radioactivity', description: 'Alpha, beta, gamma', order: 1, lessons: [{ title: 'Half-Life', slug: 'half-life', content: '<p>Time for half atoms to decay.</p>' }] },
          { title: 'Photoelectric Effect', slug: 'photoelectric', description: 'Einstein theory', order: 2, lessons: [{ title: 'Work Function', slug: 'work-function', content: '<p>Minimum energy needed to eject electron.</p>' }] }
        ]
      }
    ]
  },
  {
    slug: 'chemistry',
    exam: 'jamb',
    syllabus_year: '2026/2027',
    title: 'Chemistry Syllabus',
    description: 'Physical, Inorganic, and Organic Chemistry.',
    topics: [
      {
        title: 'Atomic Structure', slug: 'chem-atomic', description: 'Protons, neutrons.', order: 1,
        subtopics: [
          { title: 'Subatomic Particles', slug: 'subatomic', description: 'Properties', order: 1, lessons: [{ title: 'Isotopes', slug: 'isotopes', content: '<p>Same protons, different neutrons.</p>' }] },
          { title: 'Electronic Configuration', slug: 'electronic-config', description: 'spdf notation', order: 2, lessons: [{ title: 'Aufbau Principle', slug: 'aufbau', content: '<p>Fill lowest energy first.</p>' }] }
        ]
      },
      {
        title: 'Periodic Table', slug: 'chem-periodic', description: 'Trends.', order: 2,
        subtopics: [
          { title: 'Groups and Periods', slug: 'groups-periods', description: 'Layout', order: 1, lessons: [{ title: 'Alkali Metals', slug: 'alkali-metals', content: '<p>Group 1 elements.</p>' }] },
          { title: 'Periodic Trends', slug: 'periodic-trends', description: 'Electronegativity', order: 2, lessons: [{ title: 'Ionization Energy', slug: 'ionization', content: '<p>Increases across a period.</p>' }] }
        ]
      },
      {
        title: 'Chemical Bonding', slug: 'chem-bonding', description: 'Ionic and Covalent.', order: 3,
        subtopics: [
          { title: 'Ionic Bonds', slug: 'ionic-bonds', description: 'Transfer of electrons', order: 1, lessons: [{ title: 'Properties of Ionic Compounds', slug: 'ionic-props', content: '<p>High melting points.</p>' }] },
          { title: 'Covalent Bonds', slug: 'covalent-bonds', description: 'Sharing of electrons', order: 2, lessons: [{ title: 'Properties of Covalent Compounds', slug: 'covalent-props', content: '<p>Low boiling points.</p>' }] }
        ]
      },
      {
        title: 'Stoichiometry', slug: 'chem-stoich', description: 'Moles and equations.', order: 4,
        subtopics: [
          { title: 'The Mole Concept', slug: 'mole-concept', description: 'Avogadros number', order: 1, lessons: [{ title: 'Calculating Moles', slug: 'calculating-moles', content: '<p>n = mass / molar mass</p>' }] },
          { title: 'Balancing Equations', slug: 'balancing', description: 'Conservation of mass', order: 2, lessons: [{ title: 'Reaction Ratios', slug: 'reaction-ratios', content: '<p>Using coefficients.</p>' }] }
        ]
      },
      {
        title: 'States of Matter', slug: 'chem-states', description: 'Gas laws.', order: 5,
        subtopics: [
          { title: 'Gas Laws', slug: 'gas-laws', description: 'Boyle, Charles', order: 1, lessons: [{ title: 'Ideal Gas Equation', slug: 'ideal-gas', content: '<p>PV = nRT</p>' }] },
          { title: 'Liquids and Solids', slug: 'liquids-solids', description: 'Vapor pressure', order: 2, lessons: [{ title: 'Types of Lattices', slug: 'lattices', content: '<p>Metallic, ionic, molecular.</p>' }] }
        ]
      },
      {
        title: 'Acids, Bases, and Salts', slug: 'chem-acids', description: 'pH and titration.', order: 6,
        subtopics: [
          { title: 'pH Scale', slug: 'ph-scale', description: 'Acidity', order: 1, lessons: [{ title: 'Calculating pH', slug: 'calc-ph', content: '<p>pH = -log[H+]</p>' }] },
          { title: 'Titration', slug: 'titration', description: 'Neutralization', order: 2, lessons: [{ title: 'Indicators', slug: 'indicators', content: '<p>Methyl orange, phenolphthalein.</p>' }] }
        ]
      },
      {
        title: 'Redox Reactions', slug: 'chem-redox', description: 'Oxidation and reduction.', order: 7,
        subtopics: [
          { title: 'Oxidation Numbers', slug: 'oxidation-numbers', description: 'Rules', order: 1, lessons: [{ title: 'Assigning States', slug: 'assigning-states', content: '<p>Oxygen is usually -2.</p>' }] },
          { title: 'Electrolysis', slug: 'electrolysis', description: 'Faradays laws', order: 2, lessons: [{ title: 'Faradays First Law', slug: 'faraday-1', content: '<p>Mass proportional to charge.</p>' }] }
        ]
      },
      {
        title: 'Chemical Kinetics', slug: 'chem-kinetics', description: 'Rates of reaction.', order: 8,
        subtopics: [
          { title: 'Factors Affecting Rate', slug: 'rate-factors', description: 'Temp, conc, catalyst', order: 1, lessons: [{ title: 'Collision Theory', slug: 'collision-theory', content: '<p>Particles must collide with enough energy.</p>' }] },
          { title: 'Equilibrium', slug: 'equilibrium', description: 'Le Chateliers', order: 2, lessons: [{ title: 'Le Chateliers Principle', slug: 'le-chatelier', content: '<p>System shifts to oppose change.</p>' }] }
        ]
      },
      {
        title: 'Organic Chemistry I', slug: 'chem-organic1', description: 'Hydrocarbons.', order: 9,
        subtopics: [
          { title: 'Alkanes', slug: 'alkanes', description: 'Saturated', order: 1, lessons: [{ title: 'Nomenclature', slug: 'alkane-names', content: '<p>Methane, ethane, propane.</p>' }] },
          { title: 'Alkenes', slug: 'alkenes', description: 'Unsaturated', order: 2, lessons: [{ title: 'Addition Reactions', slug: 'addition-rxns', content: '<p>Bromine water test.</p>' }] }
        ]
      },
      {
        title: 'Organic Chemistry II', slug: 'chem-organic2', description: 'Functional groups.', order: 10,
        subtopics: [
          { title: 'Alcohols', slug: 'alcohols', description: '-OH group', order: 1, lessons: [{ title: 'Primary, Secondary, Tertiary', slug: 'alcohol-types', content: '<p>Based on carbon attachment.</p>' }] },
          { title: 'Carboxylic Acids', slug: 'carboxylic', description: '-COOH group', order: 2, lessons: [{ title: 'Esterification', slug: 'esterification', content: '<p>Acid + Alcohol -> Ester + Water</p>' }] }
        ]
      }
    ]
  }
];

async function seed() {
  console.log("Starting Detailed Syllabus Seeding...");
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');
    
    for (const subject of subjectsData) {
      console.log(`Processing subject slug: ${subject.slug}`);
      
      const subjectResult = await client.query('SELECT id FROM subjects WHERE slug = $1', [subject.slug]);
      if (subjectResult.rows.length === 0) {
        console.log(`Subject ${subject.slug} not found in DB. Skipping...`);
        continue;
      }
      const subjectId = subjectResult.rows[0].id;
      
      const syllabusResult = await client.query(
        `INSERT INTO syllabuses (subject_id, exam, syllabus_year, title, description)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (subject_id, exam, syllabus_year)
         DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description
         RETURNING id`,
        [subjectId, subject.exam.toUpperCase(), subject.syllabus_year, subject.title, subject.description]
      );
      
      const syllabusId = syllabusResult.rows[0].id;
      
      // Link syllabus to exam
      const examResult = await client.query('SELECT id FROM exams WHERE slug = $1', [subject.exam.toLowerCase()]);
      if (examResult.rows.length > 0) {
        const examId = examResult.rows[0].id;
        await client.query(
          `INSERT INTO syllabus_exams (syllabus_id, exam_id, is_active)
           VALUES ($1, $2, TRUE)
           ON CONFLICT DO NOTHING`,
          [syllabusId, examId]
        );
      }
      
      for (const topic of subject.topics) {
        const topicResult = await client.query(
          `INSERT INTO topics (syllabus_id, title, slug, description, topic_order)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (syllabus_id, slug)
           DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, topic_order = EXCLUDED.topic_order
           RETURNING id`,
          [syllabusId, topic.title, topic.slug, topic.description, topic.order]
        );
        const topicId = topicResult.rows[0].id;
        
        for (const subtopic of topic.subtopics) {
          const subResult = await client.query(
            `INSERT INTO subtopics (topic_id, title, slug, description, subtopic_order)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (topic_id, slug)
             DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, subtopic_order = EXCLUDED.subtopic_order
             RETURNING id`,
            [topicId, subtopic.title, subtopic.slug, subtopic.description, subtopic.order]
          );
          const subtopicId = subResult.rows[0].id;
          
          for (const lesson of subtopic.lessons) {
            await client.query(
              `INSERT INTO lessons (topic_id, subtopic_id, title, slug, content)
               VALUES ($1, $2, $3, $4, $5)
               ON CONFLICT (topic_id, slug)
               DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content, subtopic_id = EXCLUDED.subtopic_id`,
              [topicId, subtopicId, lesson.title, lesson.slug, lesson.content]
            );
          }
        }
      }
      console.log(`  -> Successfully seeded 10 topics for ${subject.slug}`);
    }
    
    await client.query('COMMIT');
    console.log("Seeding complete!");
  } catch (err) {
    await client.query('ROLLBACK');
    console.error("Seeding failed:", err);
  } finally {
    client.release();
    pool.end();
  }
}

seed();
