import type { LeadStage } from "@/lib/types";

const STYLES: Record<LeadStage, string> = {
  Discovered: "bg-zinc-400/10 text-zinc-300 ring-zinc-400/20",
  Qualified: "bg-sky-400/10 text-sky-200 ring-sky-400/25",
  Contacted: "bg-cyan-400/10 text-cyan-200 ring-cyan-400/25",
  Interested: "bg-violet-400/10 text-violet-200 ring-violet-400/25",
  "Proposal Sent": "bg-fuchsia-400/10 text-fuchsia-200 ring-fuchsia-400/25",
  Negotiation: "bg-amber-400/10 text-amber-200 ring-amber-400/30",
  "Advance Received": "bg-emerald-400/10 text-emerald-200 ring-emerald-400/25",
  Confirmed: "bg-green-400/15 text-green-200 ring-green-400/30",
  Lost: "bg-rose-400/10 text-rose-200 ring-rose-400/25",
};

export function StatusBadge({ status }: { status: LeadStage }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset ${STYLES[status]}`}
    >
      {status}
    </span>
  );
}
