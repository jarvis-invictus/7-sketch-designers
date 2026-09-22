const fs = require('fs');
let appContent = fs.readFileSync('src/App.jsx', 'utf8');

const targetStr = `    {
      id: 'christ-hall',
      category: 'educational',
      client: 'Christ College',
      location: 'Pune Campus',
      title: 'Christ College Training Hall & Library',
      type: 'Educational Interior',
      scope: 'Acoustic Planning, Custom Furniture, Lighting & Bookshelves',
      images: ['/project-p20-1.jpg', '/project-p21-1.png', '/project-p15-2.jpg', '/project-p15-6.jpg'],
      details: 'State-of-the-art auditorium and library setup focused on acoustic precision, quiet study zones, and long-lasting ergonomic furniture.'
    },
`;

if (appContent.includes(targetStr)) {
  appContent = appContent.replace(targetStr, '');
  fs.writeFileSync('src/App.jsx', appContent);
  console.log('Removed Christ College successfully.');
} else {
  console.log('Could not find the exact string to remove.');
}
