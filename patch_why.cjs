const fs = require('fs');
let code = fs.readFileSync('src/components/ui/why-choose-us.jsx', 'utf8');

if (!code.includes('useReliableInView')) {
  code = code.replace(
    "import { motion } from 'framer-motion';",
    "import { motion } from 'framer-motion';\nimport { useReliableInView } from '../../hooks/useReliableInView';"
  );
}

const itemCode = `function BenefitItem({ reason, idx }) {
  const [ref, isInView] = useReliableInView();
  return (
    <motion.div 
      ref={ref}
      style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: 'var(--radius-sm)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.3 } }}
    >
      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--card-neutral)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--hairline)' }}>
        <Check size={14} color="var(--clay)" strokeWidth={2.5} />
      </div>
      <span style={{ fontSize: '15.5px', color: 'var(--walnut)', fontWeight: '500' }}>{reason}</span>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const [imgRef, isImgInView] = useReliableInView();`;

code = code.replace("export default function WhyChooseUs() {", itemCode);

const oldImgRegex = /<motion\.div \s*style=\{\{ padding: '12px', background: 'var\(--card-neutral\)'[^>]*>\s*<img[\s\S]*?<\/motion\.div>/;
const newImg = `<motion.div 
            ref={imgRef}
            style={{ padding: '12px', background: 'var(--card-neutral)', borderRadius: 'var(--radius-lg)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={isImgInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0, ease: 'easeOut' }}
            whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.3 } }}
          >
            <img 
              src="/project-p20-1.jpg" 
              alt="7 Sketch Designers Studio" 
              style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} 
            />
          </motion.div>`;
code = code.replace(oldImgRegex, newImg);

const oldLoopRegex = /\{reasons\.map\(\(reason, idx\) => \(\s*<motion\.div[\s\S]*?<\/motion\.div>\s*\)\)\}/;
const newLoop = `{reasons.map((reason, idx) => (
                <BenefitItem key={idx} reason={reason} idx={idx} />
              ))}`;
code = code.replace(oldLoopRegex, newLoop);

fs.writeFileSync('src/components/ui/why-choose-us.jsx', code);
