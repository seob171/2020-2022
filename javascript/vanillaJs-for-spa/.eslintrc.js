module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    amd: true,
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],

  plugins: [
    'prettier',
    // '@typescript-eslint'
  ],
  rules: {
    // '@typescript-eslint/no-explicit-any': 'off',
    // '@typescript-eslint/no-var-requires': 0,
  },
  // parser: '@babel/eslint-parser',
  parserOptions: {
    // parser: '@typescript-eslint/parser',
    ecmaVersion: 2018,
    sourceType: 'module',
  },
};
