import LegalPage from "@/sections/pages/LegalPage";
import {
  LEGAL_BUSINESS_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "@/constants/site";

export const metadata = {
  title: "Privacy Policy",
  description: "How Randall Fryer For Representative handles your information.",
};

// Shared bullet-list renderer so lists match the legal page's prose rhythm.
function List({ items }) {
  return (
    <ul className="ml-1 flex flex-col gap-2.5">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span aria-hidden className="mt-[0.55em] h-[5px] w-[5px] flex-none rounded-full bg-signal" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

const SECTIONS = [
  {
    id: "what-we-collect",
    title: "What we collect",
    body: [
      "When you submit a form on randallfororegon.com to volunteer, donate, ask a question, or sign up for the briefing, we collect only what the form asks for. Common fields include your name, email, zip code, phone number, and the message you sent us.",
      "When you provide a mobile number or select an SMS consent option, we may also collect the date and time of consent, the form or webpage through which consent was provided, the consent language displayed at that time, the category of messages authorized, the IP address associated with the submission, and records of opt-out or help requests. We maintain these records to administer the messaging program and document consent.",
      "Contribution forms may collect information required by applicable Oregon campaign-finance laws, reporting requirements, payment processors, and campaign-compliance procedures, including a contributor’s name, address, occupation, employer, contribution amount, and payment information where applicable.",
      "Like most websites, our hosting provider logs the IP address, browser, and pages requested for security and analytics. These logs are retained for 30 days, then deleted.",
    ],
  },
  {
    id: "how-we-use-it",
    title: "How we use your information",
    body: [
      "We use personal information to:",
      <List
        key="use-list"
        items={[
          "Respond to questions and requests",
          "Coordinate volunteer activities",
          "Register attendees and send event-related information",
          "Send email updates when requested",
          "Send informational SMS messages when separately authorized",
          "Send fundraising or promotional SMS messages when separately authorized",
          "Process contributions",
          "Maintain security and prevent fraudulent or duplicate submissions",
          "Document consent and process opt-out requests",
          "Comply with applicable campaign-finance, tax, recordkeeping, and other legal obligations",
        ]}
      />,
      "We do not sell or rent personal information. We may disclose limited information to service providers that help us operate the website, send authorized communications, process contributions, maintain campaign records, provide security, or comply with legal obligations. These providers may use the information only to perform services for the campaign or as otherwise permitted by law.",
      "Applicable Oregon campaign-finance laws may require certain contribution and contributor information to be reported to government agencies and made publicly available. We disclose such information only as required by law.",
    ],
  },
  {
    id: "sms-text-messaging",
    title: "Text messaging (SMS)",
    body: [
      "We collect mobile phone numbers through campaign forms, including Contact, Volunteer, Event RSVP, Ask Randall, and other forms that clearly include a mobile phone field. Providing a phone number is optional unless a particular form clearly states that it is required for a specific non-marketing purpose.",
      "Providing a phone number by itself does not authorize SMS messages. When SMS messaging is offered, users are presented with two separate, optional consent choices:",
      <p key="sms-informational">
        <strong className="font-semibold text-ink">Informational messages:</strong> campaign
        updates, event reminders, volunteer coordination, responses to inquiries, and similar
        campaign information.
      </p>,
      <p key="sms-promotional">
        <strong className="font-semibold text-ink">Promotional messages:</strong> fundraising
        requests, donation appeals, campaign promotions, and special announcements.
      </p>,
      "You may opt into either category, both categories, or neither category. SMS consent boxes are not preselected, and consent is not required to make a contribution, volunteer, attend an event, receive information, or otherwise use the website.",
      `Message frequency varies. Message and data rates may apply. Reply STOP to unsubscribe or HELP for assistance. You may also contact ${LEGAL_BUSINESS_NAME} at ${CONTACT_EMAIL} or ${CONTACT_PHONE}.`,
      "Opt-out requests are honored as soon as reasonably practicable and no later than the period required by applicable law. A final non-promotional confirmation message may be sent after an opt-out request.",
      `We retain mobile phone numbers, consent records, message records, and opt-out records only for as long as reasonably necessary to operate the messaging program, honor communication preferences, document consent, resolve disputes, and comply with legal obligations. To request access, correction, or deletion, email ${CONTACT_EMAIL}.`,
      <p key="sms-noshare">
        <strong className="font-semibold text-ink">
          We will not share or sell your text messaging opt-in data, consent, or related personal
          information with any third parties, unless required by law.
        </strong>
      </p>,
      `SMS opt-in information will not be shared with third parties or affiliates for their own marketing or promotional purposes. We may provide limited SMS-related information to service providers that help operate the messaging program solely on behalf of ${LEGAL_BUSINESS_NAME}.`,
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
      `${LEGAL_BUSINESS_NAME} may use cookies, local storage, session storage, server logs, and similar technologies to operate and secure the website.`,
      "Essential technologies may be used for website security, form functionality, fraud prevention, donation processing, remembering privacy preferences, and preventing duplicate submissions.",
      "With your permission, we may use optional analytics technologies to understand general website activity, including pages visited, referral sources, device information, and website performance. Optional analytics and advertising technologies, when used, are disabled until the visitor provides the applicable consent through our cookie banner.",
      "You may accept or reject optional technologies and may change your selection at any time through the Cookie Settings link in the website footer. Restricting optional cookies will not prevent ordinary use of the website. Disabling essential browser storage may affect forms, contribution processing, or other website functions.",
      "We do not use SMS opt-in information or SMS consent records for cross-site behavioral advertising.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      `You can request a copy of any information we hold about you, ask us to delete it, or correct anything that is wrong. Email ${CONTACT_EMAIL} and we will respond within 30 days.`,
      "If contribution information has been disclosed in a legally required Oregon campaign-finance filing or other public record, we may not be able to remove it from the government record. We can, however, help identify what information was submitted and direct you to the appropriate correction process.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      `Questions about this notice can be sent to ${CONTACT_EMAIL} or to: ${LEGAL_BUSINESS_NAME}, ${CONTACT_ADDRESS}.`,
    ],
  },
];

export default function Page() {
  return (
    <LegalPage
      eyebrow="File №11 · Privacy"
      number="Legal / XI"
      title="Privacy notice."
      updated="July 23, 2026"
      intro="Randall Fryer For Representative collects the minimum information necessary to run the campaign, communicate with supporters, coordinate volunteers, organize events, and process contributions. We do not sell personal information, and we follow applicable Oregon campaign-finance disclosure rules only where required by law."
      sections={SECTIONS}
    />
  );
}
