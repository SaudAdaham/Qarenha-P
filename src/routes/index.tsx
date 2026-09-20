import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Search, Store, GitCompare } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/shell";
import { SearchBar } from "@/components/search-bar";
import { STORE_LIST } from "@/lib/search/stores";
import { POPULAR_QUERIES } from "@/lib/search/catalog";
import { StoreMark } from "@/components/offer-ui";
import { formatSar } from "@/lib/search/fx";

export const Route = createFileRoute("/")({ component: Home });

const CATEGORIES = [
  { label: "إلكترونيات", q: "آيفون 17 برو" },
  { label: "عناية", q: "سيرافي" },
  { label: "عطور", q: "ديور جادور" },
  { label: "صحة", q: "فيتامين د3" },
  { label: "أزياء", q: "نايك إير فورس" },
  { label: "منزل", q: "دايسون" },
];

function Home() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 pb-12 pt-10 sm:pt-16">
          <div className="stagger-in max-w-2xl">
            <p className="text-sm font-medium text-primary">محرك بحث ومقارنة للمنتجات</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.15] tracking-tight text-fg sm:text-5xl">
              ابحث مرة واحدة،
              <br />
              وقارن قبل أن تشتري.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
              قارنها يجمع العروض من عدة متاجر في شاشة واحدة، ثم يوجهك إلى المتجر الأصلي.
              لسنا متجرًا، ولا نبيع المنتجات.
            </p>
          </div>
          <div className="mt-8 max-w-2xl">
            <SearchBar autoFocus />
            <div className="mt-4 flex flex-wrap gap-2">
              {POPULAR_QUERIES.slice(0, 5).map((q) => (
                <Link
                  key={q}
                  to="/search"
                  search={{ q, sort: "price", stores: "" }}
                  className="rounded-full bg-bg-elevated px-3 py-1.5 text-sm text-fg-muted shadow-[var(--shadow-border)] transition-colors duration-[var(--motion-quick)] hover:text-fg"
                >
                  {q}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-14">
          <div className="grid gap-3 sm:grid-cols-3">
            <PreviewCard store="أمازون" price={4999} />
            <PreviewCard store="نون" price={5149} muted />
            <PreviewCard store="إيباي" price={4699} best />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-lg font-semibold text-fg">تصفح حسب الفئة</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {CATEGORIES.map((c) => (
              <Link
                key={c.label}
                to="/search"
                search={{ q: c.q, sort: "price", stores: "" }}
                className="rounded-lg bg-bg-elevated px-4 py-5 text-center shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-[var(--motion-fast)] hover:shadow-[var(--shadow-border-hover)] active:scale-[0.96]"
              >
                <span className="block text-sm font-medium text-fg">{c.label}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 pb-16">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-lg font-semibold text-fg">المتاجر المستهدفة</h2>
            <Link to="/stores" className="text-sm text-primary">
              عرض الكل
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {STORE_LIST.map((store) => (
              <div
                key={store.id}
                className="flex items-center gap-3 rounded-lg bg-bg-elevated p-3 shadow-[var(--shadow-border)]"
              >
                <StoreMark id={store.id} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-fg">{store.nameAr}</p>
                  <p className="truncate text-xs text-fg-subtle">{store.category}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="how" className="border-t border-border bg-bg-elevated">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-3">
            <Step
              icon={Search}
              n="١"
              title="ابحث مرة واحدة"
              body="اكتب اسم المنتج بالعربية أو الإنجليزية. نرسل الاستعلام إلى المصادر المتاحة."
            />
            <Step
              icon={GitCompare}
              n="٢"
              title="قارن العروض"
              body="تظهر النتائج بصيغة موحّدة: الاسم، السعر، المتجر، ورابط العرض."
            />
            <Step
              icon={Store}
              n="٣"
              title="اشترِ من الأصل"
              body="عند اختيار عرض ننقلك إلى صفحة المنتج في المتجر الأصلي لإتمام الشراء."
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function PreviewCard({
  store,
  price,
  best,
  muted,
}: {
  store: string;
  price: number;
  best?: boolean;
  muted?: boolean;
}) {
  return (
    <div
      className={`rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)] ${muted ? "opacity-90" : ""}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-fg-muted">{store}</span>
        {best ? (
          <span className="rounded-full bg-good-soft px-2 py-0.5 text-xs font-medium text-good">
            الأقل سعرًا
          </span>
        ) : null}
      </div>
      <p className="mt-6 text-xs text-fg-subtle">آيفون 17 برو 256 جيجا</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums text-fg">{formatSar(price)}</p>
      <p className="mt-4 inline-flex items-center gap-1 text-sm text-primary">
        إلى المتجر
        <ArrowLeft className="size-3.5" />
      </p>
    </div>
  );
}

function Step({
  icon: Icon,
  n,
  title,
  body,
}: {
  icon: typeof Search;
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="inline-flex size-10 items-center justify-center rounded-md bg-bg text-primary shadow-[var(--shadow-border)]">
          <Icon className="size-5" />
        </span>
        <span className="text-sm text-fg-subtle">{n}</span>
      </div>
      <h3 className="mt-4 text-base font-semibold text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{body}</p>
    </div>
  );
}
