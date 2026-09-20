import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, ArrowLeft } from "lucide-react";
import { suggestQueries } from "@/lib/search/api";
import { POPULAR_QUERIES } from "@/lib/search/catalog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";

export function SearchBar({
  initial = "",
  size = "lg",
  autoFocus = false,
}: {
  initial?: string;
  size?: "lg" | "md";
  autoFocus?: boolean;
}) {
  const navigate = useNavigate();
  const [value, setValue] = useState(initial);
  const [open, setOpen] = useState(false);
  const [hints, setHints] = useState<string[]>(POPULAR_QUERIES.slice(0, 6));
  const boxRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  useEffect(() => {
    const q = value.trim();
    const t = window.setTimeout(() => {
      void suggestQueries({ data: { query: q } })
        .then((res) => setHints(res.suggestions))
        .catch(() => undefined);
    }, 220);
    return () => window.clearTimeout(t);
  }, [value]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function submit(q: string) {
    const next = q.trim();
    if (next.length < 2) return;
    setOpen(false);
    void navigate({ to: "/search", search: { q: next, sort: "price", stores: "" } });
  }

  return (
    <form
      ref={boxRef}
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault();
        submit(value);
      }}
    >
      <div
        className={cn(
          "flex items-center gap-2 rounded-xl bg-bg-elevated pr-3 pl-2 shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] focus-within:shadow-[var(--shadow-border-hover)]",
          size === "lg" ? "h-14" : "h-12",
        )}
      >
        <Button
          type="submit"
          size="icon"
          className={cn("shrink-0 rounded-lg", size === "lg" ? "size-11" : "size-10")}
          aria-label="بحث"
        >
          <Search className="size-5" />
        </Button>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setOpen(true)}
          autoFocus={autoFocus}
          placeholder="ابحث عن منتج… مثل آيفون 17 برو"
          className="h-full min-w-0 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-fg-subtle"
          dir="rtl"
          name="q"
          autoComplete="off"
        />
      </div>
      {open && hints.length > 0 ? (
        <ul className="absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-lg bg-bg-elevated py-2 shadow-[var(--shadow-border)]">
          {hints.map((hint) => (
            <li key={hint}>
              <button
                type="button"
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-right text-sm text-fg hover:bg-bg-subtle"
                onClick={() => submit(hint)}
              >
                <span>{hint}</span>
                <ArrowLeft className="size-4 text-fg-subtle" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
