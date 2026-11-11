"use client";

import { Menu, Search } from "lucide-react";
import { SECTION_META } from "@/lib/navigation";
import type { SectionId } from "@/lib/types";

type TopBarProps = {
  section: SectionId;
  query: string;
  onQueryChange: (query: string) => void;
  onOpenRadar: () => void;
  onOpenMenu: () => void;
};

export function TopBar({
  section,
  query,
  onQueryChange,
  onOpenRadar,
  onOpenMenu,
}: TopBarProps) {
  const meta = SECTION_META[section];

  return (
    <header className="sticky top-0 z-20 border-b border-white/8 bg-[#07070c]/85 backdrop-blur-xl">
      <div className="flex flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenMenu}
          className="rounded-lg border border-white/10 p-2 text-zinc-300 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">
            {meta.kicker}
          </p>
          <h1 className="truncate text-lg font-semibold tracking-tight text-white">
            {meta.label}
          </h1>
        </div>
        <form
          className="relative w-full sm:w-72"
          onSubmit={(event) => {
            event.preventDefault();
            onOpenRadar();
          }}
        >
          <label className="sr-only" htmlFor="desk-search">
            Search the demo book
          </label>
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
          <input
            id="desk-search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search the demo book"
            className="w-full rounded-xl border border-white/10 bg-white/4 py-2 pr-3 pl-9 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-violet-400/40"
          />
        </form>
      </div>
      <p className="px-4 pb-3 text-sm text-zinc-500 sm:px-6 lg:px-8">{meta.summary}</p>
    </header>
  );
}
