"use client";

import { useEffect, useState } from "react";

/**
 * Reliable scroll-reveal trigger — a drop-in replacement for motion's
 * `useInView({ once: true })` that does NOT get stuck on iOS Safari.
 *
 * Why not `useInView` / `whileInView`? Those are built on IntersectionObserver,
 * whose callbacks iOS Safari drops during momentum (inertial) scrolling. When a
 * section is flicked past quickly, the observer only fires once scrolling
 * settles — by then the element is already above the viewport, so it reports
 * `isIntersecting: false` and, with `once`, the element stays at its initial
 * `opacity: 0` forever (invisible content on mobile).
 *
 * This hook uses scroll/resize listeners and, crucially, reveals any element
 * that has been scrolled PAST (top above the viewport). So even if every event
 * during a fast flick is dropped, the settle event still reveals the content.
 *
 * Returns a boolean; drive `animate={inView ? {...} : {}}` with it exactly like
 * a `whileInView` target.
 */
export function useReveal(ref, { once = true, threshold = 0.12 } = {}) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let revealed = false;
    const detach = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      setInView(true);
      if (once) detach();
    };
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Reveal when the element has entered the lower edge of the viewport,
      // or the instant it has been scrolled past the top (fast-flick safety).
      const entered = r.top <= vh * (1 - threshold) && r.bottom >= 0;
      if (entered || r.top < 0) reveal();
    };
    const onScroll = () => check();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    check(); // initial: covers content already in view on load

    return detach;
  }, [ref, once, threshold]);

  return inView;
}
