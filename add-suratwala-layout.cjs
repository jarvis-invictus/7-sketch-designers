const fs = require('fs');
let content = fs.readFileSync('src/components/ui/projects-portfolio.tsx', 'utf8');

const regex = /\{selectedProject\.id === 'gokarting' \? \([\s\S]*?\) : \(/;

const newBlock = `{selectedProject.id === 'gokarting' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Hero Image (Contained) */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      style={{ width: '100%', backgroundColor: 'var(--card-neutral)', borderRadius: '12px', cursor: 'pointer', position: 'relative', display: 'flex', justifyContent: 'center' }}
                      onClick={() => setLightboxImage(selectedProject.images[0])}
                    >
                      <img src={selectedProject.images[0]} style={{ width: '100%', height: 'auto', maxHeight: '550px', objectFit: 'cover', objectPosition: 'center 15%', borderRadius: '12px' }} alt="Hero" />
                      <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '50%', color: 'white' }}><Maximize2 size={16} /></div>
                    </motion.div>
                    
                    {/* Compact 3-Column Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                      {selectedProject.images.slice(1).map((img, idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + (idx * 0.05) }}
                          style={{ width: '100%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                          onClick={() => setLightboxImage(img)}
                        >
                          <img 
                            src={img} 
                            alt={\`Gallery view \${idx + 1}\`} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : selectedProject.id === 'suratwala' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Hero Banner: Hallway */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      style={{ width: '100%', backgroundColor: 'var(--card-neutral)', borderRadius: '12px', cursor: 'pointer', position: 'relative', display: 'flex', justifyContent: 'center' }}
                      onClick={() => setLightboxImage(selectedProject.images[0])}
                    >
                      <img src={selectedProject.images[0]} style={{ width: '100%', height: 'auto', maxHeight: '550px', objectFit: 'cover', objectPosition: 'center', borderRadius: '12px' }} alt="Hallway Hero" />
                      <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '50%', color: 'white' }}><Maximize2 size={16} /></div>
                    </motion.div>

                    {/* Row 1: The Open Office (50/50 split) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      {[1, 2].map((idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                          style={{ width: '100%', height: '300px', borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                          onClick={() => setLightboxImage(selectedProject.images[idx])}
                        >
                          <img src={selectedProject.images[idx]} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} alt="Workspace" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Row 2: The Executive Cabin (60/40 split) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '16px' }}>
                      {[3, 4].map((idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                          style={{ width: '100%', height: '350px', borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                          onClick={() => setLightboxImage(selectedProject.images[idx])}
                        >
                          <img src={selectedProject.images[idx]} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} alt="Cabin" />
                        </motion.div>
                      ))}
                    </div>

                    {/* Row 3: Utility & Detail (50/50 split) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      {[5, 6].map((idx) => (
                        <motion.div 
                          key={idx} 
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                          style={{ width: '100%', height: '300px', borderRadius: '8px', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
                          onClick={() => setLightboxImage(selectedProject.images[idx])}
                        >
                          <img src={selectedProject.images[idx]} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} alt="Utility" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (`;

if (regex.test(content)) {
  content = content.replace(regex, newBlock);
  fs.writeFileSync('src/components/ui/projects-portfolio.tsx', content);
  console.log("Successfully added Suratwala layout to projects-portfolio.tsx");
} else {
  console.error("Target regex not found in projects-portfolio.tsx");
}
