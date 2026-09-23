import { useEffect, useRef, useState } from 'react';

/**
 * A more reliable replacement for Framer Motion's `whileInView`.
 * Uses a real IntersectionObserver as the primary signal, backed by a
 * requestAnimationFrame poll that force-reveals the element if it's
 * genuinely visible on screen but the observer hasn't fired within
 * `graceMs`. Once revealed, stays revealed (matches `viewport={{once:true}}`).
 *
 * @param {number} amount - fraction of the element that must be visible (0-1)
 * @param {number} graceMs - how long a genuinely-visible element is given before the fallback forces it
 * @returns {[React.RefObject, boolean]} [ref to attach to the observed element, isInView]
 */
export function useReliableInView(amount = 0.15, graceMs = 400) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasEnteredRef.current) return;

    let rafId;
    let pollStart = null;

    const markVisible = () => {
      if (hasEnteredRef.current) return;
      hasEnteredRef.current = true;
      setIsInView(true);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };

    const checkRectManually = () => {
      if (hasEnteredRef.current) return;
      const rect = node.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      const visibleFraction = rect.height > 0 ? visibleHeight / rect.height : 0;
      if (visibleFraction >= amount) {
        if (pollStart === null) pollStart = performance.now();
        if (performance.now() - pollStart >= graceMs) {
          markVisible();
          return;
        }
      } else {
        pollStart = null;
      }
      rafId = requestAnimationFrame(checkRectManually);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) markVisible(); }),
      { threshold: amount }
    );
    observer.observe(node);
    rafId = requestAnimationFrame(checkRectManually);

    return () => {
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [amount, graceMs]);

  return [ref, isInView];
}
