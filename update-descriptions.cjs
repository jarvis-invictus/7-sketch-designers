const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// Update Gokarting
content = content.replace(
  /id: 'gokarting',[\s\S]*?details: '.*?'/,
  `id: 'gokarting',
      title: 'Go Karting Recreational Hub',
      category: 'Recreational Space',
      type: 'Commercial Entertainment',
      scope: 'Concept Design, Lighting, Spatial Planning',
      details: 'An immersive recreational hub featuring dynamic neon styling, expansive arcade zones, and a bold, high-energy aesthetic.'`
);

// Update Suratwala
content = content.replace(
  /id: 'suratwala',[\s\S]*?details: '.*?'/,
  `id: 'suratwala',
      title: 'Suratwala Mark Plazzo',
      category: 'Commercial Building',
      type: 'Commercial Building',
      scope: 'Interior Fit-out, Common Areas, Office Kitchen, Office Spaces',
      details: 'A premium commercial fit-out featuring elegant fluted glass partitions, ergonomic open workspaces, and luxurious utility areas.'`
);

// Update Pall
content = content.replace(
  /id: 'pall',[\s\S]*?details: '.*?'/,
  `id: 'pall',
      title: 'Pall Corporations',
      category: 'Corporate Office Interior',
      type: 'Corporate Office Interior',
      scope: 'Interior Design, Space Planning, Project Management, Turnkey Execution',
      details: 'A turnkey corporate execution balancing open collaborative workstations with dedicated presentation lounges and distinctive geometric lighting.'`
);

fs.writeFileSync('src/App.jsx', content);
console.log("Descriptions updated successfully.");
