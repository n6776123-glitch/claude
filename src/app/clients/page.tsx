"use client";

import { useStore } from "@/store";
import { getInitials, formatDate, cn } from "@/lib/utils";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { STAGE_LABELS } from "@/types";
import { Plus, Search, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ClientsPage() {
  const clients = useStore((s) => s.clients);
  const projects = useStore((s) => s.projects);
  const [search, setSearch] = useState("");

  const filtered = clients.filter(
    (c) =>
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-800">Clients</h1>
          <p className="text-sm text-charcoal-400 mt-0.5">{clients.length} total clients</p>
        </div>
        <Link href="/clients/new" className="btn-primary">
          <Plus className="w-4 h-4" />
          Add Client
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-300" />
        <input
          type="text"
          placeholder="Search by name, location, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((client) => {
          const clientProjects = projects.filter((p) => p.clientId === client.id);
          const activeProject = clientProjects[0];

          return (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="card-hover p-5 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold-100 flex items-center justify-center text-lg font-serif font-bold text-gold-700 flex-shrink-0">
                  {getInitials(client.firstName, client.lastName)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-charcoal-800 group-hover:text-gold-700 transition-colors">
                    {client.firstName} {client.lastName}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-charcoal-400">
                    <MapPin className="w-3 h-3" />
                    {client.location}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={cn(
                      "w-2 h-2 rounded-full",
                      clientProjects.length > 0 ? "bg-green-400" : "bg-charcoal-300"
                    )}
                  />
                  <span className="text-[10px] text-charcoal-400">
                    {clientProjects.length > 0 ? "Active" : "No projects"}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3 text-xs text-charcoal-400">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {client.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {client.email.split("@")[0]}...
                </span>
              </div>

              {activeProject && (
                <div className="mt-3 pt-3 border-t border-cream-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-charcoal-600 truncate">
                      {activeProject.name}
                    </span>
                    <StatusBadge status={activeProject.stage} label={STAGE_LABELS[activeProject.stage]} />
                  </div>
                </div>
              )}

              {client.referralSource && (
                <p className="text-[10px] text-charcoal-300 mt-2">
                  Referred by: {client.referralSource}
                </p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
