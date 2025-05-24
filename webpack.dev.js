const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './Script/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'), // GitHub Pages ambil dari sini
    publicPath: '/AisyShop/', // Penting! Harus cocok dengan nama repo
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'], // kalau import CSS dari JS
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'styles', to: 'Styles' }, // pastikan path dan nama folder cocok
        { from: 'app.webmanifest', to: 'app.webmanifest' },
        { from: 'icons', to: 'icons' }
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'docs'), // samakan dengan output
    },
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
};