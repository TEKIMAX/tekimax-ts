"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@kubb/core");
const plugin_ts_1 = require("@kubb/plugin-ts");
const plugin_zod_1 = require("@kubb/plugin-zod");
const plugin_oas_1 = require("@kubb/plugin-oas");
exports.default = (0, core_1.defineConfig)({
    root: ".",
    input: {
        path: "./openapi.json",
    },
    output: {
        path: "./src/gen",
        clean: true,
    },
    plugins: [
        (0, plugin_oas_1.pluginOas)({ validate: false }),
        (0, plugin_ts_1.pluginTs)({
            output: {
                path: "types.ts",
            },
            enumType: "asConst",
        }),
        (0, plugin_zod_1.pluginZod)({
            output: {
                path: "./zod",
            },
        }),
    ],
});
