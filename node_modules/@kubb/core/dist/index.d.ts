import { t as __name } from "./chunk-iVr_oF3V.js";
import { A as AsyncEventEmitter, C as UserLogger, D as KubbEvents, E as PossiblePromise, O as PluginManager, S as UserConfig, T as UserPluginWithLifeCycle, _ as PluginLifecycleHooks, a as InputData, b as ResolveNameParams, c as Logger, d as Output, f as Plugin, g as PluginLifecycle, h as PluginKey, i as Group, k as getMode, l as LoggerContext, m as PluginFactoryOptions, n as Config, o as InputPath, p as PluginContext, r as GetPluginFactoryOptions, s as LogLevel, t as BarrelType, u as LoggerOptions, v as PluginParameter, w as UserPlugin, x as ResolvePathParams, y as PluginWithLifeCycle } from "./types-C9WcJ0d5.js";
import { n as getBarrelFiles, t as FileMetaBase } from "./getBarrelFiles-JXr05jng.js";
import { Fabric } from "@kubb/react-fabric";
import { KubbFile } from "@kubb/fabric-core/types";

//#region src/BaseGenerator.d.ts
/**
 * Abstract class that contains the building blocks for plugins to create their own Generator
 * @link idea based on https://github.com/colinhacks/zod/blob/master/src/types.ts#L137
 */
declare abstract class BaseGenerator<TOptions = unknown, TContext = unknown> {
  #private;
  constructor(options?: TOptions, context?: TContext);
  get options(): TOptions;
  get context(): TContext;
  set options(options: TOptions);
  abstract build(...params: unknown[]): unknown;
}
//#endregion
//#region src/build.d.ts
type BuildOptions = {
  config: UserConfig;
  events?: AsyncEventEmitter<KubbEvents>;
};
type BuildOutput = {
  failedPlugins: Set<{
    plugin: Plugin;
    error: Error;
  }>;
  fabric: Fabric;
  files: Array<KubbFile.ResolvedFile>;
  pluginManager: PluginManager;
  pluginTimings: Map<string, number>;
  error?: Error;
};
type SetupResult = {
  events: AsyncEventEmitter<KubbEvents>;
  fabric: Fabric;
  pluginManager: PluginManager;
};
declare function setup(options: BuildOptions): Promise<SetupResult>;
declare function build(options: BuildOptions, overrides?: SetupResult): Promise<BuildOutput>;
declare function safeBuild(options: BuildOptions, overrides?: SetupResult): Promise<BuildOutput>;
//#endregion
//#region src/config.d.ts
/**
 * CLI options derived from command-line flags.
 */
type CLIOptions = {
  /** Path to `kubb.config.js` */
  config?: string;
  /** Enable watch mode for input files */
  watch?: boolean;
  /**
   * Logging verbosity for CLI usage.
   *
   * - `silent`: hide non-essential logs
   * - `info`: show general logs (non-plugin-related)
   * - `debug`: include detailed plugin lifecycle logs
   * @default 'silent'
   */
  logLevel?: 'silent' | 'info' | 'debug';
  /** Run Kubb with Bun */
  bun?: boolean;
};
/**
 * Helper for defining a Kubb configuration.
 *
 * Accepts either:
 * - A config object or array of configs
 * - A function returning the config(s), optionally async,
 *   receiving the CLI options as argument
 *
 * @example
 * export default defineConfig(({ logLevel }) => ({
 *   root: 'src',
 *   plugins: [myPlugin()],
 * }))
 */
declare function defineConfig(config: PossiblePromise<UserConfig | UserConfig[]> | ((cli: CLIOptions) => PossiblePromise<UserConfig | UserConfig[]>)): typeof config;
/**
 * Type guard to check if a given config has an `input.path`.
 */
declare function isInputPath(config: UserConfig | undefined): config is UserConfig<InputPath>;
//#endregion
//#region src/defineLogger.d.ts
declare function defineLogger<Options$1 extends LoggerOptions = LoggerOptions>(logger: UserLogger<Options$1>): Logger<Options$1>;
//#endregion
//#region src/definePlugin.d.ts
type PluginBuilder<T extends PluginFactoryOptions = PluginFactoryOptions> = (options: T['options']) => UserPluginWithLifeCycle<T>;
/**
 * Wraps a plugin builder to make the options parameter optional.
 */
declare function definePlugin<T extends PluginFactoryOptions = PluginFactoryOptions>(build: PluginBuilder<T>): (options?: T['options']) => UserPluginWithLifeCycle<T>;
//#endregion
//#region src/PackageManager.d.ts
type PackageJSON = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};
type DependencyName = string;
type DependencyVersion = string;
declare class PackageManager {
  #private;
  constructor(workspace?: string);
  set workspace(workspace: string);
  get workspace(): string | undefined;
  normalizeDirectory(directory: string): string;
  getLocation(path: string): string;
  import(path: string): Promise<any | undefined>;
  getPackageJSON(): Promise<PackageJSON | undefined>;
  getPackageJSONSync(): PackageJSON | undefined;
  static setVersion(dependency: DependencyName, version: DependencyVersion): void;
  getVersion(dependency: DependencyName | RegExp): Promise<DependencyVersion | undefined>;
  getVersionSync(dependency: DependencyName | RegExp): DependencyVersion | undefined;
  isValid(dependency: DependencyName | RegExp, version: DependencyVersion): Promise<boolean>;
  isValidSync(dependency: DependencyName | RegExp, version: DependencyVersion): boolean;
}
//#endregion
//#region src/utils/executeStrategies.d.ts
type PromiseFunc$1<T = unknown, T2 = never> = (state?: T) => T2 extends never ? Promise<T> : Promise<T> | T2;
type ValueOfPromiseFuncArray<TInput extends Array<unknown>> = TInput extends Array<PromiseFunc$1<infer X, infer Y>> ? X | Y : never;
type SeqOutput<TInput extends Array<PromiseFunc$1<TValue, null>>, TValue> = Promise<Array<Awaited<ValueOfPromiseFuncArray<TInput>>>>;
/**
 * Chains promises
 */

type HookFirstOutput<TInput extends Array<PromiseFunc$1<TValue, null>>, TValue = unknown> = ValueOfPromiseFuncArray<TInput>;
/**
 * Chains promises, first non-null result stops and returns
 */

type HookParallelOutput<TInput extends Array<PromiseFunc$1<TValue, null>>, TValue> = Promise<PromiseSettledResult<Awaited<ValueOfPromiseFuncArray<TInput>>>[]>;
/**
 * Runs an array of promise functions with optional concurrency limit.
 */

type Strategy = 'seq' | 'first' | 'parallel';
type StrategySwitch<TStrategy extends Strategy, TInput extends Array<PromiseFunc$1<TValue, null>>, TValue> = TStrategy extends 'first' ? HookFirstOutput<TInput, TValue> : TStrategy extends 'seq' ? SeqOutput<TInput, TValue> : TStrategy extends 'parallel' ? HookParallelOutput<TInput, TValue> : never;
//#endregion
//#region src/PromiseManager.d.ts
type PromiseFunc<T = unknown, T2 = never> = () => T2 extends never ? Promise<T> : Promise<T> | T2;
type Options<TState = any> = {
  nullCheck?: (state: TState) => boolean;
};
declare class PromiseManager<TState = any> {
  #private;
  constructor(options?: Options<TState>);
  run<TInput extends Array<PromiseFunc<TValue, null>>, TValue, TStrategy extends Strategy, TOutput = StrategySwitch<TStrategy, TInput, TValue>>(strategy: TStrategy, promises: TInput, {
    concurrency
  }?: {
    concurrency?: number;
  }): TOutput;
}
//#endregion
export { BarrelType, BaseGenerator, type CLIOptions, Config, type FileMetaBase, GetPluginFactoryOptions, Group, InputData, InputPath, KubbEvents, LogLevel, Logger, LoggerContext, LoggerOptions, Output, PackageManager, Plugin, PluginContext, PluginFactoryOptions, PluginKey, PluginLifecycle, PluginLifecycleHooks, PluginManager, PluginParameter, PluginWithLifeCycle, PromiseManager, ResolveNameParams, ResolvePathParams, UserConfig, UserLogger, UserPlugin, UserPluginWithLifeCycle, build, build as default, defineConfig, defineLogger, definePlugin, getBarrelFiles, getMode, isInputPath, safeBuild, setup };
//# sourceMappingURL=index.d.ts.map