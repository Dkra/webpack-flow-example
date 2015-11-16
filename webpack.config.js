var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var Clean = require('clean-webpack-plugin');
var jade = require('jade');
module.exports = {
	entry: {
		app: [path.resolve('src/js/app')],
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
				loader: 'jade'
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
		//new Clean(['dist']),
		new ExtractTextPlugin("css/styles.[hash].css"),
		new HtmlWebpackPlugin({
			filename:'index.html',
			templateContent: function(templateParams, compilation) {
				var templateFile = path.join(__dirname, './src/index.jade');
				compilation.fileDependencies.push(templateFile);
			return jade.compileFile(templateFile)();
	},
	inject: true,
}),
		new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
	],
	
	// allow require without file extension
	resolve: {
		extensions: ['', '.js', '.es6', '.jsx', '.jade']
	}
	
};
