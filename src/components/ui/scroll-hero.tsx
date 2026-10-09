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

  // Which frame the scroll position is asking for, which frame is actually on
  // the canvas, and the latest renderFrame. Used to redraw when a better frame arrives.
  const targetFrameRef = useRef(1);
  const drawnFrameRef = useRef(0);
  const renderFrameRef = useRef<(index: number) => void>(() => {});

  useEffect(() => {
    const usePortrait = window.matchMedia('(max-width: 768px) and (orientation: portrait)').matches;
    let cancelled = false;

    const pad = (n: number) => n.toString().padStart(3, '0');
    const desktopFrameUrl = (n: number) => `/hero-frames/ezgif-frame-${pad(n)}.jpg`;
    const portraitFrameUrl = (n: number) => `/hero-frames-mobile-webp/mob-frame-${pad(n)}.webp`;

    // Loads one picture. If it fails (flaky network), tries again twice before giving up.
    const loadImage = (
      url: string,
      asyncDecode: boolean,
      done: (img: HTMLImageElement | null) => void,
      attempt = 0
    ) => {
      const img = new Image();
      if (asyncDecode) img.decoding = 'async';
      img.onload = () => { if (!cancelled) done(img); };
      img.onerror = () => {
        if (cancelled) return;
        if (attempt < 2) {
          setTimeout(() => { if (!cancelled) loadImage(url, asyncDecode, done, attempt + 1); }, attempt === 0 ? 600 : 1500);
        } else {
          done(null);
        }
      };
      img.src = url;
    };

    // Loads frames 2-192: the last frame and every 4th frame first (so scrolling works
    // early), then the rest. Six at a time. When a frame arrives that is closer to where
    // the page is currently scrolled than what is on screen, the canvas is redrawn.
    const loadRemainingFrames = (frameUrl: (n: number) => string, asyncDecode: boolean) => {
      const order: number[] = [192];
      for (let i = 5; i <= 189; i += 4) order.push(i);
      for (let i = 2; i < 192; i++) {
        if ((i - 1) % 4 !== 0) order.push(i);
      }
      let head = 0;
      const next = () => {
        if (cancelled || head >= order.length) return;
        const idx = order[head++];
        loadImage(frameUrl(idx), asyncDecode, (img) => {
          if (img) {
            imagesRef.current[idx] = img;
            const target = targetFrameRef.current;
            const drawn = drawnFrameRef.current;
            if (drawn !== 0 && Math.abs(idx - target) < Math.abs(drawn - target)) {
              renderFrameRef.current(target);
            }
          }
          next();
        });
      };
      for (let i = 0; i < 6; i++) next();
    };

    const runDesktopLoader = () => {
      loadImage(desktopFrameUrl(1), false, (img) => {
        if (img) {
          imagesRef.current[1] = img;
          setFirstFrameLoaded(true);
        }
        loadRemainingFrames(desktopFrameUrl, false);
        if (!img) {
          // Frame 1 never arrived: start the hero as soon as any other frame has.
          const wait = window.setInterval(() => {
            if (cancelled) { window.clearInterval(wait); return; }
            if (imagesRef.current.some(Boolean)) { window.clearInterval(wait); setFirstFrameLoaded(true); }
          }, 300);
        }
      });
    };

    if (usePortrait) {
      loadImage(portraitFrameUrl(1), true, (img) => {
        if (!img) { runDesktopLoader(); return; }
        imagesRef.current[1] = img;
        setFirstFrameLoaded(true);
        loadRemainingFrames(portraitFrameUrl, true);
      });
    } else {
      runDesktopLoader();
    }

    return () => { cancelled = true; };
  }, []);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let targetIndex = Math.round(index);
    if (targetIndex < 1) targetIndex = 1;
    if (targetIndex > 192) targetIndex = 192;
    targetFrameRef.current = targetIndex;

    // Nearest loaded frame fallback if not exact match
    if (!imagesRef.current[targetIndex]) {
      for (let i = 1; i < 192; i++) {
        if (targetIndex - i >= 1 && imagesRef.current[targetIndex - i]) { targetIndex -= i; break; }
        if (targetIndex + i <= 192 && imagesRef.current[targetIndex + i]) { targetIndex += i; break; }
      }
    }
    
    const img = imagesRef.current[targetIndex];
    if (!img) return;
    drawnFrameRef.current = targetIndex;

    if (img.height > img.width) {
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      if (cssW === 0 || cssH === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.round(cssW * dpr);
      const targetH = Math.round(cssH * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }
      context.setTransform(1, 0, 0, 1, 0, 0);
      const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
      const drawW = img.width * ratio;
      const drawH = img.height * ratio;
      const dx = (canvas.width - drawW) / 2;
      const dy = (canvas.height - drawH) / 2;
      context.drawImage(img, dx, dy, drawW, drawH);
      
      const offsets = [2, 4, -2, -4];
      for (const off of offsets) {
        const nextImg = imagesRef.current[targetIndex + off];
        if (nextImg && nextImg.decode) {
          nextImg.decode().catch(() => {});
        }
      }
      return;
    }

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

  renderFrameRef.current = renderFrame;

  useEffect(() => {
    if (!firstFrameLoaded) return;
    
    const frameCount = 192;
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
