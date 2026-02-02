// @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import unusedImports from 'eslint-plugin-unused-imports'

/** @type {import('eslint').Linter.Config[]} */
const config = [
  // Global excludes
  {
    ignores: [
      '**/dist/**',
      '**/src/gen/**',
      '**/src/zod/**',
      '**/src/client/**',
      '**/.kubb/**',
      'kubb.config.js',
    ],
  },
  ...tanstackConfig,
  {
    name: 'tekimax/custom',
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-case-declarations': 'off',
      'no-shadow': 'off',
      'unused-imports/no-unused-imports': 'warn',
    },
  },
]

export default config
