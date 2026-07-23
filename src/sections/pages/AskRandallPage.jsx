"use client";

import { useState } from "react";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import {
  FormField,
  FormSelect,
  FormTextarea,
  FormDisclaimer,
  FormPanel,
} from "@/components/ui/Form";
import { usePhoneConsent, SmsConsentFieldset } from "@/components/ui/SmsConsent";
import { ISSUE_CATEGORIES } from "@/constants/issues";

export default function AskRandallPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №06 Ask Randall"
        number="Ask / VI"
        title="Join the conversation and Ask."
        intro="The strongest campaigns are built face to face. Join Randall Fryer at an upcoming community gathering, neighborhood meet-and-greet, volunteer event, or campaign forum. Hear directly from Randall, ask questions, and share what matters to you and your family."
        aside={
          <FormPanel label="Ask Randall a question">
            <AskForm />
          </FormPanel>
        }
      />
    </main>
  );
}

function AskForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const pc = usePhoneConsent();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: (data.get("name") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      phone: pc.phone,
      category: (data.get("category") || "").toString(),
      location: (data.get("location") || "").toString().trim(),
      subject: (data.get("subject") || "").toString().trim(),
      description: (data.get("description") || "").toString().trim(),
      sms_updates: pc.smsConsent,
      sms_promo: pc.promoConsent,
    };

    // Client-side validation before submission
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    if (!payload.name || !emailOk || !payload.subject || !payload.description) {
      setStatus("error");
      setErrorMsg(
        "Please add your name, a valid email, a subject, and your message."
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
      const res = await fetch("/api/ask", {
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
          Thanks Randall will see this.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-bone/80">
          Your message has reached the campaign directly. Thanks for taking
          the time to reach out.
        </p>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="a-name" name="name" label="Full name" required />
        <FormField
          id="a-email"
          name="email"
          label="Email"
          type="email"
          required
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          id="a-phone"
          name="phone"
          label="Phone"
          type="tel"
          optional
          value={pc.phone}
          onChange={pc.onPhoneChange}
          placeholder="+1 (503) 555-0123"
        />
        <FormField
          id="a-location"
          name="location"
          label="Town / neighborhood"
          optional
        />
      </div>
      <FormSelect
        id="a-category"
        name="category"
        label="Category"
        required
        options={ISSUE_CATEGORIES}
      />
      <FormField id="a-subject" name="subject" label="Subject" required />
      <FormTextarea
        id="a-description"
        name="description"
        label="Your question or message"
        required
        rows={6}
      />

      <SmsConsentFieldset {...pc} idPrefix="a-sms" />

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
          {submitting ? "Sending…" : "Send to Randall"}
        </Button>
      </div>

      <FormDisclaimer />
    </form>
  );
}
