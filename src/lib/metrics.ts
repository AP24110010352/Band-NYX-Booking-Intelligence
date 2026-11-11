import {
  monthlyHistory,
  OPEN_ENQUIRY_STAGES,
  opportunities,
  PROPOSAL_STAGES,
} from "@/lib/demo-data";
import type {
  DashboardSettings,
  EventCategory,
  LeadStage,
  Opportunity,
  Region,
} from "@/lib/types";
import { PIPELINE_STAGES } from "@/lib/types";

const ACTIVE_FUNNEL: LeadStage[] = PIPELINE_STAGES.filter(
  (stage) => stage !== "Lost",
);

export function countByStage(items: Opportunity[] = opportunities) {
  return PIPELINE_STAGES.map((stage) => ({
    stage,
    count: items.filter((item) => item.status === stage).length,
  }));
}

export function getOverviewMetrics(settings: DashboardSettings) {
  const confirmedBookings = opportunities.filter(
    (item) => item.status === "Confirmed",
  ).length;
  const qualifiedLeads = opportunities.filter(
    (item) => item.status !== "Discovered" && item.status !== "Lost",
  ).length;
  const pendingEnquiries = opportunities.filter((item) =>
    (OPEN_ENQUIRY_STAGES as readonly string[]).includes(item.status),
  ).length;
  const proposalsSent = opportunities.filter((item) =>
    (PROPOSAL_STAGES as readonly string[]).includes(item.status),
  ).length;

  return {
    monthlyTarget: settings.monthlyTarget,
    currentBookings: confirmedBookings,
    remainingBookings: Math.max(settings.monthlyTarget - confirmedBookings, 0),
    monthlyCapacity: settings.monthlyCapacity,
    qualifiedLeads,
    pendingEnquiries,
    proposalsSent,
    confirmedBookings,
  };
}

export function getBookingSeries(settings: DashboardSettings) {
  const confirmed = opportunities.filter((item) => item.status === "Confirmed").length;
  return monthlyHistory.map((row) => ({
    month: row.month,
    bookings: row.month === "Nov" ? confirmed : row.bookings,
    target: settings.monthlyTarget,
  }));
}

export function getRevenueSeries() {
  return monthlyHistory.map((row) => ({
    month: row.month,
    revenue: row.revenue,
  }));
}

export function getFunnel() {
  return ACTIVE_FUNNEL.map((stage) => ({
    stage,
    count: opportunities.filter((item) => item.status === stage).length,
  }));
}

export function upcomingOpportunities(limit = 5) {
  return [...opportunities]
    .filter((item) => item.status !== "Lost" && item.eventDate >= "2026-11-10")
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
    .slice(0, limit);
}

export function recentEnquiries(limit = 6) {
  return [...opportunities]
    .filter((item) => item.status !== "Confirmed" && item.status !== "Lost")
    .sort((a, b) => b.lastActivity.localeCompare(a.lastActivity))
    .slice(0, limit);
}

export function sumBudgets(items: Opportunity[]) {
  return items.reduce((total, item) => total + item.estimatedBudget, 0);
}

export function isBooked(status: LeadStage) {
  return status === "Confirmed" || status === "Advance Received";
}

export function getBookings() {
  return opportunities
    .filter((item) => isBooked(item.status))
    .sort((a, b) => a.eventDate.localeCompare(b.eventDate))
    .map((item) => {
      const advanceRate = item.status === "Confirmed" ? 0.4 : 0.3;
      const advance = Math.round(item.estimatedBudget * advanceRate);
      return {
        ...item,
        advanceRate,
        advance,
        balance: item.estimatedBudget - advance,
      };
    });
}

export type OrganiserSummary = {
  organisation: string;
  organiser: string;
  city: string;
  region: Region;
  events: number;
  openValue: number;
  bookedValue: number;
  bestScore: number;
  relationship: "Booked" | "In conversation" | "Qualified" | "New";
  lastActivity: string;
  latestStatus: LeadStage;
};

export function getOrganisers(): OrganiserSummary[] {
  const groups = new Map<string, Opportunity[]>();
  for (const item of opportunities) {
    const current = groups.get(item.organisation) ?? [];
    current.push(item);
    groups.set(item.organisation, current);
  }

  return [...groups.values()]
    .map((items) => {
      const latest = [...items].sort((a, b) =>
        b.lastActivity.localeCompare(a.lastActivity),
      )[0];
      const booked = items.some((item) => isBooked(item.status));
      const talking = items.some((item) =>
        ["Contacted", "Interested", "Proposal Sent", "Negotiation"].includes(
          item.status,
        ),
      );
      const qualified = items.some((item) => item.status === "Qualified");
      const relationship: OrganiserSummary["relationship"] = booked
        ? "Booked"
        : talking
          ? "In conversation"
          : qualified
            ? "Qualified"
            : "New";

      return {
        organisation: latest.organisation,
        organiser: latest.organiser,
        city: latest.city,
        region: latest.region,
        events: items.length,
        openValue: sumBudgets(
          items.filter((item) => item.status !== "Lost" && !isBooked(item.status)),
        ),
        bookedValue: sumBudgets(items.filter((item) => isBooked(item.status))),
        bestScore: Math.max(...items.map((item) => item.leadScore)),
        relationship,
        lastActivity: latest.lastActivity,
        latestStatus: latest.status,
      };
    })
    .sort((a, b) => b.bestScore - a.bestScore || b.bookedValue - a.bookedValue);
}

export function valueBy<T extends string>(
  key: (item: Opportunity) => T,
  items: Opportunity[],
) {
  const totals = new Map<T, number>();
  for (const item of items) {
    const name = key(item);
    totals.set(name, (totals.get(name) ?? 0) + item.estimatedBudget);
  }
  return [...totals.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function pipelineByRegion() {
  return valueBy(
    (item) => item.region,
    opportunities.filter((item) => item.status !== "Lost"),
  );
}

export function pipelineByCategory() {
  return valueBy(
    (item) => item.category,
    opportunities.filter((item) => item.status !== "Lost"),
  );
}

export function getRevenueSnapshot() {
  const confirmed = opportunities.filter((item) => item.status === "Confirmed");
  const advance = opportunities.filter((item) => item.status === "Advance Received");
  const open = opportunities.filter(
    (item) => item.status !== "Lost" && !isBooked(item.status),
  );
  const lost = opportunities.filter((item) => item.status === "Lost");
  const bookedFees = sumBudgets(confirmed);
  const closed = confirmed.length + lost.length;

  return {
    bookedFees,
    advanceFees: sumBudgets(advance),
    openPipeline: sumBudgets(open),
    averageConfirmed: confirmed.length ? Math.round(bookedFees / confirmed.length) : 0,
    winRate: closed ? Math.round((confirmed.length / closed) * 100) : 0,
    byRegion: valueBy((item) => item.region, [...confirmed, ...advance]),
    byCategory: pipelineByCategory() as { name: EventCategory; value: number }[],
  };
}

export function filterOpportunities(
  items: Opportunity[],
  filters: {
    regions: Region[];
    categories: EventCategory[];
    query: string;
  },
) {
  const query = filters.query.trim().toLowerCase();
  return items.filter((item) => {
    if (filters.regions.length > 0 && !filters.regions.includes(item.region)) {
      return false;
    }
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(item.category)
    ) {
      return false;
    }
    if (!query) return true;
    const haystack = [
      item.eventName,
      item.city,
      item.region,
      item.category,
      item.organiser,
      item.organisation,
      item.source,
      item.status,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query);
  });
}
