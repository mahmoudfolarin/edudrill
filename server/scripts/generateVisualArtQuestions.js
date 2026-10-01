require('dotenv').config();
const pool = require('../src/config/database');

const visualArtQuestions = [
  {
    qText: "Which of the following is NOT an element of art?",
    optA: "Line",
    optB: "Color",
    optC: "Balance",
    optD: "Texture",
    correctAnswer: "C"
  },
  {
    qText: "The primary colors are:",
    optA: "Red, Yellow, Blue",
    optB: "Orange, Green, Purple",
    optC: "Black, White, Gray",
    optD: "Red, Green, Blue",
    correctAnswer: "A"
  },
  {
    qText: "Mixing two primary colors in equal proportions produces a:",
    optA: "Tertiary color",
    optB: "Secondary color",
    optC: "Neutral color",
    optD: "Complementary color",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a secondary color?",
    optA: "Red",
    optB: "Blue",
    optC: "Green",
    optD: "Yellow",
    correctAnswer: "C"
  },
  {
    qText: "Colors that are opposite each other on the color wheel are called:",
    optA: "Analogous colors",
    optB: "Complementary colors",
    optC: "Warm colors",
    optD: "Cool colors",
    correctAnswer: "B"
  },
  {
    qText: "The lightness or darkness of a color is known as its:",
    optA: "Hue",
    optB: "Intensity",
    optC: "Value",
    optD: "Tone",
    correctAnswer: "C"
  },
  {
    qText: "Adding white to a color produces a:",
    optA: "Shade",
    optB: "Tint",
    optC: "Tone",
    optD: "Shadow",
    correctAnswer: "B"
  },
  {
    qText: "Adding black to a color produces a:",
    optA: "Shade",
    optB: "Tint",
    optC: "Highlight",
    optD: "Glow",
    correctAnswer: "A"
  },
  {
    qText: "Which principle of design refers to the visual weight of elements in an artwork?",
    optA: "Rhythm",
    optB: "Proportion",
    optC: "Balance",
    optD: "Emphasis",
    correctAnswer: "C"
  },
  {
    qText: "An artwork that has equal visual weight on both sides is said to have:",
    optA: "Asymmetrical balance",
    optB: "Symmetrical balance",
    optC: "Radial balance",
    optD: "No balance",
    correctAnswer: "B"
  },
  {
    qText: "The focal point of an artwork, where the viewer's eye is drawn first, is created using:",
    optA: "Emphasis",
    optB: "Pattern",
    optC: "Movement",
    optD: "Unity",
    correctAnswer: "A"
  },
  {
    qText: "The repetition of elements such as lines, shapes, or colors creates:",
    optA: "Contrast",
    optB: "Pattern",
    optC: "Emphasis",
    optD: "Proportion",
    correctAnswer: "B"
  },
  {
    qText: "The surface quality of an object, whether it feels rough or smooth, is its:",
    optA: "Form",
    optB: "Shape",
    optC: "Texture",
    optD: "Space",
    correctAnswer: "C"
  },
  {
    qText: "A two-dimensional enclosed area is a:",
    optA: "Form",
    optB: "Line",
    optC: "Shape",
    optD: "Space",
    correctAnswer: "C"
  },
  {
    qText: "A three-dimensional object that has height, width, and depth is a:",
    optA: "Form",
    optB: "Shape",
    optC: "Line",
    optD: "Pattern",
    correctAnswer: "A"
  },
  {
    qText: "Which art form involves shaping clay, stone, or wood into 3D figures?",
    optA: "Painting",
    optB: "Sculpture",
    optC: "Printmaking",
    optD: "Photography",
    correctAnswer: "B"
  },
  {
    qText: "The technique of creating an artwork by gluing pieces of paper, fabric, or other materials to a surface is called:",
    optA: "Mosaic",
    optB: "Collage",
    optC: "Fresco",
    optD: "Montage",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a traditional Nigerian art culture known for its terracotta heads?",
    optA: "Benin",
    optB: "Ife",
    optC: "Nok",
    optD: "Igbo-Ukwu",
    correctAnswer: "C"
  },
  {
    qText: "The bronze casting technique used by the ancient Benin Kingdom is called:",
    optA: "Lost-wax process (Cire-perdue)",
    optB: "Sand casting",
    optC: "Die casting",
    optD: "Forging",
    correctAnswer: "A"
  },
  {
    qText: "Ife art is renowned worldwide for its highly naturalistic:",
    optA: "Wooden masks",
    optB: "Terracotta and bronze heads",
    optC: "Stone monoliths",
    optD: "Textile weaves",
    correctAnswer: "B"
  },
  {
    qText: "Which Nigerian art culture is associated with intricately decorated bronze vessels and roped pots?",
    optA: "Esie",
    optB: "Igbo-Ukwu",
    optC: "Owo",
    optD: "Benin",
    correctAnswer: "B"
  },
  {
    qText: "The traditional tie-and-dye textile art of the Yoruba people is called:",
    optA: "Aso-Oke",
    optB: "Adire",
    optC: "Akwete",
    optD: "Kente",
    correctAnswer: "B"
  },
  {
    qText: "Which material is primarily used to create a mosaic?",
    optA: "Paint",
    optB: "Clay",
    optC: "Small pieces of colored glass, stone, or tile (Tesserae)",
    optD: "Wood carvings",
    correctAnswer: "C"
  },
  {
    qText: "The art of beautiful handwriting is called:",
    optA: "Typography",
    optB: "Calligraphy",
    optC: "Lithography",
    optD: "Hieroglyphics",
    correctAnswer: "B"
  },
  {
    qText: "A painting of inanimate objects such as fruits, flowers, or bowls is called a:",
    optA: "Landscape",
    optB: "Portrait",
    optC: "Still life",
    optD: "Seascape",
    correctAnswer: "C"
  },
  {
    qText: "A painting or drawing of a person's face is a:",
    optA: "Landscape",
    optB: "Portrait",
    optC: "Still life",
    optD: "Abstract",
    correctAnswer: "B"
  },
  {
    qText: "A painting depicting natural scenery like mountains, valleys, or trees is a:",
    optA: "Portrait",
    optB: "Landscape",
    optC: "Mural",
    optD: "Miniature",
    correctAnswer: "B"
  },
  {
    qText: "Which tool is commonly used to apply oil or acrylic paint to a canvas?",
    optA: "Chisel",
    optB: "Spatula / Palette knife",
    optC: "Gouge",
    optD: "Stylus",
    correctAnswer: "B"
  },
  {
    qText: "The surface on which an artist mixes colors is called a:",
    optA: "Canvas",
    optB: "Easel",
    optC: "Palette",
    optD: "Frame",
    correctAnswer: "C"
  },
  {
    qText: "A stand used to support a canvas while painting is called an:",
    optA: "Easel",
    optB: "Armature",
    optC: "Palette",
    optD: "Plinth",
    correctAnswer: "A"
  },
  {
    qText: "The technique of shading using closely spaced parallel lines is called:",
    optA: "Stippling",
    optB: "Hatching",
    optC: "Blending",
    optD: "Smudging",
    correctAnswer: "B"
  },
  {
    qText: "Cross-hatching is a drawing technique used to create:",
    optA: "Color",
    optB: "Value and texture",
    optC: "Shape",
    optD: "Line only",
    correctAnswer: "B"
  },
  {
    qText: "An artwork created by applying pigment to wet plaster on a wall is a:",
    optA: "Mural",
    optB: "Fresco",
    optC: "Mosaic",
    optD: "Tapestry",
    correctAnswer: "B"
  },
  {
    qText: "Which art movement is Pablo Picasso famously associated with?",
    optA: "Impressionism",
    optB: "Surrealism",
    optC: "Cubism",
    optD: "Realism",
    correctAnswer: "C"
  },
  {
    qText: "Leonardo da Vinci's 'Mona Lisa' is an example of which art period?",
    optA: "Renaissance",
    optB: "Baroque",
    optC: "Modern",
    optD: "Abstract Expressionism",
    correctAnswer: "A"
  },
  {
    qText: "Aina Onabolu is widely regarded in Nigeria as the pioneer of:",
    optA: "Traditional sculpture",
    optB: "Modern Nigerian art and portraiture",
    optC: "Printmaking",
    optD: "Textile weaving",
    correctAnswer: "B"
  },
  {
    qText: "The Osogbo Art Movement in Nigeria was highly influenced by:",
    optA: "Ulli Beier and Susanne Wenger",
    optB: "Aina Onabolu",
    optC: "Ben Enwonwu",
    optD: "Bruce Onobrakpeya",
    correctAnswer: "A"
  },
  {
    qText: "Ben Enwonwu is famous for creating the sculpture of which prominent figure?",
    optA: "Queen Elizabeth II",
    optB: "Nelson Mandela",
    optC: "Nnamdi Azikiwe",
    optD: "Sango",
    correctAnswer: "A"
  },
  {
    qText: "A kiln is an oven used primarily for:",
    optA: "Melting bronze",
    optB: "Firing clay/ceramics",
    optC: "Drying oil paintings",
    optD: "Baking bread",
    correctAnswer: "B"
  },
  {
    qText: "The process of kneading clay to remove air bubbles is called:",
    optA: "Throwing",
    optB: "Glazing",
    optC: "Wedging",
    optD: "Scoring",
    correctAnswer: "C"
  },
  {
    qText: "Clay that has been fired once and is unglazed is called:",
    optA: "Slip",
    optB: "Bisque",
    optC: "Greenware",
    optD: "Leather-hard",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a printmaking technique?",
    optA: "Linocut",
    optB: "Fresco",
    optC: "Origami",
    optD: "Macrame",
    correctAnswer: "A"
  },
  {
    qText: "The skeleton-like framework used to support a sculpture is an:",
    optA: "Armature",
    optB: "Easel",
    optC: "Plinth",
    optD: "Mold",
    correctAnswer: "A"
  },
  {
    qText: "Graphic design is primarily concerned with:",
    optA: "Visual communication using text and images",
    optB: "Carving wood",
    optC: "Weaving cloth",
    optD: "Painting portraits",
    correctAnswer: "A"
  },
  {
    qText: "A logo is an example of:",
    optA: "Fine art",
    optB: "Applied art / Graphic design",
    optC: "Ceramics",
    optD: "Architecture",
    correctAnswer: "B"
  },
  {
    qText: "The area around and between the subjects of an image is called:",
    optA: "Positive space",
    optB: "Negative space",
    optC: "Foreground",
    optD: "Background",
    correctAnswer: "B"
  },
  {
    qText: "Which pencil lead is the softest and produces the darkest lines?",
    optA: "2H",
    optB: "HB",
    optC: "2B",
    optD: "6B",
    correctAnswer: "D"
  },
  {
    qText: "Photography literally translates to:",
    optA: "Writing with light",
    optB: "Drawing with light",
    optC: "Painting with light",
    optD: "Seeing with light",
    correctAnswer: "A"
  },
  {
    qText: "A motif in art is a:",
    optA: "Type of paint",
    optB: "Repeated design or pattern unit",
    optC: "Sculpture tool",
    optD: "Ceramic glaze",
    correctAnswer: "B"
  },
  {
    qText: "Which art style does not attempt to represent external reality, but seeks to achieve its effect using shapes, forms, colors, and textures?",
    optA: "Realism",
    optB: "Abstract art",
    optC: "Naturalism",
    optD: "Photorealism",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'visual-art';
  const subjectGroup = 'Arts';
  const subjectName = 'Visual Art';

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

    for (const q of visualArtQuestions) {
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
