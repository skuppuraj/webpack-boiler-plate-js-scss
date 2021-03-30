// Imports
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = ( version, travis_build ) => {
	const productionDir = "./dist";
	const outPath = `${productionDir}/app-pacakge`;
	const zipName = `app-pacakge-${version}.zip`;

	let production = {
        mode: 'production',
		output: {
			filename: `js/[name]-` + version + `.min.js`
		},
		plugins: [
			new MiniCssExtractPlugin({
				// Options similar to the same options in webpackOptions.output
				// both options are optional
				filename: `css/[name]-` + version + `.min.css`
			}),
			new OptimizeCssAssetsPlugin()
		]
	};

	if( version !== false && !travis_build ) {
		production.plugins.push(
			new WebpackShellPlugin({
				safe: true,
				onBuildStart:[
					'rm -rf ' + productionDir + ' && mkdir -p ' + productionDir,
				],
				onBuildEnd:[
					"npx cpy --parents '.' '!./dist' !./resources/**/js !./resources/**/scss '!./config' '!./tests' '!./cypress' '!./**/node_modules' '!./**/__debugger.txt' '!./_dev_config.php' '!./webpack.config.js' '!./postcss.config.js' '!./package.json' '!./package-lock.json' '!./composer.json' '!./composer.lock' " + outPath
					+ " && cd " + productionDir
					+ " && zip --recurse-paths " + zipName + " ./app-pacakge"
				]
			})
		)
	}

	return production;
};