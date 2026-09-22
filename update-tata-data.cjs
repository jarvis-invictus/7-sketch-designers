const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const targetRegex = /\{\s*id:\s*'tata-service'[\s\S]*?\}\s*\];/;

const replacement = `{
      id: 'tata',
      title: 'Tata Service Centre – Moshi',
      category: 'Commercial Spaces',
      type: 'Commercial Service Centre',
      scope: 'Interior Design, Space Planning, Turnkey Execution, Project Management, Furniture & Finishing',
      details: 'A premium commercial service centre highlighting bespoke furniture, modern space planning, and elegant ambient lighting.',
      images: [
        '/tata-desk-hero.png',
        '/tata-lounge-chair.png',
        '/tata-executive-desk.png'
      ]
    }
  ];`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync('src/App.jsx', content);
  console.log("Successfully updated Tata data in App.jsx");
} else {
  console.error("Could not find the Tata block in App.jsx");
}
