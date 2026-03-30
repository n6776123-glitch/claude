"use client";

import { useStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, UserPlus } from "lucide-react";
import Link from "next/link";

export default function NewClientPage() {
  const addClient = useStore((s) => s.addClient);
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    whatsapp: "",
    location: "",
    country: "US" as "US" | "IL" | "UK" | "Other",
    referralSource: "",
    notes: "",
  });

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = addClient(form);
    router.push(`/clients/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Link href="/clients" className="btn-ghost inline-flex -ml-3">
        <ArrowLeft className="w-4 h-4" />
        Back to Clients
      </Link>

      <div>
        <h1 className="text-2xl font-serif font-bold text-charcoal-800">New Client</h1>
        <p className="text-sm text-charcoal-400 mt-0.5">Add a new client to your studio.</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">First Name *</label>
            <input required value={form.firstName} onChange={(e) => set("firstName", e.target.value)} className="input-field" placeholder="Sarah" />
          </div>
          <div>
            <label className="label">Last Name *</label>
            <input required value={form.lastName} onChange={(e) => set("lastName", e.target.value)} className="input-field" placeholder="Goldberg" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Email *</label>
            <input required type="email" value={form.email} onChange={(e) => set("email", e.target.value)} className="input-field" placeholder="sarah@email.com" />
          </div>
          <div>
            <label className="label">Phone *</label>
            <input required value={form.phone} onChange={(e) => set("phone", e.target.value)} className="input-field" placeholder="+1-718-555-0101" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">WhatsApp</label>
            <input value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} className="input-field" placeholder="+1-718-555-0101" />
          </div>
          <div>
            <label className="label">Country *</label>
            <select value={form.country} onChange={(e) => set("country", e.target.value)} className="select-field">
              <option value="US">United States</option>
              <option value="IL">Israel</option>
              <option value="UK">United Kingdom</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">Location</label>
          <input value={form.location} onChange={(e) => set("location", e.target.value)} className="input-field" placeholder="Boro Park, NY" />
        </div>

        <div>
          <label className="label">Referral Source</label>
          <input value={form.referralSource} onChange={(e) => set("referralSource", e.target.value)} className="input-field" placeholder="Instagram, referral, website..." />
        </div>

        <div>
          <label className="label">Notes</label>
          <textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} className="input-field" rows={3} placeholder="Design preferences, family details, anything helpful..." />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Link href="/clients" className="btn-secondary">Cancel</Link>
          <button type="submit" className="btn-primary">
            <UserPlus className="w-4 h-4" />
            Create Client
          </button>
        </div>
      </form>
    </div>
  );
}
