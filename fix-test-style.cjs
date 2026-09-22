const fs = require('fs');
let content = fs.readFileSync('src/components/ui/testimonials.jsx', 'utf8');

content = content.replace(/'@media \(min-width: 768px\)': \{ flex: '0 0 50%' \},\n/g, '');
content = content.replace(/'@media \(min-width: 1024px\)': \{ flex: '0 0 33\.333%' \}\n/g, '');

fs.writeFileSync('src/components/ui/testimonials.jsx', content);
console.log("Removed invalid media queries from inline style in testimonials.");
