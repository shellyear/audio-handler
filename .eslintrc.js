import prettierConfig from './.prettierrc'

export default {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        'airbnb', 
        'airbnb/hooks', 
        'prettier',
        'plugin:prettier/recommended',
        "plugin:react-hooks/recommended" 
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        'prettier/prettier': ['error', prettierConfig]
    }
  }