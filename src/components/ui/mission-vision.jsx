import React from 'react';
import { Target, Eye, Gem } from 'lucide-react';

export default function MissionVision() {
  return (
    <section id="mission-vision" className="section-wrapper" style={{ background: 'var(--page-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Mission */}
          <div className="luxury-card" style={{ background: 'var(--card-neutral)', padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--page-cream)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Target size={24} color="var(--clay-deep)" strokeWidth={1.5} />
            </div>
            <h3 style={{ marginBottom: '20px', color: 'var(--walnut)' }}>Our Mission</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
              {[
                'Deliver projects on time',
                'Maintain uncompromised quality',
                'Provide cost-effective solutions',
                'Build long-term client relationships',
                'Continuously innovate in design and execution'
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--clay)', marginTop: '4px' }}>•</div>
                  <div style={{ color: 'var(--stone-text)', fontSize: '15px', lineHeight: '1.6' }}>{item}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Vision (Accent Card) */}
          <div className="luxury-card" style={{ background: 'linear-gradient(180deg, var(--blush-start) 0%, var(--blush-end) 100%)', padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.4)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Eye size={24} color="var(--clay-deep)" strokeWidth={1.5} />
            </div>
            <h3 style={{ marginBottom: '20px', color: 'var(--walnut)' }}>Our Vision</h3>
            <blockquote style={{ margin: 0, color: 'var(--walnut)', fontSize: '17px', lineHeight: '1.7', fontStyle: 'italic', fontFamily: 'var(--font-display)' }}>
              "To become one of India's most trusted Architectural & Interior Project Management Consultancy firms by delivering world-class commercial spaces that combine functionality, innovation, and quality."
            </blockquote>
          </div>

          {/* Core Values */}
          <div className="luxury-card" style={{ background: 'var(--card-neutral)', padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--page-cream)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
              <Gem size={24} color="var(--clay-deep)" strokeWidth={1.5} />
            </div>
            <h3 style={{ marginBottom: '20px', color: 'var(--walnut)' }}>Core Values</h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4 mt-auto">
              {[
                'Integrity', 'Transparency', 
                'Innovation', 'Quality', 
                'Commitment', 'Client Satisfaction'
              ].map((val, idx) => (
                <div key={idx} style={{ 
                  background: 'var(--page-cream)', 
                  padding: '12px 10px', 
                  borderRadius: 'var(--radius-md)', 
                  fontSize: '13.5px', 
                  fontWeight: '500', 
                  color: 'var(--walnut)',
                  textAlign: 'center',
                  border: '1px solid var(--hairline)'
                }}>
                  {val}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
