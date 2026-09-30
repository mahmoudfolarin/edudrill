const fs = require('fs');
const lines = fs.readFileSync('C:\\Users\\USER\\.gemini\\antigravity-ide\\brain\\1b370a40-af59-4ef6-be24-829ac475f47f\\.system_generated\\logs\\transcript_full.jsonl', 'utf8').split('\n');
const userLines = lines.filter(l => l.includes('"type":"USER_INPUT"'));
console.log('User inputs count:', userLines.length);
if (userLines.length > 0) {
  const lastUserObj = JSON.parse(userLines[userLines.length - 1]);
  fs.writeFileSync('last_user_message.txt', lastUserObj.content);
  console.log('Saved last user message to last_user_message.txt');
}
