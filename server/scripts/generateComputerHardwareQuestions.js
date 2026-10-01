require('dotenv').config();
const pool = require('../src/config/database');

const hardwareQuestions = [
  {
    qText: "Which of the following components is known as the 'brain' of a computer?",
    optA: "RAM",
    optB: "Hard Drive",
    optC: "Central Processing Unit (CPU)",
    optD: "Motherboard",
    correctAnswer: "C"
  },
  {
    qText: "The main circuit board of a computer that connects all other components is the:",
    optA: "Power Supply Unit",
    optB: "Motherboard",
    optC: "Graphics Card",
    optD: "Heat Sink",
    correctAnswer: "B"
  },
  {
    qText: "What does RAM stand for in computer hardware?",
    optA: "Read Access Memory",
    optB: "Random Access Memory",
    optC: "Run Allocation Module",
    optD: "Rapid Action Memory",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following memory types is volatile (loses its data when power is turned off)?",
    optA: "ROM",
    optB: "Hard Disk Drive",
    optC: "Flash Drive",
    optD: "RAM",
    correctAnswer: "D"
  },
  {
    qText: "What does ROM stand for?",
    optA: "Read Only Memory",
    optB: "Random Only Memory",
    optC: "Run On Module",
    optD: "Rapid Operation Memory",
    correctAnswer: "A"
  },
  {
    qText: "Which component is used for long-term storage of data in a computer?",
    optA: "RAM",
    optB: "Hard Disk Drive (HDD)",
    optC: "CPU",
    optD: "Heat Sink",
    correctAnswer: "B"
  },
  {
    qText: "Compared to a traditional HDD, an SSD (Solid State Drive) is generally:",
    optA: "Heavier and slower",
    optB: "Cheaper and larger",
    optC: "Faster and more durable",
    optD: "Slower and more fragile",
    correctAnswer: "C"
  },
  {
    qText: "What is the primary function of a Power Supply Unit (PSU) in a computer?",
    optA: "To cool down the CPU",
    optB: "To process graphical data",
    optC: "To convert AC power from the wall into DC power for the internal components",
    optD: "To store files permanently",
    correctAnswer: "C"
  },
  {
    qText: "A heat sink and fan are placed on top of the CPU primarily to:",
    optA: "Make it run faster",
    optB: "Prevent it from overheating",
    optC: "Hold it in place",
    optD: "Protect it from dust",
    correctAnswer: "B"
  },
  {
    qText: "What does GPU stand for?",
    optA: "Graphics Processing Unit",
    optB: "General Processing Unit",
    optC: "Graphical Power User",
    optD: "Gaming Processing Unit",
    correctAnswer: "A"
  },
  {
    qText: "Which of the following is an input device?",
    optA: "Monitor",
    optB: "Printer",
    optC: "Keyboard",
    optD: "Speaker",
    correctAnswer: "C"
  },
  {
    qText: "Which of the following is an output device?",
    optA: "Mouse",
    optB: "Microphone",
    optC: "Scanner",
    optD: "Monitor",
    correctAnswer: "D"
  },
  {
    qText: "What does USB stand for?",
    optA: "Universal Serial Bus",
    optB: "United States Broadcaster",
    optC: "Universal System Board",
    optD: "Unified Serial Bandwidth",
    correctAnswer: "A"
  },
  {
    qText: "A computer that emits a series of continuous 'beeps' when turned on most likely has a problem with:",
    optA: "The monitor",
    optB: "The mouse",
    optC: "RAM or Motherboard",
    optD: "The operating system",
    correctAnswer: "C"
  },
  {
    qText: "The BIOS (Basic Input/Output System) is stored on which type of memory chip?",
    optA: "RAM",
    optB: "ROM",
    optC: "Cache",
    optD: "Virtual Memory",
    correctAnswer: "B"
  },
  {
    qText: "What does CMOS stand for in relation to motherboards?",
    optA: "Computer Main Operating System",
    optB: "Complementary Metal-Oxide-Semiconductor",
    optC: "Central Memory Output System",
    optD: "Control Mechanism Over Silicon",
    correctAnswer: "B"
  },
  {
    qText: "The CMOS battery on a motherboard is primarily used to:",
    optA: "Power the CPU",
    optB: "Keep the system time and BIOS settings intact when the PC is unplugged",
    optC: "Run the cooling fans",
    optD: "Charge mobile phones",
    correctAnswer: "B"
  },
  {
    qText: "Electrostatic Discharge (ESD) is dangerous because it can:",
    optA: "Cause a fire in the room",
    optB: "Shock the user fatally",
    optC: "Damage sensitive electronic components like the CPU or RAM",
    optD: "Delete files from the hard drive permanently",
    correctAnswer: "C"
  },
  {
    qText: "To prevent ESD damage while working on a computer, a technician should use:",
    optA: "Rubber gloves",
    optB: "An anti-static wrist strap",
    optC: "A magnetic screwdriver",
    optD: "Cotton clothing",
    correctAnswer: "B"
  },
  {
    qText: "If a computer turns on but the screen remains completely blank (no signal), a common first step is to:",
    optA: "Replace the hard drive",
    optB: "Check if the RAM is seated properly",
    optC: "Reinstall Windows",
    optD: "Buy a new processor",
    correctAnswer: "B"
  },
  {
    qText: "What does GSM stand for in mobile telecommunications?",
    optA: "Global System for Mobile Communications",
    optB: "General System for Mobile",
    optC: "Global Signal Module",
    optD: "Geographic System Management",
    correctAnswer: "A"
  },
  {
    qText: "What is the primary function of a SIM card in a GSM phone?",
    optA: "To store the operating system",
    optB: "To identify and authenticate the subscriber on the mobile network",
    optC: "To provide battery power",
    optD: "To capture photographs",
    correctAnswer: "B"
  },
  {
    qText: "SIM stands for:",
    optA: "Subscriber Identity Module",
    optB: "System Internal Memory",
    optC: "Secure Information Module",
    optD: "Standard Interface Model",
    correctAnswer: "A"
  },
  {
    qText: "What does IMEI stand for?",
    optA: "Internal Mobile Equipment Interface",
    optB: "International Mobile Equipment Identity",
    optC: "Integrated Memory for Electronic Information",
    optD: "International Machine Electronic Identifier",
    correctAnswer: "B"
  },
  {
    qText: "To check the IMEI number of most GSM phones, which code do you dial?",
    optA: "*#123#",
    optB: "*#06#",
    optC: "*123#",
    optD: "#0000#",
    correctAnswer: "B"
  },
  {
    qText: "In a mobile phone, what component is responsible for converting sound waves into electrical signals?",
    optA: "The speaker",
    optB: "The microphone (Mic)",
    optC: "The vibrator",
    optD: "The antenna",
    correctAnswer: "B"
  },
  {
    qText: "Which component in a mobile phone converts electrical signals back into audible sound?",
    optA: "Microphone",
    optB: "Earpiece/Speaker",
    optC: "Camera",
    optD: "Battery",
    correctAnswer: "B"
  },
  {
    qText: "If a mobile phone cannot pick up network signals, which component is most likely faulty?",
    optA: "The touchscreen",
    optB: "The antenna or network IC",
    optC: "The charging port",
    optD: "The memory card",
    correctAnswer: "B"
  },
  {
    qText: "What tool is primarily used to measure voltage, current, and resistance in electronic repair?",
    optA: "Soldering iron",
    optB: "Multimeter",
    optC: "Oscilloscope",
    optD: "Tweezer",
    correctAnswer: "B"
  },
  {
    qText: "To test if a mobile phone battery has enough charge to power on a phone, a multimeter should be set to:",
    optA: "AC Voltage",
    optB: "DC Voltage",
    optC: "Resistance (Ohms)",
    optD: "Continuity",
    correctAnswer: "B"
  },
  {
    qText: "The standard voltage of a fully charged lithium-ion mobile phone battery is approximately:",
    optA: "1.5V",
    optB: "3.7V to 4.2V",
    optC: "9V",
    optD: "12V",
    correctAnswer: "B"
  },
  {
    qText: "Continuity testing on a multimeter is used to:",
    optA: "Measure the speed of the processor",
    optB: "Check if there is an unbroken electrical path between two points",
    optC: "Charge the battery",
    optD: "Measure the temperature of the soldering iron",
    correctAnswer: "B"
  },
  {
    qText: "A soldering iron is used to:",
    optA: "Melt solder to join electronic components together",
    optB: "Cut wires",
    optC: "Measure voltage",
    optD: "Clean the motherboard",
    correctAnswer: "A"
  },
  {
    qText: "What is the function of soldering flux in electronics repair?",
    optA: "To cool down the soldering iron",
    optB: "To clean the metal surfaces and prevent oxidation during soldering",
    optC: "To measure resistance",
    optD: "To glue plastic parts together",
    correctAnswer: "B"
  },
  {
    qText: "To remove an integrated circuit (IC) or SMD component from a phone motherboard, a technician usually uses a:",
    optA: "Hammer",
    optB: "Hot air rework station",
    optC: "Cold chisel",
    optD: "Standard 30W soldering iron",
    correctAnswer: "B"
  },
  {
    qText: "If a mobile phone falls into water, the immediate first step should be to:",
    optA: "Turn it on to see if it works",
    optB: "Plug it into a charger",
    optC: "Remove the battery (if possible) and do not attempt to turn it on",
    optD: "Put it in the freezer",
    correctAnswer: "C"
  },
  {
    qText: "Which liquid is commonly used by technicians to clean corroded or water-damaged motherboards?",
    optA: "Water",
    optB: "Isopropyl alcohol (IPA) or Thinner",
    optC: "Bleach",
    optD: "Engine oil",
    correctAnswer: "B"
  },
  {
    qText: "Flashing a mobile phone refers to:",
    optA: "Using the camera flash",
    optB: "Reinstalling or upgrading the phone's operating system/firmware",
    optC: "Cleaning the screen",
    optD: "Replacing the battery",
    correctAnswer: "B"
  },
  {
    qText: "If a phone displays 'Insert SIM' even when a working SIM is inside, the problem is most likely:",
    optA: "A damaged SIM tray/reader or dirty SIM contacts",
    optB: "A broken screen",
    optC: "A dead battery",
    optD: "A faulty microphone",
    correctAnswer: "A"
  },
  {
    qText: "The term 'Bricked' phone means:",
    optA: "The phone is heavy like a brick",
    optB: "The phone's software is so corrupted it will not boot up or function",
    optC: "The phone is waterproof",
    optD: "The phone has a new casing",
    correctAnswer: "B"
  },
  {
    qText: "Which of the following is a symptom of a faulty charging port (USB port)?",
    optA: "The phone makes calls but there is no sound",
    optB: "The phone screen is cracked",
    optC: "The phone only charges when the cable is held at a certain angle",
    optD: "The camera takes blurry pictures",
    correctAnswer: "C"
  },
  {
    qText: "What does LCD stand for in mobile displays?",
    optA: "Liquid Crystal Display",
    optB: "Light Control Diode",
    optC: "Luminescent Color Device",
    optD: "Line Current Detector",
    correctAnswer: "A"
  },
  {
    qText: "If a mobile phone turns on, rings, and vibrates, but the screen remains completely black, the likely issue is:",
    optA: "A faulty battery",
    optB: "A damaged LCD or display flex cable",
    optC: "A broken charging port",
    optD: "A software virus",
    correctAnswer: "B"
  },
  {
    qText: "BGA stands for:",
    optA: "Basic Graphics Array",
    optB: "Ball Grid Array (a type of surface-mount packaging for ICs)",
    optC: "Binary Gateway Access",
    optD: "Broadband Global Area",
    correctAnswer: "B"
  },
  {
    qText: "To replace a BGA chip on a motherboard, a technician needs to use:",
    optA: "Superglue",
    optB: "A hot air rework station and BGA reballing stencil",
    optC: "A pair of scissors",
    optD: "A standard flathead screwdriver",
    correctAnswer: "B"
  },
  {
    qText: "A short circuit in a mobile phone usually causes the phone to:",
    optA: "Run much faster",
    optB: "Overheat rapidly and drain the battery or fail to turn on",
    optC: "Change its ringtone automatically",
    optD: "Increase network signal",
    correctAnswer: "B"
  },
  {
    qText: "Jumper wire is used in phone repairs to:",
    optA: "Tie cables together",
    optB: "Bypass a broken circuit trace on the motherboard",
    optC: "Serve as a new antenna",
    optD: "Hold the battery in place",
    correctAnswer: "B"
  },
  {
    qText: "Which component prevents electrical current from flowing in the wrong direction?",
    optA: "Resistor",
    optB: "Capacitor",
    optC: "Diode",
    optD: "Inductor",
    correctAnswer: "C"
  },
  {
    qText: "A capacitor is an electronic component that:",
    optA: "Restricts the flow of current",
    optB: "Stores and releases electrical charge",
    optC: "Magnifies sound",
    optD: "Acts as a switch",
    correctAnswer: "B"
  },
  {
    qText: "When reassembling a laptop or phone, it is critical to keep track of screws because:",
    optA: "Using a screw that is too long can puncture the motherboard or screen",
    optB: "The device will explode if one is missing",
    optC: "They are made of gold and are very expensive",
    optD: "They are magnetic and will erase the hard drive",
    correctAnswer: "A"
  }
];

async function main() {
  const subjectSlug = 'computer-hardware-and-gsm-repair';
  const subjectGroup = 'Vocational';
  const subjectName = 'Computer Hardware and GSM Repair';

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

    for (const q of hardwareQuestions) {
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
