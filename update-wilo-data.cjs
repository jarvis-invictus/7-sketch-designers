const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// The original wilo block in App.jsx looks like:
// id: 'wilo',
// title: 'Wilo Mather and Platt',
// ...

const targetRegex = /\{\s*id:\s*'wilo'[\s\S]*?\},/;
const replacement = `{
      id: 'wilo',
      title: 'Wilo Sales Office',
      category: 'Corporate Office',
      type: 'Corporate Office',
      scope: 'Corporate Interior, Workstations, Meeting Rooms, Reception',
      details: 'A branded corporate interior featuring collaborative lounges, executive meeting rooms, and vibrant workspaces.',
      images: [
        '/wilo-collage.png',
        '/wilo-meeting-room.png',
        '/wilo-executive-cabin.png',
        '/wilo-cafeteria.png',
        '/wilo-lounge-wide.png'
      ]
    },`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync('src/App.jsx', content);
  console.log("Successfully updated Wilo data in App.jsx");
} else {
  console.error("Could not find the Wilo block in App.jsx");
}
