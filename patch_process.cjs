const fs = require('fs');
let code = fs.readFileSync('src/components/ui/process-illustrations.jsx', 'utf8');

// Import hook
code = code.replace("import { motion } from 'framer-motion';", "import { motion } from 'framer-motion';\nimport { useReliableInView } from '../../hooks/useReliableInView';");

// Convert SvgContainer to forwardRef
code = code.replace(
  "const SvgContainer = ({ children }) => (",
  "const SvgContainer = React.forwardRef(({ children }, ref) => ("
);
code = code.replace(
  "<div style={{",
  "<div ref={ref} style={{"
);
code = code.replace(
  "  </svg>\n  </div>\n);",
  "  </svg>\n  </div>\n));"
);

// For each Phase, add the hook
const phases = ['Phase1Illustration', 'Phase2Illustration', 'Phase3Illustration', 'Phase4Illustration', 'Phase5Illustration'];

for (const phase of phases) {
  code = code.replace(
    `export const ${phase} = () => (`,
    `export const ${phase} = () => {
  const [ref, isInView] = useReliableInView();
  return (`
  );
  
  // Attach ref to SvgContainer
  // We need to replace the first <SvgContainer> inside the returned JSX of this phase with <SvgContainer ref={ref}>
  // Since we just replaced the export, the next <SvgContainer> is the one.
  const idx = code.indexOf(`<SvgContainer>`, code.indexOf(`export const ${phase}`));
  if (idx !== -1) {
    code = code.substring(0, idx) + `<SvgContainer ref={ref}>` + code.substring(idx + `<SvgContainer>`.length);
  }
}

// Close the return for each Phase
for (const phase of phases) {
  code = code.replace(
    /    <\/SvgContainer>\n  \);\n/g,
    `    </SvgContainer>\n  );\n}\n`
  );
}

// Replace whileInView and viewport in the entire file
code = code.replace(/whileInView="visible"/g, `animate={isInView ? "visible" : "hidden"}`);
code = code.replace(/viewport=\{\{[^}]+\}\}/g, ``);

fs.writeFileSync('src/components/ui/process-illustrations.jsx', code);
