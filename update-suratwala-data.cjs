const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const targetRegex = /\{\s*id:\s*'suratwala'[\s\S]*?\},/;
const replacement = `{
      id: 'suratwala',
      title: 'Suratwala Mark Plazzo',
      category: 'Commercial Building',
      type: 'Commercial Building',
      scope: 'Interior Fit-out, Common Areas, Office Kitchen, Office Spaces',
      details: 'The Suratwala Mark Plazzo stands as a premier commercial landmark. We were commissioned to execute a comprehensive interior fit-out that would appeal to high-end corporate tenants. Our architectural intervention focused on creating an atmosphere of expansive luxury through modern glass partitions, ergonomic workspaces, and premium utility areas.',
      images: [
        '/suratwala-hallway.jpg',
        '/suratwala-workspace-wide.jpg',
        '/suratwala-workspace.jpg',
        '/suratwala-cabin-wide.jpg',
        '/suratwala-cabin-close.jpg',
        '/suratwala-straight-desk.jpg',
        '/suratwala-kitchen.jpg'
      ]
    },`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync('src/App.jsx', content);
  console.log("Successfully updated Suratwala data in App.jsx");
} else {
  console.error("Could not find the Suratwala block in App.jsx");
}
