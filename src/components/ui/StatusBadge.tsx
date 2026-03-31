"use client";

import { cn } from "@/lib/utils";

const variants: Record<string, string> = {
  // Pipeline stages
  lead: "bg-charcoal-100 text-charcoal-600",
  discovery_call: "bg-blush-100 text-charcoal-600",
  proposal: "bg-gold-100 text-gold-800",
  retainer_onboarding: "bg-sage-100 text-sage-500",
  questionnaire: "bg-blush-50 text-charcoal-500",
  design_phase: "bg-navy-700 text-white",
  material_selection: "bg-gold-200 text-gold-800",
  execution_site_visits: "bg-sage-200 text-charcoal-700",
  styling: "bg-blush-200 text-charcoal-700",
  photography: "bg-gold-50 text-gold-700",
  handover: "bg-sage-400 text-white",
  // Invoice statuses
  draft: "bg-charcoal-100 text-charcoal-500",
  sent: "bg-blue-50 text-blue-700",
  paid: "bg-green-50 text-green-700",
  overdue: "bg-red-50 text-red-700",
  cancelled: "bg-charcoal-100 text-charcoal-400 line-through",
  // Proposal statuses
  approved: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-600",
  // General
  active: "bg-green-50 text-green-700",
  inactive: "bg-charcoal-100 text-charcoal-400",
  // Budget item status
  planned: "bg-charcoal-100 text-charcoal-500",
  ordered: "bg-blue-50 text-blue-700",
  received: "bg-gold-100 text-gold-700",
  installed: "bg-green-50 text-green-700",
};

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  return (
    <span className={cn("badge", variants[status] || "bg-charcoal-100 text-charcoal-600")}>
      {label || status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
    </span>
  );
}
