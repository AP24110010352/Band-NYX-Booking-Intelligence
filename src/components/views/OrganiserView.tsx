import { Building2, Handshake, Sparkles, Users } from "lucide-react";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Panel } from "@/components/ui/Panel";
import { ScoreMeter } from "@/components/ui/ScoreMeter";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatInr } from "@/lib/format";
import { getOrganisers } from "@/lib/metrics";

const RELATION_STYLE = {
  Booked: "text-emerald-200 bg-emerald-400/10 ring-emerald-400/25",
  "In conversation": "text-violet-200 bg-violet-400/10 ring-violet-400/25",
  Qualified: "text-sky-200 bg-sky-400/10 ring-sky-400/25",
  New: "text-zinc-300 bg-white/5 ring-white/10",
} as const;

export function OrganiserView() {
  const organisers = getOrganisers();
  const booked = organisers.filter((item) => item.relationship === "Booked").length;
  const talking = organisers.filter(
    (item) => item.relationship === "In conversation",
  ).length;
  const repeats = organisers.filter((item) => item.events > 1).length;

  return (
    <div className="space-y-5">
      <DemoNotice detail="Organiser profiles are grouped from the same sample book. Relationship labels describe that demo history only." />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Organisers"
          value={String(organisers.length)}
          detail="Distinct organisations in the sample book"
          icon={Building2}
        />
        <StatCard
          label="Already booked"
          value={String(booked)}
          detail="At least one confirmed date or advance"
          icon={Handshake}
        />
        <StatCard
          label="In conversation"
          value={String(talking)}
          detail="Contacted through negotiation, no money in yet"
          icon={Users}
        />
        <StatCard
          label="Repeat names"
          value={String(repeats)}
          detail="Organisations with more than one sample event"
          icon={Sparkles}
        />
      </div>
      <Panel
        title="Organiser desk"
        description="Sorted by the strongest lead score on their sample events. Open value excludes confirmed fees and losses."
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
                {[
                  "Organisation",
                  "City",
                  "Events",
                  "Open value",
                  "Booked value",
                  "Score",
                  "Relationship",
                  "Latest",
                ].map((heading) => (
                  <th key={heading} className="border-b border-white/8 px-3 py-2 font-medium">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {organisers.map((item) => (
                <tr key={item.organisation}>
                  <td className="border-b border-white/6 px-3 py-3">
                    <p className="font-medium text-white">{item.organisation}</p>
                    <p className="text-xs text-zinc-500">{item.organiser}</p>
                  </td>
                  <td className="border-b border-white/6 px-3 py-3">
                    <p>{item.city}</p>
                    <p className="text-xs text-zinc-500">{item.region}</p>
                  </td>
                  <td className="border-b border-white/6 px-3 py-3 tabular-nums">
                    {item.events}
                  </td>
                  <td className="border-b border-white/6 px-3 py-3 tabular-nums">
                    {formatInr(item.openValue)}
                  </td>
                  <td className="border-b border-white/6 px-3 py-3 tabular-nums">
                    {formatInr(item.bookedValue)}
                  </td>
                  <td className="border-b border-white/6 px-3 py-3">
                    <ScoreMeter score={item.bestScore} />
                  </td>
                  <td className="border-b border-white/6 px-3 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${RELATION_STYLE[item.relationship]}`}
                    >
                      {item.relationship}
                    </span>
                  </td>
                  <td className="border-b border-white/6 px-3 py-3">
                    <div className="flex flex-col items-start gap-1">
                      <StatusBadge status={item.latestStatus} />
                      <span className="text-xs text-zinc-500">
                        {formatDate(item.lastActivity)}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
