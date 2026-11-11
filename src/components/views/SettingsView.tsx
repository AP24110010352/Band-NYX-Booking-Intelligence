"use client";

import { useState, type ReactNode } from "react";
import { DemoNotice } from "@/components/ui/DemoNotice";
import { Panel } from "@/components/ui/Panel";
import { clamp } from "@/lib/format";
import type { DashboardSettings } from "@/lib/types";

type SettingsViewProps = {
  settings: DashboardSettings;
  savedMessage: string | null;
  onSave: (settings: DashboardSettings) => void;
};

export function SettingsView({ settings, savedMessage, onSave }: SettingsViewProps) {
  const [draft, setDraft] = useState(settings);
  const targetAboveCapacity = draft.monthlyTarget > draft.monthlyCapacity;

  function save() {
    const next = {
      ...draft,
      bandName: draft.bandName.trim() || "BAND NYX",
      homeBase: draft.homeBase.trim() || "Hyderabad",
      monthlyTarget: clamp(draft.monthlyTarget, 1, 30),
      monthlyCapacity: clamp(draft.monthlyCapacity, 1, 40),
    };
    setDraft(next);
    onSave(next);
  }

  return (
    <div className="space-y-5">
      <DemoNotice detail="Settings live in this browser session. Refreshing the page restores the original demo targets of 10 bookings and 15 dates." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Band profile" description="Shown in the sidebar. It does not create an account.">
          <div className="space-y-4">
            <Field label="Band name" htmlFor="band-name">
              <input
                id="band-name"
                value={draft.bandName}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, bandName: event.target.value }))
                }
                className={inputClass}
              />
            </Field>
            <Field label="Home base" htmlFor="home-base">
              <input
                id="home-base"
                value={draft.homeBase}
                onChange={(event) =>
                  setDraft((current) => ({ ...current, homeBase: event.target.value }))
                }
                className={inputClass}
              />
            </Field>
          </div>
        </Panel>
        <Panel
          title="Monthly desk"
          description="Overview progress and the booking chart read these numbers."
        >
          <div className="space-y-4">
            <Field label="Booking target" htmlFor="target">
              <input
                id="target"
                type="number"
                min={1}
                max={30}
                value={draft.monthlyTarget}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    monthlyTarget: Number(event.target.value),
                  }))
                }
                className={inputClass}
              />
            </Field>
            <Field label="Monthly capacity" htmlFor="capacity">
              <input
                id="capacity"
                type="number"
                min={1}
                max={40}
                value={draft.monthlyCapacity}
                onChange={(event) =>
                  setDraft((current) => ({
                    ...current,
                    monthlyCapacity: Number(event.target.value),
                  }))
                }
                className={inputClass}
              />
            </Field>
            {targetAboveCapacity ? (
              <p className="text-xs leading-5 text-amber-200">
                The target is above capacity. Overview will still show both numbers.
              </p>
            ) : null}
          </div>
        </Panel>
      </div>
      <Panel title="Desk alerts" description="Toggles are remembered only until you leave this session.">
        <div className="space-y-3">
          <Toggle
            label="Enquiry alerts"
            detail="Highlight when a sample enquiry is still waiting on a proposal."
            checked={draft.enquiryAlerts}
            onChange={(enquiryAlerts) =>
              setDraft((current) => ({ ...current, enquiryAlerts }))
            }
          />
          <Toggle
            label="Proposal alerts"
            detail="Highlight when a sample proposal is still in negotiation."
            checked={draft.proposalAlerts}
            onChange={(proposalAlerts) =>
              setDraft((current) => ({ ...current, proposalAlerts }))
            }
          />
        </div>
      </Panel>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={save}
          className="rounded-xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-violet-900/30"
        >
          Save for this session
        </button>
        {savedMessage ? <p className="text-sm text-emerald-200">{savedMessage}</p> : null}
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none focus:border-violet-400/50";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-xs text-zinc-400">{label}</span>
      {children}
    </label>
  );
}

function Toggle({
  label,
  detail,
  checked,
  onChange,
}: {
  label: string;
  detail: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between gap-4 rounded-xl border border-white/8 bg-black/20 px-3 py-3 text-left"
    >
      <span>
        <span className="block text-sm text-white">{label}</span>
        <span className="mt-0.5 block text-xs text-zinc-500">{detail}</span>
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-violet-500" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}
