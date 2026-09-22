import React, { useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const testimonials = [
    { 
      quote: "7 Sketch transformed our resort in Mahabaleshwar. The material selection and turnkey execution were flawless from start to finish.", 
      client: "Management", 
      project: "R R Heritage" 
    },
    { 
      quote: "Our new corporate interior feels incredibly premium. The workstations and meeting rooms were planned perfectly for our team.", 
      client: "Director", 
      project: "Wilo Sales Office" 
    },
    { 
      quote: "Their turnkey execution for our Moshi service center was extremely professional. Everything was delivered right on schedule.", 
      client: "Project Head", 
      project: "Tata Service Centre" 
    },
    { 
      quote: "The spatial planning and lighting design for our hub exceeded all expectations. It matches the exact high-energy vibe we wanted.", 
      client: "Owner", 
      project: "Go Karting Recreational Hub" 
    },
    { 
      quote: "A highly professional team. The architectural design and space planning for our commercial building was executed with incredible precision.", 
      client: "Management", 
      project: "Suratwala Mark Plazzo" 
    }
  ];

  return (
    <section id="testimonials" className="section-wrapper" style={{ background: 'var(--page-cream)', borderBottom: '1px solid var(--hairline)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '64px' }}>
          <div style={{ maxWidth: '600px' }}>
            <span className="brand-badge" style={{ marginBottom: '16px' }}>CLIENT FEEDBACK</span>
            <h2 style={{ color: 'var(--walnut)' }}>What Our Clients Say</h2>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', display: 'none' }} className="md:flex">
            <button onClick={scrollPrev} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--clay)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clay)', cursor: 'pointer', background: 'transparent' }}>
              <ChevronLeft size={24} />
            </button>
            <button onClick={scrollNext} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--clay)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clay)', cursor: 'pointer', background: 'transparent' }}>
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div className="embla__container" style={{ display: 'flex', marginLeft: '-24px' }}>
            {testimonials.map((item, idx) => (
              <div 
                className="embla__slide" 
                key={idx} 
                style={{ 
                  flex: '0 0 100%', 
                  minWidth: '0', 
                  paddingLeft: '24px',
                                                    }}
              >
                {/* Need standard classes for responsive flex-basis since inline media queries don't work */}
                <div 
                  className="luxury-card w-full" 
                  style={{ background: 'var(--card-neutral)', padding: '40px', display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 'var(--radius-lg)' }}
                >
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '24px' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill="var(--brand-gold)" color="var(--brand-gold)" />
                    ))}
                  </div>
                  <p style={{ fontSize: '16px', color: 'var(--stone-text)', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '32px', flexGrow: 1 }}>
                    "{item.quote}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '50%', 
                      background: 'var(--accent-soft)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--clay)',
                      fontWeight: 'bold',
                      fontSize: '18px'
                    }}>
                      {item.client.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--walnut)', fontSize: '15px' }}>{item.client}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '4px' }}>{item.project}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mobile controls */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px' }} className="md:hidden">
          <button onClick={scrollPrev} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--clay)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clay)', cursor: 'pointer', background: 'transparent' }}>
            <ChevronLeft size={24} />
          </button>
          <button onClick={scrollNext} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--clay)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--clay)', cursor: 'pointer', background: 'transparent' }}>
            <ChevronRight size={24} />
          </button>
        </div>

      </div>
    </section>
  );
}
