Object.defineProperty(exports, '__esModule', { value: true });
const require_chunk = require('./chunk-C1_xRkKa.cjs');
const require_transformers = require('./transformers-Bwrz5_qV.cjs');
let natural_orderby = require("natural-orderby");
let remeda = require("remeda");

exports.camelCase = require_transformers.camelCase;
exports.combineCodes = require_transformers.combineCodes;
exports.createIndent = require_transformers.createIndent;
exports.createJSDocBlockText = require_transformers.createJSDocBlockText;
exports.default = require_transformers.transformers_default;
exports.escape = require_transformers.escape;
exports.isValidVarName = require_transformers.isValidVarName;
exports.jsStringEscape = require_transformers.jsStringEscape;
Object.defineProperty(exports, 'merge', {
  enumerable: true,
  get: function () {
    return remeda.merge;
  }
});
exports.nameSorter = require_transformers.nameSorter;
Object.defineProperty(exports, 'orderBy', {
  enumerable: true,
  get: function () {
    return natural_orderby.orderBy;
  }
});
exports.pascalCase = require_transformers.pascalCase;
exports.screamingSnakeCase = require_transformers.screamingSnakeCase;
exports.searchAndReplace = require_transformers.searchAndReplace;
exports.snakeCase = require_transformers.snakeCase;
exports.stringify = require_transformers.stringify;
exports.stringifyObject = require_transformers.stringifyObject;
exports.toRegExpString = require_transformers.toRegExpString;
exports.transformReservedWord = require_transformers.transformReservedWord;
exports.trim = require_transformers.trim;
exports.trimQuotes = require_transformers.trimQuotes;