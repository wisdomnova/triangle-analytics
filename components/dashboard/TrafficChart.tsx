"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface TrafficChartProps {
  data: {
    date: string;
    visitors: number;
    pageViews: number;
    bounceRate: number;
  }[];
  activeMetric: string;
}

export default function TrafficChart({ data, activeMetric }: TrafficChartProps) {
  const getMetricKey = () => {
    if (activeMetric === "pageviews") return "pageViews";
    if (activeMetric === "bouncerate") return "bounceRate";
    return "visitors";
  };

  const metricKey = getMetricKey();

  return (
    <div className="w-full bg-white rounded-3xl p-4 sm:p-8 flex flex-col gap-6">
      <div className="w-full h-56 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#2563EB" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="0"
              vertical={false}
              stroke="#F3F4F6"
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 300 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9CA3AF", fontSize: 12, fontWeight: 300 }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-neutral-900 text-white px-3.5 py-2 rounded-xl text-xs font-light">
                      <span className="text-neutral-400 block mb-0.5">{label}</span>
                      <span className="font-normal text-sm">{payload[0].value}</span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey={metricKey}
              stroke="#2563EB"
              strokeWidth={2.5}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
