const path = require("path");

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
                  browsers: ["> 5% in KR", "last 2 chrome versions"],
                },
                debug: true,
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [],
        },
      },
    ],
  },
  plugins: [], // 확장프로그램 느낌
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },
};
