require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'technical-drawing', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Technical Drawing Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    { title: 'Introduction to Technical Drawing', description: 'Meaning and importance of technical drawing.', order: 1, subtopics: ['Meaning and importance of technical drawing', 'Types of technical drawings', 'Uses in engineering, architecture and technology', 'Drawing-room practice and discipline', 'Drawing standards and conventions'] },
    { title: 'Drawing Instruments and Materials', description: 'Drawing board, T-square, scales, and compasses.', order: 2, subtopics: ['Drawing board and T-square', 'Scales, rulers and measuring tools', 'Set squares and drawing instruments', 'Compasses and dividers', 'Drawing pencils and line weights', 'Care and maintenance of instruments'] },
    { title: 'Lettering and Numbering', description: 'Freehand, single-stroke, and technical lettering.', order: 3, subtopics: ['Freehand lettering', 'Numerals and symbols', 'Single-stroke letters', 'Spacing and proportion', 'Uppercase and lowercase lettering', 'Technical lettering practice'] },
    { title: 'Lines and Line Conventions', description: 'Types of lines, visible, hidden, and centre lines.', order: 4, subtopics: ['Types of lines', 'Dimension and extension lines', 'Visible and hidden lines', 'Cutting-plane and section lines', 'Centre lines', 'Standard line thicknesses and applications'] },
    { title: 'Geometrical Construction I', description: 'Points, lines, angles, and perpendiculars.', order: 5, subtopics: ['Points, lines and angles', 'Construction of parallels', 'Bisecting lines and angles', 'Division of lines', 'Construction of perpendiculars', 'Construction of regular polygons'] },
    { title: 'Geometrical Construction II', description: 'Triangles, quadrilaterals, polygons, and circles.', order: 6, subtopics: ['Triangles', 'Circles and arcs', 'Quadrilaterals', 'Tangent construction', 'Regular polygons', 'Practical geometric applications'] },
    { title: 'Scales and Measurement', description: 'Meaning and purpose of scale, plain and diagonal scales.', order: 7, subtopics: ['Meaning and purpose of scale', 'Plain scales', 'Full-size scale', 'Diagonal scales', 'Reducing and enlarging scales', 'Reading and applying scales'] },
    { title: 'Dimensioning', description: 'Purpose, methods, and rules of dimensioning.', order: 8, subtopics: ['Purpose of dimensioning', 'Methods of dimensioning', 'Dimension lines and extension lines', 'Rules for clear dimensioning', 'Arrowheads and symbols', 'Practical dimensioning exercises'] },
    { title: 'Freehand Sketching', description: 'Principles, proportion, and sketching simple objects.', order: 9, subtopics: ['Principles of freehand sketching', 'Pictorial sketches', 'Proportion and observation', 'Adding dimensions to sketches', 'Sketching simple objects', 'Sketching from real objects'] },
    { title: 'Revision and Practical Assessment', description: 'Instrument identification and drawing portfolio.', order: 10, subtopics: ['Instrument identification', 'Drawing portfolio', 'Geometric construction practice', 'Term assessment', 'Lettering and dimensioning'] },
    // SSS 1 Second Term
    { title: 'Orthographic Projection I', description: 'Meaning, principles, and reference planes.', order: 11, subtopics: ['Meaning of orthographic projection', 'First-angle projection', 'Principles of projection', 'Third-angle projection', 'Reference planes', 'Projection symbols'] },
    { title: 'Orthographic Projection II', description: 'Front, top, and side views, alignment.', order: 12, subtopics: ['Front, top and side views', 'Alignment of views', 'Selection of viewing direction', 'Hidden details', 'Projection of simple solids', 'Dimensioning orthographic views'] },
    { title: 'Isometric Drawing', description: 'Meaning, axes, scale, and drawing cubes.', order: 13, subtopics: ['Meaning of isometric projection', 'Drawing cubes and rectangular solids', 'Isometric axes', 'Circles and curves in isometric', 'Isometric scale', 'Dimensioning isometric drawings'] },
    { title: 'Oblique Drawing', description: 'Meaning, cavalier, cabinet, and oblique axes.', order: 14, subtopics: ['Meaning of oblique projection', 'Drawing simple objects', 'Cavalier and cabinet methods', 'Comparison with isometric drawing', 'Oblique axes'] },
    { title: 'Sections and Sectional Views', description: 'Purpose, cutting planes, and hatching conventions.', order: 15, subtopics: ['Purpose of sectional views', 'Full sections', 'Cutting planes', 'Half sections', 'Hatching conventions', 'Removed and revolved sections'] },
    { title: 'Development of Surfaces', description: 'Meaning, parallel-line, and radial-line development.', order: 16, subtopics: ['Meaning of surface development', 'Development of prisms and cylinders', 'Parallel-line development', 'Development of pyramids and cones', 'Radial-line development', 'Practical applications'] },
    { title: 'Engineering Curves', description: 'Ellipse, parabola, hyperbola, and cycloid.', order: 17, subtopics: ['Ellipse', 'Cycloid and related curves', 'Parabola', 'Methods of construction', 'Hyperbola', 'Applications of engineering curves'] },
    { title: 'Loci and Practical Geometry', description: 'Meaning of locus, common loci, and construction.', order: 18, subtopics: ['Meaning of locus', 'Applications in mechanisms', 'Common loci', 'Problem-solving exercises', 'Construction methods'] },
    { title: 'Revision and Practical Drawing (SSS 1 Term 2)', description: 'Orthographic practice and surface-development.', order: 19, subtopics: ['Orthographic practice', 'Surface-development exercise', 'Isometric and oblique practice', 'Term assessment', 'Sectioning exercise'] },
    // SSS 1 Third Term
    { title: 'Projections of Solids', description: 'Prisms, pyramids, cylinders, and cones.', order: 20, subtopics: ['Prisms and pyramids', 'Simple auxiliary views', 'Cylinders and cones', 'Projection of solids inclined to planes', 'Positioning solids'] },
    { title: 'Auxiliary Projection', description: 'Need for auxiliary views, planes, and true shapes.', order: 21, subtopics: ['Need for auxiliary views', 'Construction methods', 'Auxiliary planes', 'Practical applications', 'True shapes of inclined surfaces'] },
    { title: 'Intersections of Solids', description: 'Meaning, prisms, cylinders, and cones.', order: 22, subtopics: ['Meaning of intersection', 'Cylinder and prism', 'Prisms and prisms', 'Cone and cylinder', 'Cylinder and cylinder', 'Finding points of intersection'] },
    { title: 'Technical Sketching of Machine Parts', description: 'Simple machine components, bolts, nuts, and washers.', order: 23, subtopics: ['Simple machine components', 'Keys and keyways', 'Bolts, nuts and washers', 'Simple brackets and supports', 'Shafts and collars'] },
    { title: 'Fasteners and Screw Threads', description: 'Types of fasteners, bolts, nuts, and screw-thread.', order: 24, subtopics: ['Types of fasteners', 'Conventional representation', 'Bolts and nuts', 'Threaded components', 'Screw-thread terminology'] },
    { title: 'Simple Working Drawings', description: 'Meaning, views, dimensions, and title blocks.', order: 25, subtopics: ['Meaning of working drawing', 'Material and specification notes', 'Views and dimensions', 'Reading simple working drawings', 'Title blocks'] },
    { title: 'Introduction to Building Drawing', description: 'Concepts, floor plans, walls, doors, and windows.', order: 26, subtopics: ['Building drawing concepts', 'Simple elevations', 'Floor plans', 'Basic building symbols', 'Walls, doors and windows'] },
    { title: 'Introduction to CAD', description: 'Computer-aided drafting, workspace, and commands.', order: 27, subtopics: ['Meaning of computer-aided drafting', 'Editing commands', 'CAD workspace', 'Saving and printing drawings', 'Basic drawing commands', 'CAD drawing conventions'] },
    { title: 'Revision and Portfolio Assessment (SSS 1 Term 3)', description: 'Integrated drawing exercises and CAD tasks.', order: 28, subtopics: ['Integrated drawing exercises', 'Basic CAD task', 'Machine-part sketch', 'End-of-session assessment', 'Building-drawing exercise'] },
    // SSS 2 First Term
    { title: 'Review of SSS1 Technical Drawing', description: 'Drawing instruments, geometrical construction, and projection.', order: 29, subtopics: ['Drawing instruments', 'Sections', 'Geometrical construction', 'Dimensioning', 'Projection', 'CAD basics'] },
    { title: 'Advanced Geometrical Construction', description: 'Complex polygons, tangencies, arcs, and circles.', order: 30, subtopics: ['Complex polygons', 'Conic construction', 'Tangencies', 'Geometric problem solving', 'Arcs and circles'] },
    { title: 'Conic Sections', description: 'Ellipse, parabola, and hyperbola construction.', order: 31, subtopics: ['Ellipse construction', 'Focus and directrix concepts', 'Parabola construction', 'Applications in engineering', 'Hyperbola construction'] },
    { title: 'Orthographic Projection of Complex Objects', description: 'Multiple-view drawings, inclined, and curved surfaces.', order: 32, subtopics: ['Multiple-view drawings', 'Intersections', 'Inclined surfaces', 'Auxiliary views', 'Curved surfaces', 'Dimensioning complex views'] },
    { title: 'Isometric and Pictorial Drawing', description: 'Isometric representation, circles, and irregular objects.', order: 33, subtopics: ['Isometric representation', 'Exploded pictorial views', 'Isometric circles', 'Pictorial dimensioning', 'Irregular objects'] },
    { title: 'Sections and Conventions', description: 'Advanced sectional views, offset, and assembly sections.', order: 34, subtopics: ['Advanced sectional views', 'Standard hatching', 'Offset sections', 'Sectional conventions', 'Assembly sections'] },
    { title: 'Development and Intersections', description: 'Complex surface development and transition pieces.', order: 35, subtopics: ['Complex surface development', 'True-length determination', 'Transition pieces', 'Practical applications', 'Interpenetration of solids'] },
    { title: 'Engineering Drawing Standards', description: 'Drawing-sheet layout, title blocks, and line standards.', order: 36, subtopics: ['Drawing-sheet layout', 'Dimensioning standards', 'Title blocks', 'Symbols and conventions', 'Line standards', 'Drawing quality control'] },
    { title: 'Revision and Practical Assessment (SSS 2 Term 1)', description: 'Integrated projection, sectioning, and development tasks.', order: 37, subtopics: ['Integrated projection task', 'Portfolio review', 'Sectioning task', 'Term examination', 'Development task'] },
    // SSS 2 Second Term
    { title: 'Machine Drawing I', description: 'Purpose, simple machine elements, and component drawings.', order: 38, subtopics: ['Purpose of machine drawing', 'Standard representations', 'Simple machine elements', 'Dimensions and tolerances', 'Detailed component drawings'] },
    { title: 'Machine Drawing II', description: 'Bolts, nuts, screws, keys, shafts, and bearings.', order: 39, subtopics: ['Bolts and nuts', 'Shafts and couplings', 'Screws', 'Bearings and supports', 'Keys and cotters'] },
    { title: 'Assembly Drawing', description: 'Meaning, exploded views, and parts identification.', order: 40, subtopics: ['Meaning of assembly drawing', 'Bill of materials', 'Exploded and assembled views', 'Assembly conventions', 'Parts identification'] },
    { title: 'Working Drawings', description: 'Detail drawings, assembly drawings, and production info.', order: 41, subtopics: ['Detail drawings', 'Material specifications', 'Assembly drawings', 'Tolerance notes', 'Production information'] },
    { title: 'Limits, Fits and Tolerances', description: 'Meaning, types of fits, allowance, and tolerances.', order: 42, subtopics: ['Meaning of limits and tolerances', 'Dimensioning tolerances', 'Types of fits', 'Engineering applications', 'Allowance'] },
    { title: 'Geometric Tolerancing', description: 'Form, orientation, and location tolerances.', order: 43, subtopics: ['Form tolerances', 'Surface indications', 'Orientation tolerances', 'Basic symbols', 'Location tolerances'] },
    { title: 'CAD I', description: 'Creating drawings, layers, and object snaps.', order: 44, subtopics: ['Creating and managing drawings', 'Coordinates', 'Layers', 'Modify tools', 'Object snaps', 'Dimensioning in CAD'] },
    { title: 'CAD II', description: 'Blocks, hatching, text, layouts, and plotting.', order: 45, subtopics: ['Blocks and reusable symbols', 'Layouts and viewports', 'Hatching', 'Plotting and printing', 'Text and annotation', 'File management'] },
    { title: 'Revision and Practical Assessment (SSS 2 Term 2)', description: 'Machine-part drawing, assembly, and CAD practical.', order: 46, subtopics: ['Machine-part drawing', 'CAD practical', 'Assembly exercise', 'Term assessment', 'Tolerance exercise'] },
    // SSS 2 Third Term
    { title: 'Building Drawing I', description: 'Site plans, floor plans, and building symbols.', order: 47, subtopics: ['Site plans', 'Doors and windows', 'Floor plans', 'Wall conventions', 'Building symbols', 'Dimensioning building plans'] },
    { title: 'Building Drawing II', description: 'Elevations, sections, and roof plans.', order: 48, subtopics: ['Elevations', 'Staircase representation', 'Sections', 'Sanitary and service symbols', 'Roof plans'] },
    { title: 'Building Services Drawing', description: 'Electrical, plumbing, and water supply layouts.', order: 49, subtopics: ['Electrical symbols', 'Drainage layouts', 'Plumbing symbols', 'Basic service coordination', 'Water supply layouts'] },
    { title: 'Structural Drawing Basics', description: 'Foundations, columns, and beams.', order: 50, subtopics: ['Foundations', 'Slabs', 'Columns', 'Structural symbols', 'Beams', 'Basic reinforcement representation'] },
    { title: 'Perspective Drawing', description: 'Principles, one-point, and two-point perspective.', order: 51, subtopics: ['Principles of perspective', 'Vanishing points', 'One-point perspective', 'Architectural perspective', 'Two-point perspective'] },
    { title: 'Freehand Architectural Sketching', description: 'Rapid sketching, building forms, and interior sketches.', order: 52, subtopics: ['Rapid sketching', 'Trees and site features', 'Building forms', 'Presentation techniques', 'Interior and exterior sketches'] },
    { title: 'CAD Building Drawing', description: 'Setting up layers, drawing floor plans, and printing.', order: 53, subtopics: ['Setting up layers', 'Dimensions and annotations', 'Drawing a floor plan', 'Printing a plan', 'Doors and windows'] },
    { title: 'Technical Drawing Project', description: 'Project selection, research, and drawing production.', order: 54, subtopics: ['Project selection', 'Corrections and presentation', 'Research and planning', 'Portfolio documentation', 'Drawing production'] },
    { title: 'Revision and Examination', description: 'Comprehensive review, practical drawing, and CAD project.', order: 55, subtopics: ['Comprehensive review', 'CAD project', 'Practical drawing', 'Mock examination'] },
    // SSS 3 First Term
    { title: 'Advanced Machine Drawing', description: 'Detailed components, shafts, couplings, gears.', order: 56, subtopics: ['Detailed machine components', 'Gears and gear arrangements', 'Shafts and couplings', 'Machine-part conventions', 'Bearings'] },
    { title: 'Assembly and Working Drawings (Advanced)', description: 'Assembly interpretation, sectional assemblies.', order: 57, subtopics: ['Assembly interpretation', 'Bill of materials', 'Sectional assemblies', 'Detailing components', 'Exploded views', 'Production information'] },
    { title: 'Gears and Mechanisms', description: 'Gear terminology, spur gears, and gear profiles.', order: 58, subtopics: ['Gear terminology', 'Gear trains', 'Spur gears', 'Simple mechanisms', 'Gear profiles', 'Technical representation'] },
    { title: 'Threads, Fasteners and Welded Joints', description: 'Screw-thread conventions, fasteners, and weld symbols.', order: 59, subtopics: ['Screw-thread conventions', 'Riveted joints', 'Fasteners', 'Joint representation', 'Weld symbols'] },
    { title: 'Limits, Fits and Tolerances (SSS 3)', description: 'Tolerance systems, clearance, and transition fits.', order: 60, subtopics: ['Tolerance systems', 'Surface finish symbols', 'Clearance, transition and interference fits', 'Application in production drawings', 'Tolerance calculations'] },
    { title: 'Advanced CAD I', description: 'Advanced commands, layers, standards, and blocks.', order: 61, subtopics: ['Advanced drawing commands', 'External references', 'Layers and standards', 'Dimension styles', 'Blocks and attributes', 'Templates'] },
    { title: 'Advanced CAD II', description: '3D modelling concepts, solid modelling, and rendering.', order: 62, subtopics: ['3D modelling concepts', 'Rendering and visualisation', 'Solid modelling', '2D drawing extraction', 'Basic 3D features'] },
    { title: 'Engineering Drawing Interpretation', description: 'Reading complex drawings, symbols, and notes.', order: 63, subtopics: ['Reading complex drawings', 'Assembly interpretation', 'Symbols and notes', 'Identifying manufacturing information', 'Specifications'] },
    { title: 'Revision and Practical Assessment (SSS 3 Term 1)', description: 'Machine drawing, assembly drawing, and CAD practical.', order: 64, subtopics: ['Machine drawing', 'Engineering interpretation', 'Assembly drawing', 'Term assessment', 'CAD practical'] },
    // SSS 3 Second Term
    { title: 'Advanced Building Drawing', description: 'Complete floor plans, elevations, sections, and roof.', order: 65, subtopics: ['Complete floor plans', 'Building annotations', 'Elevations and sections', 'Schedules and specifications', 'Roof and staircase details'] },
    { title: 'Structural Detailing', description: 'Foundation details, reinforced concrete, columns, slabs.', order: 66, subtopics: ['Foundation details', 'Slabs', 'Reinforced concrete details', 'Basic steelwork details', 'Columns and beams'] },
    { title: 'Building Services Coordination', description: 'Electrical layouts, plumbing layouts, and drainage.', order: 67, subtopics: ['Electrical layouts', 'Mechanical-service awareness', 'Plumbing layouts', 'Coordination of building services', 'Drainage'] },
    { title: 'Surveying and Site Drawing', description: 'Basic surveying concepts, site measurements, plans.', order: 68, subtopics: ['Basic surveying concepts', 'Contours and levels', 'Site measurements', 'Setting-out concepts', 'Site plans'] },
    { title: 'Perspective and Presentation Drawing', description: 'Advanced one-point, two-point perspective, shadows.', order: 69, subtopics: ['Advanced one-point perspective', 'Presentation techniques', 'Two-point perspective', 'Architectural visualisation', 'Shadows and tonal effects'] },
    { title: 'Advanced CAD for Architecture and Engineering', description: 'CAD standards, layer management, and templates.', order: 70, subtopics: ['CAD standards', 'Templates', 'Layer management', 'Plotting sets', 'Reusable blocks', 'Digital drawing organisation'] },
    { title: 'Technical Documentation', description: 'Drawing registers, revision control, specifications.', order: 71, subtopics: ['Drawing registers', 'Material schedules', 'Revision control', 'Drawing issue procedures', 'Specifications'] },
    { title: 'Design Project', description: 'Problem identification, design requirements, CAD production.', order: 72, subtopics: ['Problem identification', 'Detailed drawings', 'Design requirements', 'CAD production', 'Concept sketches', 'Presentation and evaluation'] },
    { title: 'Revision and Examination Preparation (SSS 3 Term 2)', description: 'Full-course review, past-question practice.', order: 73, subtopics: ['Full-course review', 'Practical examination tasks', 'Past-question style practice', 'Mock examination'] },
    // SSS 3 Third Term
    { title: 'Comprehensive Technical Drawing Revision', description: 'Geometrical construction, projection, and sections.', order: 74, subtopics: ['Geometrical construction', 'Machine drawing', 'Projection', 'Building drawing', 'Sections and development', 'CAD'] },
    { title: 'Practical Examination Preparation', description: 'Instrument setup, drawing-sheet management, accuracy.', order: 75, subtopics: ['Instrument setup', 'Accuracy and neatness', 'Drawing-sheet management', 'Dimensioning and annotation', 'Time allocation'] },
    { title: 'Machine Drawing Practical', description: 'Component drawing, assembly drawing, fasteners.', order: 76, subtopics: ['Component drawing', 'Sections', 'Assembly drawing', 'Tolerances', 'Fasteners'] },
    { title: 'Building Drawing Practical', description: 'Floor plan, elevation, section, site plan.', order: 77, subtopics: ['Floor plan', 'Site plan', 'Elevation', 'Building services', 'Section'] },
    { title: 'CAD Practical Examination', description: '2D drafting, layers, dimensions, layout, plotting.', order: 78, subtopics: ['2D drafting', 'Layout and plotting', 'Layers and dimensions', 'File organisation', 'Blocks and annotations'] },
    { title: 'Technical Drawing Interpretation', description: 'Reading engineering and architectural drawings.', order: 79, subtopics: ['Reading engineering drawings', 'Specifications and notes', 'Reading architectural drawings', 'Problem-solving from drawings', 'Symbols and conventions'] },
    { title: 'Portfolio and Project Presentation', description: 'Selecting best work, drawing corrections, presentation.', order: 80, subtopics: ['Selecting best work', 'Oral presentation', 'Drawing corrections', 'Technical communication', 'Portfolio organisation'] },
    { title: 'Career Applications of Technical Drawing', description: 'Architecture, civil, mechanical engineering, CAD careers.', order: 81, subtopics: ['Architecture', 'Electrical/electronics drawing', 'Civil engineering', 'Manufacturing and fabrication', 'Mechanical engineering', 'CAD careers'] },
    { title: 'Final Revision and Assessment', description: 'Integrated revision, mock practical, theory review.', order: 82, subtopics: ['Integrated revision', 'Final project assessment', 'Mock practical', 'Transition to further technical study', 'Theory review'] }
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
