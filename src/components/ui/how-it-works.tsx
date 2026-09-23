"use client";

import React from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useReliableInView } from "../../hooks/useReliableInView";

interface CardProps {
  number: string;
  title: string;
  description: string;
  className?: string;
  rotate?: string;
}

const Card = ({
  number,
  title,
  description,
  className,
  rotate,
}: CardProps) => {
  return (
    <div
      className={`relative w-full md:w-[320px] transition-transform duration-500 hover:z-30 hover:scale-105 ${rotate} ${className}`}
    >
      <div className="bg-white p-2 rounded-[25px] border border-neutral-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
        <div
          className={`bg-[#fafafa] border border-neutral-200/60 rounded-[15px] p-[25px] h-full flex flex-col relative overflow-hidden`}
        >
          <span
            className={`text-neutral-200 text-7xl font-light mb-4 tracking-tighter`}
            style={{ fontFamily: 'Georgia, serif' }}
          >
            {number}
          </span>
          <h3 className="text-xl font-semibold text-neutral-800 leading-tight mb-[12px] tracking-wide">
            {title}
          </h3>
          <p className="text-neutral-500 text-sm/6 tracking-wide font-light">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export interface Step {
  title: string;
  description: string;
}

export interface StepPosition {
  className?: string;
  rotate?: string;
}

export interface HowItWorksProps {
  features?: Step[];
  className?: string;
  stepPositions?: StepPosition[];
}

const DEFAULT_CARD_POSITIONS: StepPosition[] = [
  { className: "md:absolute md:top-0 md:left-[10%]", rotate: "md:rotate-3" },
  { className: "md:absolute md:top-[180px] md:right-[10%]", rotate: "md:-rotate-3" },
  { className: "md:absolute md:top-[500px] md:left-[10%]", rotate: "md:rotate-2" },
  { className: "md:absolute md:top-[680px] md:right-[15%]", rotate: "md:-rotate-2" },
  { className: "md:absolute md:top-[1000px] md:left-[15%]", rotate: "md:rotate-1" },
];

export default function HowItWorks({
  features,
  className,
  stepPositions,
}: HowItWorksProps) {
  const defaultFeatures: Step[] = [
    {
      title: "Consultation & Briefing",
      description: "Understanding your vision, functional needs, and spatial requirements to establish a clear project foundation.",
    },
    {
      title: "Concept & 3D Design",
      description: "Translating ideas into immersive 3D visualizations and precise 2D layouts for your approval.",
    },
    {
      title: "Detailed Planning",
      description: "Selecting premium materials, finalizing technical drawings, and establishing strict project timelines.",
    },
    {
      title: "Execution & Build",
      description: "Our master craftsmen and project managers bring the designs to life with unparalleled precision.",
    },
    {
      title: "Final Handover",
      description: "A meticulous walkthrough ensuring every detail meets our elite standards before you step in.",
    },
  ];

  const data = features && features.length > 0 ? features : defaultFeatures;
  const positions = stepPositions || DEFAULT_CARD_POSITIONS;

  let height = 1300;
  if (data.length === 1) height = 400;
  else if (data.length === 2) height = 550;
  else if (data.length === 3) height = 900;
  else if (data.length === 4) height = 1100;
  else height = 1300;

  // Animation variants for staggered popping
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25, // Time between each card popping up
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        mass: 1
      }
    }
  };

  const [ref, isInView] = useReliableInView(0.15);

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`bg-[#fafafa] max-md:pt-10 max-md:pb-25 md:py-20 px-4 md:px-8 relative overflow-hidden ${className}`}
      >
        {/* Subtle minimalist background elements */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.4]"
          style={{
            backgroundImage: "linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <m.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative w-full max-w-[1200px] mx-auto flex flex-col space-y-12 md:space-y-0 md:block h-auto md:h-[var(--md-height)]"
            style={{ "--md-height": `${height}px` } as React.CSSProperties}
          >
            {data.length > 1 && (
              <svg
                className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block z-0 opacity-40"
                viewBox={`0 0 1200 ${height}`}
                preserveAspectRatio="none"
              >
                {(() => {
                  const pathD = data.reduce((acc, _, index) => {
                    if (index >= data.length - 1) return acc;
                    if (index === 0) return "M 320 200 C 600 200, 700 300, 850 350"; 
                    if (index === 1) return acc + " C 1000 400, 600 450, 320 600";
                    if (index === 2) return acc + " C 150 700, 600 800, 850 850"; 
                    if (index === 3) return acc + " C 1000 900, 600 1000, 320 1150"; 
                    return acc;
                  }, "");
                  return (
                    <m.path
                      d={pathD}
                      stroke="#d4d4d4"
                      strokeWidth="2"
                      strokeDasharray="6 8"
                      fill="none"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })()}
              </svg>
            )}

            {data.map((step, index) => {
              const position = positions[index % positions.length];

              return (
                <m.div key={step.title} variants={cardVariants} className="w-full">
                  <Card
                    number={`0${index + 1}`}
                    title={step.title}
                    description={step.description}
                    rotate={position.rotate}
                    className={position.className}
                  />
                </m.div>
              );
            })}
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}
