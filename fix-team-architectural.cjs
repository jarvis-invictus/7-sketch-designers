const fs = require('fs');
let content = fs.readFileSync('src/components/ui/team-section.jsx', 'utf8');

const regex = /return \([\s\S]*?\);\s*\}/;

const newBlock = `return (
    <section id="team" style={{ background: 'var(--page-cream)', padding: '120px 24px', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 80px auto' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>THE PEOPLE BEHIND THE SPACES</span>
          <h2 style={{ color: 'var(--walnut)' }}>Meet Our Team</h2>
        </div>

        {/* Founders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 max-w-[700px] mx-auto">
          {founders.map((founder, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', maxWidth: '300px', aspectRatio: '3/4', background: 'var(--section-cream)', overflow: 'hidden', marginBottom: '20px', borderRadius: '4px' }}>
                {founder.image ? (
                  <img src={founder.image} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '40px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                      {founder.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div style={{ width: '100%', maxWidth: '300px', textAlign: 'left' }}>
                <h3 style={{ fontSize: '20px', marginBottom: '4px', color: 'var(--walnut)', fontFamily: 'var(--font-display)' }}>{founder.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--stone-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{founder.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16 max-w-[1000px] mx-auto">
          {team.map((member, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '100%', maxWidth: '260px', aspectRatio: '3/4', background: 'var(--section-cream)', overflow: 'hidden', marginBottom: '20px', borderRadius: '4px' }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '32px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div style={{ width: '100%', maxWidth: '260px', textAlign: 'left' }}>
                <h4 style={{ fontSize: '18px', marginBottom: '4px', color: 'var(--walnut)', fontFamily: 'var(--font-display)' }}>{member.name}</h4>
                <p style={{ fontSize: '13px', color: 'var(--stone-text)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{member.role}</p>
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
  console.log("Successfully redesigned team-section.jsx to a strict architectural layout");
} else {
  console.error("Target regex not found in team-section.jsx");
}
