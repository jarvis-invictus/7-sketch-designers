const fs = require('fs');
const path = 'src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// 1. Add imports
content = content.replace(
  "ChevronDown, Home\n} from 'lucide-react';",
  "ChevronDown, Home, Menu, X\n} from 'lucide-react';"
);
// In case Menu or X are already there, we might duplicate but it's unlikely since X was not there. Wait, X is in 'lucide-react' imports?
// Let's check exactly:
if (!content.includes('Menu,')) {
    content = content.replace("ChevronDown, Home", "ChevronDown, Home, Menu, X");
}

// 2. Add State
content = content.replace(
  "const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);",
  "const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);\n  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);"
);

// 3. Update nav
content = content.replace(
  "<nav style={{ display: 'flex', gap: '24px', alignItems: 'center', flexShrink: 1 }}>",
  "<nav className=\"hidden lg:flex\" style={{ gap: '24px', alignItems: 'center', flexShrink: 1 }}>"
);

// 4. Update CTAs
content = content.replace(
  "<div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexShrink: 0 }}>",
  "<div className=\"hidden lg:flex\" style={{ gap: '16px', alignItems: 'center', flexShrink: 0 }}>"
);

// 5. Add Hamburger Button and Menu right before </header>
const mobileMenuCode = `
        {/* Mobile Hamburger Button */}
        <button 
          className="flex lg:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
          style={{ background: 'none', border: 'none', color: 'var(--walnut)', cursor: 'pointer', padding: '8px' }}
        >
          <Menu size={28} />
        </button>
      </header>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'var(--page-cream)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          overflowY: 'auto'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/pure-icon-logo.png" alt="7 Sketch Designers" style={{ height: '35px', objectFit: 'contain' }} />
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: '600', color: 'var(--walnut)' }}>Sketch Designer's</span>
            </div>
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ background: 'none', border: 'none', color: 'var(--walnut)', cursor: 'pointer', padding: '8px' }}
            >
              <X size={32} />
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '20px', fontWeight: '500' }}>
            <a href="#services" onClick={(e) => { setIsMobileMenuOpen(false); setCurrentView('home'); }} style={{ color: 'var(--walnut)', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid var(--hairline)' }}>Services</a>
            <a href="#portfolio" onClick={(e) => { setIsMobileMenuOpen(false); setCurrentView('home'); }} style={{ color: 'var(--walnut)', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid var(--hairline)' }}>Projects</a>
            <a href="#process" onClick={(e) => { setIsMobileMenuOpen(false); setCurrentView('home'); }} style={{ color: 'var(--walnut)', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid var(--hairline)' }}>Process</a>
            <a href="#about" onClick={(e) => { setIsMobileMenuOpen(false); setCurrentView('home'); }} style={{ color: 'var(--walnut)', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid var(--hairline)' }}>About</a>
            <a href="#contact" onClick={(e) => { 
              e.preventDefault(); 
              setIsMobileMenuOpen(false); 
              setCurrentView('home'); 
              setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100); 
            }} style={{ color: 'var(--walnut)', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid var(--hairline)' }}>Contact</a>
            
            <div style={{ marginTop: '32px' }}>
              <a 
                href="#contact" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setIsMobileMenuOpen(false); 
                  setCurrentView('home'); 
                  setTimeout(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }), 100); 
                }} 
                className="btn-primary" 
                style={{ display: 'block', textAlign: 'center', padding: '16px', fontSize: '18px', borderRadius: '12px' }}
              >
                Book Consultation
              </a>
            </div>
          </div>
        </div>
      )}
`;

content = content.replace("      </header>", mobileMenuCode);

// Also we should hide the tagline on mobile in the header logo.
// Look for the span with the tagline:
const oldTagline = "<span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--stone-text)', marginTop: '2px' }}>Architecture, Interior & Landscape Consultant</span>";
const newTagline = "<span className=\"hidden sm:block\" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--stone-text)', marginTop: '2px' }}>Architecture, Interior & Landscape Consultant</span>";
content = content.replace(oldTagline, newTagline);

fs.writeFileSync(path, content);
console.log('done');
