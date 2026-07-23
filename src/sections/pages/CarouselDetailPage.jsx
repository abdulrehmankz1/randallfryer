"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { m } from "motion/react";
import LivePreview from "@/components/ui/LivePreview";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";
import { FORMATS, CAROUSELS, posterFor } from "@/data/socialPosts";
import { cn } from "@/lib/cn";

export default function CarouselDetailPage({ carousel }) {
  const fmt = FORMATS.carousel;
  const slides = carousel.slides;
  const total = slides.length;

  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const go = useCallback(
    (n) => setIndex((i) => (i + n + total) % total),
    [total]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const current = slides[index];

  const onCopy = async () => {
    try {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}${current}`
          : current;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard not available; silently fail */
    }
  };

  const others = CAROUSELS.filter((c) => c.slug !== carousel.slug).slice(0, 4);

  return (
    <main className="relative flex flex-1 flex-col">
      {/* TOP META BAR */}
      <section className="relative pt-[88px]">
        <div className="container-padded pb-6 pt-10 sm:pt-14">
          <m.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-between gap-y-4 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-mute"
          >
            <Link
              href="/social-media-posts"
              className="link-underline inline-flex items-center gap-3 text-ink/80 hover:text-ink"
            >
              <span aria-hidden>←</span>
              All social media posts
            </Link>
            <span className="flex flex-wrap items-center gap-4">
              <span>
                {fmt.label} · {total} slides
              </span>
              <span className="hairline h-px w-6" />
              <span>{fmt.sub}</span>
            </span>
          </m.div>

          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="hairline mt-6 h-px w-full origin-left"
          />

          <div className="mt-10 grid grid-cols-12 gap-y-6 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-8">
              <span className="eyebrow">{carousel.concept}</span>
              <SplitReveal
                as="h1"
                className="display-serif mt-4 block text-balance text-[clamp(1.85rem,4.4vw,3.65rem)] font-medium leading-[1.02] tracking-[-0.025em] text-ink"
              >
                {carousel.title}
              </SplitReveal>
            </div>
            <div className="col-span-12 flex flex-col gap-3 lg:col-span-4 lg:items-end lg:text-right">
              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                <a
                  href={current}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-pill border border-ink/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink hover:border-ink hover:bg-ink hover:text-bone"
                >
                  Open slide
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M1.5 12.5L12.5 1.5M12.5 1.5H4.5M12.5 1.5V9.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={onCopy}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-pill px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] transition-colors",
                    copied
                      ? "bg-signal text-bone"
                      : "bg-ink text-bone hover:bg-ink-soft"
                  )}
                >
                  {copied ? "Copied" : "Copy link"}
                  <span
                    aria-hidden
                    className={cn(
                      "block h-1.5 w-1.5 rounded-full",
                      copied ? "bg-bone" : "bg-signal"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE STAGE — slide viewer */}
      <section
        className={cn(
          "relative isolate overflow-hidden",
          "bg-[radial-gradient(120%_80%_at_50%_0%,#1a2440_0%,#0a1326_60%,#050912_100%)]",
          "py-16 sm:py-24"
        )}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute inset-0 [background-image:radial-gradient(rgba(243,237,224,0.08)_1px,transparent_1px)] [background-size:24px_24px]" />
        </div>

        <div className="container-padded">
          <div className="mx-auto flex w-full max-w-[520px] flex-col items-center">
            <div className="relative w-full">
              <m.div
                key={index}
                initial={{ opacity: 0, y: 16, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full overflow-hidden rounded-card border border-bone/15 bg-ink shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)]"
              >
                <LivePreview
                  file={current}
                  width={fmt.width}
                  height={fmt.height}
                  interactive
                  title={`${carousel.title} slide ${index + 1}`}
                />
              </m.div>

              {/* Prev / Next */}
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous slide"
                className="absolute -left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-bone/25 bg-ink/80 text-bone backdrop-blur transition-colors hover:border-bone/60 hover:bg-ink sm:-left-6"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next slide"
                className="absolute -right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-bone/25 bg-ink/80 text-bone backdrop-blur transition-colors hover:border-bone/60 hover:bg-ink sm:-right-6"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M5 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
                </svg>
              </button>
            </div>

            {/* Counter + dots */}
            <div className="mt-7 flex w-full items-center justify-between font-mono text-[11px] uppercase tracking-[0.28em] text-bone/60">
              <span>
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="flex items-center gap-2">
                {slides.map((s, i) => (
                  <button
                    key={s}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors",
                      i === index ? "bg-signal" : "bg-bone/25 hover:bg-bone/50"
                    )}
                  />
                ))}
              </span>
            </div>
          </div>

          {/* Thumbnail filmstrip */}
          <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {slides.map((s, i) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={cn(
                    "relative block w-[72px] overflow-hidden rounded-lg border transition-all duration-300",
                    i === index
                      ? "border-signal ring-1 ring-signal"
                      : "border-bone/15 opacity-60 hover:opacity-100"
                  )}
                >
                  <LivePreview file={s} poster={posterFor(s)} width={fmt.width} height={fmt.height} title={`Slide ${i + 1}`} />
                  <span className="absolute bottom-1 right-1 rounded bg-ink/70 px-1 font-mono text-[8px] text-bone/80">
                    {i + 1}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* Spec strip */}
          <Reveal
            as="dl"
            y={16}
            duration={0.8}
            delay={0.2}
            className="mx-auto mt-12 grid max-w-3xl grid-cols-2 gap-y-4 border-t border-bone/15 pt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-bone/65 sm:grid-cols-4"
          >
            <Spec label="Format" value={fmt.label} />
            <Spec label="Aspect" value={fmt.sub} />
            <Spec label="Slides" value={String(total)} />
            <Spec label="Type" value="HTML / CSS" />
          </Reveal>
        </div>
      </section>

      {/* CONCEPT NOTE */}
      <SectionFrame label="03 Concept" number={`Set №${carousel.no}`}>
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="display-serif text-balance text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              {carousel.title}
              <span className="italic text-signal-deep">.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/75">
              A {total}-slide sequence built to swipe a cover, a run of point
              slides, and a closing call to action. Every slide is a standalone
              HTML file, rendered live, with no images or build step.
            </p>
          </div>
          <ul className="col-span-12 grid gap-6 lg:col-span-5">
            {[
              {
                t: "Swipeable set",
                d: `${total} artboards at ${fmt.width} × ${fmt.height} px Instagram's 4:5 carousel spec.`,
              },
              {
                t: "One system",
                d: "Shared palette, typography, and 3D treatments hold the set together slide to slide.",
              },
              {
                t: "Live preview",
                d: "Use the arrows, dots, or thumbnails to move through every slide at native resolution.",
              },
            ].map((item) => (
              <li key={item.t} className="border-t border-ink/15 pt-5">
                <span className="eyebrow">{item.t}</span>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/80">
                  {item.d}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </SectionFrame>

      {/* MORE CAROUSELS */}
      {others.length > 0 && (
        <SectionFrame label="04 More carousels" number={`${others.length} sets`}>
          <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {others.map((c, i) => (
              <Reveal as="li" key={c.slug} delay={i * 0.06}>
                <Link href={`/social-media-posts/${c.slug}`} className="group flex flex-col gap-3">
                  <div className="relative overflow-hidden rounded-card border border-ink/15 bg-ink shadow-[0_30px_50px_-30px_rgba(10,19,38,0.4)]">
                    <LivePreview file={c.cover} poster={posterFor(c.cover)} width={fmt.width} height={fmt.height} title={c.title} />
                    <span className="absolute right-3 top-3 z-10 rounded-pill border border-bone/30 bg-bone/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/95 backdrop-blur">
                      {c.count} slides
                    </span>
                  </div>
                  <h3 className="display-serif text-base font-medium leading-tight tracking-tight transition-colors duration-300 group-hover:text-signal">
                    {c.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </ul>
        </SectionFrame>
      )}
    </main>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <dt className="text-bone/45">{label}</dt>
      <dd className="mt-1 text-bone">{value}</dd>
    </div>
  );
}
