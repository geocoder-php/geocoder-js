const path = require("path");

module.exports = {
  entry: ["./src/index.ts", "./src/global.ts"],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: {
          compiler: 'ttypescript'
        },
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
