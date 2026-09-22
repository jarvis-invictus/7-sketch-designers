const fs = require('fs');
let content = fs.readFileSync('src/components/ui/projects-portfolio.tsx', 'utf8');

// Replace the absolute positioned text container with a relative block
const regex = /<div style=\{\{ position: 'absolute', top: '10%', left: '10%', zIndex: 20 \}\}>/;
const replacement = `<div style={{ position: 'relative', paddingTop: '100px', paddingBottom: '40px', paddingLeft: '8%', zIndex: 20 }}>`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync('src/components/ui/projects-portfolio.tsx', content);
  console.log("Successfully fixed the overlapping text in projects-portfolio.tsx");
} else {
  console.error("Could not find the target text to replace.");
}
