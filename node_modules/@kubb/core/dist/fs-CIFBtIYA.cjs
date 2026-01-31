const require_chunk = require('./chunk-C1_xRkKa.cjs');
let node_path = require("node:path");
let fs_extra = require("fs-extra");
fs_extra = require_chunk.__toESM(fs_extra);
let js_runtime = require("js-runtime");

//#region src/fs/clean.ts
async function clean(path) {
	return fs_extra.default.remove(path);
}

//#endregion
//#region src/fs/exists.ts
const reader$1 = (0, js_runtime.switcher)({
	node: async (path) => {
		return fs_extra.default.pathExists(path);
	},
	bun: async (path) => {
		return Bun.file(path).exists();
	}
}, "node");
const syncReader$1 = (0, js_runtime.switcher)({
	node: (path) => {
		return fs_extra.default.pathExistsSync(path);
	},
	bun: () => {
		throw new Error("Bun cannot read sync");
	}
}, "node");
async function exists(path) {
	return reader$1(path);
}

//#endregion
//#region src/fs/read.ts
const reader = (0, js_runtime.switcher)({
	node: async (path) => {
		return fs_extra.default.readFile(path, { encoding: "utf8" });
	},
	bun: async (path) => {
		return Bun.file(path).text();
	}
}, "node");
const syncReader = (0, js_runtime.switcher)({
	node: (path) => {
		return fs_extra.default.readFileSync(path, { encoding: "utf8" });
	},
	bun: () => {
		throw new Error("Bun cannot read sync");
	}
}, "node");
async function read(path) {
	return reader(path);
}
function readSync(path) {
	return syncReader(path);
}

//#endregion
//#region src/fs/utils.ts
function slash(path, platform = "linux") {
	const isWindowsPath = /^\\\\\?\\/.test(path);
	const normalizedPath = (0, node_path.normalize)(path);
	if (["linux", "mac"].includes(platform) && !isWindowsPath) return normalizedPath.replaceAll(/\\/g, "/").replace("../", "");
	return normalizedPath.replaceAll(/\\/g, "/").replace("../", "");
}
function getRelativePath(rootDir, filePath, platform = "linux") {
	if (!rootDir || !filePath) throw new Error(`Root and file should be filled in when retrieving the relativePath, ${rootDir || ""} ${filePath || ""}`);
	const slashedPath = slash((0, node_path.relative)(rootDir, filePath), platform);
	if (slashedPath.startsWith("../")) return slashedPath;
	return `./${slashedPath}`;
}

//#endregion
//#region src/fs/write.ts
const writer = (0, js_runtime.switcher)({
	node: async (path, data, { sanity }) => {
		try {
			if ((await fs_extra.default.readFile((0, node_path.resolve)(path), { encoding: "utf-8" }))?.toString() === data?.toString()) return;
		} catch (_err) {}
		await fs_extra.default.outputFile((0, node_path.resolve)(path), data, { encoding: "utf-8" });
		if (sanity) {
			const savedData = await fs_extra.default.readFile((0, node_path.resolve)(path), { encoding: "utf-8" });
			if (savedData?.toString() !== data?.toString()) throw new Error(`Sanity check failed for ${path}\n\nData[${data.length}]:\n${data}\n\nSaved[${savedData.length}]:\n${savedData}\n`);
			return savedData;
		}
		return data;
	},
	bun: async (path, data, { sanity }) => {
		try {
			await Bun.write((0, node_path.resolve)(path), data);
			if (sanity) {
				const savedData = await Bun.file((0, node_path.resolve)(path)).text();
				if (savedData?.toString() !== data?.toString()) throw new Error(`Sanity check failed for ${path}\n\nData[${path.length}]:\n${path}\n\nSaved[${savedData.length}]:\n${savedData}\n`);
				return savedData;
			}
			return data;
		} catch (error) {
			console.error(error);
		}
	}
}, "node");
async function write(path, data, options = {}) {
	if (data.trim() === "") return;
	return writer(path, data.trim(), options);
}

//#endregion
Object.defineProperty(exports, 'clean', {
  enumerable: true,
  get: function () {
    return clean;
  }
});
Object.defineProperty(exports, 'exists', {
  enumerable: true,
  get: function () {
    return exists;
  }
});
Object.defineProperty(exports, 'getRelativePath', {
  enumerable: true,
  get: function () {
    return getRelativePath;
  }
});
Object.defineProperty(exports, 'read', {
  enumerable: true,
  get: function () {
    return read;
  }
});
Object.defineProperty(exports, 'readSync', {
  enumerable: true,
  get: function () {
    return readSync;
  }
});
Object.defineProperty(exports, 'write', {
  enumerable: true,
  get: function () {
    return write;
  }
});
//# sourceMappingURL=fs-CIFBtIYA.cjs.map