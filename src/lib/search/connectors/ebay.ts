import type { Offer } from "../types";
import { parsePrice, toSar } from "../fx";

type FindingItem = {
  itemId?: string[];
  title?: string[];
  viewItemURL?: string[];
  galleryURL?: string[];
  pictureURLSuperSize?: string[];
  sellingStatus?: { currentPrice?: { "@currencyId"?: string; __value__?: string }[] }[];
};

type FindingResponse = {
  findItemsByKeywordsResponse?: {
    searchResult?: { item?: FindingItem[] }[];
  }[];
};

function slugKey(title: string, query: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return base || query.slice(0, 32);
}

async function searchFinding(query: string): Promise<Offer[]> {
  const appId = process.env.EBAY_APP_ID?.trim();
  if (!appId) return [];
  const params = new URLSearchParams({
    "OPERATION-NAME": "findItemsByKeywords",
    "SERVICE-VERSION": "1.13.0",
    "SECURITY-APPNAME": appId,
    "RESPONSE-DATA-FORMAT": "JSON",
    "REST-PAYLOAD": "true",
    keywords: query,
    "paginationInput.entriesPerPage": "10",
    "outputSelector(0)": "PictureURLSuperSize",
    "itemFilter(0).name": "ListingType",
    "itemFilter(0).value": "FixedPrice",
    "GLOBAL-ID": "EBAY-US",
  });
  const res = await fetch(
    `https://svcs.ebay.com/services/search/FindingService/v1?${params.toString()}`,
    { signal: AbortSignal.timeout(9000) },
  );
  if (!res.ok) throw new Error(`eBay Finding ${res.status}`);
  const data = (await res.json()) as FindingResponse;
  const items =
    data.findItemsByKeywordsResponse?.[0]?.searchResult?.[0]?.item ?? [];
  const offers: Offer[] = [];
  for (const item of items) {
    const title = item.title?.[0]?.trim();
    const url = item.viewItemURL?.[0];
    if (!title || !url) continue;
    const priceNode = item.sellingStatus?.[0]?.currentPrice?.[0];
    const amount = parsePrice(priceNode?.__value__);
    const currency = priceNode?.["@currencyId"] ?? "USD";
    offers.push({
      id: `ebay-${item.itemId?.[0] ?? title}`,
      title,
      titleAr: title,
      brand: "",
      price: amount,
      currency,
      priceSar: amount != null ? toSar(amount, currency) : null,
      url,
      image: item.pictureURLSuperSize?.[0] ?? item.galleryURL?.[0] ?? null,
      storeId: "ebay",
      rating: null,
      source: "live",
      groupKey: slugKey(title, query),
    });
  }
  return offers;
}

type BrowseItem = {
  itemId?: string;
  title?: string;
  itemWebUrl?: string;
  image?: { imageUrl?: string };
  price?: { value?: string; currency?: string };
};

async function searchBrowse(query: string): Promise<Offer[]> {
  const clientId = process.env.EBAY_CLIENT_ID?.trim();
  const clientSecret = process.env.EBAY_CLIENT_SECRET?.trim();
  if (!clientId || !clientSecret) return [];

  const tokenRes = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
    signal: AbortSignal.timeout(6000),
  });
  if (!tokenRes.ok) throw new Error(`eBay OAuth ${tokenRes.status}`);
  const tokenBody = (await tokenRes.json()) as { access_token?: string };
  if (!tokenBody.access_token) return [];

  const res = await fetch(
    `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${tokenBody.access_token}`,
        "Content-Type": "application/json",
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_US",
      },
      signal: AbortSignal.timeout(9000),
    },
  );
  if (!res.ok) throw new Error(`eBay Browse ${res.status}`);
  const data = (await res.json()) as { itemSummaries?: BrowseItem[] };
  const offers: Offer[] = [];
  for (const item of data.itemSummaries ?? []) {
    const title = item.title?.trim();
    if (!title || !item.itemWebUrl) continue;
    const amount = parsePrice(item.price?.value);
    const currency = item.price?.currency ?? "USD";
    offers.push({
      id: `ebay-${item.itemId ?? title}`,
      title,
      titleAr: title,
      brand: "",
      price: amount,
      currency,
      priceSar: amount != null ? toSar(amount, currency) : null,
      url: item.itemWebUrl,
      image: item.image?.imageUrl ?? null,
      storeId: "ebay",
      rating: null,
      source: "live",
      groupKey: slugKey(title, query),
    });
  }
  return offers;
}

export async function searchEbay(query: string): Promise<Offer[]> {
  try {
    const browse = await searchBrowse(query);
    if (browse.length > 0) return browse;
  } catch {
    /* fall through to Finding */
  }
  try {
    return await searchFinding(query);
  } catch {
    return [];
  }
}
