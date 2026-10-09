import React, { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { InfiniteMovingCards } from './infinite-moving-cards';

export default function Testimonials() {
  const testimonials = [
    { 
      id: 1,
      description: "7 Sketch transformed our resort in Mahabaleshwar. The material selection and turnkey execution were flawless from start to finish.", 
      name: "Management", 
      role: "R R Heritage",
      rating: 5,
      avatar: "M",
      image: "/rr-exterior.webp"
    },
    { 
      id: 2,
      description: "Our new corporate interior feels incredibly premium. The workstations and meeting rooms were planned perfectly for our team.", 
      name: "Director", 
      role: "Wilo Sales Office",
      rating: 5,
      avatar: "D",
      image: "/wilo-lounge-wide.webp"
    },
    { 
      id: 3,
      description: "Their turnkey execution for our Moshi service center was extremely professional. Everything was delivered right on schedule.", 
      name: "Project Head", 
      role: "Tata Service Centre",
      rating: 5,
      avatar: "P",
      image: "/tata-desk-hero.webp"
    },
    { 
      id: 4,
      description: "The spatial planning and lighting design for our hub exceeded all expectations. It matches the exact high-energy vibe we wanted.", 
      name: "Owner", 
      role: "Go Karting Recreational Hub",
      rating: 5,
      avatar: "O",
      image: "/raftaar-arcade.webp"
    }
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="testimonials" className="section-wrapper" style={{ background: 'var(--page-cream)', borderBottom: '1px solid var(--hairline)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>
        
        <div style={{ marginBottom: '64px' }}>
          <div style={{ maxWidth: '600px' }}>
            <span className="brand-badge" style={{ marginBottom: '16px' }}>CLIENT FEEDBACK</span>
            <h2 style={{ color: 'var(--walnut)' }}>What Our Clients Say</h2>
          </div>
        </div>

        {/* MOBILE BLOCK */}
        <div className="block md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((item) => (
                <div key={item.id} className="flex-[0_0_100%] min-w-0 pr-0">
                  <div className="rounded-2xl border" style={{ borderColor: 'var(--hairline)', background: 'var(--card-neutral)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div className="flex items-center gap-1 text-sm text-amber-400">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <p className="leading-[1.6]" style={{ fontSize: '16px', color: 'var(--stone-text)', fontStyle: 'italic', flexGrow: 1 }}>
                      "{item.description}"
                    </p>
                    <div className="pt-2 border-t" style={{ borderColor: 'var(--hairline)' }}>
                      <p className="font-semibold" style={{ fontSize: '15px', color: 'var(--walnut)' }}>{item.name}</p>
                      <p className="mt-1" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6 px-1">
            <div className="text-[14px] font-semibold text-[var(--walnut)] tracking-widest uppercase">
              {selectedIndex + 1} / {testimonials.length}
            </div>
            <div className="flex gap-2">
              <button onClick={scrollPrev} disabled={selectedIndex === 0} className="w-[44px] h-[44px] rounded-full border border-[var(--hairline)] flex items-center justify-center bg-[var(--page-cream)] disabled:opacity-50 transition-colors hover:bg-white">
                <ChevronLeft size={20} color="var(--walnut)" />
              </button>
              <button onClick={scrollNext} disabled={selectedIndex === testimonials.length - 1} className="w-[44px] h-[44px] rounded-full border border-[var(--hairline)] flex items-center justify-center bg-[var(--page-cream)] disabled:opacity-50 transition-colors hover:bg-white">
                <ChevronRight size={20} color="var(--walnut)" />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP BLOCK */}
        <div className="hidden md:block" style={{ margin: '0 -20px' }}>
          <InfiniteMovingCards 
            items={testimonials} 
            speed="slow" 
            direction="left"
            className="py-4"
          />
        </div>

      </div>
    </section>
  );
}
