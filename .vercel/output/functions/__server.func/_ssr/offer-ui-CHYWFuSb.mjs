import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { i as isStoreId, r as formatSar, t as STORES } from "./fx-Df4ke-UP.mjs";
import { r as Star, s as ArrowUpLeft } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/offer-ui-CHYWFuSb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function LogoMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex size-8 items-end justify-center gap-0.5 rounded-md bg-primary px-1.5 py-1.5", className),
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2.5 w-1.5 rounded-[2px] bg-primary-fg/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-1.5 rounded-[2px] bg-primary-fg" })]
	});
}
function SiteHeader({ compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "border-b border-border/80 bg-bg/90 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/",
				className: "flex items-center gap-2.5 text-fg no-underline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "flex flex-col leading-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-semibold tracking-tight",
						children: "قارنها"
					}), !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[11px] text-fg-muted",
						children: "Qarenha"
					}) : null]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-1 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/stores",
					className: "rounded-md px-3 py-2 text-fg-muted transition-colors duration-[var(--motion-quick)] hover:bg-bg-subtle hover:text-fg",
					children: "المتاجر"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "hidden rounded-md px-3 py-2 text-fg-muted transition-colors duration-[var(--motion-quick)] hover:bg-bg-subtle hover:text-fg sm:inline",
					children: "كيف نعمل"
				})]
			})]
		})
	});
}
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-auto border-t border-border bg-bg-elevated",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-fg-muted sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-fg",
				children: "قارنها ليست متجرًا."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-md leading-relaxed",
				children: "نجمع العروض المتاحة من مصادر البحث المسموحة، ثم نوجهك إلى صفحة المنتج في المتجر الأصلي لإتمام الشراء هناك."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-fg-subtle",
				children: "ابحث مرة واحدة، وقارن قبل أن تشتري."
			})]
		})
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function parseSearchInput(input) {
	const d = input ?? {};
	return {
		query: String(d.query ?? "").trim().slice(0, 120),
		stores: Array.isArray(d.stores) ? d.stores.map(String).filter(isStoreId) : void 0,
		sort: d.sort === "price" || d.sort === "price-desc" || d.sort === "store" ? d.sort : "price"
	};
}
var searchProducts = createServerFn({ method: "POST" }).validator((input) => parseSearchInput(input)).handler(createSsrRpc("98cab733c846522b7523096d98c99bfe33700d7a9cf12efdb768a5c68ad01f0b"));
var suggestQueries = createServerFn({ method: "POST" }).validator((input) => {
	return { query: String(input?.query ?? "").trim().slice(0, 80) };
}).handler(createSsrRpc("22a4967de31c4d047054f1c64511fc76908955d0e09f584e158e44d22b009347"));
var getStoreStatus = createServerFn({ method: "POST" }).handler(createSsrRpc("c45bb8b44c4fb9450ce38443e411efb4e3f3de3bfc00fe49956a04af3c969f2d"));
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[background-color,color,box-shadow,transform,opacity] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-fg hover:bg-primary-hover",
			outline: "bg-bg-elevated text-fg shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
			ghost: "bg-transparent text-fg hover:bg-bg-subtle",
			link: "bg-transparent text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 px-3 text-xs",
			lg: "h-12 px-5 text-base",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, type = "button", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Badge({ className, tone = "neutral", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", tone === "neutral" && "bg-bg-subtle text-fg-muted", tone === "accent" && "bg-primary text-primary-fg", tone === "good" && "bg-good-soft text-good", tone === "warn" && "bg-warn-soft text-warn", className),
		...props
	});
}
function Skeleton({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("animate-pulse rounded-md bg-bg-subtle", className),
		...props
	});
}
function StoreMark({ id, className }) {
	const store = STORES[id];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex size-8 shrink-0 items-center justify-center rounded-sm bg-bg-subtle text-[11px] font-semibold text-fg", className),
		children: store.letter
	});
}
function ProductImage({ src, alt }) {
	const [failed, setFailed] = (0, import_react.useState)(false);
	if (!src || failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex size-full items-center justify-center bg-bg-subtle",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-10 rounded-md bg-primary/15" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt,
		className: "size-full object-cover outline outline-1 -outline-offset-1 outline-fg/10",
		onError: () => setFailed(true)
	});
}
function ProductGroupCard({ group }) {
	const priced = group.offers.filter((o) => o.priceSar != null);
	const saving = priced.length >= 2 ? Math.max(...priced.map((o) => o.priceSar)) - Math.min(...priced.map((o) => o.priceSar)) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "overflow-hidden rounded-xl bg-bg-elevated shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-4 p-4 sm:p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-24 shrink-0 overflow-hidden rounded-md bg-bg-subtle sm:size-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductImage, {
					src: group.image,
					alt: group.titleAr
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium text-fg-muted",
						children: group.brand || "منتج"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 text-lg font-semibold leading-snug text-fg",
						children: group.titleAr
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 hidden text-sm text-fg-subtle sm:block",
						children: group.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-2",
						children: [
							group.bestPriceSar != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xl font-semibold tabular-nums text-primary",
								children: formatSar(group.bestPriceSar)
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-fg-muted",
								children: "السعر يظهر في المتجر"
							}),
							group.bestStoreId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
								tone: "good",
								children: ["الأرخص: ", STORES[group.bestStoreId].nameAr]
							}) : null,
							saving > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: ["توفير حتى ", formatSar(saving)] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-fg-subtle",
								children: [group.offers.length, " عروض"]
							})
						]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3",
			children: group.offers.map((offer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfferRow, {
				offer,
				best: offer.storeId === group.bestStoreId
			}, offer.id))
		})]
	});
}
function OfferRow({ offer, best }) {
	const store = STORES[offer.storeId];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: offer.url,
		target: "_blank",
		rel: "noreferrer noopener",
		className: "flex items-center gap-3 bg-bg-elevated px-4 py-3 transition-colors duration-[var(--motion-quick)] hover:bg-bg-subtle",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreMark, { id: offer.storeId }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-sm font-medium text-fg",
					children: store.nameAr
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-fg-subtle",
					children: store.nameEn
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-left",
				children: [offer.priceSar != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("text-sm font-semibold tabular-nums", best ? "text-primary" : "text-fg"),
					children: formatSar(offer.priceSar)
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-fg-muted",
					children: "شاهد السعر"
				}), offer.rating ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-0.5 flex items-center justify-end gap-1 text-[11px] text-fg-subtle",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums",
						children: offer.rating.toFixed(1)
					})]
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpLeft, { className: "size-4 shrink-0 text-fg-subtle" })
		]
	});
}
function StoreJumpStrip({ query }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-sm font-medium text-fg",
			children: "افتح البحث مباشرة في المتجر"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex gap-2 overflow-x-auto pb-1",
			children: Object.values(STORES).map((store) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: store.searchUrl(query),
				target: "_blank",
				rel: "noreferrer noopener",
				className: "flex shrink-0 items-center gap-2 rounded-md bg-bg px-3 py-2 text-sm text-fg shadow-[var(--shadow-border)] transition-colors duration-[var(--motion-quick)] hover:bg-bg-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreMark, {
					id: store.id,
					className: "size-6 text-[10px]"
				}), store.nameAr]
			}, store.id))
		})]
	});
}
//#endregion
export { SiteHeader as a, StoreMark as c, searchProducts as d, suggestQueries as f, SiteFooter as i, cn as l, Button as n, Skeleton as o, ProductGroupCard as r, StoreJumpStrip as s, Badge as t, getStoreStatus as u };
