import {
  RevenuePerformanceChart,
  ValueBarChart,
} from "@/components/charts/DashboardCharts";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Panel } from "@/components/ui/Panel";
import { StatCard } from "@/components/ui/StatCard";
import { formatInr } from "@/lib/format";
import { getRevenueSeries, getRevenueSnapshot, pipelineByRegion } from "@/lib/metrics";
import { CircleDollarSign, Percent, Scale, Wallet } from "lucide-react";

export function RevenueView() {
  const snapshot = getRevenueSnapshot();

  return (
    <div className="space-y-5">
      <DemoNotice detail="Revenue analytics use the sample fee column. June to October are season illustrations. November matches the three confirmed bookings." />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Confirmed fees"
          value={formatInr(snapshot.bookedFees)}
          detail="Three November confirmations"
          icon={Wallet}
        />
        <StatCard
          label="Advance on the book"
          value={formatInr(snapshot.advanceFees)}
          detail="Warangal sangeet, not yet confirmed"
          icon={CircleDollarSign}
        />
        <StatCard
          label="Open pipeline"
          value={formatInr(snapshot.openPipeline)}
          detail="Estimates before advance or confirmation"
          icon={Scale}
        />
        <StatCard
          label="Closed win rate"
          value={`${snapshot.winRate}%`}
          detail="Confirmed divided by confirmed plus lost"
          icon={Percent}
        />
      </div>
      <Panel
        title="Fee trend"
        description={`Average confirmed fee in this sample is ${formatInr(snapshot.averageConfirmed)}.`}
      >
        <RevenuePerformanceChart data={getRevenueSeries()} />
      </Panel>
      <div className="grid gap-4 xl:grid-cols-2">
        <Panel
          title="Value by region"
          description="Confirmed, advance, and open estimates. Losses are left out."
        >
          <ValueBarChart data={pipelineByRegion()} />
        </Panel>
        <Panel
          title="Open and booked mix by type"
          description="Every non-lost sample budget, grouped by event type."
        >
          <ValueBarChart data={snapshot.byCategory} />
        </Panel>
      </div>
    </div>
  );
}
