const path = require("path");
const { GenerateSW } = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  watch: false,
  mode: "development",
  stats: 'none',
  devServer: {
    noInfo: false
  },
  entry: [
    "./app/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "src"),
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
       new GenerateSW(),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.resolve(__dirname, './src') },
        ],
      })
    ]
};
