const fs = require('fs');
let code = fs.readFileSync('src/components/ui/mission-vision.jsx', 'utf8');

// Ensure import
if (!code.includes('useReliableInView')) {
  code = code.replace(
    "import { motion } from 'framer-motion';",
    "import { motion } from 'framer-motion';\nimport { useReliableInView } from '../../hooks/useReliableInView';"
  );
}

// Ensure hooks are added
if (!code.includes('const [missionRef')) {
  code = code.replace(
    "export default function MissionVision() {",
    "export default function MissionVision() {\n  const [missionRef, isMissionInView] = useReliableInView();\n  const [visionRef, isVisionInView] = useReliableInView();\n  const [valuesRef, isValuesInView] = useReliableInView();"
  );
}

// Manual replacements for the 3 blocks
let parts = code.split('<motion.div');
if (parts.length === 4) {
  // parts[1] is Mission
  parts[1] = ' ref={missionRef}\n           ' + parts[1];
  parts[1] = parts[1].replace(/whileInView=\{\{ opacity: 1, y: 0 \}\}\n\s*viewport=\{\{ once: true \}\}/, "animate={isMissionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}");
  
  // parts[2] is Vision
  parts[2] = ' ref={visionRef}\n           ' + parts[2];
  parts[2] = parts[2].replace(/whileInView=\{\{ opacity: 1, y: 0 \}\}\n\s*viewport=\{\{ once: true \}\}/, "animate={isVisionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}");

  // parts[3] is Core Values
  parts[3] = ' ref={valuesRef}\n           ' + parts[3];
  parts[3] = parts[3].replace(/whileInView=\{\{ opacity: 1, y: 0 \}\}\n\s*viewport=\{\{ once: true \}\}/, "animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}");
  
  code = parts.join('<motion.div');
}

fs.writeFileSync('src/components/ui/mission-vision.jsx', code);
