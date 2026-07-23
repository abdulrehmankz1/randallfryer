import Button from "@/components/ui/Button";

export const metadata = {
  title: "Not found",
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-1 flex-col">
      <div className="container-padded flex flex-1 flex-col justify-center py-32">
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-mute">
          404 · Not found
        </span>

        <div className="hairline mt-6 h-px w-full" />

        <h1 className="display-serif mt-12 max-w-3xl text-balance text-[clamp(2.2rem,5vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.025em]">
          The page you&rsquo;re looking for moved on.
        </h1>
        <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-ink/80">
          The link may have changed or the page no longer exists. The
          map back is below or send the team a note and we&rsquo;ll
          point you to the right place.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button href="/" variant="primary" withArrow>
            Back to home
          </Button>
          <Button href="/contact" variant="outline" withArrow>
            Ask the team
          </Button>
        </div>
      </div>
    </main>
  );
}
