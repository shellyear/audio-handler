const prettierConfig = require('./.prettierrc')

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // extending my config with these configs and plugins. (config can include plugins)
    'airbnb',
    'airbnb/hooks',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:react-hooks/recommended'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', 'import', 'prettier', 'simple-import-sort'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Import plugin
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        tsx: 'never',
        ts: 'never'
      }
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', prettierConfig],
    'jsx-a11y/media-has-caption': 'off',
    'import/prefer-default-export': 'off', // Named exports are easier to refactor & have better support in IDE
    'no-param-reassign': 'off'
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    }
  }
}
