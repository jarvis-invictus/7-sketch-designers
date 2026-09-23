const fs = require('fs');
let code = fs.readFileSync('src/components/ui/process-illustrations.jsx', 'utf8');

code = code.replace(
  /  <\/SvgContainer>\n\);/g,
  `  </SvgContainer>\n  );\n}`
);

fs.writeFileSync('src/components/ui/process-illustrations.jsx', code);
