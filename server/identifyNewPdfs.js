const fs = require('fs');
const pdf = require('pdf-parse');

const files = [
  'media_1790730991922.pdf',
  'media_1790730992057.pdf',
  'media_1790730992144.pdf',
  'media_1790730992213.pdf',
  'media_1790730992490.pdf'
];
const dir = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\1b370a40-af59-4ef6-be24-829ac475f47f\\.user_uploaded';

async function identify() {
  for (const file of files) {
    const dataBuffer = fs.readFileSync(`${dir}\\${file}`);
    try {
      const data = await pdf(dataBuffer);
      console.log(`\n\n--- FILE: ${file} ---`);
      console.log(data.text.substring(0, 300).trim().replace(/\n/g, ' '));
    } catch (e) {
      console.error(`Error reading ${file}`, e);
    }
  }
}
identify();
