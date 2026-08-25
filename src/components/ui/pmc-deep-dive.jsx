import React from 'react';
import { ClipboardCheck, Users, LineChart, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PmcDeepDive() {
  const scopeColumns = [
    {
      icon: <ClipboardCheck size={20} color="var(--clay-deep)" strokeWidth={1.5} />,
      items: ['Project Planning', 'Budget Planning', 'BOQ Preparation', 'Tender Documentation']
    },
    {
      icon: <Users size={20} color="var(--clay-deep)" strokeWidth={1.5} />,
      items: ['Vendor Selection', 'Contract Management', 'Procurement', 'Site Supervision']
    },
    {
      icon: <LineChart size={20} color="var(--clay-deep)" strokeWidth={1.5} />,
      items: ['Project Scheduling', 'Cost Control', 'Quality Assurance', 'Safety Monitoring']
    },
    {
      icon: <KeyRound size={20} color="var(--clay-deep)" strokeWidth={1.5} />,
      items: ['Final Handover', 'As-Built Drawings', 'Client Walkthrough', 'Defect Liability Period']
    }
  ];

  return (
    <section id="pmc-deep-dive" className="section-wrapper" style={{ background: 'var(--section-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 56px auto' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>CORE DIFFERENTIATOR</span>
          <h2 style={{ marginBottom: '24px', color: 'var(--walnut)' }}>Project Management Consultancy</h2>
          <p style={{ fontSize: '18px', color: 'var(--stone-text)', lineHeight: '1.8', marginBottom: '16px' }}>
            PMC is a professional service that ensures a project is executed efficiently, within budget, on schedule, and according to the highest quality standards.
          </p>
          <p style={{ fontSize: '16px', color: 'var(--stone-text)', lineHeight: '1.7', opacity: 0.85 }}>
            Our PMC services provide complete control over planning, coordination, execution, monitoring, and successful project completion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {scopeColumns.map((col, idx) => (
            <motion.div 
              key={idx} 
              style={{ background: '#FFFFFF', padding: '32px 24px', borderRadius: 'var(--radius-lg)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.3 } }}
            >
              <div style={{ width: '44px', height: '44px', background: 'var(--page-cream)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', border: '1px solid var(--hairline)' }}>
                {col.icon}
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {col.items.map((item, itemIdx) => (
                  <li key={itemIdx} style={{ fontSize: '14.5px', color: 'var(--walnut)', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '4px', height: '4px', background: 'var(--clay)', borderRadius: '50%', display: 'inline-block' }}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
