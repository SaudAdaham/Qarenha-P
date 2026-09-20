export const STORE_IDS = [
  "amazon",
  "noon",
  "temu",
  "aliexpress",
  "ebay",
  "iherb",
  "shein",
  "trendyol",
  "niceone",
  "nahdi",
  "aldawaa",
  "spiro",
  "namshi",
  "sixthstreet",
  "sephora",
] as const;

export type StoreId = (typeof STORE_IDS)[number];

export type OfferSource = "live" | "index";

export type Offer = {
  id: string;
  title: string;
  titleAr: string;
  brand: string;
  price: number | null;
  currency: string;
  priceSar: number | null;
  url: string;
  image: string | null;
  storeId: StoreId;
  rating: number | null;
  source: OfferSource;
  groupKey: string;
};

export type ProductGroup = {
  key: string;
  title: string;
  titleAr: string;
  brand: string;
  image: string | null;
  category: string;
  offers: Offer[];
  bestPriceSar: number | null;
  bestStoreId: StoreId | null;
};

export type StoreStatus = {
  id: StoreId;
  nameAr: string;
  nameEn: string;
  live: boolean;
  ready: boolean;
};

export type SearchSort = "price" | "price-desc" | "store";

export type SearchRequest = {
  query: string;
  stores?: StoreId[];
  sort?: SearchSort;
};

export type SearchResponse = {
  query: string;
  groups: ProductGroup[];
  offers: Offer[];
  storeStatus: StoreStatus[];
  tookMs: number;
  liveSources: string[];
  usedIndex: boolean;
  suggestions: string[];
};
