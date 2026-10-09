import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="section-wrapper" style={{ background: 'var(--section-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        

        {/* MOBILE ONLY LAYOUT (Logical Stacking) */}
        <div className="flex flex-col lg:hidden gap-6 mb-8">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <img src="/pure-icon-logo.webp" alt="7 Sketch Designers" style={{ height: '40px', objectFit: 'contain' }} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', color: 'var(--walnut)', lineHeight: '1.2' }}>Sketch Designer's</span>
                <span className="text-[7.5px] uppercase tracking-[0.05em] text-[var(--stone-text)] mt-[2px]">Architecture, Interior & Landscape</span>
              </div>
            </div>
            <h2 className="text-[28px] text-[var(--walnut)]">About Our Studio</h2>
          </div>

          <div className="w-full rounded-xl border border-[var(--hairline)] block">
            <img src="/studio-storefront.jpg" className="w-full h-auto block rounded-xl" alt="Studio" />
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
        <div className="hidden lg:grid grid-cols-[1fr_1fr] gap-16 items-center">
          
          {/* Left: Studio Image */}
          <div className="luxury-card" style={{ padding: '12px', background: '#FFFFFF' }}>
            <img 
              src="/studio-storefront.jpg" 
              alt="7 Sketch Designers Studio Storefront" 
              style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-lg)' }} 
            />
          </div>

          {/* Right: Content & Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <img src="/pure-icon-logo.webp" alt="7 Sketch Designers" style={{ height: '50px', objectFit: 'contain' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: '600', color: 'var(--walnut)', lineHeight: '1.2' }}>Sketch Designer's</span>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--stone-text)', marginTop: '2px' }}>Architecture, Interior & Landscape Consultant</span>
                </div>
              </div>
              <h2 style={{ marginBottom: '24px', color: 'var(--walnut)' }}>About Our Studio</h2>
              <p style={{ fontSize: '17px', color: 'var(--stone-text)', lineHeight: '1.8', maxWidth: '600px' }}>
                At 7 Sketch Designers, we are a multidisciplinary Architectural, Interior Design & Project Management Consultancy firm with over 12 years of industry experience. We specialize in delivering world-class commercial and corporate spaces that combine functionality, innovation, and uncompromising quality.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div style={{ background: '#FFFFFF', border: '1px solid var(--hairline)', padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '42px', fontFamily: 'var(--font-display)', fontWeight: '500', color: 'var(--brand-gold)', lineHeight: 1 }}>12+</div>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--walnut)', fontSize: '15px', marginBottom: '2px' }}>Years</div>
                  <div style={{ color: 'var(--stone-text)', fontSize: '13px' }}>Industry Experience</div>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid var(--hairline)', padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ fontSize: '42px', fontFamily: 'var(--font-display)', fontWeight: '500', color: 'var(--brand-gold)', lineHeight: 1 }}>05</div>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--walnut)', fontSize: '15px', marginBottom: '2px' }}>Professionals</div>
                  <div style={{ color: 'var(--stone-text)', fontSize: '13px' }}>Dedicated Team</div>
                </div>
              </div>
              
              <div style={{ background: '#FFFFFF', border: '1px solid var(--hairline)', padding: '24px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '20px', gridColumn: '1 / -1' }}>
                <div style={{ fontSize: '42px', fontFamily: 'var(--font-display)', fontWeight: '500', color: 'var(--brand-gold)', lineHeight: 1 }}>HQ</div>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--walnut)', fontSize: '15px', marginBottom: '2px' }}>Pune-based</div>
                  <div style={{ color: 'var(--stone-text)', fontSize: '13px' }}>Central Studio Location</div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
