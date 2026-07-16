"use client";

import { useRef } from "react";
import Image from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import SplitReveal from "@/animations/SplitReveal";
import { cn } from "@/lib/cn";

/**
 * PageHero — consistent inner-page top.
 *
 *   number    "File №02 / About"
 *   eyebrow   "Meet the candidate"
 *   title     The big serif headline (string)
 *   intro     Sub copy (string)
 *   image     Optional cover image URL (Unsplash)
 *   imageAlt  Required if image is set
 */
export default function PageHero({
  number,
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  className,
  children,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={ref}
      className={cn(
        "relative isolate overflow-hidden pt-[88px]",
        className
      )}
    >
      <div className="container-padded relative pb-20 pt-12 sm:pb-28 sm:pt-20 lg:pt-24">
        {/* meta row */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="flex flex-wrap items-baseline justify-between gap-y-3 text-ink/65"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
            {eyebrow}
          </span>
          {number && (
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              {number}
            </span>
          )}
        </m.div>

        {/* hairline */}
        <m.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.35,
          }}
          className="hairline mt-6 h-px w-full origin-left"
        />

        <div className="mt-12 grid grid-cols-12 gap-y-12 lg:mt-16 lg:gap-x-10">
          <div className={cn("col-span-12", image ? "lg:col-span-7" : "lg:col-span-9")}>
            <SplitReveal
              as="h1"
              className="display-serif block text-balance text-[clamp(2.2rem,5.2vw,4.6rem)] font-medium leading-[1] tracking-[-0.025em] text-ink"
            >
              {title}
            </SplitReveal>
            {intro && (
              <m.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.8,
                }}
                className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-ink/80 sm:text-xl"
              >
                {intro}
              </m.p>
            )}
            {children}
          </div>

          {image && (
            <m.div
              style={{ y: yImage }}
              className="col-span-12 lg:col-span-5"
            >
              <m.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.5,
                }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-ink/15 bg-ink"
              >
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[50%_22%]"
                  style={{ filter: "contrast(1.02) saturate(1.02)" }}
                />
              </m.div>
            </m.div>
          )}
        </div>
      </div>
    </section>
  );
}
