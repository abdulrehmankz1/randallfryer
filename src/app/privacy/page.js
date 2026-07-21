import LegalPage from "@/sections/pages/LegalPage";

export const metadata = {
  title: "Privacy",
  description: "How Randall Fryer For Representative handles your information.",
};

const SECTIONS = [
  {
    id: "what-we-collect",
    title: "What we collect",
    body: [
      "When you submit a form on randallfororegon.com — volunteering, donating, asking a question, or signing up for the briefing — we collect only what the form asks for. Common fields include your name, email, zip code, phone number, and the message you sent us.",
      "Donation forms additionally collect employer and occupation as required by federal law.",
      "Like most websites, our hosting provider logs the IP address, browser, and pages requested for security and analytics. These logs are retained for 30 days, then deleted.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    body: [
      "To respond to you, to coordinate volunteer shifts, to send the weekly briefing if you opted in, and to process donations.",
      "We never sell, rent, or trade your information with any outside party for marketing purposes. The Federal Election Commission requires that donor names, addresses, and employers above the disclosure threshold be reported publicly — that legal disclosure is the only place your details appear outside of our staff.",
    ],
  },
  {
    id: "sms-text-messaging",
    title: "Text messaging (SMS)",
    body: [
      "We collect phone numbers only through our website forms (contact, volunteer, event RSVP, and Ask Randall), and only when you choose to provide one. Phone numbers are used to reach you about the campaign and, if you separately opt in, to send SMS text messages.",
      "Text messaging is opt-in and optional. Two separate consent options are offered: one for informational updates (campaign updates, event reminders, and volunteer coordination) and one for promotional messages (fundraising requests, donation drives, and special promotions). You may opt into either, both, or neither, and consent is never pre-checked or required to use the site.",
      "Message frequency varies, and message and data rates may apply. You can cancel SMS at any time by replying STOP, and reply HELP for assistance. Opt-out requests are honored within 10 business days.",
      "We retain your phone number and consent records only as long as needed to operate the campaign and to document consent as required by law. To request deletion of your phone number, consent records, or other personal information, email Randall@randallfororegon.com.",
      "We will not share or sell your text messaging opt-in data, consent, or related personal information with any third parties, unless required by law.",
    ],
  },
  {
    id: "email",
    title: "Email",
    body: [
      "We send email only to people who provide an address. Email newsletters include an unsubscribe link at the bottom of every send, and we honor unsubscribe requests within 24 hours.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: [
      "We use first-party cookies to remember your session and a privacy-focused analytics tool to count page views. We do not use cross-site tracking pixels or behavioral advertising.",
      "You can disable cookies in your browser settings without affecting your ability to use the site, except for the donation form which requires session storage to prevent duplicate submissions.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      "You can request a copy of any information we hold about you, ask us to delete it, or correct anything that is wrong. Email Randall@randallfororegon.com and we will respond within 30 days.",
      "If your donation is publicly disclosed under FEC rules, we cannot remove the public disclosure — but we can confirm exactly what was reported and when.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      "Questions about this notice can be sent to Randall@randallfororegon.com or to: Randall Fryer For Representative, [PLACEHOLDER — mailing address].",
    ],
  },
];

export default function Page() {
  return (
    <LegalPage
      eyebrow="File №11 — Privacy"
      number="Legal / XI"
      title="Privacy notice."
      updated="April 12, 2026"
      intro="Randall Fryer For Representative collects the minimum information needed to run a campaign, never sells what we collect, and follows federal disclosure rules for donations only where required by law."
      sections={SECTIONS}
    />
  );
}
