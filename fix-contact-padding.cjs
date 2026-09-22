const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Fix contact section padding
content = content.replace(
  /<section id="contact" className="section-wrapper" style=\{\{ background: 'var\(--section-cream\)', padding: '100px 24px' \}\}>/,
  '<section id="contact" className="section-wrapper" style={{ background: \'var(--section-cream)\' }}>'
);
fs.writeFileSync('src/App.jsx', content);

console.log("Fixed Contact Section padding to be fully responsive.");
