"use client";

import { useState } from "react";
import Link from "next/link";
import { m } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import BrandIcon from "@/components/ui/BrandIcon";
import { FormField, FormTextarea } from "@/components/ui/Form";
import { usePhoneConsent, SmsConsentFieldset } from "@/components/ui/SmsConsent";

const TOPICS = [
  {
    icon: "capitol",
    title: "Campaign information",
    body: "Looking for information about Randall, his experience, policy priorities, or the race for Oregon House District 28? Send us your question and a member of the campaign will help point you in the right direction.",
  },
  {
    icon: "podium",
    title: "Events and invitations",
    body: "Invite Randall to a neighborhood gathering, candidate forum, civic meeting, local business, community organization, or public event. Please include the proposed date, location, audience, and event format.",
  },
  {
    icon: "volunteer-hands",
    title: "Volunteer support",
    body: "Need help choosing a volunteer role, joining a canvass, requesting campaign materials, or organizing an activity in your area? Team Fryer will help you find a practical way to participate.",
  },
  {
    icon: "megaphone",
    title: "Media and campaign operations",
    body: "Journalists, community publications, organizations, donors, and campaign partners may contact Team Fryer for interview requests, scheduling, contribution questions, and other official inquiries.",
  },
];

export default function ContactPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №07 — Contact"
        number="Contact / VII"
        title="Start a conversation with Team Fryer."
        intro="Questions, invitations, ideas, and local concerns are welcome. Send Team Fryer a message and we will direct it to the right person."
      />

      {/* REASONS TO REACH OUT */}
      <SectionFrame label="02 — Reasons to reach out" number="Categories / II">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TOPICS.map((t, i) => (
            <m.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              whileHover={{ y: -4 }}
              className="group flex flex-col gap-3 rounded-card border border-ink/15 bg-bone-soft/60 p-6 transition-colors duration-500 hover:border-ink"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-signal transition-colors duration-500 group-hover:border-signal/50 group-hover:text-signal-deep">
                  <BrandIcon name={t.icon} className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                  0{i + 1}
                </span>
              </div>
              <h3 className="display-serif text-xl font-medium leading-tight">
                {t.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink/75">
                {t.body}
              </p>
            </m.div>
          ))}
        </div>
      </SectionFrame>

      {/* FORM */}
      <SectionFrame label="03 — Send it" number="Form / III">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.7rem,3.5vw,2.85rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              Leave Randall a note.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-ink/80"
            >
              A short, specific question helps Randall and the campaign
              provide a clearer and more useful response. Please focus on
              one concern at a time and include only the background
              information needed to understand your question.
            </m.p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <ContactForm />
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}

function ContactForm() {
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
      message: (data.get("message") || "").toString().trim(),
      sms_updates: pc.smsConsent,
      sms_promo: pc.promoConsent,
    };

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    if (
      !payload.firstName ||
      !payload.lastName ||
      !emailOk ||
      !payload.message
    ) {
      setStatus("error");
      setErrorMsg(
        "Please add your first and last name, a valid email, and a message."
      );
      return;
    }
    if (pc.consentError) {
      setStatus("error");
      setErrorMsg(pc.consentError);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending your message. Please try again in a moment."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-ink bg-ink p-10 text-bone sm:p-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ochre-soft">
          Received
        </span>
        <h3 className="display-serif mt-3 text-3xl font-medium sm:text-4xl">
          Thanks — the team will be in touch.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-bone/80">
          Your message has been received and will be directed to the right
          person on the campaign.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="c-first" name="firstName" label="First name" required />
        <FormField id="c-last" name="lastName" label="Last name" required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="c-email" name="email" label="Email" type="email" required />
        <FormField
          id="c-phone"
          name="phone"
          label="Phone"
          type="tel"
          optional
          value={pc.phone}
          onChange={pc.onPhoneChange}
          placeholder="+1 (503) 555-0123"
        />
      </div>
      <FormTextarea
        id="c-message"
        name="message"
        label="Your message"
        required
        rows={5}
      />

      <SmsConsentFieldset {...pc} idPrefix="c-sms" />

      {status === "error" && errorMsg && (
        <p
          role="alert"
          className="rounded-soft border border-signal/30 bg-signal/5 px-4 py-3 text-sm leading-relaxed text-signal-deep"
        >
          {errorMsg}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <Button
          as="button"
          type="submit"
          variant="signal"
          withArrow
          disabled={submitting}
          aria-busy={submitting}
          className={submitting ? "pointer-events-none opacity-70" : ""}
        >
          {submitting ? "Sending…" : "Send to the team"}
        </Button>
        <Link
          href="/privacy"
          className="link-underline font-mono text-[10px] uppercase tracking-[0.24em] text-ink-mute hover:text-ink"
        >
          Privacy notice
        </Link>
      </div>
    </form>
  );
}
