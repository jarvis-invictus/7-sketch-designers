import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

old_process = """function ProcessBlueprintCard({ item, idx }) {
  const [ref, isInView] = useReliableInView(0.15);
  return (
    <motion.div 
      ref={ref}
      style={{ background: 'var(--card-neutral)', padding: '24px 32px', borderRadius: '12px', boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.3 } }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-[48px] items-center">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
            <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--brand-gold)', lineHeight: 1 }}>{item.num}</span>
            <span className="brand-badge">{item.tag}</span>
          </div>
          <h3 style={{ marginBottom: '16px' }}>
            {item.stage}
          </h3>
          <p style={{ marginBottom: '28px' }}>
            {item.description}
          </p>

          <div style={{ background: '#FFFFFF', padding: '20px 24px', borderRadius: '8px', borderLeft: '4px solid var(--brand-gold)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--brand-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Verified Stage Deliverable
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--walnut)' }}>
              {item.deliverable}
            </div>
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          {(() => {
            const Illustration = ProcessIllustrations[idx];
            return <Illustration />;
          })()}
        </div>
      </div>
    </motion.div>
  );
}"""

new_process = """function ProcessBlueprintCard({ item, idx }) {
  const [ref, isInView] = useReliableInView(0.15);
  return (
    <motion.div 
      ref={ref}
      className="bg-[var(--card-neutral)] rounded-[12px] p-[20px] md:p-[24px_32px]"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-hover)', transition: { delay: 0, duration: 0.3 } }}
    >
      {/* MOBILE BLOCK */}
      <div className="flex flex-col lg:hidden gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[24px] font-extrabold text-[var(--brand-gold)] leading-none">{item.num}</span>
            <span className="brand-badge">{item.tag}</span>
          </div>
          <h3 className="text-[22px] mb-3 leading-tight">{item.stage}</h3>
          <p className="text-[15px] leading-relaxed mb-4">{item.description}</p>
          
          <div className="bg-white p-4 rounded-lg border-t-[3px] border-[var(--brand-gold)] shadow-sm">
            <div className="text-[10px] font-extrabold text-[var(--brand-gold)] uppercase tracking-wider mb-1">
              Verified Deliverable
            </div>
            <div className="text-[14px] font-bold text-[var(--walnut)]">
              {item.deliverable}
            </div>
          </div>
        </div>

        <div className="relative w-full max-h-[120px] overflow-hidden rounded-lg flex items-center justify-center mask-image-[linear-gradient(to_bottom,black_60%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]">
          <div className="transform scale-75 origin-top">
            {(() => {
              const Illustration = ProcessIllustrations[idx];
              return <Illustration />;
            })()}
          </div>
        </div>
      </div>

      {/* DESKTOP BLOCK */}
      <div className="hidden lg:grid grid-cols-[1.1fr_0.9fr] gap-[48px] items-center">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '14px' }}>
            <span style={{ fontSize: '28px', fontWeight: '800', color: 'var(--brand-gold)', lineHeight: 1 }}>{item.num}</span>
            <span className="brand-badge">{item.tag}</span>
          </div>
          <h3 style={{ marginBottom: '16px' }}>{item.stage}</h3>
          <p style={{ marginBottom: '28px' }}>{item.description}</p>

          <div style={{ background: '#FFFFFF', padding: '20px 24px', borderRadius: '8px', borderLeft: '4px solid var(--brand-gold)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--brand-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
              Verified Stage Deliverable
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--walnut)' }}>
              {item.deliverable}
            </div>
          </div>
        </div>
        <div style={{ position: 'relative' }}>
          {(() => {
            const Illustration = ProcessIllustrations[idx];
            return <Illustration />;
          })()}
        </div>
      </div>
    </motion.div>
  );
}"""

content = content.replace(old_process, new_process)

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("ProcessBlueprint patched")
