const fs = require('fs');
let content = fs.readFileSync('src/App.jsx', 'utf8');

const targetRegex = /\{\s*id:\s*'pall'[\s\S]*?\},/;
const replacement = `{
      id: 'pall',
      title: 'Pall Corporations',
      category: 'Corporate Office Interior',
      type: 'Corporate Office Interior',
      scope: 'Interior Design, Space Planning, Project Management, Turnkey Execution',
      details: 'For Pall Corporations, we delivered a comprehensive turnkey execution, focusing on advanced space planning and interior design. The result is a dynamic corporate office environment that balances open collaborative workspaces with dedicated presentation and breakout areas, all tied together by distinctive modern lighting features.',
      images: [
        '/pall-hero.png',
        '/pall-workstation-wide.png',
        '/pall-workstation-close.png',
        '/pall-lounge.png',
        '/pall-cafe.png'
      ]
    },`;

if (targetRegex.test(content)) {
  content = content.replace(targetRegex, replacement);
  fs.writeFileSync('src/App.jsx', content);
  console.log("Successfully updated Pall data in App.jsx");
} else {
  console.error("Could not find the Pall block in App.jsx");
}
