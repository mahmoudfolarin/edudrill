const fs = require('fs');
const PDFParser = require("pdf2json");
const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFileSync("debug_pdf2json.json", JSON.stringify(pdfData, null, 2));
    console.log('Saved to debug_pdf2json.json');
});

pdfParser.loadPDF('C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\1b370a40-af59-4ef6-be24-829ac475f47f\\.user_uploaded\\media_1790688382415.pdf');
