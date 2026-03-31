"use client";

import { useStore } from "@/store";
import { formatDate } from "@/lib/utils";
import {
  MapPin, Phone, CheckCircle2, Pencil, FileText, UserPlus,
} from "lucide-react";

const actionIcons: Record<string, typeof MapPin> = {
  site_visit: MapPin,
  vendor_call: Phone,
  material_approved: CheckCircle2,
  design_update: Pencil,
  proposal_sent: FileText,
  lead_created: UserPlus,
};

export function RecentActivity() {
  const activities = useStore((s) => s.activities);

  return (
    <div className="card p-5">
      <h3 className="text-lg font-serif font-semibold text-charcoal-800 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {activities.slice(0, 6).map((activity) => {
          const Icon = actionIcons[activity.action] || FileText;
          return (
            <div key={activity.id} className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-cream-100 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-gold-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-charcoal-700">{activity.description}</p>
                <p className="text-xs text-charcoal-400 mt-0.5">
                  {formatDate(activity.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
