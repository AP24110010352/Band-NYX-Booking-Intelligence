export const REGIONS = ["Andhra Pradesh", "Telangana", "Bengaluru"] as const;

export const CATEGORIES = [
  "College festivals",
  "Corporate events",
  "Weddings",
  "Private events",
  "Concerts",
  "Cultural events",
  "Pubs, restaurants and hotels",
] as const;

export const PIPELINE_STAGES = [
  "Discovered",
  "Qualified",
  "Contacted",
  "Interested",
  "Proposal Sent",
  "Negotiation",
  "Advance Received",
  "Confirmed",
  "Lost",
] as const;

export type Region = (typeof REGIONS)[number];
export type EventCategory = (typeof CATEGORIES)[number];
export type LeadStage = (typeof PIPELINE_STAGES)[number];

export type SectionId =
  | "overview"
  | "radar"
  | "organisers"
  | "pipeline"
  | "outreach"
  | "bookings"
  | "revenue"
  | "settings";

export type Opportunity = {
  id: string;
  eventName: string;
  city: string;
  region: Region;
  category: EventCategory;
  eventDate: string;
  organiser: string;
  organisation: string;
  source: string;
  estimatedBudget: number;
  leadScore: number;
  status: LeadStage;
  lastActivity: string;
};

export type OutreachStatus = "Queued" | "Sent" | "Replied" | "No response";
export type OutreachChannel = "WhatsApp" | "Email" | "Call";

export type OutreachItem = {
  id: string;
  organiser: string;
  organisation: string;
  eventName: string;
  channel: OutreachChannel;
  template: string;
  preview: string;
  status: OutreachStatus;
  loggedAt: string;
};

export type DashboardSettings = {
  bandName: string;
  homeBase: string;
  monthlyTarget: number;
  monthlyCapacity: number;
  enquiryAlerts: boolean;
  proposalAlerts: boolean;
};
