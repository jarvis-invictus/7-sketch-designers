import React from 'react';
import { ClipboardCheck, Users, LineChart, KeyRound } from 'lucide-react';
import { motion } from 'framer-motion';
import { useReliableInView } from '../../hooks/useReliableInView';

function PmcCard({ col, idx }) {
  const [ref, isInView] = useReliableInView();
  return (
    <motion.div 
      ref={ref}
      className="bg-white p-[16px] md:p-[32px_24px] rounded-[var(--radius-lg)] shadow-sm md:shadow-none"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: idx * 0.1, ease: 'easeOut' }}
      whileHover={{ y: -5, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.3 } }}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-3 mb-3 md:mb-[24px]">
          <div className="flex-shrink-0 w-[32px] h-[32px] md:w-[44px] md:h-[44px] bg-[var(--page-cream)] rounded-[var(--radius-sm)] flex items-center justify-center border border-[var(--hairline)]">
            {React.cloneElement(col.icon, { className: "w-[16px] h-[16px] md:w-[20px] md:h-[20px]" })}
          </div>
          <h3 className="text-[17px] font-semibold text-[var(--walnut)] m-0 leading-tight min-w-0 break-words">{col.title}</h3>
        </div>
        <ul className="list-none p-0 m-0 flex flex-col gap-[6px] md:gap-[14px]">
          {col.items.map((item, itemIdx) => (
            <li key={itemIdx} className="text-[14px] md:text-[14.5px] text-[var(--walnut)] font-medium flex items-start gap-[8px]">
              <span className="w-[4px] h-[4px] bg-[var(--clay)] rounded-full inline-block flex-shrink-0 mt-[8px]"></span>
              <span className="leading-snug">{item}</span>
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
      title: 'Planning & Budgeting',
      icon: <ClipboardCheck color="var(--clay-deep)" strokeWidth={1.5} />,
      items: ['Project Planning', 'Budget Planning', 'BOQ Preparation', 'Tender Documentation']
    },
    {
      title: 'Procurement & Site',
      icon: <Users color="var(--clay-deep)" strokeWidth={1.5} />,
      items: ['Vendor Selection', 'Contract Management', 'Procurement', 'Site Supervision']
    },
    {
      title: 'Monitoring & Control',
      icon: <LineChart color="var(--clay-deep)" strokeWidth={1.5} />,
      items: ['Project Scheduling', 'Cost Control', 'Quality Assurance', 'Safety Monitoring']
    },
    {
      title: 'Handover',
      icon: <KeyRound color="var(--clay-deep)" strokeWidth={1.5} />,
      items: ['Final Handover', 'As-Built Drawings', 'Client Walkthrough', 'Defect Liability Period']
    }
  ];

  return (
    <section id="pmc-deep-dive" className="section-wrapper" style={{ background: 'var(--section-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 56px auto' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>PROJECT MANAGEMENT</span>
          <h2 style={{ marginBottom: '24px', color: 'var(--walnut)' }}>Project Management Consultancy</h2>
          <p style={{ fontSize: '18px', color: 'var(--stone-text)', lineHeight: '1.8', marginBottom: '16px' }}>
            PMC is a professional service that ensures a project is executed efficiently, within budget, on schedule, and according to the highest quality standards.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-[10px] md:gap-8">
          {scopeColumns.map((col, idx) => (
            <PmcCard key={idx} col={col} idx={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
