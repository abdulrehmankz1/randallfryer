"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";

const GROUPS = [
  {
    title: "About the campaign",
    items: [
      {
        q: "Who is Adrian Vale?",
        a: "Adrian is a small-business owner and longtime Harborlight resident running for State Senate District 14 to restore fiscal honesty and a citizen-first Capitol. See the About page for the full bio.",
      },
      {
        q: "What is CapitalWatch?",
        a: "CapitalWatch is the name of the campaign and the operating idea that public money should be tracked, published, and audited in plain English. It is also the platform we will pursue if elected.",
      },
      {
        q: "When is the primary?",
        a: "Tuesday, May 19, 2026. Polls are open 7 AM – 8 PM. Mail-ballot envelopes must be received by 8 PM that day.",
      },
    ],
  },
  {
    title: "Volunteering",
    items: [
      {
        q: "I&rsquo;ve never volunteered before. Is that OK?",
        a: "It is the most common starting point on our team. The first shift is 20 minutes of training and then a route paired with a veteran. We will not throw you to the wolves.",
      },
      {
        q: "How much time does it take?",
        a: "One hour a week is meaningful. Four hours a week is huge. Pick what fits your life we&rsquo;ll find a role that uses it well.",
      },
      {
        q: "I live outside District 14 can I still help?",
        a: "Yes. Phone banking, digital outreach, and call-time fundraising can be done from anywhere. We pair out-of-district volunteers carefully.",
      },
    ],
  },
  {
    title: "Donations",
    items: [
      {
        q: "Do you accept corporate or PAC money?",
        a: "No. The campaign accepts contributions only from individuals. Every refusal is documented in the FEC report.",
      },
      {
        q: "Is my donation tax-deductible?",
        a: "Political contributions are not tax-deductible under federal or Oregon law.",
      },
      {
        q: "Can I cancel a recurring donation?",
        a: "Yes, anytime. Email Randall@randallfororegon.com or use the link in your WinRed receipt we cancel the same business day.",
      },
    ],
  },
  {
    title: "Policy",
    items: [
      {
        q: "Where can I read your full platform?",
        a: "On the Platform page. Each pillar links to a detailed policy brief and is updated as drafts get refined with public input.",
      },
      {
        q: "What does the &lsquo;shot-clock on permits&rsquo; mean?",
        a: "A statutory 60-day deadline on every state-issued license or permit. If the agency misses the deadline without a documented exception, the application is approved by default.",
      },
      {
        q: "How will you fund an Inspector General?",
        a: "Roughly $640k annually fully offset by the savings the office is statistically certain to recover in its first 18 months. The full math is in the policy brief.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №09 Frequently asked"
        number="Help / IX"
        title="The questions we hear most."
        intro="Pulled from coffees, doorsteps, and the inbox. Don't see your question? Send it over Adrian replies personally."
      />

      {GROUPS.map((g, gi) => (
        <SectionFrame
          key={g.title}
          label={`0${gi + 2} ${g.title}`}
          number={`Group / ${["II", "III", "IV", "V"][gi]}`}
        >
          <div className="grid grid-cols-12 gap-y-8 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-4">
              <SplitReveal
                as="h2"
                className="display-serif block text-balance text-[clamp(1.7rem,3.5vw,2.85rem)] font-medium leading-[1.05] tracking-[-0.02em]"
              >
                {g.title}.
              </SplitReveal>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <ul className="flex flex-col">
                {g.items.map((item, i) => (
                  <FAQItem key={item.q} item={item} index={i} />
                ))}
              </ul>
            </div>
          </div>
        </SectionFrame>
      ))}

      {/* CTA */}
      <SectionFrame
        label={`0${GROUPS.length + 2} Still curious?`}
        number="Contact / Final"
      >
        <div className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Ask the question we missed.
            </SplitReveal>
            <Reveal
              as="p"
              duration={0.9}
              delay={0.2}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
            >
              Adrian reads every submission personally. We&rsquo;ll
              fold the best questions back into this page.
            </Reveal>
          </div>
          <div className="col-span-12 flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Button as={Link} href="/contact" variant="primary" withArrow>
              Ask Adrian
            </Button>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);
  return (
    <Reveal
      as="li"
      y={20}
      delay={index * 0.06}
      className="border-b border-ink/15"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-start justify-between gap-6 py-6 text-left"
      >
        <span
          className="display-serif text-[clamp(1.125rem,1.8vw,1.5rem)] font-medium leading-snug text-ink transition-colors duration-300 group-hover:text-signal"
          dangerouslySetInnerHTML={{ __html: item.q }}
        />
        <m.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-1 grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-ink/30 text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bone"
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
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p
              className="max-w-2xl pb-7 pr-12 text-[1rem] leading-relaxed text-ink/80"
              dangerouslySetInnerHTML={{ __html: item.a }}
            />
          </m.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
}
