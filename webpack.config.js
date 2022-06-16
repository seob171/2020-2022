import path from 'path';
// import {fileURLToPath} from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const __dirname = path.resolve();

// const dirname = path.dirname(fileURLToPath(import.meta.url))

const config = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|pages)/,
				resolve: {
					fullySpecified: false,
				},
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.css$/,
				use: [
					{loader: MiniCssExtractPlugin.loader},
					{
						loader: 'css-loader',
						options: {import: true},
					},
				],
			},
			{
				test: /\.png$/,
				type: 'asset/resource',
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({template: './index.html'}),
		new MiniCssExtractPlugin(),
	],
	devtool: 'eval-cheap-module-source-map',
	target: 'web',
	devServer: {
		// contentBase:path.resolve(dirname,'dist'),
		// compress:true,
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		hot: false,
		historyApiFallback: true,
		liveReload: true,
		open: true,
		port: 5500,
		// watchContentBase:true,
		// watchOptions:{
		//     poll:1000,
		//     ignored:/node_modules/
		// }
	},
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
		hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
	},
	// stats:{
	//     children:true
	// }
};

export default config;
