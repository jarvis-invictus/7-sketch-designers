import React, { useEffect } from 'react';
import { ArrowLeft, MapPin, Briefcase, Building2, Layers } from 'lucide-react';
import { motion } from 'framer-motion';

// Expanded content for each project based on its ID
const getProjectContent = (id) => {
  const contentMap = {
    'gokarting': {
      overview: "The Go Karting Recreational Hub was a turnkey execution project requiring a delicate balance between high-octane entertainment and premium comfort. Our team was tasked with transforming a raw industrial space into a vibrant destination for both thrill-seekers and corporate events.",
      approach: "We designed a comprehensive layout that seamlessly connects the adrenaline of the track with the relaxation of the café and waiting lounge. Acoustic treatment was a priority to ensure the roar of the engines didn't overpower the social areas. Custom venue branding was integrated into the very architecture of the space, using durable, heavy-duty materials capable of withstanding extreme foot traffic while maintaining a sleek, modern aesthetic."
    },
    'christ-hall': {
      overview: "Christ College approached us to design a Training Hall and Library that would serve as the intellectual heart of their campus. The goal was to create spaces that foster deep concentration, collaborative learning, and large-scale academic presentations without compromising on acoustic integrity.",
      approach: "The auditorium features state-of-the-art acoustic panelling and tiered ergonomic seating, designed to project sound clearly while keeping the audience comfortable during long sessions. In stark contrast, the adjoining library was crafted as a sanctuary of silence. We custom-built expansive bookshelves and integrated warm, focused lighting to reduce eye strain, paired with dedicated quiet study zones."
    },
    'suratwala': {
      overview: "The Suratwala Mark Plazzo stands as a premier commercial landmark in Hinjawadi, Pune. We were commissioned to execute a comprehensive interior fit-out that would appeal to high-end corporate tenants and retail businesses alike.",
      approach: "Our architectural intervention focused on the common areas, escalator corridors, and model corporate offices. We utilized high-grade polished stone, seamless glass balustrades, and dynamic recessed lighting to create an atmosphere of expansive luxury. The spatial flow was optimized to handle dense crowds while maintaining a feeling of open, breathable corporate elegance."
    },
    'pall': {
      overview: "Pall Corporations required a modern, highly functional head office that reflected their global corporate identity while providing a flexible, comfortable environment for their Pune-based workforce.",
      approach: "As the lead PMC and turnkey execution partner, we managed everything from space planning to final handover. The floorplan was divided into flexible workstation hubs, private executive suites, and collaborative client meeting rooms. We integrated smart lighting, advanced HVAC systems, and ergonomic furniture to ensure peak employee productivity and well-being."
    },
    'wilo': {
      overview: "Wilo Mather and Platt wanted their new Pune Experience Centre and Sales Office to be more than just a workspace; it needed to be a physical manifestation of their brand's commitment to energy efficiency and innovation.",
      approach: "We designed a sleek, technology-forward corporate office that doubles as a showroom. The reception area makes an immediate impact with custom brand installations and energy-efficient ambient lighting. Beyond the reception, we optimized the executive meeting rooms for hybrid presentations and crafted open-plan workstations that encourage seamless team communication."
    },
    'rr-heritage': {
      overview: "Set in the lush landscapes of Mahabaleshwar, the R R Heritage Luxury Resort is a testament to blending modern luxury with natural tranquility. The project demanded a full-scale interior design and execution strategy for guest rooms and communal spaces.",
      approach: "Our design philosophy centered on bringing the outside in. We used rich, natural textures, earthy tones, and expansive windows to frame the breathtaking views. Every guest suite was meticulously planned to offer a highly personalized, opulent experience, complete with custom-designed furniture, ambient mood lighting, and premium fixtures that elevate the standard of hospitality."
    }
  };

  return contentMap[id] || {
    overview: "This project represents our commitment to architectural excellence and precise execution. We worked closely with the client to understand their unique spatial requirements and delivered a solution that exceeds industry standards.",
    approach: "Our approach combined innovative space planning with high-quality material selection. From the initial conceptual sketches to the final turnkey handover, every detail was carefully managed by our dedicated project management team to ensure timely and flawless delivery."
  };
};

export default function ProjectDetail({ project, onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) return null;

  const content = getProjectContent(project.id);
  const heroImage = project.images[0] || '/placeholder.svg';
  const galleryImages = project.images.slice(1); // All images except the first

  return (
    <div className="w-full bg-[var(--page-cream)] min-h-screen pt-[90px]">
      
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full bg-black rounded-b-3xl overflow-hidden shadow-2xl">
        <img 
          src={heroImage} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        
        {/* Top Navigation */}
        <div className="absolute top-0 left-0 w-full p-6 md:px-12 z-20 flex justify-between items-center">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white bg-black/30 hover:bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full transition-all border border-white/20 text-sm font-semibold tracking-wide"
          >
            <ArrowLeft size={16} /> Back to Projects
          </button>
        </div>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:px-24 z-20">
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-3 py-1 mb-4 text-[10px] font-bold tracking-widest text-white uppercase bg-[var(--clay)] rounded-full backdrop-blur-md border border-white/20 shadow-lg">
              {project.type}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {project.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24">
        
        {/* Project Meta Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pb-12 border-b border-[var(--hairline)]">
          <div>
            <div className="text-[var(--clay)] mb-2"><Briefcase size={24} strokeWidth={1.5} /></div>
            <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-1">Client</p>
            <p className="font-medium text-[var(--walnut)]">{project.client}</p>
          </div>
          <div>
            <div className="text-[var(--clay)] mb-2"><MapPin size={24} strokeWidth={1.5} /></div>
            <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-1">Location</p>
            <p className="font-medium text-[var(--walnut)]">{project.location}</p>
          </div>
          <div>
            <div className="text-[var(--clay)] mb-2"><Building2 size={24} strokeWidth={1.5} /></div>
            <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-1">Category</p>
            <p className="font-medium text-[var(--walnut)] capitalize">{project.category}</p>
          </div>
          <div>
            <div className="text-[var(--clay)] mb-2"><Layers size={24} strokeWidth={1.5} /></div>
            <p className="text-xs uppercase tracking-widest text-[var(--muted)] mb-1">Scope</p>
            <p className="font-medium text-[var(--walnut)] text-sm">{project.scope}</p>
          </div>
        </div>

        {/* Project Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--walnut)] mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              Project Overview
            </h2>
            <p className="text-[var(--stone-text)] leading-relaxed mb-6">
              {content.overview}
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="bg-[var(--section-cream)] p-8 md:p-12 rounded-[20px] border border-[var(--hairline)]">
              <h3 className="text-xl md:text-2xl font-bold text-[var(--walnut)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Our Approach & Execution
              </h3>
              <p className="text-[var(--stone-text)] leading-relaxed text-lg">
                {content.approach}
              </p>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {galleryImages.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--walnut)] mb-8 text-center" style={{ fontFamily: 'var(--font-display)' }}>
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryImages.map((img, idx) => (
                <div key={idx} className={`overflow-hidden rounded-xl border border-[var(--hairline)] ${idx === 2 ? 'md:col-span-2' : ''}`}>
                  <img 
                    src={img} 
                    alt={`${project.title} - view ${idx + 1}`} 
                    className="w-full h-[300px] md:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
      
    </div>
  );
}
