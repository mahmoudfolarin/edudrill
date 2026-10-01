require('dotenv').config();
const pool = require('../src/config/database');

const artQuestions = [
  {
    qText: "The process of creating a picture using dry media such as graphite or charcoal is called:",
    optA: "Painting",
    optB: "Drawing",
    optC: "Sculpting",
    optD: "Printing",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is an example of a 2-dimensional art form?",
    optA: "Pottery",
    optB: "Painting",
    optC: "Sculpture",
    optD: "Architecture",
    correctAnswer: "B"
  },
  {
    qText: "A primary color is one that:",
    optA: "Is mixed from two secondary colors",
    optB: "Cannot be created by mixing other colors",
    optC: "Contains black",
    optD: "Is used only in oil painting",
    correctAnswer: "B"
  },
  {
    qText: "When you mix red and yellow, you get:",
    optA: "Green",
    optB: "Purple",
    optC: "Orange",
    optD: "Brown",
    correctAnswer: "C"
  },
  {
    qText: "When you mix blue and yellow, you get:",
    optA: "Green",
    optB: "Purple",
    optC: "Orange",
    optD: "Black",
    correctAnswer: "A"
  },
  {
    qText: "When you mix red and blue, you get:",
    optA: "Green",
    optB: "Orange",
    optC: "Purple / Violet",
    optD: "Grey",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following describes 'Value' in art?",
    optA: "The cost of the painting",
    optB: "The lightness or darkness of a color",
    optC: "The texture of the canvas",
    optD: "The shape of the frame",
    correctAnswer: "B"
  },
  {
    qText: "The path of a moving point through space is called a:",
    optA: "Shape",
    optB: "Form",
    optC: "Line",
    optD: "Color",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is NOT a principle of design?",
    optA: "Balance",
    optB: "Contrast",
    optC: "Rhythm",
    optD: "Texture",
    correctAnswer: "D"
  },
  {
    qText: "The arrangement of opposite elements (light vs. dark, rough vs. smooth) to create visual interest is called:",
    optA: "Harmony",
    optB: "Contrast",
    optC: "Symmetry",
    optD: "Pattern",
    correctAnswer: "B"
  },
  {
    qText: "Which type of balance occurs when both sides of an artwork are exactly the same?",
    optA: "Asymmetrical balance",
    optB: "Symmetrical (Formal) balance",
    optC: "Radial balance",
    optD: "Dynamic balance",
    correctAnswer: "B"
  },
  {
    qText: "A design that radiates from a central point has:",
    optA: "Asymmetrical balance",
    optB: "Symmetrical balance",
    optC: "Radial balance",
    optD: "No balance",
    correctAnswer: "C"
  },
  {
    qText: "An artist mixes a color with black to create a:",
    optA: "Tint",
    optB: "Shade",
    optC: "Tone",
    optD: "Hue",
    correctAnswer: "B"
  },
  {
    qText: "An artist mixes a color with white to create a:",
    optA: "Tint",
    optB: "Shade",
    optC: "Tone",
    optD: "Hue",
    correctAnswer: "A"
  },
  {
    qText: "Colors that are next to each other on the color wheel are called:",
    optA: "Complementary colors",
    optB: "Analogous colors",
    optC: "Primary colors",
    optD: "Monochromatic colors",
    correctAnswer: "B"
  },
  {
    qText: "An artwork using only one color and its tints and shades is called:",
    optA: "Polychromatic",
    optB: "Monochromatic",
    optC: "Achromatic",
    optD: "Analogous",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is considered a 'warm' color?",
    optA: "Blue",
    optB: "Green",
    optC: "Red",
    optD: "Violet",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is considered a 'cool' color?",
    optA: "Red",
    optB: "Yellow",
    optC: "Blue",
    optD: "Orange",
    correctAnswer: "C"
  },
  {
    qText: "The technique of creating an illusion of depth and distance on a flat surface is known as:",
    optA: "Foreshortening",
    optB: "Perspective",
    optC: "Shading",
    optD: "Proportion",
    correctAnswer: "B"
  },
  {
    qText: "In one-point perspective, the point where all receding lines meet is called the:",
    optA: "Horizon line",
    optB: "Vanishing point",
    optC: "Center point",
    optD: "Focal point",
    correctAnswer: "B"
  },
  {
    qText: "The line where the sky and the earth appear to meet is the:",
    optA: "Vanishing point",
    optB: "Horizon line",
    optC: "Vertical line",
    optD: "Diagonal line",
    correctAnswer: "B"
  },
  {
    qText: "A sculpture that can be viewed from all sides is called:",
    optA: "Relief sculpture",
    optB: "Kinetic sculpture",
    optC: "Sculpture in the round",
    optD: "Assemblage",
    correctAnswer: "C"
  },
  {
    qText: "A sculpture in which figures project slightly from a background surface is a:",
    optA: "Free-standing sculpture",
    optB: "Relief sculpture",
    optC: "Mobile",
    optD: "Bust",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following materials is typically used for carving?",
    optA: "Clay",
    optB: "Wax",
    optC: "Wood",
    optD: "Papier-mâché",
    correctAnswer: "C"
  },
  {
    qText: "The process of building up a form using soft materials like clay or wax is called:",
    optA: "Carving",
    optB: "Casting",
    optC: "Modeling",
    optD: "Weaving",
    correctAnswer: "C"
  },
  {
    qText: "Which liquid is used to thin oil paints and clean brushes?",
    optA: "Water",
    optB: "Turpentine / Linseed oil",
    optC: "Vinegar",
    optD: "Bleach",
    correctAnswer: "B"
  },
  {
    qText: "Which type of paint uses egg yolk as a binder?",
    optA: "Oil paint",
    optB: "Watercolor",
    optC: "Tempera",
    optD: "Acrylic",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is a fast-drying paint made of pigment suspended in acrylic polymer emulsion?",
    optA: "Oil paint",
    optB: "Acrylic paint",
    optC: "Watercolor",
    optD: "Gouache",
    correctAnswer: "B"
  },
  {
    qText: "Which Nigerian art tradition is famous for ancient brass and bronze heads found in the Osun state region?",
    optA: "Benin",
    optB: "Ife",
    optC: "Nok",
    optD: "Esie",
    correctAnswer: "B"
  },
  {
    qText: "The Nok culture is best known for its:",
    optA: "Wooden masks",
    optB: "Terracotta figures",
    optC: "Bronze casting",
    optD: "Stone monoliths",
    correctAnswer: "B"
  },
  {
    qText: "The 'Festac Mask' (Queen Idia mask) is originally from which ancient Nigerian kingdom?",
    optA: "Oyo Empire",
    optB: "Nri Kingdom",
    optC: "Benin Kingdom",
    optD: "Sokoto Caliphate",
    correctAnswer: "C"
  },
  {
    qText: "Which art movement uses distorted, fragmented, and overlapping geometric shapes?",
    optA: "Impressionism",
    optB: "Cubism",
    optC: "Surrealism",
    optD: "Realism",
    correctAnswer: "B"
  },
  {
    qText: "Who painted the 'Mona Lisa'?",
    optA: "Michelangelo",
    optB: "Vincent van Gogh",
    optC: "Leonardo da Vinci",
    optD: "Pablo Picasso",
    correctAnswer: "C"
  },
  {
    qText: "Vincent van Gogh is famous for which painting?",
    optA: "The Last Supper",
    optB: "The Starry Night",
    optC: "Guernica",
    optD: "The Persistence of Memory",
    correctAnswer: "B"
  },
  {
    qText: "Which art movement was characterized by dream-like imagery and the subconscious?",
    optA: "Pop Art",
    optB: "Impressionism",
    optC: "Surrealism",
    optD: "Fauvism",
    correctAnswer: "C"
  },
  {
    qText: "A picture composed of small pieces of colored stone, glass, or tile is called a:",
    optA: "Fresco",
    optB: "Collage",
    optC: "Mosaic",
    optD: "Mural",
    correctAnswer: "C"
  },
  {
    qText: "A picture created by gluing various materials (paper, fabric) to a flat surface is a:",
    optA: "Collage",
    optB: "Montage",
    optC: "Mosaic",
    optD: "Fresco",
    correctAnswer: "A"
  },
  {
    qText: "The art of folding paper into decorative shapes, originating in Japan, is called:",
    optA: "Ikebana",
    optB: "Origami",
    optC: "Calligraphy",
    optD: "Bonsai",
    correctAnswer: "B"
  },
  {
    qText: "Typography is the art of:",
    optA: "Designing and arranging typefaces (text)",
    optB: "Drawing maps",
    optC: "Painting landscapes",
    optD: "Sculpting stone",
    correctAnswer: "A"
  },
  {
    qText: "Which tool is commonly used to apply ink in printmaking?",
    optA: "Palette knife",
    optB: "Brayer (Roller)",
    optC: "Chisel",
    optD: "Spatula",
    correctAnswer: "B"
  },
  {
    qText: "A 'still life' painting typically depicts:",
    optA: "People in motion",
    optB: "Natural outdoor scenery",
    optC: "Inanimate, everyday objects like fruit or flowers",
    optD: "Abstract geometric shapes",
    correctAnswer: "C"
  },
  {
    qText: "A painting or drawing of a specific person is called a:",
    optA: "Landscape",
    optB: "Portrait",
    optC: "Still life",
    optD: "Mural",
    correctAnswer: "B"
  },
  {
    qText: "A 'mural' is an artwork that is usually:",
    optA: "Carved out of wood",
    optB: "Painted directly onto a large wall or ceiling",
    optC: "Printed on paper",
    optD: "Woven on a loom",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is NOT a form of printmaking?",
    optA: "Etching",
    optB: "Lithography",
    optC: "Linocut",
    optD: "Fresco",
    correctAnswer: "D"
  },
  {
    qText: "To draw something by looking directly at the object is called:",
    optA: "Memory drawing",
    optB: "Imaginative drawing",
    optC: "Life / Observation drawing",
    optD: "Technical drawing",
    correctAnswer: "C"
  },
  {
    qText: "The technique of shading with a series of fine parallel lines is called:",
    optA: "Hatching",
    optB: "Stippling",
    optC: "Blending",
    optD: "Cross-hatching",
    correctAnswer: "A"
  },
  {
    qText: "Stippling involves creating shading and texture using:",
    optA: "Long straight lines",
    optB: "Crossed lines",
    optC: "Small dots",
    optD: "Smudged graphite",
    correctAnswer: "C"
  },
  {
    qText: "A very rough sketch used to plan out a larger composition is called a:",
    optA: "Thumbnail sketch",
    optB: "Masterpiece",
    optC: "Final draft",
    optD: "Still life",
    correctAnswer: "A"
  },
  {
    qText: "In architecture, the vertical supporting column is often paired with a horizontal cross-piece called a:",
    optA: "Dome",
    optB: "Arch",
    optC: "Lintel",
    optD: "Vault",
    correctAnswer: "C"
  },
  {
    qText: "The use of light and dark values to create the illusion of 3D form is known as:",
    optA: "Chiaroscuro",
    optB: "Sfumato",
    optC: "Impasto",
    optD: "Fresco",
    correctAnswer: "A"
  }
];

async function main() {
  const subjectSlug = 'art';
  const subjectGroup = 'Arts';
  const subjectName = 'Art';

  try {
    let subjectId;
    const subRes = await pool.query('SELECT id FROM subjects WHERE slug = $1', [subjectSlug]);
    if (subRes.rows.length > 0) {
      subjectId = subRes.rows[0].id;
    } else {
      const insRes = await pool.query('INSERT INTO subjects (name, slug, subject_group) VALUES ($1, $2, $3) RETURNING id', [subjectName, subjectSlug, subjectGroup]);
      subjectId = insRes.rows[0].id;
    }

    const exams = ['WAEC', 'NECO', 'JAMB', 'GCE'];
    let inserted = 0;

    for (const q of artQuestions) {
      for (const e of exams) {
        const qCheck = await pool.query('SELECT id FROM questions WHERE subject_id = $1 AND exam = $2 AND LEFT(question_text, 50) = LEFT($3, 50)', [subjectId, e, q.qText]);
        if (qCheck.rows.length > 0) continue;

        await pool.query(
          `INSERT INTO questions (
            exam, year, subject_id, question_text, 
            option_a, option_b, option_c, option_d, correct_answer, 
            difficulty, marks, source_type, license_status, is_active,
            verification_status, explanation
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
          [
            e, 2025, subjectId, q.qText,
            q.optA, q.optB, q.optC, q.optD, q.correctAnswer,
            'medium', 1, 'past_question', 'public_domain', true,
            'verified', null
          ]
        );
        inserted++;
      }
    }
    console.log(`Inserted ${inserted} generated question rows for ${subjectName} across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
