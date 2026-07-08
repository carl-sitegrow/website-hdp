// @ts-check
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  {
    ignores: [
      'dist/**',
      '.vercel/**',
      '.astro/**',
      'node_modules/**',
      'public/**',
      'scripts/**',
      'src/env.d.ts',
      'src/layouts/BlogPostAmpLayout.astro',
      '*.config.mjs',
      '*.config.ts',
      'rehype-*.js',
      'astro-*.js',
    ],
  },
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      // Désactivé : les types globaux (URL, Response, Headers) viennent de @types/node + lib.dom
      'no-undef': 'off',
    },
  },
  ...astro.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'off',
      'astro/no-set-html-directive': 'off',
    },
  },
];
