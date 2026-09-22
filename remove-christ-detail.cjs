const fs = require('fs');
let appContent = fs.readFileSync('src/components/ui/project-detail.jsx', 'utf8');

const targetStr = `    'christ-hall': {
      overview: "Christ College approached us to design a Training Hall and Library that would serve as the intellectual heart of their campus. The goal was to create spaces that foster deep concentration, collaborative learning, and large-scale academic presentations without compromising on acoustic integrity.",
      approach: "The auditorium features state-of-the-art acoustic panelling and tiered ergonomic seating, designed to project sound clearly while keeping the audience comfortable during long sessions. In stark contrast, the adjoining library was crafted as a sanctuary of silence. We custom-built expansive bookshelves and integrated warm, focused lighting to reduce eye strain, paired with dedicated quiet study zones."
    },
`;

if (appContent.includes(targetStr)) {
  appContent = appContent.replace(targetStr, '');
  fs.writeFileSync('src/components/ui/project-detail.jsx', appContent);
  console.log('Removed Christ College details successfully.');
} else {
  console.log('Could not find the exact string to remove.');
}
