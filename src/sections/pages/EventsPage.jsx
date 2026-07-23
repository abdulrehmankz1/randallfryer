"use client";

import Image from "next/image";
import Link from "next/link";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { EVENTS } from "@/data/events";

export default function EventsPage() {
  const now = Date.now();
  const upcoming = EVENTS.filter((e) => new Date(e.date).getTime() >= now);
  const past = EVENTS.filter((e) => new Date(e.date).getTime() < now);

  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File No: 04 Events"
        number="Calendar / IV"
        title="Bring your questions to the events."
        intro="No gatekeepers. No carefully staged conversations. Team Fryer's town halls, neighborhood gatherings, canvasses, and community events are opportunities to meet Randall, ask direct questions, and talk honestly about what District 28 needs from Salem. Come as you are. Bring your questions. Bring a neighbor."
        image="/randall-fryer-ballot.jpg"
        imageAlt="Randall Fryer at a community park in District 28"
      />

      {/* UPCOMING */}
      <SectionFrame label="02 Upcoming events" number={`${upcoming.length} scheduled`}>
        {upcoming.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="flex flex-col gap-6 sm:gap-7">
            {upcoming.map((ev, i) => (
              <EventRow key={ev.slug} ev={ev} index={i} />
            ))}
          </ul>
        )}
      </SectionFrame>

      {past.length > 0 && (
        <SectionFrame label="03 Past events" number="Archive / III">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((ev, i) => (
              <PastCard key={ev.slug} ev={ev} index={i} />
            ))}
          </ul>
        </SectionFrame>
      )}

      {/* NEVER MISS A CONVERSATION */}
      <SectionFrame label="04 Stay in the loop" number="Notifications / IV">
        <div className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1.02] tracking-[-0.025em]"
            >
              Never miss a conversation.
            </SplitReveal>
            <Reveal
              as="p"
              duration={0.9}
              delay={0.2}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
            >
              Get notified when Randall announces a town hall, community
              gathering, volunteer canvass, candidate forum, or campaign
              appearance. Campaign emails may also include event reminders,
              schedule updates, and important election information.
            </Reveal>
          </div>
          <div className="col-span-12 flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            <Button as={Link} href="/contact" variant="primary" withArrow>
              Contact the team
            </Button>
          </div>
        </div>
      </SectionFrame>

    </main>
  );
}

function EventRow({ ev, index }) {
  return (
    <Reveal as="li" y={40} duration={0.9} delay={index * 0.06}>
      <Link
        href={`/events/${ev.slug}`}
        className="group grid grid-cols-12 gap-y-6 overflow-hidden rounded-card border border-ink/15 bg-bone-soft/40 transition-colors duration-500 hover:bg-bone-soft lg:gap-x-8"
      >
        <div className="relative col-span-12 aspect-[16/10] overflow-hidden lg:col-span-5 lg:aspect-auto">
          <Image
            src={ev.cover}
            alt={ev.title}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            style={{ filter: "grayscale(80%) contrast(1.05) brightness(0.92)" }}
          />
          <div aria-hidden className="duotone-soft absolute inset-0 mix-blend-multiply" />
          <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-pill border border-bone/30 bg-bone/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-bone/95 backdrop-blur">
            <span className="block h-1.5 w-1.5 rounded-full bg-signal" />
            {ev.category}
          </span>
        </div>

        <div className="col-span-12 flex flex-col justify-between p-6 lg:col-span-7 lg:py-8 lg:pr-8">
          <div>
            <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1 font-mono text-[11px] uppercase tracking-[0.24em] text-ink-mute">
              <span>{ev.dateLabel}</span>
              <span>{ev.timeLabel}</span>
            </div>
            <h3 className="display-serif mt-4 text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-[1.1] tracking-[-0.015em] text-ink">
              {ev.title}
            </h3>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/75">
              {ev.summary}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
                Location
              </div>
              <div className="mt-1 text-[14px] text-ink/85">
                {ev.locationName}
              </div>
            </div>
            <span
              aria-hidden
              className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-500 group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-bone"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M1.5 12.5L12.5 1.5M12.5 1.5H4.5M12.5 1.5V9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function PastCard({ ev, index }) {
  return (
    <Reveal as="li" delay={(index % 3) * 0.07}>
      <Link
        href={`/events/${ev.slug}`}
        className="group flex flex-col gap-4"
      >
        <div className="relative aspect-[5/4] overflow-hidden rounded-card border border-ink/15">
          <Image
            src={ev.cover}
            alt={ev.title}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ filter: "grayscale(100%) contrast(1.05) brightness(0.85)" }}
          />
        </div>
        <div className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
          <span>{ev.dateLabel}</span>
          <span>{ev.category}</span>
        </div>
        <h3 className="display-serif text-lg font-medium leading-tight">
          {ev.title}
        </h3>
      </Link>
    </Reveal>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-start gap-6 rounded-card border border-dashed border-ink/20 bg-bone-soft/40 p-10 sm:p-14">
      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-signal">
        Soon · Stay tuned
      </span>
      <h3 className="display-serif text-[clamp(1.75rem,3.5vw,2.75rem)] font-medium leading-tight">
        No events on the schedule.
      </h3>
      <p className="max-w-xl text-[15px] leading-relaxed text-ink/75">
        The team is scheduling the next round of town halls, canvasses,
        and meet-and-greets. Check back soon new events will be posted
        here as they are confirmed.
      </p>
    </div>
  );
}
