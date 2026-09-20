import { useState } from "react";
import { ArrowUpLeft, Star } from "lucide-react";
import type { Offer, ProductGroup, StoreId } from "@/lib/search/types";
import { STORES } from "@/lib/search/stores";
import { formatSar } from "@/lib/search/fx";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui";

export function StoreMark({ id, className }: { id: StoreId; className?: string }) {
  const store = STORES[id];
  return (
    <span
      className={cn(
        "inline-flex size-8 shrink-0 items-center justify-center rounded-sm bg-bg-subtle text-[11px] font-semibold text-fg",
        className,
      )}
    >
      {store.letter}
    </span>
  );
}

function ProductImage({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className="flex size-full items-center justify-center bg-bg-subtle">
        <span className="size-10 rounded-md bg-primary/15" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      className="size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10"
      onError={() => setFailed(true)}
    />
  );
}

export function ProductGroupCard({ group }: { group: ProductGroup }) {
  const priced = group.offers.filter((o) => o.priceSar != null);
  const saving =
    priced.length >= 2
      ? Math.max(...priced.map((o) => o.priceSar!)) - Math.min(...priced.map((o) => o.priceSar!))
      : 0;

  return (
    <article className="overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]">
      <div className="flex gap-4 p-4 sm:p-5">
        <div className="size-24 shrink-0 overflow-hidden rounded-md bg-bg-subtle sm:size-28">
          <ProductImage src={group.image} alt={group.titleAr} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-fg-muted">{group.brand || "منتج"}</p>
          <h2 className="mt-1 text-lg font-semibold leading-snug text-fg">{group.titleAr}</h2>
          <p className="mt-0.5 hidden text-sm text-fg-subtle sm:block">{group.title}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {group.bestPriceSar != null ? (
              <p className="text-xl font-semibold tabular-nums text-primary">
                {formatSar(group.bestPriceSar)}
              </p>
            ) : (
              <p className="text-sm text-fg-muted">السعر يظهر في المتجر</p>
            )}
            {group.bestStoreId ? (
              <Badge tone="good">الأرخص: {STORES[group.bestStoreId].nameAr}</Badge>
            ) : null}
            {saving > 1 ? <Badge>توفير حتى {formatSar(saving)}</Badge> : null}
            <span className="text-xs text-fg-subtle">{group.offers.length} عروض</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {group.offers.map((offer) => (
          <OfferRow key={offer.id} offer={offer} best={offer.storeId === group.bestStoreId} />
        ))}
      </div>
    </article>
  );
}

function OfferRow({ offer, best }: { offer: Offer; best: boolean }) {
  const store = STORES[offer.storeId];
  return (
    <a
      href={offer.url}
      target="_blank"
      rel="noreferrer noopener"
      className="flex items-center gap-3 bg-bg-elevated px-4 py-3 transition-colors duration-[var(--motion-quick)] hover:bg-bg-subtle"
    >
      <StoreMark id={offer.storeId} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-fg">{store.nameAr}</p>
        <p className="text-xs text-fg-subtle">{store.nameEn}</p>
      </div>
      <div className="text-left">
        {offer.priceSar != null ? (
          <p className={cn("text-sm font-semibold tabular-nums", best ? "text-primary" : "text-fg")}>
            {formatSar(offer.priceSar)}
          </p>
        ) : (
          <p className="text-xs text-fg-muted">شاهد السعر</p>
        )}
        {offer.rating ? (
          <p className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-fg-subtle">
            <Star className="size-3" />
            <span className="tabular-nums">{offer.rating.toFixed(1)}</span>
          </p>
        ) : null}
      </div>
      <ArrowUpLeft className="size-4 shrink-0 text-fg-subtle" />
    </a>
  );
}

export function StoreJumpStrip({ query }: { query: string }) {
  return (
    <section className="rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]">
      <h2 className="text-sm font-medium text-fg">افتح البحث مباشرة في المتجر</h2>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {Object.values(STORES).map((store) => (
          <a
            key={store.id}
            href={store.searchUrl(query)}
            target="_blank"
            rel="noreferrer noopener"
            className="flex shrink-0 items-center gap-2 rounded-md bg-bg px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)] transition-colors duration-[var(--motion-quick)] hover:bg-bg-subtle"
          >
            <StoreMark id={store.id} className="size-6 text-[10px]" />
            {store.nameAr}
          </a>
        ))}
      </div>
    </section>
  );
}
