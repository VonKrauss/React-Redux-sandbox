var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
	context: path.join(__dirname, "src"),
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./js/client.js",
	module: {
		loaders: [
		{ test: require.resolve('jquery'), loader: 'expose?$!expose?jQuery' },
		{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
		{test: /\.scss$/i, loader: extractSCSS.extract(['css','sass','scss'])},
		{test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
		{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
		{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
		{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
		{test: /\.jpe?g$/, loader: 'file'}
		],
	},
	output: {
		path: __dirname + "/src/",
		filename: "client.min.js"
	},
	plugins: debug ? [] : [
	new webpack.optimize.DedupePlugin(),
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	],
};
