const fs = require('fs');
let content = fs.readFileSync('src/components/ui/testimonials.jsx', 'utf8');

// Replace the invalid tailwind arbitrary values with standard tailwind sizing classes
content = content.replace(
  /className="embla__slide flex-\[0_0_100%\] md:flex-\[0_0_50%\] lg:flex-\[0_0_33\.333%\]"/g,
  `className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3"`
);

fs.writeFileSync('src/components/ui/testimonials.jsx', content);
console.log("Fixed testimonials slide widths to show 3 per view");
