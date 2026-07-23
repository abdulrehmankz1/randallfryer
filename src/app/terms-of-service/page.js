import Link from "next/link";
import LegalPage from "@/sections/pages/LegalPage";
import {
  LEGAL_BUSINESS_NAME,
  CONTACT_ADDRESS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "@/constants/site";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of service for randallfororegon.com.",
};

// Sub-headed block, used inside the text-messaging section.
function Titled({ heading, children }) {
  return (
    <div>
      <h3 className="display-serif text-[1.15rem] font-medium leading-tight text-ink">
        {heading}
      </h3>
      <div className="mt-2 flex flex-col gap-3">{children}</div>
    </div>
  );
}

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
    id: "scope",
    title: "Who these terms cover",
    body: [
      "These Terms of Service apply to randallfororegon.com and all services, forms, communications, and campaign activities made available through this website.",
      "By accessing or using the website, submitting any form, making a contribution, registering for an event, volunteering, subscribing to communications, or otherwise interacting with Randall Fryer for Representative through this website, you agree to these Terms.",
      "If you do not agree to these Terms, please do not use this website.",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    body: [
      "You agree not to submit content that is unlawful, threatening, harassing, defamatory, or that impersonates someone else.",
      "Automated scraping of donor names, volunteer details, or other personal information is prohibited.",
      "You also agree not to interfere with the security or operation of the website, attempt unauthorized access to campaign systems, distribute malicious software, submit fraudulent information, or use the website in any manner that violates applicable law.",
    ],
  },
  {
    id: "sms-messaging",
    title: "Text messaging program",
    body: [
      <Titled key="program" heading="Program description">
        <p>
          When you voluntarily provide your mobile phone number through an eligible form on this
          website and separately opt in to receive SMS messages, {LEGAL_BUSINESS_NAME} may send
          text messages relating to the campaign.
        </p>
        <p>Informational SMS messages may include:</p>
        <List
          items={[
            "Campaign updates",
            "Event reminders",
            "Volunteer coordination",
            "Responses to campaign inquiries",
            "Election reminders",
            "Community announcements",
          ]}
        />
        <p>Promotional SMS messages may include:</p>
        <List
          items={[
            "Fundraising requests",
            "Donation appeals",
            "Campaign promotions",
            "Special campaign announcements",
          ]}
        />
        <p>
          <strong className="font-semibold text-ink">
            SMS consent is entirely optional and is not a condition of making a contribution,
            volunteering, attending an event, requesting information, or otherwise using this
            website.
          </strong>{" "}
          Users are provided with two separate consent options for informational and promotional
          SMS messages.
        </p>
      </Titled>,
      <Titled key="stop" heading="STOP">
        <p>
          You can cancel the SMS service at any time by replying STOP to any message you receive
          from {LEGAL_BUSINESS_NAME}. After opting out, you may receive one final confirmation
          message confirming your request.
        </p>
      </Titled>,
      <Titled key="help" heading="HELP">
        <p>
          If you need assistance, reply HELP to any message or contact us at:
        </p>
        <p>
          Email: {CONTACT_EMAIL}
          <br />
          Phone: {CONTACT_PHONE}
        </p>
      </Titled>,
      <Titled key="frequency" heading="Message frequency">
        <p>Message frequency varies depending on campaign activity and your participation.</p>
      </Titled>,
      <Titled key="rates" heading="Message &amp; data rates">
        <p>Message and data rates may apply for messages sent to you and from you.</p>
      </Titled>,
      <Titled key="carrier" heading="Carrier disclaimer">
        <p>Carriers are not liable for delayed or undelivered messages.</p>
      </Titled>,
      <Titled key="privacy" heading="Privacy">
        <p>
          Information about how we collect, use, retain, and protect your personal information is
          available in our{" "}
          <Link href="/privacy-policy" className="link-underline text-signal-deep">
            Privacy Policy
          </Link>
          .
        </p>
      </Titled>,
    ],
  },
  {
    id: "donations",
    title: "Donations",
    body: [
      "Contributions are accepted in accordance with applicable Oregon campaign-finance laws and any other applicable legal requirements. Contributors are responsible for ensuring their contributions comply with applicable law. By making a contribution, you certify that the information you provide is accurate and that your contribution complies with applicable law.",
      `Donations are non-refundable except in cases of fraud or error. To request a refund, email ${CONTACT_EMAIL} within 30 days of the contribution.`,
      "Political contributions are not tax-deductible.",
    ],
  },
  {
    id: "content",
    title: "Content & accuracy",
    body: [
      `We do our best to keep policy briefs, event dates, and platform pages accurate and current. Mistakes happen. If you spot one, let us know at ${CONTACT_EMAIL} and we will fix it on the record.`,
      "Quoted endorsements have been approved by the named endorser at the time of publication. If you are an endorser and would like your name removed, email us and we will do so within five business days.",
    ],
  },
  {
    id: "links",
    title: "Outbound links",
    body: [
      "When we link to outside resources such as news articles, public records, or partner organizations, we are not responsible for their content or how they handle your data.",
      "Links to third-party websites are provided for convenience only and do not constitute endorsement of those websites or their privacy practices.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      `To the fullest extent permitted by applicable law, ${LEGAL_BUSINESS_NAME} is not responsible for indirect, incidental, special, consequential, or punitive damages arising from your use of this website.`,
      "The website is provided on an “as available” basis without warranties of any kind except as required by law.",
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
    id: "governing-law",
    title: "Governing law",
    body: [
      "These Terms of Service shall be governed by and interpreted in accordance with the laws of the State of Oregon, without regard to conflict-of-law principles.",
    ],
  },
  {
    id: "contact",
    title: "Contact",
    body: [
      `Questions about these terms can be sent to ${CONTACT_EMAIL} or to: ${LEGAL_BUSINESS_NAME}, ${CONTACT_ADDRESS}.`,
    ],
  },
];

export default function Page() {
  return (
    <LegalPage
      eyebrow="File №12 · Terms"
      number="Legal / XII"
      title="Terms of use."
      updated="July 23, 2026"
      intro="These Terms of Service govern your access to and use of randallfororegon.com and all related campaign services operated by Randall Fryer for Representative. They explain your rights and responsibilities when using our website, submitting forms, making contributions, registering for events, volunteering, or subscribing to campaign communications, including SMS text messages."
      sections={SECTIONS}
    />
  );
}
