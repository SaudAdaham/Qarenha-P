import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as parsePrice, c as toSar, i as isStoreId, o as roundMoney, s as storeStatusList, t as STORES } from "./fx-Df4ke-UP.mjs";
import { a as searchCatalog, i as scoreText, n as looksBeauty, o as tokensOf, r as looksFood, t as POPULAR_QUERIES } from "./catalog-BdhyGlRJ.mjs";
import { createHash, createHmac } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/api-C8zcCW2y.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function desktopHeaders(extra) {
	return {
		"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
		Accept: "application/json,text/plain,*/*",
		...extra
	};
}
var HOST = process.env.AMAZON_HOST?.trim() || "webservices.amazon.sa";
var REGION = process.env.AMAZON_REGION?.trim() || "eu-west-1";
var MARKETPLACE = process.env.AMAZON_MARKETPLACE?.trim() || "www.amazon.sa";
var SERVICE = "ProductAdvertisingAPI";
var PATH = "/paapi5/searchitems";
var TARGET = "com.amazon.paapi5.v1.ProductAdvertisingAPIv1.SearchItems";
function hmac(key, data) {
	return createHmac("sha256", key).update(data, "utf8").digest();
}
function sha256Hex(data) {
	return createHash("sha256").update(data, "utf8").digest("hex");
}
function signPaapi(secret, amzDate, payloadHash) {
	const dateStamp = amzDate.slice(0, 8);
	const canonicalHeaders = `content-encoding:amz-1.0
content-type:application/json; charset=utf-8
host:${HOST}\nx-amz-date:${amzDate}\nx-amz-target:${TARGET}\n`;
	const signedHeaders = "content-encoding;content-type;host;x-amz-date;x-amz-target";
	const canonicalRequest = [
		"POST",
		PATH,
		"",
		canonicalHeaders,
		signedHeaders,
		payloadHash
	].join("\n");
	const credentialScope = `${dateStamp}/${REGION}/${SERVICE}/aws4_request`;
	const stringToSign = [
		"AWS4-HMAC-SHA256",
		amzDate,
		credentialScope,
		sha256Hex(canonicalRequest)
	].join("\n");
	const kSigning = hmac(hmac(hmac(hmac(`AWS4${secret}`, dateStamp), REGION), SERVICE), "aws4_request");
	const signature = createHmac("sha256", kSigning).update(stringToSign, "utf8").digest("hex");
	return `AWS4-HMAC-SHA256 Credential=${process.env.AMAZON_ACCESS_KEY.trim()}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
}
function itemsToOffers(items, query) {
	const offers = [];
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
			groupKey: slugKey$1(title, query)
		});
	}
	return offers;
}
function slugKey$1(title, query) {
	return title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 48) || query.slice(0, 32);
}
async function searchPaapi(query) {
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
			"Offers.Listings.Price"
		]
	});
	const amzDate = (/* @__PURE__ */ new Date()).toISOString().replace(/[:-]|\.\d{3}/g, "");
	const authorization = signPaapi(secret, amzDate, sha256Hex(body));
	const res = await fetch(`https://${HOST}${PATH}`, {
		method: "POST",
		headers: {
			host: HOST,
			"content-type": "application/json; charset=utf-8",
			"content-encoding": "amz-1.0",
			"x-amz-date": amzDate,
			"x-amz-target": TARGET,
			authorization
		},
		body,
		signal: AbortSignal.timeout(9e3)
	});
	if (!res.ok) throw new Error(`Amazon PA-API ${res.status}`);
	return itemsToOffers((await res.json()).SearchResult?.Items ?? [], query);
}
async function searchAmazon(query) {
	try {
		return await searchPaapi(query);
	} catch {
		return [];
	}
}
async function amazonSuggestions(prefix) {
	const q = prefix.trim().slice(0, 80);
	if (q.length < 2) return [];
	try {
		const url = `https://completion.amazon.sa/api/2017/suggestions?limit=8&prefix=${encodeURIComponent(q)}&alias=aps&mid=A17E79C6D8DWNP`;
		return ((await fetch(url, {
			headers: desktopHeaders(),
			signal: AbortSignal.timeout(4e3)
		}).then(async (res) => {
			if (!res.ok) throw new Error(String(res.status));
			return await res.json();
		})).suggestions ?? []).map((s) => s.value?.trim()).filter((v) => Boolean(v));
	} catch {
		return [];
	}
}
function slugKey(title, query) {
	return title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").slice(0, 48) || query.slice(0, 32);
}
async function searchFinding(query) {
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
		"GLOBAL-ID": "EBAY-US"
	});
	const res = await fetch(`https://svcs.ebay.com/services/search/FindingService/v1?${params.toString()}`, { signal: AbortSignal.timeout(9e3) });
	if (!res.ok) throw new Error(`eBay Finding ${res.status}`);
	const items = (await res.json()).findItemsByKeywordsResponse?.[0]?.searchResult?.[0]?.item ?? [];
	const offers = [];
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
			groupKey: slugKey(title, query)
		});
	}
	return offers;
}
async function searchBrowse(query) {
	const clientId = process.env.EBAY_CLIENT_ID?.trim();
	const clientSecret = process.env.EBAY_CLIENT_SECRET?.trim();
	if (!clientId || !clientSecret) return [];
	const tokenRes = await fetch("https://api.ebay.com/identity/v1/oauth2/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`
		},
		body: "grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope",
		signal: AbortSignal.timeout(6e3)
	});
	if (!tokenRes.ok) throw new Error(`eBay OAuth ${tokenRes.status}`);
	const tokenBody = await tokenRes.json();
	if (!tokenBody.access_token) return [];
	const res = await fetch(`https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&limit=10`, {
		headers: {
			Authorization: `Bearer ${tokenBody.access_token}`,
			"Content-Type": "application/json",
			"X-EBAY-C-MARKETPLACE-ID": "EBAY_US"
		},
		signal: AbortSignal.timeout(9e3)
	});
	if (!res.ok) throw new Error(`eBay Browse ${res.status}`);
	const data = await res.json();
	const offers = [];
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
			groupKey: slugKey(title, query)
		});
	}
	return offers;
}
async function searchEbay(query) {
	try {
		const browse = await searchBrowse(query);
		if (browse.length > 0) return browse;
	} catch {}
	try {
		return await searchFinding(query);
	} catch {
		return [];
	}
}
var CATEGORY_STORES = {
	smartphones: [
		"amazon",
		"noon",
		"ebay",
		"aliexpress"
	],
	laptops: [
		"amazon",
		"noon",
		"ebay"
	],
	tablets: [
		"amazon",
		"noon",
		"ebay"
	],
	"mobile-accessories": [
		"amazon",
		"noon",
		"aliexpress",
		"temu"
	],
	beauty: [
		"sephora",
		"niceone",
		"noon",
		"iherb"
	],
	"skin-care": [
		"sephora",
		"niceone",
		"nahdi",
		"iherb"
	],
	fragrances: [
		"sephora",
		"niceone",
		"namshi",
		"noon"
	],
	groceries: [
		"iherb",
		"nahdi",
		"aldawaa",
		"amazon"
	],
	"mens-shoes": [
		"namshi",
		"sixthstreet",
		"trendyol",
		"noon"
	],
	"womens-shoes": [
		"namshi",
		"sixthstreet",
		"shein",
		"trendyol"
	],
	"womens-dresses": [
		"namshi",
		"shein",
		"trendyol",
		"sixthstreet"
	],
	"mens-shirts": [
		"namshi",
		"trendyol",
		"shein"
	],
	furniture: [
		"amazon",
		"noon",
		"aliexpress"
	]
};
var FACTORS = {
	amazon: 1,
	noon: 1.04,
	ebay: .92,
	aliexpress: .88,
	temu: .84,
	sephora: 1.06,
	niceone: .98,
	iherb: .9,
	nahdi: 1.05,
	aldawaa: 1.07,
	namshi: 1.02,
	sixthstreet: 1.01,
	shein: .8,
	trendyol: .87
};
async function searchDummyJson(query, storeFilter) {
	const tokens = tokensOf(query);
	if (tokens.length === 0) return [];
	try {
		const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}&limit=10`, { signal: AbortSignal.timeout(7e3) });
		if (!res.ok) return [];
		const products = ((await res.json()).products ?? []).map((p) => ({
			p,
			score: scoreText(`${p.title} ${p.brand ?? ""} ${p.category}`, tokens)
		})).filter((x) => x.score >= 2).slice(0, 6);
		const offers = [];
		for (const { p } of products) {
			const stores = CATEGORY_STORES[p.category] ?? [
				"amazon",
				"noon",
				"ebay"
			];
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
					groupKey: key
				});
			}
		}
		return offers;
	} catch {
		return [];
	}
}
function pickStores(kind) {
	return kind === "beauty" ? [
		"iherb",
		"sephora",
		"niceone",
		"nahdi",
		"noon"
	] : [
		"iherb",
		"nahdi",
		"aldawaa",
		"amazon",
		"noon"
	];
}
function toOffers(products, query, kind) {
	const stores = pickStores(kind);
	const offers = [];
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
				groupKey: key
			});
		}
	}
	return offers;
}
async function searchOff(endpoint, query) {
	const url = `${endpoint}?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5`;
	const res = await fetch(url, {
		headers: desktopHeaders(),
		signal: AbortSignal.timeout(7e3)
	});
	if (!res.ok) return [];
	return (await res.json()).products ?? [];
}
async function searchOpenFacts(query) {
	const jobs = [];
	if (looksBeauty(query)) jobs.push(searchOff("https://world.openbeautyfacts.org/cgi/search.pl", query).then((p) => toOffers(p, query, "beauty")));
	if (looksFood(query)) jobs.push(searchOff("https://world.openfoodfacts.org/cgi/search.pl", query).then((p) => toOffers(p, query, "food")));
	if (jobs.length === 0) return [];
	return (await Promise.allSettled(jobs)).flatMap((s) => s.status === "fulfilled" ? s.value : []);
}
var cache = /* @__PURE__ */ new Map();
var CACHE_MS = 3e5;
function cacheKey(req) {
	return JSON.stringify({
		q: req.query.trim().toLowerCase(),
		stores: (req.stores ?? []).slice().sort(),
		sort: req.sort ?? "price"
	});
}
function groupOffers(offers) {
	const map = /* @__PURE__ */ new Map();
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
				bestStoreId: offer.priceSar != null ? offer.storeId : null
			});
			continue;
		}
		existing.offers.push(offer);
		if (offer.image && !existing.image) existing.image = offer.image;
		if (!existing.brand && offer.brand) existing.brand = offer.brand;
		if (offer.priceSar != null && (existing.bestPriceSar == null || offer.priceSar < existing.bestPriceSar)) {
			existing.bestPriceSar = offer.priceSar;
			existing.bestStoreId = offer.storeId;
		}
	}
	return [...map.values()];
}
function sortOffers(offers, sort) {
	return offers.slice().sort((a, b) => {
		if (sort === "store") return a.storeId.localeCompare(b.storeId);
		const ap = a.priceSar ?? Number.POSITIVE_INFINITY;
		const bp = b.priceSar ?? Number.POSITIVE_INFINITY;
		if (sort === "price-desc") return bp - ap;
		return ap - bp;
	});
}
function sortGroups(groups, sort) {
	const copy = groups.map((g) => ({
		...g,
		offers: sortOffers(g.offers, sort)
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
function preferLive(offers) {
	const liveStores = new Set(offers.filter((o) => o.source === "live").map((o) => o.storeId));
	if (liveStores.size === 0) return offers;
	return offers.filter((o) => o.source === "live" || !liveStores.has(o.storeId));
}
function dedupe(offers) {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const o of offers) {
		const k = `${o.storeId}|${o.url}|${o.title}`;
		if (seen.has(k)) continue;
		seen.add(k);
		out.push(o);
	}
	return out;
}
async function settled(job, fallback) {
	try {
		return await job;
	} catch {
		return fallback;
	}
}
async function runSearch(req) {
	const started = Date.now();
	const query = req.query.trim().slice(0, 120);
	const sort = req.sort ?? "price";
	const stores = (req.stores ?? []).filter(isStoreId);
	const key = cacheKey({
		query,
		stores,
		sort
	});
	const cached = cache.get(key);
	if (cached && Date.now() - cached.at < CACHE_MS) return cached.value;
	const allow = (id) => stores.length === 0 || stores.includes(id);
	const [catalog, dummy, facts, amazon, ebay] = await Promise.all([
		Promise.resolve(searchCatalog(query, stores.length ? stores : void 0)),
		settled(searchDummyJson(query, stores.length ? stores : void 0), []),
		settled(searchOpenFacts(query), []),
		allow("amazon") ? settled(searchAmazon(query), []) : Promise.resolve([]),
		allow("ebay") ? settled(searchEbay(query), []) : Promise.resolve([])
	]);
	let offers = preferLive(dedupe([
		...amazon,
		...ebay,
		...catalog,
		...dummy,
		...facts
	]));
	if (stores.length > 0) offers = offers.filter((o) => stores.includes(o.storeId));
	const groups = sortGroups(groupOffers(offers), sort).slice(0, 16);
	const flat = sortOffers(groups.flatMap((g) => g.offers), sort);
	const liveSources = [];
	if (amazon.some((o) => o.source === "live")) liveSources.push("Amazon.sa");
	if (ebay.some((o) => o.source === "live")) liveSources.push("eBay");
	const result = {
		query,
		groups,
		offers: flat,
		storeStatus: storeStatusList(),
		tookMs: Date.now() - started,
		liveSources,
		usedIndex: flat.some((o) => o.source === "index"),
		suggestions: []
	};
	cache.set(key, {
		at: Date.now(),
		value: result
	});
	if (cache.size > 80) {
		const first = cache.keys().next().value;
		if (first) cache.delete(first);
	}
	return result;
}
function emptySearch(query) {
	return {
		query,
		groups: [],
		offers: [],
		storeStatus: storeStatusList(),
		tookMs: 0,
		liveSources: [],
		usedIndex: false,
		suggestions: []
	};
}
function parseSearchInput(input) {
	const d = input ?? {};
	return {
		query: String(d.query ?? "").trim().slice(0, 120),
		stores: Array.isArray(d.stores) ? d.stores.map(String).filter(isStoreId) : void 0,
		sort: d.sort === "price" || d.sort === "price-desc" || d.sort === "store" ? d.sort : "price"
	};
}
var searchProducts_createServerFn_handler = createServerRpc({
	id: "98cab733c846522b7523096d98c99bfe33700d7a9cf12efdb768a5c68ad01f0b",
	name: "searchProducts",
	filename: "src/lib/search/api.ts"
}, (opts) => searchProducts.__executeServer(opts));
var searchProducts = createServerFn({ method: "POST" }).validator((input) => parseSearchInput(input)).handler(searchProducts_createServerFn_handler, async ({ data }) => {
	if (data.query.length < 2) return emptySearch(data.query);
	return runSearch(data);
});
var suggestQueries_createServerFn_handler = createServerRpc({
	id: "22a4967de31c4d047054f1c64511fc76908955d0e09f584e158e44d22b009347",
	name: "suggestQueries",
	filename: "src/lib/search/api.ts"
}, (opts) => suggestQueries.__executeServer(opts));
var suggestQueries = createServerFn({ method: "POST" }).validator((input) => {
	return { query: String(input?.query ?? "").trim().slice(0, 80) };
}).handler(suggestQueries_createServerFn_handler, async ({ data }) => {
	if (data.query.length < 2) return { suggestions: POPULAR_QUERIES.slice(0, 6) };
	const remote = await amazonSuggestions(data.query);
	const local = POPULAR_QUERIES.filter((p) => p.includes(data.query) || data.query.length >= 2).slice(0, 3);
	const merged = [...remote, ...local];
	return { suggestions: [...new Set(merged)].slice(0, 8) };
});
var getStoreStatus_createServerFn_handler = createServerRpc({
	id: "c45bb8b44c4fb9450ce38443e411efb4e3f3de3bfc00fe49956a04af3c969f2d",
	name: "getStoreStatus",
	filename: "src/lib/search/api.ts"
}, (opts) => getStoreStatus.__executeServer(opts));
var getStoreStatus = createServerFn({ method: "POST" }).handler(getStoreStatus_createServerFn_handler, async () => storeStatusList());
//#endregion
export { getStoreStatus_createServerFn_handler, searchProducts_createServerFn_handler, suggestQueries_createServerFn_handler };
