const fs = require('fs');

let content = fs.readFileSync('src/components/ui/project-detail.jsx', 'utf8');

const target = `<img 
          src={heroImage} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />`;

const replacement = `{/* Blurred background layer */}
        <img 
          src={heroImage} 
          alt={project.title + " background"} 
          className="absolute inset-0 w-full h-full object-cover opacity-30 blur-xl"
        />
        {/* Full uncropped image */}
        <img 
          src={heroImage} 
          alt={project.title} 
          className="relative z-10 w-full h-full object-contain"
        />`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/ui/project-detail.jsx', content);
  console.log("Successfully fixed the ProjectDetail Hero image cropping!");
} else {
  console.error("Target string not found!");
}
