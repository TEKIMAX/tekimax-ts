import { t as __name } from "./chunk-iVr_oF3V.js";
import { normalize, relative, resolve } from "node:path";
import fs from "fs-extra";
import { switcher } from "js-runtime";

//#region src/fs/clean.ts
async function clean(path$1) {
	return fs.remove(path$1);
}

//#endregion
//#region src/fs/exists.ts
const reader$1 = switcher({
	node: async (path$1) => {
		return fs.pathExists(path$1);
	},
	bun: async (path$1) => {
		return Bun.file(path$1).exists();
	}
}, "node");
const syncReader$1 = switcher({
	node: (path$1) => {
		return fs.pathExistsSync(path$1);
	},
	bun: () => {
		throw new Error("Bun cannot read sync");
	}
}, "node");
async function exists(path$1) {
	return reader$1(path$1);
}

//#endregion
//#region src/fs/read.ts
const reader = switcher({
	node: async (path$1) => {
		return fs.readFile(path$1, { encoding: "utf8" });
	},
	bun: async (path$1) => {
		return Bun.file(path$1).text();
	}
}, "node");
const syncReader = switcher({
	node: (path$1) => {
		return fs.readFileSync(path$1, { encoding: "utf8" });
	},
	bun: () => {
		throw new Error("Bun cannot read sync");
	}
}, "node");
async function read(path$1) {
	return reader(path$1);
}
function readSync(path$1) {
	return syncReader(path$1);
}

//#endregion
//#region src/fs/utils.ts
function slash(path$1, platform = "linux") {
	const isWindowsPath = /^\\\\\?\\/.test(path$1);
	const normalizedPath = normalize(path$1);
	if (["linux", "mac"].includes(platform) && !isWindowsPath) return normalizedPath.replaceAll(/\\/g, "/").replace("../", "");
	return normalizedPath.replaceAll(/\\/g, "/").replace("../", "");
}
function getRelativePath(rootDir, filePath, platform = "linux") {
	if (!rootDir || !filePath) throw new Error(`Root and file should be filled in when retrieving the relativePath, ${rootDir || ""} ${filePath || ""}`);
	const slashedPath = slash(relative(rootDir, filePath), platform);
	if (slashedPath.startsWith("../")) return slashedPath;
	return `./${slashedPath}`;
}

//#endregion
//#region src/fs/write.ts
const writer = switcher({
	node: async (path$1, data, { sanity }) => {
		try {
			if ((await fs.readFile(resolve(path$1), { encoding: "utf-8" }))?.toString() === data?.toString()) return;
		} catch (_err) {}
		await fs.outputFile(resolve(path$1), data, { encoding: "utf-8" });
		if (sanity) {
			const savedData = await fs.readFile(resolve(path$1), { encoding: "utf-8" });
			if (savedData?.toString() !== data?.toString()) throw new Error(`Sanity check failed for ${path$1}\n\nData[${data.length}]:\n${data}\n\nSaved[${savedData.length}]:\n${savedData}\n`);
			return savedData;
		}
		return data;
	},
	bun: async (path$1, data, { sanity }) => {
		try {
			await Bun.write(resolve(path$1), data);
			if (sanity) {
				const savedData = await Bun.file(resolve(path$1)).text();
				if (savedData?.toString() !== data?.toString()) throw new Error(`Sanity check failed for ${path$1}\n\nData[${path$1.length}]:\n${path$1}\n\nSaved[${savedData.length}]:\n${savedData}\n`);
				return savedData;
			}
			return data;
		} catch (error) {
			console.error(error);
		}
	}
}, "node");
async function write(path$1, data, options = {}) {
	if (data.trim() === "") return;
	return writer(path$1, data.trim(), options);
}

//#endregion
export { exists as a, readSync as i, getRelativePath as n, clean as o, read as r, write as t };
//# sourceMappingURL=fs--foJTbRT.js.map