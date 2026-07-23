/**
 * FormHeroSkeleton — loading placeholder for pages whose hero carries a form
 * panel on the right (Volunteer, Ask, Contact). Mirrors the real PageHero +
 * FormPanel structure: meta row, hairline, then a 50/50 grid of headline/intro
 * on the left and a bordered form card on the right.
 *
 * The `variant` prop shapes the right-hand form (and, for contact, the extra
 * contact-details block on the left) so the skeleton matches each page's real
 * structure and there is no layout jump when the content hydrates.
 */

// Row recipes per page — each entry is a field group in vertical order,
// matching the real form so the skeleton height and rhythm line up.
const VARIANTS = {
  ask: {
    label: "w-40",
    rows: ["pair", "pair", "field", "field", "tall", "sms", "button"],
    contactDetails: false,
  },
  contact: {
    label: "w-32",
    rows: ["pair", "pair", "tall", "sms", "button"],
    contactDetails: true,
  },
  volunteer: {
    label: "w-40",
    rows: [
      "pair", "pair", "field", "pair", "pair", "field", "field",
      "checks", "field", "tall", "tall", "sms", "button",
    ],
    contactDetails: false,
  },
};

export default function FormHeroSkeleton({ variant = "contact" }) {
  const cfg = VARIANTS[variant] || VARIANTS.contact;

  return (
    <main className="relative flex flex-1 flex-col">
      <section className="relative isolate pt-[88px]">
        <div className="container-padded relative pb-20 pt-12 sm:pb-28 sm:pt-20 lg:pt-24">
          {/* meta row */}
          <div className="flex items-center justify-between">
            <span className="block h-3 w-40 animate-pulse rounded bg-ink/10" />
            <span className="block h-3 w-24 animate-pulse rounded bg-ink/10" />
          </div>

          {/* hairline */}
          <div className="mt-6 h-px w-full origin-left animate-[buildLine_1.4s_ease-in-out_infinite] bg-ink/15" />

          <div className="mt-12 grid grid-cols-12 gap-y-12 lg:mt-16 lg:gap-x-10">
            {/* left — headline + intro (+ contact details for contact) */}
            <div className="col-span-12 flex flex-col gap-5 lg:col-span-6 lg:sticky lg:top-28 lg:self-start">
              <span className="block h-[clamp(2.2rem,5vw,4rem)] w-[85%] animate-pulse rounded-soft bg-ink/8" />
              <span className="block h-[clamp(2.2rem,5vw,4rem)] w-[60%] animate-pulse rounded-soft bg-ink/8" />
              <div className="mt-5 flex flex-col gap-3">
                <span className="block h-3.5 w-[92%] animate-pulse rounded bg-ink/10" />
                <span className="block h-3.5 w-[84%] animate-pulse rounded bg-ink/10" />
                <span className="block h-3.5 w-[58%] animate-pulse rounded bg-ink/10" />
              </div>

              {cfg.contactDetails && (
                <div className="mt-8 flex flex-col gap-4 border-t border-ink/15 pt-6">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex flex-col gap-2">
                      <span className="block h-2.5 w-24 animate-pulse rounded bg-ink/10" />
                      <span className="block h-3.5 w-52 animate-pulse rounded bg-ink/8" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* right — form card */}
            <div className="col-span-12 lg:col-span-6">
              <div className="rounded-card border border-ink/15 bg-bone-soft/50 p-6 shadow-[0_24px_60px_-34px_rgba(13,21,40,0.35)] sm:p-8">
                <div className="mb-7 flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal/30" />
                  <span className={`block h-3 animate-pulse rounded bg-ink/10 ${cfg.label}`} />
                </div>
                <div className="flex flex-col gap-7">
                  {cfg.rows.map((type, i) => (
                    <SkelGroup key={i} type={type} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes buildLine {
          0%, 100% { transform: scaleX(0.3); opacity: 0.4 }
          50% { transform: scaleX(1); opacity: 1 }
        }
      `}</style>
    </main>
  );
}

function SkelGroup({ type }) {
  switch (type) {
    case "pair":
      return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <SkelField />
          <SkelField />
        </div>
      );
    case "tall":
      return <SkelField tall />;
    case "checks":
      return (
        <div className="flex flex-col gap-3">
          <span className="block h-2.5 w-40 animate-pulse rounded bg-ink/10" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="block h-5 w-5 flex-shrink-0 animate-pulse rounded-[5px] bg-ink/10" />
                <span className="block h-3 w-28 animate-pulse rounded bg-ink/8" />
              </div>
            ))}
          </div>
        </div>
      );
    case "sms":
      return (
        <div className="flex flex-col gap-4 border-t border-ink/10 pt-5">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="mt-0.5 block h-5 w-5 flex-shrink-0 animate-pulse rounded-[5px] bg-ink/10" />
              <div className="flex flex-1 flex-col gap-1.5">
                <span className="block h-2.5 w-[95%] animate-pulse rounded bg-ink/8" />
                <span className="block h-2.5 w-[80%] animate-pulse rounded bg-ink/8" />
              </div>
            </div>
          ))}
        </div>
      );
    case "button":
      return <span className="mt-1 block h-12 w-44 animate-pulse rounded-pill bg-ink/12" />;
    case "field":
    default:
      return <SkelField />;
  }
}

function SkelField({ tall = false }) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="block h-2.5 w-24 animate-pulse rounded bg-ink/10" />
      <span
        className={`block w-full animate-pulse rounded-soft bg-ink/8 ${
          tall ? "h-28" : "h-12"
        }`}
      />
    </div>
  );
}
