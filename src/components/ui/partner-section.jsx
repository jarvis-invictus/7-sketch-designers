import React from 'react';
import { Building2, User, MapPin } from 'lucide-react';

export default function PartnerSection() {
  return (
    <section id="partner" className="section-wrapper" style={{ background: 'var(--section-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div className="luxury-card" style={{ background: '#FFFFFF', padding: '48px', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>ASSOCIATE PARTNER</span>
          <h2 style={{ color: 'var(--walnut)', marginBottom: '32px' }}>Integrity Vision Architects (IVA)</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--stone-text)', fontSize: '16px' }}>
              <Building2 size={20} color="var(--clay-deep)" strokeWidth={1.5} />
              <span>Architects & Engineers</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--stone-text)', fontSize: '16px' }}>
              <User size={20} color="var(--clay-deep)" strokeWidth={1.5} />
              <span>Host: Ranjeet Shinde, Architect</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--stone-text)', fontSize: '16px' }}>
              <MapPin size={20} color="var(--clay-deep)" strokeWidth={1.5} />
              <span>Milleniya Tower, Office No. 201, 2nd Floor, Akurdi, Pune 35</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
