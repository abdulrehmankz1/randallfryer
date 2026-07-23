import {
  getVolunteerWebhookUrls,
  getComplianceWebhookUrl,
  forwardToGhl,
} from "@/lib/ghl";
import { normalizePhoneForSubmit } from "@/lib/phone";

// POST /api/volunteer — Volunteer signup (GHL Volunteer_Form workflow).
// Fans out to the primary workflow webhook + the shared compliance webhook
// (forms-compliance-pattern.md §1). Payload per ghl-forms-webhooks.md §2.
const WEBHOOK_URLS = [...getVolunteerWebhookUrls(), getComplianceWebhookUrl()];

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();
  const email = (body.email || "").trim();

  // Server-side validation: firstName, lastName, email required.
  if (!firstName || !lastName || !email) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  // helpOptions is sent as a comma-separated string (GHL prefers flat strings).
  const helpOptions = Array.isArray(body.helpOptions)
    ? body.helpOptions.join(", ")
    : (body.helpOptions || "").toString();

  const str = (v) => (v || "").toString().trim();

  const payload = {
    type: "Volunteer_Form",
    firstName,
    lastName,
    email,
    phone: normalizePhoneForSubmit(body.phone),
    address: str(body.address),
    city: str(body.city),
    zipCode: str(body.zipCode),
    county: str(body.county),
    region: str(body.region),
    registeredVoter: str(body.registeredVoter),
    campaignExperience: str(body.campaignExperience),
    helpOptions,
    availability: str(body.availability),
    issues: str(body.issues),
    anythingElse: str(body.anythingElse),
    sms_updates: body.sms_updates ? "Yes" : "No",
    sms_promo: body.sms_promo ? "Yes" : "No",
    source: "src_volunteer",
    submitted_at: new Date().toISOString(),
  };

  try {
    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        forwardToGhl(url, payload).catch((err) => {
          console.error("[Volunteer API] webhook error:", err);
          return { ok: false };
        })
      )
    );
    if (!results.some((r) => r.ok)) {
      return Response.json({ error: "Webhook delivery failed" }, { status: 502 });
    }
    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Volunteer submission failed:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
