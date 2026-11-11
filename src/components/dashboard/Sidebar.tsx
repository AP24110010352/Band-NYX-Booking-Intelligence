import {
  CalendarCheck2,
  ChartColumn,
  LayoutDashboard,
  Radar,
  Send,
  Settings,
  Users,
  Waypoints,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SECTION_META, SECTION_ORDER } from "@/lib/navigation";
import type { DashboardSettings, SectionId } from "@/lib/types";

const ICONS: Record<SectionId, LucideIcon> = {
  overview: LayoutDashboard,
  radar: Radar,
  organisers: Users,
  pipeline: Waypoints,
  outreach: Send,
  bookings: CalendarCheck2,
  revenue: ChartColumn,
  settings: Settings,
};

type SidebarProps = {
  active: SectionId;
  settings: DashboardSettings;
  mobileOpen: boolean;
  onNavigate: (section: SectionId) => void;
  onClose: () => void;
};

export function Sidebar({
  active,
  settings,
  mobileOpen,
  onNavigate,
  onClose,
}: SidebarProps) {
  return (
    <>
      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      ) : null}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/8 bg-[#0c0c12] transition-transform lg:static lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between gap-3 px-5 pt-6 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-violet-400 to-sky-400" />
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-500">
                Booking intelligence
              </p>
            </div>
            <p className="mt-3 text-lg font-semibold tracking-tight text-white">
              {settings.bandName}
            </p>
            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Telugu regional live music
              <br />
              {settings.homeBase} · AP, Telangana, Bengaluru
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3" aria-label="Dashboard">
          {SECTION_ORDER.map((id) => {
            const Icon = ICONS[id];
            const selected = id === active;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onNavigate(id)}
                aria-current={selected ? "page" : undefined}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  selected
                    ? "bg-white/8 text-white shadow-[inset_0_0_0_1px_rgba(167,139,250,0.35)]"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-100"
                }`}
              >
                <Icon className={`h-4 w-4 ${selected ? "text-violet-300" : ""}`} aria-hidden />
                {SECTION_META[id].label}
              </button>
            );
          })}
        </nav>
        <p className="px-5 py-5 text-[11px] leading-5 text-zinc-600">
          Sample workspace. No live event feed is connected.
        </p>
      </aside>
    </>
  );
}
