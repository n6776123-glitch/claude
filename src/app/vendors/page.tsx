"use client";

import { useStore } from "@/store";
import { VENDOR_CATEGORY_LABELS, type VendorCategory } from "@/types";
import { cn } from "@/lib/utils";
import { Plus, Search, Star, Phone, MapPin, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VendorsPage() {
  const vendors = useStore((s) => s.vendors);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<VendorCategory | "all">("all");

  const categories = Array.from(new Set(vendors.map((v) => v.category)));

  const filtered = vendors.filter((v) => {
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.location.toLowerCase().includes(search.toLowerCase()) ||
      (v.specialty || "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "all" || v.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif font-bold text-charcoal-800">Vendor Directory</h1>
          <p className="text-sm text-charcoal-400 mt-0.5">{vendors.length} vetted professionals</p>
        </div>
        <Link href="/vendors/new" className="btn-primary">
          <Plus className="w-4 h-4" />
          Add Vendor
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal-300" />
          <input
            type="text"
            placeholder="Search vendors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as VendorCategory | "all")}
          className="select-field w-auto"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{VENDOR_CATEGORY_LABELS[cat]}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((vendor) => (
          <Link
            key={vendor.id}
            href={`/vendors/${vendor.id}`}
            className="card-hover p-5 group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-charcoal-800 group-hover:text-gold-700 transition-colors truncate">
                    {vendor.name}
                  </h3>
                  {vendor.vetted && (
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  )}
                </div>
                <span className="inline-block mt-1 text-xs font-medium bg-cream-100 text-charcoal-500 px-2 py-0.5 rounded">
                  {VENDOR_CATEGORY_LABELS[vendor.category]}
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "w-3.5 h-3.5",
                      i < vendor.rating ? "text-gold-400 fill-gold-400" : "text-charcoal-200"
                    )}
                  />
                ))}
              </div>
            </div>

            {vendor.specialty && (
              <p className="text-xs text-charcoal-400 mt-2">{vendor.specialty}</p>
            )}

            <div className="flex items-center gap-3 mt-3 text-xs text-charcoal-400">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vendor.location}</span>
              <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{vendor.phone}</span>
            </div>

            {vendor.contactHistory.length > 0 && (
              <p className="text-[10px] text-charcoal-300 mt-2 border-t border-cream-200 pt-2">
                Last contact: {vendor.contactHistory[0].summary.substring(0, 60)}...
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
