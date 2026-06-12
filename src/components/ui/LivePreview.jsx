"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * LivePreview
 * Renders a fixed-resolution HTML artboard inside a responsive box by
 * iframing the source file and applying a CSS transform scale derived
 * from the container's measured width.
 *
 *   file          Public URL of the HTML artboard
 *   width/height  Native pixel dimensions of the artboard (e.g. 1080×1080)
 *   interactive   When false (default), pointer events on the iframe are
 *                 disabled so the parent <Link> remains clickable.
 *   className     Optional class on the outer wrapper
 */
export default function LivePreview({
  file,
  width,
  height,
  interactive = false,
  className,
  title = "Live preview",
}) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        if (w > 0) setScale(w / width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div
      ref={boxRef}
      className={cn(
        "relative overflow-hidden",
        // Force a paint-only stacking context so the scaled iframe never bleeds
        "isolate",
        className
      )}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <iframe
        src={file}
        title={title}
        loading="lazy"
        scrolling="no"
        tabIndex={interactive ? 0 : -1}
        aria-hidden={interactive ? undefined : "true"}
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-500",
          interactive ? "" : "pointer-events-none",
          loaded ? "opacity-100" : "opacity-0"
        )}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale || 0.0001})`,
        }}
      />
      {!loaded && (
        <div
          aria-hidden
          className="absolute inset-0 grid place-items-center"
        >
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-bone/70">
            <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
            Loading…
          </div>
        </div>
      )}
    </div>
  );
}
