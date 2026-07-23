"use client";

// Lead-magnet opt-in form — funnel step 1.
// Phone is OPTIONAL and live-formats to "+1 (xxx) xxx-xxxx" (we own the +1).
// Consent checkboxes are phone-gated: disabled while phone is empty, required
// once a phone is entered, and auto-cleared when the phone is emptied
// (forms-compliance-pattern.md §2–§3). On success, redirects to the thank-you
// page only after the API responds OK.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPhoneInput } from "@/lib/phone";
import { FormField, FormCheckbox, FormFieldset, FormDisclaimer } from "@/components/ui/Form";
import Button from "@/components/ui/Button";
import { LEAD_MAGNET, FUNNEL_ROUTES } from "@/constants/funnel-content";

const { form } = LEAD_MAGNET;

export default function LmOptinForm() {
  const router = useRouter();
  const [status, setStatus] = useState("idle"); // idle | submitting | error
  const [errorMsg, setErrorMsg] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [promoConsent, setPromoConsent] = useState(false);

  const hasPhone = phone.trim().length > 0;

  // Never ship stale consent: clear both flags whenever the phone is emptied.
  useEffect(() => {
    if (!hasPhone) {
      setSmsConsent(false);
      setPromoConsent(false);
    }
  }, [hasPhone]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const data = new FormData(e.currentTarget);
    const payload = {
      firstName: (data.get("firstName") || "").toString().trim(),
      lastName: (data.get("lastName") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      phone,
      // Consent flags travel as 'Yes' / 'No' strings.
      sms_updates: smsConsent ? "Yes" : "No",
      sms_promo: promoConsent ? "Yes" : "No",
    };

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    if (!payload.firstName || !emailOk) {
      setStatus("error");
      setErrorMsg(form.validationMessage);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/lm-optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      // Redirect only after the API confirms delivery (funnel step 2).
      router.push(FUNNEL_ROUTES.thankYou);
    } catch (error) {
      console.error("[LmOptinForm]:", error);
      setStatus("error");
      setErrorMsg(form.errorMessage);
    }
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="lm-first" name="firstName" label="First name" required />
        <FormField id="lm-last" name="lastName" label="Last name" optional />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="lm-email" name="email" label="Email" type="email" required />
        <FormField
          id="lm-phone"
          name="phone"
          label="Phone"
          type="tel"
          optional
          value={phone}
          onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
          placeholder="+1 (503) 555-0123"
        />
      </div>

      {/* Phone-gated consent — disabled without a phone, required with one */}
      <FormFieldset legend="Text message consent">
        {!hasPhone && (
          <p className="text-xs italic text-ink/50">{form.consent.helper}</p>
        )}
        <FormCheckbox
          id="lm-sms-updates"
          name="sms_updates"
          checked={smsConsent}
          onChange={(e) => setSmsConsent(e.target.checked)}
          disabled={!hasPhone}
          required={hasPhone}
          label={form.consent.smsLabel}
        />
        <FormCheckbox
          id="lm-sms-promo"
          name="sms_promo"
          checked={promoConsent}
          onChange={(e) => setPromoConsent(e.target.checked)}
          disabled={!hasPhone}
          required={hasPhone}
          label={form.consent.promoLabel}
        />
      </FormFieldset>

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
          {submitting ? form.submittingLabel : form.submitLabel}
        </Button>
      </div>

      <FormDisclaimer />
    </form>
  );
}
