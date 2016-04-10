const path 				= require('path');
const merge 			= require('webpack-merge');
const webpack 			= require('webpack');
const NpmInstallPlugin 	= require('npm-install-webpack-plugin');

const JSX 	= /\.jsx?$/;
const LESS 	= /\.less$/;

const TARGET 	= process.env.npm_lifecycle_event;
const PATHS 	= {
	app: 	path.join(__dirname, 'app'),
	build: 	path.join(__dirname,'build')
};

process.env.BABEL_ENV = TARGET;

const common = {
	entry: {
		app: PATHS.app
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	output: {
		path: 		PATHS.build,
		filename: 	'bundle.js'
	},
	module: {
		preLoaders: [
			{
				test: JSX,
				loaders: ['eslint'],
				include: PATHS.app
			}
		],
		loaders: [
			{
				test: LESS,
				loaders: ['style', 'css', 'less'],
				include: path.join(PATHS.app,'less')
			},
			{
				test: JSX,
				loaders: ['babel?cacheDirectory'],
				include: PATHS.app
			}
		]
	}
};

if (TARGET === 'start' || !TARGET) {
	module.exports = merge(common, {
		devServer: {
			contentBase: PATHS.build,
			historyApiFallback: true,
			hot: true,
			inline: true,
			progress: true,
			stats: 'errors-only',
			host: process.env.HOST || '127.0.0.1',
			port: process.env.HOST || '8080'
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
			new NpmInstallPlugin({
				save: true
			})
		],
		devtool: 'eval-source-map'
	});
}

if (TARGET === 'build') {
	module.exports = merge(common, {});
}