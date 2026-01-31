import { t as __name } from "./chunk-iVr_oF3V.js";
import { Fabric } from "@kubb/react-fabric";
import { KubbFile } from "@kubb/fabric-core/types";

//#region src/utils/AsyncEventEmitter.d.ts
declare class AsyncEventEmitter<TEvents extends Record<string, any>> {
  #private;
  constructor(maxListener?: number);
  emit<TEventName extends keyof TEvents & string>(eventName: TEventName, ...eventArgs: TEvents[TEventName]): Promise<void>;
  on<TEventName extends keyof TEvents & string>(eventName: TEventName, handler: (...eventArg: TEvents[TEventName]) => void): void;
  onOnce<TEventName extends keyof TEvents & string>(eventName: TEventName, handler: (...eventArgs: TEvents[TEventName]) => void): void;
  off<TEventName extends keyof TEvents & string>(eventName: TEventName, handler: (...eventArg: TEvents[TEventName]) => void): void;
  removeAll(): void;
}
//#endregion
//#region src/PluginManager.d.ts
type RequiredPluginLifecycle = Required<PluginLifecycle>;
type Strategy = 'hookFirst' | 'hookForPlugin' | 'hookParallel' | 'hookSeq';
type ParseResult<H extends PluginLifecycleHooks> = RequiredPluginLifecycle[H];
type SafeParseResult<H extends PluginLifecycleHooks, Result = ReturnType<ParseResult<H>>> = {
  result: Result;
  plugin: Plugin;
};
type Options = {
  fabric: Fabric;
  events: AsyncEventEmitter<KubbEvents>;
  /**
   * @default Number.POSITIVE_INFINITY
   */
  concurrency?: number;
};
type GetFileProps<TOptions = object> = {
  name: string;
  mode?: KubbFile.Mode;
  extname: KubbFile.Extname;
  pluginKey: Plugin['key'];
  options?: TOptions;
};
declare function getMode(fileOrFolder: string | undefined | null): KubbFile.Mode;
declare class PluginManager {
  #private;
  readonly config: Config;
  readonly options: Options;
  constructor(config: Config, options: Options);
  get events(): AsyncEventEmitter<KubbEvents>;
  getContext<TOptions extends PluginFactoryOptions>(plugin: Plugin<TOptions>): PluginContext<TOptions> & Record<string, any>;
  get plugins(): Array<Plugin>;
  getFile<TOptions = object>({
    name,
    mode,
    extname,
    pluginKey,
    options
  }: GetFileProps<TOptions>): KubbFile.File<{
    pluginKey: Plugin['key'];
  }>;
  resolvePath: <TOptions = object>(params: ResolvePathParams<TOptions>) => KubbFile.Path;
  resolveName: (params: ResolveNameParams) => string;
  /**
   * Run a specific hookName for plugin x.
   */
  hookForPlugin<H extends PluginLifecycleHooks>({
    pluginKey,
    hookName,
    parameters
  }: {
    pluginKey: Plugin['key'];
    hookName: H;
    parameters: PluginParameter<H>;
  }): Promise<Array<ReturnType<ParseResult<H>> | null>>;
  /**
   * Run a specific hookName for plugin x.
   */
  hookForPluginSync<H extends PluginLifecycleHooks>({
    pluginKey,
    hookName,
    parameters
  }: {
    pluginKey: Plugin['key'];
    hookName: H;
    parameters: PluginParameter<H>;
  }): Array<ReturnType<ParseResult<H>>> | null;
  /**
   * Returns the first non-null result.
   */
  hookFirst<H extends PluginLifecycleHooks>({
    hookName,
    parameters,
    skipped
  }: {
    hookName: H;
    parameters: PluginParameter<H>;
    skipped?: ReadonlySet<Plugin> | null;
  }): Promise<SafeParseResult<H>>;
  /**
   * Returns the first non-null result.
   */
  hookFirstSync<H extends PluginLifecycleHooks>({
    hookName,
    parameters,
    skipped
  }: {
    hookName: H;
    parameters: PluginParameter<H>;
    skipped?: ReadonlySet<Plugin> | null;
  }): SafeParseResult<H>;
  /**
   * Runs all plugins in parallel based on `this.plugin` order and `pre`/`post` settings.
   */
  hookParallel<H extends PluginLifecycleHooks, TOutput = void>({
    hookName,
    parameters
  }: {
    hookName: H;
    parameters?: Parameters<RequiredPluginLifecycle[H]> | undefined;
  }): Promise<Awaited<TOutput>[]>;
  /**
   * Chains plugins
   */
  hookSeq<H extends PluginLifecycleHooks>({
    hookName,
    parameters
  }: {
    hookName: H;
    parameters?: PluginParameter<H>;
  }): Promise<void>;
  getPluginByKey(pluginKey: Plugin['key']): Plugin | undefined;
  getPluginsByKey(hookName: keyof PluginWithLifeCycle, pluginKey: Plugin['key']): Plugin[];
}
//#endregion
//#region src/Kubb.d.ts
type DebugEvent = {
  date: Date;
  logs: string[];
  fileName?: string;
};
type ProgressStartMeta<H extends PluginLifecycleHooks = PluginLifecycleHooks> = {
  hookName: H;
  plugins: Array<Plugin>;
};
type ProgressStopMeta<H extends PluginLifecycleHooks = PluginLifecycleHooks> = {
  hookName: H;
};
type ExecutingMeta<H extends PluginLifecycleHooks = PluginLifecycleHooks> = {
  strategy: Strategy;
  hookName: H;
  plugin: Plugin;
  parameters?: unknown[] | undefined;
  output?: unknown;
};
type ExecutedMeta<H extends PluginLifecycleHooks = PluginLifecycleHooks> = {
  duration: number;
  strategy: Strategy;
  hookName: H;
  plugin: Plugin;
  parameters?: unknown[] | undefined;
  output?: unknown;
};
/**
 * Events emitted during the Kubb code generation lifecycle.
 * These events can be listened to for logging, progress tracking, and custom integrations.
 *
 * @example
 * ```typescript
 * import type { AsyncEventEmitter } from '@kubb/core'
 * import type { KubbEvents } from '@kubb/core'
 *
 * const events: AsyncEventEmitter<KubbEvents> = new AsyncEventEmitter()
 *
 * events.on('lifecycle:start', () => {
 *   console.log('Starting Kubb generation')
 * })
 *
 * events.on('plugin:end', (plugin, { duration }) => {
 *   console.log(`Plugin ${plugin.name} completed in ${duration}ms`)
 * })
 * ```
 */
interface KubbEvents {
  /**
   * Emitted at the beginning of the Kubb lifecycle, before any code generation starts.
   */
  'lifecycle:start': [version: string];
  /**
   * Emitted at the end of the Kubb lifecycle, after all code generation is complete.
   */
  'lifecycle:end': [];
  /**
   * Emitted when configuration loading starts.
   */
  'config:start': [];
  /**
   * Emitted when configuration loading is complete.
   */
  'config:end': [configs: Array<Config>];
  /**
   * Emitted when code generation phase starts.
   */
  'generation:start': [config: Config];
  /**
   * Emitted when code generation phase completes.
   */
  'generation:end': [Config: Config];
  /**
   * Emitted with a summary of the generation results.
   * Contains summary lines, title, and success status.
   */
  'generation:summary': [Config: Config, {
    failedPlugins: Set<{
      plugin: Plugin;
      error: Error;
    }>;
    status: 'success' | 'failed';
    hrStart: [number, number];
    filesCreated: number;
    pluginTimings?: Map<string, number>;
  }];
  /**
   * Emitted when code formatting starts (e.g., running Biome or Prettier).
   */
  'format:start': [];
  /**
   * Emitted when code formatting completes.
   */
  'format:end': [];
  /**
   * Emitted when linting starts.
   */
  'lint:start': [];
  /**
   * Emitted when linting completes.
   */
  'lint:end': [];
  /**
   * Emitted when plugin hooks execution starts.
   */
  'hooks:start': [];
  /**
   * Emitted when plugin hooks execution completes.
   */
  'hooks:end': [];
  /**
   * Emitted when a single hook execution starts. (e.g., format or lint).
   * The callback should be invoked when the command completes.
   */
  'hook:start': [{
    id?: string;
    command: string;
    args?: readonly string[];
  }];
  /**
   * Emitted when a single hook execution completes.
   */
  'hook:end': [{
    id?: string;
    command: string;
    args?: readonly string[];
    success: boolean;
    error: Error | null;
  }];
  /**
   * Emitted when a new version of Kubb is available.
   */
  'version:new': [currentVersion: string, latestVersion: string];
  /**
   * Informational message event.
   */
  info: [message: string, info?: string];
  /**
   * Error event. Emitted when an error occurs during code generation.
   */
  error: [error: Error, meta?: Record<string, unknown>];
  /**
   * Success message event.
   */
  success: [message: string, info?: string];
  /**
   * Warning message event.
   */
  warn: [message: string, info?: string];
  /**
   * Debug event for detailed logging.
   * Contains timestamp, log messages, and optional filename.
   */
  debug: [meta: DebugEvent];
  /**
   * Emitted when file processing starts.
   * Contains the list of files to be processed.
   */
  'files:processing:start': [files: Array<KubbFile.ResolvedFile>];
  /**
   * Emitted for each file being processed, providing progress updates.
   * Contains processed count, total count, percentage, and file details.
   */
  'file:processing:update': [{
    /** Number of files processed so far */
    processed: number;
    /** Total number of files to process */
    total: number;
    /** Processing percentage (0-100) */
    percentage: number;
    /** Optional source identifier */
    source?: string;
    /** The file being processed */
    file: KubbFile.ResolvedFile;
    /**
     * Kubb configuration (not present in Fabric).
     * Provides access to the current config during file processing.
     */
    config: Config;
  }];
  /**
   * Emitted when file processing completes.
   * Contains the list of processed files.
   */
  'files:processing:end': [files: KubbFile.ResolvedFile[]];
  /**
   * Emitted when a plugin starts executing.
   */
  'plugin:start': [plugin: Plugin];
  /**
   * Emitted when a plugin completes execution.
   * Duration in ms
   */
  'plugin:end': [plugin: Plugin, meta: {
    duration: number;
    success: boolean;
    error?: Error;
  }];
  /**
   * Emitted when plugin hook progress tracking starts.
   * Contains the hook name and list of plugins to execute.
   */
  'plugins:hook:progress:start': [meta: ProgressStartMeta];
  /**
   * Emitted when plugin hook progress tracking ends.
   * Contains the hook name that completed.
   */
  'plugins:hook:progress:end': [meta: ProgressStopMeta];
  /**
   * Emitted when a plugin hook starts processing.
   * Contains strategy, hook name, plugin, parameters, and output.
   */
  'plugins:hook:processing:start': [meta: ExecutingMeta];
  /**
   * Emitted when a plugin hook completes processing.
   * Contains duration, strategy, hook name, plugin, parameters, and output.
   */
  'plugins:hook:processing:end': [meta: ExecutedMeta];
}
//#endregion
//#region src/utils/types.d.ts
type PossiblePromise<T> = Promise<T> | T;
//#endregion
//#region src/types.d.ts
declare global {
  namespace Kubb {
    interface PluginContext {}
  }
}
/**
 * Config used in `kubb.config.ts`
 *
 * @example
 * import { defineConfig } from '@kubb/core'
 * export default defineConfig({
 * ...
 * })
 */
type UserConfig<TInput = Input> = Omit<Config<TInput>, 'root' | 'plugins'> & {
  /**
   * The project root directory, which can be either an absolute path or a path relative to the location of your `kubb.config.ts` file.
   * @default process.cwd()
   */
  root?: string;
  /**
   * An array of Kubb plugins used for generation. Each plugin may have additional configurable options (defined within the plugin itself). If a plugin relies on another plugin, an error will occur if the required dependency is missing. Refer to “pre” for more details.
   */
  plugins?: Array<Omit<UnknownUserPlugin, 'inject'>>;
};
type InputPath = {
  /**
   * Specify your Swagger/OpenAPI file, either as an absolute path or a path relative to the root.
   */
  path: string;
};
type InputData = {
  /**
   * A `string` or `object` that contains your Swagger/OpenAPI data.
   */
  data: string | unknown;
};
type Input = InputPath | InputData | Array<InputPath>;
type BarrelType = 'all' | 'named' | 'propagate';
/**
 * @private
 */
type Config<TInput = Input> = {
  /**
   * The name to display in the CLI output.
   */
  name?: string;
  /**
   * The project root directory, which can be either an absolute path or a path relative to the location of your `kubb.config.ts` file.
   * @default process.cwd()
   */
  root: string;
  /**
   * You can use either `input.path` or `input.data`, depending on your specific needs.
   */
  input: TInput;
  output: {
    /**
     * The path where all generated files receives exported.
     * This can be an absolute path or a path relative to the specified root option.
     */
    path: string;
    /**
     * Clean the output directory before each build.
     */
    clean?: boolean;
    /**
     * Save files to the file system.
     * @default true
     */
    write?: boolean;
    /**
     * Specifies the formatting tool to be used.
     * - 'auto' automatically detects and uses biome or prettier (in that order of preference).
     * - 'prettier' uses Prettier for code formatting.
     * - 'biome' uses Biome for code formatting.
     * - 'oxfmt' uses Oxfmt for code formatting.
     * - false disables code formatting.
     * @default 'prettier'
     */
    format?: 'auto' | 'prettier' | 'biome' | 'oxfmt' | false;
    /**
     * Specifies the linter that should be used to analyze the code.
     * - 'auto' automatically detects and uses biome, oxlint, or eslint (in that order of preference).
     * - 'eslint' uses ESLint for linting.
     * - 'biome' uses Biome for linting.
     * - 'oxlint' uses Oxlint for linting.
     * - false disables linting.
     * @default 'auto'
     */
    lint?: 'auto' | 'eslint' | 'biome' | 'oxlint' | false;
    /**
     * Overrides the extension for generated imports and exports. By default, each plugin adds an extension.
     * @default { '.ts': '.ts'}
     */
    extension?: Record<KubbFile.Extname, KubbFile.Extname | ''>;
    /**
     * Configures how `index.ts` files are created, including disabling barrel file generation. Each plugin has its own `barrelType` option; this setting controls the root barrel file (e.g., `src/gen/index.ts`).
     * @default 'named'
     */
    barrelType?: Exclude<BarrelType, 'propagate'> | false;
    /**
     * Adds a default banner to the start of every generated file indicating it was generated by Kubb.
     * - 'simple' adds banner with link to Kubb.
     * - 'full' adds source, title, description, and OpenAPI version.
     * - false disables banner generation.
     * @default 'simple'
     */
    defaultBanner?: 'simple' | 'full' | false;
    /**
     * Whether to override existing external files if they already exist.
     * When setting the option in the global configuration, all plugins inherit the same behavior by default.
     * However, all plugins also have an `output.override` option, which can be used to override the behavior for a specific plugin.
     * @default false
     */
    override?: boolean;
  };
  /**
   * An array of Kubb plugins that used in the generation.
   * Each plugin may include additional configurable options(defined in the plugin itself).
   * If a plugin depends on another plugin, an error is returned if the required dependency is missing. See pre for more details.
   */
  plugins?: Array<Plugin>;
  /**
   * Hooks triggered when a specific action occurs in Kubb.
   */
  hooks?: {
    /**
     * Hook that triggers at the end of all executions.
     * Useful for running Prettier or ESLint to format/lint your code.
     */
    done?: string | Array<string>;
  };
};
type PluginFactoryOptions<
/**
 * Name to be used for the plugin, this will also be used for they key.
 */
TName extends string = string,
/**
 * Options of the plugin.
 */
TOptions extends object = object,
/**
 * Options of the plugin that can be used later on, see `options` inside your plugin config.
 */
TResolvedOptions extends object = TOptions,
/**
 * Context that you want to expose to other plugins.
 */
TContext = any,
/**
 * When calling `resolvePath` you can specify better types.
 */
TResolvePathOptions extends object = object> = {
  name: TName;
  /**
   * Same behavior like what has been done with `QueryKey` in `@tanstack/react-query`
   */
  key: PluginKey<TName | string>;
  options: TOptions;
  resolvedOptions: TResolvedOptions;
  context: TContext;
  resolvePathOptions: TResolvePathOptions;
};
type PluginKey<TName> = [name: TName, identifier?: string | number];
type GetPluginFactoryOptions<TPlugin extends UserPlugin> = TPlugin extends UserPlugin<infer X> ? X : never;
type UserPlugin<TOptions extends PluginFactoryOptions = PluginFactoryOptions> = {
  /**
   * Unique name used for the plugin
   * The name of the plugin follows the format scope:foo-bar or foo-bar, adding scope: can avoid naming conflicts with other plugins.
   * @example @kubb/typescript
   */
  name: TOptions['name'];
  /**
   * Options set for a specific plugin(see kubb.config.js), passthrough of options.
   */
  options: TOptions['resolvedOptions'];
  /**
   * Specifies the preceding plugins for the current plugin. You can pass an array of preceding plugin names, and the current plugin is executed after these plugins.
   * Can be used to validate dependent plugins.
   */
  pre?: Array<string>;
  /**
   * Specifies the succeeding plugins for the current plugin. You can pass an array of succeeding plugin names, and the current plugin is executed before these plugins.
   */
  post?: Array<string>;
  inject?: (this: PluginContext<TOptions>, context: PluginContext<TOptions>) => TOptions['context'];
};
type UserPluginWithLifeCycle<TOptions extends PluginFactoryOptions = PluginFactoryOptions> = UserPlugin<TOptions> & PluginLifecycle<TOptions>;
type UnknownUserPlugin = UserPlugin<PluginFactoryOptions<any, any, any, any, any>>;
type Plugin<TOptions extends PluginFactoryOptions = PluginFactoryOptions> = {
  /**
   * Unique name used for the plugin
   * @example @kubb/typescript
   */
  name: TOptions['name'];
  /**
   * Internal key used when a developer uses more than one of the same plugin
   * @private
   */
  key: TOptions['key'];
  /**
   * Specifies the preceding plugins for the current plugin. You can pass an array of preceding plugin names, and the current plugin is executed after these plugins.
   * Can be used to validate dependent plugins.
   */
  pre?: Array<string>;
  /**
   * Specifies the succeeding plugins for the current plugin. You can pass an array of succeeding plugin names, and the current plugin is executed before these plugins.
   */
  post?: Array<string>;
  /**
   * Options set for a specific plugin(see kubb.config.js), passthrough of options.
   */
  options: TOptions['resolvedOptions'];
  install: (this: PluginContext<TOptions>, context: PluginContext<TOptions>) => PossiblePromise<void>;
  /**
   * Define a context that can be used by other plugins, see `PluginManager' where we convert from `UserPlugin` to `Plugin`(used when calling `definePlugin`).
   */
  inject: (this: PluginContext<TOptions>, context: PluginContext<TOptions>) => TOptions['context'];
};
type PluginWithLifeCycle<TOptions extends PluginFactoryOptions = PluginFactoryOptions> = Plugin<TOptions> & PluginLifecycle<TOptions>;
type PluginLifecycle<TOptions extends PluginFactoryOptions = PluginFactoryOptions> = {
  /**
   * Start of the lifecycle of a plugin.
   * @type hookParallel
   */
  install?: (this: PluginContext<TOptions>, context: PluginContext<TOptions>) => PossiblePromise<void>;
  /**
   * Resolve to a Path based on a baseName(example: `./Pet.ts`) and directory(example: `./models`).
   * Options can als be included.
   * @type hookFirst
   * @example ('./Pet.ts', './src/gen/') => '/src/gen/Pet.ts'
   */
  resolvePath?: (this: PluginContext<TOptions>, baseName: KubbFile.BaseName, mode?: KubbFile.Mode, options?: TOptions['resolvePathOptions']) => KubbFile.Path;
  /**
   * Resolve to a name based on a string.
   * Useful when converting to PascalCase or camelCase.
   * @type hookFirst
   * @example ('pet') => 'Pet'
   */
  resolveName?: (this: PluginContext<TOptions>, name: ResolveNameParams['name'], type?: ResolveNameParams['type']) => string;
};
type PluginLifecycleHooks = keyof PluginLifecycle;
type PluginParameter<H extends PluginLifecycleHooks> = Parameters<Required<PluginLifecycle>[H]>;
type ResolvePathParams<TOptions = object> = {
  pluginKey?: Plugin['key'];
  baseName: KubbFile.BaseName;
  mode?: KubbFile.Mode;
  /**
   * Options to be passed to 'resolvePath' 3th parameter
   */
  options?: TOptions;
};
type ResolveNameParams = {
  name: string;
  pluginKey?: Plugin['key'];
  /**
   * Specifies the type of entity being named.
   * - 'file' customizes the name of the created file (uses camelCase).
   * - 'function' customizes the exported function names (uses camelCase).
   * - 'type' customizes TypeScript types (uses PascalCase).
   * - 'const' customizes variable names (uses camelCase).
   * @default undefined
   */
  type?: 'file' | 'function' | 'type' | 'const';
};
type PluginContext<TOptions extends PluginFactoryOptions = PluginFactoryOptions> = {
  fabric: Fabric;
  config: Config;
  pluginManager: PluginManager;
  /**
   * Only add when the file does not exist yet
   */
  addFile: (...file: Array<KubbFile.File>) => Promise<void>;
  /**
   * merging multiple sources into the same output file
   */
  upsertFile: (...file: Array<KubbFile.File>) => Promise<void>;
  events: AsyncEventEmitter<KubbEvents>;
  mode: KubbFile.Mode;
  /**
   * Current plugin
   */
  plugin: Plugin<TOptions>;
} & Kubb.PluginContext;
/**
 * Specify the export location for the files and define the behavior of the output
 */
type Output<TOptions> = {
  /**
   * Path to the output folder or file that will contain the generated code
   */
  path: string;
  /**
   * Define what needs to be exported, here you can also disable the export of barrel files
   * @default 'named'
   */
  barrelType?: BarrelType | false;
  /**
   * Add a banner text in the beginning of every file
   */
  banner?: string | ((options: TOptions) => string);
  /**
   * Add a footer text in the beginning of every file
   */
  footer?: string | ((options: TOptions) => string);
  /**
   * Whether to override existing external files if they already exist.
   * @default false
   */
  override?: boolean;
};
type GroupContext = {
  group: string;
};
type Group = {
  /**
   * Defines the type where to group the files.
   * - 'tag' groups files by OpenAPI tags.
   * - 'path' groups files by OpenAPI paths.
   * @default undefined
   */
  type: 'tag' | 'path';
  /**
   * Return the name of a group based on the group name, this used for the file and name generation
   */
  name?: (context: GroupContext) => string;
};
declare const LogLevel: {
  readonly silent: number;
  readonly error: 0;
  readonly warn: 1;
  readonly info: 3;
  readonly verbose: 4;
  readonly debug: 5;
};
type LoggerOptions = {
  /**
   * @default 3
   */
  logLevel: (typeof LogLevel)[keyof typeof LogLevel];
};
/**
 * Shared context passed to all plugins, parsers, and Fabric internals.
 */
interface LoggerContext extends AsyncEventEmitter<KubbEvents> {}
type Install<TOptions = unknown> = (context: LoggerContext, options?: TOptions) => void | Promise<void>;
type Logger<TOptions extends LoggerOptions = LoggerOptions> = {
  name: string;
  install: Install<TOptions>;
};
type UserLogger<TOptions extends LoggerOptions = LoggerOptions> = Omit<Logger<TOptions>, 'logLevel'>;
//#endregion
export { AsyncEventEmitter as A, UserLogger as C, KubbEvents as D, PossiblePromise as E, PluginManager as O, UserConfig as S, UserPluginWithLifeCycle as T, PluginLifecycleHooks as _, InputData as a, ResolveNameParams as b, Logger as c, Output as d, Plugin as f, PluginLifecycle as g, PluginKey as h, Group as i, getMode as k, LoggerContext as l, PluginFactoryOptions as m, Config as n, InputPath as o, PluginContext as p, GetPluginFactoryOptions as r, LogLevel as s, BarrelType as t, LoggerOptions as u, PluginParameter as v, UserPlugin as w, ResolvePathParams as x, PluginWithLifeCycle as y };
//# sourceMappingURL=types-C9WcJ0d5.d.ts.map