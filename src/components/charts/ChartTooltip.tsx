type TipItem = {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
};

export function ChartTooltip({
  active,
  payload,
  label,
  formatValue,
}: {
  active?: boolean;
  payload?: TipItem[];
  label?: string;
  formatValue?: (value: number, name?: string) => string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-[#0c0c14] px-3 py-2 text-xs shadow-2xl">
      <p className="mb-1 text-zinc-400">{label}</p>
      {payload.map((item) => {
        const numeric = typeof item.value === "number" ? item.value : Number(item.value);
        const text =
          formatValue && Number.isFinite(numeric)
            ? formatValue(numeric, item.name)
            : String(item.value ?? "");
        return (
          <p key={`${item.dataKey}-${item.name}`} className="text-zinc-100">
            <span
              className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: item.color ?? "#a78bfa" }}
            />
            {item.name}: {text}
          </p>
        );
      })}
    </div>
  );
}
