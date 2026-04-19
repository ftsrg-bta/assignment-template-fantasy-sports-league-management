import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import globals from 'globals'

export default [
  { ignores: ['dist/**'] },
  { ...js.configs.recommended, files: ['**/*.ts'] },
  {
    files: ['**/*.ts'],
    languageOptions: { parser: tsParser, globals: globals.node },
    plugins: { '@typescript-eslint': ts },
    rules: {
      ...ts.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
]
