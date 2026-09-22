const fs = require('fs');

// 1. Add Smooth Scrolling to index.css
const cssPath = 'src/index.css';
let cssContent = fs.readFileSync(cssPath, 'utf8');

if (!cssContent.includes('scroll-behavior: smooth')) {
    cssContent = cssContent.replace(
        "html {",
        "html {\n  scroll-behavior: smooth;"
    );
    
    // Add input focus states
    cssContent += `\n
/* Form Input Focus States */
input:focus, textarea:focus, select:focus {
  border-color: var(--brand-gold) !important;
  box-shadow: 0 0 0 3px rgba(198, 168, 124, 0.2) !important;
  outline: none !important;
  transition: all 0.2s ease;
}
`;
    fs.writeFileSync(cssPath, cssContent);
}

// 2. Add OG Tags to index.html
const htmlPath = 'index.html';
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

if (!htmlContent.includes('property="og:title"')) {
    const ogTags = `
    <!-- Open Graph / Social Media Meta Tags -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="7 Sketch Designers • Architectural & Interior Design" />
    <meta property="og:description" content="Multidisciplinary Architectural, Commercial Interior Design & Project Management Consultancy firm in Pune with 12+ years experience." />
    <meta property="og:image" content="/main-logo.png" />
    <meta property="og:url" content="https://7sketchdesigners.com" />
    `;
    
    htmlContent = htmlContent.replace(
        '</title>',
        '</title>' + ogTags
    );
    fs.writeFileSync(htmlPath, htmlContent);
}

console.log('Polishes applied');
