module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  root: true,
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier', // This should be last, so it overrides all the necessary rules to allow prettier to work
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint/eslint-plugin',
    'formatjs',
    'prettier',
    'simple-import-sort',
  ],
  rules: {
    'dot-notation': 0,
    'sort-imports': 0,
    'simple-import-sort/imports': 2,
    'import/prefer-default-export': 0,

    'no-console': [2, { allow: ['error'] }],
    'object-curly-newline': 0,
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'comma-dangle': 0,
    'no-underscore-dangle': [1, { allow: ['__typename'] }],
    'no-use-before-define': 0,
    'no-shadow': 0, // replaced with @typescript-eslint version of same rule
    'max-len': 0,
    'no-multiple-empty-lines': 1,

    // For integrating with prettier without conflicts! More info: https://github.com/prettier/eslint-config-prettier#special-rules
    'prefer-arrow-callback': 0,
    'arrow-body-style': 0,
    'lines-around-comment': 0,
    'no-confusing-arrow': [0, { allowParens: false }],
    'no-mixed-operators': 2, // this might be annoying sometimes, fyi... https://github.com/prettier/eslint-config-prettier#no-mixed-operators
    'no-tabs': [2, { allowIndentationTabs: true }],
    'no-case-declarations': 0,

    // Import
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 2,
    'import/no-named-as-default': 0,
    'import/no-named-as-default-member': 0,

    // React
    'react/display-name': 0,
    'react/react-in-jsx-scope': 2,
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/require-default-props': 0,
    'react/prop-types': 0,
    'react/jsx-props-no-spreading': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-curly-newline': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-closing-tag-location': 0,

    // Typescript
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-shadow': [2],
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/no-implicit-any-catch': 2,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/consistent-type-imports': [
      1,
      { prefer: 'no-type-imports' },
    ],
    '@typescript-eslint/array-type': [2, { default: 'generic' }],
    '@typescript-eslint/consistent-indexed-object-style': [2, 'record'],
    '@typescript-eslint/consistent-type-assertions': [
      1,
      {
        assertionStyle: 'never',
      },
    ],
  },
  settings: {
    'import/extensions': ['.ts', '.tsx'],
  },
};
