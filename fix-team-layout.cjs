const fs = require('fs');
let content = fs.readFileSync('src/components/ui/team-section.jsx', 'utf8');

const regex = /return \([\s\S]*?\);\s*\}/;

const newBlock = `return (
    <section id="team" className="section-wrapper" style={{ background: 'var(--page-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 64px auto' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>THE PEOPLE BEHIND THE SPACES</span>
          <h2 style={{ color: 'var(--walnut)' }}>Meet Our Team</h2>
        </div>

        {/* Founders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-[800px] mx-auto">
          {founders.map((founder, idx) => (
            <div key={idx} className="luxury-card" style={{ background: 'var(--card-neutral)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', aspectRatio: '4/5', background: 'var(--section-cream)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {founder.image ? (
                  <img src={founder.image} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '64px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                    {founder.name.charAt(0)}
                  </span>
                )}
              </div>
              <div style={{ padding: '32px 24px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--walnut)' }}>{founder.name}</h3>
                <p style={{ fontSize: '15px', color: 'var(--stone-text)', lineHeight: '1.4' }}>{founder.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div key={idx} className="luxury-card" style={{ background: 'var(--card-neutral)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '100%', aspectRatio: '4/5', background: 'var(--section-cream)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                ) : (
                  <span style={{ fontSize: '48px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>
              <div style={{ padding: '24px 16px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '18px', marginBottom: '6px', color: 'var(--walnut)', fontFamily: 'var(--font-display)' }}>{member.name}</h4>
                <p style={{ fontSize: '13px', color: 'var(--stone-text)', lineHeight: '1.4' }}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}`;

if (regex.test(content)) {
  content = content.replace(regex, newBlock);
  fs.writeFileSync('src/components/ui/team-section.jsx', content);
  console.log("Successfully redesigned team-section.jsx");
} else {
  console.error("Target regex not found in team-section.jsx");
}
