interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
  icon?: string;
}

export function StatCard({ label, value, delta, deltaPositive = true, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-[var(--brand-surface)] bg-[var(--brand-surface)] p-6">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-[var(--brand-muted)]">{label}</p>
        {icon && <span className="text-2xl">{icon}</span>}
      </div>
      <p className="mt-2 text-3xl font-extrabold text-[var(--brand-text)]">{value}</p>
      {delta && (
        <p
          className={`mt-1 text-sm font-medium ${
            deltaPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {delta}
        </p>
      )}
    </div>
  );
}
