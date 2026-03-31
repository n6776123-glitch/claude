"use client";

import { useStore } from "@/store";
import { useParams } from "next/navigation";
import {
  formatCurrency, formatDate, cn, getInitials, getProgressPercentage,
} from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatCard } from "@/components/ui/StatCard";
import {
  STAGE_LABELS, PROJECT_TYPE_LABELS, PIPELINE_STAGES, VENDOR_CATEGORY_LABELS,
} from "@/types";
import {
  ArrowLeft, MapPin, Calendar, DollarSign, Eye, ShoppingBag,
  CheckCircle, Layers, GitCompare,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const project = useStore((s) => s.getProjectById(id));
  const client = useStore((s) => project ? s.getClientById(project.clientId) : undefined);
  const budgetItems = useStore((s) => s.getBudgetByProject(id));
  const materials = useStore((s) => s.getMaterialsByProject(id));
  const quotes = useStore((s) => s.getQuotesByProject(id));
  const invoices = useStore((s) => s.getInvoicesByProject(id));
  const selectQuote = useStore((s) => s.selectQuote);
  const approveMaterial = useStore((s) => s.approveMaterial);
  const moveStage = useStore((s) => s.moveProjectStage);

  const [activeTab, setActiveTab] = useState<"overview" | "materials" | "quotes" | "budget">("overview");

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal-400">Project not found.</p>
        <Link href="/" className="btn-secondary mt-4">Back to Dashboard</Link>
      </div>
    );
  }

  const stageIdx = PIPELINE_STAGES.indexOf(project.stage);
  const totalEstimated = budgetItems.reduce((s, b) => s + b.estimatedCost, 0);
  const totalActual = budgetItems.reduce((s, b) => s + b.actualCost, 0);

  // Group quotes by category for comparison
  const quotesByCategory = quotes.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  }, {} as Record<string, typeof quotes>);

  return (
    <div className="space-y-6">
      <Link href="/" className="btn-ghost inline-flex -ml-3">
        <ArrowLeft className="w-4 h-4" />
        Dashboard
      </Link>

      {/* Project Header */}
      <div className="card p-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-5">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-serif font-bold text-charcoal-800">{project.name}</h1>
              <StatusBadge status={project.stage} label={STAGE_LABELS[project.stage]} />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal-500">
              <span className="badge bg-cream-100 text-charcoal-600">{PROJECT_TYPE_LABELS[project.type]}</span>
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{project.address}, {project.city}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />Started {formatDate(project.startDate)}</span>
              {project.squareMeters && <span>{project.squareMeters} sqm</span>}
              {project.numberOfRooms && <span>{project.numberOfRooms} rooms</span>}
            </div>

            {client && (
              <Link href={`/clients/${client.id}`} className="inline-flex items-center gap-2 mt-3 text-sm text-gold-600 hover:text-gold-700">
                <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center text-[10px] font-bold text-gold-700">
                  {getInitials(client.firstName, client.lastName)}
                </div>
                {client.firstName} {client.lastName}
              </Link>
            )}
          </div>

          {/* Stage Advancement */}
          <div className="flex flex-col items-end gap-2">
            <p className="text-xs text-charcoal-400">Pipeline Stage ({stageIdx + 1}/{PIPELINE_STAGES.length})</p>
            {stageIdx < PIPELINE_STAGES.length - 1 && (
              <button
                onClick={() => moveStage(project.id, PIPELINE_STAGES[stageIdx + 1])}
                className="btn-gold text-xs"
              >
                Advance to {STAGE_LABELS[PIPELINE_STAGES[stageIdx + 1]]}
              </button>
            )}
          </div>
        </div>

        {/* Pipeline progress */}
        <div className="mt-5">
          <div className="flex gap-1">
            {PIPELINE_STAGES.map((stage, idx) => (
              <div
                key={stage}
                className={cn(
                  "h-2 flex-1 rounded-full transition-all",
                  idx <= stageIdx ? "bg-gold-500" : "bg-cream-200"
                )}
                title={STAGE_LABELS[stage]}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Budget" value={formatCurrency(project.estimatedBudget)} icon={DollarSign} subValue={`${formatCurrency(totalActual)} spent`} />
        <StatCard label="Site Visits" value={`${project.usedSiteVisits}/${project.contractedSiteVisits}`} icon={Eye} subValue={`${project.contractedSiteVisits - project.usedSiteVisits} remaining`} />
        <StatCard label="Shopping Days" value={`${project.usedShoppingDays}/${project.contractedShoppingDays}`} icon={ShoppingBag} subValue={`${project.contractedShoppingDays - project.usedShoppingDays} remaining`} />
        <StatCard label="Proposal" value={project.proposalStatus.charAt(0).toUpperCase() + project.proposalStatus.slice(1)} icon={CheckCircle} />
      </div>

      {/* Resource Trackers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-5">
          <ProgressBar
            value={project.usedSiteVisits}
            max={project.contractedSiteVisits}
            label="Site Visits Used"
            color={getProgressPercentage(project.usedSiteVisits, project.contractedSiteVisits) > 80 ? "red" : "sage"}
          />
        </div>
        <div className="card p-5">
          <ProgressBar
            value={project.usedShoppingDays}
            max={project.contractedShoppingDays}
            label="Shopping Days Used"
            color={getProgressPercentage(project.usedShoppingDays, project.contractedShoppingDays) > 80 ? "red" : "gold"}
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-cream-100 p-1 rounded-lg w-fit">
        {([
          { key: "overview", label: "Overview", icon: Layers },
          { key: "materials", label: "Material Board", icon: Layers },
          { key: "quotes", label: "Quote Comparison", icon: GitCompare },
          { key: "budget", label: "Budget", icon: DollarSign },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === tab.key ? "bg-white text-charcoal-800 shadow-sm" : "text-charcoal-400 hover:text-charcoal-600"
            )}
          >
            <tab.icon className="w-3.5 h-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-serif font-semibold text-charcoal-800 mb-4">Invoices</h3>
            <div className="space-y-3">
              {invoices.map((inv) => (
                <div key={inv.id} className="flex items-center justify-between p-3 bg-cream-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-charcoal-700">{inv.description}</p>
                    <p className="text-xs text-charcoal-400">{inv.invoiceNumber} — {formatDate(inv.issueDate)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{formatCurrency(inv.amount, inv.currency)}</p>
                    <StatusBadge status={inv.status} />
                  </div>
                </div>
              ))}
              {invoices.length === 0 && <p className="text-sm text-charcoal-400 italic">No invoices yet.</p>}
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-serif font-semibold text-charcoal-800 mb-4">Project Details</h3>
            <dl className="space-y-3">
              {[
                ["Type", PROJECT_TYPE_LABELS[project.type]],
                ["Address", `${project.address}, ${project.city}, ${project.country}`],
                ["Start Date", formatDate(project.startDate)],
                ["Est. End Date", project.estimatedEndDate ? formatDate(project.estimatedEndDate) : "TBD"],
                ["Retainer", project.retainerPaid ? `Paid — ${formatCurrency(project.retainerAmount || 0)}` : "Not paid"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <dt className="text-sm text-charcoal-400">{label}</dt>
                  <dd className="text-sm font-medium text-charcoal-700">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {activeTab === "materials" && (
        <div className="card p-6">
          <h3 className="text-lg font-serif font-semibold text-charcoal-800 mb-4">Material Selection Board</h3>
          {materials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {materials.map((mat) => (
                <div key={mat.id} className={cn("p-4 rounded-xl border-2 transition-all", mat.approved ? "border-green-200 bg-green-50/30" : "border-cream-200 bg-white")}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs font-medium text-gold-600 uppercase tracking-wide">{mat.room} — {mat.category}</p>
                      <h4 className="text-sm font-semibold text-charcoal-800 mt-0.5">{mat.materialName}</h4>
                    </div>
                    {mat.approved ? (
                      <span className="badge bg-green-100 text-green-700">Approved</span>
                    ) : (
                      <button onClick={() => approveMaterial(mat.id)} className="badge bg-gold-100 text-gold-700 hover:bg-gold-200 cursor-pointer">
                        Approve
                      </button>
                    )}
                  </div>
                  {mat.code && <p className="text-xs text-charcoal-400 font-mono">Code: {mat.code}</p>}
                  <p className="text-xs text-charcoal-500 mt-1">{mat.supplierName}</p>
                  {mat.textureDescription && (
                    <p className="text-xs text-charcoal-400 mt-1 italic">{mat.textureDescription}</p>
                  )}
                  {mat.notes && (
                    <p className="text-xs text-red-500 mt-2 bg-red-50 p-2 rounded">{mat.notes}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-charcoal-400 italic">No materials selected yet.</p>
          )}
        </div>
      )}

      {activeTab === "quotes" && (
        <div className="space-y-6">
          <h3 className="text-lg font-serif font-semibold text-charcoal-800">Vendor Quote Comparison</h3>
          {Object.entries(quotesByCategory).length > 0 ? (
            Object.entries(quotesByCategory).map(([category, catQuotes]) => (
              <div key={category} className="card overflow-hidden">
                <div className="px-5 py-3 bg-cream-50 border-b border-cream-200">
                  <h4 className="text-sm font-semibold text-charcoal-700">
                    {VENDOR_CATEGORY_LABELS[category as keyof typeof VENDOR_CATEGORY_LABELS] || category}
                  </h4>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cream-100">
                      <th className="text-left text-xs font-semibold text-charcoal-500 px-5 py-2">Vendor</th>
                      <th className="text-left text-xs font-semibold text-charcoal-500 px-5 py-2">Description</th>
                      <th className="text-right text-xs font-semibold text-charcoal-500 px-5 py-2">Amount</th>
                      <th className="text-center text-xs font-semibold text-charcoal-500 px-5 py-2">Status</th>
                      <th className="text-right text-xs font-semibold text-charcoal-500 px-5 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {catQuotes.map((quote) => (
                      <tr key={quote.id} className={cn("border-b border-cream-100 transition-colors", quote.selected ? "bg-green-50/50" : "hover:bg-cream-50")}>
                        <td className="px-5 py-3 text-sm font-medium text-charcoal-700">{quote.vendorName}</td>
                        <td className="px-5 py-3 text-sm text-charcoal-500">{quote.description}</td>
                        <td className="px-5 py-3 text-sm font-semibold text-charcoal-800 text-right">
                          {formatCurrency(quote.amount, quote.currency)}
                        </td>
                        <td className="px-5 py-3 text-center">
                          {quote.selected ? (
                            <span className="badge bg-green-100 text-green-700">Selected</span>
                          ) : (
                            <span className="badge bg-charcoal-100 text-charcoal-400">Pending</span>
                          )}
                        </td>
                        <td className="px-5 py-3 text-right">
                          {!quote.selected && (
                            <button onClick={() => selectQuote(quote.id)} className="text-xs text-gold-600 hover:text-gold-700 font-medium">
                              Select
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {catQuotes[0]?.notes && (
                  <div className="px-5 py-2 bg-cream-50 border-t border-cream-200 text-xs text-charcoal-400 italic">
                    Note: {catQuotes[0].notes}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-sm text-charcoal-400 italic">No vendor quotes to compare yet.</p>
          )}
        </div>
      )}

      {activeTab === "budget" && (
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-serif font-semibold text-charcoal-800">Budget Tracker</h3>
            <div className="text-right">
              <p className={cn("text-lg font-bold", totalActual > totalEstimated ? "text-red-500" : "text-green-600")}>
                {formatCurrency(totalEstimated - totalActual)}
              </p>
              <p className="text-[10px] text-charcoal-400">{totalActual <= totalEstimated ? "remaining" : "over budget"}</p>
            </div>
          </div>
          <ProgressBar value={totalActual} max={totalEstimated} color={totalActual > totalEstimated ? "red" : "gold"} showCount={false} />
          <div className="mt-4 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-200">
                  <th className="text-left text-xs font-semibold text-charcoal-500 py-2">Category</th>
                  <th className="text-left text-xs font-semibold text-charcoal-500 py-2">Description</th>
                  <th className="text-right text-xs font-semibold text-charcoal-500 py-2">Estimated</th>
                  <th className="text-right text-xs font-semibold text-charcoal-500 py-2">Actual</th>
                  <th className="text-left text-xs font-semibold text-charcoal-500 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {budgetItems.map((item) => (
                  <tr key={item.id} className="border-b border-cream-100">
                    <td className="py-2.5 text-xs font-medium text-charcoal-500">{item.category}</td>
                    <td className="py-2.5 text-sm text-charcoal-700">{item.description}</td>
                    <td className="py-2.5 text-sm text-charcoal-500 text-right">{formatCurrency(item.estimatedCost)}</td>
                    <td className="py-2.5 text-sm font-medium text-charcoal-700 text-right">
                      {item.actualCost > 0 ? formatCurrency(item.actualCost) : "—"}
                    </td>
                    <td className="py-2.5"><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
