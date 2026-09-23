const fs = require('fs');
let code = fs.readFileSync('src/components/ui/pmc-deep-dive.jsx', 'utf8');

if (!code.includes('useReliableInView')) {
  code = code.replace(
    "import { motion } from 'framer-motion';",
    "import { motion } from 'framer-motion';\nimport { useReliableInView } from '../../hooks/useReliableInView';"
  );
}

const cardCode = `function PmcCard({ col, idx }) {
  const [ref, isInView] = useReliableInView();
  return (
    <motion.div 
      ref={ref}
      style={{ background: '#FFFFFF', padding: '32px 24px', borderRadius: 'var(--radius-lg)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.3 } }}
    >
      <div style={{ width: '44px', height: '44px', background: 'var(--page-cream)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', border: '1px solid var(--hairline)' }}>
        {col.icon}
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {col.items.map((item, itemIdx) => (
          <li key={itemIdx} style={{ fontSize: '14.5px', color: 'var(--walnut)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ width: '4px', height: '4px', background: 'var(--clay)', borderRadius: '50%', display: 'inline-block' }}></span>
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function PmcDeepDive() {`;

code = code.replace("export default function PmcDeepDive() {", cardCode);

const oldLoopRegex = /\{scopeColumns\.map\(\(col, idx\) => \(\s*<motion\.div[\s\S]*?<\/motion\.div>\s*\)\)\}/;
const newLoop = `{scopeColumns.map((col, idx) => (
            <PmcCard key={idx} col={col} idx={idx} />
          ))}`;

code = code.replace(oldLoopRegex, newLoop);

fs.writeFileSync('src/components/ui/pmc-deep-dive.jsx', code);
