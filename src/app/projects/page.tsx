"use client";

import { useStore } from "@/store";
import { useMemo } from "react";
import { formatCurrency, formatDate, cn, getInitials } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { STAGE_LABELS, PROJECT_TYPE_LABELS, PIPELINE_STAGES } from "@/types";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Plus, Search, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProjectsPage() {
  const projects = useStore((s) => s.projects);
  const clients = useStore((s) => s.clients);
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const client = clients.find((c) => c.id === p.clientId);
      const clientName = client ? `${client.firstName} ${client.lastName}` : "";
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        clientName.toLowerCase().includes(search.toLowerCase()) ||
        p.city.toLowerCase().includes(search.toLowerCase());
      const matchesStage = stageFilter === "all" || p.stage === stageFilter;
      return matchesSearch && matchesStage;
    });
  }, [projects, clients, search, stageFilter]);

  const getClient = (clientId: string) => clients.find((c) => c.id === clientId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-800">Projects</h1>
          <p className="text-sm text-charcoal-400 mt-0.5">{projects.length} total projects</p>
        </div>
        <Link href="/projects/new" className="btn-primary">
          <Plus className="w-4 h-4" />
          New Project
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-300" />
          <input
            type="text"
            placeholder="Search by name, client, or city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="select-field w-auto"
        >
          <option value="all">All Stages</option>
          {PIPELINE_STAGES.map((stage) => (
            <option key={stage} value={stage}>{STAGE_LABELS[stage]}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((project) => {
          const client = getClient(project.clientId);
          const stageIdx = PIPELINE_STAGES.indexOf(project.stage);

          return (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="card-hover p-5 group"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-base font-semibold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                  {project.name}
                </h3>
                <StatusBadge status={project.stage} label={STAGE_LABELS[project.stage]} />
              </div>

              {client && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center text-[10px] font-bold text-gold-700">
                    {getInitials(client.firstName, client.lastName)}
                  </div>
                  <span className="text-sm text-charcoal-500">
                    {client.firstName} {client.lastName}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 text-xs text-charcoal-400 mb-3">
                <span className="badge bg-cream-100 text-charcoal-500">
                  {PROJECT_TYPE_LABELS[project.type]}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {project.city}, {project.country}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(project.startDate)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-charcoal-400 mb-2">
                <span>Budget: {formatCurrency(project.estimatedBudget)}</span>
                <span>{stageIdx + 1}/{PIPELINE_STAGES.length} stages</span>
              </div>

              <ProgressBar
                value={stageIdx + 1}
                max={PIPELINE_STAGES.length}
                showCount={false}
                size="sm"
              />
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-charcoal-400">No projects found.</p>
        </div>
      )}
    </div>
  );
}
