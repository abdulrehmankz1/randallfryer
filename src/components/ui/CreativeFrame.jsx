"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * CreativeFrame — a social creative inside its native aspect box.
 *
 * While a creative is in production (`post.image` unset) the slot is held by
 * an in-brand placeholder plate — midnight navy stage, dot grid, ghost
 * numeral, gold dash — typeset in the campaign system. Setting `post.image`
 * in src/data/socialPosts.js swaps in the final artwork automatically.
 *
 *   post      Entry from SOCIAL_POSTS
 *   format    FORMATS[post.format]
 *   sizes     next/image `sizes` for the final artwork
 */
export default function CreativeFrame({ post, format, sizes, className }) {
  return (
    <div
      className={cn("@container relative isolate w-full overflow-hidden", className)}
      style={{ aspectRatio: format.ratio }}
    >
      {post.image ? (
        <Image
          src={post.image}
          alt={`${post.title} ${format.label} creative`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <PlaceholderPlate post={post} format={format} />
      )}
    </div>
  );
}

function PlaceholderPlate({ post, format }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between overflow-hidden bg-[radial-gradient(120%_90%_at_50%_0%,#1b2740_0%,#0d1528_55%,#080e1d_100%)] p-[7cqw] text-bone">
      {/* Dot grid, echoing the detail-stage backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(246,245,244,0.09)_1px,transparent_1px)] [background-size:24px_24px]"
      />

      {/* Inner keyline */}
      <div aria-hidden className="absolute inset-[4cqw] border border-bone/15" />

      {/* Ghost numeral */}
      <span
        aria-hidden
        className="display-serif pointer-events-none absolute -bottom-[8cqw] right-[1cqw] select-none text-[46cqw] font-medium italic leading-none text-bone/[0.06]"
      >
        {post.no}
      </span>

      {/* Top row */}
      <div className="relative flex items-start justify-between gap-[3cqw] font-mono uppercase">
        <span className="text-[2.6cqw] tracking-[0.3em] text-bone/60">
          Randall Fryer · Oregon House 28
        </span>
        <span className="text-[2.6cqw] tracking-[0.3em] text-ochre">
          №{post.no}
        </span>
      </div>

      {/* Center block */}
      <div className="relative">
        <span aria-hidden className="block h-[0.35cqw] w-[12cqw] bg-ochre" />
        <span className="display-serif mt-[3cqw] block text-balance text-[8.5cqw] font-medium leading-[1.05] tracking-[-0.02em]">
          {post.title}
        </span>
        <p className="mt-[2.5cqw] max-w-[72cqw] font-mono text-[2.6cqw] uppercase leading-[1.7] tracking-[0.22em] text-bone/55">
          {post.concept}
        </p>
      </div>

      {/* Bottom row */}
      <div className="relative flex items-end justify-between gap-[3cqw] font-mono uppercase">
        <span className="text-[2.6cqw] tracking-[0.28em] text-bone/60">
          {format.sub}
        </span>
        <span className="inline-flex items-center gap-[1.6cqw] rounded-pill border border-bone/25 px-[3cqw] py-[1.3cqw] text-[2.4cqw] tracking-[0.26em] text-bone/85">
          <span aria-hidden className="block h-[1.3cqw] w-[1.3cqw] rounded-full bg-signal" />
          In production
        </span>
      </div>
    </div>
  );
}
