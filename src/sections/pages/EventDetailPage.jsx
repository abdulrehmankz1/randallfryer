"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import { gsap, useGSAP } from "@/animations/gsap";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import Reveal from "@/animations/Reveal";
import { useReveal } from "@/animations/useReveal";
import Button from "@/components/ui/Button";
import { FormField, FormDisclaimer } from "@/components/ui/Form";
import { usePhoneConsent, SmsConsentFieldset } from "@/components/ui/SmsConsent";
import { getRelated } from "@/data/events";

export default function EventDetailPage({ event }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yCover = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacityHero = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  const related = getRelated(event.slug, 3);

  return (
    <main className="relative flex flex-1 flex-col">
      {/* HERO BANNER */}
      <section ref={heroRef} className="relative isolate overflow-hidden pt-[88px]">
        <m.div
          style={{ y: yCover, opacity: opacityHero }}
          className="absolute inset-0 -z-10"
        >
          <Image
            src={event.cover}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
            style={{ filter: "grayscale(100%) contrast(1.05) brightness(0.85)" }}
          />
          <div aria-hidden className="duotone-strong absolute inset-0" />
          <div aria-hidden className="duotone-tint-strong absolute inset-0 mix-blend-color" />
        </m.div>

        <div className="container-padded relative pb-24 pt-16 text-bone sm:pb-32 sm:pt-24 lg:pt-32">
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-baseline justify-between gap-y-3"
          >
            <Link
              href="/events"
              className="link-underline font-mono text-[11px] uppercase tracking-[0.28em] text-bone/70 hover:text-bone"
            >
              ← All events
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-bone/60">
              {event.category}
            </span>
          </m.div>

          <m.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.35 }}
            className="mt-6 h-px w-full origin-left bg-bone/25"
          />

          <div className="mt-12 grid grid-cols-12 gap-y-10 lg:gap-x-10">
            <div className="col-span-12 lg:col-span-8">
              <SplitReveal
                as="h1"
                className="display-serif block text-balance text-[clamp(2rem,4.8vw,4.3rem)] font-medium leading-[1] tracking-[-0.025em] text-bone"
              >
                {event.title}
              </SplitReveal>
              <m.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-bone/85 sm:text-xl"
              >
                {event.summary}
              </m.p>
            </div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-12 flex flex-col gap-5 rounded-card border border-bone/20 bg-bone/5 p-7 text-bone backdrop-blur lg:col-span-4"
            >
              <DetailRow label="Date">{event.dateLabel}</DetailRow>
              <DetailRow label="Time">{event.timeLabel}</DetailRow>
              <DetailRow label="Location">
                <div>{event.locationName}</div>
                <div className="mt-1 text-[12px] text-bone/65">
                  {event.locationAddress}
                </div>
              </DetailRow>
              <DetailRow label="Status">
                <span className="inline-flex items-center gap-2">
                  <span className="block h-1.5 w-1.5 rounded-full bg-signal" />
                  {event.tag}
                </span>
              </DetailRow>
              <div className="mt-2">
                <Button
                  as="a"
                  href="#rsvp"
                  variant="signal"
                  withArrow
                >
                  RSVP
                </Button>
              </div>
            </m.div>
          </div>
        </div>
      </section>

      {/* DETAILS / BODY */}
      <SectionFrame label="02 About this event" number="Brief / II">
        <div className="grid grid-cols-12 gap-y-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex flex-col gap-6 text-[1.05rem] leading-relaxed text-ink/85">
              {event.body.map((p, i) => (
                <Reveal as="p" key={i} duration={0.8} delay={i * 0.08}>
                  {p}
                </Reveal>
              ))}
            </div>
          </div>

          {/* SCHEDULE */}
          <div className="col-span-12 lg:col-span-5">
            <Schedule items={event.schedule} />
          </div>
        </div>
      </SectionFrame>

      {/* LOCATION */}
      <SectionFrame label="03 Where to go" number="Location / III">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.8rem,3.9vw,3rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              {event.locationName}
            </SplitReveal>
            <Reveal
              duration={0.8}
              delay={0.2}
              className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink/80"
            >
              <p>{event.locationAddress}</p>
              <p className="mt-3 text-[14px] text-ink-mute">
                Free street parking on Wharf and Marina streets. The
                building is ADA-accessible from the front entrance.
              </p>
            </Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                as="a"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `${event.locationName} ${event.locationAddress}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                withArrow
              >
                Get directions
              </Button>
              <Button as={Link} href="/contact" variant="outline" withArrow>
                Ask the team
              </Button>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <Reveal
              y={30}
              duration={1}
              className="relative aspect-[16/10] overflow-hidden rounded-card border border-ink/15 bg-ink"
            >
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&h=1000&fit=crop&q=80"
                alt={`Map of ${event.locationName}`}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover opacity-90"
                style={{ filter: "grayscale(100%) contrast(1.05) brightness(0.9)" }}
              />
              <div aria-hidden className="duotone-soft absolute inset-0 mix-blend-multiply" />
              {/* pin marker */}
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                <span className="absolute h-16 w-16 animate-ping rounded-full bg-signal/30" />
                <span className="relative grid h-10 w-10 place-items-center rounded-full bg-signal text-bone shadow-lg">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1a4 4 0 0 0-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 0 0-4-4Zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </SectionFrame>

      {/* RSVP — booking form */}
      <div id="rsvp" className="scroll-mt-24">
        <SectionFrame label="04 Reserve your seat" number="RSVP / IV">
          <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
            <div className="col-span-12 lg:col-span-5">
              <SplitReveal
                as="h2"
                className="display-serif block text-balance text-[clamp(1.75rem,3.9vw,3.4rem)] font-medium leading-[1] tracking-[-0.025em]"
              >
                Save your seat. Bring a neighbor.
              </SplitReveal>
              <Reveal
                as="p"
                duration={0.9}
                delay={0.2}
                className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink/80"
              >
                Free event. RSVP helps us order enough chairs, coffee,
                and clipboards. Walk-ups are always welcome no
                ticket required.
              </Reveal>

              <Reveal
                y={30}
                duration={0.9}
                delay={0.3}
                className="mt-8 rounded-card border border-ink/15 bg-bone-soft/50 p-6"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                  Event recap
                </span>
                <div className="mt-4 flex flex-col gap-3 text-[14px]">
                  <RecapRow label="Date">{event.dateLabel}</RecapRow>
                  <RecapRow label="Time">{event.timeLabel}</RecapRow>
                  <RecapRow label="Location">
                    <div>{event.locationName}</div>
                    <div className="mt-1 text-[12px] text-ink-mute">
                      {event.locationAddress}
                    </div>
                  </RecapRow>
                  <RecapRow label="Cost">Free · Open to the public</RecapRow>
                </div>
                <a
                  href={`data:text/calendar;charset=utf8,${encodeURIComponent(
                    buildICS(event)
                  )}`}
                  download={`${event.slug}.ics`}
                  className="mt-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink/85 hover:text-ink"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1v9m0 0L3 6m4 4 4-4M1 13h12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                  </svg>
                  Add to calendar (.ics)
                </a>
              </Reveal>
            </div>

            <div className="col-span-12 lg:col-span-7">
              <RSVPForm event={event} />
            </div>
          </div>
        </SectionFrame>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <SectionFrame label="05 Related events" number="More / V">
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((ev, i) => (
              <RelatedCard key={ev.slug} ev={ev} index={i} />
            ))}
          </ul>
        </SectionFrame>
      )}
    </main>
  );
}

function RecapRow({ label, children }) {
  return (
    <div className="flex flex-col gap-1 border-b border-ink/10 pb-3 last:border-b-0 last:pb-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute">
        {label}
      </div>
      <div className="text-ink">{children}</div>
    </div>
  );
}

function RSVPForm({ event }) {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const pc = usePhoneConsent();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const data = new FormData(e.currentTarget);
    const payload = {
      firstName: (data.get("firstName") || "").toString().trim(),
      lastName: (data.get("lastName") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      phone: pc.phone,
      sms_updates: pc.smsConsent,
      sms_promo: pc.promoConsent,
      // Event context is attached from event data — never user input.
      eventName: event.title,
      eventDate: event.dateLabel,
      eventTime: event.timeLabel,
      eventCategory: event.category,
      eventStartISO: event.date,
    };

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    if (!payload.firstName || !emailOk) {
      setStatus("error");
      setErrorMsg("Please add your first name and a valid email.");
      return;
    }
    if (pc.consentError) {
      setStatus("error");
      setErrorMsg(pc.consentError);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/events/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending your RSVP. Please try again in a moment."
      );
    }
  }

  if (status === "success") {
    return (
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-card border border-ink bg-ink p-10 text-bone sm:p-12"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ochre-soft">
          You&rsquo;re on the list
        </span>
        <h3 className="display-serif mt-3 text-3xl font-medium sm:text-4xl">
          See you {event.dateLabel.split(",")[0]}.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-bone/80">
          A confirmation is on the way to your inbox. If anything
          changes before the event, we&rsquo;ll be in touch.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button as={Link} href="/events" variant="signal" withArrow>
            More events
          </Button>
          <Button
            as="a"
            href={`data:text/calendar;charset=utf8,${encodeURIComponent(
              buildICS(event)
            )}`}
            download={`${event.slug}.ics`}
            variant="outline"
            withArrow
            className="!border-bone/40 !text-bone hover:!bg-bone hover:!text-ink"
          >
            Add to calendar
          </Button>
        </div>
      </m.div>
    );
  }

  const submitting = status === "submitting";

  return (
    <Reveal
      as="form"
      onSubmit={handleSubmit}
      noValidate
      y={30}
      duration={0.9}
      className="flex flex-col gap-6 rounded-card border border-ink/15 bg-bone-soft/40 p-7 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="rsvp-first" name="firstName" label="First name" required />
        <FormField id="rsvp-last" name="lastName" label="Last name" required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          id="rsvp-email"
          name="email"
          label="Email"
          type="email"
          required
          placeholder="you@email.com"
        />
        <FormField
          id="rsvp-phone"
          name="phone"
          label="Contact number"
          type="tel"
          optional
          value={pc.phone}
          onChange={pc.onPhoneChange}
          placeholder="+1 (503) 555-0123"
        />
      </div>

      <SmsConsentFieldset {...pc} idPrefix="rsvp-sms" />

      {status === "error" && errorMsg && (
        <p
          role="alert"
          className="rounded-soft border border-signal/30 bg-signal/5 px-4 py-3 text-sm leading-relaxed text-signal-deep"
        >
          {errorMsg}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <Button
          as="button"
          type="submit"
          variant="signal"
          withArrow
          disabled={submitting}
          aria-busy={submitting}
          className={submitting ? "pointer-events-none opacity-70" : ""}
        >
          {submitting ? "Sending…" : "Confirm RSVP"}
        </Button>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
          Free event walk-ups always welcome.
        </span>
      </div>

      <FormDisclaimer />
    </Reveal>
  );
}

function buildICS(ev) {
  const start = new Date(ev.date)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const end = new Date(new Date(ev.date).getTime() + 90 * 60 * 1000)
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CapitalWatch//Events//EN",
    "BEGIN:VEVENT",
    `UID:${ev.slug}@capitalwatch.vote`,
    `DTSTAMP:${start}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${ev.title}`,
    `LOCATION:${ev.locationName}, ${ev.locationAddress}`,
    `DESCRIPTION:${ev.summary}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function DetailRow({ label, children }) {
  return (
    <div className="flex flex-col gap-1 border-b border-bone/15 pb-4 last:border-b-0 last:pb-0">
      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-bone/55">
        {label}
      </div>
      <div className="text-[15px] text-bone">{children}</div>
    </div>
  );
}

function Schedule({ items }) {
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
            end: "bottom 70%",
            scrub: 0.6,
          },
        }
      );
    },
    { scope: wrap }
  );

  return (
    <div ref={wrap} className="rounded-card border border-ink/15 bg-bone-soft/40 p-6 sm:p-8">
      <h3 className="eyebrow">Schedule</h3>
      <div className="relative mt-6">
        <span
          ref={lineRef}
          aria-hidden
          className="absolute left-[7px] top-1.5 bottom-1.5 w-px origin-top bg-ink/30"
        />
        <ol className="flex flex-col gap-5">
          {items.map((step, i) => (
            <ScheduleStep key={step.time} step={step} index={i} />
          ))}
        </ol>
      </div>
    </div>
  );
}

function ScheduleStep({ step, index }) {
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
        delay: index * 0.07,
      }}
      className="relative pl-7"
    >
      <span
        aria-hidden
        className="absolute left-0 top-2 block h-3.5 w-3.5 rounded-full border border-ink/40 bg-bone"
      />
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-mute">
        {step.time}
      </div>
      <div className="mt-1 text-[15px] text-ink/85">{step.title}</div>
    </m.li>
  );
}

function RelatedCard({ ev, index }) {
  return (
    <Reveal as="li" y={30} duration={0.8} delay={index * 0.08}>
      <Link
        href={`/events/${ev.slug}`}
        className="group flex flex-col gap-4"
      >
        <div className="relative aspect-[5/4] overflow-hidden rounded-card border border-ink/15 bg-ink">
          <Image
            src={ev.cover}
            alt={ev.title}
            fill
            sizes="(min-width: 1024px) 30vw, 50vw"
            className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.04]"
            style={{ filter: "grayscale(85%) contrast(1.05) brightness(0.9)" }}
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
