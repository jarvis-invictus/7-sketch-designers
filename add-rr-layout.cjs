const fs = require('fs');
let content = fs.readFileSync('src/components/ui/projects-portfolio.tsx', 'utf8');

const regex = /\) : \(\s*<div style=\{\{ display: 'flex', flexDirection: 'column', gap: '24px' \}\}>\s*\{selectedProject\.images\.map/;

const newBlock = `) : selectedProject.id === 'rr-heritage' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Hero Banner: Existing Cover */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      style={{ width: '100%', backgroundColor: 'var(--card-neutral)', borderRadius: '12px', cursor: 'pointer', position: 'relative', display: 'flex', justifyContent: 'center' }}
                      onClick={() => setLightboxImage(selectedProject.images[0])}
                    >
                      <img src={selectedProject.images[0]} style={{ width: '100%', height: 'auto', maxHeight: '550px', objectFit: 'cover', objectPosition: 'center', borderRadius: '12px' }} alt="RR Heritage Cover" />
                      <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '50%', color: 'white' }}><Maximize2 size={16} /></div>
                    </motion.div>

                    {/* Row 1: Resort Facade (Wide) */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                      style={{ width: '100%', borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                      onClick={() => setLightboxImage(selectedProject.images[1])}
                    >
                      <img src={selectedProject.images[1]} style={{ width: '100%', height: 'auto', maxHeight: '600px', objectFit: 'contain', backgroundColor: 'var(--card-neutral)' }} alt="Resort Exterior Facade" />
                    </motion.div>

                    {/* Row 2: Loft Suite (Tall) */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', backgroundColor: 'var(--card-neutral)', borderRadius: '8px', padding: '16px 0', cursor: 'zoom-in' }}
                      onClick={() => setLightboxImage(selectedProject.images[2])}
                    >
                      <img src={selectedProject.images[2]} style={{ height: 'auto', width: '100%', maxHeight: '750px', objectFit: 'contain' }} alt="Loft Suite Interior" />
                    </motion.div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {selectedProject.images.map`;

if (regex.test(content)) {
  content = content.replace(regex, newBlock);
  fs.writeFileSync('src/components/ui/projects-portfolio.tsx', content);
  console.log("Successfully added RR Heritage layout to projects-portfolio.tsx");
} else {
  console.error("Target regex not found in projects-portfolio.tsx");
}
