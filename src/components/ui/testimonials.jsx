import React from 'react';
import { MessageSquareQuote } from 'lucide-react';

export default function Testimonials() {
  const placeholders = [
    { quote: "PLACEHOLDER — content pending from client", client: "Client Name", project: "Project Name" },
    { quote: "PLACEHOLDER — content pending from client", client: "Client Name", project: "Project Name" },
    { quote: "PLACEHOLDER — content pending from client", client: "Client Name", project: "Project Name" }
  ];

  return (
    <section id="testimonials" className="section-wrapper" style={{ background: 'var(--page-cream)', borderBottom: '1px solid var(--hairline)' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
        
        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 64px auto' }}>
          <span className="brand-badge" style={{ marginBottom: '16px' }}>CLIENT FEEDBACK</span>
          <h2 style={{ color: 'var(--walnut)' }}>What Our Clients Say</h2>
          <div style={{ background: '#FFF3CD', color: '#856404', padding: '8px 16px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', display: 'inline-block', marginTop: '16px' }}>
            PLACEHOLDER — content pending from client
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {placeholders.map((item, idx) => (
            <div key={idx} className="luxury-card" style={{ background: 'var(--card-neutral)', padding: '40px', display: 'flex', flexDirection: 'column' }}>
              <MessageSquareQuote size={32} color="var(--clay)" style={{ marginBottom: '24px', opacity: 0.5 }} />
              <p style={{ fontSize: '16px', color: 'var(--stone-text)', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '32px', flexGrow: 1 }}>
                "{item.quote}"
              </p>
              <div>
                <div style={{ fontWeight: '600', color: 'var(--walnut)', fontSize: '15px' }}>{item.client}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px', marginTop: '2px' }}>{item.project}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
