const path = require("path");

module.exports = {
  entry: ["./src/index.ts", "./src/global.ts"],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts"],
    modules: [path.resolve(__dirname, "src"), "node_modules"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
  },
};
