"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useScroll, useTransform, useSpring } from "motion/react";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Endorsements", href: "/endorsements" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
  { label: "Press Kit", href: "/social-media-posts" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Pages with a dark hero behind a transparent navbar at the top
  const onDarkHero =
    pathname?.startsWith("/events/") && pathname !== "/events";
  // Light-text mode = on a dark hero AND navbar not yet solid AND menu closed
  const lightMode = onDarkHero && !solid && !open;

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setSolid(y > 24));
    return () => unsub();
  }, [scrollY]);

  // Lock body scroll while mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <m.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,backdrop-filter,border] duration-500",
          solid
            ? "border-b border-ink/10 bg-bone/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="container-padded">
          <div className="flex h-[72px] items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <Logomark light={lightMode} />
              <div
                className={cn(
                  "flex flex-col leading-tight transition-colors duration-300",
                  lightMode ? "text-bone" : "text-ink"
                )}
              >
                <span className="display-serif whitespace-nowrap text-lg font-medium tracking-tight">
                  Capital<span className="italic">Watch</span>
                </span>
                <span
                  className={cn(
                    "hidden font-mono text-[9px] uppercase tracking-[0.32em] transition-colors duration-300 sm:inline",
                    lightMode ? "text-bone/65" : "text-ink-mute"
                  )}
                >
                  Adrian Vale · State Senate
                </span>
              </div>
            </Link>

            <nav className="hidden items-center gap-5 lg:flex xl:gap-8">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={cn(
                      "link-underline whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.24em] transition-colors duration-300",
                      lightMode
                        ? active
                          ? "text-bone"
                          : "text-bone/80 hover:text-bone"
                        : active
                        ? "text-ink"
                        : "text-ink/80 hover:text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/volunteer"
                className={cn(
                  "link-underline hidden px-2 font-mono text-[11px] uppercase tracking-[0.24em] transition-colors duration-300 xl:inline-flex",
                  lightMode
                    ? "text-bone/85 hover:text-bone"
                    : "text-ink/80 hover:text-ink"
                )}
              >
                Volunteer
              </Link>
              <Link
                href="/donate"
                className="group relative hidden items-center gap-2 overflow-hidden rounded-pill bg-signal px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.24em] text-bone transition-colors hover:bg-ink sm:inline-flex"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Donate
                  <span className="block h-1.5 w-1.5 rounded-full bg-bone/90" />
                </span>
              </Link>

              <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden",
                  lightMode
                    ? "border-bone/30 text-bone"
                    : "border-ink/15 text-ink"
                )}
              >
                <span className="sr-only">Menu</span>
                <span className="relative block h-3 w-5">
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-px w-full transition-transform duration-300",
                      lightMode ? "bg-bone" : "bg-ink",
                      open ? "translate-y-[6px] rotate-45" : ""
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 bottom-0 h-px w-full transition-transform duration-300",
                      lightMode ? "bg-bone" : "bg-ink",
                      open ? "-translate-y-[6px] -rotate-45" : ""
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Scroll progress bar */}
        <m.div
          style={{ scaleX: progress }}
          className="origin-left h-[2px] w-full bg-signal"
        />
      </m.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && <MobileMenu close={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ close }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 bg-bone lg:hidden"
    >
      <m.div
        initial={{ y: -40 }}
        animate={{ y: 0 }}
        exit={{ y: -40 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="container-padded flex h-full flex-col pt-[88px]"
      >
        <nav className="flex flex-col">
          {NAV_LINKS.map((link, i) => (
            <m.div
              key={link.label}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1 + i * 0.05,
              }}
            >
              <Link
                href={link.href}
                onClick={close}
                className="group flex items-baseline justify-between border-b border-ink/10 py-5"
              >
                <span className="display-serif text-3xl font-medium tracking-tight">
                  {link.label}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-ink-mute">
                  0{i + 1}
                </span>
              </Link>
            </m.div>
          ))}
        </nav>

        <m.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
          className="mt-10 flex gap-3"
        >
          <Link
            href="/volunteer"
            onClick={close}
            className="inline-flex flex-1 items-center justify-center rounded-pill border border-ink/30 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink"
          >
            Volunteer
          </Link>
          <Link
            href="/donate"
            onClick={close}
            className="inline-flex flex-1 items-center justify-center rounded-pill bg-signal px-5 py-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bone"
          >
            Donate
          </Link>
        </m.div>

        <div className="mt-auto pb-10 pt-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
            Paid for by Friends of Adrian Vale
          </p>
        </div>
      </m.div>
    </m.div>
  );
}

function Logomark({ light = false }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative grid h-9 w-9 place-items-center overflow-hidden rounded-full transition-colors duration-300",
        light ? "bg-bone text-ink" : "bg-ink text-bone"
      )}
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
        <path
          d="M2 12C5 6 8.5 4 12 4s7 2 10 8c-3 6-6.5 8-10 8s-7-2-10-8Z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path
          d="M12 1.5V4M12 20V22.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <span
        className={cn(
          "absolute -bottom-0.5 right-0 block h-1.5 w-1.5 rounded-full bg-signal ring-2 transition-colors duration-300",
          light ? "ring-bone" : "ring-ink"
        )}
      />
    </span>
  );
}
