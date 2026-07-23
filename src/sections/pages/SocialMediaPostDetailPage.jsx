"use client";

import { useState } from "react";
import Link from "next/link";
import { m } from "motion/react";
import LivePreview from "@/components/ui/LivePreview";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";
import { FORMATS, getRelatedSocialPosts, posterFor } from "@/data/socialPosts";
import { cn } from "@/lib/cn";

export default function SocialMediaPostDetailPage({ post }) {
  const fmt = FORMATS[post.format];
  const related = getRelatedSocialPosts(post.slug, 4);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}${post.file}`
          : post.file;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard not available; silently fail */
    }
  };

  return (
    <main className="relative flex flex-1 flex-col">
      {/* TOP META BAR — sits below the global navbar */}
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
                {fmt.label} · №{post.no}
              </span>
              <span className="hairline h-px w-6" />
              <span>{fmt.sub}</span>
            </span>
          </m.div>

          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
            }}
            className="hairline mt-6 h-px w-full origin-left"
          />

          <div className="mt-10 grid grid-cols-12 gap-y-6 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-8">
              <span className="eyebrow">{post.concept}</span>
              <SplitReveal
                as="h1"
                className="display-serif mt-4 block text-balance text-[clamp(1.85rem,4.4vw,3.65rem)] font-medium leading-[1.02] tracking-[-0.025em] text-ink"
              >
                {post.title}
              </SplitReveal>
            </div>
            <div className="col-span-12 flex flex-col gap-3 lg:col-span-4 lg:items-end lg:text-right">
              <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                <a
                  href={post.file}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-pill border border-ink/25 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink hover:border-ink hover:bg-ink hover:text-bone"
                >
                  Open standalone
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

      {/* LIVE STAGE */}
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
          <div className="mx-auto flex w-full justify-center">
            <m.div
              initial={{ opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className={cn(
                "relative w-full overflow-hidden rounded-card border border-bone/15 bg-ink shadow-[0_60px_120px_-30px_rgba(0,0,0,0.7)]",
                // Constrain the artboard so the story format never towers
                fmt.key === "story"
                  ? "max-w-[480px] sm:max-w-[420px] lg:max-w-[460px]"
                  : "max-w-[920px]"
              )}
            >
              <LivePreview
                file={post.file}
                width={fmt.width}
                height={fmt.height}
                interactive
                title={post.title}
              />
            </m.div>
          </div>

          {/* Spec strip */}
          <Reveal
            as="dl"
            y={16}
            duration={0.8}
            delay={0.2}
            className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-y-4 border-t border-bone/15 pt-8 font-mono text-[11px] uppercase tracking-[0.24em] text-bone/65 sm:grid-cols-4"
          >
            <Spec label="Format" value={fmt.label} />
            <Spec label="Aspect" value={fmt.sub} />
            <Spec label="File" value={`№${post.no}`} />
            <Spec label="Type" value="HTML / CSS" />
          </Reveal>
        </div>
      </section>

      {/* CONCEPT NOTE */}
      <SectionFrame label="03 Concept" number={`File №${post.no}`}>
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="display-serif text-balance text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              {post.concept}
              <span className="italic text-signal-deep">.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/75">
              Rendered live from a standalone HTML file no images, no
              screenshots, no build step. Every layer (paper grain, lighting,
              3D depth) is pure CSS so the creative scales cleanly at any
              resolution.
            </p>
          </div>
          <ul className="col-span-12 grid gap-6 lg:col-span-5">
            {[
              {
                t: "Native size",
                d: `${fmt.width} × ${fmt.height} px matches Instagram's ${fmt.label.toLowerCase()} spec.`,
              },
              {
                t: "Typography",
                d: "Plus Jakarta Sans headings + Figtree body + Switzer captions.",
              },
              {
                t: "Palette",
                d: "Off-white ground, midnight navy, campaign crimson, warm gold.",
              },
            ].map((item) => (
              <li
                key={item.t}
                className="border-t border-ink/15 pt-5"
              >
                <span className="eyebrow">{item.t}</span>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/80">
                  {item.d}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </SectionFrame>

      {/* RELATED */}
      <SectionFrame label="04 More creatives" number={`${related.length} next`}>
        <ul className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {related.map((p, i) => {
            const f = FORMATS[p.format];
            return (
              <Reveal as="li" key={p.slug} delay={i * 0.06}>
                <Link
                  href={`/social-media-posts/${p.slug}`}
                  className="group flex flex-col gap-3"
                >
                  <div className="relative overflow-hidden rounded-card border border-ink/15 bg-ink shadow-[0_30px_50px_-30px_rgba(10,19,38,0.4)]">
                    <LivePreview
                      file={p.file}
                      poster={posterFor(p.file)}
                      width={f.width}
                      height={f.height}
                      title={p.title}
                    />
                  </div>
                  <div className="flex items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
                    <span>
                      {f.label} · №{p.no}
                    </span>
                  </div>
                  <h3 className="display-serif text-base font-medium leading-tight tracking-tight transition-colors duration-300 group-hover:text-signal">
                    {p.title}
                  </h3>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </SectionFrame>
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
