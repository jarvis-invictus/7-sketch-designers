const fs = require('fs');
let content = fs.readFileSync('src/components/ui/team-section.jsx', 'utf8');

const targetHemangeeRegex = /\{\s*name:\s*'Hemangee Suryawanshi',\s*role:\s*'Junior Designer'\s*\}/;
const replaceHemangee = `{ name: 'Hemangee Suryawanshi', role: 'Junior Designer', image: '/team-hemangee.jpg' }`;

if (targetHemangeeRegex.test(content)) {
  content = content.replace(targetHemangeeRegex, replaceHemangee);
  fs.writeFileSync('src/components/ui/team-section.jsx', content);
  console.log("Successfully updated Hemangee's photo");
} else {
  console.error("Could not find Hemangee in team-section.jsx");
}
