import type { Offer, StoreId } from "../types";
import { STORES } from "../stores";
import { looksBeauty, looksFood } from "../query";
import { desktopHeaders } from "../http";

type OffProduct = {
  product_name?: string;
  product_name_en?: string;
  product_name_ar?: string;
  brands?: string;
  image_small_url?: string;
  image_url?: string;
  code?: string;
  url?: string;
};

function pickStores(kind: "beauty" | "food"): StoreId[] {
  return kind === "beauty"
    ? ["iherb", "sephora", "niceone", "nahdi", "noon"]
    : ["iherb", "nahdi", "aldawaa", "amazon", "noon"];
}

function toOffers(products: OffProduct[], query: string, kind: "beauty" | "food"): Offer[] {
  const stores = pickStores(kind);
  const offers: Offer[] = [];
  for (const p of products.slice(0, 5)) {
    const title = (p.product_name_en || p.product_name || "").trim();
    if (!title) continue;
    const titleAr = (p.product_name_ar || p.product_name || title).trim();
    const brand = (p.brands || "").split(",")[0]?.trim() || "";
    const image = p.image_small_url || p.image_url || null;
    const key = `off-${p.code || title}`.slice(0, 64);
    for (const storeId of stores) {
      const store = STORES[storeId];
      offers.push({
        id: `${key}-${storeId}`,
        title,
        titleAr,
        brand,
        price: null,
        currency: "SAR",
        priceSar: null,
        url: store.searchUrl(`${brand} ${title}`),
        image,
        storeId,
        rating: null,
        source: "index",
        groupKey: key,
      });
    }
  }
  void query;
  return offers;
}

async function searchOff(endpoint: string, query: string): Promise<OffProduct[]> {
  const url =
    `${endpoint}?search_terms=${encodeURIComponent(query)}` +
    "&search_simple=1&action=process&json=1&page_size=5";
  const res = await fetch(url, {
    headers: desktopHeaders(),
    signal: AbortSignal.timeout(7000),
  });
  if (!res.ok) return [];
  const data = (await res.json()) as { products?: OffProduct[] };
  return data.products ?? [];
}

export async function searchOpenFacts(query: string): Promise<Offer[]> {
  const jobs: Promise<Offer[]>[] = [];
  if (looksBeauty(query)) {
    jobs.push(
      searchOff("https://world.openbeautyfacts.org/cgi/search.pl", query).then((p) =>
        toOffers(p, query, "beauty"),
      ),
    );
  }
  if (looksFood(query)) {
    jobs.push(
      searchOff("https://world.openfoodfacts.org/cgi/search.pl", query).then((p) =>
        toOffers(p, query, "food"),
      ),
    );
  }
  if (jobs.length === 0) return [];
  const settled = await Promise.allSettled(jobs);
  return settled.flatMap((s) => (s.status === "fulfilled" ? s.value : []));
}
