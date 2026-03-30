"use client";

import { Bell, Search, Menu } from "lucide-react";
import { useStore } from "@/store";

export function TopBar() {
  const unread = useStore((s) => s.getUnreadNotifications());

  return (
    <header className="h-16 bg-white border-b border-cream-200 flex items-center justify-between px-6 lg:px-8 flex-shrink-0">
      <div className="flex items-center gap-4">
        <button className="lg:hidden btn-ghost">
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-300" />
          <input
            type="text"
            placeholder="Search clients, projects, vendors..."
            className="pl-10 pr-4 py-2 w-64 lg:w-80 bg-cream-50 border border-cream-200 rounded-lg text-sm placeholder:text-charcoal-300 focus:outline-none focus:ring-2 focus:ring-gold-300 focus:border-gold-400 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <a href="/notifications" className="relative btn-ghost">
          <Bell className="w-5 h-5" />
          {unread.length > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {unread.length}
            </span>
          )}
        </a>
        <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-cream-200">
          <div className="w-8 h-8 rounded-full bg-gold-500 flex items-center justify-center text-xs font-serif font-bold text-white">
            AN
          </div>
          <span className="text-sm font-medium text-charcoal-600">Adina</span>
        </div>
      </div>
    </header>
  );
}
