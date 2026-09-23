import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Compass, Layers, Building2, Home, ArrowRight, ArrowLeft, X } from 'lucide-react';

export default function ServicesCarousel({ navigateToService, projects = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    containScroll: 'trimSnaps', watchDrag: true 
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const services = [
    {
      id: 'architectural-consultancy',
      icon: <Compass size={26} />,
      title: 'Architectural Consultancy',
      description: 'Comprehensive spatial master planning, 3D concept development, working blueprints, and municipal sanction drawings.',
      capabilitiesTitle: 'Core Capabilities',
      capabilities: [
        'Planning & Concept Development',
        'Working Drawings & Municipal Drawings',
        'Corporate, Hotels, Hospitals, Colleges, Industrial'
      ],
      linkText: 'Explore Architectural Service',
      heroProjectId: 'suratwala',
      relatedProjectIds: ['suratwala', 'gokarting'],
      processText: 'This service drives Phase 1 (Architectural Briefing & Spatial Planning) and Phase 2 (3D Photorealistic Visualization & Moodboard) of our Execution Blueprint.',
      formValue: 'architectural'
    },
    {
      id: 'project-management-consultancy',
      icon: <Layers size={26} />,
      title: 'Project Management Consultancy (PMC)',
      description: 'Professional PMC service providing total control over planning, budget, execution, monitoring, and quality control.',
      capabilitiesTitle: '5 Core Pillars',
      capabilities: [
        'Planning • Budget • Execution',
        'Monitoring • Quality Control',
        '12-Point Detailed Scope Governance'
      ],
      linkText: 'Explore PMC Scope',
      heroImageUrl: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000&auto=format&fit=crop',
      relatedProjectIds: ['rr-heritage', 'suratwala', 'tata-service'],
      processText: 'This service governs Phase 5 (On-Site PMC Audits & Handover) of our Execution Blueprint.',
      formValue: 'pmc'
    },
    {
      id: 'interior-design',
      icon: <Home size={26} />,
      title: 'Interior Design',
      description: 'Full interior design services across commercial and institutional spaces — offices, hospitality, healthcare, and education.',
      capabilitiesTitle: 'Core Capabilities',
      capabilities: [
        'Corporate Offices',
        'Hotels & Hospitals',
        'Educational Institutes & Industrial Offices'
      ],
      linkText: 'Explore Interior Design Service',
      heroProjectId: 'wilo',
      relatedProjectIds: ['wilo', 'rr-heritage'],
      processText: 'This service leads Phase 2 (3D Photorealistic Visualization & Moodboard) of our Execution Blueprint.',
      formValue: 'architectural' // Fallback to architectural since there's no interior option in the form
    },
    {
      id: 'turnkey-interior-execution',
      icon: <Building2 size={26} />,
      title: 'Turnkey Interior Execution',
      description: 'Single-point accountability for civil works, electricals, custom modular furniture, flooring, painting, and MEP.',
      capabilitiesTitle: 'Turnkey Fit-Out Scope',
      capabilities: [
        'Civil • Electrical • Flooring • Painting',
        'Furniture (In-House German CNC Factory)',
        'Complete MEP Coordination'
      ],
      linkText: 'Explore Turnkey Scope',
      heroProjectId: 'pall',
      relatedProjectIds: ['pall', 'wilo', 'tata-service'],
      processText: 'This service executes Phase 4 (In-House German CNC Production) of our Execution Blueprint.',
      formValue: 'turnkey'
    }
  ];

  const scrollTo = useCallback((index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onInit = useCallback((emblaApi) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

    useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  const handleBookConsultation = (formValue) => {
    setSelectedService(null);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Attempt to pre-select if select element exists
        const selectElement = contactSection.querySelector('select');
        if (selectElement) {
          selectElement.value = formValue;
        }
      }, 100);
    }
  };

  return (
    <div className="services-carousel-wrapper">
      <div className="embla" ref={emblaRef} style={{ overflow: 'hidden' }}>
        <div className="embla__container" style={{ display: 'flex', }}>
          <style dangerouslySetInnerHTML={{__html: `
            .embla__container {
              backface-visibility: hidden;
              touch-action: pan-y pinch-zoom;
            }
            .embla__slide {
              user-select: none;
              -webkit-user-select: none;
              -webkit-user-drag: none;
              flex: 0 0 calc(90% - 24px);
              min-width: 0;
              margin-right: 24px;
            }
            @media (min-width: 768px) {
              .embla__slide { flex: 0 0 calc(46% - 12px); }
            }
            @media (min-width: 1024px) {
              .embla__slide { flex: 0 0 calc(31.5% - 16px); }
            }
          `}} />
          
          {services.map((service) => (
            <div 
              key={service.id} 
              className="embla__slide" 
            >
              <div
                className="luxury-card"
                style={{ 
                  height: '100%',
                  padding: '38px', 
                  background: 'var(--card-neutral)',
                  marginBottom: '24px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ width: '52px', height: '52px', background: 'var(--page-cream)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clay)', marginBottom: '22px' }}>
                {service.icon}
              </div>
              <h3 style={{ marginBottom: '12px' }}>{service.title}</h3>
              <p style={{ marginBottom: '24px' }}>
                {service.description}
              </p>

              <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '6px', marginBottom: '28px', flexGrow: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--clay)', textTransform: 'uppercase', marginBottom: '8px' }}>{service.capabilitiesTitle}</div>
                <div style={{ fontSize: '13.5px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--stone-text)' }}>
                  {service.capabilities.map((cap, i) => (
                    <div key={i}>• {cap}</div>
                  ))}
                </div>
              </div>

              <button onClick={() => setSelectedService(service)} className="btn-primary" style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                {service.linkText} <ArrowRight size={16} />
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination & Navigation */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '16px' }}>
        <button 
          type="button"
          onClick={scrollPrev}
          style={{
            background: 'var(--card-neutral)',
            border: '1px solid var(--hairline)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--walnut)',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
          aria-label="Previous slide"
        >
          <ArrowLeft size={20} />
        </button>

        <div style={{ display: 'flex', gap: '10px' }}>
          {scrollSnaps.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={() => scrollTo(index)}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                padding: 0,
                border: 'none',
                background: index === selectedIndex ? 'var(--clay)' : 'var(--stone-text)',
                opacity: index === selectedIndex ? 1 : 0.4,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button 
          type="button"
          onClick={scrollNext}
          style={{
            background: 'var(--card-neutral)',
            border: '1px solid var(--hairline)',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--walnut)',
            transition: 'all 0.2s ease',
            boxShadow: 'var(--shadow-sm)'
          }}
          aria-label="Next slide"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Services Detail Modal - Full Screen Takeover */}
      {selectedService && (
        <div 
          onClick={() => setSelectedService(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'var(--page-cream)',
            zIndex: 9999,
            overflowY: 'auto',
            display: 'block'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '100%',
              background: 'var(--page-cream)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedService(null)}
              style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                background: 'var(--walnut)',
                border: 'none',
                borderRadius: '50%',
                width: '56px',
                height: '56px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 100,
                boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
              }}
              aria-label="Close modal"
            >
              <X size={28} color="#FFFFFF" />
            </button>

            {/* Hero Image */}
            <div style={{ width: '100%', height: '40vh', minHeight: '300px', position: 'relative' }}>
              <img 
                src={selectedService.heroImageUrl || projects.find(p => p.id === selectedService.heroProjectId)?.images[0] || '/project-p25-1.png'} 
                alt={selectedService.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.5))'
              }}></div>
              
              <div style={{ 
                position: 'absolute', 
                bottom: '-32px', 
                left: 'max(5%, calc((100% - 1000px) / 2))',
                width: '64px', 
                height: '64px', 
                background: 'var(--page-cream)', 
                borderRadius: '12px',
                boxShadow: 'var(--shadow-md)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                color: 'var(--clay)',
                zIndex: 10
              }}>
                {selectedService.icon}
              </div>
            </div>

            {/* Content Container */}
            <div style={{ 
              maxWidth: '1000px', 
              width: '90%', 
              margin: '0 auto', 
              padding: '64px 0 80px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '48px'
            }}>
              
              {/* Core Content */}
              <div>
                <h2 style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontSize: 'clamp(36px, 4vw, 48px)', 
                  color: 'var(--walnut)', 
                  marginBottom: '24px', 
                  lineHeight: '1.2' 
                }}>
                  {selectedService.title}
                </h2>
                <p style={{ 
                  color: 'var(--stone-text)', 
                  fontSize: '20px', 
                  lineHeight: '1.8', 
                  maxWidth: '800px'
                }}>
                  {selectedService.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Capabilities Box */}
                <div style={{ 
                  background: '#FFFFFF', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  borderLeft: '4px solid var(--brand-gold)',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <div style={{ 
                    fontSize: '13px', 
                    fontWeight: '800', 
                    color: 'var(--clay)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                    marginBottom: '20px' 
                  }}>
                    {selectedService.capabilitiesTitle}
                  </div>
                  <div style={{ 
                    fontSize: '16px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '12px', 
                    color: 'var(--walnut)' 
                  }}>
                    {selectedService.capabilities.map((cap, i) => (
                      <div key={i} style={{ display: 'flex', gap: '10px' }}>
                        <span style={{ color: 'var(--brand-gold)' }}>•</span> {cap}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Where This Fits */}
                <div style={{ 
                  background: 'var(--card-neutral)', 
                  padding: '32px', 
                  borderRadius: '12px', 
                  border: '1px solid var(--hairline)'
                }}>
                  <div style={{ 
                    fontSize: '13px', 
                    fontWeight: '800', 
                    color: 'var(--walnut)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1px',
                    marginBottom: '20px' 
                  }}>
                    Where This Fits In Our Process
                  </div>
                  <p style={{ 
                    fontSize: '16px', 
                    color: 'var(--stone-text)', 
                    lineHeight: '1.7' 
                  }}>
                    {selectedService.processText}
                  </p>
                </div>
              </div>

              {/* Related Work Strip */}
              <div>
                <h3 style={{ 
                  fontSize: '24px', 
                  color: 'var(--walnut)', 
                  marginBottom: '24px',
                  fontFamily: 'var(--font-display)' 
                }}>
                  Related Executions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {selectedService.relatedProjectIds.map(projId => {
                    const proj = projects.find(p => p.id === projId);
                    if (!proj) return null;
                    return (
                      <div 
                        key={proj.id}
                        className="luxury-card"
                        onClick={() => setSelectedProject(proj)}
                        style={{ 
                          background: 'var(--card-neutral)', 
                          borderRadius: '8px', 
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: '1px solid var(--hairline)'
                        }}
                      >
                        <img 
                          src={proj.images[0]} 
                          alt={proj.title} 
                          style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                        />
                        <div style={{ padding: '20px' }}>
                          <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--clay)', textTransform: 'uppercase', marginBottom: '8px' }}>
                            {proj.type || proj.category}
                          </div>
                          <div style={{ fontSize: '16px', fontWeight: '600', color: 'var(--walnut)', lineHeight: '1.3' }}>
                            {proj.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact CTA */}
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                <button 
                  onClick={() => handleBookConsultation(selectedService.formValue)} 
                  className="btn-primary" 
                  style={{ padding: '16px 32px', fontSize: '16px' }}
                >
                  Book a Consultation <ArrowRight size={18} />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Reuse Project Detail Modal logic for related work strip */}
      {selectedProject && (
        <div 
          onClick={() => setSelectedProject(null)}
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
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
    </div>
  );
}

