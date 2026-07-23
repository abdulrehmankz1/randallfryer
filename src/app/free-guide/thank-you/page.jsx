import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Button from "@/components/ui/Button";
import { THANK_YOU } from "@/constants/funnel-content";

// Funnel step 2 — delivery / thank-you page. Noindexed: this page only makes
// sense after an opt-in and must not appear in search results. ALL copy comes
// from src/constants/funnel-content.js ([DUMMY] placeholders).
export const metadata = {
  title: THANK_YOU.meta.title,
  description: THANK_YOU.meta.description,
  robots: {
    index: false,
  },
};

export default function Page() {
  return (
    <main className="relative flex flex-1 flex-col">
      {/* CONFIRMATION */}
      <section className="relative isolate overflow-hidden">
        <div className="container-padded relative pb-16 pt-14 sm:pb-24 sm:pt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-y-3 text-ink/65">
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em]">
              <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-signal" />
              {THANK_YOU.eyebrow}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em]">
              Delivery / I
            </span>
          </div>

          <div className="hairline mt-6 h-px w-full" />

          <div className="mt-12 max-w-3xl lg:mt-16">
            <SplitReveal
              as="h1"
              className="display-serif block text-balance text-[clamp(2.2rem,5vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.025em] text-ink"
            >
              {THANK_YOU.headline}
            </SplitReveal>
            <p className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-ink/80 sm:text-xl">
              {THANK_YOU.body}
            </p>

            {/* Direct download alternative */}
            <div className="mt-12 flex flex-col gap-4 rounded-card border border-ink/15 bg-bone-soft/60 p-8">
              <h2 className="display-serif text-2xl font-medium leading-tight">
                {THANK_YOU.download.heading}
              </h2>
              <p className="max-w-lg text-[15px] leading-relaxed text-ink/75">
                {THANK_YOU.download.body}
              </p>
              <div>
                {/* [DUMMY] download link — set download.url in funnel-content.js */}
                <Button as="a" href={THANK_YOU.download.url} variant="signal" withArrow>
                  {THANK_YOU.download.buttonLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPSELL TEASER */}
      <SectionFrame
        tone="dark"
        label={THANK_YOU.upsell.label}
        number={THANK_YOU.upsell.number}
        withBottomLine={false}
      >
        <div className="flex flex-col items-start gap-6 pb-16 sm:pb-20">
          <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ochre-soft">
            {THANK_YOU.upsell.eyebrow}
          </span>
          <SplitReveal
            as="h2"
            className="display-serif block max-w-2xl text-balance text-[clamp(1.9rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.02em]"
          >
            {THANK_YOU.upsell.heading}
          </SplitReveal>
          <p className="max-w-xl text-lg leading-relaxed text-bone/80">
            {THANK_YOU.upsell.body}
          </p>
          {/* [DUMMY] offer link — set upsell.url in funnel-content.js */}
          <Button as="a" href={THANK_YOU.upsell.url} variant="bone" withArrow>
            {THANK_YOU.upsell.buttonLabel}
          </Button>
        </div>
      </SectionFrame>
    </main>
  );
}
