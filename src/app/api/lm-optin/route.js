import { normalizePhoneForSubmit } from "@/lib/phone";
import { LEAD_MAGNET } from "@/constants/funnel-content";

// POST /api/lm-optin — lead-magnet opt-in form (funnel step 1).
// Fans out the SAME payload to two webhooks in parallel
// (forms-compliance-pattern.md §1): the primary lead-magnet workflow webhook
// + the shared compliance webhook. Returns 502 ONLY when every webhook fails;
// a partial failure still returns 200.
//
// ⚠️ [DUMMY] placeholder URLs — paste the real GHL webhook-trigger URLs here.
const WEBHOOK_URLS = [
  // 1. Primary lead-magnet workflow webhook (delivers the guide + nurture)
  "https://services.leadconnectorhq.com/hooks/REPLACE_LOCATION_ID/webhook-trigger/REPLACE_PRIMARY_LM_WORKFLOW_ID",
  // 2. Shared compliance / consent webhook (same URL as the other forms)
  "https://services.leadconnectorhq.com/hooks/REPLACE_LOCATION_ID/webhook-trigger/REPLACE_COMPLIANCE_WORKFLOW_ID",
];

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

  // Server-side validation: firstName and email required. Phone stays
  // optional and is NEVER required — a submission without it must succeed.
  if (!firstName || !email) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const payload = {
    type: "Lead_Magnet_Optin",
    lead_magnet: LEAD_MAGNET.name,
    firstName,
    lastName,
    email,
    // Defensive re-normalization — never trust the inbound string
    // (forms-compliance-pattern.md §2). Partial numbers become "".
    phone: normalizePhoneForSubmit(body.phone),
    // Consent flags travel as 'Yes' / 'No' strings.
    sms_updates: body.sms_updates === "Yes" ? "Yes" : "No",
    sms_promo: body.sms_promo === "Yes" ? "Yes" : "No",
    source: "src_lead_magnet",
    submitted_at: new Date().toISOString(),
  };

  try {
    const results = await Promise.all(
      WEBHOOK_URLS.map((url) =>
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }).catch((err) => {
          console.error("[LmOptin API] webhook error:", err);
          return { ok: false };
        })
      )
    );
    if (!results.some((r) => r.ok)) {
      return Response.json({ error: "Webhook delivery failed" }, { status: 502 });
    }
    return Response.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[LmOptin API]:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
