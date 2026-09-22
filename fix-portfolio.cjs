const fs = require('fs');

let content = fs.readFileSync('src/components/ui/projects-portfolio.tsx', 'utf8');

const target = `onClick={() => setSelectedProject(project)}`;
const replacement = `onClick={() => onProjectClick ? onProjectClick(project.id) : setSelectedProject(project)}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/ui/projects-portfolio.tsx', content);
  console.log("Successfully fixed onClick routing!");
} else {
  console.error("Target string not found!");
}
