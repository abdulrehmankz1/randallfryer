"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";
import { cn } from "@/lib/cn";

/**
 * LegalPage — generic shell for Privacy / Terms style content.
 *
 *   title           Top headline
 *   updated         "Last updated: 2026-04-12"
 *   intro           One paragraph summary
 *   sections        [{ id, title, body: [string|JSX] }]
 */
export default function LegalPage({ eyebrow, number, title, updated, intro, sections }) {
  const activeId = useActiveSection(sections);

  return (
    <main className="relative flex flex-1 flex-col">
      <section className="relative isolate overflow-hidden pt-[88px]">
        <div className="container-padded relative pb-16 pt-12 sm:pt-20 lg:pt-24">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-baseline justify-between gap-y-3 text-ink/65"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              {eyebrow}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              {number}
            </span>
          </m.div>

          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
            className="hairline mt-6 h-px w-full origin-left"
          />

          <div className="mt-12 grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-8">
              <SplitReveal
                as="h1"
                className="display-serif block text-balance text-[clamp(1.95rem,4.6vw,4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
              >
                {title}
              </SplitReveal>
              {intro && (
                <m.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-8 max-w-2xl text-balance text-[1.05rem] leading-relaxed text-ink/80 sm:text-lg"
                >
                  {intro}
                </m.p>
              )}
            </div>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 lg:col-span-4"
            >
              <div className="rounded-card border border-ink/15 bg-bone-soft/50 p-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                  Last updated
                </span>
                <div className="display-serif mt-2 text-lg">{updated}</div>
                <p className="mt-3 text-[13px] leading-relaxed text-ink/70">
                  Material changes are emailed to subscribers and posted
                  here. Older versions are archived on request.
                </p>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      <SectionFrame label="02 In this document" number="Index / II" allowOverflow>
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <aside className="col-span-12 lg:sticky lg:top-32 lg:col-span-4 lg:self-start">
            <span className="eyebrow">Sections</span>
            <ol className="mt-5 flex flex-col border-l border-ink/10 text-[14px]">
              {sections.map((s, i) => {
                const isActive = activeId === s.id;
                return (
                  <li key={s.id} className="-ml-px">
                    <a
                      href={`#${s.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "group flex items-baseline gap-3 border-l-2 py-2 pl-4 transition-colors duration-300",
                        isActive
                          ? "border-signal text-ink"
                          : "border-transparent text-ink/55 hover:border-ink/40 hover:text-ink"
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[10px] uppercase tracking-[0.22em] transition-colors duration-300",
                          isActive
                            ? "text-signal"
                            : "text-ink-mute group-hover:text-ink/70"
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span>{s.title}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </aside>

          <div className="col-span-12 lg:col-span-8">
            <div className="flex flex-col gap-14">
              {sections.map((s, i) => (
                <LegalSection key={s.id} s={s} index={i} />
              ))}
            </div>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}

/**
 * Scroll-spy: returns the id of the section currently nearest the top of the
 * viewport. Uses a detection band (top 30%–45%) so the highlight advances as
 * each heading crosses it, rather than only when a section fully enters view.
 */
function useActiveSection(sections) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  return activeId;
}

function LegalSection({ s, index }) {
  return (
    <Reveal
      as="section"
      id={s.id}
      duration={0.8}
      delay={index * 0.04}
      className="scroll-mt-32"
    >
      <div className="flex items-baseline gap-4 border-t border-ink/15 pt-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
          0{index + 1}
        </span>
        <h2 className="display-serif text-[clamp(1.5rem,2.5vw,2.25rem)] font-medium leading-tight">
          {s.title}
        </h2>
      </div>
      <div className="mt-5 flex max-w-2xl flex-col gap-4 text-[1rem] leading-relaxed text-ink/80">
        {s.body.map((p, i) =>
          typeof p === "string" ? <p key={i}>{p}</p> : <div key={i}>{p}</div>
        )}
      </div>
    </Reveal>
  );
}
