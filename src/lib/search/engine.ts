import type {
  Offer,
  ProductGroup,
  SearchRequest,
  SearchResponse,
  SearchSort,
  StoreId,
} from "./types";
import { isStoreId, storeStatusList } from "./stores";
import { searchCatalog } from "./catalog";
import { searchAmazon } from "./connectors/amazon";
import { searchEbay } from "./connectors/ebay";
import { searchDummyJson } from "./connectors/dummyjson";
import { searchOpenFacts } from "./connectors/openfacts";

const cache = new Map<string, { at: number; value: SearchResponse }>();
const CACHE_MS = 5 * 60 * 1000;

function cacheKey(req: SearchRequest): string {
  return JSON.stringify({
    q: req.query.trim().toLowerCase(),
    stores: (req.stores ?? []).slice().sort(),
    sort: req.sort ?? "price",
  });
}

function groupOffers(offers: Offer[]): ProductGroup[] {
  const map = new Map<string, ProductGroup>();
  for (const offer of offers) {
    const existing = map.get(offer.groupKey);
    if (!existing) {
      map.set(offer.groupKey, {
        key: offer.groupKey,
        title: offer.title,
        titleAr: offer.titleAr,
        brand: offer.brand,
        image: offer.image,
        category: "",
        offers: [offer],
        bestPriceSar: offer.priceSar,
        bestStoreId: offer.priceSar != null ? offer.storeId : null,
      });
      continue;
    }
    existing.offers.push(offer);
    if (offer.image && !existing.image) existing.image = offer.image;
    if (!existing.brand && offer.brand) existing.brand = offer.brand;
    if (
      offer.priceSar != null &&
      (existing.bestPriceSar == null || offer.priceSar < existing.bestPriceSar)
    ) {
      existing.bestPriceSar = offer.priceSar;
      existing.bestStoreId = offer.storeId;
    }
  }
  return [...map.values()];
}

function sortOffers(offers: Offer[], sort: SearchSort): Offer[] {
  return offers.slice().sort((a, b) => {
    if (sort === "store") return a.storeId.localeCompare(b.storeId);
    const ap = a.priceSar ?? Number.POSITIVE_INFINITY;
    const bp = b.priceSar ?? Number.POSITIVE_INFINITY;
    if (sort === "price-desc") return bp - ap;
    return ap - bp;
  });
}

function sortGroups(groups: ProductGroup[], sort: SearchSort): ProductGroup[] {
  const copy = groups.map((g) => ({
    ...g,
    offers: sortOffers(g.offers, sort),
  }));
  copy.sort((a, b) => {
    if (sort === "store") return a.titleAr.localeCompare(b.titleAr, "ar");
    const ap = a.bestPriceSar ?? Number.POSITIVE_INFINITY;
    const bp = b.bestPriceSar ?? Number.POSITIVE_INFINITY;
    if (sort === "price-desc") return bp - ap;
    return ap - bp;
  });
  return copy;
}

function preferLive(offers: Offer[]): Offer[] {
  const liveStores = new Set(offers.filter((o) => o.source === "live").map((o) => o.storeId));
  if (liveStores.size === 0) return offers;
  return offers.filter((o) => o.source === "live" || !liveStores.has(o.storeId));
}

function dedupe(offers: Offer[]): Offer[] {
  const seen = new Set<string>();
  const out: Offer[] = [];
  for (const o of offers) {
    const k = `${o.storeId}|${o.url}|${o.title}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(o);
  }
  return out;
}

async function settled<T>(job: Promise<T>, fallback: T): Promise<T> {
  try {
    return await job;
  } catch {
    return fallback;
  }
}

export async function runSearch(req: SearchRequest): Promise<SearchResponse> {
  const started = Date.now();
  const query = req.query.trim().slice(0, 120);
  const sort: SearchSort = req.sort ?? "price";
  const stores = (req.stores ?? []).filter(isStoreId);
  const key = cacheKey({ query, stores, sort });
  const cached = cache.get(key);
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.value;

  const allow = (id: StoreId) => stores.length === 0 || stores.includes(id);

  const [catalog, dummy, facts, amazon, ebay] = await Promise.all([
    Promise.resolve(searchCatalog(query, stores.length ? stores : undefined)),
    settled(searchDummyJson(query, stores.length ? stores : undefined), [] as Offer[]),
    settled(searchOpenFacts(query), [] as Offer[]),
    allow("amazon") ? settled(searchAmazon(query), [] as Offer[]) : Promise.resolve([] as Offer[]),
    allow("ebay") ? settled(searchEbay(query), [] as Offer[]) : Promise.resolve([] as Offer[]),
  ]);

  let offers = preferLive(dedupe([...amazon, ...ebay, ...catalog, ...dummy, ...facts]));
  if (stores.length > 0) offers = offers.filter((o) => stores.includes(o.storeId));

  const groups = sortGroups(groupOffers(offers), sort).slice(0, 16);
  const flat = sortOffers(
    groups.flatMap((g) => g.offers),
    sort,
  );

  const liveSources: string[] = [];
  if (amazon.some((o) => o.source === "live")) liveSources.push("Amazon.sa");
  if (ebay.some((o) => o.source === "live")) liveSources.push("eBay");

  const result: SearchResponse = {
    query,
    groups,
    offers: flat,
    storeStatus: storeStatusList(),
    tookMs: Date.now() - started,
    liveSources,
    usedIndex: flat.some((o) => o.source === "index"),
    suggestions: [],
  };
  cache.set(key, { at: Date.now(), value: result });
  if (cache.size > 80) {
    const first = cache.keys().next().value;
    if (first) cache.delete(first);
  }
  return result;
}

export function emptySearch(query: string): SearchResponse {
  return {
    query,
    groups: [],
    offers: [],
    storeStatus: storeStatusList(),
    tookMs: 0,
    liveSources: [],
    usedIndex: false,
    suggestions: [],
  };
}
