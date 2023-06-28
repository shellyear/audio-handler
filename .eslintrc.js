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
    'prettier/prettier': ['error', prettierConfig],
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
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        'newlines-between': 'always'
      }
    ],
    'import/no-extraneous-dependencies': 'off', // Skip check for dependencies vs devDependencies
    'import/prefer-default-export': 'off', // Named exports are easier to refactor & have better support in IDE

    'react/jsx-filename-extension': ['error', { extensions: ['.tsx', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'jsx-a11y/media-has-caption': 'off',
    'no-param-reassign': 'off',

    'react/require-default-props': 'off', // defaultProps are not used in that project
    'react/jsx-props-no-spreading': 'off', // allow spreading props

    // probably will be enabled (?)
    'no-shadow': 'off'
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
