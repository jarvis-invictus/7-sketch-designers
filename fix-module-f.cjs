const fs = require('fs');

// App.jsx
let appContent = fs.readFileSync('src/App.jsx', 'utf8');

// Section title and text
appContent = appContent.replace(
  `MODULE F Homes German CNC Factory`,
  `State-of-the-Art German CNC Manufacturing`
);

appContent = appContent.replace(
  `Unlike traditional interior contractors who rely on slow on-site carpentry, 7 Sketch Designers is directly backed by our state-of-the-art **MODULE F Homes** manufacturing facility equipped with German CNC precision machinery.`,
  `Unlike traditional interior contractors who rely on slow on-site carpentry, 7 Sketch Designers operates our own state-of-the-art manufacturing facility equipped with German CNC precision machinery. We proudly manufacture and execute for our own clients, while also serving a network of valued associates—including Module F Homes and multiple other partners.`
);

// Image alt
appContent = appContent.replace(
  `alt="MODULE F High Res Precision Woodwork"`,
  `alt="7 Sketch Designers Precision Woodwork"`
);

// Process steps
appContent = appContent.replace(
  `stage: 'MODULE F German CNC Production',`,
  `stage: 'In-House German CNC Production',`
);

appContent = appContent.replace(
  `at our MODULE F German CNC factory plant`,
  `at our in-house German CNC factory plant`
);

// Footer
appContent = appContent.replace(
  `© {new Date().getFullYear()} 7 Sketch Designers. Associated with MODULE F Homes.`,
  `© {new Date().getFullYear()} 7 Sketch Designers. All rights reserved.`
);

fs.writeFileSync('src/App.jsx', appContent);

// services-carousel.jsx
let carouselContent = fs.readFileSync('src/components/ui/services-carousel.jsx', 'utf8');

carouselContent = carouselContent.replace(
  `'Furniture (German CNC Factory MODULE F)',`,
  `'Furniture (In-House German CNC Factory)',`
);

carouselContent = carouselContent.replace(
  `This service executes Phase 4 (MODULE F German CNC Production)`,
  `This service executes Phase 4 (In-House German CNC Production)`
);

fs.writeFileSync('src/components/ui/services-carousel.jsx', carouselContent);

// officialServicesData.js
let dataContent = fs.readFileSync('src/officialServicesData.js', 'utf8');

dataContent = dataContent.replace(
  `manufactured at our MODULE F German CNC facility.`,
  `manufactured at our in-house German CNC facility.`
);

fs.writeFileSync('src/officialServicesData.js', dataContent);

console.log('Fixed Module F content everywhere');
