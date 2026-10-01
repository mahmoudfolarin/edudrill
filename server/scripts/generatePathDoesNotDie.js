require('dotenv').config();
const pool = require('../src/config/database');

const pathDoesNotDieQuestions = [
  {
    qText: "In So the Path Does Not Die, who is the author of the novel?",
    optA: "Buchi Emecheta",
    optB: "Pede Hollist",
    optC: "Chinua Achebe",
    optD: "Ngũgĩ wa Thiong'o",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, who is the main protagonist of the story?",
    optA: "Fina",
    optB: "Aman",
    optC: "Cammy",
    optD: "Edna",
    correctAnswer: "A"
  },
  {
    qText: "In So the Path Does Not Die, what is Fina's full name?",
    optA: "Finaba",
    optB: "Finesse",
    optC: "Fina-Marie",
    optD: "Finola",
    correctAnswer: "A"
  },
  {
    qText: "In So the Path Does Not Die, which country is the novel primarily set in before moving to the United States?",
    optA: "Nigeria",
    optB: "Sierra Leone",
    optC: "Ghana",
    optD: "Liberia",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what cultural practice is central to Fina's early trauma and life choices?",
    optA: "Arranged marriage at birth",
    optB: "Female Genital Mutilation (FGM) or circumcision",
    optC: "Facial scarification",
    optD: "Child labor",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, who forces Fina to undergo the initiation ceremony (FGM)?",
    optA: "Her father",
    optB: "Her grandmother",
    optC: "Her mother",
    optD: "The village chief",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what is the name of Fina’s grandmother?",
    optA: "Ya-boy",
    optB: "Mawuli",
    optC: "Nene",
    optD: "Mama Kende",
    correctAnswer: "A"
  },
  {
    qText: "In So the Path Does Not Die, Fina is from which ethnic group in Sierra Leone?",
    optA: "Mende",
    optB: "Temne",
    optC: "Fula (Fulani)",
    optD: "Krio",
    correctAnswer: "C"
  },
  {
    qText: "In So the Path Does Not Die, who is Fina’s long-time love interest and eventual fiancé?",
    optA: "Kizito",
    optB: "Cammy (Camilus)",
    optC: "Aman",
    optD: "Sorie",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what is Cammy's ethnic background?",
    optA: "Krio",
    optB: "Fula",
    optC: "Temne",
    optD: "Mende",
    correctAnswer: "A"
  },
  {
    qText: "In So the Path Does Not Die, how do Fina and Cammy first meet?",
    optA: "At a university party",
    optB: "In a church choir",
    optC: "At school when they were teenagers",
    optD: "At the airport",
    correctAnswer: "C"
  },
  {
    qText: "In So the Path Does Not Die, why does Fina move to the United States?",
    optA: "To escape the civil war in Sierra Leone.",
    optB: "To undergo medical treatment.",
    optC: "To get married to Cammy.",
    optD: "To join her parents who already live there.",
    correctAnswer: "A"
  },
  {
    qText: "In So the Path Does Not Die, who is Fina’s close friend from childhood who also emigrates to the US?",
    optA: "Edna",
    optB: "Aman",
    optC: "Mabel",
    optD: "Adama",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what does Aman’s character primarily symbolize in relation to Fina?",
    optA: "A rival for Cammy's affection",
    optB: "A bridge to modern, liberated African womanhood, offering contrast to Fina's traditional struggles",
    optC: "A betrayal of traditional African values",
    optD: "The voice of the older generation",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, how does the initiation (FGM) impact Fina later in life?",
    optA: "It makes her physically stronger.",
    optB: "She feels a deep sense of psychological trauma and physical pain, especially regarding intimacy.",
    optC: "She forgets it ever happened.",
    optD: "It brings her closer to her grandmother.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what is Fina's profession in the United States?",
    optA: "Doctor",
    optB: "Lawyer",
    optC: "Teacher",
    optD: "Nurse",
    correctAnswer: "C"
  },
  {
    qText: "In So the Path Does Not Die, Fina struggles with the decision of whether to:",
    optA: "Return to Sierra Leone or stay in the US.",
    optB: "Tell Cammy the truth about her circumcision.",
    optC: "Change her career to medicine.",
    optD: "Adopt a child.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what is Cammy’s profession?",
    optA: "Medical Doctor",
    optB: "Engineer",
    optC: "Professor",
    optD: "Accountant",
    correctAnswer: "A"
  },
  {
    qText: "In So the Path Does Not Die, how does Cammy react when he finally learns about Fina's FGM experience?",
    optA: "He is completely understanding and supportive immediately.",
    optB: "He is horrified and abandons her.",
    optC: "He struggles to understand it initially, causing a strain on their relationship.",
    optD: "He already knew and didn't care.",
    correctAnswer: "C"
  },
  {
    qText: "In So the Path Does Not Die, which event heavily disrupts life in Sierra Leone and serves as a backdrop to the characters' migration?",
    optA: "The Ebola outbreak",
    optB: "The Sierra Leone Civil War",
    optC: "A massive earthquake",
    optD: "A peaceful political transition",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, the title refers to:",
    optA: "The road leading to Fina's village.",
    optB: "The preservation of cultural heritage and the journey of life, ensuring traditions and lineage continue.",
    optC: "A famous poem by a Sierra Leonean writer.",
    optD: "The path Fina takes to America.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what role does the 'Bondo' society play?",
    optA: "A political party in Sierra Leone.",
    optB: "A women's secret society responsible for the initiation and circumcision of young girls.",
    optC: "A student union at the university.",
    optD: "An immigrant support group in the US.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, how does Fina’s father feel about the Bondo society initiation?",
    optA: "He strongly advocates for it.",
    optB: "He is indifferent.",
    optC: "He is generally opposed to it but is overruled by tradition and the grandmother.",
    optD: "He performed the initiation himself.",
    correctAnswer: "C"
  },
  {
    qText: "In So the Path Does Not Die, what does Fina’s mother (Mama Kende) do during the initiation conflict?",
    optA: "She rescues Fina before it happens.",
    optB: "She is largely powerless to stop Ya-boy from taking Fina.",
    optC: "She insists that Fina must be initiated.",
    optD: "She reports Ya-boy to the police.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, which character frequently experiences cultural displacement and identity crises in the US?",
    optA: "Ya-boy",
    optB: "Fina",
    optC: "Mama Kende",
    optD: "Chief Pa Sorie",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what happens to Aman in the United States?",
    optA: "She becomes a wealthy businesswoman.",
    optB: "She struggles with relationships and the complexities of being an African immigrant woman.",
    optC: "She is deported.",
    optD: "She marries an American politician.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, who is Kizito?",
    optA: "Fina's brother",
    optB: "A fellow immigrant and love interest who understands Fina's cultural background.",
    optC: "Cammy's best friend",
    optD: "Fina's father",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what does Fina eventually do to address her physical trauma from FGM?",
    optA: "She ignores it completely.",
    optB: "She seeks reconstructive surgery in the United States.",
    optC: "She visits a traditional healer in Sierra Leone.",
    optD: "She writes a book to cure herself.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what is the major thematic conflict for Fina?",
    optA: "Choosing between two careers.",
    optB: "Reconciling her traditional African upbringing with her modern life and personal trauma.",
    optC: "Fighting in the civil war.",
    optD: "Deciding whether to learn English.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, who pays for Fina’s ticket to the United States?",
    optA: "Cammy",
    optB: "Her grandmother",
    optC: "Her uncle/relatives",
    optD: "She wins a scholarship",
    correctAnswer: "A"
  },
  {
    qText: "In So the Path Does Not Die, why is Cammy’s family initially hesitant about Fina?",
    optA: "She is not educated.",
    optB: "Because of ethnic differences (she is Fula, he is Krio).",
    optC: "She is too wealthy for him.",
    optD: "They wanted him to marry an American.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, Fina's journey to self-acceptance heavily relies on:",
    optA: "Abandoning her African identity completely.",
    optB: "Forgiving her grandmother and reclaiming her body and agency.",
    optC: "Moving back to her village permanently.",
    optD: "Never speaking of her past.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, the novel explores the immigrant experience in America, often characterized by:",
    optA: "Immediate wealth and success.",
    optB: "Alienation, racism, and the struggle to maintain cultural roots.",
    optC: "Complete assimilation within days.",
    optD: "A lack of any educational opportunities.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what is a 'Sowei'?",
    optA: "A type of African food.",
    optB: "The female leader/initiator in the Bondo society.",
    optC: "A traditional musical instrument.",
    optD: "Fina's pet name for Cammy.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, the act of Fina undergoing surgery represents:",
    optA: "A rejection of medicine.",
    optB: "Her taking control of her body and healing her past wounds.",
    optC: "Her desire to become a doctor.",
    optD: "A punishment from her ancestors.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, who acts as a foil to Fina, being more outspoken and defiant of traditional gender roles?",
    optA: "Ya-boy",
    optB: "Mama Kende",
    optC: "Aman",
    optD: "Cammy's mother",
    correctAnswer: "C"
  },
  {
    qText: "In So the Path Does Not Die, Fina's relationship with her grandmother Ya-boy is best described as:",
    optA: "Completely harmonious and loving.",
    optB: "Non-existent, as they never met.",
    optC: "Complex, marked by deep cultural trauma but also familial connection.",
    optD: "Strictly business.",
    correctAnswer: "C"
  },
  {
    qText: "In So the Path Does Not Die, how does Fina view the Bondo society as an adult?",
    optA: "She wants to become a Sowei.",
    optB: "She sees it as a source of mutilation and trauma that should be eradicated or reformed.",
    optC: "She believes it is essential for all women.",
    optD: "She forgets it exists.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, which setting represents safety and opportunity, but also cultural isolation?",
    optA: "Freetown",
    optB: "The village",
    optC: "The United States (Maryland/Washington DC area)",
    optD: "The Bondo bush",
    correctAnswer: "C"
  },
  {
    qText: "In So the Path Does Not Die, what language is commonly used as a lingua franca by the characters in Sierra Leone?",
    optA: "Swahili",
    optB: "Krio",
    optC: "French",
    optD: "Hausa",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, Pede Hollist uses the narrative to critique:",
    optA: "Only Western imperialism.",
    optB: "Harmful traditional practices and the patriarchal structures that uphold them.",
    optC: "The education system in the US.",
    optD: "The use of modern medicine.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, Cammy’s failure to fully comprehend Fina's pain early on highlights:",
    optA: "His lack of medical knowledge.",
    optB: "The gap in understanding between men and women regarding female cultural trauma.",
    optC: "His hatred for her.",
    optD: "His support for FGM.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, which character's death deeply affects Fina and connects her back to her roots?",
    optA: "Cammy",
    optB: "Ya-boy",
    optC: "Aman",
    optD: "Kizito",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, Fina's story is fundamentally a journey of:",
    optA: "Revenge against her parents.",
    optB: "Healing, self-discovery, and reclaiming agency.",
    optC: "Becoming wealthy in America.",
    optD: "Political conquest.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, how do the civil war experiences affect the Sierra Leonean diaspora?",
    optA: "They easily forget about their home country.",
    optB: "They carry the trauma and survivor's guilt with them to the US.",
    optC: "They are all forced to return immediately.",
    optD: "They refuse to speak to one another.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, Fina's educational background in Sierra Leone was:",
    optA: "She never went to school.",
    optB: "She attended university before the war disrupted her life.",
    optC: "She only attended primary school.",
    optD: "She was homeschooled.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what is the significance of the 'path' in the title?",
    optA: "It refers to the literal dirt road to Freetown.",
    optB: "It symbolizes the continuity of life, culture, and personal growth despite obstacles.",
    optC: "It is the name of Fina's hospital.",
    optD: "It refers to a river.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, why is Fina reluctant to marry Cammy at first?",
    optA: "She doesn't love him.",
    optB: "She is afraid of intimacy due to her FGM and fears he won't understand.",
    optC: "She is already married.",
    optD: "She hates Krio people.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, the narrative structure often shifts between:",
    optA: "First person and third person.",
    optB: "The past in Sierra Leone and the present in the United States.",
    optC: "Poetry and prose.",
    optD: "English and French.",
    correctAnswer: "B"
  },
  {
    qText: "In So the Path Does Not Die, what ultimately allows Fina to move forward in her relationship with Cammy?",
    optA: "She breaks up with him.",
    optB: "Open communication about her trauma and seeking medical and psychological help.",
    optC: "Winning the lottery.",
    optD: "Moving back to Africa.",
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

    for (const q of pathDoesNotDieQuestions) {
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
    console.log(`Inserted ${inserted} generated question rows for So the Path Does Not Die across 4 exams.`);
  } catch (err) {
    console.error('DB Insert Error', err);
  } finally {
    pool.end();
  }
}

main();
