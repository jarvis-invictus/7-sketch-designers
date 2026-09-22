const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// The images array for gokarting
// We need to swap '/raftaar-exterior.jpg' and '/raftaar-aerial.jpg'
content = content.replace(
  /'\/raftaar-exterior\.jpg',\s*'\/raftaar-aerial\.jpg'/,
  "'/raftaar-aerial.jpg',\n        '/raftaar-exterior.jpg'"
);

fs.writeFileSync('src/App.jsx', content);
console.log("Successfully swapped the Go Karting images in App.jsx");
