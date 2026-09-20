import { r as require_jsx_runtime, t as useQuery } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as STORE_LIST } from "./fx-Df4ke-UP.mjs";
import { a as SiteHeader, c as StoreMark, i as SiteFooter, t as Badge, u as getStoreStatus } from "./offer-ui-CHYWFuSb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stores-LttUsrs4.js
var import_jsx_runtime = require_jsx_runtime();
function StoresPage() {
	const status = useQuery({
		queryKey: ["store-status"],
		queryFn: () => getStoreStatus()
	});
	const map = new Map((status.data ?? []).map((s) => [s.id, s]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto w-full max-w-6xl flex-1 px-4 py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: "المصادر"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 text-3xl font-semibold tracking-tight text-fg",
						children: "المتاجر المرتبطة"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm leading-relaxed text-fg-muted",
						children: "لكل متجر موصل مستقل. البحث يمر عبر الخادم فقط، ولا تُرسل مفاتيح الوصول إلى المتصفح. أمازون السعودية وإيباي جاهزان للربط عبر الواجهات الرسمية عند توفير المفاتيح في بيئة الخادم."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
						children: STORE_LIST.map((store) => {
							const s = map.get(store.id);
							const live = s?.live ?? false;
							const ready = s?.ready ?? store.connector !== "index";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "flex items-start gap-3 rounded-xl bg-bg-elevated p-4 shadow-[var(--shadow-border)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreMark, {
									id: store.id,
									className: "size-11 text-sm"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
												className: "truncate font-medium text-fg",
												children: store.nameAr
											}), live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "good",
												children: "مباشر"
											}) : ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
												tone: "warn",
												children: "جاهز للربط"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "فهرس المقارنة" })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 text-xs text-fg-subtle",
											children: [
												store.nameEn,
												" · ",
												store.domain
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-2 text-sm text-fg-muted",
											children: store.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/search",
											search: {
												q: store.nameAr,
												sort: "price",
												stores: store.id
											},
											className: "mt-3 inline-block text-sm text-primary",
											children: "تصفح عروض هذا المتجر"
										})
									]
								})]
							}, store.id);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { StoresPage as component };
