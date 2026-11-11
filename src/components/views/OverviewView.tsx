import {
  CalendarCheck2,
  CalendarClock,
  Gauge,
  Inbox,
  Send,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import {
  BookingProgressChart,
  LeadFunnelChart,
  RevenuePerformanceChart,
} from "@/components/charts/DashboardCharts";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Panel } from "@/components/ui/Panel";
import { ScoreMeter } from "@/components/ui/ScoreMeter";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatInr } from "@/lib/format";
import {
  countByStage,
  getBookingSeries,
  getFunnel,
  getOverviewMetrics,
  getRevenueSeries,
  recentEnquiries,
  upcomingOpportunities,
} from "@/lib/metrics";
import type { DashboardSettings, SectionId } from "@/lib/types";

type OverviewViewProps = {
  settings: DashboardSettings;
  onNavigate: (section: SectionId) => void;
};

export function OverviewView({ settings, onNavigate }: OverviewViewProps) {
  const metrics = getOverviewMetrics(settings);
  const progress = Math.min(
    100,
    Math.round((metrics.currentBookings / Math.max(metrics.monthlyTarget, 1)) * 100),
  );
  const capacityUsed = Math.min(
    100,
    Math.round(
      (metrics.currentBookings / Math.max(metrics.monthlyCapacity, 1)) * 100,
    ),
  );
  const stages = countByStage();
  const maxStage = Math.max(...stages.map((stage) => stage.count), 1);

  return (
    <div className="space-y-5">
      <DemoNotice detail="November figures below are a labelled sample book for BAND NYX. They are not pulled from a live calendar, inbox, or payment system." />

      {settings.enquiryAlerts || settings.proposalAlerts ? (
        <div className="grid gap-3 md:grid-cols-2">
          {settings.enquiryAlerts ? (
            <Alert
              label="Enquiry alert"
              text={`${metrics.pendingEnquiries} sample enquiries are still waiting on a proposal.`}
            />
          ) : null}
          {settings.proposalAlerts ? (
            <Alert
              label="Proposal alert"
              text={`${metrics.proposalsSent} sample proposals are still open, including negotiation and the advance.`}
            />
          ) : null}
        </div>
      ) : null}

      <section className="rounded-2xl border border-white/8 bg-gradient-to-br from-[#171422] via-[#12121a] to-[#10141c] p-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-violet-300">
              Monthly booking progress
            </p>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-white">
              {metrics.currentBookings} of {metrics.monthlyTarget} bookings
            </h2>
            <p className="mt-1 max-w-xl text-sm text-zinc-400">
              {metrics.remainingBookings} still to place before the demo target.
              The band can take {metrics.monthlyCapacity} dates this month.
            </p>
          </div>
          <p className="text-3xl font-semibold tracking-tight text-white tabular-nums">
            {progress}%
          </p>
        </div>
        <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-sky-400"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-500">
          <span>Target {metrics.monthlyTarget}</span>
          <span>Confirmed {metrics.currentBookings}</span>
          <span>Capacity used {capacityUsed}%</span>
        </div>
      </section>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Monthly target"
          value={String(metrics.monthlyTarget)}
          detail="Bookings the desk is aiming to confirm"
          icon={Target}
        />
        <StatCard
          label="Current bookings"
          value={String(metrics.currentBookings)}
          detail="Confirmed dates already on the November book"
          icon={CalendarCheck2}
        />
        <StatCard
          label="Remaining bookings"
          value={String(metrics.remainingBookings)}
          detail="Gap between confirmed dates and the target"
          icon={CalendarClock}
        />
        <StatCard
          label="Monthly capacity"
          value={String(metrics.monthlyCapacity)}
          detail="Dates the line-up can still accept"
          icon={Gauge}
        />
        <StatCard
          label="Qualified leads"
          value={String(metrics.qualifiedLeads)}
          detail="Past discovery and not marked lost"
          icon={UserCheck}
        />
        <StatCard
          label="Pending enquiries"
          value={String(metrics.pendingEnquiries)}
          detail="Discovered through interested, no proposal yet"
          icon={Inbox}
        />
        <StatCard
          label="Proposals sent"
          value={String(metrics.proposalsSent)}
          detail="Proposal, negotiation, or advance — not confirmed"
          icon={Send}
        />
        <StatCard
          label="Confirmed bookings"
          value={String(metrics.confirmedBookings)}
          detail="Same three dates counted as current bookings"
          icon={Users}
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel
          title="Monthly booking progress"
          description="Sample season. November matches the confirmed rows. The target bar follows the session setting."
        >
          <BookingProgressChart data={getBookingSeries(settings)} />
        </Panel>
        <Panel
          title="Revenue performance"
          description="Illustrative fees in INR. November is ₹4.5L + ₹2.8L + ₹6.2L from the three confirmations."
        >
          <RevenuePerformanceChart data={getRevenueSeries()} />
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <Panel
          className="xl:col-span-2"
          title="Lead conversion funnel"
          description="Active demo stages. Lost leads sit outside this funnel."
          action={
            <TextButton onClick={() => onNavigate("pipeline")}>Open pipeline</TextButton>
          }
        >
          <LeadFunnelChart data={getFunnel()} />
        </Panel>
        <Panel
          className="xl:col-span-3"
          title="Upcoming event opportunities"
          description="Next dates on the sample calendar, including shows already confirmed."
          action={
            <TextButton onClick={() => onNavigate("radar")}>Open radar</TextButton>
          }
        >
          <ul className="divide-y divide-white/6">
            {upcomingOpportunities().map((item) => (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div>
                  <p className="font-medium text-white">{item.eventName}</p>
                  <p className="mt-0.5 text-xs text-zinc-500">
                    {item.city} · {formatDate(item.eventDate)} · {item.organisation}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-zinc-300 tabular-nums">
                    {formatInr(item.estimatedBudget)}
                  </span>
                  <StatusBadge status={item.status} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-5">
        <Panel
          className="xl:col-span-3"
          title="Recent organiser enquiries"
          description="Latest activity on open sample leads. Confirmed shows are kept on the bookings desk."
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                  {["Organiser", "Event", "Activity", "Score", "Status"].map((heading) => (
                    <th key={heading} className="border-b border-white/8 px-2 py-2 font-medium">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentEnquiries().map((item) => (
                  <tr key={item.id}>
                    <td className="border-b border-white/6 px-2 py-3">
                      <p className="text-white">{item.organiser}</p>
                      <p className="text-xs text-zinc-500">{item.organisation}</p>
                    </td>
                    <td className="border-b border-white/6 px-2 py-3 text-zinc-300">
                      {item.eventName}
                    </td>
                    <td className="border-b border-white/6 px-2 py-3 whitespace-nowrap text-zinc-400">
                      {formatDate(item.lastActivity)}
                    </td>
                    <td className="border-b border-white/6 px-2 py-3">
                      <ScoreMeter score={item.leadScore} />
                    </td>
                    <td className="border-b border-white/6 px-2 py-3">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
        <Panel
          className="xl:col-span-2"
          title="Booking pipeline"
          description="Headcount in each sample status, including losses."
        >
          <ul className="space-y-3">
            {stages.map((stage) => (
              <li key={stage.stage}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-zinc-300">{stage.stage}</span>
                  <span className="text-zinc-500 tabular-nums">{stage.count}</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500/80 to-sky-400/80"
                    style={{ width: `${(stage.count / maxStage) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Alert({ label, text }: { label: string; text: string }) {
  return (
    <p className="rounded-xl border border-sky-400/15 bg-sky-400/8 px-3.5 py-3 text-sm leading-6 text-sky-100">
      <span className="font-medium text-white">{label}.</span> {text}
    </p>
  );
}

function TextButton({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg px-2 py-1 text-xs font-medium text-sky-300 transition hover:bg-white/5 hover:text-white"
    >
      {children}
    </button>
  );
}
