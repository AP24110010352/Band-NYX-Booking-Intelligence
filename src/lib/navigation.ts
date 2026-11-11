import type { SectionId } from "@/lib/types";

export const SECTION_ORDER: SectionId[] = [
  "overview",
  "radar",
  "organisers",
  "pipeline",
  "outreach",
  "bookings",
  "revenue",
  "settings",
];

export const SECTION_META: Record<
  SectionId,
  { label: string; kicker: string; summary: string }
> = {
  overview: {
    label: "Overview",
    kicker: "November 2026",
    summary: "Monthly target, pipeline health, and the next dates on the demo book.",
  },
  radar: {
    label: "Event Radar",
    kicker: "Opportunity desk",
    summary: "Sample events across Andhra Pradesh, Telangana, and Bengaluru.",
  },
  organisers: {
    label: "Organiser Intelligence",
    kicker: "Relationships",
    summary: "Who is on the desk, how warm they are, and what they are worth in this sample.",
  },
  pipeline: {
    label: "Lead Pipeline",
    kicker: "Stage board",
    summary: "Every demo lead from first discovery through confirmation or a loss.",
  },
  outreach: {
    label: "Outreach Centre",
    kicker: "Sample threads",
    summary: "Message previews for the desk. Nothing here is delivered to a real inbox.",
  },
  bookings: {
    label: "Bookings",
    kicker: "Confirmed book",
    summary: "The three November confirmations plus the advance already logged in the demo.",
  },
  revenue: {
    label: "Revenue Analytics",
    kicker: "Sample fees",
    summary: "Illustrative fee performance. These are not audited accounts.",
  },
  settings: {
    label: "Settings",
    kicker: "This session",
    summary: "Band profile and monthly targets. Changes stay in the browser session only.",
  },
};
