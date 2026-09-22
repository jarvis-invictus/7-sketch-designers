const fs = require('fs');
let content = fs.readFileSync('src/components/ui/testimonials.jsx', 'utf8');

// Replace the buggy style with proper tailwind classes
content = content.replace(
  /className="embla__slide"[\s\S]*?style=\{\{\s*flex: '0 0 100%',\s*minWidth: '0',\s*paddingLeft: '24px',[^}]*\}\}/g,
  `className="embla__slide flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%]" 
                key={idx} 
                style={{ 
                  minWidth: '0', 
                  paddingLeft: '24px'
                }}`
);

// Fix the nested div class which used calc(vw) incorrectly (embla handles widths based on flex-basis)
content = content.replace(
  /className="w-full md:w-\[calc\(50vw-48px\)\] lg:w-\[calc\(33\.333vw-32px\)\] luxury-card"/g,
  `className="luxury-card w-full"`
);

fs.writeFileSync('src/components/ui/testimonials.jsx', content);
console.log("Fixed testimonials media query styles");
