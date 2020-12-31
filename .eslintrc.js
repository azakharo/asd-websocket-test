module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'prettier/react'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    'react-hooks'
  ],
  rules: {
    'prettier/prettier': [
      'error', {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: false,
        jsxBracketSameLine: true,
        arrowParens: 'avoid'
      }
    ],

    // we dont use jxs file extensions
    'react/jsx-filename-extension': [1, { extensions: ['.js'] }],

    // todo consider adding project agreement about default props
    'react/require-default-props': 0,
    'no-restricted-syntax': 0,
    'react/static-property-placement': 0,
    'react/state-in-constructor': [1, 'never'],
    'react/jsx-props-no-spreading': 0,

    // Hooks rules
    "react-hooks/rules-of-hooks": "error",
    'react-hooks/exhaustive-deps': 'warn',

    "import/extensions": [0, "never"],
    "import/prefer-default-export": 1,

    'react/destructuring-assignment': [0, 'always', { ignoreClassFields: true }],
  },
  parser: 'babel-eslint',
  settings: {
    "import/resolver": {
      webpack: {
        config: 'webpack.common.js'
      }
    }
  }
};
