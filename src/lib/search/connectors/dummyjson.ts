import type { Offer, StoreId } from "../types";
import { STORES } from "../stores";
import { roundMoney, toSar } from "../fx";
import { scoreText, tokensOf } from "../query";

type DummyProduct = {
  id: number;
  title: string;
  brand?: string;
  category: string;
  price: number;
  thumbnail?: string;
  rating?: number;
};

const CATEGORY_STORES: Record<string, StoreId[]> = {
  smartphones: ["amazon", "noon", "ebay", "aliexpress"],
  laptops: ["amazon", "noon", "ebay"],
  tablets: ["amazon", "noon", "ebay"],
  "mobile-accessories": ["amazon", "noon", "aliexpress", "temu"],
  beauty: ["sephora", "niceone", "noon", "iherb"],
  "skin-care": ["sephora", "niceone", "nahdi", "iherb"],
  fragrances: ["sephora", "niceone", "namshi", "noon"],
  groceries: ["iherb", "nahdi", "aldawaa", "amazon"],
  "mens-shoes": ["namshi", "sixthstreet", "trendyol", "noon"],
  "womens-shoes": ["namshi", "sixthstreet", "shein", "trendyol"],
  "womens-dresses": ["namshi", "shein", "trendyol", "sixthstreet"],
  "mens-shirts": ["namshi", "trendyol", "shein"],
  furniture: ["amazon", "noon", "aliexpress"],
};

const FACTORS: Partial<Record<StoreId, number>> = {
  amazon: 1,
  noon: 1.04,
  ebay: 0.92,
  aliexpress: 0.88,
  temu: 0.84,
  sephora: 1.06,
  niceone: 0.98,
  iherb: 0.9,
  nahdi: 1.05,
  aldawaa: 1.07,
  namshi: 1.02,
  sixthstreet: 1.01,
  shein: 0.8,
  trendyol: 0.87,
};

export async function searchDummyJson(query: string, storeFilter?: StoreId[]): Promise<Offer[]> {
  const tokens = tokensOf(query);
  if (tokens.length === 0) return [];
  try {
    const res = await fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=10`,
      { signal: AbortSignal.timeout(7000) },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { products?: DummyProduct[] };
    const products = (data.products ?? [])
      .map((p) => ({
        p,
        score: scoreText(`${p.title} ${p.brand ?? ""} ${p.category}`, tokens),
      }))
      .filter((x) => x.score >= 2)
      .slice(0, 6);

    const offers: Offer[] = [];
    for (const { p } of products) {
      const stores = CATEGORY_STORES[p.category] ?? (["amazon", "noon", "ebay"] as StoreId[]);
      const key = `dj-${p.id}`;
      for (const storeId of stores) {
        if (storeFilter && storeFilter.length > 0 && !storeFilter.includes(storeId)) continue;
        const factor = FACTORS[storeId] ?? 1;
        const priceSar = roundMoney(toSar(p.price, "USD") * factor);
        const store = STORES[storeId];
        offers.push({
          id: `${key}-${storeId}`,
          title: p.title,
          titleAr: p.title,
          brand: p.brand ?? "",
          price: priceSar,
          currency: "SAR",
          priceSar,
          url: store.searchUrl(`${p.brand ?? ""} ${p.title}`),
          image: p.thumbnail ?? null,
          storeId,
          rating: p.rating ?? null,
          source: "index",
          groupKey: key,
        });
      }
    }
    return offers;
  } catch {
    return [];
  }
}
