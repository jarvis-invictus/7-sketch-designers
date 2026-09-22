const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Replace the font import line with all the correct fonts
content = content.replace(
  /<link href="https:\/\/fonts\.googleapis\.com\/css2\?family=Kanit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" \/>/,
  '<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Inter:wght@300..700&family=Kanit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />'
);

fs.writeFileSync('index.html', content);
console.log("Fixed missing font imports in index.html");
