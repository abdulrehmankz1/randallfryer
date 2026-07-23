"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-ink text-bone hover:bg-signal",
  signal: "bg-signal text-bone hover:bg-ink",
  outline:
    "bg-transparent text-ink border border-ink/30 hover:border-ink hover:bg-ink hover:text-bone",
  // Inverse of `outline` — starts filled, reveals the outline look on hover
  "outline-inverse":
    "border border-ink bg-ink text-bone hover:border-ink/30 hover:bg-transparent hover:text-ink",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
  // For dark (ink/signal) surfaces
  bone: "bg-bone text-ink hover:bg-ochre-soft hover:text-ink",
};

const sizes = {
  // Default CTA size (matches the footer Subscribe button)
  md: "px-7 py-4 text-[12px] tracking-[0.22em]",
  // Compact — navbar and inline utility placements
  sm: "px-5 py-2.5 text-[11px] tracking-[0.24em]",
};

/**
 * Button — pill with a vertical word-wipe on hover.
 * (Same style as the footer newsletter Subscribe button — no magnetic
 * mouse-follow movement.)
 *
 * Routing:
 *   • Provide `href="/path"` for an internal route — renders Next/Link.
 *   • Provide `href="https://…"` / `mailto:` / `tel:` — renders a plain anchor.
 *   • Omit `href` — renders a native <button>.
 *   • `as="a"` forces a plain anchor (use for `download`, etc).
 */
export default function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  withArrow = false,
  as,
  href,
  type,
  ...props
}) {
  // Decide what element to render
  const isExternal =
    typeof href === "string" && /^(mailto:|tel:|https?:|data:)/.test(href);
  let Component;
  if (as === "a") Component = "a";
  else if (href && !isExternal) Component = Link;
  else if (href) Component = "a";
  else Component = "button";

  const isButton = Component === "button";

  const label = (
    <span className="flex items-center gap-2">
      <span>{children}</span>
      {withArrow && <Arrow />}
    </span>
  );

  return (
    <Component
      href={href}
      type={isButton ? type || "button" : undefined}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-pill font-mono uppercase transition-colors duration-500",
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    >
      <span className="block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-[200%]">
        {label}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 flex translate-y-full items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0"
      >
        {label}
      </span>
    </Component>
  );
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="-mr-0.5 flex-shrink-0"
      aria-hidden="true"
    >
      <path
        d="M1.5 12.5L12.5 1.5M12.5 1.5H4.5M12.5 1.5V9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
