require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'arabic', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Arabic Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 Term 1
    { title: 'مراجعة أساسيات اللغة العربية (Arabic foundations review)', description: 'Arabic language foundations review.', order: 1, subtopics: ['مراجعة المفردات الأساسية', 'الحروف والأصوات العربية', 'التدريب على النطق والإملاء', 'الحركات القصيرة والطويلة', 'القراءة والكتابة الصحيحة'] },
    { title: 'التحية والتعارف (Greetings and introduction)', description: 'Greetings and introduction.', order: 2, subtopics: ['الحوار القصير', 'ألفاظ التحية', 'التعبير الشفهي في مواقف الحياة اليومية', 'التعريف بالنفس', 'السؤال عن الاسم والعمر والجنسية'] },
    { title: 'الأسرة والبيت (Family and home)', description: 'Family and home.', order: 3, subtopics: ['ضمائر المتكلم والمخاطب والغائب', 'أفراد الأسرة', 'تكوين جمل بسيطة عن الأسرة', 'أسماء الغرف والأثاث', 'صفات أفراد الأسرة'] },
    { title: 'المدرسة والتعليم (School and education)', description: 'School and education.', order: 4, subtopics: ['أفعال الدراسة والتعلم', 'أدوات المدرسة', 'الحوار داخل الفصل', 'أجزاء المدرسة', 'المواد الدراسية'] },
    { title: 'الضمائر (Pronouns)', description: 'Pronouns.', order: 5, subtopics: ['استخدام الضمائر في الجمل', 'الضمائر المنفصل', 'التدريب على المطابقة', 'الضمائر المتصل', 'ضمائر الرفع والنصب والجر'] },
    { title: 'الجملة الاسمية (Nominal sentence)', description: 'Nominal sentence.', order: 6, subtopics: ['المفرد والمثنى والجمع', 'المبتدأ والخبر', 'تكوين الجمل الاسمية', 'أنواع الخبر', 'النكرة والمعرفة'] },
    { title: 'الجملة الفعلية (Verbal sentence)', description: 'Verbal sentence.', order: 7, subtopics: ['فعل الأمر', 'الفعل والفاعل', 'المفعول به', 'الفعل الماضي', 'تركيب الجملة الفعلية', 'الفعل المضارع'] },
    { title: 'المذكر والمؤنث (Masculine and feminine)', description: 'Masculine and feminine.', order: 8, subtopics: ['المطابقة بين الاسم والصفة', 'علامات التأنيث', 'تدريبات تطبيقية', 'المذكر والمؤنث من الأسماء', 'المذكر والمؤنث من الصفات'] },
    { title: 'القراءة والفهم والإملاء (Reading, comprehension, dictation)', description: 'Reading, comprehension and dictation.', order: 9, subtopics: ['الإملاء المنقول والمنظور', 'نصوص قصيرة مناسبة للمستوى', 'إعادة صياغة الجمل', 'استخراج المفردات الجديدة', 'أسئلة الفهم'] },
    { title: 'المراجعة والتقويم (Revision and assessment Term 1)', description: 'Revision and assessment.', order: 10, subtopics: ['إملاء وكتابة', 'مراجعة المفردات والقواعد', 'اختبار نهاية الفصل', 'حوار شفهي', 'قراءة وفهم'] },
    // SSS 1 Term 2
    { title: 'الأسرة والمجتمع (Family and society)', description: 'Family and society.', order: 11, subtopics: ['الاحترام والتعاون', 'العلاقات الأسرية', 'وصف المجتمع المحلي', 'الجيران', 'آداب التعامل'] },
    { title: 'الحياة اليومية (Daily life)', description: 'Daily life.', order: 12, subtopics: ['الساعة والتوقيت', 'أيام الأسبوع', 'كتابة روتين يومي بسيط', 'أوقات اليوم', 'الأنشطة اليومية'] },
    { title: 'الأعداد والألوان والصفات (Numbers, colors, adjectives)', description: 'Numbers, colors and adjectives.', order: 13, subtopics: ['الصفات الشائعة', 'الأعداد الأساسية', 'مطابقة الصفات للموصوف', 'الأعداد الترتيبية', 'الألوان'] },
    { title: 'التثنية والجمع (Dual and plural)', description: 'Plural and dual.', order: 14, subtopics: ['جمع التكسير', 'المفرد والمثنى', 'التطبيق في الجمل', 'جمع المذكر السالم', 'جمع المؤنث السالم'] },
    { title: 'حروف الجر وظروف (Prepositions and adverbs)', description: 'Prepositions and adverbs.', order: 15, subtopics: ['ظروف المكان', 'حروف الجر الشائعة', 'استخدامها في التعبير', 'الاسم المجرور', 'ظروف الزمان'] },
    { title: 'الإضافة (Genitive construction)', description: 'Genitive construction.', order: 16, subtopics: ['تحويل التراكيب', 'المضاف والمضاف إليه', 'تدريبات تطبيقية', 'علامات الإعراب في الإضافة', 'أمثلة من الحياة اليومية'] },
    { title: 'الفعل والفاعل والمفعول به (Verb, subject, object)', description: 'Verb, subject and object.', order: 17, subtopics: ['تحويل الجمل', 'التعرف على الفعل والفاعل', 'التطبيق على نصوص قصيرة', 'المفعول به', 'علامات الإعراب الأساسية'] },
    { title: 'الاستفهام والنفي (Interrogation and negation)', description: 'Interrogation and negation.', order: 18, subtopics: ['الإجابة عن الأسئلة', 'أدوات الاستفهام', 'الحوار والتواصل', 'تكوين الأسئلة', 'أدوات النفي الأساسية'] },
    { title: 'التعبير والكتابة (Expression and writing)', description: 'Expression and writing.', order: 19, subtopics: ['كتابة فقرة قصيرة', 'كتابة جمل مترابطة', 'مراجعة الأخطاء الإملائية والنحوية', 'وصف شخص', 'وصف مكان'] },
    { title: 'المراجعة والتقويم (Revision and assessment Term 2)', description: 'Revision and assessment.', order: 20, subtopics: ['كتابة وإملاء', 'مراجعة القواعد', 'اختبار نهاية الفصل', 'فهم المقروء', 'محادثة'] },
    // SSS 1 Term 3
    { title: 'الطعام والشراب (Food and drink)', description: 'Food and drink.', order: 21, subtopics: ['آداب الطعام', 'أسماء الأطعمة', 'حوار البيع والشراء', 'المشروبات', 'في المطعم والسوق'] },
    { title: 'الصحة والنظافة (Health and hygiene)', description: 'Health and hygiene.', order: 22, subtopics: ['زيارة الطبيب', 'أجزاء الجسم الأساسية', 'التعبير عن الألم والحاجة', 'النظافة الشخصية', 'الصحة والمرض'] },
    { title: 'البيئة والطبيعة (Environment and nature)', description: 'Environment and nature.', order: 23, subtopics: ['النظافة البيئية', 'الطقس', 'وصف البيئة', 'الفصول', 'النبات والحيوان'] },
    { title: 'السفر والمواصلات (Travel and transportation)', description: 'Travel and transportation.', order: 24, subtopics: ['السؤال عن الاتجاهات', 'وسائل النقل', 'الحوار في مواقف السفر', 'المحطة والمطار', 'الرحلات والسفر'] },
    { title: 'الفعل الماضي والمضارع (Past and present verbs)', description: 'Past and present verbs.', order: 25, subtopics: ['استخدام الأفعال في جمل', 'تصريف الأفعال الصحيحة', 'تطبيقات في التعبير', 'مطابقة الفعل مع الفاعل', 'النفي في الماضي والمضارع'] },
    { title: 'كان وأخواتها (Kana and its sisters)', description: 'Kana and its sisters.', order: 26, subtopics: ['إعراب مبسط', 'معنى كان وأخواتها', 'التدريب على التحويل', 'عملها في الجملة الاسمية', 'أمثلة وتطبيقات'] },
    { title: 'إن وأخواتها (Inna and its sisters)', description: 'Inna and its sisters.', order: 27, subtopics: ['الإعراب الأساسي', 'معنى إن وأخواتها', 'التدريب على استعمالها', 'عملها في الجملة الاسمية', 'أمثلة وتطبيقات'] },
    { title: 'النصوص والأدب العربي (Arabic texts and literature)', description: 'Arabic texts and literature.', order: 28, subtopics: ['الفكرة العامة والأفكار الجزئية', 'نصوص نثرية مبسطة', 'القيم المستفادة', 'نصوص شعرية مناسبة للمستوى', 'المفردات والصور اللغوية'] },
    { title: 'التعبير والترجمة الأساسية (Basic expression and translation)', description: 'Basic expression and translation.', order: 29, subtopics: ['التدريب على ترتيب الجمل', 'وصف صورة', 'المراجعة اللغوية', 'كتابة رسالة قصيرة', 'ترجمة جمل بسيطة من وإلى العربية'] },
    { title: 'المراجعة والاختبار (Revision and examination Term 3)', description: 'Revision and examination.', order: 30, subtopics: ['تعبير شفوي وكتابي', 'مراجعة شاملة', 'اختبار نهاية العام', 'قراءة وفهم', 'قواعد'] },
    // SSS 2 Term 1
    { title: 'مراجعة قواعد SSS1 (SSS1 grammar review)', description: 'SSS1 grammar review.', order: 31, subtopics: ['الأفعال', 'الجملة الاسمية والفعلية', 'حروف الجر والإضافة', 'الضمائر', 'المراجعة التطبيقية', 'الجمع والتثنية'] },
    { title: 'المعرفة والنكرة (Definite and indefinite)', description: 'Definite and indefinite.', order: 32, subtopics: ['أل التعريف', 'أنواع المعرفة', 'التطبيق في النصوص', 'الضمائر أو أسماء الإشارة', 'الأسماء الموصولة'] },
    { title: 'أسماء الإشارة والأسماء الموصولة (Demonstrative and relative pronouns)', description: 'Demonstrative and relative pronouns.', order: 33, subtopics: ['الذي واللتي/اللائي', 'هذه وهذا وهؤلاء', 'التطبيق في جمل وفقرات', 'ذلك وتلك وأولئك', 'الذي والتي والذين'] },
    { title: 'النعت والمنعوت (Adjective and described)', description: 'Adjective and described.', order: 34, subtopics: ['المطابقة في الإفراد والتثنية والجمع', 'تعريف النعت', 'التطبيق', 'المطابقة في التعريف والتنكير', 'المطابقة في التذكير والتأنيث'] },
    { title: 'العطف والبدل والتوكيد (Conjunction, apposition and emphasis)', description: 'Conjunction, apposition and emphasis.', order: 35, subtopics: ['التوكيد', 'حروف العطف', 'تطبيقات إعرابية', 'المعطوف والمعطوف عليه', 'البدل'] },
    { title: 'الأفعال المجردة والمزيدة (Bare and augmented verbs)', description: 'Bare and augmented verbs.', order: 36, subtopics: ['معاني بعض الزيادات', 'الفعل المجرد', 'تطبيقات صرفية', 'الفعل المزيد', 'الأوزان الأساسية'] },
    { title: 'المصدر واسم الفاعل واسم المفعول (Infinitive, active/passive participles)', description: 'Infinitive, active/passive participles.', order: 37, subtopics: ['اسم المفعول', 'تعريف المصدر', 'الاستخدام في الجمل', 'صيغ المصادر الشائعة', 'اسم الفاعل'] },
    { title: 'القراءة والفهم (Reading and comprehension SSS2)', description: 'Reading and comprehension.', order: 38, subtopics: ['الاستنتاج', 'نصوص اجتماعية وثقافية', 'الإجابة عن أسئلة الفهم', 'استخراج الأفكار', 'معاني المفردات من السياق'] },
    { title: 'التعبير الكتابي (Written expression SSS2)', description: 'Written expression.', order: 39, subtopics: ['الرسالة', 'كتابة فقرة منظمة', 'تلخيص نص قصير', 'الوصف', 'السرد'] },
    { title: 'المراجعة والتقويم (Revision and assessment SSS2 Term 1)', description: 'Revision and assessment.', order: 40, subtopics: ['تعبير', 'مراجعة الفصل', 'اختبار', 'قواعد وصرف', 'قراءة وفهم'] },
    // SSS 2 Term 2
    { title: 'اللغة العربية في المجتمع (Arabic language in society)', description: 'Arabic language in society.', order: 41, subtopics: ['العربية والثقافة', 'أهمية العربية', 'التنوع اللغوي والتواصل', 'العربية والتعليم', 'العربية والإعلام'] },
    { title: 'الأدب العربي الحديث (Modern Arabic literature)', description: 'Modern Arabic literature.', order: 42, subtopics: ['موضوعات الأدب الحديث', 'مفهوم الأدب الحديث', 'قراءة وتحليل نصوص', 'الشعر الحديث', 'النثر والقصة'] },
    { title: 'الأدب العربي القديم (Classical Arabic literature)', description: 'Classical Arabic literature.', order: 43, subtopics: ['العصر العباسي', 'الشعر الجاهلي', 'مختارات مناسبة للمستوى', 'صدر الإسلام', 'العصر الأموي'] },
    { title: 'البلاغة وتحليل النص (Rhetoric and text analysis)', description: 'Rhetoric and text analysis.', order: 44, subtopics: ['الخبر والإنشاء', 'التشبيه والاستعارة', 'تحليل الأسلوب', 'الكناية', 'المحسنات البديعية'] },
    { title: 'الترجمة المتقدمة (Advanced translation)', description: 'Advanced translation.', order: 45, subtopics: ['تجنب الترجمة الحرفية الخاطئة', 'ترجمة الفقرات', 'مراجعة الترجمة', 'ترجمة المصطلحات', 'المعنى والسياق'] },
    { title: 'الكتابة الوظيفية (Functional writing)', description: 'Functional writing.', order: 46, subtopics: ['الطلبات والشكاوى', 'الرسائل الرسمية', 'السيرة الذاتية', 'التقارير', 'الملخص', 'المقالات'] },
    { title: 'المحادثة والعرض (Conversation and presentation)', description: 'Conversation and presentation.', order: 47, subtopics: ['الحوار الرسمي', 'إعداد عرض شفوي', 'التحدث بطلاقة', 'إبداء الرأي بالحجة', 'المناقشة'] },
    { title: 'الثقافة والحضارة العربية والإسلامية (Arabic/Islamic culture and civilization)', description: 'Arabic/Islamic culture and civilization.', order: 48, subtopics: ['الفنون والعمارة', 'المؤسسات العلمية', 'أثر الحضارة في العالم', 'العلوم عند العلماء المسلمين', 'المكتبات والترجمة'] },
    { title: 'القراءة والتحضير للامتحان (Reading and exam preparation)', description: 'Reading and exam preparation.', order: 49, subtopics: ['التعبير والترجمة', 'حل نصوص متنوعة', 'التدريب على أسئلة الامتحان', 'أسئلة الفهم', 'التحليل اللغوي'] },
    { title: 'المراجعة والتقويم (Revision and assessment SSS2 Term 2)', description: 'Revision and assessment.', order: 50, subtopics: ['ترجمة وتعبير', 'مراجعة شاملة', 'اختبار', 'نحو وصرف وبلاغة', 'أدب ونصوص'] },
    // SSS 2 Term 3
    { title: 'الإعلام والاتصال (Media and communication)', description: 'Media and communication.', order: 51, subtopics: ['الخبر والمعلومة', 'الصحافة', 'التعبير الإعلامي', 'الإذاعة والتلفاز', 'وسائل التواصل'] },
    { title: 'الثقافة والتراث العربي (Arabic culture and heritage)', description: 'Arabic culture and heritage.', order: 52, subtopics: ['الأمثال والحكم', 'العادات والتقاليد', 'احترام التنوع الثقافي', 'التراث الإسلامي والعربي', 'المتاحف والمواقع التاريخية'] },
    { title: 'النحو المتقدم (Advanced syntax)', description: 'Advanced syntax.', order: 53, subtopics: ['لا النافية للجنس', 'إن وأخواتها', 'التطبيق الإعرابي', 'كان وأخواتها', 'ظن وأخواتها'] },
    { title: 'الاستثناء والمنادى (Vocative and exception)', description: 'Vocative and exception.', order: 54, subtopics: ['المستثنى والمستثنى منه', 'أدوات النداء', 'التطبيق', 'أنواع المنادى', 'الاستثناء بإلا'] },
    { title: 'اسم التفضيل والتعجب (Elative and exclamation)', description: 'Elative and exclamation.', order: 55, subtopics: ['ما أفعل وأفعل به', 'صيغ اسم التفضيل', 'تطبيقات', 'استخدام أفعل التفضيل', 'أسلوب التعجب'] },
    { title: 'أساليب عربية (Arabic styles)', description: 'Arabic styles.', order: 56, subtopics: ['الأمر', 'الاستفهام', 'النداء', 'النفي', 'التعجب', 'النهي'] },
    { title: 'القراءة المتقدمة (Advanced reading)', description: 'Advanced reading.', order: 57, subtopics: ['الاستنتاج والنقد', 'نصوص طوال', 'التلخيص', 'تحليل الأفكار', 'المفردات والأساليب'] },
    { title: 'الكتابة الوظيفية (Functional writing Term 3)', description: 'Functional writing.', order: 58, subtopics: ['التقرير القصير', 'الرسالة الرسمية', 'السيرة الذاتية المبسطة', 'الطلب', 'الإعلان'] },
    { title: 'الترجمة والتعبير (Translation and expression)', description: 'Translation and expression.', order: 59, subtopics: ['كتابة موضوع منظم', 'ترجمة فقرات قصيرة', 'المراجعة والتحرير', 'إعادة صياغة النصوص'] },
    { title: 'المراجعة والاختبار (Revision and examination SSS2 Term 3)', description: 'Revision and examination.', order: 60, subtopics: ['ترجمة وتعبير', 'مراجعة جميع المهارات', 'اختبار نهاية العام', 'نحو وصرف', 'أدب وقراءة'] },
    // SSS 3 Term 1
    { title: 'مراجعة شاملة للنحو والصرف (Comprehensive grammar & morphology review)', description: 'Comprehensive grammar & morphology review.', order: 61, subtopics: ['المشتقات', 'الجملة الاسمية والفعلية', 'الأساليب النحوية', 'المرفوعات والمنصوبات والمجرورات', 'الأفعال وتصريفها'] },
    { title: 'المشتقات (Derivatives)', description: 'Derivatives.', order: 62, subtopics: ['الصفة المشبهة', 'اسم الفاعل', 'اسم الزمان والمكان', 'اسم المفعول', 'اسم الآلة', 'صيغ المبالغة'] },
    { title: 'الأفعال وتصريفها (Verbs and conjugation)', description: 'Verbs and conjugation.', order: 63, subtopics: ['الأفعال الخمسة', 'الأفعال الصحيحة والمعتلة', 'التطبيق الصرفي', 'المجرد والمزيد', 'تصريف الماضي والمضارع والأمر'] },
    { title: 'الممنوع من الصرف (Diptotes)', description: 'Diptotes.', order: 64, subtopics: ['أمثلة تطبيقية', 'معنى الممنوع من الصرف', 'التدريب على الإعراب', 'أهم أسبابه', 'علامات إعرابه'] },
    { title: 'العدد والمعدود (Number and counted)', description: 'Number and counted.', order: 65, subtopics: ['العقود والمئات', 'الأعداد الأساسية', 'التطبيق في التعبير', 'المطابقة والمخالفة', 'أحكام العدد'] },
    { title: 'النصوص الأدبية (Literary texts)', description: 'Literary texts.', order: 66, subtopics: ['الصور البلاغية', 'نصوص شعرية', 'الأساليب الأدبية', 'نصوص نثرية', 'القيم والدلالات', 'الفكرة والعاطفة'] },
    { title: 'البلاغة العربية (Arabic rhetoric)', description: 'Arabic rhetoric.', order: 67, subtopics: ['الطباق والمقابلة', 'التشبيه', 'الجناس', 'الاستعارة', 'التطبيق على النصوص', 'الكناية'] },
    { title: 'القراءة النقدية (Critical reading)', description: 'Critical reading.', order: 68, subtopics: ['الاستنتاج', 'فهم النص', 'التلخيص والنقد', 'تحليل الحجة والفكرة', 'المفردات في السياق'] },
    { title: 'التعبير الكتابي (Written expression SSS3)', description: 'Written expression.', order: 69, subtopics: ['الحوار', 'المقال', 'الرسالة والتقرير', 'الوصف', 'تنظيم الفقرات', 'السرد'] },
    { title: 'المراجعة والتقويم (Revision and assessment SSS3 Term 1)', description: 'Revision and assessment.', order: 70, subtopics: ['تعبير', 'مراجعة الفصل', 'اختبار', 'تطبيقات نحوية وصرفية', 'تحليل نصوص'] },
    // SSS 3 Term 2
    { title: 'اللغة العربية في المجتمع (Arabic language in society SSS3)', description: 'Arabic language in society.', order: 71, subtopics: ['العربية والثقافة', 'أهمية العربية', 'التنوع اللغوي والتواصل', 'العربية والتعليم', 'العربية والإعلام'] },
    { title: 'الأدب العربي الحديث (Modern Arabic literature SSS3)', description: 'Modern Arabic literature.', order: 72, subtopics: ['موضوعات الأدب الحديث', 'مفهوم الأدب الحديث', 'قراءة وتحليل نصوص', 'الشعر الحديث', 'النثر والقصة'] },
    { title: 'الأدب العربي القديم (Classical Arabic literature SSS3)', description: 'Classical Arabic literature.', order: 73, subtopics: ['العصر العباسي', 'الشعر الجاهلي', 'مختارات مناسبة للمستوى', 'صدر الإسلام', 'العصر الأموي'] },
    { title: 'البلاغة وتحليل النص (Rhetoric and text analysis SSS3)', description: 'Rhetoric and text analysis.', order: 74, subtopics: ['الخبر والإنشاء', 'التشبيه والاستعارة', 'تحليل الأسلوب', 'الكناية', 'المحسنات البديعية'] },
    { title: 'الترجمة المتقدمة (Advanced translation SSS3)', description: 'Advanced translation.', order: 75, subtopics: ['تجنب الترجمة الحرفية الخاطئة', 'ترجمة الفقرات', 'مراجعة الترجمة', 'ترجمة المصطلحات', 'المعنى والسياق'] },
    { title: 'الكتابة الوظيفية (Functional writing SSS3)', description: 'Functional writing.', order: 76, subtopics: ['الطلبات والشكاوى', 'الرسائل الرسمية', 'السيرة الذاتية', 'التقارير', 'الملخص', 'المقالات'] },
    { title: 'المحادثة والعرض (Conversation and presentation SSS3)', description: 'Conversation and presentation.', order: 77, subtopics: ['الحوار الرسمي', 'إعداد عرض شفوي', 'التحدث بطلاقة', 'إبداء الرأي بالحجة', 'المناقشة'] },
    { title: 'الثقافة والحضارة العربية والإسلامية (Arabic/Islamic culture SSS3)', description: 'Arabic/Islamic culture and civilization.', order: 78, subtopics: ['الفنون والعمارة', 'المؤسسات العلمية', 'أثر الحضارة في العالم', 'العلوم عند العلماء المسلمين', 'المكتبات والترجمة'] },
    { title: 'القراءة والتحضير للامتحان (Reading and exam preparation SSS3)', description: 'Reading and exam preparation.', order: 79, subtopics: ['التعبير والترجمة', 'حل نصوص متنوعة', 'التدريب على أسئلة الامتحان', 'أسئلة الفهم', 'التحليل اللغوي'] },
    { title: 'المراجعة والتقويم (Revision and assessment SSS3 Term 2)', description: 'Revision and assessment.', order: 80, subtopics: ['ترجمة وتعبير', 'مراجعة شاملة', 'اختبار', 'نحو وصرف وبلاغة', 'أدب ونصوص'] },
    // SSS 3 Term 3
    { title: 'المراجعة النهائية للنحو (Final syntax review)', description: 'Final syntax review.', order: 81, subtopics: ['الأساليب', 'جميع أبواب النحو المقررة', 'التطبيق المكثف', 'الإعراب', 'الأفعال والمشتقات'] },
    { title: 'المراجعة النهائية للصرف (Final morphology review)', description: 'Final morphology review.', order: 82, subtopics: ['الإعلال والإبدال بصورة مناسبة للمستوى', 'الأوزان', 'التطبيق', 'تصريف الأفعال', 'المشتقات'] },
    { title: 'مراجعة الأدب والنصوص (Literature and texts review)', description: 'Literature and texts review.', order: 83, subtopics: ['تحليل النص', 'العصور الأدبية', 'القيم والمعاني', 'الأغراض الشعرية', 'النثر'] },
    { title: 'مراجعة البلاغة (Rhetoric review)', description: 'Rhetoric review.', order: 84, subtopics: ['المحسنات', 'التشبيه', 'الخبر والإنشاء', 'الاستعارة', 'تطبيقات امتحانية', 'الكناية'] },
    { title: 'مراجعة القراءة والفهم (Reading and comprehension review)', description: 'Reading and comprehension review.', order: 85, subtopics: ['الاستنتاج', 'نصوص جديدة', 'التلخيص', 'تحديد الفكرة الرئيسية', 'معاني المفردات'] },
    { title: 'مراجعة الترجمة (Translation review)', description: 'Translation review.', order: 86, subtopics: ['السياق', 'العربية إلى الإنجليزية', 'تحرير الترجمة', 'الإنجليزية إلى العربية', 'المفردات والمصطلحات'] },
    { title: 'مراجعة التعبير (Expression review)', description: 'Expression review.', order: 87, subtopics: ['الوصف والسرد', 'المقال', 'تنظيم الإجابة', 'الرسالة', 'التصحيح والتحرير', 'التقرير'] },
    { title: 'التدريب على الامتحان (Exam practice)', description: 'Exam practice.', order: 88, subtopics: ['نصوص وترجمة', 'أسئلة موضوعية', 'إدارة الوقت', 'أسئلة مقالية', 'إعراب وتحليل'] },
    { title: 'مشروع اللغة العربية والتقويم النهائي (Arabic language project and final assessment)', description: 'Arabic language project and final assessment.', order: 89, subtopics: ['ملف إنجاز', 'بحث أو عرض عربي', 'مراجعة ختامية وامتحان', 'قراءة شفوية', 'تقييم الكتابة'] }
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
