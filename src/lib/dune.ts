/**
 * Dune Analytics API client.
 * Uses the Dune v3 API: https://docs.dune.com/api-reference/executions/endpoint/execute-query
 *
 * Set DUNE_API_KEY in your environment to enable live data.
 * When queryId is 0 or no key is set, falls back to mock data.
 */

export interface DuneRow {
  [key: string]: string | number | null;
}

export interface DuneResult {
  rows: DuneRow[];
  metadata?: {
    column_names: string[];
    result_set_bytes: number;
    total_row_count: number;
    datapoint_count: number;
    pending_time_millis: number;
    execution_time_millis: number;
  };
}

const DUNE_API_BASE = "https://api.dune.com/api/v1";

export async function fetchDuneQuery(
  queryId: number,
  params?: Record<string, string | number>
): Promise<DuneResult | null> {
  const apiKey = process.env.DUNE_API_KEY;
  if (!apiKey || queryId === 0) return null;

  try {
    // Trigger execution
    const execRes = await fetch(`${DUNE_API_BASE}/query/${queryId}/execute`, {
      method: "POST",
      headers: {
        "X-Dune-API-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query_parameters: params ?? {} }),
      next: { revalidate: 300 }, // cache 5 min
    });

    if (!execRes.ok) return null;
    const { execution_id } = (await execRes.json()) as { execution_id: string };

    // Poll for results (max 30 s)
    for (let i = 0; i < 15; i++) {
      await new Promise((r) => setTimeout(r, 2000));
      const statusRes = await fetch(
        `${DUNE_API_BASE}/execution/${execution_id}/results`,
        { headers: { "X-Dune-API-Key": apiKey } }
      );
      if (!statusRes.ok) continue;
      const data = await statusRes.json();
      if (data.state === "QUERY_STATE_COMPLETED") {
        return data.result as DuneResult;
      }
      if (data.state === "QUERY_STATE_FAILED") return null;
    }
    return null;
  } catch {
    return null;
  }
}

// ---------- Mock data helpers ----------

export function mockTimeSeriesRows(
  days: number,
  startValue: number,
  growth: number
): DuneRow[] {
  const rows: DuneRow[] = [];
  const now = new Date();
  let value = startValue;
  for (let i = days; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    value = Math.round(value * (1 + growth + (Math.random() - 0.5) * 0.02));
    rows.push({
      date: d.toISOString().slice(0, 10),
      value,
    });
  }
  return rows;
}

export function mockScalarRow(label: string, value: number): DuneRow[] {
  return [{ label, value }];
}
