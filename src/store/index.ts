"use client";

import { create } from "zustand";
import {
  Client, Project, Vendor, Invoice, BudgetItem, VendorQuote,
  MaterialSelection, Notification, QuestionnaireResponse, ActivityEntry,
  PipelineStage,
} from "@/types";
import {
  mockClients, mockProjects, mockVendors, mockInvoices, mockBudgetItems,
  mockVendorQuotes, mockMaterials, mockNotifications,
  mockQuestionnaireResponses, mockActivities,
} from "@/lib/mock-data";
import { generateId } from "@/lib/utils";

interface CRMStore {
  // Data
  clients: Client[];
  projects: Project[];
  vendors: Vendor[];
  invoices: Invoice[];
  budgetItems: BudgetItem[];
  vendorQuotes: VendorQuote[];
  materials: MaterialSelection[];
  notifications: Notification[];
  questionnaireResponses: QuestionnaireResponse[];
  activities: ActivityEntry[];

  // Client actions
  addClient: (client: Omit<Client, "id" | "createdAt" | "updatedAt">) => string;
  updateClient: (id: string, updates: Partial<Client>) => void;

  // Project actions
  addProject: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => string;
  updateProject: (id: string, updates: Partial<Project>) => void;
  moveProjectStage: (id: string, stage: PipelineStage) => void;

  // Vendor actions
  addVendor: (vendor: Omit<Vendor, "id" | "createdAt">) => string;
  updateVendor: (id: string, updates: Partial<Vendor>) => void;

  // Invoice actions
  addInvoice: (invoice: Omit<Invoice, "id">) => string;
  updateInvoiceStatus: (id: string, status: Invoice["status"]) => void;

  // Budget actions
  addBudgetItem: (item: Omit<BudgetItem, "id">) => string;
  updateBudgetItem: (id: string, updates: Partial<BudgetItem>) => void;

  // Quote actions
  addVendorQuote: (quote: Omit<VendorQuote, "id" | "createdAt">) => string;
  selectQuote: (id: string) => void;

  // Material actions
  addMaterial: (material: Omit<MaterialSelection, "id" | "createdAt">) => string;
  approveMaterial: (id: string) => void;

  // Notification actions
  addNotification: (notification: Omit<Notification, "id" | "createdAt">) => string;
  markNotificationRead: (id: string) => void;
  dismissNotification: (id: string) => void;

  // Questionnaire actions
  saveQuestionnaireResponse: (response: Omit<QuestionnaireResponse, "id" | "createdAt">) => string;

  // Helpers
  getClientById: (id: string) => Client | undefined;
  getProjectById: (id: string) => Project | undefined;
  getProjectsByClient: (clientId: string) => Project[];
  getVendorById: (id: string) => Vendor | undefined;
  getInvoicesByProject: (projectId: string) => Invoice[];
  getBudgetByProject: (projectId: string) => BudgetItem[];
  getQuotesByProject: (projectId: string) => VendorQuote[];
  getMaterialsByProject: (projectId: string) => MaterialSelection[];
  getUnreadNotifications: () => Notification[];
}

export const useStore = create<CRMStore>((set, get) => ({
  clients: mockClients,
  projects: mockProjects,
  vendors: mockVendors,
  invoices: mockInvoices,
  budgetItems: mockBudgetItems,
  vendorQuotes: mockVendorQuotes,
  materials: mockMaterials,
  notifications: mockNotifications,
  questionnaireResponses: mockQuestionnaireResponses,
  activities: mockActivities,

  addClient: (client) => {
    const id = generateId();
    const now = new Date().toISOString();
    set((s) => ({
      clients: [...s.clients, { ...client, id, createdAt: now, updatedAt: now }],
    }));
    return id;
  },

  updateClient: (id, updates) =>
    set((s) => ({
      clients: s.clients.map((c) =>
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      ),
    })),

  addProject: (project) => {
    const id = generateId();
    const now = new Date().toISOString();
    set((s) => ({
      projects: [...s.projects, { ...project, id, createdAt: now, updatedAt: now }],
    }));
    return id;
  },

  updateProject: (id, updates) =>
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p
      ),
    })),

  moveProjectStage: (id, stage) =>
    set((s) => ({
      projects: s.projects.map((p) =>
        p.id === id ? { ...p, stage, updatedAt: new Date().toISOString() } : p
      ),
    })),

  addVendor: (vendor) => {
    const id = generateId();
    set((s) => ({
      vendors: [...s.vendors, { ...vendor, id, createdAt: new Date().toISOString() }],
    }));
    return id;
  },

  updateVendor: (id, updates) =>
    set((s) => ({
      vendors: s.vendors.map((v) => (v.id === id ? { ...v, ...updates } : v)),
    })),

  addInvoice: (invoice) => {
    const id = generateId();
    set((s) => ({ invoices: [...s.invoices, { ...invoice, id }] }));
    return id;
  },

  updateInvoiceStatus: (id, status) =>
    set((s) => ({
      invoices: s.invoices.map((inv) =>
        inv.id === id
          ? { ...inv, status, ...(status === "paid" ? { paidDate: new Date().toISOString().split("T")[0] } : {}) }
          : inv
      ),
    })),

  addBudgetItem: (item) => {
    const id = generateId();
    set((s) => ({ budgetItems: [...s.budgetItems, { ...item, id }] }));
    return id;
  },

  updateBudgetItem: (id, updates) =>
    set((s) => ({
      budgetItems: s.budgetItems.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    })),

  addVendorQuote: (quote) => {
    const id = generateId();
    set((s) => ({
      vendorQuotes: [...s.vendorQuotes, { ...quote, id, createdAt: new Date().toISOString() }],
    }));
    return id;
  },

  selectQuote: (id) =>
    set((s) => {
      const target = s.vendorQuotes.find((q) => q.id === id);
      if (!target) return s;
      return {
        vendorQuotes: s.vendorQuotes.map((q) =>
          q.id === id
            ? { ...q, selected: true }
            : q.projectId === target.projectId && q.category === target.category
              ? { ...q, selected: false }
              : q
        ),
      };
    }),

  addMaterial: (material) => {
    const id = generateId();
    set((s) => ({
      materials: [...s.materials, { ...material, id, createdAt: new Date().toISOString() }],
    }));
    return id;
  },

  approveMaterial: (id) =>
    set((s) => ({
      materials: s.materials.map((m) => (m.id === id ? { ...m, approved: true } : m)),
    })),

  addNotification: (notification) => {
    const id = generateId();
    set((s) => ({
      notifications: [...s.notifications, { ...notification, id, createdAt: new Date().toISOString() }],
    }));
    return id;
  },

  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),

  dismissNotification: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) => (n.id === id ? { ...n, dismissed: true } : n)),
    })),

  saveQuestionnaireResponse: (response) => {
    const id = generateId();
    set((s) => ({
      questionnaireResponses: [
        ...s.questionnaireResponses,
        { ...response, id, createdAt: new Date().toISOString() },
      ],
    }));
    return id;
  },

  getClientById: (id) => get().clients.find((c) => c.id === id),
  getProjectById: (id) => get().projects.find((p) => p.id === id),
  getProjectsByClient: (clientId) => get().projects.filter((p) => p.clientId === clientId),
  getVendorById: (id) => get().vendors.find((v) => v.id === id),
  getInvoicesByProject: (projectId) => get().invoices.filter((i) => i.projectId === projectId),
  getBudgetByProject: (projectId) => get().budgetItems.filter((b) => b.projectId === projectId),
  getQuotesByProject: (projectId) => get().vendorQuotes.filter((q) => q.projectId === projectId),
  getMaterialsByProject: (projectId) => get().materials.filter((m) => m.projectId === projectId),
  getUnreadNotifications: () => get().notifications.filter((n) => !n.read && !n.dismissed),
}));
