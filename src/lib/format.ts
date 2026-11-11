export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatInrCompact(amount: number) {
  const abs = Math.abs(amount);
  if (abs >= 100000) {
    const lakhs = amount / 100000;
    const digits = Number.isInteger(lakhs) ? 0 : 1;
    return `₹${lakhs.toFixed(digits)}L`;
  }
  if (abs >= 1000) {
    return `₹${Math.round(amount / 1000)}k`;
  }
  return formatInr(amount);
}

export function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function clamp(value: number, min: number, max: number) {
  if (Number.isNaN(value)) return min;
  return Math.min(max, Math.max(min, value));
}
