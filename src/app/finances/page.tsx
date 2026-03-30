"use client";

import { useStore } from "@/store";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatCard } from "@/components/ui/StatCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Receipt, TrendingUp, AlertTriangle, CheckCircle, DollarSign } from "lucide-react";
import { useState } from "react";

export default function FinancesPage() {
  const invoices = useStore((s) => s.invoices);
  const projects = useStore((s) => s.projects);
  const budgetItems = useStore((s) => s.budgetItems);
  const clients = useStore((s) => s.clients);

  const [activeTab, setActiveTab] = useState<"invoices" | "budgets">("invoices");

  const totalInvoiced = invoices.reduce((s, i) => s + i.amount, 0);
  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.amount, 0);
  const totalOutstanding = invoices.filter((i) => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + i.amount, 0);

  const projectBudgets = projects.map((project) => {
    const items = budgetItems.filter((b) => b.projectId === project.id);
    const estimated = items.reduce((s, b) => s + b.estimatedCost, 0);
    const actual = items.reduce((s, b) => s + b.actualCost, 0);
    return { project, items, estimated, actual };
  }).filter((pb) => pb.items.length > 0);

  const getClientName = (clientId: string) => {
    const c = clients.find((cl) => cl.id === clientId);
    return c ? `${c.firstName} ${c.lastName}` : "Unknown";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-charcoal-800">Financial Hub</h1>
        <p className="text-sm text-charcoal-400 mt-0.5">Invoicing, proposals & budget tracking</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Invoiced" value={formatCurrency(totalInvoiced)} icon={Receipt} />
        <StatCard label="Paid" value={formatCurrency(totalPaid)} icon={CheckCircle} trend={{ value: `${Math.round((totalPaid / totalInvoiced) * 100)}%`, positive: true }} />
        <StatCard label="Outstanding" value={formatCurrency(totalOutstanding)} icon={AlertTriangle} />
        <StatCard label="Active Budgets" value={projectBudgets.length} icon={TrendingUp} subValue="projects with line items" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-cream-100 p-1 rounded-lg w-fit">
        {(["invoices", "budgets"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === tab ? "bg-white text-charcoal-800 shadow-sm" : "text-charcoal-400 hover:text-charcoal-600"
            )}
          >
            {tab === "invoices" ? "Invoices" : "Budget Tracker"}
          </button>
        ))}
      </div>

      {activeTab === "invoices" && (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cream-200 bg-cream-50">
                  <th className="text-left text-xs font-semibold text-charcoal-500 uppercase tracking-wider px-5 py-3">Invoice</th>
                  <th className="text-left text-xs font-semibold text-charcoal-500 uppercase tracking-wider px-5 py-3">Client</th>
                  <th className="text-left text-xs font-semibold text-charcoal-500 uppercase tracking-wider px-5 py-3">Description</th>
                  <th className="text-right text-xs font-semibold text-charcoal-500 uppercase tracking-wider px-5 py-3">Amount</th>
                  <th className="text-left text-xs font-semibold text-charcoal-500 uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-left text-xs font-semibold text-charcoal-500 uppercase tracking-wider px-5 py-3">Due Date</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b border-cream-100 hover:bg-cream-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <span className="text-sm font-mono font-medium text-charcoal-700">{inv.invoiceNumber}</span>
                    </td>
                    <td className="px-5 py-4 text-sm text-charcoal-600">{getClientName(inv.clientId)}</td>
                    <td className="px-5 py-4 text-sm text-charcoal-500 max-w-xs truncate">{inv.description}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-charcoal-800 text-right">
                      {formatCurrency(inv.amount, inv.currency)}
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={inv.status} /></td>
                    <td className="px-5 py-4 text-sm text-charcoal-400">{formatDate(inv.dueDate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* EasyCount integration note */}
          <div className="px-5 py-3 bg-cream-50 border-t border-cream-200 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-gold-500" />
            <p className="text-xs text-charcoal-400">
              EasyCount API integration ready — connect your account in Settings to auto-generate invoices & receipts.
            </p>
          </div>
        </div>
      )}

      {activeTab === "budgets" && (
        <div className="space-y-6">
          {projectBudgets.map(({ project, items, estimated, actual }) => (
            <div key={project.id} className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-serif font-semibold text-charcoal-800">{project.name}</h3>
                  <p className="text-xs text-charcoal-400">
                    Overall: {formatCurrency(actual)} spent of {formatCurrency(estimated)} estimated
                  </p>
                </div>
                <div className="text-right">
                  <p className={cn("text-lg font-bold", actual > estimated ? "text-red-500" : "text-green-600")}>
                    {actual <= estimated ? formatCurrency(estimated - actual) : `-${formatCurrency(actual - estimated)}`}
                  </p>
                  <p className="text-[10px] text-charcoal-400 uppercase">{actual <= estimated ? "Under Budget" : "Over Budget"}</p>
                </div>
              </div>

              <ProgressBar value={actual} max={estimated} color={actual > estimated ? "red" : "gold"} showCount={false} />

              <div className="mt-4 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-cream-200">
                      <th className="text-left text-xs font-semibold text-charcoal-500 py-2">Category</th>
                      <th className="text-left text-xs font-semibold text-charcoal-500 py-2">Item</th>
                      <th className="text-right text-xs font-semibold text-charcoal-500 py-2">Estimated</th>
                      <th className="text-right text-xs font-semibold text-charcoal-500 py-2">Actual</th>
                      <th className="text-right text-xs font-semibold text-charcoal-500 py-2">Variance</th>
                      <th className="text-left text-xs font-semibold text-charcoal-500 py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      const variance = item.estimatedCost - item.actualCost;
                      return (
                        <tr key={item.id} className="border-b border-cream-100">
                          <td className="py-2.5 text-xs font-medium text-charcoal-500">{item.category}</td>
                          <td className="py-2.5 text-sm text-charcoal-700">{item.description}</td>
                          <td className="py-2.5 text-sm text-charcoal-500 text-right">{formatCurrency(item.estimatedCost)}</td>
                          <td className="py-2.5 text-sm font-medium text-charcoal-700 text-right">
                            {item.actualCost > 0 ? formatCurrency(item.actualCost) : "—"}
                          </td>
                          <td className={cn("py-2.5 text-sm font-medium text-right", variance >= 0 ? "text-green-600" : "text-red-500")}>
                            {item.actualCost > 0 ? (variance >= 0 ? `+${formatCurrency(variance)}` : `-${formatCurrency(Math.abs(variance))}`) : "—"}
                          </td>
                          <td className="py-2.5"><StatusBadge status={item.status} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
