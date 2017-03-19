"use strict";
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');

const HOST = '0.0.0.0';
const PORT = '8080';

const AUTOPREFIXER_BROWSERS = [
	'Android 2.3',
	'Android >= 4',
	'Chrome >= 35',
	'Firefox >= 31',
	'Explorer >= 9',
	'iOS >= 7',
	'Opera >= 12',
	'Safari >= 7.1',
];


const postcss = {
	loader: 'postcss-loader',
	options: {
		plugins: () => ([
			require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS }),
		]),
	},
}


module.exports = {
	entry: [
		'react-hot-loader/patch',
		'./src/index.jsx', // your app's entry point
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
	output: {
		publicPath: '/',
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: ['style-loader', 'css-loader', postcss],
		},
		{
			test: /\.scss/,
			use: ['style-loader', 'css-loader', 'sass-loader', postcss],
		}, {
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				"presets": ["es2015", "stage-0", "react"]
			}
		},
		{
			test: /\.json$/,
			use: 'json-loader'
		}]
	},
	devServer: {
		contentBase: "./public",
		// do not print bundle build stats
		noInfo: true,
		// enable HMR
		hot: true,
		// embed the webpack-dev-server runtime into the bundle
		inline: true,
		// serve index.html in place of 404 responses to allow HTML5 history
		historyApiFallback: true,
		port: PORT,
		host: HOST
	},
	plugins: [
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new DashboardPlugin(),
		new HtmlWebpackPlugin({
			template: './src/template.html',
		}),
	]
};
