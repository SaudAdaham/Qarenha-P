import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteFooter, SiteHeader } from "@/components/shell";
import { StoreMark } from "@/components/offer-ui";
import { Badge } from "@/components/ui";
import { getStoreStatus } from "@/lib/search/api";
import { STORE_LIST } from "@/lib/search/stores";

export const Route = createFileRoute("/stores")({ component: StoresPage });

function StoresPage() {
  const status = useQuery({
    queryKey: ["store-status"],
    queryFn: () => getStoreStatus(),
  });
  const map = new Map((status.data ?? []).map((s) => [s.id, s]));

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <p className="text-sm font-medium text-primary">المصادر</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-fg">المتاجر المرتبطة</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted">
          لكل متجر موصل مستقل. البحث يمر عبر الخادم فقط، ولا تُرسل مفاتيح الوصول إلى المتصفح.
          أمازون السعودية وإيباي جاهزان للربط عبر الواجهات الرسمية عند توفير المفاتيح في بيئة
          الخادم.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STORE_LIST.map((store) => {
            const s = map.get(store.id);
            const live = s?.live ?? false;
            const ready = s?.ready ?? store.connector !== "index";
            return (
              <article
                key={store.id}
                className="flex items-start gap-3 rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]"
              >
                <StoreMark id={store.id} className="size-11 text-sm" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="truncate font-medium text-fg">{store.nameAr}</h2>
                    {live ? (
                      <Badge tone="good">مباشر</Badge>
                    ) : ready ? (
                      <Badge tone="warn">جاهز للربط</Badge>
                    ) : (
                      <Badge>فهرس المقارنة</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-fg-subtle">
                    {store.nameEn} · {store.domain}
                  </p>
                  <p className="mt-2 text-sm text-fg-muted">{store.category}</p>
                  <Link
                    to="/search"
                    search={{ q: store.nameAr, sort: "price", stores: store.id }}
                    className="mt-3 inline-block text-sm text-primary"
                  >
                    تصفح عروض هذا المتجر
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
