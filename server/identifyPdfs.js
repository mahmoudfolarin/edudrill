const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const userUploadsDir = 'C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\1b370a40-af59-4ef6-be24-829ac475f47f\\.user_uploaded';

async function identifyPdfs() {
  const files = fs.readdirSync(userUploadsDir).filter(f => f.endsWith('.pdf'));
  for (const file of files) {
    const pdfPath = path.join(userUploadsDir, file);
    try {
      const dataBuffer = fs.readFileSync(pdfPath);
      const data = await pdf(dataBuffer);
      const firstLine = data.text.match(/([^\n]+)/)[1].trim();
      console.log(`[${file}] First line: ${firstLine}`);
    } catch (err) {
      console.error(`[${file}] Error: ${err.message}`);
    }
  }
}

identifyPdfs();
