import { t as __name } from "./chunk-iVr_oF3V.js";
import { useApp } from "@kubb/react-fabric";

//#region src/hooks/useMode.ts
function useMode() {
	const { meta } = useApp();
	return meta.mode;
}

//#endregion
//#region src/hooks/usePlugin.ts
function usePlugin() {
	const { meta } = useApp();
	return meta.plugin;
}

//#endregion
//#region src/hooks/usePluginManager.ts
function usePluginManager() {
	const { meta } = useApp();
	return meta.pluginManager;
}

//#endregion
export { useMode, usePlugin, usePluginManager };
//# sourceMappingURL=hooks.js.map