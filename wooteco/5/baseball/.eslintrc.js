module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // indent(들여쓰기) depth 2까지만 허용
    "max-depth": ["error", 2],
    // 함수(또는 메서드) 길이 10라인까지만 허용
    "max-lines-per-function": ["error", { max: 10 }],
    // 메서드 파리미터 개수 최대 3개까지만 허용
    "max-params": ["error", 3],
  },
};
