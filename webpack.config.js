var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
    },
  devServer: {
    publicPath: '/',
    contentBase: './',
    hot: true,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include: __dirname + '/src',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        include: /\.json$/, loaders: ["json-loader"]
      }
    ]
  }
}
