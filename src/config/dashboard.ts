/**
 * Dashboard config — one object per DePIN client/protocol.
 * Drives which Dune queries to fetch and how to label the charts.
 */

export interface DuneQueryConfig {
  queryId: number;
  label: string;
}

export interface DashboardConfig {
  // Protocol identity
  protocolName: string;
  tokenSymbol: string;
  chainName: string; // e.g. "Solana", "Polygon", "Arbitrum"
  primaryColor: string;
  secondaryColor: string;

  // Dune query IDs for each metric
  // Set to 0 to disable that panel and show mock data instead
  duneQueries: {
    activeNodes: DuneQueryConfig;
    tokenHolders: DuneQueryConfig;
    networkGrowth: DuneQueryConfig; // daily/weekly new nodes time series
    tvl: DuneQueryConfig;
  };

  // Optional: override displayed currency symbol
  currencySymbol?: string; // default "$"
}

// Default demo config — replace per client
export const defaultDashboardConfig: DashboardConfig = {
  protocolName: "HeliosNet",
  tokenSymbol: "HLS",
  chainName: "Solana",
  primaryColor: "#6366f1",
  secondaryColor: "#38bdf8",
  currencySymbol: "$",
  duneQueries: {
    // Set to real Dune query IDs per client.
    // 0 = fall back to mock data (safe default for template).
    activeNodes: { queryId: 0, label: "Active Nodes" },
    tokenHolders: { queryId: 0, label: "Token Holders" },
    networkGrowth: { queryId: 0, label: "Network Growth" },
    tvl: { queryId: 0, label: "Total Value Locked" },
  },
};
