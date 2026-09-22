const fs = require('fs');
let content = fs.readFileSync('src/components/ui/zoom-parallax.jsx', 'utf8');

// The current string has: ${index === 0 ? '[&>div]:!w-[40vw] [&>div]:!h-[30vh]' : ''}
// We will replace it with the Option 1 math:
const target = /\$\{index === 0 \? '\[&>div\]:!w-\[40vw\] \[&>div\]:!h-\[30vh\]' : ''\}/g;
const replacement = `\${index === 0 ? '[&>div]:!w-[28vw] [&>div]:!h-auto [&>div]:aspect-video' : ''}`;

if (content.match(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/ui/zoom-parallax.jsx', content);
  console.log("Successfully implemented Option 1 sizing in ZoomParallax");
} else {
  console.error("Target regex not found in zoom-parallax.jsx. Let's do a fallback replacement.");
  
  // Fallback if the string slightly differs
  const fallbackTarget = /\$\{index === 0 \? '[^']+' : ''\}/g;
  if (content.match(fallbackTarget)) {
    content = content.replace(fallbackTarget, replacement);
    fs.writeFileSync('src/components/ui/zoom-parallax.jsx', content);
    console.log("Successfully implemented Option 1 via fallback.");
  } else {
      console.log("Could not find index 0 logic.");
  }
}
