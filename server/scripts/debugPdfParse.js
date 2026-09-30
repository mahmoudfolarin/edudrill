const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const userUploadedDir = path.join('C:', 'Users', 'USER', '.gemini', 'antigravity-ide', 'brain', '1b370a40-af59-4ef6-be24-829ac475f47f', '.user_uploaded');
const filePath = path.join(userUploadedDir, 'media_1790688382420.pdf');

async function main() {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdfParse(dataBuffer);
  fs.writeFileSync('debug_pdf_text.txt', data.text);
  console.log('Saved to debug_pdf_text.txt');
}

main();
