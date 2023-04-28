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
  plugins: ['react', '@typescript-eslint', 'prettier', 'fsd-import'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',

    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': 0,

    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],

    'prettier/prettier': ['error', { endOfLine: 'auto' }],

    'fsd-import/fsd-relative-path': 'error',
    'fsd-import/public-api-imports': 'error',
    'fsd-import/layer-imports': 'error',
  },
};
