module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/recommended',
    'airbnb-base',
  ],
  globals: {
    FB: false,
    ga: false,
    gtag: false,
  },
  plugins: [
    'vue',
    'flowtype',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'internal/webpack/webpack.config.js',
      },
    },
  },
  rules: {
    'func-names': 0,
    'no-underscore-dangle': 0,
    'no-console': 0,
    'no-bitwise': 0,
    'prefer-promise-reject-errors': 0,
    'object-curly-newline': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,
    'no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': ['error', 'always', {
      js: 'never',
    }],
    'no-param-reassign': ['error', {
      props: false,
    }],
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
  },
};
