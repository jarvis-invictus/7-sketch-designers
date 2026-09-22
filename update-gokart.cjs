const fs = require('fs');

let appContent = fs.readFileSync('src/App.jsx', 'utf8');

const targetStr = `      id: 'gokarting',
      category: 'commercial',
      client: 'Go Karting Track',
      location: 'Tathawade, Pune',
      title: 'Go Karting Recreational Hub',
      type: 'Recreational Commercial',
      scope: 'Reception Area, Café, Waiting Lounge, Branding & Turnkey Execution',
      images: ['/project-p9-2.png', '/project-p9-3.png', '/project-p9-4.png', '/project-p10-4.png'],`;

const newStr = `      id: 'gokarting',
      category: 'commercial',
      client: 'Raftaar Go Karting',
      location: 'Tathawade, Pune',
      title: 'Go Karting Recreational Hub',
      type: 'Recreational Commercial',
      scope: 'Reception Area, Café, Waiting Lounge, Branding & Turnkey Execution',
      images: [
        '/raftaar-exterior.jpg',
        '/raftaar-aerial.jpg',
        '/raftaar-lounge.png',
        '/raftaar-neon.png',
        '/raftaar-shelves.png',
        '/raftaar-red.png',
        '/raftaar-arcade.png',
        '/raftaar-cafe.png'
      ],`;

if (appContent.includes(targetStr)) {
  appContent = appContent.replace(targetStr, newStr);
  fs.writeFileSync('src/App.jsx', appContent);
  console.log('Updated Go Karting project images successfully.');
} else {
  // Let's do a fallback regex
  const regex = /id:\s*'gokarting',[\s\S]*?images:\s*\[.*?\]/;
  const fallbackNew = `id: 'gokarting',
      category: 'commercial',
      client: 'Raftaar Go Karting',
      location: 'Tathawade, Pune',
      title: 'Go Karting Recreational Hub',
      type: 'Recreational Commercial',
      scope: 'Reception Area, Café, Waiting Lounge, Branding & Turnkey Execution',
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
  appContent = appContent.replace(regex, fallbackNew);
  fs.writeFileSync('src/App.jsx', appContent);
  console.log('Updated Go Karting project via regex fallback.');
}
