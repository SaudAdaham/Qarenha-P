const TO_SAR: Record<string, number> = {
  SAR: 1,
  USD: 3.75,
  EUR: 4.05,
  GBP: 4.75,
  AED: 1.02,
  TRY: 0.11,
  CNY: 0.52,
};

export function toSar(amount: number, currency: string): number {
  const rate = TO_SAR[currency.toUpperCase()] ?? 3.75;
  return roundMoney(amount * rate);
}

export function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

export function formatSar(n: number): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: n >= 100 ? 0 : 2,
  }).format(n);
}

export function formatPrice(n: number, currency: string): string {
  if (currency.toUpperCase() === "SAR") return formatSar(n);
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: currency.toUpperCase(),
    maximumFractionDigits: 2,
  }).format(n);
}

export function parsePrice(raw: string | number | null | undefined): number | null {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (!raw) return null;
  const cleaned = String(raw).replace(/[^\d.,]/g, "").replace(/,/g, "");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) ? n : null;
}
