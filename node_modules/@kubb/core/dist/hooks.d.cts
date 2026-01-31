import { t as __name } from "./chunk-DlpkT3g-.cjs";
import { O as PluginManager, f as Plugin, m as PluginFactoryOptions } from "./types-BGowkYLs.cjs";
import { KubbFile } from "@kubb/fabric-core/types";

//#region src/hooks/useMode.d.ts
declare function useMode(): KubbFile.Mode;
//#endregion
//#region src/hooks/usePlugin.d.ts
declare function usePlugin<TOptions extends PluginFactoryOptions = PluginFactoryOptions>(): Plugin<TOptions>;
//#endregion
//#region src/hooks/usePluginManager.d.ts
declare function usePluginManager(): PluginManager;
//#endregion
export { useMode, usePlugin, usePluginManager };
//# sourceMappingURL=hooks.d.cts.map