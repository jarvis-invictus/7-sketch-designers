import React from 'react';

export default function AboutSection() {
  return (
    <section id="about" className="section-wrapper" style={{ background: 'var(--section-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        {/* Top Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16 lg:mb-24">
          <div className="luxury-card" style={{ padding: '8px', background: '#FFFFFF' }}>
            <img 
              src="/project-p14-3.png" 
              alt="7 Sketch Designers Studio Workspace" 
              style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} 
            />
          </div>
          <div className="luxury-card hidden md:block" style={{ padding: '8px', background: '#FFFFFF' }}>
            <img 
              src="/project-p16-3.png" 
              alt="7 Sketch Designers Meeting Room" 
              style={{ width: '100%', height: '320px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} 
            />
          </div>
        </div>

        {/* Content & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-16 items-center">
          <div>
            <span className="brand-badge" style={{ marginBottom: '16px' }}>7 SKETCH DESIGNERS</span>
            <h2 style={{ marginBottom: '24px', color: 'var(--walnut)' }}>About Our Studio</h2>
            <p style={{ fontSize: '18px', color: 'var(--stone-text)', lineHeight: '1.8', maxWidth: '600px' }}>
              At 7 Sketch Designers, we are a multidisciplinary Architectural, Interior Design & Project Management Consultancy firm with over 12 years of industry experience. We specialize in delivering world-class commercial and corporate spaces that combine functionality, innovation, and uncompromising quality.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'var(--card-neutral)', padding: '32px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ fontSize: '48px', fontFamily: 'var(--font-display)', fontWeight: '500', color: 'var(--clay-deep)', lineHeight: 1 }}>
                12+
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--walnut)', fontSize: '16px' }}>Years</div>
                <div style={{ color: 'var(--stone-text)', fontSize: '14px' }}>Industry Experience</div>
              </div>
            </div>

            <div style={{ background: 'var(--card-neutral)', padding: '32px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ fontSize: '48px', fontFamily: 'var(--font-display)', fontWeight: '500', color: 'var(--clay-deep)', lineHeight: 1 }}>
                06
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--walnut)', fontSize: '16px' }}>Professionals</div>
                <div style={{ color: 'var(--stone-text)', fontSize: '14px' }}>Dedicated Team</div>
              </div>
            </div>

            <div style={{ background: 'var(--card-neutral)', padding: '32px', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', gap: '24px' }}>
              <div style={{ fontSize: '48px', fontFamily: 'var(--font-display)', fontWeight: '500', color: 'var(--clay-deep)', lineHeight: 1 }}>
                HQ
              </div>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--walnut)', fontSize: '16px' }}>Pune-based</div>
                <div style={{ color: 'var(--stone-text)', fontSize: '14px' }}>Studio Location</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
