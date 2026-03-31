import { ProjectType } from "@/types";

export interface QuestionConfig {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "multiselect" | "number" | "boolean";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  helpText?: string;
}

export interface QuestionSection {
  title: string;
  description?: string;
  questions: QuestionConfig[];
}

const commonQuestions: QuestionSection = {
  title: "About Your Family & Lifestyle",
  questions: [
    { id: "familySize", label: "How many people live in the home?", type: "number", required: true },
    { id: "childrenAges", label: "Ages of children (if applicable)", type: "text", placeholder: "e.g. 4, 7, 10" },
    { id: "entertainingFrequency", label: "How often do you host guests?", type: "select", options: ["Rarely", "Monthly", "Weekly Shabbat (small)", "Weekly Shabbat (20+ guests)", "Daily entertaining"], required: true },
    { id: "workFromHome", label: "Does anyone work from home?", type: "boolean" },
    { id: "pets", label: "Do you have pets?", type: "boolean" },
  ],
};

const styleSection: QuestionSection = {
  title: "Design Style & Preferences",
  description: "Help us understand your aesthetic vision",
  questions: [
    { id: "stylePreference", label: "Which styles appeal to you? (select all that apply)", type: "multiselect", options: ["Modern Minimalist", "Warm Contemporary", "Classic Elegant", "Transitional", "Mediterranean", "Industrial Chic", "Scandinavian", "Art Deco", "Traditional"], required: true },
    { id: "colorPalette", label: "Describe your ideal color palette", type: "textarea", placeholder: "e.g. Warm neutrals with gold accents..." },
    { id: "inspirationNotes", label: "Any designers, hotels, or spaces that inspire you?", type: "textarea", placeholder: "e.g. The lobby of the Waldorf Astoria Jerusalem..." },
    { id: "dislikes", label: "Anything you absolutely want to avoid?", type: "textarea" },
  ],
};

const budgetSection: QuestionSection = {
  title: "Budget & Timeline",
  questions: [
    { id: "budgetRange", label: "What is your budget range?", type: "select", options: ["Under ₪200,000", "₪200,000–₪500,000", "₪500,000–₪1,000,000", "₪1,000,000+", "Prefer to discuss"], required: true },
    { id: "budgetFlexibility", label: "Budget flexibility", type: "select", options: ["Strict — must stay within budget", "Somewhat flexible for quality", "Flexible for the right result", "No limit for quality"], required: true },
    { id: "timeline", label: "Ideal completion timeline", type: "select", options: ["3 months", "6 months", "9 months", "12 months", "No rush — quality first"], required: true },
    { id: "moveInDate", label: "Do you have a move-in deadline?", type: "text", placeholder: "e.g. Before Rosh Hashanah 2026" },
  ],
};

const fullRenovationQuestions: QuestionSection[] = [
  commonQuestions,
  {
    title: "Property Details",
    questions: [
      { id: "propertyStatus", label: "Current state of the property", type: "select", options: ["Bare shell / new build", "Existing — needs full gut renovation", "Existing — partial renovation", "Recently renovated — updating finishes"], required: true },
      { id: "squareMeters", label: "Approximate size (sqm)", type: "number", required: true },
      { id: "numberOfRooms", label: "Number of rooms", type: "number", required: true },
      { id: "numberOfBathrooms", label: "Number of bathrooms", type: "number", required: true },
      { id: "hasOutdoor", label: "Is there outdoor space (garden/balcony)?", type: "boolean" },
      { id: "parkingSpaces", label: "Number of parking spaces", type: "number" },
    ],
  },
  {
    title: "Kitchen Requirements",
    description: "The kitchen is the heart of the home — let's get it right",
    questions: [
      { id: "kitchenType", label: "Kitchen configuration", type: "select", options: ["Single kitchen", "Separate Meat & Dairy kitchens", "Main + auxiliary kitchen"], required: true },
      { id: "kitchenMustHaves", label: "Kitchen must-haves", type: "multiselect", options: ["Large island", "Walk-in pantry", "Professional-grade appliances", "Built-in coffee station", "Double oven", "Wine storage", "Breakfast nook", "Open to living area"] },
      { id: "applianceBrand", label: "Appliance brand preference", type: "text", placeholder: "e.g. Miele, Sub-Zero, Wolf..." },
    ],
  },
  styleSection,
  {
    title: "Special Requirements",
    questions: [
      { id: "mustHaves", label: "Non-negotiable must-haves", type: "textarea", required: true, placeholder: "e.g. Large walk-in closet, home office, sefarim wall..." },
      { id: "specialRequirements", label: "Special considerations", type: "multiselect", options: ["Shabbat-friendly lighting/systems", "Extra sefarim storage", "Home office space", "Children's play area", "Guest suite", "Home gym", "Safe room (mamad) design", "Accessibility needs", "Smart home automation"] },
      { id: "existingFurniture", label: "Are you keeping any existing furniture?", type: "select", options: ["Starting completely fresh", "Keeping a few sentimental pieces", "Keeping most furniture — updating finishes", "Mix of old and new"], required: true },
    ],
  },
  budgetSection,
];

const contractorApartmentQuestions: QuestionSection[] = [
  commonQuestions,
  {
    title: "Contractor (Kablan) Details",
    questions: [
      { id: "contractorName", label: "Contractor/Developer name", type: "text", required: true },
      { id: "deliveryDate", label: "Expected delivery date from contractor", type: "text", required: true },
      { id: "upgradePackage", label: "Did you purchase an upgrade package?", type: "select", options: ["No upgrades", "Basic upgrade package", "Premium upgrade package", "Custom selections with contractor"], required: true },
      { id: "changesAllowed", label: "Can you still make changes to the contractor's plans?", type: "select", options: ["Yes — full flexibility", "Limited changes only", "No — plans are locked"], required: true },
      { id: "squareMeters", label: "Apartment size (sqm)", type: "number", required: true },
      { id: "numberOfRooms", label: "Number of rooms", type: "number", required: true },
    ],
  },
  styleSection,
  {
    title: "Focus Areas",
    questions: [
      { id: "focusAreas", label: "Which areas need the most design attention?", type: "multiselect", options: ["Kitchen", "Master bedroom & bath", "Living/dining area", "Children's rooms", "Guest room", "Storage solutions", "Lighting plan", "All areas equally"], required: true },
      { id: "contractorCoordination", label: "Do you need help coordinating with the contractor?", type: "boolean" },
    ],
  },
  budgetSection,
];

const homeStylingQuestions: QuestionSection[] = [
  commonQuestions,
  {
    title: "Current Space",
    questions: [
      { id: "currentState", label: "How would you describe your current space?", type: "select", options: ["Just moved in — empty", "Furnished but needs a refresh", "Partially furnished", "Fully furnished — needs a new direction"], required: true },
      { id: "roomsToStyle", label: "Which rooms need styling?", type: "multiselect", options: ["Living room", "Dining room", "Kitchen", "Master bedroom", "Children's rooms", "Guest room", "Home office", "Outdoor space", "Entire home"], required: true },
      { id: "keepItems", label: "Items you want to keep", type: "textarea", placeholder: "Describe any furniture or pieces you'd like to incorporate" },
    ],
  },
  styleSection,
  budgetSection,
];

const singleSpaceQuestions: QuestionSection[] = [
  commonQuestions,
  {
    title: "Space Details",
    questions: [
      { id: "spaceType", label: "Which space are we designing?", type: "select", options: ["Living room", "Dining room", "Master bedroom", "Master bathroom", "Home office", "Children's room", "Guest suite", "Outdoor/Garden", "Other"], required: true },
      { id: "spaceSize", label: "Approximate size of the space (sqm)", type: "number" },
      { id: "currentIssues", label: "What's not working with the current space?", type: "textarea", required: true },
      { id: "desiredOutcome", label: "What would your dream version of this space look like?", type: "textarea", required: true },
    ],
  },
  styleSection,
  budgetSection,
];

const kitchenDesignQuestions: QuestionSection[] = [
  commonQuestions,
  {
    title: "Kitchen Configuration",
    questions: [
      { id: "kitchenType", label: "Kitchen configuration needed", type: "select", options: ["Single kitchen", "Separate Meat & Dairy", "Main kitchen + auxiliary/Pesach kitchen"], required: true },
      { id: "kitchenSize", label: "Kitchen size (sqm)", type: "number" },
      { id: "currentKitchenIssue", label: "What's the main issue with your current kitchen?", type: "textarea", required: true },
      { id: "isOpenPlan", label: "Do you want an open-plan kitchen?", type: "boolean" },
      { id: "kitchenMustHaves", label: "Kitchen must-haves", type: "multiselect", options: ["Large island", "Walk-in pantry", "Professional-grade appliances", "Built-in coffee station", "Double oven", "Wine storage", "Breakfast nook", "Pot filler", "Under-cabinet lighting"] },
    ],
  },
  {
    title: "Appliances & Materials",
    questions: [
      { id: "applianceBrand", label: "Appliance brand preference", type: "text", placeholder: "e.g. Miele, Sub-Zero, Gaggenau..." },
      { id: "countertopPreference", label: "Countertop material preference", type: "multiselect", options: ["Natural marble", "Granite", "Quartz (Caesarstone/Silestone)", "Dekton", "Butcher block accent", "No preference — advise me"] },
      { id: "cabinetStyle", label: "Cabinet style preference", type: "select", options: ["Handleless/Push-open", "Shaker style", "Flat panel modern", "Raised panel classic", "Custom — discuss with designer"], required: true },
    ],
  },
  styleSection,
  budgetSection,
];

export const questionnaireByProjectType: Record<ProjectType, QuestionSection[]> = {
  full_renovation: fullRenovationQuestions,
  contractor_apartment: contractorApartmentQuestions,
  home_styling: homeStylingQuestions,
  single_space: singleSpaceQuestions,
  kitchen_design: kitchenDesignQuestions,
};
