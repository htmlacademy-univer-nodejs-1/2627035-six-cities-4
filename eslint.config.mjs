import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([globalIgnores(["**/dist/"]), {
    extends: compat.extends("plugin:@typescript-eslint/recommended", "htmlacademy/node"),

    plugins: {
        "@typescript-eslint": typescriptEslint,
    },

  rules:{
    "@typescript-eslint/no-unsafe-declaration-merging": "off",
    "node/handle-callback-err": "off",
    "node/global-require": "off",
    "node/no-deprecated-api": "off",
    "node/no-unsupported-features/es-syntax": "off",
    "node/no-path-concat": "off",
    "node/prefer-global/buffer": "off",
    "node/prefer-global/text-decoder": "off",
    "node/prefer-global/text-encoder": "off",
    "node/prefer-global/url-search-params": "off",
    "node/prefer-global/url": "off",
    "node/prefer-promises/dns": "off",
    "node/prefer-promises/fs": "off",
    "@typescript-eslint/no-shadow": "off"
  },

  ignores:[
      "dist/"
  ],
    languageOptions: {
        globals: {
            ...globals.node,
        },

        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: "module",
    },
}]);
