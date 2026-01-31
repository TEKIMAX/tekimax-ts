const require_chunk = require('./chunk-C1_xRkKa.cjs');
let natural_orderby = require("natural-orderby");
let remeda = require("remeda");

//#region src/transformers/transformReservedWord.ts
/**
* @link https://github.com/jonschlinkert/reserved/blob/master/index.js
*/
const reservedWords = [
	"abstract",
	"arguments",
	"boolean",
	"break",
	"byte",
	"case",
	"catch",
	"char",
	"class",
	"const",
	"continue",
	"debugger",
	"default",
	"delete",
	"do",
	"double",
	"else",
	"enum",
	"eval",
	"export",
	"extends",
	"false",
	"final",
	"finally",
	"float",
	"for",
	"function",
	"goto",
	"if",
	"implements",
	"import",
	"in",
	"instanceof",
	"int",
	"interface",
	"let",
	"long",
	"native",
	"new",
	"null",
	"package",
	"private",
	"protected",
	"public",
	"return",
	"short",
	"static",
	"super",
	"switch",
	"synchronized",
	"this",
	"throw",
	"throws",
	"transient",
	"true",
	"try",
	"typeof",
	"var",
	"void",
	"volatile",
	"while",
	"with",
	"yield",
	"Array",
	"Date",
	"eval",
	"function",
	"hasOwnProperty",
	"Infinity",
	"isFinite",
	"isNaN",
	"isPrototypeOf",
	"length",
	"Math",
	"name",
	"NaN",
	"Number",
	"Object",
	"prototype",
	"String",
	"toString",
	"undefined",
	"valueOf"
];
function transformReservedWord(word) {
	if (word && reservedWords.includes(word) || word?.match(/^\d/)) return `_${word}`;
	return word;
}
function isValidVarName(name) {
	try {
		Function(`var ${name}`);
	} catch (_e) {
		return false;
	}
	return true;
}

//#endregion
//#region src/transformers/trim.ts
function trim(text) {
	return text.replaceAll(/\n/g, "").trim();
}
function trimQuotes(text) {
	if (text.match(/^"(.*)"$/)) return text.replace(/^"(.*)"$/, "$1");
	if (text.match(/^'(.*)'$/)) return text.replace(/^'(.*)'$/, "$1");
	if (text.match(/^`(.*)`$/)) return text.replace(/^`(.*)`$/, "$1");
	return text;
}

//#endregion
//#region ../../node_modules/.pnpm/camelcase@8.0.0/node_modules/camelcase/index.js
const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;
const LEADING_SEPARATORS = /* @__PURE__ */ new RegExp("^" + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
const NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
const preserveCamelCase = (string, toLowerCase, toUpperCase, preserveConsecutiveUppercase$1) => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;
	let isLastLastCharPreserved = false;
	for (let index = 0; index < string.length; index++) {
		const character = string[index];
		isLastLastCharPreserved = index > 2 ? string[index - 3] === "-" : true;
		if (isLastCharLower && UPPERCASE.test(character)) {
			string = string.slice(0, index) + "-" + string.slice(index);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			index++;
		} else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character) && (!isLastLastCharPreserved || preserveConsecutiveUppercase$1)) {
			string = string.slice(0, index - 1) + "-" + string.slice(index - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
		}
	}
	return string;
};
const preserveConsecutiveUppercase = (input, toLowerCase) => {
	LEADING_CAPITAL.lastIndex = 0;
	return input.replaceAll(LEADING_CAPITAL, (match) => toLowerCase(match));
};
const postProcess = (input, toUpperCase) => {
	SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
	NUMBERS_AND_IDENTIFIER.lastIndex = 0;
	return input.replaceAll(NUMBERS_AND_IDENTIFIER, (match, pattern, offset) => ["_", "-"].includes(input.charAt(offset + match.length)) ? match : toUpperCase(match)).replaceAll(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier));
};
function camelCase$1(input, options) {
	if (!(typeof input === "string" || Array.isArray(input))) throw new TypeError("Expected the input to be `string | string[]`");
	options = {
		pascalCase: false,
		preserveConsecutiveUppercase: false,
		...options
	};
	if (Array.isArray(input)) input = input.map((x) => x.trim()).filter((x) => x.length).join("-");
	else input = input.trim();
	if (input.length === 0) return "";
	const toLowerCase = options.locale === false ? (string) => string.toLowerCase() : (string) => string.toLocaleLowerCase(options.locale);
	const toUpperCase = options.locale === false ? (string) => string.toUpperCase() : (string) => string.toLocaleUpperCase(options.locale);
	if (input.length === 1) {
		if (SEPARATORS.test(input)) return "";
		return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
	}
	if (input !== toLowerCase(input)) input = preserveCamelCase(input, toLowerCase, toUpperCase, options.preserveConsecutiveUppercase);
	input = input.replace(LEADING_SEPARATORS, "");
	input = options.preserveConsecutiveUppercase ? preserveConsecutiveUppercase(input, toLowerCase) : toLowerCase(input);
	if (options.pascalCase) input = toUpperCase(input.charAt(0)) + input.slice(1);
	return postProcess(input, toUpperCase);
}
require_chunk.__name(camelCase$1, "camelCase");

//#endregion
//#region src/transformers/casing.ts
function camelCase(text, { isFile, prefix = "", suffix = "" } = {}) {
	if (isFile) {
		const splitArray = text.split(".");
		return splitArray.map((item, i) => i === splitArray.length - 1 ? camelCase(item, {
			prefix,
			suffix
		}) : camelCase(item)).join("/");
	}
	return camelCase$1(`${prefix} ${text} ${suffix}`, {
		pascalCase: false,
		preserveConsecutiveUppercase: true
	}).replace(/[^a-zA-Z0-9]/g, "");
}
function pascalCase(text, { isFile, prefix = "", suffix = "" } = {}) {
	if (isFile) {
		const splitArray = text.split(".");
		return splitArray.map((item, i) => i === splitArray.length - 1 ? pascalCase(item, {
			prefix,
			suffix
		}) : camelCase(item)).join("/");
	}
	return camelCase$1(`${prefix} ${text} ${suffix}`, {
		pascalCase: true,
		preserveConsecutiveUppercase: true
	}).replace(/[^a-zA-Z0-9]/g, "");
}
function snakeCase(text, { prefix = "", suffix = "" } = {}) {
	return `${prefix} ${text} ${suffix}`.trim().replace(/([a-z])([A-Z])/g, "$1_$2").replace(/[\s\-.]+/g, "_").replace(/[^a-zA-Z0-9_]/g, "").toLowerCase().replace(/_+/g, "_").replace(/^_|_$/g, "");
}
function screamingSnakeCase(text, { prefix = "", suffix = "" } = {}) {
	return snakeCase(text, {
		prefix,
		suffix
	}).toUpperCase();
}

//#endregion
//#region src/transformers/combineCodes.ts
function combineCodes(codes) {
	return codes.join("\n");
}

//#endregion
//#region src/transformers/createJSDocBlockText.ts
function createJSDocBlockText({ comments }) {
	const filteredComments = comments.filter(Boolean);
	if (!filteredComments.length) return "";
	return `/**\n * ${filteredComments.join("\n * ")}\n */`;
}

//#endregion
//#region src/transformers/escape.ts
function escape(text) {
	return text ? text.replaceAll("`", "\\`") : "";
}
/**
* Escape all characters not included in SingleStringCharacters and DoubleStringCharacters on
* @link http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.4
* @link https://github.com/joliss/js-string-escape/blob/master/index.js
*/
function jsStringEscape(input) {
	return `${input}`.replace(/["'\\\n\r\u2028\u2029]/g, (character) => {
		switch (character) {
			case "\"":
			case "'":
			case "\\": return `\\${character}`;
			case "\n": return "\\n";
			case "\r": return "\\r";
			case "\u2028": return "\\u2028";
			case "\u2029": return "\\u2029";
			default: return "";
		}
	});
}

//#endregion
//#region src/transformers/indent.ts
function createIndent(size) {
	return Array.from({ length: size + 1 }).join(" ");
}

//#endregion
//#region src/transformers/nameSorter.ts
function nameSorter(a, b) {
	if (a.name < b.name) return -1;
	if (a.name > b.name) return 1;
	return 0;
}

//#endregion
//#region src/transformers/searchAndReplace.ts
function searchAndReplace(options) {
	const { text, replaceBy, prefix = "", key } = options;
	return (options.searchValues?.(prefix, key) || [
		`${prefix}["${key}"]`,
		`${prefix}['${key}']`,
		`${prefix}[\`${key}\`]`,
		`${prefix}"${key}"`,
		`${prefix}'${key}'`,
		`${prefix}\`${key}\``,
		new RegExp(`${prefix}${key}`, "g")
	]).reduce((prev, searchValue) => {
		return prev.toString().replaceAll(searchValue, replaceBy);
	}, text);
}

//#endregion
//#region src/transformers/stringify.ts
function stringify(value) {
	if (value === void 0 || value === null) return "\"\"";
	return JSON.stringify(trimQuotes(value.toString()));
}
function stringifyObject(value) {
	return Object.entries(value).map(([key, value$1]) => {
		if (typeof value$1 === "object") return `${key}: {
        ${stringifyObject(value$1)}
      }`;
		return `${key}: ${value$1}`;
	}).filter(Boolean).join(",\n");
}

//#endregion
//#region src/transformers/toRegExp.ts
function toRegExpString(text, func = "RegExp") {
	const raw = trimQuotes(text);
	const [, replacementTarget = "", matchedFlags] = raw.match(/^\^(\(\?([igmsuy]+)\))/i) ?? [];
	const cleaned = raw.replace(/^\\?\//, "").replace(/\\?\/$/, "").replace(replacementTarget, "");
	const regex = new RegExp(cleaned, matchedFlags);
	const source = regex.source;
	const flags = regex.flags;
	if (func === null) return `/${source}/${flags}`;
	return `new ${func}(${JSON.stringify(source)}${flags ? `, ${JSON.stringify(flags)}` : ""})`;
}

//#endregion
//#region src/transformers/index.ts
var transformers_default = {
	combineCodes,
	escape,
	jsStringEscape,
	createIndent,
	transformReservedWord,
	isValidVarName,
	nameSorter,
	searchAndReplace,
	stringify,
	stringifyObject,
	toRegExpString,
	trim,
	trimQuotes,
	JSDoc: { createJSDocBlockText },
	orderBy: natural_orderby.orderBy,
	merge: remeda.merge,
	camelCase,
	pascalCase,
	snakeCase,
	screamingSnakeCase
};

//#endregion
Object.defineProperty(exports, 'camelCase', {
  enumerable: true,
  get: function () {
    return camelCase;
  }
});
Object.defineProperty(exports, 'combineCodes', {
  enumerable: true,
  get: function () {
    return combineCodes;
  }
});
Object.defineProperty(exports, 'createIndent', {
  enumerable: true,
  get: function () {
    return createIndent;
  }
});
Object.defineProperty(exports, 'createJSDocBlockText', {
  enumerable: true,
  get: function () {
    return createJSDocBlockText;
  }
});
Object.defineProperty(exports, 'escape', {
  enumerable: true,
  get: function () {
    return escape;
  }
});
Object.defineProperty(exports, 'isValidVarName', {
  enumerable: true,
  get: function () {
    return isValidVarName;
  }
});
Object.defineProperty(exports, 'jsStringEscape', {
  enumerable: true,
  get: function () {
    return jsStringEscape;
  }
});
Object.defineProperty(exports, 'nameSorter', {
  enumerable: true,
  get: function () {
    return nameSorter;
  }
});
Object.defineProperty(exports, 'pascalCase', {
  enumerable: true,
  get: function () {
    return pascalCase;
  }
});
Object.defineProperty(exports, 'screamingSnakeCase', {
  enumerable: true,
  get: function () {
    return screamingSnakeCase;
  }
});
Object.defineProperty(exports, 'searchAndReplace', {
  enumerable: true,
  get: function () {
    return searchAndReplace;
  }
});
Object.defineProperty(exports, 'snakeCase', {
  enumerable: true,
  get: function () {
    return snakeCase;
  }
});
Object.defineProperty(exports, 'stringify', {
  enumerable: true,
  get: function () {
    return stringify;
  }
});
Object.defineProperty(exports, 'stringifyObject', {
  enumerable: true,
  get: function () {
    return stringifyObject;
  }
});
Object.defineProperty(exports, 'toRegExpString', {
  enumerable: true,
  get: function () {
    return toRegExpString;
  }
});
Object.defineProperty(exports, 'transformReservedWord', {
  enumerable: true,
  get: function () {
    return transformReservedWord;
  }
});
Object.defineProperty(exports, 'transformers_default', {
  enumerable: true,
  get: function () {
    return transformers_default;
  }
});
Object.defineProperty(exports, 'trim', {
  enumerable: true,
  get: function () {
    return trim;
  }
});
Object.defineProperty(exports, 'trimQuotes', {
  enumerable: true,
  get: function () {
    return trimQuotes;
  }
});
//# sourceMappingURL=transformers-Bwrz5_qV.cjs.map