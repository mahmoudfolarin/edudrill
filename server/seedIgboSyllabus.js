require('dotenv').config();
const pool = require('./src/config/database');

const syllabus = {
  exam: 'WAEC',
  subject: 'igbo', // MUST MATCH slug in DB
  syllabus_year: '2026/2027',
  title: 'Igbo Comprehensive Syllabus',
  description: 'Aligned with Nigerian Senior Secondary School teaching and examination preparation.',
  topics: [
    // SSS 1 First Term
    { title: 'Okwu Mmalite Asụsụ Igbo', description: 'Nkọwa asụsụ Igbo, mkpa asụsụ Igbo.', order: 1, subtopics: ['Nkọwa asụsụ Igbo', 'Mkpa asụsụ Igbo', 'Ụdị asụsụ na ojiji ya', 'Igbo dị ka asụsụ nkwukọrịta', 'Ịgụ na ide Igbo nke ọma'] },
    { title: 'Ụda Asụsụ na Mkpụrụedemede', description: 'Ụdaume, mgbochiume, mkpụrụedemede Igbo.', order: 2, subtopics: ['Ụdaume', 'Mgbochiume', 'Mkpụrụedemede Igbo', 'Ụda na mgbanwe ụda', 'Ịkpọ okwu nke ọma'] },
    { title: 'Ụdị Okwu', description: 'Aha, ngwaa, ọnụọgụ, njikọ okwu.', order: 3, subtopics: ['Aha', 'Ngwaa', 'Nkọwa aha', 'Nnọchi aha', 'Ọnụọgụ', 'Njikọ okwu', 'Nkọwa ngwaa'] },
    { title: 'Ahịrịokwu', description: 'Nkọwa ahịrịokwu, ahịrịokwu dị mfe.', order: 4, subtopics: ['Nkọwa ahịrịokwu', 'Ahịrịokwu dị mfe', 'Ahịrịokwu jikọtara ọnụ', 'Ahịrịokwu dị mgbagwoju anya', 'Ịmepụta ahịrịokwu ziri ezi'] },
    { title: 'Oge Ngwaa', description: 'Oge gara aga, oge ugbu a, oge na-abịa.', order: 5, subtopics: ['Oge gara aga', 'Oge ugbu a', 'Oge na-abịa', 'Mgbanwe ngwaa', 'Ojiji ngwaa n’ahịrịokwu'] },
    { title: 'Ọnụọgụ na Ọtụtụ', description: 'Ọnụọgụ Igbo, otu na ọtụtụ.', order: 6, subtopics: ['Ọnụọgụ Igbo', 'Otu na ọtụtụ', 'Ụdị ọtụtụ aha', 'Iji ọnụọgụ eme ihe', 'Omume ide na ịgụ'] },
    { title: 'Ederede Nkọwa', description: 'Nkọwa mmadụ, nkọwa ebe, nkọwa ihe.', order: 7, subtopics: ['Nkọwa mmadụ', 'Nkọwa ebe', 'Nkọwa ihe', 'Nhazi paragraf', 'Ide ederede zuru oke'] },
    { title: 'Akwụkwọ ozi', description: 'Akwụkwọ ozi onwe, akwụkwọ ozi gọọmentị.', order: 8, subtopics: ['Akwụkwọ ozi onwe', 'Akwụkwọ ozi gọọmentị', 'Akụkụ akwụkwọ ozi', 'Ekele na mmechi', 'Omume ide akwụkwọ ozi'] },
    { title: 'Ịgụ na Nghọta', description: 'Ịgụ ederede, ịghọta okwu ọhụrụ.', order: 9, subtopics: ['Ịgụ ederede', 'Ịghọta okwu ọhụrụ', 'Ịza ajụjụ', 'Ịchọta isiokwu', 'Ịkọwa echiche onye dere'] },
    { title: 'Ọdịnala na Akụkọ Ọnụ', description: 'Ilu, akụkọ ifo, akụkọ ọdịnala.', order: 10, subtopics: ['Ilu', 'Akụkọ ifo', 'Akụkọ ọdịnala', 'Abụ ọnụ', 'Egwu na egwuregwu ọdịnala'] },
    { title: 'Ntụle na Nnwale (SSS 1 Term 1)', description: 'Ntụle isiokwu, omume ụtọ asụsụ.', order: 11, subtopics: ['Ntụle isiokwu', 'Omume ụtọ asụsụ', 'Ịgụ na ide', 'Nnwale okwu', 'Ntụle njedebe oge'] },
    // SSS 1 Second Term
    { title: 'Ntụle Ụtọ Asụsụ', description: 'Ntụle aha, ngwaa, nnọchi aha.', order: 12, subtopics: ['Ntụle aha', 'Ngwaa', 'Nkọwa aha', 'Nnọchi aha', 'Ahịrịokwu'] },
    { title: 'Ilu na Akụkọ Ifo', description: 'Nkọwa ilu, ihe ilu pụtara.', order: 13, subtopics: ['Nkọwa ilu', 'Ihe ilu pụtara', 'Ojiji ilu', 'Akụkọ ifo', 'Ihe mmụta sitere n’akụkọ'] },
    { title: 'Ederede na Akwụkwọ Ozi', description: 'Akwụkwọ ozi onwe, akwụkwọ ozi gọọmentị.', order: 14, subtopics: ['Akwụkwọ ozi onwe', 'Akwụkwọ ozi gọọmentị', 'Ederede nkọwa', 'Ederede akụkọ', 'Nhazi ederede'] },
    { title: 'Ntụgharị Asụsụ', description: 'Nkọwa ntụgharị asụsụ, Igbo gaa Bekee.', order: 15, subtopics: ['Nkọwa ntụgharị asụsụ', 'Igbo gaa Bekee', 'Bekee gaa Igbo', 'Okwu nwere ọtụtụ ihe ọ pụtara', 'Nsogbu ntụgharị asụsụ'] },
    { title: 'Omenala Ndị Igbo', description: 'Ekele, ịkwanyere ndị okenye ùgwù.', order: 16, subtopics: ['Ekele', 'Ịkwanyere ndị okenye ùgwù', 'Alụmdi na nwunye', 'Ịzụ ụmụ', 'Ndị ikwu na mmekọrịta'] },
    { title: 'Emume na Emume Omenala', description: 'Emume ọmụmụ, alụmdi na nwunye.', order: 17, subtopics: ['Emume ọmụmụ', 'Alụmdi na nwunye', 'Olili ozu', 'Emume owuwe ihe ubi', 'Emume obodo'] },
    { title: 'Ịgụ na Nghọta (SSS 1 Term 2)', description: 'Ịgụ ederede, okwu ọhụrụ.', order: 18, subtopics: ['Ịgụ ederede', 'Okwu ọhụrụ', 'Isiokwu', 'Ajụjụ nghọta', 'Nchịkọta'] },
    { title: 'Mkparịta ụka na Okwu Ọnụ', description: 'Mkparịta ụka, ajụjụ na azịza.', order: 19, subtopics: ['Mkparịta ụka', 'Ajụjụ na azịza', 'Ikwu okwu n’ihu mmadụ', 'Ịkpọ okwu nke ọma', 'Nkwukọrịta'] },
    { title: 'Akụkọ Ọnụ', description: 'Ilu, akụkọ ifo, akụkọ ndị nna ochie.', order: 20, subtopics: ['Ilu', 'Akụkọ ifo', 'Akụkọ ndị nna ochie', 'Abụ', 'Egwu ọdịnala'] },
    { title: 'Ntụle na Nnwale (SSS 1 Term 2)', description: 'Ntụle, omume ntụgharị.', order: 21, subtopics: ['Ntụle', 'Omume ntụgharị', 'Ederede', 'Omenala', 'Nnwale njedebe oge'] },
    // SSS 1 Third Term
    { title: 'Akwụkwọ Agụmagụ', description: 'Nkọwa agụmagụ, agụmagụ ọnụ.', order: 22, subtopics: ['Nkọwa agụmagụ', 'Agụmagụ ọnụ', 'Agụmagụ ederede', 'Mkpa agụmagụ', 'Ụdị agụmagụ'] },
    { title: 'Abụ', description: 'Nkọwa abụ, isiokwu, ụda na usoro.', order: 23, subtopics: ['Nkọwa abụ', 'Isiokwu', 'Ụda na usoro', 'Okwu nka', 'Ihe mmụta'] },
    { title: 'Ejije', description: 'Nkọwa ejije, ndị agwa, isiokwu.', order: 24, subtopics: ['Nkọwa ejije', 'Ndị agwa', 'Isiokwu', 'Atụmatụ akụkọ', 'Asụsụ ejije'] },
    { title: 'Akwụkwọ Akụkọ', description: 'Nkọwa akụkọ, ndị agwa, ebe na oge.', order: 25, subtopics: ['Nkọwa akụkọ', 'Ndị agwa', 'Ebe na oge', 'Isiokwu', 'Ụdị ide akụkọ'] },
    { title: 'Ilu na Okwu Amamihe', description: 'Ilu, okwu amamihe, ihe ha pụtara.', order: 26, subtopics: ['Ilu', 'Okwu amamihe', 'Ihe ha pụtara', 'Ojiji n’ahịrịokwu', 'Ọrụ ha n’obodo'] },
    { title: 'Ntụgharị Asụsụ (SSS 1 Term 3)', description: 'Ntụgharị okwu, ntụgharị ahịrịokwu.', order: 27, subtopics: ['Ntụgharị okwu', 'Ntụgharị ahịrịokwu', 'Ntụgharị paragraf', 'Igbo na Bekee', 'Omume ntụgharị'] },
    { title: 'Ederede (SSS 1 Term 3)', description: 'Akụkọ, nkọwa, akwụkwọ ozi.', order: 28, subtopics: ['Akụkọ', 'Nkọwa', 'Akwụkwọ ozi', 'Ederede arụmụka', 'Ndozi njehie'] },
    { title: 'Omenala Igbo', description: 'Nri, uwe, ọrụ aka, azụmahịa.', order: 29, subtopics: ['Nri', 'Uwe', 'Ọrụ aka', 'Azụmahịa', 'Egwu na ịgba egwu'] },
    { title: 'Ịgụ na Nghọta (SSS 1 Term 3)', description: 'Ịgụ nke ọma, ịghọta isiokwu.', order: 30, subtopics: ['Ịgụ nke ọma', 'Ịghọta isiokwu', 'Okwu ọhụrụ', 'Ịza ajụjụ', 'Nchịkọta'] },
    { title: 'Ntụle na Nnwale (SSS 1 Term 3)', description: 'Ntụle zuru oke, agụmagụ, ụtọ asụsụ.', order: 31, subtopics: ['Ntụle zuru oke', 'Agụmagụ', 'Ụtọ asụsụ', 'Ederede', 'Nnwale'] },
    // SSS 2 First Term
    { title: 'Ntụle SSS1', description: 'Ụda asụsụ, ụdị okwu, ahịrịokwu.', order: 32, subtopics: ['Ụda asụsụ', 'Ụdị okwu', 'Ahịrịokwu', 'Omenala', 'Agụmagụ'] },
    { title: 'Ụtọ Asụsụ Dị Elu', description: 'Aha na ụdị ya, ngwaa, nkọwa aha.', order: 33, subtopics: ['Aha na ụdị ya', 'Ngwaa', 'Nkọwa aha', 'Nnọchi aha', 'Njikọ okwu', 'Nhazi ahịrịokwu'] },
    { title: 'Ụdị Ahịrịokwu', description: 'Ahịrịokwu dị mfe, ahịrịokwu jikọtara ọnụ.', order: 34, subtopics: ['Ahịrịokwu dị mfe', 'Ahịrịokwu jikọtara ọnụ', 'Ahịrịokwu mgbagwoju anya', 'Njikọ ahịrịokwu', 'Ndozi njehie'] },
    { title: 'Okwu Ndị E Si N’Asụsụ Ọzọ Bịa', description: 'Okwu mbinye, ihe kpatara mbinye.', order: 35, subtopics: ['Okwu mbinye', 'Ihe kpatara mbinye', 'Okwu Bekee n’Igbo', 'Mgbanwe ụda', 'Ojiji okwu mbinye'] },
    { title: 'Ederede Arụmụka', description: 'Nkọwa arụmụka, isi okwu, ihe akaebe.', order: 36, subtopics: ['Nkọwa arụmụka', 'Isi okwu', 'Ihe akaebe', 'Nhazi paragraf', 'Mmechi'] },
    { title: 'Akwụkwọ Ozi na Akụkọ', description: 'Akwụkwọ ozi gọọmentị, akwụkwọ ozi onwe.', order: 37, subtopics: ['Akwụkwọ ozi gọọmentị', 'Akwụkwọ ozi onwe', 'Akụkọ', 'Nkwupụta', 'Nhazi ederede'] },
    { title: 'Akụkọ Ọnụ (SSS 2 Term 1)', description: 'Ilu, akụkọ ifo, akụkọ akụkọ ihe mere eme.', order: 38, subtopics: ['Ilu', 'Akụkọ ifo', 'Akụkọ akụkọ ihe mere eme', 'Abụ ọnụ', 'Egwu ọdịnala'] },
    { title: 'Agụmagụ Zuru Ezu', description: 'Isiokwu, ndị agwa, ụdị nka.', order: 39, subtopics: ['Isiokwu', 'Ndị agwa', 'Ụdị nka', 'Asụsụ', 'Ebe na oge', 'Ihe mmụta'] },
    { title: 'Ntụgharị Asụsụ (SSS 2 Term 1)', description: 'Igbo-Bekee, Bekee-Igbo, ntụgharị paragraf.', order: 40, subtopics: ['Igbo-Bekee', 'Bekee-Igbo', 'Ntụgharị paragraf', 'Okwu nwere nkọwa dị iche', 'Usoro ntụgharị'] },
    { title: 'Ịgụ na Nghọta (SSS 2 Term 1)', description: 'Ịgụ, nghọta, ịchọta ihe dị mkpa.', order: 41, subtopics: ['Ịgụ', 'Nghọta', 'Ịchọta ihe dị mkpa', 'Nchịkọta', 'Azịza ajụjụ'] },
    { title: 'Ntụle na Nnwale (SSS 2 Term 1)', description: 'Ntụle, omume, agụmagụ.', order: 42, subtopics: ['Ntụle', 'Omume', 'Agụmagụ', 'Ntụgharị', 'Nnwale'] },
    // SSS 2 Second Term
    { title: 'Abụ Igbo', description: 'Isiokwu, ụdị abụ, amụma na ụda.', order: 43, subtopics: ['Isiokwu', 'Ụdị abụ', 'Amụma na ụda', 'Okwu nka', 'Nkọwa abụ'] },
    { title: 'Ejije Igbo', description: 'Ndị agwa, isiokwu, atụmatụ.', order: 44, subtopics: ['Ndị agwa', 'Isiokwu', 'Atụmatụ', 'Asụsụ', 'Ihe mmụta', 'Nyocha ejije'] },
    { title: 'Akụkọ Igbo', description: 'Akụkọ ogologo, isiokwu, ndị agwa.', order: 45, subtopics: ['Akụkọ ogologo', 'Isiokwu', 'Ndị agwa', 'Ebe na oge', 'Ụdị akụkọ', 'Nyocha'] },
    { title: 'Ilu na Omenala', description: 'Ilu, okwu amamihe, omenala.', order: 46, subtopics: ['Ilu', 'Okwu amamihe', 'Omenala', 'Dịka e si eji ilu', 'Mkpa ilu'] },
    { title: 'Ụda Asụsụ Dị Elu', description: 'Ụdaume, mgbochiume, ụda olu.', order: 47, subtopics: ['Ụdaume', 'Mgbochiume', 'Ụda olu', 'Mgbakwunye ụda', 'Ịkpọ okwu'] },
    { title: 'Okwu na Nsụpe', description: 'Nsụpe ziri ezi, mkpụrụokwu.', order: 48, subtopics: ['Nsụpe ziri ezi', 'Mkpụrụokwu', 'Okwu mgbagwoju anya', 'Ndozi njehie', 'Omume ide'] },
    { title: 'Ntụgharị Asụsụ Dị Elu', description: 'Ntụgharị echiche, ntụgharị ederede.', order: 49, subtopics: ['Ntụgharị echiche', 'Ntụgharị ederede', 'Igbo-Bekee', 'Bekee-Igbo', 'Ndozi ntụgharị'] },
    { title: 'Mkparịta ụka na Okwu Ọnụ (SSS 2 Term 2)', description: 'Mkparịta ụka, okwu ihu ọha, arụmụka.', order: 50, subtopics: ['Mkparịta ụka', 'Okwu ihu ọha', 'Arụmụka', 'Nkọwa echiche', 'Ụkpụrụ nkwukọrịta'] },
    { title: 'Omenala na Akụkọ Ndị Igbo', description: 'Mmalite obodo, ọchịchị ọdịnala, ọrụ aka.', order: 51, subtopics: ['Mmalite obodo', 'Ọchịchị ọdịnala', 'Ọrụ aka', 'Azụmahịa', 'Okpukpe ọdịnala'] },
    { title: 'Ntụle na Nnwale (SSS 2 Term 2)', description: 'Ntụle, agụmagụ, ụtọ asụsụ.', order: 52, subtopics: ['Ntụle', 'Agụmagụ', 'Ụtọ asụsụ', 'Ederede', 'Nnwale'] },
    // SSS 2 Third Term
    { title: 'Ụtọ Asụsụ Dị Elu (SSS 2 Term 3)', description: 'Ahịrịokwu, ngwaa, aha, nkọwa.', order: 53, subtopics: ['Ahịrịokwu', 'Ngwaa', 'Aha', 'Nkọwa', 'Njikọ', 'Nhazi okwu'] },
    { title: 'Nnọchi Aha na Njikọ Okwu', description: 'Ụdị nnọchi aha, ojiji nnọchi aha.', order: 54, subtopics: ['Ụdị nnọchi aha', 'Ojiji nnọchi aha', 'Njikọ okwu', 'Njikọ ahịrịokwu', 'Omume'] },
    { title: 'Nsụpe na Akara Edemede', description: 'Nsụpe, akara edemede, ndozi njehie.', order: 55, subtopics: ['Nsụpe', 'Akara edemede', 'Ndozi njehie', 'Nhazi paragraf', 'Ide nke ọma'] },
    { title: 'Agụmagụ Zube', description: 'Isiokwu, ndị agwa, salo.', order: 56, subtopics: ['Isiokwu', 'Ndị agwa', 'Salo', 'Atụmatụ', 'Asụsụ', 'Ihe mmụta'] },
    { title: 'Ejije na Abụ', description: 'Nyocha ejije, nyocha abụ, isiokwu.', order: 57, subtopics: ['Nyocha ejije', 'Nyocha abụ', 'Isiokwu', 'Salo', 'Okwu nka', 'Nkọwa'] },
    { title: 'Ntụgharị Asụsụ (SSS 2 Term 3)', description: 'Ntụgharị okwu, ntụgharị ahịrịokwu.', order: 58, subtopics: ['Ntụgharị okwu', 'Ntụgharị ahịrịokwu', 'Ntụgharị paragraf', 'Nkọwa gburugburu', 'Omume'] },
    { title: 'Ederede Ndụ na Akụkọ', description: 'Akụkọ ndụ mmadụ, akụkọ ihe mere eme.', order: 59, subtopics: ['Akụkọ ndụ mmadụ', 'Akụkọ ihe mere eme', 'Ederede nkọwa', 'Ederede arụmụka', 'Nhazi'] },
    { title: 'Omenala na Obodo', description: 'Ọchịchị ọdịnala, eze na ndị isi, emume.', order: 60, subtopics: ['Ọchịchị ọdịnala', 'Eze na ndị isi', 'Emume', 'Nri', 'Uwe', 'Ọrụ aka'] },
    { title: 'Ịgụ na Nghọta (SSS 2 Term 3)', description: 'Ịgụ, isiokwu, okwu ọhụrụ.', order: 61, subtopics: ['Ịgụ', 'Isiokwu', 'Okwu ọhụrụ', 'Ajụjụ', 'Nchịkọta'] },
    { title: 'Ntụle na Nnwale (SSS 2 Term 3)', description: 'Ntụle zuru oke, past questions.', order: 62, subtopics: ['Ntụle zuru oke', 'Past questions', 'Agụmagụ', 'Ntụgharị', 'Nnwale'] },
    // SSS 3 First Term
    { title: 'Ntụle Zuru Oke', description: 'Ụda asụsụ, ụtọ asụsụ, agụmagụ.', order: 63, subtopics: ['Ụda asụsụ', 'Ụtọ asụsụ', 'Agụmagụ', 'Ederede', 'Ntụgharị'] },
    { title: 'Nyocha Akwụkwọ Akụkọ', description: 'Isiokwu, ndị agwa, atụmatụ.', order: 64, subtopics: ['Isiokwu', 'Ndị agwa', 'Atụmatụ', 'Salo', 'Asụsụ', 'Ihe mmụta'] },
    { title: 'Nyocha Ejije', description: 'Isiokwu, ndị agwa, zube.', order: 65, subtopics: ['Isiokwu', 'Ndị agwa', 'Zube', 'Salo', 'Asụsụ', 'Ihe mmụta'] },
    { title: 'Nyocha Abụ', description: 'Isiokwu, amụma, ụda.', order: 66, subtopics: ['Isiokwu', 'Amụma', 'Ụda', 'Okwu nka', 'Salo', 'Nkọwa'] },
    { title: 'Ilu na Omenala (SSS 3 Term 1)', description: 'Ilu, okwu amamihe, omenala.', order: 67, subtopics: ['Ilu', 'Okwu amamihe', 'Omenala', 'Mkpa ha', 'Ojiji n’ederede'] },
    { title: 'Omenala Ndị Igbo (SSS 3)', description: 'Alụmdi na nwunye, olili ozu, emume.', order: 68, subtopics: ['Alụmdi na nwunye', 'Olili ozu', 'Emume', 'Ọchịchị ọdịnala', 'Nri na uwe'] },
    { title: 'Ederede Arụmụka (SSS 3)', description: 'Isi okwu, ihe akaebe, nhazi echiche.', order: 69, subtopics: ['Isi okwu', 'Ihe akaebe', 'Nhazi echiche', 'Paragraf', 'Mmechi'] },
    { title: 'Akwụkwọ Ozi na Rahoto', description: 'Akwụkwọ ozi gọọmentị, akwụkwọ ozi onwe.', order: 70, subtopics: ['Akwụkwọ ozi gọọmentị', 'Akwụkwọ ozi onwe', 'Rahoto', 'Nkwupụta', 'Ndozi ederede'] },
    { title: 'Ntụgharị Asụsụ (SSS 3 Term 1)', description: 'Igbo-Bekee, Bekee-Igbo, ntụgharị paragraf.', order: 71, subtopics: ['Igbo-Bekee', 'Bekee-Igbo', 'Ntụgharị paragraf', 'Okwu siri ike', 'Omume'] },
    { title: 'Ntụle na Nnwale (SSS 3 Term 1)', description: 'Past questions, agụmagụ, ụtọ asụsụ.', order: 72, subtopics: ['Past questions', 'Agụmagụ', 'Ụtọ asụsụ', 'Ederede', 'Nnwale'] },
    // SSS 3 Second Term
    { title: 'Ntụle Ụtọ Asụsụ (SSS 3)', description: 'Ụdị okwu, ahịrịokwu, ngwaa.', order: 73, subtopics: ['Ụdị okwu', 'Ahịrịokwu', 'Ngwaa', 'Aha', 'Nnọchi aha', 'Nsụpe'] },
    { title: 'Ntụle Agụmagụ', description: 'Akụkọ, ejije, abụ.', order: 74, subtopics: ['Akụkọ', 'Ejije', 'Abụ', 'Akụkọ ọnụ', 'Ilu'] },
    { title: 'Ntụle Ederede', description: 'Akụkọ, nkọwa, arụmụka.', order: 75, subtopics: ['Akụkọ', 'Nkọwa', 'Arụmụka', 'Akwụkwọ ozi', 'Rahoto'] },
    { title: 'Ntụle Ntụgharị', description: 'Igbo-Bekee, Bekee-Igbo, ntụgharị echiche.', order: 76, subtopics: ['Igbo-Bekee', 'Bekee-Igbo', 'Ntụgharị echiche', 'Ntụgharị ederede', 'Ndozi'] },
    { title: 'Okwu Ọnụ na Mkparịta ụka', description: 'Okwu ihu ọha, mkparịta ụka, arụmụka.', order: 77, subtopics: ['Okwu ihu ọha', 'Mkparịta ụka', 'Arụmụka', 'Nkọwa', 'Ịkpọ okwu'] },
    { title: 'Akụkọ Ihe Mere Eme na Omenala', description: 'Mmalite ndị Igbo, obodo na ọchịchị.', order: 78, subtopics: ['Mmalite ndị Igbo', 'Obodo na ọchịchị', 'Ọrụ aka', 'Azụmahịa', 'Omenala'] },
    { title: 'Nsụpe na Akara Edemede (SSS 3)', description: 'Nsụpe, akara edemede.', order: 79, subtopics: ['Nsụpe', 'Akara edemede', 'Ndozi njehie', 'Omume ide'] },
    { title: 'Ịgụ na Nghọta (SSS 3)', description: 'Isiokwu, okwu ọhụrụ, ciro ozi.', order: 80, subtopics: ['Isiokwu', 'Okwu ọhụrụ', 'Ciro ozi', 'Nchịkọta', 'Ajụjụ'] },
    { title: 'Nkwadebe SSCE', description: 'Objective questions, theory questions.', order: 81, subtopics: ['Objective questions', 'Theory questions', 'Agụmagụ questions', 'Ntụgharị', 'Time management'] },
    { title: 'Mock Examination', description: 'Nnwale zuru oke, ndozi njehie.', order: 82, subtopics: ['Nnwale zuru oke', 'Ndozi njehie', 'Ntụle ebe adịghị ike', 'Nkwadebe ikpeazụ'] },
    // SSS 3 Third Term
    { title: 'Ntụle Ikpeazụ Ụtọ Asụsụ', description: 'Ụdị okwu, ahịrịokwu, ngwaa.', order: 83, subtopics: ['Ụdị okwu', 'Ahịrịokwu', 'Ngwaa', 'Aha', 'Nnọchi aha', 'Nsụpe'] },
    { title: 'Ntụle Ikpeazụ Agụmagụ', description: 'Akụkọ, ejije, abụ.', order: 84, subtopics: ['Akụkọ', 'Ejije', 'Abụ', 'Akụkọ ọnụ', 'Ilu'] },
    { title: 'Ntụle Ikpeazụ Ederede', description: 'Akụkọ, nkọwa, arụmụka.', order: 85, subtopics: ['Akụkọ', 'Nkọwa', 'Arụmụka', 'Akwụkwọ ozi', 'Rahoto'] },
    { title: 'Ntụle Ikpeazụ Ntụgharị', description: 'Igbo-Bekee, Bekee-Igbo, okwu na nkọwa.', order: 86, subtopics: ['Igbo-Bekee', 'Bekee-Igbo', 'Okwu na nkọwa', 'Paragraf', 'Omume'] },
    { title: 'Omenala na Asụsụ', description: 'Ọdịnala, emume, ọchịchị.', order: 87, subtopics: ['Ọdịnala', 'Emume', 'Ọchịchị', 'Nri', 'Uwe', 'Egwu'] },
    { title: 'Nkwadebe Ule', description: 'Ajụjụ nhọrọ, ajụjụ ederede, nyocha agụmagụ.', order: 88, subtopics: ['Ajụjụ nhọrọ', 'Ajụjụ ederede', 'Nyocha agụmagụ', 'Ntụgharị', 'Ịgụ na nghọta'] },
    { title: 'Past Questions', description: 'Ịza ajụjụ, nyocha azịza.', order: 89, subtopics: ['Ịza ajụjụ', 'Nyocha azịza', 'Ndozi njehie', 'Ijikwa oge'] },
    { title: 'Mock Examination (SSS 3 Term 3)', description: 'Nnwale zuru oke, ndozi.', order: 90, subtopics: ['Nnwale zuru oke', 'Ndozi', 'Ntụle', 'Omume ọzọ'] },
    { title: 'Nkwadebe Ikpeazụ', description: 'Ntụle isiokwu niile, oral practice.', order: 91, subtopics: ['Ntụle isiokwu niile', 'Oral practice', 'Writing practice', 'Literature practice'] },
    { title: 'Ntụle Njedebe', description: 'Ntụle zuru oke, nkwadebe SSCE.', order: 92, subtopics: ['Ntụle zuru oke', 'Nkwadebe SSCE', 'Nchịkọta ọmụmụ'] }
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
          [topicId, subStr, subSlug, `Learn about ${subStr}`, subOrder]
        );
        const subtopicId = subRes.rows[0].id;

        for (let i = 1; i <= 2; i++) {
          const lessonTitle = `Lesson ${i}: ${subStr}`;
          const lessonSlug = slugify(lessonTitle) + '-' + Math.floor(Math.random() * 100000);
          const lessonContent = `<div class="lesson-intro">
            <h2>Welcome to \${lessonTitle}</h2>
            <p>This is a comprehensive study module covering the concepts of <strong>\${subStr}</strong> within the topic of \${topic.title}.</p>
            <h3>Key Principles</h3>
            <ul>
              <li>Understand the fundamental rules and definitions of \${subStr}.</li>
              <li>Apply standard methodologies accurately.</li>
              <li>Practice solving related problems to build confidence.</li>
            </ul>
            <p>Make sure to take notes as you read through this module. At the end of the topic, you can test your knowledge using the Practice feature!</p>
          </div>`;

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
