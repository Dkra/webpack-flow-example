var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
	entry: {
		app: [path.resolve('src/js/app')],
		vendors: ['jquery'],
	},
	output: {
		path: path.resolve('dist'),
		filename: '[name].js',
		publicPath: '/'
	},
	// loaders are webpack essential tool to bundle files
	module: {
		//preLoaders: [
		//	{
		//		test: /\.(js|es6)$/,
		//		exclude: /node_modules/,
		//		loader: 'eslint'
		//	},
		//],
		loaders: [
			{
				test: /\.(jade)$/,
				exclude: /node_modules/,
				loader: 'jade-html'
			},
			// transplie es6 to es5
			{
				test: /\.(js|jsx|es6)$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			// parse .scss into css
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loader: ExtractTextPlugin.extract("style", "css!postcss!sass!")
			},
		]
	},

	// add autoprefixer to css file
	postcss: [autoprefixer({
		browsers: ['last 2 versions']
	})],

	plugins: [
		new ExtractTextPlugin("css/styles.[hash].css"),
		//new HtmlWebpackPlugin({
		//	minify: {
		//		removeComments: true,
		//		collapseWhitespace: true
		//	},
		//	template: './src/index.html',
		//	inject: 'body'
		//}),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.[hash].js')
	],
	
	// allow require without file extension
	resolve: {
		extensions: ['', '.js', '.es6', '.jsx', '.jade']
	}
	
};
