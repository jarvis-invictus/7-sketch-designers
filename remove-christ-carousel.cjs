const fs = require('fs');
let appContent = fs.readFileSync('src/components/ui/services-carousel.jsx', 'utf8');

appContent = appContent.replace(/'christ-hall',\s*/g, '');
appContent = appContent.replace(/,\s*'christ-hall'/g, '');

fs.writeFileSync('src/components/ui/services-carousel.jsx', appContent);
console.log('Cleaned up christ-hall from services-carousel.jsx.');
