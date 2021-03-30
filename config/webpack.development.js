// Imports
const WebpackNotifierPlugin = require('webpack-notifier');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ( version ) => {
	return {
		output: {
			filename: `js/[name]-` + version + `.js`
		},
		devtool: "source-map",
		plugins: [
			new WebpackNotifierPlugin({ alwaysNotify: true }),
			new MiniCssExtractPlugin({
				filename: `css/[name]-` + version + `.css`
			})
		]
	};
};