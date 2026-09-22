const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

// The images array for gokarting currently has aerial first.
// We need to swap '/raftaar-aerial.jpg' and '/raftaar-exterior.jpg' back.
content = content.replace(
  /'\/raftaar-aerial\.jpg',\n\s*'\/raftaar-exterior\.jpg'/,
  "'/raftaar-exterior.jpg',\n        '/raftaar-aerial.jpg'"
);

fs.writeFileSync('src/App.jsx', content);
console.log("Successfully reverted the Go Karting images in App.jsx");
