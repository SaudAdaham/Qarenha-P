import { i as __toESM } from "../_runtime.mjs";
import { i as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as POPULAR_QUERIES } from "./catalog-BdhyGlRJ.mjs";
import { a as Search, c as ArrowLeft } from "../_libs/lucide-react.mjs";
import { f as suggestQueries, l as cn, n as Button } from "./offer-ui-CHYWFuSb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-bar-fqR3njvG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchBar({ initial = "", size = "lg", autoFocus = false }) {
	const navigate = useNavigate();
	const [value, setValue] = (0, import_react.useState)(initial);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [hints, setHints] = (0, import_react.useState)(POPULAR_QUERIES.slice(0, 6));
	const boxRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		setValue(initial);
	}, [initial]);
	(0, import_react.useEffect)(() => {
		const q = value.trim();
		const t = window.setTimeout(() => {
			suggestQueries({ data: { query: q } }).then((res) => setHints(res.suggestions)).catch(() => void 0);
		}, 220);
		return () => window.clearTimeout(t);
	}, [value]);
	(0, import_react.useEffect)(() => {
		function onDoc(e) {
			if (!boxRef.current?.contains(e.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);
	function submit(q) {
		const next = q.trim();
		if (next.length < 2) return;
		setOpen(false);
		navigate({
			to: "/search",
			search: {
				q: next,
				sort: "price",
				stores: ""
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		ref: boxRef,
		className: "relative w-full",
		onSubmit: (e) => {
			e.preventDefault();
			submit(value);
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: cn("flex items-center gap-2 rounded-xl bg-bg-elevated pr-3 pl-2 shadow-[var(--shadow-border)] transition-[box-shadow] duration-[var(--motion-quick)] focus-within:shadow-[var(--shadow-border-hover)]", size === "lg" ? "h-14" : "h-12"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				size: "icon",
				className: cn("shrink-0 rounded-lg", size === "lg" ? "size-11" : "size-10"),
				"aria-label": "بحث",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value,
				onChange: (e) => setValue(e.target.value),
				onFocus: () => setOpen(true),
				autoFocus,
				placeholder: "ابحث عن منتج… مثل آيفون 17 برو",
				className: "h-full min-w-0 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-fg-subtle",
				dir: "rtl",
				name: "q",
				autoComplete: "off"
			})]
		}), open && hints.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "absolute inset-x-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-lg bg-bg-elevated py-2 shadow-[var(--shadow-border)]",
			children: hints.map((hint) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "flex w-full items-center justify-between gap-3 px-4 py-2.5 text-right text-sm text-fg hover:bg-bg-subtle",
				onClick: () => submit(hint),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: hint }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4 text-fg-subtle" })]
			}) }, hint))
		}) : null]
	});
}
//#endregion
export { SearchBar as t };
