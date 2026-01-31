import { t as __name } from "./chunk-DlpkT3g-.cjs";

//#region src/fs/clean.d.ts
declare function clean(path: string): Promise<void>;
//#endregion
//#region src/fs/exists.d.ts
declare function exists(path: string): Promise<boolean>;
//#endregion
//#region src/fs/read.d.ts
declare function read(path: string): Promise<string>;
declare function readSync(path: string): string;
//#endregion
//#region src/fs/utils.d.ts
declare function getRelativePath(rootDir?: string | null, filePath?: string | null, platform?: 'windows' | 'mac' | 'linux'): string;
//#endregion
//#region src/fs/write.d.ts
type Options = {
  sanity?: boolean;
};
declare function write(path: string, data: string, options?: Options): Promise<string | undefined>;
//#endregion
export { clean, exists, getRelativePath, read, readSync, write };
//# sourceMappingURL=fs.d.cts.map