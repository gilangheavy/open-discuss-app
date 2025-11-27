// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from 'eslint-plugin-storybook';

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import stylistic from '@stylistic/eslint-plugin';


export default [{ignores: ['dist']}, {
  files: ['**/*.{js,jsx}'],
  languageOptions: {
    ecmaVersion: 2020,
    globals: {
      ...globals.browser,
      describe: 'readonly',
      it: 'readonly',
      beforeEach: 'readonly',
      expect: 'readonly',
      cy: 'readonly',
      Cypress: 'readonly',
      vi: 'readonly',
      global: 'readonly',
    },
    parserOptions: {
      ecmaVersion: 'latest',
      ecmaFeatures: {jsx: true},
      sourceType: 'module',
    },
  },
  settings: {
    react: {version: '18.3'},
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
    '@stylistic': stylistic,
  },
  rules: {
    ...js.configs.recommended.rules,
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    ...reactHooks.configs.recommended.rules,
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      {allowConstantExport: true},
    ],
    // Google JavaScript Style Guide rules (migrated to @stylistic)
    '@stylistic/indent': ['error', 2],
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': ['error', 'always'],
    '@stylistic/max-len': ['error', {code: 150, ignoreUrls: true}],
    '@stylistic/arrow-spacing': 'error',
    '@stylistic/no-trailing-spaces': 'error',
    '@stylistic/comma-dangle': ['error', 'always-multiline'],
    '@stylistic/object-curly-spacing': ['error', 'never'],
    '@stylistic/array-bracket-spacing': ['error', 'never'],
    '@stylistic/space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    '@stylistic/keyword-spacing': 'error',
    '@stylistic/space-infix-ops': 'error',
    '@stylistic/eol-last': ['error', 'always'],
    '@stylistic/no-multiple-empty-lines': ['error', {max: 2, maxEOF: 1}],

    // Non-stylistic rules remain unchanged
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-arrow-callback': 'error',
    camelcase: ['error', {properties: 'never'}],
    'new-cap': ['error', {capIsNew: false}],
    'no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: true,
      },
    ],
    'react/prop-types': 'off',
  },
}, ...storybook.configs['flat/recommended']];

