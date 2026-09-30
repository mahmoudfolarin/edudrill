const fs = require('fs');
const content = fs.readFileSync('./src/data/offlineQuestionBank.js', 'utf8');
const emptyArrays = content.match(/"[a-zA-Z0-9\-]+":\s*\[\s*\]/g);
console.log('Empty arrays:', emptyArrays);
