"use client";

import { useStore } from "@/store";
import { PIPELINE_STAGES, STAGE_LABELS, type PipelineStage } from "@/types";
import { cn, formatCurrency, getInitials } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ChevronRight, MapPin } from "lucide-react";
import Link from "next/link";

const stageGradients: Record<PipelineStage, string> = {
  lead: "from-charcoal-100 to-charcoal-50",
  discovery_call: "from-blush-100 to-blush-50",
  proposal: "from-gold-100 to-gold-50",
  retainer_onboarding: "from-sage-100 to-sage-50",
  questionnaire: "from-cream-200 to-cream-100",
  design_phase: "from-navy-700/10 to-navy-700/5",
  material_selection: "from-gold-200/60 to-gold-100/40",
  execution_site_visits: "from-sage-200/60 to-sage-100/40",
  styling: "from-blush-200/60 to-blush-100/40",
  photography: "from-gold-100/60 to-gold-50/40",
  handover: "from-sage-300/40 to-sage-200/30",
};

export function PipelineView() {
  const projects = useStore((s) => s.projects);
  const clients = useStore((s) => s.clients);

  const getClient = (clientId: string) => clients.find((c) => c.id === clientId);

  const projectsByStage = PIPELINE_STAGES.reduce(
    (acc, stage) => {
      acc[stage] = projects.filter((p) => p.stage === stage);
      return acc;
    },
    {} as Record<PipelineStage, typeof projects>
  );

  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-serif font-bold text-charcoal-800">Project Pipeline</h2>
          <p className="text-sm text-charcoal-400 mt-0.5">
            {projects.length} active projects across {PIPELINE_STAGES.length} stages
          </p>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6 px-6 pb-2">
        <div className="flex gap-3 min-w-max">
          {PIPELINE_STAGES.map((stage, idx) => {
            const stageProjects = projectsByStage[stage];
            return (
              <div
                key={stage}
                className={cn(
                  "w-56 flex-shrink-0 rounded-xl p-3 bg-gradient-to-b",
                  stageGradients[stage]
                )}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center text-[10px] font-bold text-charcoal-500">
                      {idx + 1}
                    </span>
                    <h3 className="text-xs font-semibold text-charcoal-600 uppercase tracking-wide">
                      {STAGE_LABELS[stage]}
                    </h3>
                  </div>
                  {stageProjects.length > 0 && (
                    <span className="ml-auto text-[10px] font-bold bg-white/60 text-charcoal-500 w-5 h-5 rounded-full flex items-center justify-center">
                      {stageProjects.length}
                    </span>
                  )}
                </div>

                <div className="space-y-2 min-h-[80px]">
                  {stageProjects.map((project) => {
                    const client = getClient(project.clientId);
                    return (
                      <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="block bg-white rounded-lg p-3 shadow-sm border border-white/50 hover:shadow-md hover:border-gold-200 transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          {client && (
                            <div className="w-6 h-6 rounded-full bg-gold-100 flex items-center justify-center text-[10px] font-bold text-gold-700">
                              {getInitials(client.firstName, client.lastName)}
                            </div>
                          )}
                          <span className="text-xs font-semibold text-charcoal-700 truncate group-hover:text-gold-700 transition-colors">
                            {project.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-charcoal-400">
                          <MapPin className="w-3 h-3" />
                          {project.city}
                        </div>
                        <div className="mt-1.5 text-[10px] font-medium text-charcoal-500">
                          {formatCurrency(project.estimatedBudget)}
                        </div>
                      </Link>
                    );
                  })}

                  {stageProjects.length === 0 && (
                    <div className="flex items-center justify-center h-20 text-xs text-charcoal-300 italic">
                      No projects
                    </div>
                  )}
                </div>

                {idx < PIPELINE_STAGES.length - 1 && (
                  <div className="hidden" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
