const SYNONYMS: Record<string, string> = {
  ايفون: "iphone",
  ايباد: "ipad",
  ايربودز: "airpods",
  ماك: "macbook",
  سامسونج: "samsung",
  جالكسي: "galaxy",
  سماعات: "headphones",
  لابتوب: "laptop",
  حاسوب: "laptop",
  عطر: "perfume",
  عناية: "skincare",
  سيروم: "serum",
  فيتامين: "vitamin",
  كريم: "cream",
  حذاء: "shoes",
  نايك: "nike",
  اديداس: "adidas",
  دواء: "medicine",
  مكمل: "supplement",
  شاحن: "charger",
};

export function normalizeQuery(q: string): string {
  return q
    .toLowerCase()
    .replace(/[ًٌٍَُِّْـ]/g, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function expandQuery(q: string): string[] {
  const n = normalizeQuery(q);
  if (!n) return [];
  const tokens = n.split(" ");
  const extra = tokens.map((t) => SYNONYMS[t] ?? t);
  const joined = extra.join(" ");
  const set = new Set<string>([n, joined, extra.join(" ")]);
  if (n.includes("ايفون")) set.add(n.replace("ايفون", "iphone"));
  return [...set];
}

export function tokensOf(q: string): string[] {
  const variants = expandQuery(q);
  const tokens = new Set<string>();
  for (const v of variants) {
    for (const t of v.split(" ")) {
      if (t.length >= 2) tokens.add(t);
    }
  }
  return [...tokens];
}

export function scoreText(haystack: string, queryTokens: string[]): number {
  const h = normalizeQuery(haystack);
  if (!h || queryTokens.length === 0) return 0;
  let score = 0;
  let hits = 0;
  for (const t of queryTokens) {
    if (h.includes(t)) {
      hits += 1;
      score += t.length >= 5 ? 4 : 2;
    }
  }
  if (hits === queryTokens.length) score += 8;
  if (h.startsWith(queryTokens[0] ?? "")) score += 2;
  return score;
}

export function looksBeauty(q: string): boolean {
  return /serum|cream|perfume|fragrance|skincare|vitamin|sunscreen|عطر|سيروم|كريم|فيتامين|عناية|واقي/.test(
    normalizeQuery(q) + " " + q.toLowerCase(),
  );
}

export function looksFood(q: string): boolean {
  return /coffee|tea|oil|honey|milk|chocolate|nutella|قهوه|شاي|عسل|زيت|حليب|شوكولاته/.test(
    normalizeQuery(q) + " " + q.toLowerCase(),
  );
}
