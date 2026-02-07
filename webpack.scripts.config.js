const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const WooCommerceDependencyExtractionWebpackPlugin = require( '@woocommerce/dependency-extraction-webpack-plugin' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	entry: {
		admin: path.resolve( process.cwd(), 'src', 'js', 'admin', 'index.js' ),
	},
	output: {
		...defaultConfig.output,
		path: path.resolve( process.cwd(), 'build', 'scripts' ),
	},
	plugins: [
		...defaultConfig.plugins.filter(
			( plugin ) =>
				plugin.constructor.name !== 'DependencyExtractionWebpackPlugin' &&
				plugin.constructor.name !== 'CopyPlugin'
		),
		new WooCommerceDependencyExtractionWebpackPlugin(),
	],
};
