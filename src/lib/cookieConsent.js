// Cookie-consent shared contract — used by the CookieConsent banner and the
// footer "Cookie Settings" trigger so they stay in sync.
//
// The site currently ships no analytics scripts. This records the visitor's
// choice (and broadcasts it) so that if optional analytics are added later,
// they can gate on `getCookieConsent() === "analytics"` and on the
// CONSENT_CHANGE_EVENT — keeping the Privacy Policy's promise that optional
// technologies stay disabled until the visitor consents.

export const CONSENT_STORAGE_KEY = "rf-cookie-consent";

// Fired on the window by the footer link to (re)open the banner.
export const OPEN_SETTINGS_EVENT = "rf:open-cookie-settings";

// Fired on the window whenever a choice is saved: detail = { choice }.
export const CONSENT_CHANGE_EVENT = "rf:cookie-consent";

// "analytics" = optional analytics allowed · "essential" = essential only
export function getCookieConsent() {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setCookieConsent(choice) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    /* storage unavailable — treated as essential-only for this session */
  }
  window.dispatchEvent(
    new CustomEvent(CONSENT_CHANGE_EVENT, { detail: { choice } })
  );
}

export function openCookieSettings() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
