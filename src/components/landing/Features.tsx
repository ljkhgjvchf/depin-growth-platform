import type { FeatureItem } from "@/config/client";

interface FeaturesProps {
  items: FeatureItem[];
}

export function Features({ items }: FeaturesProps) {
  return (
    <section className="bg-[var(--brand-bg)] py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-[var(--brand-text)] sm:text-4xl">
          Why the Network Wins
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-[var(--brand-muted)]">
          Community-owned infrastructure beats carrier-grade every time.
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-[var(--brand-surface)] bg-[var(--brand-surface)] p-6 transition hover:border-[var(--brand-primary)]"
            >
              <div className="mb-4 text-4xl">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-[var(--brand-text)]">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--brand-muted)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
