"use client";

import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

export function StatCard({
  label,
  value,
  subValue,
  icon: Icon,
  trend,
  className,
}: {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: LucideIcon;
  trend?: { value: string; positive: boolean };
  className?: string;
}) {
  return (
    <div className={cn("card p-5", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="stat-label">{label}</p>
          <p className="stat-value mt-1">{value}</p>
          {subValue && (
            <p className="text-xs text-charcoal-400 mt-1">{subValue}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-medium mt-1.5",
                trend.positive ? "text-green-600" : "text-red-500"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        {Icon && (
          <div className="w-10 h-10 rounded-lg bg-cream-100 flex items-center justify-center">
            <Icon className="w-5 h-5 text-gold-600" />
          </div>
        )}
      </div>
    </div>
  );
}
