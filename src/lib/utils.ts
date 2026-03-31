export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number, currency: "ILS" | "USD" = "ILS"): string {
  const symbol = currency === "ILS" ? "₪" : "$";
  return `${symbol}${amount.toLocaleString()}`;
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function getInitials(firstName: string, lastName: string): string {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}

export function getProgressPercentage(used: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((used / total) * 100);
}

export function getStageIndex(stage: string, stages: readonly string[]): number {
  return stages.indexOf(stage);
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}
