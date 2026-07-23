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
export default function BrandIcon({ name, className, bold = false }) {
  const url = `url(/icons/${name}.svg)`;
  // The SVGs are thin line art. Because they're rendered as a mask there is no
  // stroke-width to increase, so `bold` fattens the strokes by stacking crisp
  // drop-shadows of the masked shape in every direction (a mask "dilation").
  const dilate =
    "drop-shadow(0.6px 0 0 currentColor) drop-shadow(-0.6px 0 0 currentColor) " +
    "drop-shadow(0 0.6px 0 currentColor) drop-shadow(0 -0.6px 0 currentColor) " +
    "drop-shadow(0.6px 0.6px 0 currentColor) drop-shadow(-0.6px 0.6px 0 currentColor) " +
    "drop-shadow(0.6px -0.6px 0 currentColor) drop-shadow(-0.6px -0.6px 0 currentColor)";
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
        ...(bold ? { filter: dilate } : null),
      }}
    />
  );
}
