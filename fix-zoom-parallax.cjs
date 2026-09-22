const fs = require('fs');
let content = fs.readFileSync('src/components/ui/zoom-parallax.jsx', 'utf8');

// Update the motion.div wrapper className logic to add custom sizing for index === 0
const target = /\$\{index === 1 \? '\[&>div\]:!-top-\[30vh\]/g;
const replacement = `\${index === 0 ? '[&>div]:!w-[40vw] [&>div]:!h-[30vh]' : ''} \${index === 1 ? '[&>div]:!-top-[30vh]`;

if (content.match(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/ui/zoom-parallax.jsx', content);
  console.log("Successfully updated ZoomParallax sizing for index 0");
} else {
  console.error("Target regex not found in zoom-parallax.jsx");
}
