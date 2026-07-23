"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { m } from "motion/react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import LivePreview from "@/components/ui/LivePreview";
import SectionFrame from "@/animations/SectionFrame";
import {
  SOCIAL_POSTS,
  CAROUSELS,
  GALLERY_ITEMS,
  FORMATS,
  posterFor,
} from "@/data/socialPosts";
import { cn } from "@/lib/cn";

const FEED_COUNT = SOCIAL_POSTS.filter((p) => p.format === "feed").length;
const STORY_COUNT = SOCIAL_POSTS.filter((p) => p.format === "story").length;
const CAROUSEL_COUNT = CAROUSELS.length;

const FILTERS = [
  { key: "all", label: "All", sub: `${GALLERY_ITEMS.length} designs` },
  { key: "feed", label: "Feed", sub: "1080 × 1080" },
  { key: "story", label: "Story", sub: "1080 × 1920" },
  { key: "carousel", label: "Carousel", sub: "1080 × 1350" },
];

const PAGE_SIZE = 24;

export default function SocialMediaPostsPage() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE_SIZE);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GALLERY_ITEMS.filter((p) => {
      if (filter !== "all" && p.format !== filter) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.concept.toLowerCase().includes(q) ||
        p.format.toLowerCase().includes(q)
      );
    });
  }, [filter, query]);

  // Only mount a screenful of cards at a time. A grid of ~100 live artboard
  // tiles pushes past what some browsers will composite in one pass (previews
  // silently fail to paint), so we page them in on demand instead.
  useEffect(() => {
    setShown(PAGE_SIZE);
  }, [filter, query]);

  const shownItems = visible.slice(0, shown);
  const remaining = visible.length - shownItems.length;

  const feedCount = FEED_COUNT;
  const storyCount = STORY_COUNT;

  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №09 — Press Kit"
        number="Creatives / IX"
        title="Social media posts."
        intro="The full visual campaign — editorial creatives across Instagram feed, stories, and multi-slide carousels. Every artboard renders live, exactly as designed."
      >
        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 font-mono text-[11px] uppercase tracking-[0.28em] text-ink-mute">
          <span className="flex items-baseline gap-2">
            <span className="display-serif text-2xl font-medium tracking-tight text-ink">
              {feedCount}
            </span>
            Feed posts
          </span>
          <span className="hairline h-px w-8" />
          <span className="flex items-baseline gap-2">
            <span className="display-serif text-2xl font-medium tracking-tight text-ink">
              {storyCount}
            </span>
            Story creatives
          </span>
          <span className="hairline h-px w-8" />
          <span className="flex items-baseline gap-2">
            <span className="display-serif text-2xl font-medium tracking-tight text-ink">
              {CAROUSEL_COUNT}
            </span>
            Carousels
          </span>
          <span className="hairline h-px w-8" />
          <span className="flex items-baseline gap-2">
            <span className="display-serif text-2xl font-medium tracking-tight text-signal">
              0
            </span>
            Stock photos used
          </span>
        </div>
      </PageHero>

      {/* CONTROLS */}
      <SectionFrame
        id="gallery"
        label="02 — Gallery"
        number={`${visible.length} of ${GALLERY_ITEMS.length}`}
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Filter chips */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTERS.map((f) => {
              const active = filter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "group inline-flex items-center gap-3 rounded-pill border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.24em] transition-colors duration-300",
                    active
                      ? "border-ink bg-ink text-bone"
                      : "border-ink/25 text-ink/80 hover:border-ink hover:text-ink"
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "block h-1.5 w-1.5 rounded-full transition-colors",
                      active ? "bg-signal" : "bg-ink/35 group-hover:bg-signal"
                    )}
                  />
                  {f.label}
                  <span
                    className={cn(
                      "text-[10px] tracking-[0.2em] transition-colors",
                      active ? "text-bone/70" : "text-ink-mute"
                    )}
                  >
                    {f.sub}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <label className="relative flex w-full items-center gap-3 border-b border-ink/25 pb-2 lg:max-w-xs">
            <svg
              aria-hidden
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              className="text-ink-mute"
            >
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M11 11l3 3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="square"
              />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search creatives…"
              className="w-full bg-transparent font-mono text-[12px] uppercase tracking-[0.18em] text-ink focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute hover:text-ink"
              >
                Clear
              </button>
            )}
          </label>
        </div>

        {/* GRID */}
        <ul
          className={cn(
            "mt-12 grid grid-cols-1 gap-x-6 gap-y-12",
            "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {/* No layout/AnimatePresence here: with up to 100 cards, a shared
              layout animation forces per-frame relayout of every tile and piles
              up compositor layers. A simple in-view fade keeps it light and lets
              offscreen cards stay idle. */}
          {shownItems.map((post, i) => (
            <m.li
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15, margin: "0px 0px -10% 0px" }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 4) * 0.04,
              }}
            >
              <PostCard post={post} />
            </m.li>
          ))}
        </ul>

        {remaining > 0 && (
          <div className="mt-14 flex flex-col items-center gap-3">
            <Button
              as="button"
              type="button"
              onClick={() => setShown((s) => s + PAGE_SIZE)}
              variant="outline-inverse"
              size="sm"
            >
              <span className="inline-flex items-center gap-3">
                Show more creatives
                <span className="text-bone/70 transition-colors group-hover:text-ink-mute">
                  {remaining} left
                </span>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M7 1v12M1 7h12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
            </Button>
            <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
              Showing {shownItems.length} of {visible.length}
            </span>
          </div>
        )}

        {visible.length === 0 && (
          <div className="mt-12 border border-dashed border-ink/20 px-8 py-16 text-center">
            <p className="display-serif text-2xl italic text-ink">
              No creatives match that search.
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
              Try “portrait”, “seal”, “quote”, or clear the filter.
            </p>
          </div>
        )}
      </SectionFrame>

      {/* Usage block */}
      <SectionFrame label="03 — Usage" number="Press notes / III">
        <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <h2 className="display-serif text-balance text-[clamp(1.75rem,4vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              For press, partners, and{" "}
              <span className="italic text-signal-deep">supporters.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/75">
              Every creative renders live in the browser — open one to inspect
              the file in full, or use the share link in any post to embed it
              directly on a partner site.
            </p>
          </div>
          <ul className="col-span-12 grid gap-6 lg:col-span-5">
            {[
              {
                t: "Source files",
                d: "Each artboard is a standalone HTML file — no build step required.",
              },
              {
                t: "Live preview",
                d: "Click any tile to open the full creative at its native resolution.",
              },
              {
                t: "Brand consistent",
                d: "Palette, typography, and 3D treatments match the rest of CapitalWatch.",
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
    </main>
  );
}

function PostCard({ post }) {
  const fmt = FORMATS[post.format];
  const isCarousel = post.format === "carousel";

  return (
    <Link
      href={`/social-media-posts/${post.slug}`}
      className="group flex flex-col gap-4"
    >
      {/* Live preview frame — carousels get a stacked-card edge */}
      <div className="relative">
        {isCarousel && (
          <>
            <span
              aria-hidden
              className="absolute -right-2 top-2 bottom-2 left-2 -z-10 rounded-card border border-ink/15 bg-ink/70"
            />
            <span
              aria-hidden
              className="absolute -right-1 top-1 bottom-1 left-1 -z-10 rounded-card border border-ink/15 bg-ink/85"
            />
          </>
        )}
        <div className="relative overflow-hidden rounded-card border border-ink/15 bg-ink shadow-[0_30px_60px_-30px_rgba(10,19,38,0.4)] transition-shadow duration-500 group-hover:shadow-[0_40px_80px_-30px_rgba(10,19,38,0.55)]">
          <LivePreview
            file={post.file}
            poster={posterFor(post.file)}
            width={fmt.width}
            height={fmt.height}
            title={`${post.title} — preview`}
          />

          {/* Format chip */}
          <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-2 rounded-pill border border-bone/30 bg-bone/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/95 backdrop-blur">
            <span className="block h-1.5 w-1.5 rounded-full bg-signal" />
            {fmt.label}
          </span>

          {/* Number plate — or slide count for carousels */}
          <span className="absolute right-3 top-3 z-10 rounded-pill border border-bone/30 bg-bone/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.26em] text-bone/95 backdrop-blur">
            {isCarousel ? `${post.count} slides` : `№${post.no}`}
          </span>

        {/* Hover overlay with View action */}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/70 via-ink/0 to-ink/0 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/90">
            {fmt.sub}
          </span>
          <span className="inline-flex items-center gap-2 rounded-pill border border-bone/60 bg-bone/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.26em] text-bone backdrop-blur">
            Open
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none">
              <path
                d="M1.5 12.5L12.5 1.5M12.5 1.5H4.5M12.5 1.5V9.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </span>
        </div>
        </div>
      </div>
    </Link>
  );
}
