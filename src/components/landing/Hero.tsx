import type { ClientConfig } from "@/config/client";

interface HeroProps {
  config: ClientConfig["hero"];
  brandName: string;
}

export function Hero({ config, brandName }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-bg)] py-24 sm:py-32">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(var(--brand-primary) 1px, transparent 1px), linear-gradient(90deg, var(--brand-primary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 text-center">
        {config.badgeText && (
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--brand-primary)] bg-[var(--brand-surface)] px-4 py-1.5 text-sm font-medium text-[var(--brand-accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-accent)]" />
            {config.badgeText}
          </span>
        )}

        <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-[var(--brand-text)] sm:text-7xl">
          {config.headline}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--brand-muted)]">
          {config.subheadline}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={config.ctaHref}
            className="rounded-xl bg-[var(--brand-primary)] px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)] focus:ring-offset-2"
          >
            {config.ctaLabel}
          </a>
          {config.secondaryCtaLabel && config.secondaryCtaHref && (
            <a
              href={config.secondaryCtaHref}
              className="rounded-xl border border-[var(--brand-surface)] bg-transparent px-8 py-4 text-base font-semibold text-[var(--brand-text)] transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            >
              {config.secondaryCtaLabel}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
