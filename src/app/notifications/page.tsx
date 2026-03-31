"use client";

import { useStore } from "@/store";
import { formatDate, cn } from "@/lib/utils";
import { Bell, Clock, AlertTriangle, CheckCircle, X, Check } from "lucide-react";
import { useState } from "react";

const typeConfig = {
  reminder: { icon: Clock, color: "text-blue-500", bg: "bg-blue-50", label: "Reminder" },
  milestone: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50", label: "Milestone" },
  follow_up: { icon: Bell, color: "text-gold-500", bg: "bg-gold-50", label: "Follow Up" },
  deadline: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50", label: "Deadline" },
  system: { icon: Bell, color: "text-charcoal-400", bg: "bg-charcoal-50", label: "System" },
};

export default function NotificationsPage() {
  const notifications = useStore((s) => s.notifications);
  const markRead = useStore((s) => s.markNotificationRead);
  const dismiss = useStore((s) => s.dismissNotification);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = notifications
    .filter((n) => !n.dismissed)
    .filter((n) => filter === "all" || !n.read)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const unreadCount = notifications.filter((n) => !n.read && !n.dismissed).length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-800">Notifications</h1>
          <p className="text-sm text-charcoal-400 mt-0.5">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up!"} — {notifications.filter((n) => !n.dismissed).length} total
          </p>
        </div>
        <div className="flex gap-1 bg-cream-100 p-1 rounded-lg">
          {(["all", "unread"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 py-1.5 rounded-md text-sm font-medium transition-all",
                filter === f ? "bg-white shadow-sm text-charcoal-800" : "text-charcoal-400"
              )}
            >
              {f === "all" ? "All" : "Unread"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((notif) => {
          const config = typeConfig[notif.type];
          const Icon = config.icon;

          return (
            <div
              key={notif.id}
              className={cn(
                "card p-4 flex gap-4 transition-all",
                !notif.read && "border-gold-200 bg-cream-50"
              )}
            >
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", config.bg)}>
                <Icon className={cn("w-5 h-5", config.color)} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={cn("text-sm font-semibold", notif.read ? "text-charcoal-500" : "text-charcoal-800")}>
                        {notif.title}
                      </h3>
                      <span className={cn("badge text-[10px]", config.bg, config.color)}>
                        {config.label}
                      </span>
                    </div>
                    <p className="text-sm text-charcoal-500 mt-0.5">{notif.message}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-charcoal-400">{formatDate(notif.createdAt)}</span>
                      {notif.dueDate && (
                        <span className="text-xs text-charcoal-400">Due: {formatDate(notif.dueDate)}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!notif.read && (
                      <button onClick={() => markRead(notif.id)} className="btn-ghost p-1.5" title="Mark as read">
                        <Check className="w-4 h-4 text-green-500" />
                      </button>
                    )}
                    <button onClick={() => dismiss(notif.id)} className="btn-ghost p-1.5" title="Dismiss">
                      <X className="w-4 h-4 text-charcoal-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Bell className="w-12 h-12 text-charcoal-200 mx-auto mb-3" />
            <p className="text-charcoal-400">
              {filter === "unread" ? "No unread notifications" : "No notifications"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
