import re

with open('src/components/ui/about-section.jsx', 'r') as f:
    content = f.read()

# Make the current grid desktop-only
content = content.replace(
    '<div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">',
    '<div className="hidden lg:grid grid-cols-[1fr_1fr] gap-16 items-center">'
)

mobile_block = """
        {/* MOBILE ONLY LAYOUT (Logical Stacking) */}
        <div className="flex flex-col lg:hidden gap-6 mb-8">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src="/pure-icon-logo.png" alt="7 Sketch Designers" style={{ height: '40px', objectFit: 'contain' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', color: 'var(--walnut)', lineHeight: '1.2' }}>Sketch Designer's</span>
                <span className="text-[7.5px] uppercase tracking-[0.05em] text-[var(--stone-text)] mt-[2px]">Architecture, Interior & Landscape</span>
              </div>
            </div>
            <h2 className="text-[28px] text-[var(--walnut)]">About Our Studio</h2>
          </div>

          <div className="w-full aspect-square overflow-hidden rounded-xl border border-[var(--hairline)]">
            <img src="/studio-storefront.jpg" className="w-full h-full object-cover" alt="Studio" />
          </div>

          <p className="text-[15px] text-[var(--stone-text)] leading-[1.6]">
            At 7 Sketch Designers, we are a multidisciplinary Architectural, Interior Design & Project Management Consultancy firm with over 12 years of industry experience. We specialize in delivering world-class commercial and corporate spaces that combine functionality, innovation, and uncompromising quality.
          </p>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-white border border-[var(--hairline)] p-3 rounded-lg flex flex-col items-center text-center">
              <div className="text-[24px] font-[family-name:var(--font-display)] font-medium text-[var(--brand-gold)] leading-none mb-1">12+</div>
              <div className="text-[11px] font-semibold text-[var(--walnut)]">Years</div>
            </div>
            <div className="bg-white border border-[var(--hairline)] p-3 rounded-lg flex flex-col items-center text-center">
              <div className="text-[24px] font-[family-name:var(--font-display)] font-medium text-[var(--brand-gold)] leading-none mb-1">05</div>
              <div className="text-[11px] font-semibold text-[var(--walnut)]">Experts</div>
            </div>
            <div className="bg-white border border-[var(--hairline)] p-3 rounded-lg flex flex-col items-center text-center">
              <div className="text-[24px] font-[family-name:var(--font-display)] font-medium text-[var(--brand-gold)] leading-none mb-1">HQ</div>
              <div className="text-[11px] font-semibold text-[var(--walnut)]">Pune</div>
            </div>
          </div>
        </div>

        {/* DESKTOP ONLY LAYOUT */}
"""

content = content.replace('        <div className="hidden lg:grid grid-cols-[1fr_1fr] gap-16 items-center">', mobile_block + '        <div className="hidden lg:grid grid-cols-[1fr_1fr] gap-16 items-center">')

with open('src/components/ui/about-section.jsx', 'w') as f:
    f.write(content)

print("About Section patched")
