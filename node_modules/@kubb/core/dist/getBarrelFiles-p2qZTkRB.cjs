const require_chunk = require('./chunk-C1_xRkKa.cjs');
const require_fs = require('./fs-CIFBtIYA.cjs');
const require_transformers = require('./transformers-Bwrz5_qV.cjs');
let node_path = require("node:path");
node_path = require_chunk.__toESM(node_path);
let node_perf_hooks = require("node:perf_hooks");
let node_events = require("node:events");

//#region src/errors.ts
var ValidationPluginError = class extends Error {};
var BuildError = class extends Error {
	cause;
	errors;
	constructor(message, options) {
		super(message, { cause: options.cause });
		this.name = "BuildError";
		this.cause = options.cause;
		this.errors = options.errors;
	}
};

//#endregion
//#region ../../node_modules/.pnpm/yocto-queue@1.2.2/node_modules/yocto-queue/index.js
var Node = class {
	value;
	next;
	constructor(value) {
		this.value = value;
	}
};
var Queue = class {
	#head;
	#tail;
	#size;
	constructor() {
		this.clear();
	}
	enqueue(value) {
		const node = new Node(value);
		if (this.#head) {
			this.#tail.next = node;
			this.#tail = node;
		} else {
			this.#head = node;
			this.#tail = node;
		}
		this.#size++;
	}
	dequeue() {
		const current = this.#head;
		if (!current) return;
		this.#head = this.#head.next;
		this.#size--;
		if (!this.#head) this.#tail = void 0;
		return current.value;
	}
	peek() {
		if (!this.#head) return;
		return this.#head.value;
	}
	clear() {
		this.#head = void 0;
		this.#tail = void 0;
		this.#size = 0;
	}
	get size() {
		return this.#size;
	}
	*[Symbol.iterator]() {
		let current = this.#head;
		while (current) {
			yield current.value;
			current = current.next;
		}
	}
	*drain() {
		while (this.#head) yield this.dequeue();
	}
};

//#endregion
//#region ../../node_modules/.pnpm/p-limit@7.2.0/node_modules/p-limit/index.js
function pLimit(concurrency) {
	validateConcurrency(concurrency);
	const queue = new Queue();
	let activeCount = 0;
	const resumeNext = () => {
		if (activeCount < concurrency && queue.size > 0) {
			activeCount++;
			queue.dequeue()();
		}
	};
	const next = () => {
		activeCount--;
		resumeNext();
	};
	const run = async (function_, resolve, arguments_) => {
		const result = (async () => function_(...arguments_))();
		resolve(result);
		try {
			await result;
		} catch {}
		next();
	};
	const enqueue = (function_, resolve, arguments_) => {
		new Promise((internalResolve) => {
			queue.enqueue(internalResolve);
		}).then(run.bind(void 0, function_, resolve, arguments_));
		if (activeCount < concurrency) resumeNext();
	};
	const generator = (function_, ...arguments_) => new Promise((resolve) => {
		enqueue(function_, resolve, arguments_);
	});
	Object.defineProperties(generator, {
		activeCount: { get: () => activeCount },
		pendingCount: { get: () => queue.size },
		clearQueue: { value() {
			queue.clear();
		} },
		concurrency: {
			get: () => concurrency,
			set(newConcurrency) {
				validateConcurrency(newConcurrency);
				concurrency = newConcurrency;
				queueMicrotask(() => {
					while (activeCount < concurrency && queue.size > 0) resumeNext();
				});
			}
		},
		map: { async value(iterable, function_) {
			const promises = Array.from(iterable, (value, index) => this(function_, value, index));
			return Promise.all(promises);
		} }
	});
	return generator;
}
function validateConcurrency(concurrency) {
	if (!((Number.isInteger(concurrency) || concurrency === Number.POSITIVE_INFINITY) && concurrency > 0)) throw new TypeError("Expected `concurrency` to be a number from 1 and up");
}

//#endregion
//#region src/utils/executeStrategies.ts
/**
* Chains promises
*/
function hookSeq(promises) {
	return promises.filter(Boolean).reduce((promise, func) => {
		if (typeof func !== "function") throw new Error("HookSeq needs a function that returns a promise `() => Promise<unknown>`");
		return promise.then((state) => {
			const calledFunc = func(state);
			if (calledFunc) return calledFunc.then(Array.prototype.concat.bind(state));
		});
	}, Promise.resolve([]));
}
/**
* Chains promises, first non-null result stops and returns
*/
function hookFirst(promises, nullCheck = (state) => state !== null) {
	let promise = Promise.resolve(null);
	for (const func of promises.filter(Boolean)) promise = promise.then((state) => {
		if (nullCheck(state)) return state;
		return func(state);
	});
	return promise;
}
/**
* Runs an array of promise functions with optional concurrency limit.
*/
function hookParallel(promises, concurrency = Number.POSITIVE_INFINITY) {
	const limit = pLimit(concurrency);
	const tasks = promises.filter(Boolean).map((promise) => limit(() => promise()));
	return Promise.allSettled(tasks);
}

//#endregion
//#region src/PromiseManager.ts
var PromiseManager = class {
	#options = {};
	constructor(options = {}) {
		this.#options = options;
		return this;
	}
	run(strategy, promises, { concurrency = Number.POSITIVE_INFINITY } = {}) {
		if (strategy === "seq") return hookSeq(promises);
		if (strategy === "first") return hookFirst(promises, this.#options.nullCheck);
		if (strategy === "parallel") return hookParallel(promises, concurrency);
		throw new Error(`${strategy} not implemented`);
	}
};
function isPromiseRejectedResult(result) {
	return result.status === "rejected";
}

//#endregion
//#region src/utils/uniqueName.ts
function getUniqueName(originalName, data) {
	let used = data[originalName] || 0;
	if (used) {
		data[originalName] = ++used;
		originalName += used;
	}
	data[originalName] = 1;
	return originalName;
}
function setUniqueName(originalName, data) {
	let used = data[originalName] || 0;
	if (used) {
		data[originalName] = ++used;
		return originalName;
	}
	data[originalName] = 1;
	return originalName;
}

//#endregion
//#region src/PluginManager.ts
function getMode(fileOrFolder) {
	if (!fileOrFolder) return "split";
	return node_path.default.extname(fileOrFolder) ? "single" : "split";
}
var PluginManager = class {
	config;
	options;
	#plugins = /* @__PURE__ */ new Set();
	#usedPluginNames = {};
	#promiseManager;
	constructor(config, options) {
		this.config = config;
		this.options = options;
		this.#promiseManager = new PromiseManager({ nullCheck: (state) => !!state?.result });
		[...config.plugins || []].forEach((plugin) => {
			const parsedPlugin = this.#parse(plugin);
			this.#plugins.add(parsedPlugin);
		});
		return this;
	}
	get events() {
		return this.options.events;
	}
	getContext(plugin) {
		const plugins = [...this.#plugins];
		const baseContext = {
			fabric: this.options.fabric,
			config: this.config,
			plugin,
			events: this.options.events,
			pluginManager: this,
			mode: getMode(node_path.default.resolve(this.config.root, this.config.output.path)),
			addFile: async (...files) => {
				await this.options.fabric.addFile(...files);
			},
			upsertFile: async (...files) => {
				await this.options.fabric.upsertFile(...files);
			}
		};
		const mergedExtras = {};
		for (const p of plugins) if (typeof p.inject === "function") {
			const result = p.inject.bind(baseContext)(baseContext);
			if (result && typeof result === "object") Object.assign(mergedExtras, result);
		}
		return {
			...baseContext,
			...mergedExtras
		};
	}
	get plugins() {
		return this.#getSortedPlugins();
	}
	getFile({ name, mode, extname, pluginKey, options }) {
		const baseName = `${name}${extname}`;
		const path$1 = this.resolvePath({
			baseName,
			mode,
			pluginKey,
			options
		});
		if (!path$1) throw new Error(`Filepath should be defined for resolvedName "${name}" and pluginKey [${JSON.stringify(pluginKey)}]`);
		return {
			path: path$1,
			baseName,
			meta: { pluginKey },
			sources: [],
			imports: [],
			exports: []
		};
	}
	resolvePath = (params) => {
		const root = node_path.default.resolve(this.config.root, this.config.output.path);
		const defaultPath = node_path.default.resolve(root, params.baseName);
		if (params.pluginKey) return this.hookForPluginSync({
			pluginKey: params.pluginKey,
			hookName: "resolvePath",
			parameters: [
				params.baseName,
				params.mode,
				params.options
			]
		})?.at(0) || defaultPath;
		return this.hookFirstSync({
			hookName: "resolvePath",
			parameters: [
				params.baseName,
				params.mode,
				params.options
			]
		})?.result || defaultPath;
	};
	resolveName = (params) => {
		if (params.pluginKey) {
			const names = this.hookForPluginSync({
				pluginKey: params.pluginKey,
				hookName: "resolveName",
				parameters: [require_transformers.trim(params.name), params.type]
			});
			return require_transformers.transformReservedWord([...new Set(names)].at(0) || params.name);
		}
		const name = this.hookFirstSync({
			hookName: "resolveName",
			parameters: [require_transformers.trim(params.name), params.type]
		}).result;
		return require_transformers.transformReservedWord(name);
	};
	/**
	* Run a specific hookName for plugin x.
	*/
	async hookForPlugin({ pluginKey, hookName, parameters }) {
		const plugins = this.getPluginsByKey(hookName, pluginKey);
		this.events.emit("plugins:hook:progress:start", {
			hookName,
			plugins
		});
		const items = [];
		for (const plugin of plugins) {
			const result = await this.#execute({
				strategy: "hookFirst",
				hookName,
				parameters,
				plugin
			});
			if (result !== void 0 && result !== null) items.push(result);
		}
		this.events.emit("plugins:hook:progress:end", { hookName });
		return items;
	}
	/**
	* Run a specific hookName for plugin x.
	*/
	hookForPluginSync({ pluginKey, hookName, parameters }) {
		return this.getPluginsByKey(hookName, pluginKey).map((plugin) => {
			return this.#executeSync({
				strategy: "hookFirst",
				hookName,
				parameters,
				plugin
			});
		}).filter(Boolean);
	}
	/**
	* Returns the first non-null result.
	*/
	async hookFirst({ hookName, parameters, skipped }) {
		const plugins = this.#getSortedPlugins(hookName).filter((plugin) => {
			return skipped ? skipped.has(plugin) : true;
		});
		this.events.emit("plugins:hook:progress:start", {
			hookName,
			plugins
		});
		const promises = plugins.map((plugin) => {
			return async () => {
				const value = await this.#execute({
					strategy: "hookFirst",
					hookName,
					parameters,
					plugin
				});
				return Promise.resolve({
					plugin,
					result: value
				});
			};
		});
		const result = await this.#promiseManager.run("first", promises);
		this.events.emit("plugins:hook:progress:end", { hookName });
		return result;
	}
	/**
	* Returns the first non-null result.
	*/
	hookFirstSync({ hookName, parameters, skipped }) {
		let parseResult = null;
		const plugins = this.#getSortedPlugins(hookName).filter((plugin) => {
			return skipped ? skipped.has(plugin) : true;
		});
		for (const plugin of plugins) {
			parseResult = {
				result: this.#executeSync({
					strategy: "hookFirst",
					hookName,
					parameters,
					plugin
				}),
				plugin
			};
			if (parseResult?.result != null) break;
		}
		return parseResult;
	}
	/**
	* Runs all plugins in parallel based on `this.plugin` order and `pre`/`post` settings.
	*/
	async hookParallel({ hookName, parameters }) {
		const plugins = this.#getSortedPlugins(hookName);
		this.events.emit("plugins:hook:progress:start", {
			hookName,
			plugins
		});
		const promises = plugins.map((plugin) => {
			return () => this.#execute({
				strategy: "hookParallel",
				hookName,
				parameters,
				plugin
			});
		});
		const results = await this.#promiseManager.run("parallel", promises, { concurrency: this.options.concurrency });
		results.forEach((result, index) => {
			if (isPromiseRejectedResult(result)) {
				const plugin = this.#getSortedPlugins(hookName)[index];
				if (plugin) this.events.emit("error", result.reason, {
					plugin,
					hookName,
					strategy: "hookParallel",
					duration: 0,
					parameters
				});
			}
		});
		this.events.emit("plugins:hook:progress:end", { hookName });
		return results.reduce((acc, result) => {
			if (result.status === "fulfilled") acc.push(result.value);
			return acc;
		}, []);
	}
	/**
	* Chains plugins
	*/
	async hookSeq({ hookName, parameters }) {
		const plugins = this.#getSortedPlugins(hookName);
		this.events.emit("plugins:hook:progress:start", {
			hookName,
			plugins
		});
		const promises = plugins.map((plugin) => {
			return () => this.#execute({
				strategy: "hookSeq",
				hookName,
				parameters,
				plugin
			});
		});
		await this.#promiseManager.run("seq", promises);
		this.events.emit("plugins:hook:progress:end", { hookName });
	}
	#getSortedPlugins(hookName) {
		const plugins = [...this.#plugins];
		if (hookName) return plugins.filter((plugin) => hookName in plugin);
		return plugins.map((plugin) => {
			if (plugin.pre) {
				const missingPlugins = plugin.pre.filter((pluginName) => !plugins.find((pluginToFind) => pluginToFind.name === pluginName));
				if (missingPlugins.length > 0) throw new ValidationPluginError(`The plugin '${plugin.name}' has a pre set that references missing plugins for '${missingPlugins.join(", ")}'`);
			}
			return plugin;
		}).sort((a, b) => {
			if (b.pre?.includes(a.name)) return 1;
			if (b.post?.includes(a.name)) return -1;
			return 0;
		});
	}
	getPluginByKey(pluginKey) {
		const plugins = [...this.#plugins];
		const [searchPluginName] = pluginKey;
		return plugins.find((item) => {
			const [name] = item.key;
			return name === searchPluginName;
		});
	}
	getPluginsByKey(hookName, pluginKey) {
		const plugins = [...this.plugins];
		const [searchPluginName, searchIdentifier] = pluginKey;
		const pluginByPluginName = plugins.filter((plugin) => hookName in plugin).filter((item) => {
			const [name, identifier] = item.key;
			const identifierCheck = identifier?.toString() === searchIdentifier?.toString();
			const nameCheck = name === searchPluginName;
			if (searchIdentifier) return identifierCheck && nameCheck;
			return nameCheck;
		});
		if (!pluginByPluginName?.length) {
			const corePlugin = plugins.find((plugin) => plugin.name === "core" && hookName in plugin);
			return corePlugin ? [corePlugin] : [];
		}
		return pluginByPluginName;
	}
	/**
	* Run an async plugin hook and return the result.
	* @param hookName Name of the plugin hook. Must be either in `PluginHooks` or `OutputPluginValueHooks`.
	* @param args Arguments passed to the plugin hook.
	* @param plugin The actual pluginObject to run.
	*/
	#execute({ strategy, hookName, parameters, plugin }) {
		const hook = plugin[hookName];
		let output;
		if (!hook) return null;
		this.events.emit("plugins:hook:processing:start", {
			strategy,
			hookName,
			parameters,
			plugin
		});
		const startTime = node_perf_hooks.performance.now();
		return (async () => {
			try {
				if (typeof hook === "function") {
					const context = this.getContext(plugin);
					const result = await Promise.resolve(hook.apply(context, parameters));
					output = result;
					this.events.emit("plugins:hook:processing:end", {
						duration: Math.round(node_perf_hooks.performance.now() - startTime),
						parameters,
						output,
						strategy,
						hookName,
						plugin
					});
					return result;
				}
				output = hook;
				this.events.emit("plugins:hook:processing:end", {
					duration: Math.round(node_perf_hooks.performance.now() - startTime),
					parameters,
					output,
					strategy,
					hookName,
					plugin
				});
				return hook;
			} catch (error) {
				this.events.emit("error", error, {
					plugin,
					hookName,
					strategy,
					duration: Math.round(node_perf_hooks.performance.now() - startTime)
				});
				return null;
			}
		})();
	}
	/**
	* Run a sync plugin hook and return the result.
	* @param hookName Name of the plugin hook. Must be in `PluginHooks`.
	* @param args Arguments passed to the plugin hook.
	* @param plugin The actual plugin
	* @param replaceContext When passed, the plugin context can be overridden.
	*/
	#executeSync({ strategy, hookName, parameters, plugin }) {
		const hook = plugin[hookName];
		let output;
		if (!hook) return null;
		this.events.emit("plugins:hook:processing:start", {
			strategy,
			hookName,
			parameters,
			plugin
		});
		const startTime = node_perf_hooks.performance.now();
		try {
			if (typeof hook === "function") {
				const context = this.getContext(plugin);
				const fn = hook.apply(context, parameters);
				output = fn;
				this.events.emit("plugins:hook:processing:end", {
					duration: Math.round(node_perf_hooks.performance.now() - startTime),
					parameters,
					output,
					strategy,
					hookName,
					plugin
				});
				return fn;
			}
			output = hook;
			this.events.emit("plugins:hook:processing:end", {
				duration: Math.round(node_perf_hooks.performance.now() - startTime),
				parameters,
				output,
				strategy,
				hookName,
				plugin
			});
			return hook;
		} catch (error) {
			this.events.emit("error", error, {
				plugin,
				hookName,
				strategy,
				duration: Math.round(node_perf_hooks.performance.now() - startTime)
			});
			return null;
		}
	}
	#parse(plugin) {
		const usedPluginNames = this.#usedPluginNames;
		setUniqueName(plugin.name, usedPluginNames);
		return {
			install() {},
			...plugin,
			key: [plugin.name, usedPluginNames[plugin.name]].filter(Boolean)
		};
	}
};

//#endregion
//#region src/utils/AsyncEventEmitter.ts
var AsyncEventEmitter = class {
	constructor(maxListener = 100) {
		this.#emitter.setMaxListeners(maxListener);
	}
	#emitter = new node_events.EventEmitter();
	async emit(eventName, ...eventArgs) {
		const listeners = this.#emitter.listeners(eventName);
		if (listeners.length === 0) return;
		await Promise.all(listeners.map(async (listener) => {
			try {
				return await listener(...eventArgs);
			} catch (err) {
				const causedError = err;
				throw new Error(`Error in async listener for "${eventName}" with eventArgs "${eventArgs}"`, { cause: causedError });
			}
		}));
	}
	on(eventName, handler) {
		this.#emitter.on(eventName, handler);
	}
	onOnce(eventName, handler) {
		const wrapper = (...args) => {
			this.off(eventName, wrapper);
			handler(...args);
		};
		this.on(eventName, wrapper);
	}
	off(eventName, handler) {
		this.#emitter.off(eventName, handler);
	}
	removeAll() {
		this.#emitter.removeAllListeners();
	}
};

//#endregion
//#region src/utils/formatHrtime.ts
/**
* Calculates elapsed time in milliseconds from a high-resolution start time.
* Rounds to 2 decimal places to provide sub-millisecond precision without noise.
*/
function getElapsedMs(hrStart) {
	const [seconds, nanoseconds] = process.hrtime(hrStart);
	const ms = seconds * 1e3 + nanoseconds / 1e6;
	return Math.round(ms * 100) / 100;
}
/**
* Converts a millisecond duration into a human-readable string.
* Adjusts units (ms, s, m s) based on the magnitude of the duration.
*/
function formatMs(ms) {
	if (ms >= 6e4) return `${Math.floor(ms / 6e4)}m ${(ms % 6e4 / 1e3).toFixed(1)}s`;
	if (ms >= 1e3) return `${(ms / 1e3).toFixed(2)}s`;
	return `${Math.round(ms).toFixed(0)}ms`;
}
/**
* Convenience helper to get and format elapsed time in one step.
*/
function formatHrtime(hrStart) {
	return formatMs(getElapsedMs(hrStart));
}

//#endregion
//#region src/utils/URLPath.ts
var URLPath = class {
	path;
	#options;
	constructor(path$1, options = {}) {
		this.path = path$1;
		this.#options = options;
		return this;
	}
	/**
	* Convert Swagger path to URLPath(syntax of Express)
	* @example /pet/{petId} => /pet/:petId
	*/
	get URL() {
		return this.toURLPath();
	}
	get isURL() {
		try {
			if (new URL(this.path)?.href) return true;
		} catch (_error) {
			return false;
		}
		return false;
	}
	/**
	* Convert Swagger path to template literals/ template strings(camelcase)
	* @example /pet/{petId} => `/pet/${petId}`
	* @example /account/monetary-accountID => `/account/${monetaryAccountId}`
	* @example /account/userID => `/account/${userId}`
	*/
	get template() {
		return this.toTemplateString();
	}
	get object() {
		return this.toObject();
	}
	get params() {
		return this.getParams();
	}
	toObject({ type = "path", replacer, stringify } = {}) {
		const object = {
			url: type === "path" ? this.toURLPath() : this.toTemplateString({ replacer }),
			params: this.getParams()
		};
		if (stringify) {
			if (type === "template") return JSON.stringify(object).replaceAll("'", "").replaceAll(`"`, "");
			if (object.params) return `{ url: '${object.url}', params: ${JSON.stringify(object.params).replaceAll("'", "").replaceAll(`"`, "")} }`;
			return `{ url: '${object.url}' }`;
		}
		return object;
	}
	/**
	* Convert Swagger path to template literals/ template strings(camelcase)
	* @example /pet/{petId} => `/pet/${petId}`
	* @example /account/monetary-accountID => `/account/${monetaryAccountId}`
	* @example /account/userID => `/account/${userId}`
	*/
	toTemplateString({ prefix = "", replacer } = {}) {
		const found = this.path.match(/{(\w|-)*}/g);
		let newPath = this.path.replaceAll("{", "${");
		if (found) newPath = found.reduce((prev, path$1) => {
			const pathWithoutBrackets = path$1.replaceAll("{", "").replaceAll("}", "");
			let param = require_transformers.isValidVarName(pathWithoutBrackets) ? pathWithoutBrackets : require_transformers.camelCase(pathWithoutBrackets);
			if (this.#options.casing === "camelcase") param = require_transformers.camelCase(param);
			return prev.replace(path$1, `\${${replacer ? replacer(param) : param}}`);
		}, this.path);
		return `\`${prefix}${newPath}\``;
	}
	getParams(replacer) {
		const found = this.path.match(/{(\w|-)*}/g);
		if (!found) return;
		const params = {};
		found.forEach((item) => {
			item = item.replaceAll("{", "").replaceAll("}", "");
			let param = require_transformers.isValidVarName(item) ? item : require_transformers.camelCase(item);
			if (this.#options.casing === "camelcase") param = require_transformers.camelCase(param);
			const key = replacer ? replacer(param) : param;
			params[key] = key;
		}, this.path);
		return params;
	}
	/**
	* Convert Swagger path to URLPath(syntax of Express)
	* @example /pet/{petId} => /pet/:petId
	*/
	toURLPath() {
		return this.path.replaceAll("{", ":").replaceAll("}", "");
	}
};

//#endregion
//#region src/utils/TreeNode.ts
var TreeNode = class TreeNode {
	data;
	parent;
	children = [];
	#cachedLeaves = void 0;
	constructor(data, parent) {
		this.data = data;
		this.parent = parent;
		return this;
	}
	addChild(data) {
		const child = new TreeNode(data, this);
		if (!this.children) this.children = [];
		this.children.push(child);
		return child;
	}
	get root() {
		if (!this.parent) return this;
		return this.parent.root;
	}
	get leaves() {
		if (!this.children || this.children.length === 0) return [this];
		if (this.#cachedLeaves) return this.#cachedLeaves;
		const leaves = [];
		if (this.children) for (let childIndex = 0, { length } = this.children; childIndex < length; childIndex++) leaves.push.apply(leaves, this.children[childIndex].leaves);
		this.#cachedLeaves = leaves;
		return leaves;
	}
	forEach(callback) {
		if (typeof callback !== "function") throw new TypeError("forEach() callback must be a function");
		callback(this);
		if (this.children) for (let childIndex = 0, { length } = this.children; childIndex < length; childIndex++) this.children[childIndex]?.forEach(callback);
		return this;
	}
	findDeep(predicate) {
		if (typeof predicate !== "function") throw new TypeError("find() predicate must be a function");
		return this.leaves.find(predicate);
	}
	forEachDeep(callback) {
		if (typeof callback !== "function") throw new TypeError("forEach() callback must be a function");
		this.leaves.forEach(callback);
	}
	filterDeep(callback) {
		if (typeof callback !== "function") throw new TypeError("filter() callback must be a function");
		return this.leaves.filter(callback);
	}
	mapDeep(callback) {
		if (typeof callback !== "function") throw new TypeError("map() callback must be a function");
		return this.leaves.map(callback);
	}
	static build(files, root) {
		try {
			const filteredTree = buildDirectoryTree(files, root);
			if (!filteredTree) return null;
			const treeNode = new TreeNode({
				name: filteredTree.name,
				path: filteredTree.path,
				file: filteredTree.file,
				type: getMode(filteredTree.path)
			});
			const recurse = (node, item) => {
				const subNode = node.addChild({
					name: item.name,
					path: item.path,
					file: item.file,
					type: getMode(item.path)
				});
				if (item.children?.length) item.children?.forEach((child) => {
					recurse(subNode, child);
				});
			};
			filteredTree.children?.forEach((child) => {
				recurse(treeNode, child);
			});
			return treeNode;
		} catch (error) {
			throw new Error("Something went wrong with creating barrel files with the TreeNode class", { cause: error });
		}
	}
};
const normalizePath = (p) => p.replace(/\\/g, "/");
function buildDirectoryTree(files, rootFolder = "") {
	const normalizedRootFolder = normalizePath(rootFolder);
	const rootPrefix = normalizedRootFolder.endsWith("/") ? normalizedRootFolder : `${normalizedRootFolder}/`;
	const filteredFiles = files.filter((file) => {
		const normalizedFilePath = normalizePath(file.path);
		return rootFolder ? normalizedFilePath.startsWith(rootPrefix) && !normalizedFilePath.endsWith(".json") : !normalizedFilePath.endsWith(".json");
	});
	if (filteredFiles.length === 0) return null;
	const root = {
		name: rootFolder || "",
		path: rootFolder || "",
		children: []
	};
	filteredFiles.forEach((file) => {
		const parts = file.path.slice(rootFolder.length).split("/");
		let currentLevel = root.children;
		let currentPath = rootFolder;
		parts.forEach((part, index) => {
			if (index !== 0) currentPath += `/${part}`;
			else currentPath += `${part}`;
			let existingNode = currentLevel.find((node) => node.name === part);
			if (!existingNode) {
				if (index === parts.length - 1) existingNode = {
					name: part,
					file,
					path: currentPath
				};
				else existingNode = {
					name: part,
					path: currentPath,
					children: []
				};
				currentLevel.push(existingNode);
			}
			if (!existingNode.file) currentLevel = existingNode.children;
		});
	});
	return root;
}

//#endregion
//#region src/BarrelManager.ts
/** biome-ignore-all lint/suspicious/useIterableCallbackReturn: not needed */
var BarrelManager = class {
	constructor(_options = {}) {
		return this;
	}
	getFiles({ files: generatedFiles, root }) {
		const cachedFiles = /* @__PURE__ */ new Map();
		TreeNode.build(generatedFiles, root)?.forEach((treeNode) => {
			if (!treeNode || !treeNode.children || !treeNode.parent?.data.path) return;
			const barrelFile = {
				path: (0, node_path.join)(treeNode.parent?.data.path, "index.ts"),
				baseName: "index.ts",
				exports: [],
				imports: [],
				sources: []
			};
			const previousBarrelFile = cachedFiles.get(barrelFile.path);
			treeNode.leaves.forEach((item) => {
				if (!item.data.name) return;
				(item.data.file?.sources || []).forEach((source) => {
					if (!item.data.file?.path || !source.isIndexable || !source.name) return;
					if (previousBarrelFile?.sources.some((item$1) => item$1.name === source.name && item$1.isTypeOnly === source.isTypeOnly)) return;
					if (!barrelFile.exports) barrelFile.exports = [];
					if (!!treeNode.parent?.data.path?.split?.("/")?.length) barrelFile.exports.push({
						name: [source.name],
						path: require_fs.getRelativePath(treeNode.parent?.data.path, item.data.path),
						isTypeOnly: source.isTypeOnly
					});
					else barrelFile.exports.push({
						name: [source.name],
						path: `./${item.data.file.baseName}`,
						isTypeOnly: source.isTypeOnly
					});
					barrelFile.sources.push({
						name: source.name,
						isTypeOnly: source.isTypeOnly,
						value: "",
						isExportable: false,
						isIndexable: false
					});
				});
			});
			if (previousBarrelFile) {
				previousBarrelFile.sources.push(...barrelFile.sources);
				previousBarrelFile.exports?.push(...barrelFile.exports || []);
			} else cachedFiles.set(barrelFile.path, barrelFile);
		});
		return [...cachedFiles.values()];
	}
};

//#endregion
//#region src/utils/getBarrelFiles.ts
function trimExtName(text) {
	return text.replace(/\.[^/.]+$/, "");
}
async function getBarrelFiles(files, { type, meta = {}, root, output }) {
	if (!type || type === "propagate") return [];
	const barrelManager = new BarrelManager({});
	const pathToBuildFrom = (0, node_path.join)(root, output.path);
	if (trimExtName(pathToBuildFrom).endsWith("index")) return [];
	const barrelFiles = barrelManager.getFiles({
		files,
		root: pathToBuildFrom,
		meta
	});
	if (type === "all") return barrelFiles.map((file) => {
		return {
			...file,
			exports: file.exports?.map((exportItem) => {
				return {
					...exportItem,
					name: void 0
				};
			})
		};
	});
	return barrelFiles.map((indexFile) => {
		return {
			...indexFile,
			meta
		};
	});
}

//#endregion
Object.defineProperty(exports, 'AsyncEventEmitter', {
  enumerable: true,
  get: function () {
    return AsyncEventEmitter;
  }
});
Object.defineProperty(exports, 'BuildError', {
  enumerable: true,
  get: function () {
    return BuildError;
  }
});
Object.defineProperty(exports, 'PluginManager', {
  enumerable: true,
  get: function () {
    return PluginManager;
  }
});
Object.defineProperty(exports, 'PromiseManager', {
  enumerable: true,
  get: function () {
    return PromiseManager;
  }
});
Object.defineProperty(exports, 'Queue', {
  enumerable: true,
  get: function () {
    return Queue;
  }
});
Object.defineProperty(exports, 'URLPath', {
  enumerable: true,
  get: function () {
    return URLPath;
  }
});
Object.defineProperty(exports, 'formatHrtime', {
  enumerable: true,
  get: function () {
    return formatHrtime;
  }
});
Object.defineProperty(exports, 'formatMs', {
  enumerable: true,
  get: function () {
    return formatMs;
  }
});
Object.defineProperty(exports, 'getBarrelFiles', {
  enumerable: true,
  get: function () {
    return getBarrelFiles;
  }
});
Object.defineProperty(exports, 'getElapsedMs', {
  enumerable: true,
  get: function () {
    return getElapsedMs;
  }
});
Object.defineProperty(exports, 'getMode', {
  enumerable: true,
  get: function () {
    return getMode;
  }
});
Object.defineProperty(exports, 'getUniqueName', {
  enumerable: true,
  get: function () {
    return getUniqueName;
  }
});
Object.defineProperty(exports, 'setUniqueName', {
  enumerable: true,
  get: function () {
    return setUniqueName;
  }
});
//# sourceMappingURL=getBarrelFiles-p2qZTkRB.cjs.map