"use client";

// Shared phone-gated SMS-consent logic, per forms-compliance-pattern.md §2–§3.
// Every in-scope form (Contact, Volunteer, RSVP, Ask) uses these so the phone
// formatting + consent enable/require/reset mechanics stay identical.

import { useEffect, useState } from "react";
import { formatPhoneInput } from "@/lib/phone";
import { FormCheckbox, FormFieldset } from "@/components/ui/Form";
import { SMS_UPDATES_CONSENT, SMS_PROMO_CONSENT } from "@/constants/consent";

/**
 * Manages the phone field value (auto-formatted) plus the two consent flags.
 * Consent auto-clears whenever the phone is emptied, and `consentError`
 * surfaces the "you entered a phone, now confirm consent" guard for submit.
 */
export function usePhoneConsent() {
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [promoConsent, setPromoConsent] = useState(false);

  const hasPhone = phone.trim().length > 0;

  useEffect(() => {
    if (!hasPhone) {
      setSmsConsent(false);
      setPromoConsent(false);
    }
  }, [hasPhone]);

  const onPhoneChange = (e) => setPhone(formatPhoneInput(e.target.value));

  // SMS consent is opt-in and OPTIONAL — each box is an independent choice, so a
  // user may submit a phone number without opting in, or opt into updates but
  // not promotional messages (A2P SOP items 9-11 + TCPA separate-consent rule).
  // Never force or pre-check consent; kept for the forms' existing API shape.
  const consentError = null;

  return {
    phone,
    onPhoneChange,
    hasPhone,
    smsConsent,
    setSmsConsent,
    promoConsent,
    setPromoConsent,
    consentError,
  };
}

/** The two consent checkboxes + disabled-state helper line. */
export function SmsConsentFieldset({
  hasPhone,
  smsConsent,
  setSmsConsent,
  promoConsent,
  setPromoConsent,
  idPrefix = "sms",
}) {
  return (
    <FormFieldset
      legend="Text message consent (optional)"
      hint="These are optional. Check them only if you would like to receive texts each is a separate choice, and you can reply STOP to opt out at any time."
    >
      {!hasPhone && (
        <p className="text-xs italic text-ink/50">
          Enter a phone number above to opt in to SMS messages.
        </p>
      )}
      <FormCheckbox
        id={`${idPrefix}-updates`}
        name="sms_updates"
        checked={smsConsent}
        onChange={(e) => setSmsConsent(e.target.checked)}
        disabled={!hasPhone}
        label={SMS_UPDATES_CONSENT}
      />
      <FormCheckbox
        id={`${idPrefix}-promo`}
        name="sms_promo"
        checked={promoConsent}
        onChange={(e) => setPromoConsent(e.target.checked)}
        disabled={!hasPhone}
        label={SMS_PROMO_CONSENT}
      />
    </FormFieldset>
  );
}
