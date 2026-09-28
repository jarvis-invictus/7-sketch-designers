import React from 'react';
import { ClipboardCheck, Users, LineChart, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReliableInView } from '../../hooks/useReliableInView';

function PmcCard({ col, idx }) {
  const [ref, isInView] = useReliableInView();
  return (
    <motion.div 
      ref={ref}
      className="bg-white p-[20px] md:p-[32px_24px] rounded-[var(--radius-lg)] shadow-sm md:shadow-none"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.3 } }}
    >
      <div className="flex flex-row md:flex-col items-start gap-4 md:gap-0">
        <div className="flex-shrink-0 w-[44px] h-[44px] bg-[var(--page-cream)] rounded-[var(--radius-sm)] flex items-center justify-center border border-[var(--hairline)] md:mb-[24px]">
          {col.icon}
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-[12px] md:gap-[14px] mt-1 md:mt-0">
          {col.items.map((item, itemIdx) => (
            <li key={itemIdx} className="text-[13px] md:text-[14.5px] text-[var(--walnut)] font-medium flex items-center gap-[10px]">
              <span className="w-[4px] h-[4px] bg-[var(--clay)] rounded-full inline-block flex-shrink-0"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

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
            <PmcCard key={idx} col={col} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
