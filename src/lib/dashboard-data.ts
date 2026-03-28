import type { DashboardConfig } from "@/config/dashboard";
import {
  fetchDuneQuery,
  mockTimeSeriesRows,
  type DuneRow,
} from "@/lib/dune";

export interface DashboardData {
  activeNodes: { current: number; delta: string; series: DuneRow[] };
  tokenHolders: { current: number; delta: string; series: DuneRow[] };
  networkGrowth: { series: DuneRow[] };
  tvl: { current: number; delta: string; series: DuneRow[] };
}

function lastValue(rows: DuneRow[]): number {
  if (!rows.length) return 0;
  const last = rows[rows.length - 1];
  return Number(last.value ?? 0);
}

function prevValue(rows: DuneRow[]): number {
  if (rows.length < 2) return 0;
  const prev = rows[rows.length - 2];
  return Number(prev.value ?? 0);
}

function pctDelta(curr: number, prev: number): string {
  if (!prev) return "—";
  const pct = ((curr - prev) / prev) * 100;
  const sign = pct >= 0 ? "+" : "";
  return `${sign}${pct.toFixed(1)}% 30d`;
}

export async function fetchDashboardData(
  config: DashboardConfig
): Promise<DashboardData> {
  const { duneQueries, primaryColor, secondaryColor } = config;

  // Fetch all in parallel; fall back to mock if query returns null
  const [nodeRows, holderRows, growthRows, tvlRows] = await Promise.all([
    fetchDuneQuery(duneQueries.activeNodes.queryId).then(
      (r) => r?.rows ?? mockTimeSeriesRows(90, 18000, 0.003)
    ),
    fetchDuneQuery(duneQueries.tokenHolders.queryId).then(
      (r) => r?.rows ?? mockTimeSeriesRows(90, 42000, 0.004)
    ),
    fetchDuneQuery(duneQueries.networkGrowth.queryId).then(
      (r) => r?.rows ?? mockTimeSeriesRows(90, 200, 0.005)
    ),
    fetchDuneQuery(duneQueries.tvl.queryId).then(
      (r) => r?.rows ?? mockTimeSeriesRows(90, 3_200_000, 0.002)
    ),
  ]);

  const nodeNow = lastValue(nodeRows);
  const holderNow = lastValue(holderRows);
  const tvlNow = lastValue(tvlRows);

  return {
    activeNodes: {
      current: nodeNow,
      delta: pctDelta(nodeNow, prevValue(nodeRows)),
      series: nodeRows,
    },
    tokenHolders: {
      current: holderNow,
      delta: pctDelta(holderNow, prevValue(holderRows)),
      series: holderRows,
    },
    networkGrowth: {
      series: growthRows,
    },
    tvl: {
      current: tvlNow,
      delta: pctDelta(tvlNow, prevValue(tvlRows)),
      series: tvlRows,
    },
  };
}
