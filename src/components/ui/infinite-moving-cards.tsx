"use client";

import * as React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { cn } from "../../lib/utils";

export type InfiniteMovingCardItem = {
  id?: string | number;
  title?: string;
  description?: string;
  image?: string;
  avatar?: string;
  name?: string;
  role?: string;
  rating?: number;
  tags?: string[];
};

export type InfiniteMovingCardsProps<
  T extends InfiniteMovingCardItem = InfiniteMovingCardItem,
> = {
  items: T[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean;
  className?: string;
  cardClassName?: string;
  gap?: number;
  loop?: boolean;
  showGradientMask?: boolean;
  renderItem?: (item: T, index: number) => React.ReactNode;
};

const SPEED_PX_PER_SEC: Record<
  NonNullable<InfiniteMovingCardsProps["speed"]>,
  number
> = {
  slow: 26,
  normal: 44,
  fast: 74,
};

function renderStars(rating: number) {
  const stars = Math.max(0, Math.min(5, Math.round(rating)));
  return Array.from({ length: stars }, (_, i) => (
    <span key={`star-${i}`} className="text-amber-400">
      ★
    </span>
  ));
}

export function InfiniteMovingCards<
  T extends InfiniteMovingCardItem = InfiniteMovingCardItem,
>({
  items,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
  cardClassName,
  gap = 16,
  loop = true,
  showGradientMask = true,
  renderItem,
}: InfiniteMovingCardsProps<T>) {
  const reduceMotion = useReducedMotion() === true;
  const x = useMotionValue(0);
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [singleWidth, setSingleWidth] = React.useState(0);
  const [viewportWidth, setViewportWidth] = React.useState(0);
  const [hovered, setHovered] = React.useState(false);

  const safeItems = items ?? [];
  const renderedItems = loop ? [...safeItems, ...safeItems] : safeItems;

  React.useLayoutEffect(() => {
    const viewportNode = viewportRef.current;
    const trackNode = trackRef.current;
    if (!viewportNode || !trackNode) return;

    const measure = () => {
      const full = trackNode.scrollWidth;
      const widthPerSet = loop ? full / 2 : full;
      setSingleWidth(widthPerSet);
      setViewportWidth(viewportNode.clientWidth);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewportNode);
    observer.observe(trackNode);
    return () => observer.disconnect();
  }, [gap, loop, safeItems.length]);

  React.useEffect(() => {
    if (singleWidth <= 0) return;
    x.set(direction === "right" ? -singleWidth : 0);
  }, [direction, singleWidth, x]);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || safeItems.length <= 1) return;
    if (pauseOnHover && hovered) return;
    if (singleWidth <= 0) return;

    const velocity = SPEED_PX_PER_SEC[speed] * (delta / 1000);
    const nextRaw = x.get() + (direction === "left" ? -velocity : velocity);

    if (loop) {
      let wrapped = nextRaw;
      if (direction === "left" && wrapped <= -singleWidth)
        wrapped += singleWidth;
      if (direction === "right" && wrapped >= 0) wrapped -= singleWidth;
      x.set(wrapped);
      return;
    }

    if (direction === "left") {
      const limit = -Math.max(0, singleWidth - viewportWidth);
      x.set(Math.max(limit, nextRaw));
    } else {
      x.set(Math.min(0, nextRaw));
    }
  });

  return (
    <div
      className={cn("relative w-full", className)}
      onMouseEnter={pauseOnHover ? () => setHovered(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setHovered(false) : undefined}
    >
      <div ref={viewportRef} className="overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex w-max py-4"
          style={{
            x: reduceMotion ? 0 : x,
            gap,
          }}
        >
          {renderedItems.map((item, idx) => {
            const key = `${item.id ?? "item"}-${idx}`;
            if (renderItem) {
              return (
                <div key={key} className={cn("shrink-0", cardClassName)}>
                  {renderItem(item, idx)}
                </div>
              );
            }

            return (
              <article
                key={key}
                className={cn(
                  "shrink-0 rounded-2xl border transition-transform hover:-translate-y-1",
                  cardClassName,
                )}
                style={{
                  minWidth: "min(22rem, calc(100vw - 4rem))",
                  maxWidth: 420,
                  borderColor: 'var(--hairline)',
                  background: 'var(--card-neutral)',
                  padding: '36px 32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}
              >
                {typeof item.rating === "number" ? (
                  <div className="flex items-center gap-1 text-sm">
                    {renderStars(item.rating)}
                  </div>
                ) : null}

                {item.description ? (
                  <p className="leading-relaxed" style={{ fontSize: '17px', color: 'var(--stone-text)', fontStyle: 'italic', flexGrow: 1 }}>
                    "{item.description}"
                  </p>
                ) : null}

                {item.name || item.role ? (
                  <div className="pt-2 border-t" style={{ borderColor: 'var(--hairline)' }}>
                    {item.name ? (
                      <p className="font-semibold" style={{ fontSize: '16px', color: 'var(--walnut)' }}>
                        {item.name}
                      </p>
                    ) : null}
                    {item.role ? (
                      <p className="mt-1" style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                        {item.role}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </article>
            );
          })}
        </motion.div>
      </div>

      {showGradientMask ? (
        <>
          <div 
            className="pointer-events-none absolute inset-y-0 left-0 w-32" 
            style={{ background: 'linear-gradient(to right, var(--page-cream) 0%, transparent 100%)' }}
          />
          <div 
            className="pointer-events-none absolute inset-y-0 right-0 w-32" 
            style={{ background: 'linear-gradient(to left, var(--page-cream) 0%, transparent 100%)' }}
          />
        </>
      ) : null}
    </div>
  );
}

export default InfiniteMovingCards;
