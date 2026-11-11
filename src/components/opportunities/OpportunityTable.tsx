import { ScoreMeter } from "@/components/ui/ScoreMeter";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatInr } from "@/lib/format";
import type { Opportunity } from "@/lib/types";

export function OpportunityTable({ rows }: { rows: Opportunity[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[920px] border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            {[
              "Event",
              "City",
              "Date",
              "Organiser",
              "Source",
              "Budget",
              "Score",
              "Status",
            ].map((heading) => (
              <th key={heading} className="border-b border-white/8 px-3 py-2 font-medium">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="text-zinc-200">
              <td className="border-b border-white/6 px-3 py-3">
                <p className="font-medium text-white">{row.eventName}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{row.category}</p>
              </td>
              <td className="border-b border-white/6 px-3 py-3">
                <p>{row.city}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{row.region}</p>
              </td>
              <td className="border-b border-white/6 px-3 py-3 whitespace-nowrap">
                {formatDate(row.eventDate)}
              </td>
              <td className="border-b border-white/6 px-3 py-3">
                <p>{row.organiser}</p>
                <p className="mt-0.5 text-xs text-zinc-500">{row.organisation}</p>
              </td>
              <td className="border-b border-white/6 px-3 py-3 text-xs text-zinc-400">
                {row.source}
              </td>
              <td className="border-b border-white/6 px-3 py-3 whitespace-nowrap tabular-nums">
                {formatInr(row.estimatedBudget)}
              </td>
              <td className="border-b border-white/6 px-3 py-3">
                <ScoreMeter score={row.leadScore} />
              </td>
              <td className="border-b border-white/6 px-3 py-3">
                <StatusBadge status={row.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
