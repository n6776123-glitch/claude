"use client";

import { useStore } from "@/store";
import { useParams } from "next/navigation";
import { getInitials, formatCurrency, formatDate, cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";
import { STAGE_LABELS, PROJECT_TYPE_LABELS, PIPELINE_STAGES } from "@/types";
import {
  ArrowLeft, Phone, Mail, MessageSquare, MapPin, Calendar,
  FolderKanban, Receipt, FileText,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const allClients = useStore((s) => s.clients);
  const allProjects = useStore((s) => s.projects);
  const allInvoices = useStore((s) => s.invoices);
  const allActivities = useStore((s) => s.activities);

  const client = useMemo(() => allClients.find((c) => c.id === id), [allClients, id]);
  const projects = useMemo(() => allProjects.filter((p) => p.clientId === id), [allProjects, id]);
  const invoices = useMemo(() => allInvoices.filter((i) => i.clientId === id), [allInvoices, id]);
  const activities = useMemo(() => allActivities.filter((a) => a.clientId === id), [allActivities, id]);

  if (!client) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal-400">Client not found.</p>
        <Link href="/clients" className="btn-secondary mt-4">Back to Clients</Link>
      </div>
    );
  }

  const totalInvoiced = invoices.reduce((s, i) => s + i.amount, 0);
  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-6">
      <Link href="/clients" className="btn-ghost inline-flex -ml-3">
        <ArrowLeft className="w-4 h-4" />
        All Clients
      </Link>

      {/* Client Header */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center text-2xl font-serif font-bold text-gold-700">
            {getInitials(client.firstName, client.lastName)}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-serif font-bold text-charcoal-800">
              {client.firstName} {client.lastName}
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-charcoal-500">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{client.location}</span>
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" />{client.phone}</span>
              <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{client.email}</span>
              {client.whatsapp && (
                <span className="flex items-center gap-1.5"><MessageSquare className="w-4 h-4" />WhatsApp</span>
              )}
            </div>
            {client.notes && (
              <p className="text-sm text-charcoal-400 mt-3 italic">&ldquo;{client.notes}&rdquo;</p>
            )}
          </div>
          <div className="flex gap-2">
            <button className="btn-secondary text-xs"><MessageSquare className="w-3.5 h-3.5" />WhatsApp</button>
            <button className="btn-secondary text-xs"><Mail className="w-3.5 h-3.5" />Email</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Projects" value={projects.length} icon={FolderKanban} />
        <StatCard label="Total Invoiced" value={formatCurrency(totalInvoiced)} icon={Receipt} />
        <StatCard label="Total Paid" value={formatCurrency(totalPaid)} icon={FileText} />
      </div>

      {/* Projects */}
      <div className="card p-6">
        <h2 className="text-lg font-serif font-semibold text-charcoal-800 mb-4">Projects</h2>
        <div className="space-y-4">
          {projects.map((project) => {
            const stageIdx = PIPELINE_STAGES.indexOf(project.stage);
            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="block p-4 rounded-lg border border-cream-200 hover:border-gold-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-charcoal-700">{project.name}</h3>
                  <StatusBadge status={project.stage} label={STAGE_LABELS[project.stage]} />
                </div>
                <div className="flex items-center gap-4 text-xs text-charcoal-400 mb-3">
                  <span>{PROJECT_TYPE_LABELS[project.type]}</span>
                  <span>{project.city}, {project.country}</span>
                  <span>Budget: {formatCurrency(project.estimatedBudget)}</span>
                </div>
                <ProgressBar
                  value={stageIdx + 1}
                  max={PIPELINE_STAGES.length}
                  label="Pipeline Progress"
                  showCount={false}
                  size="sm"
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="card p-6">
        <h2 className="text-lg font-serif font-semibold text-charcoal-800 mb-4">Activity Timeline</h2>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-charcoal-700">{activity.description}</p>
                <p className="text-xs text-charcoal-400">{formatDate(activity.timestamp)} — {activity.performedBy}</p>
              </div>
            </div>
          ))}
          {activities.length === 0 && (
            <p className="text-sm text-charcoal-400 italic">No activity recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
