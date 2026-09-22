const fs = require('fs');

let content = fs.readFileSync('src/components/ui/projects-portfolio.tsx', 'utf8');

const target = `<img 
              src={selectedProject.images[0]} 
              alt={selectedProject.title} 
              style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }} 
            />`;

const replacement = `{selectedProject.id === 'gokarting' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '20px', backgroundColor: '#000' }}>
                <img src={selectedProject.images[0]} style={{ width: '100%', height: 'auto', borderRadius: '12px' }} alt="Exterior Night" />
                <img src={selectedProject.images[1]} style={{ width: '100%', height: 'auto', borderRadius: '12px' }} alt="Aerial Track" />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <img src={selectedProject.images[2]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} alt="Lounge" />
                  <img src={selectedProject.images[4]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} alt="Red Lounge" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '16px' }}>
                  <img src={selectedProject.images[3]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} alt="Neon Room" />
                  <img src={selectedProject.images[4]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} alt="Shelves" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <img src={selectedProject.images[6]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} alt="Arcade" />
                  <img src={selectedProject.images[7]} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} alt="Cafe" />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {selectedProject.images.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img} 
                    alt={\`\${selectedProject.title} - \${idx}\`} 
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }} 
                  />
                ))}
              </div>
            )}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/ui/projects-portfolio.tsx', content);
  console.log("Successfully updated the modal!");
} else {
  console.error("Target string not found!");
}
