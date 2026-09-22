const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const regex = /id: 'gokarting',[\s\S]*?details: 'An immersive recreational hub featuring dynamic neon styling, expansive arcade zones, and a bold, high-energy aesthetic.'/;

const newBlock = `id: 'gokarting',
      title: 'Go Karting Recreational Hub',
      category: 'Recreational Space',
      type: 'Commercial Entertainment',
      scope: 'Concept Design, Lighting, Spatial Planning',
      details: 'An immersive recreational hub featuring dynamic neon styling, expansive arcade zones, and a bold, high-energy aesthetic.',
      images: [
        '/raftaar-exterior.jpg',
        '/raftaar-aerial.jpg',
        '/raftaar-lounge.png',
        '/raftaar-neon.png',
        '/raftaar-shelves.png',
        '/raftaar-red.png',
        '/raftaar-arcade.png',
        '/raftaar-cafe.png'
      ]`;

if (regex.test(content)) {
  content = content.replace(regex, newBlock);
  fs.writeFileSync('src/App.jsx', content);
  console.log("Successfully fixed Gokarting data in App.jsx");
} else {
  console.error("Could not find the Gokarting block in App.jsx");
}
