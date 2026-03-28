import type { ClientConfig } from "@/config/client";

interface CTAProps {
  config: ClientConfig["cta"];
}

export function CTA({ config }: CTAProps) {
  return (
    <section className="bg-[var(--brand-bg)] py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="rounded-3xl border border-[var(--brand-primary)] bg-[var(--brand-surface)] p-12 shadow-xl">
          <h2 className="text-4xl font-extrabold text-[var(--brand-text)] sm:text-5xl">
            {config.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--brand-muted)]">
            {config.body}
          </p>
          <a
            href={config.ctaHref}
            className="mt-8 inline-block rounded-xl bg-[var(--brand-primary)] px-10 py-4 text-lg font-semibold text-white shadow-lg transition hover:opacity-90"
          >
            {config.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
