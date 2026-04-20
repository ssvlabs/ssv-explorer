import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import tailwindcss from "eslint-plugin-tailwindcss";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: {
      tailwindcss,
    },
    rules: {
      ...tailwindcss.configs.recommended.rules,
    },
    settings: {
      tailwindcss: {
        callees: ["cn", "cva"],
        config: "./tailwind.config.ts",
        classRegex: "^(class(Name)?|tw)$",
      },
      next: {
        rootDir: ["./"],
      },
    },
  },
  {
    rules: {
      // Tailwind
      "tailwindcss/no-custom-classname": "off",

      // TypeScript (basic rules - type-checked rules not available without parserOptions.project)
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^err",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-empty-object-type": "off",

      // Standard react-hooks rules (rules-of-hooks, exhaustive-deps) are enabled via eslint-config-next
      // Disable only the new React 19 strict rules added in Next.js 16
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/immutability": "off",
      "react-hooks/preserve-manual-memoization": "off",
      "react-hooks/incompatible-library": "off",
    },
  },
  prettier,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "scripts/**/*",
  ]),
]);

export default eslintConfig;
