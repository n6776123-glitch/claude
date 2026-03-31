"use client";

import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PROJECT_TYPES, PROJECT_TYPE_LABELS, type ProjectType, type PipelineStage } from "@/types";
import { ArrowLeft, FolderKanban } from "lucide-react";
import Link from "next/link";

export default function NewProjectPage() {
  const addProject = useStore((s) => s.addProject);
  const clients = useStore((s) => s.clients);
  const router = useRouter();

  const [form, setForm] = useState({
    clientId: "",
    name: "",
    type: "full_renovation" as ProjectType,
    stage: "lead" as PipelineStage,
    address: "",
    city: "",
    country: "Israel",
    squareMeters: "",
    numberOfRooms: "",
    estimatedBudget: "",
    contractedSiteVisits: "",
    contractedShoppingDays: "",
    startDate: "",
    estimatedEndDate: "",
    retainerAmount: "",
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = addProject({
      clientId: form.clientId,
      name: form.name,
      type: form.type,
      stage: form.stage,
      address: form.address,
      city: form.city,
      country: form.country,
      squareMeters: form.squareMeters ? Number(form.squareMeters) : undefined,
      numberOfRooms: form.numberOfRooms ? Number(form.numberOfRooms) : undefined,
      estimatedBudget: Number(form.estimatedBudget) || 0,
      actualBudget: 0,
      contractedSiteVisits: Number(form.contractedSiteVisits) || 0,
      usedSiteVisits: 0,
      contractedShoppingDays: Number(form.contractedShoppingDays) || 0,
      usedShoppingDays: 0,
      startDate: form.startDate,
      estimatedEndDate: form.estimatedEndDate || undefined,
      proposalStatus: "draft",
      retainerPaid: false,
      retainerAmount: form.retainerAmount ? Number(form.retainerAmount) : undefined,
    });
    router.push(`/projects/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/projects" className="btn-ghost inline-flex -ml-3">
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      <div>
        <h1 className="text-2xl font-serif font-bold text-charcoal-800">New Project</h1>
        <p className="text-sm text-charcoal-400 mt-0.5">Create a new design project.</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        {/* Client & Project Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Client *</label>
            <select
              required
              value={form.clientId}
              onChange={(e) => set("clientId", e.target.value)}
              className="select-field"
            >
              <option value="">Select a client...</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.firstName} {c.lastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Project Name *</label>
            <input
              required
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              className="input-field"
              placeholder="e.g. Goldberg Jerusalem Villa"
            />
          </div>
        </div>

        {/* Type & Stage */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Project Type *</label>
            <select
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
              className="select-field"
            >
              {PROJECT_TYPES.map((type) => (
                <option key={type} value={type}>{PROJECT_TYPE_LABELS[type]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="label">Starting Stage</label>
            <select
              value={form.stage}
              onChange={(e) => set("stage", e.target.value)}
              className="select-field"
            >
              <option value="lead">Lead</option>
              <option value="discovery_call">Discovery Call</option>
              <option value="proposal">Proposal</option>
              <option value="retainer_onboarding">Retainer & Onboarding</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-1">
            <label className="label">Address *</label>
            <input
              required
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              className="input-field"
              placeholder="12 Emek Refaim"
            />
          </div>
          <div>
            <label className="label">City *</label>
            <input
              required
              value={form.city}
              onChange={(e) => set("city", e.target.value)}
              className="input-field"
              placeholder="Jerusalem"
            />
          </div>
          <div>
            <label className="label">Country *</label>
            <input
              required
              value={form.country}
              onChange={(e) => set("country", e.target.value)}
              className="input-field"
              placeholder="Israel"
            />
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Size (sqm)</label>
            <input
              type="number"
              value={form.squareMeters}
              onChange={(e) => set("squareMeters", e.target.value)}
              className="input-field"
              placeholder="e.g. 150"
            />
          </div>
          <div>
            <label className="label">Number of Rooms</label>
            <input
              type="number"
              value={form.numberOfRooms}
              onChange={(e) => set("numberOfRooms", e.target.value)}
              className="input-field"
              placeholder="e.g. 6"
            />
          </div>
        </div>

        {/* Budget & Retainer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Estimated Budget (ILS) *</label>
            <input
              required
              type="number"
              value={form.estimatedBudget}
              onChange={(e) => set("estimatedBudget", e.target.value)}
              className="input-field"
              placeholder="e.g. 500000"
            />
          </div>
          <div>
            <label className="label">Retainer Amount (ILS)</label>
            <input
              type="number"
              value={form.retainerAmount}
              onChange={(e) => set("retainerAmount", e.target.value)}
              className="input-field"
              placeholder="e.g. 25000"
            />
          </div>
        </div>

        {/* Resources */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Contracted Site Visits</label>
            <input
              type="number"
              value={form.contractedSiteVisits}
              onChange={(e) => set("contractedSiteVisits", e.target.value)}
              className="input-field"
              placeholder="e.g. 16"
            />
          </div>
          <div>
            <label className="label">Contracted Shopping Days</label>
            <input
              type="number"
              value={form.contractedShoppingDays}
              onChange={(e) => set("contractedShoppingDays", e.target.value)}
              className="input-field"
              placeholder="e.g. 4"
            />
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Start Date *</label>
            <input
              required
              type="date"
              value={form.startDate}
              onChange={(e) => set("startDate", e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Estimated End Date</label>
            <input
              type="date"
              value={form.estimatedEndDate}
              onChange={(e) => set("estimatedEndDate", e.target.value)}
              className="input-field"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link href="/projects" className="btn-secondary">Cancel</Link>
          <button type="submit" className="btn-primary">
            <FolderKanban className="w-4 h-4" />
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
