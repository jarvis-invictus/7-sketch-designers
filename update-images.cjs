const fs = require('fs');

let appContent = fs.readFileSync('src/App.jsx', 'utf8');

const targetOld = `              <div className="luxury-card" style={{ padding: '12px', background: '#FFFFFF' }}>
                <img src="/project-p11-3.jpg" alt="7 Sketch Designers Precision Woodwork" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '6px' }} />
              </div>`;

const targetNew = `              <div style={{ position: 'relative', width: '100%', minHeight: '450px', display: 'flex', alignItems: 'center' }}>
                {/* Main Wide Image */}
                <div className="luxury-card" style={{ position: 'absolute', top: 0, right: 0, width: '85%', height: '380px', padding: '12px', background: '#FFFFFF', zIndex: 1 }}>
                  <img src="/cnc-factory-wide.jpg" alt="7 Sketch Designers CNC Factory Floor" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
                </div>
                
                {/* Overlapping Macro Image */}
                <div className="luxury-card" style={{ position: 'absolute', bottom: '20px', left: 0, width: '55%', height: '260px', padding: '10px', background: '#FFFFFF', zIndex: 2, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
                  <img src="/cnc-factory-macro.jpg" alt="Precision CNC Edge Banding Machinery" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                </div>
              </div>`;

if (appContent.includes(targetOld)) {
  appContent = appContent.replace(targetOld, targetNew);
  fs.writeFileSync('src/App.jsx', appContent);
  console.log("Images updated successfully");
} else {
  console.log("Could not find the target block to replace.");
}
