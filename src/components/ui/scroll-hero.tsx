import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const frameCount = 180;
    const currentFrame = (index: number) => 
      `/frames/frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

    // Handle Retina displays for crisp images
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    
    // Scale context to match pixel ratio
    context.scale(pixelRatio, pixelRatio);

    const images: HTMLImageElement[] = [];
    const airpods = { frame: 0 };

    // Preload images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    // Draw the first image as soon as it loads
    images[0].onload = render;

    function render() {
      if (!context || !canvas || !images[airpods.frame]) return;
      
      const img = images[airpods.frame];
      
      // Calculate aspect ratio against the unscaled CSS dimensions (innerWidth/innerHeight)
      const hRatio = window.innerWidth / img.width;
      const vRatio = window.innerHeight / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (window.innerWidth - img.width * ratio) / 2;
      const centerShift_y = (window.innerHeight - img.height * ratio) / 2;
      
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      context.drawImage(
        img, 
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }

    // GSAP ScrollTrigger Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=350%', // Pin for 3.5x screen heights
        scrub: 0.5,    // Slight smoothing on the scrub
        pin: true,
      }
    });

    tl.to(airpods, {
      frame: frameCount - 1,
      snap: 'frame',
      ease: 'none',
      onUpdate: render,
    });
    
    // Fade out the logo text slightly as they scroll down
    tl.to(textRef.current, {
      opacity: 0,
      y: -50,
      ease: 'power1.inOut'
    }, 0); // Start at the same time as the frames

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{
          imageRendering: 'high-quality',
          filter: 'contrast(1.08) saturate(1.1) brightness(1.02)'
        }}
      />
      
      {/* Overlay Logo and Text */}
      <div 
        ref={textRef}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-4 z-10"
      >
        <img 
          src="/project-p1-2.png" 
          alt="7 Sketch Designers Logo" 
          className="w-full max-w-[500px] md:max-w-[700px] lg:max-w-[900px] drop-shadow-2xl object-contain"
        />
        <p className="font-sans font-bold text-xs md:text-sm tracking-[0.2em] md:tracking-[0.4em] uppercase text-amber-500 mt-6 md:mt-10 max-w-2xl mx-auto drop-shadow-md text-center">
          Architectural • Commercial Interior Fit-Out • PMC Consultancy
        </p>
      </div>
    </div>
  );
};

export default ScrollHero;
