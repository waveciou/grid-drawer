import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import globals from 'globals';

export default [
  js.configs.recommended,
  ...tsPlugin.configs['flat/recommended'],
  {
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
    },
  },
];
