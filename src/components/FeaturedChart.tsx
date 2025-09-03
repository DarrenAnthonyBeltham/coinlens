"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartData = {
  timestamp: number;
  price: number;
};

type FeaturedChartProps = {
  data: ChartData[];
  coinName: string;
};

export default function FeaturedChart({ data, coinName }: FeaturedChartProps) {
  return (
    <div className="h-96 w-full bg-gray-900 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">{coinName} Price Chart (7 Days)</h2>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="timestamp"
            tickFormatter={(time) => new Date(time).toLocaleDateString()}
            stroke="#888888"
          />
          <YAxis
            domain={["dataMin", "dataMax"]}
            stroke="#888888"
            tickFormatter={(price) => `$${price.toFixed(2)}`}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
            labelFormatter={(time) => new Date(time).toLocaleString()}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#ef4444"
            fillOpacity={1}
            fill="url(#colorPrice)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}