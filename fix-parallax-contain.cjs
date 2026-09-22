const fs = require('fs');
let content = fs.readFileSync('src/components/ui/zoom-parallax.jsx', 'utf8');

// The current string has the Option 1 math:
// ${index === 0 ? '[&>div]:!w-[28vw] [&>div]:!h-auto [&>div]:aspect-video' : ''}
// We will replace it with the Option 3 math: Use original size but force object-contain so it never crops.
const target = /\$\{index === 0 \? '\[&>div\]:!w-\[28vw\] \[&>div\]:!h-auto \[&>div\]:aspect-video' : ''\}/g;
const replacement = `\${index === 0 ? '[&>div>img]:!object-contain [&>div]:!w-[28vw] [&>div]:!bg-transparent' : ''}`;

if (content.match(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/ui/zoom-parallax.jsx', content);
  console.log("Successfully implemented object-contain sizing in ZoomParallax");
} else {
  console.error("Target regex not found in zoom-parallax.jsx.");
}
