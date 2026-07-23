"use client";

import { useRef } from "react";
import { m } from "motion/react";
import { useReveal } from "./useReveal";

/**
 * Reveal — fade/slide content in on scroll, using the iOS-safe `useReveal`
 * trigger instead of motion's IntersectionObserver-based `whileInView` (which
 * can leave content stuck invisible on mobile Safari after a fast flick).
 *
 * Drop-in for a `m.<tag>` with `initial`/`whileInView`. Pass `as` to pick the
 * element (e.g. "li", "dl"), plus the usual `y`, `duration`, `delay`.
 */
export default function Reveal({
  as = "div",
  children,
  className,
  y = 24,
  duration = 0.7,
  delay = 0,
  ...rest
}) {
  const ref = useRef(null);
  const inView = useReveal(ref);
  const Tag = m[as] || m.div;
  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
