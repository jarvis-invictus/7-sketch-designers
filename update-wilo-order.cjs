const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const targetRegex = /id: 'wilo',[\s\S]*?images: \[\s*'\/wilo-collage\.png',\s*'\/wilo-meeting-room\.png',\s*'\/wilo-executive-cabin\.png',\s*'\/wilo-cafeteria\.png',\s*'\/wilo-lounge-wide\.png'\s*\]/;

const replacement = `id: 'wilo',
      title: 'Wilo Sales Office',
      category: 'Corporate Office',
      type: 'Corporate Office',
      scope: 'Corporate Interior, Workstations, Meeting Rooms, Reception',
      details: 'A branded corporate interior featuring collaborative lounges, executive meeting rooms, and vibrant workspaces.',
      images: [
        '/wilo-lounge-wide.png',
        '/wilo-meeting-room.png',
        '/wilo-executive-cabin.png',
        '/wilo-cafeteria.png',
        '/wilo-collage.png'
      ]`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync('src/App.jsx', content);
  console.log("Successfully updated Wilo image order in App.jsx");
} else {
  console.error("Could not find the Wilo block in App.jsx");
}
