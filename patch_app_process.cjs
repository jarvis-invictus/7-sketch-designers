const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// Import useReliableInView
if (!code.includes('useReliableInView')) {
  code = code.replace(
    "import React, { useState, useEffect } from 'react';",
    "import React, { useState, useEffect } from 'react';\nimport { useReliableInView } from './hooks/useReliableInView';"
  );
}

// Extract component
const cardCode = `function ProcessBlueprintCard({ item, idx }) {
  const [ref, isInView] = useReliableInView(0.15);
  return (
    <motion.div 
      ref={ref}
      style={{ background: 'var(--card-neutral)', padding: '24px 32px', borderRadius: '12px', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.3 } }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-[48px] items-center">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
            <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--brand-gold)', lineHeight: 1 }}>{item.num}</span>
            <span className="brand-badge">{item.tag}</span>
          </div>
          <h3 style={{ marginBottom: '16px' }}>
            {item.stage}
          </h3>
          <p style={{ marginBottom: '28px' }}>
            {item.description}
          </p>

          <div style={{ background: '#FFFFFF', padding: '20px 24px', borderRadius: '8px', borderLeft: '4px solid var(--brand-gold)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--brand-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Verified Stage Deliverable
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--walnut)' }}>
              {item.deliverable}
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          {(() => {
            const Illustration = ProcessIllustrations[idx];
            return <Illustration />;
          })()}
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {`;

code = code.replace("export default function App() {", cardCode);

// Replace loop in App
const oldLoopRegex = /\{creativeExecutionProcess\.map\(\(item, idx\) => \(\s*<motion\.div\s*key=\{idx\}[^>]*>[\s\S]*?<\/motion\.div>\s*\)\)\}/;

const newLoop = `{creativeExecutionProcess.map((item, idx) => (
                  <ProcessBlueprintCard key={idx} item={item} idx={idx} />
                ))}`;

code = code.replace(oldLoopRegex, newLoop);

fs.writeFileSync('src/App.jsx', code);
