// Imports
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = sourcesDir => {
	return {
        externals: {
            jquery: 'jQuery',
        },
		entry: {
        	"app": [
        		`${sourcesDir}/js/init.js`,
        		`${sourcesDir}/scss/main.scss`,
			],
		},
		resolve: {
			extensions: ['.js', '.json', '.scss', '.css']
		},
		stats: {
			colors: true
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					loader: ['babel-loader']
				},
				{
					test: /\.(css)$/,
					loader: ['style-loader', 'css-loader']
				},
				{
					test: /\.(scss)$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
								minimize: false,
                                url: false
							}
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true
							}
						}
					]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
		]
	}
};