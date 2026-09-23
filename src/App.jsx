import React, { useState, useEffect } from 'react';
import { useReliableInView } from './hooks/useReliableInView';
import { motion } from 'framer-motion';
import ScrollHero from './components/ui/scroll-hero';
import ProjectsPortfolio from './components/ui/projects-portfolio';
import { officialServicesData } from './officialServicesData';
import { 
  Building2, Phone, Mail, MapPin, ChevronRight, CheckCircle2, 
  Layers, ArrowLeft, ArrowRight, Calculator, Compass, Sparkles, 
  ChevronDown, Home, Menu, X
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
import ServicesCarousel from './components/ui/services-carousel';
import { 
  Phase1Illustration, 
  Phase2Illustration, 
  Phase3Illustration, 
  Phase4Illustration, 
  Phase5Illustration 
} from './components/ui/process-illustrations';

const ProcessIllustrations = [
  Phase1Illustration,
  Phase2Illustration,
  Phase3Illustration,
  Phase4Illustration,
  Phase5Illustration
];

function ProcessBlueprintCard({ item, idx }) {
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
}

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [showHeroLandingLogo, setShowHeroLandingLogo] = useState(true);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'service-detail' | 'project-detail'
  const [selectedServiceId, setSelectedServiceId] = useState('architectural-consultancy');
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  // Process Steps are now sequentially mapped, no active step state needed.

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      
      // Hero section pins for 350% of viewport height
      const heroScrollDistance = window.innerHeight * 3.5;
      setIsScrolledPastHero(window.scrollY > heroScrollDistance);
      setShowHeroLandingLogo(window.scrollY < 24);
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
      title: 'Go Karting Recreational Hub',
      category: 'Recreational Space',
      type: 'Commercial Entertainment',
      scope: 'Concept Design, Lighting, Spatial Planning',
      details: 'An immersive recreational hub featuring dynamic neon styling, expansive arcade zones, and a bold, high-energy aesthetic.',
      images: [
        '/raftaar-exterior.jpg',
        '/raftaar-aerial.jpg',
        '/raftaar-lounge.png',
        '/raftaar-neon.png',
        '/raftaar-shelves.png',
        '/raftaar-red.png',
        '/raftaar-arcade.png',
        '/raftaar-cafe.png'
      ]
    },
    {
      id: 'suratwala',
      title: 'Suratwala Mark Plazzo',
      category: 'Commercial Building',
      type: 'Commercial Building',
      scope: 'Interior Fit-out, Common Areas, Office Kitchen, Office Spaces',
      details: 'A premium commercial fit-out featuring elegant fluted glass partitions, ergonomic open workspaces, and luxurious utility areas.',
      images: [
        '/suratwala-hallway.jpg',
        '/suratwala-workspace-wide.jpg',
        '/suratwala-workspace.jpg',
        '/suratwala-cabin-wide.jpg',
        '/suratwala-cabin-close.jpg',
        '/suratwala-straight-desk.jpg',
        '/suratwala-kitchen.jpg'
      ]
    },
    {
      id: 'pall',
      title: 'Pall Corporations',
      category: 'Corporate Office Interior',
      type: 'Corporate Office Interior',
      scope: 'Interior Design, Space Planning, Project Management, Turnkey Execution',
      details: 'A turnkey corporate execution balancing open collaborative workstations with dedicated presentation lounges and distinctive geometric lighting.',
      images: [
        '/pall-hero.png',
        '/pall-workstation-wide.png',
        '/pall-workstation-close.png',
        '/pall-lounge.png',
        '/pall-cafe.png'
      ]
    },
    {
      id: 'wilo',
      title: 'Wilo Sales Office',
      category: 'Corporate Office',
      type: 'Corporate Office',
      scope: 'Corporate Interior, Workstations, Meeting Rooms, Reception',
      details: 'A branded corporate interior featuring collaborative lounges, executive meeting rooms, and vibrant workspaces.',
      images: [
        '/wilo-lounge-wide.png',
        '/wilo-meeting-room.png',
        '/wilo-executive-cabin.png',
        '/wilo-cafeteria.png',
        '/wilo-collage.png'
      ]
    },
    {
      id: 'rr-heritage',
      title: 'R R Heritage – Mahabaleshwar',
      category: 'Hospitality Interior',
      type: 'Hospitality Interior',
      scope: 'Resort Interior Design, Guest Experience Planning, Material Selection, Turnkey Execution',
      details: 'A luxurious hospitality interior combining natural wood finishes, warm ambient lighting, and elegant multi-level suites.',
      images: [
        '/project-p17-1.jpg',
        '/rr-exterior.png',
        '/rr-loft-suite.png'
      ]
    },
    {
      id: 'tata',
      title: 'Tata Service Centre – Moshi',
      category: 'Commercial Spaces',
      type: 'Commercial Service Centre',
      scope: 'Interior Design, Space Planning, Turnkey Execution, Project Management, Furniture & Finishing',
      details: 'A premium commercial service centre highlighting bespoke furniture, modern space planning, and elegant ambient lighting.',
      images: [
        '/tata-desk-hero.png',
        '/tata-lounge-chair.png',
        '/tata-executive-desk.png'
      ]
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
      stage: 'In-House German CNC Production', 
      tag: 'Phase 4 • Manufacturing', 
      image: '/project-p11-3.jpg',
      description: 'Off-site fabrication of modular desks, executive suites, and storage units at our in-house German CNC factory plant (50% faster completion).',
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
          <a href="tel:+917517277477" style={{ color: 'var(--walnut)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Phone size={12} color="var(--brand-gold)" /> +91 75172 77477
          </a>
          <span style={{ opacity: 0.3 }}>|</span>
          <a href="mailto:7sketchdesigner@gmail.com" style={{ color: 'var(--walnut)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '20px',
        opacity: (currentView === 'home' && !isScrolledPastHero) ? 0 : 1,
        pointerEvents: (currentView === 'home' && !isScrolledPastHero) ? 'none' : 'auto',
        transform: (currentView === 'home' && !isScrolledPastHero) ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        background: 'rgba(250, 246, 240, 0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--hairline)',
      }}>
        {/* Brand Logo */}
        <div 
          onClick={navigateToHome} 
          style={{ cursor: 'pointer', flexShrink: 0, padding: '4px 0', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <img src="/pure-icon-logo.png" alt="7 Sketch Designers" style={{ height: '45px', objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: '600', color: 'var(--walnut)', lineHeight: '1.2' }}>Sketch Designer's</span>
            <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--stone-text)', marginTop: '2px' }}>Architecture, Interior & Landscape Consultant</span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav className="hidden md:flex" style={{ gap: '24px', alignItems: 'center', flexShrink: 1 }}>
          
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
                color: currentView === 'service-detail' ? 'var(--brand-gold)' : 'var(--walnut)', 
                fontSize: '14px', 
                fontWeight: currentView === 'service-detail' ? '700' : '500', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                whiteSpace: 'nowrap'
              }}
            >
              Services <ChevronDown size={14} color={currentView === 'service-detail' ? 'var(--brand-gold)' : 'var(--walnut)'} />
            </button>

            {isServicesDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '-10px',
                  width: '360px',
                  background: 'var(--card-neutral)',
                  border: '1px solid var(--hairline)',
                  borderRadius: '12px',
                  boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  zIndex: 110
                }}
              >
                {officialServicesData.map(s => {
                  let Icon = Compass;
                  if (s.id === 'architectural-consultancy') Icon = Compass;
                  if (s.id === 'project-management-consultancy') Icon = Layers;
                  if (s.id === 'turnkey-interior-execution') Icon = Building2;
                  if (s.id === 'interior-design') Icon = Home;
                  return (
                  <div
                    key={s.id}
                    onClick={() => { setIsServicesDropdownOpen(false); navigateToService(s.id); }}
                    style={{
                      padding: '14px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      background: selectedServiceId === s.id && currentView === 'service-detail' ? 'var(--page-cream)' : 'transparent',
                      border: '1px solid',
                      borderColor: selectedServiceId === s.id && currentView === 'service-detail' ? 'var(--brand-gold)' : 'transparent',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center'
                    }}
                    onMouseEnter={(e) => {
                      if (!(selectedServiceId === s.id && currentView === 'service-detail')) {
                        e.currentTarget.style.background = 'var(--page-cream)';
                        e.currentTarget.style.borderColor = 'var(--hairline)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!(selectedServiceId === s.id && currentView === 'service-detail')) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.borderColor = 'transparent';
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '8px', background: 'var(--accent-soft)', color: 'var(--walnut)' }}>
                      <Icon size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--walnut)' }}>{s.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--stone-text)', marginTop: '2px' }}>{s.badge}</div>
                    </div>
                  </div>
                )})}
              </div>
            )}
          </div>
          
          <a href="#portfolio" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 50); }} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>Projects</a>
          <a href="#process" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('process')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 50); }} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>Process</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 50); }} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>About</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 100); }} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '14px', fontWeight: '500', whiteSpace: 'nowrap' }}>Contact</a>
        </nav>

        {/* Right Action CTAs */}
        <div className="hidden md:flex" style={{ gap: '16px', alignItems: 'center', flexShrink: 0 }}>
          {/* Estimator hidden because modal is not yet built */}
          <a 
            href="#contact" 
            onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 100); }} 
            className="btn-primary" 
            style={{ padding: '12px 24px', fontSize: '14px', whiteSpace: 'nowrap' }}
          >
            Book Consultation
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--walnut)',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '44px',
              minWidth: '44px'
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div 
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--page-cream)',
              borderTop: '1px solid var(--hairline)',
              height: 'calc(100vh - 74px)',
              overflowY: 'auto',
              padding: '24px 5%',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
            className="md:hidden"
          >
            {/* Mobile Services */}
            <div>
              <button 
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'none',
                  border: 'none',
                  color: 'var(--walnut)',
                  fontSize: '18px',
                  fontWeight: '600',
                  padding: '12px 0',
                  minHeight: '44px',
                  fontFamily: 'var(--font-display)',
                  cursor: 'pointer'
                }}
              >
                Services <ChevronDown size={20} style={{ transform: isMobileServicesOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }} />
              </button>
              
              {isMobileServicesOpen && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '16px', marginTop: '8px' }}>
                  {officialServicesData.map(s => {
                    let Icon = Compass;
                    if (s.id === 'architectural-consultancy') Icon = Compass;
                    if (s.id === 'project-management-consultancy') Icon = Layers;
                    if (s.id === 'turnkey-interior-execution') Icon = Building2;
                    if (s.id === 'interior-design') Icon = Home;
                    return (
                      <div
                        key={s.id}
                        onClick={() => { setIsMobileMenuOpen(false); setIsMobileServicesOpen(false); navigateToService(s.id); }}
                        style={{
                          padding: '12px',
                          display: 'flex',
                          gap: '16px',
                          alignItems: 'center',
                          minHeight: '44px',
                          cursor: 'pointer',
                          borderRadius: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '6px', background: 'var(--accent-soft)', color: 'var(--walnut)' }}>
                          <Icon size={16} />
                        </div>
                        <div style={{ fontSize: '15px', fontWeight: '500', color: 'var(--stone-text)' }}>{s.title}</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <a href="#portfolio" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setCurrentView('home'); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 50); }} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '18px', fontWeight: '600', padding: '12px 0', minHeight: '44px', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center' }}>Projects</a>
            <a href="#process" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setCurrentView('home'); setTimeout(() => document.getElementById('process')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 50); }} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '18px', fontWeight: '600', padding: '12px 0', minHeight: '44px', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center' }}>Process</a>
            <a href="#about" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setCurrentView('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 50); }} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '18px', fontWeight: '600', padding: '12px 0', minHeight: '44px', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center' }}>About</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setCurrentView('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 100); }} style={{ color: 'var(--walnut)', textDecoration: 'none', fontSize: '18px', fontWeight: '600', padding: '12px 0', minHeight: '44px', fontFamily: 'var(--font-display)', display: 'flex', alignItems: 'center' }}>Contact</a>
            
            <div style={{ marginTop: 'auto', paddingTop: '24px', paddingBottom: '24px' }}>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setCurrentView('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 100); }} 
                className="btn-primary" 
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '14px', fontSize: '16px', minHeight: '44px', width: '100%' }}
              >
                Book Consultation
              </a>
            </div>
          </div>
        )}
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
                  {/* Calculator modal not built yet */}
                  {/* <button onClick={() => setIsCalculatorOpen(true)} className="btn-primary">
                    <Calculator size={16} /> Get Service Costing
                  </button> */}
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

          {currentView === 'home' && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 5,
                pointerEvents: 'none',
                opacity: showHeroLandingLogo ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
            >
              <img
                src="/hero-landing-logo.png"
                alt="7 Sketch Designers"
                style={{ width: 'min(68vw, 620px)', height: 'auto', objectFit: 'contain' }}
              />
            </div>
          )}

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

              <ServicesCarousel navigateToService={navigateToService} projects={projects} />
            </div>
          </section>

          {/* INTERACTIVE EXECUTION BLUEPRINT */}
          <section id="process" className="section-wrapper" style={{ background: 'var(--page-cream)', borderTop: '1px solid var(--hairline)' }}>
            <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 32px auto' }}>
                <span className="brand-badge">Creative Architecture Journey</span>
                <h2 style={{ marginTop: '10px' }}>Interactive Execution Blueprint</h2>
                <p style={{ marginTop: '10px' }}>
                  Explore how 7 Sketch Designers transforms conceptual briefs into living architectural spaces.
                </p>
              </div>

              {/* Sequential Process Reveal */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {creativeExecutionProcess.map((item, idx) => (
                  <ProcessBlueprintCard key={idx} item={item} idx={idx} />
                ))}
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
                <h2 style={{ color: 'var(--walnut)', marginTop: '16px', marginBottom: '24px' }}>
                  State-of-the-Art German CNC Manufacturing
                </h2>
                <p style={{ color: 'var(--stone-text)', fontSize: '17px', lineHeight: '1.7', maxWidth: '580px', marginBottom: '36px' }}>
                  Unlike traditional interior contractors who rely on slow on-site carpentry, 7 Sketch Designers operates our own state-of-the-art manufacturing facility equipped with German CNC precision machinery. We proudly manufacture and execute for our own clients, while also serving a network of valued associates—including Module F Homes and multiple other partners.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="#C29B38" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: 'var(--walnut)', fontWeight: '500' }}>50% Faster Fit-Out Delivery (Precision Factory Cut)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="#C29B38" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: 'var(--walnut)', fontWeight: '500' }}>Zero On-Site Dust & Noise (Off-Site Pre-Fabrication)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <CheckCircle2 size={22} color="#C29B38" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '16px', color: 'var(--walnut)', fontWeight: '500' }}>10-Year Factory Warranty on All Modular Woodwork</span>
                  </div>
                </div>

                <a href="#contact" onClick={(e) => { e.preventDefault(); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 100); }} className="btn-primary" style={{ display: 'inline-flex', padding: '14px 28px', alignItems: 'center', gap: '8px' }}>
                  Inquire About Modular Fit-Outs <ArrowRight size={18} />
                </a>
              </div>

              <div style={{ position: 'relative', width: '100%', minHeight: '520px', display: 'flex', alignItems: 'center' }}>
                {/* Main Wide Image (The Anchor) */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: '92%', height: '480px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', zIndex: 1 }}>
                  <img src="/cnc-factory-wide.jpg" alt="7 Sketch Designers CNC Factory Floor" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                {/* Overlapping Macro Image (The Floating Accent) */}
                <div style={{ position: 'absolute', bottom: '10px', left: 0, width: '42%', height: '240px', borderRadius: '8px', overflow: 'hidden', border: '6px solid #FFFFFF', background: '#FFFFFF', zIndex: 2, boxShadow: '0 30px 60px rgba(62, 47, 35, 0.15)' }}>
                  <img src="/cnc-factory-macro.jpg" alt="Precision CNC Edge Banding Machinery" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '4px' }} />
                </div>
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

      
      {/* Contact Section */}
      <section id="contact" className="section-wrapper" style={{ background: 'var(--section-cream)' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-[60px] items-stretch">
            
            {/* Maps Embed */}
            <div style={{ minHeight: '400px', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-hover)' }}>
              <iframe 
                src="https://maps.google.com/maps?q=Office+No.+G-28,+Ground+Floor,+One+Mall,+Ravet%E2%80%93Aundh+BRT+Road,+Pune&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '100%' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
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

              <form onSubmit={(e) => { 
                try {
                  e.preventDefault(); 
                  const formData = new FormData(e.target);
                  const name = formData.get('name') || '';
                  const mobile = formData.get('mobile') || '';
                  const service = formData.get('service') || '';
                  let message = formData.get('message') || '';
                  
                  if (typeof message === 'string') {
                    message = message.trim();
                  }
                  
                  let text = `Hi, I'm ${name}. I'm interested in ${service}.`;
                  if (message) {
                    text += ` ${message}.`;
                  }
                  text += ` Contact: ${mobile}.`;
                  
                  const url = `https://wa.me/917517277477?text=${encodeURIComponent(text)}`;
                  window.open(url, '_blank');
                } catch (err) {
                  console.error("Form submit error:", err);
                }
              }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input name="name" type="text" placeholder="Your Full Name" required style={{ background: 'var(--page-cream)', border: '1px solid var(--hairline)', padding: '14px', borderRadius: '14px', outline: 'none' }} />
                <input name="mobile" type="tel" placeholder="Mobile Number (+91)" required style={{ background: 'var(--page-cream)', border: '1px solid var(--hairline)', padding: '14px', borderRadius: '14px', outline: 'none' }} />
                <select name="service" style={{ background: 'var(--page-cream)', border: '1px solid var(--hairline)', padding: '14px', borderRadius: '14px', outline: 'none', color: 'var(--walnut)' }}>
                  <option value="Architectural Consultancy">Architectural Consultancy</option>
                  <option value="PMC Feasibility Audit">PMC Feasibility Audit</option>
                  <option value="Turnkey Commercial Fit-Out">Turnkey Commercial Fit-Out</option>
                  <option value="Interior Design">Interior Design</option>
                </select>
                <textarea name="message" placeholder="Tell us more (Optional)" style={{ background: 'var(--page-cream)', border: '1px solid var(--hairline)', padding: '14px', borderRadius: '14px', outline: 'none', minHeight: '100px', resize: 'vertical' }} />
                <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>
                  Book Consultation Now <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

            {/* Footer Section */}
      <footer style={{ background: 'var(--accent-soft)', color: 'var(--stone-text)', padding: '80px 24px 40px 24px' }}>
        <div style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" style={{ marginBottom: '60px' }}>
            {/* Column 1: Brand */}
            <div>
              <img src="/main-logo.png" alt="7 Sketch Designers" style={{ height: '60px', objectFit: 'contain', marginBottom: '20px' }} />
              <p style={{ color: 'var(--stone-text)', fontSize: '14.5px', lineHeight: '1.6', marginBottom: '24px' }}>
                Designing Spaces. Delivering Excellence.
              </p>
              <a href="https://www.instagram.com/7sketchdesigners" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--walnut)', color: 'var(--page-cream)', textDecoration: 'none', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--clay)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--walnut)'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 style={{ fontSize: '16px', color: 'var(--walnut)', marginBottom: '24px', fontFamily: 'var(--font-display)', fontWeight: '600' }}>Quick Links</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14.5px' }}>
                <a href="#services" onClick={() => setCurrentView('home')} style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>Services</a>
                <a href="#portfolio" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 50); }} style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>Projects</a>
                <a href="#process" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('process')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 50); }} style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>Process</a>
                <a href="#about" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 50); }} style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>About</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); setCurrentView('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'instant', block: 'start' }), 100); }} style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>Contact</a>
              </div>
            </div>

            {/* Column 3: Our Services */}
            <div>
              <h4 style={{ fontSize: '16px', color: 'var(--walnut)', marginBottom: '24px', fontFamily: 'var(--font-display)', fontWeight: '600' }}>Our Services</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14.5px' }}>
                <a href="#services" style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>Architectural Consultancy</a>
                <a href="#services" style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>Project Management Consultancy</a>
                <a href="#services" style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>Turnkey Interior Execution</a>
                <a href="#services" style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>Interior Design</a>
              </div>
            </div>

            {/* Column 4: Contact Info */}
            <div>
              <h4 style={{ fontSize: '16px', color: 'var(--walnut)', marginBottom: '24px', fontFamily: 'var(--font-display)', fontWeight: '600' }}>Contact Info</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14.5px', color: 'var(--stone-text)' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <MapPin size={20} color="var(--clay-deep)" strokeWidth={1.5} style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>Office No. G-28, Ground Floor, One Mall, Ravet–Aundh BRT Road, Pune – 412101</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Phone size={20} color="var(--clay-deep)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <a href="tel:+917517277477" style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>+91 75172 77477</a>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Mail size={20} color="var(--clay-deep)" strokeWidth={1.5} style={{ flexShrink: 0 }} />
                  <a href="mailto:7sketchdesigner@gmail.com" style={{ color: 'var(--stone-text)', textDecoration: 'none' }}>7sketchdesigner@gmail.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4" style={{ paddingTop: '24px', borderTop: '1px solid var(--hairline)', fontSize: '13.5px', color: 'var(--muted)' }}>
            <div>© {new Date().getFullYear()} 7 Sketch Designers. All rights reserved.</div>
            <div style={{ fontSize: '12.5px' }}>
              Designed & Developed by <a href="https://invictusai.site" target="_blank" rel="noreferrer" style={{ color: 'var(--brand-gold)', textDecoration: 'none', fontWeight: '500' }}>Invictus AI</a>
            </div>
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
