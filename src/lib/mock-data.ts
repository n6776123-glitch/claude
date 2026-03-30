import {
  Client, Project, Vendor, Invoice, BudgetItem, VendorQuote,
  MaterialSelection, Notification, CommunicationTemplate, QuestionnaireResponse,
  ActivityEntry,
} from "@/types";

// --- Clients ---
export const mockClients: Client[] = [
  {
    id: "c1",
    firstName: "Sarah",
    lastName: "Goldberg",
    email: "sarah.goldberg@email.com",
    phone: "+1-718-555-0101",
    whatsapp: "+1-718-555-0101",
    location: "Boro Park, NY",
    country: "US",
    referralSource: "Instagram",
    notes: "Prefers modern minimalist. Husband handles finances.",
    createdAt: "2025-11-15T10:00:00Z",
    updatedAt: "2026-03-20T14:00:00Z",
  },
  {
    id: "c2",
    firstName: "David",
    lastName: "Stern",
    email: "dstern@gmail.com",
    phone: "+1-845-555-0202",
    whatsapp: "+972-50-555-0202",
    location: "Monsey, NY",
    country: "US",
    referralSource: "Referral — Goldberg family",
    notes: "Investment property in Jerusalem. Wants turnkey solution.",
    createdAt: "2026-01-05T09:00:00Z",
    updatedAt: "2026-03-18T11:00:00Z",
  },
  {
    id: "c3",
    firstName: "Rachel",
    lastName: "Cohen",
    email: "rachel.c@email.com",
    phone: "+972-52-555-0303",
    location: "Rechavia, Jerusalem",
    country: "IL",
    referralSource: "Website",
    notes: "Local client. Kitchen and master suite redesign.",
    createdAt: "2026-02-10T08:00:00Z",
    updatedAt: "2026-03-25T16:00:00Z",
  },
  {
    id: "c4",
    firstName: "Miriam",
    lastName: "Weiss",
    email: "mweiss@outlook.com",
    phone: "+44-20-555-0404",
    whatsapp: "+44-20-555-0404",
    location: "Golders Green, London",
    country: "UK",
    referralSource: "Referral — Cohen family",
    createdAt: "2026-03-01T12:00:00Z",
    updatedAt: "2026-03-28T09:00:00Z",
  },
  {
    id: "c5",
    firstName: "Yosef",
    lastName: "Levi",
    email: "ylevi@email.com",
    phone: "+1-212-555-0505",
    location: "Flatbush, NY",
    country: "US",
    referralSource: "Previous client",
    notes: "Second project — new apartment in Baka, Jerusalem.",
    createdAt: "2026-03-10T07:00:00Z",
    updatedAt: "2026-03-29T10:00:00Z",
  },
];

// --- Projects ---
export const mockProjects: Project[] = [
  {
    id: "p1",
    clientId: "c1",
    name: "Goldberg Jerusalem Villa",
    type: "full_renovation",
    stage: "execution_site_visits",
    address: "12 Emek Refaim",
    city: "Jerusalem",
    country: "Israel",
    squareMeters: 220,
    numberOfRooms: 8,
    estimatedBudget: 850000,
    actualBudget: 723500,
    contractedSiteVisits: 24,
    usedSiteVisits: 16,
    contractedShoppingDays: 6,
    usedShoppingDays: 4,
    startDate: "2025-12-01",
    estimatedEndDate: "2026-06-15",
    proposalUrl: "/proposals/goldberg-villa.pdf",
    proposalStatus: "approved",
    retainerPaid: true,
    retainerAmount: 45000,
    createdAt: "2025-11-20T10:00:00Z",
    updatedAt: "2026-03-20T14:00:00Z",
  },
  {
    id: "p2",
    clientId: "c2",
    name: "Stern Investment — Jerusalem Apt",
    type: "contractor_apartment",
    stage: "material_selection",
    address: "45 King George",
    city: "Jerusalem",
    country: "Israel",
    squareMeters: 130,
    numberOfRooms: 5,
    estimatedBudget: 380000,
    actualBudget: 195000,
    contractedSiteVisits: 12,
    usedSiteVisits: 5,
    contractedShoppingDays: 3,
    usedShoppingDays: 1,
    startDate: "2026-01-15",
    estimatedEndDate: "2026-05-30",
    proposalStatus: "approved",
    retainerPaid: true,
    retainerAmount: 22000,
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-03-18T11:00:00Z",
  },
  {
    id: "p3",
    clientId: "c3",
    name: "Cohen Kitchen & Master Suite",
    type: "kitchen_design",
    stage: "design_phase",
    address: "8 Azza Street",
    city: "Jerusalem",
    country: "Israel",
    squareMeters: 55,
    numberOfRooms: 2,
    estimatedBudget: 180000,
    actualBudget: 42000,
    contractedSiteVisits: 8,
    usedSiteVisits: 2,
    contractedShoppingDays: 2,
    usedShoppingDays: 0,
    startDate: "2026-02-20",
    estimatedEndDate: "2026-05-15",
    proposalStatus: "approved",
    retainerPaid: true,
    retainerAmount: 12000,
    createdAt: "2026-02-15T10:00:00Z",
    updatedAt: "2026-03-25T16:00:00Z",
  },
  {
    id: "p4",
    clientId: "c4",
    name: "Weiss Home Styling — London",
    type: "home_styling",
    stage: "proposal",
    address: "22 Highfield Ave",
    city: "London",
    country: "UK",
    squareMeters: 180,
    numberOfRooms: 6,
    estimatedBudget: 95000,
    actualBudget: 0,
    contractedSiteVisits: 4,
    usedSiteVisits: 0,
    contractedShoppingDays: 2,
    usedShoppingDays: 0,
    startDate: "2026-04-01",
    proposalStatus: "sent",
    retainerPaid: false,
    createdAt: "2026-03-05T10:00:00Z",
    updatedAt: "2026-03-28T09:00:00Z",
  },
  {
    id: "p5",
    clientId: "c5",
    name: "Levi Baka Apartment",
    type: "full_renovation",
    stage: "discovery_call",
    address: "3 Derech Bethlehem",
    city: "Jerusalem",
    country: "Israel",
    squareMeters: 110,
    numberOfRooms: 4,
    estimatedBudget: 420000,
    actualBudget: 0,
    contractedSiteVisits: 16,
    usedSiteVisits: 0,
    contractedShoppingDays: 4,
    usedShoppingDays: 0,
    startDate: "2026-04-15",
    proposalStatus: "draft",
    retainerPaid: false,
    createdAt: "2026-03-12T10:00:00Z",
    updatedAt: "2026-03-29T10:00:00Z",
  },
];

// --- Vendors ---
export const mockVendors: Vendor[] = [
  {
    id: "v1",
    name: "Avner's Fine Carpentry",
    category: "carpentry",
    specialty: "Custom kitchen cabinets & built-ins",
    phone: "+972-54-555-1001",
    email: "avner@finecarpentry.co.il",
    location: "Talpiot Industrial, Jerusalem",
    rating: 5,
    vetted: true,
    notes: "Best carpenter in Jerusalem for luxury projects.",
    contactHistory: [
      { date: "2026-03-15", method: "whatsapp", summary: "Confirmed quote for Goldberg kitchen island" },
      { date: "2026-02-28", method: "in_person", summary: "Site visit for measurements" },
    ],
    createdAt: "2025-06-01T10:00:00Z",
  },
  {
    id: "v2",
    name: "Marble Palace Israel",
    category: "marble_stone",
    specialty: "Italian marble import & installation",
    phone: "+972-52-555-1002",
    email: "info@marblepalace.co.il",
    website: "https://marblepalace.co.il",
    location: "Atarot Industrial Zone",
    rating: 4,
    vetted: true,
    contactHistory: [
      { date: "2026-03-10", method: "email", summary: "Sent Calacatta samples for Cohen project" },
    ],
    createdAt: "2025-08-15T10:00:00Z",
  },
  {
    id: "v3",
    name: "Shlomo Electric",
    category: "electrical",
    phone: "+972-50-555-1003",
    location: "Givat Shaul, Jerusalem",
    rating: 5,
    vetted: true,
    notes: "Reliable, always on time. Licensed for smart-home systems.",
    contactHistory: [],
    createdAt: "2025-09-01T10:00:00Z",
  },
  {
    id: "v4",
    name: "Platinum Kitchens",
    category: "kitchen_supplier",
    specialty: "High-end German kitchen systems",
    phone: "+972-3-555-1004",
    email: "sales@platinumkitchens.co.il",
    website: "https://platinumkitchens.co.il",
    location: "Holon",
    rating: 4,
    vetted: true,
    contactHistory: [],
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "v5",
    name: "Rafi Ironworks",
    category: "ironwork",
    specialty: "Custom railings, gates & decorative iron",
    phone: "+972-54-555-1005",
    location: "Mishor Adumim",
    rating: 3,
    vetted: false,
    notes: "New contact. Needs evaluation on next small project.",
    contactHistory: [],
    createdAt: "2026-03-01T10:00:00Z",
  },
];

// --- Invoices ---
export const mockInvoices: Invoice[] = [
  {
    id: "inv1",
    projectId: "p1",
    clientId: "c1",
    invoiceNumber: "ANI-2026-001",
    description: "Retainer — Goldberg Jerusalem Villa",
    amount: 45000,
    currency: "ILS",
    status: "paid",
    issueDate: "2025-12-01",
    dueDate: "2025-12-15",
    paidDate: "2025-12-10",
    items: [
      { description: "Design Retainer Fee", quantity: 1, unitPrice: 45000, total: 45000 },
    ],
  },
  {
    id: "inv2",
    projectId: "p1",
    clientId: "c1",
    invoiceNumber: "ANI-2026-002",
    description: "Design Phase Milestone — Goldberg Villa",
    amount: 85000,
    currency: "ILS",
    status: "paid",
    issueDate: "2026-01-15",
    dueDate: "2026-01-30",
    paidDate: "2026-01-28",
    items: [
      { description: "AutoCAD Plans — Full Set", quantity: 1, unitPrice: 55000, total: 55000 },
      { description: "3D Renderings (8 rooms)", quantity: 8, unitPrice: 3750, total: 30000 },
    ],
  },
  {
    id: "inv3",
    projectId: "p2",
    clientId: "c2",
    invoiceNumber: "ANI-2026-003",
    description: "Retainer — Stern Jerusalem Apt",
    amount: 22000,
    currency: "ILS",
    status: "paid",
    issueDate: "2026-01-15",
    dueDate: "2026-01-30",
    paidDate: "2026-01-25",
    items: [
      { description: "Design Retainer Fee", quantity: 1, unitPrice: 22000, total: 22000 },
    ],
  },
  {
    id: "inv4",
    projectId: "p1",
    clientId: "c1",
    invoiceNumber: "ANI-2026-004",
    description: "Execution Phase — Goldberg Villa",
    amount: 120000,
    currency: "ILS",
    status: "sent",
    issueDate: "2026-03-01",
    dueDate: "2026-03-15",
    items: [
      { description: "Project Management — Execution Phase", quantity: 1, unitPrice: 80000, total: 80000 },
      { description: "Shopping Day (2 days)", quantity: 2, unitPrice: 12000, total: 24000 },
      { description: "Site Visit Coordination (4 visits)", quantity: 4, unitPrice: 4000, total: 16000 },
    ],
  },
];

// --- Budget Items ---
export const mockBudgetItems: BudgetItem[] = [
  { id: "b1", projectId: "p1", category: "Kitchen", description: "Custom cabinetry — Italian walnut", estimatedCost: 120000, actualCost: 115000, vendorId: "v1", status: "installed" },
  { id: "b2", projectId: "p1", category: "Kitchen", description: "Countertops — Calacatta marble", estimatedCost: 65000, actualCost: 68000, vendorId: "v2", status: "installed" },
  { id: "b3", projectId: "p1", category: "Electrical", description: "Smart home wiring & switches", estimatedCost: 45000, actualCost: 42000, vendorId: "v3", status: "installed" },
  { id: "b4", projectId: "p1", category: "Flooring", description: "Engineered oak — living areas", estimatedCost: 85000, actualCost: 85000, status: "received" },
  { id: "b5", projectId: "p1", category: "Bathroom", description: "Master bath — full remodel", estimatedCost: 95000, actualCost: 78000, status: "ordered" },
  { id: "b6", projectId: "p1", category: "Lighting", description: "Designer fixtures — all rooms", estimatedCost: 55000, actualCost: 48000, status: "ordered" },
  { id: "b7", projectId: "p1", category: "Furniture", description: "Living room seating & tables", estimatedCost: 110000, actualCost: 0, status: "planned" },
  { id: "b8", projectId: "p2", category: "Kitchen", description: "German kitchen system", estimatedCost: 95000, actualCost: 92000, vendorId: "v4", status: "ordered" },
  { id: "b9", projectId: "p2", category: "Flooring", description: "Porcelain tiles — all rooms", estimatedCost: 45000, actualCost: 0, status: "planned" },
];

// --- Vendor Quotes ---
export const mockVendorQuotes: VendorQuote[] = [
  { id: "q1", projectId: "p1", vendorId: "v1", vendorName: "Avner's Fine Carpentry", category: "carpentry", description: "Kitchen cabinets — Italian walnut", amount: 115000, currency: "ILS", selected: true, createdAt: "2026-01-05T10:00:00Z" },
  { id: "q2", projectId: "p1", vendorId: "v4", vendorName: "Platinum Kitchens", category: "kitchen_supplier", description: "Kitchen cabinets — German system", amount: 135000, currency: "ILS", selected: false, notes: "Higher quality hardware but over budget", createdAt: "2026-01-05T10:00:00Z" },
  { id: "q3", projectId: "p1", vendorId: "v2", vendorName: "Marble Palace Israel", category: "marble_stone", description: "Calacatta marble countertops", amount: 68000, currency: "ILS", selected: true, createdAt: "2026-01-10T10:00:00Z" },
  { id: "q4", projectId: "p3", vendorId: "v4", vendorName: "Platinum Kitchens", category: "kitchen_supplier", description: "Full kitchen — Cohen residence", amount: 78000, currency: "ILS", selected: false, createdAt: "2026-03-01T10:00:00Z" },
  { id: "q5", projectId: "p3", vendorId: "v1", vendorName: "Avner's Fine Carpentry", category: "carpentry", description: "Custom kitchen — Cohen residence", amount: 72000, currency: "ILS", selected: false, createdAt: "2026-03-02T10:00:00Z" },
];

// --- Material Selections ---
export const mockMaterials: MaterialSelection[] = [
  { id: "m1", projectId: "p1", room: "Kitchen", category: "Countertop", materialName: "Calacatta Oro Marble", code: "CAL-ORO-2024", supplierName: "Marble Palace Israel", textureDescription: "White base with dramatic gold veining", approved: true, createdAt: "2026-01-20T10:00:00Z" },
  { id: "m2", projectId: "p1", room: "Kitchen", category: "Cabinetry", materialName: "Italian Walnut — Matte Finish", code: "WN-IT-M08", supplierName: "Avner's Fine Carpentry", textureDescription: "Rich warm brown, low sheen", approved: true, createdAt: "2026-01-20T10:00:00Z" },
  { id: "m3", projectId: "p1", room: "Living Room", category: "Flooring", materialName: "European Oak — Herringbone", code: "OAK-HB-180", supplierName: "FloorCraft Israel", textureDescription: "Light honey tone, natural grain", approved: true, createdAt: "2026-01-25T10:00:00Z" },
  { id: "m4", projectId: "p1", room: "Master Bath", category: "Wall Tile", materialName: "Bianco Dolomiti Honed", code: "BD-H-600", supplierName: "Marble Palace Israel", textureDescription: "Cool white, subtle grey veining", approved: false, notes: "Awaiting client approval on grout color", createdAt: "2026-03-10T10:00:00Z" },
  { id: "m5", projectId: "p2", room: "Kitchen", category: "Countertop", materialName: "Dekton Sirius", code: "DK-SIR-20", supplierName: "Platinum Kitchens", textureDescription: "Dark grey, ultra-compact surface", approved: true, createdAt: "2026-02-15T10:00:00Z" },
];

// --- Notifications ---
export const mockNotifications: Notification[] = [
  { id: "n1", projectId: "p1", clientId: "c1", type: "follow_up", title: "Follow up on marble delivery", message: "Check with Marble Palace on Calacatta countertop delivery ETA for Goldberg villa.", dueDate: "2026-03-31", read: false, dismissed: false, createdAt: "2026-03-28T10:00:00Z" },
  { id: "n2", projectId: "p1", clientId: "c1", type: "reminder", title: "Send update email to Boro Park client", message: "Weekly progress update for Sarah Goldberg — include site photos from Thursday visit.", dueDate: "2026-04-01", read: false, dismissed: false, createdAt: "2026-03-29T08:00:00Z" },
  { id: "n3", projectId: "p4", clientId: "c4", type: "deadline", title: "Proposal deadline — Weiss styling", message: "Follow up on sent proposal. Client requested decision by end of month.", dueDate: "2026-03-30", read: false, dismissed: false, createdAt: "2026-03-25T10:00:00Z" },
  { id: "n4", projectId: "p2", type: "milestone", title: "Material selection phase complete", message: "All materials approved for Stern apartment. Ready to move to execution.", read: true, dismissed: false, createdAt: "2026-03-20T10:00:00Z" },
  { id: "n5", projectId: "p5", clientId: "c5", type: "follow_up", title: "Schedule discovery call — Levi", message: "Yosef Levi expressed interest. Schedule discovery call this week.", dueDate: "2026-04-02", read: false, dismissed: false, createdAt: "2026-03-29T14:00:00Z" },
];

// --- Communication Templates ---
export const mockTemplates: CommunicationTemplate[] = [
  {
    id: "t1",
    name: "Welcome & Discovery Call",
    stage: "lead",
    channel: "email",
    subject: "Welcome to Adina Nivin Interiors — Let's Create Something Beautiful",
    body: `Dear {{clientName}},

Thank you for reaching out to Adina Nivin Interiors. I'm truly excited about the possibility of working together on your {{projectType}} project.

I'd love to schedule a discovery call to learn more about your vision, lifestyle, and what "home" means to you and your family. This conversation is the foundation of everything we create together.

Would any of the following times work for a 30-minute call?
{{suggestedTimes}}

Looking forward to connecting,
Adina`,
    variables: ["clientName", "projectType", "suggestedTimes"],
  },
  {
    id: "t2",
    name: "Proposal Follow-Up",
    stage: "proposal",
    channel: "whatsapp",
    body: `Hi {{clientName}}! 🏡

I hope you've had a chance to review the design proposal for {{projectName}}. I'm so excited about the direction we discussed!

Would love to hear your thoughts. Feel free to call or message anytime — I'm here for any questions.

Warm regards,
Adina`,
    variables: ["clientName", "projectName"],
  },
  {
    id: "t3",
    name: "Weekly Progress Update",
    stage: "execution_site_visits",
    channel: "email",
    subject: "{{projectName}} — Weekly Progress Update",
    body: `Dear {{clientName}},

Here's your weekly update on {{projectName}}:

**This Week's Progress:**
{{weeklyProgress}}

**Upcoming This Week:**
{{upcomingTasks}}

**Site Visit Summary:**
{{siteVisitNotes}}

Photos from the latest visit are attached. As always, every detail is being handled with the care your home deserves.

Best,
Adina`,
    variables: ["clientName", "projectName", "weeklyProgress", "upcomingTasks", "siteVisitNotes"],
  },
  {
    id: "t4",
    name: "Milestone Celebration",
    stage: "styling",
    channel: "whatsapp",
    body: `{{clientName}}, I have the most exciting news! ✨

{{projectName}} has reached the styling phase — this is where the magic truly comes together. Every piece we've carefully selected is finding its place.

I can't wait for you to see it in person. We're getting so close!

Adina`,
    variables: ["clientName", "projectName"],
  },
  {
    id: "t5",
    name: "Handover & Thank You",
    stage: "handover",
    channel: "email",
    subject: "Welcome Home — {{projectName}} is Complete",
    body: `Dear {{clientName}},

The moment is finally here — {{projectName}} is complete, and I couldn't be more proud of what we've created together.

Your home tells a story of thoughtful design, exceptional craftsmanship, and the unique vision you brought to this journey. From our very first call to this final handover, it has been an absolute privilege.

Enclosed you'll find:
• Complete material specification book
• Vendor contact directory
• Care & maintenance guide
• Professional photography portfolio

Thank you for trusting Adina Nivin Interiors with your home. It has truly been an honor.

With warmth,
Adina`,
    variables: ["clientName", "projectName"],
  },
];

// --- Questionnaire Responses ---
export const mockQuestionnaireResponses: QuestionnaireResponse[] = [
  {
    id: "qr1",
    projectId: "p1",
    projectType: "full_renovation",
    status: "completed",
    responses: {
      familySize: "6",
      childrenAges: "4, 7, 10, 13",
      entertainingFrequency: "Weekly Shabbat hosting (20+ guests)",
      stylePreference: ["Modern Minimalist", "Warm Contemporary"],
      colorPalette: "Neutrals with warm accents — cream, taupe, gold",
      mustHaves: "Large kitchen island, walk-in pantry, separate meat/dairy kitchens",
      budgetFlexibility: "Flexible for quality",
      timeline: "6 months ideal",
      existingFurniture: "Starting fresh — nothing to keep",
      specialRequirements: "Shabbat-friendly lighting, extra storage for sefarim",
    },
    completedAt: "2025-12-05T14:00:00Z",
    createdAt: "2025-11-25T10:00:00Z",
  },
];

// --- Activity Log ---
export const mockActivities: ActivityEntry[] = [
  { id: "a1", projectId: "p1", clientId: "c1", action: "site_visit", description: "Site visit #16 — Inspected kitchen installation progress", performedBy: "Adina", timestamp: "2026-03-27T10:00:00Z" },
  { id: "a2", projectId: "p1", clientId: "c1", action: "vendor_call", description: "Called Marble Palace re: countertop delivery timeline", performedBy: "Adina", timestamp: "2026-03-26T14:00:00Z" },
  { id: "a3", projectId: "p2", clientId: "c2", action: "material_approved", description: "Client approved all kitchen materials via WhatsApp", performedBy: "Adina", timestamp: "2026-03-18T11:00:00Z" },
  { id: "a4", projectId: "p3", clientId: "c3", action: "design_update", description: "Uploaded revised AutoCAD plans for kitchen layout v3", performedBy: "Adina", timestamp: "2026-03-25T16:00:00Z" },
  { id: "a5", projectId: "p4", clientId: "c4", action: "proposal_sent", description: "Sent styling proposal via email", performedBy: "Adina", timestamp: "2026-03-20T09:00:00Z" },
  { id: "a6", projectId: "p5", clientId: "c5", action: "lead_created", description: "New lead — Yosef Levi, referred by previous client", performedBy: "System", timestamp: "2026-03-12T10:00:00Z" },
];
