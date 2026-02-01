import { defineConfig } from "@kubb/core";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";
import { pluginOas } from "@kubb/plugin-oas";
import { pluginClient } from "@kubb/plugin-client";

export default defineConfig({
    root: ".",
    input: {
        path: "./spec/openapi.json",
    },
    output: {
        path: "./src/gen",
        clean: true,
    },
    plugins: [
        pluginOas({ validate: false }),
        pluginTs({
            output: {
                path: "types.ts",
            },
            enumType: "asConst",
        }),
        pluginClient({
            output: {
                path: "./client",
            },
        }),
        pluginZod({
            output: {
                path: "./zod",
            },
        }),
    ],
});
