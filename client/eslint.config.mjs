import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import pluginJest from "eslint-plugin-jest";

const config = {
  plugins: {
    prettier,
    jest: pluginJest,
  },

  rules: {
    "prettier/prettier": ["error"],
    "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-console": "warn",
    eqeqeq: ["error", "always"],
    curly: ["error", "all"],
    "no-undef": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
  },

  settings: {
    react: {
      version: "detect",
    },
  },
};

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    files: [
      "**/*.test.{js,jsx,ts,tsx}",
      "**/__tests__/*.{js,jsx,ts,tsx}",
      "src/tests/**",
    ],
    languageOptions: {
      globals: globals.jest, // Jest globals like `test`, `expect`
    },
    plugins: {
      jest: pluginJest,
    },
    rules: {
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/no-identical-title": "error",
      "jest/prefer-to-have-length": "warn",
      "jest/valid-expect": "error",
    },
  },

  config,
];
