const fs = require('fs');
let code = fs.readFileSync('src/components/ui/industries.jsx', 'utf8');

if (!code.includes('useReliableInView')) {
  code = code.replace(
    "import { motion } from 'framer-motion';",
    "import { motion } from 'framer-motion';\nimport { useReliableInView } from '../../hooks/useReliableInView';"
  );
}

const itemCode = `function IndustryPill({ ind, idx }) {
  const [ref, isInView] = useReliableInView(0.15);
  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.2 } }}
      style={{ 
        background: '#FFFFFF', 
        border: '1px solid var(--hairline)', 
        padding: '16px 28px', 
        borderRadius: 'var(--radius-pill)', 
        fontSize: '15px', 
        fontWeight: '500', 
        color: 'var(--stone-text)',
        boxShadow: 'var(--shadow-sm)',
        transition: 'border-color 0.2s ease, color 0.2s ease',
        cursor: 'default'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--brand-gold)';
        e.currentTarget.style.color = 'var(--walnut)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--hairline)';
        e.currentTarget.style.color = 'var(--stone-text)';
      }}
    >
      {ind}
    </motion.div>
  );
}

export default function Industries() {`;

code = code.replace("export default function Industries() {", itemCode);

const oldLoopRegex = /\{industries\.map\(\(ind, idx\) => \(\s*<motion\.div[\s\S]*?<\/motion\.div>\s*\)\)\}/;
const newLoop = `{industries.map((ind, idx) => (
            <IndustryPill key={idx} ind={ind} idx={idx} />
          ))}`;
code = code.replace(oldLoopRegex, newLoop);

fs.writeFileSync('src/components/ui/industries.jsx', code);
