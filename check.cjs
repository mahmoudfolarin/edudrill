const fs = require('fs');
const content = fs.readFileSync('./src/data/offlineQuestionBank.js', 'utf8');
const questions = content.match(/"question":/g) || [];
const options = content.match(/"options":/g) || [];
console.log('Questions:', questions.length);
console.log('Options:', options.length);
