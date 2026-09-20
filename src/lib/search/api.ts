import { createServerFn } from "@tanstack/react-start";
import type { SearchRequest, SearchResponse, StoreId } from "./types";
import { isStoreId } from "./stores";
import { emptySearch, runSearch } from "./engine";
import { amazonSuggestions } from "./connectors/amazon";
import { POPULAR_QUERIES } from "./catalog";
import { storeStatusList } from "./stores";

function parseSearchInput(input: unknown): SearchRequest {
  const d = (input ?? {}) as {
    query?: unknown;
    stores?: unknown;
    sort?: unknown;
  };
  const query = String(d.query ?? "").trim().slice(0, 120);
  const stores = Array.isArray(d.stores)
    ? d.stores.map(String).filter(isStoreId)
    : undefined;
  const sort =
    d.sort === "price" || d.sort === "price-desc" || d.sort === "store"
      ? d.sort
      : "price";
  return { query, stores, sort };
}

export const searchProducts = createServerFn({ method: "POST" })
  .validator((input: unknown) => parseSearchInput(input))
  .handler(async ({ data }): Promise<SearchResponse> => {
    if (data.query.length < 2) return emptySearch(data.query);
    return runSearch(data);
  });

export const suggestQueries = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const q = String((input as { query?: unknown })?.query ?? "")
      .trim()
      .slice(0, 80);
    return { query: q };
  })
  .handler(async ({ data }): Promise<{ suggestions: string[] }> => {
    if (data.query.length < 2) {
      return { suggestions: POPULAR_QUERIES.slice(0, 6) };
    }
    const remote = await amazonSuggestions(data.query);
    const local = POPULAR_QUERIES.filter((p) =>
      p.includes(data.query) || data.query.length >= 2,
    ).slice(0, 3);
    const merged = [...remote, ...local];
    return { suggestions: [...new Set(merged)].slice(0, 8) };
  });

export const getStoreStatus = createServerFn({ method: "POST" }).handler(
  async () => storeStatusList(),
);

export type { StoreId, SearchResponse };
