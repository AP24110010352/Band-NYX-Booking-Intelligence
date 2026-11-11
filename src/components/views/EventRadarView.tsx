"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { OpportunityTable } from "@/components/opportunities/OpportunityTable";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Panel } from "@/components/ui/Panel";
import { opportunities } from "@/lib/demo-data";
import { formatInr } from "@/lib/format";
import { filterOpportunities, sumBudgets } from "@/lib/metrics";
import { CATEGORIES, REGIONS, type EventCategory, type Region } from "@/lib/types";

type EventRadarViewProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

export function EventRadarView({ query, onQueryChange }: EventRadarViewProps) {
  const [regions, setRegions] = useState<Region[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);

  const rows = useMemo(
    () => filterOpportunities(opportunities, { regions, categories, query }),
    [regions, categories, query],
  );

  function toggleRegion(region: Region) {
    setRegions((current) =>
      current.includes(region)
        ? current.filter((item) => item !== region)
        : [...current, region],
    );
  }

  function toggleCategory(category: EventCategory) {
    setCategories((current) =>
      current.includes(category)
        ? current.filter((item) => item !== category)
        : [...current, category],
    );
  }

  const filtersActive = regions.length > 0 || categories.length > 0 || query.trim().length > 0;

  return (
    <div className="space-y-5">
      <DemoNotice detail="Event Radar is a curated sample list. Filters run in the browser. Sources marked DEMO are not live scrapes or venue feeds." />
      <Panel
        title="Filters"
        description="Choose any mix of region and event type. Selected filters combine: a lead must match one chosen region and one chosen type."
        action={
          filtersActive ? (
            <button
              type="button"
              onClick={() => {
                setRegions([]);
                setCategories([]);
                onQueryChange("");
              }}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-zinc-400 hover:bg-white/5 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
              Clear
            </button>
          ) : null
        }
      >
        <label className="relative mb-4 block">
          <span className="sr-only">Search opportunities</span>
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search event, city, organiser, or source"
            className="w-full rounded-xl border border-white/10 bg-black/30 py-2.5 pr-3 pl-10 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-400/50"
          />
        </label>
        <FilterRow label="Region">
          {REGIONS.map((region) => (
            <FilterChip
              key={region}
              active={regions.includes(region)}
              onClick={() => toggleRegion(region)}
            >
              {region}
            </FilterChip>
          ))}
        </FilterRow>
        <FilterRow label="Type">
          {CATEGORIES.map((category) => (
            <FilterChip
              key={category}
              active={categories.includes(category)}
              onClick={() => toggleCategory(category)}
            >
              {category}
            </FilterChip>
          ))}
        </FilterRow>
      </Panel>

      <Panel
        title={`${rows.length} demo ${rows.length === 1 ? "opportunity" : "opportunities"}`}
        description={
          rows.length
            ? `Combined sample budget ${formatInr(sumBudgets(rows))}. Budgets are estimates, not quoted fees.`
            : "No sample rows match these filters."
        }
      >
        {rows.length ? (
          <OpportunityTable rows={rows} />
        ) : (
          <p className="rounded-xl border border-dashed border-white/10 px-4 py-10 text-center text-sm text-zinc-500">
            Nothing in the demo book matches. Clear a region or type to widen the list.
          </p>
        )}
      </Panel>
    </div>
  );
}

function FilterRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-start">
      <p className="w-16 shrink-0 pt-1.5 text-[11px] uppercase tracking-[0.14em] text-zinc-500">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs transition ${
        active
          ? "border-violet-400/40 bg-violet-400/15 text-violet-100"
          : "border-white/10 bg-white/3 text-zinc-400 hover:border-white/20 hover:text-zinc-100"
      }`}
    >
      {children}
    </button>
  );
}
