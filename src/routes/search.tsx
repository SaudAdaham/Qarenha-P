import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/shell";
import { SearchBar } from "@/components/search-bar";
import { ProductGroupCard, StoreJumpStrip, StoreMark } from "@/components/offer-ui";
import { Badge, Button, Skeleton } from "@/components/ui";
import { searchProducts } from "@/lib/search/api";
import { STORE_LIST } from "@/lib/search/stores";
import { isStoreId } from "@/lib/search/stores";
import type { SearchSort, StoreId } from "@/lib/search/types";

type SearchParams = {
  q: string;
  sort: SearchSort;
  stores: string;
};

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    q: String(search.q ?? ""),
    sort:
      search.sort === "price-desc" || search.sort === "store" || search.sort === "price"
        ? search.sort
        : "price",
    stores: String(search.stores ?? ""),
  }),
  component: SearchPage,
});

function parseStores(raw: string): StoreId[] {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(isStoreId);
}

function SearchPage() {
  const { q, sort, stores: storesRaw } = Route.useSearch();
  const navigate = Route.useNavigate();
  const selected = useMemo(() => parseStores(storesRaw), [storesRaw]);
  const [mobileFilters, setMobileFilters] = useState(false);

  const query = useQuery({
    queryKey: ["search", q, sort, storesRaw],
    enabled: q.trim().length >= 2,
    queryFn: () =>
      searchProducts({
        data: { query: q, sort, stores: selected.length ? selected : undefined },
      }),
  });

  function setSort(next: SearchSort) {
    void navigate({
      search: (prev) => ({
        q: prev.q ?? "",
        sort: next,
        stores: prev.stores ?? "",
      }),
    });
  }

  function toggleStore(id: StoreId) {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    void navigate({
      search: (prev) => ({
        q: prev.q ?? "",
        sort: prev.sort ?? "price",
        stores: next.join(","),
      }),
    });
  }

  const data = query.data;
  const groups = data?.groups ?? [];

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader compact />
      <div className="border-b border-border bg-bg-elevated">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <SearchBar initial={q} size="md" />
        </div>
      </div>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-6 lg:flex-row">
        <aside className="hidden w-56 shrink-0 lg:block">
          <Filters selected={selected} onToggle={toggleStore} />
        </aside>
        <div className="min-w-0 flex-1 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-lg font-semibold text-fg">
                {q.trim() ? `نتائج «${q}»` : "ابحث عن منتج"}
              </h1>
              {data ? (
                <p className="mt-1 text-sm text-fg-muted">
                  {data.offers.length} عرضًا في {groups.length} منتج · {data.tookMs}ms
                  {data.liveSources.length > 0
                    ? ` · مباشر من ${data.liveSources.join("، ")}`
                    : ""}
                </p>
              ) : null}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileFilters((v) => !v)}
              >
                <SlidersHorizontal className="size-4" />
                المتاجر
              </Button>
              <SortPills sort={sort} onChange={setSort} />
            </div>
          </div>

          {mobileFilters ? (
            <div className="lg:hidden">
              <Filters selected={selected} onToggle={toggleStore} />
            </div>
          ) : null}

          {q.trim().length >= 2 ? <StoreJumpStrip query={q} /> : null}

          {data?.usedIndex && data.liveSources.length === 0 ? (
            <p className="rounded-lg bg-warn-soft px-4 py-3 text-sm text-warn">
              الأسعار الحالية من فهرس المقارنة التوضيحي وروابط المتاجر الرسمية. عند تفعيل مفاتيح
              Amazon.sa أو eBay تُستبدل تلقائيًا بالأسعار المباشرة من واجهاتهم.
            </p>
          ) : null}

          {query.isLoading ? <ResultsSkeleton /> : null}

          {query.isError ? (
            <p className="rounded-lg bg-bg-elevated px-4 py-6 text-sm text-danger shadow-[var(--shadow-border)]">
              تعذر إكمال البحث. جرّب مرة أخرى بعد لحظات.
            </p>
          ) : null}

          {!query.isLoading && q.trim().length >= 2 && groups.length === 0 ? (
            <div className="rounded-xl bg-bg-elevated px-5 py-10 text-center shadow-[var(--shadow-border)]">
              <p className="font-medium text-fg">لا توجد عروض مطابقة</p>
              <p className="mt-2 text-sm text-fg-muted">جرّب عبارة أقصر، أو افتح البحث في المتاجر أعلاه.</p>
              <Link to="/" className="mt-4 inline-block text-sm text-primary">
                العودة للبداية
              </Link>
            </div>
          ) : null}

          {q.trim().length < 2 ? (
            <p className="text-sm text-fg-muted">أدخل حرفين على الأقل للبحث.</p>
          ) : null}

          <div className="space-y-4">
            {groups.map((group) => (
              <ProductGroupCard key={group.key} group={group} />
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function SortPills({
  sort,
  onChange,
}: {
  sort: SearchSort;
  onChange: (s: SearchSort) => void;
}) {
  const items: { id: SearchSort; label: string }[] = [
    { id: "price", label: "الأرخص" },
    { id: "price-desc", label: "الأعلى" },
    { id: "store", label: "المتجر" },
  ];
  return (
    <div className="flex rounded-md bg-bg-subtle p-1">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={`h-9 rounded-sm px-3 text-xs font-medium transition-colors duration-[var(--motion-quick)] ${
            sort === item.id ? "bg-bg-elevated text-fg shadow-[var(--shadow-border)]" : "text-fg-muted"
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function Filters({
  selected,
  onToggle,
}: {
  selected: StoreId[];
  onToggle: (id: StoreId) => void;
}) {
  return (
    <div className="rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
      <p className="text-sm font-medium text-fg">تصفية المتاجر</p>
      <ul className="mt-3 space-y-1">
        {STORE_LIST.map((store) => {
          const on = selected.length === 0 || selected.includes(store.id);
          return (
            <li key={store.id}>
              <button
                type="button"
                onClick={() => onToggle(store.id)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-2 text-right text-sm transition-colors duration-[var(--motion-quick)] ${
                  on ? "bg-bg-subtle text-fg" : "text-fg-subtle"
                }`}
              >
                <StoreMark id={store.id} className="size-6 text-[10px]" />
                <span className="flex-1 truncate">{store.nameAr}</span>
                {store.connector !== "index" ? (
                  <Badge tone={store.connector === "amazon" ? "accent" : "neutral"}>API</Badge>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
      {selected.length > 0 ? (
        <Link
          to="/search"
          search={(prev) => ({
            q: prev.q ?? "",
            sort: prev.sort ?? "price",
            stores: "",
          })}
          className="mt-3 inline-block text-xs text-primary"
        >
          مسح التصفية
        </Link>
      ) : null}
    </div>
  );
}

function ResultsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]">
          <div className="flex gap-4">
            <Skeleton className="size-24 rounded-md" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="price-shimmer h-5 w-32" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
