import re

with open('src/components/ui/pmc-deep-dive.jsx', 'r') as f:
    content = f.read()

old_pmc_card = """function PmcCard({ col, idx }) {
  const [ref, isInView] = useReliableInView();
  return (
    <motion.div 
      ref={ref}
      style={{ background: '#FFFFFF', padding: '32px 24px', borderRadius: 'var(--radius-lg)', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
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
  );
}"""

new_pmc_card = """function PmcCard({ col, idx }) {
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
}"""

content = content.replace(old_pmc_card, new_pmc_card)

with open('src/components/ui/pmc-deep-dive.jsx', 'w') as f:
    f.write(content)

print("PMC Section patched")
