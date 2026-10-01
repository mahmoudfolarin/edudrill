require('dotenv').config();
const pool = require('../src/config/database');

const fashionQuestions = [
  {
    qText: "Which of the following is a measuring tool used in garment making?",
    optA: "Scissors",
    optB: "Tape measure",
    optC: "Thimble",
    optD: "Tracing wheel",
    correctAnswer: "B"
  },
  {
    qText: "The standard length of a tailor's tape measure is usually:",
    optA: "30 inches",
    optB: "45 inches",
    optC: "60 inches",
    optD: "100 inches",
    correctAnswer: "C"
  },
  {
    qText: "Which tool is used to transfer pattern markings onto fabric?",
    optA: "Seam ripper",
    optB: "Tracing wheel and tailor's chalk",
    optC: "Pinking shears",
    optD: "Thimble",
    correctAnswer: "B"
  },
  {
    qText: "A seam ripper is primarily used for:",
    optA: "Cutting fabric",
    optB: "Unpicking or removing stitches",
    optC: "Sewing buttons",
    optD: "Measuring hems",
    correctAnswer: "B"
  },
  {
    qText: "Which cutting tool has zigzag edges to prevent fabric from fraying?",
    optA: "Embroidery scissors",
    optB: "Paper scissors",
    optC: "Pinking shears",
    optD: "Rotary cutter",
    correctAnswer: "C"
  },
  {
    qText: "The small metal or plastic cap worn on the middle finger to push a needle through fabric is called a:",
    optA: "Bobbin",
    optB: "Thimble",
    optC: "Presser foot",
    optD: "Bodkin",
    correctAnswer: "B"
  },
  {
    qText: "In a sewing machine, the spool that holds the lower thread is called the:",
    optA: "Feed dog",
    optB: "Bobbin",
    optC: "Balance wheel",
    optD: "Tension disc",
    correctAnswer: "B"
  },
  {
    qText: "The part of the sewing machine that moves the fabric forward as you sew is the:",
    optA: "Presser foot",
    optB: "Needle clamp",
    optC: "Feed dog",
    optD: "Spool pin",
    correctAnswer: "C"
  },
  {
    qText: "Which part of the sewing machine holds the fabric firmly against the feed dog?",
    optA: "Presser foot",
    optB: "Thread guide",
    optC: "Take-up lever",
    optD: "Handwheel",
    correctAnswer: "A"
  },
  {
    qText: "A basic stitch used to temporarily hold fabric pieces together before permanent sewing is called:",
    optA: "Backstitch",
    optB: "Basting (or Tacking)",
    optC: "Hemming",
    optD: "Overcasting",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following hand stitches is considered the strongest and resembles machine stitching on the right side?",
    optA: "Running stitch",
    optB: "Backstitch",
    optC: "Slip stitch",
    optD: "Catch stitch",
    correctAnswer: "B"
  },
  {
    qText: "The finished edge of a woven fabric that runs parallel to the lengthwise grain and prevents fraying is the:",
    optA: "Selvedge",
    optB: "Bias",
    optC: "Raw edge",
    optD: "Crosswise grain",
    correctAnswer: "A"
  },
  {
    qText: "Cutting fabric on the 'bias' means cutting it at a:",
    optA: "90-degree angle to the selvedge",
    optB: "45-degree angle to the selvedge",
    optC: "Parallel line to the selvedge",
    optD: "Random angle",
    correctAnswer: "B"
  },
  {
    qText: "Fabric cut on the bias has the advantage of:",
    optA: "Being completely rigid",
    optB: "Maximum stretch and drape",
    optC: "Never fraying",
    optD: "Being waterproof",
    correctAnswer: "B"
  },
  {
    qText: "The line where two pieces of fabric are sewn together is called a:",
    optA: "Hem",
    optB: "Dart",
    optC: "Seam",
    optD: "Pleat",
    correctAnswer: "C"
  },
  {
    qText: "The distance between the stitching line and the raw edge of the fabric is the:",
    optA: "Seam allowance",
    optB: "Hem allowance",
    optC: "Dart width",
    optD: "Ease",
    correctAnswer: "A"
  },
  {
    qText: "A standard commercial seam allowance is usually:",
    optA: "1/4 inch",
    optB: "5/8 inch",
    optC: "1 inch",
    optD: "2 inches",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a type of seam commonly used for jeans because of its strength?",
    optA: "French seam",
    optB: "Flat-felled seam",
    optC: "Plain seam",
    optD: "Lapped seam",
    correctAnswer: "B"
  },
  {
    qText: "A French seam is best suited for:",
    optA: "Heavy denim fabric",
    optB: "Sheer or lightweight fabrics",
    optC: "Leather",
    optD: "Thick wool",
    correctAnswer: "B"
  },
  {
    qText: "A triangular fold stitched into a garment to shape flat fabric to the curves of the body is a:",
    optA: "Pleat",
    optB: "Tuck",
    optC: "Dart",
    optD: "Gather",
    correctAnswer: "C"
  },
  {
    qText: "A finished lower edge of a garment is called a:",
    optA: "Collar",
    optB: "Cuff",
    optC: "Hem",
    optD: "Seam",
    correctAnswer: "C"
  },
  {
    qText: "When taking body measurements, the tape measure should be:",
    optA: "Pulled as tight as possible",
    optB: "Left very loose",
    optC: "Snug but not tight, keeping it level",
    optD: "Twisted for accuracy",
    correctAnswer: "C"
  },
  {
    qText: "To measure the bust accurately, the tape measure must pass over the:",
    optA: "Collarbone",
    optB: "Fullest part of the bust",
    optC: "Underbust line",
    optD: "Waistline",
    correctAnswer: "B"
  },
  {
    qText: "The measurement taken from the prominent bone at the back of the neck down to the waist is the:",
    optA: "Front bodice length",
    optB: "Nape to waist (Back length)",
    optC: "Shoulder to shoulder",
    optD: "Hip measurement",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a natural fiber?",
    optA: "Polyester",
    optB: "Nylon",
    optC: "Cotton",
    optD: "Acrylic",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is an animal fiber?",
    optA: "Linen",
    optB: "Cotton",
    optC: "Silk",
    optD: "Rayon",
    correctAnswer: "C"
  },
  {
    qText: "Linen is a natural fiber obtained from the:",
    optA: "Cotton plant",
    optB: "Flax plant",
    optC: "Silkworm",
    optD: "Sheep",
    correctAnswer: "B"
  },
  {
    qText: "Which synthetic fiber is known for being strong, lightweight, and wrinkle-resistant?",
    optA: "Polyester",
    optB: "Wool",
    optC: "Silk",
    optD: "Cotton",
    correctAnswer: "A"
  },
  {
    qText: "The process of preparing fabric by washing or steam pressing before cutting to prevent future shrinking is called:",
    optA: "Preshrinking",
    optB: "Ironing",
    optC: "Dyeing",
    optD: "Bleaching",
    correctAnswer: "A"
  },
  {
    qText: "A template used to trace parts of a garment onto fabric before cutting is called a:",
    optA: "Draft",
    optB: "Pattern",
    optC: "Sketch",
    optD: "Block",
    correctAnswer: "B"
  },
  {
    qText: "The basic, un-styled pattern from which other styles are developed is called a:",
    optA: "Block or Sloper",
    optB: "Toile",
    optC: "Muslin",
    optD: "Final pattern",
    correctAnswer: "A"
  },
  {
    qText: "A 'toile' (or muslin) is:",
    optA: "A decorative sewing technique",
    optB: "A test garment made from cheap fabric to check the fit",
    optC: "A type of silk fabric",
    optD: "A pressing tool",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a fastening device used in garments?",
    optA: "Zipper",
    optB: "Dart",
    optC: "Hem",
    optD: "Seam",
    correctAnswer: "A"
  },
  {
    qText: "A strip of fabric used to finish a raw edge, often cut on the bias, is called a:",
    optA: "Facing",
    optB: "Binding",
    optC: "Interfacing",
    optD: "Lining",
    correctAnswer: "B"
  },
  {
    qText: "A piece of fabric applied to the inside of a garment edge (like a neckline) to finish it cleanly is a:",
    optA: "Facing",
    optB: "Binding",
    optC: "Pleat",
    optD: "Gather",
    correctAnswer: "A"
  },
  {
    qText: "A stiff or stiffened material placed between the outer fabric and the facing to add structure (e.g., in collars) is:",
    optA: "Lining",
    optB: "Interfacing",
    optC: "Binding",
    optD: "Underlining",
    correctAnswer: "B"
  },
  {
    qText: "The internal layer of fabric that hides the inner construction of a garment and makes it easier to slip on is the:",
    optA: "Facing",
    optB: "Lining",
    optC: "Interfacing",
    optD: "Applique",
    correctAnswer: "B"
  },
  {
    qText: "The principle of design that draws the eye to a specific focal point in a garment is:",
    optA: "Balance",
    optB: "Emphasis",
    optC: "Proportion",
    optD: "Rhythm",
    correctAnswer: "B"
  },
  {
    qText: "Vertical lines in clothing design generally tend to make the wearer appear:",
    optA: "Shorter and wider",
    optB: "Taller and slimmer",
    optC: "Heavier",
    optD: "More curved",
    correctAnswer: "B"
  },
  {
    qText: "Horizontal lines in clothing design generally tend to make the wearer appear:",
    optA: "Taller and slimmer",
    optB: "Shorter and wider",
    optC: "Lighter",
    optD: "More athletic",
    correctAnswer: "B"
  },
  {
    qText: "A decorative sewing technique where pieces of fabric are sewn onto a larger background fabric to create pictures or patterns is:",
    optA: "Quilting",
    optB: "Appliqué",
    optC: "Smocking",
    optD: "Shirring",
    correctAnswer: "B"
  },
  {
    qText: "The Nigerian traditional tie-and-dye fabric made predominantly in the South-West is:",
    optA: "Aso-Oke",
    optB: "Adire",
    optC: "Ankara",
    optD: "Kente",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a woven fabric traditionally produced by the Yoruba people of Nigeria?",
    optA: "Adire",
    optB: "Aso-Oke",
    optC: "Akwete",
    optD: "Batik",
    correctAnswer: "B"
  },
  {
    qText: "The small fold or series of folds created by pulling threads to gather fabric is called:",
    optA: "Pleating",
    optB: "Gathering",
    optC: "Tucking",
    optD: "Darning",
    correctAnswer: "B"
  },
  {
    qText: "To repair a hole in fabric by interweaving yarn with a needle is called:",
    optA: "Patching",
    optB: "Darning",
    optC: "Quilting",
    optD: "Basting",
    correctAnswer: "B"
  },
  {
    qText: "Which pressing equipment is used to press curved areas like darts and sleeves?",
    optA: "Ironing board",
    optB: "Tailor's ham",
    optC: "Seam roll",
    optD: "Sleeve board",
    correctAnswer: "B"
  },
  {
    qText: "The term 'Nap' refers to:",
    optA: "A short sleep taken by a tailor",
    optB: "The raised, fuzzy surface on fabrics like velvet and corduroy",
    optC: "A type of button",
    optD: "A measuring tool",
    correctAnswer: "B"
  },
  {
    qText: "When cutting out a pattern on a fabric with a nap (like velvet), all pattern pieces must be laid:",
    optA: "In opposite directions",
    optB: "In the same direction",
    optC: "Diagonally",
    optD: "Any way they fit to save fabric",
    correctAnswer: "B"
  },
  {
    qText: "A notch on a sewing pattern is used to:",
    optA: "Decorate the paper",
    optB: "Indicate how much fabric to buy",
    optC: "Help match and align different pieces of fabric before sewing",
    optD: "Show where the button goes",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following describes 'Haute Couture'?",
    optA: "Mass-produced cheap clothing",
    optB: "High-end, custom-fitted, exclusive fashion design",
    optC: "Second-hand clothing",
    optD: "Uniform manufacturing",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'fashion-design-and-garment-making';
  const subjectGroup = 'Vocational';
  const subjectName = 'Fashion Design and Garment Making';

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

    for (const q of fashionQuestions) {
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
