"use client";

import { useStore } from "@/store";
import { StatCard } from "@/components/ui/StatCard";
import { PipelineView } from "@/components/dashboard/PipelineView";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { UpcomingReminders } from "@/components/dashboard/UpcomingReminders";
import { Users, FolderKanban, Receipt, Building2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function DashboardPage() {
  const clients = useStore((s) => s.clients);
  const projects = useStore((s) => s.projects);
  const invoices = useStore((s) => s.invoices);
  const vendors = useStore((s) => s.vendors);

  const activeProjects = projects.filter(
    (p) => p.stage !== "handover" && p.stage !== "lead"
  );
  const totalRevenue = invoices
    .filter((i) => i.status === "paid")
    .reduce((sum, i) => sum + i.amount, 0);
  const outstanding = invoices
    .filter((i) => i.status === "sent" || i.status === "overdue")
    .reduce((sum, i) => sum + i.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-charcoal-800">
          Good morning, Adina
        </h1>
        <p className="text-charcoal-400 mt-1">
          Here&apos;s what&apos;s happening across your projects today.
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Active Clients"
          value={clients.length}
          icon={Users}
          subValue={`${clients.filter((c) => c.country === "US").length} international`}
        />
        <StatCard
          label="Active Projects"
          value={activeProjects.length}
          icon={FolderKanban}
          subValue={`${projects.length} total`}
        />
        <StatCard
          label="Revenue (Paid)"
          value={formatCurrency(totalRevenue)}
          icon={Receipt}
          trend={{ value: "12% this quarter", positive: true }}
        />
        <StatCard
          label="Vetted Vendors"
          value={vendors.filter((v) => v.vetted).length}
          icon={Building2}
          subValue={`${vendors.length} total in directory`}
        />
      </div>

      {/* Pipeline */}
      <PipelineView />

      {/* Activity + Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <UpcomingReminders />
      </div>
    </div>
  );
}
