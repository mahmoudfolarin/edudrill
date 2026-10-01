require('dotenv').config();
const pool = require('../src/config/database');

const cosmetologyQuestions = [
  {
    qText: "Cosmetology is the study of:",
    optA: "Outer space",
    optB: "Beauty treatment, hair care, skin care, and cosmetics",
    optC: "Human anatomy and medicine",
    optD: "Fashion designing and sewing",
    correctAnswer: "B"
  },
  {
    qText: "A person who is licensed to provide cosmetic treatments to the hair, skin, and nails is a:",
    optA: "Dermatologist",
    optB: "Cosmetologist",
    optC: "Pharmacist",
    optD: "Dietician",
    correctAnswer: "B"
  },
  {
    qText: "Personal hygiene in a salon is essential to:",
    optA: "Make the salon look expensive",
    optB: "Prevent the spread of diseases and infections",
    optC: "Attract only wealthy clients",
    optD: "Reduce the use of water",
    correctAnswer: "B"
  },
  {
    qText: "Sterilization in cosmetology means:",
    optA: "Cleaning with soap and water",
    optB: "The complete destruction of all living microorganisms",
    optC: "Wiping tools with a dry cloth",
    optD: "Spraying perfume in the air",
    correctAnswer: "B"
  },
  {
    qText: "Disinfection is different from sterilization because it:",
    optA: "Destroys most, but not all, harmful microorganisms",
    optB: "Is used only on human skin",
    optC: "Kills all bacterial spores",
    optD: "Requires extreme heat",
    correctAnswer: "A"
  },
  {
    qText: "An autoclave is a machine used in salons to:",
    optA: "Dry hair",
    optB: "Sterilize equipment using steam under pressure",
    optC: "Mix hair color",
    optD: "Massage the scalp",
    correctAnswer: "B"
  },
  {
    qText: "The largest organ of the human body is the:",
    optA: "Liver",
    optB: "Heart",
    optC: "Skin",
    optD: "Brain",
    correctAnswer: "C"
  },
  {
    qText: "The outermost layer of the skin is the:",
    optA: "Dermis",
    optB: "Subcutaneous layer",
    optC: "Epidermis",
    optD: "Follicle",
    correctAnswer: "C"
  },
  {
    qText: "Which layer of the skin contains the hair follicles, sweat glands, and blood vessels?",
    optA: "Epidermis",
    optB: "Dermis",
    optC: "Subcutaneous tissue",
    optD: "Stratum corneum",
    correctAnswer: "B"
  },
  {
    qText: "Melanin is responsible for:",
    optA: "Producing sweat",
    optB: "Determining skin and hair color",
    optC: "Growing nails",
    optD: "Digesting food",
    correctAnswer: "B"
  },
  {
    qText: "A skin type that is shiny, has large pores, and is prone to acne is:",
    optA: "Dry skin",
    optB: "Oily skin",
    optC: "Normal skin",
    optD: "Sensitive skin",
    correctAnswer: "B"
  },
  {
    qText: "A skin type that feels tight, may flake, and lacks moisture is:",
    optA: "Dry skin",
    optB: "Oily skin",
    optC: "Combination skin",
    optD: "Normal skin",
    correctAnswer: "A"
  },
  {
    qText: "The main purpose of a skin cleanser is to:",
    optA: "Add color to the face",
    optB: "Remove dirt, makeup, and excess oil",
    optC: "Protect the skin from the sun",
    optD: "Close the pores permanently",
    correctAnswer: "B"
  },
  {
    qText: "A skin toner is used immediately after cleansing to:",
    optA: "Add wrinkles to the skin",
    optB: "Remove leftover dirt and restore the skin's natural pH",
    optC: "Moisturize the skin deeply",
    optD: "Act as a sunscreen",
    correctAnswer: "B"
  },
  {
    qText: "Exfoliation is the process of:",
    optA: "Applying heavy makeup",
    optB: "Removing dead skin cells from the surface of the skin",
    optC: "Bleaching the skin",
    optD: "Hydrating the skin",
    correctAnswer: "B"
  },
  {
    qText: "The scientific study of hair and its diseases is called:",
    optA: "Dermatology",
    optB: "Trichology",
    optC: "Cosmetology",
    optD: "Anatomy",
    correctAnswer: "B"
  },
  {
    qText: "The part of the hair located below the surface of the epidermis is the:",
    optA: "Hair shaft",
    optB: "Hair root",
    optC: "Hair cuticle",
    optD: "Medulla",
    correctAnswer: "B"
  },
  {
    qText: "The outermost layer of the hair shaft that consists of overlapping scales is the:",
    optA: "Cortex",
    optB: "Medulla",
    optC: "Cuticle",
    optD: "Follicle",
    correctAnswer: "C"
  },
  {
    qText: "Which layer of the hair contains the melanin pigment that gives hair its color?",
    optA: "Cuticle",
    optB: "Cortex",
    optC: "Medulla",
    optD: "Papilla",
    correctAnswer: "B"
  },
  {
    qText: "The medical term for dandruff is:",
    optA: "Alopecia",
    optB: "Pityriasis",
    optC: "Pediculosis capitis",
    optD: "Tinea",
    correctAnswer: "B"
  },
  {
    qText: "Pediculosis capitis is a scalp condition caused by:",
    optA: "Fungus",
    optB: "Head lice",
    optC: "Bacteria",
    optD: "Excess oil",
    correctAnswer: "B"
  },
  {
    qText: "Alopecia refers to:",
    optA: "Excessive sweating",
    optB: "Abnormal hair loss or baldness",
    optC: "An itchy scalp",
    optD: "Split ends",
    correctAnswer: "B"
  },
  {
    qText: "The main purpose of shampooing the hair is to:",
    optA: "Make the hair curly",
    optB: "Cleanse the hair and scalp of dirt and oil",
    optC: "Color the hair",
    optD: "Straighten the hair permanently",
    correctAnswer: "B"
  },
  {
    qText: "A hair conditioner is primarily used to:",
    optA: "Clean dirt from the hair",
    optB: "Restore moisture, smooth the cuticle, and make hair manageable",
    optC: "Strip color from the hair",
    optD: "Cause dandruff",
    correctAnswer: "B"
  },
  {
    qText: "A patch test (predisposition test) is performed before applying hair color to:",
    optA: "See if the client likes the smell",
    optB: "Determine if the client has an allergic reaction to the chemicals",
    optC: "Test the temperature of the water",
    optD: "Check if the hair is long enough",
    correctAnswer: "B"
  },
  {
    qText: "Which chemical is commonly used to lighten or bleach hair?",
    optA: "Sodium chloride",
    optB: "Hydrogen peroxide",
    optC: "Vinegar",
    optD: "Acetone",
    correctAnswer: "B"
  },
  {
    qText: "The process of permanently rearranging the basic structure of curly hair into a straight form is called:",
    optA: "Chemical hair relaxing",
    optB: "Thermal curling",
    optC: "Blow-drying",
    optD: "Shampooing",
    correctAnswer: "A"
  },
  {
    qText: "A neutralizing shampoo is used after a chemical relaxer to:",
    optA: "Make the hair grow faster",
    optB: "Stop the chemical action and restore the hair's natural pH",
    optC: "Make the hair curly again",
    optD: "Bleach the hair",
    correctAnswer: "B"
  },
  {
    qText: "Manicuring is the cosmetic care and treatment of the:",
    optA: "Feet and toenails",
    optB: "Hands and fingernails",
    optC: "Face",
    optD: "Hair",
    correctAnswer: "B"
  },
  {
    qText: "Pedicuring is the cosmetic care and treatment of the:",
    optA: "Hands and fingernails",
    optB: "Face and neck",
    optC: "Feet and toenails",
    optD: "Scalp",
    correctAnswer: "C"
  },
  {
    qText: "The technical term for the nail is:",
    optA: "Onyx",
    optB: "Cuticle",
    optC: "Keratin",
    optD: "Lunula",
    correctAnswer: "A"
  },
  {
    qText: "The half-moon-shaped, whitish area at the base of the nail is called the:",
    optA: "Free edge",
    optB: "Lunula",
    optC: "Nail bed",
    optD: "Cuticle",
    correctAnswer: "B"
  },
  {
    qText: "Which tool is used to gently push back the cuticles during a manicure?",
    optA: "Nail file",
    optB: "Cuticle pusher (or Orange wood stick)",
    optC: "Nail clipper",
    optD: "Emery board",
    correctAnswer: "B"
  },
  {
    qText: "An emery board is used to:",
    optA: "Cut the cuticles",
    optB: "Shape and smooth the free edge of the nail",
    optC: "Remove nail polish",
    optD: "Paint the nails",
    correctAnswer: "B"
  },
  {
    qText: "Which chemical is commonly used to remove nail polish?",
    optA: "Hydrogen peroxide",
    optB: "Acetone",
    optC: "Sodium hydroxide",
    optD: "Formaldehyde",
    correctAnswer: "B"
  },
  {
    qText: "The main protein that makes up hair, skin, and nails is:",
    optA: "Melanin",
    optB: "Collagen",
    optC: "Keratin",
    optD: "Sebum",
    correctAnswer: "C"
  },
  {
    qText: "Sebum is an oily substance produced by the:",
    optA: "Sweat glands",
    optB: "Sebaceous glands",
    optC: "Hair follicle",
    optD: "Nail bed",
    correctAnswer: "B"
  },
  {
    qText: "Which makeup product is used to even out the skin tone and provide a base for other makeup?",
    optA: "Lipstick",
    optB: "Mascara",
    optC: "Foundation",
    optD: "Eyeliner",
    correctAnswer: "C"
  },
  {
    qText: "Concealer is primarily used to:",
    optA: "Add color to the cheeks",
    optB: "Hide blemishes, dark circles, and imperfections",
    optC: "Make the eyelashes look longer",
    optD: "Moisturize the lips",
    correctAnswer: "B"
  },
  {
    qText: "Mascara is a cosmetic preparation used to:",
    optA: "Color the lips",
    optB: "Darken, thicken, and lengthen the eyelashes",
    optC: "Cover pimples",
    optD: "Shade the eyelids",
    correctAnswer: "B"
  },
  {
    qText: "In makeup application, contouring is used to:",
    optA: "Make the face look shiny",
    optB: "Create shadows to define or alter facial features",
    optC: "Remove dead skin cells",
    optD: "Cleanse the skin",
    correctAnswer: "B"
  },
  {
    qText: "To highlight a facial feature means to:",
    optA: "Make it look darker and recede",
    optB: "Use a light color to bring the feature forward and make it stand out",
    optC: "Cover it with foundation",
    optD: "Draw a line around it",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following face shapes is considered the 'ideal' shape in cosmetology?",
    optA: "Round",
    optB: "Square",
    optC: "Oval",
    optD: "Heart",
    correctAnswer: "C"
  },
  {
    qText: "When shaping eyebrows, the inner corner of the brow should generally align with:",
    optA: "The outer corner of the eye",
    optB: "The inner corner of the eye / side of the nose",
    optC: "The center of the pupil",
    optD: "The tip of the nose",
    correctAnswer: "B"
  },
  {
    qText: "Temporary hair removal method that involves pulling hair out from the root using a sticky paste is called:",
    optA: "Shaving",
    optB: "Waxing",
    optC: "Depilatory cream",
    optD: "Bleaching",
    correctAnswer: "B"
  },
  {
    qText: "Tweezing is the process of:",
    optA: "Shaving hair with a razor",
    optB: "Plucking out hairs one by one using tweezers",
    optC: "Dissolving hair with a chemical cream",
    optD: "Burning the hair off",
    correctAnswer: "B"
  },
  {
    qText: "A cosmetologist should drape a client before a haircut to:",
    optA: "Keep the client warm",
    optB: "Protect the client's clothing from hair clippings and chemicals",
    optC: "Hide the client's clothes",
    optD: "Make the client look professional",
    correctAnswer: "B"
  },
  {
    qText: "A thermal iron (curling iron or flat iron) uses what to alter the shape of the hair?",
    optA: "Chemicals",
    optB: "Heat",
    optC: "Water",
    optD: "Cold air",
    correctAnswer: "B"
  },
  {
    qText: "Before using a heated thermal iron on a client's hair, a stylist should always test the temperature on:",
    optA: "Their own skin",
    optB: "A piece of tissue paper or white cloth",
    optC: "The client's neck",
    optD: "A wet towel",
    correctAnswer: "B"
  },
  {
    qText: "Which primary colors are used to mix and create all other colors in cosmetics and hair dye?",
    optA: "Black, White, Gray",
    optB: "Red, Yellow, Blue",
    optC: "Orange, Green, Violet",
    optD: "Brown, Tan, Beige",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'beauty-and-cosmetology';
  const subjectGroup = 'Vocational';
  const subjectName = 'Beauty and Cosmetology';

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

    for (const q of cosmetologyQuestions) {
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
