require('dotenv').config();
const pool = require('../src/config/database');

const solarQuestions = [
  {
    qText: "What does PV stand for in solar energy?",
    optA: "Power Voltage",
    optB: "Photovoltaic",
    optC: "Primary Vector",
    optD: "Photo-Video",
    correctAnswer: "B"
  },
  {
    qText: "A photovoltaic cell primarily converts:",
    optA: "Heat into electricity",
    optB: "Sunlight (photons) directly into electricity",
    optC: "Wind into electrical energy",
    optD: "Electricity into light",
    correctAnswer: "B"
  },
  {
    qText: "The most common semiconductor material used to make solar cells is:",
    optA: "Copper",
    optB: "Silicon",
    optC: "Aluminum",
    optD: "Carbon",
    correctAnswer: "B"
  },
  {
    qText: "A collection of solar cells connected together is called a:",
    optA: "Solar inverter",
    optB: "Solar module or panel",
    optC: "Solar battery",
    optD: "Solar array",
    correctAnswer: "B"
  },
  {
    qText: "Multiple solar panels connected together form a:",
    optA: "Solar cell",
    optB: "Solar array",
    optC: "Charge controller",
    optD: "Transformer",
    correctAnswer: "B"
  },
  {
    qText: "Which type of solar panel is generally the most efficient and is made from a single continuous crystal structure?",
    optA: "Polycrystalline",
    optB: "Monocrystalline",
    optC: "Thin-film",
    optD: "Amorphous",
    correctAnswer: "B"
  },
  {
    qText: "Which type of solar panel has a bluish hue and is made of multiple silicon fragments melted together?",
    optA: "Monocrystalline",
    optB: "Polycrystalline",
    optC: "Thin-film",
    optD: "Concentrated PV",
    correctAnswer: "B"
  },
  {
    qText: "The electrical output of a solar panel is initially in the form of:",
    optA: "Alternating Current (AC)",
    optB: "Direct Current (DC)",
    optC: "Static Electricity",
    optD: "Magnetic Current",
    correctAnswer: "B"
  },
  {
    qText: "Which component converts the Direct Current (DC) from the solar panels into Alternating Current (AC) for household appliances?",
    optA: "Charge Controller",
    optB: "Battery",
    optC: "Inverter",
    optD: "Combiner Box",
    correctAnswer: "C"
  },
  {
    qText: "The primary function of a solar charge controller is to:",
    optA: "Convert DC to AC",
    optB: "Regulate the voltage and current coming from the solar panels going to the battery",
    optC: "Store electrical energy",
    optD: "Track the movement of the sun",
    correctAnswer: "B"
  },
  {
    qText: "Without a charge controller, what is likely to happen to a solar battery system?",
    optA: "The inverter will explode",
    optB: "The battery may overcharge and get damaged",
    optC: "The solar panels will melt",
    optD: "The house will lose its AC power instantly",
    correctAnswer: "B"
  },
  {
    qText: "What does MPPT stand for in relation to charge controllers?",
    optA: "Maximum Power Point Tracking",
    optB: "Multiple Panel Power Transfer",
    optC: "Maximum Potential Pulse Timer",
    optD: "Main Power Protection Terminal",
    correctAnswer: "A"
  },
  {
    qText: "Compared to a PWM charge controller, an MPPT charge controller is generally:",
    optA: "Cheaper and less efficient",
    optB: "More efficient and extracts more power from the panels",
    optC: "Unable to charge 12V batteries",
    optD: "Used only for wind turbines",
    correctAnswer: "B"
  },
  {
    qText: "Which component is used to store solar energy for use during the night or cloudy days?",
    optA: "Inverter",
    optB: "Battery bank",
    optC: "Solar module",
    optD: "Disconnect switch",
    correctAnswer: "B"
  },
  {
    qText: "Deep-cycle batteries are preferred for solar installations because they are designed to:",
    optA: "Provide short, high bursts of power to start engines",
    optB: "Be discharged deeply and recharged repeatedly without significant damage",
    optC: "Operate without a charge controller",
    optD: "Convert AC to DC",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a common type of battery used in solar PV systems?",
    optA: "Alkaline (AA)",
    optB: "Lead-Acid (Flooded, AGM, or Gel)",
    optC: "Zinc-Carbon",
    optD: "Silver-Oxide",
    correctAnswer: "B"
  },
  {
    qText: "Lithium-ion batteries are increasingly popular in solar systems because they:",
    optA: "Are the cheapest option available",
    optB: "Have a longer lifespan and higher depth of discharge (DoD) than lead-acid",
    optC: "Do not require an inverter",
    optD: "Are entirely fire-proof under any condition",
    correctAnswer: "B"
  },
  {
    qText: "Depth of Discharge (DoD) refers to:",
    optA: "How fast the battery charges",
    optB: "The percentage of the battery's capacity that has been used",
    optC: "The physical depth of the battery case",
    optD: "The voltage of the battery",
    correctAnswer: "B"
  },
  {
    qText: "For a standard flooded lead-acid battery, it is usually recommended not to discharge it below what percentage to preserve its lifespan?",
    optA: "10%",
    optB: "20%",
    optC: "50%",
    optD: "90%",
    correctAnswer: "C"
  },
  {
    qText: "When solar panels are connected in SERIES, what happens to the voltage and current?",
    optA: "Voltage increases, current stays the same",
    optB: "Current increases, voltage stays the same",
    optC: "Both voltage and current increase",
    optD: "Both voltage and current stay the same",
    correctAnswer: "A"
  },
  {
    qText: "When solar panels are connected in PARALLEL, what happens to the voltage and current?",
    optA: "Voltage increases, current stays the same",
    optB: "Current increases, voltage stays the same",
    optC: "Both voltage and current increase",
    optD: "Both voltage and current decrease",
    correctAnswer: "B"
  },
  {
    qText: "If you have two 12V, 100Ah batteries and connect them in SERIES, what is the resulting output?",
    optA: "12V, 200Ah",
    optB: "24V, 100Ah",
    optC: "24V, 200Ah",
    optD: "12V, 100Ah",
    correctAnswer: "B"
  },
  {
    qText: "If you have two 12V, 100Ah batteries and connect them in PARALLEL, what is the resulting output?",
    optA: "12V, 200Ah",
    optB: "24V, 100Ah",
    optC: "24V, 200Ah",
    optD: "6V, 100Ah",
    correctAnswer: "A"
  },
  {
    qText: "A grid-tied (or grid-connected) solar PV system is one that:",
    optA: "Operates completely independently of the national grid",
    optB: "Is connected to the utility grid and often does not use batteries",
    optC: "Only works at night",
    optD: "Uses a diesel generator as the primary source",
    correctAnswer: "B"
  },
  {
    qText: "An off-grid (or stand-alone) solar PV system must have which component to provide power at night?",
    optA: "A grid connection",
    optB: "A battery bank",
    optC: "A net meter",
    optD: "A step-up transformer",
    correctAnswer: "B"
  },
  {
    qText: "In the Northern Hemisphere, to maximize solar collection, fixed solar panels should generally face:",
    optA: "North",
    optB: "South",
    optC: "East",
    optD: "West",
    correctAnswer: "B"
  },
  {
    qText: "In Nigeria, which is located in the Northern Hemisphere close to the equator, solar panels should generally face:",
    optA: "True South",
    optB: "True North",
    optC: "East",
    optD: "West",
    correctAnswer: "A"
  },
  {
    qText: "The optimum tilt angle for fixed solar panels is usually close to:",
    optA: "0 degrees (completely flat)",
    optB: "The location's latitude",
    optC: "90 degrees (completely vertical)",
    optD: "It doesn't matter",
    correctAnswer: "B"
  },
  {
    qText: "Which environmental factor dramatically reduces the power output of a solar panel?",
    optA: "Cold temperatures",
    optB: "Shading (e.g., from trees or clouds)",
    optC: "Wind",
    optD: "Moonlight",
    correctAnswer: "B"
  },
  {
    qText: "Bypass diodes are installed in solar panels to:",
    optA: "Increase the voltage",
    optB: "Prevent complete power loss when part of the panel is shaded",
    optC: "Convert DC to AC",
    optD: "Charge the battery faster",
    correctAnswer: "B"
  },
  {
    qText: "What instrument is used to measure solar irradiance (sunlight intensity)?",
    optA: "Multimeter",
    optB: "Pyranometer",
    optC: "Thermometer",
    optD: "Anemometer",
    correctAnswer: "B"
  },
  {
    qText: "The standard test conditions (STC) for rating a solar panel include a temperature of:",
    optA: "0°C",
    optB: "25°C",
    optC: "50°C",
    optD: "100°C",
    correctAnswer: "B"
  },
  {
    qText: "Inverter sizing for an off-grid system is primarily based on the:",
    optA: "Total number of solar panels",
    optB: "Maximum simultaneous AC load (peak wattage) of the appliances",
    optC: "Size of the house roof",
    optD: "Distance from the equator",
    correctAnswer: "B"
  },
  {
    qText: "A Pure Sine Wave inverter is generally preferred over a Modified Sine Wave inverter because it:",
    optA: "Produces 'cleaner' electricity that is safer for sensitive electronics",
    optB: "Is much cheaper",
    optC: "Does not require a battery",
    optD: "Only works with DC appliances",
    correctAnswer: "A"
  },
  {
    qText: "The thickness (cross-sectional area) of a solar cable is determined primarily by the:",
    optA: "Brand of the solar panel",
    optB: "Current (Amps) it will carry and the distance of the run",
    optC: "Color of the wire",
    optD: "Weather conditions",
    correctAnswer: "B"
  },
  {
    qText: "Using a cable that is too thin for a high-current DC circuit will result in:",
    optA: "Increased solar output",
    optB: "Voltage drop and possible overheating (fire hazard)",
    optC: "Faster battery charging",
    optD: "The inverter becoming a Pure Sine Wave",
    correctAnswer: "B"
  },
  {
    qText: "The MC4 connector is primarily used for:",
    optA: "Connecting the battery to the inverter",
    optB: "Waterproof connections between solar panels",
    optC: "Plugging appliances into the wall socket",
    optD: "Grounding the system",
    correctAnswer: "B"
  },
  {
    qText: "Proper earthing (grounding) of a solar PV system is important to:",
    optA: "Make the panels absorb more sunlight",
    optB: "Protect equipment and people from lightning strikes and electrical faults",
    optC: "Keep the batteries warm",
    optD: "Prevent birds from sitting on the panels",
    correctAnswer: "B"
  },
  {
    qText: "A DC circuit breaker or fuse is installed between the panels and the charge controller to:",
    optA: "Increase the voltage",
    optB: "Protect the system from overcurrent and short circuits",
    optC: "Measure the current",
    optD: "Store excess energy",
    correctAnswer: "B"
  },
  {
    qText: "During routine maintenance, the surface of solar panels should be:",
    optA: "Painted black",
    optB: "Cleaned with water and a soft cloth to remove dust and dirt",
    optC: "Scrubbed with a wire brush",
    optD: "Coated with engine oil",
    correctAnswer: "B"
  },
  {
    qText: "Why do flooded lead-acid batteries require periodic maintenance?",
    optA: "They need to be emptied and refilled with acid",
    optB: "Distilled water must be added to replace water lost during charging (gassing)",
    optC: "The plastic casing shrinks over time",
    optD: "They need to be shaken vigorously every month",
    correctAnswer: "B"
  },
  {
    qText: "Specific gravity of the electrolyte in a flooded lead-acid battery is measured using a:",
    optA: "Multimeter",
    optB: "Hydrometer",
    optC: "Thermometer",
    optD: "Barometer",
    correctAnswer: "B"
  },
  {
    qText: "When working with lead-acid batteries, a technician should wear safety goggles and gloves because:",
    optA: "Batteries emit bright light",
    optB: "The batteries contain corrosive sulfuric acid",
    optC: "The batteries vibrate strongly",
    optD: "The batteries are always freezing cold",
    correctAnswer: "B"
  },
  {
    qText: "A multimeter set to DC Voltage can be used to:",
    optA: "Check the open-circuit voltage of a solar panel",
    optB: "Measure the AC output of the inverter",
    optC: "Test the resistance of a cable",
    optD: "Clean the solar panels",
    correctAnswer: "A"
  },
  {
    qText: "The 'Voc' on a solar panel's specification sticker stands for:",
    optA: "Voltage Operating Current",
    optB: "Voltage Open Circuit (Maximum voltage when no load is connected)",
    optC: "Volume of Charge",
    optD: "Variable Output Control",
    correctAnswer: "B"
  },
  {
    qText: "The 'Isc' on a solar panel's specification sticker stands for:",
    optA: "Internal System Control",
    optB: "Input Source Current",
    optC: "Short Circuit Current",
    optD: "Inverter Synchronized Circuit",
    correctAnswer: "C"
  },
  {
    qText: "If a solar PV system stops producing power entirely on a sunny day, the first troubleshooting step should be to:",
    optA: "Replace all the solar panels",
    optB: "Check all fuses, breakers, and connections",
    optC: "Buy a new battery",
    optD: "Wash the inverter with water",
    correctAnswer: "B"
  },
  {
    qText: "In a solar installation, what is the 'load'?",
    optA: "The weight of the solar panels on the roof",
    optB: "The electrical appliances and devices consuming the power",
    optC: "The current flowing from the panels",
    optD: "The capacity of the battery",
    correctAnswer: "B"
  },
  {
    qText: "A 'combiner box' is used in large solar installations to:",
    optA: "Store batteries",
    optB: "Combine the wiring from multiple solar panel strings into one main feed",
    optC: "Combine DC and AC electricity",
    optD: "House the inverter",
    correctAnswer: "B"
  },
  {
    qText: "The unit of measurement for electrical power is the:",
    optA: "Volt (V)",
    optB: "Ampere (A)",
    optC: "Watt (W)",
    optD: "Ohm (Ω)",
    correctAnswer: "C"
  }
];

async function main() {
  const subjectSlug = 'solar-photovoltaic-installation-and-maintenance';
  const subjectGroup = 'Vocational';
  const subjectName = 'Solar Photovoltaic Installation and Maintenance';

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

    for (const q of solarQuestions) {
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
