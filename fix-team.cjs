const fs = require('fs');
let content = fs.readFileSync('src/components/ui/team-section.jsx', 'utf8');

const targetTeamRegex = /const team = \[\s*\{\s*name: 'Deepa Vinayan',\s*role: 'Senior Designer'\s*\},/;
const replaceTeam = `const team = [
    { name: 'Deepa Vinayan', role: 'Senior Designer', image: '/team-deepa.jpg' },`;

content = content.replace(targetTeamRegex, replaceTeam);

const targetRenderRegex = /<div style=\{\{ width: '64px', height: '64px', borderRadius: '50%', background: 'var\(--page-cream\)', margin: '0 auto 16px auto', border: '1px solid var\(--hairline\)', display: 'flex', alignItems: 'center', justifyContent: 'center' \}\}>\s*<span style=\{\{ fontSize: '24px', fontFamily: 'var\(--font-display\)', color: 'var\(--clay-deep\)' \}\}>\s*\{member\.name\.charAt\(0\)\}\s*<\/span>\s*<\/div>/;

const replaceRender = `<div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'var(--page-cream)', margin: '0 auto 20px auto', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {member.image ? (
                  <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '32px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                    {member.name.charAt(0)}
                  </span>
                )}
              </div>`;

content = content.replace(targetRenderRegex, replaceRender);

// Also let's update Founders render block to support images just in case
const targetFounderRegex = /<div style=\{\{ width: '90px', height: '90px', borderRadius: '50%', background: 'var\(--section-cream\)', margin: '0 auto 24px auto', border: '1px solid var\(--hairline\)', display: 'flex', alignItems: 'center', justifyContent: 'center' \}\}>\s*<span style=\{\{ fontSize: '32px', fontFamily: 'var\(--font-display\)', color: 'var\(--clay-deep\)' \}\}>\s*\{founder\.name\.charAt\(0\)\}\s*<\/span>\s*<\/div>/;

const replaceFounder = `<div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'var(--section-cream)', margin: '0 auto 24px auto', border: '1px solid var(--hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {founder.image ? (
                  <img src={founder.image} alt={founder.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <span style={{ fontSize: '40px', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>
                    {founder.name.charAt(0)}
                  </span>
                )}
              </div>`;

content = content.replace(targetFounderRegex, replaceFounder);

fs.writeFileSync('src/components/ui/team-section.jsx', content);
console.log("Team section updated successfully");
