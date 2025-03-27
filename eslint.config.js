import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import typescriptEslint from 'typescript-eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  {
    ignores: ['*.d.ts', '**/dist', '**/vendor/**'],
  },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        parser: typescriptEslint.parser,
      },
    },
    rules: {},
  },
  eslintConfigPrettier,
);
