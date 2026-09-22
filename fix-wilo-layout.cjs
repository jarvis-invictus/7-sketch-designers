const fs = require('fs');
let content = fs.readFileSync('src/components/ui/projects-portfolio.tsx', 'utf8');

const regex = /\) : selectedProject\.id === 'wilo' \? \([\s\S]*?\) : \(\s*<div style=\{\{ display: 'flex', flexDirection: 'column', gap: '24px' \}\}>\s*\{selectedProject\.images\.map/;

const newBlock = `) : selectedProject.id === 'wilo' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Hero Banner: Lounge Wide */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      style={{ width: '100%', backgroundColor: 'var(--card-neutral)', borderRadius: '12px', cursor: 'pointer', position: 'relative', display: 'flex', justifyContent: 'center' }}
                      onClick={() => setLightboxImage(selectedProject.images[0])}
                    >
                      <img src={selectedProject.images[0]} style={{ width: '100%', height: 'auto', maxHeight: '550px', objectFit: 'cover', objectPosition: 'center', borderRadius: '12px' }} alt="Wilo Hero" />
                      <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '50%', color: 'white' }}><Maximize2 size={16} /></div>
                    </motion.div>

                    {/* Compact 3-Column Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                      {[1, 2, 3].map((idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + (idx * 0.05) }}
                          style={{ width: '100%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                          onClick={() => setLightboxImage(selectedProject.images[idx])}
                        >
                          <img 
                            src={selectedProject.images[idx]} 
                            alt={\`Wilo view \${idx}\`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          />
                        </motion.div>
                      ))}
                    </div>

                    {/* Full Width Collage */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                      style={{ width: '100%', height: '400px', backgroundColor: 'var(--card-neutral)', borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                      onClick={() => setLightboxImage(selectedProject.images[4])}
                    >
                      <img src={selectedProject.images[4]} style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform 0.4s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} alt="Wilo Collage" />
                    </motion.div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {selectedProject.images.map`;

if (regex.test(content)) {
  content = content.replace(regex, newBlock);
  fs.writeFileSync('src/components/ui/projects-portfolio.tsx', content);
  console.log("Successfully fixed Wilo layout to projects-portfolio.tsx");
} else {
  console.error("Target regex not found in projects-portfolio.tsx");
}
