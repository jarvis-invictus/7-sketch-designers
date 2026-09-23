import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const mobileBgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  useEffect(() => {
    const frameCount = 180;
    const currentFrame = (index: number) => `/hero-frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`;

    // Simple batch loading to avoid huge simultaneous network requests
    const batchSize = 15;
    
    const loadBatch = (startIndex: number) => {
      if (startIndex > frameCount) return;
      const endIndex = Math.min(startIndex + batchSize - 1, frameCount);
      let loadedCount = 0;
      const totalToLoad = endIndex - startIndex + 1;
      
      const onImageLoadOrError = () => {
        loadedCount++;
        if (loadedCount === totalToLoad) {
          loadBatch(endIndex + 1);
        }
      };

      for (let i = startIndex; i <= endIndex; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
          imagesRef.current[i] = img;
          onImageLoadOrError();
        };
        img.onerror = onImageLoadOrError;
      }
    };

    // Load first frame immediately
    const firstImg = new Image();
    firstImg.src = currentFrame(1);
    firstImg.onload = () => {
      imagesRef.current[1] = firstImg;
      setFirstFrameLoaded(true);
      loadBatch(2); // Start background loading
    };
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let targetIndex = Math.round(index);
    if (targetIndex < 1) targetIndex = 1;
    if (targetIndex > 180) targetIndex = 180;

    // Nearest loaded frame fallback if not exact match
    if (!imagesRef.current[targetIndex]) {
      for (let i = 1; i < 180; i++) {
        if (targetIndex - i >= 1 && imagesRef.current[targetIndex - i]) { targetIndex -= i; break; }
        if (targetIndex + i <= 180 && imagesRef.current[targetIndex + i]) { targetIndex += i; break; }
      }
    }
    
    const img = imagesRef.current[targetIndex];
    if (!img) return;

    let pixelRatio = window.devicePixelRatio || 1;
    let canvasWidth = window.innerWidth * pixelRatio;
    let canvasHeight = window.innerHeight * pixelRatio;
    
    // Maintain native resolution max limit of 1920x1080 to prevent upscaling blur
    if (canvasWidth > 1920 || canvasHeight > 1080) {
      const ratioW = 1920 / window.innerWidth;
      const ratioH = 1080 / window.innerHeight;
      pixelRatio = Math.min(ratioW, ratioH, pixelRatio);
      canvasWidth = window.innerWidth * pixelRatio;
      canvasHeight = window.innerHeight * pixelRatio;
    }

    if (canvas.width !== Math.floor(canvasWidth) || canvas.height !== Math.floor(canvasHeight)) {
      canvas.width = Math.floor(canvasWidth);
      canvas.height = Math.floor(canvasHeight);
      context.scale(pixelRatio, pixelRatio);
    }
    
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      // Mobile: show the COMPLETE frame (contain-fit, no cropping) so the room
      // reveal reads the same way it does on desktop, instead of a cropped sliver.
      // A small blurred cover-fit copy of the same frame fills the remaining
      // space above/below so there is no dead flat-color bar.
      if (!mobileBgCanvasRef.current) {
        mobileBgCanvasRef.current = document.createElement('canvas');
      }
      const bgCanvas = mobileBgCanvasRef.current;
      const bgCtx = bgCanvas.getContext('2d');
      if (bgCtx) {
        const smallW = 64;
        const smallH = Math.max(1, Math.round(64 * (window.innerHeight / window.innerWidth)));
        bgCanvas.width = smallW;
        bgCanvas.height = smallH;
        const bgCoverRatio = Math.max(smallW / img.width, smallH / img.height);
        const bgW = img.width * bgCoverRatio;
        const bgH = img.height * bgCoverRatio;
        bgCtx.clearRect(0, 0, smallW, smallH);
        bgCtx.drawImage(img, (smallW - bgW) / 2, (smallH - bgH) / 2, bgW, bgH);

        context.save();
        context.filter = 'blur(14px) brightness(0.72)';
        context.drawImage(bgCanvas, 0, 0, smallW, smallH, 0, 0, window.innerWidth, window.innerHeight);
        context.restore();
      }

      const containRatio = Math.min(window.innerWidth / img.width, window.innerHeight / img.height);
      const fw = img.width * containRatio;
      const fh = img.height * containRatio;
      const fx = (window.innerWidth - fw) / 2;
      const fy = (window.innerHeight - fh) / 2;
      context.drawImage(img, 0, 0, img.width, img.height, fx, fy, fw, fh);
    } else {
      // Desktop: unchanged cover-fit behavior.
      const hRatio = window.innerWidth / img.width;
      const vRatio = window.innerHeight / img.height;
      const ratio = Math.max(hRatio, vRatio);

      const centerShift_x = (window.innerWidth - img.width * ratio) / 2;
      const centerShift_y = (window.innerHeight - img.height * ratio) / 2;

      context.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    }
  };

  useEffect(() => {
    if (!firstFrameLoaded) return;
    
    const frameCount = 180;
    const animationTarget = { frame: 1 };
    
    // Initial render
    renderFrame(1);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom', // Ends when bottom of 350vh container hits bottom of viewport
        scrub: true,   // Direct 1-to-1 sync, no smoothing lag
        
      }
    });

    tl.to(animationTarget, {
      frame: frameCount,
      snap: 'frame',
      ease: 'none',
      onUpdate: () => renderFrame(animationTarget.frame),
    });

    const handleResize = () => renderFrame(animationTarget.frame);
    window.addEventListener('resize', handleResize);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, [firstFrameLoaded]);

  return (
    <div ref={containerRef} className="relative w-full bg-black" style={{ height: '350vh' }}>
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
        className="w-full h-full object-cover"
        style={{
          imageRendering: 'high-quality',
          filter: 'contrast(1.08) saturate(1.1) brightness(1.02)'
        }}
      />
      </div>
    </div>
  );
};

export default ScrollHero;
