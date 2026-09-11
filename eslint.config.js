/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig, globalIgnores } = require('eslint/config');

const globals = require('globals');
const prettier = require('eslint-plugin-prettier');
const filenames = require('eslint-plugin-filenames');
const reactHooks = require('eslint-plugin-react-hooks');
const tseslint = require('typescript-eslint');

const { fixupPluginRules } = require('@eslint/compat');

const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  globalIgnores([
    '**/node_modules/',
    '.git/',
    '.next/',
    '.netlify/',
    '**/*.d.ts',
  ]),
  ...tseslint.configs.recommended.map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
  })),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },

      parser: tseslint.parser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    extends: [...compat.extends('airbnb'), ...compat.extends('prettier')],

    plugins: {
      prettier,
      filenames,
      'react-hooks': fixupPluginRules(reactHooks),
      '@typescript-eslint': tseslint.plugin,
    },

    rules: {
      'arrow-body-style': 0,
      'no-console': 0,
      'import/prefer-default-export': 'off',
      'jsx-a11y/anchor-is-valid': 0,
      'react/no-unknown-property': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 0,
      'react/prop-types': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],

      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
    },

    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          paths: ['./'],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    },
  },
]);
