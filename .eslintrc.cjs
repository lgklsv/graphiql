module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',

    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,

    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    'prettier/prettier': ['error', { endOfLine: 'auto' }],

    'jsx-a11y/anchor-has-content': 0,
    'jsx-a11y/control-has-associated-label': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
  },
};
