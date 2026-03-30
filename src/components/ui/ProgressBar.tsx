"use client";

import { cn } from "@/lib/utils";

export function ProgressBar({
  value,
  max,
  label,
  showCount = true,
  color = "gold",
  size = "md",
}: {
  value: number;
  max: number;
  label?: string;
  showCount?: boolean;
  color?: "gold" | "sage" | "blush" | "red";
  size?: "sm" | "md";
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  const isOverBudget = value > max;

  const barColors = {
    gold: "bg-gold-500",
    sage: "bg-sage-400",
    blush: "bg-blush-300",
    red: "bg-red-400",
  };

  return (
    <div>
      {(label || showCount) && (
        <div className="flex justify-between items-baseline mb-1.5">
          {label && <span className="text-xs font-medium text-charcoal-500">{label}</span>}
          {showCount && (
            <span className={cn("text-xs font-medium", isOverBudget ? "text-red-500" : "text-charcoal-400")}>
              {value} / {max} {isOverBudget && "(over!)"}
            </span>
          )}
        </div>
      )}
      <div className={cn("w-full bg-cream-200 rounded-full overflow-hidden", size === "sm" ? "h-1.5" : "h-2.5")}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            isOverBudget ? "bg-red-400" : barColors[color]
          )}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  );
}
