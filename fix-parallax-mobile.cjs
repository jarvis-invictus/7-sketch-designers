const fs = require('fs');
let content = fs.readFileSync('src/components/ui/projects-portfolio.tsx', 'utf8');

// The text block is currently inside the "hidden md:block" div. We should extract it so it's always visible.
// We will replace the entire Parallax section.

const oldBlock = `{/* 1. PARALLAX INTRO SECTION */}
      <div className="relative z-10 hidden md:block">
        <div style={{ position: 'relative', paddingTop: '100px', paddingBottom: '40px', paddingLeft: '8%', zIndex: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--clay)' }}></div>
            <span style={{ color: 'var(--clay)', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Our Work
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '56px', color: 'var(--walnut)', lineHeight: '1.1' }}>
            Curated<br />Excellence
          </h2>
          <p style={{ marginTop: '16px', color: 'var(--stone-text)', fontSize: '18px', maxWidth: '680px', lineHeight: '1.8' }}>
            Scroll down to explore a selection of our most prestigious commercial and corporate executions, crafted with architectural precision.
          </p>
        </div>
        
        <ZoomParallax images={images} />
      </div>`;

const newBlock = `{/* 1. PORTFOLIO HEADER (Always visible) */}
      <div className="relative z-10">
        <div className="px-6 md:px-0" style={{ position: 'relative', paddingTop: '100px', paddingBottom: '40px', paddingLeft: 'max(24px, 8%)', zIndex: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--clay)' }}></div>
            <span style={{ color: 'var(--clay)', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Our Work
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px, 6vw, 56px)', color: 'var(--walnut)', lineHeight: '1.1' }}>
            Curated<br />Excellence
          </h2>
          <p style={{ marginTop: '16px', color: 'var(--stone-text)', fontSize: '16px', maxWidth: '680px', lineHeight: '1.8' }} className="md:text-[18px]">
            Explore a selection of our most prestigious commercial and corporate executions, crafted with architectural precision.
          </p>
        </div>
        
        {/* PARALLAX EFFECT (Desktop Only) */}
        <div className="hidden md:block">
          <ZoomParallax images={images} />
        </div>
      </div>`;

content = content.replace(oldBlock, newBlock);
fs.writeFileSync('src/components/ui/projects-portfolio.tsx', content);

console.log("Fixed Projects Portfolio header to be visible on mobile.");
