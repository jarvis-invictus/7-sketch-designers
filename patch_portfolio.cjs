const fs = require('fs');
let code = fs.readFileSync('src/components/ui/projects-portfolio.tsx', 'utf8');

const oldButton = `              <button 
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255,255,255,0.9)',
                  border: '1px solid var(--hairline)',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 30,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              >
                <X size={20} color="var(--walnut)" />
              </button>

              {/* STICKY EDITORIAL HEADER */}
              <div style={{ 
                padding: '40px 40px 24px 40px', 
                position: 'sticky', 
                top: 0, 
                background: 'rgba(253, 252, 249, 0.95)', 
                backdropFilter: 'blur(10px)', 
                zIndex: 20, 
                borderBottom: '1px solid var(--hairline)' 
              }}>`;

const newButton = `              {/* STICKY EDITORIAL HEADER */}
              <div style={{ 
                padding: '40px 40px 24px 40px', 
                position: 'sticky', 
                top: 0, 
                background: 'rgba(253, 252, 249, 0.95)', 
                backdropFilter: 'blur(10px)', 
                zIndex: 40, 
                borderBottom: '1px solid var(--hairline)' 
              }}>
                <button 
                  onClick={() => setSelectedProject(null)}
                  style={{
                    position: 'absolute',
                    top: '24px',
                    right: '24px',
                    background: 'rgba(255,255,255,0.9)',
                    border: '1px solid var(--hairline)',
                    borderRadius: '50%',
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 50,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'var(--walnut)';
                    e.currentTarget.style.color = 'white';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                    e.currentTarget.style.color = 'var(--walnut)';
                  }}
                >
                  <X size={20} color="currentColor" />
                </button>`;

code = code.replace(oldButton, newButton);

fs.writeFileSync('src/components/ui/projects-portfolio.tsx', code);
