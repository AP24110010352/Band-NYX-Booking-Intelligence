import { DemoNotice } from "@/components/ui/DemoNotice";
import { Panel } from "@/components/ui/Panel";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate, formatInr } from "@/lib/format";
import { getBookings, sumBudgets } from "@/lib/metrics";

export function BookingsView() {
  const bookings = getBookings();
  const fees = sumBudgets(bookings);
  const advances = bookings.reduce((total, item) => total + item.advance, 0);

  return (
    <div className="space-y-5">
      <DemoNotice detail="Contracts, advances, and balances are illustrative splits on the sample fees. No payment gateway is connected." />
      <div className="grid gap-3 sm:grid-cols-3">
        <Metric label="Dates on the book" value={String(bookings.length)} />
        <Metric label="Sample fees" value={formatInr(fees)} />
        <Metric label="Advances logged" value={formatInr(advances)} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {bookings.map((booking) => (
          <Panel
            key={booking.id}
            title={booking.eventName}
            description={`${booking.city}, ${booking.region} · ${booking.category}`}
            action={<StatusBadge status={booking.status} />}
          >
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <Field label="Event date" value={formatDate(booking.eventDate)} />
              <Field label="Organiser" value={booking.organiser} hint={booking.organisation} />
              <Field label="Sample fee" value={formatInr(booking.estimatedBudget)} />
              <Field
                label={`Advance ${Math.round(booking.advanceRate * 100)}%`}
                value={formatInr(booking.advance)}
              />
              <Field label="Balance in the demo" value={formatInr(booking.balance)} />
              <Field label="Source" value={booking.source} />
            </dl>
            <p className="mt-4 rounded-xl border border-dashed border-white/10 px-3 py-2 text-xs leading-5 text-zinc-500">
              Demo contract · not executed. Advance rate is a desk convention in this
              sample: 40% on confirmed shows, 30% once an advance is marked.
            </p>
          </Panel>
        ))}
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-[#12121a] px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-white tabular-nums">
        {value}
      </p>
    </div>
  );
}

function Field({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.14em] text-zinc-500">{label}</dt>
      <dd className="mt-1 text-zinc-100">{value}</dd>
      {hint ? <dd className="text-xs text-zinc-500">{hint}</dd> : null}
    </div>
  );
}
