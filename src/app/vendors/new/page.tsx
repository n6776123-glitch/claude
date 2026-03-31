"use client";

import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { VENDOR_CATEGORY_LABELS, type VendorCategory } from "@/types";
import { ArrowLeft, Building2 } from "lucide-react";
import Link from "next/link";

export default function NewVendorPage() {
  const addVendor = useStore((s) => s.addVendor);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    category: "carpentry" as VendorCategory,
    specialty: "",
    phone: "",
    email: "",
    whatsapp: "",
    website: "",
    location: "",
    rating: 3 as 1 | 2 | 3 | 4 | 5,
    vetted: false,
    notes: "",
  });

  const set = (field: string, value: string | boolean | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = addVendor({ ...form, contactHistory: [] });
    router.push(`/vendors/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/vendors" className="btn-ghost inline-flex -ml-3">
        <ArrowLeft className="w-4 h-4" />
        Back to Vendors
      </Link>

      <div>
        <h1 className="text-2xl font-serif font-bold text-charcoal-800">Add Vendor</h1>
        <p className="text-sm text-charcoal-400 mt-0.5">Add a new professional to your directory.</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Business Name *</label>
            <input required value={form.name} onChange={(e) => set("name", e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="label">Category *</label>
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className="select-field">
              {Object.entries(VENDOR_CATEGORY_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="label">Specialty</label>
          <input value={form.specialty} onChange={(e) => set("specialty", e.target.value)} className="input-field" placeholder="e.g. Custom kitchen cabinets & built-ins" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Phone *</label>
            <input required value={form.phone} onChange={(e) => set("phone", e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="label">Email</label>
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="input-field" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Location *</label>
            <input required value={form.location} onChange={(e) => set("location", e.target.value)} className="input-field" />
          </div>
          <div>
            <label className="label">Rating</label>
            <select value={form.rating} onChange={(e) => set("rating", Number(e.target.value))} className="select-field">
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" id="vetted" checked={form.vetted} onChange={(e) => set("vetted", e.target.checked)} className="w-4 h-4 rounded border-charcoal-300 text-gold-500 focus:ring-gold-400" />
          <label htmlFor="vetted" className="text-sm font-medium text-charcoal-600">Mark as vetted professional</label>
        </div>

        <div>
          <label className="label">Notes</label>
          <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} className="input-field" rows={3} />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link href="/vendors" className="btn-secondary">Cancel</Link>
          <button type="submit" className="btn-primary">
            <Building2 className="w-4 h-4" />
            Add Vendor
          </button>
        </div>
      </form>
    </div>
  );
}
