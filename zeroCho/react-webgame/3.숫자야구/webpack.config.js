const path = require("path");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
  name: "number-baseball",
  mode: "development", // 실서비스: production
  devtool: "inline-source-map", // 실서비스: hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"],
  },

  // 입력
  entry: {
    app: "./client",
  },
  // entry에 있는 파일에 모듈을 적용한 후 output으로 뺀다
  module: {
    rules: [
      {
        // 규칙을 적용할 파일들
        test: /\.jsx?$/, // js랑 jsx파일에 이 규칙을 적용하겠다는 의미
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: { browsers: ["> 5% in KR", "last 2 chrome versions"] },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: ["react-refresh/babel"],
        },
        exclude: path.join(__dirname, "node_modules"),
      },
    ],
  },
  plugins: [new RefreshWebpackPlugin()],
  // 출력
  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/",
  },
  devServer: {
    devMiddleware: { publicPath: "/dist" }, // 나중에 웹팩이 생성을 해주는 경로
    static: { directory: path.resolve(__dirname) }, // 실제로 존재하는 파일들에 대한 경로
    hot: true,
  },
};
