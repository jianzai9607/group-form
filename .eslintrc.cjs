/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/base",
    "plugin:vue/vue3-essential",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/vue3-recommended",
    "@vue/eslint-config-prettier",

    "eslint:recommended",
    "@vue/eslint-config-prettier"
  ],
  env: {
    "vue/setup-compiler-macros": true
  },
  rules: {
    "vue/no-v-model-argument": "off",
    "prettier/prettier": [
      "error",
      {
        semi: true,
        tabWidth: 2,
        singleQuote: false,
        printWidth: 100,
        trailingComma: "none",
        endOfLine: "auto"
      }
    ]
  },
  parserOptions: {
    ecmaVersion: "latest"
  }
};
