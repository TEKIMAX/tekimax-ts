import { t as __name } from "./chunk-iVr_oF3V.js";
import { orderBy, orderBy as orderBy$1 } from "natural-orderby";
import { merge, merge as merge$1 } from "remeda";

//#region src/transformers/casing.d.ts
type Options$1 = {
  /**
   * When set it will replace all `.` with `/`.
   */
  isFile?: boolean;
  prefix?: string;
  suffix?: string;
};
declare function camelCase(text: string, {
  isFile,
  prefix,
  suffix
}?: Options$1): string;
declare function pascalCase(text: string, {
  isFile,
  prefix,
  suffix
}?: Options$1): string;
declare function snakeCase(text: string, {
  prefix,
  suffix
}?: Omit<Options$1, 'isFile'>): string;
declare function screamingSnakeCase(text: string, {
  prefix,
  suffix
}?: Omit<Options$1, 'isFile'>): string;
//#endregion
//#region src/transformers/combineCodes.d.ts
declare function combineCodes(codes: string[]): string;
//#endregion
//#region src/transformers/createJSDocBlockText.d.ts
declare function createJSDocBlockText({
  comments
}: {
  comments: Array<string>;
}): string;
//#endregion
//#region src/transformers/escape.d.ts
declare function escape(text?: string): string;
/**
 * Escape all characters not included in SingleStringCharacters and DoubleStringCharacters on
 * @link http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
 * @link https://github.com/joliss/js-string-escape/blob/master/index.js
 */
declare function jsStringEscape(input: any): string;
//#endregion
//#region src/transformers/indent.d.ts
declare function createIndent(size: number): string;
//#endregion
//#region src/transformers/nameSorter.d.ts
declare function nameSorter<T extends {
  name: string;
}>(a: T, b: T): 0 | 1 | -1;
//#endregion
//#region src/transformers/searchAndReplace.d.ts
type Options = {
  text: string;
  replaceBy: string;
  prefix?: string;
  key: string;
  searchValues?: (prefix: string, key: string) => Array<RegExp | string>;
};
declare function searchAndReplace(options: Options): string;
//#endregion
//#region src/transformers/stringify.d.ts
declare function stringify(value: string | number | boolean | undefined): string;
declare function stringifyObject(value: object): string;
//#endregion
//#region src/transformers/toRegExp.d.ts
declare function toRegExpString(text: string, func?: string | null): string;
//#endregion
//#region src/transformers/transformReservedWord.d.ts
declare function transformReservedWord(word: string): string;
declare function isValidVarName(name: string): boolean;
//#endregion
//#region src/transformers/trim.d.ts
declare function trim(text: string): string;
declare function trimQuotes(text: string): string;
//#endregion
//#region src/transformers/index.d.ts
declare const _default: {
  readonly combineCodes: typeof combineCodes;
  readonly escape: typeof escape;
  readonly jsStringEscape: typeof jsStringEscape;
  readonly createIndent: typeof createIndent;
  readonly transformReservedWord: typeof transformReservedWord;
  readonly isValidVarName: typeof isValidVarName;
  readonly nameSorter: typeof nameSorter;
  readonly searchAndReplace: typeof searchAndReplace;
  readonly stringify: typeof stringify;
  readonly stringifyObject: typeof stringifyObject;
  readonly toRegExpString: typeof toRegExpString;
  readonly trim: typeof trim;
  readonly trimQuotes: typeof trimQuotes;
  readonly JSDoc: {
    readonly createJSDocBlockText: typeof createJSDocBlockText;
  };
  readonly orderBy: typeof orderBy$1;
  readonly merge: typeof merge$1;
  readonly camelCase: typeof camelCase;
  readonly pascalCase: typeof pascalCase;
  readonly snakeCase: typeof snakeCase;
  readonly screamingSnakeCase: typeof screamingSnakeCase;
};
//#endregion
export { camelCase, combineCodes, createIndent, createJSDocBlockText, _default as default, escape, isValidVarName, jsStringEscape, merge, nameSorter, orderBy, pascalCase, screamingSnakeCase, searchAndReplace, snakeCase, stringify, stringifyObject, toRegExpString, transformReservedWord, trim, trimQuotes };
//# sourceMappingURL=transformers.d.ts.map