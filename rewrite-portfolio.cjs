const fs = require('fs');
const content = `import React, { useState } from 'react';
import { ZoomParallax } from './zoom-parallax';
import { ArrowRight, X, ChevronLeft, ChevronRight, MapPin, User, Target, Maximize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectsPortfolio({ projects = [], onProjectClick }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);

  if (!projects.length) return null;

  const images = projects.map(p => ({
    src: p.images[0],
    alt: p.title,
    title: p.title,
    category: p.category
  }));

  const categories = ['All', ...Array.from(new Set(projects.map(p => 
    p.category.charAt(0).toUpperCase() + p.category.slice(1)
  )))];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => (p.category.charAt(0).toUpperCase() + p.category.slice(1)) === activeCategory);

  const currentIndex = selectedProject ? projects.findIndex(p => p.id === selectedProject.id) : -1;
  const hasNext = currentIndex >= 0 && currentIndex < projects.length - 1;
  const hasPrev = currentIndex > 0;

  return (
    <section 
      id="portfolio"
      className="relative w-full"
      style={{ backgroundColor: 'var(--page-cream)' }} 
    >
      {/* 1. PARALLAX INTRO SECTION */}
      <div className="relative z-10 hidden md:block">
        <div style={{ position: 'absolute', top: '10%', left: '10%', zIndex: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '40px', height: '1px', backgroundColor: 'var(--clay)' }}></div>
            <span style={{ color: 'var(--clay)', fontWeight: '700', fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Our Work
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '56px', color: 'var(--walnut)', lineHeight: '1.1' }}>
            Curated<br />Excellence
          </h2>
          <p style={{ marginTop: '16px', color: 'var(--stone-text)', fontSize: '18px', maxWidth: '680px', lineHeight: '1.8' }}>
            Scroll down to explore a selection of our most prestigious commercial and corporate executions, crafted with architectural precision.
          </p>
        </div>
        
        <ZoomParallax images={images} />
      </div>
      
      {/* 2. INTERACTIVE GALLERY GRID */}
      <div className="relative z-30 px-4 sm:px-6 md:px-8 pb-32" style={{ marginTop: '10vh' }}>
        <div className="max-w-[1400px] mx-auto">
          
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h3 style={{ fontSize: '28px', color: 'var(--walnut)', marginBottom: '16px' }}>Explore the Details</h3>
            
            {/* Category Filters */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 'var(--radius-pill)',
                    border: \`1px solid \${activeCategory === cat ? 'var(--clay)' : 'var(--hairline)'}\`,
                    background: activeCategory === cat ? 'var(--clay)' : 'transparent',
                    color: activeCategory === cat ? '#FFFFFF' : 'var(--stone-text)',
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout for Projects */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '32px' }}>
            {filteredProjects.map((project) => (
              <div 
                key={project.id} 
                className="luxury-card"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  background: 'var(--card-neutral)', 
                  borderRadius: 'var(--radius-md)', 
                  overflow: 'hidden', 
                  border: '1px solid var(--hairline)'
                }}
              >
                {/* Project Image */}
                <div style={{ width: '100%', height: '280px', overflow: 'hidden' }}>
                  <img 
                    src={project.images[0]} 
                    alt={project.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </div>
                
                {/* Project Content */}
                <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--clay)', textTransform: 'uppercase', marginBottom: '12px' }}>
                    {project.type || project.category}
                  </div>
                  
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--walnut)', marginBottom: '16px', lineHeight: '1.3' }}>
                    {project.title}
                  </h3>
                  
                  <p style={{ color: 'var(--stone-text)', fontSize: '15px', marginBottom: '32px', flexGrow: 1 }}>
                    {project.details || project.scope}
                  </p>
                  
                  <button 
                    onClick={() => setSelectedProject(project)} 
                    className="btn-primary" 
                    style={{ width: '100%', justifyContent: 'center', marginTop: 'auto' }}
                  >
                    Explore the Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(250, 246, 240, 0.95)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}
          >
            {/* Prev Navigation */}
            {hasPrev && (
              <button 
                onClick={() => setSelectedProject(projects[currentIndex - 1])}
                style={{ position: 'absolute', left: '40px', top: '50%', transform: 'translateY(-50%)', background: 'var(--walnut)', color: 'white', border: 'none', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10001, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
              >
                <ChevronLeft size={28} />
              </button>
            )}

            <motion.div 
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                position: 'relative',
                background: 'var(--card-neutral)',
                width: '100%',
                maxWidth: '900px',
                maxHeight: '90vh',
                overflowY: 'auto',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <button 
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
              }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--clay)', textTransform: 'uppercase', marginBottom: '12px' }}>
                  {selectedProject.type || selectedProject.category}
                </div>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '36px', color: 'var(--walnut)', marginBottom: '16px', lineHeight: '1.1' }}>
                  {selectedProject.title}
                </h2>
                <p style={{ color: 'var(--stone-text)', fontSize: '16px', lineHeight: '1.6', margin: 0, maxWidth: '700px' }}>
                  {selectedProject.details || selectedProject.scope}
                </p>

                {/* Metadata Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--hairline)' }}>
                  {selectedProject.client && (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <User size={18} color="var(--clay)" style={{ marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--stone-text)', fontWeight: '600', marginBottom: '2px' }}>Client</div>
                        <div style={{ fontSize: '15px', color: 'var(--walnut)', fontWeight: '500' }}>{selectedProject.client}</div>
                      </div>
                    </div>
                  )}
                  {selectedProject.location && (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <MapPin size={18} color="var(--clay)" style={{ marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--stone-text)', fontWeight: '600', marginBottom: '2px' }}>Location</div>
                        <div style={{ fontSize: '15px', color: 'var(--walnut)', fontWeight: '500' }}>{selectedProject.location}</div>
                      </div>
                    </div>
                  )}
                  {selectedProject.scope && (
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                      <Target size={18} color="var(--clay)" style={{ marginTop: '2px' }} />
                      <div>
                        <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--stone-text)', fontWeight: '600', marginBottom: '2px' }}>Scope</div>
                        <div style={{ fontSize: '15px', color: 'var(--walnut)', fontWeight: '500' }}>{selectedProject.scope}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* GALLERY GRID */}
              <div style={{ padding: '40px' }}>
                {selectedProject.id === 'gokarting' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Hero Image (Contained) */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      style={{ width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
                      onClick={() => setLightboxImage(selectedProject.images[0])}
                    >
                      <img src={selectedProject.images[0]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Hero" />
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
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {selectedProject.images.map((img, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + (idx * 0.1) }}
                        style={{ cursor: 'zoom-in', position: 'relative' }}
                        onClick={() => setLightboxImage(img)}
                      >
                        <img 
                          src={img} 
                          alt={\`\${selectedProject.title} - \${idx}\`} 
                          style={{ width: '100%', height: 'auto', borderRadius: '12px', objectFit: 'contain' }} 
                        />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
            
            {/* Next Navigation */}
            {hasNext && (
              <button 
                onClick={() => setSelectedProject(projects[currentIndex + 1])}
                style={{ position: 'absolute', right: '40px', top: '50%', transform: 'translateY(-50%)', background: 'var(--walnut)', color: 'white', border: 'none', borderRadius: '50%', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10001, boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}
              >
                <ChevronRight size={28} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX OVERLAY */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxImage(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 100000,
              backgroundColor: 'rgba(0,0,0,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px', cursor: 'zoom-out'
            }}
          >
            <button 
              onClick={() => setLightboxImage(null)}
              style={{
                position: 'absolute', top: '24px', right: '24px',
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '50%', width: '48px', height: '48px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', cursor: 'pointer', zIndex: 100001
              }}
            >
              <X size={24} />
            </button>
            
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              src={lightboxImage}
              alt="Fullscreen view"
              style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain', borderRadius: '4px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image itself
            />
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
`;

fs.writeFileSync('src/components/ui/projects-portfolio.tsx', content);
console.log("Successfully rebuilt the entire ProjectsPortfolio component with all 4 features!");
