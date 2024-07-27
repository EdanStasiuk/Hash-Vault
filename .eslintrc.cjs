module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:storybook/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "react"],
  ignorePatterns: [
    ".eslintrc.cjs",
    "jest.config.cjs",
    "tailwind.config.js",
    "postcss.config.mjs",
    "vite.config.ts",
    "electron.js",
    "preload.js",
    "server.js",
    "convertToFiat.test.ts",
    "displayCurrencySymbol.test.ts",
    "fetchConvertedPrice.test.ts",
    "fetchUsdToFiatConversionRate.test.ts",
    "getAccountAssets.test.ts",
    "getPositiveBalanceNonNftTokens.test.ts",
    "getTokenBalance.test.ts",
    "getTokenInfo.test.ts",
    "getTokenLogo.test.ts",
    "isNft.test.ts",
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [
      1,
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/no-unnecessary-condition": "off",
  },
};
