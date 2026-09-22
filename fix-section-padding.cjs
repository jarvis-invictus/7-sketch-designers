const fs = require('fs');

// Fix Team Section
let teamContent = fs.readFileSync('src/components/ui/team-section.jsx', 'utf8');
teamContent = teamContent.replace(
  /<section id="team" style=\{\{ background: 'var\(--page-cream\)', padding: '120px 24px', borderBottom: '1px solid var\(--hairline\)' \}\}>/,
  '<section id="team" className="section-wrapper" style={{ background: \'var(--page-cream)\', borderBottom: \'1px solid var(--hairline)\' }}>'
);
fs.writeFileSync('src/components/ui/team-section.jsx', teamContent);

// Fix Testimonials Section
let testContent = fs.readFileSync('src/components/ui/testimonials.jsx', 'utf8');
testContent = testContent.replace(
  /<section id="testimonials" className="section-wrapper" style=\{\{ background: 'var\(--page-cream\)', borderBottom: '1px solid var\(--hairline\)', padding: '100px 24px', overflow: 'hidden' \}\}>/,
  '<section id="testimonials" className="section-wrapper" style={{ background: \'var(--page-cream)\', borderBottom: \'1px solid var(--hairline)\', overflow: \'hidden\' }}>'
);
fs.writeFileSync('src/components/ui/testimonials.jsx', testContent);

console.log("Fixed section paddings for responsive consistency.");
