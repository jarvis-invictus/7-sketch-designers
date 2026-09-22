const fs = require('fs');
let content = fs.readFileSync('src/components/ui/zoom-parallax.jsx', 'utf8');

// Replace the previous 16:9 wide rectangle logic with a PERFECT SQUARE logic.
const target = /\$\{index === 0 \? '\[&>div\]:!w-\[32vw\] \[&>div\]:!h-auto \[&>div\]:aspect-\[16\/9\]' : ''\}/g;
const replacement = `\${index === 0 ? '[&>div]:!w-[24vw] [&>div]:!h-auto [&>div]:aspect-square' : ''}`;

if (content.match(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/ui/zoom-parallax.jsx', content);
  console.log("Successfully implemented square sizing in ZoomParallax");
} else {
  console.error("Target regex not found in zoom-parallax.jsx.");
}
