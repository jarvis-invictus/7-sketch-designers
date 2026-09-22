const fs = require('fs');

let appContent = fs.readFileSync('src/App.jsx', 'utf8');

const targetSection = `
              <div>
                <span className="brand-badge" style={{ background: 'rgba(194, 155, 56, 0.2)', color: 'var(--brand-gold)', borderColor: 'var(--brand-gold)' }}>In-House Manufacturing</span>
                <h2 style={{ color: 'var(--walnut)', marginTop: '16px', marginBottom: '22px' }}>
                  State-of-the-Art German CNC Manufacturing
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  Unlike traditional interior contractors who rely on slow on-site carpentry, 7 Sketch Designers operates our own state-of-the-art manufacturing facility equipped with German CNC precision machinery. We proudly manufacture and execute for our own clients, while also serving a network of valued associates—including Module F Homes and multiple other partners.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="var(--brand-gold)" />
                    <span style={{ fontSize: '15.5px', color: 'var(--walnut)', fontWeight: '600' }}>50% Faster Fit-Out Delivery (Precision Factory Cut)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="var(--brand-gold)" />
                    <span style={{ fontSize: '15.5px', color: 'var(--walnut)', fontWeight: '600' }}>Zero On-Site Dust & Noise (Off-Site Pre-Fabrication)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="var(--brand-gold)" />
                    <span style={{ fontSize: '15.5px', color: 'var(--walnut)', fontWeight: '600' }}>10-Year Factory Warranty on All Modular Woodwork</span>
                  </div>
                </div>

                <a href="#contact" onClick={(e) => { e.preventDefault(); setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }), 100); }} className="btn-primary">
                  Inquire About Modular Fit-Outs <ArrowRight size={16} />
                </a>
              </div>

              <div className="luxury-card" style={{ padding: '12px', background: '#FFFFFF' }}>
                <img src="/project-p20-1.jpg" alt="7 Sketch Designers Precision Woodwork" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '6px' }} />
              </div>
`;

const newSection = `
              <div>
                <span className="brand-badge" style={{ background: 'rgba(194, 155, 56, 0.2)', color: 'var(--brand-gold)', borderColor: 'var(--brand-gold)' }}>In-House Manufacturing</span>
                <h2 style={{ color: 'var(--walnut)', marginTop: '16px', marginBottom: '24px' }}>
                  State-of-the-Art German CNC Manufacturing
                </h2>
                <p style={{ color: 'var(--stone-text)', fontSize: '17px', lineHeight: '1.7', maxWidth: '580px', marginBottom: '36px' }}>
                  Unlike traditional interior contractors who rely on slow on-site carpentry, 7 Sketch Designers operates our own state-of-the-art manufacturing facility equipped with German CNC precision machinery. We proudly manufacture and execute for our own clients, while also serving a network of valued associates—including Module F Homes and multiple other partners.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="#C29B38" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: 'var(--walnut)', fontWeight: '500' }}>50% Faster Fit-Out Delivery (Precision Factory Cut)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="#C29B38" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: 'var(--walnut)', fontWeight: '500' }}>Zero On-Site Dust & Noise (Off-Site Pre-Fabrication)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="#C29B38" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: 'var(--walnut)', fontWeight: '500' }}>10-Year Factory Warranty on All Modular Woodwork</span>
                  </div>
                </div>

                <a href="#contact" onClick={(e) => { e.preventDefault(); setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }), 100); }} className="btn-primary" style={{ display: 'inline-flex', padding: '14px 28px', alignItems: 'center', gap: '8px' }}>
                  Inquire About Modular Fit-Outs <ArrowRight size={18} />
                </a>
              </div>

              <div className="luxury-card" style={{ padding: '12px', background: '#FFFFFF' }}>
                <img src="/project-p11-3.jpg" alt="7 Sketch Designers Precision Woodwork" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '6px' }} />
              </div>
`;

// It's possible whitespace is slightly different, let's just do targeted replacements if the full block fails
if (appContent.includes(targetSection.trim())) {
  appContent = appContent.replace(targetSection.trim(), newSection.trim());
} else {
  console.log("Full block replacement failed, doing piece-meal");
  // Paragraph
  appContent = appContent.replace(
    `style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>\n                  Unlike`,
    `style={{ color: 'var(--stone-text)', fontSize: '17px', lineHeight: '1.7', maxWidth: '580px', marginBottom: '36px' }}>\n                  Unlike`
  );
  // Heading margin
  appContent = appContent.replace(
    `style={{ color: 'var(--walnut)', marginTop: '16px', marginBottom: '22px' }}>\n                  State`,
    `style={{ color: 'var(--walnut)', marginTop: '16px', marginBottom: '24px' }}>\n                  State`
  );
  // Bullet container
  appContent = appContent.replace(
    `style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px' }}>`,
    `style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>`
  );
  // Bullet 1
  appContent = appContent.replace(
    `<CheckCircle2 size={22} color="var(--brand-gold)" />\n                    <span style={{ fontSize: '15.5px', color: 'var(--walnut)', fontWeight: '600' }}>50%`,
    `<CheckCircle2 size={22} color="#C29B38" style={{ flexShrink: 0 }} />\n                    <span style={{ fontSize: '16px', color: 'var(--walnut)', fontWeight: '500' }}>50%`
  );
  // Bullet 2
  appContent = appContent.replace(
    `<CheckCircle2 size={22} color="var(--brand-gold)" />\n                    <span style={{ fontSize: '15.5px', color: 'var(--walnut)', fontWeight: '600' }}>Zero`,
    `<CheckCircle2 size={22} color="#C29B38" style={{ flexShrink: 0 }} />\n                    <span style={{ fontSize: '16px', color: 'var(--walnut)', fontWeight: '500' }}>Zero`
  );
  // Bullet 3
  appContent = appContent.replace(
    `<CheckCircle2 size={22} color="var(--brand-gold)" />\n                    <span style={{ fontSize: '15.5px', color: 'var(--walnut)', fontWeight: '600' }}>10-Year`,
    `<CheckCircle2 size={22} color="#C29B38" style={{ flexShrink: 0 }} />\n                    <span style={{ fontSize: '16px', color: 'var(--walnut)', fontWeight: '500' }}>10-Year`
  );
  // Button
  appContent = appContent.replace(
    `className="btn-primary">\n                  Inquire About Modular Fit-Outs <ArrowRight size={16} />`,
    `className="btn-primary" style={{ display: 'inline-flex', padding: '14px 28px', alignItems: 'center', gap: '8px' }}>\n                  Inquire About Modular Fit-Outs <ArrowRight size={18} />`
  );
  // Image
  appContent = appContent.replace(
    `src="/project-p20-1.jpg" alt="7 Sketch Designers Precision Woodwork"`,
    `src="/project-p11-3.jpg" alt="7 Sketch Designers Precision Woodwork"`
  );
}

fs.writeFileSync('src/App.jsx', appContent);
console.log('Formatted Manufacturing Section Successfully');
