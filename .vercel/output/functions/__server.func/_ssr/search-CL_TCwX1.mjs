import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as isStoreId, n as STORE_LIST } from "./fx-Df4ke-UP.mjs";
import { i as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { n as Route$1 } from "./router-BJ30Rwp6.mjs";
import { a as SiteHeader, c as StoreMark, d as searchProducts, i as SiteFooter, n as Button, o as Skeleton, r as ProductGroupCard, s as StoreJumpStrip, t as Badge } from "./offer-ui-CHYWFuSb.mjs";
import { t as SearchBar } from "./search-bar-fqR3njvG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-CL_TCwX1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function parseStores(raw) {
	return raw.split(",").map((s) => s.trim()).filter(isStoreId);
}
function SearchPage() {
	const { q, sort, stores: storesRaw } = Route$1.useSearch();
	const navigate = Route$1.useNavigate();
	const selected = (0, import_react.useMemo)(() => parseStores(storesRaw), [storesRaw]);
	const [mobileFilters, setMobileFilters] = (0, import_react.useState)(false);
	const query = useQuery({
		queryKey: [
			"search",
			q,
			sort,
			storesRaw
		],
		enabled: q.trim().length >= 2,
		queryFn: () => searchProducts({ data: {
			query: q,
			sort,
			stores: selected.length ? selected : void 0
		} })
	});
	function setSort(next) {
		navigate({ search: (prev) => ({
			q: prev.q ?? "",
			sort: next,
			stores: prev.stores ?? ""
		}) });
	}
	function toggleStore(id) {
		const next = selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id];
		navigate({ search: (prev) => ({
			q: prev.q ?? "",
			sort: prev.sort ?? "price",
			stores: next.join(",")
		}) });
	}
	const data = query.data;
	const groups = data?.groups ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, { compact: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-b border-border bg-bg-elevated",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-6xl px-4 py-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {
						initial: q,
						size: "md"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto flex w-full max-w-6xl flex-1 flex-col gap-5 px-4 py-6 lg:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden w-56 shrink-0 lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filters, {
						selected,
						onToggle: toggleStore
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-lg font-semibold text-fg",
								children: q.trim() ? `نتائج «${q}»` : "ابحث عن منتج"
							}), data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-fg-muted",
								children: [
									data.offers.length,
									" عرضًا في ",
									groups.length,
									" منتج · ",
									data.tookMs,
									"ms",
									data.liveSources.length > 0 ? ` · مباشر من ${data.liveSources.join("، ")}` : ""
								]
							}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "lg:hidden",
									onClick: () => setMobileFilters((v) => !v),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }), "المتاجر"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortPills, {
									sort,
									onChange: setSort
								})]
							})]
						}),
						mobileFilters ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "lg:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Filters, {
								selected,
								onToggle: toggleStore
							})
						}) : null,
						q.trim().length >= 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreJumpStrip, { query: q }) : null,
						data?.usedIndex && data.liveSources.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-lg bg-warn-soft px-4 py-3 text-sm text-warn",
							children: "الأسعار الحالية من فهرس المقارنة التوضيحي وروابط المتاجر الرسمية. عند تفعيل مفاتيح Amazon.sa أو eBay تُستبدل تلقائيًا بالأسعار المباشرة من واجهاتهم."
						}) : null,
						query.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultsSkeleton, {}) : null,
						query.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-lg bg-bg-elevated px-4 py-6 text-sm text-danger shadow-[var(--shadow-border)]",
							children: "تعذر إكمال البحث. جرّب مرة أخرى بعد لحظات."
						}) : null,
						!query.isLoading && q.trim().length >= 2 && groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-bg-elevated px-5 py-10 text-center shadow-[var(--shadow-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium text-fg",
									children: "لا توجد عروض مطابقة"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-fg-muted",
									children: "جرّب عبارة أقصر، أو افتح البحث في المتاجر أعلاه."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "mt-4 inline-block text-sm text-primary",
									children: "العودة للبداية"
								})
							]
						}) : null,
						q.trim().length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg-muted",
							children: "أدخل حرفين على الأقل للبحث."
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGroupCard, { group }, group.key))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function SortPills({ sort, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex rounded-md bg-bg-subtle p-1",
		children: [
			{
				id: "price",
				label: "الأرخص"
			},
			{
				id: "price-desc",
				label: "الأعلى"
			},
			{
				id: "store",
				label: "المتجر"
			}
		].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(item.id),
			className: `h-9 rounded-sm px-3 text-xs font-medium transition-colors duration-[var(--motion-quick)] ${sort === item.id ? "bg-bg-elevated text-fg shadow-[var(--shadow-border)]" : "text-fg-muted"}`,
			children: item.label
		}, item.id))
	});
}
function Filters({ selected, onToggle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-fg",
				children: "تصفية المتاجر"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1",
				children: STORE_LIST.map((store) => {
					const on = selected.length === 0 || selected.includes(store.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onToggle(store.id),
						className: `flex w-full items-center gap-2 rounded-md px-2 py-2 text-right text-sm transition-colors duration-[var(--motion-quick)] ${on ? "bg-bg-subtle text-fg" : "text-fg-subtle"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreMark, {
								id: store.id,
								className: "size-6 text-[10px]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex-1 truncate",
								children: store.nameAr
							}),
							store.connector !== "index" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: store.connector === "amazon" ? "accent" : "neutral",
								children: "API"
							}) : null
						]
					}) }, store.id);
				})
			}),
			selected.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/search",
				search: (prev) => ({
					q: prev.q ?? "",
					sort: prev.sort ?? "price",
					stores: ""
				}),
				className: "mt-3 inline-block text-xs text-primary",
				children: "مسح التصفية"
			}) : null
		]
	});
}
function ResultsSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-xl bg-bg-elevated p-5 shadow-[var(--shadow-border)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "size-24 rounded-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-4 w-24" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-6 w-2/3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "price-shimmer h-5 w-32" })
					]
				})]
			})
		}, i))
	});
}
//#endregion
export { SearchPage as component };
