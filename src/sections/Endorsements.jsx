"use client";

import { useRef } from "react";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";
import { useReveal } from "@/animations/useReveal";
import Button from "@/components/ui/Button";
import BrandIcon from "@/components/ui/BrandIcon";

const APPROACH = [
  {
    no: "01",
    icon: "scales",
    title: "A Physician's Discipline",
    body: "Randall earned his Doctor of Osteopathic Medicine degree and completed a Family Medicine residency before beginning a career that included primary care, immediate care, and emergency medicine. That experience taught him to assess evidence carefully, communicate clearly, and keep the person affected by the decision at the center of the process.",
  },
  {
    no: "02",
    icon: "community",
    title: "Service in Rural Emergency Medicine",
    body: "Randall worked in rural emergency departments serving communities across Oregon and the broader region. In those settings, resources were not unlimited, delays carried consequences, and every decision required judgment, preparation, and accountability.",
  },
  {
    no: "03",
    icon: "columns",
    title: "A Systems-Based Mindset",
    body: "Randall's earlier professional experience in software development taught him to understand how complicated systems work and why they fail. He will bring that same analytical mindset to budgets, agencies, regulations, and legislation in Salem.",
  },
];

export default function Endorsements() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="relative">
      <SectionFrame
        id="approach"
        label="03 The Approach"
        number="Evidence / III"
        tone="light"
      >
        <div className="flex flex-col gap-14">
          <div className="grid grid-cols-12 items-start gap-y-8 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-7">
              <SplitReveal
                as="h2"
                className="display-serif block text-balance text-[clamp(1.8rem,4.1vw,3.55rem)] font-medium leading-[1.02] tracking-[-0.025em]"
              >
                Decisions based on evidence, not slogans.
              </SplitReveal>
            </div>
            <Reveal
              y={20}
              duration={0.8}
              delay={0.2}
              className="col-span-12 lg:col-span-5 lg:pl-6"
            >
              <p className="max-w-md text-lg leading-relaxed text-ink/75">
                Randall&rsquo;s approach comes from decades spent solving
                difficult problems and accepting responsibility for the
                outcome.
              </p>
              <div className="mt-8">
                <Button as={Link} href="/about" variant="primary" withArrow>
                  Meet Randall
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Approach cards */}
          <m.div
            style={{ y }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7"
          >
            {APPROACH.map((a, i) => (
              <ApproachCard key={a.no} a={a} index={i} />
            ))}
          </m.div>
        </div>
      </SectionFrame>
    </div>
  );
}

function ApproachCard({ a, index }) {
  const ref = useRef(null);
  const inView = useReveal(ref);
  return (
    <m.article
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        delay: index * 0.1,
      }}
      whileHover={{ y: -6 }}
      className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-card border border-signal-deep bg-signal p-8 text-bone transition-colors duration-500 hover:border-bone/50 sm:p-9"
    >
      <div className="flex items-center justify-between">
        <span className="grid h-20 w-20 place-items-center rounded-full border border-bone/40 bg-bone/10 text-bone transition-colors duration-500 group-hover:border-bone/70 group-hover:bg-bone/15">
          <BrandIcon name={a.icon} className="h-11 w-11" bold />
        </span>
      </div>
      <h3 className="display-serif text-[clamp(1.35rem,2vw,1.75rem)] font-medium leading-tight tracking-[-0.01em] text-bone">
        {a.title}
      </h3>
      <p className="text-[15px] leading-relaxed text-bone/85">
        {a.body}
      </p>
    </m.article>
  );
}

