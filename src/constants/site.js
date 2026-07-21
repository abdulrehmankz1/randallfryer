// Site-wide identity, contact, and external-link constants.
// Single source of truth for A2P / TCR compliance-critical values — the SAME
// legal business name and contact details must appear in the footer, Contact
// page, Privacy Policy, Terms of Service, and SMS consent language.

// Legal business name — must match the committee's CP 575 (IRS EIN letter) and
// the A2P 10DLC registration EXACTLY. Verify before submitting registration.
export const LEGAL_BUSINESS_NAME = "Randall Fryer For Representative";

// ⚠️ A2P LAUNCH BLOCKER — replace these placeholders with the campaign's real,
// verifiable contact details before submitting A2P 10DLC registration. Carriers
// verify a working (non-VoIP) phone, a directly-contactable email, and a mailing
// address, and they must match what is submitted during registration.
export const CONTACT_PHONE = "[ADD BUSINESS PHONE]"; // e.g. "(503) 555-0100"
export const CONTACT_PHONE_HREF = ""; // e.g. "tel:+15035550100" — leave "" until set
// Business email assigned by Op1776.
export const CONTACT_EMAIL = "Randall@randallfororegon.com";
export const CONTACT_ADDRESS = "[ADD MAILING ADDRESS]"; // e.g. "PO Box 123, City, OR 97000"

// Donations are handled off-site by WinRed — there is no on-site donate page.
export const DONATE_URL =
  "https://secure.winred.com/randall-fryer-for-representative/donate-today";
