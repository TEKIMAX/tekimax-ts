const require_chunk = require('./chunk-C1_xRkKa.cjs');
const require_getBarrelFiles = require('./getBarrelFiles-p2qZTkRB.cjs');
const require_transformers = require('./transformers-Bwrz5_qV.cjs');
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path);
let natural_orderby = require("natural-orderby");
let node_url = require("node:url");
let node_fs = require("node:fs");
let jiti = require("jiti");
jiti = require_chunk.__toESM(jiti);

//#region src/utils/buildJSDoc.ts
/**
* Builds a JSDoc comment block with custom indentation.
* @param comments - Array of comment strings to include in the JSDoc block
* @param options - Configuration options for formatting
* @returns Formatted JSDoc string or fallback string if no comments
*/
function buildJSDoc(comments, options = {}) {
	const { indent = "   * ", suffix = "\n  ", fallback = "  " } = options;
	if (comments.length === 0) return fallback;
	return `/**\n${comments.map((c) => `${indent}${c}`).join("\n")}\n   */${suffix}`;
}

//#endregion
//#region src/utils/Cache.ts
var Cache = class {
	#buffer = /* @__PURE__ */ new Map();
	async get(key) {
		return this.#buffer.get(key) ?? null;
	}
	async set(key, value) {
		this.#buffer.set(key, value);
	}
	async delete(key) {
		this.#buffer.delete(key);
	}
	async clear() {
		this.#buffer.clear();
	}
	async keys() {
		return [...this.#buffer.keys()];
	}
	async values() {
		return [...this.#buffer.values()];
	}
	async flush() {}
};

//#endregion
//#region src/utils/FunctionParams.ts
/**
* @deprecated
*/
var FunctionParams = class FunctionParams {
	#items = [];
	constructor() {
		return this;
	}
	get items() {
		return this.#items.flat();
	}
	add(item) {
		if (!item) return this;
		if (Array.isArray(item)) {
			item.filter(Boolean).forEach((it) => {
				this.#items.push(it);
			});
			return this;
		}
		this.#items.push(item);
		return this;
	}
	static #orderItems(items) {
		return (0, natural_orderby.orderBy)(items.filter(Boolean), [(v) => {
			if (Array.isArray(v)) return;
			return !v.default;
		}, (v) => {
			if (Array.isArray(v)) return;
			return v.required ?? true;
		}], ["desc", "desc"]);
	}
	static #addParams(acc, item) {
		const { enabled = true, name, type, required = true, ...rest } = item;
		if (!enabled) return acc;
		if (!name) {
			acc.push(`${type}${rest.default ? ` = ${rest.default}` : ""}`);
			return acc;
		}
		const parameterName = name.startsWith("{") ? name : require_transformers.camelCase(name);
		if (type) if (required) acc.push(`${parameterName}: ${type}${rest.default ? ` = ${rest.default}` : ""}`);
		else acc.push(`${parameterName}?: ${type}`);
		else acc.push(`${parameterName}`);
		return acc;
	}
	static toObject(items) {
		let type = [];
		let name = [];
		const enabled = items.every((item) => item.enabled) ? items.at(0)?.enabled : true;
		const required = items.every((item) => item.required) ?? true;
		items.forEach((item) => {
			name = FunctionParams.#addParams(name, {
				...item,
				type: void 0
			});
			if (items.some((item$1) => item$1.type)) type = FunctionParams.#addParams(type, item);
		});
		return {
			name: `{ ${name.join(", ")} }`,
			type: type.length ? `{ ${type.join("; ")} }` : void 0,
			enabled,
			required
		};
	}
	toObject() {
		const items = FunctionParams.#orderItems(this.#items).flat();
		return FunctionParams.toObject(items);
	}
	static toString(items) {
		return FunctionParams.#orderItems(items).reduce((acc, item) => {
			if (Array.isArray(item)) {
				if (item.length <= 0) return acc;
				const subItems = FunctionParams.#orderItems(item);
				const objectItem = FunctionParams.toObject(subItems);
				return FunctionParams.#addParams(acc, objectItem);
			}
			return FunctionParams.#addParams(acc, item);
		}, []).join(", ");
	}
	toString() {
		const items = FunctionParams.#orderItems(this.#items);
		return FunctionParams.toString(items);
	}
};

//#endregion
//#region src/utils/getNestedAccessor.ts
/**
* Converts a param path (string with dot notation or array of strings) to a JavaScript accessor expression.
* @param param - The param path, e.g., 'pagination.next.id' or ['pagination', 'next', 'id']
* @param accessor - The base accessor, e.g., 'lastPage' or 'firstPage'
* @returns A JavaScript accessor expression, e.g., "lastPage?.['pagination']?.['next']?.['id']", or undefined if param is empty
*
* @example
* ```ts
* getNestedAccessor('pagination.next.id', 'lastPage')
* // returns: "lastPage?.['pagination']?.['next']?.['id']"
*
* getNestedAccessor(['pagination', 'next', 'id'], 'lastPage')
* // returns: "lastPage?.['pagination']?.['next']?.['id']"
*
* getNestedAccessor('', 'lastPage')
* // returns: undefined
* ```
*/
function getNestedAccessor(param, accessor) {
	const parts = Array.isArray(param) ? param : param.split(".");
	if (parts.length === 0 || parts.length === 1 && parts[0] === "") return;
	return parts.reduce((acc, part) => `${acc}?.['${part}']`, accessor);
}

//#endregion
//#region src/utils/promise.ts
function isPromise(result) {
	return !!result && typeof result?.then === "function";
}
function isPromiseFulfilledResult(result) {
	return result.status === "fulfilled";
}
function isPromiseRejectedResult(result) {
	return result.status === "rejected";
}

//#endregion
//#region src/utils/renderTemplate.ts
function renderTemplate(template, data = void 0) {
	if (!data || !Object.keys(data).length) return template.replace(/{{(.*?)}}/g, "");
	return template.match(/{{(.*?)}}/g)?.reduce((prev, curr) => {
		const index = curr.split(/{{|}}/).filter(Boolean)[0]?.trim();
		if (index === void 0) return prev;
		const value = data[index];
		if (value === void 0) return prev;
		return prev.replace(curr, () => {
			if (typeof value === "boolean") return `${value.toString()}` || "false";
			return value || "";
		}).trim();
	}, template) || "";
}

//#endregion
//#region src/utils/resolveModuleSource.ts
function resolveModuleSource(pkgName) {
	const parentURL = require("url").pathToFileURL(__filename).href;
	const resolved = (0, jiti.default)(parentURL).esmResolve(pkgName, parentURL);
	const filePath = resolved.startsWith("file:") ? (0, node_url.fileURLToPath)(resolved) : resolved;
	return {
		path: filePath,
		source: (0, node_fs.readFileSync)(filePath, { encoding: "utf-8" }),
		ext: node_path.default.extname(filePath)
	};
}

//#endregion
//#region src/utils/timeout.ts
async function timeout(ms) {
	return new Promise((resolve) => {
		const timeout$1 = setTimeout(() => {
			resolve(timeout$1);
		}, ms);
	}).then((timeout$1) => {
		clearTimeout(timeout$1);
		return true;
	});
}

//#endregion
exports.AsyncEventEmitter = require_getBarrelFiles.AsyncEventEmitter;
exports.Cache = Cache;
exports.FunctionParams = FunctionParams;
exports.URLPath = require_getBarrelFiles.URLPath;
exports.buildJSDoc = buildJSDoc;
exports.formatHrtime = require_getBarrelFiles.formatHrtime;
exports.formatMs = require_getBarrelFiles.formatMs;
exports.getBarrelFiles = require_getBarrelFiles.getBarrelFiles;
exports.getElapsedMs = require_getBarrelFiles.getElapsedMs;
exports.getNestedAccessor = getNestedAccessor;
exports.getUniqueName = require_getBarrelFiles.getUniqueName;
exports.isPromise = isPromise;
exports.isPromiseFulfilledResult = isPromiseFulfilledResult;
exports.isPromiseRejectedResult = isPromiseRejectedResult;
exports.renderTemplate = renderTemplate;
exports.resolveModuleSource = resolveModuleSource;
exports.setUniqueName = require_getBarrelFiles.setUniqueName;
exports.timeout = timeout;
//# sourceMappingURL=utils.cjs.map