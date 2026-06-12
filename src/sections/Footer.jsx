"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { m, useScroll, useTransform } from "motion/react";
import SplitReveal from "@/animations/SplitReveal";
import Button from "@/components/ui/Button";

const NAV_GROUPS = [
  {
    title: "Campaign",
    links: [
      { label: "Home", href: "/" },
      { label: "About Adrian", href: "/about" },
      { label: "Endorsements", href: "/endorsements" },
      { label: "News", href: "/news" },
      { label: "Press Kit", href: "/social-media-posts" },
    ],
  },
  {
    title: "Get Involved",
    links: [
      { label: "Volunteer", href: "/volunteer" },
      { label: "Donate", href: "/donate" },
      { label: "Events", href: "/events" },
      { label: "Ask Adrian", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Office",
    links: [
      { label: "412 Harbor Ave, Suite 4", href: "/contact", external: false },
      { label: "Harborlight, OR 97206", href: "/contact", external: false },
      { label: "hello@capitalwatch.vote", href: "mailto:hello@capitalwatch.vote", external: true },
      { label: "+1 (503) 555-0142", href: "tel:+15035550142", external: true },
    ],
  },
];

const SOCIALS = [
  { name: "Facebook", href: "#", Icon: FacebookIcon },
  { name: "Instagram", href: "#", Icon: InstagramIcon },
  { name: "X (Twitter)", href: "#", Icon: XIcon },
  { name: "LinkedIn", href: "#", Icon: LinkedInIcon },
  { name: "YouTube", href: "#", Icon: YouTubeIcon },
];

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative overflow-hidden bg-bone-soft text-ink"
    >
      <div className="container-padded pb-10 pt-20 sm:pt-28">
        {/* CTA HERO BAND */}
        <m.div style={{ y }} className="grid grid-cols-12 items-end gap-y-10 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-7">
            <span className="eyebrow">Take the next step</span>
            <SplitReveal
              as="h2"
              className="display-serif mt-4 block text-balance text-[clamp(2.25rem,6vw,4.75rem)] font-medium leading-[1] tracking-[-0.025em] text-ink"
            >
              Join the movement.
            </SplitReveal>
          </div>
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-12 lg:col-span-5"
          >
            <p className="max-w-md text-balance text-base leading-relaxed text-ink/75 sm:text-lg">
              CapitalWatch is built by neighbors, not lobbyists. Knock
              doors, host a coffee, or send what you can — every dollar
              and every hour belongs on the ground.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button as={Link} href="/volunteer" variant="primary" withArrow>
                Volunteer
              </Button>
              <Button as={Link} href="/donate" variant="signal" withArrow>
                Donate
              </Button>
            </div>
          </m.div>
        </m.div>

        {/* NEWSLETTER ROW */}
        <div className="mt-16 grid grid-cols-12 items-end gap-y-8 border-t border-ink/15 pt-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-5">
            <span className="eyebrow">Inside the campaign</span>
            <p className="mt-3 max-w-md text-balance text-xl leading-tight text-ink/85 sm:text-2xl">
              The weekly briefing — strategy, schedule, every line item.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-7">
            <SignupForm />
          </div>
        </div>

        {/* NAV COLUMNS */}
        <div className="mt-16 grid grid-cols-12 gap-y-12 border-t border-ink/15 pt-12 lg:gap-x-12">
          <div className="col-span-12 lg:col-span-3">
            <Link href="/" className="group inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-bone transition-transform duration-500 group-hover:rotate-12">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                  CW
                </span>
              </span>
              <div className="leading-tight">
                <div className="display-serif text-base">
                  Capital<em>Watch</em>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                  Adrian Vale, 2026
                </div>
              </div>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink/70">
              A grassroots campaign for State Senate, District 14 —
              powered entirely by volunteers and small-dollar donations.
            </p>
          </div>

          {NAV_GROUPS.map((group) => (
            <div
              key={group.title}
              className="col-span-6 sm:col-span-4 lg:col-span-3"
            >
              <h3 className="eyebrow">{group.title}</h3>
              <ul className="mt-5 flex flex-col gap-3">
                {group.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* SOCIALS + COPYRIGHT */}
        <div className="mt-14 grid grid-cols-12 items-center gap-y-6 border-t border-ink/15 pt-8 lg:gap-x-8">
          <div className="col-span-12 lg:col-span-6">
            <ul className="flex flex-wrap items-center gap-2.5">
              {SOCIALS.map(({ name, href, Icon }) => (
                <li key={name}>
                  <SocialIcon href={href} ariaLabel={name}>
                    <Icon />
                  </SocialIcon>
                </li>
              ))}
            </ul>
          </div>
          <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute lg:col-span-6 lg:text-right">
            © 2026 CapitalWatch · All rights reserved
          </p>
        </div>

        {/* LEGAL */}
        <div className="mt-6 grid grid-cols-12 items-center gap-y-2 lg:gap-x-8">
          <p className="col-span-12 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute lg:col-span-6">
            Paid for by Friends of Adrian Vale · FEC ID C00CWV2026
          </p>
          <div className="col-span-12 flex flex-wrap items-center gap-x-5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute lg:col-span-6 lg:justify-end">
            <Link href="/privacy" className="link-underline hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="link-underline hover:text-ink">
              Terms
            </Link>
            <span>Not authorized by any candidate or committee</span>
          </div>
        </div>

        {/* Refined watermark */}
        <m.div
          aria-hidden
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2 }}
          className="pointer-events-none mt-12 select-none overflow-hidden"
        >
          <svg
            viewBox="0 0 1400 180"
            className="h-auto w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <text
              x="50%"
              y="140"
              textAnchor="middle"
              fontSize="180"
              fontFamily="var(--font-fraunces)"
              fontWeight="500"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-ink/35"
              style={{ letterSpacing: "-0.04em" }}
            >
              CAPITALWATCH
            </text>
          </svg>
        </m.div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }) {
  const isExternal = /^(mailto:|tel:|https?:)/.test(href);
  const Comp = isExternal ? "a" : Link;
  return (
    <Comp
      href={href}
      className="group/link relative inline-block text-[15px] leading-snug text-ink/80 transition-colors duration-300 hover:text-ink"
    >
      <span className="relative inline-block overflow-hidden align-top">
        <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:-translate-y-full">
          {children}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 block translate-y-full transition-transform duration-[450ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/link:translate-y-0"
        >
          {children}
        </span>
      </span>
    </Comp>
  );
}

function SocialIcon({ href, ariaLabel, children }) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className="group/soc relative grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-ink/15 text-ink transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-ink"
    >
      {/* fill that grows from center on hover */}
      <span
        aria-hidden
        className="absolute inset-0 scale-0 rounded-full bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/soc:scale-100"
      />
      <span className="relative z-10 flex h-4 w-4 items-center justify-center transition-colors duration-500 group-hover/soc:text-bone">
        {children}
      </span>
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5H16.7V4.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.45-4 4.1v2.3H7.6V14h2.7v8h3.2z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56v14H.22V8zm7.4 0h4.37v1.9h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v7.46h-4.55V15.4c0-1.7-.03-3.88-2.37-3.88-2.37 0-2.73 1.85-2.73 3.76v6.72H7.62V8z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M23.5 6.51a3.01 3.01 0 0 0-2.12-2.13C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.52A3.01 3.01 0 0 0 .5 6.51C0 8.4 0 12 0 12s0 3.6.5 5.49a3.01 3.01 0 0 0 2.12 2.13c1.88.52 9.38.52 9.38.52s7.5 0 9.38-.52a3.01 3.01 0 0 0 2.12-2.13c.5-1.89.5-5.49.5-5.49s0-3.6-.5-5.49zM9.6 15.6V8.4l6.24 3.6L9.6 15.6z" />
    </svg>
  );
}

function SignupForm() {
  const [val, setVal] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!val) return;
        setSent(true);
      }}
      className="group relative flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
    >
      <label htmlFor="signup-email" className="sr-only">
        Email address
      </label>
      <div className="relative flex-1">
        <input
          id="signup-email"
          type="email"
          required
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="you@district14.org"
          className="w-full rounded-pill border border-ink/25 bg-bone px-6 py-4 font-sans text-base text-ink placeholder:text-ink-mute focus:border-ink focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="group/btn relative inline-flex items-center justify-center overflow-hidden rounded-pill bg-ink px-7 py-4 font-mono text-[12px] uppercase tracking-[0.22em] text-bone transition-colors duration-500 hover:bg-signal"
      >
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:-translate-y-[200%]">
          {sent ? "Subscribed" : "Subscribe"}
        </span>
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/btn:translate-y-0"
        >
          {sent ? "Subscribed" : "Subscribe"}
        </span>
      </button>
    </form>
  );
}
