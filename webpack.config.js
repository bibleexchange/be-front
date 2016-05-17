'use strict';

var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/index.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('development')})
  ],
  module: {
    loaders: [
	{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
	  }
    },
	{test: /\.json?$/,loader: 'json' },
	{test: /\.scss$/,loaders: ["style", "css","postcss-loader","sass"]},
	{ test: /\.css$/, loaders: [ 'style', 'css', 'postcss-loader' ] },
	{
	test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
	loader: "url?limit=10000"
	},
	{
	test: /\.(ttf|eot)(\?[\s\S]+)?$/,
	loader: 'file'
	},
	{
	  // When you encounter images, compress them with image-webpack (wrapper around imagemin)
	  // and then inline them as data64 URLs
	  test: /\.(png|jpg|svg)/,
	  loaders: ['url', 'image-webpack'],
	}
	]
  },
  node: {fs: 'empty', net: 'empty', tls: 'empty'},
  sassLoader: {includePaths: [path.resolve(__dirname, "./src/stylesheets")]},
  postcss: [ autoprefixer ],
  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [path.join(__dirname, './src')]
  }
};
