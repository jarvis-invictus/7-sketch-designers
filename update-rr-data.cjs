const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const targetRegex = /\{\s*id:\s*'rr-heritage'[\s\S]*?\},/;

const replacement = `{
      id: 'rr-heritage',
      title: 'R R Heritage – Mahabaleshwar',
      category: 'Hospitality Interior',
      type: 'Hospitality Interior',
      scope: 'Resort Interior Design, Guest Experience Planning, Material Selection, Turnkey Execution',
      details: 'A luxurious hospitality interior combining natural wood finishes, warm ambient lighting, and elegant multi-level suites.',
      images: [
        '/project-p17-1.jpg',
        '/rr-exterior.png',
        '/rr-loft-suite.png'
      ]
    },`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync('src/App.jsx', content);
  console.log("Successfully updated RR Heritage data in App.jsx");
} else {
  console.error("Could not find the RR Heritage block in App.jsx");
}
