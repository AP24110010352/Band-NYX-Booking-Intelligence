"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip } from "@/components/charts/ChartTooltip";
import { formatInrCompact } from "@/lib/format";

const GRID = "rgba(255,255,255,0.06)";
const TICK = { fill: "#a1a1aa", fontSize: 12 };

const axisProps = {
  axisLine: false,
  tickLine: false,
  tick: TICK,
} as const;

export function BookingProgressChart({
  data,
}: {
  data: { month: string; bookings: number; target: number }[];
}) {
  return (
    <div className="h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barGap={4} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis {...axisProps} allowDecimals={false} width={36} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            content={<ChartTooltip />}
          />
          <Bar dataKey="bookings" name="Bookings" fill="#8b5cf6" radius={[6, 6, 0, 0]} maxBarSize={22} />
          <Bar dataKey="target" name="Target" fill="#60a5fa" radius={[6, 6, 0, 0]} maxBarSize={22} fillOpacity={0.45} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function RevenuePerformanceChart({
  data,
}: {
  data: { month: string; revenue: number }[];
}) {
  return (
    <div className="h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="nyxRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="month" {...axisProps} />
          <YAxis
            {...axisProps}
            width={48}
            tickFormatter={(value: number) => formatInrCompact(value)}
          />
          <Tooltip
            content={
              <ChartTooltip
                formatValue={(value) => formatInrCompact(value)}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Revenue"
            stroke="#93c5fd"
            strokeWidth={2}
            fill="url(#nyxRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

const FUNNEL_COLORS = [
  "#71717a",
  "#38bdf8",
  "#22d3ee",
  "#a78bfa",
  "#8b5cf6",
  "#fbbf24",
  "#34d399",
  "#4ade80",
];

export function LeadFunnelChart({
  data,
}: {
  data: { stage: string; count: number }[];
}) {
  return (
    <div className="h-80 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 12, left: 8, bottom: 0 }}
        >
          <CartesianGrid stroke={GRID} horizontal={false} />
          <XAxis type="number" {...axisProps} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="stage"
            width={118}
            {...axisProps}
          />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            content={<ChartTooltip />}
          />
          <Bar dataKey="count" name="Leads" radius={[0, 6, 6, 0]} maxBarSize={16}>
            {data.map((entry, index) => (
              <Cell key={entry.stage} fill={FUNNEL_COLORS[index % FUNNEL_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ValueBarChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <div className="h-72 w-full min-w-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 0, right: 12, left: 8, bottom: 0 }}
        >
          <CartesianGrid stroke={GRID} horizontal={false} />
          <XAxis
            type="number"
            {...axisProps}
            tickFormatter={(value: number) => formatInrCompact(value)}
          />
          <YAxis type="category" dataKey="name" width={148} {...axisProps} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.03)" }}
            content={
              <ChartTooltip formatValue={(value) => formatInrCompact(value)} />
            }
          />
          <Bar dataKey="value" name="Value" fill="#8b5cf6" radius={[0, 6, 6, 0]} maxBarSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
