// Funnel layout — /free-guide and its nested routes (thank-you) currently
// show the full site Navbar/Footer (see FUNNEL_PATH_PREFIXES in
// src/components/ui/SiteChrome.jsx). The site Navbar is fixed to the top of
// the viewport, so this layout only offsets the page content below it
// (same 88px offset PageHero uses on the inner site pages).
export default function FunnelLayout({ children }) {
  return <div className="flex flex-col pt-[88px]">{children}</div>;
}
