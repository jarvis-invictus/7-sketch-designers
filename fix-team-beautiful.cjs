const fs = require('fs');
let content = fs.readFileSync('src/components/ui/team-section.jsx', 'utf8');

const regex = /return \([\s\S]*?\);\s*\}/;

const newBlock = `return (
    <section id="team" style={{ background: 'var(--page-cream)', padding: '120px 24px', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 64px auto' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>THE PEOPLE BEHIND THE SPACES</span>
          <h2 style={{ color: 'var(--walnut)' }}>Meet Our Team</h2>
        </div>

        {/* Founders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-[800px] mx-auto">
          {founders.map((founder, idx) => (
            <div key={idx} style={{ background: '#ffffff', padding: '48px 32px', borderRadius: '24px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: 'var(--section-cream)', margin: '0 auto 24px auto', border: '4px solid var(--page-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                {founder.image ? (
                  <img src={founder.image} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '48px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                    {founder.name.charAt(0)}
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--walnut)', fontFamily: 'var(--font-display)' }}>{founder.name}</h3>
              <p style={{ fontSize: '15px', color: 'var(--stone-text)', maxWidth: '280px', lineHeight: '1.5' }}>{founder.role}</p>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
          {team.map((member, idx) => (
            <div key={idx} style={{ background: '#ffffff', padding: '40px 24px', borderRadius: '24px', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ width: '140px', height: '140px', borderRadius: '50%', background: 'var(--section-cream)', margin: '0 auto 20px auto', border: '4px solid var(--page-cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                ) : (
                  <span style={{ fontSize: '40px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>
              <h4 style={{ fontSize: '20px', marginBottom: '6px', color: 'var(--walnut)', fontFamily: 'var(--font-display)' }}>{member.name}</h4>
              <p style={{ fontSize: '14px', color: 'var(--stone-text)', fontWeight: '500' }}>{member.role}</p>
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
  console.log("Successfully redesigned team-section.jsx to a beautiful card layout");
} else {
  console.error("Target regex not found in team-section.jsx");
}
