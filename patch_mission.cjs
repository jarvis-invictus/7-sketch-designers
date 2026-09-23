const fs = require('fs');
let code = fs.readFileSync('src/components/ui/mission-vision.jsx', 'utf8');

if (!code.includes('useReliableInView')) {
  code = code.replace(
    "import { motion } from 'framer-motion';",
    "import { motion } from 'framer-motion';\nimport { useReliableInView } from '../../hooks/useReliableInView';"
  );
}

code = code.replace(
  "export default function MissionVision() {",
  "export default function MissionVision() {\n  const [missionRef, isMissionInView] = useReliableInView();\n  const [visionRef, isVisionInView] = useReliableInView();\n  const [valuesRef, isValuesInView] = useReliableInView();"
);

// We need to carefully replace the three whileInView.
// First match: Mission
code = code.replace(
  /<motion\.div\s*style=\{\{ background: 'var\(--card-neutral\)', padding: '40px', display: 'flex', flexDirection: 'column', borderRadius: 'var\(--radius-lg\)'[^>]*>/,
  `<motion.div 
            ref={missionRef}
            style={{ background: 'var(--card-neutral)', padding: '40px', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-lg)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}`
);

// Second match: Vision
code = code.replace(
  /<motion\.div\s*style=\{\{ background: 'linear-gradient\([^>]*>/,
  `<motion.div 
            ref={visionRef}
            style={{ background: 'linear-gradient(180deg, var(--blush-start) 0%, var(--blush-end) 100%)', padding: '40px', display: 'flex', flexDirection: 'column', borderRadius: 'var(--radius-lg)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}`
);

// Third match: Core Values
// Wait, the Core Values block is identical in style to Mission.
// I will just use string replacement carefully.
