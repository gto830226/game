let path = require("path");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let WebpackCdnPlugin = require('webpack-cdn-plugin');
module.exports = {
  devtool: 'source-map',
  entry: {
    index: './src/index.ts',
  },
  output: {
    path: path.resolve('./dist'),
    filename: './[name].bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    loaders: [{
      test: /.ts$/,
      loader: 'ts-loader'
    }, {
      test: /\.(s*)css$/,
      use: ["style-loader", "css-loader", "sass-loader"]
    }]
  },
  plugins: [
    // new UglifyJsPlugin(),
    new HtmlWebpackPlugin({
      template: '!!pug-loader!./view/index.pug'
    }),
    new WebpackCdnPlugin({
      modules: [{
        name: 'moment',
        var: 'moment'
      }],
      publicPath: '/node_modules'
    })
  ]
};