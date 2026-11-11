"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { BookingsView } from "@/components/views/BookingsView";
import { EventRadarView } from "@/components/views/EventRadarView";
import { LeadPipelineView } from "@/components/views/LeadPipelineView";
import { OrganiserView } from "@/components/views/OrganiserView";
import { OutreachView } from "@/components/views/OutreachView";
import { OverviewView } from "@/components/views/OverviewView";
import { RevenueView } from "@/components/views/RevenueView";
import { SettingsView } from "@/components/views/SettingsView";
import { defaultSettings } from "@/lib/demo-data";
import type { DashboardSettings, SectionId } from "@/lib/types";

export function DashboardShell() {
  const [section, setSection] = useState<SectionId>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [radarQuery, setRadarQuery] = useState("");
  const [settings, setSettings] = useState<DashboardSettings>(defaultSettings);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function navigate(next: SectionId) {
    setSection(next);
    setMobileOpen(false);
  }

  const view = {
    overview: (
      <OverviewView settings={settings} onNavigate={navigate} />
    ),
    radar: (
      <EventRadarView query={radarQuery} onQueryChange={setRadarQuery} />
    ),
    organisers: <OrganiserView />,
    pipeline: <LeadPipelineView />,
    outreach: <OutreachView />,
    bookings: <BookingsView />,
    revenue: <RevenueView />,
    settings: (
      <SettingsView
        key={`${settings.bandName}-${settings.monthlyTarget}-${settings.monthlyCapacity}`}
        settings={settings}
        savedMessage={savedMessage}
        onSave={(next) => {
          setSettings(next);
          setSavedMessage("Saved for this session. Nothing was written to a database.");
        }}
      />
    ),
  }[section];

  return (
    <div className="min-h-screen bg-[#07070c] text-zinc-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.16),transparent_42%),radial-gradient(ellipse_at_top_right,rgba(96,165,250,0.1),transparent_36%)]" />
      <div className="relative flex min-h-screen">
        <Sidebar
          active={section}
          settings={settings}
          mobileOpen={mobileOpen}
          onNavigate={navigate}
          onClose={() => setMobileOpen(false)}
        />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar
            section={section}
            query={radarQuery}
            onQueryChange={setRadarQuery}
            onOpenRadar={() => navigate("radar")}
            onOpenMenu={() => setMobileOpen(true)}
          />
          <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {view}
          </main>
        </div>
      </div>
    </div>
  );
}
