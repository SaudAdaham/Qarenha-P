import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as STORE_LIST, r as formatSar } from "./fx-Df4ke-UP.mjs";
import { t as POPULAR_QUERIES } from "./catalog-BdhyGlRJ.mjs";
import { a as Search, c as ArrowLeft, n as Store, o as GitCompare } from "../_libs/lucide-react.mjs";
import { a as SiteHeader, c as StoreMark, i as SiteFooter } from "./offer-ui-CHYWFuSb.mjs";
import { t as SearchBar } from "./search-bar-fqR3njvG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CmX8kr5r.js
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	{
		label: "إلكترونيات",
		q: "آيفون 17 برو"
	},
	{
		label: "عناية",
		q: "سيرافي"
	},
	{
		label: "عطور",
		q: "ديور جادور"
	},
	{
		label: "صحة",
		q: "فيتامين د3"
	},
	{
		label: "أزياء",
		q: "نايك إير فورس"
	},
	{
		label: "منزل",
		q: "دايسون"
	}
];
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto max-w-6xl px-4 pb-12 pt-10 sm:pt-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "stagger-in max-w-2xl",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-primary",
									children: "محرك بحث ومقارنة للمنتجات"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "mt-3 font-display text-4xl font-semibold leading-[1.15] tracking-tight text-fg sm:text-5xl",
									children: [
										"ابحث مرة واحدة،",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"وقارن قبل أن تشتري."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 max-w-xl text-base leading-relaxed text-fg-muted",
									children: "قارنها يجمع العروض من عدة متاجر في شاشة واحدة، ثم يوجهك إلى المتجر الأصلي. لسنا متجرًا، ولا نبيع المنتجات."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 max-w-2xl",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, { autoFocus: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: POPULAR_QUERIES.slice(0, 5).map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/search",
									search: {
										q,
										sort: "price",
										stores: ""
									},
									className: "rounded-full bg-bg-elevated px-3 py-1.5 text-sm text-fg-muted shadow-[var(--shadow-border)] transition-colors duration-[var(--motion-quick)] hover:text-fg",
									children: q
								}, q))
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mx-auto max-w-6xl px-4 pb-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCard, {
									store: "أمازون",
									price: 4999
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCard, {
									store: "نون",
									price: 5149,
									muted: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewCard, {
									store: "إيباي",
									price: 4699,
									best: true
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto max-w-6xl px-4 pb-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold text-fg",
							children: "تصفح حسب الفئة"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6",
							children: CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/search",
								search: {
									q: c.q,
									sort: "price",
									stores: ""
								},
								className: "rounded-lg bg-bg-elevated px-4 py-5 text-center shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-[var(--motion-fast)] hover:shadow-[var(--shadow-border-hover)] active:scale-[0.96]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-medium text-fg",
									children: c.label
								})
							}, c.label))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mx-auto max-w-6xl px-4 pb-16",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-end justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold text-fg",
								children: "المتاجر المستهدفة"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/stores",
								className: "text-sm text-primary",
								children: "عرض الكل"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5",
							children: STORE_LIST.map((store) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 rounded-lg bg-bg-elevated p-3 shadow-[var(--shadow-border)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreMark, { id: store.id }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-sm font-medium text-fg",
										children: store.nameAr
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs text-fg-subtle",
										children: store.category
									})]
								})]
							}, store.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						id: "how",
						className: "border-t border-border bg-bg-elevated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
									icon: Search,
									n: "١",
									title: "ابحث مرة واحدة",
									body: "اكتب اسم المنتج بالعربية أو الإنجليزية. نرسل الاستعلام إلى المصادر المتاحة."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
									icon: GitCompare,
									n: "٢",
									title: "قارن العروض",
									body: "تظهر النتائج بصيغة موحّدة: الاسم، السعر، المتجر، ورابط العرض."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
									icon: Store,
									n: "٣",
									title: "اشترِ من الأصل",
									body: "عند اختيار عرض ننقلك إلى صفحة المنتج في المتجر الأصلي لإتمام الشراء."
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
function PreviewCard({ store, price, best, muted }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)] ${muted ? "opacity-90" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm text-fg-muted",
					children: store
				}), best ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-good-soft px-2 py-0.5 text-xs font-medium text-good",
					children: "الأقل سعرًا"
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-xs text-fg-subtle",
				children: "آيفون 17 برو 256 جيجا"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-2xl font-semibold tabular-nums text-fg",
				children: formatSar(price)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 inline-flex items-center gap-1 text-sm text-primary",
				children: ["إلى المتجر", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" })]
			})
		]
	});
}
function Step({ icon: Icon, n, title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "inline-flex size-10 items-center justify-center rounded-md bg-bg text-primary shadow-[var(--shadow-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm text-fg-subtle",
				children: n
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "mt-4 text-base font-semibold text-fg",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm leading-relaxed text-fg-muted",
			children: body
		})
	] });
}
//#endregion
export { Home as component };
