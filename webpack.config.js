var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname),
    publicPath: '/public/',
    filename: 'bundle.js'
    },
  devServer: {
    publicPath: '/public/',
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
          presets: ['es2015', 'react', 'stage-1']
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        include: /\.json$/, loaders: ["json-loader"]
      },
      {
        test: /\.svg$/,
        loader: "babel!react-svg"
      }
    ]
  }
}
