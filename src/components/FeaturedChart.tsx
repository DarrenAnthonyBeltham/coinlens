"use client";

import React, { useMemo } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type ChartData = {
  timestamp: number;
  price: number;
};

type FeaturedChartProps = {
  data: ChartData[];
  coinName: string;
};

const fmtUSD = (n: number, max = 2) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: max,
  }).format(n);

const neatUSD = (n: number) => {
  const a = Math.abs(n);
  if (a >= 1) return fmtUSD(n, 2);
  if (a >= 0.01) return fmtUSD(n, 4);
  return fmtUSD(n, 6);
};

function TooltipBox({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any[];
  label?: number;
}) {
  if (!active || !payload?.length || typeof label !== "number") return null;
  const d = new Date(label);
  const price = Number(payload[0].value);
  return (
    <div className="rounded-xl border border-indigo-500/40 bg-[#111827]/95 px-3 py-2 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between gap-6 text-xs text-slate-400">
        <span>
          {d.toLocaleDateString(undefined, { month: "2-digit", day: "2-digit", year: "numeric" })}
        </span>
        <span>{d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full bg-cyan-400" />
        <span className="text-xs text-slate-400">Price:</span>
        <span className="text-sm font-semibold text-slate-100">{neatUSD(price)}</span>
      </div>
    </div>
  );
}

export default function FeaturedChart({ data, coinName }: FeaturedChartProps) {
  const last = data[data.length - 1];
  const prev = data[data.length - 2];
  const lastPrice = last?.price ?? 0;
  const delta = last && prev ? last.price - prev.price : 0;
  const pct = last && prev ? (delta / prev.price) * 100 : 0;

  const domain = useMemo(() => {
    if (!data.length) return ["auto", "auto"] as [any, any];
    const min = Math.min(...data.map((d) => d.price));
    const max = Math.max(...data.map((d) => d.price));
    const pad = (max - min) * 0.06 || max * 0.02 || 1;
    return [min - pad, max + pad];
  }, [data]);

  const pillColor =
    delta >= 0
      ? "from-emerald-500/20 to-teal-400/10 text-emerald-300 border-emerald-600/30"
      : "from-rose-500/20 to-amber-400/10 text-rose-300 border-rose-600/30";

  return (
    <div
      className="w-full rounded-2xl p-4 sm:p-6"
      style={{
        background:
          "radial-gradient(1200px 400px at -10% -50%, rgba(34,211,238,.18), transparent 60%), radial-gradient(900px 300px at 120% 10%, rgba(96,165,250,.18), transparent 60%), linear-gradient(180deg, #0A0F1E 0%, #0B1020 100%)",
        boxShadow:
          "0 10px 30px rgba(8,14,35,.45), inset 0 0 0 1px rgba(59,130,246,.08)",
      }}
    >
      <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h2 className="text-xl font-semibold tracking-wide text-white">
          {coinName} Price (7 Days)
        </h2>
        <span
          className={`rounded-lg border px-3 py-1 text-xs font-medium bg-gradient-to-r ${pillColor}`}
        >
          {neatUSD(lastPrice)} ({pct.toFixed(2)}%)
        </span>
      </div>

      <div className="h-96 w-full rounded-xl ring-1 ring-[#1b2344]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.55} />
                <stop offset="60%" stopColor="#60a5fa" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="4 4" stroke="rgba(99,102,241,.18)" vertical={false} />

            <XAxis
              dataKey="timestamp"
              tickFormatter={(t) =>
                new Date(t).toLocaleDateString(undefined, { month: "short", day: "numeric" })
              }
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={22}
            />

            <YAxis
              domain={domain as any}
              tickFormatter={(v) => neatUSD(Number(v))}
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />

            <Tooltip
              content={<TooltipBox />}
              cursor={{ stroke: "rgba(96,165,250,.45)", strokeDasharray: "4 4" }}
              wrapperStyle={{ outline: "none" }}
            />

            <Area
              type="monotone"
              dataKey="price"
              stroke="#60a5fa"
              strokeWidth={3}
              fill="url(#priceGradient)"
              dot={false}
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
