"use client";

import { useRef } from "react";
import Link from "next/link";
import { m } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";
import { useReveal } from "@/animations/useReveal";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import Counter from "@/components/ui/Counter";

const PILLARS = [
  {
    no: "01",
    accent: "signal",
    title: "Stop overspending",
    intro:
      "Audit waste, freeze non-essential hiring, and refuse new taxes or fees until the budget balances without accounting tricks.",
    detail:
      "We will line-item audit every agency in the first six months. The audit will be public, and the findings will be tracked against the next four budget cycles.",
    bullets: [
      "Independent inspector general with subpoena power",
      "Public-facing spend dashboard, refreshed weekly",
      "Hard cap on year-over-year general-fund growth",
      "Quarterly veto of any non-essential earmark over $50k",
      "Sunset clauses on every spending program over five years",
    ],
  },
  {
    no: "02",
    accent: "ochre",
    title: "Cut the red tape",
    intro:
      "Faster permits, sensible zoning, and a 60-day shot-clock on every state license decision.",
    detail:
      "Small businesses and young families are drowning in approvals. We will gut duplicative permitting, restore by-right zoning for starter homes, and publish the exception log every Friday.",
    bullets: [
      "60-day statutory shot-clock with default approval",
      "Sunset review of every regulation older than 7 years",
      "By-right zoning for missing-middle housing",
      "One-stop online portal for state licenses",
      "Plain-English summaries on every new rule",
    ],
  },
  {
    no: "03",
    accent: "ink",
    title: "Public safety, restored",
    intro:
      "Fully fund and train local law enforcement, oppose unsupervised siting in residential neighborhoods, and prosecute repeat offenders.",
    detail:
      "Safety is the foundation of every other freedom. We will publish annual budgets for patrol, detective units, and victim services and tie them to clear neighborhood outcomes.",
    bullets: [
      "Fully funded patrol and detective units district-wide",
      "Mandatory community input on transitional siting",
      "Real consequences for repeat retail-theft offenders",
      "Victim-services line item published quarterly",
      "Mental-health co-response on every 911 dispatch",
    ],
  },
];

const STATS = [
  { num: 640, prefix: "$", suffix: "k", label: "Annual inspector general budget" },
  { num: 60, suffix: "", label: "Day shot-clock on every permit" },
  { num: 0, prefix: "$", suffix: "", label: "Corporate PAC dollars accepted" },
  { num: 100, suffix: "%", label: "Vote record published in plain English" },
];

export default function PlatformPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №10 Platform"
        number="Manifesto / X"
        title="Three commitments. Written down. Signed."
        intro="The platform is a contract. Every position below is a concrete legislative agenda we will pursue from day one and report on, in public, every ninety days."
      />

      {/* HEADLINE STATS */}
      <SectionFrame label="02 At a glance" number="Numbers / II">
        <div className="grid grid-cols-2 gap-y-10 sm:gap-x-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal
              key={s.label}
              duration={0.8}
              delay={i * 0.07}
              className="flex flex-col border-t border-ink/15 pt-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                0{i + 1}
              </span>
              <span className="display-serif mt-3 text-[clamp(1.95rem,4.2vw,3.2rem)] font-medium leading-none">
                <Counter
                  value={s.num}
                  prefix={s.prefix || ""}
                  suffix={s.suffix || ""}
                />
              </span>
              <span className="mt-3 text-[13px] leading-relaxed text-ink/75">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>
      </SectionFrame>

      {/* DETAILED PILLARS */}
      {PILLARS.map((p, i) => (
        <PillarSection key={p.no} p={p} index={i} />
      ))}

      {/* CTA */}
      <SectionFrame label="06 Read the receipts" number="Briefs / VI">
        <div className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Each pillar has a brief behind it.
            </SplitReveal>
            <Reveal
              as="p"
              duration={0.9}
              delay={0.2}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
            >
              The full math on the inspector general, the shot-clock,
              and the public-safety budget laid out issue by issue.
            </Reveal>
          </div>
          <div className="col-span-12 flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Button as={Link} href="/contact" variant="primary" withArrow>
              Ask a question
            </Button>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}

function PillarSection({ p, index }) {
  // Single, consistent accent for every pillar — the circle, the number,
  // and the bullet markers all read as one system.
  const accentBg = "bg-ink";
  const numRef = useRef(null);
  const numInView = useReveal(numRef);
  return (
    <SectionFrame
      label={`Pillar ${p.no}`}
      number={`Detail / ${["III", "IV", "V"][index]}`}
    >
      <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
        <div className="col-span-12 lg:col-span-5">
          {/* Block wrapper keeps the number circle on its own row, above
              the heading, on every pillar — SplitReveal renders the H2 as
              inline-block, so an inline circle would otherwise sit beside it. */}
          <div>
            <m.span
              ref={numRef}
              initial={{ scale: 0, opacity: 0 }}
              animate={numInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
              className={`inline-grid h-14 w-14 place-items-center rounded-full text-bone ${accentBg}`}
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.2em]">
                {p.no}
              </span>
            </m.span>
          </div>
          <SplitReveal
            as="h2"
            className="display-serif mt-6 block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
          >
            {p.title}.
          </SplitReveal>
          <Reveal
            as="p"
            duration={0.9}
            delay={0.2}
            className="mt-6 max-w-md text-lg leading-relaxed text-ink/80"
          >
            {p.intro}
          </Reveal>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <Reveal
            as="p"
            duration={0.9}
            className="max-w-2xl text-[1.05rem] leading-relaxed text-ink/80"
          >
            {p.detail}
          </Reveal>
          <ul className="mt-8 grid gap-3">
            {p.bullets.map((b, j) => (
              <PillarBullet key={b} bullet={b} index={j} accentBg={accentBg} />
            ))}
          </ul>
        </div>
      </div>
    </SectionFrame>
  );
}

function PillarBullet({ bullet, index, accentBg }) {
  const ref = useRef(null);
  const inView = useReveal(ref);
  return (
    <m.li
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        delay: 0.15 + index * 0.06,
      }}
      className="flex items-start gap-3 border-b border-ink/10 pb-3 text-[15px] text-ink/85 last:border-b-0"
    >
      <span className={`mt-2 block h-1.5 w-1.5 flex-shrink-0 rounded-full ${accentBg}`} />
      {bullet}
    </m.li>
  );
}
