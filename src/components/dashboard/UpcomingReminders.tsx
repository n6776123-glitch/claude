"use client";

import { useStore } from "@/store";
import { formatDate, cn } from "@/lib/utils";
import { Bell, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const typeConfig = {
  reminder: { icon: Clock, color: "text-blue-500", bg: "bg-blue-50" },
  milestone: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
  follow_up: { icon: Bell, color: "text-gold-500", bg: "bg-gold-50" },
  deadline: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
  system: { icon: Bell, color: "text-charcoal-400", bg: "bg-charcoal-50" },
};

export function UpcomingReminders() {
  const notifications = useStore((s) => s.notifications);
  const markRead = useStore((s) => s.markNotificationRead);

  const activeNotifications = notifications
    .filter((n) => !n.dismissed)
    .sort((a, b) => (a.dueDate || "").localeCompare(b.dueDate || ""));

  return (
    <div className="card p-5">
      <h3 className="text-lg font-serif font-semibold text-charcoal-800 mb-4">
        Upcoming Reminders
      </h3>
      <div className="space-y-3">
        {activeNotifications.slice(0, 5).map((notif) => {
          const config = typeConfig[notif.type];
          const Icon = config.icon;
          return (
            <div
              key={notif.id}
              className={cn(
                "flex gap-3 p-3 rounded-lg border transition-all",
                notif.read
                  ? "bg-white border-cream-200"
                  : "bg-cream-50 border-gold-200"
              )}
            >
              <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", config.bg)}>
                <Icon className={cn("w-4 h-4", config.color)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", notif.read ? "text-charcoal-500" : "text-charcoal-700")}>
                  {notif.title}
                </p>
                <p className="text-xs text-charcoal-400 mt-0.5 line-clamp-1">
                  {notif.message}
                </p>
                {notif.dueDate && (
                  <p className="text-[10px] text-charcoal-400 mt-1">
                    Due: {formatDate(notif.dueDate)}
                  </p>
                )}
              </div>
              {!notif.read && (
                <button
                  onClick={() => markRead(notif.id)}
                  className="text-xs text-gold-600 hover:text-gold-700 font-medium flex-shrink-0"
                >
                  Mark read
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
