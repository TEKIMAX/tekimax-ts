import { t as __name } from "./chunk-DlpkT3g-.cjs";
import { A as AsyncEventEmitter, E as PossiblePromise } from "./types-BGowkYLs.cjs";
import { n as getBarrelFiles } from "./getBarrelFiles-CKYSnWw5.cjs";

//#region src/utils/buildJSDoc.d.ts

/**
 * Builds a JSDoc comment block with custom indentation.
 * @param comments - Array of comment strings to include in the JSDoc block
 * @param options - Configuration options for formatting
 * @returns Formatted JSDoc string or fallback string if no comments
 */
declare function buildJSDoc(comments: Array<string>, options?: {
  /**
   * String to use for indenting each line of the JSDoc comment
   * @default '   * ' (3 spaces + asterisk + space)
   */
  indent?: string;
  /**
   * String to append after the closing JSDoc tag
   * @default '\n  ' (newline + 2 spaces)
   */
  suffix?: string;
  /**
   * String to return when there are no comments
   * @default '  ' (2 spaces)
   */
  fallback?: string;
}): string;
//#endregion
//#region src/utils/Cache.d.ts
declare class Cache<T> {
  #private;
  get(key: string): Promise<T | null>;
  set(key: string, value: T): Promise<void>;
  delete(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
  values(): Promise<T[]>;
  flush(): Promise<void>;
}
//#endregion
//#region src/utils/FunctionParams.d.ts
type FunctionParamsASTWithoutType = {
  name?: string;
  type?: string;
  /**
   * @default true
   */
  required?: boolean;
  /**
   * @default true
   */
  enabled?: boolean;
  default?: string;
};
type FunctionParamsASTWithType = {
  name?: never;
  type: string;
  /**
   * @default true
   */
  required?: boolean;
  /**
   * @default true
   */
  enabled?: boolean;
  default?: string;
};
/**
 * @deprecated
 */
type FunctionParamsAST = FunctionParamsASTWithoutType | FunctionParamsASTWithType;
/**
 * @deprecated
 */
declare class FunctionParams {
  #private;
  constructor();
  get items(): FunctionParamsAST[];
  add(item: FunctionParamsAST | Array<FunctionParamsAST | FunctionParamsAST[] | undefined> | undefined): FunctionParams;
  static toObject(items: FunctionParamsAST[]): FunctionParamsAST;
  toObject(): FunctionParamsAST;
  static toString(items: (FunctionParamsAST | FunctionParamsAST[])[]): string;
  toString(): string;
}
//#endregion
//#region src/utils/formatHrtime.d.ts
/**
 * Calculates elapsed time in milliseconds from a high-resolution start time.
 * Rounds to 2 decimal places to provide sub-millisecond precision without noise.
 */
declare function getElapsedMs(hrStart: [number, number]): number;
/**
 * Converts a millisecond duration into a human-readable string.
 * Adjusts units (ms, s, m s) based on the magnitude of the duration.
 */
declare function formatMs(ms: number): string;
/**
 * Convenience helper to get and format elapsed time in one step.
 */
declare function formatHrtime(hrStart: [number, number]): string;
//#endregion
//#region src/utils/getNestedAccessor.d.ts
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
declare function getNestedAccessor(param: string | string[], accessor: string): string | undefined;
//#endregion
//#region src/utils/promise.d.ts
declare function isPromise<T>(result: PossiblePromise<T>): result is Promise<T>;
declare function isPromiseFulfilledResult<T = unknown>(result: PromiseSettledResult<unknown>): result is PromiseFulfilledResult<T>;
declare function isPromiseRejectedResult<T>(result: PromiseSettledResult<unknown>): result is Omit<PromiseRejectedResult, 'reason'> & {
  reason: T;
};
//#endregion
//#region src/utils/renderTemplate.d.ts
declare function renderTemplate<TData extends Record<string, unknown> = Record<string, unknown>>(template: string, data?: TData | undefined): string;
//#endregion
//#region src/utils/resolveModuleSource.d.ts
declare function resolveModuleSource(pkgName: string): {
  readonly path: string;
  readonly source: string;
  readonly ext: string;
};
//#endregion
//#region src/utils/timeout.d.ts
declare function timeout(ms: number): Promise<unknown>;
//#endregion
//#region src/utils/URLPath.d.ts
type URLObject = {
  url: string;
  params?: Record<string, string>;
};
type ObjectOptions = {
  type?: 'path' | 'template';
  replacer?: (pathParam: string) => string;
  stringify?: boolean;
};
type Options = {
  casing?: 'camelcase';
};
declare class URLPath {
  #private;
  path: string;
  constructor(path: string, options?: Options);
  /**
   * Convert Swagger path to URLPath(syntax of Express)
   * @example /pet/{petId} => /pet/:petId
   */
  get URL(): string;
  get isURL(): boolean;
  /**
   * Convert Swagger path to template literals/ template strings(camelcase)
   * @example /pet/{petId} => `/pet/${petId}`
   * @example /account/monetary-accountID => `/account/${monetaryAccountId}`
   * @example /account/userID => `/account/${userId}`
   */
  get template(): string;
  get object(): URLObject | string;
  get params(): Record<string, string> | undefined;
  toObject({
    type,
    replacer,
    stringify
  }?: ObjectOptions): URLObject | string;
  /**
   * Convert Swagger path to template literals/ template strings(camelcase)
   * @example /pet/{petId} => `/pet/${petId}`
   * @example /account/monetary-accountID => `/account/${monetaryAccountId}`
   * @example /account/userID => `/account/${userId}`
   */
  toTemplateString({
    prefix,
    replacer
  }?: {
    prefix?: string;
    replacer?: (pathParam: string) => string;
  }): string;
  getParams(replacer?: (pathParam: string) => string): Record<string, string> | undefined;
  /**
   * Convert Swagger path to URLPath(syntax of Express)
   * @example /pet/{petId} => /pet/:petId
   */
  toURLPath(): string;
}
//#endregion
//#region src/utils/uniqueName.d.ts
declare function getUniqueName(originalName: string, data: Record<string, number>): string;
declare function setUniqueName(originalName: string, data: Record<string, number>): string;
//#endregion
export { AsyncEventEmitter, Cache, FunctionParams, type FunctionParamsAST, type URLObject, URLPath, buildJSDoc, formatHrtime, formatMs, getBarrelFiles, getElapsedMs, getNestedAccessor, getUniqueName, isPromise, isPromiseFulfilledResult, isPromiseRejectedResult, renderTemplate, resolveModuleSource, setUniqueName, timeout };
//# sourceMappingURL=utils.d.cts.map