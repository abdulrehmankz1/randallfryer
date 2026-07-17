import { cn } from "@/lib/cn";

/**
 * BrandIcon — renders one of the Randall Fryer brand icons from /public/icons.
 *
 * Only the campaign's own brand icons are used on this site (per the brand
 * guide). The SVGs are monochrome line art; we render them via CSS mask so the
 * icon inherits the current text color (text-ink, text-signal, …) and scales
 * cleanly. Size with width/height utilities in `className` (e.g. "h-8 w-8").
 *
 *   name  file basename in /public/icons (e.g. "award", "scales")
 */
export default function BrandIcon({ name, className }) {
  const url = `url(/icons/${name}.svg)`;
  return (
    <span
      aria-hidden
      className={cn("inline-block bg-current", className)}
      style={{
        maskImage: url,
        WebkitMaskImage: url,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
