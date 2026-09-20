import type { Offer, StoreId } from "./types";
import { STORES } from "./stores";
import { roundMoney } from "./fx";
import { scoreText, tokensOf } from "./query";

type CatalogProduct = {
  key: string;
  title: string;
  titleAr: string;
  brand: string;
  category: string;
  image: string;
  baseSar: number;
  stores: { id: StoreId; factor: number; rating?: number }[];
};

const IMG = {
  iphone:
    "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp",
  samsung:
    "https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp",
  macbook:
    "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp",
  perfume:
    "https://cdn.dummyjson.com/product-images/fragrances/dior-j'adore/thumbnail.webp",
  chanel:
    "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
  gucci:
    "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp",
  ck: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",
  mascara:
    "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
  lipstick:
    "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
  cream:
    "https://cdn.dummyjson.com/product-images/skin-care/himalaya-powder/thumbnail.webp",
};

const CATALOG: CatalogProduct[] = [
  {
    key: "iphone-17-pro",
    title: "Apple iPhone 17 Pro 256GB",
    titleAr: "آيفون 17 برو 256 جيجا",
    brand: "Apple",
    category: "electronics",
    image: IMG.iphone,
    baseSar: 4999,
    stores: [
      { id: "amazon", factor: 1, rating: 4.7 },
      { id: "noon", factor: 1.03, rating: 4.6 },
      { id: "ebay", factor: 0.94, rating: 4.4 },
      { id: "aliexpress", factor: 0.91, rating: 4.2 },
      { id: "temu", factor: 0.88, rating: 4.0 },
    ],
  },
  {
    key: "iphone-17-pro-max",
    title: "Apple iPhone 17 Pro Max 256GB",
    titleAr: "آيفون 17 برو ماكس 256 جيجا",
    brand: "Apple",
    category: "electronics",
    image: IMG.iphone,
    baseSar: 5599,
    stores: [
      { id: "amazon", factor: 1, rating: 4.8 },
      { id: "noon", factor: 1.02, rating: 4.6 },
      { id: "ebay", factor: 0.95, rating: 4.3 },
    ],
  },
  {
    key: "iphone-16",
    title: "Apple iPhone 16 128GB",
    titleAr: "آيفون 16 سعة 128 جيجا",
    brand: "Apple",
    category: "electronics",
    image: IMG.iphone,
    baseSar: 3299,
    stores: [
      { id: "amazon", factor: 1, rating: 4.6 },
      { id: "noon", factor: 0.98, rating: 4.5 },
      { id: "ebay", factor: 0.92, rating: 4.3 },
      { id: "aliexpress", factor: 0.9, rating: 4.1 },
    ],
  },
  {
    key: "airpods-pro-2",
    title: "Apple AirPods Pro (2nd generation)",
    titleAr: "آيربودز برو الجيل الثاني",
    brand: "Apple",
    category: "electronics",
    image:
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
    baseSar: 899,
    stores: [
      { id: "amazon", factor: 1, rating: 4.7 },
      { id: "noon", factor: 1.04, rating: 4.5 },
      { id: "namshi", factor: 1.06, rating: 4.4 },
      { id: "ebay", factor: 0.89, rating: 4.2 },
    ],
  },
  {
    key: "macbook-air-m3",
    title: "Apple MacBook Air 13-inch M3 8/256",
    titleAr: "ماك بوك إير 13 إنش M3",
    brand: "Apple",
    category: "electronics",
    image: IMG.macbook,
    baseSar: 4299,
    stores: [
      { id: "amazon", factor: 1, rating: 4.8 },
      { id: "noon", factor: 1.03, rating: 4.6 },
      { id: "ebay", factor: 0.93, rating: 4.4 },
    ],
  },
  {
    key: "galaxy-s25-ultra",
    title: "Samsung Galaxy S25 Ultra 256GB",
    titleAr: "سامسونج جالكسي إس 25 ألترا",
    brand: "Samsung",
    category: "electronics",
    image: IMG.samsung,
    baseSar: 4699,
    stores: [
      { id: "amazon", factor: 1, rating: 4.6 },
      { id: "noon", factor: 0.99, rating: 4.5 },
      { id: "ebay", factor: 0.94, rating: 4.3 },
      { id: "aliexpress", factor: 0.9, rating: 4.1 },
    ],
  },
  {
    key: "dyson-v15",
    title: "Dyson V15 Detect Absolute",
    titleAr: "دايسون في 15 ديتكت",
    brand: "Dyson",
    category: "home",
    image:
      "https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/thumbnail.webp",
    baseSar: 2499,
    stores: [
      { id: "amazon", factor: 1, rating: 4.7 },
      { id: "noon", factor: 1.05, rating: 4.6 },
      { id: "namshi", factor: 1.08, rating: 4.4 },
    ],
  },
  {
    key: "sony-wh1000xm5",
    title: "Sony WH-1000XM5 Wireless Headphones",
    titleAr: "سوني WH-1000XM5",
    brand: "Sony",
    category: "electronics",
    image:
      "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
    baseSar: 1299,
    stores: [
      { id: "amazon", factor: 1, rating: 4.8 },
      { id: "noon", factor: 1.02, rating: 4.6 },
      { id: "ebay", factor: 0.9, rating: 4.4 },
      { id: "aliexpress", factor: 0.86, rating: 4.1 },
    ],
  },
  {
    key: "nike-air-force-1",
    title: "Nike Air Force 1 '07 White",
    titleAr: "نايك إير فورس 1 أبيض",
    brand: "Nike",
    category: "fashion",
    image:
      "https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp",
    baseSar: 429,
    stores: [
      { id: "namshi", factor: 1, rating: 4.6 },
      { id: "sixthstreet", factor: 1.03, rating: 4.5 },
      { id: "noon", factor: 0.98, rating: 4.4 },
      { id: "trendyol", factor: 0.9, rating: 4.2 },
      { id: "amazon", factor: 1.05, rating: 4.3 },
    ],
  },
  {
    key: "adidas-samba",
    title: "Adidas Samba OG",
    titleAr: "أديداس سامبا OG",
    brand: "Adidas",
    category: "fashion",
    image:
      "https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-red/thumbnail.webp",
    baseSar: 399,
    stores: [
      { id: "namshi", factor: 1, rating: 4.5 },
      { id: "sixthstreet", factor: 0.97, rating: 4.5 },
      { id: "trendyol", factor: 0.88, rating: 4.2 },
      { id: "noon", factor: 1.04, rating: 4.3 },
    ],
  },
  {
    key: "dior-jadore",
    title: "Dior J'adore Eau de Parfum 100ml",
    titleAr: "ديور جادور 100 مل",
    brand: "Dior",
    category: "beauty",
    image: IMG.perfume,
    baseSar: 589,
    stores: [
      { id: "sephora", factor: 1, rating: 4.8 },
      { id: "niceone", factor: 0.97, rating: 4.6 },
      { id: "noon", factor: 1.02, rating: 4.5 },
      { id: "amazon", factor: 1.04, rating: 4.4 },
    ],
  },
  {
    key: "chanel-coco-noir",
    title: "Chanel Coco Noir Eau de Parfum",
    titleAr: "شانيل كوكو نوار",
    brand: "Chanel",
    category: "beauty",
    image: IMG.chanel,
    baseSar: 720,
    stores: [
      { id: "sephora", factor: 1, rating: 4.7 },
      { id: "niceone", factor: 1.03, rating: 4.5 },
      { id: "namshi", factor: 1.06, rating: 4.4 },
    ],
  },
  {
    key: "cerave-moisturising",
    title: "CeraVe Moisturising Cream 454g",
    titleAr: "سيرافي كريم مرطب 454 جم",
    brand: "CeraVe",
    category: "beauty",
    image: IMG.cream,
    baseSar: 79,
    stores: [
      { id: "nahdi", factor: 1, rating: 4.7 },
      { id: "aldawaa", factor: 1.04, rating: 4.6 },
      { id: "iherb", factor: 0.86, rating: 4.8 },
      { id: "niceone", factor: 1.08, rating: 4.5 },
      { id: "sephora", factor: 1.12, rating: 4.5 },
    ],
  },
  {
    key: "laroche-cicaplast",
    title: "La Roche-Posay Cicaplast Baume B5 40ml",
    titleAr: "لاروش بوزيه سيكابلاست بوم B5",
    brand: "La Roche-Posay",
    category: "beauty",
    image: IMG.cream,
    baseSar: 69,
    stores: [
      { id: "nahdi", factor: 1, rating: 4.6 },
      { id: "aldawaa", factor: 0.97, rating: 4.6 },
      { id: "niceone", factor: 1.1, rating: 4.5 },
      { id: "sephora", factor: 1.14, rating: 4.4 },
    ],
  },
  {
    key: "ordinary-niacinamide",
    title: "The Ordinary Niacinamide 10% + Zinc 1%",
    titleAr: "ذي أورديناري نياسيناميد 10%",
    brand: "The Ordinary",
    category: "beauty",
    image: IMG.mascara,
    baseSar: 42,
    stores: [
      { id: "sephora", factor: 1, rating: 4.5 },
      { id: "niceone", factor: 0.95, rating: 4.6 },
      { id: "iherb", factor: 0.82, rating: 4.7 },
      { id: "noon", factor: 1.08, rating: 4.3 },
    ],
  },
  {
    key: "now-vitamin-d3",
    title: "NOW Foods Vitamin D3 5000 IU 240 Softgels",
    titleAr: "ناو فيتامين د3 5000 وحدة",
    brand: "NOW Foods",
    category: "health",
    image:
      "https://cdn.dummyjson.com/product-images/groceries/protein-powder/thumbnail.webp",
    baseSar: 89,
    stores: [
      { id: "iherb", factor: 1, rating: 4.8 },
      { id: "nahdi", factor: 1.18, rating: 4.5 },
      { id: "aldawaa", factor: 1.22, rating: 4.4 },
      { id: "amazon", factor: 1.1, rating: 4.6 },
    ],
  },
  {
    key: "opti-whey",
    title: "Optimum Nutrition Gold Standard Whey 2lb",
    titleAr: "أوبتيمم نيوترشن واي 2 رطل",
    brand: "Optimum Nutrition",
    category: "health",
    image:
      "https://cdn.dummyjson.com/product-images/groceries/protein-powder/thumbnail.webp",
    baseSar: 159,
    stores: [
      { id: "iherb", factor: 1, rating: 4.7 },
      { id: "amazon", factor: 1.08, rating: 4.6 },
      { id: "noon", factor: 1.12, rating: 4.4 },
      { id: "nahdi", factor: 1.2, rating: 4.3 },
    ],
  },
  {
    key: "panadol-extra",
    title: "Panadol Extra Caplets 24s",
    titleAr: "بنادول إكسترا 24 قرص",
    brand: "Panadol",
    category: "health",
    image:
      "https://cdn.dummyjson.com/product-images/groceries/protein-powder/thumbnail.webp",
    baseSar: 18,
    stores: [
      { id: "nahdi", factor: 1, rating: 4.6 },
      { id: "aldawaa", factor: 0.96, rating: 4.6 },
      { id: "amazon", factor: 1.15, rating: 4.3 },
    ],
  },
  {
    key: "rare-soft-pinch",
    title: "Rare Beauty Soft Pinch Liquid Blush",
    titleAr: "رير بيوتي سوفت بينش بلاش",
    brand: "Rare Beauty",
    category: "beauty",
    image: IMG.lipstick,
    baseSar: 129,
    stores: [
      { id: "sephora", factor: 1, rating: 4.7 },
      { id: "niceone", factor: 1.04, rating: 4.5 },
      { id: "noon", factor: 1.08, rating: 4.3 },
    ],
  },
  {
    key: "gucci-bloom",
    title: "Gucci Bloom Eau de Parfum 100ml",
    titleAr: "غوتشي بلوم 100 مل",
    brand: "Gucci",
    category: "beauty",
    image: IMG.gucci,
    baseSar: 545,
    stores: [
      { id: "sephora", factor: 1, rating: 4.6 },
      { id: "niceone", factor: 0.98, rating: 4.5 },
      { id: "namshi", factor: 1.05, rating: 4.4 },
      { id: "noon", factor: 1.07, rating: 4.3 },
    ],
  },
];

function toOffer(product: CatalogProduct, storeId: StoreId, factor: number, rating?: number): Offer {
  const store = STORES[storeId];
  const price = roundMoney(product.baseSar * factor);
  const q = `${product.brand} ${product.title}`;
  return {
    id: `idx-${product.key}-${storeId}`,
    title: product.title,
    titleAr: product.titleAr,
    brand: product.brand,
    price,
    currency: "SAR",
    priceSar: price,
    url: store.searchUrl(q),
    image: product.image,
    storeId,
    rating: rating ?? null,
    source: "index",
    groupKey: product.key,
  };
}

export function searchCatalog(query: string, storeFilter?: StoreId[]): Offer[] {
  const tokens = tokensOf(query);
  if (tokens.length === 0) return [];

  const ranked = CATALOG.map((p) => {
    const hay = `${p.title} ${p.titleAr} ${p.brand} ${p.category} ${p.key}`;
    return { p, score: scoreText(hay, tokens) };
  })
    .filter((x) => x.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  const offers: Offer[] = [];
  for (const { p } of ranked) {
    for (const s of p.stores) {
      if (storeFilter && storeFilter.length > 0 && !storeFilter.includes(s.id)) continue;
      offers.push(toOffer(p, s.id, s.factor, s.rating));
    }
  }
  return offers;
}

export const POPULAR_QUERIES = [
  "آيفون 17 برو",
  "آيربودز برو",
  "جالكسي إس 25",
  "سيرافي",
  "فيتامين د3",
  "نايك إير فورس",
  "ديور جادور",
  "ماك بوك إير",
];
