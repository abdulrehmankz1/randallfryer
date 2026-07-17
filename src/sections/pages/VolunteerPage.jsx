"use client";

import { useState } from "react";
import Link from "next/link";
import { m } from "motion/react";
import SectionFrame from "@/animations/SectionFrame";
import SplitReveal from "@/animations/SplitReveal";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import {
  FormField,
  FormSelect,
  FormTextarea,
  FormCheckbox,
  FormFieldset,
} from "@/components/ui/Form";
import { usePhoneConsent, SmsConsentFieldset } from "@/components/ui/SmsConsent";
import BrandIcon from "@/components/ui/BrandIcon";

const VALUE_CARDS = [
  {
    no: "01",
    icon: "community",
    title: "Make a real difference",
    body: "Local campaigns are built one conversation at a time. The doors you knock, calls you make, and events you support help Randall connect directly with the people of District 28. Your contribution is practical — not symbolic.",
  },
  {
    no: "02",
    icon: "volunteer-hands",
    title: "No experience needed",
    body: "New volunteers are always welcome. The campaign will provide clear instructions, useful materials, and the support you need to take your first shift with confidence.",
  },
  {
    no: "03",
    icon: "flag",
    title: "A commitment that fits your schedule",
    body: "Give an hour, join a weekend shift, or volunteer regularly through Election Day. Whether you can help once or every week, Team Fryer will put your time and abilities to good use.",
  },
];

// Field options per ghl-forms-webhooks.md §2 (Volunteer Signup Form).
const HELP_OPTIONS = [
  { id: "help-fundraiser", label: "Host a Fundraiser" },
  { id: "help-phones", label: "Phone Banking" },
  { id: "help-coordination", label: "Volunteer Coordination" },
  { id: "help-digital", label: "Digital/Social Media" },
  { id: "help-doors", label: "Door Knocking" },
  { id: "help-meetgreet", label: "Host a Meet & Greet" },
  { id: "help-events", label: "Event Planning" },
  { id: "help-media", label: "Media" },
];

const REGIONS = [
  "Portland Metro",
  "Willamette Valley",
  "Oregon Coast",
  "Central Oregon",
  "Eastern Oregon",
  "Southern Oregon",
];

const EXPERIENCE_OPTIONS = [
  "None",
  "Some Volunteering",
  "Regular Volunteer",
  "Campaign Staff",
  "Campaign Management",
  "Elected/Appointed Office",
];

const AVAILABILITY_OPTIONS = [
  "1-2 hours/week",
  "3-5 hours/week",
  "5-10 hours/week",
  "10-20 hours/week",
  "Full-time",
  "Remote Help Only",
];

const OREGON_COUNTIES = [
  "Baker", "Benton", "Clackamas", "Clatsop", "Columbia", "Coos", "Crook",
  "Curry", "Deschutes", "Douglas", "Gilliam", "Grant", "Harney", "Hood River",
  "Jackson", "Jefferson", "Josephine", "Klamath", "Lake", "Lane", "Lincoln",
  "Linn", "Malheur", "Marion", "Morrow", "Multnomah", "Polk", "Sherman",
  "Tillamook", "Umatilla", "Union", "Wallowa", "Wasco", "Washington",
  "Wheeler", "Yamhill",
];

export default function VolunteerPage() {
  return (
    <main className="relative flex flex-1 flex-col">
      <PageHero
        eyebrow="File №05 — Volunteer"
        number="Join the team / V"
        title="The campaign is built by neighbors."
        intro="Knock on a few doors. Make a few calls. Host a conversation with friends or help at a community event. Every hour you contribute helps Randall Fryer listen to more residents, reach more voters, and build a stronger campaign for Oregon House District 28. You do not need political experience to make a difference. You only need a willingness to help bring disciplined, accountable, and results-focused leadership to Salem."
      />

      {/* VALUE CARDS */}
      <SectionFrame label="02 — Why it matters" number="Impact / II">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VALUE_CARDS.map((v, i) => (
            <m.div
              key={v.no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.1,
              }}
              whileHover={{ y: -4 }}
              className="group flex flex-col gap-4 rounded-card border border-ink/15 bg-bone-soft/60 p-7 transition-colors duration-500 hover:border-ink"
            >
              <div className="flex items-center justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 text-signal transition-colors duration-500 group-hover:border-signal/50 group-hover:text-signal-deep">
                  <BrandIcon name={v.icon} className="h-5 w-5" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                  {v.no}
                </span>
              </div>
              <h3 className="display-serif text-2xl font-medium leading-tight">
                {v.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-ink/75">
                {v.body}
              </p>
            </m.div>
          ))}
        </div>
      </SectionFrame>

      {/* SIGNUP FORM */}
      <SectionFrame label="03 — Sign up" number="Form / III">
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-4">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.7rem,3.5vw,2.85rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              Join Team Fryer.
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-sm text-[1.05rem] leading-relaxed text-ink/80"
            >
              Tell us a little about yourself and how you would like to
              help. A member of the campaign team will contact you with
              available volunteer opportunities and the information you
              need to get started.
            </m.p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <VolunteerForm />
          </div>
        </div>
      </SectionFrame>

      {/* EXPECTATIONS */}
      <SectionFrame label="04 — What happens next" number="Process / IV">
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              n: "01",
              t: "We get in touch",
              d: "A member of Team Fryer will contact you using the email address or phone number provided in your form.",
            },
            {
              n: "02",
              t: "A simple introduction",
              d: "We will explain the available opportunities, answer your questions, and provide the instructions and materials needed for your chosen role.",
            },
            {
              n: "03",
              t: "Choose your first activity",
              d: "Join a neighborhood canvass, make calls, support an event, help online, or contribute through another role that matches your interests.",
            },
            {
              n: "04",
              t: "Stay involved your way",
              d: "Volunteer once, join occasional campaign events, or become a regular member of Team Fryer. You choose the level of involvement that works for you.",
            },
          ].map((s, i) => (
            <m.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
                delay: i * 0.08,
              }}
              className="flex flex-col gap-3 border-t border-ink/15 pt-5"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-signal">
                {s.n}
              </span>
              <h3 className="display-serif text-xl font-medium leading-tight">
                {s.t}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink/75">{s.d}</p>
            </m.li>
          ))}
        </ol>
      </SectionFrame>

      {/* CONTACT BLOCK */}
      <SectionFrame label="05 — Talk to a coordinator" number="Contact / V">
        <div className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <SplitReveal
              as="h2"
              className="display-serif block text-balance text-[clamp(1.7rem,3.5vw,2.85rem)] font-medium leading-[1.05] tracking-[-0.02em]"
            >
              Prefer to talk to a person first?
            </SplitReveal>
            <m.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/80"
            >
              Questions are welcome. Contact the campaign&rsquo;s volunteer
              coordinator to learn more about available roles,
              accessibility, scheduling, or what to expect during your
              first volunteer activity.
            </m.p>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <dl className="flex flex-col gap-4">
              {[
                { k: "Volunteer coordinator", v: "To be announced" },
                { k: "Call or text", v: "To be announced" },
                { k: "Email", v: "To be announced" },
              ].map((c) => (
                <div
                  key={c.k}
                  className="flex flex-col gap-1 border-t border-ink/15 pt-4"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                    {c.k}
                  </dt>
                  <dd className="display-serif text-lg font-medium leading-tight text-ink/70">
                    {c.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SectionFrame>
    </main>
  );
}

function VolunteerForm() {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const pc = usePhoneConsent();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    const data = new FormData(e.currentTarget);
    const helpOptions = HELP_OPTIONS.filter(
      (o) => data.get(o.id) === "on"
    ).map((o) => o.label);

    const payload = {
      firstName: (data.get("firstName") || "").toString().trim(),
      lastName: (data.get("lastName") || "").toString().trim(),
      email: (data.get("email") || "").toString().trim(),
      phone: pc.phone,
      zipCode: (data.get("zipCode") || "").toString().trim(),
      county: (data.get("county") || "").toString(),
      region: (data.get("region") || "").toString(),
      registeredVoter: (data.get("registeredVoter") || "").toString(),
      campaignExperience: (data.get("campaignExperience") || "").toString(),
      helpOptions,
      availability: (data.get("availability") || "").toString(),
      issues: (data.get("issues") || "").toString().trim(),
      anythingElse: (data.get("anythingElse") || "").toString().trim(),
      sms_updates: pc.smsConsent,
      sms_promo: pc.promoConsent,
    };

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email);
    if (!payload.firstName || !payload.lastName || !emailOk) {
      setStatus("error");
      setErrorMsg("Please add your first and last name and a valid email.");
      return;
    }
    if (
      !payload.region ||
      !payload.registeredVoter ||
      !payload.campaignExperience ||
      !payload.availability ||
      !payload.issues
    ) {
      setStatus("error");
      setErrorMsg(
        "Please complete your region, voter registration, experience, availability, and the issues that matter to you."
      );
      return;
    }
    if (helpOptions.length === 0) {
      setStatus("error");
      setErrorMsg("Please choose at least one way you would like to help.");
      return;
    }
    if (pc.consentError) {
      setStatus("error");
      setErrorMsg(pc.consentError);
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending your signup. Please try again in a moment."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-ink bg-ink p-10 text-bone sm:p-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ochre-soft">
          Welcome to the team
        </span>
        <h3 className="display-serif mt-3 text-3xl font-medium sm:text-4xl">
          Got it — welcome to Team Fryer.
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-bone/80">
          A member of the campaign team will contact you with available
          volunteer opportunities and the information you need to get
          started.
        </p>
        <div className="mt-6">
          <Button as={Link} href="/" variant="signal" withArrow>
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="v-first" name="firstName" label="First name" required />
        <FormField id="v-last" name="lastName" label="Last name" required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="v-email" name="email" label="Email" type="email" required />
        <FormField
          id="v-phone"
          name="phone"
          label="Phone"
          type="tel"
          optional
          value={pc.phone}
          onChange={pc.onPhoneChange}
          placeholder="+1 (503) 555-0123"
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField id="v-zip" name="zipCode" label="ZIP code" optional />
        <FormSelect
          id="v-county"
          name="county"
          label="County"
          optional
          options={OREGON_COUNTIES}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormSelect
          id="v-region"
          name="region"
          label="Region"
          required
          options={REGIONS}
        />
        <FormSelect
          id="v-voter"
          name="registeredVoter"
          label="Registered to vote in Oregon?"
          required
          options={["Yes", "No"]}
        />
      </div>
      <FormSelect
        id="v-exp"
        name="campaignExperience"
        label="Prior campaign experience?"
        required
        options={EXPERIENCE_OPTIONS}
      />

      <FormFieldset
        legend="How would you like to help? *"
        hint="Choose as many as apply. We will help match you with opportunities that fit your interests and availability."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {HELP_OPTIONS.map((o) => (
            <FormCheckbox key={o.id} id={o.id} name={o.id} label={o.label} />
          ))}
        </div>
      </FormFieldset>

      <FormSelect
        id="v-availability"
        name="availability"
        label="Availability"
        required
        options={AVAILABILITY_OPTIONS}
      />

      <FormTextarea
        id="v-issues"
        name="issues"
        label="Which issue(s) matter most to you?"
        required
        rows={3}
        placeholder="A sentence or two is enough. Examples may include education, responsible taxes, public safety, economic opportunity, or government accountability."
      />

      <FormTextarea
        id="v-notes"
        name="anythingElse"
        label="Anything else to share?"
        optional
        rows={3}
        placeholder="Relevant skills, languages you speak, accessibility requirements, transportation limitations, or scheduling considerations."
      />

      <SmsConsentFieldset {...pc} idPrefix="v-sms" />

      {status === "error" && errorMsg && (
        <p
          role="alert"
          className="rounded-soft border border-signal/30 bg-signal/5 px-4 py-3 text-sm leading-relaxed text-signal-deep"
        >
          {errorMsg}
        </p>
      )}

      <div className="flex flex-col gap-4">
        <Button
          as="button"
          type="submit"
          variant="signal"
          withArrow
          disabled={submitting}
          aria-busy={submitting}
          className={submitting ? "pointer-events-none opacity-70" : ""}
        >
          {submitting ? "Sending…" : "Join the team"}
        </Button>
        <span className="text-[13px] leading-relaxed text-ink/60">
          We respect your privacy. Your information will be used for
          campaign communications and volunteer coordination in accordance
          with the campaign&rsquo;s Privacy Policy.
        </span>
      </div>
    </form>
  );
}
