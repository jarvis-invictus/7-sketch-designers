const fs = require('fs');
let content = fs.readFileSync('src/components/ui/team-section.jsx', 'utf8');

const targetRohitRegex = /\{\s*name:\s*'Rohit Wankhede',\s*role:\s*'Founder & Principal Architect'\s*\}/;
const replaceRohit = `{ name: 'Rohit Wankhede', role: 'Founder & Principal Architect', image: '/team-rohit.jpg' }`;

if (targetRohitRegex.test(content)) {
  content = content.replace(targetRohitRegex, replaceRohit);
  fs.writeFileSync('src/components/ui/team-section.jsx', content);
  console.log("Successfully updated Rohit's photo");
} else {
  console.error("Could not find Rohit in team-section.jsx");
}
