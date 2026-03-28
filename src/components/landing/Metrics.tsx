import type { MetricItem } from "@/config/client";

interface MetricsProps {
  items: MetricItem[];
}

export function Metrics({ items }: MetricsProps) {
  return (
    <section className="bg-[var(--brand-surface)] py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center text-3xl font-bold text-[var(--brand-text)] sm:text-4xl">
          Network Traction
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {items.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-[var(--brand-bg)] bg-[var(--brand-bg)] p-6 text-center"
            >
              <p className="text-4xl font-extrabold text-[var(--brand-primary)]">
                {metric.value}
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--brand-text)]">
                {metric.label}
              </p>
              {metric.delta && (
                <p className="mt-1 text-xs text-[var(--brand-accent)]">
                  {metric.delta}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
