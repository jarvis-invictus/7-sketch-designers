const fs = require('fs');
let content = fs.readFileSync('src/components/ui/team-section.jsx', 'utf8');

const targetKomalRegex = /\{\s*name:\s*'Komal Narkar',\s*role:\s*'Senior Designer'\s*\}/;
const replaceKomal = `{ name: 'Komal Narkar', role: 'Senior Designer', image: '/team-komal.jpg' }`;

if (targetKomalRegex.test(content)) {
  content = content.replace(targetKomalRegex, replaceKomal);
  fs.writeFileSync('src/components/ui/team-section.jsx', content);
  console.log("Successfully updated Komal's photo");
} else {
  console.error("Could not find Komal in team-section.jsx");
}
