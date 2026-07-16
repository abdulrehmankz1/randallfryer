"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import { gsap, useGSAP } from "@/animations/gsap";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

const BIO_BLOCKS = [
  {
    eyebrow: "A problem-solver",
    heading: "A problem-solver before entering politics.",
    body: "Before building his career in medicine, Randall worked in software development and served in the Army Medical Corps. Those experiences taught him to understand complicated systems, identify where they break down, and focus on solutions that work in the real world. Randall later pursued medicine, earning his Doctor of Osteopathic Medicine degree in 1997. He completed an internship in Michigan before entering a Family Practice residency in Colorado Springs. By 2000, he had completed his residency and begun a medical career that would span family medicine, immediate care, and emergency medicine. That journey was not built around politics. It was built around preparation, service, and responsibility.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&h=600&fit=crop&q=80",
    imageAlt: "A community meeting around a long table",
  },
  {
    eyebrow: "The record",
    heading: "Twenty-four years of making decisions that matter.",
    body: "Randall practiced medicine from 2000 through 2024. Trained in Family Medicine, he also served patients in multiple rural and remote emergency departments, where there was rarely time for political posturing or incomplete answers. Emergency medicine demands careful listening, clear priorities, decisive action, and responsibility for the outcome. It also teaches an important lesson: every decision affects a real person. Randall will bring that same mindset to the Oregon House. He will examine the evidence, ask difficult questions, weigh the consequences, and remain focused on solutions that improve people's lives.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&h=600&fit=crop&q=80",
    imageAlt: "Volunteers organising at a campaign field office",
  },
  {
    eyebrow: "The campaign",
    heading: "A campaign built by listening.",
    body: "The best public policy does not begin in a conference room in Salem. It begins by listening to the people who live with the consequences. Across District 28, families are concerned about the quality of Oregon's schools, the rising burden of taxes, public safety, economic opportunity, and whether state government is delivering results for the money it spends. Randall is taking those concerns seriously. This campaign is built around direct conversations, careful listening, and a commitment to represent the priorities of District 28—not the demands of political insiders. Every conversation helps shape a clearer agenda for responsible leadership and measurable results.",
    image:
      "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=900&h=600&fit=crop&q=80",
    imageAlt: "Neighbors talking on a front porch",
  },
];

const VALUES = [
  {
    no: "01",
    title: "Reclaim Educational Excellence",
    body: "Randall believes Oregon schools must return their focus to the fundamentals: reading, writing, mathematics, history, and civics. He will work to restore meaningful academic and graduation standards, strengthen parental and local school-board involvement, and direct more education resources toward teachers and classrooms. Professional teachers deserve the authority and support needed to maintain orderly classrooms and help students succeed. Oregon should measure education policy by whether students are learning—not simply by how much the state spends.",
  },
  {
    no: "02",
    title: "Reduce the Burden on Working Families",
    body: "Randall believes Oregonians deserve greater value and accountability for the taxes and fees they pay. He will scrutinize spending before asking families to contribute more, oppose unnecessary new costs, and demand transparent reporting on whether public programs are producing results. Government should respect the people who earn every public dollar.",
  },
  {
    no: "03",
    title: "Rebuild Oregon's Business Climate",
    body: "Randall wants Oregon to be a place where employers can invest, expand, hire, and compete. He will pursue more competitive tax rates, simpler tax compliance, more predictable permitting, and fewer unnecessary regulatory barriers. A stronger business climate means more jobs, a broader tax base, healthier communities, and less pressure to continually increase costs for working families.",
  },
];

const JOURNEY = [
  {
    year: "1993",
    title: "Medical education begins",
    body: "Randall begins his Doctor of Osteopathic Medicine program at the College of Osteopathic Medicine of the Pacific.",
  },
  {
    year: "1997",
    title: "Doctor of Osteopathic Medicine",
    body: "Randall completes medical school and begins a medical internship in Muskegon, Michigan.",
  },
  {
    year: "1998",
    title: "Family Practice residency",
    body: "Randall begins his Family Practice residency through the Colorado Springs Osteopathic Foundation.",
  },
  {
    year: "2000",
    title: "A career serving patients",
    body: "After completing residency, Randall begins more than two decades of clinical work in family medicine, immediate care, and emergency medicine.",
  },
  {
    year: "2008",
    title: "Rural emergency medicine",
    body: "Randall begins a long series of rural and remote emergency-room assignments, serving communities in Oregon and across the broader region.",
  },
  {
    year: "2026",
    title: "Republican nominee for District 28",
    body: "Randall becomes the Republican nominee for State Representative in Oregon House District 28. The general election will be held on November 3, 2026.",
  },
];

export default function AboutPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №02 — About"
        number="Meet the candidate"
        title="Leadership built through service."
        intro="Randall Fryer is a retired physician, former software professional, and former enlisted member of the Army Medical Corps running for Oregon House District 28. After decades spent working through complex problems and making consequential decisions, Randall is ready to bring a disciplined, evidence-led, and accountable approach to Salem."
        image="/randall-fryer-about.jpg"
        imageAlt="Randall Fryer, candidate for Oregon House District 28"
      />

      {/* Long-form bio blocks */}
      {BIO_BLOCKS.map((b, i) => (
        <BioBlock key={b.heading} block={b} reverse={i % 2 === 1} index={i} />
      ))}

      {/* Core values */}
      <SectionFrame
        label="05 — The Agenda"
        number="Priorities / III"
      >
        <div className="grid grid-cols-12 items-end gap-y-6 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              A practical agenda for a stronger Oregon.
            </SplitReveal>
          </div>
          <m.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="col-span-12 max-w-xl text-lg leading-relaxed text-ink/75 lg:col-span-5 lg:pl-6"
          >
            Randall&rsquo;s campaign is centered on three areas where state
            leadership can produce meaningful change.
          </m.p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {VALUES.map((v, i) => (
            <m.div
              key={v.no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col gap-4 rounded-card border border-ink/15 bg-bone-soft/60 p-7 transition-colors duration-500 hover:border-ink"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                {v.no}
              </span>
              <h3 className="display-serif text-2xl font-medium leading-tight">
                {v.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink/75">
                {v.body}
              </p>
            </m.div>
          ))}
        </div>
      </SectionFrame>

      {/* Journey timeline */}
      <Journey />

      {/* Closing CTA */}
      <SectionFrame label="05 — Get involved" number="Together / V">
        <div className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Join Randall on the trail.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
            >
              A successful campaign is built one conversation, one
              volunteer, and one neighbor at a time. Whether you can knock
              on doors, make phone calls, display a yard sign, host a
              neighborhood gathering, or make a contribution, your
              involvement will help bring Randall&rsquo;s message of
              disciplined and accountable leadership to voters across
              District 28.
            </m.p>
          </div>
          <div className="col-span-12 flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Button as={Link} href="/volunteer" variant="primary" withArrow>
              Volunteer
            </Button>
            <Button as={Link} href="/donate" variant="signal" withArrow>
              Donate
            </Button>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}

function BioBlock({ block, reverse, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref}>
      <SectionFrame
        label={`0${index + 2} — ${block.eyebrow}`}
        number={`Chapter / ${["II", "III", "IV"][index] || "I"}`}
      >
        <div
          className={`grid grid-cols-12 gap-y-10 lg:gap-x-12 ${
            reverse ? "lg:[&>div:first-child]:order-2" : ""
          }`}
        >
          <m.div
            style={{ y }}
            className="col-span-12 lg:col-span-5"
          >
            <m.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[5/4] w-full overflow-hidden rounded-card border border-ink/15 bg-ink"
            >
              <Image
                src={block.image}
                alt={block.imageAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover opacity-90"
                style={{ filter: "grayscale(100%) contrast(1.05) brightness(0.9)" }}
              />
              <div aria-hidden className="duotone-medium absolute inset-0 mix-blend-multiply" />
            </m.div>
          </m.div>

          <div className="col-span-12 lg:col-span-7 lg:pl-6">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.7rem,3.6vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              {block.heading}
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="mt-8 max-w-xl text-[1.05rem] leading-relaxed text-ink/80"
            >
              {block.body}
            </m.p>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}

function Journey() {
  const wrap = useRef(null);
  const lineRef = useRef(null);

  useGSAP(
    () => {
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

      gsap.utils.toArray(".journey-node").forEach((node) => {
        gsap.from(node, {
          scale: 0,
          opacity: 0,
          duration: 0.7,
          ease: "back.out(2)",
          scrollTrigger: { trigger: node, start: "top 80%" },
        });
      });
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap}>
      <SectionFrame label="04 — The Journey" number="Timeline / IV">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              From problem-solver to candidate.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-8 max-w-md text-lg leading-relaxed text-ink/75"
            >
              Six defining chapters in Randall&rsquo;s path to Oregon House
              District 28.
            </m.p>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/70"
            >
              Randall&rsquo;s early experience included software development
              and service in the Army Medical Corps, forming the foundation
              of his systems-based and service-oriented approach.
            </m.p>
          </div>

          <div className="relative col-span-12 mt-2 lg:col-span-7">
            <span
              ref={lineRef}
              aria-hidden
              className="absolute left-[14px] top-5 bottom-3 w-px origin-top bg-ink/30 sm:left-[19px]"
            />
            <div className="flex flex-col gap-12 sm:gap-14">
              {JOURNEY.map((j, i) => (
                <m.div
                  key={j.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.06,
                  }}
                  className="relative pl-12 sm:pl-16"
                >
                  <span
                    aria-hidden
                    className="journey-node absolute left-0 top-1 grid h-[30px] w-[30px] place-items-center rounded-full bg-ink text-bone shadow-[0_0_0_4px_var(--color-bone)] sm:h-[40px] sm:w-[40px]"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] sm:text-[10px]">
                      {j.year}
                    </span>
                  </span>
                  <h3 className="display-serif text-2xl font-medium leading-tight">
                    {j.title}
                  </h3>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink/75">
                    {j.body}
                  </p>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </SectionFrame>
    </div>
  );
}
