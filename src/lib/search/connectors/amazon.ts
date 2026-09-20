import { createHash, createHmac } from "node:crypto";
import type { Offer } from "../types";
import { parsePrice, toSar } from "../fx";
import { desktopHeaders } from "../http";

const HOST = process.env.AMAZON_HOST?.trim() || "webservices.amazon.sa";
const REGION = process.env.AMAZON_REGION?.trim() || "eu-west-1";
const MARKETPLACE = process.env.AMAZON_MARKETPLACE?.trim() || "www.amazon.sa";
const SERVICE = "ProductAdvertisingAPI";
const PATH = "/paapi5/searchitems";
const TARGET = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems";

function hmac(key: Buffer | string, data: string): Buffer {
  return createHmac("sha256", key).update(data, "utf8").digest();
}

function sha256Hex(data: string): string {
  return createHash("sha256").update(data, "utf8").digest("hex");
}

function signPaapi(secret: string, amzDate: string, payloadHash: string): string {
  const dateStamp = amzDate.slice(0, 8);
  const canonicalHeaders =
    `content-encoding:amz-1.0\n` +
    `content-type:application/json; charset=utf-8\n` +
    `host:${HOST}\n` +
    `x-amz-date:${amzDate}\n` +
    `x-amz-target:${TARGET}\n`;
  const signedHeaders = "content-encoding;content-type;host;x-amz-date;x-amz-target";
  const canonicalRequest = [
    "POST",
    PATH,
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");
  const credentialScope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join("\n");
  const kDate = hmac(`AWS4${secret}`, dateStamp);
  const kRegion = hmac(kDate, REGION);
  const kService = hmac(kRegion, SERVICE);
  const kSigning = hmac(kService, "aws4_request");
  const signature = createHmac("sha256", kSigning).update(stringToSign, "utf8").digest("hex");
  const accessKey = process.env.AMAZON_ACCESS_KEY!.trim();
  return `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
}

type PaapiItem = {
  ASIN?: string;
  DetailPageURL?: string;
  Images?: { Primary?: { Large?: { URL?: string } } };
  ItemInfo?: {
    Title?: { DisplayValue?: string };
    ByLineInfo?: { Brand?: { DisplayValue?: string } };
  };
  Offers?: {
    Listings?: { Price?: { Amount?: number; Currency?: string; DisplayAmount?: string } }[];
  };
};

function itemsToOffers(items: PaapiItem[], query: string): Offer[] {
  const offers: Offer[] = [];
  for (const item of items) {
    const title = item.ItemInfo?.Title?.DisplayValue?.trim();
    if (!title || !item.DetailPageURL) continue;
    const listing = item.Offers?.Listings?.[0]?.Price;
    const amount = listing?.Amount ?? parsePrice(listing?.DisplayAmount);
    const currency = listing?.Currency ?? "SAR";
    const priceSar = amount != null ? toSar(amount, currency) : null;
    offers.push({
      id: `amz-${item.ASIN ?? title}`,
      title,
      titleAr: title,
      brand: item.ItemInfo?.ByLineInfo?.Brand?.DisplayValue ?? "Amazon",
      price: amount,
      currency,
      priceSar,
      url: item.DetailPageURL,
      image: item.Images?.Primary?.Large?.URL ?? null,
      storeId: "amazon",
      rating: null,
      source: "live",
      groupKey: slugKey(title, query),
    });
  }
  return offers;
}

function slugKey(title: string, query: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
  return base || query.slice(0, 32);
}

async function searchPaapi(query: string): Promise<Offer[]> {
  const access = process.env.AMAZON_ACCESS_KEY?.trim();
  const secret = process.env.AMAZON_SECRET_KEY?.trim();
  const tag = process.env.AMAZON_PARTNER_TAG?.trim();
  if (!access || !secret || !tag) return [];

  const body = JSON.stringify({
    Keywords: query,
    Marketplace: MARKETPLACE,
    PartnerTag: tag,
    PartnerType: "Associates",
    ItemCount: 10,
    SearchIndex: "All",
    LanguagesOfPreference: ["ar_SA", "en_US"],
    Resources: [
      "Images.Primary.Large",
      "ItemInfo.Title",
      "ItemInfo.ByLineInfo",
      "Offers.Listings.Price",
    ],
  });
  const amzDate = new Date().toISOString().replace(/[:-]|\.\d{3}/g, "");
  const payloadHash = sha256Hex(body);
  const authorization = signPaapi(secret, amzDate, payloadHash);

  const res = await fetch(`https://${HOST}${PATH}`, {
    method: "POST",
    headers: {
      host: HOST,
      "content-type": "application/json; charset=utf-8",
      "content-encoding": "amz-1.0",
      "x-amz-date": amzDate,
      "x-amz-target": TARGET,
      authorization,
    },
    body,
    signal: AbortSignal.timeout(9000),
  });
  if (!res.ok) {
    throw new Error(`Amazon PA-API ${res.status}`);
  }
  const data = (await res.json()) as {
    SearchResult?: { Items?: PaapiItem[] };
  };
  return itemsToOffers(data.SearchResult?.Items ?? [], query);
}

export async function searchAmazon(query: string): Promise<Offer[]> {
  try {
    return await searchPaapi(query);
  } catch {
    return [];
  }
}

type SuggestionPayload = {
  suggestions?: { value?: string }[];
};

export async function amazonSuggestions(prefix: string): Promise<string[]> {
  const q = prefix.trim().slice(0, 80);
  if (q.length < 2) return [];
  try {
    const url =
      "https://completion.amazon.sa/api/2017/suggestions" +
      `?limit=8&prefix=${encodeURIComponent(q)}&alias=aps&mid=A17E79C6D8DWNP`;
    const data = await fetch(url, {
      headers: desktopHeaders(),
      signal: AbortSignal.timeout(4000),
    }).then(async (res) => {
      if (!res.ok) throw new Error(String(res.status));
      return (await res.json()) as SuggestionPayload;
    });
    return (data.suggestions ?? [])
      .map((s) => s.value?.trim())
      .filter((v): v is string => Boolean(v));
  } catch {
    return [];
  }
}
