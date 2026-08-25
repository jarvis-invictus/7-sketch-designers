import React from 'react';
import { motion } from 'framer-motion';

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i) => {
    const delay = i * 0.12;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, duration: 1.2, ease: "easeInOut" },
        opacity: { delay, duration: 0.1 }
      }
    };
  }
};

const fade = {
  hidden: { opacity: 0 },
  visible: (i) => {
    const delay = i * 0.12;
    return {
      opacity: 1,
      transition: { delay, duration: 0.5 }
    };
  }
};

const SvgContainer = ({ children }) => (
  <div style={{ 
    width: '100%', 
    height: '180px', 
    background: '#FAF6F0', 
    borderRadius: '8px', 
    boxShadow: 'var(--shadow-hover)',
    overflow: 'hidden',
    position: 'relative'
  }}>
    <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
      <defs>
        <pattern id="dotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#E5DDD1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotGrid)" />
    </svg>
    <svg viewBox="0 0 400 180" style={{ position: 'relative', width: '100%', height: '100%', zIndex: 1 }}>
      {children}
    </svg>
  </div>
);

// Phase 1: Architectural Briefing (Sketched room corner)
export const Phase1Illustration = () => (
  <SvgContainer>
    {/* Wall Corner Line */}
    <motion.line x1="200" y1="20" x2="200" y2="160" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={0} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    {/* Left Wall Floor Line */}
    <motion.line x1="50" y1="130" x2="200" y2="160" fill="none" stroke="#3E2F23" strokeWidth="2" custom={1} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    {/* Right Wall Floor Line */}
    <motion.line x1="200" y1="160" x2="350" y2="130" fill="none" stroke="#3E2F23" strokeWidth="2" custom={2} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    {/* Left Wall Window */}
    <motion.path d="M 70 45 L 170 32 L 170 110 L 70 120 Z" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={3} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="120" y1="38" x2="120" y2="115" fill="none" stroke="#B8825F" strokeWidth="1" custom={4} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="70" y1="82" x2="170" y2="71" fill="none" stroke="#B8825F" strokeWidth="1" custom={5} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    {/* Minimalist Lounge Chair on the Right Wall */}
    {/* Backrest */}
    <motion.path d="M 255 110 L 275 70 L 285 75 L 265 115 Z" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={6} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    {/* Seat */}
    <motion.path d="M 265 115 L 315 105 L 320 112 L 270 122 Z" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={7} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    {/* Legs */}
    <motion.line x1="265" y1="117" x2="262" y2="140" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={8} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="275" y1="121" x2="278" y2="143" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={9} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="315" y1="110" x2="318" y2="132" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={10} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    {/* Notes Tag (Clay accent box) */}
    <motion.rect x="300" y="25" width="55" height="35" rx="3" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={11} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="310" y1="37" x2="345" y2="37" fill="none" stroke="#E5DDD1" strokeWidth="1.5" custom={12} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="310" y1="47" x2="335" y2="47" fill="none" stroke="#E5DDD1" strokeWidth="1.5" custom={13} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.path d="M 170 71 L 300 42" fill="none" stroke="#B8825F" strokeWidth="1" strokeDasharray="3 3" custom={14} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
  </SvgContainer>
);

// Phase 2: 3D Visualization & Moodboard (Material moodboard)
export const Phase2Illustration = () => (
  <SvgContainer>
    {/* Pendant Lamp */}
    <motion.line x1="100" y1="0" x2="100" y2="25" fill="none" stroke="#3E2F23" strokeWidth="1.2" custom={0} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.path d="M 85 45 L 115 45 L 108 25 L 92 25 Z" fill="none" stroke="#B8825F" strokeWidth="1.5" custom={1} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.circle cx="100" cy="49" r="3" fill="none" stroke="#3E2F23" strokeWidth="1.2" custom={2} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    {/* Fabric Swatch Square (textured hatching) */}
    <motion.rect x="50" y="70" width="60" height="60" rx="4" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={3} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.path d="M 55 70 L 50 75 M 65 70 L 50 85 M 75 70 L 50 95 M 85 70 L 50 105 M 95 70 L 50 115 M 105 70 L 50 125 M 110 75 L 60 125 M 110 85 L 70 125 M 110 95 L 80 125 M 110 105 L 90 125 M 110 115 L 100 125" fill="none" stroke="#E5DDD1" strokeWidth="1" custom={4} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />

    {/* Paint Chips */}
    <motion.rect x="135" y="70" width="30" height="55" rx="2" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={5} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="135" y1="110" x2="165" y2="110" fill="none" stroke="#B8825F" strokeWidth="1" custom={6} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    <motion.rect x="175" y="80" width="30" height="55" rx="2" fill="none" stroke="#3E2F23" strokeWidth="1.2" custom={7} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="175" y1="120" x2="205" y2="120" fill="none" stroke="#3E2F23" strokeWidth="1" custom={8} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />

    {/* Hanging Material Tag */}
    <motion.path d="M 225 50 L 255 35 L 270 65 L 240 80 Z" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={9} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.circle cx="242" cy="50" r="2" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={10} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.path d="M 242 50 C 235 45, 230 35, 238 28" fill="none" stroke="#3E2F23" strokeWidth="1" strokeDasharray="2 2" custom={11} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />

    {/* Armchair Side-Silhouette */}
    <motion.path d="M 300 70 C 300 110, 315 115, 315 125 M 315 125 L 360 115" fill="none" stroke="#3E2F23" strokeWidth="2" custom={12} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.path d="M 290 85 C 310 85, 335 90, 345 105" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={13} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="315" y1="125" x2="313" y2="150" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={14} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="355" y1="116" x2="357" y2="148" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={15} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
  </SvgContainer>
);

// Phase 3: BOQ Costing & Tendering (Furniture spec-sheet)
export const Phase3Illustration = () => (
  <SvgContainer>
    {/* Specification Sheet Base */}
    <motion.rect x="60" y="20" width="280" height="140" rx="4" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={0} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    {/* Lounge Chair Silhouette on the Left */}
    <motion.path d="M 95 60 C 95 85, 103 95, 103 105 M 103 105 C 120 105, 130 100, 140 95" fill="none" stroke="#3E2F23" strokeWidth="2" custom={1} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.path d="M 97 80 C 110 80, 120 85, 120 95" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={2} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="103" y1="105" x2="100" y2="130" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={3} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="135" y1="96" x2="138" y2="128" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={4} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    {/* Chair Dimension Ticks */}
    <motion.line x1="82" y1="60" x2="82" y2="130" fill="none" stroke="#B8825F" strokeWidth="0.8" strokeDasharray="2 2" custom={5} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="79" y1="60" x2="85" y2="60" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={6} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="79" y1="130" x2="85" y2="130" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={7} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />

    {/* Spec Sheet Text Lines */}
    <motion.line x1="170" y1="45" x2="260" y2="45" fill="none" stroke="#3E2F23" strokeWidth="2.5" custom={8} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="170" y1="60" x2="310" y2="60" fill="none" stroke="#E5DDD1" strokeWidth="1.5" custom={9} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="170" y1="75" x2="290" y2="75" fill="none" stroke="#E5DDD1" strokeWidth="1.5" custom={10} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    {/* Price Tag Hanging from Chair */}
    <motion.path d="M 132 90 L 152 75 L 165 88 L 145 103 Z" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={11} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="126" y1="94" x2="134" y2="88" fill="none" stroke="#B8825F" strokeWidth="1" custom={12} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    <motion.text x="139" y="93" fill="#B8825F" fontSize="8" fontWeight="bold" fontFamily="monospace" transform="rotate(-37 139 93)" custom={13} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>$420</motion.text>

    {/* Qty callout box */}
    <motion.rect x="235" y="95" width="75" height="30" rx="4" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={14} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.text x="245" y="114" fill="#3E2F23" fontSize="11" fontWeight="bold" fontFamily="monospace" custom={15} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>QTY: 12</motion.text>
  </SvgContainer>
);

// Phase 4: MODULE F CNC Production (Wardrobe cabinet mid-assembly)
export const Phase4Illustration = () => (
  <SvgContainer>
    {/* Cabinet Main Carcass */}
    <motion.rect x="110" y="20" width="160" height="140" fill="none" stroke="#3E2F23" strokeWidth="2" custom={0} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    {/* Internal Shelves */}
    <motion.line x1="110" y1="65" x2="270" y2="65" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={1} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="110" y1="110" x2="270" y2="110" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={2} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="190" y1="65" x2="190" y2="160" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={3} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />

    {/* Exploded Wardrobe Door (Left-offset) */}
    <motion.rect x="45" y="30" width="45" height="120" fill="none" stroke="#B8825F" strokeWidth="1.5" custom={4} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    {/* Exploded Hinge Alignment Lines */}
    <motion.line x1="90" y1="50" x2="110" y2="50" fill="none" stroke="#B8825F" strokeWidth="1" strokeDasharray="3 3" custom={5} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="90" y1="130" x2="110" y2="130" fill="none" stroke="#B8825F" strokeWidth="1" strokeDasharray="3 3" custom={6} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.circle cx="110" cy="50" r="3" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={7} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.circle cx="110" cy="130" r="3" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={8} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />

    {/* Pulled-out drawer front details */}
    <motion.rect x="200" y="120" width="60" height="25" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={9} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    {/* 3D Drawer slide lines */}
    <motion.line x1="200" y1="120" x2="185" y2="108" fill="none" stroke="#B8825F" strokeWidth="1" custom={10} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="200" y1="145" x2="185" y2="133" fill="none" stroke="#B8825F" strokeWidth="1" custom={11} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="230" y1="132" x2="230" y2="133" fill="none" stroke="#3E2F23" strokeWidth="3.5" custom={12} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />

    {/* Precision Joint circle indicator */}
    <motion.circle cx="190" cy="65" r="10" fill="none" stroke="#B8825F" strokeWidth="1" strokeDasharray="2 2" custom={13} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="178" y1="65" x2="202" y2="65" fill="none" stroke="#B8825F" strokeWidth="0.8" custom={14} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="190" y1="53" x2="190" y2="77" fill="none" stroke="#B8825F" strokeWidth="0.8" custom={15} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
  </SvgContainer>
);

// Phase 5: On-Site PMC Audits & Handover (Door with key & Checklist)
export const Phase5Illustration = () => (
  <SvgContainer>
    {/* Finished Door Frame */}
    <motion.rect x="70" y="15" width="100" height="150" rx="1" fill="none" stroke="#3E2F23" strokeWidth="2.5" custom={0} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    {/* Door Panel details */}
    <motion.rect x="85" y="28" width="30" height="50" rx="1" fill="none" stroke="#3E2F23" strokeWidth="1" custom={1} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.rect x="125" y="28" width="30" height="50" rx="1" fill="none" stroke="#3E2F23" strokeWidth="1" custom={2} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.rect x="85" y="88" width="30" height="63" rx="1" fill="none" stroke="#3E2F23" strokeWidth="1" custom={3} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.rect x="125" y="88" width="30" height="63" rx="1" fill="none" stroke="#3E2F23" strokeWidth="1" custom={4} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    {/* Door Handle */}
    <motion.path d="M 77 88 L 77 98 L 72 98" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={5} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.circle cx="77" cy="91" r="2.5" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={6} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />

    {/* Handover Key (Present & detailed) */}
    <motion.circle cx="48" cy="100" r="7" fill="none" stroke="#B8825F" strokeWidth="1.5" custom={7} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="55" y1="100" x2="72" y2="100" fill="none" stroke="#B8825F" strokeWidth="1.5" custom={8} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.path d="M 62 100 L 62 108 M 67 100 L 67 106" fill="none" stroke="#B8825F" strokeWidth="1.5" custom={9} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />

    {/* Checklist Card beside the door */}
    <motion.rect x="220" y="25" width="120" height="130" rx="5" fill="none" stroke="#3E2F23" strokeWidth="1.5" custom={10} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.text x="235" y="44" fill="#3E2F23" fontSize="10" fontWeight="bold" fontFamily="sans-serif" custom={11} variants={fade} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>HANDOVER AUDIT</motion.text>
    
    {/* Checklist Row 1 */}
    <motion.rect x="235" y="58" width="10" height="10" rx="1" fill="none" stroke="#3E2F23" strokeWidth="1" custom={12} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.path d="M 233 62 L 238 67 L 246 57" fill="none" stroke="#B8825F" strokeWidth="1.5" custom={13} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="253" y1="63" x2="320" y2="63" fill="none" stroke="#E5DDD1" strokeWidth="1.5" custom={14} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    {/* Checklist Row 2 */}
    <motion.rect x="235" y="78" width="10" height="10" rx="1" fill="none" stroke="#3E2F23" strokeWidth="1" custom={15} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.path d="M 233 82 L 238 87 L 246 77" fill="none" stroke="#B8825F" strokeWidth="1.5" custom={16} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="253" y1="83" x2="310" y2="83" fill="none" stroke="#E5DDD1" strokeWidth="1.5" custom={17} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    
    {/* Checklist Row 3 */}
    <motion.rect x="235" y="98" width="10" height="10" rx="1" fill="none" stroke="#3E2F23" strokeWidth="1" custom={18} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.path d="M 233 102 L 238 107 L 246 97" fill="none" stroke="#B8825F" strokeWidth="1.5" custom={19} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.line x1="253" y1="103" x2="325" y2="103" fill="none" stroke="#E5DDD1" strokeWidth="1.5" custom={20} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />

    {/* Mini validation seal */}
    <motion.circle cx="310" cy="132" r="8" fill="none" stroke="#B8825F" strokeWidth="1.2" custom={21} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
    <motion.path d="M 306 137 L 302 147 M 310 137 L 314 147" fill="none" stroke="#B8825F" strokeWidth="1" custom={22} variants={draw} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} />
  </SvgContainer>
);
