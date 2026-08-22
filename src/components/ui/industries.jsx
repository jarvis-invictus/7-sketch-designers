import React from 'react';

export default function Industries() {
  const industries = [
    'Corporate Offices', 'Retail Stores', 'Commercial Buildings', 
    'Hotels', 'Resorts', 'Restaurants', 
    'Hospitals', 'Educational Institutes', 'Industrial Facilities', 
    'Showrooms', 'Banks', 'Co-working Spaces'
  ];

  return (
    <section id="industries" className="section-wrapper" style={{ background: 'var(--section-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px auto' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>OUR REACH</span>
          <h2 style={{ color: 'var(--walnut)' }}>Industries We Serve</h2>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', maxWidth: '900px', margin: '0 auto' }}>
          {industries.map((ind, idx) => (
            <div key={idx} style={{ 
              background: '#FFFFFF', 
              border: '1px solid var(--hairline)', 
              padding: '16px 28px', 
              borderRadius: 'var(--radius-pill)', 
              fontSize: '15px', 
              fontWeight: '500', 
              color: 'var(--stone-text)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
              cursor: 'default'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--clay)';
              e.currentTarget.style.color = 'var(--walnut)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = 'var(--hairline)';
              e.currentTarget.style.color = 'var(--stone-text)';
            }}
            >
              {ind}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
