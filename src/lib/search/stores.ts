import type { StoreId, StoreStatus } from "./types";
import { STORE_IDS } from "./types";

export type StoreMeta = {
  id: StoreId;
  nameAr: string;
  nameEn: string;
  domain: string;
  searchUrl: (q: string) => string;
  category: string;
  letter: string;
  connector: "amazon" | "ebay" | "index";
};

export const STORES: Record<StoreId, StoreMeta> = {
  amazon: {
    id: "amazon",
    nameAr: "أمازون السعودية",
    nameEn: "Amazon.sa",
    domain: "amazon.sa",
    letter: "A",
    category: "متنوع",
    connector: "amazon",
    searchUrl: (q) =>
      `https://www.amazon.sa/s?k=${encodeURIComponent(q)}`,
  },
  noon: {
    id: "noon",
    nameAr: "نون",
    nameEn: "Noon",
    domain: "noon.com",
    letter: "n",
    category: "متنوع",
    connector: "index",
    searchUrl: (q) =>
      `https://www.noon.com/saudi-ar/search/?q=${encodeURIComponent(q)}`,
  },
  temu: {
    id: "temu",
    nameAr: "تيمو",
    nameEn: "Temu",
    domain: "temu.com",
    letter: "T",
    category: "متنوع",
    connector: "index",
    searchUrl: (q) =>
      `https://www.temu.com/search_result.html?search_key=${encodeURIComponent(q)}`,
  },
  aliexpress: {
    id: "aliexpress",
    nameAr: "علي إكسبرس",
    nameEn: "AliExpress",
    domain: "aliexpress.com",
    letter: "Ali",
    category: "متنوع",
    connector: "index",
    searchUrl: (q) =>
      `https://www.aliexpress.com/w/wholesale-${encodeURIComponent(q.replace(/\s+/g, "-"))}.html`,
  },
  ebay: {
    id: "ebay",
    nameAr: "إيباي",
    nameEn: "eBay",
    domain: "ebay.com",
    letter: "e",
    category: "متنوع",
    connector: "ebay",
    searchUrl: (q) =>
      `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(q)}`,
  },
  iherb: {
    id: "iherb",
    nameAr: "آي هيرب",
    nameEn: "iHerb",
    domain: "iherb.com",
    letter: "iH",
    category: "صحة",
    connector: "index",
    searchUrl: (q) =>
      `https://sa.iherb.com/search?kw=${encodeURIComponent(q)}`,
  },
  shein: {
    id: "shein",
    nameAr: "شي إن",
    nameEn: "SHEIN",
    domain: "shein.com",
    letter: "S",
    category: "أزياء",
    connector: "index",
    searchUrl: (q) =>
      `https://www.shein.com/pdsearch/${encodeURIComponent(q)}`,
  },
  trendyol: {
    id: "trendyol",
    nameAr: "ترينديول",
    nameEn: "Trendyol",
    domain: "trendyol.com",
    letter: "Ty",
    category: "أزياء",
    connector: "index",
    searchUrl: (q) =>
      `https://www.trendyol.com/sr?q=${encodeURIComponent(q)}`,
  },
  niceone: {
    id: "niceone",
    nameAr: "نايس ون",
    nameEn: "Nice One",
    domain: "niceonesa.com",
    letter: "N1",
    category: "جمال",
    connector: "index",
    searchUrl: (q) =>
      `https://niceonesa.com/ar/search?q=${encodeURIComponent(q)}`,
  },
  nahdi: {
    id: "nahdi",
    nameAr: "النهدي",
    nameEn: "Nahdi",
    domain: "nahdionline.com",
    letter: "نه",
    category: "صيدلية",
    connector: "index",
    searchUrl: (q) =>
      `https://www.nahdionline.com/ar-sa/search?q=${encodeURIComponent(q)}`,
  },
  aldawaa: {
    id: "aldawaa",
    nameAr: "الدواء",
    nameEn: "Al-Dawaa",
    domain: "al-dawaa.com",
    letter: "دوا",
    category: "صيدلية",
    connector: "index",
    searchUrl: (q) =>
      `https://www.al-dawaa.com/saudi/search?q=${encodeURIComponent(q)}`,
  },
  spiro: {
    id: "spiro",
    nameAr: "سبيرو",
    nameEn: "Speero",
    domain: "speero.net",
    letter: "سب",
    category: "سيارات",
    connector: "index",
    searchUrl: (q) =>
      `https://www.speero.net/search?q=${encodeURIComponent(q)}`,
  },
  namshi: {
    id: "namshi",
    nameAr: "نمشي",
    nameEn: "Namshi",
    domain: "namshi.com",
    letter: "نم",
    category: "أزياء",
    connector: "index",
    searchUrl: (q) =>
      `https://www.namshi.com/saudi-ar/search/?q=${encodeURIComponent(q)}`,
  },
  sixthstreet: {
    id: "sixthstreet",
    nameAr: "سيكسث ستريت",
    nameEn: "6thStreet",
    domain: "6thstreet.com",
    letter: "6",
    category: "أزياء",
    connector: "index",
    searchUrl: (q) =>
      `https://www.6thstreet.com/sa-ar/search?q=${encodeURIComponent(q)}`,
  },
  sephora: {
    id: "sephora",
    nameAr: "سيفورا",
    nameEn: "Sephora",
    domain: "sephora.sa",
    letter: "Se",
    category: "جمال",
    connector: "index",
    searchUrl: (q) =>
      `https://www.sephora.sa/ar-SA/search?q=${encodeURIComponent(q)}`,
  },
};

export const STORE_LIST: StoreMeta[] = STORE_IDS.map((id) => STORES[id]);

export function isStoreId(value: string): value is StoreId {
  return (STORE_IDS as readonly string[]).includes(value);
}

export function amazonLive(): boolean {
  return Boolean(
    (process.env.AMAZON_ACCESS_KEY &&
      process.env.AMAZON_SECRET_KEY &&
      process.env.AMAZON_PARTNER_TAG) ||
      (process.env.AMAZON_CREDENTIAL_ID &&
        process.env.AMAZON_CREDENTIAL_SECRET &&
        process.env.AMAZON_PARTNER_TAG),
  );
}

export function ebayLive(): boolean {
  return Boolean(
    process.env.EBAY_APP_ID ||
      (process.env.EBAY_CLIENT_ID && process.env.EBAY_CLIENT_SECRET),
  );
}

export function storeStatusList(): StoreStatus[] {
  const amazon = amazonLive();
  const ebay = ebayLive();
  return STORE_LIST.map((s) => ({
    id: s.id,
    nameAr: s.nameAr,
    nameEn: s.nameEn,
    live: s.connector === "amazon" ? amazon : s.connector === "ebay" ? ebay : false,
    ready: s.connector === "amazon" || s.connector === "ebay",
  }));
}
