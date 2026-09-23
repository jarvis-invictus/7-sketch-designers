import React from 'react';
import { Building2, User, MapPin } from 'lucide-react';

export default function PartnerSection() {
  return (
    <section id="partner" className="section-wrapper" style={{ background: 'var(--section-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>OUR NETWORK</span>
          <h2 style={{ color: 'var(--walnut)' }}>Associate Partners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Partner 1: IVA */}
          <div className="luxury-card" style={{ background: '#FFFFFF', padding: '40px', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ color: 'var(--walnut)', marginBottom: '24px', fontSize: '22px' }}>Integrity Vision Architects (IVA)</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--stone-text)', fontSize: '15px' }}>
                <Building2 size={20} color="var(--clay-deep)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <span>Architects & Engineers</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--stone-text)', fontSize: '15px' }}>
                <User size={20} color="var(--clay-deep)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <span>Host: Ranjeet Shinde, Architect</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--stone-text)', fontSize: '15px' }}>
                <MapPin size={20} color="var(--clay-deep)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ lineHeight: '1.4' }}>Milleniya Tower, Office No. 201, 2nd Floor, Akurdi, Pune 35</span>
              </div>
            </div>
          </div>

          {/* Partner 2: Module F Homes */}
          <div className="luxury-card" style={{ background: '#FFFFFF', padding: '40px', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ color: 'var(--walnut)', marginBottom: '24px', fontSize: '22px' }}>Module F Homes</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--stone-text)', fontSize: '15px' }}>
                <Building2 size={20} color="var(--clay-deep)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                <span>Manufacturing Associate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: 'var(--stone-text)', fontSize: '15px' }}>
                <MapPin size={20} color="var(--clay-deep)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ lineHeight: '1.4' }}>Power Point Building, Office No. 106 (Above Smoor Lounge), Lane No. 6, Koregaon Park, Pune 411006, Maharashtra</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
