import React from 'react';

export default function TeamSection() {
  const founders = [
    { name: 'Rohit Wankhede', role: 'Founder & Principal Architect' },
    { name: 'Anita Wankhede', role: 'Founder, VK Infra Solutions / Accounts & Purchase' }
  ];

  const team = [
    { name: 'Deepa Vinayan', role: 'Senior Designer' },
    { name: 'Komal Narkar', role: 'Senior Designer' },
    { name: 'Niketan Suryawanshi', role: 'Site Engineer' },
    { name: 'Hemangee Suryawanshi', role: 'Junior Designer' }
  ];

  return (
    <section id="team" className="section-wrapper" style={{ background: 'var(--page-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 64px auto' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>THE PEOPLE BEHIND THE SPACES</span>
          <h2 style={{ color: 'var(--walnut)' }}>Meet Our Team</h2>
        </div>

        {/* Founders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-[800px] mx-auto">
          {founders.map((founder, idx) => (
            <div key={idx} className="luxury-card" style={{ background: 'var(--card-neutral)', padding: '40px', textAlign: 'center' }}>
              <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'var(--section-cream)', margin: '0 auto 24px auto', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '32px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                  {founder.name.charAt(0)}
                </span>
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '8px', color: 'var(--walnut)' }}>{founder.name}</h3>
              <p style={{ fontSize: '14px', color: 'var(--stone-text)' }}>{founder.role}</p>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div key={idx} className="luxury-card" style={{ background: '#FFFFFF', padding: '32px 24px', textAlign: 'center', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--page-cream)', margin: '0 auto 16px auto', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '24px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                  {member.name.charAt(0)}
                </span>
              </div>
              <h4 style={{ fontSize: '18px', marginBottom: '6px', color: 'var(--walnut)', fontFamily: 'var(--font-display)' }}>{member.name}</h4>
              <p style={{ fontSize: '13px', color: 'var(--stone-text)' }}>{member.role}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
