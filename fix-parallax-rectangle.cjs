const fs = require('fs');
let content = fs.readFileSync('src/components/ui/zoom-parallax.jsx', 'utf8');

// The current string has:
// ${index === 0 ? '[&>div>img]:!object-contain [&>div]:!w-[28vw] [&>div]:!bg-transparent' : ''}
// We replace it with a wide rectangle that uses standard cover, but fits the text naturally:
const target = /\$\{index === 0 \? '\[&>div>img\]:!object-contain \[&>div\]:!w-\[28vw\] \[&>div\]:!bg-transparent' : ''\}/g;
const replacement = `\${index === 0 ? '[&>div]:!w-[32vw] [&>div]:!h-auto [&>div]:aspect-[16/9]' : ''}`;

if (content.match(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/ui/zoom-parallax.jsx', content);
  console.log("Successfully implemented wide rectangle sizing in ZoomParallax");
} else {
  console.error("Target regex not found in zoom-parallax.jsx.");
}
