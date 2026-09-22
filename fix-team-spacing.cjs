const fs = require('fs');
let content = fs.readFileSync('src/components/ui/team-section.jsx', 'utf8');

// Add padding to section
content = content.replace(
  /<section id="team" className="section-wrapper" style=\{\{ background: 'var\(--page-cream\)', borderBottom: '1px solid var\(--hairline\)' \}\}>/,
  '<section id="team" className="section-wrapper" style={{ padding: \'120px 24px\', background: \'var(--page-cream)\', borderBottom: \'1px solid var(--hairline)\' }}>'
);

// Reduce gap between founders and team slightly (mb-20 -> mb-16)
content = content.replace(
  /<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 max-w-\[700px\] mx-auto">/,
  '<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-[700px] mx-auto">'
);

fs.writeFileSync('src/components/ui/team-section.jsx', content);
console.log("Successfully fixed team section spacing");
