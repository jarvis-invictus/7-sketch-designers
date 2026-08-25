import React from 'react';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const reasons = [
    '12+ Years Experience',
    'Dedicated Project Managers',
    'Professional Team',
    'Budget Control',
    'End-to-End Solutions',
    'Timely Completion',
    'Premium Quality',
    'Latest Design Trends',
    'Transparent Communication',
    'Customer Satisfaction'
  ];

  return (
    <section id="why-choose-us" className="section-wrapper" style={{ background: 'var(--page-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
          
          <motion.div 
            style={{ padding: '12px', background: 'var(--card-neutral)', borderRadius: 'var(--radius-lg)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0, ease: 'easeOut' }}
            whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.3 } }}
          >
            <img 
              src="/project-p20-1.jpg" 
              alt="7 Sketch Designers Studio" 
              style={{ width: '100%', height: '500px', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} 
            />
          </motion.div>

          <div>
            <span className="brand-badge" style={{ marginBottom: '16px' }}>OUR ADVANTAGE</span>
            <h2 style={{ marginBottom: '24px', color: 'var(--walnut)' }}>Why Choose Us</h2>
            <p style={{ fontSize: '18px', color: 'var(--stone-text)', lineHeight: '1.8', marginBottom: '40px' }}>
              We don't just design spaces; we engineer experiences. Our commitment to precision, transparency, and architectural excellence sets us apart.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {reasons.map((reason, idx) => (
                <motion.div 
                  key={idx} 
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: 'var(--radius-sm)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
                  whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.3 } }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--card-neutral)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid var(--hairline)' }}>
                    <Check size={14} color="var(--clay)" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: '15.5px', color: 'var(--walnut)', fontWeight: '500' }}>{reason}</span>
                </motion.div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
