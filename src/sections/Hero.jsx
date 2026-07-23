"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import { gsap, useGSAP, SplitText, ScrollTrigger } from "@/animations/gsap";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";
import Image from "next/image";
import { DONATE_URL } from "@/constants/site";

const HEADLINE_LINES = ["A Stronger Oregon.", "A Better Tomorrow."];

export default function Hero() {
  const container = useRef(null);
  const heroRef = useRef(null);



  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yPattern = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacityFade = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  useGSAP(
    () => {
      const tl = gsap.timeline({ delay: 0.4 });

      // Eyebrow + meta rows
      tl.from(".hero-eyebrow", {
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        ease: "expo.out",
      });

      // Headline split per line (animates after fonts ready)
      const animateHeadline = () => {
        const lines = gsap.utils.toArray(".hero-line");
        lines.forEach((el) => {
          const split = SplitText.create(el, {
            type: "words, chars",
            mask: "words",
            // Masks inherit this class as "hero-word-mask" — styled in
            // globals.css to keep descenders inside the clip box.
            wordsClass: "hero-word",
          });
          gsap.from(split.chars, {
            // 130 (not 110) so chars also clear the descender allowance
            // the mask rule adds below each clip box.
            yPercent: 130,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.018,
            delay: 0.6,
          });
        });
      };
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(animateHeadline);
      } else {
        animateHeadline();
      }

      tl.from(
        ".hero-sub",
        {
          opacity: 0,
          y: 24,
          duration: 1,
          ease: "expo.out",
        },
        "+=0.9"
      )
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 18,
            duration: 0.8,
            ease: "expo.out",
            stagger: 0.08,
          },
          "-=0.6"
        )
        .from(
          ".hero-meta",
          {
            opacity: 0,
            y: 12,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.06,
          },
          "-=0.5"
        )
        .from(
          ".hero-corner",
          {
            scaleX: 0,
            duration: 1,
            ease: "expo.out",
          },
          0.2
        )
        .from(
          ".hero-corner-v",
          {
            scaleY: 0,
            duration: 1,
            ease: "expo.out",
          },
          0.3
        );
    },
    { scope: container }
  );

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative isolate overflow-hidden pt-[88px]"
    >
      <div ref={container} className="container-padded relative pb-12 pt-12 sm:pb-16 sm:pt-20 lg:pt-28">
        {/* Decorative corner frame */}
        <div className="pointer-events-none absolute inset-0">
          <span className="hero-corner absolute left-0 right-0 top-0 h-px origin-left bg-ink/15" />
          <span className="hero-corner absolute bottom-0 left-0 right-0 h-px origin-right bg-ink/15" />
          <span className="hero-corner-v absolute left-0 top-0 bottom-0 w-px origin-top bg-ink/10" />
          <span className="hero-corner-v absolute right-0 top-0 bottom-0 w-px origin-bottom bg-ink/10" />
        </div>

        {/* Decorative background pattern */}
        <m.div
          aria-hidden
          style={{ y: yPattern, opacity: opacityFade }}
          className="pointer-events-none absolute inset-x-0 top-0 -z-10"
        >
          <PatternRings />
        </m.div>

        {/* Top meta row */}
        <div className="hero-eyebrow mb-12 flex flex-wrap items-baseline justify-between gap-y-3 text-ink/70 sm:mb-16">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em]">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
            Republican Nominee for Oregon House District 28
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
            General Election: November 3, 2026
          </span>
        </div>

        <div className="grid grid-cols-12 items-center gap-y-12 lg:gap-x-12">
          {/* LEFT: Headline + sub-copy + CTAs */}
          <div className="col-span-12 lg:col-span-7">
            <h1 className="display-serif text-[clamp(2.2rem,5.4vw,4.6rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink">
              {/* No overflow-hidden on the lines — SplitText's word masks handle
                  the reveal clipping; a hard clip on the line box cuts descenders. */}
              {HEADLINE_LINES.map((line, i) => (
                <span key={line} className="hero-line block">
                  <span
                    className={`inline-block ${
                      i === HEADLINE_LINES.length - 1
                        ? "text-signal"
                        : ""
                    }`}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-sub mt-8 max-w-xl text-balance text-lg leading-relaxed text-ink/80 sm:text-xl">
              Randall Fryer is running for the Oregon House to bring a
              disciplined, results-focused approach to Salem. He is running
              to restore educational excellence, reduce the tax and
              regulatory burden on working families and employers,
              strengthen public safety, and make the state government answer
              for the results it delivers.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <div className="hero-cta">
                <Button as={Link} href="/volunteer" variant="signal" withArrow>
                  Join Team Fryer
                </Button>
              </div>
              <div className="hero-cta">
                <Button
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  withArrow
                >
                  Donate
                </Button>
              </div>
              <Link
                href="/about"
                className="hero-cta link-underline ml-1 cursor-pointer font-mono text-[11px] uppercase tracking-[0.24em] text-ink/70 hover:text-ink"
              >
                Meet Randall →
              </Link>
            </div>
          </div>

          {/* RIGHT: Portrait */}
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
                delay: 0.4,
              }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-ink/15 bg-ink"
            >
              <Image
                src="/randall-fryer-about.jpg"
                alt="Randall Fryer, candidate for Oregon House District 28"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover object-[50%_16%]"
                style={{ filter: "contrast(1.02) saturate(1.02)" }}
              />
            </m.div>
          </m.div>
        </div>

        {/* Campaign snapshot — full-width row */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-ink/15 pt-8 sm:mt-12 sm:grid-cols-4">
          {[
            { value: 20, suffix: "+ Years", label: "Serving patients and communities" },
            { value: 3, suffix: " Core Reforms", label: "Education, taxes, and Oregon's business climate" },
            { value: 28, prefix: "District ", label: "One community to represent" },
            { value: 3, prefix: "November ", label: "General Election Day" },
          ].map((stat) => (
            <div key={stat.label} className="hero-meta">
              <span aria-hidden className="mb-3 block h-[2px] w-6 bg-ochre" />
              <div className="display-serif text-2xl font-medium tracking-tight sm:text-3xl">
                <Counter
                  value={stat.value}
                  prefix={stat.prefix || ""}
                  suffix={stat.suffix || ""}
                />
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Edge-to-edge marquee */}
      <Marquee />
    </section>
  );
}

function PatternRings() {
  return (
    <svg
      className="ml-auto h-[700px] w-[700px] max-w-full opacity-[0.18] sm:h-[820px] sm:w-[820px]"
      viewBox="0 0 800 800"
      fill="none"
    >
      <defs>
        <radialGradient id="rg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0d1528" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0d1528" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[...Array(14)].map((_, i) => (
        <circle
          key={i}
          cx="600"
          cy="200"
          r={60 + i * 32}
          stroke="url(#rg)"
          strokeWidth="0.8"
        />
      ))}
    </svg>
  );
}

function Marquee() {
  const words = [
    "Educational Excellence",
    "Lower Costs",
    "A Stronger Business Climate",
    "Safe Communities",
    "Local Control",
    "Accountable Government",
  ];
  // Duplicate for seamless loop
  const items = [...words, ...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-signal-deep bg-signal py-5">
      <m.div
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
        className="flex w-max items-center gap-12 whitespace-nowrap"
      >
        {items.map((w, i) => (
          <span
            key={i}
            className="display-serif text-3xl font-medium italic tracking-tight text-bone sm:text-4xl"
          >
            {w}
            <span className="ml-12 inline-block h-2 w-2 -translate-y-1.5 rounded-full bg-bone align-middle" />
          </span>
        ))}
      </m.div>
    </div>
  );
}
