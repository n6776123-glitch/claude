"use client";

import { useStore } from "@/store";
import { useParams } from "next/navigation";
import { VENDOR_CATEGORY_LABELS } from "@/types";
import { cn, formatDate } from "@/lib/utils";
import {
  ArrowLeft, Star, Phone, Mail, Globe, MapPin, MessageSquare,
  CheckCircle, XCircle,
} from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export default function VendorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const allVendors = useStore((s) => s.vendors);
  const allQuotes = useStore((s) => s.vendorQuotes);

  const vendor = useMemo(() => allVendors.find((v) => v.id === id), [allVendors, id]);
  const quotes = useMemo(() => allQuotes.filter((q) => q.vendorId === id), [allQuotes, id]);

  if (!vendor) {
    return (
      <div className="text-center py-20">
        <p className="text-charcoal-400">Vendor not found.</p>
        <Link href="/vendors" className="btn-secondary mt-4">Back to Vendors</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/vendors" className="btn-ghost inline-flex -ml-3">
        <ArrowLeft className="w-4 h-4" />
        All Vendors
      </Link>

      <div className="card p-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="w-14 h-14 rounded-xl bg-cream-100 flex items-center justify-center text-xl font-serif font-bold text-gold-700">
            {vendor.name[0]}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-charcoal-800">{vendor.name}</h1>
              {vendor.vetted ? (
                <span className="badge bg-green-50 text-green-700 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> Vetted
                </span>
              ) : (
                <span className="badge bg-charcoal-100 text-charcoal-400 flex items-center gap-1">
                  <XCircle className="w-3 h-3" /> Unvetted
                </span>
              )}
            </div>
            <span className="inline-block mt-1 badge bg-cream-100 text-charcoal-600">
              {VENDOR_CATEGORY_LABELS[vendor.category]}
            </span>
            {vendor.specialty && (
              <p className="text-sm text-charcoal-500 mt-2">{vendor.specialty}</p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-charcoal-500">
              <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" />{vendor.phone}</span>
              {vendor.email && <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" />{vendor.email}</span>}
              {vendor.website && <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" />Website</span>}
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{vendor.location}</span>
            </div>

            <div className="flex items-center gap-1 mt-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={cn("w-4 h-4", i < vendor.rating ? "text-gold-400 fill-gold-400" : "text-charcoal-200")} />
              ))}
              <span className="text-sm text-charcoal-400 ml-1">{vendor.rating}/5</span>
            </div>
          </div>
        </div>

        {vendor.notes && (
          <div className="mt-4 p-3 bg-cream-50 rounded-lg text-sm text-charcoal-500 italic">
            {vendor.notes}
          </div>
        )}
      </div>

      {/* Contact History */}
      <div className="card p-6">
        <h2 className="text-lg font-serif font-semibold text-charcoal-800 mb-4">Contact History</h2>
        {vendor.contactHistory.length > 0 ? (
          <div className="space-y-3">
            {vendor.contactHistory.map((entry, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-lg bg-cream-50">
                <MessageSquare className="w-4 h-4 text-gold-500 mt-0.5" />
                <div>
                  <p className="text-sm text-charcoal-700">{entry.summary}</p>
                  <p className="text-xs text-charcoal-400 mt-0.5">
                    {formatDate(entry.date)} via {entry.method}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-charcoal-400 italic">No contact history recorded.</p>
        )}
      </div>

      {/* Quotes */}
      {quotes.length > 0 && (
        <div className="card p-6">
          <h2 className="text-lg font-serif font-semibold text-charcoal-800 mb-4">Quotes Submitted</h2>
          <div className="space-y-3">
            {quotes.map((quote) => (
              <div key={quote.id} className="flex items-center justify-between p-3 rounded-lg bg-cream-50">
                <div>
                  <p className="text-sm font-medium text-charcoal-700">{quote.description}</p>
                  <p className="text-xs text-charcoal-400">{formatDate(quote.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-charcoal-800">
                    {quote.currency === "ILS" ? "₪" : "$"}{quote.amount.toLocaleString()}
                  </p>
                  {quote.selected && (
                    <span className="badge bg-green-50 text-green-700 text-[10px]">Selected</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
