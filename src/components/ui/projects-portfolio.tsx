import React, { useState } from 'react';
import { ZoomParallax } from './zoom-parallax';
import { ArrowRight, X } from 'lucide-react';

export default function ProjectsPortfolio({ projects = [], onProjectClick }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

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

  return (
    <section 
      id="portfolio"
      className="relative w-full"
      style={{ backgroundColor: 'var(--page-cream)' }} 
    >
      {/* 1. PARALLAX INTRO SECTION */}
      <div className="relative z-20">
        <div className="relative flex h-[40vh] md:h-[50vh] items-center justify-center flex-col px-4 pt-24" style={{ textAlign: 'center' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>Curated Portfolio</span>
          <h2 className="text-center font-bold" style={{ color: 'var(--walnut)' }}>
            Signature Spaces
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
                    border: `1px solid ${activeCategory === cat ? 'var(--clay)' : 'var(--hairline)'}`,
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
      {selectedProject && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(250, 246, 240, 0.95)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            position: 'relative',
            background: 'var(--card-neutral)',
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            overflowY: 'auto',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <button 
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.8)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={24} color="var(--walnut)" />
            </button>

            <img 
              src={selectedProject.images[0]} 
              alt={selectedProject.title} 
              style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover' }} 
            />

            <div style={{ padding: '40px' }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--clay)', textTransform: 'uppercase', marginBottom: '16px' }}>
                {selectedProject.type || selectedProject.category}
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', color: 'var(--walnut)', marginBottom: '24px', lineHeight: '1.2' }}>
                {selectedProject.title}
              </h2>
              <p style={{ color: 'var(--stone-text)', fontSize: '18px', lineHeight: '1.6', margin: 0 }}>
                {selectedProject.details || selectedProject.scope}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
