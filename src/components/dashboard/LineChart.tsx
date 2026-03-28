"use client";

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DuneRow } from "@/lib/dune";

interface LineChartProps {
  title: string;
  data: DuneRow[];
  dataKey?: string;   // column name for Y axis, default "value"
  xKey?: string;      // column name for X axis, default "date"
  color?: string;
  format?: "compact" | "currency" | "number";
  currencySymbol?: string;
}

function formatCompact(n: number, prefix = ""): string {
  if (n >= 1_000_000) return `${prefix}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${prefix}${(n / 1_000).toFixed(1)}K`;
  return `${prefix}${n.toLocaleString()}`;
}

export function LineChart({
  title,
  data,
  dataKey = "value",
  xKey = "date",
  color = "#6366f1",
  format = "compact",
  currencySymbol = "$",
}: LineChartProps) {
  const formatTick = (v: string) => {
    if (!v) return "";
    const d = new Date(v);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
    return v.length > 8 ? v.slice(0, 8) + "…" : v;
  };

  const formatValue = (v: number) => {
    if (format === "currency") return formatCompact(v, currencySymbol);
    if (format === "number") return v.toLocaleString();
    return formatCompact(v);
  };

  return (
    <div className="rounded-2xl border border-[var(--brand-surface)] bg-[var(--brand-surface)] p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--brand-muted)]">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <ReLineChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis
            dataKey={xKey}
            tickFormatter={formatTick}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatValue}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip
            formatter={(v) => [formatValue(Number(v ?? 0)), title]}
            labelFormatter={(l) => formatTick(String(l ?? ""))}
            contentStyle={{
              background: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: 8,
              fontSize: 13,
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}
