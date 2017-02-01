var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var extractSCSS = new ExtractTextPlugin('stylesheets/[name].css');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';

module.exports = {
	context: path.join(__dirname, "src"),
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./js/client.js",
	plugins: [
	new webpack.ProvidePlugin({
		_: 'lodash',
		$: 'jquery',
		'jQuery'              : 'jquery',
		'window.jQuery'       : 'jquery',
	}),
	new CopyWebpackPlugin([
		{ from: '../src/img', to: './img' },
		]),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: JSON.stringify(nodeEnv),
		},
	}),
	extractSCSS,
	],
	node: {
  	fs: "empty"
	},
	module: {
		loaders: [
		{ test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery' },
		{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
		{ test: /\.scss$/i, loader: extractSCSS.extract('css!sass') },
		{ test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
		{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
		{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
		{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
		{ test: /\.jpe?g$/, loader: 'file' },
		{ test: /\.png(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
		],
	},
	output: {
		path: __dirname + "/build",
		filename: "client-bundle.js"
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	},
};
