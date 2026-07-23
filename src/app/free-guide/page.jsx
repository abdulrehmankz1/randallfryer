import Image from "next/image";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Button from "@/components/ui/Button";
import LmOptinForm from "./LmOptinForm";
import { LEAD_MAGNET } from "@/constants/funnel-content";

// Funnel step 1 — lead-magnet squeeze page. ALL copy comes from
// src/constants/funnel-content.js ([DUMMY] placeholders); swap content there,
// not here. Server component — interactive pieces (form, animated sections)
// are imported client components.
export const metadata = {
  title: LEAD_MAGNET.meta.title,
  description: LEAD_MAGNET.meta.description,
};

const { hero, benefits, socialProof, finalCta, form } = LEAD_MAGNET;

export default function Page() {
  return (
    <main className="relative flex flex-1 flex-col">
      {/* HERO — headline, subheadline, cover mockup, single CTA to the form */}
      <section className="relative isolate overflow-hidden">
        <div className="container-padded relative pb-20 pt-14 sm:pb-28 sm:pt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-y-3 text-ink/65">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
              {hero.eyebrow}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              Guide / I
            </span>
          </div>

          <div className="hairline mt-6 h-px w-full" />

          <div className="mt-12 grid grid-cols-12 gap-y-12 lg:mt-16 lg:gap-x-10">
            <div className="col-span-12 flex flex-col items-start lg:col-span-7">
              <SplitReveal
                as="h1"
                className="display-serif block text-balance text-[clamp(2.2rem,5.2vw,4.6rem)] font-medium leading-[1] tracking-[-0.025em] text-ink"
              >
                {hero.headline}
              </SplitReveal>
              <p className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-ink/80 sm:text-xl">
                {hero.subheadline}
              </p>
              <div className="mt-10">
                <Button href="#optin" variant="signal" withArrow>
                  {hero.ctaLabel}
                </Button>
              </div>
            </div>

            {/* Cover / mockup — swap hero.coverImage in funnel-content.js */}
            <div className="col-span-12 lg:col-span-5">
              {hero.coverImage ? (
                <div className="relative aspect-[3/4] w-full max-w-sm overflow-hidden rounded-card border border-ink/15 bg-ink lg:ml-auto">
                  <Image
                    src={hero.coverImage}
                    alt={hero.coverImageAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 35vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  role="img"
                  aria-label={hero.coverImageAlt}
                  className="flex aspect-[3/4] w-full max-w-sm flex-col items-center justify-center gap-3 rounded-card border border-dashed border-ink/30 bg-bone-soft/60 p-8 text-center lg:ml-auto"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                    [DUMMY]
                  </span>
                  <span className="display-serif text-xl font-medium text-ink/60">
                    Guide cover / mockup image
                  </span>
                  <span className="text-[13px] leading-relaxed text-ink/50">
                    Set <code>hero.coverImage</code> in funnel-content.js
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <SectionFrame label={benefits.label} number={benefits.number}>
        <SplitReveal
          as="h2"
          className="display-serif block max-w-2xl text-balance text-[clamp(1.7rem,3.5vw,2.85rem)] font-medium leading-[1.05] tracking-[-0.02em]"
        >
          {benefits.heading}
        </SplitReveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {benefits.items.map((b, i) => (
            <li
              key={b.title}
              className="flex flex-col gap-3 rounded-card border border-ink/15 bg-bone-soft/60 p-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">
                0{i + 1}
              </span>
              <h3 className="display-serif text-xl font-medium leading-tight">
                {b.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink/75">{b.body}</p>
            </li>
          ))}
        </ul>
      </SectionFrame>

      {/* OPT-IN FORM */}
      <SectionFrame id="optin" label={form.label} number={form.number}>
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.7rem,3.5vw,2.85rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              {form.heading}
            </SplitReveal>
            <p className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-ink/80">
              {form.body}
            </p>
          </div>
          <div className="col-span-12 lg:col-span-8">
            <LmOptinForm />
          </div>
        </div>
      </SectionFrame>

      {/* SOCIAL PROOF */}
      <SectionFrame label={socialProof.label} number={socialProof.number}>
        <SplitReveal
          as="h2"
          className="display-serif block max-w-2xl text-balance text-[clamp(1.7rem,3.5vw,2.85rem)] font-medium leading-[1.05] tracking-[-0.02em]"
        >
          {socialProof.heading}
        </SplitReveal>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {socialProof.testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between gap-6 rounded-card border border-ink/15 bg-bone-soft/60 p-6"
            >
              <blockquote className="text-[15px] leading-relaxed text-ink/80">
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3">
                {/* [DUMMY] initials avatar — replace with a real photo if desired */}
                <span
                  aria-hidden
                  className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-ink/15 bg-ink font-mono text-[11px] uppercase tracking-[0.1em] text-bone"
                >
                  {t.name.replace("[DUMMY] ", "").slice(0, 1)}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium text-ink">{t.name}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                    {t.detail}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </SectionFrame>

      {/* FINAL CTA */}
      <SectionFrame
        tone="dark"
        label={finalCta.label}
        number={finalCta.number}
        withBottomLine={false}
      >
        <div className="flex flex-col items-start gap-6 pb-16 sm:pb-20">
          <SplitReveal
            as="h2"
            className="display-serif block max-w-2xl text-balance text-[clamp(1.9rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]"
          >
            {finalCta.heading}
          </SplitReveal>
          <p className="max-w-xl text-lg leading-relaxed text-bone/80">
            {finalCta.body}
          </p>
          <Button href="#optin" variant="bone" withArrow>
            {finalCta.buttonLabel}
          </Button>
        </div>
      </SectionFrame>
    </main>
  );
}
