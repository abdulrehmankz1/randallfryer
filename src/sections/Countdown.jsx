"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Button from "@/components/ui/Button";

export default function Countdown() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const yBackdrop = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <div ref={sectionRef} className="relative">
      <SectionFrame
        id="events"
        label="04 — On the ballot"
        number="Election / IV"
        tone="dark"
        backdrop={
          <>
            <m.div style={{ y: yBackdrop }} className="absolute inset-0">
              <Image
                src="/randall-fryer-ballot-bg.png"
                alt=""
                fill
                priority={false}
                aria-hidden
                className="object-cover object-right"
                sizes="100vw"
              />
            </m.div>
            {/* Darken for legibility — heaviest on the left where the copy sits */}
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/35"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/35"
            />
          </>
        }
      >
        <div className="max-w-3xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone/60">
            Tuesday · November 3, 2026 · General Election
          </span>
          <SplitReveal
            as="h2"
            className="display-serif mt-5 block text-balance text-[clamp(2rem,4.8vw,4.4rem)] font-medium leading-[0.98] tracking-[-0.03em] text-bone"
          >
            Oregon&rsquo;s direction is on the ballot.
          </SplitReveal>
          <m.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-bone/75"
          >
            This election is an opportunity to choose stronger schools,
            lower pressure on working families, a healthier business
            climate, safer communities, and government that answers for
            its performance.
          </m.p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button as={Link} href="/contact" variant="signal" withArrow>
              Get election updates
            </Button>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
