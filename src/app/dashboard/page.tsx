import { defaultDashboardConfig } from "@/config/dashboard";
import { fetchDashboardData } from "@/lib/dashboard-data";
import { StatCard } from "@/components/dashboard/StatCard";
import { LineChart } from "@/components/dashboard/LineChart";
import { AreaChart } from "@/components/dashboard/AreaChart";

export const revalidate = 300; // ISR: refresh every 5 min

function formatCompact(n: number, prefix = ""): string {
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(1)}K`;
  return `${prefix}${n.toLocaleString()}`;
}

export default async function DashboardPage() {
  const cfg = defaultDashboardConfig;
  const data = await fetchDashboardData(cfg);
  const currency = cfg.currencySymbol ?? "$";

  return (
    <main className="min-h-screen bg-[var(--brand-bg)] px-4 py-10 text-[var(--brand-text)] sm:px-8">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-[var(--brand-text)]">
          {cfg.protocolName} Analytics
        </h1>
        <p className="mt-1 text-sm text-[var(--brand-muted)]">
          Live on-chain metrics · {cfg.chainName} · ${cfg.tokenSymbol}
        </p>
      </div>

      {/* KPI stat cards */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Active Nodes"
          value={formatCompact(data.activeNodes.current)}
          delta={data.activeNodes.delta}
          icon="📡"
        />
        <StatCard
          label="Token Holders"
          value={formatCompact(data.tokenHolders.current)}
          delta={data.tokenHolders.delta}
          icon="👥"
        />
        <StatCard
          label={`TVL (${currency})`}
          value={formatCompact(data.tvl.current, currency)}
          delta={data.tvl.delta}
          icon="🏦"
        />
        <StatCard
          label="New Nodes / Day"
          value={formatCompact(
            data.networkGrowth.series.length
              ? Number(
                  data.networkGrowth.series[data.networkGrowth.series.length - 1]
                    .value ?? 0
                )
              : 0
          )}
          icon="🌐"
        />
      </div>

      {/* Charts — row 1 */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        <LineChart
          title="Active Nodes"
          data={data.activeNodes.series}
          color={cfg.primaryColor}
          format="compact"
        />
        <LineChart
          title="Token Holders"
          data={data.tokenHolders.series}
          color={cfg.secondaryColor}
          format="compact"
        />
      </div>

      {/* Charts — row 2 */}
      <div className="grid gap-6 lg:grid-cols-2">
        <AreaChart
          title="Network Growth (New Nodes)"
          data={data.networkGrowth.series}
          color={cfg.primaryColor}
          format="number"
        />
        <AreaChart
          title={`TVL (${currency})`}
          data={data.tvl.series}
          color={cfg.secondaryColor}
          format="currency"
          currencySymbol={currency}
        />
      </div>

      {/* Footer note */}
      <p className="mt-10 text-center text-xs text-[var(--brand-muted)]">
        Data sourced from Dune Analytics · Refreshes every 5 minutes ·{" "}
        {new Date().toUTCString()}
      </p>
    </main>
  );
}
