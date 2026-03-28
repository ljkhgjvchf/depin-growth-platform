"use client";

import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { DuneRow } from "@/lib/dune";

interface AreaChartProps {
  title: string;
  data: DuneRow[];
  dataKey?: string;
  xKey?: string;
  color?: string;
  valueFormatter?: (v: number) => string;
}

export function AreaChart({
  title,
  data,
  dataKey = "value",
  xKey = "date",
  color = "#38bdf8",
  valueFormatter,
}: AreaChartProps) {
  const formatTick = (v: string) => {
    const d = new Date(v);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    }
    return v;
  };

  const formatValue = (v: number) =>
    valueFormatter ? valueFormatter(v) : v.toLocaleString();

  return (
    <div className="rounded-2xl border border-[var(--brand-surface)] bg-[var(--brand-surface)] p-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-[var(--brand-muted)]">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <ReAreaChart data={data} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={`grad-${title}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
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
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill={`url(#grad-${title})`}
          />
        </ReAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
