const fs = require('fs');
let content = fs.readFileSync('src/components/ui/team-section.jsx', 'utf8');

// The entry looks like: { name: 'Niketan Suryawanshi', role: 'Site Engineer' },
// We will replace it with an empty string, including the trailing comma and spaces.
const targetRegex = /\s*\{\s*name:\s*'Niketan Suryawanshi',\s*role:\s*'Site Engineer'\s*\},?/;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, '');
  fs.writeFileSync('src/components/ui/team-section.jsx', content);
  console.log("Successfully removed Niketan Suryawanshi from the team array");
} else {
  console.error("Could not find Niketan Suryawanshi in team-section.jsx");
}
