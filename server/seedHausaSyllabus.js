require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'hausa', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Hausa Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 Term 1
    { title: 'Bita da Gabatarwa', description: 'Review of previous Hausa, meaning of language, importance.', order: 1, subtopics: ['Bita kan abubuwan Hausa na baya', 'Amfani da Hausa a sadarwa', 'Ma’anar harshen Hausa', 'Ka’idojin karatu da rubutu', 'Muhimmancin Hausa'] },
    { title: 'Rabe-raben Jimla', description: 'Sentence types in Hausa.', order: 2, subtopics: ['Ma’anar jimla', 'Jimla mai sarkakiya', 'Jimla mai sauki', 'Misalai da gina jimloli', 'Jimla mai hade'] },
    { title: 'Sassan Magana', description: 'Parts of speech.', order: 3, subtopics: ['Suna', 'Wakilin suna', 'Aikatau', 'Bayanau', 'Sifa', 'Harfaffen dangantaka da sauran sassa'] },
    { title: 'Jinsi a Hausa', description: 'Gender in Hausa.', order: 4, subtopics: ['Namiji da mace', 'Canjin jinsi', 'Alamomin jinsi', 'Amfani da jinsi cikin jimla', 'Misalan kalmomi'] },
    { title: 'Adadi', description: 'Numbers in Hausa.', order: 5, subtopics: ['Adadin kirga', 'Singular da plural', 'Adadin tsari', 'Amfani da adadi cikin jimloli', 'Kalmomin adadi'] },
    { title: 'Aikatau da Lokuta', description: 'Verbs and tenses.', order: 6, subtopics: ['Aikatau', 'Lokacin gaba', 'Lokacin yanzu', 'Canjin aikatau cikin jimla', 'Lokacin da ya wuce'] },
    { title: 'Rubutun Labari', description: 'Story writing.', order: 7, subtopics: ['Ma’anar labari', 'Bayanin jarumai da wuri', 'Tsarin labari', 'Rubuta gajeren labari', 'Gabatarwa da kammalawa'] },
    { title: 'Rubutun Wasika', description: 'Letter writing.', order: 8, subtopics: ['Ma’anar wasika', 'Sassan wasika', 'Wasikar aboki', 'Ka’idojin rubuta wasika', 'Wasikar hukuma'] },
    { title: 'Karatu da Fahimta', description: 'Reading and comprehension.', order: 9, subtopics: ['Karanta rubutu', 'Ciro muhimman bayanai', 'Fahimtar ma’anar kalmomi', 'Kara kalmomi', 'Amsa tambayoyi'] },
    { title: 'Adabin Baka', description: 'Oral literature.', order: 10, subtopics: ['Ma’anar adabi', 'Kacici-kacici', 'Rabe-raben adabin baka', 'Wakokin baka', 'Tatsuniya', 'Muhimmancin adabin baka'] },
    { title: 'Bita da Jarabawa (SSS 1 Term 1)', description: 'Revision and examination.', order: 11, subtopics: ['Bita kan darussan zangon farko', 'Gwajin fahimta', 'Ayyukan nahawu', 'Jarabawar zangon', 'Karatu da rubutu'] },
    // SSS 1 Term 2
    { title: 'Bita da Rabe-raben Jimla', description: 'Review of sentence types.', order: 12, subtopics: ['Bita', 'Gina jimloli', 'Rabe-raben jimla', 'Gyaran kurakurai', 'Aikatau da wakilin suna'] },
    { title: 'Rubutun Wasika (Term 2)', description: 'Letter writing practice.', order: 13, subtopics: ['Tsarin wasika', 'Adireshi da gaisuwa', 'Wasikar sirri', 'Rubutun wasika cikakke', 'Wasikar hukuma'] },
    { title: 'Adabin Baka (Term 2)', description: 'Oral literature continued.', order: 14, subtopics: ['Ma’anar adabin baka', 'Labaran gargajiya', 'Wakoki', 'Wasan kwaikwayo na baka', 'Tatsuniya', 'Muhimmancin adabin baka'] },
    { title: 'Dabarun Fassara', description: 'Translation techniques.', order: 15, subtopics: ['Ma’anar fassara', 'Kalmomi masu ma’ana iri-iri', 'Fassarar Hausa zuwa Turanci', 'Matsalolin fassara', 'Fassarar Turanci zuwa Hausa'] },
    { title: 'Nazarin Littafin Zube', description: 'Prose analysis.', order: 16, subtopics: ['Ma’anar zube', 'Jarumai', 'Jigo', 'Tsarin labari', 'Salo', 'Sarrafa harshe'] },
    { title: 'Tufafin Hausawa da Kayan Ado', description: 'Hausa clothing and adornment.', order: 17, subtopics: ['Ire-iren tufafin Hausawa', 'Matsayi da kima', 'Tufafin maza da mata', 'Amfanin tufafi a al’ada', 'Kayan ado'] },
    { title: 'Karatu', description: 'Reading skills.', order: 18, subtopics: ['Karatu da lafazi', 'Amsa tambayoyi', 'Sabbin kalmomi', 'Amfani da kalmomi', 'Fahimtar rubutu'] },
    { title: 'Nahawu da Aikatau', description: 'Grammar and verbs.', order: 19, subtopics: ['Sassan magana', 'Sifa', 'Aikatau', 'Bayanau', 'Wakilan suna', 'Gina jimla'] },
    { title: 'Al’adun Hausawa', description: 'Hausa culture.', order: 20, subtopics: ['Gaisuwa', 'Aure da bukukuwa', 'Mutunta manya', 'Abinci da sana’o’i', 'Zumunci'] },
    { title: 'Rubutun Bayani', description: 'Descriptive writing.', order: 21, subtopics: ['Rubutun bayanin mutum', 'Tsarin sakin layi', 'Bayanin wuri', 'Gyaran rubutu', 'Bayanin abu'] },
    { title: 'Bita da Jarabawa (SSS 1 Term 2)', description: 'Revision and examination.', order: 22, subtopics: ['Bita', 'Rubutu', 'Ayyukan fassara', 'Jarabawar zangon', 'Nazarin adabi'] },
    // SSS 1 Term 3
    { title: 'Wasannin Kwakwalwa', description: 'Mental games.', order: 23, subtopics: ['Ma’anar wasan kwakwalwa', 'Tambayoyin hikima', 'Ire-iren wasannin kwakwalwa', 'Amfanin wasannin kwakwalwa', 'Kacici-kacici'] },
    { title: 'Kacici-kacici da Hikima', description: 'Riddles and wisdom.', order: 24, subtopics: ['Ma’anar kacici-kacici', 'Amsa kacici-kacici', 'Ire-iren kacici-kacici', 'Muhimmancinsu', 'Rubuta kacici-kacici'] },
    { title: 'Nazarin Littafin Wasan Kwaikwayo', description: 'Drama analysis.', order: 25, subtopics: ['Ma’anar wasan kwaikwayo', 'Jarumai', 'Jigo', 'Salo da harshe', 'Zubi', 'Nazarin aikin'] },
    { title: 'Rubutun Wasika (Term 3)', description: 'Letter writing.', order: 26, subtopics: ['Wasikar aboki', 'Tsarin wasika', 'Wasikar neman bayani', 'Ayyukan rubutu', 'Wasikar hukuma'] },
    { title: 'Rabe-raben Jimla (Term 3)', description: 'Sentence types review.', order: 27, subtopics: ['Bita kan rabe-raben jimla', 'Amfani da jimloli', 'Gina jimla', 'Gyaran kuskure', 'Fitar da sassan jimla'] },
    { title: 'Dabarun Fassara (Term 3)', description: 'Translation techniques.', order: 28, subtopics: ['Ka’idojin fassara', 'Kalmomin da ke bukatar kulawa', 'Takaitaccen rubutu', 'Ayyukan fassara', 'Fassarar jimloli'] },
    { title: 'Adabin Baka da Tarihi', description: 'Oral literature and history.', order: 29, subtopics: ['Wakokin baka', 'Wasannin gargajiya', 'Wakokin makada', 'Tarihi cikin adabin baka', 'Wakokin noma'] },
    { title: 'Karatu da Fahimta (Term 3)', description: 'Reading and comprehension.', order: 30, subtopics: ['Karatu', 'Amsa tambayoyi', 'Sabbin kalmomi', 'Takaita rubutu', 'Fahimta'] },
    { title: 'Al’adun Hausawa (Term 3)', description: 'Hausa culture.', order: 31, subtopics: ['Bukukuwa', 'Rayuwar iyali', 'Sana’o’i', 'Zumunci da dabi’u', 'Abinci'] },
    { title: 'Bita da Jarabawa (SSS 1 Term 3)', description: 'Revision and examination.', order: 32, subtopics: ['Cikakken bita', 'Fassara', 'Nahawu', 'Jarabawar zangon', 'Adabi'] },
    // SSS 2 Term 1
    { title: 'Bita da Nahawun Hausa', description: 'Grammar review.', order: 33, subtopics: ['Bita kan SSS1', 'Jinsi', 'Sassan magana', 'Adadi', 'Rabe-raben jimla', 'Aikatau'] },
    { title: 'Tsarin Jumla', description: 'Sentence structure.', order: 34, subtopics: ['Jimla mai sauki', 'Dangantakar jimloli', 'Jimla mai hade', 'Gyaran jimla', 'Jimla mai sarkakiya'] },
    { title: 'Suna da Nau’o’insa', description: 'Nouns and types.', order: 35, subtopics: ['Ma’anar suna', 'Sunan abu', 'Sunan mutum', 'Suna na gama-gari da na musamman', 'Sunan wuri'] },
    { title: 'Aikatau da Sauye-sauyen Lokaci', description: 'Verbs and time changes.', order: 36, subtopics: ['Aikatau', 'Aikatau mai wucewa da mara wucewa', 'Lokutan aiki', 'Ayyukan nahawu', 'Canjin aikatau'] },
    { title: 'Sifa da Bayanau', description: 'Adjectives and adverbs.', order: 37, subtopics: ['Ma’anar sifa', 'Matsayin sifa cikin jimla', 'Nau’ikan sifa', 'Gina jimloli', 'Bayanau'] },
    { title: 'Adadi da Jam’i', description: 'Numbers and plurals.', order: 38, subtopics: ['Adadi', 'Ka’idojin adadi', 'Kalmomin jam’i', 'Ayyukan rubutu', 'Canjin suna zuwa jam’i'] },
    { title: 'Rubutun Muqala', description: 'Essay writing.', order: 39, subtopics: ['Ma’anar muqala', 'Sakin layi', 'Gabatarwa', 'Kammalawa', 'Jigon muqala', 'Rubuta muqala'] },
    { title: 'Rubutun Wasika da Rahoto', description: 'Letters and reports.', order: 40, subtopics: ['Wasikar hukuma', 'Sanarwa', 'Wasikar sirri', 'Tsarin rubutu', 'Rahoto'] },
    { title: 'Adabin Baka (SSS 2)', description: 'Oral literature.', order: 41, subtopics: ['Wakoki', 'Karin magana', 'Tatsuniya', 'Salon adabin baka', 'Kacici-kacici'] },
    { title: 'Karatu da Fassara', description: 'Reading and translation.', order: 42, subtopics: ['Fahimtar rubutu', 'Takaita rubutu', 'Kalmomin mahalli', 'Amsar tambayoyi', 'Fassara'] },
    { title: 'Bita da Jarabawa (SSS 2 Term 1)', description: 'Revision and examination.', order: 43, subtopics: ['Bita', 'Rubutu', 'Ayyukan nahawu', 'Jarabawar zangon', 'Adabi'] },
    // SSS 2 Term 2
    { title: 'Adabin Hausa', description: 'Hausa literature.', order: 44, subtopics: ['Ma’anar adabi', 'Muhimmancin adabi', 'Adabin baka', 'Bambance-bambance', 'Adabin rubutacce'] },
    { title: 'Nazarin Littafin Zube (SSS 2)', description: 'Prose analysis.', order: 45, subtopics: ['Jigo', 'Wuri da lokaci', 'Salo', 'Tsarin labari', 'Jarumai', 'Sarrafa harshe'] },
    { title: 'Nazarin Wasan Kwaikwayo (SSS 2)', description: 'Drama analysis.', order: 46, subtopics: ['Jigo', 'Salo', 'Jarumai', 'Harshe', 'Zubi', 'Darussan wasan'] },
    { title: 'Nazarin Wakoki', description: 'Poetry analysis.', order: 47, subtopics: ['Ma’anar waka', 'Amshi', 'Jigo', 'Mawaki da makadi', 'Salon waka', 'Darussan waka'] },
    { title: 'Karin Magana', description: 'Proverbs.', order: 48, subtopics: ['Ma’anar karin magana', 'Amfani da karin magana', 'Misalai', 'Kirkirar jimloli', 'Ma’ana a mahalli'] },
    { title: 'Kalmomin Hausa da Asalinsu', description: 'Hausa words and origins.', order: 49, subtopics: ['Kalmomin asali', 'Tasirin Turanci', 'Kalmomin aro', 'Canjin ma’ana', 'Tasirin Larabci'] },
    { title: 'Fassara (SSS 2)', description: 'Translation.', order: 50, subtopics: ['Fassarar jimloli', 'Turanci zuwa Hausa', 'Fassarar sakin layi', 'Dabarun fassara', 'Hausa zuwa Turanci'] },
    { title: 'Rubutun Muqala (Term 2)', description: 'Essay writing.', order: 51, subtopics: ['Muqalar bayani', 'Tsarin hujja', 'Muqalar gardama', 'Gyaran rubutu', 'Muqalar labari'] },
    { title: 'Sadarwa da Magana', description: 'Communication and speech.', order: 52, subtopics: ['Tattaunawa', 'Tambaya da amsa', 'Jawabi', 'Lafazin Hausa', 'Hira'] },
    { title: 'Al’adu da Rayuwar Hausawa', description: 'Hausa culture and life.', order: 53, subtopics: ['Sarauta', 'Bukukuwa', 'Sana’o’i', 'Abinci', 'Tufafi', 'Dangantakar al’adu da harshe'] },
    { title: 'Bita da Jarabawa (SSS 2 Term 2)', description: 'Revision and examination.', order: 54, subtopics: ['Bita', 'Rubutu', 'Nazarin adabi', 'Jarabawar zangon', 'Fassara'] },
    // SSS 2 Term 3
    { title: 'Nahawu Mai zurfi', description: 'Advanced grammar.', order: 55, subtopics: ['Sassan magana', 'Suna', 'Tsarin jimla', 'Sifa', 'Aikatau', 'Wakilin suna'] },
    { title: 'Jinsi da Adadi', description: 'Gender and numbers.', order: 56, subtopics: ['Jinsi', 'Jam’i', 'Namiji da mace', 'Canjin kalmomi', 'Adadi', 'Ayyukan nahawu'] },
    { title: 'Ka’idojin Rubutu', description: 'Writing rules.', order: 57, subtopics: ['Haruffa', 'Gyaran kurakurai', 'Alamomin rubutu', 'Rubutun sakin layi', 'Rubuta kalma daidai'] },
    { title: 'Karatu da Fahimta (SSS 2 Term 3)', description: 'Reading and comprehension.', order: 58, subtopics: ['Karatu mai kyau', 'Ciro bayanai', 'Fahimtar jigo', 'Takaita rubutu', 'Kalmomin mahalli'] },
    { title: 'Fassara Mai zurfi', description: 'Advanced translation.', order: 59, subtopics: ['Dabarun fassara', 'Fassarar sakin layi', 'Ma’ana ta zahiri da ta mahalli', 'Ayyukan fassara', 'Kalmomi masu wahala'] },
    { title: 'Nazarin Littafin Zube (Term 3)', description: 'Prose analysis.', order: 60, subtopics: ['Jigo', 'Tsarin labari', 'Salo', 'Harshe', 'Jarumai', 'Darussan aikin'] },
    { title: 'Nazarin Wasan Kwaikwayo (Term 3)', description: 'Drama analysis.', order: 61, subtopics: ['Jigo', 'Salo', 'Zubi', 'Harshe', 'Jarumai', 'Sakonnin aikin'] },
    { title: 'Nazarin Wakoki (Term 3)', description: 'Poetry analysis.', order: 62, subtopics: ['Jigo', 'Hoton magana', 'Amshi', 'Ma’anar waka', 'Salo', 'Darussan waka'] },
    { title: 'Rubutun Rayuwa da Tarihi', description: 'Biography and history.', order: 63, subtopics: ['Tarihin mutum', 'Tsarin rubutu', 'Bayanin rayuwa', 'Gabatarwa da kammalawa', 'Muhimman abubuwan tarihi'] },
    { title: 'Bita da Jarabawa (SSS 2 Term 3)', description: 'Revision and examination.', order: 64, subtopics: ['Cikakken bita', 'Adabi da fassara', 'Past questions', 'Jarabawar zangon', 'Ayyukan nahawu'] },
    // SSS 3 Term 1
    { title: 'Bita Mai zurfi', description: 'Comprehensive review.', order: 65, subtopics: ['Bita kan nahawu', 'Fassara', 'Adabi', 'Karatu da fahimta', 'Rubutu'] },
    { title: 'Bukukuwan Hausawa', description: 'Hausa festivals.', order: 66, subtopics: ['Ma’anar bukukuwa', 'Muhimmancin bukukuwa', 'Ire-iren bukukuwa', 'Sauye-sauyen zamani', 'Yadda ake gudanarwa'] },
    { title: 'Ka’idojin Rubutu (SSS 3)', description: 'Writing rules.', order: 67, subtopics: ['Rubuta labari daidai', 'Tsarin sakin layi', 'Alamomin rubutu', 'Rubutun jarrabawa', 'Gyaran kuskure'] },
    { title: 'Nazarin Littafin Zube (SSS 3)', description: 'Prose analysis.', order: 68, subtopics: ['Jigo', 'Zubi', 'Salo', 'Sarrafa harshe', 'Jarumai', 'Darussan littafi'] },
    { title: 'Nazarin Wasan Kwaikwayo (SSS 3)', description: 'Drama analysis.', order: 69, subtopics: ['Jigo', 'Salo', 'Jarumai', 'Harshe', 'Zubi', 'Nazarin cikakken aiki'] },
    { title: 'Nazarin Wakoki (SSS 3)', description: 'Poetry analysis.', order: 70, subtopics: ['Jigo', 'Hoton magana', 'Amshi', 'Mawaki', 'Salo', 'Sakonnin waka'] },
    { title: 'Tsarin Sarauta da Mukamai', description: 'Traditional leadership.', order: 71, subtopics: ['Ma’anar sarauta', 'Ayyukan masu sarauta', 'Tsarin sarautar Hausa', 'Sauye-sauyen zamani', 'Mukamai'] },
    { title: 'Adadi da Jam’i (SSS 3)', description: 'Numbers and plurals.', order: 72, subtopics: ['Bita kan adadi', 'Canjin kalmomi', 'Nau’ikan adadi', 'Ayyukan nahawu', 'Jam’i'] },
    { title: 'Fassara da Rubutu', description: 'Translation and writing.', order: 73, subtopics: ['Fassarar Hausa zuwa Turanci', 'Wasika', 'Turanci zuwa Hausa', 'Rahoto', 'Muqala'] },
    { title: 'Karatu da Fahimta (SSS 3 Term 1)', description: 'Reading and comprehension.', order: 74, subtopics: ['Karatu', 'Amsa tambayoyi', 'Jigo', 'Takaitawa', 'Kalmomi'] },
    { title: 'Bita da Jarabawa (SSS 3 Term 1)', description: 'Revision and examination.', order: 75, subtopics: ['Bita', 'Adabi', 'Past questions', 'Jarabawar zangon', 'Rubutu'] },
    // SSS 3 Term 2
    { title: 'Bita Kan Jinsi', description: 'Review of gender.', order: 76, subtopics: ['Ma’anar jinsi', 'Misalai', 'Namiji da mace', 'Ayyukan nahawu', 'Alamomin jinsi'] },
    { title: 'Bita Kan Nazarin Littafin Zube', description: 'Prose review.', order: 77, subtopics: ['Jigo', 'Zubi', 'Salo', 'Harshe', 'Jarumai', 'Amsar tambayoyi'] },
    { title: 'Bita Kan Sarauta', description: 'Leadership review.', order: 78, subtopics: ['Tsarin sarauta', 'Tarihin sarauta', 'Mukamai', 'Matsayinta a al’umma', 'Ayyuka'] },
    { title: 'Bita Kan Adadi', description: 'Numbers review.', order: 79, subtopics: ['Ma’anar adadi', 'Canjin kalma', 'Nau’ikan adadi', 'Ayyukan rubutu', 'Jam’i'] },
    { title: 'Nazarin Littafin Wasan Kwaikwayo (Term 2)', description: 'Drama analysis.', order: 80, subtopics: ['Karatu', 'Jarumai', 'Jigo', 'Salo', 'Zubi', 'Sarrafa harshe'] },
    { title: 'Nazarin Littafin Zube (Term 2)', description: 'Prose analysis.', order: 81, subtopics: ['Jigo', 'Zubi', 'Jarumai', 'Harshe', 'Salo', 'Darussan littafi'] },
    { title: 'Nazarin Wakoki (Term 2)', description: 'Poetry analysis.', order: 82, subtopics: ['Jigo', 'Kida da waka', 'Amshi', 'Mawaki', 'Salo', 'Sakon waka'] },
    { title: 'Adabin Baka (SSS 3)', description: 'Oral literature.', order: 83, subtopics: ['Wakoki', 'Karin magana', 'Tatsuniya', 'Wasannin gargajiya', 'Kacici-kacici'] },
    { title: 'Rubutun Muqala da Wasika', description: 'Essays and letters.', order: 84, subtopics: ['Muqala', 'Rahoto', 'Wasikar sirri', 'Gyaran rubutu', 'Wasikar hukuma'] },
    { title: 'Fassara da Fahimta', description: 'Translation and comprehension.', order: 85, subtopics: ['Fassara', 'Kalmomin mahalli', 'Karatu', 'Takaita rubutu', 'Tambayoyi'] },
    { title: 'Bita da Jarabawa (SSS 3 Term 2)', description: 'Revision and examination.', order: 86, subtopics: ['Cikakken bita', 'Mock practice', 'Past questions', 'Jarabawar zangon'] },
    // SSS 3 Term 3
    { title: 'Bita Kan Nahawu', description: 'Grammar review.', order: 87, subtopics: ['Sassan magana', 'Adadi', 'Rabe-raben jimla', 'Aikatau', 'Jinsi', 'Sifa'] },
    { title: 'Bita Kan Adabi', description: 'Literature review.', order: 88, subtopics: ['Zube', 'Adabin baka', 'Wasan kwaikwayo', 'Jigo da salo', 'Waka'] },
    { title: 'Bita Kan Rubutu', description: 'Writing review.', order: 89, subtopics: ['Muqala', 'Labari', 'Wasika', 'Ka’idojin rubutu', 'Rahoto'] },
    { title: 'Bita Kan Fassara', description: 'Translation review.', order: 90, subtopics: ['Hausa zuwa Turanci', 'Kalmomi', 'Turanci zuwa Hausa', 'Ayyukan fassara', 'Ma’ana ta mahalli'] },
    { title: 'Bita Kan Karatu', description: 'Reading review.', order: 91, subtopics: ['Fahimtar rubutu', 'Takaitawa', 'Ciro bayanai', 'Amsar tambayoyi', 'Kalmomi'] },
    { title: 'Al’adun Hausawa (Review)', description: 'Hausa culture review.', order: 92, subtopics: ['Sarauta', 'Sana’o’i', 'Bukukuwa', 'Abinci', 'Tufafi', 'Dabi’u da al’adu'] },
    { title: 'Magana da Sadarwa', description: 'Speech review.', order: 93, subtopics: ['Tattaunawa', 'Bayani', 'Jawabi', 'Lafazi', 'Hira'] },
    { title: 'Shirye-shiryen SSCE', description: 'Exam prep.', order: 94, subtopics: ['Tambayoyin zabi', 'Fassara', 'Tambayoyin rubutu', 'Karatu da fahimta', 'Nazarin adabi'] },
    { title: 'Mock Examination', description: 'Mock exam.', order: 95, subtopics: ['Cikakken gwaji', 'Sake bitar wuraren rauni', 'Gyaran kuskure', 'Gudanar da lokaci'] },
    { title: 'Kammalawa da Jarabawa', description: 'Conclusion and exam.', order: 96, subtopics: ['Bita ta karshe', 'Nazarin adabi', 'Ayyukan baka', 'Shirye-shiryen jarrabawar karshe', 'Ayyukan rubutu'] }
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
          [topicId, subStr, subSlug, 'Learn about ' + subStr, subOrder]
        );
        const subtopicId = subRes.rows[0].id;

        for (let i = 1; i <= 2; i++) {
          const lessonTitle = 'Lesson ' + i + ': ' + subStr;
          const lessonSlug = slugify(lessonTitle) + '-' + Math.floor(Math.random() * 100000);
          const lessonContent = '<div class="lesson-intro"><h2>Welcome to ' + lessonTitle + '</h2><p>This is a comprehensive study module covering the concepts of <strong>' + subStr + '</strong> within the topic of ' + topic.title + '.</p><h3>Key Principles</h3><ul><li>Understand the fundamental rules and definitions of ' + subStr + '.</li><li>Apply standard methodologies accurately.</li><li>Practice solving related problems to build confidence.</li></ul><p>Make sure to take notes as you read through this module. At the end of the topic, you can test your knowledge using the Practice feature!</p></div>';

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
