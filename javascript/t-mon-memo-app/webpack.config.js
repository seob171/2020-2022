import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __dirname = path.resolve();

const config = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        resolve: {
          fullySpecified: false,
        },
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: { import: true },
          },
        ],
      },
      {
        test: /\.png$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./answer.html" }),
    new MiniCssExtractPlugin(),
  ],
  devtool: "eval-cheap-module-source-map",
  target: "web",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    hot: false,
    historyApiFallback: true,
    liveReload: true,
    open: true,
    port: 3000,
  },
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
    hints: process.env.NODE_ENV === "production" ? "warning" : false,
  },
};

export default config;
