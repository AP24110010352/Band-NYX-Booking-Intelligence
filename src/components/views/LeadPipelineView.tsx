import { DemoNotice } from "@/components/ui/DemoNotice";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { opportunities } from "@/lib/demo-data";
import { formatDate, formatInrCompact } from "@/lib/format";
import { PIPELINE_STAGES } from "@/lib/types";

export function LeadPipelineView() {
  return (
    <div className="space-y-5">
      <DemoNotice detail="Stages are fixed on the sample records. Moving a card would imply a live CRM, which this desk does not have yet." />
      <div className="flex gap-3 overflow-x-auto pb-2">
        {PIPELINE_STAGES.map((stage) => {
          const cards = opportunities.filter((item) => item.status === stage);
          return (
            <section
              key={stage}
              className="w-72 shrink-0 rounded-2xl border border-white/8 bg-[#101018]"
            >
              <header className="flex items-center justify-between gap-2 border-b border-white/8 px-3 py-3">
                <StatusBadge status={stage} />
                <span className="text-xs text-zinc-500 tabular-nums">{cards.length}</span>
              </header>
              <ul className="space-y-2 p-2">
                {cards.map((card) => (
                  <li
                    key={card.id}
                    className="rounded-xl border border-white/8 bg-[#171722] p-3"
                  >
                    <p className="text-sm font-medium text-white">{card.eventName}</p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {card.city} · {formatDate(card.eventDate)}
                    </p>
                    <p className="mt-2 text-xs text-zinc-400">{card.organisation}</p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-zinc-300 tabular-nums">
                        {formatInrCompact(card.estimatedBudget)}
                      </span>
                      <span className="text-zinc-500">Score {card.leadScore}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
