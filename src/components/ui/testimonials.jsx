import React from 'react';
import { InfiniteMovingCards } from './infinite-moving-cards';

export default function Testimonials() {
  const testimonials = [
    { 
      id: 1,
      description: "7 Sketch transformed our resort in Mahabaleshwar. The material selection and turnkey execution were flawless from start to finish.", 
      name: "Management", 
      role: "R R Heritage",
      rating: 5,
      avatar: "M", // Use letter for avatar logic inside the card
      image: "/rr-exterior.png"
    },
    { 
      id: 2,
      description: "Our new corporate interior feels incredibly premium. The workstations and meeting rooms were planned perfectly for our team.", 
      name: "Director", 
      role: "Wilo Sales Office",
      rating: 5,
      avatar: "D",
      image: "/wilo-lounge-wide.png"
    },
    { 
      id: 3,
      description: "Their turnkey execution for our Moshi service center was extremely professional. Everything was delivered right on schedule.", 
      name: "Project Head", 
      role: "Tata Service Centre",
      rating: 5,
      avatar: "P",
      image: "/tata-desk-hero.png"
    },
    { 
      id: 4,
      description: "The spatial planning and lighting design for our hub exceeded all expectations. It matches the exact high-energy vibe we wanted.", 
      name: "Owner", 
      role: "Go Karting Recreational Hub",
      rating: 5,
      avatar: "O",
      image: "/raftaar-arcade.png"
    },
    { 
      id: 5,
      description: "A highly professional team. The architectural design and space planning for our commercial building was executed with incredible precision.", 
      name: "Management", 
      role: "Suratwala Mark Plazzo",
      rating: 5,
      avatar: "M",
      image: "/suratwala-workspace-wide.jpg"
    }
  ];

  return (
    <section id="testimonials" className="section-wrapper" style={{ background: 'var(--page-cream)', borderBottom: '1px solid var(--hairline)', overflow: 'hidden' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative' }}>
        
        <div style={{ marginBottom: '64px' }}>
          <div style={{ maxWidth: '600px' }}>
            <span className="brand-badge" style={{ marginBottom: '16px' }}>CLIENT FEEDBACK</span>
            <h2 style={{ color: 'var(--walnut)' }}>What Our Clients Say</h2>
          </div>
        </div>

        <div style={{ margin: '0 -20px' }}>
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
