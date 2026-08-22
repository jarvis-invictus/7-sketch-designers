import React, { useState } from 'react';
import { ZoomParallax } from './zoom-parallax';
import { GalleryCard } from './generative-gallery-card';

export default function ProjectsPortfolio({ projects = [], onProjectClick }) {
  const [activeCategory, setActiveCategory] = useState('All');

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

          {/* Grid Layout for 3D Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <GalleryCard 
                key={project.id} 
                index={index}
                item={{
                  id: project.id,
                  title: project.title,
                  category: project.type,
                  image: project.images[0]
                }}
                onClick={onProjectClick}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
