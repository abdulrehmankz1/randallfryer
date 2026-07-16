// Server-only GHL (GoHighLevel) webhook configuration.
//
// Forms POST to a local API route; the route forwards a flat payload to a GHL
// workflow webhook trigger URL. See the campaign rule guide
// (ghl-forms-webhooks.md) for the full field/payload contract.
//
// ⚠️ LAUNCH BLOCKER: the default location hook + workflow UUIDs below come from
// the shared Op1776 rule guide and currently point at a DIFFERENT campaign's GHL
// account. Override them with Randall Fryer's own workflow webhook URLs via the
// env vars noted per helper before any form goes live, or submissions land in
// the wrong CRM.

const GHL_LOCATION_HOOK = process.env.GHL_LOCATION_HOOK || "HK7KWJYbw33yisOBMGEO";

const WEBHOOK_BASE = `https://services.leadconnectorhq.com/hooks/${GHL_LOCATION_HOOK}/webhook-trigger`;

const hook = (uuid) => `${WEBHOOK_BASE}/${uuid}`;

/**
 * Contact form workflow webhook.
 * Override with GHL_HOOK_CONTACT (full URL) or GHL_CONTACT_UUID (workflow UUID).
 */
export function getContactWebhookUrl() {
  if (process.env.GHL_HOOK_CONTACT) return process.env.GHL_HOOK_CONTACT;
  return hook(process.env.GHL_CONTACT_UUID || "cf2eced9-14ad-4109-ba4f-fd244858af10");
}

/**
 * Volunteer signup workflow webhooks — THREE parallel triggers.
 * Override the whole set with GHL_HOOK_VOLUNTEER (comma-separated full URLs) or
 * individual UUIDs with GHL_VOLUNTEER_UUID_1/2/3.
 */
export function getVolunteerWebhookUrls() {
  if (process.env.GHL_HOOK_VOLUNTEER) {
    return process.env.GHL_HOOK_VOLUNTEER.split(",").map((u) => u.trim()).filter(Boolean);
  }
  return [
    process.env.GHL_VOLUNTEER_UUID_1 || "23834100-4e00-4579-82e7-f9ec69ed8542",
    process.env.GHL_VOLUNTEER_UUID_2 || "df947411-0c7e-4a6c-8c2e-7f20291c333f",
    process.env.GHL_VOLUNTEER_UUID_3 || "19e7758c-f5c5-44fa-a770-5c18cefa0645",
  ].map(hook);
}

/**
 * Issue Report ("Ask Randall") workflow webhook.
 * Override with GHL_HOOK_ISSUE (full URL) or GHL_ISSUE_UUID (workflow UUID only).
 */
export function getIssueWebhookUrl() {
  if (process.env.GHL_HOOK_ISSUE) return process.env.GHL_HOOK_ISSUE;
  return hook(process.env.GHL_ISSUE_UUID || "3c2d23be-00aa-49d5-9d14-6597d2e93123");
}

/**
 * Event RSVP workflow webhook.
 * Override with GHL_HOOK_RSVP (full URL) or GHL_RSVP_UUID (workflow UUID only).
 */
export function getRsvpWebhookUrl() {
  if (process.env.GHL_HOOK_RSVP) return process.env.GHL_HOOK_RSVP;
  return hook(process.env.GHL_RSVP_UUID || "b8b53720-18c4-4cde-9db9-c549de6264ee");
}

/**
 * Compliance / consent webhook — a single URL shared across ALL four forms
 * (Contact, Volunteer, RSVP, Ask). Appended to each route's WEBHOOK_URLS array
 * so every submission also drives the consent/subscription workflow.
 * See forms-compliance-pattern.md §1.
 *
 * ⚠️ LAUNCH BLOCKER: no real UUID was provided — the placeholder below is NOT a
 * live workflow. Set GHL_HOOK_COMPLIANCE (full URL) or GHL_COMPLIANCE_UUID
 * before launch, or compliance fan-out silently no-ops.
 */
export function getComplianceWebhookUrl() {
  if (process.env.GHL_HOOK_COMPLIANCE) return process.env.GHL_HOOK_COMPLIANCE;
  return hook(
    process.env.GHL_COMPLIANCE_UUID ||
      "00000000-0000-0000-0000-000000000000" // placeholder — replace before launch
  );
}

/** POST a JSON payload to a GHL webhook trigger URL. Returns the fetch Response. */
export async function forwardToGhl(url, payload) {
  return fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

// ---------------------------------------------------------------------------
// RSVP extended flow — GHL REST API (contact search + calendar appointment).
//
// This runs AFTER the RSVP webhook. It is best-effort: if the REST credentials
// (GHL_API_KEY + GHL_LOCATION_ID) are not configured, it is skipped and the
// RSVP still succeeds via the webhook. See ghl-forms-webhooks.md §4.

const GHL_REST_BASE = "https://services.leadconnectorhq.com";
// LeadConnector v2 pins the API version per resource family.
const GHL_CONTACTS_VERSION = "2021-07-28";
const GHL_CALENDARS_VERSION = "2021-04-15";
// Campaign events calendar in GHL — do not change unless the calendar is recreated.
const RSVP_CALENDAR_ID = process.env.GHL_RSVP_CALENDAR_ID || "UTM5EkrGwiZjQyc19WGN";

function restHeaders(version) {
  return {
    Authorization: `Bearer ${process.env.GHL_API_KEY}`,
    Version: version,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

/** True when REST credentials are present, so the appointment flow can run. */
export function ghlRestConfigured() {
  return Boolean(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID);
}

/**
 * Best-effort: after an RSVP webhook, look up the (upserted) contact by email
 * and create a confirmed calendar appointment for the event. Returns the GHL
 * contactId on success, or null if the flow could not complete.
 */
export async function createRsvpAppointment({ email, eventName, startTime, endTime }) {
  if (!ghlRestConfigured()) return null;
  const locationId = process.env.GHL_LOCATION_ID;

  try {
    // 1. Give the GHL workflow a moment to create/upsert the contact.
    await new Promise((r) => setTimeout(r, 2000));

    // 2. Search for the contact by email.
    const searchUrl = `${GHL_REST_BASE}/contacts/search/duplicate?locationId=${encodeURIComponent(
      locationId
    )}&email=${encodeURIComponent(email)}`;
    const searchRes = await fetch(searchUrl, {
      headers: restHeaders(GHL_CONTACTS_VERSION),
    });
    if (!searchRes.ok) return null;
    const searchData = await searchRes.json();
    const contactId = searchData?.contact?.id || searchData?.id || null;
    if (!contactId) return null;

    // 3. Create the appointment.
    const apptRes = await fetch(`${GHL_REST_BASE}/calendars/events/appointments`, {
      method: "POST",
      headers: restHeaders(GHL_CALENDARS_VERSION),
      body: JSON.stringify({
        calendarId: RSVP_CALENDAR_ID,
        locationId,
        contactId,
        title: `RSVP: ${eventName}`,
        appointmentStatus: "confirmed",
        startTime,
        endTime,
        timezone: "America/Los_Angeles",
        notes: "RSVP submitted via campaign website",
      }),
    });
    if (!apptRes.ok) return contactId; // contact found even if appt failed
    return contactId;
  } catch {
    return null;
  }
}
