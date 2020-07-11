const path = require("path");

module.exports = {
  watch: false,
  mode: "development",
  entry: [
    "@babel/polyfill", // enables async-await
    "./app/index.js",
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
};
