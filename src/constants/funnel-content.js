// ---------------------------------------------------------------------------
// FUNNEL CONTENT — SINGLE SOURCE OF TRUTH
//
// ⚠️ EVERYTHING in this file is [DUMMY] placeholder copy. Swapping in the real
// lead-magnet content should require editing ONLY this file (plus renaming the
// src/app/free-guide/ folder if the slug changes — then also update
// FUNNEL_PATH_PREFIXES in src/components/ui/SiteChrome.jsx).
//
// Current dummy routes:
//   /free-guide             → lead magnet squeeze page
//   /free-guide/thank-you   → delivery / thank-you page
// ---------------------------------------------------------------------------

/** Route paths — keep in sync with the folder names under src/app/free-guide/. */
export const FUNNEL_ROUTES = {
  leadMagnet: "/free-guide",
  thankYou: "/free-guide/thank-you",
};

// ---------------------------------------------------------------------------
// 1. LEAD MAGNET (squeeze page)
// ---------------------------------------------------------------------------

export const LEAD_MAGNET = {
  // Internal name — travels in the webhook payload so the CRM knows which
  // lead magnet was requested.
  name: "[DUMMY] Free Guide",

  meta: {
    title: "[DUMMY] Free Guide",
    description:
      "[DUMMY] Get the free guide — a short, practical resource delivered straight to your inbox.",
  },

  hero: {
    eyebrow: "[DUMMY] Free download",
    headline: "[DUMMY] The headline that promises one clear outcome.",
    subheadline:
      "[DUMMY] A one-to-two sentence subheadline that expands on the promise, names the audience, and tells them exactly what they get when they sign up.",
    // Replace with the real cover / mockup image path (e.g. "/lead-magnet-cover.jpg").
    // Leave "" to render the built-in placeholder frame.
    coverImage: "",
    coverImageAlt: "[DUMMY] Mockup of the free guide cover",
    ctaLabel: "Get the free guide",
  },

  benefits: {
    label: "02 — What's inside",
    number: "Benefits / II",
    heading: "[DUMMY] What you'll get out of it.",
    items: [
      {
        title: "[DUMMY] Benefit one",
        body: "[DUMMY] One sentence on the concrete result the reader walks away with after the first section.",
      },
      {
        title: "[DUMMY] Benefit two",
        body: "[DUMMY] One sentence naming a specific pain point and how the guide removes it.",
      },
      {
        title: "[DUMMY] Benefit three",
        body: "[DUMMY] One sentence with a number or timeframe that makes the value feel tangible.",
      },
      {
        title: "[DUMMY] Benefit four",
        body: "[DUMMY] One sentence on the bonus, checklist, or template included at the end.",
      },
    ],
  },

  form: {
    label: "03 — Get the guide",
    number: "Opt-in / III",
    heading: "[DUMMY] Tell us where to send it.",
    body: "[DUMMY] Short reassurance line — no spam, unsubscribe anytime, the guide arrives in your inbox within a few minutes.",
    submitLabel: "Send me the guide",
    submittingLabel: "Sending…",
    errorMessage:
      "Something went wrong sending your request. Please try again in a moment.",
    validationMessage: "Please add your first name and a valid email.",
    consent: {
      helper: "Enter a phone number above to opt in to SMS messages.",
      smsLabel:
        "[DUMMY] I agree to receive SMS updates about this guide and related resources. Message frequency varies. Message & data rates may apply. Reply STOP to unsubscribe.",
      promoLabel:
        "[DUMMY] I agree to receive promotional SMS messages, including offers and announcements. Message frequency varies. Message & data rates may apply. Reply STOP to unsubscribe.",
    },
  },

  socialProof: {
    label: "04 — What readers say",
    number: "Proof / IV",
    heading: "[DUMMY] Trusted by people like you.",
    testimonials: [
      {
        quote:
          "[DUMMY] “A short testimonial quote that speaks to the specific result the lead magnet delivers.”",
        name: "[DUMMY] Jordan A.",
        detail: "[DUMMY] Small-business owner",
      },
      {
        quote:
          "[DUMMY] “A second quote focused on how easy or fast the resource was to put into practice.”",
        name: "[DUMMY] Casey B.",
        detail: "[DUMMY] Parent of two",
      },
      {
        quote:
          "[DUMMY] “A third quote that handles a common objection — skeptical at first, glad they signed up.”",
        name: "[DUMMY] Riley C.",
        detail: "[DUMMY] Longtime resident",
      },
    ],
  },

  finalCta: {
    label: "05 — Last call",
    number: "CTA / V",
    heading: "[DUMMY] Ready when you are.",
    body: "[DUMMY] One last nudge repeating the promise in a single sentence.",
    buttonLabel: "Get the free guide",
  },
};

// ---------------------------------------------------------------------------
// 2. THANK-YOU / DELIVERY PAGE
// ---------------------------------------------------------------------------

export const THANK_YOU = {
  meta: {
    title: "[DUMMY] You're in — check your email",
    description: "[DUMMY] Your free guide is on its way to your inbox.",
  },

  eyebrow: "[DUMMY] Request received",
  headline: "[DUMMY] You're in — check your email.",
  body: "[DUMMY] Your guide is on its way and should land in your inbox within a few minutes. If you don't see it, check your spam or promotions folder and mark us as a safe sender.",

  download: {
    heading: "[DUMMY] Prefer to grab it now?",
    body: "[DUMMY] One line offering the instant-access alternative to waiting for the email.",
    buttonLabel: "Download the guide",
    // Replace with the real hosted asset URL (PDF, drive link, etc.).
    url: "#dummy-download-link",
  },

  upsell: {
    label: "02 — One more thing",
    number: "Next step / II",
    eyebrow: "[DUMMY] While you're here",
    heading: "[DUMMY] A short teaser headline for the next-step offer.",
    body: "[DUMMY] Two sentences that bridge from the freebie to the offer — the guide gets you started, the offer gets it done. Curiosity, not a hard sell.",
    buttonLabel: "See the offer",
    // Replace with the real offer / checkout URL when the offer page exists.
    url: "#dummy-offer-link",
  },
};
