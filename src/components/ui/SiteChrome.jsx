"use client";

// Renders the site-wide Navbar + Footer around every page EXCEPT funnel
// routes (squeeze pages must stay distraction-free, single-CTA).
// Root layout stays a server component; the pathname check lives here.

import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/sections/Footer";

// Funnel route prefixes that should HIDE the site Navbar/Footer (for
// distraction-free squeeze pages). Currently empty — the funnel pages show
// the full site chrome. Add a prefix (e.g. "/free-guide") to hide it again.
const FUNNEL_PATH_PREFIXES = [];

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const isFunnel = FUNNEL_PATH_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (isFunnel) return children;

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
