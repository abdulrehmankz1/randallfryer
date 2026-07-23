"use client";

import { useRef } from "react";
import { m } from "motion/react";
import { cn } from "@/lib/cn";
import { useReveal } from "./useReveal";

/**
 * SectionFrame — shared shell for every section.
 *
 * Build order on enter:
 *   1. top hairline draws left → right
 *   2. eyebrow label + number fade up
 *   3. children fade in
 *   4. bottom hairline draws
 *
 * `tone="light"` (default) renders on bone with ink lines.
 * `tone="dark"` renders on ink with bone lines.
 * `tone="signal"` renders on campaign crimson with bone lines.
 */
export default function SectionFrame({
  id,
  label,
  number,
  children,
  className,
  innerClassName,
  withBottomLine = false,
  tone = "light",
  backdrop = null,
  allowOverflow = false,
}) {
  const ref = useRef(null);
  const inView = useReveal(ref, { once: true });

  const isDark = tone === "dark" || tone === "signal";
  const surface =
    tone === "dark"
      ? "bg-ink text-bone"
      : tone === "signal"
      ? "bg-signal text-bone"
      : "";
  const lineClass = isDark ? "bg-bone/20" : "hairline";
  const labelClass = isDark ? "text-bone/55" : "text-ink-mute";
  // Brand accent dot next to the section label
  const dotClass = tone === "light" ? "bg-signal" : "bg-ochre";

  return (
    <section
      ref={ref}
      id={id}
      className={cn(
        "relative",
        allowOverflow ? "overflow-visible" : "overflow-hidden",
        surface,
        className
      )}
    >
      {backdrop && (
        <div className="pointer-events-none absolute inset-0 z-0">{backdrop}</div>
      )}
      <div className="container-padded relative z-10">
        <div className="relative pt-10 sm:pt-14">
          <m.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className={cn("h-px w-full origin-left build-line", lineClass)}
          />

          {(label || number) && (
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.55,
              }}
              className={cn("mt-4 flex items-center justify-between", labelClass)}
            >
              <span
                className={cn(
                  "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em]"
                )}
              >
                <span
                  aria-hidden
                  className={cn("h-1.5 w-1.5 rounded-full", dotClass)}
                />
                {label}
              </span>
              {number && (
                <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
                  {number}
                </span>
              )}
            </m.div>
          )}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.75 }}
          className={cn(
            "pt-10 sm:pt-14",
            // When there is no bottom rule, keep the vertical rhythm the rule's
            // margin used to provide so sections don't collapse together.
            !withBottomLine && "pb-20 sm:pb-28",
            innerClassName
          )}
        >
          {children}
        </m.div>

        {withBottomLine && (
          <m.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
            }}
            className={cn(
              "mt-20 h-px w-full origin-left build-line sm:mt-28",
              lineClass
            )}
          />
        )}
      </div>
    </section>
  );
}
