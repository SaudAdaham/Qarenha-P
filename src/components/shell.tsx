import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-8 items-end justify-center gap-0.5 rounded-md bg-primary px-1.5 py-1.5",
        className,
      )}
      aria-hidden
    >
      <span className="h-2.5 w-1.5 rounded-[2px] bg-primary-fg/70" />
      <span className="h-4 w-1.5 rounded-[2px] bg-primary-fg" />
    </span>
  );
}

export function SiteHeader({ compact }: { compact?: boolean }) {
  return (
    <header className="border-b border-border/80 bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="flex items-center gap-2.5 text-fg no-underline">
          <LogoMark />
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-tight">قارنها</span>
            {!compact ? (
              <span className="text-[11px] text-fg-muted">Qarenha</span>
            ) : null}
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/stores"
            className="rounded-md px-3 py-2 text-fg-muted transition-colors duration-[var(--motion-quick)] hover:bg-bg-subtle hover:text-fg"
          >
            المتاجر
          </Link>
          <Link
            to="/"
            className="hidden rounded-md px-3 py-2 text-fg-muted transition-colors duration-[var(--motion-quick)] hover:bg-bg-subtle hover:text-fg sm:inline"
          >
            كيف نعمل
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-bg-elevated">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-fg-muted sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-medium text-fg">قارنها ليست متجرًا.</p>
          <p className="mt-1 max-w-md leading-relaxed">
            نجمع العروض المتاحة من مصادر البحث المسموحة، ثم نوجهك إلى صفحة المنتج في
            المتجر الأصلي لإتمام الشراء هناك.
          </p>
        </div>
        <p className="text-fg-subtle">ابحث مرة واحدة، وقارن قبل أن تشتري.</p>
      </div>
    </footer>
  );
}
