'use strict';

var autoprefixer = require('autoprefixer');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const APP_PORT = 3000;
const GRAPHQL_PORT = 3030;

module.exports = {
	appPort:APP_PORT,
	graphqlPort:GRAPHQL_PORT,
	contentBase: 'src',
	stats: {
	  colors: true,
	  hash: false,
	  timings: true,
	  chunks: false,
	  chunkModules: false,
	  modules: false
	},
    devtool: 'eval-source-map',
    historyApiFallback: true,
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
	new HtmlWebpackPlugin(),
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
      loaders: ['react-hot','babel']
	},
	{test: /\.json?$/,loader: 'json' },
	{
	 test: /\.s?css$/,
     loaders: ['style', 'css?sourceMap!sass!postcss?parser=postcss-scss']
	},
	{
	  test: /\.eot/,
      loader: 'url-loader?mimetype=application/vnd.ms-fontobject'
    }, {
      test: /\.ttf/,
      loader: 'url-loader?mimetype=application/x-font-ttf'
    }, {
      test: /\.woff/,
      loader: 'url-loader?mimetype=application/font-woff'
    }, {
      test: /\.woff2/,
      loader: 'url-loader?mimetype=application/font-woff2'
    },
	{
	  // When you encounter images, compress them with image-webpack (wrapper around imagemin)
	  // and then inline them as data64 URLs
	  test: /\.(png|jpg|svg)/,
	  loaders: ['url', 'image-webpack'],
	},
	{ test: /\.(yml|md|txt|tpl)/, loader: "raw-loader?brfs" }
	]
  },
  node: {fs: 'empty', net: 'empty', tls: 'empty'},
  postcss: [ autoprefixer ],
  resolve: {
    extensions: ['', '.js', '.scss'],
    root: [path.join(__dirname, './src')]
  }
};
