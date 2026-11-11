import { Mail, MessageCircle, Phone } from "lucide-react";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Panel } from "@/components/ui/Panel";
import { outreachLog } from "@/lib/demo-data";
import { formatDate } from "@/lib/format";
import type { OutreachChannel, OutreachStatus } from "@/lib/types";

const CHANNEL_ICON: Record<OutreachChannel, typeof Mail> = {
  Email: Mail,
  WhatsApp: MessageCircle,
  Call: Phone,
};

const STATUS_STYLE: Record<OutreachStatus, string> = {
  Queued: "text-zinc-300 bg-white/5",
  Sent: "text-sky-200 bg-sky-400/10",
  Replied: "text-emerald-200 bg-emerald-400/10",
  "No response": "text-amber-200 bg-amber-400/10",
};

export function OutreachView() {
  const replied = outreachLog.filter((item) => item.status === "Replied").length;
  const queued = outreachLog.filter((item) => item.status === "Queued").length;

  return (
    <div className="space-y-5">
      <DemoNotice detail="These are sample message previews for the booking desk. The app does not send WhatsApp, email, or place calls." />
      <div className="grid gap-3 sm:grid-cols-3">
        <Summary label="Logged threads" value={String(outreachLog.length)} />
        <Summary label="Replies in the sample" value={String(replied)} />
        <Summary label="Still queued" value={String(queued)} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {outreachLog.map((item) => {
          const Icon = CHANNEL_ICON[item.channel];
          return (
            <Panel
              key={item.id}
              title={item.template}
              description={`${item.organisation} · ${item.eventName}`}
              action={
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[item.status]}`}
                >
                  {item.status}
                </span>
              }
            >
              <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
                <Icon className="h-3.5 w-3.5 text-violet-300" aria-hidden />
                <span>{item.channel}</span>
                <span aria-hidden>·</span>
                <span>{item.organiser}</span>
                <span aria-hidden>·</span>
                <span>{formatDate(item.loggedAt)}</span>
              </div>
              <p className="rounded-xl bg-black/30 px-3 py-3 text-sm leading-6 text-zinc-300">
                {item.preview}
              </p>
            </Panel>
          );
        })}
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#12121a] px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tabular-nums text-white">{value}</p>
    </div>
  );
}
