// ============================================================
// Adina Nivin Interiors — CRM Type Definitions & Database Schema
// ============================================================

// --- Pipeline Stages (Client Journey) ---
export const PIPELINE_STAGES = [
  "lead",
  "discovery_call",
  "proposal",
  "retainer_onboarding",
  "questionnaire",
  "design_phase",
  "material_selection",
  "execution_site_visits",
  "styling",
  "photography",
  "handover",
] as const;

export type PipelineStage = (typeof PIPELINE_STAGES)[number];

export const STAGE_LABELS: Record<PipelineStage, string> = {
  lead: "Lead",
  discovery_call: "Discovery Call",
  proposal: "Proposal",
  retainer_onboarding: "Retainer & Onboarding",
  questionnaire: "Digital Questionnaire",
  design_phase: "Design Phase",
  material_selection: "Material Selection",
  execution_site_visits: "Execution & Site Visits",
  styling: "Styling",
  photography: "Photography",
  handover: "Handover",
};

export const STAGE_COLORS: Record<PipelineStage, string> = {
  lead: "bg-charcoal-200",
  discovery_call: "bg-blush-200",
  proposal: "bg-gold-200",
  retainer_onboarding: "bg-sage-200",
  questionnaire: "bg-blush-100",
  design_phase: "bg-navy-700 text-white",
  material_selection: "bg-gold-300",
  execution_site_visits: "bg-sage-300",
  styling: "bg-blush-300",
  photography: "bg-gold-100",
  handover: "bg-sage-500 text-white",
};

// --- Project Types ---
export const PROJECT_TYPES = [
  "full_renovation",
  "contractor_apartment",
  "home_styling",
  "single_space",
  "kitchen_design",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  full_renovation: "Full Renovation",
  contractor_apartment: "Contractor Apartment (Kablan)",
  home_styling: "Home Styling",
  single_space: "Single Space",
  kitchen_design: "Kitchen Design",
};

// --- Client ---
export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  location: string; // e.g. "Boro Park, NY" or "Jerusalem, IL"
  country: "US" | "IL" | "UK" | "Other";
  referralSource?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Project ---
export interface Project {
  id: string;
  clientId: string;
  name: string;
  type: ProjectType;
  stage: PipelineStage;
  address: string;
  city: string;
  country: string;
  squareMeters?: number;
  numberOfRooms?: number;
  estimatedBudget: number;
  actualBudget: number;
  contractedSiteVisits: number;
  usedSiteVisits: number;
  contractedShoppingDays: number;
  usedShoppingDays: number;
  startDate: string;
  estimatedEndDate?: string;
  actualEndDate?: string;
  proposalUrl?: string;
  proposalStatus: "draft" | "sent" | "approved" | "rejected";
  retainerPaid: boolean;
  retainerAmount?: number;
  createdAt: string;
  updatedAt: string;
}

// --- Questionnaire Response ---
export interface QuestionnaireResponse {
  id: string;
  projectId: string;
  projectType: ProjectType;
  status: "not_started" | "in_progress" | "completed";
  responses: Record<string, string | string[] | number | boolean>;
  completedAt?: string;
  createdAt: string;
}

// --- Invoice ---
export interface Invoice {
  id: string;
  projectId: string;
  clientId: string;
  invoiceNumber: string;
  description: string;
  amount: number;
  currency: "ILS" | "USD";
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  issueDate: string;
  dueDate: string;
  paidDate?: string;
  easycountId?: string; // EasyCount API integration reference
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

// --- Budget Line Item ---
export interface BudgetItem {
  id: string;
  projectId: string;
  category: string;
  description: string;
  estimatedCost: number;
  actualCost: number;
  vendorId?: string;
  status: "planned" | "ordered" | "received" | "installed";
  notes?: string;
}

// --- Vendor ---
export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  specialty?: string;
  phone: string;
  email?: string;
  whatsapp?: string;
  website?: string;
  location: string;
  rating: 1 | 2 | 3 | 4 | 5;
  vetted: boolean;
  notes?: string;
  contactHistory: ContactEntry[];
  createdAt: string;
}

export type VendorCategory =
  | "carpentry"
  | "electrical"
  | "plumbing"
  | "marble_stone"
  | "flooring"
  | "painting"
  | "ironwork"
  | "glass"
  | "kitchen_supplier"
  | "lighting"
  | "furniture"
  | "textiles"
  | "general_contractor"
  | "other";

export const VENDOR_CATEGORY_LABELS: Record<VendorCategory, string> = {
  carpentry: "Carpentry",
  electrical: "Electrical",
  plumbing: "Plumbing",
  marble_stone: "Marble & Stone",
  flooring: "Flooring",
  painting: "Painting",
  ironwork: "Ironwork",
  glass: "Glass",
  kitchen_supplier: "Kitchen Supplier",
  lighting: "Lighting",
  furniture: "Furniture",
  textiles: "Textiles",
  general_contractor: "General Contractor",
  other: "Other",
};

export interface ContactEntry {
  date: string;
  method: "phone" | "whatsapp" | "email" | "in_person";
  summary: string;
}

// --- Vendor Quote (for comparison tool) ---
export interface VendorQuote {
  id: string;
  projectId: string;
  vendorId: string;
  vendorName: string;
  category: VendorCategory;
  description: string;
  amount: number;
  currency: "ILS" | "USD";
  validUntil?: string;
  documentUrl?: string;
  selected: boolean;
  notes?: string;
  createdAt: string;
}

// --- Material Selection ---
export interface MaterialSelection {
  id: string;
  projectId: string;
  room: string;
  category: string; // e.g. "Flooring", "Wall Finish", "Countertop"
  materialName: string;
  code?: string;
  supplierName: string;
  supplierContact?: string;
  textureDescription?: string;
  photoUrl?: string;
  approved: boolean;
  notes?: string;
  createdAt: string;
}

// --- Notification / Reminder ---
export interface Notification {
  id: string;
  projectId?: string;
  clientId?: string;
  type: "reminder" | "milestone" | "follow_up" | "deadline" | "system";
  title: string;
  message: string;
  dueDate?: string;
  read: boolean;
  dismissed: boolean;
  createdAt: string;
}

// --- Communication Template ---
export interface CommunicationTemplate {
  id: string;
  name: string;
  stage: PipelineStage;
  channel: "email" | "whatsapp";
  subject?: string;
  body: string;
  variables: string[]; // e.g. ["clientName", "projectName", "nextStep"]
}

// --- Activity Log ---
export interface ActivityEntry {
  id: string;
  projectId?: string;
  clientId?: string;
  action: string;
  description: string;
  performedBy: string;
  timestamp: string;
}
