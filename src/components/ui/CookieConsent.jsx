"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import Button from "@/components/ui/Button";
import {
  OPEN_SETTINGS_EVENT,
  getCookieConsent,
  setCookieConsent,
} from "@/lib/cookieConsent";

/**
 * CookieConsent — bottom "Your privacy choices" card.
 *
 * Built in the site's own editorial idiom (bone paper, dotted mono eyebrow,
 * hairline rule, serif headline) so it reads as campaign stationery rather than
 * a bolted-on widget. Shows on first visit; reopens via the footer "Cookie
 * Settings" link (OPEN_SETTINGS_EVENT). Choice persists in localStorage — see
 * lib/cookieConsent.js.
 *
 * Consent behavior: Accept/Decline record an explicit choice. Escape only
 * dismisses the card for now (no choice stored) so the visitor is asked again
 * on their next visit — never treated as implied consent.
 */
export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);

    // First visit → show the card if no choice has been recorded yet.
    // Deferred a frame so we don't setState synchronously inside the effect.
    const raf = requestAnimationFrame(() => {
      if (!getCookieConsent()) setOpen(true);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
    };
  }, []);

  // Escape dismisses without recording consent (asked again next visit).
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function choose(choice) {
    setCookieConsent(choice);
    setOpen(false);
  }

  const offset = reduceMotion ? 0 : 20;

  return (
    <AnimatePresence>
      {open && (
        <m.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          initial={{ opacity: 0, y: offset }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: offset }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-4 z-[100] sm:inset-x-auto sm:bottom-7 sm:left-7 sm:max-w-[25.5rem]"
        >
          <div className="rounded-card border border-ink/15 bg-bone/95 shadow-[0_28px_70px_-30px_rgba(13,21,40,0.4)] backdrop-blur-md">
            <div className="p-6 sm:p-7">
              <h2
                id="cookie-consent-title"
                className="display-serif text-[1.6rem] font-medium leading-[1.04] tracking-[-0.02em] text-ink"
              >
                Your privacy choices.
              </h2>

              <p
                id="cookie-consent-desc"
                className="mt-3.5 text-[13px] leading-relaxed text-ink/70"
              >
                We use essential technologies to run and secure this site. With
                your permission, we may also use analytics cookies to understand
                how the site is used. Read the details in our{" "}
                <Link
                  href="/privacy-policy"
                  className="link-underline font-medium text-signal-deep"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              <div className="mt-6 flex items-center gap-5">
                <Button
                  variant="primary"
                  size="sm"
                  className="whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
                  onClick={() => choose("analytics")}
                >
                  Accept analytics
                </Button>
                <button
                  type="button"
                  onClick={() => choose("essential")}
                  className="rounded-sm font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute underline decoration-transparent underline-offset-[5px] transition-colors duration-300 hover:text-ink hover:decoration-ink/50 focus-visible:text-ink focus-visible:decoration-ink/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bone"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
