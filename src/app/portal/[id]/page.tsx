"use client";

import { useStore } from "@/store";
import { useParams } from "next/navigation";
import { formatCurrency, formatDate, cn, getProgressPercentage } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { STAGE_LABELS, PIPELINE_STAGES } from "@/types";
import {
  Home, Eye, ShoppingBag, DollarSign, Layers, CheckCircle, Clock,
} from "lucide-react";

export default function ClientPortalPage() {
  const { id } = useParams<{ id: string }>();
  const project = useStore((s) => s.getProjectById(id));
  const client = useStore((s) => project ? s.getClientById(project.clientId) : undefined);
  const materials = useStore((s) => s.getMaterialsByProject(id));
  const budgetItems = useStore((s) => s.getBudgetByProject(id));
  const activities = useStore((s) => s.activities.filter((a) => a.projectId === id));

  if (!project || !client) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal-400">Project not found.</p>
      </div>
    );
  }

  const stageIdx = PIPELINE_STAGES.indexOf(project.stage);
  const totalEstimated = budgetItems.reduce((s, b) => s + b.estimatedCost, 0);
  const totalActual = budgetItems.reduce((s, b) => s + b.actualCost, 0);
  const approvedMaterials = materials.filter((m) => m.approved).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Portal Header */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-500 font-medium">Adina Nivin Interiors</p>
        <h1 className="text-3xl font-serif font-bold text-charcoal-800 mt-2">
          Welcome, {client.firstName}
        </h1>
        <p className="text-charcoal-400 mt-1">
          Your project portal for <span className="font-medium text-charcoal-600">{project.name}</span>
        </p>
      </div>

      {/* Project Progress */}
      <div className="card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Home className="w-5 h-5 text-gold-500" />
          <h2 className="text-lg font-serif font-semibold text-charcoal-800">Project Progress</h2>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-charcoal-600">
              Current Stage: <span className="text-gold-600">{STAGE_LABELS[project.stage]}</span>
            </span>
            <span className="text-sm text-charcoal-400">
              Step {stageIdx + 1} of {PIPELINE_STAGES.length}
            </span>
          </div>
          <div className="flex gap-1.5">
            {PIPELINE_STAGES.map((stage, idx) => (
              <div key={stage} className="flex-1 group relative">
                <div
                  className={cn(
                    "h-3 rounded-full transition-all",
                    idx < stageIdx ? "bg-green-400" : idx === stageIdx ? "bg-gold-500" : "bg-cream-200"
                  )}
                />
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-charcoal-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap transition-opacity z-10">
                  {STAGE_LABELS[stage]}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-charcoal-300">Lead</span>
            <span className="text-[10px] text-charcoal-300">Handover</span>
          </div>
        </div>

        {project.estimatedEndDate && (
          <p className="text-sm text-charcoal-400">
            Estimated completion: <span className="font-medium text-charcoal-600">{formatDate(project.estimatedEndDate)}</span>
          </p>
        )}
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <Eye className="w-6 h-6 text-sage-400 mx-auto mb-2" />
          <p className="text-2xl font-serif font-bold text-charcoal-800">
            {project.contractedSiteVisits - project.usedSiteVisits}
          </p>
          <p className="text-xs text-charcoal-400">Site Visits Remaining</p>
          <ProgressBar value={project.usedSiteVisits} max={project.contractedSiteVisits} showCount={false} size="sm" color="sage" />
        </div>
        <div className="card p-4 text-center">
          <ShoppingBag className="w-6 h-6 text-gold-400 mx-auto mb-2" />
          <p className="text-2xl font-serif font-bold text-charcoal-800">
            {project.contractedShoppingDays - project.usedShoppingDays}
          </p>
          <p className="text-xs text-charcoal-400">Shopping Days Remaining</p>
          <ProgressBar value={project.usedShoppingDays} max={project.contractedShoppingDays} showCount={false} size="sm" color="gold" />
        </div>
        <div className="card p-4 text-center">
          <Layers className="w-6 h-6 text-blush-300 mx-auto mb-2" />
          <p className="text-2xl font-serif font-bold text-charcoal-800">
            {approvedMaterials}/{materials.length}
          </p>
          <p className="text-xs text-charcoal-400">Materials Approved</p>
        </div>
        <div className="card p-4 text-center">
          <DollarSign className="w-6 h-6 text-gold-500 mx-auto mb-2" />
          <p className="text-2xl font-serif font-bold text-charcoal-800">
            {getProgressPercentage(totalActual, totalEstimated)}%
          </p>
          <p className="text-xs text-charcoal-400">Budget Utilized</p>
          <ProgressBar value={totalActual} max={totalEstimated} showCount={false} size="sm" color={totalActual > totalEstimated ? "red" : "gold"} />
        </div>
      </div>

      {/* Materials Overview */}
      {materials.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-serif font-semibold text-charcoal-800 mb-4">Material Selections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {materials.map((mat) => (
              <div
                key={mat.id}
                className={cn(
                  "p-3 rounded-lg border",
                  mat.approved ? "border-green-200 bg-green-50/30" : "border-gold-200 bg-gold-50/20"
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] text-gold-600 uppercase tracking-wide font-medium">
                      {mat.room} — {mat.category}
                    </p>
                    <p className="text-sm font-semibold text-charcoal-700 mt-0.5">{mat.materialName}</p>
                    <p className="text-xs text-charcoal-400">{mat.supplierName}</p>
                  </div>
                  {mat.approved ? (
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  ) : (
                    <Clock className="w-4 h-4 text-gold-400 flex-shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Updates */}
      <div className="card p-6">
        <h2 className="text-lg font-serif font-semibold text-charcoal-800 mb-4">Recent Updates</h2>
        <div className="space-y-4">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
              <div>
                <p className="text-sm text-charcoal-700">{activity.description}</p>
                <p className="text-xs text-charcoal-400 mt-0.5">{formatDate(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-cream-200">
        <p className="text-xs text-charcoal-300 tracking-wide uppercase">
          Adina Nivin Interiors — Luxury Design Studio
        </p>
        <p className="text-xs text-charcoal-300 mt-1">
          Questions? Reach out via WhatsApp or email anytime.
        </p>
      </div>
    </div>
  );
}
