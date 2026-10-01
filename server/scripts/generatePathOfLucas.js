require('dotenv').config();
const pool = require('../src/config/database');

const pathOfLucasQuestions = [
  {
    qText: "In Path of Lucas: The Journey He Endured, who is the author of the novel?",
    optA: "Harper Lee",
    optB: "Susanne Bellefeuille",
    optC: "Margaret Atwood",
    optD: "Alice Munro",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the author wrote the book as a tribute to whom?",
    optA: "Her brother",
    optB: "Her father, Roger Bellefeuille",
    optC: "Her grandfather",
    optD: "A famous Canadian politician",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, who is the main protagonist of the story?",
    optA: "Lucy Clarkson",
    optB: "Lucas Clarkson",
    optC: "Isabelle Clarkson",
    optD: "Roger Bellefeuille",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what is the primary setting of Lucas's early life?",
    optA: "A busy metropolis in the US",
    optB: "A small rural farming town in Eastern Ontario, Canada",
    optC: "A fishing village in Nova Scotia",
    optD: "A mining town in Alberta",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, who is the audience for Lucas’s stories as he recounts his life?",
    optA: "His wife, Isabelle",
    optB: "His daughter, Lucy, who is lying in a coma",
    optC: "A journalist writing his biography",
    optD: "His young grandson",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what tragic event prompts Lucas to recount his life story?",
    optA: "He is diagnosed with a terminal illness.",
    optB: "His daughter Lucy is in a severe car accident and is in a coma.",
    optC: "His wife passes away.",
    optD: "He loses his family farm.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, who is Lucas's wife?",
    optA: "Mary",
    optB: "Sarah",
    optC: "Isabelle",
    optD: "Lucy",
    correctAnswer: "C"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what major health struggle does Isabelle face throughout her life?",
    optA: "Terminal cancer",
    optB: "Psychotic depression and mental illness",
    optC: "Physical paralysis",
    optD: "Early-onset Alzheimer's",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the novel is categorized primarily as:",
    optA: "A science fiction thriller",
    optB: "A biographical/autobiographical novel based on true family events",
    optC: "A historical romance set in medieval times",
    optD: "A political satire",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what serves as the primary framing device for the narrative?",
    optA: "A series of letters found in an attic",
    optB: "Lucas speaking to his comatose daughter in a hospital room",
    optC: "A diary kept by Isabelle",
    optD: "A trial transcript",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what central theme is highlighted by Lucas's dedication to Isabelle despite her struggles?",
    optA: "The desire for wealth and power",
    optB: "The endurance of love, marital vows, and family sacrifice",
    optC: "The rejection of modern medicine",
    optD: "The failure of the Canadian healthcare system",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, how does the novel portray rural midcentury Canadian life?",
    optA: "As completely idyllic and free of hardship",
    optB: "As demanding, requiring hard physical labor, resilience, and strong family bonds",
    optC: "As highly industrialized and modern",
    optD: "As deeply political and revolutionary",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, which generational cycle is a recurring theme in the lives of Lucas's children?",
    optA: "They all become famous politicians",
    optB: "They face hardships similar to their parents, such as teenage pregnancy and health crises",
    optC: "They all abandon the farm to live in the city",
    optD: "They never experience any adversity",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the act of Lucas speaking to his unconscious daughter signifies:",
    optA: "His denial of her condition",
    optB: "His belief in the healing power of family history, connection, and hope",
    optC: "His guilt for causing the accident",
    optD: "His descent into madness",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what social issue does Isabelle's character deeply explore?",
    optA: "The stigma and intense challenges surrounding severe mental illness in the mid-20th century",
    optB: "The lack of voting rights for women",
    optC: "Racial discrimination in farming communities",
    optD: "The impact of immigration laws",
    correctAnswer: "A"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what characterizes Lucas's personality?",
    optA: "He is selfish and ambitious.",
    optB: "He is hardworking, steadfast, and deeply devoted to his family.",
    optC: "He is cowardly and avoids conflict.",
    optD: "He is highly educated and theoretical.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what effect does the author’s background in social work likely have on the novel?",
    optA: "It makes the novel sound like a textbook.",
    optB: "It brings deep empathy and realistic psychological depth to the depiction of mental illness and family crises.",
    optC: "It focuses the plot entirely on government policy.",
    optD: "It ignores the emotional aspects of the characters.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, how does Isabelle's illness impact the family dynamics?",
    optA: "It tears the family apart permanently.",
    optB: "It places a heavy emotional and practical burden on Lucas, testing but ultimately reinforcing his commitment.",
    optC: "It forces Lucas to send his children to an orphanage.",
    optD: "It has no noticeable effect on their daily lives.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the title 'Path of Lucas' metaphorically refers to:",
    optA: "A physical trail on his farm.",
    optB: "The long, arduous, but loving life journey he has navigated.",
    optC: "A religious pilgrimage he takes.",
    optD: "The road where his daughter had her accident.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what does the hospital room setting provide for the narrative?",
    optA: "A place for medical drama and surgery.",
    optB: "A quiet, emotional anchor point from which the flashbacks originate.",
    optC: "A setting for a murder mystery.",
    optD: "A place where Lucas meets a new romantic interest.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the novel serves as a testament to the strength of:",
    optA: "The human spirit and family resilience.",
    optB: "Modern technology.",
    optC: "Political institutions.",
    optD: "Financial wealth.",
    correctAnswer: "A"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, which literary technique is heavily utilized to tell Lucas's life story?",
    optA: "Foreshadowing",
    optB: "Flashbacks (Retrospection)",
    optC: "Stream of consciousness",
    optD: "Epistolary format (letters)",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what is the mood of the scenes set in the hospital?",
    optA: "Joyful and energetic",
    optB: "Somber, reflective, and filled with a desperate hope",
    optC: "Angry and violent",
    optD: "Comedic and lighthearted",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, Isabelle's psychotic depression represents what kind of conflict?",
    optA: "Man vs. Nature",
    optB: "Man vs. Society",
    optC: "Man vs. Self (Internal conflict)",
    optD: "Man vs. Technology",
    correctAnswer: "C"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, Lucas's struggle to keep his family together despite Isabelle's illness is an example of:",
    optA: "Man vs. Self",
    optB: "Man vs. Destiny/Circumstance",
    optC: "Man vs. Nature",
    optD: "Man vs. Man",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, how does the rural setting influence the characters' lives?",
    optA: "It provides them with immense wealth.",
    optB: "It dictates a life of hard physical labor and often isolates them from immediate medical or psychological help.",
    optC: "It makes them famous.",
    optD: "It forces them to commute to the city daily.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what is a key message regarding parenting in the novel?",
    optA: "Parents should abandon their children if they make mistakes.",
    optB: "Parenting requires enduring love, even when children repeat the mistakes of the past.",
    optC: "Parenting is entirely a mother's responsibility.",
    optD: "Wealth is the only requirement for good parenting.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the recounting of the family's history to Lucy is an attempt to:",
    optA: "Make her feel guilty for the accident.",
    optB: "Anchor her to the world of the living through the power of love and memory.",
    optC: "Pass time because Lucas is bored.",
    optD: "Practice for a speech.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what makes the narrative feel authentic and grounded?",
    optA: "Its use of magical realism.",
    optB: "Its basis in the true, lived experiences of the author's own family.",
    optC: "Its focus on historical celebrity figures.",
    optD: "Its highly exaggerated, satirical tone.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, which emotion primarily drives Lucas to stay by Isabelle's side?",
    optA: "Fear of public judgment",
    optB: "Unconditional love and loyalty",
    optC: "A desire for her money",
    optD: "Spite towards his in-laws",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the novel highlights that mental illness affects:",
    optA: "Only the individual diagnosed with it.",
    optB: "The entire family unit, shaping the lives of spouses and children.",
    optC: "Only people living in urban areas.",
    optD: "Only the wealthy.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what aspect of Lucas's character makes him a relatable hero?",
    optA: "His supernatural abilities.",
    optB: "His ordinary, everyday flaws combined with extraordinary perseverance.",
    optC: "His immense financial power.",
    optD: "His lack of any emotional response.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what role does memory play in the novel?",
    optA: "It is depicted as entirely unreliable and false.",
    optB: "It is a vital force that connects the past to the present and offers healing.",
    optC: "It is something the characters try to destroy.",
    optD: "It is only used to hold grudges.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, how does the author handle the topic of teenage pregnancy within the family?",
    optA: "With harsh judgment and condemnation.",
    optB: "With empathy, showing it as a part of the difficult generational cycles the family faces.",
    optC: "By ignoring it completely.",
    optD: "By treating it as a joke.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the structure of the novel (hospital present vs. past memories) creates a sense of:",
    optA: "Confusion and chaos.",
    optB: "Poignancy and urgent reflection.",
    optC: "Fast-paced action.",
    optD: "Comedic timing.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what does the farm symbolize for Lucas?",
    optA: "A prison he wants to escape.",
    optB: "His roots, hard work, and the foundation of his family life.",
    optC: "A failed business venture.",
    optD: "A place of endless leisure.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, Isabelle's moments of clarity contrast sharply with:",
    optA: "Her physical strength.",
    optB: "The dark periods of her psychotic depression, highlighting her internal battle.",
    optC: "Lucas's anger.",
    optD: "The modern hospital setting.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the story implies that true heroism often lies in:",
    optA: "Winning wars and battles.",
    optB: "Quiet, daily sacrifices made out of love for one's family.",
    optC: "Gaining public recognition and fame.",
    optD: "Escaping difficult situations.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what is the significance of the Canadian setting?",
    optA: "It highlights a tropical environment.",
    optB: "It grounds the story in the specific cultural and geographical realities of midcentury rural Ontario.",
    optC: "It is irrelevant to the plot.",
    optD: "It focuses entirely on French-Canadian politics.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, how does Lucas process his grief and fear over Lucy's coma?",
    optA: "By drinking heavily.",
    optB: "By sharing the story of his life, finding strength in the family's history of survival.",
    optC: "By leaving the hospital and abandoning her.",
    optD: "By fighting with the doctors.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the narrative suggests that love is not just a feeling, but:",
    optA: "An illusion.",
    optB: "A continuous choice and an act of endurance.",
    optC: "A legal contract only.",
    optD: "A source of weakness.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what obstacle do Lucas's children face that mirrors his own struggles?",
    optA: "They are forced to fight in a war.",
    optB: "They face serious personal health and life crises that test their resilience.",
    optC: "They lose their family farm to the bank.",
    optD: "They move to a different country.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what tone does the author establish through Lucas's storytelling?",
    optA: "Cynical and bitter.",
    optB: "Earnest, tender, and deeply reflective.",
    optC: "Sarcastic and humorous.",
    optD: "Cold and detached.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the author's tribute to her father is evident in the portrayal of Lucas as:",
    optA: "A deeply flawed anti-hero.",
    optB: "A pillar of strength, morality, and unwavering love.",
    optC: "A background character with little dialogue.",
    optD: "A strict, unloving disciplinarian.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, how does the story address the unpredictability of life?",
    optA: "By showing that good people never suffer.",
    optB: "By illustrating that sudden tragedies (like Lucy's accident or Isabelle's illness) can strike at any time.",
    optC: "By proving that everything can be controlled with enough money.",
    optD: "By focusing on a predictable, boring routine.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what is the ultimate purpose of Lucas's monologue to Lucy?",
    optA: "To confess a crime.",
    optB: "To guide her spirit back to consciousness through the pull of family love.",
    optC: "To pass the time while he waits for the doctor.",
    optD: "To complain about his difficult life.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, how does the book handle the theme of sacrifice?",
    optA: "It argues that sacrifice is a waste of time.",
    optB: "It shows that sacrifice is a necessary and profound expression of familial love.",
    optC: "It portrays sacrifice as something only women do.",
    optD: "It claims sacrifice always leads to bitterness.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, the contrast between the stillness of the hospital room and the turbulence of Lucas's memories creates:",
    optA: "A boring narrative.",
    optB: "A powerful dramatic tension.",
    optC: "A confusing timeline.",
    optD: "A comedic effect.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, what does the survival of the Clarkson family ultimately depend on?",
    optA: "Government assistance.",
    optB: "Their deep-rooted love and commitment to one another.",
    optC: "Isabelle's miraculous complete cure.",
    optD: "Finding a hidden treasure on the farm.",
    correctAnswer: "B"
  },
  {
    qText: "In Path of Lucas: The Journey He Endured, Susanne Bellefeuille’s debut novel is best summarized as:",
    optA: "A thrilling murder mystery.",
    optB: "A heartfelt ode to a father's love and a family's resilience through adversity.",
    optC: "A historical account of Canadian politics.",
    optD: "A fantasy novel about magical farming.",
    correctAnswer: "B"
  }
];

async function main() {
  const subjectSlug = 'literature-in-english';
  const subjectGroup = 'Arts';
  const subjectName = 'Literature-in-English';

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

    for (const q of pathOfLucasQuestions) {
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
    console.log(`Inserted ${inserted} generated question rows for Path of Lucas across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
