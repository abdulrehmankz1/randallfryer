"use client";

import { useRef, useState } from "react";
import { m, AnimatePresence } from "motion/react";
import { gsap, useGSAP, ScrollTrigger } from "@/animations/gsap";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";

const PILLARS = [
  {
    id: "education",
    no: "01",
    title: "Restore Educational Excellence",
    body: "Oregon's students need classrooms centered on learning. Randall will work to restore meaningful academic and graduation standards; refocus instruction on reading, writing, mathematics, history, and civics; and direct more education resources toward teachers and classrooms. He supports strong local school boards, meaningful parental involvement, orderly classrooms, and giving professional teachers the authority and support they need to teach effectively.",
    accent: "signal",
  },
  {
    id: "families",
    no: "02",
    title: "Lower the Burden on Working Families",
    body: "Oregonians are willing to support essential public services, but they deserve value, transparency, and restraint in return. Randall will oppose unnecessary taxes and fees, scrutinize spending before asking families to pay more, and demand clear evidence that public programs are producing measurable benefits. His goal is straightforward: lower the pressure on household budgets while protecting the services communities depend on.",
    accent: "ochre",
  },
  {
    id: "business",
    no: "03",
    title: "Rebuild Oregon's Business Climate",
    body: "Oregon should be a place where businesses can start, invest, hire, and grow. Randall will pursue lower and more competitive tax rates, simpler tax compliance, faster and more predictable permitting, and fewer unnecessary regulatory barriers. A healthy business climate supports workers, strengthens property values, expands the tax base, and helps communities fund schools, public safety, and essential services without continually raising costs on families.",
    accent: "ink",
  },
];

export default function Platform() {
  const wrap = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
      // Vertical timeline draws as you scroll
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );

      // Nodes pop in
      gsap.utils.toArray(".pillar-node").forEach((node) => {
        gsap.from(node, {
          scale: 0,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger: {
            trigger: node,
            start: "top 80%",
          },
        });
      });
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap}>
      <SectionFrame
        id="platform"
        label="02 Three Commitments"
        number="Priorities / II"
      >
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Three commitments. Clear goals. Measurable results.
            </SplitReveal>
            <Reveal
              duration={0.9}
              delay={0.2}
              className="mt-8 max-w-md text-lg leading-relaxed text-ink/75"
            >
              Randall&rsquo;s agenda begins with three immediate priorities
              designed to strengthen opportunity, lower pressure on working
              families, and demand better results from state government.
            </Reveal>
          </div>

          {/* Timeline column */}
          <div className="relative col-span-12 mt-4 lg:col-span-7 lg:mt-2">
            {/* Vertical line */}
            <span
              ref={lineRef}
              aria-hidden
              className="absolute left-[14px] top-5 bottom-3 w-px origin-top bg-ink/30 sm:left-[19px]"
            />

            <div className="flex flex-col gap-14 sm:gap-16">
              {PILLARS.map((p, i) => (
                <PillarCard key={p.id} p={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}

function PillarCard({ p, index }) {
  const [open, setOpen] = useState(false);
  const accentBg =
    p.accent === "signal"
      ? "bg-signal"
      : p.accent === "ochre"
      ? "bg-ochre"
      : "bg-ink";

  return (
    <Reveal
      as="article"
      y={40}
      duration={0.9}
      delay={index * 0.08}
      className="relative pl-12 sm:pl-16"
    >
      {/* Timeline node */}
      <span
        aria-hidden
        className={`pillar-node absolute left-0 top-2 grid h-[30px] w-[30px] place-items-center rounded-full ${accentBg} text-bone shadow-[0_0_0_4px_var(--color-bone)] sm:h-[40px] sm:w-[40px]`}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] sm:text-[10px]">
          {p.no}
        </span>
      </span>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group block w-full text-left"
      >
        <div className="flex items-baseline justify-between gap-6">
          <h3 className="display-serif text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium leading-tight tracking-[-0.02em] transition-colors duration-300 group-hover:text-signal">
            {p.title}
          </h3>
          <m.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-ink/30 text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bone"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          </m.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-2 pt-6">
              <p className="max-w-2xl text-[1.05rem] leading-relaxed text-ink/80">
                {p.body}
              </p>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      {/* Hairline below */}
      <span className="mt-8 block h-px w-full bg-ink/10" />
    </Reveal>
  );
}
