import prettierConfig from './.prettierrc'

export default {
    env: {
        "browser": true,
        "es2021": true
    },
    extends: [ // extending my config with these configs and plugins. (config can include plugins)
        'airbnb', 
        'airbnb/hooks', 
        'prettier',
        'plugin:prettier/recommended',
        "plugin:react-hooks/recommended" 
    ],
    parser: '@typescript-eslint/parser',
    plugins: ['react', 'react-hooks', 'import', 'prettier'],
    parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    rules: {
        'prettier/prettier': ['error', prettierConfig]
    }
  }