import { t as __name } from "./chunk-DlpkT3g-.cjs";
import { f as Plugin, t as BarrelType } from "./types-BGowkYLs.cjs";
import { KubbFile } from "@kubb/fabric-core/types";

//#region src/utils/getBarrelFiles.d.ts
type FileMetaBase = {
  pluginKey?: Plugin['key'];
};
type AddIndexesProps = {
  type: BarrelType | false | undefined;
  /**
   * Root based on root and output.path specified in the config
   */
  root: string;
  /**
   * Output for plugin
   */
  output: {
    path: string;
  };
  group?: {
    output: string;
    exportAs: string;
  };
  meta?: FileMetaBase;
};
declare function getBarrelFiles(files: Array<KubbFile.ResolvedFile>, {
  type,
  meta,
  root,
  output
}: AddIndexesProps): Promise<KubbFile.File[]>;
//#endregion
export { getBarrelFiles as n, FileMetaBase as t };
//# sourceMappingURL=getBarrelFiles-CKYSnWw5.d.cts.map