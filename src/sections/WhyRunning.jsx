"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";
import Button from "@/components/ui/Button";

export default function WhyRunning() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <div ref={ref} className="relative">
      <SectionFrame
        id="meet"
        label="01 Meet Randall"
        number="The Candidate / I"
      >
        <div className="grid grid-cols-12 gap-y-14 lg:gap-x-12">
          {/* Portrait card */}
          <m.div
            style={{ y: yPortrait }}
            className="col-span-12 md:col-span-5 lg:col-span-5"
          >
            <PortraitCard />
          </m.div>

          {/* Editorial copy */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:pl-6">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.85rem,4.4vw,3.7rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              A physician&rsquo;s discipline. A problem-solver&rsquo;s mindset. A commitment to service.
            </SplitReveal>

            <m.div
              style={{ y }}
              className="mt-10 grid gap-7 text-lg leading-relaxed text-ink/85 sm:text-[1.075rem]"
            >
              <Reveal as="p" y={30} duration={0.9}>
                Randall Fryer has spent his professional life working in
                environments where outcomes matter. As a physician, he
                learned to listen carefully, identify the real problem, and
                make difficult decisions based on evidence. His work in
                family medicine and rural emergency departments reinforced a
                simple principle: people deserve systems that perform when
                they need them.
              </Reveal>
              <Reveal as="p" y={30} duration={0.9} delay={0.12}>
                Randall believes Oregon&rsquo;s government should meet the
                same standard. Schools should prepare students to read,
                write, reason, and participate in civic life. Taxes should
                fund services that produce visible value. Regulations should
                protect the public without preventing employers from
                investing, expanding, and creating jobs.
              </Reveal>
              <Reveal as="p" y={30} duration={0.9} delay={0.24}>
                Randall is running to bring discipline, accountability, and
                practical problem-solving back to Salem.
              </Reveal>
            </m.div>

            <Reveal
              duration={0.8}
              delay={0.3}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Button as={Link} href="/about" variant="primary" withArrow>
                Read Randall&rsquo;s Story
              </Button>
            </Reveal>

            {/* Signature */}
            <Reveal
              y={0}
              duration={1.2}
              delay={0.5}
              className="mt-14 flex items-center gap-5"
            >
              <div className="leading-tight">
                <div className="display-serif text-lg italic">Randall Fryer</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                  Candidate · Oregon House · District 28
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}

function PortraitCard() {
  return (
    <div className="relative">
      <Reveal
        y={30}
        duration={1.1}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-card border border-ink/15 bg-ink"
      >
        {/* Portrait photo */}
        <Image
          src="/randall-fryer-portrait.jpg"
          alt="Randall Fryer portrait"
          width={1326}
          height={1988}
          priority
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover object-[50%_18%]"
          style={{ filter: "contrast(1.02) saturate(1.02)" }}
        />
        {/* Legibility gradient for the overlaid captions */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/35"
        />

        {/* Bottom caption */}
        <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-bone">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/65">
              Oregon House · District 28
            </div>
            <div className="display-serif mt-1 text-3xl font-medium">
              Randall Fryer
            </div>
          </div>
          <div className="text-right">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-bone/65">
              General
            </div>
            <div className="display-serif text-2xl font-medium">11/3/26</div>
          </div>
        </div>

        {/* Signal corner accent */}
        <div className="absolute right-5 top-5 flex items-center gap-2 rounded-pill border border-bone/30 bg-bone/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-bone/85 backdrop-blur">
          <span className="block h-1.5 w-1.5 rounded-full bg-ochre" />
          On the Ballot
        </div>
      </Reveal>
    </div>
  );
}

