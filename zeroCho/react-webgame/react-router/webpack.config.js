const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  mode: "development", // 실서비스: 'production'
  devtool: "eval", // 실서비스: 'hidden-source-map'
  resolve: {
    extensions: [".jsx", ".js"],
  },
  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 5% in KR"],
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            "react-refresh/babel",
            "@babel/plugin-proposal-class-properties", // //  이걸 설치해줘야 class 컴포넌트가 돌아간다.
          ],
          // 바벨이 최신 문법을 옛날 자바스크립토 transfile할 때 핫 리로딩 기능까지 추가해줌
        },
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()], // 확장프로그램 느낌
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
    publicPath: "/dist",
  },
  devServer: {
    historyApiFallback: true, // // can not get 에러를 꼼수로 해결하는 코드
    devMiddleware: { publicPath: "/dist" }, // 나중에 웹팩이 생성을 해주는 경로
    static: { directory: path.resolve(__dirname) }, // 실제로 존재하는 파일들에 대한 경로
    hot: true,
  },
};
