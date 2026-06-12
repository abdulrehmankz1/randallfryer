// Manifest of every social-media creative shipped in /public/social-media-posts.
// Each entry maps to a single standalone HTML artboard that the gallery iframes
// live, and that the /social-media-posts/[slug] detail page renders at full size.

export const SOCIAL_POSTS = [
  // ────────────────────────────────────────────────────────────────
  // Instagram feed — 1080×1080
  // ────────────────────────────────────────────────────────────────
  {
    slug: "feed-01-manifesto-cover",
    no: "01",
    format: "feed",
    title: "Manifesto Cover",
    concept: "Editorial cover with 3D ochre seal & paper grain",
    file: "/social-media-posts/feed/01-manifesto-cover.html",
  },
  {
    slug: "feed-02-pillar-numbered",
    no: "02",
    format: "feed",
    title: "Pillar — Numbered",
    concept: "Midnight chapter card, glowing crimson disc",
    file: "/social-media-posts/feed/02-pillar-numbered.html",
  },
  {
    slug: "feed-03-portrait-cinematic",
    no: "03",
    format: "feed",
    title: "Portrait — Cinematic",
    concept: "Half-bleed portrait, ochre rim light, lapel medallion",
    file: "/social-media-posts/feed/03-portrait-cinematic.html",
  },
  {
    slug: "feed-04-italic-quote",
    no: "04",
    format: "feed",
    title: "Italic Quote",
    concept: "Embossed seal beneath an oversized italic pull-quote",
    file: "/social-media-posts/feed/04-italic-quote.html",
  },
  {
    slug: "feed-05-statistic-counter",
    no: "05",
    format: "feed",
    title: "Statistic Counter",
    concept: "Extruded counter typography with golden ribbon",
    file: "/social-media-posts/feed/05-statistic-counter.html",
  },
  {
    slug: "feed-06-data-ledger",
    no: "06",
    format: "feed",
    title: "Data Ledger",
    concept: "Ink dashboard, golden coin, ledger rows & bar chart",
    file: "/social-media-posts/feed/06-data-ledger.html",
  },
  {
    slug: "feed-07-asymmetric-split",
    no: "07",
    format: "feed",
    title: "Asymmetric Split",
    concept: "Diagonal ink / bone split with floating crimson cube",
    file: "/social-media-posts/feed/07-asymmetric-split.html",
  },
  {
    slug: "feed-08-seal-medallion",
    no: "08",
    format: "feed",
    title: "Seal Medallion",
    concept: "Centered Capitol seal with circular calligraphy",
    file: "/social-media-posts/feed/08-seal-medallion.html",
  },
  {
    slug: "feed-09-newspaper-clipping",
    no: "09",
    format: "feed",
    title: "Newspaper Clipping",
    concept: "Layered torn clippings with wax-seal stamp",
    file: "/social-media-posts/feed/09-newspaper-clipping.html",
  },
  {
    slug: "feed-10-signal-crimson",
    no: "10",
    format: "feed",
    title: "Signal Crimson",
    concept: "Crimson hero with glassmorphism bone card",
    file: "/social-media-posts/feed/10-signal-crimson.html",
  },

  // ────────────────────────────────────────────────────────────────
  // Instagram story — 1080×1920
  // ────────────────────────────────────────────────────────────────
  {
    slug: "story-01-manifesto-tower",
    no: "01",
    format: "story",
    title: "Manifesto Tower",
    concept: "Vertical manifesto with central seal",
    file: "/social-media-posts/story/01-manifesto-tower.html",
  },
  {
    slug: "story-02-dome-cinematic",
    no: "02",
    format: "story",
    title: "Dome — Cinematic",
    concept: "Twilight Capitol dome, sun glow, volumetric haze",
    file: "/social-media-posts/story/02-dome-cinematic.html",
  },
  {
    slug: "story-03-stat-stack",
    no: "03",
    format: "story",
    title: "Stat Stack",
    concept: "Three extruded counters with side gradient",
    file: "/social-media-posts/story/03-stat-stack.html",
  },
  {
    slug: "story-04-portrait-fullbleed",
    no: "04",
    format: "story",
    title: "Portrait — Full Bleed",
    concept: "Studio portrait with spotlight beam & sash badge",
    file: "/social-media-posts/story/04-portrait-fullbleed.html",
  },
  {
    slug: "story-05-pillar-vertical",
    no: "05",
    format: "story",
    title: "Pillar — Vertical",
    concept: "Massive italic numeral with glass parchment card",
    file: "/social-media-posts/story/05-pillar-vertical.html",
  },
  {
    slug: "story-06-pledge-medallion",
    no: "06",
    format: "story",
    title: "Pledge Medallion",
    concept: "Crimson stage, sunburst rays, draped ribbons",
    file: "/social-media-posts/story/06-pledge-medallion.html",
  },
  {
    slug: "story-07-marquee-stack",
    no: "07",
    format: "story",
    title: "Marquee Stack",
    concept: "Five italic marquee bars at varied scales",
    file: "/social-media-posts/story/07-marquee-stack.html",
  },
  {
    slug: "story-08-ledger-document",
    no: "08",
    format: "story",
    title: "Ledger Document",
    concept: "Aged parchment with wax seal & ledger rows",
    file: "/social-media-posts/story/08-ledger-document.html",
  },
  {
    slug: "story-09-italic-quote",
    no: "09",
    format: "story",
    title: "Italic Quote",
    concept: "Volumetric blue stage, massive 3D quote mark",
    file: "/social-media-posts/story/09-italic-quote.html",
  },
  {
    slug: "story-10-date-countdown",
    no: "10",
    format: "story",
    title: "Date Countdown",
    concept: "Extruded date with countdown chips & seal",
    file: "/social-media-posts/story/10-date-countdown.html",
  },
];

export const FORMATS = {
  feed: {
    key: "feed",
    label: "Feed",
    sub: "1080 × 1080",
    ratio: "1 / 1",
    width: 1080,
    height: 1080,
  },
  story: {
    key: "story",
    label: "Story",
    sub: "1080 × 1920",
    ratio: "9 / 16",
    width: 1080,
    height: 1920,
  },
};

export function getSocialPost(slug) {
  return SOCIAL_POSTS.find((p) => p.slug === slug) || null;
}

export function getRelatedSocialPosts(slug, n = 4) {
  const idx = SOCIAL_POSTS.findIndex((p) => p.slug === slug);
  if (idx === -1) return [];
  const out = [];
  for (let i = 1; i <= SOCIAL_POSTS.length && out.length < n; i++) {
    out.push(SOCIAL_POSTS[(idx + i) % SOCIAL_POSTS.length]);
  }
  return out;
}
