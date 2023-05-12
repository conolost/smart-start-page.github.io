const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index_bundle.js",
  },
  //   devtool: "source-maps",
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader", exclude: /node_modules/ },
      {
        // test: /^\/.\/src\/\.css$/,
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      // {
      // test: /\.s(a|c)ss$/,
      // use: ["style-loader", "css-loader", "sass-loader"],
      // },
      // {
      //   test: /\.css$/,
      //   use: ["style-loader", "css-loader"],
      // },
      // {
      //   test: /\.(jpeg|png|jpg|svg|gif)$i/,
      //   loader: "file-loader",
      //   type: "asset/resource",
      //   options: {
      //     name: "[path][name].[ext]",
      //     // publicPath: "../img",
      //     useRelativePath: true,
      //     outputPath: "/img",
      //   },
      // },
    ],
  },
  // devServer: {
  //   contentBase: "src",
  //   hot: true,
  //   open: true,
  //   port: 8000,
  //   watchContentBase: true,
  // },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new Dotenv(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./src/img/",
          to: "img/",
        },
      ],
    }),
  ],
  mode: "development",
};
