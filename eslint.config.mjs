import { FlatCompat } from "@eslint/eslintrc"
import { dirname } from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: [
      "next/core-web-vitals",
      "next/typescript",
      "next",
      "prettier",
      "plugin:tailwindcss/recommended",
    ],
  }),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "tailwindcss/classnames-order": "off",
    },
  },
]

export default eslintConfig
