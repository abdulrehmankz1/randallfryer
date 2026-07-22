import LegalPage from "@/sections/pages/LegalPage";
import { LEGAL_BUSINESS_NAME, CONTACT_ADDRESS } from "@/constants/site";

export const metadata = {
  title: "Terms",
  description: "Terms of use for randallfororegon.com.",
};

const SECTIONS = [
  {
    id: "scope",
    title: "Who these terms cover",
    body: [
      "These terms apply to randallfororegon.com and every interaction you have with the campaign through it — submitting a form, signing up, donating, or simply reading.",
      "If you do not agree with these terms, please do not use the site.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: [
      "You agree not to submit content that is unlawful, threatening, harassing, defamatory, or that impersonates someone else.",
      "Automated scraping of donor names, volunteer details, or other personal information is prohibited.",
    ],
  },
  {
    id: "sms-messaging",
    title: "Text messaging program",
    body: [
      "Program and messages: When you opt in through a form on this site, you may receive SMS text messages from Randall Fryer For Representative. Informational messages include campaign updates, event reminders, and volunteer coordination; promotional messages include fundraising requests, donation drives, and special promotions. Consent to receive text messages is not a condition of any purchase or donation.",
      "Opt out: You can cancel the SMS service at any time. Simply text STOP to the number that messages you, and you will no longer receive SMS messages from us.",
      "Help: If you experience any issues with the messaging program, reply with the keyword HELP for more assistance, or reach out directly to us at Randall@randallfororegon.com.",
      "Carriers are not liable for delayed or undelivered messages.",
      "As always, message and data rates may apply for messages sent to you from us and to us from you. Message frequency varies.",
      "For privacy-related inquiries, please refer to our Privacy Policy at randallfororegon.com/privacy.",
    ],
  },
  {
    id: "donations",
    title: "Donations",
    body: [
      "All donations are subject to federal contribution limits. You confirm that you are a U.S. citizen or lawfully admitted permanent resident, that the funds are your own, and that you are not a federal contractor or foreign national.",
      "Donations are non-refundable except in cases of fraud or error. To request a refund, email Randall@randallfororegon.com within 30 days of the contribution.",
      "Political contributions are not tax-deductible.",
    ],
  },
  {
    id: "content",
    title: "Content & accuracy",
    body: [
      "We do our best to keep policy briefs, event dates, and platform pages accurate and current. Mistakes happen — if you spot one, let us know at Randall@randallfororegon.com and we will fix it on the record.",
      "Quoted endorsements have been approved by the named endorser at the time of publication. If you are an endorser and would like your name removed, email us and we will do so within five business days.",
    ],
  },
  {
    id: "links",
    title: "Outbound links",
    body: [
      "When we link to outside resources — news articles, public records, partner organizations — we are not responsible for their content or how they handle your data.",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    body: [
      "We may update these terms from time to time. Material changes will be announced at the top of the page and emailed to subscribers. The last-updated date appears in the sidebar.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      `Questions about these terms can be sent to Randall@randallfororegon.com or to: ${LEGAL_BUSINESS_NAME}, ${CONTACT_ADDRESS}.`,
    ],
  },
];

export default function Page() {
  return (
    <LegalPage
      eyebrow="File №12 — Terms"
      number="Legal / XII"
      title="Terms of use."
      updated="April 12, 2026"
      intro="Plain-English rules for using randallfororegon.com — what you agree to, how donations work, and how we handle mistakes."
      sections={SECTIONS}
    />
  );
}
