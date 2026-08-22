import React, { useState, useEffect } from 'react';
import ScrollHero from './components/ui/scroll-hero';
import ProjectsPortfolio from './components/ui/projects-portfolio';
import { officialServicesData } from './officialServicesData';
import { 
  Building2, Phone, Mail, MapPin, ChevronRight, CheckCircle2, 
  Layers, ArrowLeft, ArrowRight, Calculator, Compass, Sparkles, 
  ChevronDown
} from 'lucide-react';

import AboutSection from './components/ui/about-section';
import MissionVision from './components/ui/mission-vision';
import PmcDeepDive from './components/ui/pmc-deep-dive';
import WhyChooseUs from './components/ui/why-choose-us';
import Industries from './components/ui/industries';
import TeamSection from './components/ui/team-section';
import PartnerSection from './components/ui/partner-section';
import Testimonials from './components/ui/testimonials';
import ProjectDetail from './components/ui/project-detail';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'service-detail' | 'project-detail'
  const [selectedServiceId, setSelectedServiceId] = useState('architectural-consultancy');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Active Step for Interactive Creative Execution Canvas
  const [activeProcessStep, setActiveProcessStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Hero section pins for 350% of viewport height
      const heroScrollDistance = window.innerHeight * 3.5;
      setIsScrolledPastHero(window.scrollY > heroScrollDistance);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Project Gallery Modal State
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [calcStep, setCalcStep] = useState(1);
  const [calcData, setCalcData] = useState({
    scope: 'pmc',
    area: 2500,
    quality: 'premium',
    name: '',
    phone: ''
  });

  const selectedService = officialServicesData.find(s => s.id === selectedServiceId) || officialServicesData[0];

  const navigateToService = (id) => {
    setSelectedServiceId(id);
    setCurrentView('service-detail');
    setIsServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentView('home');
    setIsServicesDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProject = (id) => {
    setSelectedProjectId(id);
    setCurrentView('project-detail');
    setIsServicesDropdownOpen(false);
  };

  const calculateEstimate = () => {
    let baseRatePerSqFt = 0;
    if (calcData.scope === 'pmc') {
      baseRatePerSqFt = calcData.quality === 'ultra' ? 180 : 120;
    } else if (calcData.scope === 'turnkey') {
      baseRatePerSqFt = calcData.quality === 'ultra' ? 2600 : 1800;
    } else {
      baseRatePerSqFt = calcData.quality === 'ultra' ? 450 : 280;
    }

    const total = calcData.area * baseRatePerSqFt;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(total);
  };

  const projects = [
    {
      id: 'gokarting',
      category: 'commercial',
      client: 'Go Karting Track',
      location: 'Tathawade, Pune',
      title: 'Go Karting Recreational Hub',
      type: 'Recreational Commercial',
      scope: 'Reception Area, Café, Waiting Lounge, Branding & Turnkey Execution',
      images: ['/project-p9-2.png', '/project-p9-3.png', '/project-p9-4.png', '/project-p10-4.png'],
      details: 'High-traffic commercial venue designed for optimal visitor flow, acoustic comfort, custom venue branding, and heavy-duty wear resistance.'
    },
    {
      id: 'christ-hall',
      category: 'educational',
      client: 'Christ College',
      location: 'Pune Campus',
      title: 'Christ College Training Hall & Library',
      type: 'Educational Interior',
      scope: 'Acoustic Planning, Custom Furniture, Lighting & Bookshelves',
      images: ['/project-p20-1.jpg', '/project-p21-1.png', '/project-p15-2.jpg', '/project-p15-6.jpg'],
      details: 'State-of-the-art auditorium and library setup focused on acoustic precision, quiet study zones, and long-lasting ergonomic furniture.'
    },
    {
      id: 'suratwala',
      category: 'commercial',
      client: 'Suratwala Group',
      location: 'Hinjawadi, Pune',
      title: 'Suratwala Mark Plazzo Commercial Plaza',
      type: 'Commercial Building',
      scope: 'Interior Fit-out, Escalator Corridors & Corporate Offices',
      images: ['/project-p25-1.png', '/project-p23-2.png', '/project-p23-3.png'],
      details: 'Comprehensive architectural fit-out for a multi-tenant commercial landmark in Hinjawadi, Pune.'
    },
    {
      id: 'pall',
      category: 'corporate',
      client: 'Pall Corporations',
      location: 'Pune Head Office',
      title: 'Pall Corporations Corporate Office',
      type: 'Corporate Office Interior',
      scope: 'Space Planning, PMC Management, Workstations & Turnkey Execution',
      images: ['/project-p14-3.png', '/project-p14-4.png', '/project-p14-5.png', '/project-p14-6.png'],
      details: 'Modern corporate head office designed with flexible workstation hubs, client meeting rooms, and executive suites.'
    },
    {
      id: 'wilo',
      category: 'corporate',
      client: 'Wilo Mather and Platt',
      location: 'Pune Experience Centre',
      title: 'Wilo Sales Office & Experience Hub',
      type: 'Corporate Office',
      scope: 'Workstations, Executive Meeting Rooms & Reception',
      images: ['/project-p16-3.png', '/project-p16-6.png', '/project-p16-2.png', '/project-p16-4.png'],
      details: 'Sleek corporate office layout highlighting brand identity and energy-efficient lighting.'
    },
    {
      id: 'rr-heritage',
      category: 'hospitality',
      client: 'R R Group',
      location: 'Mahabaleshwar',
      title: 'R R Heritage Luxury Resort',
      type: 'Hospitality Resort Interior',
      scope: 'Resort Interior Design, Guest Experience Planning & Turnkey Execution',
      images: ['/project-p17-1.jpg', '/project-p2-1.jpg', '/project-p2-2.jpg', '/project-p17-4.jpg'],
      details: 'Luxury hill-station resort interior combining warm natural wood, stone finishes, and panoramic balcony designs.'
    },
    {
      id: 'tata-service',
      category: 'commercial',
      client: 'Tata Motors Authorized',
      location: 'Moshi, Pune',
      title: 'Tata Commercial Service Centre',
      type: 'Commercial Service Centre',
      scope: 'Space Planning, Turnkey Execution, Furniture & Finishing',
      images: ['/project-p19-3.png', '/project-p19-2.png', '/project-p19-4.png', '/project-p19-6.png'],
      details: 'High-utility customer service hub with ergonomic lounge zones and durable industrial finishes.'
    }
  ];

  const creativeExecutionProcess = [
    { 
      num: '01', 
      stage: 'Architectural Briefing & Spatial Planning', 
      tag: 'Phase 1 • Feasibility', 
      image: '/project-p25-1.png',
      description: 'Laser-scanning site dimensions, structural footprint mapping, FSI calculations, and establishing exact spatial flow briefs with clients.',
      deliverable: 'CAD Site Layout & Initial Spatial Blueprint'
    },
    { 
      num: '02', 
      stage: '3D Photorealistic Visualization & Moodboard', 
      tag: 'Phase 2 • Design', 
      image: '/project-p14-3.png',
      description: 'Developing high-resolution 3D volumetric models, natural light simulation, acoustic wall panelling choices, and curated walnut/linen material palettes.',
      deliverable: '3D Photorealistic Render Suite & VR Walkthrough'
    },
    { 
      num: '03', 
      stage: 'BOQ Costing & Contractor Tendering', 
      tag: 'Phase 3 • Governance', 
      image: '/project-p20-1.jpg',
      description: 'Drafting line-by-line Bill of Quantities (BOQ) with Grade-A material caps and competitive vendor bidding to eliminate unapproved variation orders.',
      deliverable: 'Fixed Cost BOQ & Tender Contracts'
    },
    { 
      num: '04', 
      stage: 'MODULE F German CNC Production', 
      tag: 'Phase 4 • Manufacturing', 
      image: '/project-p11-3.jpg',
      description: 'Off-site fabrication of modular desks, executive suites, and storage units at our MODULE F German CNC factory plant (50% faster completion).',
      deliverable: '10-Year Factory Warranted Furniture Set'
    },
    { 
      num: '05', 
      stage: 'On-Site PMC Audits & Handover', 
      tag: 'Phase 5 • Execution', 
      image: '/project-p17-1.jpg',
      description: 'Daily engineering supervision over civil masonry, concealed electrical ducting, HVAC alignment, snag-list audits, and defect-free key handover.',
      deliverable: 'Turnkey Handover & As-Built Layouts'
    }
  ];

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--page-cream)' }}>
      {/* Top Utility Announcement Bar */}
      <div style={{
        background: 'var(--section-cream)',
        color: 'var(--walnut)',
        padding: '8px 5%',
        fontSize: '12px',
        display: (currentView === 'home') ? 'none' : 'flex', // Completely hide on home since hero is full screen
        justifyContent: 'space-between',
        alignItems: 'center',
        fontWeight: '500',
        flexWrap: 'wrap',
        gap: '8px',
        position: 'relative',
        zIndex: 110
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={14} color="var(--brand-gold)" />
          <span>7 SKETCH DESIGNERS • Architectural, Interior & PMC Firm in Pune</span>
        </div>
        <div style={{ display: 'flex', gap: '18px', alignItems: 'center' }}>
          <a href="tel:+917517277477" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Phone size={12} color="var(--brand-gold)" /> +91 75172 77477
          </a>
          <span style={{ opacity: 0.3 }}>|</span>
          <a href="mailto:7sketchdesigner@gmail.com" style={{ color: '#FFFFFF', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Mail size={12} color="var(--brand-gold)" /> 7sketchdesigner@gmail.com
          </a>
        </div>
      </div>

      {/* Glassmorphism Header */}
      <header className="glass-header" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '14px 5%',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center',
        gap: '20px',
        opacity: (currentView === 'home' && !isScrolledPastHero) ? 0 : 1,
        pointerEvents: (currentView === 'home' && !isScrolledPastHero) ? 'none' : 'auto',
        transform: (currentView === 'home' && !isScrolledPastHero) ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}>
        {/* Brand Logo */}
        <div 
          onClick={navigateToHome} 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', flexShrink: 0 }}
        >
          <div style={{
            background: 'var(--brand-dark)',
            color: '#FFFFFF',
            width: '40px',
            height: '40px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-heading)',
            fontWeight: '800',
            fontSize: '22px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.18)'
          }}>
            7
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontWeight: '800', fontSize: '18px', letterSpacing: '0.5px', lineHeight: 1, color: 'var(--brand-dark)' }}>
              SKETCH <span style={{ color: 'var(--brand-gold)', fontWeight: '600', fontSize: '13.5px' }}>DESIGNERS</span>
            </div>
            <div style={{ fontSize: '8.5px', color: 'var(--text-muted)', letterSpacing: '2px', textTransform: 'uppercase', marginTop: '2px', fontWeight: '700' }}>
              Architectural • Interior • PMC
            </div>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center', flexShrink: 1 }}>
          
          {/* Services Dropdown */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
          >
            <button 
              style={{ 
                background: 'none', 
                border: 'none', 
                color: currentView === 'service-detail' ? 'var(--clay)' : 'var(--walnut)', 
                fontSize: '14px', 
                fontWeight: currentView === 'service-detail' ? '700' : '600', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap'
              }}
            >
              Services <ChevronDown size={14} color={currentView === 'service-detail' ? 'var(--clay)' : 'var(--text-muted)'} />
            </button>

            {isServicesDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '-10px',
                  width: '320px',
                  background: '#FFFFFF',
                  border: '1px solid var(--hairline)',
                  borderRadius: '8px',
                  boxShadow: 'var(--shadow-hover)',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                  zIndex: 110
                }}
              >
                {officialServicesData.map(s => (
                  <div
                    key={s.id}
                    onClick={() => navigateToService(s.id)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      background: selectedServiceId === s.id && currentView === 'service-detail' ? 'var(--card-neutral)' : 'transparent',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontSize: '13.5px', fontWeight: '700', color: 'var(--walnut)' }}>{s.title}</div>
                    <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '2px' }}>{s.badge}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <a href="#portfolio" onClick={() => setCurrentView('home')} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}>Projects</a>
          <a href="#process" onClick={() => setCurrentView('home')} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}>Process</a>
          <a href="#about" onClick={() => setCurrentView('home')} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}>About</a>
          <a href="#contact" onClick={() => setCurrentView('home')} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '14px', fontWeight: '600', whiteSpace: 'nowrap' }}>Contact</a>
        </nav>

        {/* Right Action CTAs */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexShrink: 0 }}>
          <button 
            onClick={() => setIsCalculatorOpen(true)} 
            className="btn-outline" 
            style={{ padding: '12px 24px', fontSize: '14px', whiteSpace: 'nowrap' }}
          >
            <Calculator size={16} /> Estimator
          </button>
          <a 
            href="#contact" 
            onClick={() => setCurrentView('home')} 
            className="btn-primary" 
            style={{ padding: '12px 24px', fontSize: '14px', whiteSpace: 'nowrap' }}
          >
            Book Consultation
          </a>
        </div>
      </header>

      {/* RENDER VIEW SWITCHER */}
      {currentView === 'service-detail' ? (
        /* DEDICATED OFFICIAL SERVICE PAGE */
        <div style={{ paddingBottom: '80px' }}>
          <div style={{ background: 'var(--page-cream)', padding: '14px 5%', borderBottom: '1px solid var(--hairline)' }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-muted)' }}>
                <span onClick={navigateToHome} style={{ cursor: 'pointer', fontWeight: '600', color: 'var(--walnut)' }}>Home</span>
                <ChevronRight size={13} />
                <span>Services</span>
                <ChevronRight size={13} />
                <span style={{ color: 'var(--brand-gold)', fontWeight: '700' }}>{selectedService.title}</span>
              </div>
            </div>
          </div>

          <section className="section-wrapper" style={{ background: '#FFFFFF', borderBottom: '1px solid var(--hairline)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-[50px] items-center" style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <div>
                <span className="brand-badge" style={{ marginBottom: '14px' }}>{selectedService.badge}</span>
                <h1 style={{ fontSize: 'clamp(36px, 4.2vw, 52px)', color: 'var(--walnut)', marginBottom: '18px' }}>
                  {selectedService.title}
                </h1>
                <p style={{ fontSize: '19px', color: 'var(--brand-gold)', fontWeight: '600', marginBottom: '22px', lineHeight: '1.4' }}>
                  {selectedService.heroSubtitle}
                </p>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '32px' }}>
                  {selectedService.description}
                </p>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button onClick={() => setIsCalculatorOpen(true)} className="btn-primary">
                    <Calculator size={16} /> Get Service Costing
                  </button>
                  <button onClick={navigateToHome} className="btn-outline">
                    <ArrowLeft size={16} /> Back to Home
                  </button>
                </div>
              </div>

              <div className="luxury-card" style={{ padding: '10px' }}>
                <img src={selectedService.heroImage} alt={selectedService.title} style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '6px' }} />
              </div>
            </div>
          </section>

          {/* SPECIFIC SERVICE DETAILS */}
          {selectedService.id === 'architectural-consultancy' && (
            <div>
              <section className="section-wrapper" style={{ background: 'var(--page-cream)' }}>
                <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
                  <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 48px auto' }}>
                    <span className="brand-badge">Technical Scope</span>
                    <h2 style={{ fontSize: '36px', marginTop: '8px' }}>Architectural Services Offered</h2>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                    {selectedService.subServices.map((sub, idx) => (
                      <div style={{ background: 'var(--card-neutral)', padding: '32px', borderRadius: '12px', flex: '1 1 300px' }}>
                        <div style={{ width: '48px', height: '48px', background: 'var(--card-neutral)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--walnut)', fontWeight: '800', marginBottom: '18px' }}>
                          0{idx+1}
                        </div>
                        <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>{sub.name}</h3>
                        <p style={{ fontSize: '14.5px', lineHeight: '1.7' }}>{sub.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      ) : currentView === 'project-detail' ? (
        <ProjectDetail project={selectedProject} onBack={navigateToHome} />
      ) : (
        /* HOME PAGE VIEW */
        <div>
          {/* SCROLL-BASED GHOST BUILD HERO */}
          <ScrollHero />

          <AboutSection />

          {/* OFFICIAL SERVICES SECTION */}
          <section id="services" className="section-wrapper" style={{ background: 'var(--page-cream)', borderBottom: '1px solid var(--hairline)' }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 60px auto' }}>
                <span className="brand-badge">Our Offerings</span>
                <h2 style={{ marginTop: '8px' }}>Our Services</h2>
                <p style={{ marginTop: '10px' }}>
                  Select any core service to open its complete technical breakdown.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* 1. Architectural Consultancy */}
                <div className="luxury-card" style={{ padding: '38px', background: 'var(--card-neutral)' }}>
                  <div style={{ width: '52px', height: '52px', background: 'var(--page-cream)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)', marginBottom: '22px' }}>
                    <Compass size={26} />
                  </div>
                  <h3 style={{ marginBottom: '12px' }}>Architectural Consultancy</h3>
                  <p style={{ marginBottom: '24px' }}>
                    Comprehensive spatial master planning, 3D concept development, working blueprints, and municipal sanction drawings.
                  </p>

                  <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '6px', marginBottom: '28px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--brand-gold)', textTransform: 'uppercase', marginBottom: '8px' }}>Core Capabilities</div>
                    <div style={{ fontSize: '13.5px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>• Planning & Concept Development</div>
                      <div>• Working Drawings & Municipal Drawings</div>
                      <div>• Corporate, Hotels, Hospitals, Colleges, Industrial</div>
                    </div>
                  </div>

                  <button onClick={() => navigateToService('architectural-consultancy')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Explore Architectural Service <ArrowRight size={16} />
                  </button>
                </div>

                {/* 2. Project Management Consultancy (PMC) */}
                <div className="luxury-card" style={{ padding: '38px', background: 'var(--card-neutral)' }}>
                  <div style={{ width: '52px', height: '52px', background: 'var(--page-cream)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)', marginBottom: '22px' }}>
                    <Layers size={26} />
                  </div>
                  <h3 style={{ marginBottom: '12px' }}>Project Management Consultancy (PMC)</h3>
                  <p style={{ marginBottom: '24px' }}>
                    Professional PMC service providing total control over planning, budget, execution, monitoring, and quality control.
                  </p>

                  <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '6px', marginBottom: '28px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--brand-gold)', textTransform: 'uppercase', marginBottom: '8px' }}>5 Core Pillars</div>
                    <div style={{ fontSize: '13.5px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>• Planning • Budget • Execution</div>
                      <div>• Monitoring • Quality Control</div>
                      <div>• 12-Point Detailed Scope Governance</div>
                    </div>
                  </div>

                  <button onClick={() => navigateToService('project-management-consultancy')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Explore PMC Scope <ArrowRight size={16} />
                  </button>
                </div>

                {/* 3. Turnkey Interior Execution */}
                <div className="luxury-card" style={{ padding: '38px', background: 'var(--card-neutral)' }}>
                  <div style={{ width: '52px', height: '52px', background: 'var(--page-cream)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand-gold)', marginBottom: '22px' }}>
                    <Building2 size={26} />
                  </div>
                  <h3 style={{ marginBottom: '12px' }}>Turnkey Interior Execution</h3>
                  <p style={{ marginBottom: '24px' }}>
                    Single-point accountability for civil works, electricals, custom modular furniture, flooring, painting, and MEP.
                  </p>

                  <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '6px', marginBottom: '28px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--brand-gold)', textTransform: 'uppercase', marginBottom: '8px' }}>Turnkey Fit-Out Scope</div>
                    <div style={{ fontSize: '13.5px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>• Civil • Electrical • Flooring • Painting</div>
                      <div>• Furniture (German CNC Factory MODULE F)</div>
                      <div>• Complete MEP Coordination</div>
                    </div>
                  </div>

                  <button onClick={() => navigateToService('turnkey-interior-execution')} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    Explore Turnkey Scope <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* INTERACTIVE EXECUTION BLUEPRINT */}
          <section id="process" className="section-wrapper" style={{ background: 'var(--page-cream)', borderTop: '1px solid var(--hairline)' }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 60px auto' }}>
                <span className="brand-badge">Creative Architecture Journey</span>
                <h2 style={{ marginTop: '10px' }}>Interactive Execution Blueprint</h2>
                <p style={{ marginTop: '10px' }}>
                  Explore how 7 Sketch Designers transforms conceptual briefs into living architectural spaces.
                </p>
              </div>

              {/* Interactive Step Switcher Bar */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
                {creativeExecutionProcess.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveProcessStep(idx)}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '30px',
                      border: '1.5px solid',
                      borderColor: activeProcessStep === idx ? 'var(--brand-gold)' : 'var(--hairline)',
                      background: activeProcessStep === idx ? 'var(--walnut)' : '#FFFFFF',
                      color: activeProcessStep === idx ? '#FFFFFF' : 'var(--walnut)',
                      fontWeight: '700',
                      fontSize: '13.5px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: activeProcessStep === idx ? '0 8px 20px rgba(0,0,0,0.15)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span style={{ color: activeProcessStep === idx ? 'var(--brand-gold)' : 'var(--text-muted)' }}>{item.num}</span>
                    <span>{item.stage.split('&')[0]}</span>
                  </button>
                ))}
              </div>

              {/* Dynamic Interactive Stage Canvas Showcase */}
              <div className="luxury-card" style={{ background: 'var(--card-neutral)', padding: '40px', borderRadius: '12px' }}>
                <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-[48px] items-center">
                  <div>
                    <span className="brand-badge" style={{ marginBottom: '14px' }}>{creativeExecutionProcess[activeProcessStep].tag}</span>
                    <h3 style={{ marginBottom: '16px' }}>
                      {creativeExecutionProcess[activeProcessStep].stage}
                    </h3>
                    <p style={{ marginBottom: '28px' }}>
                      {creativeExecutionProcess[activeProcessStep].description}
                    </p>

                    <div style={{ background: '#FFFFFF', padding: '20px 24px', borderRadius: '8px', borderLeft: '4px solid var(--brand-gold)', boxShadow: 'var(--shadow-sm)' }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--brand-gold)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
                        Verified Stage Deliverable
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--walnut)' }}>
                        {creativeExecutionProcess[activeProcessStep].deliverable}
                      </div>
                    </div>
                  </div>

                  <div style={{ position: 'relative' }}>
                    <img 
                      src={creativeExecutionProcess[activeProcessStep].image} 
                      alt="Stage canvas" 
                      style={{ width: '100%', height: '360px', objectFit: 'cover', borderRadius: '8px', boxShadow: 'var(--shadow-hover)' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* High Resolution Portfolio Section */}
          <ProjectsPortfolio projects={projects} onProjectClick={navigateToProject} />

          {/* PMC DEEP DIVE */}
          <PmcDeepDive />

          {/* IN-HOUSE MANUFACTURING / FACTORY SHOWCASE */}
          <section id="factory" className="section-wrapper" style={{ background: 'var(--section-cream)', color: 'var(--walnut)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px] items-center" style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <div>
                <span className="brand-badge" style={{ background: 'rgba(194, 155, 56, 0.2)', color: 'var(--brand-gold)', borderColor: 'var(--brand-gold)' }}>In-House Manufacturing</span>
                <h2 style={{ color: 'var(--walnut)', marginTop: '16px', marginBottom: '22px' }}>
                  MODULE F Homes German CNC Factory
                </h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                  Unlike traditional interior contractors who rely on slow on-site carpentry, 7 Sketch Designers is directly backed by our state-of-the-art **MODULE F Homes** manufacturing facility equipped with German CNC precision machinery.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '40px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="var(--brand-gold)" />
                    <span style={{ fontSize: '15.5px', color: 'var(--walnut)', fontWeight: '600' }}>50% Faster Fit-Out Delivery (Precision Factory Cut)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="var(--brand-gold)" />
                    <span style={{ fontSize: '15.5px', color: 'var(--walnut)', fontWeight: '600' }}>Zero On-Site Dust & Noise (Off-Site Pre-Fabrication)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="var(--brand-gold)" />
                    <span style={{ fontSize: '15.5px', color: 'var(--walnut)', fontWeight: '600' }}>10-Year Factory Warranty on All Modular Woodwork</span>
                  </div>
                </div>

                <a href="#contact" className="btn-primary">
                  Inquire About Modular Fit-Outs <ArrowRight size={16} />
                </a>
              </div>

              <div className="luxury-card" style={{ padding: '12px', background: '#FFFFFF' }}>
                <img src="/project-p20-1.jpg" alt="MODULE F High Res Precision Woodwork" style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '6px' }} />
              </div>
            </div>
          </section>
          {/* WHY CHOOSE US */}
          <WhyChooseUs />

          {/* INDUSTRIES */}
          <Industries />

          {/* MISSION & VISION */}
          <MissionVision />

          {/* TEAM */}
          <TeamSection />

          {/* PARTNER */}
          <PartnerSection />

          {/* TESTIMONIALS */}
          <Testimonials />
        </div>
      )}

      {/* Footer Section */}
      <footer id="contact" className="section-wrapper" style={{ background: 'var(--section-cream)', color: 'var(--walnut)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px]" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ background: 'var(--clay)', color: 'var(--page-cream)', width: '38px', height: '38px', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: '500', fontSize: '20px' }}>7</div>
              <span style={{ fontSize: '22px', fontWeight: '500', fontFamily: 'var(--font-display)', color: 'var(--clay-deep)' }}>7 SKETCH DESIGNERS</span>
            </div>

            <p style={{ color: 'var(--stone-text)', fontSize: '15px', lineHeight: '1.8', marginBottom: '32px', maxWidth: '440px' }}>
              Designing Spaces. Delivering Excellence. Architectural, Interior Design & Project Management Consultancy firm in Pune.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              {/* Quick Links */}
              <div>
                <h4 style={{ fontSize: '16px', color: 'var(--walnut)', marginBottom: '16px', fontFamily: 'var(--font-display)' }}>Quick Links</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14.5px' }}>
                  <a href="#services" style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>Services</a>
                  <a href="#portfolio" style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>Projects</a>
                  <a href="#about" style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>About</a>
                  <a href="#contact" style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>Contact</a>
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14.5px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <MapPin size={20} color="var(--clay-deep)" strokeWidth={1.5} />
                    <span>Office No. G-28, Ground Floor, One Mall, Ravet–Aundh BRT Road, Pune – 412101</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Phone size={20} color="var(--clay-deep)" strokeWidth={1.5} />
                    <a href="tel:+917517277477" style={{ color: 'var(--walnut)', textDecoration: 'none' }}>+91 75172 77477</a>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <Mail size={20} color="var(--clay-deep)" strokeWidth={1.5} />
                    <a href="mailto:7sketchdesigner@gmail.com" style={{ color: 'var(--walnut)', textDecoration: 'none' }}>7sketchdesigner@gmail.com</a>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '13px', color: '#7D786E' }}>
                © {new Date().getFullYear()} 7 Sketch Designers. Associated with MODULE F Homes.
              </div>
            </div>

            <div style={{ background: 'var(--card-neutral)', color: 'var(--walnut)', padding: '48px', borderRadius: '16px', boxShadow: 'var(--shadow-hover)' }}>
            <h3 style={{ fontSize: '31px', marginBottom: '8px' }}>Get In Touch</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', color: 'var(--clay)' }}>
                ★★★★★
              </div>
              <span style={{ fontSize: '12px', color: 'var(--muted)', fontWeight: '600' }}>Trusted by 50+ Corporate Brands in Pune</span>
            </div>
            <p style={{ fontSize: '16px', color: 'var(--stone-text)', marginBottom: '32px', lineHeight: '1.5' }}>Speak directly with Principal Architect Rohit Wankhede to discuss your spatial requirements.</p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent! We will call you shortly.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <input type="text" placeholder="Your Full Name" required style={{ background: 'var(--page-cream)', border: '1px solid var(--hairline)', padding: '14px', borderRadius: '14px', outline: 'none' }} />
              <input type="tel" placeholder="Mobile Number (+91)" required style={{ background: 'var(--page-cream)', border: '1px solid var(--hairline)', padding: '14px', borderRadius: '14px', outline: 'none' }} />
              <select style={{ background: 'var(--page-cream)', border: '1px solid var(--hairline)', padding: '14px', borderRadius: '14px', outline: 'none', color: 'var(--walnut)' }}>
                <option value="architectural">Architectural Consultancy</option>
                <option value="pmc">PMC Feasibility Audit</option>
                <option value="turnkey">Turnkey Commercial Fit-Out</option>
              </select>
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                Book Consultation Now <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <a 
        href="https://wa.me/917517277477?text=Hi%207%20Sketch%20Designers,%20I%20would%20like%20to%20inquire%20about%20architectural/interior%20services."
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed',
          bottom: '26px',
          right: '26px',
          zIndex: 99,
          background: '#25D366',
          color: '#FFFFFF',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 28px rgba(37, 211, 102, 0.45)',
          textDecoration: 'none',
          opacity: (currentView === 'home' && !isScrolledPastHero) ? 0 : 1,
          pointerEvents: (currentView === 'home' && !isScrolledPastHero) ? 'none' : 'auto',
          transform: (currentView === 'home' && !isScrolledPastHero) ? 'scale(0.8)' : 'scale(1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}
