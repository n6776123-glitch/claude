"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, FolderKanban, Building2, Receipt,
  ClipboardList, Palette, Bell, ExternalLink, Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Clients", href: "/clients", icon: Users },
  { name: "Projects", href: "/", icon: FolderKanban, badge: "Pipeline" },
  { name: "Vendors", href: "/vendors", icon: Building2 },
  { name: "Finances", href: "/finances", icon: Receipt },
  { name: "Questionnaires", href: "/questionnaire/new", icon: ClipboardList },
  { name: "Materials", href: "/projects/p1", icon: Palette },
  { name: "Notifications", href: "/notifications", icon: Bell },
];

const bottomNav = [
  { name: "Client Portal", href: "/portal/p1", icon: ExternalLink },
  { name: "Settings", href: "#", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex lg:flex-col w-64 bg-charcoal-800 text-white">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-charcoal-700">
        <h1 className="font-serif text-xl tracking-wide text-cream-100">
          Adina Nivin
        </h1>
        <p className="text-xs text-charcoal-400 mt-0.5 tracking-widest uppercase">
          Interiors Studio
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-gold-500/20 text-gold-200"
                  : "text-charcoal-300 hover:bg-charcoal-700 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.name}
              {item.badge && (
                <span className="ml-auto text-[10px] bg-gold-500/30 text-gold-200 px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 py-4 border-t border-charcoal-700 space-y-1">
        {bottomNav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-charcoal-400 hover:bg-charcoal-700 hover:text-white transition-all duration-200"
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </Link>
        ))}
      </div>

      {/* Designer profile */}
      <div className="px-4 py-4 border-t border-charcoal-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gold-500 flex items-center justify-center text-sm font-serif font-bold text-white">
            AN
          </div>
          <div>
            <p className="text-sm font-medium text-cream-100">Adina Nivin</p>
            <p className="text-xs text-charcoal-400">Principal Designer</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
