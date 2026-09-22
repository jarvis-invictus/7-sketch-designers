const fs = require('fs');

let content = fs.readFileSync('src/components/ui/projects-portfolio.tsx', 'utf8');

const regex = /\{selectedProject\.id === 'gokarting' \? \([\s\S]*?<\/div>\s*<\/div>\s*\)\}\s*<\/section>/;

const newBlock = `{/* TEXT CONTENT FIRST */}
            <div style={{ padding: '40px 40px 24px 40px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--clay)', textTransform: 'uppercase', marginBottom: '12px' }}>
                {selectedProject.type || selectedProject.category}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--walnut)', marginBottom: '16px', lineHeight: '1.2' }}>
                {selectedProject.title}
              </h2>
              <p style={{ color: 'var(--stone-text)', fontSize: '16px', lineHeight: '1.6', margin: 0 }}>
                {selectedProject.details || selectedProject.scope}
              </p>
            </div>

            {/* GALLERY GRID */}
            <div style={{ padding: '0 40px 40px 40px' }}>
              {selectedProject.id === 'gokarting' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Hero Image (Contained) */}
                  <div style={{ width: '100%', height: '350px', borderRadius: '12px', overflow: 'hidden' }}>
                    <img src={selectedProject.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Hero" />
                  </div>
                  
                  {/* Compact 3-Column Grid for remaining 7 images */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {selectedProject.images.slice(1).map((img, idx) => (
                      <div key={idx} style={{ width: '100%', aspectRatio: '1/1', borderRadius: '8px', overflow: 'hidden' }}>
                        <img 
                          src={img} 
                          alt={\`Gallery view \${idx + 1}\`} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {selectedProject.images.map((img, idx) => (
                    <img 
                      key={idx}
                      src={img} 
                      alt={\`\${selectedProject.title} - \${idx}\`} 
                      style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'contain' }} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>`;

if (regex.test(content)) {
  content = content.replace(regex, newBlock);
  fs.writeFileSync('src/components/ui/projects-portfolio.tsx', content);
  console.log("Successfully rebuilt the modal layout!");
} else {
  console.error("Target regex not found!");
}
