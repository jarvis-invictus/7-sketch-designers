const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

content = content.replace(
  /<section id="process" className="section-wrapper" style=\{\{ background: 'var\(--page-cream\)', borderTop: '1px solid var\(--hairline\)', paddingTop: '64px', paddingBottom: '64px' \}\}>/,
  '<section id="process" className="section-wrapper" style={{ background: \'var(--page-cream)\', borderTop: \'1px solid var(--hairline)\' }}>'
);
fs.writeFileSync('src/App.jsx', content);

console.log("Removed hardcoded padding from Process section.");
