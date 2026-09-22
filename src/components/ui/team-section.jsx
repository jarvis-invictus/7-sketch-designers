import React from 'react';

export default function TeamSection() {
  const founders = [
    { name: 'Rohit Wankhede', role: 'Founder & Principal Architect', image: '/team-rohit.jpg' },
    { name: 'Anita Wankhede', role: 'Founder, VK Infra Solutions / Accounts & Purchase' }
  ];

  const team = [
    { name: 'Deepa Vinayan', role: 'Senior Designer', image: '/team-deepa.jpg' },
    { name: 'Komal Narkar', role: 'Senior Designer', image: '/team-komal.jpg' },
    { name: 'Hemangee Suryawanshi', role: 'Junior Designer', image: '/team-hemangee.jpg' }
  ];

  return (
    <section id="team" className="section-wrapper" style={{ background: 'var(--page-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 80px auto' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>THE PEOPLE BEHIND THE SPACES</span>
          <h2 style={{ color: 'var(--walnut)' }}>Meet Our Team</h2>
        </div>

        {/* Founders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 max-w-[700px] mx-auto">
          {founders.map((founder, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', background: 'var(--section-cream)', margin: '0 auto 24px auto', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                {founder.image ? (
                  <img src={founder.image} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '56px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                    {founder.name.charAt(0)}
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--walnut)', fontFamily: 'var(--font-display)' }}>{founder.name}</h3>
              <p style={{ fontSize: '15px', color: 'var(--stone-text)', maxWidth: '280px' }}>{founder.role}</p>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 max-w-[900px] mx-auto">
          {team.map((member, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: 'var(--section-cream)', margin: '0 auto 20px auto', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                ) : (
                  <span style={{ fontSize: '40px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>
              <h4 style={{ fontSize: '20px', marginBottom: '6px', color: 'var(--walnut)', fontFamily: 'var(--font-display)' }}>{member.name}</h4>
              <p style={{ fontSize: '14px', color: 'var(--stone-text)' }}>{member.role}</p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
