const fs = require('fs');

let content = fs.readFileSync('src/components/ui/project-detail.jsx', 'utf8');

const target = `{galleryImages.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--walnut)] mb-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryImages.map((img, idx) => (
                <div key={idx} className={\`overflow-hidden rounded-xl border border-[var(--hairline)] \${idx === 2 ? 'md:col-span-2' : ''}\`}>
                  <img 
                    src={img} 
                    alt={\`\${project.title} - view \${idx + 1}\`} 
                    className="w-full h-[300px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        )}`;

const replacement = `{galleryImages.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--walnut)] mb-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
              Gallery
            </h2>
            
            {project.id === 'gokarting' ? (
              <div className="flex flex-col gap-6">
                {/* Row 1: Massive Scale (Full Width) */}
                <div className="w-full overflow-hidden rounded-xl border border-[var(--hairline)]">
                  <img src={galleryImages[0]} alt="Aerial Track View" className="w-full h-[300px] md:h-[600px] object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                
                {/* Row 2: Core Experience (50/50) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="overflow-hidden rounded-xl border border-[var(--hairline)]">
                    <img src={galleryImages[1]} alt="Track-side Lounge" className="w-full h-[300px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-[var(--hairline)]">
                    <img src={galleryImages[4]} alt="Red VIP Lounge" className="w-full h-[300px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>

                {/* Row 3: Design Details (60/40) */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="md:col-span-3 overflow-hidden rounded-xl border border-[var(--hairline)]">
                    <img src={galleryImages[2]} alt="Neon Theme Room" className="w-full h-[300px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="md:col-span-2 overflow-hidden rounded-xl border border-[var(--hairline)]">
                    <img src={galleryImages[3]} alt="Shelving Detail" className="w-full h-[300px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>

                {/* Row 4: Amenities (50/50) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="overflow-hidden rounded-xl border border-[var(--hairline)]">
                    <img src={galleryImages[5]} alt="Arcade Zone" className="w-full h-[300px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="overflow-hidden rounded-xl border border-[var(--hairline)]">
                    <img src={galleryImages[6]} alt="Bub-It Cafe" className="w-full h-[300px] md:h-[450px] object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {galleryImages.map((img, idx) => (
                  <div key={idx} className={\`overflow-hidden rounded-xl border border-[var(--hairline)] \${idx === 2 ? 'md:col-span-2' : ''}\`}>
                    <img 
                      src={img} 
                      alt={\`\${project.title} - view \${idx + 1}\`} 
                      className="w-full h-[300px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync('src/components/ui/project-detail.jsx', content);
  console.log("Successfully updated layout!");
} else {
  console.error("Target string not found!");
}
