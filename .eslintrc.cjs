module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // 允許++,-- 寫法
    'no-param-reassign': ['error', { props: false }], // 忽略函數參數的屬性賦值(common6),
    'max-len': ['error', { code: 140 }],
  },
};
