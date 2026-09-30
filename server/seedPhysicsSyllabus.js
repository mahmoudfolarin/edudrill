require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'physics', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Physics Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    { title: 'Introduction to Physics', description: 'Meaning, scope, branches, and everyday life.', order: 1, subtopics: ['Meaning, scope and importance of physics', 'Branches of physics', 'Physics in everyday life and technology', 'Measurement and scientific investigation'] },
    { title: 'Measurement', description: 'Quantities, SI units, and measuring instruments.', order: 2, subtopics: ['Physical quantities and SI units', 'Fundamental and derived quantities', 'Measuring instruments', 'Accuracy, precision and errors', 'Scalars and vectors'] },
    { title: 'Motion', description: 'Distance, speed, acceleration, and graphs.', order: 3, subtopics: ['Distance and displacement', 'Speed and velocity', 'Acceleration', 'Distance-time and velocity-time graphs', 'Uniform and non-uniform motion'] },
    { title: 'Forces', description: 'Effects, types, Newton\'s laws, mass, weight.', order: 4, subtopics: ['Meaning and effects of force', 'Types of forces', "Newton's laws of motion", 'Mass and weight', 'Friction'] },
    { title: 'Work, Energy and Power', description: 'Work done, energy forms, transformation, power.', order: 5, subtopics: ['Work done by a force', 'Forms of energy', 'Energy transformation', 'Power', 'Efficiency'] },
    { title: 'Simple Machines', description: 'Levers, pulleys, wheel and axle, inclined plane.', order: 6, subtopics: ['Levers', 'Pulleys', 'Wheel and axle', 'Inclined plane', 'Mechanical advantage, velocity ratio and efficiency'] },
    // SSS 1 Second Term
    { title: 'Heat', description: 'Temperature, thermal expansion, specific heat.', order: 7, subtopics: ['Temperature and measurement', 'Thermal expansion', 'Heat transfer', 'Specific heat capacity', 'Change of state'] },
    { title: 'Waves', description: 'Types, properties, speed, frequency, wavelength.', order: 8, subtopics: ['Meaning and types of waves', 'Transverse and longitudinal waves', 'Wave properties', 'Wave speed, frequency and wavelength', 'Practical applications'] },
    { title: 'Sound', description: 'Production, transmission, characteristics, reflection.', order: 9, subtopics: ['Production of sound', 'Transmission of sound', 'Characteristics of sound', 'Reflection of sound', 'Uses of sound'] },
    { title: 'Light', description: 'Propagation, reflection, refraction, lenses.', order: 10, subtopics: ['Sources and propagation of light', 'Reflection', 'Refraction', 'Plane mirrors', 'Lenses and optical applications'] },
    { title: 'Pressure', description: 'Solids, liquids, atmospheric, hydraulic machines.', order: 11, subtopics: ['Pressure in solids', 'Pressure in liquids', 'Atmospheric pressure', 'Applications of pressure', 'Hydraulic machines'] },
    { title: 'Fluids', description: 'Density, upthrust, Archimedes\' principle, floatation.', order: 12, subtopics: ['Density and relative density', 'Upthrust', "Archimedes' principle", 'Floatation', 'Applications in daily life'] },
    // SSS 1 Third Term
    { title: 'Electricity', description: 'Charge, conductors, current, potential difference.', order: 13, subtopics: ['Electric charge', 'Conductors and insulators', 'Electric current', 'Potential difference', 'Resistance'] },
    { title: 'Electric Circuits', description: 'Symbols, series/parallel, Ohm\'s law, safety.', order: 14, subtopics: ['Circuit symbols', 'Series and parallel circuits', "Ohm's law", 'Electrical measurements', 'Electrical safety'] },
    { title: 'Magnetism', description: 'Properties, magnetic fields, electromagnets.', order: 15, subtopics: ['Properties of magnets', 'Magnetic fields', 'Magnetic materials', 'Electromagnets', 'Uses of magnets'] },
    { title: 'Electromagnetic Effects', description: 'Magnetic effect, induction, generators, transformers.', order: 16, subtopics: ['Magnetic effect of electric current', 'Electromagnetic induction', 'Generators', 'Transformers', 'Applications'] },
    { title: 'Practical Physics', description: 'Safety, experiments, graph plotting, errors.', order: 17, subtopics: ['Laboratory safety', 'Measurement experiments', 'Graph plotting', 'Simple electrical experiments', 'Experimental errors'] },
    { title: 'Revision and Examination Practice (SSS 1)', description: 'Theory revision, calculations, and graphs.', order: 18, subtopics: ['Theory revision', 'Calculation practice', 'Graph and practical questions', 'Past-question practice'] },
    // SSS 2 First Term
    { title: 'Vectors and Equilibrium', description: 'Addition, resolution, equilibrium, moments.', order: 19, subtopics: ['Vector representation', 'Vector addition and subtraction', 'Resolution of vectors', 'Equilibrium of forces', 'Moments'] },
    { title: 'Motion and Dynamics', description: 'Equations, free fall, projectiles, Newton\'s laws.', order: 20, subtopics: ['Equations of motion', 'Free fall', 'Projectiles', "Newton's laws", 'Applications of dynamics'] },
    { title: 'Circular Motion', description: 'Angular motion, centripetal force, banking.', order: 21, subtopics: ['Angular motion', 'Centripetal force', 'Centripetal acceleration', 'Applications of circular motion', 'Banking and turning'] },
    { title: 'Gravitation', description: 'Universal law, field, satellites, escape velocity.', order: 22, subtopics: ['Universal law of gravitation', 'Gravitational field', 'Acceleration due to gravity', 'Satellites', 'Escape velocity'] },
    { title: 'Simple Harmonic Motion', description: 'Periodic motion, energy, simple pendulum.', order: 23, subtopics: ['Periodic motion', 'Characteristics of SHM', 'Energy in SHM', 'Simple pendulum', 'Applications'] },
    { title: 'Energy and Momentum', description: 'Momentum, impulse, conservation, collisions.', order: 24, subtopics: ['Momentum', 'Impulse', 'Conservation of momentum', 'Collisions', 'Energy conservation'] },
    // SSS 2 Second Term
    { title: 'Thermal Physics', description: 'Kinetic theory, gas laws, heat capacity.', order: 25, subtopics: ['Kinetic theory', 'Gas laws', 'Thermal expansion', 'Heat capacity', 'Latent heat'] },
    { title: 'Kinetic Theory and Gas Laws', description: 'Boyle\'s, Charles\', Pressure, Ideal gas equation.', order: 26, subtopics: ["Boyle's law", "Charles' law", 'Pressure law', 'Combined gas law', 'Ideal gas equation'] },
    { title: 'Waves and Wave Motion', description: 'Equation, superposition, interference, diffraction.', order: 27, subtopics: ['Wave equation', 'Superposition', 'Interference', 'Diffraction', 'Standing waves'] },
    { title: 'Sound and Musical Instruments', description: 'Intensity, resonance, beats, harmonics.', order: 28, subtopics: ['Sound intensity', 'Resonance', 'Beats', 'Harmonics', 'Musical instruments'] },
    { title: 'Geometrical Optics', description: 'Refraction, prisms, lenses, optical instruments.', order: 29, subtopics: ['Refraction through glass', 'Prisms', 'Lenses', 'Lens formula', 'Optical instruments'] },
    { title: 'Physical Optics', description: 'Interference, diffraction, polarization.', order: 30, subtopics: ['Interference', 'Diffraction', 'Polarization', 'Applications of wave optics', 'Practical observations'] },
    // SSS 2 Third Term
    { title: 'Electrostatics', description: 'Electric charge, Coulomb\'s law, electric field.', order: 31, subtopics: ['Electric charge', "Coulomb's law", 'Electric field', 'Electric potential', 'Capacitors'] },
    { title: 'Current Electricity', description: 'Resistance, networks, energy, Kirchhoff\'s laws.', order: 32, subtopics: ['Resistance and resistivity', 'Series and parallel networks', 'Electrical energy and power', "Kirchhoff's laws", 'Cells and internal resistance'] },
    { title: 'Magnetism and Electromagnetism', description: 'Fields, force on conductor, Lenz\'s law.', order: 33, subtopics: ['Magnetic fields', 'Force on a current-carrying conductor', 'Electromagnetic induction', "Lenz's law", 'Applications'] },
    { title: 'Alternating Current', description: 'AC/DC, transformers, rectification.', order: 34, subtopics: ['AC and DC', 'AC quantities', 'Transformers', 'Rectification', 'Domestic electricity'] },
    { title: 'Electronics', description: 'Semiconductors, diodes, transistors, logic gates.', order: 35, subtopics: ['Semiconductors', 'Diodes', 'Transistors', 'Logic gates', 'Basic electronic applications'] },
    { title: 'Revision and Examination Practice (SSS 2)', description: 'Theory revision, calculations, past questions.', order: 36, subtopics: ['Theory revision', 'Calculations', 'Practical questions', 'Past questions'] },
    // SSS 3 First Term
    { title: 'Atomic Physics', description: 'Atomic structure, spectra, energy levels.', order: 37, subtopics: ['Atomic structure', 'Atomic spectra', 'Energy levels', 'Electron transitions', 'Applications'] },
    { title: 'Nuclear Physics', description: 'Nuclear structure, radioactivity, half-life.', order: 38, subtopics: ['Nuclear structure', 'Radioactivity', 'Types of radiation', 'Half-life', 'Uses and safety'] },
    { title: 'Quantum and Modern Physics', description: 'Photoelectric effect, wave-particle duality.', order: 39, subtopics: ['Photoelectric effect', 'Wave-particle duality', 'Quantum concepts', 'Applications of modern physics'] },
    { title: 'Electronics and Communication', description: 'Semiconductors, digital electronics, systems.', order: 40, subtopics: ['Semiconductors', 'Transistors', 'Digital electronics', 'Communication systems', 'Applications'] },
    { title: 'Mechanics Revision', description: 'Motion, forces, energy, circular motion, gravitation.', order: 41, subtopics: ['Motion', 'Forces', 'Energy and momentum', 'Circular motion', 'Gravitation'] },
    { title: 'Thermal and Wave Physics Revision', description: 'Heat, gas laws, waves, sound, optics.', order: 42, subtopics: ['Heat and thermodynamics', 'Gas laws', 'Waves', 'Sound', 'Optics'] },
    // SSS 3 Second Term
    { title: 'Electricity and Magnetism Revision', description: 'Electrostatics, current, fields, induction, AC.', order: 43, subtopics: ['Electrostatics', 'Current electricity', 'Magnetic fields', 'Electromagnetic induction', 'AC circuits'] },
    { title: 'Practical Physics (SSS 3)', description: 'Experimental design, uncertainties, data interpretation.', order: 44, subtopics: ['Experimental design', 'Measurements and uncertainties', 'Graphical analysis', 'Laboratory apparatus', 'Data interpretation'] },
    { title: 'Physics in Technology', description: 'Power systems, communication, medical physics.', order: 45, subtopics: ['Electric power systems', 'Communication technology', 'Medical physics', 'Energy technology', 'Physics in industry'] },
    { title: 'Environmental and Energy Physics', description: 'Renewable, solar, nuclear, energy efficiency.', order: 46, subtopics: ['Renewable energy', 'Solar energy', 'Nuclear energy', 'Energy efficiency', 'Environmental considerations'] },
    { title: 'Advanced Problem Solving', description: 'Multi-step calculations, formula manipulation.', order: 47, subtopics: ['Multi-step calculations', 'Formula manipulation', 'Graph interpretation', 'Application questions'] },
    { title: 'Project and Practical Review', description: 'Investigation, data collection, presentation.', order: 48, subtopics: ['Investigation planning', 'Data collection', 'Analysis', 'Presentation and evaluation'] },
    // SSS 3 Third Term
    { title: 'Comprehensive Revision', description: 'Mechanics, heat, waves, electricity, magnetism.', order: 49, subtopics: ['Mechanics', 'Heat and thermal physics', 'Waves and optics', 'Electricity and magnetism'] },
    { title: 'Practical Examination Preparation', description: 'Apparatus, procedures, graphs, calculations.', order: 50, subtopics: ['Apparatus identification', 'Experimental procedures', 'Graph plotting', 'Measurements and calculations'] },
    { title: 'Theory Examination Preparation', description: 'Definitions, formulae, conceptual questions.', order: 51, subtopics: ['Definitions and principles', 'Formulae and derivations', 'Calculation practice', 'Conceptual questions'] },
    { title: 'Past Questions and Examination Skills', description: 'Interpretation, time management, errors.', order: 52, subtopics: ['Question interpretation', 'Structured calculations', 'Time management', 'Common examination errors'] },
    { title: 'WASSCE/NECO Examination Preparation', description: 'Final revision, theory, practical readiness.', order: 53, subtopics: ['Final revision', 'Theory practice', 'Practical practice', 'Examination readiness'] }
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
